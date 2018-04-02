---
layout: post
order: 80
---

This document reviews some advanced configuration for each of the Armory Spinnaker sub-services

# Orca

### Increasing `WaitForCluster` timeout

During deploy stages there is a task that waits for cluster to be ready before moving to the next stage of your pipeline.  If you're using [AWS Lifecycle hooks](https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html) you might need the `WaitForCluster` task to wait longer than the default 30 minutes.

Below is an example of 60 minute `WaitForCluster` timeout:
```
tasks:
  waitForClusterTimeout: 3600000
```
