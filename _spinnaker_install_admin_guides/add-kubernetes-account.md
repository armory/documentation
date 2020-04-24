---
layout: post
title: Creating and Adding a Kubernetes Account to Spinnaker (Deployment Target)
order: 31
# Change this to true when ready to publish
published: true
redirect_from:
  - /spinnaker_install_admin_guides/aws-kubernetes-account/
  - /spinnaker_install_admin_guides/add_kubernetes_account/
  - /spinnaker-install-admin-guides/add_kubernetes_account/
---

Once you have (OSS or Armory) Spinnaker up and running in Kubernetes, you'll want to start adding deployment targets.

This document assumes the following conditions are true:

* Spinnaker was installed with the Operator or Halyard.
* If Spinnaker was installed with the Operator, you have access to the `SpinnakerService` manifest, and have the kubeconfig for the Spinnaker cluster.
* If Spinnaker was installed with Halyard, you have access to your current halconfig (and a way to operate `hal` against it).
* You have a kubeconfig with permissions to create the relevant Kubernetes entities (`service account`, `role`, and `rolebinding`) in the target cluster.

_This document only covers the Kubernetes V2 provider_

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Overview

This document will guide you through the following:

* Creating the namespace in which the Service Account will live (if it does not yet exist)
* Creating the service account in the Service Account namespace
* If granting cluster admin (`cluster-admin`), a clusterrolebinding attaching the `cluster-admin` ClusterRole to the service account
* If granting namespace-specific access, the following:
  * For each namespace, the namespace (if it does not exist)
  * For each target namespace, an admin role
  * For each target namespace, a rolebinding attaching the admin role to the service account
* Creating a minified kubeconfig containing only the service account
* Adding the account to Spinnaker

## Background

At a high level, Spinnaker operates in the following way when deploying to Kubernetes:

* Spinnaker is configured with one or more "Cloud Provider" Kubernetes accounts (which you can think of as deployment targets)
* For each Kubernetes account, Spinnaker is provided a kubeconfig to connect to that Kubernetes cluster
* The kubeconfig should have the following contents:
  * A Kubernetes kubeconfig `cluster`, which is typically a URL and potentially certificate validation information (CA cert or a flag to skip validation)
  * A Kubernetes kubeconfig `user`, which is basically a way to get a set of credentials to connect to the Kubernetes cluster.  This can be a token, a set of commands to run to get a token, or a client certificate
  * A Kubernetes kubeconfig `context`, which tells the `kubectl` tool which credential set to use with which cluster, as well as other information such as default namespace
  * Metadata such as which context to use by default
* Each Kubernetes account is configured in the `SpinnakerService` manifest under `spec.spinnakerConfig.config.providers.kubernetes.accounts` key if using the Operator, or under the master `.hal/config` YAML file (also known as a "Halconfig"), as an entry in the deploymentConfiguration's `providers.kubernetes.accounts` array if using Halyard.  Each entity has these (and other) fields:
  * `name`: A Spinnaker-internal name used to refer to the Kubernetes account.  This is the item you will select in various Kubernetes stages to indicate that you would like to deploy to this particular Kubernetes account (which again, consists of a Kubernetes cluster/credential/context set)
  * `kubeconfigFile`: A file path referencing the contents of the kubeconfig file for connecting to the target cluster. When using the Operator, this can be any name that should match an entry in `spec.spinnakerConfig.files` where the file contents is copied. If using Halyard, this is a physical file path. This field supports referencing files stored in external [secret engines](/spinnaker-install-admin-guides/secrets/)
  * `onlySpinnakerManaged`: A boolean that indicates whether Spinnaker should only manage / display entities that were created by Spinnaker (i.e., those that have the Spinnaker labels and annotations that indicate that they were created by Spinnaker)
  * `namespaces`: An array of namespaces that Spinnaker will be allowed to deploy to.  If this is left blank, Spinnaker will be allowed to deploy to all namespaces
  * `omitNamespaces`: If namespaces is left blank, you can blacklist specific namespaces to indicate to Spinnaker that it should not deploy to those namespaces
* Spinnaker uses `kubectl` under the hood, so any semantics that `kubectl` specifies, Spinnaker will also use
* `kubectl` (and the corresponding kubeconfig) will be run from the Spinnaker Clouddriver Kubernetes pod
* If the kubeconfig is properly referenced and available, Operator or Halyard will take care of the following for you:
  * Creating a Kubernetes secret (with a dynamically-generated name) containing your kubeconfig in the namespace where Spinnaker lives
  * Dynamically generating a `clouddriver.yml` file (if using Halyard, this is placed locally in `.hal/default/staging/clouddriver.yml`) that properly references the kubeconfig from where it is mounted within the Clouddriver container
  * Creating/Updating the Kubernetes Deployment (`spin-clouddriver`) which runs Clouddriver so that it is aware of the secret and properly mounts it in the Clouddriver pod (if using Halyard, it will be placed in `/home/spinnaker/.hal/default/staging/dependencies/<some-filename>`)
  * Creating a secret containing `clouddriver.yml` (and optionally, `clouddriver-local.yml`) and including it in the spin-clouddriver deployment

So here are some takeaways and guiding principles that result from the above:

* Spinnaker relies on the kubeconfig to authenticate against and access your Kubernetes cluster.
* You can use a command-based or auth-provider-based kubeconfig user (such as `aws-iam-authenticator`), but this will rely on the command binary and all relevant files existing in the Clouddriver, and all authentication (such as IAM roles) being properly attached to the Clouddriver container.
* Alternately (and perhaps, preferably), you can do the following:
  * Create a Kubernetes service account in your Kubernetes cluster.  This service account will exist in some specific namespace.
  * Grant the service account permissions on your cluster.  This can be one or more of the following:
    * `cluster-admin` access, to be able to access all namespaces in your cluster
    * Full wildcard (apiGroup `*` / resource `*` / verb `*`) access to one or more namespaces in your cluster
    * More specific permissions in your cluster (this is not covered in the scope of this document)
* It is preferable to create a distinct kubeconfig file for each Spinnaker Cloud Provider Kubernetes account; each of these kubeconfigs should have **one** cluster, **one** user, and **one** context referencing the cluster and user.  Its default context should reference the single context

## Prerequisites

This document assumes the following:

* Your Spinnaker is up and running
* Your Spinnaker was installed and configured via Operator or Halyard
* You have a valid kubeconfig that currently has Cluster Admin access to your target Kubernetes cluster, and you have `kubectl` and are able to use it to interact with your target Kubernetes cluster.

The first several steps of this document will take place on a system that has `kubectl` and the kubeconfig.

## Setting up the Service Account

We're going to create the following:

* A namespace to create the service account in
* A service account in that namespace
* A role and rolebinding in that namespace, granting permissions to the service account
* A kubeconfig containing credentials for the service account

This document uses the newly-created Armory `spinnaker-tools` Go CLI (available on [Github](https://github.com/armory/spinnaker-tools)) to create many of these resources.  There are separate instructions to perform these steps manually.

### Get the tool

First, obtain the tool.  Go to https://github.com/armory/spinnaker-tools/releases, and download the latest release for your operating system (OSX and Linux available).  You can also use curl:

```bash
# If you're not already in the directory
cd ~/eks-spinnaker
# Replace this with the correct version and link for your workstation (use https://github.com/armory/spinnaker-tools/releases/download/0.0.3/spinnaker-tools-linux if you're on Linux instead of Mac)
curl -L https://github.com/armory/spinnaker-tools/releases/download/0.0.3/spinnaker-tools-darwin -o spinnaker-tools
chmod +x spinnaker-tools
```

### Set up bash parameters

First, we'll set up bash environment variables that will be used by later commands

```bash
# If you're using a different source kubeconfig, specify it here
export SOURCE_KUBECONFIG=${HOME}/.kube/config

# Specify the name of the kubernetes context that has permissions in your target cluster.
# To get context names, you can run "kubectl config get-contexts".
export CONTEXT="aws-armory-dev"

# Enter the namespace where you want the Spinnaker service account to live
export SPINNAKER_NAMESPACE="spinnaker-system"

# Enter the name of the service account you want to create in the target namespace.
# If you are creating multiple Kubernetes Cloud Provider Accounts to point to
# different namespaces in to the same Kubernetes cluster, make sure you use a
# unique service account name.
export SPINNAKER_SERVICE_ACCOUNT_NAME="spinnaker-dev-sa"

# Specify where you want the new kubeconfig to be created
export DEST_KUBECONFIG=${PWD}/kubeconfig-dev-sa

# If you want to deploy to a specific set of namespaces, enter the namespaces
# that you want to deploy to (space-delimited).
# These namespaces can already exist, or you can create them.
export TARGET_NAMESPACES_COMMA_SEPARATED=dev-1,dev-2
```

### Option 1: Create the service account with cluster-admin permissions

```bash
./spinnaker-tools create-service-account \
  --kubeconfig ${SOURCE_KUBECONFIG} \
  --context ${CONTEXT} \
  --output ${DEST_KUBECONFIG} \
  --namespace ${SPINNAKER_NAMESPACE} \
  --service-account-name ${SPINNAKER_SERVICE_ACCOUNT_NAME}
```

### Option 2: Create the service account with namespace-specific permissions

```bash
./spinnaker-tools create-service-account \
  --kubeconfig ${SOURCE_KUBECONFIG} \
  --context ${CONTEXT} \
  --output ${DEST_KUBECONFIG} \
  --namespace ${SPINNAKER_NAMESPACE} \
  --service-account-name ${SPINNAKER_SERVICE_ACCOUNT_NAME} \
  --target-namespaces ${TARGET_NAMESPACES_COMMA_SEPARATED}
```

## Add the kubeconfig and cloud provider to Spinnaker

**Operator**

Add the following configuration to the `SpinnakerServce` manifest, replacing values as needed:

```yaml
apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    config:
      providers:
        kubernetes:
          enabled: true
          accounts:
          - name: spinnaker-dev # Account name you want Spinnaker to use to identify the deployment target
            requiredGroupMembership: []
            providerVersion: V2
            permissions: {}
            dockerRegistries: []
            configureImagePullSecrets: true
            cacheThreads: 1
            namespaces: [] # Change if you only want to deploy to specific namespaces
            omitNamespaces: []
            kinds: []
            omitKinds: []
            customResources: []
            cachingPolicies: []
            oAuthScopes: []
            onlySpinnakerManaged: false
            kubeconfig: kubeconfig-spinnaker-dev
          primaryAccount: spinnaker-dev  # Change to a desired account from the accounts array
      features:
        artifacts: true # Not strictly necessary for Kubernetes but will be useful in general
    files:
      kubeconfig-spinnaker-dev: |
        <FILE CONTENTS HERE>
```

Finally, apply the changes

```bash
kubectl -n <spinnaker namespace> apply -f <SpinnakerService manifest file>
```

**Halyard**

You should copy the kubeconfig to a place accessible to halyard; this choice is left to the reader, but one option is `~/.secret/`, which can be mounted into your halyard container

First, we'll set up bash environment variables that will be used by later commands

```bash
# Replace with the name of your kubeconfig file
export KUBECONFIG_FILE=KUBECONFIG_FILE_NAME # This must be updated

# Enter the account name you want Spinnaker to use to identify the deployment target (should be the same as above)
export ACCOUNT_NAME="spinnaker-dev"

# If you only want to deploy to specific namespaces (should be the same as above)
export TARGET_NAMESPACES=(dev-1 dev-2)
```

Set up the initial Kubernetes cloud provider account:

```bash
# Feel free to reference a different location
KUBECONFIG_DIRECTORY=~/.secret/
cp ${KUBECONFIG_FILE} ${KUBECONFIG_DIRECTORY}
export KUBECONFIG_FULL=$(realpath ${KUBECONFIG_DIRECTORY}${KUBECONFIG_FILE})

# Enable the kubernetes provider - this is probably already enabled, if Spinnaker is installed in Kubernetes
hal config provider kubernetes enable
# Enable artifacts; not strictly necessary for Kubernetes but will be useful in general
hal config features edit --artifacts true

# Add account
hal config provider kubernetes account add ${ACCOUNT_NAME} \
  --provider-version v2 \
  --kubeconfig-file ${KUBECONFIG_FULL}
```

If you are configuring to only deploy to specific namespaces:

```bash
# Loop and add namespaces
for TARGET_NS in ${TARGET_NAMESPACES[@]}; do
  hal config provider kubernetes account edit ${ACCOUNT_NAME} \
    --add-namespace ${TARGET_NS}
done
```

Apply your changes:

```bash
# Apply changes
hal deploy apply
```

## Done!

After your changes get applied, you should be able to see the new Kubernetes account in your Spinnaker UI and be able to deploy to it.  It may take a while for the new Clouddriver to start up and read information from your new Kubernetes account

**Don't forget to clear your browser cache / hard refresh your browser (`cmd-shift-r` or `control-shift-r`)**
