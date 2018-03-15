---
layout: post
order: 108
---

Armory Pipeline Templates provide a way of specifying pipeline definitions in source code repos (like GitHub & BitBucket). 

The Armory Spinnaker installation provides a service called "Dinghy" which will keep the pipeline in Spinnaker in sync with what is defined in the GitHub repo. Also, users will be able to make a pipeline by composing other pipelines, stages, or tasks and templating certain values.

## How it works in a nutshell

GitHub (or BitBucket) webhooks are sent off when either the Templates or the Module definitions are modified. The Dinghy service looks for and fetches all dependent modules and parses the template and updates the pipelines in Spinnaker. The pipelines get automatically updated whenever a module that is used by a pipeline is updated in VCS. This is done by maintaining a dependency graph.

## Configuration
The configuration for this service comes from a yaml file that might look like this:
```
templateOrg:       armory-io  # github or stash "org" where the app repos and templates reside
dinghyFilename:    dinghyfile # name of the file which describes pipelines
templateRepo:      dinghy-templates # name of the repo containing modules
autoLockPipelines: true # whether or not to lock pipelines in the UI before updating them
spinnakerAPIURL:   https://spinnaker.mycompany.com:8085
spinnakerUIURL:    https://spinnaker.mycompany.io
certPath:          /path/to/client.pem # spinnaker x509 cert
gitHubCredsPath:   /path/to/github-creds # credentials for github api (username:token)
stashCredsPath:    /path/to/github-creds # credentials for stash api (username:token)
stashEndpoint:     http://stash.mycompany.com/rest/api/1.0", # url where stash is running
```
The path to this file must be set in the environment variable `DINGHY_CONFIG`

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

You can compose stage/task templates to make a full definition. e.g., a Pipeline definition for a spinnaker application called `foo` that has a single wait stage might look like:
```
{
  "application": "foo",
  "pipelines": [
    {
      "application": "foo",
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
  "application": "foo",
  "pipelines": [
    {
      "application": "foo",
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
  "application": "foo",
  "pipelines": [
    {
      "application": "foo",
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

> Note: We do not support complex data-type variable substitution in the alpha release

Let us create a more realistic pipeline using templates. One that would look like this:

![](http://f.cl.ly/items/1z3z3Z2w3j2w35171U39/Screen%20Shot%202018-03-12%20at%2011.18.38%20AM.png)

You would use the following JSON to create such. Note that any of the stages could have come from an imported module, but we show the full JSON here for readability:

```
{
  "application": "demo",
  "pipelines": [
    {
      "application": "demo",
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
        {
          "clusters": [],
          "isNew": true,
          "name": "deploy to stage",
          "refId": "104",
          "requisiteStageRefIds": [
            "102",
            "103"
          ],
          "type": "deploy"
        }
      ],
      "triggers": []
    }
  ]
}
```
