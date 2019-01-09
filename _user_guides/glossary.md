---
layout: post
title: Glossary of Definitions
published : false
---

{% include components/legacy_documentation.html %}

<!-- For colin reference

- [Baking]({% link _spinnaker_user_guides/baking-images.md %}#troubleshooting)
- [Deploying]({% link _spinnaker_user_guides/deploying.md %}#common-errors-and-troubleshooting)
- [Expression language]({% link _spinnaker_user_guides/expression-language.md %}#troubleshooting) -->

Below is a list of words and phrases as they apply to Spinnaker and their definitions, including any additional information that may be helpful. 



#### Amazon Web Services
Amazon Web Services (AWS) is a cloud services provider from Amazon that offers computing power, database storage, content delivery and additional functionalities to businesses that operate in the cloud. For Spinnaker purposes, think of AWS as a data center but instead of being physical servers it is in the cloud.

#### Amazon Machine Images
Amazon Machine Images (AMIs) are predetermined 'templates' for instances that can be used to launch an instance of a virtual server. They generally include the configurations for the instance (Operating System, application server, applications), the permissions and Secrets that control which AWS accounts can access the instances, and a block device mapping that specifies the volumes to attach to the instance when it is launched.



#### [Application]({% link _spinnaker_user_guides/application-screen.md %}) 
An application inside Spinnaker represents what you would typically find in a single [code repository](#Code-Repository) - and in many cases, an application maps directly to a microservice.

#### Auto-Scaling Group
An auto-scaling group (ASG) contains a collection of [EC2](#elastic_compute_cloud) instances that share similar characteristics and are treated as a logical grouping for the purposes of instance scaling and management.


#### Authorization
Authorization (Auth) is the level of access to APIs that a user, application or role has within your [AWS](#Amazon_Web_Services) account. This is usually configured by your administrator. 


#### [Baking]({% link _spinnaker_user_guides/baking-images.md %})
The term 'baking' is used within Spinnaker to refer to the process of creating machine images, usually with [AMIs](#Amazon_Machine_Images).


#### Cloud
Short for cloud computing, the cloud as we refer to it is internet-based computing that provides processing resources (e.g.; database storage, networks, servers, applications) on demand to devices connected to the internet.

#### CloudDriver
A sub-service within Spinnaker. For more information, go to [sub-services]({% link _admin_guides/subservices.md %}#Clouddriver).

#### Cluster
A server group is a regional view of servers, whereas a cluster is a world-wide view of server groups. 


#### Code Repository
A source code repository is a private or public storage location for file archive and web hosting, used for source codes of software or web pages.

#### Continuous Delivery
Continuous Delivery (CD) is an engineering approach for DevOps teams to produce software in short cycles: building, testing, and releasing software at a fast and frequent pace in order to iterate as quickly as possible. 

#### Continuous Integration
Continuous Integration (CI) is a development practice where software developers merge their separate changes and updates to a main source code repository - usually multiple times a day. 


#### Deck
A sub-service within Spinnaker. For more information, go to [sub-services]({% link _admin_guides/subservices.md %}#Deck).

#### Debian Package
Debian packages (deb) are two tar archives contained in standard Unix ar archives - one holds the control information and the other contains the data used for installation. 


#### Detail 
For cluster and server group configurations, 'Detail' is usually any additional piece of user-defined information you want to label your cluster and server group(s) with.


#### Echo
A sub-service within Spinnaker. For more information, go to [sub-services]({% link _admin_guides/subservices.md %}#Echo).

#### Elastic Compute Cloud
Elastic Compute Cloud (EC2) is part of the AWS cloud platform, a "pay as you go" virtual computer renting system that contains preconfigured software and applications requested by the user. 



#### Execution
When a pipeline runs, the end result is called an execution. 


#### Gate
A sub-service within Spinnaker. For more information, go to [sub-services]({% link _admin_guides/subservices.md %}#Gate).


#### Igor
A sub-service within Spinnaker. For more information, go to [sub-services]({% link _admin_guides/subservices.md %}#Igor).

#### Infrastructure Version
The infrastructure's version number; such as v011, v012, etc. This is automatically appended and is not user defined. 

In AWS, Spinnaker will name your ASGs and Launch Configurations according to the naming convention mentioned above (ie. “armoryspinnaker-prod-polling-v015”). 

Please note that if your user definition includes a hyphen, it will disrupt the naming convention. 


#### [Jenkins]({% link _spinnaker_user_guides/working-with-jenkins.md %}) 
Jenkins is an open source automation server that can package applications for distribution. Spinnaker pipelines can be [triggered](#trigger) from a build on Jenkins.  


#### Lighthouse
A sub-service within Spinnaker. For more information, go to [sub-services]({% link _admin_guides/subservices.md %}#Armory_Lighthouse).


#### [Load Balancer]({% link _overview/load-balancers.md %}) 
For Spinnaker's purposes, a load balancer is a service that automatically distributes incoming traffic across all instances. The one most commonly used within AWS is the Elastic Load Balancer (ELB).


#### Orca
A sub-service within Spinnaker. For more information, go to [sub-services]({% link _admin_guides/subservices.md %}#Orca).


#### Pipeline
A pipeline in Spinnaker is a series of stages linked together that can be executed serially or in parallel. All pipelines are defined in the context of an application. A typical pipeline will contain stages for “creating images”, “testing”, and “deploying”. The process of “creating images” is also commonly referred to as a “bake”.

Learn to create [your first pipeline here]({% link _overview/your-first-pipeline.md %}).


#### Project
A project inside Spinnaker is a logical grouping of applications. For example, we might create a project called “Spinnaker” and its applications would be “Deck”, “Orca”, “Clouddriver”, etc. Spinnaker provides a helpful dashboard view using Deck for each project to visualize its applications and status of each application contained within it.

#### Rosco
A sub-service within Spinnaker. For more information, go to [sub-services]({% link _admin_guides/subservices.md %}#Rosco).

#### Server Group
From an Amazon Web Service (AWS) point of view, a server group is represented by an auto-scaling group (ASGs). All applications that are deployed by Spinnaker are deployed to server groups. 

#### Stack
You can think of a 'Stack' as a tag you give to anything that you want to be integrated together. Environments are usually a good example of something you would tag with a Stack. If you have an app that has an ELB, a Cache, and an [ASG](#auto-scaling-group), usually you would want to run integration tests on your staging environment separately from your production environment. In that case, you would give the staging ELB, Cache, and ASG all the “staging” stack, while prod ELB, Cache, and ASG would be the “prod” stack. 

Note that Stack names are defined by the user in the Spinnaker configuration User Interface (UI).


#### Stage
Within a pipeline, the tasks that pipeline performs are called stages.


#### Trigger
A trigger is the entry point to a [pipeline](#pipeline) - when a pipeline is triggered, it attempts to [execute](#execution).


