---
layout: post
title: Notifications
order: 80
---

# Echo

The Echo service handles all notifications, scheduled pipelines(e.g. cron jobs) and audit logging to an external sources.  By default it stores events in memory but can also be configured to store results in an external source like Redis.  It is also responsible for triggering pipelines based on one of the available trigger integrations or the result of an executing pipeline.


## Notifications

### Slack

Add the following to your `/opt/spinnaker/config/spinnaker-local.yml` file:

```
echo:
  notifications:
    slack:
      enabled: true
      botName: ${YOUR_BOT_NAME}
```

Next add your Slack token to your `/opt/spinnaker/config/echo-local.yml`:

```
slack:
  enabled: true
  token: ${YOUR_SLACK_TOKEN}
```  

Restart Armory Spinnaker by issuing

```
service armory-spinnaker restart
```

Make sure to invite `${YOUR_BOT_NAME}` to any channel you want to be notified by spinnaker alerts.


### E-mail
### Pager Duty


## Audit Logs
Audit logs are sent over HTTP to any destination.  Below is configuration for popular centralized logging destinations  

### Sumo Logic

First, you'll need to create an HTTP endpoint at Sumologic. The process is described in the [Sumologic help pages](https://help.sumologic.com/Send-Data/Sources/02Sources-for-Hosted-Collectors/HTTP-Source).

Sumologic will generate a new HTTP endpoint and unique URL.  That URL is represented as `${SUMOLOGIC_URL}` in the following config.

Add the following to `opt/spinnaker/config/echo-local.yml`:

```
rest:
  enabled: true
  endpoints:
    - wrap: false
      url: "${SUMOLOGIC_URL}"
```

This tells the echo service to send any events to the Sumologic URL, and to send the events in full without a wrapper. Once you have configured echo restart Armory Spinnaker : `service armory-spinnaker restart`.

You should start seeing events flowing to Sumologic. Because of the indexing delay in Sumologic, the best way to make sure the events are flowing is the [Live Tail function at Sumologic](https://help.sumologic.com/Search/Live-Tail/About-Live-Tail).

### Splunk

First, you'll need to make sure you have the [HTTP Event Collector configured](http://dev.splunk.com/view/event-collector/SP-CAAAE6M) on your Splunk deployment.

Once HEC is configured you should have a host/port to send events to, and an authorization token to add to the request headers. If you want to test out the basic setup you should be able to send in [test data using curl]( http://dev.splunk.com/view/event-collector/SP-CAAAE7G).

 If everything is working the next step is to add to/create site specific config for echo so that it forwards all events to Splunk. Create/modify the file at `/opt/spinnaker/config/echo-local.yml` . The values `HEC_HOST`, `HEC_PORT`, and `HEC_TOKEN` should be replaced by the values you got during the Splunk HTTP Event Collector setup:

 ```
rest:
  enabled: true
  endpoints:
    - wrap: true
      url: "https://HEC_HOST:HEC_PORT/services/collector/event?"
      headers:
        Authorization: "Splunk HEC_TOKEN"
      template: '{"event":{{event}} }'
      insecure: true
```

Once you've added this config, restart your spinnaker service: `service armory-spinnaker restart`. You should start seeing events appear in Splunk although indexing might delay the results in the search UI.
