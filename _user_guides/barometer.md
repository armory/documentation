---
layout: post
title: Barometer
order: 70
published: True
---

# What is Barometer

Barometer is a automated canarying analysis (ACA) service that is provided through Armory Spinnaker.  The goal for barometer is to provide confidence through automation and intelligence.

While Barometer aims to work with many different data providers, it currently works with the following data providers:

* Elastic Search
* Datadog

## Configuring A Canary Stage

If canarying is enabled for your instance, you should be able to see a stage for canarying:

![Canary Stage](https://cl.ly/2H0T1P1j2J15/Image%202017-08-07%20at%2010.57.58%20AM.png)

The canary stage starts by deploying 2 new server-groups: a `baseline` and `canary`.   The `baseline` server group is deployed with the AMI that was most recently deployed for the chosen template server-group.  The `canary` server group is deployed with release candidate AMI which is pull from a previous `Bake` or `Find Image` stage in the pipeline.  Once both server groups are up and "in service" the analysis will be begin.  The analysis is based on additional configuration below.

Once the canary passes _both_ the `canary` and `baseline` server group will be destroyed and then the pipeline will continue, likely a standard deployment stage.  By not including the canary as part of the production deployment stage it adds safety and isolation to the canary.  If there are errors or problems during the canarying stage it makes clean up simple because this stage isn't considered a canary stage.  You can still choose to have your deployment to have a more sophisticated deployment which is completed in phases.  

### Deployment

![Canary Deployment](https://cl.ly/1J1H0W2d2R15/Image%202017-08-07%20at%2011.01.19%20AM.png)

`Canary Lifetime` - The total time period that the canary & baseline server will live and continue analysis before moving onto the next stage.


`Terminate unhealthy canary` - If the canary is unhealthy based on analysis it'll continue to collect and analyze information for this period of time until it considers the overall result of the canary a failure.


`Baseline version - Account & Clusters` - This is the baseline cluster to use for the canary analysis.  The Canary stage will find the AMI id from the latest deployed cluster and use this for the baseline server group.  In our screenshot above, the canary stage would deploy 2 new server groups: `armoryhellodeplloy-nightly-baseline` and `armoryhellodeplloy-nightly-canary`.


### Baseline/Canary Cluster Pair

This configuration determines how the canary will be deployed.  This looks similar to a server group deployment. The difference is that it is managed by Canary stage and has a limited lifespan as defined by `Canary Lifetime` above.  In most cases you'll want to put the canary behind the existing production load balancer which will drive a small percentage of traffic to your new canary and baseline server group.  You can specify a different load balancer but you'll be responsible for creating a different mechanism for traffic shaping.   


![Canary Pair Configuration](https://cl.ly/3b2l1N1a0n3Q/Image%202017-08-07%20at%2011.39.16%20AM.png)

## Datadog

If your Administrator has configured Datadog in your Barometer instance you'll be able to use the metrics and monitors stored in Datadog to inform Barometer on the health of your service.

### Metrics Dashboard


### Metrics

The metrics stored in Datadog are compared between the canary and baseline using statistical analysis.  Once the service determines that the canary is behaving abnormally it'll mark it as unhealthy.  You can specify which metrics that you want Barometer to consider during the canary analysis.  

![Datadog Metrics](https://cl.ly/2I251a2r2Y1W/Image%202017-08-07%20at%201.36.44%20PM.png)


### Monitors

You can use pre-existing monitors to fail the canary regardless of how it compares to it's `baseline`.  This is good if you have absolute business rules such as "response times can't go over 50ms" or "Number of exceptions must be below 10 per minute".  Barometer does this by periodically checking the event stream for monitors that have failed and match the canary autoscaling group name.

#### Enabling the monitor

In your Datadog monitor you'll need to aggregate the metric by autoscaling group:
![ASG Metrics](https://cl.ly/0s0s2N382x02/Image%202017-08-07%20at%2012.04.54%20PM.png)

You'll also need to include the autoscaling group name in the monitor message by checking the box `Include Triggering tags in notification title`:


![include asg](https://cl.ly/3L42191Z0o03/Image%202017-08-07%20at%201.23.30%20PM.png)


You can enable/disable this behavior by checking the box below.
![Disable monitor](https://cl.ly/2g1T1b0q2I2S/Image%202017-08-07%20at%2011.53.07%20AM.png)

**Note:** If you aren't able to aggregate by autoscaling group this means either you're not logging through the Datadog agent that is usually placed on the instance or you need to enable `Auto Scaling` and `EC2` integrations from the Datadog integrations screen.

![enabling ec2 and autoscaling](https://cl.ly/0z1h27390b3v/Image%202017-08-07%20at%2012.10.12%20PM.png)

## Elastic Search

If Elastic Search is configured by your Spinnaker Administrator you can take advantage of using ES queries to further analyze your canary deployments.  

You can specify which queries you want Barometer to consider by adding each new JSON query that you want considered by Barometer.  If Barometer queries your elastic search instance and finds that any of these queries return a result it will consider the canary unhealthy.  

![elastic search example](https://cl.ly/190T1M3S3o40/Image%202017-08-07%20at%201.56.10%20PM.png)
