---
layout: post
title: Nomenclature and Naming Conventions
order: 20
---

This guide should:

- tell you what these words mean in context of Armory
- be searchable so you can find a word and its corresponding definition
- explain Spinnaker’s naming convention


## Nomenclature of Domain definitions:

#### Application
An application inside Spinnaker represents what you would typically find in a single code repository - and in many cases, an application maps directly to a microservice.

![](https://d1ax1i5f2y3x71.cloudfront.net/items/3N0l3U0F2z3j1z202j17/Image%202017-03-24%20at%203.07.57%20PM.png)

#### Cluster
A server group is a regional view of servers, whereas a cluster is a world-wide view of server groups. 

![](https://d1ax1i5f2y3x71.cloudfront.net/items/1u2q3W3U3v3t1J0x3o1S/Image%202017-03-24%20at%203.05.04%20PM.png)

#### Execution
When a pipeline runs, the end result is called an execution. 

![](https://d1ax1i5f2y3x71.cloudfront.net/items/1h2V1U0n0h3D2D1X2T0c/Image%202017-03-24%20at%203.06.50%20PM.png)

#### Pipeline
A pipeline in Spinnaker is a series of stages linked together that can be executed serially or in parallel. All pipelines are defined in the context of an application. A typical pipeline will contain stages for “creating images”, “testing”, and “deploying”. The process of “creating images” is also commonly referred to as a “bake”.

![](https://d1ax1i5f2y3x71.cloudfront.net/items/2q0K2x0m31273u023H0Y/Image%202017-03-24%20at%203.06.29%20PM.png)

#### Project
A project inside Spinnaker is a logical grouping of applications. For example, we might create a project called “Spinnaker” and its applications would be “Deck”, “Orca”, “Clouddriver”, etc. Spinnaker provides a helpful dashboard view for each project to visualize its applications and status of each application contained within it.

![](https://d1ax1i5f2y3x71.cloudfront.net/items/1s2Z330i3v033f1u2u35/Image%202017-03-24%20at%203.08.23%20PM.png)

#### Server Group
From an Amazon Web Service (AWS) point of view, a server group is represented by an auto-scaling group (ASGs). All applications that are deployed by Spinnaker are deployed to server groups. 

![](https://d1ax1i5f2y3x71.cloudfront.net/items/1u2q3W3U3v3t1J0x3o1S/Image%202017-03-24%20at%203.05.04%20PM.png)

#### Stage
Within a pipeline, the tasks that pipeline performs are called stages.

![](https://d1ax1i5f2y3x71.cloudfront.net/items/2q0K2x0m31273u023H0Y/Image%202017-03-24%20at%203.06.29%20PM.png)

#### Trigger
A trigger is the entry point to a pipeline. 

![](https://d1ax1i5f2y3x71.cloudfront.net/items/2q0K2x0m31273u023H0Y/Image%202017-03-24%20at%203.06.29%20PM.png)


## Spinnaker Naming Conventions

Spinnaker has very specific naming conventions that help it identify resources in your cloud account. 

Clusters and server groups follow the convention `application_name``-``stack``-``detail``-``infrastructure_version`  


#### Application 
The Name is the name of your application in Spinnaker.

#### Stack
You can think of a stack like a tag you give to anything that you want to be integrated together. Environments are usually a good example. If you have an app that has an ELB, a Cache, and an ASG, usually you would want to run integration tests on your staging environment separately from your production environment. In that case, you would give the staging ELB, Cache, and ASG all the “staging” stack, while prod ELB, Cache, and ASG would be the “prod” stack. Stack names are defined by the user in the Spinnaker configuration User Interface (UI).

#### Detail 
Detail is also user-defined and can be any additional piece of information you want to label your cluster and server group with.

#### Infrastructure Version
The version number of the infrastructure ie. v011, v012, etc. This is automatically appended and is not user defined. 

In AWS, Spinnaker will name your ASGs and Launch Configurations according to the naming convention above (ie. “armoryspinnaker-prod-polling-v015”). 

![](https://d1ax1i5f2y3x71.cloudfront.net/items/3l332i3p3B1L1T0t0E2j/Image%202017-03-24%20at%203.10.53%20PM.png)

Please note that if your user definition includes a hyphen, it will disrupt the naming convention. 
