
TODO:
- How does Spinnaker monitor a deployment
  - polling, interval 30 seconds, potential rate limits
  - clouddriver is the main component



# Deploying


This guide should include:

- How to deploy AMIs
- TODO


Prerequisites and Assumptions:

- You are deploying to AWS
- You know how to create pipelines and utilize the [Bake stage](baking_images.md)
- You understand Spinnaker's [naming conventions](../overview/naming_conventions.md)
- You are familiar with ELB configuration
- You have already created a security group to use in your application


The primary objective of Spinnaker is to deploy your software. It would like you to [Bake an image](baking_images.md) and use that same image to deploy to all of your environments.

Spinnaker opinion of an application: load balancer, server groups

The typical type of distributed application that Spinnaker deploys is one with a cluster of homogeneous instances behind a load balancer. The load balancer is resposible for detecting healthy and unhealthy instances.

TODO: more detail about types of applications.

To start off, lets go through an example. This example continues from the example in the [Baking an image guide](baking_images.md).


## Example

First I go to the application screen to create a load balancer. Select the 'Load Balancers' tab:

https://cl.ly/3Y3c101b2E40


Press the '+' on the right to create a new load balancer. The screen that pops up looks like:

https://cl.ly/1B2j3N152A0P


I input 'example' into the 'Stack' field, set my [VPC Subnet Type](vpc-subnet-type), use my precreated security group, forward the correct ports and most importantly set my healthcheck. Finally, I press create.



Now to create get going on creating the Deploy stage in our pipeline,  I navigate to the configuration screen of the previously created pipeline from the [Baking guide](baking_images.md).

Select 'Add Stage' and select 'Deploy' from the 'Type' dropdown menu.

https://cl.ly/1E3i1J3B3l45

Now, I press the 'Add server group' option in the 'Deploy Configuration'

You'll be given the option copy a configuration from a currently running server group, if a server group for this application already exists. In my case, I select 'None' and continue. Now I see:

https://cl.ly/0V2z3s2X0R0z

I select the same 'VPC Subnet' type as the ELB I just made. Also, input 'example' to the 'Stack' field, since that is what was used when creating the ELB.

Im going



## Healthcheck type
- common issues/ troubleshooting

## UserData

## Deployment strategies

### Red/Black aka Blue/Green

### Highlander

### None


## Passing environment data to your deployed instances
- UDF0


## Rolling back
### Automatically
### Manually


## VPC Subnet Type

Throughout Spinnaker, Subnet Type is an abstraction of subnets within AWS.


You can find fields that you use to specify VPC Subnet type when creating load balancers, deploying server groups, etc. 

In order to use a subnet within Spinnaker, you will need to tag it in AWS a certain way.

There are two ways you can tag them. One option is to use the convention `spinnaker.<internal|external>.<region>` for the subnet's name. In the screenshot below, you can see that is what I have done on my subnets.

https://cl.ly/3p3P1i362J3l

Another option is to create a tag named `immutable_metadata` with value `{"purpose": "MySubnetNameInsideSpinnaker"}`

TODO: screenshot