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

How to exactly go about this may depend on how you've configured Vault, but
the key point is that you've got your authentication token for Vault, and it
has been associated with the policy you created in the previous step.  The
application will use this token to request the secrets from Vault, so it
needs to have the permissions to read the secrets in the policy created.

#### Create a k8s secret, manually, that contains the token

Using `kubectl` you'll want to create a Secret within your namespace that
contains this token.  The [Kubernetes documentation](https://kubernetes.io/docs/concepts/configuration/secret/)
discusses in detail the different ways you may create a secret.  Also note
this documentation discusses how to then mount/use the secret within the
pod.

### Deploy With Secrets

#### Configure Your Application

You can safely set the Vault path in your application source (or
potentially apply it from within Spinnaker).  So long as the token isn't
available, the actual secret won't be retrievable.

Set up your application to pull the Vault token from a path which is where
we'll mount the k8s secret that was created earlier.

#### Configure Your Manifest

Configure your deployment manifest to mount the K8s secret into the position
your application is expecting (see above).  When deployed, your application
should then be able to call to vault using the policy defined in code, and
the access token provided by the k8s secret, and retrieve the secrets needed
(database password, etc).

The [Kubernetes documentation](https://kubernetes.io/docs/tasks/inject-data-application/distribute-credentials-secure/) shows a number of ways in which you
can configure your pods to get access to the Kubernetes secrets either as a
mounted volume or as an environment variable.

## See Also

Here are some other resources that may help you properly configure security in
Spinnaker:

* [Armory Webinar on Authorization](https://blog.armory.io/webinar-configuring-auth-n-z-in-spinnaker-with-isaac-mosquera/)




