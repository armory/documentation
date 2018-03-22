---
layout: post
title: Kayenta
order: 69
published: False
---

# Enabling Kayenta

Update your environment file in `/opt/spinnaker/env/` to enable kayenta with the following:
`KAYENTA_ENABLED=true`

## Open Ports

On the internal ELB open up port 8090 which is the default port for `kayenta`

## Enabling Datadog as Metrics Store

In your `kayenta-local.yml` file add your Datadog API Keys:

```
kayenta:
  datadog:
    enabled: true
    accounts:
      - name: my-datadog-account
        apiKey: 0000000000AAAAAAAAAAAA-SAMPLE_KEY
        applicationKey: AAAAAAAAAAAAAAAA00000000000-SAMPLE_KEY
        supportedTypes:
          - METRICS_STORE
        endpoint.baseUrl: https://app.datadoghq.com
```

You'll also need to configure an `OBJECT_STORE` and `CONFIGURATION_STORE`
(Google and AWS support both; you only need to configure one).

```
  google:
    enabled: false
#    accounts:
#      - name:
#        project:
#        jsonPath: /path/to/gcp.json
#        bucket:
#        rootFolder: kayenta
#        supportedTypes:
#          - METRICS_STORE
#          - OBJECT_STORE
#          - CONFIGURATION_STORE

  aws:
    enabled: false
#    accounts:
#      - name:
#        bucket:
#        rootFolder: kayenta
#        supportedTypes:
#          - OBJECT_STORE
#          - CONFIGURATION_STORE
```

Restart Armory Spinnaker

```
service armory-spinnaker restart
```


