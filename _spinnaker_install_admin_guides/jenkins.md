---
layout: post
title: Configure Jenkins
order: 50
redirect_from:
  - /spinnaker_install_admin_guides/jenkins/
---

Before you can make use of Jenkins in Spinnaker, you'll need to use Halyard
to configure access to your Jenkins masters.

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

> The Spinnaker project has more in-depth documentation on configuring Jenkins
> in Spinnaker [here](https://www.spinnaker.io/setup/ci/jenkins/)

## Enable Jenkins Support

If you haven't already done it, you'll need to enable Jenkins with Halyard
with the command below.  Don't worry if it was already enabled -- nothing bad
will happen if you've already enabled it.

```bash
hal config ci jenkins enable
```

## Add a Jenkins Master

You can add as many Jenkins masters as needed.  Once the master is configured
properly, Spinnaker will use the credentials provided to query for all
available jobs and make them available in the UI for triggers and stages.

```bash
hal config ci jenkins master add my-jenkins-master \
  --address https://jenkins.my.com/ \
  --username myusername \
  --password # You'll be prompted for your password interactively

# Remember to apply changes!
hal deploy apply
```


