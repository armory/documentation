---
layout: post
order: 30
---

This guide should tell you:
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## At First Glance

When you first log in to Spinnaker, the landing page should look like this:

![](/images/Image 2017-03-24 at 3.15.34 PM.png)

The navigation bar at the top allows you to access Projects, Applications, and Infrastructure.
The search bar allows you to search through your Infrastructure. 
(this search bar will find everything in all of your AWS Infrastructure) 

Spinnaker should scan all of your infrastructure and create applications for anything that it finds. 
If you enter an application this way that was not configured by Spinnaker, it should state that the application has not been configured. 

Note: The naming convention that you have been using is not necessarily the same one that Spinnaker uses, but accessing your applications through Spinnaker should allow you to configure it to your preferences.
Remember that Spinnaker considers an application to be anything you would put into a single code repository.


## Making an Application

**Step 1:** Enter Applications from your Navigation bar. 

**Step 2:** Click the “Actions” button and select from the drop-down menu “Create Application”

![](/images/Image 2017-03-24 at 3.20.41 PM.png)

**Step 3:** Fill out the pop-up form with desired user definitions.

![](/images/Image 2017-03-24 at 3.22.30 PM.png)

Notes: 

- The Name of the application cannot have hyphens, or it will interfere with the naming convention.
- The Account(s) can include your AWS account and your Docker registry.
- When you create an application in Spinnaker, consider it to be anything you would put into a single code repository. 

**Step 4:** After you fill out the form you should see this:

![](/images/Image 2017-03-24 at 3.26.40 PM.png)

**Step 5:** If you wish to modify the settings for the application, click on “Config” for configurations.

Note that by now you should have created an application, but as you have not created a pipeline and executed it, nothing should show up yet.


## Deleting an Application

Go to your application, click on “Config” and scroll all the way down. There will be a prompt to confirm if you would like to delete your application. 

![](/images/Image 2017-03-24 at 3.28.14 PM.png)
