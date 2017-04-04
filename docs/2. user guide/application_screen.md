# Applications

This guide should include:

- What an application is within Spinnaker
- Description of the Application detail page
- How to delete an application


An application within Spinnaker is a combination of clusters and load balancers. 

To get to the application details screen, select the 'Applications' tab on the top navigation bar in Spinnaker. Then pick an application from the list. It should load to a screen that looks like:

https://cl.ly/1N2A3a1x1S43

This is a view of all of the server groups (which make up your cluster), grouped by stack. In the image above, I have three server groups. Two server groups are in the 'hellodeploy-cron' stack, namely V948 and V947. Notice that V947 is greyed out and doesn't contain any instances. In other words, it is disabled and scaled down to zero. The last server group, V013, is in the 'hellodeploy-preprod' stack. It has one instance.

From here, we can click on different things:

## Cluster tab
Active Server group selected:

https://cl.ly/310G2r110v3P


Disabled server group selected:

https://cl.ly/2Z3D1S2c1Y1e


Instance selected:

https://cl.ly/052l1I0E2F3j


Load balancer selected:

https://cl.ly/463t3P2B0k3W


## Load balancer tab

Load balancer selected:

https://cl.ly/0R1J1W2S3q3f

## Pipelines

If you select the 'Pipelines' tab, you will see something like:

https://cl.ly/0M3Y09263m2e

This page shows two pipelines, 'Deploy' and 'Cron Deploy'. The 'Deploy' pipeline shows two executions, both labeled 'BUILD #5', this indicates that they were triggered by Jenkins' build #5. Clicking on the build number will take you to the Jenkins job. The red block on the second execution indicates that it has failed. If I click on the red part of the execution, it will expand into:

https://cl.ly/1E390F1y3T0x

Now I can see that the execution failed because of a subnet issue.


For more information about pipelines, check out the [pipeline guide](pipelines.md)


## Deleting an application

To delete an application, first click on the 'Applications' tab on Spinnaker's top navigation bar. Select the application you would like to delete and enter its application detail page. Now select the 'Config' tab. Scroll all the way down to the 'Delete Application' section. 

Example:
https://cl.ly/2j3P2o2k240m

You can see that in order to delete the application, you first need to delete its server groups. To delete its server groups, select the 'Clusters' tab. Now select a server group to delete by clicking on it. 

Example of V952 selected:
https://cl.ly/0r371A380m2V

Now press the 'Server Group Actions' from the bar on the right hand side and press 'Destroy'. Spinnaker will always ask you to confirm that you are going to delete this server group. 

Once all of the server groups have been deleted, navigate back to the 'Config'->'Delete Application' section and press "Delete Application'. 

https://cl.ly/1e3H1F2J3I16
