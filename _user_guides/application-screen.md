---
layout: post
order: 10
---

This guide should include:
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

An application within Spinnaker is a combination of clusters and load balancers. 

To get to the application details screen, select the 'Applications' tab on the top navigation bar in Spinnaker. Then pick an application from the list. It should load to a screen that looks like:

![](https://d1ax1i5f2y3x71.cloudfront.net/items/3c3P082f0q120y1S3B3i/Image%202017-04-03%20at%2012.49.10%20PM.png)

This is a view of all of the server groups (which make up your cluster), grouped by stack. In the image above, I have three server groups. Two server groups are in the 'hellodeploy-cron' stack, namely V948 and V947. Notice that V947 is greyed out and doesn't contain any instances. In other words, it is disabled and scaled down to zero. The last server group, V013, is in the 'hellodeploy-preprod' stack. It has one instance.

From here, we can click on different things:

## Cluster tab
Active Server group selected:

![](https://d1ax1i5f2y3x71.cloudfront.net/items/2t2u311i3g2v390K1C03/Image%202017-03-30%20at%205.48.23%20PM.png)


Disabled server group selected:

![](https://d1ax1i5f2y3x71.cloudfront.net/items/060n0q0H3g1i3f232S3v/Image%202017-03-30%20at%205.50.26%20PM.png)


Instance selected:

![](https://d1ax1i5f2y3x71.cloudfront.net/items/0U3F1F3M1K473u1l231W/Image%202017-03-30%20at%205.49.21%20PM.png)


Load balancer selected:

![](https://d1ax1i5f2y3x71.cloudfront.net/items/113q2V2u0L3L2b2s220n/Image%202017-03-30%20at%205.49.37%20PM.png)


## Load balancer tab

Load balancer selected:

![](https://d1ax1i5f2y3x71.cloudfront.net/items/02051M0v2s1K2q111N2i/Image%202017-03-30%20at%205.51.44%20PM.png)

## Pipelines

If you select the 'Pipelines' tab, you will see something like:

![](https://d1ax1i5f2y3x71.cloudfront.net/items/2w161Y0y04150d411Z3k/Image%202017-04-03%20at%2012.57.39%20PM.png)

This page shows two pipelines, 'Deploy' and 'Cron Deploy'. The 'Deploy' pipeline shows two executions, both labeled 'BUILD #5', this indicates that they were triggered by Jenkins' build #5. Clicking on the build number will take you to the Jenkins job. The red block on the second execution indicates that it has failed. If I click on the red part of the execution, it will expand into:

![](https://d1ax1i5f2y3x71.cloudfront.net/items/2Z35163w2q2f0b012R0w/Image%202017-04-03%20at%201.05.01%20PM.png)

Now I can see that the execution failed because of a subnet issue.


For more information about pipelines, check out the [pipeline guide]({% link _user_guides/pipelines.md %})


## Deleting an application

To delete an application, first click on the 'Applications' tab on Spinnaker's top navigation bar. Select the application you would like to delete and enter its application detail page. Now select the 'Config' tab. Scroll all the way down to the 'Delete Application' section. 

Example:
![](https://d1ax1i5f2y3x71.cloudfront.net/items/2c0Y1H3V2P44213s3Z32/Image%202017-04-03%20at%201.09.20%20PM.png)

You can see that in order to delete the application, you first need to delete its server groups. To delete its server groups, select the 'Clusters' tab. Now select a server group to delete by clicking on it. 

Example of V952 selected:
![](https://d1ax1i5f2y3x71.cloudfront.net/items/2x0r410r3e1y023b1z1q/Image%202017-04-03%20at%201.10.34%20PM.png)

Now press the 'Server Group Actions' from the bar on the right hand side and press 'Destroy'. Spinnaker will always ask you to confirm that you are going to delete this server group. 

Once all of the server groups have been deleted, navigate back to the 'Config'->'Delete Application' section and press "Delete Application'. 

![](https://d1ax1i5f2y3x71.cloudfront.net/items/0b0Z1N1l201p1d0x2n14/Image%202017-04-03%20at%201.15.56%20PM.png)
