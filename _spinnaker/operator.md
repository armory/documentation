---
layout: post
title: Spinnaker Operator
order: 11
---

Note that Spinnaker Operator is currently in [Beta](https://kb.armory.io/releases/early-release-beta-GA/). The feature is working and installable but is not meant for production use.

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Overview

Spinnaker Operator is a Kubernetes operator for Spinnaker that makes it easier to install, deploy, and upgrade any version of Spinnaker through a workflow that you are already familiar with.  After you install Spinnaker Operator, you can use `kubectl` to manage the lifecycle of your deployment.

Operator has two distinct modes you can install and use:

- **Basic**: Operator in basic mode installs Spinnaker into a single namespace without `ValidatingAdmissionWebhook` for doing preflight checks.
- **Cluster**: Operator in cluster mode installs Spinnaker across namespaces with `ValidatingAdmissionWebhook` for doing preflight checks. This mode requires a `ClusterRole`.

If you want to get started quickly, the process to install Operator and Spinnaker involves running the following commands: 

```
# Pick a release from https://github.com/armory-io/spinnaker-operator/releases (or clone the repo https://github.com/armory-io/armory-operator and use the master branch for the latest development work)
$ mkdir -p spinnaker-operator && cd spinnaker-operator
$ RELEASE=v0.3.0 bash -c 'curl -L https://github.com/armory-io/spinnaker-operator/releases/download/${RELEASE}/manifests.tgz | tar -xz'
 
# Install or update CRDs cluster wide
$ kubectl apply -f deploy/crds/

# Install Operator in namespace spinnaker-operator. If you want a different namespace, see the below documentaiton.
$ kubectl create ns spinnaker-operator
$ kubectl -n spinnaker-operator apply -f deploy/operator/cluster

# Install Spinnaker in the "spinnaker" namespace
$ kubectl create ns spinnaker
$ kubectl -n spinnaker apply -f deploy/spinnaker/basic

# Watch the install progress and check out the pods being created too!
$ kubectl -n spinnaker get spinsvc spinnaker -w

```

The rest of this page describes how to modify some of the default configurations within Operator to suit your needs.

# Benefits of Operator

- Stop using Halyard commands: just `kubectl apply` your Spinnaker configuration. This includes support for local files.
- Expose Spinnaker to the outside world (via `LoadBalancer`). You can still disable that behavior if you prefer to manage ingresses and load balancers yourself. 
- Deploy any version of Spinnaker. Operator is not tied to a particular version of Spinnaker. 
- Keep secrets separate from your config. Store your config in `git` and have an easy Gitops workflow.
- Validate your configuration before applying it (with webhook validation). 
- Store Spinnaker secrets in [Kubernetes secrets](https://github.com/armory/spinnaker-operator/blob/release-0.3.x/doc/managing-spinnaker.md#secrets-in-kubernetes-secrets).
- Patch versions, accounts or any setting with `kustomize`. 
- Monitor the health of Spinnaker via `kubectl`.
- Define Kubernetes accounts in `SpinnakerAccount` objects and store kubeconfig inline, in Kubernetes secrets, in s3, or GCS **(Experimental)**.

# Operator Requirements

Before you start, ensure the following requirements are met:

- Your Kubernetes cluster runs version 1.13 or later.
- You have admission controllers enabled in Kubernetes (`-enable-admission-plugins`).
- You have `ValidatingAdmissionWebhook` enabled in the kube-apiserver. Alternatively, you can pass the `--disable-admission-controller` parameter to the to the `deployment.yaml` file that deploys the operator.
- You have admin rights to install the Custom Resource Definition (CRD) for Operator.

# Accounts CRD (Experimental)

Operator introduces a new CRD for Spinnaker accounts. `SpinnakerAccount` is defined in an object - separate from the main Spinnaker config - so its creation and maintenance can easily be automated.

To read more about this CRD, see [SpinnakerAccount](https://github.com/armory/spinnaker-operator/blob/master/doc/spinnaker-accounts.md).

# Install Operator

## Download the Operator Manifests

Download CRDs and example manifests from the [latest stable release](https://github.com/armory-io/spinnaker-operator/releases).

```bash
# For a stable release (https://github.com/armory-io/spinnaker-operator/releases)
$ mkdir -p spinnaker-operator && cd spinnaker-operator
$ RELEASE=v0.3.0 bash -c 'curl -L https://github.com/armory-io/spinnaker-operator/releases/download/${RELEASE}/manifests.tgz | tar -xz'
```

For both Basic and Cluster modes, you must download and apply the SpinnakerService CRD.
Note that you must have admin rights to install the CRD.

```bash
$ kubectl apply -f deploy/crds/
```

**Note**: To install OSS Spinnaker, use [https://github.com/armory/spinnaker-operator](https://github.com/armory/spinnaker-operator) instead.


## Installing Operator in Basic Mode
To install Operator in basic mode, run:

```bash
$ kubectl apply -n <op_namespace> -f deploy/operator/basic
```

`<op_namespace>` is the namespace where you want the operator to live. To monitor installation, run the following command:

```
# Watch the install progress. Check out the pods being created too!
$ kubectl -n spinnaker get spinsvc spinnaker -w
```

After installation, you can verify that the Operator is running with the following command:
```bash
$ kubectl -n <op_namespace> get pods
```

The command returns output similar to the following if the pod for the Operator is running:

```
NAMESPACE                             READY         STATUS       RESTARTS      AGE
spinnaker-operator-7cd659654b-4vktl   2/2           Running      0             6s
```

## Installing Operator in Cluster Mode
To install Operator for cluster mode, perform the following steps:

1. Decide which namespace you want Operator to live in and then create the namespace. Armory recommends `spinnaker-operator`.
2. If you want to use a namespace other than `spinnaker-operator`, edit `deploy/operator/cluster/role_binding.yaml`:

    ```yaml
    kind: ClusterRoleBinding
    apiVersion: rbac.authorization.k8s.io/v1
    metadata:
​​      name: spinnaker-operator-binding
​​    subjects:
​​    - kind: ServiceAccount
​​      name: spinnaker-operator
​​      namespace: spinnaker-operator # Edit this value if you want Operator to live in a different namespace.
​​    roleRef:
      kind: ClusterRole
​​      name: spinnaker-operator-role
​​      apiGroup: rbac.authorization.k8s.io
    ```

    Then, save the changes to `role_binding.yaml`.
3. Run the following command:

    ```bash
    $ kubectl apply -n <op_namespace> -f deploy/operator/cluster
    ```

    `<op_namespace>` is the namespace where you want the operator to live. By default, this namespace is `spinnaker-operator`, so you would run the following command:

    ```bash 
    $ kubectl apply -n spinnaker-operator` -f deploy/operator/cluster
    ```

After installation, you can verify that the Operator is running with the following command:

```bash
$ kubectl -n <op_namespace> get pods
```
The command returns output similar to the following if the pod for the Operator is running:

```
NAMESPACE                                READY         STATUS       RESTARTS      AGE
spinnaker-operator-7cd659654b-4vktl      2/2           Running      0             6s
```

# Installing Spinnaker Using Operator

Once you install the CRDs and Operator, check out the examples in `deploy/spinnaker/`. To use the examples, change the parameters you need (especially the `persistentStorage` section). To install a basic version of Spinnaker with Operator, run the following command:

```bash
$ kubectl create ns <spinnaker-namespace>
$ kubectl -n <spinnaker-namespace> apply -f deploy/spinnaker/basic/SpinnakerService.yml
```
In the examples, the `spinnaker-namespace` parameter refers to the namespace where you want to install Spinnaker. It is likely different from Operator's namespace.

**Important**: You must edit `deploy/spinnaker/basic/SpinnakerService.yml` to point to persistent storage, such as an S3 bucket. Other attributes can also be changed. For example, if you change the value of the `version` field to `2.16.0`, Operator installs version 2.16.0.

A detailed description of the SpinnakerService CRD can be found [here](../operator-config).

# Install Spinnaker with Operator and Kustomize

Operator supports Kustomize, a templating engine for Kubernetes. Using Kustomize along with Operator helps you create consistent, repeatable deployments of Spinnaker. 

1. Edit `deploy/spinnaker/kustomize/kustomization.yml`.
2. Run the following commands:
    
    ```bash
    $ kubectl create ns <spinnaker-namespace>
    $ kubectl build deploy/spinnaker/kustomize | kubectl -n <spinnaker-namespace> apply -f -
    ```
    `<spinnaker-namespace>` is the `namespace` where you want to deploy Spinnaker.

# Upgrading Spinnaker Using Operator

To upgrade an existing Spinnaker deployment using the Operator, perform the following steps:

1. Change the `version` field in `/deploy/spinnaker/basic/SpinnakerService.yml`  file to the target version for the upgrade.
2. Apply the updated manifest:

    ```bash
    $ kubectl <spinnaker-namespace> apply -f /deploy/spinnaker/basic/SpinnakerService.yml 
    ```
    Replace `<spinnaker-namespace>` with the namespace for the existing Spinnaker deployment.

    You can view the upgraded services starting up with the following command:
    ```bash
    $ kubectl -n <spinnaker-namespace> describe spinsvc spinnaker
    ```

3. Verify the upgraded version of Spinnaker:

    ```bash
    $ kubectl -n <spinnaker-namespace> get spinsvc
    ```

    The command returns information similar to the following:

    ```
    NAME         VERSION
    spinnaker    2.15.3
    ```

    `VERSION` should reflect the target version for your upgrade.

    Once the upgrade is complete, you can view information related to your Spinnaker deployment with the following command:
    ```bash
    $ kubectl -n <spinnaker-namespace> get svc
    ```

    The command returns information about the running Spinnaker services.


# Managing Spinnaker Using Operator

Operator allows you to use `kubectl` to manager you Spinnaker deployment.

**Listing Spinnaker Instances**
```bash
$ kubectl get spinnakerservice --all-namespaces
```
The short name `spinsvc` is also available.

**Describing Spinnaker Instances**
```bash
$ kubectl -n <namespace> describe spinnakerservice spinnaker
```

**Deleting Spinnaker Instances**
```bash
$ kubectl -n <namespace> delete spinnakerservice spinnaker
```

# Custom Halyard Configuration

To override Halyard's configuration, create a `ConfigMap` with the configuration changes you need. For example, if using [secrets management with Vault](https://docs.armory.io/spinnaker-install-admin-guides/secrets-vault/), Halyard will need your Vault configuration:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: halyard-custom-config
data:
  halyard-local.yml: |
    secrets:
      vault:
        enabled: true
        url: <URL of vault server>
        path: <cluster path>
        role: <k8s role>
        authMethod: KUBERNETES
```

You can then mount it in the operator deployment and make it available to the Halyard container:

```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  name: spinnaker-operator
  ...
spec:
  template:
    spec:
      containers:
      - name: spinnaker-operator
        ...
      - name: halyard
        ...
        volumeMounts:
        - mountPath: /opt/spinnaker/config/halyard-local.yml
          name: halconfig-volume
          subPath: halyard-local.yml
      volumes:
      - configMap:
          defaultMode: 420
          name: halyard-custom-config
        name: halconfig-volume
```

# Uninstalling operator

Uninstalling the operator involves deleting its deployment and `SpinnakerService` CRD. When you delete the CRD, any Spinnaker installation created by Operator will also be deleted. This occurs because the CRD is set as the owner of the Spinnaker resources, so they get garbage collected. 

There are two ways in which you can remove this ownership relationship. so that Spinnaker is not deleted when deleting the operator: [replacing Operator with Halyard](#replacing-operator-with-halyard) or [removing Operator ownership of Spinnaker resources](#removing-operator-ownership-from-spinnaker-resources).

### Replacing Operator with Halyard

First, export Spinnaker configuration settings to a format that Halyard understands: 
1. From the `SpinnakerService` manifest, copy the contents of `spec.spinnakerConfig.config` to its own file named `config`, and save it with the following structure:
```
currentDeployment: default
deploymentConfigurations:
- name: default
  <<CONTENT HERE>> 
```
2. For each entry in `spec.spinnakerConfig.profiles`, copy it to its own file inside a `profiles` folder with a `<entry-name>-local.yml` name.
3. For each entry in `spec.spinnakerConfig.service-settings`, copy it to its own file inside a `service-settings` folder with a `<entry-name>.yml` name.
4. For each entry in `spec.spinnakerConfig.files`, copy it to its own file inside a directory structure following the name of the entry with double underscores (__) replaced by a path separator. For example, an entry named `profiles__rosco__packer__example-packer-config.json` results inthe file `profiles/rosco/packer/example-packer-config.json`.

When finished, you have the following directory tree:

```
config
default/
  profiles/
  service-settings/
```

After that, move these files to your Halyard home directory and deploy Spinnaker with the `hal deploy apply` command.

Finally, delete Operator and their CRDs from the Kubernetes cluster.

```bash
$ kubectl delete -n <namespace> -f deploy/operator/<installation type>
$ kubectl delete -f deploy/crds/
```

### Removing Operator Ownership from Spinnaker Resources

Run the following script to remove ownership of Spinnaker resources, where `NAMESPACE` is the namespace where Spinnaker is installed:

```bash
NAMESPACE=
for rtype in deployment service
do
    for r in $(kubectl -n $NAMESPACE get $rtype --selector=app=spin -o jsonpath='{.items[*].metadata.name}') 
    do
        kubectl -n $NAMESPACE patch $rtype $r --type json -p='[{"op": "remove", "path": "/metadata/ownerReferences"}]'
    done
done
```
After the script completes, delete the operator and their CRDs from the Kubernetes cluster:

```bash
$ kubectl delete -n <namespace> -f deploy/operator/<installation type>
$ kubectl delete -f deploy/crds/
```
