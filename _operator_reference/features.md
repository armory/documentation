---
layout: post
title: Features Config
order: 7
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

**spec.spinnakerConfig.config.features**

```yaml
features:
  artifacts:
  auth:
  fiat:
  chaos:
  entityTags:
  pipelineTemplates:
  artifactsRewrite:
  mineCanary:
  appengineContainerImageUrlDeployments:
  infrastructureStages:
  travis:
  wercker:
  managedPipelineTemplatesV2UI:
  gremlin:
```

- `artifacts`: true or false. Enable [artifact](https://spinnaker.io/reference/artifacts/) support.
- `auth`: true or false.
- `fiat`: true or false.
- `chaos`: true or false. Enable [Chaos Monkey](https://github.com/Netflix/chaosmonkey/wiki) support. For this to work, you'll need a running Chaos Monkey deployment. Currently, Halyard doesn't configure Chaos Monkey for you.
- `entityTags`: true or false.
- `pipelineTemplates`: true or false. Enable [pipeline template](https://github.com/spinnaker/dcd-spec) support.
- `artifactsRewrite`: true or false.  Enable [new artifact](https://www.spinnaker.io/reference/artifacts-with-artifactsrewrite/) support.
- `mineCanary`: true or false. Enable Canary support. For this to work, you'll need a Canary judge configured. Currently, Halyard does not configure Canary judge for you.
- `appengineContainerImageUrlDeployments`: true or false. Enable appengine deployments using a container image URL from gcr.io.
- `infrastructureStages`: true or false. Enable infrastructure stages. Allows for creating Load Balancers as part of pipelines.
- `travis`: true or false. Enable the Travis CI stage.
- `wercker`: true or false. Enable the Wercker CI stage.
- `managedPipelineTemplatesV2UI`: true or false. Enable managed pipeline templates v2 UI support.
- `gremlin`: true or false. Enable Gremlin fault-injection support.
