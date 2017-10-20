---
layout: post
title: Preprod Environment
order: 110
published: true
---

# What To Expect
This guide should include:
- Why you will need a preprod environment
- How to setup a staging environment
- How to create a suite of integration pipelines to validate your staging environment


## Why Do I Need A preprod Environment?
Spinnaker is still actively being developed by a community of over 50 engineers across
many different large organizations.  This introduces a level of risk that needs can be reduced
by creating a staging environment coupled with a suite of integration pipelines.  Additionally,
everyone's cloud environment is unique. Permissions, networking, authentication, bake process, and cloud targets differ wildly from environment to environment.  This will help add confidence into your deployment practices to practice continous delivery with Spinnaker itself

## Setting Up A preprod Environment
When Armory Spinnaker starts, it looks for a property file that matches it's [stack name]({% link _overview/naming-conventions.md %}).  This file should contain key/value pairs that it'll use for it's environment.  
It pulls this stack name from an environment file located here: `/etc/default/server-env`.  If you're using Armory Spinnaker, this file is managed for you by using [clouddriver's global userdata]({% link _admin_guides/userdata.md %}). This file is appended to `default.env` and generates `resolved.env` for final use.

For example, if the stack of your deploy is named `preprod`, Armory Spinnaker will look for a corresponding environment file named `/opt/spinnaker/env/preprod.env`.  
![](https://cl.ly/1J1Q0N2e3c3J/Image%202017-10-18%20at%208.06.21%20PM.png)

### Notable Environment Properties
For your preprod environment you will want to have it match your production properties as closely as possible with the exception of a few environment properties described below.

##### S3 Properties
The following determines where Spinnaker will store persitent items like application details, pipelines, etc.  
It's critical that these are not the same as your production deployment.
```  
ARMORYSPINNAKER_S3_BUCKET=armory-spkr
ARMORYSPINNAKER_S3_PREFIX=front50
SPINNAKER_AWS_DEFAULT_REGION=us-west-2
```

##### Redis
Redis is used for keep state of your cloud resources, pipeline executions, authentication sessions and other transient state.  For your preprod environment you might want to use a local Redis instead of creating
```
LOCAL_REDIS=true
REDIS_HOST=redis
```

otherwise if you want to use an external Redis to closer match your production setup do the following:
```
LOCAL_REDIS=false
REDIS_HOST=armoryspinnaker-preprod.aaaaaaaaa.ng.0001.usw2.cache.amazonaws.com
```

##### HOST NAMES
You'll need to create a new ELB for Spinnaker to . . These should have the same settings as your production setup. You'll likely want to apply DNS records to the given name from AWS.  Once they have been configured you'll need to change the addresses below.  Note, `DEFAULT_DNS_NAME` refers to the internal ELB.
```
API_HOST=https://spinnaker.armory.io:8084
DECK_HOST=https://spinnaker.armory.io
```

> Note: Make sure to remove your `DEFAULT_DNS_NAME` key from the environment file.  Armory Spinnaker
will automatically create an internal network for the subservices to communicate with each other.

##### SPRING PROFILES
Spinnaker's core framework is Spring.  Spring uses a hierarchical profiles loading system.  You can create environment specific properties files that are loaded at runtime.  Make sure to leave the `armory` profiles as the first one in the list.
```
SPRING_PROFILES_ACTIVE=armory,local,preprod
```


### Create a new Deploy Stage


## Integration Tests Using Pipelines
