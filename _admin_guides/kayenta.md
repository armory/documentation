---
layout: post
title: Kayenta
order: 71
published: True
---
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


# Enabling Kayenta

Update your environment file in `/opt/spinnaker/env/` to enable barometer with the following:
```
KAYENTA_ENABLED=true
```

You'll also want to create `config/kayenta-local.yml` in the configurator,
which we'll start filling in as we go.
for now.

## Open Ports

On the internal ELB, ensure port 8090, the default port for `kayenta`, is
open.  If you've recently installed, this port may already have been
configured for you.

# Required Accounts

Kayenta is designed to retrieve metrics data and store the results into a
persistent file storage system.  Several options are available for each of
these providers.  For example, data can be stored on Amazon's S3 or in
Google's Cloud Storage.  Metrics can be retrieved from Datadog, Google's
Stackdriver, Prometheus, or Atlas.

## Storage Account

Add to your environment file the following:
```
STORAGE_ACCOUNT_NAME=your-account
```

Then, edit your `kayenta-local.yml` configuration as below, depending on
if you want to use Amazon S3 or Google Cloud Storage:

### Amazon S3

If you are using AWS already, this is likely the simplest option.  Make sure
you have a bucket in your S3 account.

In `kayenta-local.yml` add the following under the `kayenta:` entry:

```
kayenta:
  aws:
    enabled: true
    accounts:
      - name: your-account
        bucket: your-bucket-name
        rootFolder: kayenta
        supportedTypes:
          - OBJECT_STORE
          - CONFIGURATION_STORE

  s3:
    enabled: true
```

### Google Cloud Storage (GCS)

If you're using Google services already, GCS might be a good option.  If
you don't already have your Google credentials file set up as a secret in
your distribution, add it and make sure you have the path to it in your
environment file (change the path/filename to fit your configuration):
`GOOGLE_APPLICATION_CREDENTIALS=/opt/spinnaker/credentials/gcp.json`

Create a bucket in your GCS project, ensure that your credentialled account
has permission to manage files and folders in that bucket.

In `kayenta-local.yml` add the following under the `kayenta:` entry:

```
kayenta:
  google:
    enabled: true
    accounts:
      - name: your-account
        project: your-GCS-project
        jsonPath: ${GOOGLE_APPLICATION_CREDENTIALS}
        bucket: your-bucket-name
        rootFolder: kayenta
        supportedTypes:
          - METRICS_STORE
          - OBJECT_STORE
          - CONFIGURATION_STORE

  gcs:
    enabled: true
```

Note:  The name `your-account` above can be set to anything, but it must be
unique across all accounts configured.  This name will be displayed in the UI
as a selector, so making it as descriptive as necessary is recommended.

## Metrics Account

Add the following to your environment file:

```
METRICS_STORE=stackdriver
METRICS_ACCOUNT_NAME=your-account
```

If you're not using Google's Stackdriver, choose from `datadog`, `prometheus`,
or `atlas`.  (NOTE:  Prometheus and Atlas configuration is not explicitly 
documented here)

### Google Stackdriver

If you're going to use Stackdriver as your source of metrics, you've probably
already decided to use Google Cloud Storage and configured your Google
credentials as above.  If not, follow the directions above for configuring
GCS, but make sure your `METRICS_ACCOUNT_NAME` matches the name configured in
the `google:` section above.

Add this indented under the `kayenta:` section in your `kayenta-local.yml` file:

```
  stackdriver:
    enabled: true
```

### DataDog

Make sure you have your API key and Application key from DataDog handy.  Then
add this section indented under the `kayenta:` section of your
`kayenta-local.yml` file:

```
  datadog:
    enabled: true
    accounts:
      - name: your-account
        apiKey: 0000000000AAAAAAAAAAAA-SAMPLE_KEY
        applicationKey: AAAAAAAAAAAAAAAA00000000000-SAMPLE_KEY
        supportedTypes:
          - METRICS_STORE
        endpoint.baseUrl: https://app.datadoghq.com
```

Note:  The name `your-account` above can be set to anything, but it must be
unique across all accounts configured.  This name will be displayed in the UI
as a selector, so making it as descriptive as necessary is recommended.

### New Relic

Make sure you have your Insights API key and account ID from New Relic handy.
Then add this section indented under the `kayenta:` section of your
`kayenta-local.yml` file:

```
  newrelic:
    enabled: true
    accounts:
      - name: NewRelic
        apiKey: "01234567890abcdef"
        accountId: 12345678
        supportedTypes:
          - METRICS_STORE
        endpoint.baseUrl:  https://insights-api.newrelic.com/
```

Note:  The name `NewRelic` above can be set to anything, but it must be unique
across all accounts configured.  This name will be displayed in the UI as a
selector, so making it as descriptive as necessary is recommended.

## Restart Spinnaker

You'll need to restart/redeploy Spinnaker for these configuration changes
to take effect.

