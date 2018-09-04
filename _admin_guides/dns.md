---
layout: post
title: Domain Name
order: 60
---

{% include components/legacy_documentation.html %}

Add a DNS Entry to your DNS management system.  You should only need to add a DNS entry for the user-facing ELB which is what you use to currently access Spinnaker.   It typically has a name such as the one below

```
armoryspinnaker-prod-external-123456789.us-west-1.elb.amazonaws.com
```

Add a CNAME entry for the given ELB then make sure to update your `DECK_HOST` and `API_HOST` in your environment file in the `/opt/spinnaker/env` directory

```
DECK_HOST=http://spinnaker.mydomain.com
API_HOST=http://spinnaker.mydomain.com:8084
```
