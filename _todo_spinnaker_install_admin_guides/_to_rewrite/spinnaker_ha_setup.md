---
layout: post
title: Spinnaker HA Setup
order: 15
published: false
---

{% include components/legacy_documentation.html %}

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

### Setting up Polling and Nonpolling
For certain components you’ll only want a single instance running on an ASG on “polling” mode. Namely Igor and Echo which need to run on a single instance so that multiple trigger events are not sent to Spinnaker and issuing multiple events for the same build.

To set this up, edit your Armory Spinnaker deploy pipeline so it looks like this.
![](https://cl.ly/3R2v3u3F2z2O/Image%202018-05-16%20at%2014.39.40.png)

> Note, the cloud_details set to `nonpolling` is required. On boot, Armory Spinnaker will use [/etc/default/server-env](https://kb.armory.io/aws/18-what-is-server-env/) to determine which group this instance belongs to.

#### "Disable Poller" stage
Armory includes a service (Lighthouse) that will wait for existing jobs to complete before shutting itself down.
If Fiat is enabled, make sure that you have [configured a service account](https://docs.armory.io/install-guide/authz/#configure-a-service-account).
![](https://cl.ly/3O0t262Q1f2g/Image%202018-05-16%20at%2014.35.42.png)

#### "Deploy to Prod nonpolling"
Setup your deploy stage to deploy a nonpolling cluster. You can scale this cluster up to as needed.
![](https://cl.ly/0M18343V0S1G/Image%202018-05-16%20at%2014.31.14.png)


#### "Deploy to Prod Polling"
Deploy only **1 instance**.
![](https://cl.ly/2F072B1o081Z/Image%202018-05-16%20at%2014.37.01.png)



### Using a isolated Redis for each subservice
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


### Validate the setup is correct
Look through your logs for to make sure the nonpolling instances don't poll any resources. Here's some examples:

For `igor`, only the polling instance should have log lines like:
```
INFO 1 --- [readScheduler-2] c.n.s.igor.jenkins.JenkinsBuildMonitor   : Polling cycle started: Fri Jun 08 18:15:35 GMT 2018
INFO 1 --- [readScheduler-2] c.n.s.igor.jenkins.JenkinsBuildMonitor   : Polling cycle done in 1359ms
```

For `echo`, only the polling instance should have this line:
```
INFO 1 --- [pool-5-thread-1] .s.e.s.a.p.i.PipelineConfigsPollingAgent : Running the pipeline configs polling agent...
```
