---
layout: post
title: Webhook Config
order: 17
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Parameters

**spec.spinnakerConfig.config.webhook**

```yaml
webhook:
  trust:
    enabled: false
    trustStore:
    trustStorePassword:
```

- `trust`:
  - `enabled`: false
  - `trustStore`: The path to a key store in JKS format containing certification authorities that should be trusted by webhook stages. File needs to be present on the machine running Spinnaker.
  - `trustStorePassword`: The password for the supplied trustStore.
