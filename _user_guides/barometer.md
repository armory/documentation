---
layout: post
title: Barometer
order: 75
published: False
# this only applies to ec2 installer, I think.
---

{% include components/legacy_documentation.html %}

# What is Barometer

Barometer is an automated canarying analysis (ACA) service that is provided through Armory Spinnaker. The goal of Barometer is to provide the end user with confidence that a deployment is safe through automation and intelligence.

Barometer uses real-time data sources to validate that a canary is good or bad. Today, Barometer supports the following real-time data sources:

* Elastic Search
* DataDog

## Overview
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Configuring A Canary Stage

If canarying is enabled for your instance, you should be able to see a stage for canarying:

![Canary Stage](/images/Image-2017-08-07-at-10.57.58-AM.png)

The canary stage starts by deploying 2 new server-groups: a `baseline` and `canary`.   The `baseline` server group is deployed with the AMI that was most recently deployed for the chosen template server-group.  The `canary` server group is deployed with release candidate AMI which is pull from a previous `Bake` or `Find Image` stage in the pipeline.  Once both server groups are up and "in service" the analysis will be begin.  The analysis is based on additional configuration below.

Once the canary stage has completed, _both_ the `canary` and `baseline` server group will be destroyed and the pipeline will continue, likely to a standard deployment stage.  By not including the canary as part of the production deployment stage it adds safety and isolation to the canary.  You can still choose to have your deployment to have a more sophisticated deployment which is completed in phases. 

### Deployment

![Canary Deployment](/images/Image-2017-08-07-at-11.01.19-AM.png)

`Canary Lifetime` - The total time period that the canary & baseline server will live and continue analysis before moving onto the next stage.


`Terminate unhealthy canary` - If the canary is unhealthy based on analysis it'll continue to collect and analyze information for this period of time until it considers the overall result of the canary a failure.


`Baseline version - Account & Clusters` - This is the baseline cluster to use for the canary analysis.  The Canary stage will find the AMI id from the latest deployed cluster and use this for the baseline server group.  In our screenshot above, the canary stage would deploy 2 new server groups: `armoryhellodeplloy-nightly-baseline` and `armoryhellodeplloy-nightly-canary`.


### Baseline/Canary Cluster Pair

This configuration determines how the canary will be deployed.  This looks similar to a server group deployment. The difference is that it is managed by Canary stage and has a limited lifespan as defined by `Canary Lifetime` above.  In most cases you'll want to put the canary behind the existing production load balancer which will drive a small percentage of traffic to your new canary and baseline server group.  You can specify a different load balancer but you'll be responsible for creating a different mechanism for traffic shaping.  


![Canary Pair Configuration](/images/Image-2017-08-07-at-11.39.16-AM.png)

## DataDog

If your Administrator has configured DataDog in your Barometer instance you'll be able to use the metrics and monitors stored in DataDog to inform Barometer on the health of your service.

### Metrics

The metrics stored in DataDog are compared between the canary and baseline using statistical analysis. Once the service determines that the canary is behaving abnormally it'll mark it as unhealthy. You can specify the metric name, tags, and allowed deviation. The name and tags correspond to metric names and tags within DataDog. The `deviation` is the number of standard deviations the canary must be to the baseline.

Consider this example:

![DataDog Metrics](/images/Image-2017-08-24-at-1.59.03-PM.png)

There are two metrics being considered.
- `system.net.bytes_sent` must be within `1.0` standard deviation of the baseline.
- `system.disk_used` limited to the tag `region:us-west-2` must be with half of a deviation.

### Metrics Dashboard

Barometer can automatically generate a DataDog dashboard showing the metrics you specify for all server groups involved in the canary. Just check the appropriate box under the DataDog section while configuring your canary stage.

### Monitors

You can use pre-existing monitors to fail the canary regardless of how it compares to its `baseline`.  This is good if you have absolute business rules such as "response times can't go over 50ms" or "Number of exceptions must be below 10 per minute".  Barometer does this by periodically checking the event stream for monitors that have failed and match the canary autoscaling group name.

#### Enabling the monitor

In your DataDog monitor you'll need to aggregate the metric by autoscaling group:
![ASG Metrics](/images/Image-2017-08-07-at-12.04.54-PM.png)

You'll also need to include the autoscaling group name in the monitor message by checking the box `Include Triggering tags in notification title`:


![include asg](/images/Image-2017-08-07-at-1.23.30-PM.png)


You can enable/disable this behavior by checking the box below.
![Disable monitor](/images/Image-2017-08-07-at-11.53.07-AM.png)

**Note:** If you aren't able to aggregate by autoscaling group this means either you're not logging through the DataDog agent that is usually placed on the instance or you need to enable `Auto Scaling` and `EC2` integrations from the DataDog integrations screen.

![enabling ec2 and autoscaling](/images/Image-2017-08-07-at-12.10.12-PM.png)

## Elastic Search

If ElasticSearch is configured by your Spinnaker Administrator you can take advantage of using ES queries to further analyze your canary deployments.

Barometer has the ability to run queries and compare the number of hits to constraints. You can set a maximum and/or minimum number of hits allowed by a query. Besides min and max, you can compare results between queries. A baseline query can be compared to a canary query. The `Deviation` field represents the percentage of difference allowed between the baseline and canary queries.

Consider this example:

![ElasticSearch configuration](/images/Image-2017-08-23-at-3.16.01-PM.png)

There are two checks being done here:
- The first check runs a single query. Specifically, it looks for a log line that reads, "Server Started." By setting `Min` to `1`, we are requiring that log line to appear at least once. Also note that this sort of check should be using in conjunction with the 'Warm-up period` settings to ensure that the application starts before the analysis begins.
- The second check compares the canary query to the baseline query. In this case, the canary query looks for errors involving the git hash of our deployment. The baseline query looks for errors that do not involve the git hash of our deployment. By settings `Deviation` to `5%`, we are requiring the difference between the canary and baseline queries to be less than 5%.


## Viewing A Canary Stage

Once a canary stage has been configured you can run the pipeline. You can select the stage in the pipeline execution to view the results.

Here is an example of a successful canary:

![successful canary](/images/Image-2017-08-24-at-2.05.41-PM.png)

If you select `History` you can expect to see something like:

![successful canary history](/images/Image-2017-08-24-at-2.07.18-PM.png)

Where `Type` represents whether or not the check was against a DataDog metric, a DataDog monitor, or an ElasticSearch query.

Alternatively, here is an example of a failed canary:

![failed canary](/images/Image-2017-08-24-at-2.09.38-PM.png)

We can see by the message that `system.net.bytes_sent` metric on the canary was `46.36` deviations away from the baseline.

Clicking on `History` for the failure also gives more details on the results:

![failed canary history](/images/Image-2017-08-24-at-2.15.26-PM.png)
