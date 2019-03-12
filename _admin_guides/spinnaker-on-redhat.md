---
layout: post
title: Spinnaker on Redhat/Centos
order: 150
---
{% include components/legacy_documentation.html %}

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Using CentOS or Redhat for Armory Spinnaker
After setting up Spinnaker through the [Spinnaker-Terraform](#spinnaker-terraform) method, change or add the bake stage in the "Spinnaker deploy Spinnaker" pipeline to the following.

**Note**:
- Any selection of `Base OS` will work, it'll be used for AMI naming. Changes can be made through the `spinnaker-local.yml`.
- `Show Advance Options` needs to be checked for the following.

![screenshot of bake stage](/images/Screen Shot 2017-07-24 at 4.39.17 PM.png)


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

![bake stage](/images/Image 2017-08-16 at 3.31.06 PM.png)

2. Update `Package` field

Update the package field with the new version given to you by Armory, for example:

`armoryspinnaker=1.8.48`

![edit package field](/images/Image 2017-08-16 at 3.36.36 PM.png)
