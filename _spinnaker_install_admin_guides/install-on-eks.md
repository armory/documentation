---
layout: post
title: Installing Spinnaker in EKS
order: 0
# Change this to true
published: false
redirect_from:
  - /spinnaker_install_admin_guides/install_on_eks/
  - /spinnaker_install_admin_guides/install-on-eks/
  - /spinnaker-install-admin-guides/install_on_eks/
---

# This is a placeholder document and should not be published until it is complete

This guide describes how to install Spinnaker in EKS.  It will create / use the following Google Cloud resources:
* A EKS (Elastic Kubernetes Service) cluster (you can use an existing one if you already have one)
* An S3 (Simple Storage Service) bucket (you can use an existing one if you already have one)
* An NGINX Ingress controller in your EKS cluster

This document currently does not fully cover the following (see [Next Steps](#next-steps) for some links to achieve these)
* TLS Encryption
* Authentication/Authorization
* Add K8s accounts to deploy to
* Add cloud accounts to deploy to

Note: This document is focused on Armory Spinnaker, but can be adapted to install Open Source Spinnaker by using a different Halyard container and a corresponding different Spinnaker version

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Prerequities / Environments

This document is written with the following workflow in mind:

* You have a machine (referred to as the `workstation machine` in this document) configured to use the `aws` Amazon CLI tool and a recent version of `kubectl` tool 
* You have a machine (referred to as the `docker machine` in this document) with the Docker daemon installed, and can run Docker containers on it
* You can transfer files created on the `workstation machine` to the `docker machine` (to a directory mounted on a running Docker container)
* These two machines can be the same machine

Furthermore:

On the `docker machine`:
* Halyard (the tool used to install and manage Spinnaker) is run in a Docker container on the `docker machine`
* The Halyard container on the `docker machine` will be configured with the following volume mounts, which should be persisted or preserved to manage your Spinnaker cluster
  * `.hal` directory (mounted to `/home/spinnaker/.hal`) - stores all Halyard Spinnaker configurations in a `.hal/config` YAML file and assorted subdirectories
  * `.secret` directory (mounted to `/home/spinnaker/.secret`) stores all external secret keys and files used by Halyard
  * `resources` directory (mounted to `/home/spinnaker/resources`) stores all Kubernetes manifests and other resources that help create Kubernetes resources
* You will create `kubeconfig` files and Google IAM service account keys, that will be added to the `.secret` directory

On the `workstation machine`:
* You can use `aws` to create Amazon resources:
  * GKE clusters (or, alternatley, have a GKE cluster already built)
  * GCS buckets (or, alternately, have a GCS bucket already built)
* You have the `kubectl` (Kubernetes CLI tool) installed and are able to use it to interact with your GKE cluster, if you're using a prebuilt GKE cluster
* You will create GKE resources, such as service accounts, that will be permanently associated with your Spinnaker cluster

## Create the GKE cluster

This assumes you have already configured the `gcloud` SDK with a project, zone, and region (see directions [here](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-cluster)

This creates a minimal GKE cluster in your default region and zone.  Follow the official GKE instructions to set up a different type of GKE cluster.

Run this command to create the GKE cluster (from the `workstation machine`):
```bash
gcloud container clusters create spinnaker-cluster
```

Run this command to configure `kubectl` to use the cluster you've created:
```bash
gcloud container clusters get-credentials spinnaker-cluster
```

Alternately, if you're using a pre-existing GKE cluster:
```bash
gcloud ccontainer clusters get-credentials <your-cluster-name>
```

(Feel free to use a different region and zones)

## Create a `kubeconfig` file for Halyard/Spinnaker
Spinnaker will be installed in its own namespace in your GKE cluster.  We're going to create the following:
* The namespace in which Spinnaker will be installed
* A service account for that namespace
* A role and rolebinding in that namespace, granting permissions to the service account
* A kubeconfig containing credentials for the service account

Halyard uses this Kubeconfig file to create the Kubernetes deployment objects that create the microservices that compose Spinnaker.  This same Kubeconfig is passed to Spinnaker so that Spinnaker can see and manage its own resources.

These environment variables will be used in this step (and can be tweaked to fit your needs):
```bash
# Specify the name of the kubernetes context that has permissions to create the service account in your
# target cluster and namespace.  To get the list of contexts, you can run "kubectl config get-contexts"
export CONTEXT="$(kubectl config current-context)"

# Enter the namespace that you want to install Spinnaker in.  This can already exist, or can be created.
export NAMESPACE="spinnaker"

# Enter the name of the service account you want to create.  This will be created in the target namespace
export SERVICE_ACCOUNT_NAME="spinnaker"

# Enter the name of the role you want to create.  This will be created in the target namespace
export ROLE_NAME="spinnaker-role"

# Enter the name you want Spinnaker to use to identify the cloud provider account
export ACCOUNT_NAME="spinnaker"
```

By default, Google IAM users do not have all necessary permissions on GKE clusters.  You can grant them with this:
```bash
kubectl create clusterrolebinding cluster-admin-binding --clusterrole cluster-admin --user $(gcloud config get-value account)
```

Create the namespace:
```bash
kubectl --context ${CONTEXT} create ns ${NAMESPACE}
```

Create a manifest with the service account, role, and rolebinding:
```bash
# Create the file
tee ${NAMESPACE}-service-account.yml <<-'EOF'
apiVersion: v1
kind: ServiceAccount
metadata:
  name: SERVICE_ACCOUNT_NAME
  namespace: NAMESPACE
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: ROLE_NAME
  namespace: NAMESPACE
rules:
- apiGroups: [""]
  resources: ["namespaces", "events", "replicationcontrollers", "serviceaccounts", "pods/log"]
  verbs: ["get", "list"]
- apiGroups: [""]
  resources: ["pods", "services", "secrets", "configmaps"]
  verbs: ["create", "delete", "deletecollection", "get", "list", "patch", "update", "watch"]
- apiGroups: ["autoscaling"]
  resources: ["horizontalpodautoscalers"]
  verbs: ["list", "get"]
- apiGroups: ["apps"]
  resources: ["controllerrevisions", "statefulsets"]
  verbs: ["list"]
- apiGroups: ["extensions", "apps"]
  resources: ["deployments", "replicasets", "ingresses"]
  verbs: ["create", "delete", "deletecollection", "get", "list", "patch", "update", "watch"]
# These permissions are necessary for Halyard to operate. We use this role also to deploy Spinnaker itself.
- apiGroups: [""]
  resources: ["services/proxy", "pods/portforward"]
  verbs: ["create", "delete", "deletecollection", "get", "list", "patch", "update", "watch"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: ROLE_NAME-binding
  namespace: NAMESPACE
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: ROLE_NAME
subjects:
- namespace: NAMESPACE
  kind: ServiceAccount
  name: SERVICE_ACCOUNT_NAME
EOF
```

Update the manifest with the bash variables (and create the resources)
```bash
# String substitute our variables
sed -i.bak \
  -e "s/NAMESPACE/${NAMESPACE}/g" \
  -e "s/SERVICE_ACCOUNT_NAME/${SERVICE_ACCOUNT_NAME}/g" \
  -e "s/ROLE_NAME/${ROLE_NAME}/g" \
  ${NAMESPACE}-service-account.yml

# Create the resources
kubectl --context ${CONTEXT} apply -f ${NAMESPACE}-service-account.yml
```

Create a minified Kubeconfig containing only your service account:
```bash
#################### Create minified kubeconfig
NEW_CONTEXT=${NAMESPACE}-sa
KUBECONFIG_FILE="kubeconfig-${NAMESPACE}-sa"
```

Get the token for the service account (if you're on a Mac, you may have to use the alternate base64 command)
```bash
SECRET_NAME=$(kubectl get serviceaccount ${SERVICE_ACCOUNT_NAME} \
  --context ${CONTEXT} \
  --namespace ${NAMESPACE} \
  -o jsonpath='{.secrets[0].name}')
TOKEN_DATA=$(kubectl get secret ${SECRET_NAME} \
  --context ${CONTEXT} \
  --namespace ${NAMESPACE} \
  -o jsonpath='{.data.token}')

TOKEN=$(echo ${TOKEN_DATA} | base64 -d) 
# Use this command if you're on a mac:
# TOKEN=$(echo ${TOKEN_DATA} | base64 -D)
```

Use the token to create a minified kubeconfig
```bash
# Create dedicated kubeconfig
# Create a full copy
kubectl config view --raw > ${KUBECONFIG_FILE}.full.tmp
# Switch working context to correct context
kubectl --kubeconfig ${KUBECONFIG_FILE}.full.tmp config use-context ${CONTEXT}
# Minify
kubectl --kubeconfig ${KUBECONFIG_FILE}.full.tmp \
  config view --flatten --minify > ${KUBECONFIG_FILE}.tmp
# Rename context
kubectl config --kubeconfig ${KUBECONFIG_FILE}.tmp \
  rename-context ${CONTEXT} ${NEW_CONTEXT}
# Create token user
kubectl config --kubeconfig ${KUBECONFIG_FILE}.tmp \
  set-credentials ${CONTEXT}-${NAMESPACE}-token-user \
  --token ${TOKEN}
# Set context to use token user
kubectl config --kubeconfig ${KUBECONFIG_FILE}.tmp \
  set-context ${NEW_CONTEXT} --user ${CONTEXT}-${NAMESPACE}-token-user
# Set context to correct namespace
kubectl config --kubeconfig ${KUBECONFIG_FILE}.tmp \
  set-context ${NEW_CONTEXT} --namespace ${NAMESPACE}
# Flatten/minify kubeconfig
kubectl config --kubeconfig ${KUBECONFIG_FILE}.tmp \
  view --flatten --minify > ${KUBECONFIG_FILE}
# Remove tmp
rm ${KUBECONFIG_FILE}.full.tmp
rm ${KUBECONFIG_FILE}.tmp
```

You should be left with a file called `kubeconfig-spinnaker-sa` (or something similar, if you're using a different namespace for spinnaker)

## Create a GCS service account for Spinnaker
Spinnaker uses a GCS bucket to store persistent configuration (such as pipeline definitions).  This section will create a Google IAM service account as well as a Google credential file for use by Halyard and Spinnaker.

By default, this account will have the `roles/storage.admin` IAM role; if you have an existing GCS bucket to use, you can specify a different set of permissions.

```bash
export SERVICE_ACCOUNT_NAME=spinnaker-gcs-account-trial
export SERVICE_ACCOUNT_FILE=spinnaker-gcs-account.json
export PROJECT=$(gcloud info --format='value(config.project)')

gcloud --project ${PROJECT} iam service-accounts create \
    ${SERVICE_ACCOUNT_NAME} \
    --display-name ${SERVICE_ACCOUNT_NAME}

SA_EMAIL=$(gcloud --project ${PROJECT} iam service-accounts list \
    --filter="displayName:${SERVICE_ACCOUNT_NAME}" \
    --format='value(email)')

gcloud --project ${PROJECT} projects add-iam-policy-binding ${PROJECT} \
    --role roles/storage.admin --member serviceAccount:${SA_EMAIL}

mkdir -p $(dirname ${SERVICE_ACCOUNT_FILE})

gcloud --project ${PROJECT} iam service-accounts keys create ${SERVICE_ACCOUNT_FILE} \
    --iam-account ${SA_EMAIL}
```

## Move files to `docker machine`
On the `docker machine`, choose a local working directory for Halyard.  In it, we will create two folders:
* `WORKING_DIRECTORY/.hal`
* `WORKING_DIRECTORY/.secret`
* `WORKING_DIRECTORY/resources`

```bash
# Feel free to use some other directory for this; make sure it is a persistent directory.
# Also, make sure this directory doesn't live on an NFS mount, as that can cause issues
WORKING_DIRECTORY=~/gke-spinnaker/
mkdir -p ${WORKING_DIRECTORY}/.hal
mkdir -p ${WORKING_DIRECTORY}/.secret
mkdir -p ${WORKING_DIRECTORY}/resources
```

You should have two files:
* A kubeconfig file (`kubeconfig-spinnaker-sa`) with the credentials for GKE service account
* A JSON key file (`spinnaker-gcs-account.json`) with credentials for a Google IAM service account with Google storage permissions

Copy the key files over to the `docker machine` (if it's a different machine) (use whatever file transfer mechanism works best for you, such as `scp`)

Put the two files in the `.secret` directory:
```bash
mv kubeconfig-spinnaker-sa ${WORKING_DIRECTORY}/.secret
mv spinnaker-gcs-account.json ${WORKING_DIRECTORY}/.secret
```

## Start the Halyard container

On the `docker machine`, start the Halyard container (see the `armory/halyard-armory` [tag list](https://hub.docker.com/r/armory/halyard-armory/tags)) for the latest Armory Halyard Docker image tag.

*If you want to install OSS Spinnaker instead, use `gcr.io/spinnaker-marketplace/halyard:stable` for the Docker image*

```bash
WORKING_DIRECTORY=~/gke-spinnaker/

docker run --name armory-halyard -it --rm \
  -v ${WORKING_DIRECTORY}/.hal:/home/spinnaker/.hal \
  -v ${WORKING_DIRECTORY}/.secret:/home/spinnaker/.secret \
  -v ${WORKING_DIRECTORY}/resources:/home/spinnaker/resources \
  armory/halyard-armory:1.3.0
```

## Enter the Halyard container

From a separate terminal session on your `docker machine`, create a second bash/shell session on the Docker container:
```bash
docker exec -it armory-halyard bash

# Also, once in the container, you can run these commands for a friendlier environment to:
# - prompt with information
# - alias for ls
# - cd to the home directory
export PS1="\h:\w \u\$ "
alias ll='ls -alh'
cd ~
```

## Add kubeconfig and cloud provider to Spinnaker (via Halyard)

From the separate terminal session, add (re-export) the relevant environment variables

```bash
###### Use the same values as the start of the document
# Enter the namespace that you want to install Spinnaker in.  This can already exist, or can be created.
export NAMESPACE="spinnaker"

# Enter the name of the service account you want to create.  This will be created in the target namespace
export SERVICE_ACCOUNT_NAME="spinnaker"

# Enter the name of the role you want to create.  This will be created in the target namespace
export ROLE_NAME="spinnaker-role"

# Enter the name you want Spinnaker to use to identify the cloud provider account
export ACCOUNT_NAME="spinnaker"
```

Use the Halyard `hal` command line tool to add a Kubernetes account using your minified kubeconfig

```bash
# Replace with the filename for the kubeconfig, if it's different
export KUBECONFIG_FULL=/home/spinnaker/.secret/kubeconfig-spinnaker-sa

# Enable the Kubernetes cloud provider
hal config provider kubernetes enable
# Enable artifacts
hal config features edit --artifacts true

# Add account
hal config provider kubernetes account add ${ACCOUNT_NAME} \
  --provider-version v2 \
  --kubeconfig-file ${KUBECONFIG_FULL} \
  --only-spinnaker-managed true \
  --namespaces ${NAMESPACE}
```

## Configure Spinnaker to install in Kubernetes
Use the Halyard `hal` command line tool to configure Halyard to install Spinnaker in your Kubernetes cluster
```bash
hal config deploy edit \
  --type distributed \
  --account-name ${ACCOUNT_NAME} \
  --location ${NAMESPACE}
```

# Configure Spinnaker to use your GCS bucket
Use the Halyard `hal` command line tool to configure Halyard to configure Spinnaker to use your GCS bucket

**You MUST update the PROJECT field with your GCP project name**

*If you're using a pre-existing bucket, you can update ROOT_FOLDER with a different path within your folder.*

```bash
####### Inside container
PROJECT=GOOGLE_CLOUD_PROJECT_NAME
BUCKET_LOCATION=us
SERVICE_ACCOUNT_FILE=~/.secret/spinnaker-gcs-account.json
ROOT_FOLDER=front-50

hal config storage gcs edit --project ${PROJECT} \
    --bucket-location ${BUCKET_LOCATION} \
    --root-folder ${ROOT_FOLDER} \
    --json-path ${SERVICE_ACCOUNT_FILE}

hal config storage edit --type gcs
```

## Choose the Armory Spinnaker version

Before Halyard will install Spinnaker, you should specify the version of Spinnaker you want to use.

You can get a list of available versions of spinnaker with this command:

```bash
hal version list
```

*If you are installing Armory Spinnaker, you will get a version that starts with `2.x.x`*

*If you are installing OSS Spinnaker and using `gcr.io/spinnaker-marketplace/halyard:stable`, you will get a version that starts with `1.x.x`*

And then you can select the version with this:

```bash
# Replace with version of choice:
export VERSION=2.1.0
hal config version edit --version $VERSION
```

## Install Spinnaker

Now that your halconfig is completely configured for the initial Spinnaker, you can tell Halyard to actually install Spinnaker:

```bash
hal deploy apply
```

Once this is complete, congratulations!  Spinnaker is installed.  Now we have to access and expose it.

## Connect to Spinnaker using `kubectl port-forward`

If you have kubectl on a local machine with access to your Kubernetes cluster, you can test connecting to it with the following:

```bash
DECK_POD=$(kubectl -n spinnaker get pod -l cluster=spin-deck -ojsonpath='{.items[0].metadata.name}')
GATE_POD=$(kubectl -n spinnaker get pod -l cluster=spin-gate -ojsonpath='{.items[0].metadata.name}')
kubectl -n spinnaker port-forward ${DECK_POD} 9000 &
kubectl -n spinnaker port-forward ${GATE_POD} 8084 &
```

Then, you can access Spinnaker at http://localhost:9000

## Install the NGINX ingress controller
In order to expose Spinnaker to end users, you have perform the following actions:
* Expose the spin-deck (UI) Kubernetes service on some URL endpoint
* Expose the spin-gate (API) Kubernetes service on some URL endpoint
* Update Spinnaker (via Halyard) to be aware of the new endpoints

We're going to use the NGINX ingress controller on GKE because of these two limitations of the built-in GKE Ingress controller:
* It only exposes NodePort services
* It only exposes services that respond with an `HTTP 200` to a `GET` on `/` (or have a `readinessProbe` configured)

(Both of these are configurable with Spinnaker, but the NGINX ingress controller is also generally much more configurable)

From the `workstation machine` (where `kubectl` is installed):

If you haven't already configured your current user with `cluster-admin`:

```bash
kubectl create clusterrolebinding cluster-admin-binding --clusterrole cluster-admin --user $(gcloud config get-value account)
```

Install the NGINX ingress controller components:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/mandatory.yaml
```

Install the NGINX ingress controller GKE-specific service:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/provider/cloud-generic.yaml
```

## Set up the Ingress for `spin-deck` and `spin-gate`

Identify the URLs you will use to expose Spinnaker's UI and API.

```bash
# Replace with actual values
SPIN_DECK_ENDPOINT=spinnaker.some-url.com
SPIN_GATE_ENDPOINT=api.some-url.com
NAMESPACE=spinnaker
```

Create a Kubernetes Ingress manifest to expose spin-deck and spin-gate (change your hosts and )
```bash
tee spin-ingress.yaml <<-'EOF'
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: spin-ingress
  namespace: NAMESPACE
  labels:
    app: spin
    cluster: spin-ingress
  annotations:
    kubernetes.io/ingress.class: "nginx"
spec:
  rules:
  - host: SPIN_DECK_ENDPOINT
    http:
      paths:
      - backend:
          serviceName: spin-deck
          servicePort: 9000
        path: /
  - host: SPIN_GATE_ENDPOINT
    http:
      paths:
      - backend:
          serviceName: spin-gate
          servicePort: 8084
        path: /
EOF

sed -i.bak \
  -e "s|NAMESPACE|${NAMESPACE}|g" \
  -e "s|SPIN_DECK_ENDPOINT|${SPIN_DECK_ENDPOINT}|g" \
  -e "s|SPIN_GATE_ENDPOINT|${SPIN_GATE_ENDPOINT}|g" \
  spin-ingress.yaml
```

Create the Ingress
```bash
kubectl apply -f spin-ingress.yaml
```

## Configure Spinnaker to be aware of its endpoints

Spinnaker must be aware of its endpoints to work properly.

This should be done from the halyard container:

```bash
SPIN_DECK_ENDPOINT=spinnaker.some-url.com
SPIN_GATE_ENDPOINT=api.some-url.com
SPIN_DECK_URL=http://${SPIN_DECK_ENDPOINT}
SPIN_GATE_URL=http://${SPIN_GATE_ENDPOINT}

hal config security ui edit --override-base-url ${SPIN_DECK_URL}
hal config security api edit --override-base-url ${SPIN_GATE_URL}

hal deploy apply
```

## Set up DNS

Once the ingress is up (this may take some time), you can get the IP address for the ingress:

```bash
$ kubectl describe -n spinnaker ingress spinnaker-nginx-ingress
Name:             spinnaker-nginx-ingress
Namespace:        spinnaker
Address:          35.233.216.189
Default backend:  default-http-backend:80 (10.36.2.7:8080)
Rules:
  Host                    Path  Backends
  ----                    ----  --------
  spinnaker.some-url.com
                          /   spin-deck:9000 (<none>)
  api.some-url.com
                          /   spin-gate:8084 (<none>)
Annotations:
  kubectl.kubernetes.io/last-applied-configuration:  {"apiVersion":"extensions/v1beta1","kind":"Ingress","metadata":{"annotations":{"kubernetes.io/ingress.class":"nginx"},"name":"spinnaker-nginx-ingress","namespace":"spinnaker"},"spec":{"rules":[{"host":"spinnaker.some-url.com","http":{"paths":[{"backend":{"serviceName":"spin-deck","servicePort":9000},"path":"/"}]}},{"host":"api.some-url.com","http":{"paths":[{"backend":{"serviceName":"spin-gate","servicePort":8084},"path":"/"}]}}]}}

  kubernetes.io/ingress.class:  nginx
Events:
  Type    Reason  Age   From                      Message
  ----    ------  ----  ----                      -------
  Normal  CREATE  28s   nginx-ingress-controller  Ingress spinnaker/spinnaker-nginx-ingress
  Normal  UPDATE  20s   nginx-ingress-controller  Ingress spinnaker/spinnaker-nginx-ingress
```

Set up DNS so that your two URLs point to the IP address for the ingress (in the above, configure `spinnaker.some-url.com` and `api.some-url.com` to point to `35.233.216.189`).  This can be done via whatever your organization uses for DNS.

## Configuring TLS Certificates

Configuration of TLS certificates for ingresses is often very organization-specific.  In general, you would want to do the following:
* Add certificate(s) so that your ingress controller can use them
* Configure the ingress(es) so that NGINX (or your ingress) terminates TLS using the certificate(s)
* Update Spinnaker to be aware of the new TLS endpoints (note `https` instead of `http`)

  ```bash
  SPIN_DECK_ENDPOINT=spinnaker.some-url.com
  SPIN_GATE_ENDPOINT=api.some-url.com
  SPIN_DECK_URL=https://${SPIN_DECK_ENDPOINT}
  SPIN_GATE_URL=https://${SPIN_GATE_ENDPOINT}

  hal config security ui edit --override-base-url ${SPIN_DECK_URL}
  hal config security api edit --override-base-url ${SPIN_GATE_URL}

  hal deploy apply
  ```

## Next Steps
Now that you have Spinnaker up and running, here are some of the next things you may want to do:
* Configuration of certificates to secure your cluster (see [this section](#configuring-tls-certificates) for notes on this)
* Configuration of Authentication/Authorization (see the [Open Source Spinnaker documentation](https://www.spinnaker.io/setup/security/))
* Add Kubernetes accounts to deploy applications to (see [this KB article](https://kb.armory.io/installation/spinnaker-add-kubernetes/))
* Add GCP accounts to deploy applications to (see the [Open Source Spinnaker documentation](https://www.spinnaker.io/setup/install/providers/gce/))
* Add AWS accounts to deploy applications to (see the [Open Source Spinnaker documentation](https://www.spinnaker.io/setup/install/providers/aws/))