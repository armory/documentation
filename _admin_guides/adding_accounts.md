---
layout: post
title: Adding Accounts
order: 40
---
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
      accountId: "098765432101"
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
        "AWS": "arn:aws:iam::987654321123:role/SpinnakerInstanceProfile"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Below is the EC2 policy to use for allowing `SpinnakerInstanceProfile`.

```
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "Stmt1486065689000",
            "Effect": "Allow",
            "Action": [
                "autoscaling:CreateAutoScalingGroup",
                "autoscaling:CreateLaunchConfiguration",
                "autoscaling:CreateOrUpdateTags",
                "autoscaling:DeleteAutoScalingGroup",
                "autoscaling:DeleteLaunchConfiguration",
                "autoscaling:DeletePolicy",
                "autoscaling:DeleteScheduledAction",
                "autoscaling:DeleteTags",
                "autoscaling:DescribeAutoScalingGroups",
                "autoscaling:DescribeLaunchConfigurations",
                "autoscaling:DescribeLoadBalancers",
                "autoscaling:DescribePolicies",
                "autoscaling:DescribeScalingActivities",
                "autoscaling:DescribeScheduledActions",
                "autoscaling:DetachInstances",
                "autoscaling:DisableMetricsCollection",
                "autoscaling:PutLifecycleHook",
                "autoscaling:PutNotificationConfiguration",
                "autoscaling:PutScalingPolicy",
                "autoscaling:PutScheduledUpdateGroupAction",
                "autoscaling:ResumeProcesses",
                "autoscaling:SuspendProcesses",
                "autoscaling:TerminateInstanceInAutoScalingGroup",
                "autoscaling:UpdateAutoScalingGroup",
                "cloudwatch:DeleteAlarms",
                "cloudwatch:DescribeAlarms",
                "cloudwatch:GetMetricStatistics",
                "cloudwatch:ListMetrics",
                "cloudwatch:PutMetricAlarm",
                "ec2:AttachClassicLinkVpc",
                "ec2:AuthorizeSecurityGroupIngress",
                "ec2:CreateNetworkInterface",
                "ec2:CreateSecurityGroup",
                "ec2:CreateTags",
                "ec2:DeleteSecurityGroup",
                "ec2:DeleteTags",
                "ec2:DescribeAccountAttributes",
                "ec2:DescribeAddresses",
                "ec2:DescribeAvailabilityZones",
                "ec2:DescribeClassicLinkInstances",
                "ec2:DescribeImages",
                "ec2:DescribeInstances",
                "ec2:DescribeKeyPairs",
                "ec2:DescribeRegions",
                "ec2:DescribeReservedInstances",
                "ec2:DescribeReservedInstancesOfferings",
                "ec2:DescribeSecurityGroups",
                "ec2:DescribeSpotPriceHistory",
                "ec2:DescribeSubnets",
                "ec2:DescribeTags",
                "ec2:DescribeVpcClassicLink",
                "ec2:DescribeVpcs",
                "ec2:GetConsoleOutput",
                "ec2:ModifyImageAttribute",
                "ec2:ModifyInstanceAttribute",
                "ec2:RebootInstances",
                "ec2:RevokeSecurityGroupIngress",
                "ec2:TerminateInstances",
                "elasticloadbalancing:ApplySecurityGroupsToLoadBalancer",
                "elasticloadbalancing:ConfigureHealthCheck",
                "elasticloadbalancing:CreateLoadBalancer",
                "elasticloadbalancing:CreateLoadBalancerListeners",
                "elasticloadbalancing:CreateLoadBalancerPolicy",
                "elasticloadbalancing:DeleteLoadBalancer",
                "elasticloadbalancing:DeleteLoadBalancerListeners",
                "elasticloadbalancing:DeregisterInstancesFromLoadBalancer",
                "elasticloadbalancing:DeregisterTargets",
                "elasticloadbalancing:DescribeInstanceHealth",
                "elasticloadbalancing:DescribeLoadBalancerAttributes",
                "elasticloadbalancing:DescribeLoadBalancerPolicies",
                "elasticloadbalancing:DescribeLoadBalancers",
                "elasticloadbalancing:DescribeTargetGroups",
                "elasticloadbalancing:DescribeTargetHealth",
                "elasticloadbalancing:ModifyLoadBalancerAttributes",
                "elasticloadbalancing:RegisterInstancesWithLoadBalancer",
                "elasticloadbalancing:RegisterTargets",
                "elasticloadbalancing:SetLoadBalancerPoliciesOfListener",
                "iam:PassRole"
            ],
            "Resource": [
                "*"
            ]
        }
    ]
}
```
