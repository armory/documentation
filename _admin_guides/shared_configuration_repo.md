---
layout: post
title: Shared Configuration Repositories
order: 101
---

## What to expect
{:.no_toc}

This guide will walk you through setting up a shared configuration repository between multiple Spinnaker installations, and using multiple AWS accounts.
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## What you will need
Here is an [example configuration repository](https://github.com/armory/spinnaker-config-deb) to start with.


## Create a new env file
In your configuration repo, use an existing env file (ex: `env/ha.env`) to create a new [`env/staging.env`](https://github.com/armory/spinnaker-config-deb/tree/master/deb-config/spinnaker/env). Update the values in `env/staging.env` appropriately.

To allow Spinnaker to pull in configs, we'll need to update the env variable `SPRING_PROFILES_ACTIVE`, add the following below
```bash
# by default, its set to
# SPRING_PROFILES_ACTIVE=local
# To pick up new staging ymls, we'll change it to:
SPRING_PROFILES_ACTIVE=staging
```


## `env/default.env`
Armory Spinnaker installs some settings in `env/default.env`


## Setup a new `-staging.yml`
You may want to change some yml files for a specific configurations. For example, lets create a [`config/clouddriver-staging.yml`](https://github.com/armory/spinnaker-config-deb/tree/master/deb-config/spinnaker/config) and update it accordingly.


## Secrets
Secrets should be different for each environment, we provide an entrypoint script that runs during startup of Spinnaker [`bin/secrets`](https://github.com/armory/spinnaker-config-deb/blob/master/deb-config/spinnaker/bin/secrets). You can use this file to customize your secrets fetch.


## Deploying
Now that we have our configs setup for both `ha` and `staging`, we can use the same debian generated in both [Spinnaker Deploy Spinnaker pipelines](https://docs.armory.io/install-guide/spinnaker-deploy-spinnaker/)



## Additional Links
[Information on the Debian configuaration repository](https://github.com/armory/spinnaker-config-deb)

[More about env files](https://github.com/armory/spinnaker-config-deb/tree/master/deb-config/spinnaker/env)

