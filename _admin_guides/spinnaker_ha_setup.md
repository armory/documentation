---
layout: post
title: Spinnaker HA Setup
order: 15
---

### Setting up Polling and Nonpolling
For certain components you’ll only want a single instance running on an ASG on “polling” mode. Namely Igor and Echo which need to run on a single instance so that multiple trigger events are not sent to Spinnaker and issuing multiple events for the same build.

To set this up, edit your Armory Spinnaker deploy pipeline so it looks like this.
![](https://cl.ly/3R2v3u3F2z2O/Image%202018-05-16%20at%2014.39.40.png)

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