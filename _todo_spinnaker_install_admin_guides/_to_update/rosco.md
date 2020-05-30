---
layout: post
title: Baking Configuration
published: false
order: 120
---

{% include components/legacy_documentation.html %}

# What is Rosco?
{:.no_toc}

Rosco is the sub-service that manages baking using [Packer](https://www.packer.io/docs/), a cloud agnostic tool that automates the creation of images.  Rosco is a small API which manages the state of packer jobs and their executions so that it can report to other sub-systems. Make sure to read up on [Understanding Bake Scripts (Packer scripts)]({% link _install_guide/packer.md %}).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}



## Configurations for Baking
{:.no_toc}


### Templates Location
The default location is `/opt/spinnaker/config/packer` for Armory Spinnaker, however this can be changed.
You can specify the following in  
`/opt/spinnaker/config/rosco-local.yml`:
```
rosco:
  configDir: ${services.rosco.configDir:/opt/rosco/config/packer}
```

![baking templates](/images/Image-2017-04-17-at-7.06.45-AM.png)


### Region Templates

In some cases you'll want to bake in multiple multiple regions but in order to do so you'll need to create variable files that tell packer where and how to bake the image.  You can do this using [Packer's template variables from a file](https://www.packer.io/docs/templates/user-variables.html#from-a-file).  You can configure your bake stage to use the region template you need by using the `${region}` variable and selecting the regions where would like the bake to occur.  This is a _much_ faster process than copying the AMIs across regions because the bakes happen in parallel.


### Using Templates
When selecting a **Base OS**, the default template will be used. The default is **Base OS** is `Ubuntu 12.04/14.0`, which uses `aws-ebs.json` and `install_package.sh`. See [Setting Up Base OS Defaults for Baking](#setting-up-base-o-s-defaults-for-baking) on how to change the defaults.

You can also specify a template in the bake stage.  The example below shows the template being set to `mycompany-ebs.json` using the **Template File Name** setting for the stage. Spinnaker allows variables so you can even make each template dynamic.  
![bake configuration](/images/Image-2017-08-07-at-12.45.20-PM.png)

Example of baking `armory-spinnaker` in CentOS (without defining the correct Base OS):
![img](/images/Screen-Shot-2017-09-07-at-5.40.01-PM.png)



### Getting to Know Packer
[Packer's documentation can be found here](https://www.packer.io/docs/index.html). In brief, Spinnaker will execute `packer build` with the provided json, which then will execute the `packer_script.sh`.



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



### Working on Packer Scripts
There's a few options on getting a config change out.
1. Make a change to `spinnaker-config` repo and wait for a redeploy.  
This method is useful for minor changes and to keep Spinnaker highly available with less downtime. However a bake and deploy will take on a minimum of 5-10 minutes.

2. Make changes on a Spinnaker instance itself, then commit the changes later. See [Making Config Changes on Spinnaker](#making-config-changes-on-spinnaker).
This method will scale down Spinnaker to one instance, and allow for a quick development cycle. Keep in mind that if there's anyone using Spinnaker, this will have a drastic, noticeable effect.

It's best to iterate packer scripts by:
1. Copy steps from your app's current deployment into your new packer script.  
This might come from your chef, puppet, ansible, or shell scripts. For the first iteration, it's helpful to imagine it like setting up a brand new instance for an environment. Ex: copying all the `apt-get install` commands, dependencies (like nginx, pm2, gunicorn, ...) and dependency configs. Make sure to double check for secrets or environment variables that are injected (`ENV=production`, `DB_URI=localhost:3389`, `DB_USER_NAME=user`, ...).

2. Make sure the app is deployed and working like the old style.  

3. Start simplifying the script. Check out [Things to keep in mind](#things-to-keep-in-mind) for tips.


### Making Config Changes on Spinnaker

1. **Scale down all Spinnaker instances except 1 polling instance** :
Armory Spinnaker is set to spin up in high availability mode, this means there's a potential for a pipeline to execute on one instance and bake on another instance.
![gif](/images/Screen-Recording-2017-09-05-at-06.12-PM.gif)

2. **Set the healthcheck for Spinnaker to be EC2** :
If we're making changes to **rosco**, this will require you to restart Armory Spinnaker (`service armory-spinnaker restart`). This will prevent the ASG healthchecks from destroying your instance while you're working on it.

3. **SSH into the Spinnaker instance**

4. **sudo su** :
Spinnaker runs in root and all the files are owned by root.

5. **`cd /opt/spinnaker`** :
This is the home for Spinnaker

6. (optional) `export GIT_DIR=/opt/spinnaker/.git ; git init && git add . && git commit -m "init" ; unset GIT_DIR`  
Initialize `/opt/spinnaker` as a git repo. It's helpful to see what exactly is changed throught the process.

7. **`cd config/packer`**


### Modifying Packer Templates and Install Scripts

If your organization uses different repositories between groups or if you need some additional custom logic run when baking images it is possible to customize the files that Rosco uses to drive Packer. As mentioned in the Template Files section above, those templates are normally stored in `/opt/spinnaker/config/packer`. The easiest way to get customizations working is to copy an existing example and add it to your spinnaker config.


#### Example: Installing Docker before Each Bake
Lets install Docker and make sure we get add the GPG key for their repo.

- Let's start by copying [`aws-ebs.json`](https://github.com/spinnaker/rosco/blob/master/rosco-web/config/packer/aws-ebs.json) to `my-custom-baker.json`.
- Let's start by copying [`install_packages.sh`](https://github.com/spinnaker/rosco/blob/master/rosco-web/config/packer/install_packages.sh) to `my-custom-install_packages.sh`.

In the `my-custom-baker.json`, modify the **provisioners** section so that the script entry points to our custom installer script:
```
{% raw %}
"script": "{{user `configDir`}}/my-custom-install_packages.sh",
{% endraw %}
```

In `my-custom-install_packages.sh` script, add the logic you need to have run when a bake instance starts up.
```
{% raw %}
# Add the docker gpg key
curl -fsSL https://yum.dockerproject.org/gpg | sudo apt-key add -

# Add the docker repo to the sources list
echo "deb https://apt.dockerproject.org/repo/ ubuntu-$(lsb_release -cs) main" \
      | sudo tee -a /etc/apt/sources.list
{% endraw %}
```

Once you have the custom template and script deployed onto your Spinnaker cluster you can now set **Template File Name** in Bake Configuration to `my-custom-baker.json`.



### Setting Up Base OS Defaults for Baking

The default configurations use `Ubuntu 12.04/14.0` as the default choices for Base OS - these are configurable by adding the configurations below to your `rosco-local.yml`.   You can specify a different `templateFile` per base image which should save time from a user perspective so they don't have to specify an additional parameter.  You can specify multiple base images and visualization settings for each region you need to process bakes.

> **Note** There's currently a bug in the YAML merge that if you specify less than 3 `baseImages` (listed in `rosco.yml`), Spinnaker will show `null null` in the drop down for **Base OS**.


Here's a simple version of `rosco-local.yml`. See [Full Version](https://github.com/spinnaker/rosco/blob/master/rosco-web/config/rosco.yml)
```
aws:
  enabled: true
  bakeryDefaults:
    awsAssociatePublicIpAddress: true
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
        spotPrice: 0
        spotPriceAutoProduct: Linux/UNIX (Amazon VPC)
      - region: us-west-1
        virtualizationType: hvm
        instanceType: t2.micro
        sourceAmi: ami-4f285a2f
        sshUserName: ubuntu
        spotPrice: 0
        spotPriceAutoProduct: Linux/UNIX (Amazon VPC)
    - baseImage:
        id: trusty
        shortDescription: v14.04
        detailedDescription: Ubuntu Trusty Tahr v14.04
        packageType: deb
        # The following AMI ID's were retrieved from here:
        # https://cloud-images.ubuntu.com/locator/ec2/
      virtualizationSettings:
      - region: us-east-1
        virtualizationType: hvm
        instanceType: t2.micro
        sourceAmi: ami-9d751ee7
        sshUserName: ubuntu
        spotPrice: 0
        spotPriceAutoProduct: Linux/UNIX (Amazon VPC)
      - region: us-east-2
        virtualizationType: hvm
        instanceType: t2.micro
        sourceAmi: ami-7960481c
        sshUserName: ubuntu
        spotPrice: 0
        spotPriceAutoProduct: Linux/UNIX (Amazon VPC)
```


### Things to keep in mind
#### Try to use only 1 packer script across an organization
* Otherwise this can lead to packer script explosion and splits the ownership of the app.
* There's going to be a lot of changes to the `spinnaker-config` which will become a nightmare.
* Checkout [`install_package.sh`](https://github.com/spinnaker/rosco/blob/master/rosco-web/config/packer/install_packages.sh) to get an idea.

#### Avoid install secrets during bake time
* A potential security issue.
* Instead, on boot time of the image, an machine  should pull the secret from a secret store.

#### Avoid adding all the dependencies into the packer script
* This will slow the the bake times because bake will be downloading and installing on each new app change.
* Instead, use a prebake stage or prebaked image to speed up deploy times. Spinnaker will cache an existing bake if no changes have been made.

#### Avoid having too many prebaked images.
* After a while, we run into versioning and update issues with the images across multiple apps.
* Instead, have a single base image, (potentially a security hardened) image, shared across the entire organization. Here's some ways to accomplish this:
  - Fill the **Base AMI** section for a Bake
  - Have a `Find Image` stage which would pick the latest base image.
  - [Allow packer to find the latest image](#dynamically-generating-base-a-m-i).
