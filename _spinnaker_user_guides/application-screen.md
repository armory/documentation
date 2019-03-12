---
layout: post
published : true
order: 10
redirect_from:
  - /user-guides/application-screen/
  - /user_guides/application-screen/
  - /user-guides/application_screen/
  - /user_guides/application_screen/
  - /spinnaker_user_guides/application_screen/
  - /spinnaker_user_guides/application-screen/
  - /spinnaker-user-guides/application_screen/
---

This guide includes:
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

An application within Spinnaker is a combination of clusters and load balancers. 

To get to the application details screen, select the 'Applications' tab on the top navigation bar in Spinnaker. Then pick an application from the list. It should load to a screen that looks like:

![](/images/Image 2017-04-03 at 12.49.10 PM.png)

This is a view of all of the server groups (which make up your cluster), grouped by stack. In the image above, I have three server groups. Two server groups are in the 'hellodeploy-cron' stack, namely V948 and V947. Notice that V947 is greyed out and doesn't contain any instances. In other words, it is disabled and scaled down to zero. The last server group, V013, is in the 'hellodeploy-preprod' stack. It has one instance.

From here, we can click on different things:

## Cluster tab
Active Server group selected:

![](/images/Image 2017-03-30 at 5.48.23 PM.png)


Disabled server group selected:

![](/images/Image 2017-03-30 at 5.50.26 PM.png)


Instance selected:

![](/images/Image 2017-03-30 at 5.49.21 PM.png)


Load balancer selected:

![](/images/Image 2017-03-30 at 5.49.37 PM.png)


## Load balancer tab

Load balancer selected:

![](/images/Image 2017-03-30 at 5.51.44 PM.png)

## Pipelines

If you select the 'Pipelines' tab, you will see something like:

![](/images/Image 2017-04-03 at 12.57.39 PM.png)

This page shows two pipelines, 'Deploy' and 'Cron Deploy'. The 'Deploy' pipeline shows two executions, both labeled 'BUILD #5', this indicates that they were triggered by Jenkins' build #5. Clicking on the build number will take you to the Jenkins job. The red block on the second execution indicates that it has failed. If I click on the red part of the execution, it will expand into:

![](/images/Image 2017-04-03 at 1.05.01 PM.png)

Now I can see that the execution failed because of a subnet issue.


For more information about pipelines, check out the [pipeline guide]({% link _spinnaker_user_guides/pipelines.md %})


## Deleting an application

To delete an application, first click on the 'Applications' tab on Spinnaker's top navigation bar. Select the application you would like to delete and enter its application detail page. Now select the 'Config' tab. Scroll all the way down to the 'Delete Application' section. 

Example:
![](/images/Image 2017-04-03 at 1.09.20 PM.png)

You can see that in order to delete the application, you first need to delete its server groups. To delete its server groups, select the 'Clusters' tab. Now select a server group to delete by clicking on it. 

Example of V952 selected:
![](/images/Image 2017-04-03 at 1.10.34 PM.png)

Now press the 'Server Group Actions' from the bar on the right hand side and press 'Destroy'. Spinnaker will always ask you to confirm that you are going to delete this server group. 

Once all of the server groups have been deleted, navigate back to the 'Config'->'Delete Application' section and press "Delete Application'. 

![](/images/Image 2017-04-03 at 1.15.56 PM.png)
