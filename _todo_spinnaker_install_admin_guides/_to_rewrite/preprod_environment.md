---
layout: post
title: Preprod Environment for Spinnaker
order: 110
published: false
---

{% include components/legacy_documentation.html %}

# What To Expect
{:.no_toc}
This guide should include:

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Why Do I Need A Preprod Environment?
Spinnaker is still actively being developed by a community of over 50 engineers across
many different large organizations and changes are happening rapidly. This introduces a level of risk that can be reduced by creating a preprod environment coupled with a suite of integration pipelines that exercise the base functionality of Spinnaker. Additionally, everyone's cloud environment is unique. Permissions, networking, authentication, baking, and cloud targets differ wildly from environment to environment. This will help add confidence into your deployment practices to practice continuous delivery with Spinnaker itself.

## Setting Up A Preprod Environment
When Armory Spinnaker starts, it looks for a property file that matches its [stack name]({% link _overview/naming-conventions.md %}).  This file should contain key/value pairs that it will use for its environment. It pulls this stack name from an environment file located at: `/etc/default/server-env`.  If you're using Armory Spinnaker, this file is managed for you by using [clouddriver's global userdata]({% link _admin_guides/userdata.md %}). If a file is found it is appended to `default.env` and generates a `resolved.env` for use.

For example, if the stack of your deploy is named `preprod`, Armory Spinnaker will look for a corresponding environment file named `/opt/spinnaker/env/preprod.env` and append those values to `default.env` should one exist.

### Notable Environment Properties
For your preprod environment you will want to have it match your production properties as closely as possible with the exception of a few environment properties described below.

##### S3 Properties
The following determines where Spinnaker will store persistent items like application details, pipelines, etc.  
It's critical that these are not the same as your production deployment.
```  
ARMORYSPINNAKER_S3_BUCKET=mycompany-preprod-spinnaker
ARMORYSPINNAKER_S3_PREFIX=front50
SPINNAKER_AWS_DEFAULT_REGION=us-west-2
```

##### Redis
Redis is used to maintain state of your cloud resources, pipeline executions, authentication sessions and other transient state. For your preprod environment you might want to use a local Redis instead of creating a new one using Elasticache.
```
LOCAL_REDIS=true
REDIS_HOST=redis
```

Otherwise, if you want to use an external Redis to more closely match your production setup, do the following:
```
LOCAL_REDIS=false
REDIS_HOST=armoryspinnaker-preprod.aaaaaaaaa.aa.0001.usw2.cache.amazonaws.com
```

##### Host Names
You'll need to create a new ELB for your preprod Spinnaker. These should have the same settings, healthcheck and listeners as your production setup. You'll likely want to apply friendly DNS records to the given name from AWS. Once they have been configured you'll need to change the addresses below.
```
API_HOST=https://spinnaker.preprod.mycompany.com:8084
DECK_HOST=https://spinnaker.preprod.mycompany.com
```

> Note: Make sure to remove your `DEFAULT_DNS_NAME` key from the environment file. Armory Spinnaker
will automatically create an internal network for the sub-services to communicate with each other.

##### Spring Profiles
Spinnaker's core framework is Spring. Spring uses a hierarchical profile loading system. You can create environment specific properties files that are loaded at runtime. Make sure to leave the `armory` profiles as the first one in the list, followed by your environment specific profiles. In the example below `preprod` takes the highest precedence.
```
SPRING_PROFILES_ACTIVE=armory,local,preprod
```

### Create a new Deploy Stage
Add a new deploy stage to your "Spinnaker Deploy Spinnaker" pipeline. When adding the stage and server group you can use production as the server template. You'll want to add a `manual judgement` or `integration test` stage following the deploy stage so you can confirm that your preprod environment is working as expected. Make sure to change the stack to the name chosen for your environment file, in this example: `preprod`.

![deploy configuration](/images/Image 2017-10-20 at 1.06.30 PM.png)

<br/>
Your finished pipeline should resemble the following:
<br/><br/>
![preprod environment](/images/Image 2017-10-20 at 1.06.00 PM.png)
