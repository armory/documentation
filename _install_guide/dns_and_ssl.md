---
layout: post
title: DNS and SSL
order: 100
---

Topics:
- DNS name changes
- SSL Termination at the ELB

# Create a DNS Entry for your Load Balancer

Add a DNS Entry to your DNS management system.  You should only need to add a DNS entry for the user-facing ELB which is what you use to currently access Spinnaker.   It typically has a name such as the one below

```
armoryspinnaker-prod-external-123456789.us-west-1.elb.amazonaws.com
```

Add a CNAME entry for the given ELB to create a simple name you will use to access your instance of Spinnaker, e.g. spinnaker.armory.io.

# Update Spinnaker Configuration

Update the values for `DECK_HOST` and `API_HOST` in your environment file in the `/opt/spinnaker/env` directory.

```
DECK_HOST=http://spinnaker.mydomain.com
API_HOST=http://spinnaker.mydomain.com
```

# SSL Termination at the ELB

For Secure Sockets Layer (SSL), it can be beneficial to terminate SSL at the Elastic Load Balancer (ELB) whenever feasible. Amazon has the [Key Management Service (KMS)](https://aws.amazon.com/kms/) for this purpose. If you need to handle certificate management at the application level, you might want to check out [Netflix's Lemur](http://techblog.netflix.com/2015/09/introducing-lemur.html) project.
