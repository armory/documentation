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

![](https://d2ddoduugvun08.cloudfront.net/items/2f2f1g05113B450u043G/Image%202017-03-24%20at%203.42.34%20PM.png)

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

![](https://d2ddoduugvun08.cloudfront.net/items/2Z1J1x46362C0320373X/Image%202017-03-24%20at%203.45.55%20PM.png)

Step 5: The first thing you should do is set up how your pipeline will be triggered. Scroll down to the Automated Triggers sub section. This section will allow you to select a Type first, looking like this.

![](https://d2ddoduugvun08.cloudfront.net/items/0e0Z1s3N3A261j0q0m06/Image%202017-03-24%20at%203.49.39%20PM.png)

Step 6: For this example we will select Jenkins. By adding a trigger we are defining how our pipeline will be initiated.

![](https://d2ddoduugvun08.cloudfront.net/items/3n0j3m3c0Z1g452J061z/Image%202017-03-24%20at%203.50.27%20PM.png)

Note: The Property File is an important topic that will be covered in a [separate guide](http://docs.armory.io/user-guides/working-with-jenkins/#property-file). 

Step 7: Before you test your pipeline, you may want to consider enabling or disabling the trigger via the checklist at the bottom. 

Step 8: Now we add our first stage: Baking an AMI. Click the add stage button in the visual representations section.

![](https://d2ddoduugvun08.cloudfront.net/items/1P0f2L0C2v2k463X3Q0U/Image%202017-03-24%20at%204.19.38%20PM.png)

Step 9: Select Bake from the different Types category. 

![](https://d2ddoduugvun08.cloudfront.net/items/1T0v0Z41330s0O3A0o0a/Image%202017-03-24%20at%204.20.02%20PM.png)

Step 10: Select Amazon from the Provider list, then the region you want to bake in. Enter the name of the package that was archived by the Jenkins job.

Note: The package name should not include any version numbers. (e.g.: If your build produces a deb file named “myapp_1.27-h343”, you would want to enter “myapp” here.) 
Note 2: If you would like to configure your own Base AMI under the Advanced Options, the Base OS configuration will be ignored.

![](https://d2ddoduugvun08.cloudfront.net/items/1C1k2R0U2N3j091U0F3N/Image%202017-03-24%20at%204.26.08%20PM.png)

Step 11: Now add a Deploy stage by clicking Add Stage again. In the Type category select Deploy. Deploy’s configuration settings should pop up on the screen.

![](https://d2ddoduugvun08.cloudfront.net/items/1f360t2o1a1k1x3M3f2S/Image%202017-03-24%20at%204.27.55%20PM.png)

Note: If we want to reorganize the order that the stages execute in the pipeline, we can add or remove precursor stages in the Depends On category. 

Step 12: In the Deploy Configuration, click on the “Add server group” button. Pick your provider. For our example it will be AWS. 

Step 13: Because this is a new application we will not choose to copy a configuration from a template. Select “Continue without a template”. 

![](https://d2ddoduugvun08.cloudfront.net/items/1Y0k2u0H2t303h2y1Z2F/Image%202017-03-24%20at%204.32.05%20PM.png)

Step 14: The first important thing is to set up the Deploy Strategy. We will use the Highlander strategy for this example, which will ensure that only one server group for our application exists at a time. 

![](https://d2ddoduugvun08.cloudfront.net/items/2D143V0z0J370f3d2o3S/Image%202017-03-24%20at%204.35.23%20PM.png)

Note: Different deployment strategies are important and there will be a separate guide for those (hyper link here).

Step 15: From the Load Balancer list, select one that we’ve created beforehand. 

Step 16: Select a security group that you are comfortable with, which will define the access rights to your resource. 

Step 17: Select Instance Type as Micro Utility, then set the size as “small”. 

Step 18: For Capacity, select how many instances you want in your server group. For our example, we will set it at 1.

![](https://d2ddoduugvun08.cloudfront.net/items/1i1Y1V2B3k0b3x3A433R/Image%202017-03-24%20at%204.39.12%20PM.png)

Step 19: Click “add”. You will be brought back to your Application and see a new Deploy Configuration. Press “Save Changes” at the bottom right of your window.

![](https://d2ddoduugvun08.cloudfront.net/items/2d2J000z3T1z0n0j1d1i/Image%202017-03-24%20at%204.42.09%20PM.png)

Step 20: Now click on the Pipelines option. You should see your new pipeline. Click on “Start Manual Execution”. 

![](https://d2ddoduugvun08.cloudfront.net/items/3Z1m1y0f2H050g363g1D/Image%202017-03-24%20at%204.43.15%20PM.png)

Step 21: You will be able to select a Build for your Jenkins job from a drop down menu. By default, Spinnaker will not recreate an AMI unless the underlying package has changed. If you would like to force it, you may use the checkbox for “Rebake”. 

![](https://d2ddoduugvun08.cloudfront.net/items/14110k160X3O2X1z0Z24/Image%202017-03-24%20at%204.44.32%20PM.png)

Step 22: Press “Run”, and you should see a progress bar where blue represents running and green represents complete. Gray represents not ran or canceled, which is not in our example picture.

![](https://d2ddoduugvun08.cloudfront.net/items/431f381I1z0y2K3w2s3M/Image%202017-03-24%20at%204.45.33%20PM.png)

If your pipeline does not succeed, refer to one of the troubleshooting sections in the [pipelines]({% link _spinnaker_user_guides/pipelines.md %}#troubleshooting), [baking]({% link _spinnaker_user_guides/baking-images.md %}#troubleshooting), or [deploying]({% link _spinnaker_user_guides/deploying.md %}#common-errors-and-troubleshooting) guides.

Note: Always remember to save your changes by clicking the button in the bottom right of the window. 
