---
layout: post
title: Understanding Bake Scripts (Packer templates)
order: 80
# Substantially different from install_guide/packer
redirect_from:
  - /spinnaker_install_admin_guides/packer/
---

# What To Expect
{:.no_toc}
This guide includes:
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

**Note** This section focuses on configuring packer scripts to build machine images (such as AMIs).  If you're only deploying to Kubernetes, you can skip this section.

# What exactly are packer scripts?
Spinnaker works best when deploying immutable artifacts to immutable machine images. When working with machine images, packer scripts are used during the **Bake Stage** to create an immutable machine image.

Spinnaker has a microservice called Rosco, which uses [Packer](https://www.packer.io/) to bake machine images (such as Amazon Machine Images or AMIs).  Out of the box, it comes with the packer templates and scripts listed [here](https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer).

By default, Rosco performs the following actions in a "Bake" stage:
* Takes a list of desired packages specified in the pipeline definition
* Identifies the `deb` files produced by your CI pipeline and matches those to the desired package
* Creates a set of Packer variables using the name/repository of the matched `deb` file(s)
* Bakes an AMI using the `aws-ebs.json` packer template (visible [here](https://github.com/spinnaker/rosco/blob/master/rosco-web/config/packer/aws-ebs.json))
* Runs the `install_packages.sh` script (visible [here](https://github.com/spinnaker/rosco/blob/master/rosco-web/config/packer/install_packages.sh)) to install the identified `deb` packages into the AMI
* Make the AMI ID available to later stages in the Spinnaker pipeline (such as deployments)

In a bake stage configuration, you can specify other packer templates to use.

If your app is using zip, tarballs or you'll need some customization, you'll need to create a new packer script (see below).

# Adding custom packer scripts to Armory Spinnaker

Out of the box, Armory Spinnaker comes with these built-in packer templates and scripts: https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer

If you'd like to add additional packer template or script files, you can add them via Halyard:

* If it does not already exist, create this directory: `~/.hal/<deployment-name>/profiles/rosco/packer/`
  * For example, if you're using the default Halyard deployment, then create this directory: `~/.hal/default/profiles/rosco/packer/`
* Add the templates and scripts to the created directory.
  * For example, if you have packer template `aws-custom.json` and script `setup-base.sh`, then you'll end up with these files:
    * `~/.hal/default/profiles/rosco/packer/aws-custom.json`
    * `~/.hal/default/profiles/rosco/packer/setup-base.sh`
* Run `hal deploy apply` to apply your changes.  Your scripts will be added to a Kubernetes secret and added to the Rosco Kubernetes pod(s).

**Bake Configuration** in Spinnaker
Spinnaker can send pipeline variables such as `repository` to the packer script by adding it in the extended attributes. Some attributes are prefilled because of selecting `trusty` as the base OS.
![example](https://cl.ly/41113D0o1h3x/Screen%20Shot%202017-09-05%20at%204.34.58%20PM.png)
