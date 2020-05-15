---
layout: post
title: Upgrade Spinnaker using Halyard
order: 28
---


{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Determining the target version

First, determine which version of Armory Spinnaker you want to use.  You can get this list by running `hal version list`.

The command returns information similar to the following: 

```bash
+ Get current deployment
  Success
+ Get Spinnaker version
  Success
+ Get released versions
  Success
+ You are on version "1.14.209", and the following are available:
 - 1.14.209 (OSS Spinnaker v1.8.6):
   Changelog: https://docs.armory.io/release-notes/armoryspinnaker_v1.14.209/
   Published: Thu Sep 13 18:42:49 EDT 2018
   (Requires Halyard >= 1.0.0)
 - 2.0.0 (OSS Release 1.9.5):
   Changelog: https://docs.armory.io/release-notes/armoryspinnaker_v2.0.0/
   Published: Fri Nov 02 19:42:47 EDT 2018
   (Requires Halyard >= 1.2.0)

```


## Performing an upgrade

Once you know what version you want to upgrade (or downgrade) to, run the following command: `hal config version edit --version <target_version>`.

The command returns information similar to the following: 
```bash
+ Get current deployment
  Success
+ Edit Spinnaker version
  Success
+ Spinnaker has been configured to update/install version
  "2.19.6". Deploy this version of Spinnaker with `hal deploy apply`.
```

Then, apply your upgrade with `hal deploy apply`.

## Rolling back an upgrade

Rolling an upgrade back is similar to upgrading Spinnaker:

1. Select the version you want to rollback to:
   ```
   hal config edit --version <target_version>
   ```
2. Apply the rollback:
   ```
   hal deploy apply
   ```   

### Rolling back an unresponsive Spinnaker deployment

If you deploy a configuration or a change that takes down Spinnaker, rolling Spinnaker back requires modifying the Autoscaling Groups (ASGs) for the current unavailable deployment and the previous working state. The following steps walk you through how to rollback to a good state on AWS:

1. In your AWS console, look for an existing deployment with the `armoryspinnaker` prefix.
2. Find the ASGs of Armory Spinnaker that were deployed. Typically, they should be named `armoryspinnaker-ha-polling-v${VER}` where `${VER}` is something like `023`. You should see 2 ASGS, one that is active instead and the older version should be disabled:
3. Edit the older ASG and remove any suspended processes that are listed: 
4. Increase the number of instances for the `armoryspinnaker-ha-polling` ASG to just 1 and set the other ASG `armoryspinnaker-ha`, the non-polling ASG back to at least 2.  
5. Reduce the latest ASGs down to 0.
6. Check the Armory Spinnaker ELB. Make sure all instances are attached to the user-facing and internal-services ELB and are healthy.
7. Verify Spinnaker is in a working state.