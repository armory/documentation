---
layout: post
title: Installing Spinnaker in GKE - Prerequisites
order: 22
published: true
redirect_from:
  - /spinnaker_install_admin_guides/install_on_gke_prereqs/
  - /spinnaker_install_admin_guides/install-on-gke-prereqs/
  - /spinnaker-install-admin-guides/install_on_gke_prereqs/
---

This document describes one way to set up the infrastructure necessary to run a Spinnaker cluster in Google Cloud.  It will set up the following items:
* A GKE (Google Kubernetes Engine) cluster (you can use an existing one if you already have one)
    * An NGINX Ingress controller in your GKE cluster
    * A portable kubeconfig file that has cluster-admin permissions in your 
* A GCS (Google Cloud Storage) bucket (you can use an existing one if you already have one)

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Prerequities / Environments

This document assumes the following:

* You have a machine (referred to as the `workstation machine` in this document) configured to use the `gcloud` Google Cloud SDK and a recent version of `kubectl` tool 

On the `workstation machine`:
* You can use `gcloud` to create Google resources (you have permissions to create these resources):
  * GKE clusters (or, alternatley, have a GKE cluster already built)
  * GCS buckets (or, alternately, have a GCS bucket already built)
* You have the `kubectl` (Kubernetes CLI tool) installed and are able to use it to interact with your GKE cluster, if you're using a prebuilt GKE cluster

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

## Create a GCS service account for Spinnaker
Spinnaker uses a GCS bucket to store persistent configuration (such as pipeline definitions).  This section will create a Google IAM service account as well as a Google credential file for use by Halyard and Spinnaker.

By default, this account will have the `roles/storage.admin` IAM role; if you have an existing GCS bucket to use, you can specify a different set of permissions.

```bash
export SERVICE_ACCOUNT_NAME=spinnaker-gcs-account
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

## Configure Spinnaker to use your GCS bucket
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
