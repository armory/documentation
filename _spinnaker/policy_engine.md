---
layout: post
title: Policy Engine
order: 142
---

## Overview
The Armory Policy Engine is designed to allow enterprises more complete control of their software delivery process by providing them with the hooks necessary to perform more extensive verification of their pipelines and processes in Spinnaker. This policy engine is backed by [Open Policy Agent](https://www.openpolicyagent.org/)(OPA) and uses input style documents to perform validation of pipelines during creation and updates.

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Requirements 

Armory recommends the following versions for the Policy Engine:
* OPA versions 0.12.x or 0.13.x
* Halyard 1.7.2 or later
* Spinnaker 2.16.0 or later

## Before You Start
<<<<<<< HEAD
Keep the following guidelines in mind when using the Policy Engine: 
* The Policy Engine uses **fail closed** behavior. That means that if you have the policy engine enabled but no policies created, Spinnaker refuses to create or update any pipeline. 
* Using the Policy Engine requires an understanding OPA's [rego syntax](https://www.openpolicyagent.org/docs/latest/policy-language/) and how to deploy an OPA server.
=======
Using the Policy Engine requires understanding of OPA's [rego syntax](https://www.openpolicyagent.org/docs/latest/policy-language/) and how to [deploy an OPA server](https://www.openpolicyagent.org/docs/latest/#running-opa).
>>>>>>> 9ff53756ffc45288db234b7a9338b1cac115df92

## Enabling the Policy Engine

Policy Engine is a collection of features that span multiple Spinnaker services. Currently, it can be broken down into two categories:

* **Save time validation** - Validate pipelines as they're created/modified. This type of validation operates on all pipelines using a fail closed model. This means that if you have the Policy Engine enabled but no policies configured, the Policy Engine prevents you from creating or updating any pipeline.
* **Runtime validation** - Validate deployments as a pipeline is executing. This type of validation only operates on tasks that you have explicitly created policies for. Tasks with no policies are not validated.

To enable these validations, add the following configuration to `.hal/default/profiles/spinnaker-local.yml`:

```yaml
armory:
  opa:
    enabled: true
    url: <OPA Server URL>:<port>/v1
```

*Note: There must be a trailing `/v1` on the URL. The Policy Engine is only compatible with OPA's v1 API.*

If you only want to perform a certain type of validations, you can add the configuration to any of the following files instead:

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

## Deploying an OPA server for Policy Engine to use

The Policy Engine supports the following OPA server deployments: 
* An existing OPA cluster 
* An OPA server deployed in an existing Kubernetes cluster with an Armory Spinnaker deployment. If you want to use this method, use the following YAML example to deploy the OPA server:

This example manifest creates an OPA deployment in the same namespace as your Spinnaker deployment and exposes the OPA API:  

```yaml
apiVersion: apps/v1
kind: Deployment
metadata:
  name: opa-deployment
  namespace: <your-spinnaker-namespace>
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
      - name: opa
        image: openpolicyagent/opa
        ports:
        - containerPort: 8181
        args:
          - "run"
          - "-s"
---
apiVersion: v1
kind: Service
metadata:
  name: opa
  namespace: <your-spinnaker-namespace>
spec:
  selector:
    app: opa
  ports:
  - protocol: TCP
    port: 8181
    targetPort: 8181

```

Replace `<your-spinnaker-namespace>` with your Spinnaker namespace and save the file. Then, deploy the manifest:
```
kubectl create -f <deployment yaml file name>.yaml
```
    
## Using ConfigMaps for OPA Policies

If you want to use ConfigMaps for OPA policies, you can use the below manifest as a starting point. This example manifest deploys an OPA server and applies the configuration for things like rolebinding and a static DNS. 

When using the below example, keep the following guidelines in mind:
* The manifest does not configure any authorization requirements for the OPA server it deploys. This means that anyone can add a policy.
* Make sure you replace `<namespace>` with the appropriate namespace.

```yaml
---
apiVersion: v1
kind: Namespace
metadata:
  name: opa
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
  name: system:serviceaccounts:<namespace>
  apiGroup: rbac.authorization.k8s.io
---
# Define role in the `opa` namespace for OPA/kube-mgmt to update configmaps with policy status.
# The namespace for this should be the namespace where policy configmaps will be created
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  namespace: <namespace>
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
  namespace: <namespace>
  name: opa-configmap-modifier
roleRef:
  kind: Role
  name: configmap-modifier
  apiGroup: rbac.authorization.k8s.io
subjects:
- kind: Group
  name: system:serviceaccounts:<namespace>
  apiGroup: rbac.authorization.k8s.io
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: opa-deployment
  namespace: <namespace>
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
          image: openpolicyagent/opa:0.13.1
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
            - "--policies=<namespace>"
---
# Create a static DNS endpoint for Spinnaker to reach OPA
apiVersion: v1
kind: Service
metadata:
  name: opa
  namespace: <namespace>
spec:
  selector:
    app: opa
  ports:
  - protocol: TCP
    port: 8181
    targetPort: 8181
```

## Using the Policy Engine to validate pipeline configurations

The Policy Engine uses [OPA's Data API](https://www.openpolicyagent.org/docs/latest/rest-api/#data-api) to check pipeline configurations against OPA policies that you set. 

In general, the only requirement for the Policy Engine in Rego syntax is the following:

```
package opa.pipelines

deny["some text"] {
  condition
}
```

Blocks of rules must be in a denial statement and the package must be `opa.pipelines`.

At a high level, adding policies for the Policy Engine to use is a two-step process:
1. Create the policies and save them to a `.rego` file.
2. Add the policies to the OPA server with a ConfigMap or API request.

### Sample OPA Policy

**Step 1. Create Policies**

The following OPA policy enforces one requirement on all pipelines: 
* Any pipeline with more than one stage must have a manual judgement stage.


```
# manual-judgment.rego. Notice the package. The opa.pipelines package is used for policies that get checked when a pipeline is saved.
package opa.pipelines

deny["Every pipeline must have a Manual Judgment stage"] {
  manual_judgment_stages = [d | d = input.pipeline.stages[_].type; d == "manualJudgment"]
  count(input.pipeline.stages[_]) > 0
  count(manual_judgment_stages) == 0
}

```
Add the the policy to a file named `manual-judgment.rego`

**Step 2. Add Policies to OPA**

After you create a policy, you can add it to OPA with an API request or with a ConfigMap. The following examples use  a `.rego` file named `manual-judgement.rego`. 

**ConfigMap Example** 

Armory recommends using ConfigMaps to add OPA policies instead of the API for OPA deployments in Kubernetes.

If you have configured OPA to look for a ConfigMap, you can create the ConfigMap for `manual-judgement.rego` with this command:

```
kubectl create configmap manual-judgment --from-file=manual-judgment.rego
```

**API Example** 

Replace the endpoint with your OPA endpoint:

```
curl -X PUT \
-H 'content-type:text/plain' \
-v \
--data-binary @manual-judgment.rego \
http://opa.spinnaker:8181/v1/policies/policy-01
```

Note that you must use the `--data-binary` flag, not the `-d` flag.
    
## Using the Policy Engine to validate deployments

While simple cases can be validated by the Policy Engine during a pipeline's configuration, there are a number of cases that can only be addressed at runtime. By nature, Spinnaker's pipelines can be dynamic, resolving things like SpEL and Artifacts just in time for them. This means there are external influences on a pipeline that are not known at save time. To solve for this issue, the Policy Engine can validate pipelines when they run to but before deployments make it to your cloud provider. 

As an example, let's use Policy Engine to prevent Kubernetes LoadBalancer Services being deployed with open SSH ports.

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

Using the above policy, Policy Engine tests for a few things when a pipeline runs:
* Any manifest where the `kind` is `Service` and `type` is `LoadBalancer`. Manifests that don't meet these criteria will not be evaluated by subsequent rules.

* Check all of the ports to ensure that port `22` isn't open. If the Policy Engine finds port `22`, the `deny` rule evaluates to true. This results in the deployment failing and the `msg` is shown to the user.

You'll notice a few things about this policy:

* The package name is explicit, which means that this policy only applies to the `deployManifest` task. You can write policies for other tasks by replacing `deployManifest` with your task name. Generally, the task name maps to a stage name.

* The policy tests a set of manifests which `deployManifest` will deploy to Kubernetes. This is part of the tasks configuration, which is passed into the policy in it's entirety under `input.deploy`.

* The policy isn't limited to any particular Kubernetes account. If you'd like to only apply policies to, say, your Production account, use `input.deploy.account` to narrow down policies to specific accounts. This is useful when you want more or less restrictive policies across your infrastructure. 

Once you've written your policy, you can push it to your OPA server via a ConfigMap or the API. Once it's pushed, the Policy Engine can begin enforcing the policy.


### Validating a deployment

Now that the policy has been uploaded to the OPA server, the policy gets enforced on any deployment to Kubernetes without additional input from the end user. Error messages returned by the policy will be surfaced in the UI immediately following a halted deployment. 


![](/images/runtime-policy-validation.png)


### Disabling an OPA policy

You can disable a `deny` policy by adding a false statement to the policy body.  For example, you can add `0 == 1` as a false statement to the manual judgement policy we used previously:

```
package opa.pipelines

deny["Every pipeline must have a Manual Judgment stage"] {
  manual_judgment_stages = [d | d = input.pipeline.stages[_].type; d == "manualJudgment"]
  count(input.pipeline.stages[_]) > 0
  count(manual_judgment_stages) == 0
  0 == 1
}
```


## Troubleshooting
**I encountered the following error when trying to save my pipeline:**
```
There was an error saving your pipeline: org.json.JSONException: JSONObject["result"] not found.
```
This error occurs because you do not have any policies configured. The Policy Engine operates on a fail closed model.
