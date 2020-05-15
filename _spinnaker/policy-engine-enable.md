---
layout: post
title: Enabling the Policy Engine
order: 143
redirect_from:
 - /spinnaker/policy_engine/
---

## Overview
{:.no_toc}
The Armory Policy Engine is designed to allow enterprises more complete control of their software delivery process by providing them with the hooks necessary to perform more extensive verification of their pipelines and processes in Spinnaker. This policy engine is backed by [Open Policy Agent](https://www.openpolicyagent.org/) (OPA) and uses input style documents to perform validation of pipelines during save time and runtime:

* **Save time validation** - Validate pipelines as they're created/modified. This validation operates on all pipelines using a fail closed model. This means that if you have the Policy Engine enabled but no policies configured, the Policy Engine prevents you from creating or updating any pipeline.
* **Runtime validation** - Validate deployments as a pipeline is executing. This validation only operates on tasks that you have explicitly created policies for. Tasks with no policies are not validated.

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Requirements 

Make sure you can meet the following version requirements for the Policy Engine:
* OPA versions 0.12.x or 0.13.x
* Halyard 1.7.2 or later if you are using Halyard to manage Spinnaker
* Armory Spinnaker 2.16.0 or later for Pipeline save time validation
* Armory Spinnaker 2.19.0 or later for Pipeline runtime validation 

## Deploying an OPA server for Policy Engine to use

The Policy Engine supports the following OPA server deployments: 

* An OPA server deployed in the same Kubernetes cluster as an Armory Spinnaker deployment. The [Using ConfigMaps for OPA policies](#using-configmaps-for-opa-policies) section contains a manifest you can use.
* An OPA cluster that is **not** in the same Kubernetes cluster as an Armory Spinnaker deployment . See the [OPA documentation](https://www.openpolicyagent.org/docs/latest/) for more information about installing an OPA cluster. 

### Example OPA server

This section contains a sample manifest that deploys an OPA server that is configured to use ConfigMaps to add policies. Additionally, it configures settings like rolebinding and a static DNS. 

When using the below example, keep the following guidelines in mind:
* The manifest does not configure any authorization requirements for the OPA server it deploys. This means that anyone can add a policy.
* Make sure you replace `<namespace>` with the appropriate namespace.

```yaml
---
apiVersion: v1
kind: Namespace
metadata:
  name: opa # Change this to install OPA in a different namespace
---
# Grant service accounts in the 'opa' namespace read-only access to resources.
# This lets OPA/kube-mgmt replicate resources into OPA so they can be used in policies.
# The subject name should be `system:serviceaccounts:<namespace>` where `<namespace>` is the namespace where OPA will be installed
kind: ClusterRoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  name: opa-viewer-spinnaker
roleRef:
  kind: ClusterRole
  name: view
  apiGroup: rbac.authorization.k8s.io
subjects:
- kind: Group
  name: system:serviceaccounts:opa # Change this to the namespace OPA is installed in
  apiGroup: rbac.authorization.k8s.io
---
# Define role in the `opa` namespace for OPA/kube-mgmt to update configmaps with policy status.
# The namespace for this should be the namespace where policy configmaps will be created
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  namespace: opa # Change this to the namespace where policies will live
  name: configmap-modifier
rules:
- apiGroups: [""]
  resources: ["configmaps"]
  verbs: ["update", "patch"]
---
# Bind the above role to all service accounts in the `opa` namespace
# The namespace for this should be the namespace where policy configmaps will be created
# The subject name should be `system:serviceaccounts:<namespace>` where `<namespace>` is the namespace where OPA will be installed
kind: RoleBinding
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  namespace: opa # Change this to the namespace where policies will live
  name: opa-configmap-modifier
roleRef:
  kind: Role
  name: configmap-modifier
  apiGroup: rbac.authorization.k8s.io
subjects:
- kind: Group
  name: system:serviceaccounts:opa # Change this to the namespace OPA is installed in
  apiGroup: rbac.authorization.k8s.io
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: opa-deployment
  namespace: opa # Change this to the namespace OPA is installed in
  labels:
    app: opa
spec:
  replicas: 1
  selector:
    matchLabels:
      app: opa
  template:
    metadata:
      labels:
        app: opa
    spec:
      containers:
      # WARNING: OPA is NOT running with an authorization policy configured. This
      # means that clients can read and write policies in OPA. If you are
      # deploying OPA in an insecure environment, be sure to configure
      # authentication and authorization on the daemon. See the Security page for
      # details: https://www.openpolicyagent.org/docs/security.html.
        - name: opa
          image: openpolicyagent/opa:0.17.2
          args:
            - "run"
            - "--server"
            - "--addr=http://0.0.0.0:8181"
          readinessProbe:
            httpGet:
              path: /health
              scheme: HTTP
              port: 8181
            initialDelaySeconds: 3
            periodSeconds: 5
          livenessProbe:
            httpGet:
              path: /health
              scheme: HTTP
              port: 8181
            initialDelaySeconds: 3
            periodSeconds: 5
        - name: kube-mgmt
          image: openpolicyagent/kube-mgmt:0.9
          args:
          # Change this to the namespace where you want OPA to look for policies
            - "--policies=opa"
          # Configure the OPA server to only check ConfigMaps with the relevant label
            - "--require-policy-label=true" 
---
# Create a static DNS endpoint for Spinnaker to reach OPA
apiVersion: v1
kind: Service
metadata:
  name: opa
  namespace: opa # Change this to the namespace OPA is installed in
spec:
  selector:
    app: opa
  ports:
  - protocol: TCP
    port: 8181
    targetPort: 8181
```

## Enabling the Policy Engine

The steps to enable the Policy Engine vary based on whether you use the [Operator](#enabling-policy-engine-using-operator) or [Halyard](#enabling-policy-engine-using-halyard).

### Enabling Policy Engine using Operator

Add the following section to `SpinnakerService` manifest:
    
```yaml
apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    profiles:
      front50: #Enables Save time validation of policies
        armory:
          opa:
            enabled: true
            url: <OPA Server URL>:<port>/v1
      clouddriver: #Enables Runtime validation of policies
        armory:
          opa:
            enabled: true
            url: <OPA Server URL>:<port>/v1     
```
    
*Note: There must be a trailing /v1 on the URL. This extension is only compatible with OPA's v1 API.*

If you are using an in-cluster OPA instance (such as one set up with the instructions below), Spinnaker can access OPA via the Kubernetes service DNS name. The following example configures Spinnaker to connect with an OPA server at http://opa.opaserver:8181:

```yaml
apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    profiles:
      front50: #Enables Save time validation of policies
        armory:
          opa:
            enabled: true
            url: http://opa.opaserver:8181/v1
      clouddriver: #Enables Runtime validation of policies
        armory:
          opa:
            enabled: true
            url: http://opa.opaserver:8181/v1
```

Deploy the changes (assuming that Spinnaker lives in the: `spinnaker` namespace and the manifest file is named `spinnakerservice.yml`:

```bash
kubectl -n spinnaker apply -f spinnakerservice.yml
```

### Enabling Policy Engine using Halyard 
  
Add the following configuration to `.hal/default/profiles/spinnaker-local.yml`:

```yaml
armory:
  opa:
    enabled: true
    url: <OPA Server URL>:<port>/v1
```

*Note: There must be a trailing `/v1` on the URL. The Policy Engine is only compatible with OPA's v1 API.*

If you only want to perform a certain type of validation, you can add the corresponding configuration to the following files instead:

| Feature                 | File                                          |
|-------------------------|-----------------------------------------------|
| Save time Validation     | `.hal/default/profiles/front50-local.yml`     |
| Runtime Validation      | `.hal/default/profiles/clouddriver-local.yml` |

You must also connect Spinnaker to an OPA server. This can be in a separate Kubernetes cluster or an in-cluster OPA server (such as one set up with the instructions below). For in-cluster OPA servers, Spinnaker can access OPA via the Kubernetes service DNS name. For example, add the following configuration to `spinnaker-local.yml` to allow Spinnaker to connect to an OPA server at `http://opa.opaserver:8181`:

```yaml
armory:
  opa:
    enabled: true
    url: http://opa.opaserver:8181/v1
```

After you enable the Policy Engine, deploy your changes:

```bash
hal deploy apply
```

Once Spinnaker finishes redeploying, Policy Engine can evaluate pipelines based on your policies.



### Writing a policy

Deployment validation works by mapping an OPA policy package to a Spinnaker deployment task. For example, deploying a Kubernetes Service is done using the Deploy (Manifest) stage, so we'll write a policy that applies to that task. 

```
# Notice the package. The package maps to the task you want to create a policy for.
package spinnaker.deployment.tasks.deployManifest

deny[msg] {
    msg := "LoadBalancer Services must not have port 22 open."
    manifests := input.deploy.manifests
    manifest := manifests[_]

    manifest.kind == "Service"
    manifest.spec.type == "LoadBalancer"

    port := manifest.spec.ports[_]
    port.port == 22
}
```






