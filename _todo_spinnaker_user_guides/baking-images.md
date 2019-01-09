---
layout: post
title: Placeholder
published: false
---

## Baking Using `chroot`

Baking using the `chroot` builder for packer allows you to bake an AMI without having to spin up a new instance.  Instead, a new EBS volume is mounted to the running Spinnaker instance, `chroot` is executed on the new volume, packer installs the required packages on the volume, a snapshot is taken, and then volume is cleanly detached.  To enable `chroot` style baking, we'll need to configure `rosco` with some additional properties.  Add the following to `/opt/spinnaker/compose/docker-compose.override.yml`:

```yaml
version: "2.1"
services:
  rosco:
    privileged: true
    volumes:
      - /dev:/dev
```

Armory Spinnaker comes with a [default chroot template](https://github.com/armory-io/rosco/blob/master/rosco-web/config/packer/aws-chroot.json) which is named `aws-chroot.json` and stored your other packer templates in `/opt/spinnaker/config/packer`. Make sure to use this template (or a user provided template) when configuring your bake stage.  

> Note: There are a few ["gotchas"](https://www.packer.io/docs/builders/amazon-chroot.html#gotchas) with chroot builders.  