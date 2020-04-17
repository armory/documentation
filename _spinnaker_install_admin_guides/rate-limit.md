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

Spinnaker queries your Cloud Provider (AWS, GCP, Azure, Kubernetes, etc) frequently to understand the state of your existing infrastructure and current deployments.  However, this might cause you to run into rate limits imposed by the Cloud Provider. To help avoid this Spinnaker provides controls to limit the number of requests it generates. The unit used for these controls is "requests per second" (a double float value). Global defaults are `10.0` max requests per second.

Below is an example configuration for global rate limits for all services that you would place in your `SpinnakerService` manifest under section `spec.spinnakerConfig.profiles.clouddriver` if using the Operator, or in `~/.hal/<deployment-name>/profiles/clouddriver-local.yml` if using Halyard:

```yml
serviceLimits:
  defaults:
    rateLimit: 10.0   # default max req/second
```

If you have multiple Cloud Providers, you can limit each one differently:

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

And finally, you can have more fine-grained control for particular AWS endpoints that might have a different rate limits.

We've found that this formula works pretty well:
```
max_req_second = num_of_x_resources / clouddriver_30s_poll_interval
```

For example, if we have 90 load balancers and clouddriver polls every 30 seconds, then we'll end up with a rate limit of 3 reqs/second for `AmazonElasticLoadBalancing`.

Here's the list of rate limits you can adjust created from [AmazonClientProvider.java@v5.36.0](https://github.com/spinnaker/clouddriver/blob/v5.36.0/clouddriver-aws/src/main/groovy/com/netflix/spinnaker/clouddriver/aws/security/AmazonClientProvider.java) on 05/14/2019 by using the regex `\w+\.class`:
```yml
serviceLimits:
  implementationLimits:
    AWSApplicationAutoScaling:
      defaults:
        rateLimit: 10.0   # default max req/second
    AWSApplicationAutoScalingClientBuilder:
      defaults:
        rateLimit: 10.0   # default max req/second
    AWSLambda:
      defaults:
        rateLimit: 10.0   # default max req/second
    AWSLambdaAsync:
      defaults:
        rateLimit: 10.0   # default max req/second
    AWSLambdaAsyncClientBuilder:
      defaults:
        rateLimit: 10.0   # default max req/second
    AWSLambdaClientBuilder:
      defaults:
        rateLimit: 10.0   # default max req/second
    AWSSecretsManager:
      defaults:
        rateLimit: 10.0   # default max req/second
    AWSSecretsManagerClientBuilder:
      defaults:
        rateLimit: 10.0   # default max req/second
    AWSServiceDiscovery:
      defaults:
        rateLimit: 10.0   # default max req/second
    AWSServiceDiscoveryClientBuilder:
      defaults:
        rateLimit: 10.0   # default max req/second
    AWSShield:
      defaults:
        rateLimit: 10.0   # default max req/second
    AWSShieldClientBuilder:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonAutoScaling:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonAutoScalingClientBuilder:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonCloudFormation:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonCloudFormationClientBuilder:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonCloudWatch:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonCloudWatchClientBuilder:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonEC2:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonEC2ClientBuilder:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonECR:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonECRClientBuilder:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonECS:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonECSClientBuilder:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonElasticLoadBalancing:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonElasticLoadBalancingClientBuilder:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonIdentityManagement:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonIdentityManagementClientBuilder:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonRoute53:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonRoute53ClientBuilder:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonS3:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonS3ClientBuilder:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonSNS:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonSNSClientBuilder:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonSQS:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonSQSClientBuilder:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonSimpleWorkflow:
      defaults:
        rateLimit: 10.0   # default max req/second
    AmazonSimpleWorkflowClientBuilder:
      defaults:
        rateLimit: 10.0   # default max req/second
```

Using these settings will help you avoid hitting the AWS rate limits. They can also help Spinnaker be more responsive since the cloud provider clients will not implement their back-off strategy to continue to query the infrastructure.

## Request Retry

You can set the number of retries per request with the following setting:

```yml
aws:
  client:
    maxErrorRetry: 3 # default
```
This is the number of retries before the request fails. It's used with an exponential backoff, maxing out at 20 seconds.


# Fiat hitting rate limits

If Fiat is configured to poll Github or Google, you may end up seeing rate limits when Fiat does its polling for user groups. Some symptoms that you might see are:

- You can't log into spinnaker anymore
- Your Fiat logs contain lines similar to:

  ```
  GithubTeamsUserRolesProvider : [] HTTP 403 Forbidden. Rate limit info: X-RateLimit-Limit
  GoogleDirectoryUserRolesProvider : [] Failed to fetch groups for user x: Rate Limit Exceeded
  ```

To address this issue, adjust poll cycle time and/or timeouts in your `SpinnakerService` manifest under section `spec.spinnakerConfig.profiles.fiat` if using the Operator (beware: you will end up with two nested `fiat` sections), or in  `~/.hal/<deployment-name>/profiles/fiat-local.yml` if using Halyard. See ([FiatServerConfigurationProperties.java for more details](https://github.com/spinnaker/fiat/blob/v1.7.0/fiat-web/src/main/java/com/netflix/spinnaker/fiat/config/FiatServerConfigurationProperties.java)).:

```yml
fiat:
  writeMode:
    # Poll cycle interval, "check if a user belongs to a group every X ms"
    syncDelayMs:  600000 # the default 600000 (10 mins) is usually fine

    # How much time to between retries of dependent resource providers if they are down.
    retryIntervalMs: 10000
```

# FAQ

*Q:* Why doesn't Spinnaker use AWS Config to update its state?

*A:* AWS Config does not support all resource types. The two most rate limited APIs are Auto Scaling and Classic Elastic Load Balancing, [neither are supported](http://docs.aws.amazon.com/config/latest/developerguide/resource-config-reference.html) by AWS Config. Additionally, there is a non-trivial delay from the time a resource is created and the time a notification is created by AWS Config.
