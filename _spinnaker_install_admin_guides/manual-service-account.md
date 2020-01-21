---
layout: post
title: "Kubernetes: Creating Service Accounts and Kubeconfigs"
order: 29
# Change this to true
published: true
redirect_from:
  - /spinnaker_install_admin_guides/manual_service_account/
  - /spinnaker_install_admin_guides/manual-service-account/
  - /spinnaker-install-admin-guides/manual_service_account/
---

When connecting Spinnaker to Kubernetes, Spinnaker needs the following:

* A service account in the relevant Kubernetes cluster (or namespace in a cluster).  *In Kubernetes, a service account exists in a given namespace but may have access to other namespaces or to the whole cluster*
* Permissions for the service account to create/read/update/delete objects in the relevant Kubernetes cluster (or namespace)
* A kubeconfig that has access to the service account through a token or some other authentication method.

The [spinnaker-tools binary](https://github.com/armory/spinnaker-tools) was built to create all of the above objects. If you want to create these manually or need to know what is going on, use the following steps to create these objects .

**This document primarily uses `kubectl` and assumes you have access to permissions that can create and/or update these resources in your Kubernetes cluster:**

- **Kubernetes Service Account(s)**
- **Kubernetes Roles and Rolebindings**
- **(Optionally) Kubernetes ClusterRoles and Rolebindings**

## Create the Service Account

You can use the following manifest to create a service account. Replace `NAMESPACE` with the namespace you want to use and, optionally, rename the service account.

```yml
# spinnaker-service-account.yml
apiVersion: v1
kind: ServiceAccount
metadata:
  name: spinnaker-service-account
  namespace: NAMESPACE
```

Then create the object:

```bash
kubectl apply -f spinnaker-service-account.yml
```

## Grant Cluster Admin Permissions

Do this only if you want to grant the service account access to all namespaces in your cluster.

Note:

* A Kubernetes ClusterRoleBinding exists at the cluster level, but the *subject* of the ClusterRoleBinding exists in a single namespace.

(Again, you *must* specify the namespace where your service account lives)

```yml
# spinnaker-clusterrolebinding.yml
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: spinnaker-admin
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: cluster-admin
subjects:
- kind: ServiceAccount
  name: spinnaker-service-account
  namespace: NAMESPACE
```

Then, create the binding:

```bash
kubectl apply -f spinnaker-service-account.yml
```

## Grant Namespace Specific Permissions

If you only want the service account to be able to access specific namespaces, then you can create a role with a set of permissions and rolebinding to attach the role to the service account.  You can do this multiple times.  Additionally, you will  also have explicitly  do this for the namespace where the service account is, as it is not implicit.

Notes:

* A Kubernetes `Role` exists in a given namespace and grants access to items in that namespace
* A Kubernetes `RoleBinding` exists in a given namespace and attaches a role in that namespace to some principal (in this case, a service account).  The principal (service account) may be in another namespace.
* If you have a service account in namespace `source` and want to grant access to namespace `target`, then do the following:
  * Create the service account in namespace `source`
  * Create a Role in namespace `target`
  * Create a RoleBinding in namespace `target`, with the following properties:
    * RoleRef pointing to the Role (that is in the same namespace `target`)
    * Subject pointing to the service account and namespace where the service account lives (in namespace `source`)

Feel free to change the names of resources to match your environment. As long as the namespaces are correct, and the subject name and namespace match the name and namespace of your service account.

```yml
# spinnaker-role-and-rolebinding-target.yml
---
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: spinnaker-role
  namespace: target # Should be namespace you are granting access to
rules:
- apiGroups: ["*"]
  resources: ["*"]
  verbs: ["*"]
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: spinnaker-rolebinding
  namespace: target # Should be namespace you are granting access to
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: spinnaker-role # Should match name of Role
subjects:
- namespace: source # Should match namespace where SA lives
  kind: ServiceAccount
  name: spinnaker-service-account # Should match service account name, above
```

Then, create the object:

```bash
kubectl apply -f spinnaker-role-and-rolebinding-target.yml
```

## Get the Service Account and Token. Generate the Kubeconfig

Run these commands (or commands like these) to get the token for your service account and create a kubeconfig with access to the service account.

**_This file will contain credentials for your Kubernetes cluster and should be stored securely_**

```bash
# Update these to match your environment
SERVICE_ACCOUNT_NAME=spinnaker-service-account
CONTEXT=$(kubectl config current-context)
NAMESPACE=spinnaker

NEW_CONTEXT=spinnaker
KUBECONFIG_FILE="kubeconfig-sa"


SECRET_NAME=$(kubectl get serviceaccount ${SERVICE_ACCOUNT_NAME} \
  --context ${CONTEXT} \
  --namespace ${NAMESPACE} \
  -o jsonpath='{.secrets[0].name}')
TOKEN_DATA=$(kubectl get secret ${SECRET_NAME} \
  --context ${CONTEXT} \
  --namespace ${NAMESPACE} \
  -o jsonpath='{.data.token}')

TOKEN=$(echo ${TOKEN_DATA} | base64 -d)

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

You should end up with a kubeconfig that can access your Kubernetes cluster with the desired target namespaces.
