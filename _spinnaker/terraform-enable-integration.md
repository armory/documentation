---
layout: post
title: Enabling the Terraform Integration Stage
order: 141
redirect_from:
  - /spinnaker/terraform_integration/
  - /spinnaker/terraform-configure-integration/
---

{:.no_toc}
## Overview

The examples on this page describe how to configure the Terraform Integration and an artifact provider to support either GitHub or BitBucket. Note that the Terraform Integration also requires a `git/repo` artifact account. For information about how to use the stage, see [Using the Terraform Integration](/spinnaker/terraform_use_integration).

Armory Spinnaker's Terraform Integration integrates your infrastructure-as-code Terraform workflow into your SDLC. Armory's Terraform Integration interacts with a source repository you specify to deploy your infrastructure as part of a Spinnaker pipeline.

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Supported Terraform versions

Armory ships several versions of Terraform as part of the Terraform Integration feature. The Terraform binaries are verified by checksum and with Hashicorp's GPG key before being installed into an Armory release.

When creating a Terraform Integration stage, pipeline creators select a specific available version from a list of available versions: 

![Terraform version to use](/images/terraform_version.png)

Note that all Terraform stages within a Pipeline that affect state must use the same Terraform version.

## Redis

Terraformer uses Redis to store Terraform logs and plans. An external Redis instance is highly recommended for production use.

**Note:** Terraformer can only be configured to use a password with the default Redis user.

To set/override the Spinnaker Redis settings do the following:

**Operator**

In `SpinnakerService` manifest:

```yaml
apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    profiles:
      terraformer:
        redis:
          baseUrl: "redis://spin-redis:6379"
          password: "password"
```

```bash
kubectl -n spinnaker apply -f spinnakerservice.yml
```

**Halyard**

Edit the `~/.hal/default/profiles/terraformer-local.yml` file and add the following:

```yaml
redis:
  baseUrl: "redis://spin-redis:6379"
  password: "password"
```

Then run `hal deploy apply` to deploy the changes.

## Requirements

* Credentials (in the form of basic auth) for your Terraform Git repository. The Terraform Integration needs access to credentials to download directories that house your Terraform templates. The credentials can take one of two forms:
   * If your Terraform repo is in GitHub, use a Personal Acccess Token (potentially associated with a service account) as the 'token'.  Generate this token in your GitHub settings. For more information, see [Generating a Github Personal Access Token (PAT)](#generating-a-github-personal-access-token-pat).
   * If your Terraform repo is in BitBucket, use a username/password that has access to your BitBucket repo.
* To use Terraform Input Variable Files (`tfvar`), you must have a separate artifact provider (such as the GitHub, BitBucket, or HTTP artifact provider) that can pull your `tfvar` file(s). Additionally, the credentials must be configured in both places: the Terraform Integration and the artifact provider.


### Generating a GitHub Personal Access Token (PAT)
{:.no_toc}

Skip this section if you are using BitBucket, which requires your username and password.

Before you start, you need a GitHub Personal Access Token (PAT). The Terraform Integration authenticates itself using the PAT to interact with your GitHub repositories. You must create and configure a PAT so that the Terraform Integration can pull a directory of Terraform Templates from GitHub. Additionally, the Spinnaker GitHub artifact provider require a PAT for `tfvar` files.

Make sure the PAT you create meets the following requirements:

* The token uses a distinct name and has the **repo** scope.
* If your GitHub organization uses Single Sign-On (SSO), enable
the SSO option for the organizations that host the Terraform template(s) and Terraform `tfvar` files.  

For more information about how to generate a GitHub PAT, see [Creating a Personal Access Token for the Command Line](https://help.github.com/en/github/authenticating-to-github/creating-a-personal-access-token-for-the-command-line).

## Configure the Git Repo artifact

If you do not already have a `git/repo` artifact account configured, you must do so to use the Terraform Integration stage.

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
      clouddriver:
        artifacts:
          gitRepo:
            enabled: true
            accounts:
            - name: gitrepo
              token: <Your GitHub PAT> # GitHub personal access token
```

**Halyard**

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

## Configure the Terraform Integration for GitHub

These steps describe how to configure GitHub as an artifact provider for the Terraform Integration. For information about BitBucket, see [Configuring the Terraform Integration with BitBucket](#configuring-the-terraform-integration-with-bitbucket).


#### 1. Enabling and configuring the GitHub Artifact Provider

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
            token: <Your GitHub PAT> # GitHub personal access token # PAT GitHub token. This field supports "encrypted" field references (https://docs.armory.io/spinnaker-install-admin-guides/secrets/)
          enabled: true
```

**Halyard**

1. Enable GitHub as an artifact provider:

   ```
   hal config artifact github enable
   ```
2. Add the GitHub account:
   ```
   hal config artifact github account add github-for-terraform --token
   ```
   The command prompts you for your GitHub PAT.

#### 2. Enabling and configuring the Terraform Integration


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
            accessToken: <Your GitHub PAT>  # PAT GitHub token. This field supports "encrypted" field references (https://docs.armory.io/spinnaker-install-admin-guides/secrets/)
```

**Halyard**

```
hal armory terraform enable

# This will prompt for the token
hal armory terraform edit \
--git-enabled \
--git-access-token
```

Next, go to [Enabling the Terraform UI](#enabling-the-terraform-integration-ui) if you are using an Armory Spinnaker version before 2.17.3. Otherwise, go to [Completing the installation](#completing-the-installation).

## Configure the Terraform Integration for BitBucket

### 1. Enabling and configuring the BitBucket Artifact Provider

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
            username: <Your Bitbucket username>
            password: <Your Bitbucket password> # This field supports "encrypted" field references (https://docs.armory.io/spinnaker-install-admin-guides/secrets/)
```

**Halyard**

```bash
hal config artifact bitbucket enable

# This will prompt for the password
hal config artifact bitbucket account add bitbucket-for-terraform \
  --username <USERNAME> \
  --password
```

### 2. Enabling and configuring the Terraform integration with a BitBucket token

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

```
# This will prompt for the token, which is your BitBucket password
hal armory terraform edit \
  --git-enabled \
  --git-username <USERNAME> \
  --git-access-token
```

Next, go to [Enabling the Terraform UI](#enabling-the-terraform-integration-ui) if you are using an Armory Spinnaker version before 2.17.3. Otherwise, go to [Completing the installation](#completing-the-installation).

## Enabling the Terraform Integration UI

If you previously used the Terraform Integration stage by editing the JSON representation of the stage, those stages are automatically converted to use the UI.

For Armory Spinnaker 2.17.3 and later, the UI is on by default. If you are using an earlier version, manually enable the stage UI for Deck:

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

Edit `~/.hal/default/profiles/settings-local.js` and add the following:

```
window.spinnakerSettings.feature.terraform = true;
```

## Completing the installation

After you finish your Terraform integration configuration, perform the following steps:

1. Apply the changes: 

   **Operator**

   Assuming that Spinnaker lives in the namespace `spinnaker` and the `SpinnakerService` manifest is named `spinnakerservice.yml`:

   ```bash
   kubectl -n spinnaker apply -f spinnakerservice.yml
   ```

   **Halyard**

   ```bash
   hal deploy apply
   ```

2. Confirm that the Terraform Integration service (Terraformer) is deployed with your Spinnaker deployment:

   ```
   kubectl get pods -n <your-spinnaker-namespace>
   ```

   In the command output, look for a line similar to the following:

   ```
   spin-terraformer-d4334g795-sv4vz    2/2     Running            0          0d
   ```

## Configure Terraform for your cloud provider

Since the Terraform Integration executes all Terraform commands against the `terraform` binary, all methods of configuring authentication are supported for your desired cloud provider. This section describes how to accomplish this for various cloud providers. 

You can also configure a profile that grants access to resources, like AWS. 

## Profiles

A profile gives users the ability to reference certain kinds of external sources, such as a private remote repository, when creating pipelines. The supported credentials are described in [Types of credentials](#types-of-credentials).

### Types of credentials

The Terraform integration supports multiple types of credentials for Profiles to handle the various use cases that you can use the Terraform integration for:

* AWS
* SSH
* Static

If you don't see a credential that suits your use case, [let us know](https://feedback.armory.io/feature-requests)!

For information about how to configure a Profile, see [Configuring a profile](#configuring-a-profile).

**AWS**

Use the `aws` credential type to provide authentication to AWS. There are two methods you can use to provide authentication - by defining a static key pair or a role that should be assumed before a Terraform action is executed. 

For defining a static key pair, supply an `accessKeyId` and a `secretAccessKey`:

```yaml
- name: devops # Unique name for the profile. Shows up in Deck.
  variables:
  - kind: aws # Type of credential 
    options:
      accessKeyId: AKIAIOWQXTLW36DV7IEA
      secretAccessKey: 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
```

For assuming a role instead of defining a static set of credentials, supply the ARN of the role to assume:

```yaml 
- name: devops # Unique name for the profile. Shows up in Deck.
  variables:
  - kind: aws # Type of credential 
    options:
      assumeRole: arn:aws:iam::012345567:role/roleAssume
```

*When assuming a role, if `accessKeyId` and `secretAccessKey` are supplied, the Terraform integration uses these credentials to assume the role. Otherwise, the environment gets used for authentication, such as a machine role or a shared credentials file.*

**SSH Key**

Use the `git-ssh` credential kind to provide authentication to private Git repositories used as modules within your Terraform actions. The supplied SSH key will be available to Terraform for the duration of your execution, allowing it to fetch any modules it needs:

```yaml
- name: pixel-git # Unique name for the profile. Shows up in Deck.
  variables:
  - kind: git-ssh  # Type of credential 
    options:
    sshPrivateKey: encrypted:vault!e:<secret engine>!p:<path to secret>!k:<key>!b:<is base64 encoded?> 
```

**Static**

Use the `static` credential kind to provide any arbitrary key/value pair that isn't supported by any of the other credential kinds. For example, if you want all users of the `devops` profile to execute against the `AWS_REGION=us-west-2`, use the following `static` credential configuration.

```yaml
- name: devops # Unique name for the profile. Shows up in Deck.
  variables:
  - kind: static # Type of credential 
    options:
      name: AWS_REGION
      value: us-west-2
```

### Configuring a Profile

Configure profiles that users can select when creating a Terraform Integration stage:

1. In the `.hal/default/profiles` directory, create or edit `terraformer-local.yml`.
2. Add the values for the profile(s) you want to add under the `profiles` section. The following example adds a profile named `pixel-git` for an SSH key secured in Vault.
    
   ```yaml
   - name: pixel-git # Unique profile name displayed in Deck
       variables:
       - kind: git-ssh 
         options:
         sshPrivateKey: encrypted:vault!e:<secret engine>!p:<path to secret>!k:<key>!b:<is base64 encoded?> 
   ```
    
   When a user creates or edits a Terraform Integration stage in Deck, they can select the profile `pixel-git` from a dropdown.

   Keep the following in mind when adding profiles:

   * You can add multiple profiles under the `profiles` section.
   * Do not commit plain text secrets to `terraformer-local.yml`. Instead, use a secret store: [Vault](/spinnaker-install-admin-guides/secrets-vault), an [encrypted S3 bucket](/spinnaker-install-admin-guides/secrets-s3), or an [encrypted GCS bucket](/spinnaker-install-admin-guides/secrets-gcs). 
   * Only one option parameter at a time is supported for each Profile. This means that you can use a private key file (`sshPrivateKeyFilePath`) or the key (`sshPrivateKey`) as the option. To use the key file path, use `sshPrivateKeyFilePath` for the option and provide the path to the key file. The path can also be encrypted using a secret store such as Vault. The following `option` example uses `sshPrivateKeyFilePath`:
        
     ```yaml
     options:
     sshPrivateKeyFilePath: encryptedFile:<secret_store>!e:...
     ```
        
     For more information, see the documentation for your secret store.
3. Save the file. 
4. Apply your changes:
   
   ```
   hal deploy apply
   ```


## Submit feedback

Let us know what you think at [go.armory.io/ideas](go.armory.io/ideas) or [feedback.armory.io](https://feedback.armory.io). We're constantly iterating on customer feedback to ensure that the features we build make your life easier!