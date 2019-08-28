---
layout: post
title: Policy Engine
order: 142
---

## About
Armory Spinnaker now supports a new feature called "Policy Engine".  This policy engine is backed by [Open Policy Agent](https://www.openpolicyagent.org/) and uses the input style documents to perform validation of pipelines during creation and updates.

The Policy Engine integration is designed to allow enterprises more complete control of their software delivery process by providing them with the hooks necessary to perform more extensive verification of their pipelines and processes in spinnaker.

*Note: The policy engine integration will require some understanding of OPA's rego syntax and of the OPA server itself.  Armory Spinnaker tries not to be opinionated on the environment of the user and so this integration may require additional testing and verification.*

*Note: Armory Spinnaker Policy Engine has only been tested against OPA versions 0.12.x and 0.13.x*

## Configuration

**The Policy Engine integration has a 'fail closed' behavior: if you have the policy engine enabled but no policies created, Spinnaker will refuse to create/update any pipelines.**

To enable the use of Armory's Policy Engine, the following configuration must be added to Halyard in `~/.hal/default/profiles/front50-local.yml`:

```yaml
armory:
  opa:
    enabled: true
    url: http://opa-server.domain.tld:8181/v1
```

*Note: there must be a trailing /v1 on the url. This extension is only compatible with OPA's v1 api.*

If you are using an in-cluster OPA instance (such as one set up with the instructions below), Spinnaker can access OPA via the Kubernetes service DNS name (replace `opa.opa` with `opa.<namespace>` where `<namespace>` is the namespace where OPA is installed:

```yaml
armory:
  opa:
    enabled: true
    url: http://opa.opa:8181/v1
```

### OPA Deployment
Users of Armory Spinnaker can use an in-cluster OPA server, one they've already deployed or if you have an existing Kubernetes cluster and Armory Spinnaker deployment and wish to use that to host OPA, the following yaml may be used to deploy the OPA server:

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

If you want to create OPA policies via configmap, you can use this manifest, which will create an `opa` namespace and set up permissions so that OPA can read configmaps:

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

### OPA Specifics

Armory Spinnaker's integration uses [OPA's data api](https://www.openpolicyagent.org/docs/latest/rest-api/#data-api) to check pipeline configurations against OPA policy. 

In general, the only requirement for Armory Spinnaker Policy Engine in Rego syntax is the following:

```rego
package opa.pipelines

deny["some text"] {
  condition
}

```

Blocks of rules must be in a denial statement and the package must be `opa.pipelines`.

### Sample OPA Policy in Rego

In the following sample OPA policy, the first policy enforces that the pipeline must have a manual judgement stage at some phase (if the pipeline has at least one stage).  The second policy ensures that stages that are of type "deploy" have notifications enabled.

```rego
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

You can disable a `deny` policy by adding a false statement to the policy body.  For example:

```rego
package opa.pipelines

deny["Every pipeline must have a Manual Judgment stage"] {
  manual_judgment_stages = [d | d = input.pipeline.stages[_].type; d == "manualJudgment"]
  count(input.pipeline.stages[_]) > 0
  count(manual_judgment_stages) == 0
  0 == 1
```

This policy can be added to OPA with this API request (replace the endpoint with your OPA endpoint):

```bash
curl -X PUT \
  -H 'content-type:text/plain' \
  -v \
  --data-binary @manual-judgment-and-notifications.rego \
  http://opa.spinnaker:8181/v1/policies/policy-01
```

Note: you must use the `--data-binary` flag, not the `-d` flag.

If you have configured OPA to look for configmap policies, you can alternately create the configmap with this:

```bash
kubectl create configmap manual-judgment-and-notifications --from-file=manual-judgment-and-notifications.rego
```
