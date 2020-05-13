---
layout: post
title: Installing Spinnaker in GKE using Operator
order: 25
published: true
---

_Note: This guide is a work in progress._

This guide contains instructions for installing Armory Spinnaker on a GKE Cluster using the [Spinnaker Operator](/spinnaker/operator/). Refer to the [Spinnaker Operator Reference](/operator_reference/operator-config/) for manifest entry details.

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Prerequisites

This document is written with the following workflow in mind:

* You have a machine configured to use the `gcloud` CLI tool and a recent version of the `kubectl` tool
* You have logged into the `gcloud` CLI and have permissions to create GKE clusters and a service account


# Installation Summary

Installing Spinnaker with the Operator consists of the following steps:

* Create a cluster where Spinnaker and the Operator will reside
* Setup the Operator CRDs (custom resource definitions)
* Deploy Operator pods to the cluster
* Create a GCS service account
* Create a Kubernetes service account
* Create a GCS storage bucket
* Modify the Operator kustomize files for your installation
* Deploy Spinnaker through the Operator

# Create GKE Cluster

This creates a minimal GKE cluster in your default region and zone.

```bash
gcloud container clusters create spinnaker-cluster
export KUBECONFIG=kubeconfig-gke
gcloud container clusters get-credentials spinnaker-cluster
```

Check that namespaces have been created:

```bash
kubectl --kubeconfig kubeconfig-gke get namespaces
```

Output is similar to:

```bash
NAME STATUS AGE
default Active 2m24s
kube-node-lease Active 2m26s
kube-public Active 2m26s
kube-system Active 2m26s
```

# Setup Operator CRDs

Fetch the Spinnaker Operator manifests:

```bash
# RELEASE=v0.3.2 bash -c 'curl -L https://github.com/armory-io/spinnaker-operator/releases/download/${RELEASE}/manifests.tgz | tar -xz'

bash -c 'curl -L https://github.com/armory-io/spinnaker-operator/releases/latest/download/manifests.tgz | tar -xz'
```

Apply the custom resource definitions:

```bash
kubectl apply -f deploy/crds/
```

Output is similar to:

```bash
customresourcedefinition.apiextensions.k8s.io/spinnakerservices.spinnaker.armory.io created
customresourcedefinition.apiextensions.k8s.io/spinnakeraccounts.spinnaker.io created
```

# Deploy Operator

These steps create the spinnaker-operator namespace and deploys the Operator pods.

```bash
kubectl create ns spinnaker-operator

kubectl -n spinnaker-operator apply -f deploy/operator/cluster
```

Output is:

```bash
deployment.apps/spinnaker-operator created
configmap/halyard-config-map created
clusterrole.rbac.authorization.k8s.io/spinnaker-operator-role created
clusterrolebinding.rbac.authorization.k8s.io/spinnaker-operator-binding created
serviceaccount/spinnaker-operator created
```

# Create GCS Service Account

```bash
export SERVICE_ACCOUNT_NAME=<name-for-your-service-account>
export SERVICE_ACCOUNT_FILE=<name=for-your-service-account.json>
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

# Create Kubernetes Service Account

```bash
CONTEXT=$(kubectl config current-context)

# This service account uses the ClusterAdmin role -- this is not necessary,
# more restrictive roles can by applied.
kubectl apply --context $CONTEXT \
    -f https://spinnaker.io/downloads/kubernetes/service-account.yml

TOKEN=$(kubectl get secret --context $CONTEXT \
   $(kubectl get serviceaccount ${SERVICE_ACCOUNT_NAME} \
       --context $CONTEXT \
       -n spinnaker \
       -o jsonpath='{.secrets[0].name}') \
   -n spinnaker \
   -o jsonpath='{.data.token}' | base64 --decode)

kubectl config set-credentials ${CONTEXT}-token-user --token $TOKEN

kubectl config set-context $CONTEXT --user ${CONTEXT}-token-user
```

# Create GCS Bucket

Use the Cloud Console to do create your bucket. If you're going to put secrets in the bucket, make sure to create a secrets directory in the bucket. Also, ensure the bucket is accessible from the service account you created.

# Customize the Kustomize Files

**deploy/spinnaker/kustomize/config-patch.yml**

- Update Spinnaker version to deploy
- Set the persistent storage type, bucket, rootFolder, project, jsonPath (pick something unique)
- Add `gcs`` to the config patch

	```yaml
    config:
      version: 2.19.8  
      persistentStorage:
        persistentStoreType: gcs
        gcs:
          bucket: <your-bucket-name>
          rootFolder: front50
          project: <your-project-name>
          jsonPath: <your-unique-gcs-account.json>
    ```

**deploy/spinnaker/kustomize/files-patch.yml**

Under files, add a file for the `your-unique-gcs-account.json`. This will be the content from the GCS service account you created above. The file is named `gcs-account.json` in the following example:

```yaml
files:
  gcs-account.json: |
    {
      "type": "service_account",
      "project_id": "cloud-project",
      "private_key_id": "cf04d5d545bOTHERSTUFFHERE9f9d134f",
      "private_key": "-----BEGIN PRIVATE KEY-----\nSTUFF HERE\n-----END PRIVATE KEY-----\n",
      "client_email": <your-client-email>,
      "client_id": <your-client-id>,
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": <your-cert-url>
    }
```

# Add the Kubernetes Provider Account

There are a few ways to do this with Operator. This uses the typical way of doing it with config. The Account CRD is probably the way this will be done in the future.

Update the `config-patch.yml` with the provider accounts:

```yaml
providers:
  kubernetes:
    enabled: true
    accounts:
    - name: spinnaker
      kubeconfigFile: gke-kubeconfig
      providerVersion: V2
      serviceAccount: false
      onlySpinnakerManaged: false
    primaryAccount: spinnaker
```

You have a couple of ways to get that `kubeconfig` file into the config. From least secure to more secure,  you can put the `kubeconfig`:

- In the `files-patch.yml` (like the example above shows)
- In a Kubernetes secret for the Spinnaker namespace
- In a bucket
- In Vault

For the first option, the `gke-kubeconfig` file is then added into the `files-patch.yml` like this:

```yaml
gke-kubeconfig: |
  apiVersion: v1
  clusters:
    - cluster:
        certificate-authority-data: LS0tLSSTUFFo=
        server: https://35.223.76.205
      name: gke_cloud-armory_us-central1-c_spinnaker-cluster
  contexts:
```

For the third option, the `gke-kubeconfig` file is copied to a bucket. Then the `config-patch.yml` references the location of that file for the `kubeconfig` file key like this:

```
kubeconfigFile: encryptedFile:gcs!b:bucketname!f:secrets/kubeconfig-gke
```

# Install Kustomize (optional)

You can do a `kubectl -k` to deploy Kustomize templates, but what may be more helpful is to install Kustomize so that you can build Kustomize and look at the YAML first. Note that Kustomize is installed as part of `kubectl`.

```bash
curl -s "https://raw.githubusercontent.com/\
kubernetes-sigs/kustomize/master/hack/install_kustomize.sh"  | bash
sudo mv kustomize /usr/local/bin/
```

# Deploy Spinnaker Using Kustomize

```bash
kubectl create ns <spinnaker-namespace>
kustomize build deploy/spinnaker/kustomize | kubectl -n <spinnaker-namespace> apply -f -
```

# Configure Ingress

The `SpinnakerService.yml` file contains an `expose` section fthat defines how a LoadBalancer object will be setup to publicly expose Deck and Gate. See [spec.expose](/operator_reference/operator-config/#specexpose) for details.


# Configure Authentication

To enable basic form authentication in Spinnaker as in this KB [article](https://kb.armory.io/installation/enabling-basic-auth/), you need to understand how your `kustomization.yml` file is [configured](https://github.com/kubernetes-sigs/kustomize/blob/master/docs/fields.md). If you have the `profiles-patch.yml`, you are telling Kustomize to overwrite the profiles section of the config with entries for each of the components (clouddriver, deck, gate, etc). So you can put all of the entries for those profile files into `profiles-patch.yml`.

Here is an example `profiles-patch.yml` with Kustomize turned on and basic form authentication configured.

**profiles-patch.yml**

```yaml
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker  # name doesn't matter since this is a patch
spec:
  # spec.spinnakerConfig - This section is how to specify configuration spinnaker
  spinnakerConfig:
    # spec.spinnakerConfig.profiles - This section contains the YAML of each service's profile
    profiles:
      clouddriver: {} # is the contents of ~/.hal/default/profiles/clouddriver.yml
      # deck has a special key "settings-local.js" for the contents of settings-local.js
      deck:
        # settings-local.js - contents of ~/.hal/default/profiles/settings-local.js
        # Use the | YAML symbol to indicate a block-style multiline string
        settings-local.js: |
          window.spinnakerSettings.feature.kustomizeEnabled = true;
          window.spinnakerSettings.feature.artifactsRewrite = true;
          window.spinnakerSettings.authEnabled = true;
      echo: {}    # is the contents of ~/.hal/default/profiles/echo.yml
      fiat: {}    # is the contents of ~/.hal/default/profiles/fiat.yml
      front50: {} # is the contents of ~/.hal/default/profiles/front50.yml
      gate:
        security:
          basicform:
            enabled: true
          user:
            name: spin
            password: spin4u99
      igor: {}    # is the contents of ~/.hal/default/profiles/igor.yml
      kayenta: {} # is the contents of ~/.hal/default/profiles/kayenta.yml
      orca: {}    # is the contents of ~/.hal/default/profiles/orca.yml
      rosco: {}   # is the contents of ~/.hal/default/profiles/rosco.yml
```

Alternately, you can include a separate patch file for each component and then reference the component in the `kustomization.yml` file. See the Kustomize [docs](https://github.com/kubernetes-sigs/kustomize/tree/master/docs) for details.

# Configure Dinghy

Create a `patch-dinghy.yml` file with the following contents:

```yaml
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    config:
      armory:
        dinghy:
          enabled: true
          templateOrg: yourorg
          templateRepo: yourrepo
          githubToken: yourtoken
          githubEndpoint: https://api.github.com
          dinghyFilename: dinghyfile
          autoLockPipelines: true
          notifiers:
            slack:
              enabled: false
```

Now add an entry to the end of `kustomization.yml` to include `patch-dinghy.yml`.

# Other Patch Files

You can add additional patch files to turn on functionality. Examples are in the `minnaker` [repository](https://github.com/armory/minnaker/tree/master/operator/install).

# Set Up TLS:
@TODO
