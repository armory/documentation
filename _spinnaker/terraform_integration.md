---
layout: post
title: Terraform Integration
order: 141
---

The following tutorial will walk you through how to setup our Terraform integration and execute Terraform code stored in a Github repo as part of a Spinnaker pipeline. We'll assume that you're using Terraform to create and manage infrastructure on AWS.

Note that the Terraform integration is in beta while we work on improving the user experience.

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## How to submit feedback
{:.no_toc}
If you decide to enable this feauture and have any feedback you'd like to submit, please let us know at [go.armory.io/ideas](go.armory.io/ideas)! We're constantly iterating on customer feedback to ensure that the features we build make your life easier!

## Prerequisites

1. An Armory Spinnaker installation (version 2.3.x or above) running on Kubernetes and installed via Armory Halyard. ([instructions](/spinnaker/install)). If you haven't updated Armory Halyard in a while, you'll need to do so to get access to these new features.
1. Credentials (in the form of basic auth) to your Terraform git repository.  This can take one of several forms:
    1. If your Terraform repo is in Github, you can use a Personal Acccess Token (potentially associated with a service account) as the 'token'.  See [this documentation](https://blog.github.com/2013-05-16-personal-api-tokens/) for details on how to generate this token in Github.
    1. If your Terraform repo is in BitBucket, you can use a username/password that has access to your BitBucket repo
1. If you want to use Terraform Input Variable File `tfvar` capability, a separate enabled artifact provider (such as the Github, BitBucket, or HTTP artifact provider) that is able to pull your `tfvar` file(s).

## Overview

The Terraformer integration interacts with your source repository as follows:

1. It will use the generic `git/repo` using basic auth creds provided directly to Terraformer (this can be a Github token or a BitBucket username/password combination) to pull a full directory from your Git repository
1. Optionally, it will use a traditional Spinnaker artifact provider (Github, BitBucket, HTTP) to pull in a `tfvars`-formatted variable file.  This document covers Github and BitBucket.
1. These credentials must be configured in both places (directly with Terraformer, and also with the artifact provider)

## Installation

This document covers the configuration of Terraformer and an artifact provider to support either Github or BitBucket

### Configuring Terraformer to integrate with Github

#### Generating a Github Personal Access Token

You can enable the Terraform integration via Armory Halyard. Before you do, be
sure you have a Github personal access token. This will enable the Terraform
integration to interact with entire Github repositories.  This Github access
token must be configured in two places: once for Terraformer to be able to pull
a directory of Terraform Templates from Github, and once to be able to pull the
`tfvar` file (which uses Spinnaker's Github artifact provider).

If you don't already have a Github personal access token, you can create one:

1. Log into Github (potentially using a Service Account)
1. Click on your user icon in the top right, then on "Settings"
1. Click on "Developer Settings"
1. Click on to "Personal access tokens"
1. Click on "Generate new token"
1. Give your token a distinct name, and select the `repo` scope
1. Click "Generate token"
1. Save the token

Additionally, if SSO is enabled for your Github organization, you *must* enable
SSO on the token.  On the "Personal access tokens" page, click "Enable SSO" for
your token and "Authorize" it for the organization which hosts the repo where
your Terraform template(s) and Terraform `tfvar` files will live.

#### Enabling and configuring the Github Artifact Provider

Spinnaker can use the Github Artifact Provider to download any referenced `tfvar`
files, so it must be configured with the Github token to pull these files.

If you already have a Github artifact account configured in Spinnaker, you can
skip this step.

Feel free to replace `github-for-terraform` with any unique identifier to identify
the artifact account.

Note that if you have a github token, you don't need to provide a user name for it.

```bash
hal config artifact github enable

# This will prompt for the token
hal config artifact github account add github-for-terraform --token
```

#### Enabling and configuring the Terraform integration with a Github token



The Terraformer module also needs access to the Github token to download full
Github directories hosting your Terraform templates. A user name is not needed when a Github token is available.

```bash
# The --alpha option is only required for Halyard versions earlier than 1.6.5.
hal armory terraform enable --alpha

# This will prompt for the token
hal armory terraform edit \
  --alpha \
  --git-enabled \
  --git-access-token
```

### Configuring Terraformer to integrate with BitBucket

#### Enabling and configuring the BitBucket Artifact Provider

Spinnaker uses the BitBucket Artifact Provider to download any referenced `tfvar`
files, so it must be configured with the Github token to pull these files.

If you already have a BitBucket artifact account configured in Spinnaker, you
can skip this step.

Feel free to replace `bitbucket-for-terraform` with any unique identifier to
identify the artifact account.

```bash
hal config artifact bitbucket enable

# This will prompt for the password
hal config artifact bitbucket account add bitbucket-for-terraform \
  --username <USERNAME> \
  --password
```

#### Enabling and configuring the Terraform integration with a BitBucket token

The Terraformer module also needs access to the Github token to download full
Github directories hosting your Terraform templates

```bash
# The --alpha option is only required for Halyard versions earlier than 1.6.5.
hal armory terraform enable --alpha

# This will prompt for the token, which is your BitBucket password
hal armory terraform edit \
  --alpha
  --git-enabled \
  --git-username <USERNAME> \
  --git-access-token
```

### Selecting the Terraform version

Terraformer currently ships with the following versions of the Terraform binary:

* 0.11.10 through 0.11.14
* 0.12.0 through 0.12.10

*Note: Terraform binaries are verified by checksum and with hashicorp's GPG key before being installed into our release.*

In order to use Terraform, you must indicate to the Terraformer microservice
the path to the binary within the microservice to use.  This should be done by
creating the file `.hal/default/profiles/terraformer-local.yml` (replace
`0.11.11` with the version that you want):

```yml
terraform:
  executablePath: /terraform/versions/0.11.11/terraform
```

*Note: If you specify a terraform version in your stage configuration this value is ignored.*

### Configuring Gate proxy to access Terraform logs

Terraform's primary source of feedback are it's logs. While there is no native UI for Terraform in Armory Spinnaker (yet!) we'll need a different way to expose these logs to users in the UI. To do this, we'll configure Gate with a proxy configuration. This proxy will allow us to configure stages with a direct link to the output for Terraform `plan` or `apply`.

Before you start, ensure that the `~/.hal/default/profiles/` directory exists and contains `gate-local.yml`. If the directory and file do not exist, run the following commands:

```bash
sudo mkdir ~/.hal/default/profiles/
vi ~/.hal/default/profiles/gate-local.yml
```

To start, we'll add the configuration to `~/.hal/default/profiles/gate-local.yml`

```yaml
proxies:
  - id: terraform
    uri: http://spin-terraformer:7088
    methods:
      - GET
```

### Apply Changes

Then, we can roll these changes out with:

```bash
hal deploy apply
```

You should now see an additional service, Terraformer, deployed alongside the rest of Spinnaker by running `kubectl get pods -n {your-spinnaker-namespace}`.

We'll reference this proxy in future steps!

## Configuring a Terraform stage

Our Terraform integration exposes a new stage in Spinnaker called `terraform`. Since there's no UI for Terraform,  we'll need to edit the stage as JSON. The JSON representation for this stage is as follows:

```json

{
  "action": "{terraform-command-to-execute}",
  "artifacts": [
    {
      "reference": "{github-repo-where-your-code-lives}",
      "type": "git/repo"
    }
  ],
  "backendArtifact": {
    "artifactAccount": "{github-artifact-account-name}",
    "reference": "{github-api-endpoint-for-tfvar-file}",
    "type": "github/file"
  },
  "overrides": {
  },
  "dir": "{target-terraform-directory}",
  "type": "terraform"
}
```

So, for example, if you want to execute `terraform plan` against a Github repository stored at `https://github.com/myorg/my-terraform-repo` the stage would be configured as such.

```json
{
  "action": "plan",
  "artifacts": [
    {
      "reference": "https://github.com/myorg/my-terraform-repo",
      "type": "git/repo"
    },
    {
    "artifactAccount": "github-for-terraform",
    "reference": "https://api.github.com/repos/myorg/my-terraform-repo/contents/terraform/environments/varfile.tfvars",
    "type": "github/file"
    }
  ],
  "backendArtifact": {
    "artifactAccount": "github-for-terraform",
    "reference": "https://api.github.com/repos/myorg/my-terraform-repo/contents/backend.tf",
    "type": "github/file"
  },
  "overrides": {
    "environment_name": "${parameters.environment_name}"
  },
  "dir": "/",
  "type": "terraform"
}
```

In the mandatory `artifacts` field, you must have exactly one `git/repo` artifact.  You may optionally have additional artifacts; these will be used as `-var-file` parameters.
In the optional `backendArtifact` field, you may specify a backend configuration.

This stage definition will do the following:

* Perform a `git clone` on the provided `git/repo`, and operate in the provided `dir` (in this case, `/`) in the given repository
* Perform a `terraform init`.  If your stage has the optional `backendArtifact` field, Spinnaker will download that artifact (using the corresponding Spinnaker artifact provider and artifactAccount) and use it using `-backend-config`
* Download all other (non-`git/repo`) artifacts referenced in the `artifact` array using their corresponding artifact providers and accounts.
* Perform the provided action (in this case, `plan`) in the provided directory.  If you have downloaded other artifacts, they will be appended to the command with `-var-file`

So the above example will essentially perform these two commands:

* `terraform init -backend-config=backend.tf`
* `terraform plan -var-file varfile.tfvars`

(For the `backendArtifact` and other artifacts, you can replace `github/file` with some other artifact type; for example, if you're using the BitBucket artifact provider, specify `bitbucket/file` and the corresponding artifact account).

#### Github file artifacts url

For artifacts of type `github/file` you must supply the _API_ url of the file, which is different from the url you get when you click `Raw` from Github page. Here's the syntax:

Regular Github:

```
https://api.github.com/repos/{org}/{repo}/contents/{file path}
```

Github Enterprise:

```
https://{host}/api/v3/repos/{org}/{repo}/contents/{file path}
```

#### Terraform Versions

Our terraform integration also supports selecting a version of terraform during a stage.  You can configure the version of terraform to run with the following example:

*This feature requires Armory Spinnaker 2.4.2 or above*

```json
{
  "action": "plan",
...
  "terraformVersion": "0.12.1",
  "type": "terraform"
}
```
*Note: The `terraformVersion` field is optional. If you specify this field then all terraform stages that modify state (apply, output, destroy) will require the same version.*


#### Terraform Workspaces

Terraformer also supports selection and creation of terraform workspaces during a stage.  You can configure the workspace that terraform should use with the following example:

*Note: if the workspace specified does not exist, terraformer will create it.*

*This feature requires Armory Spinnaker 2.4.2 or above*

```json
{
  "action": "plan",
...
  "terraformVersion": "0.12.1",
  "workspace": "armory-dev",
  "type": "terraform"
}
```

*Note: The `workspace` field is optional. If you specify this field then all terraform stages that reference state (plan, apply, output, destroy) will require the same workspace.*

For more information on `terraform workspace` please read the [documentation](https://www.terraform.io/docs/state/workspaces.html)

#### State Locking

Terraformer supports the ability to ignore backend state locking.  *Note: This is potentially dangerous.  Only use this feature if you're sure you know the consequences.*

Locking flags are only used on the apply and destroy operations.

*This feature requires Armory Spinnaker 2.4.2 or above*

```json
{
  "action": "plan",
...
  "terraformVersion": "0.12.1",
  "lock": false,
  "workspace": "armory-dev",
  "type": "terraform"
}
```

#### Plan Artifact

Terraformer has support for `terraform plan -out=file`. The output of the plan command is saved to a base64-encoded spinnaker artifact and is injected into context.  You can then use this artifact and combine it with a webhook to send the plan data to an external system or to use it in Terraformer's apply stage.

The following json describes how this feature is configured and used (comments are in-line):

For the plan stage, the expectedArtifacts key is required.

*Plan Stage:*
```json
{
  "action": "plan",
...
  "expectedArtifacts": [
    {
      "defaultArtifact": {},
      "id": "2d3519d9-040a-41ff-b258-a8a2fee7bf5f", // any string
      "matchArtifact": {
        "name": "planfile", // required
        "type": "embedded/base64" // required
      },
      "useDefaultArtifact": false
    }
  ],
  "overrides": {
    "environment_name": "${parameters.environment_name}"
  },
  "terraformVersion": "0.12.1",
  "type": "terraform",
  "workspace": "foo"
}
```

The apply stage requires this (or similar) SpEL expression(s) to pass the data in.

*Apply Stage:*
```json
{
  "action": "apply",
  "artifacts": [
    {
      "reference": "https://github.com/someorg/somerepo",
      "type": "git/repo",
      "version": "refs/heads/branch-testing"
    },
    {
      "name": "planfile", // required
      "reference": "${#stage('Plan')['context']['artifacts'][0]['reference']}", // the actual base64 encoded data from the previous stage
      "type": "embedded/base64" // required
    }
  ],
  "backendArtifact": {
    "artifactAccount": "github-for-terraform",
    "reference": "https://api.github.com/repos/someorg/somerepo/contents/backend.tf",
    "type": "github/file"
  },
  "dir": "workspace",
  "overrides": {
    "environment_name": "${parameters.environment_name}"
  },
  "terraformVersion": "0.12.1",
  "type": "terraform",
  "workspace": "foo"
}
```

*This feature requires Armory Spinnaker 2.5.2 and above*

### Custom Plugins

*This feature requires Armory Spinnaker 2.5.2 and above*

Terraformer supports the use of custom terraform providers and plugins. Terraformer will download these plugins and inject them into each stage dynamically as needed to ensure the terraform code can be run.

Plugin Requirements:
* zip, tar, gzip, tar-gzip or executable
* If compressed, the plugin must be at the root of the archive
* Must be x86-64 (amd64) Linux binaries
* Must have a SHA256 Sum

In addition, the plugin name must follow terraform's [conventions](https://www.terraform.io/docs/extend/how-terraform-works.html#discovery).

Configuring Plugins:

```json
{
  "action": "plan",
  "artifacts": [
    {
      "reference": "https://github.com/someorg/terraformer",
      "type": "git/repo",
      "version": "refs/heads/branch-testing"
    },
    {
      "metadata": {
        "sha256sum": "fda6273f803c540ba8771534247db54817603b46784628e63eff1ce7890994e4"
      },
      "name": "terraform-provider-foo",
      "reference": "https://github.com/armory/terraform-provider-foo/releases/download/v0.1.19/terraform-provider-foo_0.1.19_linux_amd64.zip",
      "type": "terraform/custom",
      "version": "v0.1.19"
    }
  ],
 ...
}
```

Terraformer will cache all plugins defined by default and won't redownload them.  To force Terraformer to re-download a plugin, under the metadata key in the artifact object, place the following:

```json
"metadata": {
    "sha256sum": "longString",
    "forceDownload": true,
}
```

*Note: if any terraformer stage in a pipeline defines a custom plugin, all terraformer stages must then define that same plugin in that pipeline.*

#### Actions

We currently support the following actions:

* plan
* apply
* destroy
* output

Additionally, you can do a `plan destroy` with this additional field:

```json
{
  "action": "plan",
  "planForDestroy": true,
...
  "type": "terraform"
}
```

By default, Terraformer will pull the `master` branch.  If you want to specify a different branch, you can add a `version` field to the `git/repo` spec.  For example:

```json
{
  "reference": "https://github.com/myorg/my-terraform-repo",
  "type": "git/repo",
  "version": "refs/heads/my-new-branch"
}
```

## Viewing Terraform log output

Terraform's primary interface for user feedback is logging. When executed on your workstation, this log output is streamed to `stdout`. Out integration captures that output and makes it available via the API. While we work on fine-tuning the UI for this integration these logs can be viewed by inserting the following spinnet into the Comments section of the `terraform` stage or the Instructions section of a Manual Judgement stage.

*Note: replace the reference to `your-gate-url` with the actual URL for Gate, the `Plan` stage name to the name of your plan or apply stages, and `plan_stdout`and `plan_stderr` for the corresponding action name*

```
Init Out:
<pre>${#stage('Plan')['outputs']['status']['logs']['init_stdout']}</pre>
Init Err:
<pre>${#stage('Plan')['outputs']['status']['logs']['init_stderr']}</pre>
Plan Out:
<pre>${#stage('Plan')['outputs']['status']['logs']['plan_stdout']}</pre>
Plan Err:
<pre>${#stage('Plan')['outputs']['status']['logs']['plan_stderr']}</pre>
<a target="_blank" href="http://your-gate-url/proxies/terraform/api/v1/job/${#stage('Plan')['outputs']['status']['id']}">Full job output</a>
```

## Consuming Terraform Output via SpEL

If you have a Terraform template configured with [Output Values](https://www.terraform.io/docs/configuration/outputs.html), then you can use the `Output` stage to parse the output and add it to your pipeline execution context.

For example, if you have a Terraform template that has this:

```hcl
output "bucket_arn" {
    value = "${aws_s3_bucket.my_bucket.arn}"
}
```

Then you can set up an `Output` stage that exposes this in the pipeline execution context.  For example, if you had an `Output` stage with the stage name "My Output Stage", then after running the `Output` stage, you could access the bucket ARN with this:

```java
${#stage('My Output Stage')["context"]["status"]["outputs"]["bucket_arn"]["value"]}
```

*This feature requires Armory Spinnaker 2.4.1 or above*

## Reference pipeline

A reference pipeline which uses this feature can be found [here](https://gist.github.com/ethanfrogers/5123a5336f7e6ae4fd5fcda76536199b) or [here](https://gist.github.com/justinrlee/3abe62e38f957ecd0ba3c417a6125555). It should help you get started! To use it, simply create a pipeline in the UI and click "Edit as JSON" under the "Pipeline Actions" dropdown and past the pipeline JSON into the text box.

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

```yaml
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

```yaml
kubernetes:
  volumes:
  - id: terraformer-credentials
    type: configMap
    mountPath: /home/spinnaker/.aws/
```

We can deploy these changes via `hal deploy apply`. Once successfully deployed, you'll be able to reference these profiles in your Terraform state and provider configuration. See the below snippet for an example.

```yaml
terraform {
  backend "s3" {
    profile = "dev"
  }
}

provider "aws" {
  profile = "dev"
}
```
## SSH Keys in the Terraform Integration

### Background

If your Terraform scripts rely on modules stored in a private remote repository, you need to add your `SSH` key to the Terraform Integration container in order for the repo to be cloned.  This workflow requires modifications to the Terrform Integration `deployment` running in Kubernetes. 

The workflow below assumes you are using `SSH` in order to clone a remote repository.  A similar workflow exists for relying on `HTTP/HTTPS`.
<br>

__Note:__ We are in the design stage of work that reduces the overhead involved in retrieving remote modules. If you have a use case or need that relates to this topic, send us a message in Slack or visit [go.armory.io/ideas](go.armory.io/ideas). 

### Prerequisites

  * The SSH Key should already be created and added as a Deploy Key to the Git repository.

### Create the Secret

On your local workstation, create a directory and place the SSH Key and any other required authentication information inside:

1. Create the directory:

      ```bash
      mkdir ssh
      ```

2. Copy the SSH Key:

      ```bash
      cp $SSH_KEY_FILE ssh/id_rsa
      ```
4. Create a config file for `SSH` to ignore the known_hosts checks:

      ```bash
      echo "StrictHostKeyChecking no" > ssh/config
      ```

5. Create the secret using `kubectl`:

    ```bash
    kubectl create secret generic spin-terraformer-sshkey -n spinnaker-system --from-file=id_rsa=ssh/id_rsa --from-file=config=ssh/config
    ```

In this example, we create a secret with the SSH key and a config to ignore `known hosts` file issues. 

### Update the Manifest

Next, update the Kubernetes manifest:  

1. Update the secret and an empty directory volume
that will contain the copy of the secret with the correct UID and permissions:

    ```yaml
    # spin-terraformer deployment
    volumes:
    - name: spin-terraformer-sshkey
      secret:
        defaultMode: 420
        secretName: spin-terraformer-sshkey
    - name: ssh-key-tmp
      emptyDir:
        sizeLimit: "128k"
    ```

2. Define an init container that copies the secret contents to the empty directory and sets the permissions and ownership.  The Spinnaker user uses `user id` `1000`:

    ```yaml
    # spin-terraformer deployment
    
    # This correctly sets the permissions and ownership of the ssh key
    initContainers:
    - name: set-key-ownership
      image: alpine:3.6
      command: ["sh", "-c", "cp /key-secret/* /key-spin/ && chown -R 1000:1000 /key-spin/* && chmod 600 /key-spin/*"]
      volumeMounts:
      - mountPath: /key-spin
        name: ssh-key-tmp
      - mountPath: /key-secret
        name: spin-terraformer-sshkey
    ```

3. Mount the directory into the Terraform Integration container at the `/home/spinnaker/.ssh` location:

    ```yaml
    # spin-terraformer deployment
    volumeMounts:
    - mountPath: /home/spinnaker/.ssh
      name: ssh-key-tmp
    ```

The Terraform Integration now has access to clone private remote Git repositories via SSH after you make these changes and the Terraform Integration redeploys. 
