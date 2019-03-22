---
layout: post
title: Configure Github
order: 48
redirect_from:
  - /spinnaker_install_admin_guides/github/
---
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Configuring a Github Trigger

Spinnaker pipelines can be configured to trigger when a change is committed
to a Github repository.  This doesn't require any configuration of Spinnaker
other than [adding a Github trigger](/spinnaker-user-guides/github/) but does
require administration of the Github repositories to configure the webhook.

The open source documentation
[has concise instructions for configuring Github webhooks.](https://www.spinnaker.io/setup/triggers/github/)

## Configuring Github as an Artifact Source

If you actually want to use a file from the Github commit in your pipeline,
you'll need to configure Github as an artifact source.  This is how you would,
for example, reference a Helm chart from your repo for later use during
deployment.

This is just a quick walkthrough of how to configure your Spinnaker to access a
Github repo as a source of artifacts.  Many of the commands below have
additional options that may be useful (or possibly required).  If you need
more detailed help, take a look at the
[Halyard command reference](https://www.spinnaker.io/reference/halyard/commands/#hal-config-artifact-github)

### Enable Github Artifacts

If you haven't done this yet (for example, if you've just installed Armory
Spinnaker fresh), you'll need to enable Github as an artifact source:

```bash
hal config features edit --artifacts true
hal config artifact github enable
```

### Add a Github Account


To add a new registry, you'll use some variation of the following command.
This example uses a public Docker Hub registry (armory/demoapp) and actually
would not use the `--username` or `--password` options, since the registry is
public.  In most cases, you'll be configuring a private registry and the
authentication credentials will be required, so the options are shown here
as an example.

```bash
hal config artifact github account add changemyname \
  --token # you'll be prompted for this interactively
```

Detailed information on all command line options can be found [here](https://www.spinnaker.io/reference/halyard/commands/#hal-config-artifact-github-account-add)

Don't forget to `hal deploy apply` your changes.



