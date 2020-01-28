---
layout: post
title: Terraform Integration
order: 141
---

Note that the Terraform integration is in beta while we work on improving the user experience.

{:.no_toc}
## Overview

Use Armory Spinnaker's Terraform Integration to integrate your infrastructure-as-code with Terraform workflow into your Spinnaker instance. Manage your application infrastructure as part of a Spinnaker pipeline. The following tutorials walk you through how to setup Armory's Terraform integration and execute Terraform code stored in a Git repo as part of a Spinnaker pipeline. The examples on this page describe a workflow for using Terraform to create and manage infrastructure on AWS. 

{:.no_toc}
### Under the hood

At the core of the Terraform Integration is the Terraformer service. This service is reponsible for fetching your Terraform projects from source and executing various Terraform commands against them. When a `terraform` stage starts, Orca submits the task to Terraformer and monitors it until completion. Once a task is submitted, Terraformer fetches your target project, runs `terraform init` to initialize the project, and then runs your desired `action` (`plan` or `apply`). If the task is successful, the stage gets marked successful as well. If the task fails, the stage gets marked as a failure and halts the pipeline.

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## How to submit feedback
{:.no_toc}
If you decide to enable this feauture and have feedback you'd like to submit, please let us know at [go.armory.io/ideas](go.armory.io/ideas)! We're constantly iterating on customer feedback to ensure that the features we build make your life easier!

## Prerequisites

* Credentials (in the form of basic auth) to your Terraform Git repository.  This can take one of several forms:
    * If your Terraform repo is in GitHub, use a Personal Acccess Token (potentially associated with a service account) as the 'token'.  Generate this token in your GitHub settings.
    * If your Terraform repo is in BitBucket, use a username/password that has access to your BitBucket repo.
* To use Terraform Input Variable Files (`tfvar`), you must have a separate artifact provider (such as the GitHub, BitBucket, or HTTP artifact provider) that can pull your `tfvar` file(s). Additionally, the credentials for must be configured in both places: the Terraform Integration and the artifact provider.

## Overview

Armory Spinnaker's Terraform Integration interacts with a source repository you specify to deploy infrastructure.

At a high level, the Terraform Integration performs the following actions during a Terraform Integration stage:

1. Authenticates to your repo using basic authentication credentials you provide. This can be a GitHub token or a BitBucket username/password combination. 
2. Pulls a full directory from your Git repository.
3. (Optionally) uses a traditional Spinnaker artifact provider (Github, BitBucket, or HTTP) to pull in a `tfvars`-formatted variable file.    

## Enable Terraform Integration

The examples on this page describe the configuration for the Terraform Integration and an artifact provider to support either GitHub or BitBucket.
   
### Configure the Terraform Integration with GitHub

#### 1. Generating a Github Personal Access Token (PAT)

Before you start, you need a GitHub Personal Access Token (PAT). The Terraform
Integration authenticates itself using the PAT to interact with your GitHub repositories. You must create and configure a PAT so that the Terraform Integration can pull
a directory of Terraform Templates from GitHub. Additionally, the Spinnaker GitHub artifact provider require a PAT for `tfvar` files.

If you don't already have a PAT,  create one:

1. Log into GitHub. You can use your personal account or a service account.
2. Go to **Settings** > **Developer Settings**.
3. Go to **Personal access tokens**.
4. Generate a new token. 
    * Give your token a distinct name and select the **repo** scope.
5. Save the token somewhere secure.
6. If your GitHub organization uses Single Sign-On (SSO), enable
SSO for the token.  
    * On the **Personal access tokens** page, click **Enable SSO** for your token and authorize it for the organization that hosts the repos for your Terraform template(s) and Terraform `tfvar` files.

#### 2. Enabling and configuring for the GitHub Artifact Provider

Spinnaker uses the Github Artifact Provider to download any referenced `tfvar`
files.

If you already have a GitHub artifact account configured in Spinnaker,
skip this section.

**Note**: The following examples use `github-for-terraform` as a unique identifier for the artifact account. Replace it with your own identifier.

1. Enable GitHub as an artifact provider:
    ```
    hal config artifact github enable
    ```
2. Add the GitHub account:
    ```
    hal config artifact github account add github-for-terraform --token
    ```
3. Provide the PAT.

#### 3. Enabling and configuring the Terraform Integration

The Terraform Integration needs access to the GitHub token to download GitHub directories that hose your Terraform templates.

1. Enable the Terraform Integration
    ```
    # The --alpha option is only required for Halyard versions earlier than 1.6.5.
    hal armory terraform enable --alpha
    
    # This will prompt for the token
    hal armory terraform edit \
    --alpha \
    --git-enabled \
    --git-access-token
    ```

### Configuring the Terraform Integration with BitBucket

#### 1. Enabling and configuring the BitBucket Artifact Provider

Spinnaker uses the BitBucket Artifact Provider to download any referenced `tfvar`
files, so it must be configured with the BitBucket token to pull these files.

If you already have a BitBucket artifact account configured in Spinnaker, skip this step.

Replace `bitbucket-for-terraform` with any unique identifier to
identify the artifact account.

```bash
hal config artifact bitbucket enable

# This will prompt for the password
hal config artifact bitbucket account add bitbucket-for-terraform \
  --username <USERNAME> \
  --password
```

#### Enabling and configuring the Terraform integration with a BitBucket token

The Terraform Integration also needs access to the BitBucket token to download full
Github directories hosting your Terraform templates

```
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

Armory ships the following versions of the Terraform binary as part of the Terraform Integration:

* 0.11.10 through 0.11.14
* 0.12.0 through 0.12.10

**Note**: Terraform binaries are verified by checksum and with Hashicorp's GPG key before being installed into our release.

To use Terraform, you must indicate to the Terraformer microservice
the path to the binary within the microservice to use:

1. Create a file named `terraformer-local.yml` in the following directory: `.hal/default/profiles`.
2. Add the following YAML to the file:

    ```yml
    terraform:
      executablePath: /terraform/versions/<version>/terraform
    ```
Replace <version> with one of the Terraform versions that Armory Spinnaker ships with.

**Note**: If you specify a Terraform version in a stage configuration, the value in `terraformer-local.yml` is ignored.

### Configuring Gate proxy to access Terraform logs

Terraform's primary source of feedback are its logs. You can display Terraform logs to users in Deck. To do this, configure Gate with a proxy configuration. The proxy allows you to configure stages with a direct link to the output for Terraform `plan` or `apply`.
Before you start, ensure that the `~/.hal/default/profiles/` directory exists and contains `gate-local.yml`. If the directory and file do not exist, run the following commands:

```
sudo mkdir ~/.hal/default/profiles/
vi ~/.hal/default/profiles/gate-local.yml
```

To start, we'll add the configuration to `~/.hal/default/profiles/gate-local.yml`

Add the following configuration to `~/.hal/default/profiles/gate-local.yml`:

    ```yaml
    proxies:
      - id: terraform
        uri: http://spin-terraformer:7088
        methods:
          - GET
    ```
We use this proxy in future steps!

### Complete the installation

After you configure your Git repository and Gate proxy access, perform the following steps:

1. Apply the changes: 
   
    ```
    hal deploy apply
    ```

2. Confirm that the Terraform Integration service (Terraformer) is deployed with your Spinnaker deployment:
    
    ```
    kubectl get pods -n {your-spinnaker-namespace}
    ```

## Configuring a Terraform stage

The Terraform Integration exposes a new stage in Spinnaker called `terraform`. To use the stage, edit the stage as JSON. Here is what the JSON representation of the stage looks like:

```
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

The following example shows the JSON representation of a stage that executes `terraform plan` against a Github repository stored at `https://github.com/myorg/my-terraform-repo`:

```
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

In the mandatory `artifacts` field, you must have exactly one `git/repo` artifact.  You may, optionally, have additional artifacts; these are used as `-var-file` parameters.
In the optional `backendArtifact` field, you may specify a backend configuration.

This stage definition performs the following actions:

* Performs a `git clone` on the provided `git/repo`, and operate in the provided `dir` (in this case, `/`) in the given repository.
* Performs a `terraform init`.  If your stage has the optional `backendArtifact` field, Spinnaker downloads that artifact (using the corresponding Spinnaker artifact provider and artifactAccount) and use it using `-backend-config`.
* Downloads all other (non-`git/repo`) artifacts referenced in the `artifact` array using their corresponding artifact providers and accounts.
* Performs the specified action (in this case, `plan`) in the provided directory.  If downloaded other artifacts, they are appended to the command with `-var-file`.

Put simply, the example JSON performs these two commands:

* `terraform init -backend-config=backend.tf`
* `terraform plan -var-file varfile.tfvars`

For the `backendArtifact` and other artifacts, you can replace `github/file` with some other artifact type. For example, if you're using the BitBucket artifact provider, specify `bitbucket/file` and the corresponding artifact account.

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

#### Specifying the Terraform version in a stage

This is optional and requires Armory Spinnaker 2.4.2 or later.. The Terraform Integration supports selecting a version of Terraform during a stage. You can configure the version of Terraform to run with the following example:


```
{
  "action": "plan",
...
  "terraformVersion": "0.12.1",
  "type": "terraform"
}
```
**Note**: The `terraformVersion` field is optional. If you specify this field, then all terraform stages that modify state (apply, output, destroy) require the same version.


#### Selecting and creating Terraform workspaces in a stage

This is optional and requires Armory Spinnaker 2.4.2 or later. 

The Terraform Integration supports the selection and creation of Terraform workspaces during a stage. You can configure the workspace that Terraform should use with the following example:


```
{
  "action": "plan",
...
  "terraformVersion": "0.12.1",
  "workspace": "armory-dev",
  "type": "terraform"
}
```

Keep the following in mind when using this feature:

* If the workspace specified does not exist, the Terraform Integration creates it.
* The `workspace` field is optional. If you specify this field, then all terraform stages that reference state (plan, apply, output, destroy) require the same workspace.

For more information on `terraform workspace`, see the [Terraform documentation](https://www.terraform.io/docs/state/workspaces.html).

#### State Locking

The Terraform Integration supports the ability to ignore backend state locking in Armory Spinnaker 2.4.2 and later.  **This is potentially dangerous.  Only use this feature if understand the consequences.**

Locking flags are only used on the apply and destroy operations.

```
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

The Terraform Integration supports `terraform plan -out=file` in Armory Spinnaker 2.5.2 and above. The output of the plan command is saved to a base64-encoded Spinnaker artifact and is injected into context.  You can then use this artifact with a webhook to send the plan data to an external system or to use it in an `apply` stage for the Terraform Integration.

The following JSON describes how this feature is configured and used (comments are in-line):

**Plan Stage**

For a `plan` stage, the `expectedArtifacts` key is required.

```
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

**Apply Stage**

```
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

### Custom Plugins

This feature requires Armory Spinnaker 2.5.2 or later.

The Terraform Integration supports the use of custom Terraform providers and plugins. The Terraform Integration downloads the plugins and injects them into each stage dynamically as needed to ensure the Terraform code can run.

Any plugin you want to use must meet the following requirements: 
* Be a zip, tar, gzip, tar-gzip or executable
* If compressed, be at the root of the archive
* Be x86-64 (amd64) Linux binaries
* Have a SHA256 Sum
* Follow the Terraform plugin naming [conventions](https://www.terraform.io/docs/extend/how-terraform-works.html#discovery)

**Note**: If any Terraform Integration stage in a pipeline defines a custom plugin, all terraformer stages must then define that same plugin in that pipeline.

**Configuring Terraform plugins**:

```
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

The Terraform Integration caches all the defined plugins by default and does not redownload them.  To configure the Terraform Integration to redownload a plugin, add the following JSON under the metadata key in the artifact object:

```
"metadata": {
    "sha256sum": "longString",
    "forceDownload": true,
}
```


#### Actions

The Terraform Integration supports the following actions:

* plan
* apply
* destroy
* output

Additionally, you can perform a `plan destroy` by adding this field:

```
{
  "action": "plan",
  "planForDestroy": true,
...
  "type": "terraform"
}
```

By default, the Terraform Integration pulls the `master` branch.  If you want to specify a different branch, add a `version` field to the `git/repo` spec.  For example:

```
{
  "reference": "https://github.com/myorg/my-terraform-repo",
  "type": "git/repo",
  "version": "refs/heads/my-new-branch"
}
```

## Viewing Terraform log output

Terraform's primary interface for user feedback is logging. When executed on your workstation, the log output is streamed to `stdout`. The Terraform Integration captures that output and makes it available via the API. These logs can be viewed by inserting the following spinnet into the Comments section of the `terraform` stage or the Instructions section of a Manual Judgement stage.

To use the following example, make sure you do the following:
* Change the reference to `your-gate-url` with the actual URL for Gate
* Change the `Plan` stage name to the name of your plan or apply stages
* Change`plan_stdout`and `plan_stderr` for the corresponding action names

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

## Consuming Terraform output via SpEL

This feature requires Armory Spinnaker 2.4.1 or later.

If you have a Terraform template configured with [Output Values](https://www.terraform.io/docs/configuration/outputs.html), then you can use the `Output` stage to parse the output and add it to your pipeline execution context.

For example, if you have a Terraform template that has this:

```
output "bucket_arn" {
    value = "${aws_s3_bucket.my_bucket.arn}"
}
```

Then you can set up an `Output` stage that exposes this in the pipeline execution context.  If you have an `Output` stage with the stage name `My Output Stage`, then after running the `Output` stage, access the bucket ARN with this:

```
${#stage('My Output Stage')["context"]["status"]["outputs"]["bucket_arn"]["value"]}
```

## Reference pipeline

You can find a reference pipeline to build from [here](https://gist.github.com/ethanfrogers/5123a5336f7e6ae4fd5fcda76536199b) or [here](https://gist.github.com/justinrlee/3abe62e38f957ecd0ba3c417a6125555). It should help you get started! To use one of the references, create a pipeline in Deck and click **Pipeline Actions** > **Edit as JSON** and paste the pipeline JSON into the text box.

## Configuring Terraform for your cloud provider

Since the Terraform Integration executes all Terraform commands against the `terraform` binary, all methods of configuring authentication are supported for your desired cloud provider. This section describes how to accomplish this for various cloud providers.

### Configuration for AWS

There are many ways to enable Terraform to authenticate with AWS. You can find the full list [here](https://www.terraform.io/docs/providers/aws/#authentication). Each of these methods is supported; however, you may need to do additional configuration to enable them .

#### Shared credentials file

Terraform supports the ability to reference AWS profiles defined via a [shared credentials file](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/create-shared-credentials-file.html). This file contains a list of AWS profiles alongside their access and secret keys. In order for Terraformer to utilize this file, we inject it into the environment in which Terraformer runs.

1. Create a Kubernetes `ConfigMap` containing the contents of this config file and put it in a temporary file:

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
    **Note**: You can swap the `ConfigMap` for a `Secret` if you prefer. The `ConfigMap` is used in this documentation for simplicity.

2. Apply the `ConfigMap`: 
   
    ```
    kubectl apply -f {temp-filename}`
    ```

3. Configure the Terraform Integration to mount this `ConfigMap` at runtime by adding the following [Service Setting]() to `~/.hal/default/service-settings/terraformer.yml`:

    ```
    kubernetes:
      volumes:
      - id: terraformer-credentials
        type: configMap
        mountPath: /home/spinnaker/.aws/
    ```

4. Deploy these changes to your Spinnaker instance: 
   
    ```
    hal deploy apply
    ```

Once deployed, you can reference these profiles in your Terraform state and provider configuration. See the following snippet for an example:

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