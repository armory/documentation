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

This guide describes how to install Spinnaker in Kubernetes.  It assumes that you have the following:

* A Kubernetes cluster with storage set up so that PersistentVolumeClaims properly allocates PersistentVolumes
* Access to an object storage bucket (Amazon S3, Google GCS, Azure Storage, or Minio are all options for this).  _For the initial version of this document, **only** Amazon S3 is covered._
* A Kubernetes Ingress controller or permissions to install the NGINX Ingress Controller

This document currently does not fully cover the following:

* TLS Encryption
* Authentication/Authorization
* Add K8s accounts to deploy to
* Add cloud accounts to deploy to

See [Next Steps](#next-steps) for information related to these topics.

Note: This document focuses on Armory Spinnaker but can be adapted to install Open Source Spinnaker by using a different Halyard container and a corresponding different Spinnaker version.

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Assumptions / Prerequisites / Environments

This document assumes the following:

* Your Kubernetes cluster is up and running with at least 4 CPUs and 12 GB of memory.  This is the bare minimum to install and run Spinnaker; depending on our Spinnaker workload, you may need more resources.
* You have `kubectl` installed and are able to access and create Kubernetes resources.
* You have access to an object storage bucket or the ability to create an object storage bucket.  _For the initial version of this document, **only** Amazon S3 is used._ 
* You have access to an IAM role or user with access to the S3 bucket. If neither of these exist, you need to create an IAM role or user with access to the S3 bucket.

This document is written with the following workflow in mind:

* We have access to the Kubernetes API, with `kubectl` configured and able to access the cluster, from our workstation
* We will create a Kubernetes namespace where we will run both Halyard (the Spinnaker installer) and Spinnaker
* In our namespace, we will grant the `default` Kubernetes ServiceAccount the `cluster-admin` ClusterRole (which will give it full permissions within our namespace, but not on other namespaces; for details, see the [Kubernetes RBAC documentation](https://kubernetes.io/docs/reference/access-authn-authz/rbac/))
* In our namespace, we will create a PVC (PersistentVolumeClaim), which will be used for persistent Spinnaker cluster configuration (the "halyard configuration" or "halconfig")
* In our namespace, we will create a StatefulSet to run Halyard (the Spinnaker "installer").  The PVC will be mounted to this StatefulSet.
* Halyard will use the `default` Kubernetes ServiceAccount to create and modify resources running the cluster (the Kubernetes Secrets, Deployments, and Services that make up Spinnaker)
* The Spinnaker microservice called "Clouddriver", which interacts with our various clouds (including Kubernetes), will also use the `default` ServiceAccount to interact with Kubernetes

In addition to the above, these instructions sets up the Spinnaker microservice called "Front50", which stores Spinnaker Application and Pipeline configuration to an object store, with the following permission:

* Front50 has full access to an S3 bucket through either an IAM user (with an AWS access key and secret access key) or an IAM role (attached to your Kubernetes cluster).

At the end of this guide, you have a Spinnaker deployment that is:

* Accessible from your browser
* Able to deploy other Kubernetes resources to the namespace where it runs but not to any other namespace

## Installation Summary

This guide describes how to perform the following tasks to install Spinnaker:

* Creating a Kubernetes namespace (for Spinnaker and Halyard).  This guide uses the namespace `spinnaker`, but you can use any namespace.
* Granting the `default` ServiceAccount in the namespace access to the `cluster-admin` ClusterRole **in the namespace**.
* Running Halyard (the Spinnaker installer) as a Kubernetes Pod in the namespace (using a StatefulSet).
* Creating an S3 bucket for Spinnaker to store persistent configuration in.
* Creating an IAM user that Spinnaker will use to access the S3 bucket (or alternately, granting access to the bucket via IAM roles).
* Running the `hal` client interactively in the Kubernetes Pod, to:
  * Build out the `hal` config YAML file (`.hal/config`)
  * Configure Spinnaker with the IAM credentials and bucket information
  * Turn on other recommended settings (artifacts and http artifact provider)
  * Install Spinnaker
  * Expose Spinnaker

## Connect to the Kubernetes cluster

You must be able to connect to the Kubernetes cluster with `kubectl`.  Depending on the type of your Kubernetes cluster, there are a number of ways of achieving this.

### Connecting to an AWS EKS cluster

If you use an AWS EKS cluster, you must be able to deploy resources to it. Before you start this section, make sure you have configured the `aws` CLI with credentials and a default region / availability zone. For more information, see the `aws` [installation directions](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) and [configuration directions](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)).  Armory recommends using the V2 version of the AWS CLI.

If you have access to the role that created the EKS cluster, update your kubeconfig with access to the Kubernetes cluster using this command:

```bash
aws eks update-kubeconfig --name <EKS_CLUSTER_NAME>
```

From here, validate access to the cluster with this command: 

```bash
kubectl get namespaces
```

The command returns the namespaces in the EKS cluster.

### Connecting to other Kubernetes clusters

If you created a Kubernetes on AWS with KOPS or another Kubernetes tool, ensure that you can communicate with the Kubernetes cluster with `kubectl`:

```bash
kubectl get namespaces
```

The command returns the namespaces in the EKS cluster.

## Start the Halyard StatefulSet

Halyard is a Docker image used to install Spinnaker. It generates Kubernetes manifests for each of the Spinnaker services.  This guide explains how to run it in a Kubernetes cluster as a StatefulSet with one (1) Pod.

First, create a namespace for Spinnaker to run in (this can be any namespace):

```bash
kubectl create ns spinnaker
```

Create a file called `halyard.yml` that contains the following:

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

* A Kubernetes Rolebinding that grants the `default` ServiecAccount access to the full namespace. This is used by both Halyard and Clouddriver.
* A PersistentVolumeClaim used for persistent Halyard configuration.
* A StatefulSet using the PVC which runs the Halyard Pod.

Apply (create) the resources **in your namespace**: 

```bash
kubectl -n spinnaker apply -f halyard.yml
```

Change `spinnaker` to a different namespace if you're using a different namespace.

Check the status of the pod and wait until all the pods are running:

```bash
kubectl -n spinnaker get pods
```

If you run into issues, such as the pods getting evicted, see the Kubernetes documentation for troubleshooting tips.

## Enter the Halyard container

The majority of tasks you need to perform need to be done the Halyard container.  Use the following command to enter the container:

```bash
kubectl -n spinnaker exec -it halyard-0 bash
```

Once inside the container, customize the environment with a minimal `.bashrc` like this:

```bash
tee -a /home/spinnaker/.bashrc <<-EOF
export PS1="\h:\w \$ "
alias ll='ls -alh'
cd /home/spinnaker
EOF

source /home/spinnaker/.bashrc
```

## Configure Spinnaker to install in Kubernetes

Inside the container, use the Halyard `hal` command line tool to enable the Kubernetes cloud provider:

```bash
hal config provider kubernetes enable
```

Next, configure a Kubernetes account called `spinnaker`:  

```bash
hal config provider kubernetes account add spinnaker \
  --provider-version v2 \
  --only-spinnaker-managed true \
  --service-account true \
  --namespaces spinnaker 
  # Update the 'namespaces' field with your namespace if using a different namespace
```
This command uses the ServiceAccount associated with Halyard and Clouddriver, the `default` service account in this case.

Once you create an account (with `account add`), you can _edit_ it by running the command with `edit` instead of `add`. Use the same flags.  

For example, if you need to support multiple namespaces, you can run the following:

```bash
hal config provider kubernetes account edit spinnaker \
  --namespaces spinnaker,dev,stage,prod 
  # Make sure to include all namespace you need to support
```

**Important: These commands and parameters limit Spinnaker to deploying to the `spinnaker` namespace. If you want to deploy to other namespaces, either add a second cloud provider target or grant the `default` service account in your namespace permissions on additional namespaces and change the `--namespaces` flag.**

Use the Halyard `hal` command line tool to configure Halyard to install Spinnaker in your Kubernetes cluster

```bash
hal config deploy edit \
  --type distributed \
  --account-name spinnaker \
  --location spinnaker 
  # Update the 'location' parameter with your namespace, if relevant
```

## Enable and configure the 'Artifact' Feature

Within Spinnaker, 'artifacts' are consumable references to items that live outside of Spinnaker, such as a file in a git repository or a file in an S3 bucket. The Artifacts feature must be explicitly turned on.

The following commands enable the "Artifacts" feature, the new Artifact UI, and the "http" artifact provider:

```bash
hal config features edit --artifacts true
hal config features edit --artifacts-rewrite true
hal config artifact http enable
```

Although enabling the new Artifacts UI is optional, Armory recommends using it for better user experience. 

In order to add specific types of artifacts, additional configuration must be completed. For now though, it is sufficient to turn on the artifacts feature with the `http` artifact provider. This allows Spinnaker to retrieve files using unauthenticated http.

## Configure application and pipeline configuration storage

The Spinnaker microservice Front50 requires a backing store to store Spinnaker Application and Pipeline Definitions.  There are a number of options for this:

* Amazon S3 Bucket
* Google Cloud Storage (GCS) Bucket
* Azure Storage Bucket
* Minio
* MySQL

**You _must_ set up a backing store for Spinnaker to use for persistent application and pipeline configuration.**

### Using S3 for Front50

Spinnaker (the `Front50` service, specifically) needs access to an S3 bucket. There are a number of ways to achieve this.

This section describes how to do the following:
* Create an S3 bucket
* Configure access to the bucket:
  * (Option 1) Add an IAM Policy to an IAM Role, granting access to the S3 bucket
  * (Option 2) Create an IAM User with access to the S3 bucket
* Configure Spinnaker to use the IAM User or Role to access the S3 bucket

<details><summary><b>Click to expand</b></summary>

<details><summary>Creating an S3 bucket</summary>

<p>If you do not have an S3 bucket, create an S3 bucket.</p>

<p>By default, Spinnaker stores all Spinnaker information in a folder called <code>front50</code> in your bucket. Optionally, you can specify a different directory. You might want to do this if you're using an existing or shared S3 bucket..</p>

<p>Perform the following steps:
<ol>
 <li>Log into the AWS Console (web UI).</li>
 <li>Navigate to the S3 Console. Click on **Services** > **Storage** > **S3**.</li>
 <li>Click on **Create Bucket**.</li>
 <li>Specify a globally unique name for this bucket in your AWS region of choice. If your organization has a standard naming convention, follow it. For its examples, this guide uses <code>spinnaker-abcxyz</code>.</li>
 <li>Click **Next**.</li>
 <li>Select the following two checkboxes:
    <ul>
      <li>Keep all versions of an object in the same bucket</li>
      <li>Automatically encrypt objects when they are stored in S3</li>
    </ul>
  </li>
 <li>Click **Next**.</li>
 <li>Do not add any additional permissions unless required by your organization. Click **Next**.</li>
 <li>Click **Create bucket**.</li>
</ol>

</details>

<details><summary>(Option 1) S3 using the IAM Policy/Role</summary>

<p>First, identify the role attached to your Kubernetes instance and attach an inline IAM policy to it. This grants access to your S3 bucket.</p>

<ol>
 <li>Log into the AWS Console (Web UI).</li>
 <li>Navigate to EC2. Click on **Services** > **Compute** > **EC2**.</li>
 <li>Click on one of our Kubernetes nodes</li>
 <li>In the bottom section, look for "IAM role" and click on the role</li>
 <li>Click on "Add inline policy" (on the right)</li>
 <li>Click on the "JSON" tab</li>
 <li>Add this text (replace <code>spinnaker-abcxyz</code> with the name of our bucket)</li>

<pre class="highlight"><code>{
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
</code></pre>

 <li>Click on "Review Policy"</li>
 <li>Give our inline policy some name. For example `s3-spinnaker-abcxyz`</li>
 <li>Click "Create Policy"</li>
</ol>

</details>

<details><summary>(Option 2) S3 using an IAM User</summary>

<p>First, we will create the IAM user and grant it permissions on our bucket.</p>

<ol>
  <li>Log into the AWS Console (Web UI)</li>
  <li>Navigate to the IAM Console (Click on "Services" at the top, and then on "IAM" under "Security, Identity, & Compliance")</li>
  <li>Click on "Users" on the left</li>
  <li>Click on "Add user"</li>
  <li>Give our user a distinct name, per our organization's naming conventions. For this document, we will use <code>spinnaker-abcxyz</code></li>
  <li>Click on "Programmatic access"</li>
  <li>We will not be adding a distinct policy to this user. Click on "Next: Tags". <i>We may receive a warning about how there are no policies attached to this user - this warning can be ignored.</i></li>
  <li>Optionally, add tags, then click on "Next: Review"</li>
  <li>Click "Create user"</li>
  <li>Save the Access Key ID and Secret Access Key - these will be used later, during Halyard configuration</li>
  <li>Click "Close"</li>
</ol>

<p>Then, add an inline policy to our IAM user:</p>

<ol>
  <li> Click on our newly-created IAM user</li>
  <li>Click on "Add inline policy" (on the right)</li>
  <li>Click on the "JSON" tab</li>
  <li>Add this text (replace <code>s3-spinnaker-abcxyz</code> with the name of our bucket)</li>

<pre class="highlight"><code>{
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
</code></pre>

  <li>Click on "Review Policy"</li>
  <li>Give our inline policy some name. For example `s3-spinnaker-abcxyz`</li>
  <li>Click "Create Policy"</li>
</ol>

</details>

<details><summary>Configure Spinnaker to access S3 with the IAM Role or User</summary>

<p>Spinnaker will need information about which bucket to access.  In addition, if using an IAM User to access to the bucket, Spinnaker will need credentials for the IAM User</p>

<pre class="highlight"><code># Update these with the information from the bucket that we created
export BUCKET_NAME=spinnaker-abcxyz
export REGION=us-west-2

# This will prompt for the secret key
hal config storage s3 edit \
  --bucket ${BUCKET_NAME} \
  --region ${REGION}

hal config storage edit --type s3
</code></pre>

If we are using an IAM User, then we need to additionally provide Spinnaker with the S3 credentials for our IAM User:

<pre class="highlight"><code># Update this with the AWS Access Key ID
export ACCESS_KEY_ID=AKIAWWWWXXXXYYYYZZZZ

# This will prompt for the secret key
hal config storage s3 edit \
  --access-key-id ${ACCESS_KEY_ID} \
  --secret-access-key
</code></pre>

By default, Halyard will configure Spinnaker to use the folder `front50` in our S3 bucket. We can configure it to use a different folder with this command:

<pre class="highlight"><code># Replace with the root folder within our bucket to use
ROOT_FOLDER=spinnaker_apps
hal config storage s3 edit \
  --root-folder ${ROOT_FOLDER}
</code></pre>

</details>

</details>

## Set up Gate to listen on the `/api/v1` path

The Spinnaker microservice "Gate" serves as the API for Spinnaker.  We want to configure it to listen on a specific path, rather than requiring different hosts or ports to differentiate it from the UI of Spinnaker.

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

## Select the Spinnaker version to install

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
hal config version edit --version ${VERSION}
```

## Install Spinnaker

Now that our halconfig is completely configured for the initial Spinnaker, we can tell Halyard to actually install Spinnaker:

```bash
hal deploy apply --wait-for-completion
```

Once this is complete, congratulations! Spinnaker is installed. Now we have to access and expose it.

### Connect to Spinnaker using `kubectl port-forward`

If we have kubectl on a local machine with access to our Kubernetes cluster, we can test the status of our Spinnaker instance by doing a port-forward:

First, tell Spinnaker about its local endpoint for localhost:8084/api/v1:

```bash
hal config security api edit --override-base-url http://localhost:8084/api/v1

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

## Ingress

There are a number of ways to expose Spinnaker, but basically there are these requirements:

* Given a domain name (or IP address) (such as spinnaker.domain.com or 55.55.55.55)
* We should be able to reach the `spin-deck` service at the root of the domain (http://spinnaker.domain.com or http://55.55.55.55)
* We should be able to reach the `spin-gate` service at the root of the domain (http://spinnaker.domain.com/api/v1 or http://55.55.55.55/api/v1)
* We can use either http or https, as long as we use the same for both
* We have to configure Spinnaker to be aware of its endpoints

This section details how to do so with the NGINX ingress controller.

### Install the NGINX ingress controller

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

### Set up an Ingress for `spin-deck` and `spin-gate`

Get the external IP for the NGINX ingress controller:

```
kubectl get svc -n ingress-nginx
```

We'll get a DNS name or IP address in the `EXTERNAL-IP` field.

If we stood up a new NGINX ingress controller, we can likely just use this value (IP address or DNS name) for our ingress.

For example, if I get `abcd1234abcd1234abcd1234abcd1234-123456789.us-west-2.elb.amazonaws.com`, then I can do the following:
* Use `abcd1234abcd1234abcd1234abcd1234-123456789.us-west-2.elb.amazonaws.com` for my SPINNAKER_ENDPOINT in the below steps

For example, if I get `55.55.55.55`, then I can do the following:
* Use `55.55.55.55` for my SPINNAKER_ENDPOINT in the below steps

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

### Configure Spinnaker to be aware of its endpoints

Spinnaker must be aware of its endpoints to work properly.

This should be done from inside the halyard container.  If you need to get back into the container, run this command:

```
kubectl -n spinnaker exec -it halyard-0 bash
```

Then run this inside the container:

```bash
SPINNAKER_ENDPOINT=http://spinnaker.domain.com
# ^ Replace this with the IP address or DNS that points to our nginx ingress instance

hal config security ui edit --override-base-url ${SPINNAKER_ENDPOINT}
hal config security api edit --override-base-url ${SPINNAKER_ENDPOINT}/api/v1

hal deploy apply
```

### Configuring TLS Certificates

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

## Next Steps

Now that we have Spinnaker up and running, here are some of the next things we may want to do:

* Configuration of certificates to secure our cluster (see [this section](#configuring-tls-certificates) for notes on this)
* Configuration of Authentication/Authorization (see the [Open Source Spinnaker documentation](https://www.spinnaker.io/setup/security/))
* Add Kubernetes accounts to deploy applications to (see [this KB article](https://kb.armory.io/installation/spinnaker-add-kubernetes/))
* Add GCP accounts to deploy applications to (see the [Open Source Spinnaker documentation](https://www.spinnaker.io/setup/install/providers/gce/))
* Add AWS accounts to deploy applications to (see the [Open Source Spinnaker documentation](https://www.spinnaker.io/setup/install/providers/aws/))
