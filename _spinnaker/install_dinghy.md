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
- `hal armory` commands to enable and configure "Pipelines as code" feature
- Setting up GitHub or Stash webhooks to work with the "Pipelines as code" feature

## Overview
To get an overview of Pipelines as code, check out the [user guide](http://docs.armory.io/spinnaker/using_dinghy)

## Enabling Pipelines as code
In order to configure "Pipelines as code", it has to be enabled. Enable by running the following command:

`hal armory dinghy enable`

## Steps to follow to configure Pipelines as code:

- Create a personal access token (in either [GitHub](https://github.com/settings/tokens) or Stash) that has read access to all repos where `dinghyfile`s and `module`s reside.

- Get your github or stash "org" where the app repos and templates reside. Example "armory-io".

- Get the name of the repo containing modules. Example "dinghy-templates".


### GitHub Example
```
hal armory dinghy edit \
  --template-org "armory-io" \
  --template-repo "dinghy-templates" \
  --github-token $TOKEN

  # For Github enterprise, you may customize the endpoint:
  --github-endpoint "https://your-endpoint-here.com/api/v3"
```

Setup webhooks at the organization level for Push events. You can do that by going to: https://github.com/organizations/your_org_here/settings/hooks. Set the `Payload URL` to: `https://spinnaker.your-company.com:8084/webhooks/git/github`. You’ll need to have github’s webhooks IP whitelisted. You can find their IPs here: [](https://api.github.com/meta), you can read [github's docs here](https://help.github.com/articles/about-github-s-ip-addresses/).


### Stash Example
```
hal armory dinghy edit \
  --template-org "armory-io" \
  --template-repo "dinghy-templates" \
  --stash-token \
  --stash-username "stash_user" \
  --stash-endpoint "https://your-endpoint-here.com"
```

You'll need to setup webhooks for each project that has the dinghyfile or module separately. Make the webhook POST to: `https://spinnaker.your-company.com:8084/webhooks/git/stash`. If you're using stash `<v3.11.6`, you'll need to install the following [webhook plugin](https://marketplace.atlassian.com/plugins/com.atlassian.stash.plugin.stash-web-post-receive-hooks-plugin/server/overview) to be able to setup webhooks.

### Other Options
- If you have fiat enabled, add the following option `--fiat-user "your-service-account"`. The service account has to be in a group that has read/write access to the pipelines you will be updating. If you have app specific permissions configured in your spinnaker application, make sure the service account is added. If you need to create a new service account, here are the [instructions](https://www.spinnaker.io/setup/security/authorization/service-accounts/#creating-service-accounts)

- If you want to change the name of the file that describes pipelines, add the following option `--dinghyfile-name "your-name-here"`

- If you want to disable lock pipelines in the UI before overwriting changes, add `--autolock-pipelines false`

For a complete listing of options check out [hal armory](https://docs.armory.io/spinnaker/armory_halyard/#hal-armory-dinghy-edit)
