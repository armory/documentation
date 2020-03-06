---
layout: post
title: Installing Spinnaker in Kubernetes
order: 21
published: true
redirect_from:
  - /spinnaker_install_admin_guides/install_on_k8s/
  - /spinnaker_install_admin_guides/install-on-k8s/
  - /spinnaker-install-admin-guides/install_on_k8s/
---

This guide describes how to install Spinnaker in Kubernetes.  It assumes we have the following:

* A Kubernetes cluster, with storage set up so that PersistentVolumeClaims properly allocate PersistentVolumes
* Access to an object storage bucket (Amazon S3, Google GCS, Azure Storage, or Minio are all options for this).  _For the initial version of this document, we cover Amazon S3 **only**._
* A Kubernetes Ingress controller, or permissions to install the NGINX Ingress Controller

This document currently does not fully cover the following (see [Next Steps](#next-steps) for some links to achieve these)

* TLS Encryption
* Authentication/Authorization
* Add K8s accounts to deploy to
* Add cloud accounts to deploy to

Note: This document is focused on Armory Spinnaker, but can be adapted to install Open Source Spinnaker by using a different Halyard container and a corresponding different Spinnaker version

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Assumptions / Prerequisites / Environments

This document assumes the following:

* We have a Kubernetes cluster up and running, with at least 4x CPUs and 8 GiB of memory.  (This is the bare minimum to install and run Spinnaker; depending on our Spinnaker workload, we may need more resources)
* We have `kubectl` installed and are able to access and create Kubernetes resources
* We have access to an object storage bucket, or the ability to create an object storage bucket.  _For the initial version of this document, we cover Amazon S3 **only**._ 
* We have access to an IAM role or user with access to the S3 bucket or can create an IAM role or user with access to the S3 bucket.

This document is written with the following workflow in mind:

* We have access to the Kubernetes API, with `kubectl` configured and able to access the cluster, from our workstation
* We will create a Kubernetes namespace to run Halyard (the Spinnaker installer) and Spinnaker in
* In our namespace, we will grant the `default` Kubernetes ServiceAccount the `cluster-admin` ClusterRole (which will give it full permissions within our namespace, but not on other namespaces; for details, see the [Kubernetes RBAC documentation](https://kubernetes.io/docs/reference/access-authn-authz/rbac/))
* In our namespace, we will create a PVC (PersistentVolumeClaim), which will be used for persistent Spinnaker cluster configuration (the "halyard configuration" or "halconfig")
* In our namespace, we will create a StatefulSet to run Halyard (the Spinnaker "installer").  The PVC will be mounted to this StatefulSet.
* Halyard will use the `default` Kubernetes ServiceAccount to create and modify resources running the cluster (the Kubernetes Secrets, Deployments, and Services that make up Spinnaker)
* The Spinnaker microservice called "Clouddriver", which interacts with our various clouds (including Kubernetes), will also use the `default` ServiceAccount to interact with Kubernetes

In addition to the above, the Spinnaker microservice called "Front50", which stores Spinnaker Application and Pipeline configuration to an object store, will be set up as follows:

* Front50 will have full access to an S3 bucket via either an IAM user (with an AWS access key and secret access key) or an IAM role (attached to your Kubernetes cluster)

At the end of this document, we will have the following:

* Spinnaker will be up and running, and reachable from our browser
* Spinnaker will be able to deploy other Kubernetes resources to the namespace where it is running, but not to any other namespace

# Installation Summary

In order to install Spinnaker, this document covers the following things:

* Creating a Kubernetes namespace (for Spinnaker and Halyard).  For this document, we're going to use the namespace `spinnaker`, but any namespace could be used.
* Granting the `default` ServiceAccount in the namespace access to the `cluster-admin` ClusterRole **in the namespace**
* Running Halyard (the Spinnaker installer) as a Kubernetes Pod in the namespace (using a StatefulSet)
* Creating an S3 bucket for Spinnaker to store persistent configuration in
* Creating an IAM user that Spinnaker will use to access the S3 bucket (or alternately, granting access to the bucket via IAM roles)
* Running the `hal` client interactively in the Kubernetes Pod, to:
  * Build out the halconfig YAML file (`.hal/config`)
  * Configure Spinnaker with the IAM credentials and bucket information
  * Turn on other recommended settings (artifacts and http artifact provider)
  * Install Spinnaker
  * Expose Spinnaker

# Connect to the Kubernetes cluster

We must be able to connect to the Kubernetes cluster via `kubectl`.  Depending on the type of your Kubernetes cluster, there are a number of ways of achieving this.

## Connecting to an AWS EKS cluster

If we're using an AWS EKS cluster, we must be able to connect to the EKS cluster. This assumes we have already configured the `aws` CLI with credentials and a default region / availability zone (see installation directions [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) and configuration directions [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html))

1. If we have access to the role that created the EKS cluster, we can update our kubeconfig with access to our Kubernetes cluster with this command:

	```bash
	aws eks update-kubeconfig --name <EKS_CLUSTER_NAME>
	```

1. From here, we can validate access to the cluster with this command (should receive a number of namespaces)

	```bash
	kubectl get namespaces
	```

## Connecting to other Kubernetes clusters

If we've stood up Kubernetes on AWS with KOPS or another Kubernetes tool, ensure that we can communicate with our Kubernetes cluster with kubectl.

```bash
kubectl get namespaces
```

# Front50 Object Store

The Spinnaker microservice Front50 requires a backing store to store Spinnaker Application and Pipeline Definitions.  There are a number of options for this:

* Amazon S3 Bucket
* Google Cloud Storage (GCS) Bucket
* Azure Storage Bucket
* Minio
* MySQL

The current version of this document only covers S3.  GCS, AZS, Minio, and MySQL will be forthcoming

## Using S3 for Front50

### Creating the S3 bucket

If we do not yet have an S3 bucket, create an S3 bucket:

1. Log into the AWS Console (web UI)
2. Navigate to the S3 Console (Click on "Services" at the top, and then on "S3" under "Storage")
3. Click on "Create Bucket"
4. Specify a globally unique name for this bucket, in our AWS region of choice, following our organization's naming convention (if applicable). For this document, we will use, `spinnaker-abcxyz`.
5. Click "Next"
6. Select the following two checkboxes:

     * Keep all versions of an object in the same bucket
     * Automatically encrypt objects when they are stored in S3

7. Click "Next"

8. Do not add any additional permissions, unless specified by our organization. Click "Next"

9. Click "Create bucket"

Spinnaker (the `front50` service, specifically) will need access to our newly-created bucket. There are a number of ways to achieve this. This document describes two mechanisms to do this.

By default, Spinnaker will store all Spinnaker information in a folder called `front50` in our bucket. We can optionally specify a different directory (for example, if we're using a pre-existing or shared S3 bucket).

### Create an IAM user, using an inline policy

We can create an IAM user with credentials, and provide that to Spinnaker via Halyard

1. Log into the AWS Console (Web UI)
2. Navigate to the IAM Console (Click on "Services" at the top, and then on "IAM" under "Security, Identity, & Compliance")
3. Click on "Users" on the left
4. Click on "Add user"
5. Give our user a distinct name, per our organization's naming conventions. For this document, we will use `s3-spinnaker-abcxyz`
6. Click on "Programmatic access"
7. We will not be adding a distinct policy to this user. Click on "Next: Tags". _We may receive a warning about how there are no policies attached to this user - this warning can be ignored._
8. Optionally, add tags, then click on "Next: Review"
9. Click "Create user"
10. Save the Access Key ID and Secret Access Key - these will be used later, during Halyard configuration
11. Click "Close"

Then, add an inline policy to our IAM user:

1. Click on our newly-created IAM user
2. Click on "Add inline policy" (on the right)
3. Click on the "JSON" tab
4. Add this text (replace `s3-spinnaker-abcxyz` with the name of our bucket)

	```json
	{
	  "Version": "2012-10-17",
	  "Statement": [
	    {
	      "Effect": "Allow",
	      "Action": "s3:*",
	      "Resource": [
	        "arn:aws:s3:::spinnaker-abcxyz",
	        "arn:aws:s3:::spinnaker-abcxyz/*"
	      ]
	    }
	  ]
	}
	```

5. Click on "Review Policy"

6. Give our inline policy some name. For example `s3-spinnaker-abcxyz`

7. Click "Create Policy"

### Create an IAM policy attached to the Kubernetes nodes, using an inline policy

Alternately, we can attach an IAM policy to the role attached to our Kubernetes nodes.

1. Log into the AWS Console (Web UI)
2. Navigate to EC2 (Click on "Services" at the top, and then on "EC2" under "Compute")
3. Click on one of our Kubernetes nodes
4. In the bottom section, look for "IAM role" and click on the role
5. Click on "Add inline policy" (on the right)
6. Click on the "JSON" tab
7. Add this text (replace `s3-spinnaker-abcxyz` with the name of our bucket)

	```json
	{
	  "Version": "2012-10-17",
	  "Statement": [
	    {
	      "Effect": "Allow",
	      "Action": "s3:*",
	      "Resource": [
	        "arn:aws:s3:::spinnaker-abcxyz",
	        "arn:aws:s3:::spinnaker-abcxyz/*"
	      ]
	    }
	  ]
	}
	```

8. Click on "Review Policy"

9. Give our inline policy some name. For example `s3-spinnaker-abcxyz`

10. Click "Create Policy"

# Start the Halyard StatefulSet

Halyard is a Docker image used to install Spinnaker (it generates Kubernetes manifests for each of the Spinnaker services).  We're going to run it in our Kubernetes cluster as a StatefulSet with one (1) Pod.

First, create a namespace for Spinnaker to run in (this can be any namespace)

```bash
kubectl create ns spinnaker
```

We can use this manifest to install and run Halyard

Call this file `halyard.yml`:
```yml
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: spinnaker
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- 
  kind: ServiceAccount
  name: default
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: hal-pvc
  labels:
    app: halyard
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 100Mi
---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: halyard
spec:
  replicas: 1
  serviceName: halyard
  selector:
    matchLabels:
      app: halyard
  template:
    metadata:
      labels:
        app: halyard
    spec:
      containers:
      - 
        name: halyard
        image: armory/halyard-armory:{{ site.data.versions.halyard-armory-version }}
        volumeMounts:
        - 
          name: hal
          mountPath: /home/spinnaker
        env:
        - 
          name: HOME
          value: "/home/spinnaker"
      securityContext:
        runAsUser: 1000
        runAsGroup: 65535
        fsGroup: 65535
      volumes:
      - 
        name: hal
        persistentVolumeClaim:
          claimName: hal-pvc
```

This Kubernetes manifest has these three resources in it:

* A Kubernetes Rolebinding (granting the `default` ServiecAccount access to the full namespace; this is used by both Halyard and Clouddriver)
* A PersistentVolumeClaim (used for persistent Halyard configuration)
* A StatefulSet using the PVC, which will run our Halyard Pod

Apply (create) the resources **in our namespace** (change `-n spinnaker` to a different namespace if you're using a different namespace):

```bash
kubectl -n spinnaker apply -f halyard.yml
```

Check the status of the pod, until it's up (and troubleshoot accordingly, based on standard Kubernetes troubleshooting):

```bash
kubectl -n spinnaker get pods
```

# Enter the Halyard container

```bash
kubectl -n spinnaker exec -it halyard-0 bash

# Also, once in the container, we can run these commands for a friendlier environment to:
# - prompt with information
# - alias for ls
# - cd to the home directory
export PS1="\h:\w \$ "
alias ll='ls -alh'
cd ~
```

# Configure Spinnaker to install in Kubernetes

Inside the container, use the Halyard `hal` command line tool to enable the Kubernetes cloud provider:

```bash
hal config provider kubernetes enable
```

Next, configure the account (this will use the ServiceAccount associated with Halyard and Clouddriver; in this case, the `default` service account):

```bash
hal config provider kubernetes account add spinnaker \
  --provider-version v2 \
  --only-spinnaker-managed true \
  --service-account true \
  --namespaces spinnaker # Update the 'namespaces' field with our namespace, if relevant
```

**Important: This will by default limit our Spinnaker to deploying to the `spinnaker` namespace. If we want to be able to deploy to other namespaces, either add a second cloud provider target or grant the `default` service account in our namespace permissions on additional namespaces and change the `--namespaces` flag.**

Use the Halyard `hal` command line tool to configure Halyard to install Spinnaker in our Kubernetes cluster

```bash
hal config deploy edit \
  --type distributed \
  --account-name spinnaker \
  --location spinnaker # Update the 'location' with our namespace, if relevant
```

# Enable Artifacts

Within Spinnaker, 'artifacts' are consumable references to items that live outside of Spinnaker, such as a file in a git repository or a file in an S3 bucket. The Artifacts feature must be explicitly turned on.

Enable the "Artifacts" feature, the new Artifact UI, and the "http" artifact provider:

```bash
hal config features edit --artifacts true
hal config features edit --artifacts-rewrite true
hal config artifact http enable
```

(In order to add specific types of artifacts, there are further configuration items that must be completed. For now, it is sufficient to just turn on the artifacts feature with the http artifact provider. This will allow Spinnaker to retrieve files via unauthenticated http.)

# Configure Spinnaker to use our Object storage bucket

Front50 will use an object storage bucket to store Application and Pipeline configuration (it also supports MySQL, which will be added later).  For the current iteration of this document, we'll use S3.

## Using S3 for Front50

Use the Halyard `hal` command line tool to configure Halyard to configure Spinnaker to use our S3 bucket

### S3 using an IAM User

If we created an IAM user, Front50 will use that IAM user (using an AWS access key and secret access key) to access our S3 bucket.

```bash
# Update these with the information from the bucket that we created
export BUCKET_NAME=spinnaker-abcxyz
export REGION=us-west-2
export ACCESS_KEY_ID=<access-key>

# This will prompt for the secret key
hal config storage s3 edit \
    --bucket ${BUCKET_NAME} \
    --access-key-id ${ACCESS_KEY_ID} \
    --secret-access-key \
    --region ${REGION}

hal config storage edit --type s3
```

### S3 using an IAM Instance Role

If we attached an IAM policy with access to S3 to the Kubernetes nodes where Spinnaker is running (basically, if our Front50 container can access S3 without explicit credentials), we don't have to provide the credentials:

```bash
# Update these with the information from the bucket that we created
export BUCKET_NAME=spinnaker-abcxyz
export REGION=us-west-2

# This will prompt for the secret key
hal config storage s3 edit \
    --bucket ${BUCKET_NAME} \
    --region ${REGION}

hal config storage edit --type s3
```

### If we want to use a specific folder in our S3 bucket

By default, Halyard will configure Spinnaker to use the folder `front50` in our S3 bucket. We can configure it to use a different folder with this command:

```bash
ROOT_FOLDER=not_front50
hal config storage s3 edit --root-folder ${ROOT_FOLDER}
```

# Set up Gate to listen on the `/api/v1` path

Create these two files (you may have to create several directories):

Create the file `/home/spinnaker/.hal/default/profiles/gate-local.yml`:

```yml
server:
  servlet:
    context-path: /api/v1
```

Create the file `/home/spinnaker/.hal/default/service-settings/gate.yml`:

```yml
healthEndpoint: /api/v1/health
```

We can copy/paste this to automatically create these two files:

```bash
mkdir -p /home/spinnaker/.hal/default/{profiles,service-settings}

tee /home/spinnaker/.hal/default/profiles/gate-local.yml <<-'EOF'
server:
  servlet:
    context-path: /api/v1
EOF

tee /home/spinnaker/.hal/default/service-settings/gate.yml <<-'EOF'
healthEndpoint: /api/v1/health
EOF
```

# Select the Spinnaker version to install

Before Halyard will install Spinnaker, we should specify the version of Spinnaker we want to use.

We can get a list of available versions of spinnaker with this command:

```bash
hal version list
```

_If we are installing Armory Spinnaker, we will get a version that starts with `2.x.x`_

_If we are installing OSS Spinnaker and using `gcr.io/spinnaker-marketplace/halyard:stable`, we will get a version that starts with `1.x.x`_

And then we can select the version with this:

```bash
# Replace with version of choice:
export VERSION=$(hal version latest -q)
echo ${VERSION}
hal config version edit --version $VERSION
```

# Install Spinnaker

Now that our halconfig is completely configured for the initial Spinnaker, we can tell Halyard to actually install Spinnaker:

```bash
hal deploy apply --wait-for-completion
```

Once this is complete, congratulations! Spinnaker is installed. Now we have to access and expose it.

## Connect to Spinnaker using `kubectl port-forward`

If we have kubectl on a local machine with access to our Kubernetes cluster, we can test the status of our Spinnaker instance by doing a port-forward:

First, tell Spinnaker about its local endpoint for localhost:9000/api/v1:

```bash
hal config security api edit --override-base-url http://localhost:9000/api/v1

hal deploy apply --wait-for-completion
```

Wait for the pods to stand up.  Then set up two port forwards:

```bash
NAMESPACE=spinnaker
kubectl -n ${NAMESPACE} port-forward svc/spin-deck 9000 &
kubectl -n ${NAMESPACE} port-forward svc/spin-gate 8084 &
```

Then, we can access Spinnaker at <http://localhost:9000>

(If we are doing this on a remote machine, this will not work because our browser attempts to access localhost on our local workstation rather than on the remote machine where the port is forwarded)

__Note:__ Even if the `hal deploy apply` command returns successfully, the
installation may not be complete yet. This is especially the case with
distributed Kubernetes installs. If we see errors such as `Connection refused`,
the containers may not be available yet. We can either wait
or check the status of all of the containers using the command for our cloud provider
(such as `kubectl get pods --namespace spinnaker`).

# Ingress

There are a number of ways to expose Spinnaker, but basically there are these requirements:

* Given a domain name (or IP address) (such as spinnaker.domain.com or 55.55.55.55)
* We should be able to reach the `spin-deck` service at the root of the domain (http://spinnaker.domain.com or http://55.55.55.55)
* We should be able to reach the `spin-gate` service at the root of the domain (http://spinnaker.domain.com/api/v1 or http://55.55.55.55/api/v1)
* We can use either http or https, as long as we use the same for both
* We have to configure Spinnaker to be aware of its endpoints

This section details how to do so with the NGINX ingress controller.

## Install the NGINX ingress controller

In order to expose Spinnaker to end users, we have perform the following actions:

* Expose the spin-deck (UI) Kubernetes service on some URL endpoint
* Expose the spin-gate (API) Kubernetes service on some URL endpoint
* Update Spinnaker (via Halyard) to be aware of the new endpoints

**If we already have an ingress controller, use that ingress controller instead.  We can check for the existence of the Nginx Ingress Controller by running `kubectl get ns` and looking for a namespace called `ingress-nginx`; if it exists, we likely already have an Nginx Ingress Controller running in our cluster**

We're going to install the NGINX ingress controller on AWS (this uses the Layer 4 ELB, as indicated in the NGINX ingress controller [documentation](https://github.com/kubernetes/ingress-nginx/blob/master/docs/deploy/index.md#aws) - we can use other NGINX ingress controller configurations such as the Layer 7 load balancer per our organization's ingress policy.)

(Both of these are configurable with Spinnaker, but the NGINX ingress controller is also generally much more configurable)

From the `workstation machine` (where `kubectl` is installed):

Install the NGINX ingress controller components:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml
```

Install the NGINX ingress controller AWS-specific service:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/aws/service-l4.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/aws/patch-configmap-l4.yaml
```

## Set up an Ingress for `spin-deck` and `spin-gate`

Get the external IP for the NGINX ingress controller:

```
kubectl get svc -n ingress-nginx
```

We'll get a DNS name or IP address in the `EXTERNAL-IP` field.

If we stood up a new NGINX ingress controller, we can likely just use this value (IP address or DNS name) for our ingress.

For example, if I get `abcd1234abcd1234abcd1234abcd1234-123456789.us-west-2.elb.amazonaws.com`, then I can do the following:
* Use `abcd1234abcd1234abcd1234abcd1234-123456789.us-west-2.elb.amazonaws.com` for my SPINNAKER_ENDPOINT in the below steps

For example, if I get `55.55.55.55`, then I can do the following:
* Use ``55.55.55.55` for my SPINNAKER_ENDPOINT in the below steps

If we are using an existing NGINX ingress controller, or other services are likely to be using the same NGINX ingress controller, we should create a DNS entry that points at our NGINX ingress controller endpoint. (either a `CNAME Record` that points at the DNS name, or an `A Record` that points at the IP address).

For example, if I get `abcd1234abcd1234abcd1234abcd1234-123456789.us-west-2.elb.amazonaws.com`, then I can do the following:
* Create a CNAME pointing `spinnaker.domain.com` at `abcd1234abcd1234abcd1234abcd1234-123456789.us-west-2.elb.amazonaws.com`
* Put `spinnaker.domain.com` in the `host` field in the below manifest (and uncomment it)
* Use `spinnaker.domain.com` for my SPINNAKER_ENDPOINT in the below steps
* (Alternately, for testing, create an `/etc/hosts` entry pointing spinnaker.domain.com at the IP address that `abcd1234abcd1234abcd1234abcd1234-123456789.us-west-2.elb.amazonaws.com` resolves to)

If I get `55.55.55.55`, then I can do the following:
* Create an A Record pointing `spinnaker.domain.com` at `55.55.55.55`
* Put `spinnaker.domain.com` in the `host` field in the below manifest (and uncomment it)
* Use `spinnaker.domain.com` for my SPINNAKER_ENDPOINT in the below steps
* (Alternately, for testing, create an `/etc/hosts` entry pointing `spinnaker.domain.com` at `55.55.55.55`)

Create a Kubernetes Ingress manifest to expose spin-deck and spin-gate (change our hosts and namespace accordingly):

Call this file `spin-ingress.yml`

```bash
---
apiVersion: networking.k8s.io/v1
kind: Ingress
metadata:
  name: spin-ingress
  labels:
    app: spin
    cluster: spin-ingress
  annotations:
    kubernetes.io/ingress.class: "nginx"
spec:
  rules:
  - 
    # host: spinnaker.some-url.com
    # ^ If we have other things running in our cluster, we should uncomment this line and specify a valid DNS name
    http:
      paths:
      - backend:
          serviceName: spin-deck
          servicePort: 9000
        path: /
      - backend:
          serviceName: spin-gate
          servicePort: 8084
        path: /api/v1
```

Apply the Ingress

```bash
kubectl -n spinnaker apply -f spin-ingress.yml
```

## Configure Spinnaker to be aware of its endpoints

Spinnaker must be aware of its endpoints to work properly.

This should be done from the inside halyard container (`kubectl -n spinnaker exec -it halyard-0 bash` to get back in):

```bash
SPINNAKER_ENDPOINT=http://spinnaker.domain.com
# ^ Replace this with the IP address or DNS that points to our nginx ingress instance

hal config security ui edit --override-base-url ${SPINNAKER_ENDPOINT}
hal config security api edit --override-base-url ${SPINNAKER_ENDPOINT}/api/v1

hal deploy apply
```

## Configuring TLS Certificates

Configuration of TLS certificates for ingresses is often very environment-specific. In general, we would want to do the following:

* Add certificate(s) so that our ingress controller can use them
* Configure the ingress(es) so that NGINX (or our ingress) terminates TLS using the certificate(s)
* Update Spinnaker to be aware of the new TLS endpoints (note `https` instead of `http`)

  ```bash
  SPINNAKER_ENDPOINT=https://spinnaker.domain.com

  hal config security ui edit --override-base-url ${SPINNAKER_ENDPOINT}
  hal config security api edit --override-base-url ${SPINNAKER_ENDPOINT}/api/v1

	hal deploy apply
  ```

# Next Steps

Now that we have Spinnaker up and running, here are some of the next things we may want to do:

* Configuration of certificates to secure our cluster (see [this section](#configuring-tls-certificates) for notes on this)
* Configuration of Authentication/Authorization (see the [Open Source Spinnaker documentation](https://www.spinnaker.io/setup/security/))
* Add Kubernetes accounts to deploy applications to (see [this KB article](https://kb.armory.io/installation/spinnaker-add-kubernetes/))
* Add GCP accounts to deploy applications to (see the [Open Source Spinnaker documentation](https://www.spinnaker.io/setup/install/providers/gce/))
* Add AWS accounts to deploy applications to (see the [Open Source Spinnaker documentation](https://www.spinnaker.io/setup/install/providers/aws/))
