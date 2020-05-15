---
layout: post
title: Using the Policy Engine
order: 144
---

## Overview
{:.no_toc}
The Armory Policy Engine is designed to allow enterprises more complete control of their software delivery process by providing them with the hooks necessary to perform more extensive verification of their pipelines and processes in Spinnaker. This policy engine is backed by [Open Policy Agent](https://www.openpolicyagent.org/) (OPA) and uses input style documents to perform validation of pipelines during save time and runtime:

* **Save time validation** - Validate pipelines as they're created/modified. This validation operates on all pipelines using a fail closed model. This means that if you have the Policy Engine enabled but no policies configured, the Policy Engine prevents you from creating or updating any pipeline.
* **Runtime validation** - Validate deployments as a pipeline is executing. This validation only operates on tasks that you have explicitly created policies for. Tasks with no policies are not validated.

While simple cases can be validated by the Policy Engine during save time validation, there are a number of cases that can only be addressed at runtime. By nature, Spinnaker's pipelines can be dynamic, resolving things like SpEL and Artifacts just in time for them. This means there are external influences on a pipeline that are not known at save time. To solve for this issue, the Policy Engine can validate pipelines when they run to but before deployments make it to your cloud provider. 

For example, Runtime validation with the Policy Engine can prevent Kubernetes LoadBalancer Services from being deployed with open SSH ports.

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Before You Start
Using the Policy Engine requires an understanding of OPA's [rego syntax](https://www.openpolicyagent.org/docs/latest/policy-language/) and how to [deploy an OPA server](https://www.openpolicyagent.org/docs/latest/#running-opa).

## How Policy Engine works

The Policy Engine uses [OPA's Data API](https://www.openpolicyagent.org/docs/latest/rest-api/#data-api) to check pipeline configurations against OPA policies that you set. 

In general, the only requirement for the Policy Engine in `rego` syntax is the following:

```
package opa.pipelines

deny["some text"] {
  condition
}
```

Blocks of rules must be in a `deny` statement and must have a valid package, such as `opa.pipelines`.

At a high level, adding policies for the Policy Engine to use is a two-step process:
1. Create the policies and save them to a `.rego` file as described in [Writing OPA policies for the Policy Engine](#writing-opa-policies-for-the-policy-engine).
2. Add the policies to the OPA server with a ConfigMap or API request as described in [Adding policies to the Policy Engine](#adding-policies-to-the-policy-engine).


## Writing OPA policies for the Policy Engine

An OPA policy for the Policy Engine is written in `rego` syntax and typically follows the following format:

```
package opa.<task_type>
    
deny[msg] {
  msg := <Message to display to user>
  condition_1
  condition_2
  condition_n
}
```

`package opa.<taskType>` 
- Required. Determines what type of task that a policy applies to. This can be:
  - `pipelines` configures the policy to validate a pipeline when it gets saved.
  - `spinnaker.deployment.tasks.<someTask>` configures the policy to determine if a pipeline contains a specific task type when a pipeline runs, such as a type of stage. If a specific task type exists in the pipeline, verify that it adheres to the policy.
    - For example, policies that contain `package spinnaker.deployment.tasks.deployManifest` apply to pipelines that contain a Deploy Manifest stage.You can write policies for other tasks by replacing `deployManifest` with your task name. Generally, the task name maps to a stage name..

`deny[msg] {`
- Required. Policy Engine works by evaluating pipelines against conditions you set. If the conditions evaluate to true, the pipelines are failed.
- The message that gets displayed to a user when a policy is triggered

`msg :=<Message to display to user>`
- Recommended. The message that gets shown to users when a policy fails a pipeline.

`condition_1`

- Required. This is the main body of the policy. The conditions that you configure here are what a pipeline gets evaluated against.


## Understanding policies

The following sections contain several examples and describe how the Policy Engine would evaluate a given policy.

### Pipeline save time validation
This example evaluates pipelines when they are saved after being created or updated. Any pipeline with at least 1 stage must have at least 1 Manual Judgement stage.

The comments in the following `rego` describe a policy that makes sure any pipeline that has at least one stage has a Manual Judgment stage when it gets saved:

```
# Evaluate all pipelines when they get saved
package opa.pipelines
    
# Fail any pipelines that do not meet the conditions of this policy
deny[msg] {
    
  # The msg that gets displayed
  msg := "Every pipeline must have a Manual Judgment stage."
    
  # Check if a pipeline has a Manual Judgement stage
  manual_judgment_stages = [d | d = input.pipeline.stages[_].type; d == "manualJudgment"]
    
  # Check if pipeline has at least 1 stage
  count(input.pipeline.stages[_]) > 0
      
  # Check if there is at least one manual judgement stage
  count(manual_judgment_stages) == 0
}
```

### Pipeline runtime validation
This example evaluates pipelines when they run. Specifically, the policy applies to pipelines that have a Deploy Manifest stage that deploys a Kubernetes service.

The comments in the following `rego` describe a policy that makes sure any load balancers created from a Deploy Manifest stage do not have port 22 open when a pipeline runs:

```
# Evaluate pipelines with Deploy Manifest stages against this policy
package spinnaker.deployment.tasks.deployManifest
    
# Fail any pipelines that have a Deploy Manifest stage and meet the conditions of this policy
deny[msg] {
    # Display this message if the pipeline fails.
    msg := "LoadBalancer Services must not have port 22 open."

    # Test a set of manifests which `deployManifest` will deploy to Kubernetes. This is part of the tasks configuration, which is passed into the policy in its entirety under `input.deploy`.
    manifests := input.deploy.manifests
    manifest := manifests[_]

    # Check any manifests where the kind is Service and the type is LoadBalancer
    manifest.kind == "Service"
    manifest.spec.type == "LoadBalancer"

    # Check all of the ports to ensure that port `22` isn't open. If the Policy Engine finds port `22`, the `deny` rule evaluates to true. This results in the deployment failing and the `msg` is shown to the user.
    port := manifest.spec.ports[_]
    port.port == 22
}
```

Note that this example policy isn't limited to any particular Kubernetes account. If you'd like to only apply policies to, say, your Production account, use `input.deploy.account` to narrow down policies to specific accounts. This is useful when you want more or less restrictive policies across your infrastructure.

## Adding policies to the Policy Engine

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

This label corresponds to the label you can add in the [manifest](/spinnaker/policy-engine-enable#example-opa-server) used to set up your OPA server. This label `"--require-policy-label=true"`  in the manifest configures the OPA server and, by extension, the Policy Engine to only check ConfigMaps that have the corresponding label. This improves performance.

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

## Validating a deployment

Now that the policy has been uploaded to the OPA server, the policy gets enforced on any relevant pipelines without additional input from the end user. Error messages returned by the policy get surfaced in the UI immediately following a halted deployment. 


![Policy triggered and shown in Deck](/images/runtime-policy-validation.png)

## Disabling policies

You can disable a `deny` policy by adding a false statement to the policy body.  For example, you can add `0 == 1` as a false statement to the Manual Judgement policy we used previously:

```
package opa.pipelines

deny["Every pipeline must have a Manual Judgment stage"] {
  manual_judgment_stages = [d | d = input.pipeline.stages[_].type; d == "manualJudgment"]
  count(input.pipeline.stages[_]) > 0
  count(manual_judgment_stages) == 0
  
  # False statement
  0 == 1
}
```

Since one part of the `deny` block is false, the `deny` action will not ever get triggered.

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
