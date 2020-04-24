---
layout: post
title: Dynamic Kubernetes Accounts With Vault
order: 32
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Dynamic Kubernetes Accounts with Vault

If you add, delete, or modify Kubernetes deployment targets on a regular basis, you may find that redeploying Clouddriver to pull in new
account configuration impacts your teams. Spinnaker's [External Account Configuration](https://www.spinnaker.io/setup/configuration/#external-account-configuration) feature allows you to manage account configuration
externally from Spinnaker and then read that configuration change without requiring a redeployment of Clouddriver.

External Account Configuration is only supported for Kubernetes and cloud foundry provider accounts. This document describes how this works with Kubernetes acccounts.


## Prerequisites

This document assumes the following:

- You have a running Spinnaker cluster.
- You have a Vault instance accessible from your Spinnaker cluster.
- You have a valid `kubeconfig` for the target Kubernetes cluster.


## Background

External Account Configuration uses Spring Cloud Config Server to
allow portions of Clouddriver's configuration to be from an external
source. See [Enabling external configuration](https://www.spinnaker.io/setup/configuration/#enabling-external-configuration) for details on the implementation and its limitations.

The steps involved in setting up Dynamic Kubernetes Accounts are:

1. Create a JSON type secret in Vault. This secret stores the entire contents of the Kubernetes account portion of the Clouddriver configuration.
1. Create or update the `spinnakerconfig.yml` file to enable Spring Cloud Config Server and to connect it to Vault.
1. Redeploy Spinnaker.


## Create the Secret in Vault

The secret in Vault contains the `accounts` section that was previously in your Halyard or Operator configuration. Note that you still need to leave the configuration in Halyard or Operator for the Kubernetes account where Spinnaker is deployed. Clouddriver *replaces* all of its account information with what it finds in the Vault token. You need to add the configuration for the Spinnaker cluster if you want to use that cluster as a deployment target for Clouddriver.

The `kubeconfig` file for each cluster is stored inline as a single line string in the `kubeconfigContents` element of the JSON. You can use a `sed` command to convert a `kubeconfig` file to a string:

```bash
sed -E ':a;N;$!ba;s/\r{0,1}\n/\\n/g' kubeconfig.yml
```

Create a secret in Vault of type JSON with contents specific for your accounts:

```json
{
"kubernetes": {
  "accounts": [
    {
      "cacheThreads": 1,
      "cachingPolicies": [],
      "configureImagePullSecrets": true,
      "customResources": [],
      "dockerRegistries": [],
      "kinds": [],
      "kubeconfigContents": "<YOUR SINGLE LINE KUBECONFIG CONTENTS>",
      "name": "<YOUR NAME FOR THE ACCOUNT>",
      "namespaces": [],
      "oAuthScopes": [],
      "omitKinds": [],
      "omitNamespaces": [],
      "onlySpinnakerManaged": true,
      "permissions": {},
      "providerVersion": "V2",
      "requiredGroupMembership": []
    },
   {
      "cacheThreads": 1,
      "cachingPolicies": [],
      "configureImagePullSecrets": true,
      "customResources": [],
      "dockerRegistries": [],
      "kinds": [],
      "kubeconfigContents": "<YOUR NEXT SINGLE LINE KUBECONFIG CONTENTS>",
      "name": "<YOUR NAME FOR THE NEXT ACCOUNT>",
      "namespaces": [],
      "oAuthScopes": [],
      "omitKinds": [],
      "omitNamespaces": [],
      "onlySpinnakerManaged": true,
      "permissions": {},
      "providerVersion": "V2",
      "requiredGroupMembership": []
    },
  ]
}
}
```

## Update spinnakerconfig.yml

Create or update the `spinnakerconfig.yml` file, which is normally in `.hal/default/profiles`, with the following content:

```yaml
spring:
  profiles:
    include: vault
  cloud:
    config:
      server:
        vault:
          host: <YOUR VAULT IP OR HOSNAME>
          port: 8200
          backend: <YOUR VAULT SECRET ENGINE>
          kvVersion: 2
          scheme: http
          default-key: <YOUR VAULT SECRET NAME>
          token: <YOUR VAULT ACCESS TOKEN>
```

If your secret is at `spinnaker/clouddriver`, then your backend will be `spinnaker` and your `default-key` will be `clouddriver`.

Methods for accessing Vault other than by token are available. See the [Spring Cloud Config Server documentation](https://cloud.spring.io/spring-cloud-static/spring-cloud-config/2.2.1.RELEASE/reference/html/#vault-backend) for more information.

## Redeploy Spinnaker

You need to redeploy Spinnaker after making the changes to `spinnakerconfig.yml`. Do a `hal deploy apply` and wait for all pods to be running and ready.

## Check Spinnaker for New Accounts

When all of the pods are running and ready, do a hard refresh of the Spinnaker web interface. The accounts you added in the Vault secret should now be available in the web interface for you to use.

## Troubleshooting

If the configuration in the `spinnakerconfig.yml` is incorrect, Clouddriver may not start. Because External Account Configuration is also available for the Echo and Igor services, you may see issues with those pods as well. Check the Clouddriver logs for errors related to the Vault profile. Use the `kubectl logs <clouddriver pod name>` command to view the logs.

If External Account Configuration is working properly, you should see messages similar to the following in the Clouddriver log if the accounts were loaded and there were no changes:

```bash
2020-04-23 13:49:29.921  INFO 1 --- [reshScheduler-0] o.s.boot.SpringApplication               : The following profiles are active: composite,vault,local
2020-04-23 13:49:29.951  INFO 1 --- [reshScheduler-0] o.s.boot.SpringApplication               : Started application in 1.55 seconds (JVM running for 63660.417)
2020-04-23 13:49:30.180  INFO 1 --- [reshScheduler-0] k.v.c.KubernetesV2ProviderSynchronizable : No changes detected to V2 Kubernetes accounts. Skipping caching agent synchronization.
```

If a change to an account is made, you should see messages similar to this:

```bash
2020-04-23 14:07:00.905  INFO 1 --- [reshScheduler-0] o.s.boot.SpringApplication               : The following profiles are active: composite,vault,local
2020-04-23 14:07:00.921  INFO 1 --- [reshScheduler-0] o.s.boot.SpringApplication               : Started application in 1.602 seconds (JVM running for 64711.387)
2020-04-23 14:07:01.178  INFO 1 --- [reshScheduler-0] k.v.c.KubernetesV2ProviderSynchronizable : Synchronizing 1 caching agents for V2 Kubernetes accounts.
2020-04-23 14:07:01.181  INFO 1 --- [reshScheduler-0] k.v.c.KubernetesV2ProviderSynchronizable : Adding 3 agents for account newaccount
```
