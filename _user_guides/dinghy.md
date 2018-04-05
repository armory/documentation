---
layout: post
title: Pipelines as Code
order: 108
redirect_from:
  - /user-guides/pipeline-templates
---

Armory's Pipelines As Code feature provides a way to specify pipeline definitions in source code repos (like GitHub & BitBucket). 

The Armory Spinnaker installation provides a service called "Dinghy" which will keep the pipeline in Spinnaker in sync with what is defined in the GitHub repo. Also, users will be able to make a pipeline by composing other pipelines, stages, or tasks and templating certain values.

> NOTE: before you can use this feature, please ensure you have [configured it](http://docs.armory.io/install-guide/dinghy/) correctly.

## How it works in a nutshell

GitHub (or BitBucket) webhooks are sent off when either the Templates or the Module definitions are modified. The Dinghy service looks for and fetches all dependent modules and parses the template and updates the pipelines in Spinnaker. The pipelines get automatically updated whenever a module that is used by a pipeline is updated in VCS. This is done by maintaining a dependency graph.

## Primitives

- **Modules**: These are templates that define a Stage/Task in the pipeline. They are kept in a single GitHub repo that is configurable when the dinghy service starts. eg:

![](http://f.cl.ly/items/3R0B3W3o2l3h2K0E3e1G/dinghy-template-repo.png)

 They are JSON files with replacable values in them. e.g., a module that defines a wait stage in a pipeline might look like:
```
{
    "name": "Wait",
    "refId": "1",
    "requisiteStageRefIds": [],
    "type": "wait",
    "waitTime": 42
}
```
- **Pipeline definitions**: These define a pipeline for an application in a file called `dinghyfile`. The `dinghyfile` usually resides at the root level of the application repo. eg:

![](http://f.cl.ly/items/3t3z0Q2Z040f0i0V2P3O/dinghyfile.png)

You can compose stage/task templates to make a full definition. e.g., a Pipeline definition that has a single wait stage might look like:
```
{
  "application": "yourspinnakerapplicationname",
  "pipelines": [
    {
      "application": "yourspinnakerapplicationname",
      "keepWaitingPipelines": false,
      "limitConcurrent": true,
      "name": "Made By Armory Pipeline Templates",
      "stages": [
        {
          "name": "Wait",
          "refId": "1",
          "requisiteStageRefIds": [],
          "type": "wait",
          "waitTime": 10
        }
      ],
      "triggers": []
    }
  ]
}
```

## Template variables and substitution

We can have Pipeline definitions use Modules defined in another GitHub Repo. e.g.:
```{% raw %}
{
  "application": "yourspinnakerapplicationname",
  "pipelines": [
    {
      "application": "yourspinnakerapplicationname",
      "keepWaitingPipelines": false,
      "limitConcurrent": true,
      "name": "Made By Armory Pipeline Templates",
      "stages": [
        {{ module "wait.stage.module" }} // Module created in dinghy-templates repo
      ],
      "triggers": []
    }
  ]
}
{% endraw %}```
We can also overwrite variables inside the imported module like so:
```{% raw %}
{
  "application": "yourspinnakerapplicationname",
  "pipelines": [
    {
      "application": "yourspinnakerapplicationname",
      "keepWaitingPipelines": false,
      "limitConcurrent": true,
      "name": "Made By Armory Pipeline Templates",
      "stages": [
        {{ module "wait.stage.module" "waitTime" 200 }}
      ],
      "triggers": []
    }
  ]
}
{% endraw %}```
Any number of variables can be overwritten in the same module by simply specifying them as arguments. e.g.: `{% raw %}{{ module "wait.stage.module" "waitTime" 100 "name" "simpleWait" }}{% endraw %}`.

Let us create a more realistic pipeline using templates. One that would look like this:

![](http://f.cl.ly/items/1z3z3Z2w3j2w35171U39/Screen%20Shot%202018-03-12%20at%2011.18.38%20AM.png)

You would use the following JSON to create such. Note that any of the stages could have come from an imported module, but we show the full JSON here for readability:

```{% raw %}
{
  "application": "yourspinnakerapplicationname",
  "pipelines": [
    {
      "application": "yourspinnakerapplicationname",
      "keepWaitingPipelines": false,
      "limitConcurrent": true,
      "name": "step1",
      "stages": [
        {
          "continuePipeline": false,
          "failPipeline": true,
          "isNew": true,
          "job": "armory/job/armory-hello-deploy/job/master",
          "master": "Armory Jenkins",
          "name": "Jenkins",
          "parameters": {},
          "refId": "105",            // a unique id that's unique between pipelines.stages[*].refId
          "requisiteStageRefIds": [],
          "type": "jenkins"
        },
        {
          "baseLabel": "release",
          "baseOs": "ubuntu",
          "cloudProviderType": "aws",
          "extendedAttributes": {},
          "isNew": true,
          "name": "bake in eu-central-1",
          "package": "myapp_1.27-h343",
          "refId": "101",
          "regions": [
             "eu-central-1"
          ],
          "requisiteStageRefIds": [
            "105"      // this means: stage "105" comes before this stage
          ],
          "storeType": "ebs",
          "type": "bake",
          "user": "LeSandeep",
          "vmType": "hvm"
        },
        {
          "failPipeline": true,
          "isNew": true,
          "name": "run tests",
          "refId": "102",
          "requisiteStageRefIds": [
            "101"
          ],
          "type": "script",
          "user": "LeSandeep",
          "waitForCompletion": true
        },
        {
          "isNew": true,
          "name": "canary",
          "refId": "103",
          "requisiteStageRefIds": [
            "101"
          ]
        },
        {{ module deploy.stage.module "requisiteStageRefIds" ["102", "103"] }}
      ],
      "triggers": []
    }
  ]
}
{% endraw %}```

The file `deploy.stage.module` would look like this:
```{% raw %}
{
  "clusters": [],
  "isNew": true,
  "name": "deploy to stage",
  "refId": "104",
  "requisiteStageRefIds": [],
  "type": "deploy"
}
{% endraw %}```

## Multiple level inheritance:

In the below example, we show a pipeline that is created with multiple levels of module inheritance. The application's dinghyfile looks like this:

```{% raw %}
{
  "application": "dinghytest",
  "pipelines": [
    {{ module "simple.pipeline.module" "application" "dinghytest" }}
  ]
}
{% endraw %}```
The dinghyfile inherits its pipeline from a _module_ named `simple.pipeline.module` that looks as shown below. Note that it also overrides the application name in the module to avoid conflict.

```{% raw %}
{
  "application": "yourspinnakerapplicationname",
  "keepWaitingPipelines": false,
  "limitConcurrent": true,
  "name": "Made By Armory Pipeline Templates",
  "stages": [
    {{ module "wait.stage.module" "waitTime" 200 }},
    {{ module "deploy.stage.module" "requisiteStageRefIds" ["1"] }}
  ],
  "triggers": []
}
{% endraw %}```

This module inherits two stages and overrides variables within them. The `wait.stage.module` is same as the one shown above. The `deploy.stage.module` looks like this:

```{% raw %}
{
  "clusters": [],
  "isNew": true,
  "name": "deploy to stage",
  "refId": "104",
  "requisiteStageRefIds": [],
  "type": "deploy"
}
{% endraw %}```

Note how the `requisiteStageRefIds` is overwritten while calling the module so that the deploy stage _depends on_ the wait stage. This pipeline would look like this in the spinnaker UI:

![](http://f.cl.ly/items/0p353C431U1G2g2H2N13/Screen_Shot_2018-03-26_at_5_06_25_PM.png)

## Deleting stale pipelines

If you want any pipelines in the spinnaker application that are not part of the `dinghyfile` to be deleted automatically when the `dinghyfile` is updated, then you can set `deleteStalePipelines` to `true` in the JSON like so:

```{% raw %}
{
  "application": "yourspinnakerapplicationname",
  "deleteStalePipelines": true
  "pipelines": [
  ]
}
{% endraw %}```