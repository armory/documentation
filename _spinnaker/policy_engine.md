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

To enable the use of Armory's Policy Engine, the following configuration must be added to Halyard in `~/.hal/default/profiles/front50-local.yml`:

```yaml
armory:
  opa:
    enabled: true
    url: http://opa-server.domain.tld:8181/v1
```
*Note: there must be a trailing /v1 on the url. This extension is only compatible with OPA's v1 api.*

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

### OPA Specifics

Armory Spinnaker's integration uses [OPA's data api](https://www.openpolicyagent.org/docs/latest/rest-api/#data-api) to check pipeline configurations against OPA policy. 

In general, the only requirement for Armory Spinnaker Policy Engine in Rego syntax is the following:

```
package opa.pipelines

deny["some text"] {
  condition
}

```

Blocks of rules must be in a denial statement and the package must be `opa.pipelines`.

### Sample OPA Policy in Rego

In the following sample OPA policy, the first policy enforces that the pipeline must have a manual judgement stage at some phase (if the pipeline has at least one stage).  The second policy ensures that stages that are of type "deploy" have notifications enabled.

```
# manual-judgment-and-notifications.rego
package opa.pipelines

deny["must have a manual judgement stage"] {
  stage_types = [d | d = input.pipeline.stages[_].type; d == "manualJudgment"]
  count(input.pipeline.stages[_]) > 0
  count(stage_types) == 0
}

deny["deploy stages must have notifications"] {
  deploy_stages = [s | s = input.pipeline.stages[_]; s.type == "deploy" ]
  stage = deploy_stages[_]
  not stage["notifications"]
}

```

The policy can be added to OPA with this API request (replace the endpoint with your OPA endpoint):

```bash
curl -X PUT \
  -H 'content-type:text/plain' \
  -v \
  --data-binary @manual-judgment-and-notifications.rego \
  http://opa.spinnaker:8181/v1/policies/policy-01
```

Note: you must use the `--data-binary` flag, not the `-d` flag.
