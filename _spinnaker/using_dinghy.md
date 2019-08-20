---
layout: post
title: Using Pipelines as Code
order: 131
---

Armory's Pipelines As Code ("Dinghy") feature provides a way to specify pipeline definitions in source code repos (like GitHub & BitBucket).

The Armory Spinnaker installation provides a service called "Dinghy" which will keep the pipeline in Spinnaker in sync with what is defined in the GitHub repo. Also, users will be able to make a pipeline by composing other pipelines, stages, or tasks and templating certain values.

> NOTE: before you can use this feature, please ensure you have [configured it](http://docs.armory.io/spinnaker/install_dinghy/) correctly.

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## How It Works in a Nutshell

GitHub (or BitBucket) webhooks are sent off when either the Templates or the Module definitions are modified. The Dinghy service looks for and fetches all dependent modules and parses the template and updates the pipelines in Spinnaker. The pipelines get automatically updated whenever a module that is used by a pipeline is updated in VCS. This is done by maintaining a dependency graph.  Dinghy will look for `dinghyfile`s in all directories not just the root path.  Unless otherwise configured, Dinghy will process changes found in the master branch. For more information on how to configure branches, see [Custom branch configuration](http://docs.armory.io/spinnaker/install_dinghy/#custom-branch-configuration)

For a deeper look at how Pipelines-as-Code works in your SDLC, take a look at
[https://kb.armory.io/concepts/Pipelines-as-Code-Workflow/](https://kb.armory.io/concepts/Pipelines-as-Code-Workflow/)

## Basic Format

A Dinghyfile is a JSON (or HCL or YAML, [see
below](#alternate-template-formats)) dictionary that wraps a
few top-level elements to instruct Dinghy where to create/update the
pipelines that are being defined.  This outer layer identifies the
application that the pipelines should live in &mdash; Dinghy will create
the application if it doesn't already exist, and you can also provide
settings for the application within this file as well.  Finally, the
`pipelines` key is an array of pipeline definitions that will be
created/updated in that application.  Here's an example Dinghyfile that has
no pipelines, but would create an application named `mynewapp`, along with
a few options.  Note that only the "application" and "pipelines" keys are
required; everything else is optional.:

```
{
  "application": "mynewapp",
  "pipelines": [],
  "spec": {
    "permissions": {
      "READ": [ "myproductteam", "mysalesteam" ],
      "EXECUTE": [ "mydevteam" ],
      "WRITE": [ "mydevopsteam" ]
    }
  }
}
```

#### Application Permissions

You can define in the "spec" block the permissions to set on the
application.  One note of caution here, if you set the WRITE permissions to
a group that the Dinghy service is NOT part of, Dinghy will not be able to
update anything within that application (pipelines won't get created or
updated).

## Primitives

- **Modules**: These are templates that define a Stage/Task in the pipeline. They are kept in a single GitHub repo that is configurable when the dinghy service starts. eg:

![](/images/dinghy-template-repo.png)

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

![](/images/dinghyfile.png)

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

## Template Variables and Substitution

Pipeline definitions can include Modules defined in another GitHub Repo. e.g.:
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

The `{% raw %}{{ module "wait.stage.module" }}{% endraw %}` takes the wait.stage.module file inside the dinghy-templates repo, and includes it in the current template. Note that modules are simply text inserted into the JSON they are referenced by; if you wanted to add another stage after the module in the example above, you would need to add the comma after the substitution so the resulting JSON was correct.

We can also pass variables to our modules like so:

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
        {{ module "wait.stage.module" "waitTime" 200 }} // Pass the "waitTime" variable with value 200 to wait.stage.module
      ],
      "triggers": []
    }
  ]
}
{% endraw %}```

Any number of variables can be passed to a module by simply specifying them as arguments, e.g.: `{% raw %}{{ module "wait.stage.module" "waitTime" 100 "name" "simpleWait" }}{% endraw %}`.

Inside wait.stage.module, we can then include these variables inline:

```{% raw %}
{
  "name": "{{ var "name" ?: "defaultname" }}",
  "refId": "1",
  "requisiteStageRefIds": [],
  "type": "wait",
  "waitTime": {{ var "waitTime" ?: 10 }}
}
{% endraw %}
```

The `{% raw %}{{ var }}{% endraw %}` function is used to access variables passed to the `{% raw %}{{ module }}{% endraw %}` call.
The first parameter is the variable name: `{% raw %}{{ var "waitName" }}{% endraw %}`
Optionally, you can include a default parameter: `{% raw %}{{ var "waitName" ?: "defaultValue" }}{% endraw %}`.

Let us create a more realistic pipeline using templates. One that would look like this:

![](/images/Screen Shot 2018-03-12 at 11.18.38 AM.png)

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
  "requisiteStageRefIds": {{ var "requisiteStageRefIds" ?: [] }},
  "type": "deploy"
}
{% endraw %}```

## Multiple Level Inheritance

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

> It is worth noting in the below example, where we are substituting a string variable, the call to {% raw %}{{ var ... }}{% endraw %} is also surrounded by quotes, unlike when substituting non-string variables (ie, int, array, json...)

```{% raw %}
{
  "application": "{{ var "application" ?: "yourspinnakerapplicationname" }}",
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
  "requisiteStageRefIds": {{ var "requisiteStageRefIds" ?: [] }},
  "type": "deploy"
}
{% endraw %}```

Note how the `requisiteStageRefIds` is overwritten while calling the module so that the deploy stage _depends on_ the wait stage. This pipeline would look like this in the spinnaker UI:

![](/images/Screen_Shot_2018-03-26_at_5_06_25_PM.png)

## Deleting Stale Pipelines

If you want any pipelines in the spinnaker application that are not part of the `dinghyfile` to be deleted automatically when the `dinghyfile` is updated, then you can set `deleteStalePipelines` to `true` in the JSON like so:

```{% raw %}
{
  "application": "yourspinnakerapplicationname",
  "deleteStalePipelines": true
  "pipelines": [
  ]
}
{% endraw %}```

## Triggering Other Pipelines With a Stage

The spinnaker `pipeline` stage allows you to trigger other pipelines. However, typically you need the UUID of the pipeline to be triggered. To make it easier to write dinghy templates, we have a `pipelineID` function which can be used in dinghyfiles to trigger pipelines. Consider the below example (`pipeline.stage.module`):

```{% raw %}
{
		"application": "pipelineidexample",
		"failPipeline": true,
		"name": "Pipeline",
		"pipeline": "{{ pipelineID "default-app" "default-pipeline" }}",
		"refId": "1",
		"requisiteStageRefIds": [],
		"type": "pipeline",
		"waitForCompletion": true
}
{% endraw %}```

In the above example, we are triggering a pipeline by the name `default-pipeline` under `default-app` spinnaker application. The app name and the pipeline name can be overwritten when calling this module. At any higher level, simply pass in `"triggerApp"` and `"triggerPipeline"` like so: `{% raw %}{{ module "pipeline.stage.module" "triggerApp" "pipelineidtest" "triggerPipeline" "testpipelinename" }}{% endraw %}`


## Advanced Features

### Monorepo
Dinghy supports multiple spinnaker applications under the same git repo. eg:
```{% raw %}
monorepo/
├── app1
│   ├── bin
│   ├── lib
│   ├── pkg
│   └── src
│       ├── app1.go
│       └── dinghyfile
└── app2
    ├── bin
    ├── lib
    ├── pkg
    └── src
        ├── app2.go
        └── dinghyfile
{% endraw %}```

Notice both `app1` and `app2` are under the same repo, each app has its own `dinghyfile` and its own spinnaker application that can be referenced in the `dinghyfile`.

### Template Validation
If, while rendering a `dinghyfile`, a malformed JSON file is encountered, the logs should indicate the line number and the column number of the error. The `arm cli` can be used to validate `dinghyfile`s and `module`s locally without having to put them in source control.

### Newlines
For ease of readablilty, you can split a single call to `module` across multiple lines. For example, the following two `dinghyfile`s are both valid & produce identical pipelines in spinnaker:
```{% raw %}
{
  "application": "yourspinnakerapplicationname",
  "pipelines": [
    {
      "application": "yourspinnakerapplicationname",
      "name": "Made By Armory Pipeline Templates",
      "stages": [
        {{ module "wait.stage.module" "name" "wait-for-cache-warm-up" "waitTime" 42 }}
      ]
    }
  ]
}
{% endraw %}```

```{% raw %}
{
  "application": "yourspinnakerapplicationname",
  "pipelines": [
    {
      "application": "yourspinnakerapplicationname",
      "name": "Made By Armory Pipeline Templates",
      "stages": [
        {{
           module "wait.stage.module"
           "name" "wait-for-cache-warm-up"
           "waitTime" 42
        }}
      ]
    }
  ]
}
{% endraw %}```

### Top-level Variables
When passing in variables to modules, you have the option of defining variables at the top-level `dinghyfile` like so:
```{% raw %}
{
  "application": "yourspinnakerapplicationname",
  "globals": {
      "waitTime": "42",
      "name": "default-name"
  },
  "pipelines": [
    {
      "application": "yourspinnakerapplicationname",
      "name": "Made By Armory Pipeline Templates",
      "stages": [
        {{ module "wait.stage.module" }}
      ]
    }
  ]
}
{% endraw %}```
In the above example, the variables `waitTime` and `name` (used inside `wait.stage.module`) are defined at the top level, and not explicitly defined when the call to `wait.stage.module` is made.

Note that top-level variables are overwritten by variables in the call to module if both are present. For instance, in the below example, the `waitTime` after the `dinghyfile` is rendered would be `43`:
```{% raw %}
{
  "application": "yourspinnakerapplicationname",
  "globals": {
      "waitTime": "42",
      "name": "default-name"
  },
  "pipelines": [
    {
      "application": "yourspinnakerapplicationname",
      "name": "Made By Armory Pipeline Templates",
      "stages": [
        {{ module "wait.stage.module" "waitTime": "43" }}
      ]
    }
  ]
}
{% endraw %}```

### Nested Variables
Another neat little trick with variables is support for nested variables. Consider the following variable usage in a module:
```{% raw %}
"name": "{{ var "name" ?: "some-name" }}"
{% endraw %}```
Here, if the variable `"name"` was passed in, or is a top-level variable in the `dinghyfile`, then use that value, or else _default to_ `some-name`.

With nested variables, instead of using a hardcoded default value, the default can come from another variable. eg:

```{% raw %}
"name": "{{ var "name" ?: "@different_var" }}"
{% endraw %}```
Here, if the variable `"name"` was not passed into the module call and is not a top-level variable in the `dinghyfile`, its value will come from a variable called `"different_var"` that is either a top-level variable or another variable passed in when the module is called. Note the `@` syntax for the nested variable. The `@` symbol is only used where the variable is used, not when it is passed in.
le

### Create a Dinghyfile from an Existing Pipeline
If you have already created a pipeline in the Spinnaker UI, you can create a dinghyfile with some simple steps.

1. You need to go to the spinnaker UI and click on the `Configure` option of the pipeline you want.
2. Click on the `Pipeline Actions` dropdown and select 'Edit as JSON'
3. Copy/Paste this data into a new file, you will need to wrap this JSON with the following

 ```
{
  "application": "yourspinnakerapplicationname",
  "pipelines": [
     The JSON obtained from the UI
   ]
}
```

Save this file as `dinghyfile` in the root of your project and push it to your repository.

You may want to follow the [deleting stale pipelines](http://localhost:4000/spinnaker/using_dinghy/#deleting-stale-pipelines).

# Alternate Template Formats

When using an alternate template format all of your modules must also be in that same format.

## YAML Template Format

YAML formatting works just like the JSON formatting does.  However, all of your templates will need to be YAML if you've configured dinghy to use YAML as its template fomat.

Example:
```{% raw %}
---
application: "My awesome application"
# You can do inline comments now
globals:
  waitTime: 42
  retries: 5
pipelines:
- application: "My awesome application"
  name: "My cool pipeline"
  appConfig: {}
  keepWaitingPipelines: false
  limitConcurrent: true
  stages:
  - name: Wait For It...
    refId: '1'
    requisiteStageRefIds: []
    type: wait
    waitTime: 4
  {{ module "some.stage.module" "something" }}
  triggers: []
{% endraw %}```

*Note: YAML has strict spacing requirements.  Your modules must indent properly for the template to be rendered correctly.*

## HCL Template Format

```{% raw %}
"application" = "Some App"
"globals" = {
    "waitTime" = 42
}
"pipelines" = [
  {
    "appConfig" = {}
      "application" = "Some App"
      "keepWaitingPipelines" = false
      "limitConcurrent" = true
      "name" = "Foo"
      "stages" = [
        {
          "name" = "Wait For It..!"
          "refId" = "1"
          "requisiteStageRefIds" = []
          "type" = "wait"
          "waitTime" = 5
        },
        {
            {{ module "some.stage.module" "something" }}
        }
      ]
      "triggers" = []
  }
]
{% endraw %}```

*Note: HCL format can have some quirks.  Though the spec allows you to specify arrays and objects in various ways, that may not always serialize to json correctly once dinghy submits the pipeline to the spinnaker api. The above form is recommended when specifying arrays of objects.*

## Conditionals

Dinghy supports all of the usual Go template conditionals. In addition to that, Dinghy also provides the git webhoook content in the template allowing you to use the raw push data in the template itself.  An example of conditional support:

The top level of the data passed in is always `.RawData`.  From there, you can use the JSON fields as they appear in the payload.  For example, GitHub's payload looks like this:

```json
{
  "pusher": {
     "name": "Octocat"
  }
}
```

In the template, the access path for that variable is: `.RawData.pusher.name`.


```{% raw %}
{
        "application": "my fancy application (author: {{ .RawData.pusher.name }})",
        "pipelines": [
            "stages": [
                {{ $mods := makeSlice "mod1" "mod2" }}
                {{ range $mods }}
                    {{ module . }}
                {{ end }}
            ]    
            {{ module "deep.pipeline.module"
                "artifact" "artifact11"
                "artifact2" "artifact22"
            }}
        ]
    }
{% endraw %}```

*Note: The structure of the webhook data passed to Dinghy's template engine depends on the Git service that sends the webhook. This example uses a GitHub webhook.*
