---
layout: post
title: Logging
order: 60
---

# Logging

Pushing your logs to a distributed service is as simple as using one of the provided logging drivers provider by Docker.   All logging comes from STDOUT inside of Docker and can be pushed to various endpoints.


## Enabling A Logging Profile

Armory Spinnaker provides an entry point into enabling a given profile by setting the `LOGGING_PROFILE` environment variable.  You'll have to make sure the file with the corresponding file name is placed in `/opt/spinnaker/compose`, i.e. if you set `LOGGING_PROFILE=syslog` then a corresponding file must exist at `/opt/spinnaker/compose/logging-syslog.yml`.

You can set a logging profile by changing the variable per environment.  You can find the environment file that is used at startup at `/opt/spinnaker/env`.


## Logging Drivers for Docker

You can use any of the available logging drivers for Docker.  At the time of this writing below are the supported drivers from Docker:

![supported docker drivers](https://d1ax1i5f2y3x71.cloudfront.net/items/3c2y3S2z0k3v1L3K2W0l/Image%202017-04-13%20at%2011.22.03%20AM.png?X-CloudApp-Visitor-Id=2686178)


## Example: Logging to Splunk

Below is a sample logging-splunk.yml file that can be used to extend Armory Spinnaker to log to Splunk.  As there are [many configuration options]((https://docs.docker.com/engine/admin/logging/splunk/#usage) for Splunk and Docker, the one below is just a simple example of how to log to Splunk HTTP Event Collector Splunk  for just the Lighthouse and Clouddriver service.  You can add the additional services as well by copying the configuration and changing the service name.  Once this file place at the location `/opt/spinnaker/compose` and set `LOGGING_PROFILE=splunk` in your environment file located at `/opt/spinnaker/env`.

```
version: "2.1"
services:
  lighthouse:
    logging:
      driver: splunk
      options:
          splunk-token: ${YOUR_SPLUNK_TOKEN}
          splunk-url: https://${YOUR_SPLUNK_HOST}:8088
          splunk-insecureskipverify: "true"
  clouddriver:
    logging:
      driver: splunk
      options:
          splunk-token: ${YOUR_SPLUNK_TOKEN}
          splunk-url: https://${YOUR_SPLUNK_HOST}:8088
          splunk-insecureskipverify: "true"
  orca:
    logging:
      driver: splunk
      options:
          splunk-token: ${YOUR_SPLUNK_TOKEN}
          splunk-url: https://${YOUR_SPLUNK_HOST}:8088
          splunk-insecureskipverify: "true"
  rosco:
    logging:
      driver: splunk
      options:
          splunk-token: ${YOUR_SPLUNK_TOKEN}
          splunk-url: https://${YOUR_SPLUNK_HOST}:8088
          splunk-insecureskipverify: "true"
  deck:
    logging:
      driver: splunk
      options:
          splunk-token: ${YOUR_SPLUNK_TOKEN}
          splunk-url: https://${YOUR_SPLUNK_HOST}:8088
          splunk-insecureskipverify: "true"
  gate:
    logging:
      driver: splunk
      options:
          splunk-token: ${YOUR_SPLUNK_TOKEN}
          splunk-url: https://${YOUR_SPLUNK_HOST}:8088
          splunk-insecureskipverify: "true"
  gate:
    logging:
      driver: splunk
      options:
          splunk-token: ${YOUR_SPLUNK_TOKEN}
          splunk-url: https://${YOUR_SPLUNK_HOST}:8088
          splunk-insecureskipverify: "true"
```

## Example: Logging to Syslog
```
version: "2.1"
services:
  lighthouse:
    logging:
      driver: syslog
      options:
        syslog-address: "tcp://192.168.0.42:123"  

  clouddriver:
    logging:
      driver: syslog
      options:
        syslog-address: "tcp://192.168.0.42:123"  
```
