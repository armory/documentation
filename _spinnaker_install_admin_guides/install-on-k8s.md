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

This guide describes the initial installation of Spinnaker in Kubernetes. You can choose between two different installation methods: Spinnaker Operator or Halyard. By the end of this guide, you will have an instance of Spinnaker up and running on your Kubernetes cluster.  The document does not fully cover the following:

* TLS Encryption
* Authentication/Authorization
* Add K8s accounts to deploy to
* Add cloud accounts to deploy to

See [Next Steps](#next-steps) for information related to these topics.

Note: This document focuses on Armory Spinnaker but can be adapted to install Open Source Spinnaker by using Open Source Operator or a different Halyard container, and a corresponding different Spinnaker version.

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Choosing an installation method

There are two recommended ways of installing Spinnaker: using the [Spinnaker Operator](https://docs.armory.io/spinnaker/operator/) or using [Halyard](https://www.spinnaker.io/setup/install/halyard/).

### Spinnaker Operator

The _Spinnaker Operator_ is the newest installation and configuration method for Spinnaker. Using the Operator, you can entirely manage Spinnaker using only Kubernetes manifest files. You treat Spinnaker like any other Kubernetes application, running standard tools like `kubectl`, `helm`, and `kustomize`. You can even use a Spinnaker pipeline to roll out configuration changes to itself. The Operator runs a few "hot" validations before accepting a manifest into the cluster, preventing some configuration problems from affecting a running Spinnaker installation.

*Prerequisites*

* Your Kubernetes API Server is running version `1.13` or later.
* You have admin rights to install the Custom Resource Definition (CRD) for Operator.
* You can assign a ClusterRole to Operator. This means that Operator has access to all namespaces in the cluster. Operator can still run in an isolated namespace in [Basic](https://docs.armory.io/spinnaker/operator/#installing-operator-in-basic-mode) mode (not covered in this installation guide), but it will not be able to run admission validations.

*General workflow*

* Install Spinnaker Operator CRDs cluster wide.
* Create a Kubernetes namespace for the Operator.
* Install the Operator in that namespace, using a ServiceAccount with a ClusterRole to access other namespaces.
* Create an S3 bucket for Spinnaker to store persistent configuration.
* Create an IAM user that Spinnaker will use to access the S3 bucket (or alternately, granting access to the bucket via IAM roles).
* Create a Kubernetes namespace for Spinnaker.
* Install Spinnaker in that namespace.

### Halyard

Halyard is the former installation method for Spinnaker. It has been around the longest and is the first one supporting new Spinnaker features. Operator uses a customized version of Halyard that is constantly updated to incorporate changes from base Halyard.

*Prerequisites*

* Your Kubernetes cluster has storage set up so that PersistentVolumeClaims properly allocates PersistentVolumes.

*General workflow*

* Create a Kubernetes namespace where we will run both Halyard and Spinnaker
* In the namespace, grant the `default` Kubernetes ServiceAccount the `cluster-admin` ClusterRole. This gives it full permissions within our namespace, but not on other namespaces; for details, see the [Kubernetes RBAC documentation](https://kubernetes.io/docs/reference/access-authn-authz/rbac/))
* In the namespace, create a PersistentVolumeClaim (PVC), which you use for persistent Spinnaker cluster configuration (the "halyard configuration" or "halconfig")
* In the namespace, create a StatefulSet to run Halyard.  The PVC will be mounted to this StatefulSet.
* Halyard will use the `default` Kubernetes ServiceAccount to create and modify resources running the cluster (the Kubernetes Secrets, Deployments, and Services that make up Spinnaker).
* The Spinnaker microservice called "Clouddriver", which interacts with various clouds including Kubernetes, also uses the `default` ServiceAccount to interact with Kubernetes.
* Run Halyard as a Kubernetes Pod in the namespace (using a StatefulSet).
* Create an S3 bucket for Spinnaker to store persistent configuration.
* Create an IAM user that Spinnaker will use to access the S3 bucket (or alternately, granting access to the bucket via IAM roles).
* Run the `hal` client interactively in the Kubernetes Pod to:
  * Build out the `hal` config YAML file (`.hal/config`)
  * Configure Spinnaker with the IAM credentials and bucket information
  * Turn on other recommended settings (artifacts and http artifact provider)
  * Install Spinnaker
  * Expose Spinnaker

## Assumptions / Environments

This document assumes the following:

* Your Kubernetes cluster is up and running with at least 4 CPUs and 12 GB of memory.  This is the bare minimum to install and run Spinnaker; depending on our Spinnaker workload, you may need more resources.
* You have `kubectl` installed and are able to access and create Kubernetes resources.
* You have access to an existing object storage bucket or the ability to create an object storage bucket (Amazon S3, Google GCS, Azure Storage, or Minio).  _For the initial version of this document, **only** Amazon S3 is used._ 
* You have access to an IAM role or user with access to the S3 bucket. If neither of these exists, you need to create an IAM role or user with access to the S3 bucket.
* Your cluster has either an existing Kubernetes Ingress controller or the permissions to install the NGINX Ingress Controller

These instructions set up the Spinnaker microservice called "Front50", which stores Spinnaker Application and Pipeline configuration to an object store, with the following permission:

* Front50 has full access to an S3 bucket through either an IAM user (with an AWS access key and secret access key) or an IAM role (attached to your Kubernetes cluster).

At the end of this guide, you have a Spinnaker deployment that is:

* Accessible from your browser
* Able to deploy other Kubernetes resources to the namespace where it runs, but not to any other namespace

## Configure application and pipeline configuration storage

The Spinnaker microservice Front50 requires a backing store to store Spinnaker Application and Pipeline definitions.  There are a number of options for this:

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

<details><summary><b>Click to expand instructions</b></summary>

<details><summary>Creating an S3 bucket</summary>

<p>If you do not have an S3 bucket, create an S3 bucket.</p>

<p>By default, Spinnaker stores all Spinnaker information in a folder called <code>front50</code> in your bucket. Optionally, you can specify a different directory. You might want to do this if you're using an existing or shared S3 bucket..</p>

<p>Perform the following steps:</p>
<ol>
 <li>Log into the AWS Console (web UI).</li>
 <li>Navigate to the S3 Console. Click on <b>Services</b> > <b>Storage</b> > <b>S3</b>.</li>
 <li>Click on <b>Create Bucket</b>.</li>
 <li>Specify a globally unique name for this bucket in your AWS region of choice. If your organization has a standard naming convention, follow it. For its examples, this guide uses <code>spinnaker-abcxyz</code>.</li>
 <li>Click <b>Next</b>.</li>
 <li>Select the following two checkboxes:
    <ul>
      <li>Keep all versions of an object in the same bucket</li>
      <li>Automatically encrypt objects when they are stored in S3</li>
    </ul>
  </li>
 <li>Click <b>Next</b>.</li>
 <li>Do not add any additional permissions unless required by your organization. Click <b>Next</b>.</li>
 <li>Click <b>Create bucket</b>.</li>
</ol>

</details>

<details><summary>(Option 1) S3 using the IAM Policy/Role</summary>

<p>First, identify the role attached to your Kubernetes instance and attach an inline IAM policy to it. This grants access to your S3 bucket.</p>

<ol>
 <li>Log into the AWS Console (Web UI).</li>
 <li>Navigate to EC2. Click on <b>Services</b> > <b>Compute</b> > <b>EC2</b>.</li>
 <li>Click on one of your Kubernetes nodes.</li>
 <li>In the bottom section, look for <b>IAM role</b> and click on the role.</li>
 <li>Click on <b>Add inline policy</b>.</li>
 <li>On the <b>JSON</b> tab, add the following snippet:</li>

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

 <li>Click on <b>Review Policy</b>.</li>
 <li>Give your inline policy a name, such as <code>s3-spinnaker-abcxyz</code>.</li>
 <li>Click <b>Create Policy</b></li>
</ol>
</details>

<details><summary>(Option 2) S3 using an IAM User</summary>

<p>First, create the IAM user and grant it permissions on your bucket:</p>

<ol>
  <li>Log into the AWS Console (Web UI).</li>
  <li>Navigate to the IAM Console. Click on <b>Services</b> > <b>Security, Identity, & Compliance</b> > <b>IAM</b>.</li>
  <li>Click on <b>Users</b> on the left.</li>
  <li>Click on <b>Add user</b>.</li>
  <li>Give your user a distinct name based on your organization's naming conventions. This guide uses <code>spinnaker-abcxyz</code>.</li>
  <li>Click on <b>Programmatic access</b>.</li>
  <li>For this guide, do not add a distinct policy to this user. Click on <b>Next: Tags</b>. <i>You may receive a warning about how there are no policies attached to this user. You can ignore this warning.</i></li>
  <li>Optionally, add tags, then click on <b>Next: Review</b>.</li>
  <li>Click <b>Create user</b>.</li>
  <li>Save the Access Key ID and Secret Access Key. You need this information later during Halyard configuration.</li>
  <li>Click <b>Close</b>.</li>
</ol>

<p>Then, add an inline policy to your IAM user:</p>

<ol>
  <li>Click on our newly-created IAM user.</li>
  <li>Click on <b>Add inline policy</b> (on the right).</li>
  <li>On the <b>JSON</b> tab, add the following snippet:</li>

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
<p>Replace <code>s3-spinnaker-abcxyz</code> with the name of your bucket.</p>
  <li>Click on <b>Review Policy</b></li>
  <li>Give your inline policy a name, for example <code>s3-spinnaker-abcxyz</code>.</li>
  <li>Click <b>Create Policy</b></li>
</ol>

</details>


</details>

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

## Install Spinnaker using the Operator

### Install CRDs and Operator

First, download the CRDs and manifests from the [latest stable release](https://github.com/armory-io/spinnaker-operator/releases).

```bash
$ bash -c 'curl -L https://github.com/armory-io/spinnaker-operator/releases/latest/download/manifests.tgz | tar -xz'
```

Install Spinnaker CRDs:

```bash
$ kubectl apply -f deploy/crds/
```

Create a namespace for Operator. In this guide you use `spinnaker-operator`, but the namespace can have any name, provided that you update the namespace name in the `role_binding.yaml` file.

```bash
kubectl create namespace spinnaker-operator
```

Install Operator manifests:

```bash
$ kubectl apply -n spinnaker-operator -f deploy/operator/cluster
```

After installation, you can verify that Operator is running with the following command:

```bash
$ kubectl -n spinnaker-operator get pods
```

The command returns output similar to the following if the pod for Operator is running:

```
NAMESPACE                                READY         STATUS       RESTARTS      AGE
spinnaker-operator-7cd659654b-4vktl      2/2           Running      0             6s
```

### Install Spinnaker

First, create the namespace where Spinnaker will be installed. In this guide you use `spinnaker`, but it can have any name:

```bash
kubectl create namespace spinnaker
```

You define and configure Spinnaker in a YAML file and use `kubectl` to create the service. Copy the contents below to a configuration file called `spinnakerservice.yml`. The code creates a Kubernetes `ServiceAccount` with permissions only to the namespace where Spinnaker is installed. Applying this file creates a base Spinnaker installation with one Kubernetes target account, which enables Spinnaker to deploy to the same namespace where it is installed.

Note the values that you need to modify:

- Spinnaker `version`: Use the version of Spinnaker that you want to deploy, which can be found [here](https://docs.armory.io/release-notes/#list-of-stable-armory-releases).
- S3 `bucket`: Use the name of the S3 bucket created above.
- S3 `region`: Region where the S3 bucket is located.
- S3 `accessKeyId`: Optional, set when using IAM user credentials to authenticate to the S3 bucket.
- S3 `secretAccessKey`: Optional, set when using IAM user credentials to authenticate to the S3 bucket.
- metadata `name`: Change if you're installing Spinnaker to a namespace other than `spinnaker`.

```yaml
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  creationTimestamp: null
  name: spin-role
rules:
- apiGroups:
  - ""
  resources:
  - pods
  - services
  - endpoints
  - persistentvolumeclaims
  - events
  - configmaps
  - secrets
  - namespaces
  verbs:
  - '*'
- apiGroups:
  - batch
  - extensions
  resources:
  - jobs
  verbs:
  - '*'
- apiGroups:
  - apps
  - extensions
  resources:
  - deployments
  - daemonsets
  - replicasets
  - statefulsets
  verbs:
  - '*'
- apiGroups:
  - monitoring.coreos.com
  resources:
  - servicemonitors
  verbs:
  - get
  - create
- apiGroups:
  - apps
  resourceNames:
  - spinnaker-operator
  resources:
  - deployments/finalizers
  verbs:
  - update
- apiGroups:
  - metrics.k8s.io
  resources:
  - pods
  verbs:
  - '*'
- apiGroups:
  - apps
  resourceNames:
  - spinnaker-operator
  resources:
  - deployments/finalizers
  verbs:
  - update
- apiGroups:
  - spinnaker.io
  resources:
  - '*'
  - spinnakeraccounts
  verbs:
  - '*'
- apiGroups:
  - spinnaker.armory.io
  resources:
  - '*'
  - spinnakerservices
  verbs:
  - '*'
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: spin-sa
---
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: spin-role-binding
subjects:
- kind: ServiceAccount
  name: spin-sa
roleRef:
  kind: Role
  name: spin-role
  apiGroup: rbac.authorization.k8s.io
---
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    config:
      version: 2.17.1  # Replace with desired version of Spinnaker to deploy
      persistentStorage:
        persistentStoreType: s3
        s3:
          bucket: spinnaker-abcxyz # Replace with the name of the S3 bucket created previously
          region: us-west-2        # Replace with correct bucket's region
          accessKeyId: XYZ         # (Optional, set only when using an IAM user to authenticate to the bucket instead of an IAM role)
          secretAccessKey: XYZ     # (Optional, set only when using an IAM user to authenticate to the bucket instead of an IAM role)
          rootFolder: front50
      features:
        artifacts: true
      providers:
        kubernetes:
          accounts:
          - name: spinnaker
            cacheThreads: 1
            cachingPolicies: []
            configureImagePullSecrets: true
            customResources: []
            dockerRegistries: []
            kinds: []
            namespaces:
            - spinnaker  # Name of the namespace where Spinnaker is installed
            oAuthScopes: []
            omitKinds: []
            omitNamespaces: []
            onlySpinnakerManaged: false
            permissions: {}
            providerVersion: V2
            requiredGroupMembership: []
            serviceAccount: true
          enabled: true
          primaryAccount: spinnaker
    service-settings:
      clouddriver:
        kubernetes:
          serviceAccountName: spin-sa
```

Deploy the manifest with the following command:

```bash
kubectl -n spinnaker apply -f spinnakerservice.yml
```

## Install Spinnaker using Halyard

### Start the Halyard StatefulSet

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

### Access the Halyard container

The majority of tasks you need to perform are done from inside the Halyard container.  Use the following command to access the container:

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

### Configure Spinnaker to install in Kubernetes

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

### Enable and configure the 'Artifact' feature

Within Spinnaker, 'artifacts' are consumable references to items that live outside of Spinnaker, such as a file in a git repository or a file in an S3 bucket. The Artifacts feature must be explicitly turned on.

The following commands enable the "Artifacts" feature, the new Artifact UI, and the "http" artifact provider:

```bash
hal config features edit --artifacts true
hal config features edit --artifacts-rewrite true
hal config artifact http enable
```

Although enabling the new Artifacts UI is optional, Armory recommends using it for better user experience. 

In order to add specific types of artifacts, additional configuration must be completed. For now though, it is sufficient to turn on the artifacts feature with the `http` artifact provider. This allows Spinnaker to retrieve files using unauthenticated http.


### Configure Spinnaker to access S3 with the IAM Role or User

Spinnaker needs information about which bucket to access.  Additionally, if you are using an IAM User to access the the bucket, Spinnaker needs credentials for the IAM User.

<pre class="highlight"><code># Update these snippets with the information for your bucket
export BUCKET_NAME=spinnaker-abcxyz
export REGION=us-west-2

# This will prompt for the secret key
hal config storage s3 edit \
  --bucket ${BUCKET_NAME} \
  --region ${REGION} \
  --no-validate

hal config storage edit --type s3
</code></pre>

If you are using an IAM User, then provide Spinnaker with the S3 credentials for your IAM User:

<pre class="highlight"><code># Update this with the AWS Access Key ID
export ACCESS_KEY_ID=AKIAWWWWXXXXYYYYZZZZ

# This will prompt for the secret key
hal config storage s3 edit \
  --access-key-id ${ACCESS_KEY_ID} \
  --secret-access-key
</code></pre>

By default, Halyard configures Spinnaker to use the folder `front50` in your S3 bucket. You can configure it to use a different folder with this command:

<pre class="highlight"><code># Replace with the root folder within our bucket to use
ROOT_FOLDER=spinnaker_apps
hal config storage s3 edit \
  --root-folder ${ROOT_FOLDER}
</code></pre>

### Set up Gate to listen on the `/api/v1` path

The Spinnaker microservice "Gate" serves as the API gateway for Spinnaker.  Configure it to listen on a specific path rather than requiring different hosts or ports to differentiate it from the UI of Spinnaker.

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

You can copy/paste this snippet to automatically create these two files:

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

### Select the Spinnaker version to install

Before you use Halyard to install Spinnaker, specify the version of Spinnaker you want to use.

You can get a list of available versions of Spinnaker with this command:

```bash
hal version list
```

* If you are installing Armory Spinnaker using Armory's Halyard, the command returns a version that starts with `2.x.x`

* If you are installing OSS Spinnaker and using `gcr.io/spinnaker-marketplace/halyard:stable`, the command returns a version that starts with `1.x.x`

Select the version with the following:

```bash
# Replace with version of choice:
export VERSION=$(hal version latest -q)
echo ${VERSION}
hal config version edit --version ${VERSION}
```

### Install Spinnaker

Now that our halconfig is configured, you can install Spinnaker:

```bash
hal deploy apply --wait-for-completion
```

Once this is complete, congratulations! Spinnaker is installed. Keep going to learn how to access Spinnaker.

### Connect to Spinnaker using `kubectl port-forward`

If you have `kubectl` on a local machine with access to your Kubernetes cluster, you can test the status of your Spinnaker instance by doing a port-forward.

First, tell Spinnaker about its local endpoint for `localhost:8084/api/v1`:

```bash
hal config security api edit --override-base-url http://localhost:8084/api/v1

hal deploy apply --wait-for-completion
```

Wait for the pods get in a running state. Then, set up two port forwards, one for Gate (the API gateway) and one for Deck (the Spinnaker UI):

```bash
NAMESPACE=spinnaker
kubectl -n ${NAMESPACE} port-forward svc/spin-deck 9000 &
kubectl -n ${NAMESPACE} port-forward svc/spin-gate 8084 &
```

Then, you can access Spinnaker at `http://localhost:9000`.

If you are doing this on a remote machine, this does not work because your browser attempts to access `localhost` on your local workstation rather than on the remote machine where the port is forwarded.

__Note:__ Even if the `hal deploy apply` command returns successfully, the
installation may not be complete yet. This is especially the case with
distributed Kubernetes installs. If you see errors such as `Connection refused`,
the containers may not be available yet. Either wait
or check the status of all of the containers using the command for our cloud provider
(such as `kubectl get pods --namespace spinnaker`).

## Ingress

There several ways to expose Spinnaker, but there are a some basic requirements.

Given a domain name (or IP address) (such as spinnaker.domain.com or 55.55.55.55), you should be able to:

* Reach the `spin-deck` service at the root of the domain (`http://spinnaker.domain.com` or `http://55.55.55.55`)
* Reach the `spin-gate` service at the root of the domain (`http://spinnaker.domain.com/api/v1` or `http://55.55.55.55/api/v1`)
  
You  can use either http or https, as long as you use the same for both. Additionally, you have to configure Spinnaker to be aware of its endpoints.

The Install the NGINX ingress controller section details how to do that with the NGINX ingress controller.

### Install the NGINX ingress controller

In order to expose Spinnaker to end users, perform the following actions:

* Expose the spin-deck (UI) Kubernetes service on a URL endpoint
* Expose the spin-gate (API) Kubernetes service on a URL endpoint
* Update Spinnaker to be aware of the new endpoints

**If you already have an ingress controller, use that ingress controller instead.  You can check for the existence of the NGINX Ingress Controller by running `kubectl get ns` and looking for a namespace called `ingress-nginx`. If the namespace exists, you likely already have an NGINX Ingress Controller running in your cluster.**

The following instructions walk you through how to install the NGINX ingress controller on AWS. This uses the Layer 4 ELB, as indicated in the NGINX ingress controller [documentation](https://github.com/kubernetes/ingress-nginx/blob/master/docs/deploy/index.md#aws). You can use other NGINX ingress controller configurations, such as the Layer 7 load balancer, based on your organization's ingress policy.)

(Both of these are configurable with Spinnaker, but the NGINX ingress controller is also generally much more configurable.)

From the `workstation machine` where `kubectl` is installed, install the NGINX ingress controller components:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml
```

Then, install the NGINX ingress controller AWS-specific service:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/aws/service-l4.yaml
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/aws/patch-configmap-l4.yaml
```

### Set up an Ingress for `spin-deck` and `spin-gate`

Get the external IP for the NGINX ingress controller:

```
kubectl get svc -n ingress-nginx
```

The command returns a DNS name or IP address in the `EXTERNAL-IP` field.

If you stood up a new NGINX ingress controller, you can likely use this value (IP address or DNS name) for your ingress.

For example, if the command returns `abcd1234abcd1234abcd1234abcd1234-123456789.us-west-2.elb.amazonaws.com`, then you can use `abcd1234abcd1234abcd1234abcd1234-123456789.us-west-2.elb.amazonaws.com` for the `SPINNAKER_ENDPOINT` in the following steps. If the command returns `55.55.55.55`, then use `55.55.55.55` for the `SPINNAKER_ENDPOINT`.

If you use an existing NGINX ingress controller or other services are likely to be using the same NGINX ingress controller, create a DNS entry that points at the NGINX ingress controller endpoint you are using for Spinnaker. You can create either a `CNAME Record` that points at the DNS name or an `A Record` that points at the IP address.

For the example `abcd1234abcd1234abcd1234abcd1234-123456789.us-west-2.elb.amazonaws.com` DNS name, do the following:
* Create a CNAME pointing `spinnaker.domain.com` at `abcd1234abcd1234abcd1234abcd1234-123456789.us-west-2.elb.amazonaws.com`
* Put `spinnaker.domain.com` in the `host` field in the below manifest and uncomment it
* Use `spinnaker.domain.com` for the `SPINNAKER_ENDPOINT` in the below steps
* (Alternately, for testing, create an `/etc/hosts` entry pointing `spinnaker.domain.com` at the IP address that `abcd1234abcd1234abcd1234abcd1234-123456789.us-west-2.elb.amazonaws.com` resolves to)

For the `55.55.55.55` IP address example, do the following:
* Create an `A Record` pointing to `spinnaker.domain.com` at `55.55.55.55`
* Put `spinnaker.domain.com` in the `host` field in the below manifest and uncomment it
* Use `spinnaker.domain.com` for my SPINNAKER_ENDPOINT in the below steps
* (Alternately, for testing, create an `/etc/hosts` entry pointing `spinnaker.domain.com` at `55.55.55.55`)

Create a Kubernetes Ingress manifest to expose `spin-deck` and `spin-gate`.

Create a file called `spin-ingress.yml` with the following content.  If you are on Kubernetes 1.14 or above, you should replace `extensions/v1beta1` with `networking.k8s.io/v1`.

(Make sure the hosts and namespace match your actual host and namespace.)

```bash
---
apiVersion: extensions/v1beta1
# apiVersion: networking.k8s.io/v1
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

Apply the ingress file you just created:

```bash
kubectl -n spinnaker apply -f spin-ingress.yml
```

### Configure Spinnaker to be aware of its endpoints

Spinnaker must be aware of its endpoints to work properly. Configuration updates vary depending upon whether you installed Spinnaker using Operator or Halyard. 

**Operator**
    
Update `spinnakerservice.yml` adding the `security` section:
    
```yaml
spec:
  spinnakerConfig:
    config:
      security:
        apiSecurity:
          overrideBaseUrl: http://spinnaker.domain.com/api/v1  # Replace this with the IP address or DNS that points to our nginx ingress instance
        uiSecurity:
          overrideBaseUrl: http://spinnaker.domain.com         # Replace this with the IP address or DNS that points to our nginx ingress instance
```
  
Apply the changes:
    
```bash
kubectl -n spinnaker apply -f spinnakerservice.yml 
```

**Halyard**

Run this command to get into the Halyard container:

```
kubectl -n spinnaker exec -it halyard-0 bash
```

Then, run the following command from inside the container:

```bash
SPINNAKER_ENDPOINT=http://spinnaker.domain.com
# ^ Replace this with the IP address or DNS that points to our nginx ingress instance

hal config security ui edit --override-base-url ${SPINNAKER_ENDPOINT}
hal config security api edit --override-base-url ${SPINNAKER_ENDPOINT}/api/v1

hal deploy apply
```

### Configuring TLS certificates

Configuring TLS certificates for ingresses is often very environment-specific. In general, you want to do the following:

* Add certificate(s) so that our ingress controller can use them
* Configure the ingress(es) so that NGINX (or the load balancer in front of NGINX, or your alternative ingress controller) terminates TLS using the certificate(s)
* Update Spinnaker to be aware of the new TLS endpoints, by replacing `http` by `https` to override the base URLs in the previous section.

## Next Steps

Now that Spinnaker is running, here are potential next steps:

* Configuration of certificates to secure our cluster (see [this section](#configuring-tls-certificates) for notes on this)
* Configuration of Authentication/Authorization (see the [Open Source Spinnaker documentation](https://www.spinnaker.io/setup/security/))
* Add Kubernetes accounts to deploy applications to (see [this KB article](https://kb.armory.io/installation/spinnaker-add-kubernetes/))
* Add GCP accounts to deploy applications to (see the [Open Source Spinnaker documentation](https://www.spinnaker.io/setup/install/providers/gce/))
* Add AWS accounts to deploy applications to (see the [Open Source Spinnaker documentation](https://www.spinnaker.io/setup/install/providers/aws/))
