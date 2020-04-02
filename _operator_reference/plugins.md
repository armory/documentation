---
layout: post
title: Plugins Config Reference
order: 8
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# spec.spinnakerConfig.config.spinnaker.extensibility.plugins

```yaml
spinnaker:
  extensibility:
    plugins:
      abc:
    id: abc
    enabled: false # To enable or disable the plugin.
    uiResourceLocation: abc # The location of the plugin's ui resource.
    version: abc # The plugin version to use
    extensions:
      abc:
    id: abc
    enabled: false
    config: {}
    repositories:
      abc:
    id: abc
    url: abc # The location of the plugin repository.
```
