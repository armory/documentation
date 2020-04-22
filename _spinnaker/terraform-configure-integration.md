---
layout: post
title: Enabling the Terraform Integration stage
order: 141
redirect_from:
  - /spinnaker/terraform_integration/
---

{:.no_toc}
## Overview

This page describes how to enable Armory's Terraform Integration stage. For information about how to use the stage, see [Using the Terraform Integration](/spinnaker/terraform_use_integration)

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

## Supported Terraform versions

Armory ships several versions of Terraform as part of the Terraform Integration feature. The Terraform binaries are verified by checksum and with Hashicorp's GPG key before being installed into our release.

When creating a Terraform Integration stage, pipeline creators select a specific available version from the list of available versions: 

![Terraform version to use](/images/terraform_version.png)

Note that all Terraform stages within a Pipeline that affect state must use the same Terraform version.

## Requirements

* Credentials (in the form of basic auth) for your Terraform Git repository.  This can take one of two forms:
    * If your Terraform repo is in GitHub, use a Personal Acccess Token (potentially associated with a service account) as the 'token'.  Generate this token in your GitHub settings. For more information, see [Generating a Github Personal Access Token (PAT)](#generating-a-github-personal-access-token-pat).
    * If your Terraform repo is in BitBucket, use a username/password that has access to your BitBucket repo.
* To use Terraform Input Variable Files (`tfvar`), you must have a separate artifact provider (such as the GitHub, BitBucket, or HTTP artifact provider) that can pull your `tfvar` file(s). Additionally, the credentials must be configured in both places: the Terraform Integration and the artifact provider.

## Enable the Terraform Integration stage

The examples on this page describe how to configure the Terraform Integration and an artifact provider to support either GitHub or BitBucket. Note that the Terraform Integration also requires a `git/repo` artifact account.

### Generating a GitHub Personal Access Token (PAT)

Before you start, you need a GitHub Personal Access Token (PAT). The Terraform
Integration authenticates itself using the PAT to interact with your GitHub repositories. You must create and configure a PAT so that the Terraform Integration can pull
a directory of Terraform Templates from GitHub. Additionally, the Spinnaker GitHub artifact provider require a PAT for `tfvar` files.

Make sure the PAT you create meets the following requirements:

* The token uses a distinct name and has the **repo** scope.
* If your GitHub organization uses Single Sign-On (SSO), enable
the SSO option for the organizations that host the Terraform template(s) and Terraform `tfvar` files.  

For more information about how to generate a GitHub PAT, see [Creating a Personal Access Token for the Command Line](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).

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
                  token: <Your GitHub PAT> # GitHub personal access token
    ```

* **Halyard**

    Edit the `~/.hal/default/profiles/clouddriver-local.yml` file and add the following:

    ```
    artifacts:
      gitRepo:
        enabled: true
        accounts:
        - name: gitrepo
          token: <Your GitHub PAT> # GitHub personal access token
    ```
  
For more information, see [Git Repo](https://www.spinnaker.io/reference/artifacts/types/git-repo/).

### Configure the Terraform Integration with GitHub

These steps describe how to configure GitHub as an artifact provider for the Terraform Integration. For information about BitBucket, see [Configuring the Terraform Integration with BitBucket](#configuring-the-terraform-integration-with-bitbucket)


#### 1. Enabling and configuring the GitHub Artifact Provider

Spinnaker uses the Github Artifact Provider to download any referenced `tfvar`
files.

If you already have a GitHub artifact account configured in Spinnaker,
skip this section.

**Note**: The following examples use `github-for-terraform` as a unique identifier for the artifact account. Replace it with your own identifier.

* **Operator**

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
                token: <Your GitHub PAT> # GitHub personal access token # PAT GitHub token. This field supports "encrypted" field references (https://docs.armory.io/spinnaker-install-admin-guides/secrets/)
              enabled: true
    ```

* **Halyard**

    1. Enable GitHub as an artifact provider:
        ```
        hal config artifact github enable
        ```
    2. Add the GitHub account:
        ```
        hal config artifact github account add github-for-terraform --token
        ```
    3. Provide the PAT.

#### 2. Enabling and configuring the Terraform Integration

The Terraform Integration needs access to the GitHub token to download GitHub directories that hose your Terraform templates.

1. Enable the Terraform Integration

* **Operator**

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

* **Halyard**

    ```
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

* **Operator**

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
                username: <Your Bitbucket username>
                password: <Your Bitbucket password> # This field supports "encrypted" field references (https://docs.armory.io/spinnaker-install-admin-guides/secrets/)
    ```

* **Halyard**

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

* **Operator**

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

* **Halyard**

    ```
    # This will prompt for the token, which is your BitBucket password
    hal armory terraform edit \
      --git-enabled \
      --git-username <USERNAME> \
      --git-access-token
    ```

## Enabling the Terraform Integration UI

If you previously used the Terraform Integration stage by editing the JSON representation of the stage, those stages are automatically converted to use the UI.

For Armory Spinnaker 2.17.3 and later, the UI for the Terraform Integration stage is on by default. IF you are using an earlier version, manually enable the stage UI for Deck:

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
          deck:
            settings-local.js: |
              window.spinnakerSettings.feature.terraform = true;
    ```
    
* **Halyard**

    Edit `~/.hal/default/profiles/settings-local.js` and add the following line:

    ```
    window.spinnakerSettings.feature.terraform = true;
    ```

### Completing the installation

After you finish your Terraform integration configuration, perform the following steps:

1. Apply the changes: 

* **Operator**

    Assuming that Spinnaker lives in the namespace `spinnaker` and the `SpinnakerService` manifest is named `spinnakerservice.yml`:

    ```bash
    kubectl -n spinnaker apply -f spinnakerservice.yml
    ```

* **Halyard**
   
    ```bash
    hal deploy apply
    ```

1. Confirm that the Terraform Integration service (Terraformer) is deployed with your Spinnaker deployment:
    
    ```
    kubectl get pods -n {your-spinnaker-namespace}
    ```



## Configuring Terraform for your cloud provider

Since the Terraform Integration executes all Terraform commands against the `terraform` binary, all methods of configuring authentication are supported for your desired cloud provider. This section describes how to accomplish this for various cloud providers.

### Configuration for AWS

There are several ways to enable Terraform to authenticate with AWS. You can find the full list [here](https://www.terraform.io/docs/providers/aws/#authentication). Each of these methods is supported; however, you may need to do additional configuration to enable them.


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
