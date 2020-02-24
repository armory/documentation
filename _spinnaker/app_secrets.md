---
layout: post
title: Application Secrets Management
order: 60
---
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Overview

Managing application secrets, such as database passwords and API keys, can
be tricky.  These secrets should not be saved into the application's source
code, but they do need to be made available to the application when it runs.

Several tools have been built to address this issue.  In this document, we're
going to focus on how one might use [Hashicorp's Vault](https://www.vaultproject.io/)
to act as our secrets management utility, and then set up our application and
clusters to pull secrets from there.

In this guide, we'll be using Vault as our example secrets manager, but a
similar pattern should be applicable to similar tools, such as Amazon Secrets
Manager.

This guide presumes you've already installed and configured Vault; if you
are using Vault and have not done so, check Vault's 
[Getting Started](https://learn.hashicorp.com/vault/) guide.

## Protecting application secrets

Armory recommends that you do not pass secrets through Spinnaker in plain text as this is not safe from a security standpoint. If your Spinnaker deployment gets breached and secrets were passed through it, intruders now have all applications secrets that were passed. 

Instead, use a secret store and only pass the location of or references to the secret. The best practice for using application secrets is for the application to fetch the secret during application startup. For VMs, this is during the VM bootstrap or application startup process. For Kubernetes, you usually do this using an init-container, sidecar, or both.

For Vault, refer to the following resources about injecting application secrets securely into Kubernetes pods:
* HashiCorp - [Injecting Vault Secrets Into Kubernetes Pods via a Sidecar](https://www.hashicorp.com/blog/injecting-vault-secrets-into-kubernetes-pods-via-a-sidecar/)
* Banzai Cloud - [Inject secrets directly into Pods from Vault revisited](https://banzaicloud.com/blog/inject-secrets-into-pods-vault-revisited/)
* IT Next - [Dynamic Vault Secrets — Agent Sidecar on Kubernetes](https://itnext.io/dynamic-vault-secrets-agent-sidecar-on-kubernetes-cc0ce3e54a94)

For more general information, see the following pages about AWS Secrets Manager and Vault:
* GoDaddy Engineering blog about their use of [Kubernetes External Secrets](https://www.godaddy.com/engineering/2019/04/16/kubernetes-external-secrets/)
* GoDaddy GitHub page about their open sourced implementation of [Kubernetes External Secrets](https://github.com/godaddy/kubernetes-external-secrets)

## Basic Outline

The basic plan here is to allow developers to write code that references
"secrets" but which aren't checked into the codebase.  Often this will be
via a configuration file, or environment variables.  For testing purposes,
this data may be changed out; developers may have their own personal set of
"secrets" for their development environment.  The code just relies on the
file or env vars being set properly.

An operations person (or team) is then responsible for the actual production
systems, including the passwords used.  It's their job to maintain those
secrets and make sure they are set correctly in the production environment.

The plan, then, is to use a Kubernetes secret (which the developers should
not have access to) to store the Vault auth token (managed solely by an
Operations person).  The app can use the auth token to retrieve the application
secrets from Vault at runtime.  Spinnaker acts as a limited-use interface
such that the developer can kick off deployments to production, but may not
have actual direct access to the credentials for production.

The following diagram attempts to outline this design, showing the barrier
between the developer and the actual secrets their code uses:

![Diagram](/assets/images/app_secrets_diagram.png)

> NOTE:  Vault (and other tools) have taken this security a step further by connecting the secrets service with the backend systems such that the actual password being used is cycled automatically and is never actually known to any specific person.  If your environment permits this setup, it's definitely a more secure mechanism of password management, but it's also a much more complicated topic, and may not be possible depending on what services you are attempting to secure.

## Operations-side Configuration

The first step to securing the secrets is to create a policy in Vault, apply
the policy to the Vault path(s) that contain the secrets, and create a service
account that is associated with that policy to access it.  The authorization
token for this account is what we'll push into the deployed pods via a
Kubernetes Secret, and will allow that pod to request the current secrets
from Vault.

### Set Up A Secret Path

Within Vault, set up your secrets path (such as `/secrets` or `/prod/secrets`
or whatever works for you).  Don't put any secrets in yet; you'll want to
secure the path first (next step)

### Secure Path with a Policy

Create a policy by name that has access to the path you created.  By default,
paths are open to anyone authenticated, but as soon as you add a policy to
the path, it's locked down to only those accounts with that policy.

You can read more about Vault policies [here](https://www.vaultproject.io/docs/concepts/policies.html).

### Create Service Account Token

Use `vault token create` to create a token attached to the policy you just
created ([reference](https://www.vaultproject.io/docs/commands/token/create.html)).
Your app, using this token, should then have access to the actual secrets.

You can now put in your production secrets into that "bucket" safely.

### Create a K8s Secret

Using `kubectl` you'll want to create a Secret within your namespace that
contains this token.  The [Kubernetes documentation](https://kubernetes.io/docs/concepts/configuration/secret/)
discusses in detail the different ways you may create a secret.  Also note
this documentation discusses how to then mount/use the secret within the
pod.

## Bringing it all together

Now that your ops team has secured your secrets in Vault, and set up the
Kubernetes secret, the next step is to have your Kubernetes deployment
mount the auth token secret, and then finally, arrange for your app to
use Vault to retrieve the actual production secrets.

### Configure Your Manifest

To make the Vault token available to your application, you'll need to mount
the secret within your manifest. The
[Kubernetes documentation](https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/)
shows a number of ways in which you can configure your pods to get access to
the Kubernetes secrets either as a mounted volume or as an environment
variable.

This manifest reference may be visible to developers, but provided developers
do not have direct access to the Kubernetes cluster, they won't be able to
retrieve the actual token from the secret; Spinnaker allows the developers to
still manage the deployments to production, but not to retrieve the secret
itself.

### Configure Your Application

Now your code (or perhaps just a bootup script) can be written/configured to
grab the Vault token that was mounted in your Manifest, and, combining that
with the Vault paths, can retrieve your secrets safely.

One way to do this is with a Kubernetes [init container](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/)
intended to run the Vault image (which provides the `vault` command line tool)
to log in, retrieve the secrets and write them to disk, where your application
can pick them up.

Alternatively, your code may be able to access Vault directly with the access
token, storing the secrets retrieved in application memory, where it's not
readily accessible by someone who manages to gain access to the container's
shell.  Hashicorp provides [documentation on the Vault API](https://www.vaultproject.io/api/index.html)

## Alternatives

We've only scratched the surface of ways in which app secrets can be managed
and then merged at deploy time by Spinnaker.  We've used Vault as an example
because it's being used more and more by our customers, but there are other
products (like Amazon Secrets Manager) and, of course, homebrewed solutions.

In all cases, Spinnaker provides a terrific way to give developers the ability
to manage their own deployments while still securing production passwords
separately.

## See Also

Here are some other resources that may provide additional insight into how
to manage application secrets within your system:

* [Boostport's Kubernetes Vault Integration](https://github.com/Boostport/kubernetes-vault) -- This Github project incorporates a controller that watches
for new pods and injects the secrets into them when they initialize.
* [Working With Vault Secrets on Kubernetes](https://medium.com/ww-engineering/working-with-vault-secrets-on-kubernetes-fde381137d88)




