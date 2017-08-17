---
layout: post
title: Notifications
order: 80
---

## Configuring Slack

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

## Echo

The Echo service handles all notifications, scheduled pipelines(e.g. cron jobs) and audit logging to an external sources.  By default it stores events in memory but can also be configured to store results in an external source like Redis.  It is also responsible for triggering pipelines based on one of the available trigger integrations or the result of an executing pipeline.

### Configuring Echo


#### Scheduler
#### REST
#### Webhooks
