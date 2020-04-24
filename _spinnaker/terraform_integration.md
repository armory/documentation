---
layout: post
title: Terraform Integration
order: 141
---

{:.no_toc}
## Overview

Use Armory Spinnaker's Terraform Integration to integrate your infrastructure-as-code Terraform workflow into your SDLC. Armory's Terraform Integration interacts with a source repository you specify to deploy your infrastructure as part of your Spinnaker pipeline.

At a high level, a Terraform Integration stage performs the following actions when it runs:

1. Authenticates to your repo using basic authentication credentials you provide. This can be a GitHub token or a BitBucket username/password combination. 
2. Pulls a full directory from your Git repository.
3. Optionally uses a Spinnaker artifact provider (Github, BitBucket, or HTTP) to pull in a `tfvars`-formatted variable file.
4. Runs the Terraform action you select.   

The following tutorials walk you through how to setup Armory's Terraform Integration and execute Terraform code stored in a Git repo as part of a Spinnaker pipeline. More specifically, this page describes a workflow for the Terraform Integration to create and manage infrastructure on AWS. 

{:.no_toc}
### Under the hood

At the core of the Terraform Integration is the Terraformer service. This service fetches your Terraform projects from source and executes various Terraform commands against them. When a `terraform` stage starts, Orca submits the task to Terraformer and monitors it until completion. Once a task is submitted, Terraformer fetches your target project, runs `terraform init` to initialize the project, and then runs your desired `action` (`plan` or `apply`). If the task is successful, the stage gets marked successful as well. If the task fails, the stage gets marked as a failure, and the pipeline stops.

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## How to submit feedback
{:.no_toc}
If you decide to enable this feature and have feedback you'd like to submit, please let us know at [go.armory.io/ideas](go.armory.io/ideas) or [feedback.armory.io](https://feedback.armory.io)! We're constantly iterating on customer feedback to ensure that the features we build make your life easier!

## Requirements

* Credentials (in the form of basic auth) for your Terraform Git repository.  This can take one of two forms:
    * If your Terraform repo is in GitHub, use a Personal Acccess Token (potentially associated with a service account) as the 'token'.  Generate this token in your GitHub settings.
    * If your Terraform repo is in BitBucket, use a username/password that has access to your BitBucket repo.
* To use Terraform Input Variable Files (`tfvar`), you must have a separate artifact provider (such as the GitHub, BitBucket, or HTTP artifact provider) that can pull your `tfvar` file(s). Additionally, the credentials must be configured in both places: the Terraform Integration and the artifact provider.

## Enable Terraform Integration

The examples on this page describe how to configure the Terraform Integration and an artifact provider to support either GitHub or BitBucket. Note that the Terraform Integration also requires a `git/repo` artifact account.

### Configure the Git Repo artifact

If you do not already have a `git/repo` artifact account configured, you must do so to use the Terraform Integration stage.

* **Operator**

  Edit the `SpinnakerService` manifest to add the following:

  ```yaml
  apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
  kind: SpinnakerService
  metadata:
    name: spinnaker
  spec:
    spinnakerConfig:
      profiles:
        clouddriver: |
          artifacts:
            gitRepo:
              enabled: true
              accounts:
              - name: gitrepo
                token: 12344 # GitHub personal access token
  ```

* **Halyard**

  Edit the `~/.hal/default/profiles/clouddriver-local.yml` file and add the following:

  ```yaml
  artifacts:
    gitRepo:
      enabled: true
      accounts:
      - name: gitrepo
        token: 12344 #GitHub personal access token
  ```
  
For more information, see [Git Repo](https://www.spinnaker.io/reference/artifacts/types/git-repo/).

### Configure the Terraform Integration with GitHub

These steps describe how to configure GitHub as an artifact provider for the Terraform Integration. For information about BitBucket, see [Configuring the Terraform Integration with BitBucket](#configuring-the-terraform-integration-with-bitbucket)

#### 1. Generating a Github Personal Access Token (PAT)

Before you start, you need a GitHub Personal Access Token (PAT). The Terraform
Integration authenticates itself using the PAT to interact with your GitHub repositories. You must create and configure a PAT so that the Terraform Integration can pull
a directory of Terraform Templates from GitHub. Additionally, the Spinnaker GitHub artifact provider require a PAT for `tfvar` files.

For more information about how to generate a GitHub PAT, see [Creating a Personal Access Token for the Command Line](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).

Make sure the PAT you create meets the following requirements:

* The token uses a distinct name and has the **repo** scope.
* If your GitHub organization uses Single Sign-On (SSO), enable
the SSO option for the organizations that host the Terraform template(s) and Terraform `tfvar` files.  

#### 2. Enabling and configuring for the GitHub Artifact Provider

Spinnaker uses the Github Artifact Provider to download any referenced `tfvar`
files.

If you already have a GitHub artifact account configured in Spinnaker,
skip this section.

**Note**: The following examples use `github-for-terraform` as a unique identifier for the artifact account. Replace it with your own identifier.

**Operator**

  Edit the `SpinnakerService` manifest to add the following:
  
```yaml
apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    config:
      artifacts:
        github:
          accounts:
          - name: github-for-terraform
            token: abc # PAT GitHub token. This field supports "encrypted" field references (https://docs.armory.io/spinnaker-install-admin-guides/secrets/)
          enabled: true
```

**Halyard**

1. Enable GitHub as an artifact provider:

 ```bash
 hal config artifact github enable
 ```

2. Add the GitHub account:

 ```bash
 hal config artifact github account add github-for-terraform --token
 ```

3. Provide the PAT.

#### 3. Enabling and configuring the Terraform Integration

The Terraform Integration needs access to the GitHub token to download GitHub directories that hose your Terraform templates.

Enable the Terraform Integration

**Operator**

In `SpinnakerService` manifest:

```yaml
apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    config:
      armory:
        terraform:
          enabled: true
          git:
            enabled: true
            accessToken: abc  # PAT GitHub token. This field supports "encrypted" field references (https://docs.armory.io/spinnaker-install-admin-guides/secrets/)
```

**Halyard**

```bash
hal armory terraform enable

# This will prompt for the token
hal armory terraform edit \
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

**Operator**

```yaml
apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    config:
      artifacts:
        bitbucket: 
          enabled: true
          accounts:
          - name: bitbucket-for-terraform
            username: abc # Bitbucket username
            password: abc # Bitbucket password. This field supports "encrypted" field references (https://docs.armory.io/spinnaker-install-admin-guides/secrets/)
```

**Halyard**

```bash
hal config artifact bitbucket enable
# This will prompt for the password
hal config artifact bitbucket account add bitbucket-for-terraform \
  --username <USERNAME> \
  --password
```

#### 2. Enabling and configuring the Terraform integration with a BitBucket token

The Terraform Integration also needs access to the BitBucket token to download full
Github directories hosting your Terraform templates.

**Operator**

In `SpinnakerService` manifest:

```yaml
apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    config:
      armory:
        terraform:
          enabled: true
          git:
            enabled: true
            username: my-user # BitBucket user name.
            accessToken: abc  # BitBucket password. This field supports "encrypted" field references (https://docs.armory.io/spinnaker-install-admin-guides/secrets/)
```

**Halyard**

```bash
# This will prompt for the token, which is your BitBucket password
hal armory terraform edit \
  --git-enabled \
  --git-username <USERNAME> \
  --git-access-token
```

### Terraform version

Armory ships several versions of Terraform as part of the Terraform Integration feature. The Terraform binaries are verified by checksum and with Hashicorp's GPG key before being installed into our release.

When creating a Terraform Integration stage, pipeline creators select a specific available version from the list of available versions: 

![Terraform version to use](/images/terraform_version.png)

Note that all Terraform stages within a Pipeline that affect state must use the same Terraform version.

### Enabling the Terraform Integration UI

If you previously used the Terraform Integration stage by editing the JSON representation of the stage, those stages are automatically converted to use the UI.

Depending on the version, you may need to manually enable the stage UI for Deck. To do so:

**Operator**

Edit the `SpinnakerService` manifest to add the following:

```yaml
apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    profiles:
      deck:
        settings-local.js: |
          window.spinnakerSettings.feature.terraform = true;
```
    
**Halyard**

Edit `~/.hal/default/profiles/settings-local.js` and add the following line:

```yaml
window.spinnakerSettings.feature.terraform = true;
```

### Completing the installation

After you finish your Terraform integration configuration, perform the following steps:

Apply the changes: 

**Operator**

Assuming that Spinnaker lives in the namespace `spinnaker` and the `SpinnakerService` manifest is named `spinnakerservice.yml`:

```bash
kubectl -n spinnaker apply -f spinnakerservice.yml
```

**Halyard**
 
```bash
hal deploy apply
```

Then, confirm that the Terraform Integration service (Terraformer) is deployed with your Spinnaker deployment:
    
```bash
kubectl get pods -n {your-spinnaker-namespace}
```

## Configuring a Terraform stage

For a tour of the Terraform Integration Stage UI, see the [Terraform Integration UI video](https://www.youtube.com/watch?v=Xsjql3g-wtU).

![Terraform Stage in Deck](/images/terraform_stage_ui.png)

When you create or edit a pipeline in Deck,  a stage called **Terraform** is available. This stage can perform Terraform actions such as `plan` and `destroy` as part of your Spinnaker pipeline. 

To use the stage, perform the following steps:

1. In Deck, select the Application and pipeline you want to add the Terraform Integration stage to.
2. Configure the pipeline and add a stage.
3. For **Type**, select **Terraform**.
4. Add a **Stage Name**.
5. Configure the Terraform Integration stage.
    The available fields may vary slightly depending on what you configure for the stage: 
    * **Basic Settings**
      * **Terraform Version**:  Terraform version to use. All Terraform stages within a pipeline that modify state (apply, output, destroy) must use the same version.
      * **Action**: Terraform action to perform. You can select any of the following actions:
        * **Plan**: The output of the plan command is saved to a base64-encoded Spinnaker artifact and is injected into context.  You can use this artifact with a webhook to send the plan data to an external system or to use it in an `apply` stage. Optionally, you can select **Plan for Destroy** to view what Terraform destroys if you run the Destroy action.
        * **Apply**: Run `terraform apply`. Optionally, you can ignore state locking. Armory recommends you do not ignore state locking because it can lead to state corruption. Only use this setting if you understand the consequences. 
        * **Destroy**: Run `terraform destroy`. Optionally, you can ignore state locking. Armory recommends you do not ignore state locking because it can lead to state corruption. Only use this setting if you understand the consequences.
        * **Output**: Run `terraform output`. 
      * **Targets**: Scope execution to a certain subset of resources.
      * **Workspace**: [Terraform workspace](https://www.terraform.io/docs/state/workspaces.html) to use. The workspace gets created if it doesn't already exist.
    * **Main Terraform Artifact**
      * **Expected Artifact**: Required. Select or define only one `git/repo` type artifact, which is a **custom-artifact**.
        ![Terraform git repo artifact](/images/terraform-git-repo.png) 
        * **Account**: The account to use for your artifact.
        * **URL**: If you use a GitHub artifact, make sure you supply the _API_ URL of the file, not the URL from the `Raw` GitHub page. Use the following examples as a reference for the API URL:
          
          Regular GitHub:

          ```
          https://api.github.com/repos/{org}/{repo}/contents/{file path}
          ```

          Github Enterprise:

          ```
          https://{host}/api/v3/repos/{org}/{repo}/contents/{file path}
          ```
        * **Checkout subpath**: Enable this option to specify a **Subpath** within a Git repo. Useful if you have a large repo and the Terraform files are located in a specific directory.
        * **Branch**: The Git branch or commit to use. 
    
      * **Subdirectory**: Subdirectory within a repo where the `terraform` command runs. Use `./` if the command should run at the root level.
    * **Variable Files**: Optional. Variable files that get appended to the Terraform command. Equivalent to running terraform apply with the `-var-file` option.
      * If you want to use the output of a **Plan** stage for an **Apply** stage, select the **Plan** stage output as an **Expected Artifact**
    * **Variable Overrides**: Optional. Key/value pairs used as variables in the Terraform command. Equivalent to running terraform apply with the `-var` option. You can use a GitHub or BitBucket 
    * **Backend Artifact**: Optional. Configuration stored outside of the primary repo that gets used for authenticating to a state backend. For example, if you want to use an S3 artifact for your backend state, specify it in this section.

      For the `backendArtifact` and other artifacts, you can replace `github/file` with some other artifact type. For example, if you're using the BitBucket artifact provider, specify `bitbucket/file` and the corresponding artifact account.

### Custom Plugins

The Terraform Integration supports the use of custom Terraform providers and plugins. The Terraform Integration downloads the plugins and injects them into each stage dynamically as needed to ensure the Terraform code can run.

Any plugin you want to use must meet the following requirements: 
* Be a zip, tar, gzip, tar-gzip or executable
* If compressed, be at the root of the archive
* Be x86-64 (amd64) Linux binaries
* Have a SHA256 Sum
* Follow the Terraform plugin naming [conventions](https://www.terraform.io/docs/extend/how-terraform-works.html#discovery)

**Note**: If any Terraform Integration stage in a pipeline defines a custom plugin, all Terraform Integration stages must then define that same plugin in the pipeline.

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

## Viewing Terraform log output

![Terraform Integration logs](/images/terraformer-ui-logs.png)

Terraform's primary interface for user feedback is logging. When executed on your workstation, the log output is streamed to `stdout`. The Terraform Integration captures the log output and makes it available on the **Pipelines** page of Deck as part of the **Execution Details**. Exit codes in the log represent the following states:

```
0 = Succeeded with empty diff (no changes)
1 = Error
2 = Succeeded with non-empty diff (changes present)
```

For more information about Terraform logs, see the [Terraform documentation](https://www.terraform.io/docs/commands/plan.html#detailed-exitcode).

## Consuming Terraform output via SpEL

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

## Configuring Terraform for your cloud provider

Since the Terraform Integration executes all Terraform commands against the `terraform` binary, all methods of configuring authentication are supported for your desired cloud provider. This section describes how to accomplish this for various cloud providers.

### Configuration for AWS

There are several ways to enable Terraform to authenticate with AWS. You can find the full list [here](https://www.terraform.io/docs/providers/aws/#authentication). Each of these methods is supported; however, you may need to do additional configuration to enable them.

#### Shared credentials file

Terraform supports the ability to reference AWS profiles defined via a [shared credentials file](https://docs.aws.amazon.com/ses/latest/DeveloperGuide/create-shared-credentials-file.html). This file contains a list of AWS profiles alongside their access and secret keys. In order for Terraformer to utilize this file, we inject it into the environment in which Terraformer runs.

1. Create a Kubernetes `ConfigMap` containing the contents of this config file and put it in a temporary file:

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

   **Note**: You can swap the `ConfigMap` for a `Secret` if you prefer. The `ConfigMap` is used in this documentation for simplicity.

2. Apply the `ConfigMap`: 
   
   ```bash
   kubectl apply -f {temp-filename}`
   ```

3. Configure the Terraform Integration to mount this `ConfigMap` at runtime by adding the following service setting:

   **Operator**
 
   ```yaml
   apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
   kind: SpinnakerService
   metadata:
     name: spinnaker
   spec:
     spinnakerConfig:
       service-settings:
         terraformer: |
           kubernetes:
             volumes:
             - id: terraformer-credentials
               type: configMap
               mountPath: /home/spinnaker/.aws/
   ```
 
   **Halyard**

   Add to `~/.hal/default/service-settings/terraformer.yml`:
 
   ```yaml
   kubernetes:
     volumes:
     - id: terraformer-credentials
       type: configMap
       mountPath: /home/spinnaker/.aws/
   ```

4. Deploy these changes to your Spinnaker instance: 
   
   **Operator**
 
   ```bash
   kubectl -n spinnaker apply -f spinnakerservice.yml
   ```
    
   **Halyard**
    
   ```bash
   hal deploy apply
   ```

Once deployed, you can reference these profiles in your Terraform state and provider configuration. See the following snippet for an example:

```hcl
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

In this example, you create a secret with the SSH key and a config to ignore `known hosts` file issues. 

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
