---
layout: post
title: Adding Accounts
order: 70
---


This guide should include:

- Adding additional AWS Accounts to Clouddriver so that they're available for Deployments
- Background on Spinnaker's IAM policies and configuration


# Adding Additional AWS Accounts

Spinnaker supports adding multiple AWS accounts with some users reaching 100s of accounts in production.  Spinnaker uses AWS assume roles to create resources in the target account and then passes the role to a target instance profile if it's creating an instance resource.

## Spinnaker's Account Model
In AWS, Spinnaker relies on IAM policies to access temporary keys into configured accounts by [assuming a role](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_passrole.html).  This allows an administrator to limit and audit the actions that Spinnaker is taking in configured accounts.

![spinnaker assume role](https://d1ax1i5f2y3x71.cloudfront.net/items/1w1h3D3e1r2a2X1F3u3h/Image%202017-04-17%20at%208.32.48%20AM.png?X-CloudApp-Visitor-Id=2686178)

## Clouddriver Configuration

For adding additional accounts into Spinnaker you'll need to extend Clouddriver by adding your configuration into `clouddriver-local.yml`.  Here is an example of a Clouddriver configuration file that has 3 accounts as described above.

```
aws:
  defaultAssumeRole: role/SpinnakerManagedProfile
  accounts:

    - name: prod-account
      accountId: "198765432101"
      regions:
        - name: us-east-1
        - name: us-east-2
        - name: us-west-1

    - name: staging-account
      accountId: "123456789012"
      regions:
        - name: us-east-1
        - name: us-west-2

    - name: service-account
      accountId: "987654321123"
      regions:
        - name: us-east-1
```

You'll also have to set your default account in your `spinnaker-local.yml` file:

```
providers:
  aws:
    primaryCredentials:
      name: prod-account
```

## Assume Roles in IAM

You will need to create a `SpinnakerManagedProfile` role in the target AWS account (prod-account, staging-account, service-account) and give it the
correct trust policy in IAM.  Below is the trust policy you give the `SpinnakerManagedProfile` in the target account to allow the `SpinakerInstanceProfile`.

```
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::987654321123:role/SpinnakerManagedProfile"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Below is the latest EC2 policy to use for allowing `SpinnakerInstanceProfile`.

<script src="http://gist-it.appspot.com/https://github.com/Armory/spinnaker-aws-policy/blob/master/policies/latest/SpinnakerInstanceProfile.json"></script>
