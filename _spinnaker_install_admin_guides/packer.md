---
layout: post
title: Baking Machine Images (AWS, GCE, etc.) Using Packer
order: 35
# Substantially different from install_guide/packer
redirect_from:
  - /spinnaker_install_admin_guides/packer/
---

## What To Expect

{:.no_toc}
This guide includes:
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

Spinnaker has a built-in capability to 'bake' (build) machine images for deployment to various cloud environments. For example, if you are deploying to AWS, you can use Spinnaker to bake Amazon Machine Images (AMIs) from the artifacts that were produced by your CI tool.  This is achieved by using the open source Packer tool, which is included in the Spinnaker Rosco microservice.

**Note** This section focuses on configuring packer scripts to build machine images (such as AMIs).  If you're only deploying to Kubernetes, you can skip this section.

## Configuring AWS Bake Credentials

If you've configured Spinnaker to deploy to AWS, then you've likely set up a set of IAM credentials and permissions for Clouddriver to be able to deploy to AWS (using the AWS API).  Since Packer is run from a different microservice in Spinnaker (Rosco), configuration of Bake credentials is separate from the configuration of Deploy credentials.

**AMI baking primarily occurs in a single AWS account; you can configure baked AMIs to be shared to additional desired AWS accounts**

### AWS Bake Credentials using IAM Credentials

If you've configured Spinnaker to interact with AWS using explicit credentials (an AWS Access Key and Secret Access Key), you can likewise configure Rosco to use a set of AWS credentials.  What you essentially need are an IAM user with permissions to do the things that Packer needs to do, and then you can pass those credentials to Rosco via Halyard.

The AWS account that you're baking in must also match an account configured as a Managed Account, and that Managed Account must be configured as the primary AWS account within Spinnaker.

This User must have all permissions necessary to bake (for example, PowerUserAccess and associated PassRoles)

This User may be, but does not have to be, the same as the Managing Account User.

Spinnaker will always bake with this user.  If you need to deploy to other accounts, update your Packer template to support sharing the baked image with other accounts.  For example, add this to your `builder` configuration in your packer template (and add the custom packer template following the instructions in [the Spinnaker Packer documentation](https://docs.armory.io/spinnaker-install-admin-guides/packer/)):

```json
    "ami_users": ["222222222222","333333333333"]
```

#### Create an IAM user

If you don't have an IAM user with the desired permissions, you can create one by doing the following:

1. Log into the AWS account where Spinnaker lives, into the browser-based AWS Console
1. Navigate to the IAM page (click on "Services" at the top, then on "IAM" under "Security, Identity, & Compliance")
1. Click on "Users" on the left side
1. Click on "Add user"
1. Specify a logical user name, such as "SpinnakerBake"
1. Check the "Programmatic access" checkbox
1. Select "Attach existing policies directly"
1. Find and attach the AWS "PowerUserAccess" Policy
1. Click "Next: Tags"
1. Optionally, add tags that will identify this user
1. Click "Next: Review"
1. Click "Create user"
1. Copy the "Access key ID" and "Secret access key" (you'll have to click "Show").
1. Click "Close"
1. Click on the "User name" for the user that you just created.
1. Click on "Add inline policy" (on the right).
1. Click on the "JSON" tab, and paste in this:

   ```json
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Action": [
                 "iam:PassRole"
               ],
               "Resource": [
                   "*"
               ],
               "Effect": "Allow"
           }
       ]
   }
   ```

1. Click on "Review Policy"
1. Call it "PassRole" and then click "Create Policy"

#### Add IAM user credentials to Rosco

Using the "Access key ID" and "Secret access key" for your generated user, run this command in Halyard:

```bash
# You will be prompted for the secret access key
hal config provider aws bakery edit --aws-access-key "YOUR_ACCESS_KEY" --aws-secret-key
```

Then deploy your changes with this:

```bash
hal deploy apply
```

### AWS Bake Credentials using IAM Profiles

If you're using IAM Instance Roles, you need to provide credentials to Spinnaker to use to Bake by adding additional policies to the EC2 instances where Spinnaker is running.  The AWS account that you're baking in must also be configured as a Managed Account, and that Managed Account must be configured as the primary AWS account within Spinnaker.

These policies must have all permissions necessary to bake (for example, PowerUserAccess and associated PassRoles)

Spinnaker will always bake with the EC2 instance role (unless you specify explicit baking creds).  If you need to deploy to other accounts, update your Packer template to support sharing the baked image with other accounts.  For example, add this to your `builder` configuration in your packer template (and add the custom packer template following the instructions in [the Spinnaker Packer documentation](https://docs.armory.io/spinnaker-install-admin-guides/packer/)):

```json
    "ami_users": ["222222222222","333333333333"]
```

If you don't configure Rosco with explicit AWS credentials to use, Packer will default to the AWS permissions available to the Rosco container.  In general, this means that Packer will use the IAM Role/Profile attached to the Kubernetes nodes where Spinnaker is running.  In order for this to work, the IAM Role/Profile attached to your Kubernetes cluster will need a set of permissions to be able to create and interact with EC2 instances (and assign roles to those EC2 instances).

1. First, identify the IAM Profile attached to the Kubernetes cluster where Spinnaker is running.  If you're running EKS, this will be the role attached to the EKS EC2 worker nodes.
1. Go to the Role Summary for the IAM Profile, and click "Attach policies"
1. Find and select the AWS "PowerUserAccess" Policy
1. Click "Attach policy"
1. Click on "Add inline policy" (on the right).
1. Click on the "JSON" tab, and paste in this:

   ```json
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Action": [
                 "iam:PassRole"
               ],
               "Resource": [
                   "*"
               ],
               "Effect": "Allow"
           }
       ]
   }
   ```

1. Click on "Review Policy"
1. Call it "PassRole" and then click "Create Policy"

You don't have to configure anything in Halyard for this, since this role should be immediately available to your Rosco instance.

## Configuring AWS Networks

In addition to providing permissions for Rosco's packer to do Bake stages, if your AWS account doesn't have a default VPC / subnet, you can specify a default subnet to bake in with this:

```bash
hal config provider aws bakery edit --aws-subnet subnet-0123456789
hal deploy apply
```

Or, on a per-bake basis, you can specify what VPC and subnet to bake by adding these two extended attributes to the Bake stage:

* `aws_vpc_id`: `vpc-123456`
* `aws_subnet_id`: `subnet-0123456789`

## What exactly are packer scripts?

Spinnaker works best when deploying immutable artifacts to immutable machine images. When working with machine images, packer scripts are used during the **Bake Stage** to create an immutable machine image.

Spinnaker has a microservice called Rosco, which uses [Packer](https://www.packer.io/) to bake machine images (such as Amazon Machine Images or AMIs).  Out of the box, it comes with the packer templates and scripts listed [here](https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer).

By default, Rosco performs the following actions in a "Bake" stage:

* Takes a list of desired packages specified in the pipeline definition
* Identifies the `deb` files produced by your CI pipeline and matches those to the desired package
* Creates a set of Packer variables using the name/repository of the matched `deb` file(s)
* Bakes an AMI using the `aws-ebs.json` packer template (visible [here](https://github.com/spinnaker/rosco/blob/master/rosco-web/config/packer/aws-ebs.json))
* Runs the `install_packages.sh` script (visible [here](https://github.com/spinnaker/rosco/blob/master/rosco-web/config/packer/install_packages.sh)) to install the identified `deb` packages into the AMI
* Make the AMI ID available to later stages in the Spinnaker pipeline (such as deployments)

In a bake stage configuration, you can specify other packer templates to use.

If your app is using zip, tarballs or you'll need some customization, you'll need to create a new packer script (see below).

## Adding custom packer scripts to Armory Spinnaker

Out of the box, Armory Spinnaker comes with these built-in packer templates and scripts: https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer

If you'd like to add additional packer template or script files, you can add them via Halyard:

* If it does not already exist, create this directory: `~/.hal/<deployment-name>/profiles/rosco/packer/`
  * For example, if you're using the default Halyard deployment, then create this directory: `~/.hal/default/profiles/rosco/packer/`
* Add the templates and scripts to the created directory.
  * For example, if you have packer template `aws-custom.json` and script `setup-base.sh` and are using the `default` deployment in your Halyard configuration, then you'll end up with these files:
    * `~/.hal/default/profiles/rosco/packer/aws-custom.json`
    * `~/.hal/default/profiles/rosco/packer/setup-base.sh`
* Run `hal deploy apply` to apply your changes.  Your scripts will be added to a Kubernetes secret and added to the Rosco Kubernetes pod(s).

**Bake Configuration** in Spinnaker
Spinnaker can send pipeline variables such as `repository` to the packer script by adding it in the extended attributes. Some attributes are prefilled because of selecting `trusty` as the base OS.
![example](/images/Screen Shot 2017-09-05 at 4.34.58 PM.png)
