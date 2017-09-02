---
layout: post
title: Spinnaker on Redhat/Centos
order: 150
---

*This guide assumes that you are deploying Spinnaker with a Spinnaker pipeline.*

## Using CentOS or Redhat for Armory Spinnaker
After setting up Spinnaker through the [Spinnaker-Terraform](#spinnaker-terraform) method, change or add the bake stage in the "Spinnaker deploy Spinnaker" pipeline to the following.

**Note**:
- Any selection of `Base OS` will work, it'll be used for AMI naming. Changes can be made through the `spinnaker-local.yml`.
- `Show Advance Options` needs to be checked for the following.

![screenshot of bake stage](https://cl.ly/431n1T2r1O0U/Screen%20Shot%202017-07-24%20at%204.39.17%20PM.png)


#### CentOS
```
Package: armoryspinnaker

Extended Attributes:
    repository: https://yum.dockerproject.org/repo/main/centos/7/; https://dl.bintray.com/armory/rpms
    package_type: rpm
    aws_ssh_username: centos
    aws_instance_type: m4.large

Base AMI: ami-bec022de (a base CentOS 7.1704)
AMI Name: centos-armoryspinnaker
```


#### Redhat
```
Package: armoryspinnaker

Extended Attributes:
    repository: https://yum.dockerproject.org/repo/main/centos/7/; https://dl.bintray.com/armory/rpms
    package_type: rpm
    aws_ssh_username: ec2-user
    aws_instance_type: m4.large

Base AMI: ami-b55a51cc (a base Redhat 7.3)
AMI Name: redhat-armoryspinnaker
```


## Armory Spinnaker AMI & Debian Distribution
When significant updates are available we distribute a new version of Armory Spinnaker that includes updated components from the OSS community edition as well.  We release minor patches every few days for priority fixes.  You can find more under release management.


### Using A Release Candidate Build

1. Update your `armoryspinnaker` bake stage with our release candidate Debian repository.  You'll need to add a new `extended attribute` with the following:

```
Key: repository
Value: https://dl.bintray.com/armory/internal trusty main
```

![bake stage](https://cl.ly/2X443i1W2u3z/Image%202017-08-16%20at%203.31.06%20PM.png)

2. Update `Package` field

Update the package field with the new version given to you by Armory, for example:

`armoryspinnaker=1.8.48`

![edit package field](https://cl.ly/072E001Q0O46/Image%202017-08-16%20at%203.36.36%20PM.png)
