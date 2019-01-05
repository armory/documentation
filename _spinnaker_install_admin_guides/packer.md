---
layout: post
title: Understanding Bake Scripts (Packer templates)
order: 80
---

# What To Expect
{:.no_toc}
This guide includes:
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

**Note** This section focuses on configuring packer scripts to build machine images (such as AMIs).  If you're only deploying to Kubernetes, you can skip this section.


# What exactly is the packer script?
Spinnaker works best when deploying immutable artifacts to immutable machine images. The packer script is used during the **Bake Stage** to create a immutable machine image.

Spinnaker knows which packer script to use by specifying the packer's configuration json in the **Bake Stage**, in the **`Template File Name`**.
The default is `aws-ebs.json`, which sources `install_package.sh` for debians.

The provided way to do this is by debian/rpm packages stored into a artifact repository (Bintry, Nexus, Artifactory, etc.). The packer script will  pull from the artifact repository and install it onto the machine. Spinnaker will then package up the image and make it available in the next stage of a pipeline.

If your app is using zip, tarballs or you'll need some customization, you'll need to create a new packer script. See [Rosco/Baking Configuration](http://docs.armory.io/admin-guides/rosco/) for steps on how to do this.


# Adding custom packer scripts

Out of the box, Armory Spinnaker comes with these built-in packer templates and scripts: https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer

If you'd like to add additional packer template or script files, you can add them via Halyard:
* If it does not already exist, create this directory: `~/.hal/<deployment-name>/profiles/rosco/packer/`
  * For example, if you're using the default Halyard deployment, then create this directory: `~/.hal/default/profiles/rosco/packer/`
* Add the templates and scripts to the created directory.
  * For example, if you have packer template `aws-custom.json` and script `setup-base.sh`, then you'll end up with these files:
    * `~/.hal/default/profiles/rosco/packer/aws-custom.json`
    * `~/.hal/default/profiles/rosco/packer/setup-base.sh`
* Run `hal deploy apply` to apply your changes.  Your scripts will be added to a Kubernetes secret and added to the Rosco Kubernetes pod(s).

# Using and Verifying The Packer Script
This is is for Ubuntu, with minor changes for Redhat and CentOS.
The default template used is `aws-ebs.json` and `install_package.sh`.

**Bake Configuration** in Spinnaker
Spinnaker can send pipeline variables such as `repository` to the packer script by adding it in the extended attributes. Some attributes are prefilled because of selecting `trusty` as the base OS.
![example](https://cl.ly/41113D0o1h3x/Screen%20Shot%202017-09-05%20at%204.34.58%20PM.png)
