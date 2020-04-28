---
layout: post
title: Policy Engine
order: 142
---

## Overview
The Armory Policy Engine is designed to allow enterprises more complete control of their software delivery process by providing them with the hooks necessary to perform more extensive verification of their pipelines and processes in Spinnaker. This policy engine is backed by [Open Policy Agent](https://www.openpolicyagent.org/)(OPA) and uses input style documents to perform validation of pipelines during save time and runtime:

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

## Before You Start
Using the Policy Engine requires an understanding of OPA's [rego syntax](https://www.openpolicyagent.org/docs/latest/policy-language/) and how to [deploy an OPA server](https://www.openpolicyagent.org/docs/latest/#running-opa).

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

## Deploying an OPA server for Policy Engine to use

The Policy Engine supports the following OPA server deployments: 

* An OPA server deployed in the same Kubernetes cluster as an Armory Spinnaker deployment. The [Using ConfigMaps for OPA policies](#using-configmaps-for-opa-policies) section contains a ConfigMap you can use.
* An OPA cluster that is **not** in the same Kubernetes cluster as an Armory Spinnaker deployment . See the [OPA documentation](https://www.openpolicyagent.org/docs/latest/) for more information about installing an OPA cluster. 
    
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

After you create the policy ConfigMap, apply a label to it:

```
kubectl label configmap manual-judgment openpolicyagent.org/policy=rego
```

This label corresponds to the label you add in the [example ConfigMap](#using-configmaps-for-opa-policies). The label in the ConfigMap for creating an OPA server configures the OPA server and, by extension, the Policy Engine to only check ConfigMaps that have the corresponding label. This improves performance.

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

**Debugging runtime validation**

You can make debugging issues with runtime validation for your pipelines easier by adjusting the logging level to `DEBUG`. Add the following snippet to `hal/default/profiles/spinnaker-local.yml`:

```
logging:
  level:
    com.netflix.spinnaker.clouddriver.kubernetes.OpaDeployDescriptionValidator: DEBUG
    io.armory.spinnaker.front50.validator.validator.OpenPolicyAgentValidator: INFO
```

Once the logging level is set to `DEBUG`, you can start seeing information similar to the following in the logs:

```
2020-03-03 21:42:05.131 DEBUG 1 --- [.0-7002-exec-10] c.n.s.c.k.OpaDeployDescriptionValidator  : Passing {"input":{"deploy":{"credentials":"EKS-WEST","manifest":null,"manifests":[{"metadata":{"labels":{"app":"nginx"},"name":"policyapp","namespace":"dev"},"apiVersion":"apps/v1","kind":"Deployment","spec":{"replicas":1,"selector":{"matchLabels":{"app":"nginx"}},"template":{"metadata":{"labels":{"app":"nginx"}},"spec":{"containers":[{"image":"away168/nginx:latest","name":"nginx","ports":[{"containerPort":80}]}]}}}},{"metadata":{"name":"policyapp-service","namespace":"dev"},"apiVersion":"v1","kind":"Service","spec":{"ports":[{"port":80,"protocol":"TCP","targetPort":80}],"selector":{"app":"nginx"},"type":"LoadBalancer"}}],"moniker":{"app":"policyapp","cluster":null,"detail":null,"stack":null,"sequence":null},"requiredArtifacts":[],"optionalArtifacts":[],"versioned":null,"source":"text","manifestArtifact":null,"namespaceOverride":null,"enableTraffic":true,"services":null,"strategy":null,"events":[],"account":"EKS-WEST"}}} to OPA
```

From this information, you can extract the exact JSON being enforced. You can use it to help you understand how to build policies.

Note: The following ConfigMap is missing some annotations that Spinnaker adds later.

```
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  annotations:
    artifact.spinnaker.io/location: dev
    artifact.spinnaker.io/name: policyapp
    artifact.spinnaker.io/type: kubernetes/deployment
    deployment.kubernetes.io/revision: '4'
    kubectl.kubernetes.io/last-applied-configuration: >
      {"apiVersion":"apps/v1","kind":"Deployment","metadata":{"annotations":{"artifact.spinnaker.io/location":"dev","artifact.spinnaker.io/name":"policyapp","artifact.spinnaker.io/type":"kubernetes/deployment","moniker.spinnaker.io/application":"policyapp","moniker.spinnaker.io/cluster":"deployment
      policyapp"},"labels":{"app":"nginx","app.kubernetes.io/managed-by":"spinnaker","app.kubernetes.io/name":"policyapp"},"name":"policyapp","namespace":"dev"},"spec":{"replicas":1,"selector":{"matchLabels":{"app":"nginx"}},"template":{"metadata":{"annotations":{"artifact.spinnaker.io/location":"dev","artifact.spinnaker.io/name":"policyapp","artifact.spinnaker.io/type":"kubernetes/deployment","moniker.spinnaker.io/application":"policyapp","moniker.spinnaker.io/cluster":"deployment
      policyapp"},"labels":{"app":"nginx","app.kubernetes.io/managed-by":"spinnaker","app.kubernetes.io/name":"policyapp"}},"spec":{"containers":[{"image":"away168/nginx:latest","name":"nginx","ports":[{"containerPort":80}]}]}}}}
    moniker.spinnaker.io/application: policyapp
    moniker.spinnaker.io/cluster: deployment policyapp
  creationTimestamp: '2020-03-03T18:40:23Z'
  generation: 4
  labels:
    app: nginx
    app.kubernetes.io/managed-by: spinnaker
    app.kubernetes.io/name: policyapp
  name: policyapp
  namespace: dev
  resourceVersion: '947262'
  selfLink: /apis/extensions/v1beta1/namespaces/dev/deployments/policyapp
  uid: 711a1e92-5d7e-11ea-9dde-067e9dc02856
spec:
  progressDeadlineSeconds: 600
  replicas: 1
  revisionHistoryLimit: 10
  selector:
    matchLabels:
      app: nginx
  strategy:
    rollingUpdate:
      maxSurge: 25%
      maxUnavailable: 25%
    type: RollingUpdate
  template:
    metadata:
      annotations:
        artifact.spinnaker.io/location: dev
        artifact.spinnaker.io/name: policyapp
        artifact.spinnaker.io/type: kubernetes/deployment
        moniker.spinnaker.io/application: policyapp
        moniker.spinnaker.io/cluster: deployment policyapp
      labels:
        app: nginx
        app.kubernetes.io/managed-by: spinnaker
        app.kubernetes.io/name: policyapp
    spec:
      containers:
        - image: 'away168/nginx:latest'
          imagePullPolicy: Always
          name: nginx
          ports:
            - containerPort: 80
              protocol: TCP
          resources: {}
          terminationMessagePath: /dev/termination-log
          terminationMessagePolicy: File
      dnsPolicy: ClusterFirst
      restartPolicy: Always
      schedulerName: default-scheduler
      securityContext: {}
      terminationGracePeriodSeconds: 30
status:
  availableReplicas: 1
  conditions:
    - lastTransitionTime: '2020-03-03T20:46:21Z'
      lastUpdateTime: '2020-03-03T20:46:21Z'
      message: Deployment has minimum availability.
      reason: MinimumReplicasAvailable
      status: 'True'
      type: Available
    - lastTransitionTime: '2020-03-03T20:42:46Z'
      lastUpdateTime: '2020-03-03T21:26:43Z'
      message: ReplicaSet "policyapp-597c756868" has successfully progressed.
      reason: NewReplicaSetAvailable
      status: 'True'
      type: Progressing
  observedGeneration: 4
  readyReplicas: 1
  replicas: 1
  updatedReplicas: 1
  ```
