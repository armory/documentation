User Guide: Pipelines
This guide should tell you:

- How to create a pipeline
- How to configure a pipeline
- What do the execution details on the pipeline page mean?
- How to delete a pipeline



How to Create a Pipeline

In this example we will create a pipeline that takes the Debian package produced by a Jenkins job and uses it to create an Amazon Machine Image (AMI) before deploying that image to a server group. 


Things you should already have prepared beforehand for this example:

- A Jenkins Master configured by your administrator
- A Jenkins job that archives a Debian package
- A security group within AWS with appropriate permissions
- Create a Load Balancer (in this guide hyperlink here)

Step 1: After selecting your Application, click the Pipelines category.
https://cl.ly/110L3p0E2o1Y

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

https://cl.ly/2i3o2I0w2C3a

Step 5: The first thing you should do is set up how your pipeline will be triggered. Scroll down to the Automated Triggers sub section. This section will allow you to select a Type first, looking like this.
https://cl.ly/1n3C0p0S2G3I

Step 6: For this example we will select Jenkins. By adding a trigger we are defining how our pipeline will be initiated.
https://cl.ly/3D1w3n3s2J3r

Note: The Property File is an important topic that will be covered in a separate guide (hyperlink here). 

Step 7: Before you test your pipeline, you may want to consider enabling or disabling the trigger via the checklist at the bottom. 

Step 8: Now we add our first stage: Baking an AMI. Click the add stage button in the visual representations section.
https://cl.ly/3m0q360r0P2T

Step 9: Select Bake from the different Types category. 
https://cl.ly/3g1a0Y2g200u

Step 10: Select Amazon from the Provider list, then the region you want to bake in. Enter the name of the package that was archived by the Jenkins job.

Note: The package name should not include any version numbers. (e.g.: If your build produces a deb file named “myapp_1.27-h343”, you would want to enter “myapp” here.) 
Note 2: If you would like to configure your own Base AMI under the Advanced Options, the Base OS configuration will be ignored.
https://cl.ly/441h0m0J3x0M

Step 11: Now add a Deploy stage by clicking Add Stage again. In the Type category select Deploy. Deploy’s configuration settings should pop up on the screen.
https://cl.ly/0r0h1z3m3g0e
Note: If we want to reorganize the order that the stages execute in the pipeline, we can add or remove precursor stages in the Depends On category. 

Step 12: In the Deploy Configuration, click on the “Add server group” button. Pick your provider. For our example it will be AWS. 

Step 13: Because this is a new application we will not choose to copy a configuration from a template. Select “Continue without a template”. 
https://cl.ly/2a0L2R0a0K0q

Step 14: The first important thing is to set up the Deploy Strategy. We will use the Highlander strategy for this example, which will ensure that only one server group for our application exists at a time. 
https://cl.ly/213k0F1H2N2E
Note: Different deployment strategies are important and there will be a separate guide for those (hyper link here).

Step 15: From the Load Balancer list, select one that we’ve created beforehand. 

Step 16: Select a security group that you are comfortable with, which will define the access rights to your resource. 

Step 17: Select Instance Type as Micro Utility, then set the size as “small”. 

Step 18: For Capacity, select how many instances you want in your server group. For our example, we will set it at 1.
https://cl.ly/3N290G2T1P2F

Step 19: Click “add”. You will be brought back to your Application and see a new Deploy Configuration. Press “Save Changes” at the bottom right of your window.
https://cl.ly/1J3S0h1p230x

Step 20: Now click on the Pipelines option. You should see your new pipeline. Click on “Start Manual Execution”. 

https://cl.ly/3L192G3G3W1w

Step 21: You will be able to select a Build for your Jenkins job from a drop down menu. By default, Spinnaker will not recreate an AMI unless the underlying package has changed. If you would like to force it, you may use the checkbox for “Rebake”. 
https://cl.ly/2m3G0c0G0y3y

Step 22: Press “Run”, and you should see a progress bar where blue represents running and green represents complete. Gray represents not ran or canceled, which is not in our example picture.

https://cl.ly/191g321j0q31

If your pipeline does not succeed, refer to the Troubleshooting Guide here (hyperlink here) 

Note: Always remember to save your changes by clicking the button in the bottom right of the window. 
