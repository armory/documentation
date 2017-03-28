User and Administrative Guide: Nomenclature
This guide should:

- tell you what these words mean in context of Armory
- be searchable so you can find a word and its corresponding definition
- explain Spinnaker’s naming convention


Nomenclature of Domain definitions:

Application
An application inside Spinnaker represents what you would typically find in a single code repository - and in many cases, an application maps directly to a microservice.
https://cl.ly/1P3v3t3A2a3m

Cluster
A server group is a regional view of servers, whereas a cluster is a world-wide view of server groups. 
https://cl.ly/232k1N1M2h28

Execution
When a pipeline runs, the end result is called an execution. 
https://cl.ly/380d0T451n1h

Pipeline
A pipeline in Spinnaker is a series of stages linked together that can be executed serially or in parallel. All pipelines are defined in the context of an application. A typical pipeline will contain stages for “creating images”, “testing”, and “deploying”. The process of “creating images” is also commonly referred to as a “bake”.
https://cl.ly/0S2M272q2p1u

Project
A project inside Spinnaker is a logical grouping of applications. For example, we might create a project called “Spinnaker” and its applications would be “Deck”, “Orca”, “Clouddriver”, etc. Spinnaker provides a helpful dashboard view for each project to visualize its applications and status of each application contained within it.
https://cl.ly/2f390v1I3f3W

Server Group
From an Amazon Web Service (AWS) point of view, a server group is represented by an auto-scaling group (ASGs). All applications that are deployed by Spinnaker are deployed to server groups. 
https://cl.ly/232k1N1M2h28

Stage
Within a pipeline, the tasks that pipeline performs are called stages.
https://cl.ly/0S2M272q2p1u

Trigger
A trigger is the entry point to a pipeline. 
https://cl.ly/0S2M272q2p1u


Spinnaker Naming Conventions

Spinnaker has very specific naming conventions that help it identify resources in your cloud account. 

Clusters and server groups follow the convention `application_name``-``stack``-``detail``-``infrastructure_version`  


- Application Name is the name of your application in Spinnaker
- Stack refers to an environment like “prod”, “pre-prod”, “qa”, “stg” and “test”. Stacks are anything that requires integration tests to be run together. Stack names are defined by the user in the Spinnaker configuration User Interface (UI).
- Detail is also user-defined and can be any additional piece of information you want to label your cluster and server group with.
- Infrastructure Version is the version number of the infrastructure ie. v011, v012, etc. This is automatically appended and is not user defined. 

In AWS, Spinnaker will name your ASGs and Launch Configurations according to the naming convention above (ie. “armoryspinnaker-prod-polling-v015”). 

https://cl.ly/0l432s1a2w24

Please note that if your user definition includes a hyphen, it will disrupt the naming convention. 




