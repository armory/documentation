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

This guide presumes you've already installed and configured Vault; if you
are using Vault and have not done so, check Vault's 
[Getting Started](https://www.vaultproject.io/intro/getting-started/install.html)
guide.

### Bootstrap The Token Secret

#### Create policy in Vault to access app secret(s)

Create a policy that provides read access to the secret path where you will
be keeping your secret(s).

You can read more about Vault policies [here](https://www.vaultproject.io/docs/concepts/policies.html).

#### Create a token in Vault with the policy associated

Use `vault token create` to create a token attached to the policy you just
created ([reference](https://www.vaultproject.io/docs/commands/token/create.html)).

#### Create a k8s secret, manually, that contains the token

Using `kubectl` you'll want to create a Secret within your namespace that
contains this token.  The [Kubernetes documentation](https://kubernetes.io/docs/concepts/configuration/secret/)
discusses in detail the different ways you may create a secret.  Also note
this documentation discusses how to then mount/use the secret within the
pod.

### Deploy With Secrets

#### Configure Your Manifest

To make the Vault token available to your application, you'll need to mount
the secret within your manifest. The
[Kubernetes documentation](https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/)
shows a number of ways in which you can configure your pods to get access to
the Kubernetes secrets either as a mounted volume or as an environment
variable.

#### Configure Your Application

Now your code (or perhaps just a bootup script) can be written/configured to
grab the Vault token that was mounted in your Manifest, and, combining that
with the Vault paths, can retrieve your secrets safely.

One way to do this is with a Kubernetes [init container](https://kubernetes.io/docs/concepts/workloads/pods/init-containers/)
intended to run the Vault image (which provides the `vault` command line tool)
to log in, retrieve the secrets and write them to disk, where your application
can pick them up.


## See Also

Here are some other resources that may provide additional insight into how
to manage application secrets within your system:

* [Boostport's Kubernetes Vault Integration](https://github.com/Boostport/kubernetes-vault) -- This Github project incorporates a controller that watches
for new pods and injects the secrets into them when they initialize.
* [Working With Vault Secrets on Kubernetes](https://medium.com/ww-engineering/working-with-vault-secrets-on-kubernetes-fde381137d88)




