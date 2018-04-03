---
layout: post
title: Pipelines as Code
order: 130
---

# What To Expect
This guide should include:
- Configurator changes needed before enabling Armory's "Pipelines as code" feature
- Setting up GitHub or Stash webhooks to work with the "Pipelines as code" feature

## Overview
To get an overview of Pipelines as code, check out the [user guide](http://docs.armory.io/user-guides/dinghy)


## Steps to follow to configure Pipelines as code:

- Create a personal access token (in either GitHub or Stash) that has read access to all repos where `dinghyfile`s and `module`s reside. Place this token in a file called `github-creds.txt` (or `stash-creds.txt`). The contents of this file should be of the format: `username:token`. Place this file in your secrets management system. By default, this will be the S3 bucket where the other credentials for spinnaker are pulled from.

- Open the configurator UI by going to `https://your.spinnaker.installation/armory/config`. Add a line to `/bin/sectrets` to copy the credentials created in the previous step to the instance where spinnaker will run. e.g.: `aws s3 cp s3://your-s3-bucket/aws/spinnaker/${ENV}/github-creds.txt "${SPINNAKER_SECRETS_DIR}"`

- Create a new file in the configurator UI: `config/dinghy-local.yml` with the following contents:

```
templateOrg:       armory-io  # github or stash "org" where the app repos and templates reside
dinghyFilename:    dinghyfile # name of the file which describes pipelines
templateRepo:      dinghy-templates # name of the repo containing modules
autoLockPipelines: true # whether or not to lock pipelines in the UI before updating them
spinAPIUrl:        https://spinnaker.your-company.com:8085
spinUIUrl:         https://spinnaker.your-company.io
certPath:          /path/to/client.pem # spinnaker x509 cert
githubCredsPath:   /path/to/github-creds # credentials for github api (username:token)
stashCredsPath:    /path/to/github-creds # credentials for stash api (username:token)
stashEndpoint:     http://stash.mycompany.com/rest/api/1.0", # url where stash is running
orca:
    enabled: true
    baseUrl: http://orca:8083
front50:
    enabled: true
    baseUrl: http://front50:8080
fiat:  # if you have fiat enabled
    enabled: true
    baseUrl: http://fiat:7003
    authUser: your-service-account
```

> Note: If you have fiat enabled, set the authUser to your service account which is in a group that has read/write access to the pipelines you will be updating. If you have app specific permissions configured in your spinnaker application, make sure the service account is added. If you need to create a new service account, here are the [instructions](https://www.spinnaker.io/setup/security/authorization/service-accounts/#creating-service-accounts)

- Edit the file `config/echo-local.yml` and add the following contents to it:
```
armorywebhooks:
    enabled: true
    forwarding:
      baseUrl: http://${DEFAULT_DNS_NAME}:8081  # dinghy
      endpoint: v1/webhooks
```
- Edit the file: `prod.env` (or `dev.env` if in dev environment) and set the following environment variable `DINGHY_ENABLED=true`

- If you're using GitHub, setup webhooks at the organization level for Push events. You can do that by going to: [](https://github.com/organizations/your_org_here/settings/hooks). Set the `Payload URL` to: `https://spinnaker.your-company.com:8084/webhooks/git/github`. You’ll need to have github’s webhooks IP whitelisted. You can find their IPs here: [](https://api.github.com/meta), you can read [github's docs her](https://help.github.com/articles/about-github-s-ip-addresses/).

- If you're using Stash, you'll need to setup webhooks for each project that has the dinghyfile or module separately. Make the webhook POST to: `https://spinnaker.your-company.com:8084/webhooks/git/stash`. If you're using stash `<v3.11.6`, you'll need to install the following [webhook plugin](https://marketplace.atlassian.com/plugins/com.atlassian.stash.plugin.stash-web-post-receive-hooks-plugin/server/overview) to be able to setup webhooks.

- Configure your spinnaker installation's _internal load balancer_ to forward all traffic on port 8081. Here's a [video](https://marketplace.atlassian.com/plugins/com.atlassian.stash.plugin.stash-web-post-receive-hooks-plugin/server/overview) that walks you through the process.

Now that all the configs are in place, upgrade to the release you recieved from Armory and the "Pipelines as Code" feature should be up and running. Refer to the [user guide](http://docs.armory.io/admin-guides/user-guides/dinghy) on how to use this feature!
