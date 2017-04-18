---
layout: post
title: Rosco/Baking Configuration
order: 120
---

# Baking Images With Rosco

Rosco is the sub-service that manages baking using [Packer](https://www.packer.io/docs/) which is a cloud agnostic tool that automates the creation of images.  Rosco is a small API which manages the state of packer jobs and their executions so that it can report to other sub-systems.  It is highly extendable to work for different types of environments.  

## Rosco Configuration for Baking

### Templates Location
You can tell where Rosco should look for template files and script.  By default they're kept at `/opt/rosco/config/packer`.  With a standard Spinnaker distribution you should find various examples to extend.  In most cases you will want to take a template file and add your custom packer properties to build correctly.  You will only need to add your files here in this directory and then reference then in your bake stage under the `Template File Name` field.
You can specify the following in `/opt/spinnaker/config/rosco-local.yml`:
```
rosco:
  configDir: ${services.rosco.configDir:/opt/rosco/config/packer}
```

![baking templates](https://d1ax1i5f2y3x71.cloudfront.net/items/0K1S1l3L2M0z373A0L1o/Image%202017-04-17%20at%207.06.45%20AM.png?X-CloudApp-Visitor-Id=2686178)


### Using Package (deb/rpm/chocolatey) Repositories

You can specify an apt repository (used when baking debian based images) and/or a yum repository (used when baking an rpm based imaged) and/or a chocolatey repository (used when baking a nuget based image).

```
debianRepository: http://dl.bintray.com/spinnaker/ospackages
yumRepository: https://https://jfrog.bintray.com/yourpath
chocolateyRepository: https://chocolatey.org/api/v2/
```

### Setting Up Base OS Defaults for Baking

The default configurations use Ubuntu 12.04/14.0 as the default choices for Base OS, however these are configurable below by add the configuration below to your `rosco-local.yml`.   You can specify a different `templateFile` per base image which should save time from a user perspective so that they don't have to specify an additional parameter.  You can specify multiple base image and virtualization settings for each region you need to process bakes.

```
aws:
  enabled: true
  bakeryDefaults:
    awsAssociatePublicIpAddress: false
    templateFile: aws-ebs.json
    defaultVirtualizationType: hvm
    baseImages:
    - baseImage:
        id: ubuntu
        shortDescription: v12.04
        detailedDescription: Ubuntu Precise Pangolin v12.04
        packageType: deb
        # You can specify the templateFile used for this baseImage.
        # If not specified, the default templateFile will be used.
        templateFile: aws-ebs.json
      virtualizationSettings:
      - region: us-east-1
        virtualizationType: hvm
        instanceType: t2.micro
        sourceAmi: ami-d4aed0bc
        sshUserName: ubuntu
    - baseImage:
         id: trusty
         shortDescription: v14.04
         detailedDescription: Ubuntu Trusty Tahr v14.04
         packageType: deb
       virtualizationSettings:
       - region: us-east-1
         virtualizationType: hvm
         instanceType: t2.micro
         sourceAmi: ami-9eaa1cf6
         sshUserName: ubuntu
```
