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

## Configuration

* **Operator**

    You can add the following snippet to your `SpinnakerService` manifest and apply it after replacing the example values with ones that correspond to your environment. The example adds an AWS account and configures the baking service (Rosco) with default values:
    
    ```yaml
    apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
    kind: SpinnakerService
    metadata:
      name: spinnaker
    spec:
      spinnakerConfig:
        config: 
          aws:
            enabled: true
            accounts:
            - name: my-aws-account
              requiredGroupMembership: []
              providerVersion: V1
              permissions: {}
              accountId: 'aws-account-id'               # Use your AWS account id
              regions:                                  # Specify all target regions for deploying applications
                - name: us-west-2
              assumeRole: role/SpinnakerManagedProfile  # Role name that worker nodes of Spinnaker cluster can assume in the target account to make deployments and scan infrastructure
            primaryAccount: my-aws-account
            bakeryDefaults:
              baseImages: []
            {% raw %}defaultKeyPairTemplate: '{{"{{"}}name{{"}}"}}-keypair'{% endraw %}
            defaultRegions:
            - name: us-west-2
            defaults:
              iamRole: BaseIAMRole
              ... # Config omitted for brevity
        service-settings:
          rosco:
            env:
              SPINNAKER_AWS_DEFAULT_REGION: "us-west-2"               # Replace by default bake region
              SPINNAKER_AWS_DEFAULT_ACCOUNT: "target-aws-account-id"  # Target AWS account id
              ... # Config omitted for brevity
    ```

* **Halyard**

    First, add the AWS provider account with [Halyard](https://github.com/spinnaker/halyard/blob/master/docs/commands.md#hal-config-provider-aws-account-add). Next, make sure to enable the AWS provider:

    ```bash
    hal config provider aws enable
    ```

    Then, add a `rosco.yml` file under `~/.hal/default/service-settings/` that contains the following snippet:

    ```yaml
    env:
      SPINNAKER_AWS_DEFAULT_REGION: "YOUR_DEFAULT_REGION"
      SPINNAKER_AWS_DEFAULT_ACCOUNT: "YOUR_DEFAULT_AWS_ACCOUNT_ID"
    ```

    `SPINNAKER_AWS_DEFAULT_ACCOUNT` is the target account ID.

## Bake Stage

![Bake Stage](/images/bake-and-share-1.png)

Make sure to check the `Show Advanced Options` checkbox. Then where it says `Template File Name` use [aws-multi-ebs.json](https://github.com/spinnaker/rosco/blob/ccb004e511b14642218aaf229923fefa0a9c250c/rosco-web/config/packer/aws-multi-ebs.json) as the value.

Then add an `Extended Attribute`. Have the key be `share_with_1` and the value being the target AWS account ID that was used for `SPINNAKER_AWS_DEFAULT_ACCOUNT`. `share_with_1` is for [ami_users](https://www.packer.io/docs/builders/amazon-ebs.html#ami_users) inside Packer.

You can also copy the resulting AMI to different regions by overriding the [copy_to_1](https://github.com/spinnaker/rosco/blob/ccb004e511b14642218aaf229923fefa0a9c250c/rosco-web/config/packer/aws-multi-ebs.json#L33) values. These match up to [ami_regions](https://www.packer.io/docs/builders/amazon-instance.html#ami_regions) inside Packer.
