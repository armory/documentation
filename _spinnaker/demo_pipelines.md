---
layout: post
title: Demo Pipelines
order: 170
---

> NOTE:  This is an "alpha" feature, we would love your feedback and bug reports!

Armory's Halyard offers a command to help set up a demo pipeline in your Spinnaker system.
The command is very simple:

```sh
hal armory upload-pipeline <URL>
```

The URL is expected to return a special JSON payload that contains a pipeline, plus some
additional fields to indicate what options the user needs to enter to customize the pipeline.

When prompted for a value, if there is a term in parentheses, that is the default value; you
can just hit 'enter' and accept the default.  Otherwise, you will need to enter a value.
(see the example below)

Armory currently provides the following demo pipelines:

* [https://get.armory.io/demo-pipelines/demo_template.json](https://get.armory.io/demo-pipelines/demo_template.json)

Example execution:

```sh
$ hal armory upload-pipeline https://get.armory.io/demo-pipelines/demo_template.json
Fetching https://get.armory.io/demo-pipelines/demo_template.json
Starting to parse payload
Enter namespace: paul
Enter account (kubernetes):
Enter application (spin):
+ Get current deployment
  Success
+ Upload pipeline
  Success
+ Pipeline uploaded.
```

