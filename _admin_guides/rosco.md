---
layout: post
title: Rosco/Baking Configuration
order: 120
---

# Baking Images With Rosco

Rosco is the sub-service that manages baking using [Packer](https://www.packer.io/docs/), a cloud agnostic tool that automates the creation of images.  Rosco is a small API which manages the state of packer jobs and their executions so that it can report to other sub-systems.  It is highly extendable to work for different types of environments.  

## Rosco Configuration for Baking

### Templates Location
You can tell Rosco where it should look for template files and scripts.  The default location is `/opt/spinnaker/config/packer` for Armory Spinnaker.  With a standard Spinnaker distribution you should find various examples to extend.  In most cases you will want to take a template file and add your custom packer properties to build correctly.  You will only need to add your files here in this directory and then reference them in your bake stage under the `Template File Name` field.  There's a more complete example of modifying a template and install script below.


You can specify the following in `/opt/spinnaker/config/rosco-local.yml`:
```
rosco:
  configDir: ${services.rosco.configDir:/opt/rosco/config/packer}
```

![baking templates](https://d1ax1i5f2y3x71.cloudfront.net/items/0K1S1l3L2M0z373A0L1o/Image%202017-04-17%20at%207.06.45%20AM.png?X-CloudApp-Visitor-Id=2686178)


### Region Templates

In some cases you'll want to bake in multiple multiple regions but in order to do so you'll need to create variable files that tell packer where and how to bake the image.  You can do this using [Packer's template variables from a file](https://www.packer.io/docs/templates/user-variables.html#from-a-file).  You can configure your bake stage to use the region template you need by using the `${region}` variable and selecting the regions where would like the bake to occur.  This is a _much_ faster process than copying the AMIs across regions because the bakes happen in parallel.

![bake configuration](https://cl.ly/1g1M192j3M2D/Image%202017-08-07%20at%2012.45.20%20PM.png)


### Dynamically Generating Base AMI

In some cases you'll want to dynamically generate a Base AMI for all deployments of Spinnaker instead of using the `Find Images` stage to determine the latest base AMI to use.  This effectively saves a step for every deployment.  You can [specify a  source_ami_filter](https://www.packer.io/docs/builders/amazon-ebs.html#source_ami_filter) in your packer template which is run before the packer instance is created to find the base AMI to use.

```
{
  "source_ami_filter": {
    "filters": {
      "virtualization-type": "hvm",
      "name": "mycompany-base-security-patched-*",
      "root-device-type": "ebs"
    },
    "owners": ["099720109477"],
    "most_recent": true
  }
}
```

### Using Package (deb/rpm/chocolatey) Repositories

You can specify an apt repository (used when baking debian based images) and/or a yum repository (used when baking an rpm based imaged) and/or a chocolatey repository (used when baking a nuget based image).

```
debianRepository: http://dl.bintray.com/spinnaker/ospackages
yumRepository: https://https://jfrog.bintray.com/yourpath
chocolateyRepository: https://chocolatey.org/api/v2/
```

### Modifying Packer Templates and Install Scripts

If your organization uses different repositories between groups or if you need some additional custom logic run when baking images it is possible to customize the files that Rosco uses to drive Packer. As mentioned in the Template Files section above, those templates are normally stored in /opt/spinnaker/config/packer. The easiest way to get customizations working is to copy an existing example and add it to your spinnaker config. For instance say we want to start from the aws-ebs.json template and install Docker on all our baked images, but need to install the Docker deb GPG key to add their repo.

There are two files we need to copy over into our configuration. Copy the aws-ebs.json file and name it aws-ebs-custom.json. And copy the install_packages.sh into your config and name it install_packages_custom.sh.

In the aws-ebs-custom.json template there's only one change we need to make. Modify the provisioners section so that the script entry points to our custom installer script:

```
{% raw %}
"script": "{{user `configDir`}}/install_packages_custom.sh",
{% endraw %}
```

In the install_packages_custom.sh script add the logic you need to have run when a bake instance starts up. For our example we'll add the following lines to the provision_deb() function:

```
{% raw %}
#Add the docker gpg key
curl -fsSL https://yum.dockerproject.org/gpg | sudo apt-key add -

#Add the docker repo to the sources list
echo "deb https://apt.dockerproject.org/repo/ ubuntu-$(lsb_release -cs) main" \
      | sudo tee -a /etc/apt/sources.list
{% endraw %}
```

Once you have the custom template and script deployed to your Spinnaker cluster you can use it by changing the "Template File Name" in Bake Configuration to aws-ebs-custom.json.

### Setting Up Base OS Defaults for Baking

The default configurations use Ubuntu 12.04/14.0 as the default choices for Base OS - these are configurable by adding the configurations below to your `rosco-local.yml`.   You can specify a different `templateFile` per base image which should save time from a user perspective so they don't have to specify an additional parameter.  You can specify multiple base images and virtualization settings for each region you need to process bakes.

```
aws:
  enabled: true
  bakeryDefaults:
    awsAssociatePublicIpAddress: false
    templateFile: aws-ebs.json
    defaultVirtualizationType: hvm
    baseImages:
    - baseImage:
        id: ubuntu
        shortDescription: v12.04
        detailedDescription: Ubuntu Precise Pangolin v12.04
        packageType: deb
        # You can specify the templateFile used for this baseImage.
        # If not specified, the default templateFile will be used.
        templateFile: aws-ebs.json
        virtualizationSettings:
        - region: us-east-1
          virtualizationType: hvm
          instanceType: t2.micro
          sourceAmi: ami-d4aed0bc
          sshUserName: ubuntu
    - baseImage:
        id: trusty
        shortDescription: v14.04
        detailedDescription: Ubuntu Trusty Tahr v14.04
        packageType: deb
        virtualizationSettings:
        - region: us-east-1
          virtualizationType: hvm
          instanceType: t2.micro
          sourceAmi: ami-9eaa1cf6
          sshUserName: ubuntu
```
