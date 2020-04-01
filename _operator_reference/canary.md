---
layout: post
title: Canary Config Reference
order: 3
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

- enabled
- serviceIntegrations
- reduxLoggerEnabled: true or false; whether or not to enable redux logging in the canary module in deck (Default: true).
- defaultMetricsAccount: Name of metrics account to use by default.
- defaultStorageAccount: Name of storage account to use by default.
- defaultJudge: Name of canary judge to use by default (Default: NetflixACAJudge-v1.0).
- defaultMetricsStore: Name of metrics store to use by default (e.g. atlas, datadog, prometheus, stackdriver).
- stagesEnabled: true or false; whether or not to enable canary stages in deck (Default: true).
- atlasWebComponentsUrl: Location of web components to use for Atlas metric configuration.
- templatesEnabled: true or false; whether or not to enable custom filter templates for canary configs in deck (Default: true).
- showAllConfigsEnabled: ttrue or false; whether or not to show all canary configs in deck, or just those scoped to the current application (Default: true).


```yaml
canary:
  enabled: true
  serviceIntegrations:
	- name: google
	  enabled: true
	  accounts:
	  - name: abc
		project: abc # The Google Cloud Platform project the canary service will use to consume GCS and Stackdriver.
		jsonPath: sa.json # The path to a JSON service account that Spinnaker will use as credentials. This is only needed if Spinnaker is not deployed on a Google Compute Engine VM, or needs permissions not afforded to the VM it is running on. See https://cloud.google.com/compute/docs/access/service-accounts for more information.
		bucket: abc # The name of a storage bucket that your specified account has access to. If you specify a globally unique bucket name that doesn't exist yet, Kayenta will create that bucket for you.
		bucketLocation: abc # This is only required if the bucket you specify doesn't exist yet. In that case, the bucket will be created in that location. See https://cloud.google.com/storage/docs/managing-buckets#manage-class-location.
		rootFolder: kayenta-prod # The root folder in the chosen bucket to place all of the canary service's persistent data in (Default: kayenta).
		supportedTypes: # One of: METRICS_STORE, METRICS_STORE, OBJECT_STORE
		- METRICS_STORE
		- CONFIGURATION_STORE
		- OBJECT_STORE
	  gcsEnabled: true # Whether or not to enable GCS as a persistent store (Default: false).
	  stackdriverEnabled: false # Whether or not to enable Stackdriver as a metrics service (Default: false).
	  metadataCachingIntervalMS: 60000 # Number of milliseconds to wait in between caching the names of available metric types (for use in building canary configs; Default: 60000).
	- name: prometheus
	  enabled: false
	  accounts:
	  - name: abc
		endpoint:
		  baseUrl: abc # The base URL to the Prometheus server.
		username: abc # A basic auth username.
		password: abc # A basic auth password.
		usernamePasswordFile: creds # The path to a file containing "username:password".
		supportedTypes: # One of: METRICS_STORE, METRICS_STORE, OBJECT_STORE
		- METRICS_STORE
		- CONFIGURATION_STORE
		- OBJECT_STORE
	  metadataCachingIntervalMS: 60000 # Number of milliseconds to wait in between caching the names of available metric types (for use in building canary configs; Default: 60000).
	- name: datadog
	  enabled: true
	  accounts:
	  - name: my-datadog-account
		endpoint:
		  baseUrl: https://app.datadoghq.com # The base URL to the Datadog server.
		apiKey: abc # Your org's unique Datadog API key. See https://app.datadoghq.com/account/settings#api.
		applicationKey: abc # Your Datadog application key. See https://app.datadoghq.com/account/settings#api.
		supportedTypes: # One of: METRICS_STORE, METRICS_STORE, OBJECT_STORE
		- METRICS_STORE
		- CONFIGURATION_STORE
		- OBJECT_STORE
	- name: signalfx
	  enabled: true
	  accounts:
	  - name: abc
		endpoint:
		  baseUrl: https://stream.signalfx.com # The base URL to the SignalFx server. Defaults to https://stream.signalfx.com
		accessToken: abc # The SignalFx access token.
		defaultScopeKey: abc # Scope key is used to distinguish between base and canary deployments. If omitted every request must supply the _scope_key param in extended scope params
		defaultLocationKey: abc # Location key is used to filter by deployment region. If omitted requests must supply the _location_key if it is needed.
		supportedTypes: # One of: METRICS_STORE, METRICS_STORE, OBJECT_STORE
		- METRICS_STORE
		- CONFIGURATION_STORE
		- OBJECT_STORE
	- name: aws
	  enabled: false
	  accounts:
	  - name:  abc
		bucket: abc # The name of a storage bucket that your specified account has access to. If you specify a globally unique bucket name that doesn't exist yet, Kayenta will create that bucket for you.
		region: abc # The region to use.
		rootFolder: kayenta # The root folder in the chosen bucket to place all of the canary service's persistent data in (Default: kayenta).
		profileName: default # The profile name to use when resolving AWS credentials. Typically found in ~/.aws/credentials (Default: default).
		endpoint: abc # The endpoint used to reach the service implementing the AWS api. Typical use is with Minio.
		accessKeyId: abc # The default access key used to communicate with AWS.
		secretAccessKey: abc # The secret key used to communicate with AWS.
		supportedTypes: # One of: METRICS_STORE, METRICS_STORE, OBJECT_STORE
		- METRICS_STORE
		- CONFIGURATION_STORE
		- OBJECT_STORE
	  s3Enabled: false # Whether or not to enable S3 as a persistent store (Default: false).
	- name: newrelic
	  enabled: false
	  accounts:
	  - name:  abc
		endpoint:
		  baseUrl: https://app.datadoghq.com # The base URL to the New Relic Insights server.
		apiKey: abc # Your account's unique New Relic Insights API key. See https://docs.newrelic.com/docs/insights/insights-api/get-data/query-insights-event-data-api.
		applicationKey: abc # Your New Relic account id. See https://docs.newrelic.com/docs/accounts/install-new-relic/account-setup/account-id.
		supportedTypes: # One of: METRICS_STORE, METRICS_STORE, OBJECT_STORE
		- METRICS_STORE
		- CONFIGURATION_STORE
		- OBJECT_STORE

  ```
