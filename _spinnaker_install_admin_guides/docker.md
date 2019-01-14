---
layout: post
title: Docker Registries
order: 51
redirect_from:
  - /spinnaker_install_admin_guides/docker/
---
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Configuring Docker Registries with Halyard

This is a quick walkthrough of how to configure your Spinnaker to access a
Docker registry.  Many of the commands below have additional options that
may be useful (or possibly required).  If you need more detailed help, take
a look at the [Halyard command reference](https://www.spinnaker.io/reference/halyard/commands/#hal-config-provider-docker-registry)

### Enable Docker Registries

If you haven't done this yet (for example, if you've just installed Armory
Spinnaker fresh), you'll need to enable Docker registry providers:

```bash
hal config provider docker-registry enable
```

### Add a Registry (and Repositories)

To add a new registry, you'll use some variation of the following command.
This example uses a public Docker Hub registry (armory/demoapp) and actually
would not use the `--username` or `--password` options, since the registry is
public.  In most cases, you'll be configuring a private registry and the
authentication credentials will be required, so the options are shown here
as an example.

```bash
hal config provider docker-registry account add my-docker-registry \
  --address index.docker.io
  --repositories armory/demoapp
  --username yourusername
  --password # you'll be prompted for this interactively
```

Detailed information on all command line options can be found [here](https://www.spinnaker.io/reference/halyard/commands/#hal-config-provider-docker-registry-account-add)

Note:  Some registries, like Docker Hub, require you to identify the
repositories explicitly, like above.  Some do not (such as the Google
Container Registry).  Further details can be found [here](https://www.spinnaker.io/setup/install/providers/docker-registry/).

Amazon's ECR requires additional configuration to work properly with Spinnaker.
[We've documented this separately.](/spinnaker-install-admin-guides/ecr-registry/)



