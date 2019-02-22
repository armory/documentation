---
layout: post
title: Bake and Share AMIs Across Accounts
order: 100
---
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Overview

Many people have Spinnaker sitting in a different AWS account than where they are deploying to (the target account). This guide will show you how to configure Spinnaker to share an AMI created where Spinnaker lives with the AWS account where your applications live. This guide is assuming that AWS roles are already properly setup for talking to the target account.

## Halyard Configuration

Add the AWS provider account with [Halyard](https://github.com/spinnaker/halyard/blob/master/docs/commands.md#hal-config-provider-aws-account-add). Next make sure to enable the AWS provider:
```bash
hal config provider aws enable
```

Now we need to add a `rosco.yml` file under `~/.hal/default/service-settings/` that contains the following:
```yaml
env:
  SPINNAKER_AWS_DEFAULT_REGION: "YOUR_DEFAULT_REGION"
  SPINNAKER_AWS_DEFAULT_ACCOUNT: "YOUR_DEFAULT_AWS_ACCOUNT_ID"
```

`SPINNAKER_AWS_DEFAULT_ACCOUNT` is the target account ID.

## Bake Stage

![Bake Stage](images/Image%25202019-02-18%2520at%252017.17.36.png)

Make sure to check the `Show Advanced Options` checkbox. Then where it says `Template File Name` use [aws-multi-ebs.json](https://github.com/spinnaker/rosco/blob/ccb004e511b14642218aaf229923fefa0a9c250c/rosco-web/config/packer/aws-multi-ebs.json) as the value.

Then add an `Extended Attribute`. Have the key be `share_with_1` and the value being the target AWS account ID that was used for `SPINNAKER_AWS_DEFAULT_ACCOUNT`. `share_with_1` is for [ami_users](https://www.packer.io/docs/builders/amazon-ebs.html#ami_users) inside Packer.

You can also copy the resulting AMI to different regions by overriding the [copy_to_1](https://github.com/spinnaker/rosco/blob/ccb004e511b14642218aaf229923fefa0a9c250c/rosco-web/config/packer/aws-multi-ebs.json#L33) values. These match up to [ami_regions](https://www.packer.io/docs/builders/amazon-instance.html#ami_regions) inside Packer.
