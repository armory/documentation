---
layout: post
title: Installing Spinnaker in AWS (with Halyard in-cluster)
order: 22
published: true
redirect_from:
  - /spinnaker_install_admin_guides/install_on_eks-halyard-pod/
  - /spinnaker_install_admin_guides/install-on-eks-halyard-pod/
  - /spinnaker-install-admin-guides/install_on_eks_halyard_pod/
  - /spinnaker-install-admin-guides/install-on-eks_halyard_pod/
  - /spinnaker-install-admin-guides/install-on-aws-halyard-pod/
  - /spinnaker_install_admin_guides/install_on_aws_halyard_pod/
  - /spinnaker_install_admin_guides/install-on-aws-halyard-pod/
---

This guide describes how to install Spinnaker in AWS or in an on-prem Kubernetes cluster with access to S3. It will create and use the following Amazon Web Services resources:

- A Kubernetes cluster running on Amazon Web Services (AWS). EKS is a good way to get a Kubernetes cluster up on AWS - see the AWS documentation for this.
- An Amazon S3 (Simple Storage Service) bucket. You can use an existing one or create a new one.
- An NGINX Ingress controller in your AWS cluster.

This document currently does not fully cover the following (see [Next Steps](#next-steps) for some links to achieve these)

- TLS Encryption
- Authentication/Authorization
- Add K8s accounts to deploy to
- Add cloud accounts to deploy to

Note: This document is focused on Armory Spinnaker, but can be adapted to install Open Source Spinnaker by using a different Halyard container and a corresponding different Spinnaker version

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Assumptions / Prerequisites / Environments

This document assumes the following:

- You have a Kubernetes cluster up and running, with the following:

  - You can access the Kubernetes API. If using EKS, either your user/role created the EKS cluster or your user/role has been added to the `aws-auth` configmap in the EKS cluster. See the [AWS documentation](https://docs.aws.amazon.com/eks/latest/userguide/add-user-role.html) for more details.
  - At least 2x worker nodes, each with at least 2 vCPUs and 4 GiB of memory. This is the bare minimum to install and run Spinnaker. If you're deploying more intermittent test workloads you will likely need more).

- You have access to an S3 bucket or access to create an S3 bucket

- You have access to an IAM role or user with access to the S3 bucket or can create an IAM role or user with access to the S3 bucket.

This document is written with the following workflow in mind:

- You have access to the EKS cluster, with `kubectl` configured and able to access the cluster, from your workstation
- Halyard (the Spinnaker installer) will be run in the EKS cluster as a statefulset, with a single Kubernetes PersistentVolumeClaim

Furthermore:

- You will create AWS resources, such as service accounts, that will be permanently associated with your Spinnaker cluster

# Installation Summary

In order to install Spinnaker, this document covers the following things:

- Creating a Kubernetes namespace to install everything in
- Creating a Kubernetes service account with access to the namespace
- Running Halyard (the Spinnaker installer) in the namespace
- Creating an S3 bucket for Spinnaker to store persistent configuration in
- Creating an IAM user that Spinnaker will use to access the S3 bucket (or alternately, granting access to the bucket via IAM roles)

- Running the `hal` client interactively in the same Docker container, to:

  - Build out the halconfig YAML file (`.hal/config`)
  - Configure Spinnaker with the IAM credentials and bucket information
  - Turn on other recommended settings (artifacts and http artifact provider)
  - Install Spinnaker
  - Expose Spinnaker

# Connect to the Kubernetes cluster

Spinnaker needs a credential to talk to Kubernetes, so you must create a service account in your Kubernetes cluster.

## Connecting to an EKS cluster

If you're using an EKS cluster, you must be able to connect to the EKS cluster. This assumes you have already configured the `aws` CLI with credentials and a default region / availability zone (see installation directions [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) and configuration directions [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html))

1. Create the local working directory on your workstation. For the purposes of this document, we will be using `~/aws-spinnaker`, but this can be any persistent directory on any Linux or OSX machine.

	```bash
	mkdir ~/aws-spinnaker
	cd ~/aws-spinnaker
	```

2. If you have access to the role that created the EKS cluster, you can create a kubeconfig with access to your Kubernetes cluster with this command:

	```bash
	aws eks update-kubeconfig --name <EKS_CLUSTER_NAME> --kubeconfig kubeconfig-aws
	```

3. From here, you can validate access to the cluster with this command:

	```bash
	kubectl --kubeconfig kubeconfig-aws get namespaces
	```

## Connecting to other Kubernetes clusters

If you've stood up Kubernetes on AWS with KOPS or another Kubernetes tool, ensure that you can communicate with your Kubernetes cluster with kubectl.

Then, copy your `kubeconfig` file (this is typically located in `~/.kube/config`) to your working directory:

	```bash
	cp ~/.kube/config ~/aws-spinnaker/kubeconfig-aws
	```

# Create a `kubeconfig` file for Halyard/Spinnaker

Spinnaker will be installed in its own namespace in your EKS or AWS-hosted Kubernetes cluster. For the purposes of this document, we will be installing Spinnaker in the `spinnaker-system` namespace; you're welcome to use a different namespace for this.

We're going to create the following:

- A namespace called `spinnaker` to install Spinnaker in
- A service account for that namespace
- A role and rolebinding in that namespace, granting permissions to the service account

# Create the S3 Bucket and Credentials

If you do not yet have an S3 bucket, create the S3 bucket:

1. Log into the AWS Console (web UI)
2. Navigate to the S3 Console (Click on "Services" at the top, and then on "S3" under "Storage")
3. Click on "Create Bucket"
4. Specify a globally unique name for this bucket, in your AWS region of choice, following your organization's naming convention (if applicable). For this document, we will use, `spinnaker-jq6cqvmpro`.
5. Click "Next"
6. Select the following two checkboxes:

     * Keep all versions of an object in the same bucket
     * Automatically encrypt objects when they are stored in S3

7. Click "Next"

8. Do not add any additional permissions, unless specified by your organization. Click "Next"

9. Click "Create bucket"

Spinnaker (the `front50` service, specifically) will need access to your newly-created bucket. There are a number of ways to achieve this. This document describes two mechanisms to do this.

By default, Spinnaker will store all Spinnaker information in a folder called `front50` in your bucket. You can optionally specify a different directory (for example, if you're using a pre-existing or shared S3 bucket).

## Create an IAM user, using an inline policy

You can create an IAM user with credentials, and provide that to Spinnaker via Halyard

1. Log into the AWS Console (Web UI)
2. Navigate to the IAM Console (Click on "Services" at the top, and then on "IAM" under "Security, Identity, & Compliance")
3. Click on "Users" on the left
4. Click on "Add user"
5. Give your user a distinct name, per your organization's naming conventions. For this document, we will use `s3-spinnaker-abcxyz`
6. Click on "Programmatic access"
7. We will not be adding a distinct policy to this user. Click on "Next: Tags". _You may receive a warning about how there are no policies attached to this user - this warning can be ignored._
8. Optionally, add tags, then click on "Next: Review"
9. Click "Create user"
10. Save the Access Key ID and Secret Access Key - these will be used later, during Halyard configuration
11. Click "Close"

Then, add an inline policy to your IAM user:

1. Click on your newly-created IAM user
2. Click on "Add inline policy" (on the right)
3. Click on the "JSON" tab
4. Add this text (replace `s3-spinnaker-abcxyz` with the name of your bucket)

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

6. Give your inline policy some name. For example `s3-spinnaker-abcxyz`

7. Click "Create Policy"

## Create an IAM policy attached to the Kubernetes nodes, using an inline policy

Alternately, you can attach an IAM policy to the role attached to your Kubernetes nodes.

1. Log into the AWS Console (Web UI)
2. Navigate to EC2 (Click on "Services" at the top, and then on "EC2" under "Compute")
3. Click on one of your Kubernetes nodes
4. In the bottom section, look for "IAM role" and click on the role
5. Click on "Add inline policy" (on the right)
6. Click on the "JSON" tab
7. Add this text (replace `s3-spinnaker-abcxyz` with the name of your bucket)

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

9. Give your inline policy some name. For example `s3-spinnaker-abcxyz`

10. Click "Create Policy"

# Start the Halyard container

Halyard is a tool used to install Spinnaker (it generates Kubernetes manifests for each of the Spinnaker services).  First, create a namespace for Spinnaker to run in:

```bash
# Feel free to use a different namespace for this
kubectl create ns spinnaker
```
You can use this manifest to install and run Halyard (call the file `halyard.yml`)

```yml
# halyard.yml
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
          mountPath: /home/spinnaker/.hal
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

Apply (create) the resources:

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

# Also, once in the container, you can run these commands for a friendlier environment to:
# - prompt with information
# - alias for ls
# - cd to the home directory
export PS1="\h:\w \u\$ "
alias ll='ls -alh'
cd ~
```

# Configure Spinnaker to install in Kubernetes

Inside the container, use the Halyard `hal` command line tool to add a Kubernetes account using your minified kubeconfig

Configure the kubeconfig:

```bash
hal config provider kubernetes enable
```

Next, configure the account:

```bash
hal config provider kubernetes account add spinnaker \
  --provider-version v2 \
  --only-spinnaker-managed true \
  --service-account true \
  --namespaces spinnaker # Update the 'namespaces' field with your namespace, if relevant
```

**Important: This will by default limit your Spinnaker to deploying to the `spinnaker` namespace. If you want to be able to deploy to other namespaces, either add a second cloud provider target or grant the `default` service account in your namespace permissions on additional namespaces and change the `--namespaces` flag.**

Use the Halyard `hal` command line tool to configure Halyard to install Spinnaker in your Kubernetes cluster

```bash
hal config deploy edit \
  --type distributed \
  --account-name spinnaker \
  --location spinnaker # Update the 'location' with your namespace, if relevant
```

# Enable Artifacts

Within Spinnaker, 'artifacts' are consumable references to items that live outside of Spinnaker, such as a file in a git repository or a file in an S3 bucket. The Artifacts feature must be explicitly turned on.

Enable the "Artifacts" feature and the "http" artifact provider:

```bash
hal config features edit --artifacts true
hal config features edit --artifacts-rewrite true
hal config artifact http enable
```

(In order to add specific types of artifacts, there are further configuration items that must be completed. For now, it is sufficient to just turn on the artifacts feature with the http artifact provider. This will allow Spinnaker to retrieve files via unauthenticated http.)

# Configure Spinnaker to use your S3 bucket

Use the Halyard `hal` command line tool to configure Halyard to configure Spinnaker to use your S3 bucket

## If you are using an IAM user

```bash
# Update these with the information from the bucket that you created
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

## If you are using the IAM instance roles

```bash
# Update these with the information from the bucket that you created
export BUCKET_NAME=spinnaker-abcxyz
export REGION=us-west-2

# This will prompt for the secret key
hal config storage s3 edit \
    --bucket ${BUCKET_NAME} \
    --region ${REGION}

hal config storage edit --type s3
```

## If you want to use a specific folder in the bucket

By default, Halyard will configure Spinnaker to use the folder `front50` in your S3 bucket. You can configure it to use a different folder with this command:

```bash
ROOT_FOLDER=not_front50
hal config storage s3 edit --root-folder ${ROOT_FOLDER}
```

# Set up Gate to listen on the `/api/v1` path

Create these files:

`/home/spinnaker/.hal/default/profiles/gate-local.yml`
```yml
server:
  servlet:
    context-path: /api/v1
```

`/home/spinnaker/.hal/default/service-settings/gate.yml`
```yml
healthEndpoint: /api/v1/health
```

You can run this to automatically create these two files:

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

# Choose the Spinnaker version

Before Halyard will install Spinnaker, you should specify the version of Spinnaker you want to use.

You can get a list of available versions of spinnaker with this command:

```bash
hal version list
```

_If you are installing Armory Spinnaker, you will get a version that starts with `2.x.x`_

_If you are installing OSS Spinnaker and using `gcr.io/spinnaker-marketplace/halyard:stable`, you will get a version that starts with `1.x.x`_

And then you can select the version with this:

```bash
# Replace with version of choice:
export VERSION=$(hal version latest -q)
echo ${VERSION}
hal config version edit --version $VERSION
```

# Install Spinnaker

Now that your halconfig is completely configured for the initial Spinnaker, you can tell Halyard to actually install Spinnaker:

```bash
hal deploy apply --wait-for-completion
```

Once this is complete, congratulations! Spinnaker is installed. Now we have to access and expose it.

## Connect to Spinnaker using `kubectl port-forward`

If you have kubectl on a local machine with access to your Kubernetes cluster, you can test the status of your Spinnaker instance by doing a port-forward:

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

Then, you can access Spinnaker at <http://localhost:9000>

(If you are doing this on a remote machine, this will not work because your browser attempts to access localhost on your local workstation rather than on the remote machine where the port is forwarded)

__Note:__ Even if the `hal deploy apply` command returns successfully, the
installation may not be complete yet. This is especially the case with
distributed Kubernetes installs. If you see errors such as `Connection refused`,
the containers may not be available yet. You can either wait
or check the status of all of the containers using the command for your cloud provider
(such as `kubectl get pods --namespace spinnaker`).

# Ingress

There are a number of ways to expose Spinnaker, but basically there are these requirements:

* Given a domain name (or IP address) (such as spinnaker.domain.com or 55.55.55.55)
* You should be able to reach the `spin-deck` service at the root of the domain (http://spinnaker.domain.com or http://55.55.55.55)
* You should be able to reach the `spin-gate` service at the root of the domain (http://spinnaker.domain.com/api/v1 or http://55.55.55.55/api/v1)
* You can use either http or https, as long as you use the same for both
* You have to configure Spinnaker to be aware of its endpoints

This section details how to do so with the NGINX ingress controller.

## Install the NGINX ingress controller

In order to expose Spinnaker to end users, you have perform the following actions:

- Expose the spin-deck (UI) Kubernetes service on some URL endpoint
- Expose the spin-gate (API) Kubernetes service on some URL endpoint
- Update Spinnaker (via Halyard) to be aware of the new endpoints

**If you already have an ingress controller, use that ingress controller instead.  You can check for the existence of the Nginx Ingress Controller by running `kubectl get ns` and looking for a namespace called `ingress-nginx`; if it exists, you likely already have an Nginx Ingress Controller running in your cluster**

We're going to install the NGINX ingress controller on AWS (this uses the Layer 4 ELB, as indicated in the NGINX ingress controller [documentation](https://github.com/kubernetes/ingress-nginx/blob/master/docs/deploy/index.md#aws) - you can use other NGINX ingress controller configurations such as the Layer 7 load balancer per your organization's ingress policy.)

(Both of these are configurable with Spinnaker, but the NGINX ingress controller is also generally much more configurable)

From the `workstation machine` (where `kubectl` is installed):

Install the NGINX ingress controller components:

```bash
kubectl --kubeconfig kubeconfig-aws apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml
```

Install the NGINX ingress controller AWS-specific service:

```bash
kubectl --kubeconfig kubeconfig-aws apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/aws/service-l4.yaml
kubectl --kubeconfig kubeconfig-aws apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/aws/patch-configmap-l4.yaml
```

## Set up an Ingress for `spin-deck` and `spin-gate`

Get the external IP for the NGINX ingress controller:

```
kubectl get svc -n ingress-nginx
```

You'll get a DNS name or IP address in the `EXTERNAL-IP` field.

If you stood up a new NGINX ingress controller, you can likely just this value (IP address or DNS name) for your ingress.

For example, if I get `abcd1234abcd1234abcd1234abcd1234-123456789.us-west-2.elb.amazonaws.com`, then I can do the following:
* Use `abcd1234abcd1234abcd1234abcd1234-123456789.us-west-2.elb.amazonaws.com` for my SPINNAKER_ENDPOINT in the below steps

For example, if I get `55.55.55.55`, then I can do the following:
* Use ``55.55.55.55` for my SPINNAKER_ENDPOINT in the below steps

If you are using an existing NGINX ingress controller, or other services are likely to be using the same NGINX ingress controller, you should create a DNS entry that points at your NGINX ingress controller endpoint. (either a `CNAME Record` that points at the DNS name, or an `A Record` that points at the IP address).

For example, if I get `abcd1234abcd1234abcd1234abcd1234-123456789.us-west-2.elb.amazonaws.com`, then I can do the following:
* Create a CNAME pointing `spinnaker.domain.com` at `abcd1234abcd1234abcd1234abcd1234-123456789.us-west-2.elb.amazonaws.com`
* Put `spinnaker.domain.com` in the `host` field in the below manifest (and uncomment it)
* Use `spinnaker.domain.com` for my SPINNAKER_ENDPOINT in the below steps
* (Alternately, for testing, create an `/etc/hosts` entry pointing spinnaker.domain.com at the IP address that `abcd1234abcd1234abcd1234abcd1234-123456789.us-west-2.elb.amazonaws.com` resolves to)

If I get `55.55.55.55`, then I can do the following:
* Create n A Record pointing `spinnaker.domain.com` at `55.55.55.55`
* Put `spinnaker.domain.com` in the `host` field in the below manifest (and uncomment it)
* Use `spinnaker.domain.com` for my SPINNAKER_ENDPOINT in the below steps
* (Alternately, for testing, create an `/etc/hosts` entry pointing `spinnaker.domain.com` at `55.55.55.55`)

Create a Kubernetes Ingress manifest to expose spin-deck and spin-gate (change your hosts and namespace accordingly):

```bash
tee spin-ingress.yaml <<-'EOF'
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
    # ^ If you have other things running in your cluster, you should uncomment this line and specify a valid DNS name
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
EOF
```

Create the Ingress

```bash
kubectl -n spinnaker apply -f spin-ingress.yaml
```

## Configure Spinnaker to be aware of its endpoints

Spinnaker must be aware of its endpoints to work properly.

This should be done from the halyard container:

```bash
SPINNAKER_ENDPOINT=http://spinnaker.domain.com
# ^ Replace this with the IP address or DNS that points to your nginx ingress instance

hal config security ui edit --override-base-url ${SPINNAKER_ENDPOINT}
hal config security api edit --override-base-url ${SPINNAKER_ENDPOINT}/api/v1

hal deploy apply
```

## Configuring TLS Certificates

Configuration of TLS certificates for ingresses is often very environment-specific. In general, you would want to do the following:

- Add certificate(s) so that your ingress controller can use them
- Configure the ingress(es) so that NGINX (or your ingress) terminates TLS using the certificate(s)
- Update Spinnaker to be aware of the new TLS endpoints (note `https` instead of `http`)

	```bash
	SPINNAKER_ENDPOINT=spinnaker.some-url.com
	SPIN_DECK_URL=https://${SPINNAKER_ENDPOINT}
	SPIN_GATE_URL=https://${SPINNAKER_ENDPOINT}/api/v1

	hal config security ui edit --override-base-url ${SPIN_DECK_URL}
	hal config security api edit --override-base-url ${SPIN_GATE_URL}

	hal deploy apply
	```

# Next Steps

Now that you have Spinnaker up and running, here are some of the next things you may want to do:

- Configuration of certificates to secure your cluster (see [this section](#configuring-tls-certificates) for notes on this)
- Configuration of Authentication/Authorization (see the [Open Source Spinnaker documentation](https://www.spinnaker.io/setup/security/))
- Add Kubernetes accounts to deploy applications to (see [this KB article](https://kb.armory.io/installation/spinnaker-add-kubernetes/))
- Add GCP accounts to deploy applications to (see the [Open Source Spinnaker documentation](https://www.spinnaker.io/setup/install/providers/gce/))
- Add AWS accounts to deploy applications to (see the [Open Source Spinnaker documentation](https://www.spinnaker.io/setup/install/providers/aws/))
