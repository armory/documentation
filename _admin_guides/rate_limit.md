#  Rate Limits for AWS

## How Spinnaker Monitors a Deployment

By default Spinnaker queries the state
  - polling, interval 30 seconds, potential rate limits
  - clouddriver is the main component

  # potential solutions

Muliple Accounts

Assume Roles and AWS


## Fine Grained Rate Limits

Spinnaker queries your cloud provider (AWS, GCP, Azure, Kubernetes, etc) frequently to understand about the state of your existing infrastructure and current deployments.  In doing so however, you might run into rate limits imposed by the cloud provider.  Below is an example configuration for global rate limits for all services that you would place in `clouddriver-local.yml`.

```
serviceLimits:
  defaults:
    rateLimit: 20
```

If you have multiple cloud providers, you can limit each one differently:

```
serviceLimits:
  cloudProviderOverrides:
    aws:
      rateLimit: 15
```

You can provide account specific overrides as well in case you have significantly more resources in one account while others have less

```
serviceLimits:
  accountOverrides:
    test:
      rateLimit: 5
    prod:
      rateLimit: 100
```

And lastly, you can have more fine-grained control for particular AWS endpoints that might have a different rate limits:

```
  implementationLimits:

    AmazonEC2:
      defaults:
        rateLimit: 200
      accountOverrides:
        prod:
          rateLimit: 500

    AmazonElasticLoadBalancing:
      defaults:
        rateLimit: 10
```

Using these rate limits will help you avoid hitting the rate limits and potentially make Spinnaker more responsive as the cloud provider clients won't have to implement back-off strategy to continue to query the infrastructure.  

As always, we want to provide ridiculously responsive support, let us know how we can help.
