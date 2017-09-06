---
layout: post
title: Understanding Bake Scripts (Packer scripts)
order: 80
---
**Note** If you're using Kubernetes, you can skip this section.


# What exactly is the packer script?
Spinnaker works best when deploying immutable artifacts to immutable machine images. The packer script is used during the **Bake Stage** to create a immutable machine image.

Spinnaker knows which packer script to use by specifying the packer's configuration json in the **Bake Stage**, in the **`Template File Name`**.
The default is `aws-ebs.json`, which sources `install_package.sh` for debians.

The provided way to do this is by debian/rpm packages stored into a artifact repository (Bintry, Nexus, Artifactory, etc.). The packer script will  pull from the artifact repository and install it onto the machine. Spinnaker will then package up the image and make it available in the next stage of a pipeline.

If your app is using zip, tarballs or you'll need some customization, you'll need to create a new packer script. See [Rosco/Baking Configuration](https://docs.armory.io/admin-guides/rosco/#rosco-baking-configuration) for steps on how to do this.



# Where the packer scripts are stored
- On a spinnaker instance: `/opt/spinnaker/config/packer/`  
- In the configuration repo: [`spinnaker-config/deb-config/spinnaker/config/packer/`](https://github.com/Armory/spinnaker-config-deb/tree/master/deb-config/spinnaker/config/packer)



# Using the packer script
Spinnaker can send pipeline variables such as `repository` to the packer script by adding it in the extended attributes. Some attributes are already included depending on the **Base OS**.
![example](https://cl.ly/41113D0o1h3x/Screen%20Shot%202017-09-05%20at%204.34.58%20PM.png)