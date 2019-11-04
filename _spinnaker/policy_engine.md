---
layout: post
title: Policy Engine
order: 142
---

## Overview
The Armory Policy Engine is designed to allow enterprises more complete control of their software delivery process by providing them with the hooks necessary to perform more extensive verification of their pipelines and processes in Spinnaker. This policy engine is backed by [Open Policy Agent](https://www.openpolicyagent.org/) and uses the input style documents to perform validation of pipelines during creation and updates.

## Requirements 
The Policy Engine has been tested with OPA versions 0.12.x and 0.13.x

## Before You Start
Keep the following guidelines in mind when using the Policy Engine: 
* The Policy Engine uses 'fail closed' behavior. That means that if you have the policy engine enabled but no policies created, Spinnaker refuses to create or update any pipeline. 
* Using the Policy Engine requires understanding OPA's [rego syntax](https://www.openpolicyagent.org/docs/latest/policy-language/) and how to deploy an OPA server.

## Enabling the Policy Engine

To enable Armory's Policy Engine, add the following configuration to Halyard in `~/.hal/default/profiles/front50-local.yml`:

```yaml
armory:
  opa:
    enabled: true
    url: http://opa-server.domain.tld:8181/v1
```

*Note: There must be a trailing /v1 on the URL. This extension is only compatible with OPA's v1 API.*

If you are using an in-cluster OPA instance (such as one set up with the instructions below), Spinnaker can access OPA via the Kubernetes service DNS name (replace `opa.opa` with `opa.<namespace>` where `<namespace>` is the namespace where OPA is installed:

```yaml
armory:
  opa:
    enabled: true
    url: http://opa.opa:8181/v1
```

After you update `front50-local.yml`, you must apply and deploy your changes:

```bash
hal config deploy
```

## OPA Server Deployment

The Policy Engine supports the following OPA server deployments: 
* An existing OPA cluster 
* An OPA server deployed in an existing Kubernetes cluster with an Armory Spinnaker deployment. If you want to use this method, use the following YAML example to deploy the OPA server:

    ```yaml
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      name: opa-deployment
      namespace: <<your-spinnaker-namespace>>
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
      namespace: <<your-spinnaker-namespace>>
    spec:
      selector:
        app: opa
      ports:
      - protocol: TCP
        port: 8181
        targetPort: 8181

    ```
    
## Creating OPA Policies with a ConfigMap

If you want to create OPA policies via ConfigMap, you can use the below manifest. This example creates a namespace called `opa` and sets up permissions so that OPA can read ConfigMaps.

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
  name: opa-viewer
roleRef:
  kind: ClusterRole
  name: view
  apiGroup: rbac.authorization.k8s.io
subjects:
- kind: Group
  name: system:serviceaccounts:opa
  apiGroup: rbac.authorization.k8s.io
---
# Define role in the `opa` namespace for OPA/kube-mgmt to update configmaps with policy status.
# The namespace for this should be the namespace where policy configmaps will be created
kind: Role
apiVersion: rbac.authorization.k8s.io/v1
metadata:
  namespace: opa
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
  namespace: opa
  name: opa-configmap-modifier
roleRef:
  kind: Role
  name: configmap-modifier
  apiGroup: rbac.authorization.k8s.io
subjects:
- kind: Group
  name: system:serviceaccounts:opa
  apiGroup: rbac.authorization.k8s.io
---
# Create a static DNS endpoint for Spinnaker to reach OPA
apiVersion: v1
kind: Service
metadata:
  name: opa
  namespace: opa
spec:
  selector:
    app: opa
  ports:
  - protocol: TCP
    port: 8181
    targetPort: 8181
---
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  labels:
    app: opa
  namespace: opa
  name: opa
spec:
  replicas: 1
  selector:
    matchLabels:
      app: opa
  template:
    metadata:
      labels:
        app: opa
      name: opa
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
            - "--policies=opa"
```

## OPA Specifics

The Policy Engine uses [OPA's Data API](https://www.openpolicyagent.org/docs/latest/rest-api/#data-api) to check pipeline configurations against OPA policies that you set. 

In general, the only requirement for the Policy Engine in Rego syntax is the following:

```
package opa.pipelines

deny["some text"] {
  condition
}
```

Blocks of rules must be in a denial statement and the package must be `opa.pipelines`.

At a high level, adding policies to OPA is a two-step process:
1. Create the policies and save them to a `.rego` file.
2. Add the policies to the OPA server with an API request or a ConfigMap

### Sample OPA Policy

**Step 1. Create Policies**

The following OPA policy enforces two requirements: 
* The first policy requires every pipeline with more than one stage to have a manual judgement stage at some phase 
* The second policy requires any stages that are a "deploy" type to have notifications enabled.

```
# manual-judgment-and-notifications.rego
package opa.pipelines

deny["Every pipeline must have a Manual Judgment stage"] {
  manual_judgment_stages = [d | d = input.pipeline.stages[_].type; d == "manualJudgment"]
  count(input.pipeline.stages[_]) > 0
  count(manual_judgment_stages) == 0
}

deny["Every deploy stage must have have notifications enabled"] {
  deploy_stages = [s | s = input.pipeline.stages[_]; s.type == "deploy" ]
  stage = deploy_stages[_]
  not stage["notifications"]
}
```
Add the two policies to a file named `manual-judgment-and-notifications.rego`

**Step 2. Add Policies to OPA**

After you create a policy, you can add it to OPA with an API request or with a ConfigMap. The following examples use  a `.rego` file named `manual-judgement-and-notifications.rego`. 

**API Example** 

Replace the endpoint with your OPA endpoint:

    ```bash
    curl -X PUT \
    -H 'content-type:text/plain' \
    -v \
    --data-binary @manual-judgment-and-notifications.rego \
    http://opa.spinnaker:8181/v1/policies/policy-01
    ```

Note that you must use the `--data-binary` flag, not the `-d` flag.

**ConfigMap Example** 

If you have configured OPA to look for a ConfigMap, you can create the ConfigMap for `manual-judgement-and-notifications.rego` with this command:

  ```bash
    kubectl create configmap manual-judgment-and-notifications --from-file=manual-judgment-and-notifications.rego
  ```
    
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
