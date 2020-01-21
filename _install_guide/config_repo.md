---
layout: post
title: Storing Configurations
order: 40
---

{% include components/legacy_documentation.html %}

Refer to the Spinnaker documentation for storing configurations at
[https://www.spinnaker.io/setup/install/backups/](https://www.spinnaker.io/setup/install/backups/)

<div class="deprecation-warning">
  The information below has been deprecated.
</div>

## What to expect
{:.no_toc}
By storing configuration in source control we get all of the benefits that go along with it (versioning, change history, etc.) We provide 2 methods for storing configurations for Armory Spinnaker:
- [Packaged Configurations](#packaged-configurations)
  + stored in github 
  + Package (Debians) using Jenkins 
  + Storing the artifact in Bintray, deb-s3, nexus ...
- [S3 Configurations](#s3-configurations)
  + stored in a versioned, encrypted s3 bucket
  + simple revision history


## Overview
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}



# Understanding config files
See the example files here: [https://github.com/Armory/spinnaker-config-deb/tree/master/deb-config/spinnaker](https://github.com/Armory/spinnaker-config-deb/tree/master/deb-config/spinnaker)

Spinnaker uses Spring's configuration ymls located in `/opt/spinnaker/config/`. Files are merged in top down order.  
Example:
```
spinnaker.yml
spinnaker-armory.yml  overrides spinnaker.yml
spinnaker-local.yml   overrides spinnaker-armory.yml, spinnaker.yml
spinnaker-secrets.yml overrides spinnaker-local.yml, spinnaker-armory.yml, spinnaker.yml
ENVIRONMENT_VARIABLES overrides spinnaker-secrets.yml, spinnaker-local.yml, spinnaker-armory.yml, spinnaker.yml
```

A subservice will also include `spinnaker` configuration files, for example `igor`:
```
spinnaker.yml
spinnaker-armory.yml  overrides spinnaker.yml
spinnaker-local.yml   overrides spinnaker-armory.yml, spinnaker.yml
spinnaker-secrets.yml overrides spinnaker-local.yml, spinnaker-armory.yml, spinnaker.yml
igor.yml              overrides spinnaker-secrets.yml, spinnaker-local.yml, spinnaker-armory.yml, spinnaker.yml
igor-armory.yml       overrides igor.yml, spinnaker-secrets.yml, spinnaker-local.yml, spinnaker-armory.yml, spinnaker.yml
igor-local.yml        overrides igor-armory.yml, igor.yml, spinnaker-secrets.yml, spinnaker-local.yml, spinnaker-armory.yml, spinnaker.yml
igor-secrets.yml      overrides igor-local.yml, igor-armory.yml, igor.yml, spinnaker-secrets.yml, spinnaker-local.yml, spinnaker-armory.yml, spinnaker.yml
ENVIRONMENT_VARIABLES overrides igor-secrets.yml, igor-local.yml, igor-armory.yml, igor.yml, spinnaker-secrets.yml, spinnaker-local.yml, spinnaker-armory.yml, spinnaker.yml
```



# Secrets
After choosing any configuration store, secrets should be handled by a secrets store. `bin/secrets` will run at runtime to fetch secrets from where ever your secrets are stored. Armory provides you a namespace `-secrets.yml` to store secret ymls. You edit [`bin/secrets`](https://github.com/Armory/spinnaker-config-deb/blob/master/deb-config/spinnaker/bin/secrets) to fetch and populate secrets by:
- using secret ymls (ex: `igor-secrets.yml`) stored in `/opt/spinnaker/config/`
- using password files stored in `/opt/spinnaker/secrets/`
- set ENV variables




# Packaged Configurations

## GitHub Repo

We'll start by forking the example repo from the Armory GitHub organization here: [`https://github.com/Armory/spinnaker-config-deb`](https://github.com/Armory/spinnaker-config-deb). After forking, you can find the Spinnaker configuration `-local.yml` files in `./deb-config/spinnaker/config`.



## Packaging

The forked repo is set up to build a deb package out of the configuration files. You can see how this works in `/bin/build.sh`. If you are using Jenkins then you can look at `./Jenkinsfile` as an example. This is the flow you need to create in the build system:

- `bin/build.sh` executes and creates an artifact in `build/distributions/*.deb`
- The `deb` file is uploaded to a central artifact store.

If you are using Jenkins, make sure to artifact the deb package. This is what tells Spinnaker which version of your package to use.


### Alternatives

If you do not already have a central artifact repository system you might want to check out [Deb S3](https://github.com/krobertson/deb-s3). You may want to setup IAM permissions, but this is left as an exercise for the reader, however PRs are welcomed!



## Validation

After the deb package is built and published to your central artifact repository you should verify that Spinnaker will be able to download it. To do this, SSH to one of the Spinnaker instances using the keys you provided during the installation. While connected, try to pull the artifact manually.



# S3 Configurations
Armory includes a configurator that will store configurations in s3. This uses the bucket created during the installation of Armory to store configurations. You'll need to:
- [turn on s3 versioning](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/enable-versioning.html)
- (optional) [turn on default bucket encryption](https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-encryption.html)
- [Turn on the Configurator](#turning-on-the-configurator)


## Turning on the Configurator
- edit your env file (`ha.env`) and add:
```
CONFIGURATOR_ENABLED=true
```

- restart armory spinnaker
```
service armory-spinnaker restart
```

- visit [http://your.spinnaker.elb/armory/config/](http://your.spinnaker.elb/armory/config/)
- edit a file and hit `save` to persist the local version to s3



## Using the Configurator
The Configurator will make edits to one of Armory Spinnaker's machines, then uploads the files to s3.
Configurations are locked to a server group at runtime, so you must redeploy it to see changes. This allows you to rollback to an existing OK Armory Spinnaker.

### For big config changes (ex: initial setup) or fast dev cycle time:
- Scale down to 1 polling ArmorySpinnaker
- Edit the config on the machine
- Restart ArmorySpinnaker
- Verify changes are live
- After you've finished, load the Configurator [http://your.spinnaker.elb/armory/config](http://your.spinnaker.elb/armory/config) 
- Hit save to persist the config
- Redeploy ArmorySpinnaker

### For smaller changes, make the change on the Configurator:
- Hit save to persist the config
- Redeploy ArmorySpinnaker
