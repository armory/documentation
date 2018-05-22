---
layout: post
order: 90
---

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


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

Then we need to add a tag to all packer templates that require tracking through this tool.  This is done by adding the `base_ami` tag to `builders` section of your packer template, typically kept at `/opt/spinnaker/config/packer`:

```
{
  "builders": [
     {
       "tags": {
         "parent_ami": "{% raw  %}{{ user `aws_source_ami`}}{% endraw  %}"
       }
}
```

Once you've made the changes, restart Armory Spinnaker: `service armory-spinnaker restart`. Make sure the Armory Spinnaker Auto Scaling Group health check is set to EC2 rather than ELB. Otherwise the ASG will cycle your Armory Spinnaker instance.
