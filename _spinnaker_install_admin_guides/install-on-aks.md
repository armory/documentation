---
layout: post
title: Installing Spinnaker in AKS
order: 26
published: true
redirect_from:
  - /spinnaker_install_admin_guides/install_on_aks/
  - /spinnaker_install_admin_guides/install-on-aks/
  - /spinnaker-install-admin-guides/install_on_aks/
---

This guide describes how to install Spinnaker in Azure Kubernetes Service (AKS).  To do this, the guide walks you through creating and using the following Azure resources:

* An AKS cluster. You can also use an existing cluster.
* An AZS (Azure Storage) bucket. You can also use an existing bucket.
* An NGINX Ingress controller in your AKS cluster. This resource is only needed if your cluster doesn't already have an ingress installed. Note that the examples on this page for NGINX only work on Kubernetes version 1.14 or later. 

This document does not cover the following: 

* TLS Encryption
* Authentication and authorization
* Add K8s accounts to deploy to
* Add cloud accounts to deploy to

See [Next Steps](#next-steps) for resources related to these topics.

**Note**: This document focuses on Armory Spinnaker. You can install Open Source Spinnaker by using a different Halyard container and a corresponding Open Source Spinnaker version.

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Prerequisites

To follow the steps described in this guide, make sure the following prerequisites are met:

* You have login credentials to Azure that allow you to create resources
* You have an Azure subscription defined where you will install Spinnaker
* You have `az` (the Azure CLI tool) and a recent version of `kubectl` (the Kubernetes CLI tool) on a machine (referred to as the `workstation machine`). 
* You have Docker available and can run containers on a machine (referred to as the `Halyard machine`). An easy way to install Docker on your machine is with [Docker Desktop](https://www.docker.com/products/docker-desktop).
* You can transfer files created on the `workstation machine` to the Docker container that runs Halyard on the  `Halyard machine`.
* The `workstation` and `Halyard` machines can be the same machine

### Workstation machine details

On the `workstation machine`, you need both `az` and `kubectl` installed to create and manage Azure and Kubernetes resources.

With `az`, you create and manage the following resources:

  * AKS clusters
  * AZS buckets
 
With `kubectl`, you need to 

* Have a persistent working directory in which to work in.  This guide uses `~/aks-spinnaker`
* Create AKS resources, such as service accounts that will be permanently associated with your Spinnaker cluster

### Halyard machine details

Halyard (the tool used to install and manage Spinnaker) runs in a Docker container on the `Halyard machine`. To make this process more seamless, this guide describes how to configure the following volume mounts, which need persisted or preserved to manage your Spinnaker cluster:

  * `.hal` directory (mounted to `/home/spinnaker/.hal`) - Stores all Halyard Spinnaker configurations in a `.hal/config` YAML file and assorted subdirectories
  * `.secret` directory (mounted to `/home/spinnaker/.secret`) Stores all external secret keys and files used by Halyard. This includes the `kubeconfig` files and Azure IAM service account keys you create as part of this guide.
  * `resources` directory (mounted to `/home/spinnaker/resources`


## Installation Summary

In order to install Spinnaker, this document covers the following things:

* Generating a `kubeconfig` file, which is a Kubernetes credential file that Halyard and Spinnaker uses to communicate with the Kubernetes cluster where Spinnaker gets installed
* Creating an AZS bucket for Spinnaker to store persistent configurations in
* Running the Halyard daemon in a Docker container
  * Persistent configuration directories from the workstation/host get mounted into the container
* Running the `hal` client interactively in the same Docker container to perform the following actions:
  * Build out the Halyard config YAML file (`.hal/config`)
  * Configure Spinnaker/Halyard to use the `kubeconfig` to install Spinnaker
  * Configure Spinnaker with IAM credentials and bucket information
  * Turn on other recommended settings (artifacts and http artifact provider)
  * Install Spinnaker
  * Expose Spinnaker

## Create the AKS cluster

This guide assumes you have already installed the `az` CLI on your workstation and are familiar with its use. For more information about `az`, see [The Azure Command-Line Interface](https://docs.microsoft.com/en-us/cli/azure/?view=azure-cli-latest).

This creates a minimal AKS cluster.  Follow the official AKS instructions to set up a different type of AKS cluster.

To create an AKS cluster, perform the following steps on the `workstation machine`, which has `az` and `kubectl` installed:

1. Create the local working directory:  

   ```bash
   mkdir ~/aks-spinnaker
   cd ~/aks-spinnaker
   ```
   
   For this guide, use the `~/aks-spinnaker` directory, but this can be any persistent directory on any Linux or OSX machine.

2. Run the following commands to set up the `az` CLI:

   ```bash
   az login
   az account list
   az account set --subscription <your-subscription-id>
   ```

3. Determine which Azure locations (like `westus`) are available for your account:
   
   ```bash
   az account list-locations --query "[].name"
   ```

4. Create a resource group for your AKS cluster in a location available for your account.
   
   ```bash
   RESOURCE_GROUP="Spinnaker"
   az group create --name ${RESOURCE_GROUP}  --location <location>
   ```

5. Skip this step if you are using an existing AKS cluster. Create the AKS cluster: 

   ```bash
   az aks create --resource-group ${RESOURCE_GROUP} --name spinnaker-cluster --node-count 2 --enable-addons monitoring --generate-ssh-keys
   ```

6. Configure the Kubernetes context so that `kubectl` uses your AKS cluster:
    
   To use the cluster created in the previous step, run the following command:

   ```bash
   export KUBECONFIG=kubeconfig-aks
   az aks get-credentials --resource-group ${RESOURCE_GROUP} --name spinnaker-cluster --file ${KUBECONFIG}
   ```

   To use an existing AKS cluster, run the following command:

   ```bash
   export KUBECONFIG=kubeconfig-aks
   az aks get-credentials --resource-group <your-resource-group> --name <your-cluster-name> --file ${KUBECONFIG}
   ```

7. Verify that you have access to the cluster:

   ```bash
   kubectl --kubeconfig kubeconfig-aks get nodes
   ```

## Create a `kubeconfig` file for Halyard and Spinnaker

In this guide, we install Spinnaker in its own namespace (`spinnaker-system`) in your AKS cluster; you can use a different namespace for this.

This section of the guide describes how to do create the following:

* A namespace called `spinnaker-system` to install Spinnaker in
* A service account for that namespace
* A role and rolebinding in that namespace, granting permissions to the service account
* A kubeconfig containing credentials for the service account

Halyard uses this `kubeconfig` file to create the Kubernetes deployment objects that create the microservices that compose Spinnaker.  This same kubeconfig is passed to Spinnaker so that Spinnaker can see and manage its own resources.

We use the Armory `spinnaker-tools` Go CLI (available on [Github](https://github.com/armory/spinnaker-tools)) to create many of these resources.  There are separate instructions to perform these steps manually.

1. Obtain the `spinnaker-tools` CLI tool.  Go to https://github.com/armory/spinnaker-tools/releases, and download the latest release for your operating system (OSX and Linux available).  Alternatively, run the following commands::

   ```bash
   # If you're not already in the directory
   cd ~/aks-spinnaker
   # If you're on Linux instead of OSX, use this URL instead:
   # https://github.com/armory/spinnaker-tools/releases/download/0.0.7/spinnaker-tools-linux
   curl -L https://github.com/armory/spinnaker-tools/releases/download/0.0.7/spinnaker-tools-darwin -o spinnaker-tools
   chmod +x spinnaker-tools
   ```

2. Run `spinnaker-tools`.  You can substitute other values for the parameters:

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

The commands create a file called `kubeconfig-spinnaker-system-sa` (or something similar if you're using a different namespace for Spinnaker).

## Create an AZS source for Spinnaker

Spinnaker uses an AZS bucket to store persistent configuration (such as pipeline definitions).  This section walks you through creating a storage resource group and a storage account. 

1. Create a resource group for your storage account in a location available for your account:
   ```bash
   STORAGE_RESOURCE_GROUP="SpinnakerStorage"
   az group create --name ${STORAGE_RESOURCE_GROUP}  --location <location>
   ```

1. Create a storage account using a globally unique name:
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

The `aks-spinnaker` working directory should contain the following file:

* A kubeconfig file (`kubeconfig-spinnaker-system-sa`) with the credentials for a service account in your aks cluster

Copy the file into `.secret` so that it is available to your Halyard Docker container:

```bash
cp kubeconfig-spinnaker-system-sa ${WORKING_DIRECTORY}/.secret
```

## Start the Halyard container

On the `Halyard machine`, start the Halyard container (see the `armory/halyard-armory` [tag list](https://hub.docker.com/r/armory/halyard-armory/tags)) for the latest Armory Halyard Docker image tag.

*If you want to install OSS Spinnaker instead, use `gcr.io/spinnaker-marketplace/halyard:stable` for the Docker image.*

```bash
docker run --name armory-halyard -it --rm \
  -v ${WORKING_DIRECTORY}/.hal:/home/spinnaker/.hal \
  -v ${WORKING_DIRECTORY}/.secret:/home/spinnaker/.secret \
  -v ${WORKING_DIRECTORY}/resources:/home/spinnaker/resources \
  armory/halyard-armory:<image_version>
```

**Note**: For image version, you must enter a valid version number, such as 1.8.1. Do not use `latest`. 

## Enter the Halyard container

From a separate terminal session on your `halyard machine`, create a second bash/shell session on the Docker container:

```bash
docker exec -it armory-halyard bash

# Once in the container, you can run these commands for a friendlier environment to:
# - prompt with information
# - alias for ls
# - cd to the home directory
export PS1="\h:\w \u\$ "
alias ll='ls -alh'
cd ~
```

## Add the kubeconfig and cloud provider to Spinnaker (via Halyard)

From the `docker exec` terminal session, add (re-export) the relevant environment variables:

```bash
###### Use the same values as the start of the document
# Enter the namespace that you want to install Spinnaker in.  This should have been created in the previous step.
export NAMESPACE="spinnaker-system"

# Enter the name you want Spinnaker to use to identify the cloud provider account
export ACCOUNT_NAME="spinnaker"

# Update this with the full path to your kubeconfig inside the container)
export KUBECONFIG_FULL=/home/spinnaker/.secret/kubeconfig-spinnaker-system-sa
```

Use the Halyard `hal` command line tool to add a Kubernetes account using your minified kubeconfig:

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

**Important: The `--location` limits your Spinnaker to deploying to the namespace specified.  If you want to be able to deploy to other namespaces, either add a second cloud provider target or remove the `--location` flag.**

Use the Halyard `hal` command line tool to configure Halyard to install Spinnaker in your Kubernetes cluster

```bash
hal config deploy edit \
  --type distributed \
  --account-name ${ACCOUNT_NAME} \
  --location ${NAMESPACE}
```

## Enable Artifacts

Within Spinnaker, 'artifacts' are consumable references to items that live outside of Spinnaker. An artifact can be a file in a git repository or a file in an S3 bucket.  This feature must be explicitly turned on.

Enable the "Artifacts" feature and the "http" artifact artifact provider:

```bash
# Enable artifacts
hal config features edit --artifacts true
hal config artifact http enable
```

To add specific types of artifacts, additional configuration must be completed.  For now, it is sufficient to just turn on the
artifacts feature with the `http` artifact provider.  This allows Spinnaker to retrieve files via unauthenticated http.

## Configure Spinnaker to use your AZS bucket

Use the Halyard `hal` command line tool to configure Spinnaker to use your AZS storage account. 
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

Before Halyard installs Spinnaker, you should specify the version of Spinnaker you want to use.

Get a list of available versions of spinnaker with this command:

```bash
hal version list
```
Note that Armory Spinnaker uses a major version numbering scheme that is one version higher than Open Source Spinnaker. For example, Armory Spinnaker  `2.x.x` correlates to Open Source Spinnaker `1.x.x`.

After you decide on a version, run the following commands to specify the version: 

```bash
# Replace with version of choice:
export VERSION=<version>
hal config version edit --version $VERSION
```

Replace `<version>` with a valid version, such as `2.18`.

## Install Spinnaker

Now that your `hal` config is configured, install Spinnaker with the following `hal` command:

```bash
hal deploy apply
```

Once this is complete, congratulations! Spinnaker is installed.  Now we have to access and expose it.

## Connect to Spinnaker using `kubectl port-forward`

Test connecting to Spinnaker from your workstation machine:

```bash
NAMESPACE=spinnaker-system
DECK_POD=$(kubectl -n ${NAMESPACE} get pod -l cluster=spin-deck -ojsonpath='{.items[0].metadata.name}')
GATE_POD=$(kubectl -n ${NAMESPACE} get pod -l cluster=spin-gate -ojsonpath='{.items[0].metadata.name}')
kubectl -n ${NAMESPACE} port-forward ${DECK_POD} 9000 &
kubectl -n ${NAMESPACE} port-forward ${GATE_POD} 8084 &
```

Then, you can access Spinnaker at `http://localhost:9000`.

Trying to connect from a remote machine will not work because your browser attempts to access localhost on your local workstation rather than on the remote machine where the port is forwarded.

__Note:__ Even if the `hal deploy apply` command returns successfully, the 
installation may not be complete yet. This is especially the case with 
distributed Kubernetes installs. If you see errors such as `Connection refused`,
the containers may not be available yet. Either wait and try again
or check the status of all of the containers using the command for your cloud provider,  
such as `kubectl get pods --namespace spinnaker`.

Once the pods are running and Spinnaker is available, you can access Deck (Spinnaker's UI) at http://localhost:9000. 

Note that trying to connect from a remote machine will not work because your browser attempts to access localhost on your local workstation rather than on the remote machine where the port is forwarded.


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
