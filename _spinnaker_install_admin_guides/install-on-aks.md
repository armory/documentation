---
layout: post
title: Installing Spinnaker in AKS
order: 26
published: false
redirect_from:
  - /spinnaker_install_admin_guides/install_on_aks/
  - /spinnaker_install_admin_guides/install-on-aks/
  - /spinnaker-install-admin-guides/install_on_aks/
---

# THIS IS A WORK IN PROGRESS

This guide describes how to install Spinnaker in Azure Kubernetes Service (AKS).  It will create / use the following Azure resources:

* An AKS (Azure Kubernetes Service) cluster (you can use an existing one if you already have one)
* An AZS (Azure Storage) bucket (you can use an existing one if you already have one)
* An NGINX Ingress controller in your AKS cluster. This step is only needed if your cluster doesn't already have an ingress installed. Note that the examples on this page for NGINX only work on Kubernetes version 1.14 or later. 

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

* You have login credentials to Azure that allow you to create resources
* You have an Azure subscription defined where you will install Spinnaker
* You have a machine (referred to as the `workstation machine` in this document) configured to use the `az` Azure CLI tool and a recent version of `kubectl` tool
* You have a machine (referred to as the `Halyard machine` in this document) with the Docker daemon installed, and can run Docker containers on it
* You can transfer files created on the `workstation machine` to the `Halyard machine` (to a directory mounted on a running Docker container)
* These two machines can be the same machine

Furthermore:

On the `Halyard machine`:

* Halyard (the tool used to install and manage Spinnaker) is run in a Docker container on the `Halyard machine`
* The Halyard container on the `Halyard machine` will be configured with the following volume mounts, which should be persisted or preserved to manage your Spinnaker cluster
  * `.hal` directory (mounted to `/home/spinnaker/.hal`) - stores all Halyard Spinnaker configurations in a `.hal/config` YAML file and assorted subdirectories
  * `.secret` directory (mounted to `/home/spinnaker/.secret`) stores all external secret keys and files used by Halyard
  * `resources` directory (mounted to `/home/spinnaker/resources`) stores all Kubernetes manifests and other resources that help create Kubernetes resources
* You will create `kubeconfig` files that will be added to the `.secret` directory
* You will create a Azure IAM service account key that will be added to the `.secret` directory

On the `workstation machine`:

* You can use `az` to create Azure resources:
  * AKS clusters (or, alternately, have an AKS cluster already built)
  * AZS buckets (or, alternately, have an AZS bucket already built)
* You have the `kubectl` (Kubernetes CLI tool) installed and are able to use it to interact with your AKS cluster, if you're using a prebuilt AKS cluster
* You have a persistent working directory in which to work in.  One option here is `~/aks-spinnaker`
* You will create AKS resources, such as service accounts, that will be permanently associated with your Spinnaker cluster

## Installation Summary

In order to install Spinnaker, this document covers the following things:

* Generating a `kubeconfig` file, which is a Kubernetes credential file that Halyard and Spinnaker will use to communicate with the Kubernetes cluster where Spinnaker will be installed
* Creating an AZS bucket for Spinnaker to store persistent configuration in
* Running the Halyard daemon in a Docker container
  * Persistent configuration directories from the workstation/host will be mounted into the container
* Running the `hal` client interactively in the same Docker container, to:
  * Build out the halconfig YAML file (`.hal/config)
  * Configure Spinnaker/Halyard to use the kubeconfig to install Spinnaker
  * Configure Spinnaker with the IAM credentials and bucket information
  * Turn on other recommended settings (artifacts and http artifact provider)
  * Install Spinnaker
  * Expose Spinnaker

## Create the AKS cluster

This assumes you have already installed the `az` CLI on your workstation and are familiar with its use.

This creates a minimal AKS cluster.  Follow the official AKS instructions to set up a different type of AKS cluster.

1. Create the local working directory on your workstation.  For the purposes of this document, we will be using `~/aks-spinnaker`, but this can be any persistent directory on any Linux or OSX machine.

   ```bash
   mkdir ~/aks-spinnaker
   cd ~/aks-spinnaker
   ```

1. Run this command to setup the `az` CLI (from the `workstation machine`):

   ```bash
   az login
   az account list
   az account set --subscription <your-subscription-id>
   ```

1. Determine which Azure locations (like westus) are available for your account.
   ```bash
   az account list-locations --query "[].name"
   ```

1. Create a resource group for your AKS cluster in a location available for your account.
   ```bash
   RESOURCE_GROUP="Spinnaker"
   az group create --name ${RESOURCE_GROUP}  --location <location>
   ```

1. Run this command to create the aks cluster (from the `workstation machine`):

   ```bash
   az aks create --resource-group ${RESOURCE_GROUP} --name spinnaker-cluster --node-count 2 --enable-addons monitoring --generate-ssh-keys
   ```

1. Run this command to configure `kubectl` to use the cluster you've created:

   ```bash
   export KUBECONFIG=kubeconfig-aks
   az aks get-credentials --resource-group ${RESOURCE_GROUP} --name spinnaker-cluster --file ${KUBECONFIG}
   ```

1. Alternately, if you're using a pre-existing aks cluster:

   ```bash
   export KUBECONFIG=kubeconfig-aks
   az aks get-credentials --resource-group <your-resource-group> --name <your-cluster-name> --file ${KUBECONFIG}
   ```

   (Feel free to use a different region and zones)

1. From here, you can validate access to the cluster with this command:

   ```bash
   kubectl --kubeconfig kubeconfig-aks get nodes
   ```

## Create a `kubeconfig` file for Halyard/Spinnaker

Spinnaker will be installed in its own namespace in your aks cluster.
For the purposes of this document, we will be installing Spinnaker in the `spinnaker-system` namespace; you're welcome to use a different namespace for this.

We're going to create the following:

* A namespace called `spinnaker-system` to install Spinnaker in
* A service account for that namespace
* A role and rolebinding in that namespace, granting permissions to the service account
* A kubeconfig containing credentials for the service account

Halyard uses this kubeconfig file to create the Kubernetes deployment objects that create the microservices that compose Spinnaker.  This same kubeconfig is passed to Spinnaker so that Spinnaker can see and manage its own resources.

This document uses the Armory `spinnaker-tools` Go CLI (available on [Github](https://github.com/armory/spinnaker-tools)) to create many of these resources.  There are separate instructions to perform these steps manually.

1. Obtain the `spinnaker-tools` CLI tool.  Go to https://github.com/armory/spinnaker-tools/releases, and download the latest release for your operating system (OSX and Linux available).  You can also use curl:

   ```bash
   # If you're not already in the directory
   cd ~/aks-spinnaker
   # If you're on Linux instead of OSX, use this URL instead:
   # https://github.com/armory/spinnaker-tools/releases/download/0.0.7/spinnaker-tools-linux
   curl -L https://github.com/armory/spinnaker-tools/releases/download/0.0.7/spinnaker-tools-darwin -o spinnaker-tools
   chmod +x spinnaker-tools
   ```

1. Run the tool.  Feel free to substitute other values for the parameters:

   ```bash
   SOURCE_KUBECONFIG=kubeconfig-aks
   CONTEXT=$(kubectl --kubeconfig ${SOURCE_KUBECONFIG} config current-context)
   DEST_KUBECONFIG=kubeconfig-spinnaker-system-sa
   SPINNAKER_NAMESPACE=spinnaker-system
   SPINNAKER_SERVICE_ACCOUNT_NAME=spinnaker-service-account

   ./spinnaker-tools create-service-account \
     --kubeconfig ${SOURCE_KUBECONFIG} \
     --context ${CONTEXT} \
     --output ${DEST_KUBECONFIG} \
     --namespace ${SPINNAKER_NAMESPACE} \
     --service-account-name ${SPINNAKER_SERVICE_ACCOUNT_NAME}
   ```

This creates a file called `kubeconfig-spinnaker-system-sa` (or something similar, if you're using a different namespace for Spinnaker)

## Create an AZS source for Spinnaker

Spinnaker uses an AZS bucket to store persistent configuration (such as pipeline definitions).  This section will create a storage resoruce group and a storage account. 

1. Create a resource group for your storage account in a location available for your account.
   ```bash
   STORAGE_RESOURCE_GROUP="SpinnakerStorage"
   az group create --name ${STORAGE_RESOURCE_GROUP}  --location <location>
   ```

1. Create a storage account using a globally unique name.
   ```bash
   STORAGE_ACCOUNT_NAME=<unique-storage-account-name>
   az storage account create --resource-group ${STORAGE_RESOURCE_GROUP} --sku STANDARD_LRS --name ${STORAGE_ACCOUNT_NAME}
   STORAGE_ACCOUNT_KEY=$(az storage account keys list --resource-group ${STORAGE_RESOURCE_GROUP} --account-name ${STORAGE_ACCOUNT_NAME} --query "[0].value" | tr -d '"')
   ```
    Keep the following Azure requirements in mind when defining `STORAGE_ACCOUNT_NAME`: 
      * The name must be between 3 and 24 characters
      * Only numbers and lowercase characters are valid
    
## Stage files on the `Halyard machine`

In the `aks-spinnaker` working directory, create the following folders:

* `.hal`
* `.secret`
* `resources`

```bash
WORKING_DIRECTORY=~/aks-spinnaker/
mkdir -p ${WORKING_DIRECTORY}/.hal
mkdir -p ${WORKING_DIRECTORY}/.secret
mkdir -p ${WORKING_DIRECTORY}/resources
```

You should have one file:

* A kubeconfig file (`kubeconfig-spinnaker-system-sa`) with the credentials for a service account in your aks cluster

Copy the file into `.secret` so it is available to your Halyard docker container:

```bash
cp kubeconfig-spinnaker-system-sa ${WORKING_DIRECTORY}/.secret
```

## Start the Halyard container

On the `docker machine`, start the Halyard container (see the `armory/halyard-armory` [tag list](https://hub.docker.com/r/armory/halyard-armory/tags)) for the latest Armory Halyard Docker image tag.

*If you want to install OSS Spinnaker instead, use `gcr.io/spinnaker-marketplace/halyard:stable` for the Docker image*

```bash
docker run --name armory-halyard -it --rm \
  -v ${WORKING_DIRECTORY}/.hal:/home/spinnaker/.hal \
  -v ${WORKING_DIRECTORY}/.secret:/home/spinnaker/.secret \
  -v ${WORKING_DIRECTORY}/resources:/home/spinnaker/resources \
  armory/halyard-armory:<image_version>
```

**Note**: For image version, you must enter a valid version number, such as 1.8.1. Do not use `latest`. 

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

## Add the kubeconfig and cloud provider to Spinnaker (via Halyard)

From the `docker exec` separate terminal session, add (re-export) the relevant environment variables

```bash
###### Use the same values as the start of the document
# Enter the namespace that you want to install Spinnaker in.  This should have been created in the previous step.
export NAMESPACE="spinnaker-system"

# Enter the name you want Spinnaker to use to identify the cloud provider account
export ACCOUNT_NAME="spinnaker"

# Update this with the full path to your kubeconfig inside the container)
export KUBECONFIG_FULL=/home/spinnaker/.secret/kubeconfig-spinnaker-system-sa
```

Use the Halyard `hal` command line tool to add a Kubernetes account using your minified kubeconfig

Configure the kubeconfig and account:

```bash
# Enable the Kubernetes cloud provider
hal config provider kubernetes enable

# Add account
hal config provider kubernetes account add ${ACCOUNT_NAME} \
  --provider-version v2 \
  --kubeconfig-file ${KUBECONFIG_FULL} \
  --only-spinnaker-managed true \
  --namespaces ${NAMESPACE}
```

## Configure Spinnaker to install in Kubernetes

**Important: This will by default limit your Spinnaker to deploying to the namespace specified.  If you want to be able to deploy to other namespaces, either add a second cloud provider target or remove the `--namespaces` flag.**

Use the Halyard `hal` command line tool to configure Halyard to install Spinnaker in your Kubernetes cluster

```bash
hal config deploy edit \
  --type distributed \
  --account-name ${ACCOUNT_NAME} \
  --location ${NAMESPACE}
```

## Enable Artifacts

Within Spinnaker, 'artifacts' are consumable references to items that live outside of Spinnaker. An artifact could be a file in a git repository or a file in an S3 bucket.  This feature must be explicitly turned on.

Enable the "Artifacts" feature and the "http" artifact artifact provider:

```bash
# Enable artifacts
hal config features edit --artifacts true
hal config artifact http enable
```

In order to add specific types of artifacts, there are further configuration
items that must be completed.  For now, it is sufficient to just turn on the
artifacts feature with the http artifact provider.  This will allow Spinnaker
to retrieve files via unauthenticated http.

## Configure Spinnaker to use your AZS bucket

Use the Halyard `hal` command line tool to configure Halyard to configure Spinnaker to use your AZS storage account. 
`storage-container-name` is optional and has a default value of "spinnaker". If you're using a pre-existing container, update `storage-container-name` with the name of that container.

```bash
####### Inside the armory-halyard container

hal config storage azs edit \
    --storage-account-name <storage_account_name> \
    --storage-account-key <storage_account_key> \
    --storage-container-name <name>
    
# test connection to azs storage
hal config storage azs

# Set the storage source to AZS
hal config storage edit --type azs
```

## Choose the Spinnaker version

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
export VERSION=2.3.4
hal config version edit --version $VERSION
```

## Install Spinnaker

Now that your halconfig is completely configured for the initial Spinnaker, you can tell Halyard to actually install Spinnaker:

```bash
hal deploy apply
```

Once this is complete, congratulations!  Spinnaker is installed.  Now we have to access and expose it.

## Connect to Spinnaker using `kubectl port-forward`

Test connecting to Spinnaker from your workstation machine:

```bash
NAMESPACE=spinnaker-system
DECK_POD=$(kubectl -n ${NAMESPACE} get pod -l cluster=spin-deck -ojsonpath='{.items[0].metadata.name}')
GATE_POD=$(kubectl -n ${NAMESPACE} get pod -l cluster=spin-gate -ojsonpath='{.items[0].metadata.name}')
kubectl -n ${NAMESPACE} port-forward ${DECK_POD} 9000 &
kubectl -n ${NAMESPACE} port-forward ${GATE_POD} 8084 &
```

Then, you can access Spinnaker at http://localhost:9000

Trying to connect from a remote machine will not work because your browser attempts to access localhost on your local workstation rather than on the remote machine where the port is forwarded.

__Note:__ Even if the `hal deploy apply` command returns successfully, the 
installation may not be complete yet. This is especially the case with 
distributed Kubernetes installs. If you see errors such as `Connection refused`,
the containers may not be available yet. You can either wait 
or check the status of all of the containers using the command for your cloud provider,  
such as `kubectl get pods --namespace spinnaker`.

## Install the NGINX ingress controller

In order to expose Spinnaker to end users, you have perform the following actions:

* Expose the spin-deck (UI) Kubernetes service on some URL endpoint
* Expose the spin-gate (API) Kubernetes service on some URL endpoint
* Update Spinnaker (via Halyard) to be aware of the new endpoints

We're going to install the NGINX ingress controller on aks because of these limitations of the built-in aks Ingress controller:

* It only exposes NodePort services
* It only exposes services that respond with an `HTTP 200` to a `GET` on `/` or have a `readinessProbe` configured

If you already have an NGINX ingress controller installed on your cluster, skip this step.

Both of these are configurable with Spinnaker, but the NGINX ingress controller is also generally much more configurable.

From the `workstation machine` where `kubectl` is installed:

Install the NGINX ingress controller components:

```bash
kubectl --kubeconfig kubeconfig-aks apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml
```

If you are using a Kubernetes version earlier than 1.14, you need to change kubernetes.io/os to beta.kubernetes.io/os at line 217 of `mandatory.yaml`. See the [NGINX Ingress Controller](https://kubernetes.github.io/ingress-nginx/deploy/) documentation for more details.

Install the NGINX ingress controller aks-specific service:

```bash
kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/cloud-generic.yaml
```

## Set up the Ingress for `spin-deck` and `spin-gate`

Identify the URLs you will use to expose Spinnaker's UI and API.

```bash
# Replace with actual values
SPIN_DECK_ENDPOINT=<spinnaker.some-url.com>
SPIN_GATE_ENDPOINT=<api.some-url.com>
NAMESPACE=spinnaker-system
```

Create a Kubernetes Ingress manifest to expose spin-deck and spin-gate (change your hosts and namespace accordingly):

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
$ kubectl describe -n spinnaker-system ingress spin-ingress
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

Configuration of TLS certificates for ingresses is often very organization-specific.  In general, you want to do the following:

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
* Add Azure accounts to deploy applications to (see the [Open Source Spinnaker documentation](https://www.spinnaker.io/setup/install/providers/azure/))
* Add GCP accounts to deploy applications to (see the [Open Source Spinnaker documentation](https://www.spinnaker.io/setup/install/providers/gce/))
* Add AWS accounts to deploy applications to (see the [Open Source Spinnaker documentation](https://www.spinnaker.io/setup/install/providers/aws/))
