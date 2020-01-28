---
layout: post
title: Plugin Users Guide
order: 108
---

Note that Plugins are currently in [Early Release](https://kb.armory.io/releases/early-release-beta-GA/). The feature is working and installable, but some functionality is likely to be missing and a number of known and unknown issues are likely to surface.

This guide describes how to add plugins to Spinnaker so that Spinnaker users can include them in their pipelines. This assumes that Spinnaker is already setup and configured.

Currently, plugins have the following version requirements:

* Spinnaker version 1.16 or later
* Halyard version 1.23.0 or later

Note that adding a plugin to Spinnaker requires redeploying Spinnaker with Halyard.

## Plugin Manifests

Plugins come with a manifest file that specifies what is needed for the plugin to work. Here is an example of a possible manifest file for a plugin:

```
name: armory/s3copy
description: Copies S3 files to different locations
manifestVersion: plugins/v1
version: 1.2.3
options:
  s3:
    username: user
    password: pass
resources:
  orca:
  - https://stage-plugin-test.s3-us-west-2.amazonaws.com/stage-plugin-0.0.1-SNAPSHOT.jar
  deck:
  - https://stage-plugin-test.s3-us-west-2.amazonaws.com/stage-plugin-ui-0.0.1-SNAPSHOT.js
```

## Enabling Plugins for Spinnaker

To enable plugins for your Spinnaker deployment run the following [command](https://www.spinnaker.io/reference/halyard/commands/#hal-plugins-enable):

```
hal plugins enable
```

This enables plugins to be loaded if the individual plugin(s) are enabled.

## Adding a Plugin

To add a specific plugin to your deployment, use the `add` command and provide the plugin name and manifest location:

```
hal plugins add <plugin-name> --enabled \
     --manifest-location="https://path/to/plugin/manifest.yml"`
```

The `--enabled` flag automatically enables the plugin. Plugins, by default, are disabled, unless the `--enabled` flag is passed when adding the plugin.

## Controlling Plugin Downloads

If Spinnaker is deployed to Kubernetes, you must configure Spinnaker to download the plugin resources. To enable plugin downloads, run the following command:

```
hal plugins enable-downloading 
```

If Spinnaker is deployed to something besides Kubernetes, plugin resources need to be added to the correct locations.

## Modifying Plugins

To modify an existing plugin, use the `hal plugins edit` [command](https://www.spinnaker.io/reference/halyard/commands/#hal-plugins-edit) command. Add the plugin name that needs to be modified to the command.

For example, to disable a plugin, run the following command:

```
hal plugins edit <plugin-name> --enabled false
```

## Deleting Plugins

To delete a plugin, run the following command:

```
hal plugins delete <plugin-name>
```

## Listing All Plugins Configured

To see what plugins are currently configured, run the following command:

```
hal plugins list
```

## Applying Configuration Changes

When configurations are changed using Halyard, you must run `hal deploy apply` to send the configuration to your Spinnaker deployment. Plugins are no different. 
