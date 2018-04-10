---
layout: post
title: Integration Test Pipelines
order: 70
published: True
---

This guide should include:

- Approach To Integration Test Pipelines With Spinnaker
- Creating Integration Test Pipeline
- Executing and Monitoring The Test Pipeline

# Approach

Using Spinnaker's orchestration engine, we can quickly create pipelines that exercise the integration between Spinnaker and your cloud environment before deploying any upgrades to Spinnaker.  We'll walk through creating a master pipeline that kicks off sub-pipelines asynchronously and waits for them complete.

![integration test pipeline](https://cl.ly/0E2A470S0a36/Image%202018-04-05%20at%209.25.12%20PM.png)

For each stage in the pipeline we're just calling other pipelines that contain the real functionality. This essentially makes the master pipeline your "test suite runner" and reports failures.

![](https://cl.ly/3T2m3g1x091S/Image%202018-04-06%20at%2011.32.51%20AM.png)

### Where & When Should My Tests Run
The tests should run on a [pre-prod or staging environment](https://docs.armory.io/admin-guides/preprod_environment/) and should be integrated as part of your [Spinnaker deploy Spinnaker](https://docs.armory.io/install-guide/spinnaker-deploy-spinnaker/) pipeline.  We'll use a Jenkins stage to execute the integration pipeline on the pre-prod or dev environment.

![pipeline image](https://cl.ly/3h1Y1I301v0f/Image%202018-04-05%20at%209.45.15%20PM.png)

# Types of Test Pipelines
These pipelines will be based on your usage of Spinnaker and should be similar to your production pipelines.  You won't need to deploy into your production accounts to validate Spinnaker functionality but you should deploy into multiple accounts from your pre-prod/dev environments. Below are some of the potential pipeline/stages you can consider.

* **Bake and Deploy** - In this pipeline you'll want to test your Rosco and Packer template configuration to make sure bakes happen properly as well as feed the resulting AMI to a deploy stage. The application yoo choose to deploy should be a simple application.  We use our [Hello Deploy application](https://github.com/armory-io/armory-hello-deploy) which has deb/rpm packaging as well as a docker image for your containerized deployments.
>Note: If you're using multiple regions make sure to test this functionality as it may expose networking issues and invalid templates.

![](https://dha4w82d62smt.cloudfront.net/items/1G0x022Q3I2c2Y1F173Z/Image%202018-04-06%20at%2011.49.13%20AM.png?X-CloudApp-Visitor-Id=2686178)

* **Kubernetes Deploy** - If you're using Kubernetes you'll want to create a pipeline with a stage that deploys into Kubernetes. If you're using other stages that scale/modify clusters such as `resize a server group`, `clone server group`,`scale down cluster`, make sure to include that as part of your test pipeline.

* **Rollback** - Verifies that after a deployment can you do a rollback stage.  While you may not use the rollback stage this exercises different sub-tasks of critical operations in Spinnaker.  It's also the same functionality as the rollback button in the clusters view.

* **Cluster/Server Group Operations** - For each cloud provider you'll want to exercise Spinnaker's  
cloud provider stages whose subtasks execute much of Spinnaker's core functionality: `enable/disable cluster/server group`,`destroy cluster/serve group`, `Rollback cluster`,`Scale down cluster`, `Shrink cluster` are the typical operations in pipelines and other parts of the UI.  Because many of these stages are made of sub-tasks that are used else where in Spinnaker you'll be exercising much of it's functionality through just these stages.

* **Other Functionality** - Pipeline Expressions, Jenkins stages, Modifying/Applying Pipeline Templates, Find image from tags, modify scaling operations, Tag Image.


# Executing & Monitoring The Test Pipeline

To execute the master pipeline you'll need to access the API.  You can either build your own client or use Armory's version of [roer](https://github.com/armory/roer) which is a thin API client for Spinnaker and contains functionality to execute  and monitor pipelines.

### Roer Usage:
```
$ roer app exec --help
```

```
NAME:
   roer app exec - execute pipeline

USAGE:
   roer app exec [command options] [application name] [pipeline name]

OPTIONS:
   --monitor, -m            Continue to monitor the executing of the pipeline
   --retry value, -r value  Number of times to have the monitor retry if a call fails or times out (default: 0)
```

### Example

```
SPINNAKER_API=https://armory-spinnaker.mycompany.com:8085 roer app exec -m -r 10 integration-test-app Preprod-Integration-Test-Suite-Runner
```

The example above will run the master pipeline `Preprod-Integration-Test-Suite-Runner` for the application `integration-test-app`.  It'll monitor the pipeline, which will wait for the pipeline to complete either through failure or success and report back it's exit status through 0 or 1.  It will also retry `10` times before exiting with a failure.  This is useful if you're waiting for your pre-prod/stage environment to stabilize.

## Authentication & Authorization

If you have configuring [authentication or authorization](https://docs.armory.io/install-guide/authz/) on your Armory instance then you'll need to make sure to also setup x509 certificate and potentially [service accounts](https://docs.armory.io/install-guide/authz/#configure-a-service-account) if you lock down applications and accounts with Fiat.

If you have x509 certificate and keys you can pass them in with the follow CLI options:
```
--certPath value, -c value  HTTPS x509 cert path
--keyPath value, -k value   HTTPS x509 key path
 ```
