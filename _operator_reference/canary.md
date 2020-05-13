---
layout: post
title: Canary Config
order: 4
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Parameters

**spec.spinnakerConfig.config.canary**

```yaml
canary:
  enabled: true
  reduxLoggerEnabled:
  defaultMetricsAccount:
  defaultStorageAccount:
  defaultJudge:
  defaultMetricsStore:
  stagesEnabled:
  atlasWebComponentsUrl:
  templatesEnabled:
  showAllConfigsEnabled:
  serviceIntegrations:
```

- `enabled`: true or false
- `reduxLoggerEnabled`: true or false; whether or not to enable redux logging in the canary module in deck (Default: true).
- `defaultMetricsAccount`: Name of metrics account to use by default.
- `defaultStorageAccount`: Name of storage account to use by default.
- `defaultJudge`: Name of canary judge to use by default (Default: NetflixACAJudge-v1.0).
- `defaultMetricsStore`: Name of metrics store to use by default (e.g. atlas, datadog, prometheus, stackdriver).
- `stagesEnabled`: true or false; whether or not to enable canary stages in deck (Default: true).
- `atlasWebComponentsUrl`: Location of web components to use for Atlas metric configuration.
- `templatesEnabled`: true or false; whether or not to enable custom filter templates for canary configs in deck (Default: true).
- `showAllConfigsEnabled`: true or false; whether or not to show all canary configs in deck, or just those scoped to the current application (Default: true).
- `serviceIntegrations`: list of configured canary services

## Service Integrations

**spec.spinnakerConfig.config.canary.serviceIntegrations**

```yaml
canary:
  enabled:
  serviceIntegrations:
    - name:
      enabled:
      accounts:
    - name:
      enabled:
      accounts:
```

### AWS

```yaml
- name:
  enabled:
  accounts:
  - name:
    bucket:
    region:
    rootFolder:
    profileName:
    endpoint:
    accessKeyId:
    secretAccessKey:
    supportedTypes:
    - METRICS_STORE
    - CONFIGURATION_STORE
    - OBJECT_STORE
  s3Enabled:
```

- `name`: aws
  - `enabled`: true or false
  - `accounts`:
      - `name`: account name
        - `bucket`: The name of a storage bucket that your specified account has access to. If you specify a globally unique bucket name that doesn't exist yet, Kayenta will create that bucket for you.
        - `region`: The region to use.
        - `rootFolder`: The root folder in the chosen bucket to place all of the canary service's persistent data in (Default: kayenta).
        - `profileName`: The profile name to use when resolving AWS credentials. Typically found in ~/.aws/credentials (Default: default).
        - `endpoint`: The endpoint used to reach the service implementing the AWS api. Typical use is with Minio.
        - `accessKeyId`: The default access key used to communicate with AWS.
        - `secretAccessKey`: The secret key used to communicate with AWS. Supports encrypted value.
        - `supportedTypes`: One of: `METRICS_STORE`, `METRICS_STORE`, `OBJECT_STORE`
            - METRICS_STORE
            - CONFIGURATION_STORE
            - OBJECT_STORE
  - `s3Enabled`: true or false; whether or not to enable S3 as a persistent store (Default: `false`).

### Datadog

```yaml
- name:
  enabled:
  accounts:
  - name:
    endpoint:
      baseUrl:
    apiKey:
    applicationKey:
    supportedTypes:
    - METRICS_STORE
    - CONFIGURATION_STORE
    - OBJECT_STORE
```

- `name`: datadog
  - `enabled`: true or false
  - `accounts`:
      - `name`: account name
        - `endpoint`:
          - `baseUrl`: (*Required*) The base URL to the Datadog server.
        - `apiKey`: (*Required*) Your org's unique Datadog API key. See https://app.datadoghq.com/account/settings#api. Supports encrypted value.
        - `applicationKey`: (*Required*) Your Datadog application key. See https://app.datadoghq.com/account/settings#api. Supports encrypted value.
        - `supportedTypes`: One of: `METRICS_STORE`, `METRICS_STORE`, `OBJECT_STORE`
            - METRICS_STORE
            - CONFIGURATION_STORE
            - OBJECT_STORE

### Google

```yaml
- name:
  enabled:
  accounts:
  - name:
    project:
    jsonPath:
    bucket:
    bucketLocation:
    rootFolder:
    supportedTypes:
    - METRICS_STORE
    - CONFIGURATION_STORE
    - OBJECT_STORE
  gcsEnabled:
  stackdriverEnabled:
  metadataCachingIntervalMS:
```

- `name`: google
  - `enabled`: true or false
  - `accounts`:`
      - `name`: account name
        - `project`: (*Required*) The Google Cloud Platform project the canary service will use to consume GCS and Stackdriver.
        - `jsonPath`: The path to a JSON service account that Spinnaker will use as credentials. This is only needed if Spinnaker is not deployed on a Google Compute Engine VM, or needs permissions not afforded to the VM it is running on. See https://cloud.google.com/compute/docs/access/service-accounts for more information. File needs to be present on the machine running Spinnaker. Supports encrypted file.
        - `bucket`: The name of a storage bucket that your specified account has access to. If you specify a globally unique bucket name that doesn't exist yet, Kayenta will create that bucket for you.
        - `bucketLocation`: This is only required if the bucket you specify doesn't exist yet. In that case, the bucket will be created in that location. See https://cloud.google.com/storage/docs/managing-buckets#manage-class-location.
        - `rootFolder`: The root folder in the chosen bucket to place all of the canary service's persistent data in (Default: kayenta).
        - `supportedTypes`: One of: `METRICS_STORE`, `CONFIGURATION_STORE`, `OBJECT_STORE`
            - METRICS_STORE
            - CONFIGURATION_STORE
            - OBJECT_STORE
  - `gcsEnabled`: true or false. Whether or not to enable GCS as a persistent store (Default: false).
  - `stackdriverEnabled`: true or false. Whether or not to enable Stackdriver as a metrics service (Default: false).
  - `metadataCachingIntervalMS`: Number of milliseconds to wait in between caching the names of available metric types (for use in building canary configs; default: 60000).

### New Relic

```yaml
- name:
  enabled:
  accounts:
  - name:
    endpoint:
      baseUrl:
    apiKey:
    applicationKey:
    supportedTypes:
    - METRICS_STORE
    - CONFIGURATION_STORE
    - OBJECT_STORE
```

- `name`: newrelic
  - `enabled`: true or false
  - `accounts`:`
      - `name`: account name
        - `endpoint`:
          - `baseUrl`: (*Required*) The base URL to the New Relic Insights server.
        - `apiKey`: (*Required*) Your account's unique New Relic Insights API key. See https://docs.newrelic.com/docs/insights/insights-api/get-data/query-insights-event-data-api. Supports encrypted value.
        - `applicationKey`: (*Required*) Your New Relic account id. See https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/account-id. Supports encrypted value.
        - `supportedTypes`: One of: `METRICS_STORE`, `CONFIGURATION_STORE`, `OBJECT_STORE`
            - METRICS_STORE
            - CONFIGURATION_STORE
            - OBJECT_STORE

### Prometheus

```yaml
- name:
  enabled:
  accounts:
  - name:
    endpoint:
      baseUrl:
    username:
    password:
    usernamePasswordFile:
    supportedTypes:
    - METRICS_STORE
    - CONFIGURATION_STORE
    - OBJECT_STORE
  metadataCachingIntervalMS:
```

- `name`: prometheus
  - `enabled`: true or false
  - `accounts`: account name
      - `name`:
        - `endpoint`:
          - `baseUrl`: (*Required*) The base URL to the Prometheus server.
        - `username`: A basic auth username.
        - `password`: A basic auth password.
        - `usernamePasswordFile`: The path to a file containing "username:password". File needs to be present on the machine running Spinnaker. Supports encrypted file.
        - `supportedTypes`: One of: `METRICS_STORE`, `CONFIGURATION_STORE`, `OBJECT_STORE`
            - METRICS_STORE
            - CONFIGURATION_STORE
            - OBJECT_STORE
  - `metadataCachingIntervalMS`: Number of milliseconds to wait in between caching the names of available metric types (for use in building canary configs; Default: 60000).

### SignalFX

```yaml
- name: signalfx
  enabled:
  accounts:
  - name:
    endpoint:
      baseUrl:
    accessToken:
    defaultScopeKey:
    defaultLocationKey:
    supportedTypes:
    - METRICS_STORE
    - CONFIGURATION_STORE
    - OBJECT_STORE
```

- `name`: signalfx
  - `enabled`: true or false
  - `accounts`:
      - `name`: account name
        - `endpoint`:
          - `baseUrl`: The base URL to the SignalFx server. Defaults to https://stream.signalfx.com
        - `accessToken`: (*Required*) The SignalFx access token. Supports encrypted value.
        - `defaultScopeKey`: Scope key is used to distinguish between base and canary deployments. If omitted every request must supply the `_scope_key` param in extended scope params
        - `defaultLocationKey`: Location key is used to filter by deployment region. If omitted requests must supply the `_location_key` if it is needed.
        - `supportedTypes`: One of: `METRICS_STORE`, `CONFIGURATION_STORE`, `OBJECT_STORE`
            - METRICS_STORE
            - CONFIGURATION_STORE
            - OBJECT_STORE
