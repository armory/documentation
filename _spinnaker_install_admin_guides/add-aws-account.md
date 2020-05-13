---
layout: post
title: "AWS: Deploying to AWS from Spinnaker (using IAM credentials)"
order: 33
# Change this to true when ready to publish
published: true
redirect_from:
  - /spinnaker_install_admin_guides/add-aws-account/
  - /spinnaker_install_admin_guides/add_aws_account/
  - /spinnaker-install-admin-guides/add_aws_account/
---

Once you have (OSS or Armory) Spinnaker up and running in Kubernetes, you'll want to start adding deployment targets.

Note that this document assumes the following conditions are true:

* Spinnaker was installed with Operator or Halyard.
* You have access to the Spinnaker config files, and a way to apply them (`kubectl` for Operator or `hal` for Halyard),
* You have a way to create AWS permissions, users, and roles.

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Overview

This document will guide you through the following:

* Understanding AWS deployment from Spinnaker

* Configuring Spinnaker to use AWS IAM Instance Roles (if Spinnaker is running on AWS, either via AWS EKS or installed directly on EC2 instances)
  * Creating a Managed Account IAM Role in each of your target AWS Accounts
  * Creating the default BaseIamRole for use when deploying EC2 instances
  * Creating a Managing Account IAM Policy in your primary AWS Account
  * Adding the Managing Account IAM Policy to the existing IAM Instance Role on the AWS nodes
  * Configuring the Managed Accounts IAM Roles to trust the IAM Instance Role from the AWS nodes
  * Adding the Managed Accounts to Spinnaker
  * Adding/Enabling the AWS Cloud Provider to Spinnaker

## Background: Understanding AWS Deployment from Spinnaker

Even though Spinnaker is installed in Kubernetes, it can be used to deploy to other cloud environments, such as AWS.  Rather than granting Spinnaker direct access to each of the target AWS accounts, Spinnaker will assume a role in each of the target accounts.

### Deploying

Spinnaker is able to deploy EC2 instances (via ASGs).

* Spinnaker's Clouddriver Pod should be able to assume a **Managed Account Role** in each deployment target AWS account, and use that role to perform any AWS actions.  This may include one or more of the following:
  * Create AWS Launch Configurations and Auto Scaling Groups to deploy AWS EC2 instances
  * Run ECS Containers
  * Run AWS Lambda Actions (alpha/beta as of the time of this document)
  * Create AWS CloudFormation Stacks (alpha/beta as of the time of this document)
* Clouddriver is configured with direct access to a **"Managing Account"** Policy (_it may be helpful to think of this as the **Master** or **Source** Policy_), which is accomplished in one of two ways:
  * If Spinnaker is running in AWS (either in AWS EKS, or with Kubernetes nodes running in AWS EC2), the Managing Account Policy can be made available to Spinnaker by adding it to the AWS nodes (EC2 instances) where the Spinnaker Clouddriver pod(s) are running.
    * _(You can also use Kube2IAM or similar capabilities, but this is not covered in this document)_
  * An IAM User with access to the Managing Account Policy can be passed directly to Spinnaker via an Access Key and Secret Access Key
* For each AWS account that you want Spinnaker to be able to deploy to, Spinnaker needs a **"Managed Account"** Role in that AWS account, with permissions to do the things you want Spinnaker to be able to do (_it may be helpful to think of this as a **Target Role**_)
* The Managing Account Role (Source/Master Role) should be able to assume each of the Managed Account Roles (Target Roles).  This requires two things:
  * The Managing Account Role needs a permission string for each Managed Account it needs to be able to assume.  _It may be helpful to think of this as an outbound permission._
  * Each Managed Account needs to have a trust relationship with the Managing Account User or Role to allow the Managing Account User or Role to assume it.  _It may be helpful to think of this as an inbound permission._

In addition, if you are deploying EC2 instances with AWS, you will need to provide an IAM role for each instance.  If you do not specify a role, Spinnaker will attempt to use a role called `BaseIAMRole`.  So you should create a BaseIAMRole (potentially with no permissions).

### Example

Here's an example situation:

* We would like Spinnaker to deploy to three AWS accounts, with account IDs 111111111111, 222222222222, and 333333333333.  Each of these is a *Managed Account*
* Choose one account (111111111111), that Spinnaker will log into directly.  This is the *Managing Account*
* We will end up with four IAM entities:
  * A *Managing Account User* in account 111111111111 (`arn:aws:iam::111111111111:user/managingAccount`)
  * A *Managed Account Role* in account 111111111111 (`arn:aws:iam::111111111111:role/spinnakerManaged`)
  * A *Managed Account Role* in account 222222222222 (`arn:aws:iam::222222222222:role/spinnakerManaged`)
  * A *Managed Account Role* in account 333333333333 (`arn:aws:iam::333333333333:role/spinnakerManaged`)
* The *Managing Account User* needs these permissions:
  * The `sts:AssumeRole` permission for each of the Managed Account Roles
  * The `ec2:DescribeAvailabilityZones` permission
  * The `ec2:DescribeRegions` permission
* Each *Managed Account Role* needs these:
  * **PowerUserAccess**
  * The `iam:PassRole` permission for roles that will be assigned to EC2 instances that are being deployed
  * A trust relationship with the Managing Account User (to allow the Managing Account User to assume the Managed Account Role)

### Configuration

**Operator**

Here's a sample `SpinnakerService` manifest block that supports the above:

```yaml
apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    config:
      providers:
        aws:
          enabled: true
          accounts:
          - name: aws-1
            requiredGroupMembership: []
            providerVersion: V1
            permissions: {}
            accountId: '111111111111'
            regions:
            - name: us-east-1
            - name: us-west-2
            assumeRole: role/spinnakerManaged
          - name: aws-2
            requiredGroupMembership: []
            providerVersion: V1
            permissions: {}
            accountId: '222222222222'
            regions:
            - name: us-east-1
            - name: us-west-2
            assumeRole: role/spinnakerManaged
          - name: aws-3
            requiredGroupMembership: []
            providerVersion: V1
            permissions: {}
            accountId: '333333333333'
            regions:
            - name: us-east-1
            - name: us-west-2
            assumeRole: role/spinnakerManaged
          # Because we're baking in 111111111111, this must match the accountName that is associated with 111111111111
          primaryAccount: aws-1
          bakeryDefaults:
            templateFile: aws-ebs-shared.json
            # These creds are for our Baking IAM user in account 111111111111
            awsAccessKey: ABC123
            awsSecretKey: abc123
            baseImages: []
            awsAssociatePublicIpAddress: true
            defaultVirtualizationType: hvm
          accessKeyId: DEF456
          secretAccessKey: def456
          defaultKeyPairTemplate: '{{name}}-keypair'
          defaultRegions:
          - name: us-west-2
          defaults:
            iamRole: BaseIAMRole
```

**Halyard**

Here's a sample halconfig `aws` YAML block that supports the above:

```yml
aws:
  enabled: true
  accounts:
  - name: aws-1
    requiredGroupMembership: []
    providerVersion: V1
    permissions: {}
    accountId: '111111111111'
    regions:
    - name: us-east-1
    - name: us-west-2
    assumeRole: role/spinnakerManaged
  - name: aws-2
    requiredGroupMembership: []
    providerVersion: V1
    permissions: {}
    accountId: '222222222222'
    regions:
    - name: us-east-1
    - name: us-west-2
    assumeRole: role/spinnakerManaged
  - name: aws-3
    requiredGroupMembership: []
    providerVersion: V1
    permissions: {}
    accountId: '333333333333'
    regions:
    - name: us-east-1
    - name: us-west-2
    assumeRole: role/spinnakerManaged
  # Because we're baking in 111111111111, this must match the accountName that is associated with 111111111111
  primaryAccount: aws-1
  bakeryDefaults:
    templateFile: aws-ebs-shared.json
    baseImages: []
    # These creds are for our Baking IAM user in account 111111111111
    awsAccessKey: ABC123
    awsSecretKey: abc123
    awsAssociatePublicIpAddress: true
    defaultVirtualizationType: hvm
  accessKeyId: DEF456
  secretAccessKey: def456
  defaultKeyPairTemplate: '{{name}}-keypair'
  defaultRegions:
  - name: us-west-2
  defaults:
    iamRole: BaseIAMRole
```

## Prerequisites

This document assumes the following:

* Your Spinnaker is up and running
* Your Spinnaker was installed and configured via Operator or Halyard
* If you're using Operator, you have a access to run `kubectl` commands against the cluster where Spinnaker is installed. If you're using Halyard, you have access to it
* You have permissions to create IAM roles using IAM policies and permissions, in all relevant AWS accounts
  * You should also be able to set up cross-account trust relationships between IAM roles.
* If you want to add the IAM Role to Spinnaker via an Access Key/Secret Access Key, you have permissions to create an IAM User
* If you want to add the IAM Role to Spinnaker via IAM instance profiles/policies, you have permissions to modify the IAM instance

_All configuration with AWS in this document will be handled via the browser-based AWS Console.  All configurations could **alternatively** be configured via the `aws` CLI, but this is not currently covered in this document._

Also - we will be granting AWS Power User Access to each of the Managed Account Roles.  You could optionally grant fewer permisisons, but those more limited permissions are not covered in this document.

## Configuring Spinnaker to access AWS using an IAM User (with an Acess Key ID and Secret Access Key)

If you are not running Spinnaker on AWS, or if you do not want to use AWS IAM roles (or don't have the ability to modify the roles attached to your Kubernetes instances), you can create an AWS IAM user and provide its credentials to Clouddriver to allow Clouddriver to interact with the various AWS APIs across multiple AWS Accounts.

### IAM User Part 1: Creating a Managed Account IAM Role in each your target AWS Accounts

In each account that you want Spinnaker to deploy to, you should create an IAM role for Spinnaker to assume.

For each account you want to deploy to, perform the following:

1. Log in to the browser-based AWS Console
1. Navigate to the IAM page (click on "Services" at the top, then on "IAM" under "Security, Identity, & Compliance")
1. Click on "Roles" on the left hand side
1. Click on "Create role"
1. For now, for the "Choose the service that will use this role", select "EC2".  We will change this later, because we want to specify an explicit consumer of this role later on.
1. Click on "Next: Permissions"
1. Search for "PowerUserAccess" in the search filter, and select the Policy called "PowerUserAcces"
1. Click "Next: Tags"
1. Optionally, add tags that will identify this role.
1. Click "Next: Review"
1. Enter a Role Name.  For example, "DevSpinnakerManagedRole".  Optionally, add a description, such as "Allows Spinnaker Dev Cluster to perform actions in this account."
1. Click "Create Role"
1. In the list of Roles, click on your new Role (you may have to scroll down or filter for it).
1. Click on "Add inline policy" (on the right).
1. Click on the "JSON" tab, and paste in this:

   ```json
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Action": [
                   "iam:ListServerCertificates",
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

1. Click "Review Policy"
1. Call it "PassRole-and-Certificates", and click "Create Policy"
1. Copy the Role ARN and save it.  It should look something like this: `arn:aws:iam::123456789012:role/DevSpinnakerManagedRole`.  **This will be used in the section "IAM User Part 3" and in section "IAM User Part 6"**

You will end up with a Role ARN for each Managed / Target account.  The Role names do not have to be the same (although it is a bit cleaner if they are).  For example, you may end up with roles that look like this:

* `arn:aws:iam::123456789012:role/DevSpinnakerManagedRole`
* `arn:aws:iam::123456789013:role/DevSpinnakerManagedRole`
* `arn:aws:iam::123456789014:role/DevSpinnakerManaged`

### IAM User Part 2: Creating the BaseIAMRole for EC2 instances

When deploying EC2 instances, Spinnaker currently requires that you attach a role for each instance (even if you don't want to grant the instance any special permissions.  If you do not specify an instance role, Spinnaker will default to a role called `BaseIAMRole`, and it will throw an error if this does not exist.  Therefore, you should at a minimum create an empty role called BaseIAMRole.

1. Log into the browser-based AWS Console
1. Navigate to the IAM page (click on "Services" at the top, then on "IAM" under "Security, Identity, & Compliance")
1. Click on "Roles" on the left side
1. Click "Create role"
1. Select "EC2", and click "Next: Permissions"
1. Click "Next: Tags"
1. Optionally, add tags if required by your organization.  Then, click "Next: Review".
1. Specify the Role Name as "BaseIAMRole"

### IAM User Part 3: Creating a Managing Account IAM Policy in your primary AWS Account

In the account that Spinnaker lives in (i.e., the AWS account that owns the EKS cluster where Spinnaker is installed), create an IAM Policy with permissions to assume all of your Managed Roles.

1. Log into the AWS account where Spinnaker lives, into the browser-based AWS Console
1. Navigate to the IAM page (click on "Services" at the top, then on "IAM" under "Security, Identity, & Compliance")
1. Click on "Policies" on the left hand side
1. Click on "Create Policy"
1. Click on the "JSON" tab, and paste in the following:

   ```json
   {
       "Version": "2012-10-17",
       "Statement": [
           {
               "Effect": "Allow",
               "Action": [
                   "ec2:DescribeAvailabilityZones",
                   "ec2:DescribeRegions"
               ],
               "Resource": [
                   "*"
               ]
           },
           {
               "Action": "sts:AssumeRole",
               "Resource": [
                   "arn:aws:iam::123456789012:role/DevSpinnakerManagedRole",
                   "arn:aws:iam::123456789013:role/spinnakerManaged",
                   "arn:aws:iam::123456789014:role/DevSpinnakerManaged"
               ],
               "Effect": "Allow"
           }
       ]
   }
   ```

1. Update the `sts:AssumeRole` block with the list of Managed Roles you created in **IAM User Part 1**.
1. Click on "Review Policy"
1. Create a name for your policy, such as "DevSpinnakerManagingPolicy".  Optionally, add a descriptive description.  Copy the name of the policy.  **This will be used in the next section, "IAM User Part 4"**
1. On the list policies, click your newly-created Policy.

_(This policy could also be attached inline directly to the IAM User, rather than creating a standalone policy)_

### IAM User Part 4: Creating a Managing Account IAM User with access to the Managing Account Policy

The IAM user we're creating can be in any AWS account, although it may make sense to place it in the same account where Spinnaker lives if Spinnaker is installed in AWS.

1. Log into the AWS account where Spinnaker lives, into the browser-based AWS Console
1. Navigate to the IAM page (click on "Services" at the top, then on "IAM" under "Security, Identity, & Compliance")
1. Click on "Users" on the left side
1. Click on "Add user"
1. Specify a logical user name, such as "DevSpinnakerManagingAccount"
1. Check the "Programmatic access" checkbox
1. Select "Attach existing policies directly"
1. Find the policy you created in "IAM User Part 2". and select it with the checkbox.
1. Click "Next: Tags"
1. Optionally, add tags that will identify this user
1. Click "Next: Review"
1. Click "Create user"
1. Copy the "Access key ID" and "Secret access key" (you'll have to click "Show").  **This will be used later, in "IAM User Part 6"**
1. Click "Close"
1. Click on the "User name" for the user that you just created.
1. Copy the "User ARN".  This will look something like this: `arn:aws:iam::123456789010:user/DevSpinnakerManagingAccount`.  **This will be used in the next section, "IAM User Part 5"**

### IAM User Part 5: Configuring the Managed Accounts to trust the Managing Account IAM User

Now that we know what user will be assuming each of the Managed Roles, we must configure the Managed Roles (Target Roles) to trust and allow the Managing (Assuming) User to assume them.  This is called a "Trust Relationship" and is configured each of the Managed Roles (Target Roles).

For each account you want to deploy to, perform the following:

1. Log into the browser-based AWS Console
1. Navigate to the IAM page (click on "Services" at the top, then on "IAM" under "Security, Identity, & Compliance")
1. Click on "Roles" on the left hand side
1. Find the Managed Role that you created earlier in this account, and click on the Role Name to edit the role.
1. Click on the "Trust relationships" tab.
1. Click on "Edit trust relationship"
1. Replace the Policy Document with this (Update the ARN with the User ARN from "IAM User Part 4")

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Principal": {
           "AWS": [
             "arn:aws:iam::123456789010:user/DevSpinnakerManagingAccount"
           ]
         },
         "Action": "sts:AssumeRole"
       }
     ]
   }
   ```

1. Click "Update Trust Policy", in the bottom right.

### IAM User Part 6: Adding the Managing Account User and Managed Accounts to Spinnaker

The Clouddriver pod(s) should be now able to assume each of the Managed Roles (Target Roles) in each of your Deployment Target accounts.  We need to configure Spinnaker to be aware of the accounts and roles it is allowed to consume.

**Operator**

For each of the Managed (Target) accounts you want to deploy to, add a new entry to the `accounts` array in `SpinnakerService` manifest as follows:

```yaml
apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    config:
      providers:
        aws:
          enabled: true
          accounts:
          - name: aws-dev-1                   # Should be a unique name which is used in the Spinnaker UI and API  to identify the deployment target.  For example, aws-dev-1 or aws-dev-2
            requiredGroupMembership: []
            providerVersion: V1
            permissions: {}
            accountId: '111111111111'         # Should be the account ID for the Managed Role (Target Role) you are  assuming.  For example, if the role ARN is arn:aws:iam::123456789012:role/ DevSpinnakerManagedRole, then ACCOUNT_ID would be 123456789012
            regions:                          # Configure the regions you want to deploy to
            - name: us-east-1
            - name: us-west-2
            assumeRole: role/spinnakerManaged # Should be the full role name within the account, including the type of object (role). For example, if the role ARN is arn:aws:iam::123456789012:role/DevSpinnakerManagedRole, then ROLE_NAME would be role/DevSpinnakerManagedRole
          primaryAccount: aws-dev-1
          bakeryDefaults:
            templateFile: aws-ebs-shared.json
            baseImages: []
            awsAssociatePublicIpAddress: true
            defaultVirtualizationType: hvm
            # These creds are for our Baking IAM user in account 111111111111
            awsAccessKey: ABC123
            awsSecretKey: abc123
          accessKeyId: DEF456                 # AWS access key and secret access key from "IAM User Part 4"
          secretAccessKey: def456             # AWS access key and secret access key from "IAM User Part 4"
          defaultKeyPairTemplate: '{{name}}-keypair'
          defaultRegions:
          - name: us-west-2
          defaults:
            iamRole: BaseIAMRole
```

**Halyard**

For each of the Managed (Target) accounts you want to deploy to, perform the following from your Halyard instance:

1. Run the following command with these fields updated:

    * `AWS_ACCOUNT_NAME` should be a unique name which is used in the Spinnaker UI and API  to identify the deployment target.  For example, `aws-dev-1` or `aws-dev-2`
    * `ACCOUNT_ID` should be the account ID for the Managed Role (Target Role) you are  assuming.  For example, if the role ARN is `arn:aws:iam::123456789012:role/DevSpinnakerManagedRole`, then ACCOUNT_ID would be `123456789012`
    * `ROLE_NAME` should be the full role name within the account, including the type of  object (`role`).  For example, if the role ARN is `arn:aws:iam::123456789012:role/DevSpinnakerManagedRole`, then ROLE_NAME would be `role/DevSpinnakerManagedRole`

   ```bash
   # Enter the account name you want Spinnaker to use to identify the deployment target,
   # as well as the account ID, and the role name.
   export AWS_ACCOUNT_NAME=aws-dev-1
   export ACCOUNT_ID=123456789012
   export ROLE_NAME=role/DevSpinnakerManagedRole

   hal config provider aws account add ${AWS_ACCOUNT_NAME} \
       --account-id ${ACCOUNT_ID} \
       --assume-role ${ROLE_NAME}
   ```

2. Optionally, edit the account with additional options such as those indicated in the [Halyard documentation](https://www.spinnaker.io/reference/halyard/commands/#hal-config-provider-aws-account-edit).  For example, to set the regions that you can deploy to:

   ```bash
   export AWS_ACCOUNT_NAME=aws-dev-1
   hal config provider aws account edit ${AWS_ACCOUNT_NAME} \
       --regions us-east-1,us-west-2
   ```

### IAM User Part 7: Adding/Enabling the AWS CloudProvider configuration to Spinnaker

**Operator**

Apply the changes done in `Spinnakerservice` manifest:

```bash
kubectl -n <spinnaker namespace> apply -f <SpinnakerService manifest file>
```

**Halyard**

Once you've added all of the Managed (Target) accounts, run these commands to set up and enable the AWS cloudprovider setting as whole (this can be run multiple times with no ill effects):

1. Add the AWS access key and secret access key from "IAM User Part 4" using Halyard (don't forget to provide the correct access key).

   ```bash
   export ACCESS_KEY_ID=AKIA1234567890ABCDEF
   hal config provider aws edit --access-key-id ${ACCESS_KEY_ID} \
       --secret-access-key # do not supply the key here, you will be prompted
   ```

2. Enable AWS Provider

   ```bash
   hal config provider aws enable
   ```

3. Apply all Spinnaker changes:

   ```bash
   # Apply changes
   hal deploy apply
   ```
