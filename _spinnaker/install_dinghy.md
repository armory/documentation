---
layout: post
title: Installing Pipelines as Code
order: 130
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# What To Expect
This guide should include:

* Configurations for enabling Armory's Pipelines as code feature using Spinnaker Operator or Halyard
* Settings for GitHub, GitLab, or Bitbucket/Stash webhooks to work with the Pipelines as code

## Overview
To get an overview of Pipelines as code, check out the [user guide](/spinnaker/using_dinghy).

## Enabling Pipelines as code
To configure Pipelines as code, start by enabling it:

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
        dinghy:
          enabled: true       # Whether or not dinghy is enabled
          ... # Rest of config omitted for brevity
```
  
Assuming Spinnaker lives in the `spinnaker` namespace:

```bash
kubectl -n spinnaker apply -f spinnakerservice.yml
```

**Halyard**

```bash
hal armory dinghy enable
```
Dinghy is the microservice for Pipelines as code.

## Steps to follow to configure Pipelines as code:

* Create a personal access token (in either [GitHub](https://github.com/settings/tokens) or Bitbucket/Stash) that has read access to all repos where `dinghyfile`s and `module`s reside.

* Get your Github, GitLab or Bitbucket/Stash "org" where the app repos and templates reside. For example if your repo is `armory-io/dinghy-templates`, your `template-org` would be `armory-io`.

* Get the name of the repo containing modules. . For example if your repo is `armory-io/dinghy-templates`, your `template-repo` would be `dinghy-templates`.

### GitHub Example

**Operator**

```yaml
apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    config:
      armory:
        dinghy:
          enabled: true                  # Whether or not Dinghy is enabled
          templateOrg: my-org            # SCM organization or namespace where application and template repositories are located
          templateRepo: dinghy-templates # SCM repository where module templates are located
          githubToken: abc               #  GitHub token. This field supports "encrypted" field references (https://docs.armory.io/spinnaker-install-admin-guides/secrets/)
          githubEndpoint: https://api.github.com # (Default: https://api.github.com) Github API endpoint. Useful if you’re using Github Enterprise
          ... # Rest of config omitted for brevity
```
    
```bash
kubectl -n spinnaker apply -f spinnakerservice.yml
```

* **Halyard**

```bash
hal armory dinghy edit \
  --template-org "armory-io" \
  --template-repo "dinghy-templates" \
  --github-token "your_token/password"
# For Github enterprise, you may customize the endpoint:
  --github-endpoint "https://your-endpoint-here.com/api/v3"
hal deploy apply
```

**Configure GitHub webhooks**

Set up webhooks at the organization level for Push events. You can do this by going to: https://github.com/organizations/your_org_here/settings/hooks:
1. Set `content-type` to `application/json`. 
2. Set the `Payload URL` to your Gate URL. Depending on whether you configured Gate to use its own DNS name or a path on the same DNS name as Deck, the URL follows one of the following formats: 

  * `https://<your-gate-url>/webhooks/git/github` (if you have a separate DNS name or port for Gate)
  * `https://<your-spinnaker-url>/api/v1/webhooks/git/github` (if you're using a different path for Gate)

If your gate endpoint is protected by a firewall, you’ll need to configure your firewall to allow inbound webhooks from Github's IP addresses. You can find their IPs here: [](https://api.github.com/meta), you can read [Github's docs here](https://help.github.com/articles/about-github-s-ip-addresses/).

### Bitbucket / Stash Example

**Operator**

```yaml
apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    config:
      armory:
        dinghy:
          enabled: true                      # Whether or not dinghy is enabled
          templateOrg: my-org                # SCM organization or namespace where application and template repositories are located
          templateRepo: dinghy-templates     # SCM repository where module templates are located
          stashUsername: stash_user          # Stash username
          stashToken: abc                    # Stash token. This field supports "encrypted" field references (https://docs.armory.io/spinnaker-install-admin-guides/secrets/)
          stashEndpoint: https://my-endpoint # Stash API endpoint. If you're using Bitbucket Server, update the endpoint to include the api e.g. https://your-endpoint-here.com/rest/api/1.0
          ... # Rest of config omitted for brevity
```
    
```bash
kubectl -n spinnaker apply -f spinnakerservice.yml
```
  
**Halyard**

```bash
hal armory dinghy edit \
  --template-org "armory-io" \
  --template-repo "dinghy-templates" \
  --stash-token "your_token/password" \
  --stash-username "stash_user" \
  --stash-endpoint "https://your-endpoint-here.com"  
hal deploy apply
```
Note: If you're using Bitbucket Server, update the endpoint to include the api e.g. `--stash-endpoint https://your-endpoint-here.com/rest/api/1.0`

You'll need to setup webhooks for each project that has the dinghyfile or module separately. Make the webhook POST to: `https://spinnaker.your-company.com:8084/webhooks/git/stash`. If you're using stash `<v3.11.6`, you'll need to install the following [webhook plugin](https://marketplace.atlassian.com/plugins/com.atlassian.stash.plugin.stash-web-post-receive-hooks-plugin/server/overview) to be able to setup webhooks.

### GitLab Example

**Operator**

```yaml
apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    config:
      armory:
        dinghy:
          enabled: true                       # Whether or not dinghy is enabled
          templateOrg: my-org                 # SCM organization or namespace where application and template repositories are located
          templateRepo: dinghy-templates      # SCM repository where module templates are located
          gitlabToken: abc                    # GitLab token. This field supports "encrypted" field references (https://docs.armory.io/spinnaker-install-admin-guides/secrets/)
          gitlabEndpoint: https://my-endpoint # GitLab endpoint
          ... # Rest of config omitted for brevity
```
    
```bash
kubectl -n spinnaker apply -f spinnakerservice.yml
```

**Halyard**

**Requirements**

GitLab with Pipelines as Code requires Halyard 1.7.2 or later.

**Example**

```bash
hal armory dinghy edit \
--template-org "armory-io" \
--template-repo "dinghy-templates" \
--gitlab-token "your_token/password"
--gitlab-endpoint "https://your-endpoint-here.com"  

hal deploy apply
```

Point your webhooks (Under "Settings -> Integrations"  on your project page)
to `https://<your-gate-url>/webhooks/git/gitlab`.  Make sure the server your
GitLab install is running on can connect to your Gate URL (and adjust any
firewall settings and the like that you may need).  Spinnaker will also need
to be able to reach back out to your GitLab installation; ensure that
connectivity works as well.

### Custom branch configuration
*Note: this feature requires armory spinnaker 2.5.6 or above.* 

By default, Dinghy will use the Master branch in your repository. If you wish to use a different default branch for your repository, this can be configured using the `repoConfig` tag in your yaml configuration. 

The `repoConfig` tag supports a collection of the following values. Each node in the collection must contain all of the fields listed below. 
* `branch` - the name of the branch you wish to use
* `provider` - the name of the provider (see below for available providers)
* `repo` - the name of the repository

All providers available in Dinghy are supported. Please refer to the list below for the proper name to use in the configuration for each provider. 
* `github`
* `bitbucket-cloud`
* `bitbucket-server`

**Operator**

```yaml
apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    profiles:
      dinghy:
        repoConfig:
        - branch: some_branch
          provider: bitbucket-server
          repo: my-bitbucket-repository
        - branch: some_branch
          provider: github
          repo: my-github-repository
          ... # Rest of config omitted for brevity
```

**Halyard**

This configuration goes inside your `profiles/dinghy-local.yml` file: 
```yaml
repoConfig:
- branch: some_branch
  provider: bitbucket-server
  repo: my-bitbucket-repository
- branch: some_branch
  provider: github
  repo: my-github-repository
```

### Other Options
#### Fiat

If Fiat is enabled, add the field `fiatUser: "your-service-account"` to the `dinghy` section in `SpinnakerService` manifest (Operator) or pass the option `--fiat-user "your-service-account"` (Halyard). Note that the service account has to be in a group that has read/write access to the pipelines you will be updating. 

If you have app specific permissions configured in Spinnaker, make sure you add the service account. For information on how to create a service account, click [here](https://www.spinnaker.io/setup/security/authorization/service-accounts/#creating-service-accounts).

#### Custom Filename

If you want to change the name of the file that describes pipelines, add the field `dinghyFilename: "your-name-here"` to the `dinghy` section in `SpinnakerService` manifest (Operator) or pass the option: `--dinghyfile-name "your-name-here"` (Halyard).

#### Disabling Locks

If you want to disable lock pipelines in the UI before overwriting changes, add the field `autoLockPipelines: false` to `SpinnakerService` manifest (Operator) or pass the option: `--autolock-pipelines false` (Halyard).

#### Slack Notifications

If you have configured Spinnaker to send Slack notifications for pipeline events (documentation [here](/spinnaker-install-admin-guides/slack-notifications)), you can configure Dinghy to send pipeline update results to Slack:

**Operator**

```yaml
apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    config:
      armory:
        dinghy:
          enabled: true
          notifiers:
            slack: 
              enabled: true       # Whether or not Slack notifications are enabled for dinghy events
              channel: my-channel # Slack channel where notifications will be sent to
              ... # Rest of config omitted for brevity
```
    
**Halyard**

```bash
$ hal armory dinghy slack enable --channel my-channel
```

![Slack Notifications](/images/dinghy-slack-notifications.png)


For a complete listing of options check out the [Armory Halyard](/spinnaker/armory_halyard/#hal-armory-dinghy-edit) documentation.

### Other Template Formats

*Note: this feature requires armory spinnaker 2.5.4 or above.*

Dinghy supports two additional template formats in addition to JSON:
* [HCL](https://github.com/hashicorp/hcl)
* [YAML](https://yaml.org/)

*Note: Selecting one of these parsers means that all of your dinghy templates must also be in that format.*

To use one of these alternate formats, you'll need to configure a local override with one of these parsers.
 
**Operator**
 
```yaml
apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    profiles:
      dinghy:
        parserFormat: hcl
        ... # Rest of config omitted for brevity
```
 
**Halyard**

Add the following config to `~/.hal/default/profiles/dinghy-local.yml`:

```yaml
parserFormat: hcl
```

*Note: in the future armory will add this configuration to Halyard.*

The `parserFormat` configuration only accepts the following values:
* json (Default. There is no need to specify this if you want to keep using json.)
* yaml
* hcl

## Known Issue

If Dinghy crashes on start up and you encounter an error in Dinghy similar to:
`time="2020-03-06T22:35:54Z" level=fatal msg="failed to load configuration: 1 error(s) decoding:\n\n* 'Logging.Level' expected type 'string', got unconvertible type 'map[string]interface {}'"`

You have probably configured global logging levels with `spinnaker-local.yml`. The work around is to override Dinghy's logging levels:

**Operator**

```yaml
apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    profiles:
      dinghy:
        Logging:
          Level: INFO
          ... # Rest of config omitted for brevity
```
 
**Halyard**
 
Create `.hal/default/profiles/dinghy-local.yml` with the following config:

```
Logging:
  Level: INFO
```
