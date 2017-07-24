---
layout: post
title: Installation
order: 30
---
# Installing Armory Spinnaker
{:.no_toc}

The installer is a script that is responsible for asking the user for customer specific inputs like AWS keys, VPC, subnets and S3 buckets. These inputs are kept locally on your system and then passed to Terraform.  You can also install Armory Spinnaker directly from the Debian or RPM package if you don't need the additional resources (S3/ElastiCache/IAM roles) created for you.



* Table of Contents
{:toc}

## Installing Armory Spinnaker Installer Scripts
Armory Spinnaker comes with an installer that walks you through deploying Spinnaker in your AWS account.  It should only take 15 minutes to have an instance of Armory Spinnaker up and running.  To get started, open up a terminal and execute the following:

`bash -c "$(curl -sS http://get.armory.io)"`

If you want to learn more about what is happening behind the scenes, you can go through the components below.


### Continuing From A Previous Install
![previous](https://cl.ly/0T2O2i0Q2f1q/Image%202017-04-14%20at%209.15.55%20AM.png)

### Terraform Templates
Armory Spinnaker relies on Terraform templates to create the infrastructure described above.  The `tfstate` file is created and backed by S3 for record keeping.

#### Spinnaker-Terraform
Configuration(s) to set Spinnaker up for the first time.

`ha` - Configuration for a highly available setup.

`stand-alone` - Configuration for a development setup.

`modules` - Common configuration shared by both setups.

The installer will download the latest stable version of the Terraform files and place them in `~/armory/`. - If you want to customize how the bootstrapped version of Spinnaker is installed, make changes to the template files in `~/armory/` and run the installer again.


## Using CentOS or Redhat for Armory Spinnaker
After setting up Spinnaker through the [Spinnaker-Terraform](#spinnaker-terraform) method, change or add the bake stage in the "Spinnaker deploy Spinnaker" pipeline to the following.

**Note**:
- Any selection of `Base OS` will work, it'll be used for AMI naming. Changes can be made through the `spinnaker-local.yml`.
- `Show Advance Options` needs to be checked for the following.


#### CentOS
```
Package: armoryspinnaker

Extended Attributes:
    repository: https://yum.dockerproject.org/repo/main/centos/7/; https://dl.bintray.com/armory/rpms
    package_type: rpm
    aws_ssh_username: centos
    aws_instance_type: m4.large

Base AMI: ami-bec022de (a base CentOS 7.1704)
AMI Name: centos-armoryspinnaker
```


#### Redhat
```
Package: armoryspinnaker

Extended Attributes:
    repository: https://yum.dockerproject.org/repo/main/centos/7/; https://dl.bintray.com/armory/rpms
    package_type: rpm
    aws_ssh_username: ec2-user
    aws_instance_type: m4.large

Base AMI: ami-b55a51cc (a base Redhat 7.3)
AMI Name: redhat-armoryspinnaker
```


## Armory Spinnaker AMI & Debian Distribution
When significant updates are available we distribute a new version of Armory Spinnaker that includes updated components from the OSS community edition as well.  We release minor patches every few days for priority fixes.  You can find more under release management.
