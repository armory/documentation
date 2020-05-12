---
layout: post
title: PubSub Config
order: 13
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Parameters

**spec.spinnakerConfig.config.pubsub**


```yaml
pubsub:
  enabled:
  google:
    enabled:
    subscriptions:
    - name:
      project:
      subscriptionName:
      jsonPath:
      templatePath:
      ackDeadlineSeconds:
      messageFormat:
    publishers:
    - name:
      project:
      topicName:
      jsonPath:
      content:
```

- `enabled`: true or false.
- `google`:

## Google

- `enabled`: true or false.
- `subscriptions`:
  - `name`: subscription name
  - `project`: The name of the GCP project your subscription lives in.
  - `subscriptionName`: The name of the subscription to listen to. This identifier does not include the name of the project, and must already be configured for Spinnaker to work.
  - `jsonPath`: The path to a JSON service account that Spinnaker will use as credentials. This is only needed if Spinnaker is not deployed on a Google Compute Engine VM, or needs permissions not afforded to the VM it is running on. See https://cloud.google.com/compute/docs/access/service-accounts for more information. File needs to be present on the machine running Spinnaker. Supports encrypted file.
  - `templatePath`: A path to a jinja template that specifies how artifacts from this pubsub system are interpreted and transformed into Spinnaker artifacts. See spinnaker.io/reference/artifacts for more information. File needs to be present on the machine running Spinnaker.
  - `ackDeadlineSeconds`: Time in seconds before an outstanding message is considered unacknowledged and is re-sent. Configurable in your Google Cloud Pubsub subscription. See the docs here`: https://cloud.google.com/pubsub/docs/subscriber
  - `messageFormat`: One of 'GCB', 'GCS', 'GCR', or 'CUSTOM'. This can be used to help Spinnaker translate the contents of the Pub/Sub message into Spinnaker artifacts.
- `publishers`:
  - `name`: name of publisher
      - `project`:
      - `topicName`:
      - `jsonPath`: File needs to be present on the machine running Spinnaker. Supports encrypted file.
