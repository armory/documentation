---
layout: post
title: Barometer
order: 70
published: True
---

# Enabling Barometer

Update your environment file in `/opt/spinnaker/env/` to enable barometer with the following:
`BAROMETER_ENABLED=true`

## Open Ports

On the internal ELB open up port 9092 which is the default port for `barometer`
## Enabling Datadog

In your `barometer-local.yml` file add your Datadog API Keys:

```
datadog:
  apiKey: 0000000000AAAAAAAAAAAA-SAMPLE_KEY
  applicationKey: AAAAAAAAAAAAAAAA00000000000-SAMPLE_KEY

spinnaker:
  redis:
    host: ${services.redis.host}
    port: ${services.redis.port}
```

Restart Armory Spinnaker

```
service armory-spinnaker restart
```
