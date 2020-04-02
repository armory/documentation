---
layout: post
title: DeploymentEnviorment Config Reference
order: 5
---

> ⚠️ Note: This key/section is currently ignored by the Operator. this page is left as informational for a migration from Halyard to the Operator.

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


# Example YAML
```yaml
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    config:
      deploymentEnvironment: {}  # this section from your halconfig can be discarded as this key is unused
```

