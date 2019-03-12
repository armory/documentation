---
layout: post
title: Understanding Bake Scripts (Packer templates)
order: 80
# Do not redirect; substantially different from new version.
---

{% include components/legacy_documentation.html %}

# What To Expect
{:.no_toc}
This guide should include:
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

**Note** If you're using Kubernetes, you can skip this section.


# What exactly is the packer script?
Spinnaker works best when deploying immutable artifacts to immutable machine images. The packer script is used during the **Bake Stage** to create a immutable machine image.

Spinnaker knows which packer script to use by specifying the packer's configuration json in the **Bake Stage**, in the **`Template File Name`**.
The default is `aws-ebs.json`, which sources `install_package.sh` for debians.

The provided way to do this is by debian/rpm packages stored into a artifact repository (Bintry, Nexus, Artifactory, etc.). The packer script will  pull from the artifact repository and install it onto the machine. Spinnaker will then package up the image and make it available in the next stage of a pipeline.

If your app is using zip, tarballs or you'll need some customization, you'll need to create a new packer script. See [Rosco/Baking Configuration](http://docs.armory.io/admin-guides/rosco/) for steps on how to do this.


# Where the packer scripts are stored
- On a spinnaker instance: `/opt/spinnaker/config/packer/`  
- In the configuration repo: [`spinnaker-config/deb-config/spinnaker/config/packer/`](https://github.com/Armory/spinnaker-config-deb/tree/master/deb-config/spinnaker/config/packer)



# Using and Verifying The Packer Script
This is is for Ubuntu, with minor changes for Redhat and CentOS.
The default template used is `aws-ebs.json` and `install_package.sh`.

**Bake Configuration** in Spinnaker
Spinnaker can send pipeline variables such as `repository` to the packer script by adding it in the extended attributes. Some attributes are prefilled because of selecting `trusty` as the base OS.
![example](/images/Screen Shot 2017-09-05 at 4.34.58 PM.png)
