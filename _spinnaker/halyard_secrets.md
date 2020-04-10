---
layout: post
title: Storing Configurations
order: 25
---
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Storing configurations is source control

Halyard stores secrets prompted by **hal commands** in your Halyard configuration directory, typically `~/.hal/config.yml` and other `~/.hal/` folders/files.

For both Halyard and the Spinnaker Operator to deploy and manage Spinnaker, you need to separate secrets from the rest of the config. This is done by replacing secret values and secret files by `encrypted...` or `encryptedFile...` references as described in [Spinnaker Secrets](/spinnaker-install-admin-guides/secrets). This allows you to store secret-free configuration files under source control. When you need to make any changes, you can download the files, change them, deploy the changes, and then upload the files again.
 
## Deploying config changes using Spinnaker Operator
 
If you are using the Spinnaker Operator, you can use any standard Kubernetes mechanism to update and apply config changes, like `kubectl apply`.
 
## Deploying config changes using Halyard

If you are using Halyard you need to issue `hal` commands to modify the configuration and then run `hal deploy apply` to apply the changes to Spinnaker.
