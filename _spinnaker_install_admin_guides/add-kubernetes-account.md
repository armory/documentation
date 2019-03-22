---
layout: post
title: Adding Kubernetes Deployment Targets
order: 31
redirect_from:
  - /spinnaker_install_admin_guides/aws-kubernetes-account/
  - /spinnaker_install_admin_guides/add_kubernetes_account/
  - /spinnaker-install-admin-guides/add_kubernetes_account/
---

# Creating and Adding a Kubernetes Spinnaker Account (Cloud Provider / Deployment Target)

Once you have (OSS or Armory) Spinnaker up and running, you'll want to start adding deployment targets.  *(This document assumes Spinnaker was installed with halyard, that you have access to your current halconfig (and a way to operate `hal` against it), and that you have a kubeconfig and `kubectl` with permissions to create the relevant Kubernetes entities (`service account`, `role`, and `rolebinding`)*

_This document only covers the Kubernetes V2 provider_

At a high level, Spinnaker operates in the following way when deploying to Kubernetes:

* Spinnaker is configured with one or more "Cloud Provider" Kubernetes accounts (which you can think of as deployment targets)
* For each Kubernetes account, Spinnaker is provided a kubeconfig to connect to that Kubernetes cluster
* The kubeconfig should have the following contents:
  * A Kubernetes kubeconfig `cluster`, which is typically a URL and potentially certificate validation information (CA cert or a flag to skip validation)
  * A Kubernetes kubeconfig `user`, which is basically a way to get a set of credentials to connect to the Kubernetes cluster.  This can be a token, a set of commands to run to get a token, or a client certificate
  * A Kubernetes kubeconfig `context`, which tells the `kubectl` tool which credential set to use with which cluster, as well as other information such as default namespace
  * Metadata such as which context to use by default
* Each Kubernetes account is configured in the master `.hal/config` YAML file (also known as a "Halconfig"), as an entry in the deploymentConfiguration's `providers.kubernetes.accounts` array.  Each entity has these (and other) fields:
  * `name`: A Spinnaker-internal name used to refer to the Kubernetes account.  This is the item you will select in various Kubernetes stages to indicate that you would like to deploy to this particular Kubernetes account (which again, consists of a Kubernetes cluster/credential/context set)
  * `kubeconfigFile`: A file path that Halyard uses to access the kubeconfig
  * `onlySpinnakerManaged`: A boolean that indicates whether Spinnaker should only manage / display entities that were created by Spinnaker (i.e., those that have the Spinnaker labels and annotations that indicate that they were created by Spinnaker)
  * `namespaces`: An array of namespaces that Spinnaker will be allowed to deploy to.  If this is left blank, Spinnaker will be allowed to deploy to all namespaces
  * `omitNamespaces`: If namespaces is left blank, you can blacklist specific namespaces to indicate to Spinnaker that it should not deploy to those namespaces
* Spinnaker uses `kubectl` under the hood, so any semantics that `kubectl` specifies, Spinnaker will also use
* `kubectl` (and the corresponding kubeconfig) will be run from the Spinnaker Clouddriver Kubernetes pod
* If the kubeconfig is properly referenced and available from Halyard, halyard will take care of the following for you:
  * Creating a Kubernetes secret (with a dynamically-generated name) containing your kubeconfig in the namespace where Spinnaker lives
  * Dynamically generating a `clouddriver.yml` file (placed locally in `.hal/default/staging/clouddriver.yml` that properly references the kubeconfig from where it is mounted within the Clouddriver container
  * Creating/Updating the Kubernetes Deployment (`spin-clouddriver`) which runs Clouddriver so that it is aware of the secret and it is mounted properly in the Clouddriver pod (it will be placed in `/home/spinnaker/.hal/default/staging/dependences/<some-filename>`)
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

This document will guide you through the following:

* Creating the namespace that the Service Account will live in (if it does not yet exist)
* Creating the service account in the Service Account namespace
* If granting cluster admin (`cluster-admin`), a clusterrolebinding attaching the `cluster-admin` ClusterRole to the service account
* If granting namespace-specific access, the following:
  * For each namespace, the namespace (if it does not exist)
  * For each target namespace, an admin role
  * For each target namespace, a rolebinding attaching the admin role to the service account
* Create a minified kubeconfig containing only the service account
* Adding the account to Spinnaker using Halyard

## Prerequisites

This document assumes the following:

* Your Spinnaker is up and running
* Your Spinnaker was installed and configured via Halyard
* You have access to Halyard
* You have a valid kubeconfig that currently has Cluster Admin access to your target Kubernetes cluster, and you have `kubectl` and are able to use it to interact with your target Kubernetes cluster.

The first several steps of this document will take place on a system that has `kubectl` and the kubeconfig.

# Setting up the Service Account

## Set up bash parameters

First, we'll set up bash environment variables that will be used by later commands

```bash
# Specify the name of the kubernetes context that has permissions in your target cluster.
# To get context names, you can run "kubectl config get-contexts".
export CONTEXT="aws-armory-dev"

# Enter the namespace where you want the Spinnaker service account to live
export SA_NAMESPACE="spinnaker-system"

# Enter the name of the service account you want to create in the target namespace.  
# If you are creating multiple Kubernetes Cloud Provider Accounts to point to
# different namespaces in to the same Kubernetes cluster, make sure you use a
# unique service account name.
export SERVICE_ACCOUNT_NAME="spinnaker-dev-sa"

# If you want to deploy to a specific set of namespaces, enter the namespaces
# that you want to deploy to (space-delimited).
# These namespaces can already exist, or you can create them.
export TARGET_NAMESPACES=(dev-1 dev-2)

# Enter the name of the role you want to create in the target namespace.
export ROLE_NAME="spinnaker-role"

# Enter the account name you want Spinnaker to use to identify the deployment target.
export ACCOUNT_NAME="spinnaker-dev"
```

## Create the service account namespace and service account

```bash
# Create a manifest containing the service account and namespace
tee ${SA_NAMESPACE}-${SERVICE_ACCOUNT_NAME}-service-account.yml <<-'EOF'
apiVersion: v1
kind: Namespace
metadata:
  name: SA_NAMESPACE
---
apiVersion: v1
kind: ServiceAccount
metadata:
  name: SERVICE_ACCOUNT_NAME
  namespace: SA_NAMESPACE
EOF

# Update the manifest with bash environment variables
sed -i.bak \
  -e "s/SA_NAMESPACE/${SA_NAMESPACE}/g" \
  -e "s/SERVICE_ACCOUNT_NAME/${SERVICE_ACCOUNT_NAME}/g" \
  ${SA_NAMESPACE}-${SERVICE_ACCOUNT_NAME}-service-account.yml

# Create the service account
kubectl --context ${CONTEXT} apply -f ${SA_NAMESPACE}-${SERVICE_ACCOUNT_NAME}-service-account.yml
```

## Add permissions

There are two options:

* Add cluster-admin permissions
* Add namespace-specific permissions

### Option 1: Add cluster-admin permissions

```bash
# Create a manifest containing the ClusterRoleBinding
tee ${SA_NAMESPACE}-${SERVICE_ACCOUNT_NAME}-admin-clusterrolebinding.yml <<-'EOF'
apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: SERVICE_ACCOUNT_NAME-admin
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: SERVICE_ACCOUNT_NAME
  namespace: SA_NAMESPACE
EOF

# Update the manifest with bash environment variables
sed -i.bak \
  -e "s/SA_NAMESPACE/${SA_NAMESPACE}/g" \
  -e "s/SERVICE_ACCOUNT_NAME/${SERVICE_ACCOUNT_NAME}/g" \
  ${SA_NAMESPACE}-${SERVICE_ACCOUNT_NAME}-admin-clusterrolebinding.yml

# Create the ClusterRoleBinding
kubectl --context ${CONTEXT} apply -f ${SA_NAMESPACE}-${SERVICE_ACCOUNT_NAME}-admin-clusterrolebinding.yml
```

### Option 2: Add namespace-specific permissions

```bash
# Create template for roles/rolebinding manifests
tee service-account-template.yml <<-'EOF'
apiVersion: v1
kind: Namespace
metadata:
  name: TARGET_NS
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: ROLE_NAME
  namespace: TARGET_NS
rules:
- apiGroups: ["*"]
  resources: ["*"]
  verbs: ["*"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: SERVICE_ACCOUNT_NAME-ROLE_NAME-binding
  namespace: TARGET_NS
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: ROLE_NAME
subjects:
- namespace: SA_NAMESPACE
  kind: ServiceAccount
  name: SERVICE_ACCOUNT_NAME
EOF

# For each target namespace, stamp out a Kubernetes manifest from the template
for TARGET_NS in ${TARGET_NAMESPACES[@]}; do
  sed \
    -e "s/TARGET_NS/${TARGET_NS}/g" \
    -e "s/ROLE_NAME/${ROLE_NAME}/g" \
    -e "s/SA_NAMESPACE/${SA_NAMESPACE}/g" \
    -e "s/SERVICE_ACCOUNT_NAME/${SERVICE_ACCOUNT_NAME}/g" \
    service-account-template.yml > ${TARGET_NS}-rolebinding.yml
done

# For each target namespace, apply the manifest
for TARGET_NS in ${TARGET_NAMESPACES[@]}; do
  kubectl --context ${CONTEXT} apply -f ${TARGET_NS}-rolebinding.yml
done
```

# Creating the (minified) Kubeconfig

In order for Spinnaker to talk to a Kubernetes cluster, it must be provided a kubeconfig.  We're going to create a trimmed-down kubeconfig that only has the service account and token.

```bash
#################### Create minified kubeconfig
NEW_CONTEXT=${SA_NAMESPACE}-sa
KUBECONFIG_FILE="kubeconfig-${CONTEXT}-${ACCOUNT_NAME}-${SA_NAMESPACE}-${SERVICE_ACCOUNT_NAME}"

SECRET_NAME=$(kubectl get serviceaccount ${SERVICE_ACCOUNT_NAME} \
  --context ${CONTEXT} \
  --namespace ${SA_NAMESPACE} \
  -o jsonpath='{.secrets[0].name}')
TOKEN_DATA=$(kubectl get secret ${SECRET_NAME} \
  --context ${CONTEXT} \
  --namespace ${SA_NAMESPACE} \
  -o jsonpath='{.data.token}')

# This is necessary to handle both OSX and bash base64, which have different flags
# Any errors on the first command can be ignored
TOKEN=$(echo ${TOKEN_DATA} | base64 -d)
if [[ ! $? -eq 0 ]]; then TOKEN=$(echo ${TOKEN_DATA} | base64 -D); fi

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
  set-credentials ${CONTEXT}-${SA_NAMESPACE}-token-user \
  --token ${TOKEN}
# Set context to use token user
kubectl config --kubeconfig ${KUBECONFIG_FILE}.tmp \
  set-context ${NEW_CONTEXT} --user ${CONTEXT}-${SA_NAMESPACE}-token-user
# Set context to correct namespace
kubectl config --kubeconfig ${KUBECONFIG_FILE}.tmp \
  set-context ${NEW_CONTEXT} --namespace ${SA_NAMESPACE}
# Flatten/minify kubeconfig
kubectl config --kubeconfig ${KUBECONFIG_FILE}.tmp \
  view --flatten --minify > ${KUBECONFIG_FILE}
# Remove tmp
rm ${KUBECONFIG_FILE}.full.tmp
rm ${KUBECONFIG_FILE}.tmp
```

You should end up with a kubeconfig file with a filename like `kubeconfig-${CONTEXT}-${ACCOUNT_NAME}-${SA_NAMESPACE}-${SERVICE_ACCOUNT_NAME}` (you can rename this to something shorter, if you'd like).

## Add the kubeconfig and cloud provider to Spinnaker

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

# Enable the kubernetes provider - this is probably already be enabled, if Spinnaker is installed in Kubernetes
hal config provider kubernetes enable
# Enable artifacts; not strictly neccessary for Kubernetes but will be useful in general
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