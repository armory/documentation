---
layout: post
title: Spinnaker Operator
order: 11
---

Note that Spinnaker Operator is currently in [Early Release](https://kb.armory.io/releases/early-release-beta-GA/). The feature is working and installable but is not meant for production use.

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Overview

Spinnaker Operator is a Kubernetes operator for Spinnaker that makes it easier to install, deploy, and upgrade any version of Spinnaker through a workflow that you are already familiar with.  After you install Spinnaker Operator, you can use `kubectl` to manage the lifecycle of your deployment.

Operator has two distinct modes you can install and use:

- **Basic**: Operator in basic mode installs Spinnaker into a single namespace without `ValidatingAdmissionWebhook` for doing preflight checks.
- **Cluster**: Operator in cluster mode installs Spinnaker across multiple namespaces with with `ValidatingAdmissionWebhook` for doing preflight checks. This mode requires a `ClusterRole`.

# Operator Requirements

Before you start, ensure the following requirements are met:

- Your Kubernetes cluster is version 1.13 or later.
- You have admission controllers enabled in Kubernetes.
- You have `ValidatingAdmissionWebhook` enabled in the kube-apiserver. Alternatively, you can pass the `--without-admission-controller` parameter to the to the `deployment.yaml` file that deploys the operator.
- You have admin rights to install the Custom Resource Definition (CRD) for Operator.

# Limitations

Operator does not currently support the following:

- Spinnaker configurations stored in secret.

# Install Operator

## Before You Start

Download CRDs and example manifests from the [latest stable release](https://github.com/armory-io/spinnaker-operator/releases).

```bash
$ mkdir -p spinnaker-operator && cd spinnaker-operator
$ VERSION=v0.1.0 && curl -L https://github.com/armory-io/spinnaker-operator/releases/download/$VERSION/manifests.tgz | tar -xvf -
```

For both Basic and Cluster modes, you must download and apply the SpinnakerService CRD.
Note that you must have admin rights to install the CRD.

```bash
$ kubectl apply -f deploy/crds/spinnaker_v1alpha1_spinnakerservice_crd.yaml
```

  **Note**: To install OSS Spinnaker, use [https://github.com/armory/spinnaker-operator](https://github.com/armory/spinnaker-operator) instead.


## Installing Operator in Basic Mode
The sample files discussed in this procedure can be found in the Git repository you cloned.

To install Operator in basic mode, run:

```
$ kubectl apply -n <op_namespace> -f deploy/operator/basic
```

`op_namespace` is the namespace where you want the operator to live.

After installation, you can verify that the Operator is running with the following command:
```
$ kubectl -n <op_namespace> get pods
```

The command returns output similar to the following if the pod for the Operator is running:

```
NAMESPACE                             READY         STATUS       RESTARTS      AGE
spinnaker-operator-7cd659654b-4vktl   2/2           Running      0             6s
```

## Installing Operator in Cluster Mode
The sample files discussed in this procedure can be found in the Git repository you cloned.

To install Operator for cluster mode, perform the following steps:

1. Add the namespace you want to deploy to `deploy/operator/cluster/role_binding.yml`. For example, the following entry deploys Spinnaker to a namespace called `my-app`:

    ```
    kind: ClusterRoleBinding
    apiVersion: rbac.authorization.k8s.io/v1
    metadata:
​​      name: spinnaker-operator-binding
​​    subjects:
​​    - kind: ServiceAccount
​​      name: spinnaker-operator
​​      namespace: my-app
​​    roleRef:
      kind: ClusterRole
​​      name: spinnaker-operator-role
​​      apiGroup: rbac.authorization.k8s.io
    ```

2. Save the changes to `role_binding.yml`.
3. Run the following command:

    ```
    $ kubectl apply -n <op_namespace> -f deploy/operator/cluster
    ```

    `op_namespace` is the namespace where you want the operator to live.

After installation, you can verify that the Operator is running with the following command:

```
$ kubectl -n <op_namespace> get pods
```
The command returns output similar to the following if the pod for the Operator is running:

```
NAMESPACE                                READY         STATUS       RESTARTS      AGE
spinnaker-operator-7cd659654b-4vktl      2/2           Running      0             6s
```

# Installing Spinnaker Using Operator

After you install Operator, you can create a `configMap` and `SpinnakerService` to install Spinnaker.

You can find a sample configMap in the `deploy/spinnaker/examples` directory of the cloned Git repository. Change the parameters you need (especially the `persistentStorage` section). To perform a basic install with Operator and the example configMap, run the following command:

```
kubectl -n <spin_namespace> apply -f deploy/spinnaker/examples/basic
```

`<spin_namespace>` is the `namespace` where you want to deploy Spinnaker.

The example uses Operator in basic mode with the example configMap to deploy Spinnaker 2.15.3 with the following attributes:

- No connected accounts
- Persistent storage

If you want to change the attributes of the example deployment, modify `/deploy/spinnaker/examples/basic/spin-config.yaml`. For example, if you change the value of the `version` field to `2.16.0`, the example configMap installs version 2.16.0.

Detailed description of the configMap can be found [here](../operator-config).


# Upgrading Spinnaker Using Operator

To upgrade an existing Spinnaker deployment using the Operator, perform the following steps:

1. Change the `version` field in your `spin-config.yaml` file to the target version for the upgrade.
2. Apply the updated configMap:

    ```
    $ kubectl <spin_namespace> apply -f /path/to/your/spin-config.yaml
    ```

    For example, to apply an updated configMap for the example `spin-config.yaml` file, run the following command:

    ```
    $ kubectl <spin_namespace> apply -f /deploy/spinnaker/examples/basic/spin-config.yaml
    ```

    Replace `<spin_namespace>` with the namespace of the existing Spinnaker deployment occupies.

    You can view the upgraded services starting up with the following command:
    ```
    $ kubectl -n <spin_namespace> describe spinsvc spinnaker
    ```

3. Verify the upgraded version of Spinnaker:

    ```
    $ kubectl -n <spin_namespace> get spinsvc
    ```

    The command returns information similar to the following:

    ```
    NAME         VERSION
    spinnaker    2.15.3
    ```

    `VERSION` should reflect the target version for your upgrade.

    Once the upgrade is complete, you can view information related to your Spinnaker deployment with the following command:
    ```
    $ kubectl -n <namespace> get svc
    ```

    The command returns information about the running Spinnaker services, including the URL for Deck (`spin-deck`).


# Managing Spinnaker Using Operator

Operator allows you to use `kubectl` to manager you Spinnaker deployment.

**Listing Spinnaker Instances**
```
$ kubectl get spinnakerservice -- all-namespaces
```
The short name `spinsvc` is also available.

**Describing Spinnaker Instances**
```
$ kubectl -n <namespace> describe spinnakerservice spinnaker
```

**Deleting Spinnaker Instances**
```
$ kubectl -n <namespace> delete spinnakerservice spinnaker
```

# Custom Halyard Configuration

To override Halyard's configuration, create a `configMap` with the configuration changes you need:

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: halyard-custom-config
data:
  halyard-local.yml: |
    spinnaker:
      config:
        input:
          bucket: mybucket
```

You can then mount it in the operator deployment and make it available to Halyard container:

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
      - image: armory/armory-operator:latest
        ...
      - image: armory/halyard-armory:operator-latest
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