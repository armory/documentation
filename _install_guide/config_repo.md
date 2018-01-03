---
layout: post
title: Configuration Repo
order: 40
---

## What to expect
By storing configuration in source control we get all of the benefits that go along with it (versioning, change history, etc.) We provide 2 methods for storing configurations for Armory Spinnaker:
- [Packaged Configurations](#packaged-configurations)
  + stored in github 
  + Package (Debians) using Jenkins 
  + Storing the artifact in Bintray, deb-s3, nexus ...
- [S3 Configurations](#s3-configurations)
  + stored in a versioned, encrypted s3 bucket
  + simple revision history


Overview:
<!-- MarkdownTOC autolink=true bracket=round depth=2 -->

- [Understanding config files.](#understanding-config-files)
- [Secrets](#secrets)
- [Packaged Configurations](#packaged-configurations)
  - [GitHub Repo](#github-repo)
  - [Packaging](#packaging)
  - [Validation](#validation)
- [S3 Configurations](#s3-configurations)
  - [Turning on the Configurator](#turning-on-the-configurator)

<!-- /MarkdownTOC -->



# Understanding config files.
See the example files here: [https://github.com/Armory/spinnaker-config-deb/tree/master/deb-config/spinnaker](https://github.com/Armory/spinnaker-config-deb/tree/master/deb-config/spinnaker)

Spinnaker uses Spring's configuration ymls. The default Armory Spinnaker installation, files are sourced in the following order, where a following file will replace the predecessors settings.
```
spinnaker.yml
spinnaker-armory.yml
spinnaker-local.yml
spinnaker-secrets.yml
ENVIRONMENT_VARIABLES
```

A subservice will also include `spinnaker` configuration files, for example `igor`:
```
spinnaker.yml
spinnaker-armory.yml
spinnaker-local.yml
spinnaker-secrets.yml
igor.yml
igor-armory.yml
igor-local.yml
igor-secrets.yml
ENVIRONMENT_VARIABLES
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

If you do not already have a central artifact repository system you might want to check out [Deb S3](https://github.com/krobertson/deb-s3). However your 



## Validation

After the deb package is built and published to your central artifact repository you should verify that Spinnaker will be able to download it. To do this, SSH to one of the Spinnaker instances using the keys you provided during the installation. While connected, try to pull the artifact manually.



# S3 Configurations
Armory includes a configurator that will store configurations in s3. This uses the bucket created during the installation of Armory to store configurations. You'll need to:
- [turn on s3 versioning](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/enable-versioning.html)
- (optional) [turn on default bucket encryption](https://docs.aws.amazon.com/AmazonS3/latest/dev/bucket-encryption.html)
- [Turn on the Configurator](#turning-on-the-configurator)


## Turning on the Configurator
- edit your env file (`HA.env`) and add:
```
CONFIGURATOR_ENABLED=true
```

- restart armory spinnaker
```
service armory-spinnaker restart
```

- visit [http://your.spinnaker.elb/armory/config/](http://your.spinnaker.elb/armory/config/)
- edit a file and hit `save` to persist the local version to s3
