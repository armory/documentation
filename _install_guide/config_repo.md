---
layout: post
title: Configuration Repo
order: 40
---

## What to expect

In this guide you will learn how to:
- Create a GitHub repo for storing Spinnaker's configuration files.
- Packages the configuration files.
- Publish the artifacts to a central repository.

By storing configuration in source control we get all of the benefits that go along with it (versioning, change history, etc.) The cost is that it takes time to see the changes take affect.


# GitHub Repo

We start by forking the example repo from the Armory GitHub organization here: `https://github.com/Armory/spinnaker-config-deb`. After forking, you can find the Spinnaker configuration `.yml` files in `./deb-config/spinnaker/config`.

# Packaging

The forked repo is setup to build a deb package out of the configuration files. You can see how this works in `./build.sh`. The system you use to build will need to have Docker installed and available. If you are using Jenkins then you can look at `./Jenkinsfile` as an example. This is the flow you need to create in the build system:

- `./build.sh` executes and puts the artifacts in `build/distributions/*.deb`
- The `deb` is uploaded to a central artifact store.

If you are using Jenkins, make sure to artifact the deb package. This is what tells Spinnaker which version of your package to use.

## Alternatives

If you do not already have a central artifact repository system you might want to check out [Deb S3](https://github.com/krobertson/deb-s3). 

# Validation

After the deb package is built and published to your central artifact repository you should verify that Spinnaker will be able to download it. To do this, SSH to one of the Spinnaker instances using the keys you provided during the installation. While connected, try to pull the artifact manually.