---
layout: post
title: Advanced Configurations
order: 80
---

This document reviews some advanced configuration for each of the Armory Spinnaker sub-services

### Increasing Orca `WaitForCluster` timeout

During deploy stages there is a task that waits for cluster to be ready before moving to the next stage of your pipeline.  If you're using [AWS Lifecycle hooks](https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html) you might need the `WaitForCluster` task to wait longer than the default 30 minutes.

Below is an example of 60 minute `WaitForCluster` timeout:
```
tasks:
  waitForClusterTimeout: 3600000
```


### Have a separate Redis for a subservice
Spinnaker subservices can share a single Redis. However here are some reasons why you may want to have separate Redis's:
- Subservice isolation
- Redis performance issues, which allows you to scale each Redis individually


Here's an example for Clouddriver, it's the same pattern for other subservices:
```bash
$ cat /opt/spinnaker/env/prod.env
...
SPRING_PROFILES_ACTIVE=armory,local,redis
CLOUDDRIVER_REDIS_URL=redis://YOUR_SPECIAL_REDIS_FOR_CLOUDDRIVER_HERE:6379
...


$ cat /opt/spinnaker/config/clouddriver-redis.yml
redis:
  connection: ${CLOUDDRIVER_REDIS_URL:redis://localhost:6379}
```
