---
layout: post
title: Rate Limiting Spinnaker API Calls
order: 140
redirect_from:
  - /admin-guides/rate-limit/
  - /admin-guides/rate_limit/
  - /admin_guides/rate-limit/
  - /admin_guides/rate_limit/
  - /spinnaker_install_admin_guides/rate_limit/
  - /spinnaker_install_admin_guides/rate-limit/
  - /spinnaker-install-admin-guides/rate_limit/
---

#  Rate Limits
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


# Running into AWS Rate Limits

## How Spinnaker Monitors a Deployment

By default Spinnaker queries (e.g. polls) the entire state of the AWS resources managed by Spinnaker every 30 seconds through the Clouddriver sub-service. This can cause AWS to throttle the requests on your account. If you have a large number of Auto-Scaling Groups and Elastic Load Balancers in your account or other services commonly querying the same APIs then you can expect to see throttling exceptions in your Spinnaker logs.

### How to alleviate AWS Throttling Exceptions

There are several things you can do to help reduce the effects of throttling:
- Set fine tune rate limits within Spinnaker.
- Adjust Spinnaker's retry limit per request.
- Decrease the polling interval.


## Fine Grained Rate Limits

Spinnaker queries your cloud provider (AWS, GCP, Azure, Kubernetes, etc) frequently to understand the state of your existing infrastructure and current deployments.  However, by doing so you might run into rate limits imposed by the cloud provider. To help avoid this Spinnaker provides controls to limit the number of requests it generates. The unit used for these controls is "requests per second" (a double float value). Global defaults are `10.0`.

Below is an example configuration for global rate limits for all services that you would place in `~/.hal/<deployment-name>/profiles/clouddriver-local.yml`:

```yml
serviceLimits:
  defaults:
    rateLimit: 10.0   # default max req/second
```

If you have multiple cloud providers, you can limit each one differently:

```yml
serviceLimits:
  cloudProviderOverrides:
    aws:
      rateLimit: 10.0   # default max req/second
```

You can provide account specific overrides as well in case you have significantly more resources in one account while others have less:

```yml
serviceLimits:
  accountOverrides:
    my-test:
      rateLimit: 10.0   # default max req/second
    my-prod:
      rateLimit: 10.0   # default max req/second
```

And finally, you can have more fine-grained control for particular AWS endpoints that might have a different rate limits. This list was generated from the [AmazonClientProvider.java@4179f7f](https://github.com/spinnaker/clouddriver/blob/4179f7fd8a5cd2cb644179f7f/clouddriver-aws/src/main/groovy/com/netflix/spinnaker/clouddriver/aws/security/AmazonClientProvider.java) on 02/22/2019 by filtering for `proxyHandlerBuilder.getProxyHandler(*.class` classes.

We've found that this formula works pretty well:
```
max_req_second = num_of_x_resources / clouddriver_30s_poll_interval
```

For example, if we have 90 load balancers, clouddriver polling every 30 seconds, then we'll end up with a rate limit of 3 reqs/second for `AmazonElasticLoadBalancing`.

```yml
serviceLimits:
  implementationLimits:
    AWSApplicationAutoScaling:
      defaults:
        rateLimit: 10.0   # default max req/second
    AWSLambda:
      defaults:
        rateLimit: 10.0   # default max req/second
    AWSLambdaAsync:
      defaults:
        rateLimit: 10.0   # default max req/second
    AWSSecretsManager:
      defaults:
        rateLimit: 10.0   # default max req/second
    AWSShield:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonAutoScaling:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonCloudFormation:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonCloudWatch:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonEC2:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonECR:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonECS:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonElasticLoadBalancing:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonIdentityManagement:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonIdentityManagement:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonRoute53:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonS3:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonSNS:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonSQS:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonSimpleWorkflow:
      defaults:
        rateLimit: 10.0   # default max req/second
```

Using these rate limits will help you avoid hitting the rate limits and potentially make Spinnaker more responsive as the cloud provider clients won't have to implement back-off strategy to continue to query the infrastructure. 

<!--
  Armory's halyard does not currently provide any defaults
  You will need to set your own defaults, as it differs for each installation

### Default Service Limits

The Armory Spinnaker distribution comes with the following default service limits:

```yml
serviceLimits:
  cloudProviderOverrides:
    aws:
      rateLimit: 10.0   # default max req/second

  implementationLimits:
    AmazonAutoScaling:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonElasticLoadBalancing:
      defaults:
        rateLimit: 10.0   # default max req/second
```

If you require a higher rate limit on these APIs then you will need to overwrite them directly. Overwriting the global service default is not sufficient.
-->

## Request Retry

You can set the number of retries per request with the following setting:

```yml
aws:
  client:
    maxErrorRetry: 3 # default
```
This is the number of retries before failing the request. It is on an exponential backoff maxing out at 20 seconds.



# Fiat hitting rate limits
If Fiat is configured to poll Github or Google, you may end up seeing rate limits when Fiat does it's polling for user groups. Some symptoms you'll see is:
- You can't log into spinnaker anymore
- Your Fiat logs contain lines similar to:

```
GithubTeamsUserRolesProvider : [] HTTP 403 Forbidden. Rate limit info: X-RateLimit-Limit
GoogleDirectoryUserRolesProvider : [] Failed to fetch groups for user x: Rate Limit Exceeded
```

You'll need to adjust poll cycle time and/or timeouts ([defaults here](https://github.com/spinnaker/fiat/blob/master/fiat-roles/src/main/java/com/netflix/spinnaker/fiat/config/CatsSchedulerConfig.java#L54-L58)) in `~/.hal/<deployment-name>/profiles/fiat-local.yml`:
```yml
fiat:
  writeMode:
    # Poll cycle interval, "check if a user belongs to a group every X ms"
    # syncDelayMs:   # the default 600000 (10 mins) is usually fine

    # The amount of time to wait for a poll job to complete,
    # the more users there are, the longer the job takes.
    syncDelayTimeoutMs: 30000 # (default is 30 seconds)
```


# FAQ

*Q:* Why doesn't Spinnaker use AWS Config to update its state?
*A:* AWS Config does not support all resource types. The two most rate limited APIs are Auto Scaling and Classic Elastic Load Balancing, [neither are supported](http://docs.aws.amazon.com/config/latest/developerguide/resource-config-reference.html) by AWS Config. Additionally, there is a non-trivial delay from the time a resource is created and the time a notification is created by AWS Config.
