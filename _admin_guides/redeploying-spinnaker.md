---
layout: post
title: Re-deploying Spinnaker
order: 130
---

# Spinnaker Deploying Spinnaker

Because Spinnaker is a deployment tool, it also means that Spinnaker can deploy itself, without any downtime, with the same confidence and processes that your other toolsya

## Orca State
A single Orca instance maintains the state of single pipeline.  If that orca instance dies then the pipeline will hang.  You have to make sure to never kill a pipeline.

### Redis

Redis maintains the state of each pipeline where the key of the executing pipeline is `pipeline:${KEY_ID}`.

## Lighthouse
One of the jobs that Lighthouse does is to monitor a Spinnaker Server Group to make sure that the instance is not executing any pipelines.  You can find executing pipelines by querying the Spinnaker API with a GET request here: `https://${YOUR_GATE_HOST}:8084/executions/activeByInstance`.

Once Lighthouse identifies that there are no more running pipelines it will gracefully shut itself down an reduce the ASG by 1 using the Spinnaker API.  Lighthouse will leave a record of it's actions in the Tasks section of the `armoryspinnaker` application.

![lighthouse task ](https://d1ax1i5f2y3x71.cloudfront.net/items/1L3C2F3E412Y3X1c130c/Image%202017-04-13%20at%209.59.50%20AM.png)


## Manual Rollback of Armory Spinnaker

If you deploy a configuration or a change that takes down Spinnaker it'll be impossible to rollback since Spinnaker would not be available.  In order to manually to deploy back you'll have to do the following:

1.  Look for the existing deployment for with the `armoryspinnaker` prefix.  

2.  Find the ASGs of Armory Spinnaker that was deployed.  Typically it should be `armoryspinnaker-ha-polling-v${VER}` where `${VER}` is something like `023`.  You should see 2 ASGS, one that has active instead and the older version should be disabled. ![armory spinnaker ASGs](https://d17oy1vhnax1f7.cloudfront.net/items/052s3x3Z0i0g3T1R0V2L/Image%202017-02-02%20at%2011.57.41%20AM.png?v=c049b757)

3. Edit the older ASG and remove any suspended processes that are listed ![remove suspended process](https://d17oy1vhnax1f7.cloudfront.net/items/3D3f1Z2t2s06050x3734/%5B25db0756e39ea3537131a8220e10f18d%5D_Image%2525202017-02-02%252520at%25252012.00.50%252520PM.png?v=a6380340)

4.  Increase the number of instance `armoryspinnaker-ha-polling` ASG to just 1 and the other ASG `armoryspinnaker-ha`, the non-polling ASG back to atleast 2.
![ASG upping desired capacity count](https://d17oy1vhnax1f7.cloudfront.net/items/0C3r3r3e0p3r2a0e3t2i/%5B28125238555a966ddf3b571e617e8cba%5D_Image%25202017-02-02%2520at%252012.11.20%2520PM.png?v=8c16dc8f)

5.  Reduce the latest ASGs down to 0 so that they're no longer behind the ELB

6.  Check the Armory Spinnaker ELB, make sure all instances back behind both the user-facing and internal-services ELB.  

7.  Go back to your Armory Spinnaker URL and make sure all is back to a working state.
