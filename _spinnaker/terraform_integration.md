---
layout: post
title: Terraform Integration
order: 141
---

The following tutorial will walk you through how to setup the alpha version of our Terraform integration and execute Terraform code stored in a Github repo as part of a Spinnaker pipeline. We'll assume that you're using Terraform to create and manage infrastructure on AWS.


## How to submit feedback

If you decide to enable this feauture and have any feedback you'd like to submit, please let us know at [go.armory.io/ideas](go.armory.io/ideas)! We're constantly iterating on customer feedback to ensure that the features we build make your life easier!

## Prerequisites

1. A Armory Spinnaker installation running on Kubernetes and installed via Armory Halyard. ([instructions](/spinnaker/install)). If you haven't updated Armory Halyard in a while, you'll need to do so to get access to these new features.
2. A Github API token that has access to your Terraform project. See [this documentation](https://blog.github.com/2013-05-16-personal-api-tokens/) for details on how to generate this token.
3. Pre-release candidate of Armory Spinnaker. At the time of this writing, `2.1.1-rc2582` contains the first alpha release of our Terraform integration. You can view a list of all current release candidates using `hal version list --release rc`.

## Installation

### Enabling the Terraform integration

You can enable the Terraform integration via Armory Halyard. Before you do, be sure you have a Github access token. This will enable the Terraform integration to interact with entire Github repositories.
```
$ hal config version edit --version {release-candidate-number} --alpha
$ hal armory terraform edit --git-enabled --git-access-token --alpha
$ hal armory terraform enable --alpha
$ hal deploy apply
```

You should now see an additional service, Terraformer, deployed alongside the rest of Spinnaker by running `kubectl get pods -n {your-spinnaker-namespace}`.


### Configuring other services

Terraform's primary source of feedback are it's logs. While there is no native UI for Terraform in Armory Spinnaker (yet!) we'll need a different way to expose these logs to users in the UI. To do this, we'll configure Gate with a proxy configuration. This proxy will allow us to configure stages with a direct link to the output for Terraform `plan` or `apply`.

First, we'll add the configuration to `~/.hal/default/profiles/gate-local.yml`
```
proxies:
  - id: terraform
    uri: http://spin-terraformer:7088
    methods:
      - GET
```

Then, we can roll these changes out with 
```
$ hal deploy apply --service-names gate
```

We'll reference this proxy in future steps!

## Configuring a Terraform stage

Our Terraform integration exposes a new stage in Spinnaker called `terraform`. Since there's no UI for Terraform,  we'll need to edit the stage as JSON. The JSON representation for this stage is as follows:

```

{
  "action": "{terraform-command-to-execute}",
  "artifacts": [
    {
      "reference": "{github-repo-where-your-code-lives}",
      "type": "git/repo"
    }
  ],
  "dir": "{target-terraform-directory}",
  "type": "terraform"
}
```

So, for example, if you want to execute `terraform plan` against a Github repository stored at `https://github.com/myorg/my-terraform-repo` the stage would be configured as such.

```
{
  "action": "plan",
  "artifacts": [
    {
      "reference": "https://github.com/myorg/my-terraform-repo",
      "type": "git/repo"
    }
  ],
  "dir": "/",
  "type": "terraform"
}
```

When run, this stage will tell Terraformer to clone your repository and execute `terraform plan` against it. In order to run `terraform apply` simply change the `action` from `plan` to `apply`. *Note: we execute `terraform init` before all Terraform actions to initialize the project.*

## Viewing Terraform log output

Terraform's primary interface for user feedback is logging. When executed on your workstation, this log output is streamed to `stdout`. Out integration captures that output and makes it available via the API. While we work on fine-tuning the UI for this integration these logs can be viewed by inserting the following spinnet into the Comments section of the `terraform` stage or the Instructions section of a Manual Judgement stage.

*Note: replace the reference to `your-gate-url` with the actual URL for Gate and the `Plan` stage name to the name of your plan or apply stages.*

```
View the logs <a href="https://your-gate-url/proxies/terraform/api/v1/job/${#stage('Plan')['context']['status']['id']}/logs">here</a>
```

## Reference pipeline

A reference pipeline which uses this feature can be found [here](https://gist.github.com/ethanfrogers/5123a5336f7e6ae4fd5fcda76536199b). It should help you get started! To use it, simply create a pipeline in the UI and click "Edit as JSON" under the "Pipeline Actions" dropdown and past the pipeline JSON into the text box.


## Under the hood

At the core of the Terraform integration is the Terraformer service. This service is reponsible for fetching your Terraform projects from source and exeuting various Terraform commands against them. When a `terraform` stage starts, Orca will submit the task to Terraformer and monitor it until completion. Once a task is submitted, Terraformer will fetch your target project, run `terraform init` to initialize the project and then run your desired `action` (`plan` or `apply`). If the task is successful, the stage will marked successful as well. If the task fails, the stage will be marked as a failure and halt the pipeline. 

Terraformer ships with Terraform 0.11.10. In the future, we'll offer multiple versions of Terraform so that you can choose the version to execute against.

## Configuring Terraform for your cloud provider

Since Terraformer executes all Terraform commands against the `terraform` binary all methods of configuring authentication are supported for your desired cloud provider. We're still in the process of gathering feedback on how best to expose this via Armory Halyard but you can still configure the Terraformer environment with your credentials! This section will document how to accomplish this for various cloud providers.

### Configuration for AWS

There are many ways to enable Terraform to authenticate with AWS. You can find the full list [here](https://www.terraform.io/docs/providers/aws/#authentication). Each of these methods is supported, however, you may need to do some additional configuration to enable them for this integration.

#### Shared credentials file

Terraform supports the ability to reference AWS profiles defined via a [shared credentials file](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/create-shared-credentials-file.html). This file will contain a list of AWS profiles alongside their access and secret keys. In order for Terraformer to utilize this file, we'll need to inject it into the environment in which Terraformer runs. 

First, create a Kubernetes `ConfigMap` containing the contents of this config file and put it in a temporary file.

_Note - Feel free to swap the `ConfigMap` for a `Secret` if you prefer. The `ConfigMap` is used in this documentation for simplicity._

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: terraformer-credentials
  namespace: {your-spinnaker-namespace}
data:
  credentials: |
    [profile-name]
    aws_access_key_id = {your-aws-access-key}
    aws_secret_access_key = {your-aws-secret-access-key}
```

Then, apply this `ConfigMap` via `kubectl apply -f {temp-filename}`.

Next, we'll need to configure Terraformer to mount this `ConfigMap` at runtime. To do this, we'll add the following [Service Setting]() to `~/.hal/default/service-settings/terraformer.yml`.

```
kubernetes:
  volumes:
  - id: terraformer-credentials
    type: configMap
    mountPath: /home/spinnaker/.aws/
```

We can deploy these changes via `hal deploy apply`. Once successfully deployed, you'll be able to reference these profiles in your Terraform state and provider configuration. See the below snippet for an example.

```
terraform {
  backend "s3" {
    profile = "dev"
  }
}

provider "aws" {
  profile = "dev"
}
```