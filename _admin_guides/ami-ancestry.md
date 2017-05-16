---
layout: post
order: 90
---

This guide should include:

- Using the AMI Ancestry tool
- Necessary configuration changes

## Using the dashboard.

To find the ancestry tool, navigate your browser to: `http://${SPINNAKER_URL}/armory/audit/`.  You should find the audit dashboard:

![ancestry](https://cl.ly/2N290I2g123M/Image%202017-05-16%20at%2010.03.15%20AM.png)

Entering in an AMI ID will return the parents and descendents of the AMI that was entered.

## Necessary Configuration Changes

We first need to enable Armory Lighthouse to cache the AMIs.  Add the following to `/opt/spinnaker/config/spinnaker-local.yml`:


```
services:
  lighthouse:
    amiCache:
      enabled: true
```

Then we need to add a tag to all packer templates that require tracking through this tool.  This is done by adding the `base_ami` tag to `builders` section of your packer template, typically kept at `/opt/spinnaker/config/`

{
  "builders": [
     {
       "tags": {
         "base_ami": "{{ user `aws_source_ami`}}"
       }
}

Once you've made the changes, restart Armory Spinnaker: `service armory-spinnaker restart`
