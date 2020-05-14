---
layout: post
title: Armory Config
order: 2
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Parameters

**spec.spinnakerConfig.config.armory**

```yaml
armory:
  dinghy:
    enabled:
    templateOrg:
    templateRepo:
    githubToken:
    githubEndpoint:
    stashUsername:
    stashToken:
    stashEndpoint:
    gitlabToken:
    gitlabEndpoint:
    dinghyFilename:
    autoLockPipelines:
    fiatUser:
    notifiers:
      slack:
        enabled:
        channel:
    webhookValidationEnabledProviders:
    webhookValidations:
    - enabled:
      versionControlProvider:
      organization:
      repo:
      secret:
  diagnostics:
    enabled:
    uuid:
    logging:
      enabled:
      endpoint:
  terraform:
    enabled:
    git:
      enabled:
      accessToken:
      username:
  secrets:
    vault:
      enabled:
      url:
      path:
      role:
      authMethod:
```

## Dinghy parameters

- `enabled`: true or false.
- `templateOrg`: SCM organization or namespace where application and template repositories are located.
- `templateRepo`: SCM repository where module templates are located
- `githubToken`: GitHub token. Supports encrypted value.
- `githubEndpoint`: (Default: `https://api.github.com`) Github API endpoint. Useful if you’re using Github Enterprise.
- `stashUsername`: Stash username.
- `stashToken`: Stash token. Supports encrypted value.
- `stashEndpoint`: Stash API endpoint.
- `gitlabToken`: GitLab token.  Supports encrypted value.
- `gitlabEndpoint`: GitLab endpoint.
- `dinghyFilename`: (Default: `dinghyfile`) Name of the file in application repositories which contains pipelines.
- `autoLockPipelines`: (Default: true) Lock pipelines in the UI before overwriting on change.
- `fiatUser`: Fiat user to use for Dinghy operations.
- `notifiers`:
  - `slack`:
    - `enabled`: true or false.
    - `channel`: Name of channel to send notifications to.
- `webhookValidationEnabledProviders`: List of enabled providers for Webhook validations.
- `webhookValidations`: Webhook validations list
  - `enabled`: true/false flag to enable this validation.
  - `versionControlProvider`: Version control provider.
  - `organization`: Organization for the repository.
  - `repo`: Repository name.
  - `secret`: Secret configured.

## Diagnostics parameters

- `enabled`: true or false.
- `uuid`: UUID of the Armory installation
- `logging`:
  - `enabled`: true or false.
  - `endpoint`: Example: `https://debug.armory.io/v1/logs`

## Armory Terraform parameters

- `enabled`: true or false.
- `git`:
  - `enabled`: true or false.
  - `accessToken`: Git access token. Supports encrypted value.
  - `username`: Git username.

## Secrets parameters

- `vault`:
  - `enabled`: true or false.
  - `url`: URL of the Vault endpoint from Spinnaker services.
  - `path`: (Default: `kubernetes`) (Applies to Kubernetes authentication method) Path of the Kubernetes authentication backend mount.
  - `role`: (Applies to Kubernetes authentication method) Name of the role against which the login is being attempted.
  - `authMethod`: Method used to authenticate with the Vault endpoint. Must be either `KUBERNETES` for Kubernetes service account auth or `TOKEN` for Vault token auth. The `TOKEN` method requires a `VAULT_TOKEN` environment variable for Operator and the services.
