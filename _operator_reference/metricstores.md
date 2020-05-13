---
layout: post
title: Metric Stores Config
order: 8
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Parameters

**spec.spinnakerConfig.config.metricStores**

Metrics stores are used to store metrics for the various Spinnaker micro-services. These metrics are not related in any way to Canary deployments. The technologies backing both are similar, but metric stores are places to push metrics regarding Spinnaker metrics, whereas Canary metrics stores are used to pull metrics to analyze deployments. This configuration only affects the publishing of metrics against whichever metric stores you enable (it can be more than one).


```yaml
metricStores:
  enabled:
  period:
  prometheus:
    push_gateway:
    add_source_metalabels:
    enabled:
  datadog:
    enabled:
    api_key:
    app_key:
    tags:
    - tag1
  stackdriver:
    enabled:
    credentials_path:
    project:
    instance_id:
  newrelic:
    enabled:
    insert_key:
    host:
    tags:
    - tag1
```

- `enabled`: true or false.
- `period`: Set the polling period for the monitoring daemon, e.g. 30
- `prometheus`: Prometheus configuration
- `datadog`: Datadog configuration
- `stackdriver`: Stackdriver configuration
- `newrelic`: New Relic configuration

## Prometheus

- `push_gateway`: The endpoint the monitoring Daemon should push metrics to. If you have configured Prometheus to automatically discover all your Spinnaker services and pull metrics from them this is not required.
- `add_source_metalabels`: true or false.
- `enabled`: true or false.

## Datadog

- `enabled`: true or false.
- `api_key`: Your datadog API key. Supports encrypted value.
- `app_key`: Your datadog app key. This is only required if you want Spinnaker to push pre-configured Spinnaker dashboards to your Datadog account. Supports encrypted value.
- `tags`: Your datadog custom tags. Please delimit the KVP with colons, e.g. `app:test` `env:dev`

## Stackdriver

- `enabled`: true or false.
- `credentials_path`: A path to a Google JSON service account that has permission to publish metrics. File needs to be present on the machine running Spinnaker. Supports encrypted file.
- `project`: The project Spinnaker's metrics should be published to.
- `zone`: The zone Spinnaker's metrics should be associated with.
- `instance_id`:

## New Relic

- `enabled`: true or false.
- `insert_key`: Your New Relic Insights insert key. Supports encrypted value.
- `host`: The URL to post metric data to. In almost all cases, this is set correctly by default and should not be used.
- `tags`: Your custom tags. Please delimit the KVP with colons, e.g. `app:test` `env:dev`
