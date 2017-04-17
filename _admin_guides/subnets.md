---
layout: post
order: '110'
---
# VPCs & Subnets

Subnets determine where and how you can deploy AWS resources such as EC2 machines, ELBs and Security Groups.  Configuring your Subnets correctly the first time means you won't have to update your pipelines later with changes.

## Configuring Subnets
Spinnaker groups subnets into a single subnet name across multiple availability zones.  This makes it simpler for end-users of Spinnaker to choose a group of subnets within a VPC that have a given purpose such as `ec2-subnets`, `elb-subnets` or `public-subnets`.  This allows Spinnaker to place the machines within that group and ensure equal redundancy across zones. Below is a logical representation of how Spinnaker groups multiple subnets together.  If you want to make a subnet accessible to Spinnaker you'll have to add a tag and value to with the following `immutable_metadata={"purpose":"example-purpose"}`

![subnets groups](https://cl.ly/1d2z052Z3O3v/Image%202017-04-14%20at%2012.06.16%20PM.png)

## I Don't See My Subnets or VPCs
Spinnaker caches as much as possible to keep performance through the UI responsive.  If you don't see the subnets and you believe you configured them correctly per the instructions then make sure to refresh the cache.  You can find the cache going to the _config_ section of your application and clicking _refresh all caches_.  You should also make sure to refresh your browswer cache by using your browser's development tools and deleting any browser database.

![refresh all caches](https://d1ax1i5f2y3x71.cloudfront.net/items/030K0N2F411T1J113J0g/%5B75a6d5a8966231fe9cfeba7a14d57864%5D_Image+2017-04-13+at+1.59.38+PM.png?X-CloudApp-Visitor-Id=2686178&v=a3c2b44c)
