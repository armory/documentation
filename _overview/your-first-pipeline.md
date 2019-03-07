---
layout: post
order: 50
---

This guide should tell you:
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## How to Create a Pipeline

In this example we will create a pipeline that takes the Debian package produced by a Jenkins job and uses it to create an Amazon Machine Image (AMI) before deploying that image to a server group. 


Things you should already have prepared beforehand for this example:

- A Jenkins Master configured by your administrator
- A Jenkins job that archives a Debian package
- A security group within AWS with appropriate permissions
- Create a Load Balancer

Step 1: After selecting your Application, click the Pipelines category.

![](images/Image 2017-03-24 at 3.42.34 PM.png)

Step 2: On this page, click the “+” icon. 


Step 3: Decide upon a name for your new pipeline

Note: Strategy will be covered in a separate guide.

Step 4: On this page you will see

- A visual representation of your pipeline and its stages (you should only have configurations at the beginning)
- Concurrent Executions
- Automated Triggers
- Parameters
- Notifications
- Description 

![](images/Image 2017-03-24 at 3.45.55 PM.png)

Step 5: The first thing you should do is set up how your pipeline will be triggered. Scroll down to the Automated Triggers sub section. This section will allow you to select a Type first, looking like this.

![](images/Image 2017-03-24 at 3.49.39 PM.png)

Step 6: For this example we will select Jenkins. By adding a trigger we are defining how our pipeline will be initiated.

![](images/Image 2017-03-24 at 3.50.27 PM.png)

Note: The Property File is an important topic that will be covered in a [separate guide](http://docs.armory.io/user-guides/working-with-jenkins/#property-file). 

Step 7: Before you test your pipeline, you may want to consider enabling or disabling the trigger via the checklist at the bottom. 

Step 8: Now we add our first stage: Baking an AMI. Click the add stage button in the visual representations section.

![](images/Image 2017-03-24 at 4.19.38 PM.png)

Step 9: Select Bake from the different Types category. 

![](images/Image 2017-03-24 at 4.20.02 PM.png)

Step 10: Select Amazon from the Provider list, then the region you want to bake in. Enter the name of the package that was archived by the Jenkins job.

Note: The package name should not include any version numbers. (e.g.: If your build produces a deb file named “myapp_1.27-h343”, you would want to enter “myapp” here.) 
Note 2: If you would like to configure your own Base AMI under the Advanced Options, the Base OS configuration will be ignored.

![](images/Image 2017-03-24 at 4.26.08 PM.png)

Step 11: Now add a Deploy stage by clicking Add Stage again. In the Type category select Deploy. Deploy’s configuration settings should pop up on the screen.

![](images/Image 2017-03-24 at 4.27.55 PM.png)

Note: If we want to reorganize the order that the stages execute in the pipeline, we can add or remove precursor stages in the Depends On category. 

Step 12: In the Deploy Configuration, click on the “Add server group” button. Pick your provider. For our example it will be AWS. 

Step 13: Because this is a new application we will not choose to copy a configuration from a template. Select “Continue without a template”. 

![](images/Image 2017-03-24 at 4.32.05 PM.png)

Step 14: The first important thing is to set up the Deploy Strategy. We will use the Highlander strategy for this example, which will ensure that only one server group for our application exists at a time. 

![](images/Image 2017-03-24 at 4.35.23 PM.png)

Note: Different deployment strategies are important and there will be a separate guide for those (hyper link here).

Step 15: From the Load Balancer list, select one that we’ve created beforehand. 

Step 16: Select a security group that you are comfortable with, which will define the access rights to your resource. 

Step 17: Select Instance Type as Micro Utility, then set the size as “small”. 

Step 18: For Capacity, select how many instances you want in your server group. For our example, we will set it at 1.

![](images/Image 2017-03-24 at 4.39.12 PM.png)

Step 19: Click “add”. You will be brought back to your Application and see a new Deploy Configuration. Press “Save Changes” at the bottom right of your window.

![](images/Image 2017-03-24 at 4.42.09 PM.png)

Step 20: Now click on the Pipelines option. You should see your new pipeline. Click on “Start Manual Execution”. 

![](images/Image 2017-03-24 at 4.43.15 PM.png)

Step 21: You will be able to select a Build for your Jenkins job from a drop down menu. By default, Spinnaker will not recreate an AMI unless the underlying package has changed. If you would like to force it, you may use the checkbox for “Rebake”. 

![](images/Image 2017-03-24 at 4.44.32 PM.png)

Step 22: Press “Run”, and you should see a progress bar where blue represents running and green represents complete. Gray represents not ran or canceled, which is not in our example picture.

![](images/Image 2017-03-24 at 4.45.33 PM.png)

If your pipeline does not succeed, refer to one of the troubleshooting sections in the [pipelines]({% link _spinnaker_user_guides/pipelines.md %}#troubleshooting), [baking]({% link _spinnaker_user_guides/baking-images.md %}#troubleshooting), or [deploying]({% link _spinnaker_user_guides/deploying.md %}#common-errors-and-troubleshooting) guides.

Note: Always remember to save your changes by clicking the button in the bottom right of the window. 
