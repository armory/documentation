---
layout: post
title: Plugins Config
order: 11
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Parameters

**spec.spinnakerConfig.config.spinnaker.extensibility.plugins**

Please see the [Plugins User Guide]<https://www.spinnaker.io/guides/user/plugin-users/> for a detailed explanation of how to add and configure plugins.

```yaml
spinnaker:
    extensibility:
      plugins:
        <plugin-name>:
          id:
          enabled:
          uiResourceLocation:
          version:
          extensions:
            <extension-name>:
              id:
              enabled:
              config: {}
        Armory.EventListenerPlugin:
          id: Armory.EventListenerPlugin
          enabled: true
          uiResourceLocation: /some/echo/directory
          version: '1.0'
          extensions:
            armory.dataDogListener:
              id: armory.dataDogListener
              enabled: true
              config: {}
      repositories:
        <repository-name>:
          id: <same-as-repository-name>
          url: <url-to-repositories.json>
```

- `plugins`:
  - `<plugin-name>`: suggested format is creator.plugin
    - `id`: plugin ID as defined in plugins.json
    - `enabled`: true or false
    - `uiResourceLocation`: path to the Javascript file of the UI component
    - `version`:  version of the plugin to use
    - `extensions`:
      - `<extension-name>`:
        - `id`: same as the name of the plugin extension
        - `enabled`: true or false
        - `config`: {} - configuration for this specific plugin
- `repositories`:
  - `<repository-name>`:
    - `id`: <same-as-repository-name>
    - `url`: <url-to-repositories.json>


## Example

```yaml
spinnaker:
    extensibility:
      plugins:
        Armory.RandomWeightPlugin:
          id: Armory.RandomWeightPlugin
          enabled: true
          uiResourceLocation: /some/orca/directory/file.js
          version: 1.0.16
          extensions:
            armory.randomWaitStage:
              id: armory.randomWaitStage
              enabled: true
              config: {}
        Armory.EventListenerPlugin:
          id: Armory.EventListenerPlugin
          enabled: true
          uiResourceLocation: /some/echo/directory/file.js
          version: '1.0'
          extensions:
            armory.dataDogListener:
              id: armory.dataDogListener
              enabled: true
              config: {}
      repositories:
        armoryPlugins:
          id: armoryPlugins
          url: https://raw.githubusercontent.com/spinnaker-plugin-examples/examplePluginRepository/master/repositories.json
```
