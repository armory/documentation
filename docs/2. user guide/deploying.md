# Deploying


This guide should include:

- How to deploy AMIs
- Common errors and troubleshooting


Prerequisites and Assumptions:

- You are deploying to Amazon Web Services (AWS)
- You know how to create pipelines and utilize the [Bake stage](baking_images.md)
- You understand Spinnaker's [naming conventions](../overview/naming_conventions.md)
- You are familiar with ELB configuration
- You have already created a security group to use in your application


The primary objective of Spinnaker is to deploy your software. It would like you to [Bake an image](baking_images.md) and use that same image to deploy to all of your environments.

The typical type of distributed application that Spinnaker deploys is one with a cluster of homogeneous instances behind a load balancer. The load balancer is responsible for detecting healthy and unhealthy instances.

To start off, let's go through an example. This example continues from the example in the [Baking an image guide](baking_images.md).


## Example

In this example we are going to deploy a simple web server that serves a page with details about its environment.

First I go to the application screen to create a load balancer. Select the 'Load Balancers' tab:

https://cl.ly/3Y3c101b2E40

Press the '+' on the right to create a new load balancer. The screen that pops up looks like:

https://cl.ly/1B2j3N152A0P

I input 'example' into the 'Stack' field, set my [VPC Subnet Type](vpc-subnet-type), use my pre-created security group, forward the correct ports and most importantly set my healthcheck. Finally, I press 'Create'.


Now to create the Deploy stage in our pipeline,  I navigate to the configuration screen of the previously created pipeline from the [Baking guide](baking_images.md).

Select 'Add Stage' and select 'Deploy' from the 'Type' dropdown menu.

https://cl.ly/1E3i1J3B3l45

Now, I press the 'Add server group' option in the 'Deploy Configuration'

You'll be given the option to copy a configuration from a currently running server group if a server group for this application already exists. In my case, I select 'None' and continue. Now I see:

https://cl.ly/0V2z3s2X0R0z

I select the same 'VPC Subnet' type as the ELB I just made. Remember to input 'example' to the 'Stack' field since that is what was used when creating the ELB.

For this example, I'm going to use a Red/Black (also known as Blue/Green) deployment strategy. Then I scroll down and select the load balancer that I just created from the list and select my pre-created security group.

Under the 'Instance Type' section, select 'Micro Utility'. I scroll all the way down to the 'Advanced Settings' section and change the 'Health Check Type' from 'EC2' to 'ELB'. I then erase the 'IAM Instance Profile' field. We do so in our example because we don't need access to any other AWS resources and the field may be filled in by default.

https://cl.ly/0M0E2x2H2c2u

Then press 'Add' to complete this step. After returning to the Deploy Stage Configuration screen, the Deploy Configuration section looks like:

https://cl.ly/3V1M1V2n2V1X

Finally, I press 'Save Changes' and select the 'Pipelines' tab to return to the Pipeline Executions screen.

I press 'Start Manual Execution' on my pipeline. This is what I see:

https://cl.ly/3M3q16220o35

As this deploy is happening, I can click on the 'Clusters' tab to see a new server group come up.

https://cl.ly/3a3H2y1o450J

For more information about the details of this screen, check out the [application screen description guide](application_screen.md)

I can see here that a new server has indeed come up and is healthy. Healthy in this case means that it has passed the ELB healthcheck. If you are having problems with your instances not passing the healthcheck, check out the [common errors section](#common-errors).

Now, to demonstrate the Blue/Green, I go back to the Pipeline Executions screen and press 'Start Manual Execution' again. Then I go back to the 'Clusters' tab to watch the execution process.

First I see that a new server group named `v001` is being created. It doesn't have any instances in it yet:
https://cl.ly/2X293L1J2m1Z

After a few moments an instance is created and is initially 'unhealthy':
https://cl.ly/0i1M3T370w2d

Once it passes its healthchecks and becomes healthy, it will visually indicate so by turning green. At this point Spinnaker will add the server group to the load balancer.
https://cl.ly/3a410Q3W0O3g

Immediately after that, the old server group is removed from the load balancer. Spinnaker will turn the old server group's instances blue. This means that they are disabled and no longer receiving traffic.

https://cl.ly/3Z3j3v2b0r37

Because of how I configured my deploy stage, the old Blue server group will stick around until I either manually scale it down or destroy it. If you like, you can configure your deploy stage to automatically scale down the old server group after the new one is healthy. 


## Common errors and troubleshooting

If you are having trouble try checking out some of these topics:

### Deploy times out

Often when your deploy stage is timing out, it is because your instances are never becomming healthy. In this case, Spinnaker will keep terminating and replacing the instances. 

### Investigating red instances

Select your red instance and hover your cursor over the red triangle next to the load balancer under the 'Status' section. This should display some helpful information for understanding why your instance is not deploying correctly.

https://cl.ly/3z2P3i0v3B3b

### Incorrect Healthcheck 

You have the option when deploying a new server group to use either EC2 or ELB healthchecking. When instances aren't passing this healthcheck they will be terminated and replaced. If you are experiencing strange behavior, double check that the correct healthcheck is selected.

### Deploy AZs vs ELB AZs

It is possible to set your ELB to work with certain AZs but then deploy your server group to another AZ. If you have your healthcheck set to ELB, then your instances will never become healthy. You can tell when this happens by hovering you mouse over the red triangle [described above](investigating-red-instances).

### Unkown errors

Sometimes you may encounter an 'Unknown Error' message when executing your deploy. Something like, "Shrink cluster: Exception: No reason provided." These errors are almost always caused by a field having an incorrect value in the deploy configuration. This particular "Shrink cluster" error was caused by the server group's region being invalid.


## Deployment strategies

### Red/Black (also known as Blue/Green)

This strategy will deploy a fresh server group and add it to the load balancer. The older server group will then be [disabled](#what-does-disabled-mean).

https://cl.ly/3y2G270F1q0b

When you configure this stragey you can choose to scale down the old server group. You can always scale it back up if you need it for a rollback. Also, you can choose how many old server groups to leave in the cluster.

### Highlander

This strategy will create a new server group and add it to the load balancer. Once everything is healthy, the old server group(s) will be destroyed.

### None

This strategy will deploy a new server group. It won't do anything about the older server groups. They will just all be in the load balancer together like one big happy family!


## What does disabled mean?

When an instance is disabled within Spinnaker, it is removed from all load balancers. Depending on how your application receives work, this may or may not stop your application from doing work. If your application receives work via the load balancer - like a web application - then it should actually be disabled. However, if you have an application that works similarly to pulling workloads off of a distributed queue (SQS, Kafka, etc), then removing it from a load balancer won't change anything. In fact, it was probably never in a load balancer.

You can re-enable a server group by selecting it from the 'Cluster' screen, click the 'Server Group Actions' button on the right panel and click 'Enable'.

## UserData

You can pass custom information to your deployed instances through the 'User Data' field under the 'Advanced Settings' section of the deploy stage configuration.

https://cl.ly/182M19133O0s

Make sure to base64 encode the content before putting it into the field in the options.


## Passing environment data to your deployed instances

The default configuration of ArmorySpinnaker creates a file `/etc/default/server-env` on every instance with information about its environment. In the example above, `server-env` looks like:
```
CLOUD_ACCOUNT="default-aws-account"
CLOUD_ACCOUNT_TYPE="default-aws-account"
CLOUD_ENVIRONMENT="default-aws-account"
CLOUD_SERVER_GROUP="test-example-v001"
CLOUD_CLUSTER="test-example"
CLOUD_STACK="example"
CLOUD_DETAIL=""
EC2_REGION="us-west-2"
LAUNCH_CONFIG="test-example-v001-03302017224619"
```


## Rolling back

Yup. Sometimes you need to rollback to a known previously working state. 

### Automatically

From the 'Cluster' tab, select a server group. Click the button on the right pane labeled 'Server Group Actions' and press 'Rollback'

https://cl.ly/0h1U0E3Y012k

In the window that pops up, you can select which server group to rollback to.

https://cl.ly/2z062i3E3O2f

The server group that you select will re-enabled and scaled up to the necessary number of replicas. Then the rolled back server group will be disabled.

### Manually

If you are ever in a situation where you need to roll back without Spinnaker, you can do so from the AWS console. You will basically run through the process that Spinnaker would do automatically:
- Scale up the older Auto Scaling Groups (ASG)
- Add those instances to the ELB
- Remove the newer ASG's instances from the ELB
- Scale down or delete the new ASG


## VPC Subnet Type

Throughout Spinnaker, Subnet Type is an abstraction of subnets within AWS.

You can find fields that you use to specify VPC Subnet type when creating load balancers, deploying server groups, etc. 

In order to use a subnet within Spinnaker, you will need to tag it in AWS a certain way.

There are two ways you can tag them. One option is to use the convention `spinnaker.<internal|external>.<region>` for the subnet's name. In the screenshot below, you can see that is what I have done on my subnets.

https://cl.ly/3p3P1i362J3l

Another option is to create a tag named `immutable_metadata` with value `{"purpose": "MySubnetNameInsideSpinnaker"}`
