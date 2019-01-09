---
layout: post
title: Application Deployment Pipeline
order: 90
# Migrated to spinnaker-user-guides/application-pipeline
published: false
---

{% include components/legacy_documentation.html %}

# What To Expect
{:.no_toc}

This guide should include:
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Creating A Pipeline

We'll be creating a pipeline that takes the Debian package produced by a Jenkins job and uses it to create an Amazon Machine Image (AMI) before deploying that image to a server group.


Things you should already have prepared beforehand for this example:

- A Jenkins Master configured
- A Jenkins job that archives a Debian package
- A security group within AWS with appropriate permissions

#### Step 1: After selecting your Application, click the Pipelines category.

![](https://d1ax1i5f2y3x71.cloudfront.net/items/2f2f1g05113B450u043G/Image%202017-03-24%20at%203.42.34%20PM.png)

#### Step 2: On this page, click the “+” icon.


#### Step 3: Input a name for your new pipeline

_Note_: Strategy will be covered in a separate guide.

#### Step 4: On this page you will see

- A visual representation of your pipeline and its stages
- Concurrent Executions
- Automated Triggers
- Parameters
- Notifications
- Description

![](https://d1ax1i5f2y3x71.cloudfront.net/items/2Z1J1x46362C0320373X/Image%202017-03-24%20at%203.45.55%20PM.png)

#### Step 5: The first thing you should do is set up how your pipeline will be triggered. Scroll down to the Automated Triggers sub section. This section will allow you to select a Type first, looking like this.

![](https://d1ax1i5f2y3x71.cloudfront.net/items/0e0Z1s3N3A261j0q0m06/Image%202017-03-24%20at%203.49.39%20PM.png)

#### Step 6: For this example we will select Jenkins. By adding a trigger we are defining how our pipeline will be initiated.

![](https://d1ax1i5f2y3x71.cloudfront.net/items/3n0j3m3c0Z1g452J061z/Image%202017-03-24%20at%203.50.27%20PM.png)

_Note_: The Property File is an important topic that will be [covered in a separate guide](http://localhost:4000/user-guides/working-with-jenkins/#property-file).

#### Step 7: Before you test your pipeline, you may want to consider enabling or disabling the trigger via the checklist at the bottom.

#### Step 8: Add a new stage.
Click the add stage button in the visual representations section.

![](https://d1ax1i5f2y3x71.cloudfront.net/items/1P0f2L0C2v2k463X3Q0U/Image%202017-03-24%20at%204.19.38%20PM.png)

#### Step 9: Select Bake from the different types category.

![](https://cl.ly/043q3u1K1a2V/Image%202017-09-05%20at%204.47.51%20PM.png)

#### Step 10: Select the region you want to bake in.
Enter the name of the package that was archived by the Jenkins job.

- _Note_: The package name should not include any version numbers. (e.g.: If your build produces a deb file named `myapp_1.27-h343`, you would want to enter `myapp` here.)

- _Note_: If you would like to configure your own Base AMI under the Advanced Options, the Base OS configuration will be ignored.

![](https://d1ax1i5f2y3x71.cloudfront.net/items/1C1k2R0U2N3j091U0F3N/Image%202017-03-24%20at%204.26.08%20PM.png)

#### Step 11: Now add a Deploy stage by clicking Add Stage again. In the Type category select Deploy. Deploy’s configuration settings should pop up on the screen.

![](https://d1ax1i5f2y3x71.cloudfront.net/items/1f360t2o1a1k1x3M3f2S/Image%202017-03-24%20at%204.27.55%20PM.png)

_Note_: If we want to reorganize the order that the stages execute in the pipeline, we can add or remove precursor stages in the Depends On category.

#### Step 12: In the Deploy Configuration, click on the “Add server group” button. Pick your provider. For our example it will be AWS.

#### Step 13: Select “Continue without a template”.
Since this is a new application we will not choose to copy a configuration from a template.

![](https://d1ax1i5f2y3x71.cloudfront.net/items/1Y0k2u0H2t303h2y1Z2F/Image%202017-03-24%20at%204.32.05%20PM.png)

#### Step 14: Set up the Deploy Strategy.
We will use the Highlander strategy for this example, which will ensure that only one server group for our application exists at a time.

![](https://d1ax1i5f2y3x71.cloudfront.net/items/2D143V0z0J370f3d2o3S/Image%202017-03-24%20at%204.35.23%20PM.png)

_Note_: Different deployment strategies are important and there will be a separate guide for those.

#### Step 15: Select a security group
The security group will define the access rights to your resource.

#### Step 16: Select Instance Type.
Make sure to select the right instance type for your application, perferrably the one that is running in production currently.

#### Step 17: Select the Capactity
Select how many instances you want in your server group on deploy. For our example, we will set it at 1.

![](https://d1ax1i5f2y3x71.cloudfront.net/items/1i1Y1V2B3k0b3x3A433R/Image%202017-03-24%20at%204.39.12%20PM.png)

#### Step 18: Add the server group.
Click "Add" and you'll be brought back to your Application and to see your new Deploy Configuration.

![](https://d1ax1i5f2y3x71.cloudfront.net/items/2d2J000z3T1z0n0j1d1i/Image%202017-03-24%20at%204.42.09%20PM.png)

#### Step 19: Save the changes
Press “Save Changes” at the bottom right of your window.

#### Step 20: Go back to the Pipeline Overview.
You should see your new pipeline. Click on “Start Manual Execution”.

![](https://d1ax1i5f2y3x71.cloudfront.net/items/3Z1m1y0f2H050g363g1D/Image%202017-03-24%20at%204.43.15%20PM.png)

#### Step 21: Select the build to run.
You will be able to select a Build for your Jenkins job from a drop down menu. By default, Spinnaker will not recreate an AMI unless the underlying package has changed. If you would like to force it, you may use the checkbox for “Rebake”.

![](https://d1ax1i5f2y3x71.cloudfront.net/items/14110k160X3O2X1z0Z24/Image%202017-03-24%20at%204.44.32%20PM.png)

#### Step 22: Run
You should see a progress bar where blue represents running and green represents complete. Gray represents not ran or canceled. Red is a failed task.

![](https://d1ax1i5f2y3x71.cloudfront.net/items/431f381I1z0y2K3w2s3M/Image%202017-03-24%20at%204.45.33%20PM.png)

If your pipeline does not succeed, refer to one of the troubleshooting sections in the [pipelines]({% link _spinnaker_user_guides/pipelines.md %}#troubleshooting), [baking]({% link _spinnaker_user_guides/baking-images.md %}#troubleshooting), or [deploying]({% link _spinnaker_user_guides/deploying.md %}#common-errors-and-troubleshooting) guides.
