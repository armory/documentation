---
layout: post
title: Configuring AWS Subnets
order: 24
redirect_from:
  - /install_guide/subnets/
  - /install-guide/subnets/
  - /spinnaker_install_admin_guides/aws-subnets/
  - /spinnaker_install_admin_guides/aws_subnets/
  - /spinnaker-install-admin-guides/aws_subnets/
---

# VPCs & Subnets
{:.no_toc}

Subnets determine where and how you can deploy AWS resources such as EC2 machines, ELBs and Security Groups.  Configuring your Subnets correctly the first time means you won't have to update your pipelines later with changes.

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Configuring Subnets
Spinnaker groups subnets into a single subnet name across multiple availability zones.  This makes it simpler for end-users of Spinnaker to choose a group of subnets within a VPC that have a given purpose such as `ec2-subnets`, `elb-subnets` or `public-subnets`.  This allows Spinnaker to place the machines within that group and ensure equal redundancy across zones. Below is a logical representation of how Spinnaker groups multiple subnets together.  If you want to **make a subnet accessible to Spinnaker** you'll have to add a tag and value to the subnet with the following: `immutable_metadata={"purpose":"example-purpose"}`

![subnet tags in AWS console](https://cl.ly/3t2D200c1j1i/Image%202017-10-05%20at%203.53.35%20PM.png)

Conceptually, this is how Spinnaker groups subnets logically.
![subnets groups](https://cl.ly/1z3z3x0L0E0w/Image%202017-04-18%20at%204.07.10%20PM.png)


## Verifying Subnet Configuration
Once you configured the purpose of your subnets you can use the Spinnaker API to double check that settings have been noticed. It will take between 30 seconds and 2 minutes for the changes to be picked up. After that time period you can run:
```
$ curl http://localhost:8084/subnets/aws
```
You can expect to receive a response similar to:
```[
  {
    "account": "default-aws-account",
    "availabilityZone": "us-west-1b",
    "availableIpAddressCount": 4088,
    "cidrBlock": "172.31.0.0/20",
    "deprecated": false,
    "id": "subnet-7bd69322",
    "purpose": "external",
    "region": "us-west-1",
    "state": "available",
    "target": null,
    "type": "aws",
    "vpcId": "vpc-63327b06"
  }
]
```
If the `purpose` field is non-null then things are configured correctly.

## I Don't See My Subnets or VPCs
Spinnaker caches as much as possible to keep performance through the UI responsive.  If you don't see the subnets and you believe you configured them correctly, then make sure to refresh the cache.  You can find the cache going to the _config_ section of your application and clicking _refresh all caches_.  You should also make sure to refresh your browswer cache by using your browser's development tools and deleting any browser databases.

![refresh all caches](https://d2ddoduugvun08.cloudfront.net/items/030K0N2F411T1J113J0g/%5B75a6d5a8966231fe9cfeba7a14d57864%5D_Image+2017-04-13+at+1.59.38+PM.png?X-CloudApp-Visitor-Id=2686178&v=a3c2b44c)
