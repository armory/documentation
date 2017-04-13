---
layout: post
---

This guide should include:

- pipeline and execution overview
- manual executions
- notifications

Pipelines are a combination of stages that enable some very sophisticated coordination and branching. They are the key to orchestrating deploys in Spinnaker and each one is specific to an application. To see an application's pipelines, select 'Applications' from Spinnaker's top navigation bar, click on an application's name, and then press the 'Pipelines' tab. The result from a pipeline running is called an execution.	

Take this screenshot for example:

![](https://d1ax1i5f2y3x71.cloudfront.net/items/2l1b2l0O453t0L311H0g/Image%202017-04-03%20at%204.35.40%20PM.png)

There is a pipeline called 'Deploy' with two executions, both labeled 'Manual Start'. The top execution is marked as 'Succeeded' while the bottom is marked as 'Cancelled'. 

For more information on creating bake and deploy pipelines, checkout the [baking]({% link _user_guides/baking-images.md %}) and [deploying]({% link _user_guides/deploying.md %} guides.


## Manual Execution

You can re-run an execution by pressing the 'Start Manual Execution'. 

![](https://d1ax1i5f2y3x71.cloudfront.net/items/2P2H2W1K2b3M3d2i321q/Image%202017-04-03%20at%204.51.41%20PM.png)

If your pipeline has a Jenkins' trigger, you can select which Jenkins' build number to use for running the pipeline. 

![](https://d1ax1i5f2y3x71.cloudfront.net/items/1y1V2X18341X203u0k30/Image%202017-04-03%20at%204.53.50%20PM.png)

The artifacts produced by the build you select will be used in the pipeline. If your pipeline bakes an image, a cached image will be used if available. To force a rebuild, make sure you specify such before pressing the 'Run' button.


## Enabling notifications

Spinnaker supports several methods of notification. Notifications can be made when a pipeline runs, succeeds, or fails. You can be contacted via SMS, email, slack, hipchat, and/or pagerduty. Each of these outlets need to be configured within Spinnaker by your Spinnaker Administrator. Once it is configured, you can enable it in your pipeline.

To enable it, navigate to the configuration screen for your pipeline. Make sure you have the 'Configuration' stage selected. Scroll down to the 'Notifications' section.

![](https://d1ax1i5f2y3x71.cloudfront.net/items/3P1b0M1P0u3q0Z0o351u/Image%202017-04-03%20at%204.31.37%20PM.png)

 Press 'Add Notifications Preference'. For example's sake, I have selected to receive a notification via Slack in the `#engineering` channel whenever my pipeline fails.

 Finally press 'Update' to finish. Don't forget to press 'Save Changes' on your pipeline configuration.


## Troubleshooting

### Hanging or Timed Out Pipelines

A lot of the time pipelines hang because of a misconfigured stage. This is a common occurrence when a server group does not complete its deploy because the deployed instances never pass the healthcheck. This happens both when the healthcheck is misconfigured and/or when the image doesn't bake as expected. These two areas should be investigated first. For more information you can see the troubleshooting topic in the [deployment guide]({% link _user_guides/deploying.md %}).
