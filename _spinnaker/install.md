---
layout: post
title: Installation
order: 10
---
# Installing Armory Spinnaker
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Try Armory's Demo Environment

You can [try our Demo Environment](https://spinnaker.demo.armory.io) before installing Armory.

## Installing Spinnaker with Armory Halyard

You can install Armory's version of Halyard on Mac OSX.

### On Mac OSX:

You can download the installer and run it with this command:

```
curl -L https://get.armory.io/halyard/install/latest/macos/InstallArmoryHalyard.sh > InstallArmoryHalyard.sh && sudo bash InstallArmoryHalyard.sh --version latest
```

This should install the `hal` command in `/usr/local/bin`.  You can test that
you have the correct version in your path by running `hal armory` and see a
help screen that includes a `SUBCOMMANDS` section with at least an `init`
option that "Runs Armory installer":

```
$ hal armory
ARMORY
...
SUBCOMMANDS

  init
    Runs Armory installer
```

## Installing Armory Spinnaker

With Armory's version of Halyard installed, you can install Armory Spinnaker
with the command:

```
$ hal armory init
```

This will download the Armory installer and walk you through the initial
installation of Spinnaker.  You'll need to have a kubectl file already set
up to use Amazon EKS, and your AWS credentials file handy.



