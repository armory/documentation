---
layout: post
order: 108
---

[Pipeline Templates](https://github.com/spinnaker/dcd-spec/blob/master/PIPELINE_TEMPLATES.md)
are a new feature of Spinnaker.  They are a means for standardizing and
distributing reusable Pipelines within a Spinnaker ecosystem.  The following
stages are of particular note to users deploying through pipeline templates.

## Load Balancer Stage

This stage, when enabled, allows for the automation of the creation of a new
load balancer within the cluster.  You can enable this feature by passing
in the environment variable `INFRA_ENABLED=true`, or configure
it in your `/opt/spinnaker/config/spinnaker-armory.yml` file:

```
features:
  infrastructureStages:
    enabled: true
```

You should see a "Create Load Balancers" stage as an optional type when
creating a stage:

![](https://cl.ly/2M422h202Z0j/Screen%20Shot%202017-10-02%20at%2011.46.04%20AM.png)

Then you can define the load balancers to create (or update -- if the
load balancer already exists with the same name, the configuration defined
here will overwrite the existing configuration)

![](https://cl.ly/2O0U3z1r1w1L/[6f77766dc4c52a0cafbec1aabe19cd12]_Screen%20Shot%202017-10-02%20at%2011.51.57%20AM.png)

The interface for configuring the load balancer is exactly the same as the
direct-create method.  Select your account, region, subnet, security groups,
etc.  The load balancer will not be created until this stage executes.

![](https://cl.ly/1E1m1e0u0e03/Screen%20Shot%202017-10-02%20at%2011.55.06%20AM.png)

When saved, the load balancer configuration should appear on the screen,
where you can edit, remove or duplicate that configuration:

![](https://cl.ly/2F1v3e0R1s0P/Screen%20Shot%202017-10-02%20at%2011.57.58%20AM.png)

If the create/update succeeds, the pipeline execution should look something
like this:

![](https://cl.ly/3i2w1o0x2o34/[3871895d1326b53d8ea91db022b61326]_Screen%20Shot%202017-10-02%20at%2012.01.50%20PM.png)



