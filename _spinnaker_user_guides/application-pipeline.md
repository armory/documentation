---
layout: post
title: Application Deployment Pipeline (AWS EC2)
order: 65
redirect_from:
  - /install-guide/application-pipeline/
  - /install-guide/application_pipeline/
  - /install_guide/application-pipeline/
  - /install_guide/application_pipeline/
  - /spinnaker_user_guides/application_pipeline/
  - /spinnaker_user_guides/application-pipeline/
  - /spinnaker-user-guides/application_pipeline/
---

# What To Expect
{:.no_toc}

This guide includes:
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Creating A Pipeline

We'll be creating a pipeline that takes the Debian package produced by a Jenkins job and uses it to create an Amazon Machine Image (AMI) before deploying that image to a server group.


Things you should already have prepared beforehand for this example:

* A Jenkins Master configured
* A Jenkins job that archives a Debian package
* A security group within AWS with appropriate permissions

#### Step 1: After selecting your Application, click the Pipelines category.

![](/images/Image 2017-03-24 at 3.42.34 PM.png)

#### Step 2: On this page, click the “+” icon.


#### Step 3: Input a name for your new pipeline

_Note_: Strategy will be covered in a separate guide.

#### Step 4: On this page you will see

* A visual representation of your pipeline and its stages
* Concurrent Executions
* Automated Triggers
* Parameters
* Notifications
* Description

![](/images/Image 2017-03-24 at 3.45.55 PM.png)

#### Step 5: The first thing you should do is set up how your pipeline will be triggered. Scroll down to the Automated Triggers sub section. This section will allow you to select a Type first, looking like this.

![](/images/Image 2017-03-24 at 3.49.39 PM.png)

#### Step 6: For this example we will select Jenkins. By adding a trigger we are defining how our pipeline will be initiated.

![](/images/Image 2017-03-24 at 3.50.27 PM.png)

_Note_: The Property File is an important topic that will be [covered in a separate guide](https://docs.armory.io/spinnaker-user-guides/working-with-jenkins/#property-file).

#### Step 7: Before you test your pipeline, you may want to consider enabling or disabling the trigger via the checklist at the bottom.

#### Step 8: Add a new stage.
Click the add stage button in the visual representations section.

![](/images/Image 2017-03-24 at 4.19.38 PM.png)

#### Step 9: Select Bake from the different types category.

![](/images/Image 2017-09-05 at 4.47.51 PM.png)

#### Step 10: Select the region you want to bake in.
Enter the name of the package that was archived by the Jenkins job.

* _Note_: The package name should not include any version numbers. (e.g.: If your build produces a deb file named `myapp_1.27-h343`, you would want to enter `myapp` here.)

* _Note_: If you would like to configure your own Base AMI under the Advanced Options, the Base OS configuration will be ignored.

![](/images/Image 2017-03-24 at 4.26.08 PM.png)

#### Step 11: Now add a Deploy stage by clicking Add Stage again. In the Type category select Deploy. Deploy’s configuration settings should pop up on the screen.

![](/images/Image 2017-03-24 at 4.27.55 PM.png)

_Note_: If we want to reorganize the order that the stages execute in the pipeline, we can add or remove precursor stages in the Depends On category.

#### Step 12: In the Deploy Configuration, click on the “Add server group” button. Pick your provider. For our example it will be AWS.

#### Step 13: Select “Continue without a template”.
Since this is a new application we will not choose to copy a configuration from a template.

![](/images/Image 2017-03-24 at 4.32.05 PM.png)

#### Step 14: Set up the Deploy Strategy.
We will use the Highlander strategy for this example, which will ensure that only one server group for our application exists at a time.

![](/images/Image 2017-03-24 at 4.35.23 PM.png)

_Note_: Different deployment strategies are important and there will be a separate guide for those.

#### Step 15: Select a security group
The security group will define the access rights to your resource.

#### Step 16: Select Instance Type.
Make sure to select the right instance type for your application, perferrably the one that is running in production currently.

#### Step 17: Select the Capactity
Select how many instances you want in your server group on deploy. For our example, we will set it at 1.

![](/images/Image 2017-03-24 at 4.39.12 PM.png)

#### Step 18: Add the server group.
Click "Add" and you'll be brought back to your Application and to see your new Deploy Configuration.

![](/images/Image 2017-03-24 at 4.42.09 PM.png)

#### Step 19: Save the changes
Press “Save Changes” at the bottom right of your window.

#### Step 20: Go back to the Pipeline Overview.
You should see your new pipeline. Click on “Start Manual Execution”.

![](/images/Image 2017-03-24 at 4.43.15 PM.png)

#### Step 21: Select the build to run.
You will be able to select a Build for your Jenkins job from a drop down menu. By default, Spinnaker will not recreate an AMI unless the underlying package has changed. If you would like to force it, you may use the checkbox for “Rebake”.

![](/images/Image 2017-03-24 at 4.44.32 PM.png)

#### Step 22: Run
You should see a progress bar where blue represents running and green represents complete. Gray represents not ran or canceled. Red is a failed task.

![](/images/Image 2017-03-24 at 4.45.33 PM.png)

If your pipeline does not succeed, refer to one of the troubleshooting sections in the [pipelines]({% link _spinnaker_user_guides/pipelines.md %}#troubleshooting), [baking]({% link _spinnaker_user_guides/baking-images.md %}#troubleshooting), or [deploying]({% link _spinnaker_user_guides/deploying.md %}#common-errors-and-troubleshooting) guides.
