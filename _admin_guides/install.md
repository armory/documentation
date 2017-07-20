---
layout: post
title: Installation
order: 30
---
# Installing Armory Spinnaker
{:.no_toc}

The installer is a script that is responsible for asking the user for customer specific inputs like AWS keys, VPC, subnets and S3 buckets. These inputs are kept locally on your system and then passed to Terraform.  You can also install Armory Spinnaker directly from the Debian or RPM package if you don't need the additional resources (S3/ElastiCache/IAM roles) created for you.





* Table of Contents
{:toc}

## Installing Armory Spinnaker Installer Scripts
Armory Spinnaker comes with an installer that walks you through deploying Spinnaker in your AWS account.  It should only take 15 minutes to have an instance of Armory Spinnaker up and running.  To get started, open up a terminal and execute the following:

`bash -c "$(curl -sS http://get.armory.io)"`

If you want to learn more about what is happening behind the scenes, you can go through the components below.


### Continuing From A Previous Install
![previous](https://cl.ly/0T2O2i0Q2f1q/Image%202017-04-14%20at%209.15.55%20AM.png)

### Terraform Templates
Armory Spinnaker relies on Terraform templates to create the infrastructure described above.  The `tfstate` file is created and backed by S3 for record keeping.

#### Spinnaker-Terraform
Configuration(s) to set Spinnaker up for the first time.

`ha` - Configuration for a highly available setup.

`stand-alone` - Configuration for a development setup.

`modules` - Common configuration shared by both setups.

The installer will download the latest stable version of the Terraform files and place them in `~/armory/`. - If you want to customize how the bootstrapped version of Spinnaker is installed, make changes to the template files in `~/armory/` and run the installer again.


## Installing Armory Spinnaker From A Debian Package
We provide a Debian package that will install all the dependencies needed to install as a bootstrap.  From there you can deploy [Spinnaker with Spinnaker](/admin-guides/redeploying-spinnaker) to additional targets like RHEL or CentOS.

```
apt-get update && apt-get install -y \
      apt-transport-https \
      ca-certificates \
      curl

curl -fsSL https://yum.dockerproject.org/gpg | sudo apt-key add -

apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 379CE192D401AB61


echo "deb https://apt.dockerproject.org/repo/ ubuntu-$(lsb_release -cs) main" \
        | sudo tee -a /etc/apt/sources.list

echo "deb https://dl.bintray.com/armory/debians trusty main" \
  | sudo tee -a /etc/apt/sources.list

apt-get update

apt-get install armoryspinnaker
```



## Install ArmorySpinnaker on Redhat and CentOS
We provide a RPM package that will install all dependancies needed.
From there you can deploy [Spinnaker with Spinnaker](/admin-guides/redeploying-spinnaker).
```bash
sudo cat << EOF > /etc/yum.repos.d/armory-docker.repo
[armory-docker]
name=armory-docker
baseurl=https://yum.dockerproject.org/repo/main/centos/7/
gpgcheck=0
enabled=1
EOF

sudo cat << EOF > /etc/yum.repos.d/armory-spinnaker.repo
[armory-spinnaker]
name=armory-spinnaker
baseurl=https://dl.bintray.com/armory/rpms
gpgcheck=0
enabled=1
EOF

sudo yum -y install armoryspinnaker
```



## Armory Spinnaker AMI & Debian Distribution
When significant updates are available we distribute a new version of Armory Spinnaker that includes updated components from the OSS community edition as well.  We release minor patches every few days for priority fixes.  You can find more under release management.
