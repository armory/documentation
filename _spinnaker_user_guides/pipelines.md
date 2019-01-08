---
layout: post
order: 15
redirect_from:
  - /user-guides/pipelines/
  - /user_guides/pipelines/
  - /spinnaker_user_guides/pipelines/
---

This guide includes:
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


Pipelines are a combination of stages that enable some very sophisticated coordination and branching. They are the key to orchestrating deploys in Spinnaker and each one is specific to an application. To see an application's pipelines, select 'Applications' from Spinnaker's top navigation bar, click on an application's name, and then press the 'Pipelines' tab. The result from a pipeline running is called an execution.	

Take this screenshot for example:

![](https://d1ax1i5f2y3x71.cloudfront.net/items/2l1b2l0O453t0L311H0g/Image%202017-04-03%20at%204.35.40%20PM.png)

There is a pipeline called 'Deploy' with two executions, both labeled 'Manual Start'. The top execution is marked as 'Succeeded' while the bottom is marked as 'Cancelled'. 

For more information on creating bake and deploy pipelines, checkout the [baking]({% link _user_guides/baking-images.md %}) and [deploying]({% link _user_guides/deploying.md %}) guides.


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


## Pipeline JSON

Pipelines are represented as JSON behind the scenes. The JSON is interpreted and displayed to you in the UI. However, sometimes it is helpful to view or edit the JSON directly. To access the JSON:

1. Click 'Configure' on your pipeline:

![](https://cl.ly/1x281l0v0X27/download/Image%202017-05-04%20at%204.23.33%20PM.png)

2. Press the 'Pipeline Actions' button in the upper right to display a dropdown menu.

![](https://cl.ly/191c1W0h0E2r/download/Image%202017-05-04%20at%204.30.11%20PM.png)

There are two JSON related options on this dropdown menu:

a. If you select 'Edit as JSON' then you should see something like:

![](https://cl.ly/15240u372F2T/download/Image%202017-05-04%20at%204.32.03%20PM.png)

From this screen you can edit the JSON directly. **Remember to always save your changes**, so they will be used in the next execution of your pipeline.

b. If you select 'Show Revision History' then you should see something like:

![](https://cl.ly/3K3O1C46410Q/download/Image%202017-05-04%20at%204.35.39%20PM.png)

You can select different revisions using the dropdown menu labeled 'Revision' in the top left. You can compare it to different versions using the 'compare to' dropdown menu in the upper right. 


## Troubleshooting

### Hanging or Timed Out Pipelines

A lot of the time pipelines hang because of a misconfigured stage. This is a common occurrence when a server group does not complete its deploy because the deployed instances never pass the healthcheck. This happens both when the healthcheck is misconfigured and/or when the image doesn't bake as expected. These two areas should be investigated first. For more information you can see the troubleshooting topic in the [deployment guide]({% link _spinnaker_user_guides/deploying.md %}).

