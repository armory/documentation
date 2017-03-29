# Baking

This guide should include:


- How to bake an Amazon Machine Image


Definition: The term 'Baking' is used within Spinnaker to refer to the process of creating machine images.


Preprequisites and assumptions:

- You are familiar with creating [applications](../overview/first_applications.md) and [pipelines](../overview/first_pipeline.md).
- You are deploying to AWS.


## Baking in a Pipeline

First lets go through an example of baking, then we can go into some details and information sharing.

## Example

In this example we will bake an image containing a debian package created by a Jenkins' job. If you like, you can check out the [working with Jenkins guide](working_with_jenkins.md) for more information on how Jenkins and Spinnaker can work together. We also have a guide on [creating debian packages](debian_packages.md).


First Lets look at the the Jenkins job that builds our package. 
https://cl.ly/0I0E070P3D2n
As you can see, the last run archived a packaged named `armory-hello-deploy_0.5.0-h5.c4baff4_all.deb`


Now lets go to Spinnaker and create a new pipeline. I named mine `bake-example` 

On the configuration stage, I scroll down and add a new Jenkins automated trigger. Select my master, and then select the Jenkins job shown above (`armory/job/armory-hello-deploy/job/master`). For this example, there is no need to worry about settings a properties file.

Next I add a bake stage (add stage -> Type: Bake)

Select the `us-west-2` region. For the Package field, I enter the base name of my package. In my case, the entire package filename is `armory-hello-deploy_0.5.0-h5.c4baff4_all.deb` so I will input `armory-hello-deploy`. Also, I know that my package is created for Ubuntu 14, so I make sure to select the 'trusty (v14.04)' option. 

https://cl.ly/293D1B3G0a2E

Now I navigate back to the pipeline's execution screen. I press the 'Start Manual Execution' https://cl.ly/3P293B3U152P to kick off the pipeline. When it first starts it looks like:

https://cl.ly/2j3o1f2R3Y3q

At this point if I want to see more details about my bake, I can click the 'View Bakery Details' box. A new window will open up with the bakery logs. In my case, the first few lines look like:

```
==> amazon-ebs: Prevalidating AMI Name...
    amazon-ebs: Found Image ID: ami-3d50120d
==> amazon-ebs: Creating temporary keypair: packer_58dc1ccb-b936-7104-ebe0-0984e888ca78
==> amazon-ebs: Creating temporary security group for this instance...
==> amazon-ebs: Authorizing access to port 22 the temporary security group...
==> amazon-ebs: Launching a source AWS instance...
    amazon-ebs: Instance ID: i-08327d863d1911675
==> amazon-ebs: Waiting for instance (i-08327d863d1911675) to become ready...
==> amazon-ebs: Adding tags to source instance
==> amazon-ebs: Waiting for SSH to become available...
==> amazon-ebs: Connected to SSH!
==> amazon-ebs: Pausing 30s before the next provisioner...
==> amazon-ebs: Provisioning with shell script: /opt/spinnaker/config/packer/install_packages_armory.sh
    amazon-ebs: repository=
    amazon-ebs: package_type=deb
    amazon-ebs: packages=armory-hello-deploy=0.5.0-h5.c4baff4
...
```

Under the hood, Spinnaker is leveraging [HashiCorp's Packer](https://www.packer.io/) tool to create images. The above is a Packer log file. 

The thing I wanted to point out here is that the correct version of the package is getting passed down to the bakery.


After the bake is successful, I see:

https://cl.ly/0100152P1U0y


Notice the AMI name and id is shared in the lower right.


If I press 'Start Manual Execution' again, since the package version hasn't changed, it will reuse the same image rather than rebaking. The screen for that looks like:

https://cl.ly/2I153O1Z330m

Notice the whole pipeline only ran for '00:00' and in the lower right Spinnaker says 'No changes detected; reused existing bake'

## Advanced Options

You can additionally do things like use a specific base AMI, specify your baked AMI's name, use a custom packer script, or pass variables to a packer script.

To get started
If you would like to change the name in AWS of your AMI, you can do so by selecting the 'Show Advanced Options' checkbox in the Bake Stage Configuration. Continuing from our example above, when I see:

https://cl.ly/3z252A1D3S2i

What do all of these fields mean? Great question!


### Changing an AMI's name

If I were to instead input 'mycustomname' into the 'AMI Name' field, like:

https://cl.ly/3v1i3g403I3x

After re-running the pipeline, I see that Spinnaker named the AMI `mycustomname-all-20170329220104-trusty`

https://cl.ly/022b3M0V1X2G

How if I add 'mycustomsuffix' to the 'AMI Suffix' field:

https://cl.ly/3J2A1E3A1v3t

and repeat the bake, I see that Spinnaker named the AMI `mycustomname-all-mycustomsuffix-trusty`


### Public vs Private AMIs

TODO


### Adding Debian repositores

It is common practice to use a base image throughout your team or organization. Usually this base image will be kept up to date with security patches and will contain common tools (DataDog, Splunk, etc clients). It is also a good place to register your Debian repository's GPG keys. 


## Regions

By selecting a region, you are selecting which region the bake will take place. When a bake happens, an instance is spun up, the desired packages are installed, and then a snapshot is taken. Where the instances that spin up are located is determined by which regions you select. 

## Rebaking

When a bake step executes, Spinnaker looks for a previously created image before baking a new one. It uses the set of packages (and their versions) that users specify in the bake stage configuration to determine if the bake is neccessary.

You can force Spinnaker to always bake if you so desire by selecting the 'Rebake: Rebake image without regard to the status of any existing bake' checkbox on the bake stage configuration screen. You also have the option when executing a pipeline manually to force rebaking. 


## Bake and Copy vs Multi-region Bake

There are two options for getting an image to multiple regions in AWS. A common practice outside of Spinnaker is to create your AMI and then copy it to the regions you need. However, Spinnaker by default will do a multi-region bake. Meaning, if you select more than one region, it will go through the process of creating an image in each region (spin up an instance, install the packages, etc).

There are trade offs to each approach. Generally, Spinnaker's default multi-region bake approach is faster than the bake and copy approach. However, if you need to limit all baking activities to one region, then there isn't much of a choice.


## Custom Bake Scripts

If you would like to use a custom Packer script to bake your AMI, you will need to contact your Spinnaker Administrator. The script will have to be installed on your Spinnaker instances.


## Troubleshooting
When you have a failing bake step and you do not know why, a good place to start is with the bakery log. You can find a link to the bakery log in the Detail of your bake step on the pipeline execution screen 

https://cl.ly/2T070y2S0F1G

Click the link that says 'View Bakery Details'. It can be helpful to track down the last command that the bakery executed. 


Another source of information is the pipeline's source link. You can find this link in small writing in the far bottom right of the pipeline execution detail screen. The 'source' is a json representatinon of the data generated by Spinnaker when running your pipeline (not just the bake step).
