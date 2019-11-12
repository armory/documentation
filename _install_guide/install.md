---
layout: post
title: Installation
order: 20
# This has been redirected to spinnaker/install
---
{% include components/legacy_documentation.html %}

# Installing Armory Spinnaker
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Try Armory's Demo Environment

You can [try our Demo Environment](https://spinnaker.demo.armory.io) before installing Armory.

## Installing Armory Spinnaker In Kubernetes

Armory Spinnaker can now be installed in Kubernetes. Please [answer these questions about your Kubernetes installation](https://go.armory.io/kubernetes-questions) so we can help you install Armory.

[Learn more here](https://www.armory.io/pricing).

## Installing Armory Spinnaker In EC2 on AWS

*We highly recommend using the Kubernetes installer, above. This installer will be deprecated on 12/31/2018.*

The installer is a script that is responsible for asking the user for customer specific inputs like AWS keys, VPC, subnets and S3 buckets. These inputs are kept locally on your system and then passed to Terraform.  You can also install Armory Spinnaker directly from the Debian or RPM package if you don't need the additional resources (S3/ElastiCache/IAM roles) created for you.  Before getting started you'll want to review the [architecture](https://docs.armory.io/admin-guides/architecture/#high-availability-ha) guide, it'll give you an overview of Armory Spinnaker.

Armory Spinnaker comes with an installer that walks you through deploying Spinnaker in your AWS account.  It should only take 15 minutes to have an instance of Armory Spinnaker up and running.  To get started, open up a terminal and execute the following:

`bash -c "$(curl -sS https://get.armory.io)"`

You will need a AWS user/profile with permission to create the following resources:

- Autoscaling group and launch configuration
- Elastic Load Balancer
- Security group for the ELB
- Security group for the Spinnaker stack
- Elastic Cache (Redis)
- IAM Role for Spinnaker instances
- IAM Role for Spinnaker managed account
- IAM Policy Spinnaker S3 Access
- IAM Policy Spinnaker assume role permissions
- IAM Policy Spinnaker ECR read access

If you want to learn more about what is happening behind the scenes, you can go through the components below.

### Continuing From A Previous Install
![previous](/images/Image 2017-04-14 at 9.15.55 AM.png)

### Terraform Templates

The installation of Armory Spinnaker relies on Terraform templates to create the infrastructure described above.  The `tfstate` file is created and backed by S3 for record keeping.
Note: You do not have to have Terraform installed for this as the dependency is managed with Docker. All you need is Docker installed to deploy Spinnaker for the first time.

Once you have Spinnaker deployed, you can then use Spinnaker to deploy itself.

#### Spinnaker-Terraform
Configuration(s) to set Spinnaker up for the first time.

`ha` - Configuration for a highly available setup.

`stand-alone` - Configuration for a development setup.

`modules` - Common configuration shared by both setups.

The installer will download the latest stable version of the Terraform files and place them in `~/armory/`. - If you want to customize how the bootstrapped version of Spinnaker is installed, make changes to the template files in `~/armory/` and run the installer again.

### Validating Your Spinnaker Install

![hello](/images/98c70de3cd1c9778e50d5aa0e4db15f6_Image 2017-09-13 at 4.10.04 PM.png)

### Uninstall Armory Spinnaker

To uninstall Armory Spinnaker, run the install script again with the following environment variable set: `UNINSTALL_ARMORY_SPINNAKER=uninstall`. 

```
UNINSTALL_ARMORY_SPINNAKER=uninstall bash -c "$(curl -sS https://get.armory.io)"
```
