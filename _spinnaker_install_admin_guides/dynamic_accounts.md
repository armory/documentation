---
layout: post
title: Dynamic Kubernetes Accounts With Vault
order: 32
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Dynamic Kubernetes Accounts with Vault

If you will be adding, deleting, or modifying kubernetes deployment targets on a regular basis you may find that re-deploying clouddriver to pull in new
account configuration is impactful to your teams. Spinnaker's External Account Configuration feature will allow you to manage account configuration 
externally from Spinnaker and then re-read that configuration without requiring a re-deployment of clouddriver.

External Account Configuration is only supported for kubernetes and cloud foundry provider accounts. This document describes how this works with kubernetes acccounts.


## Prerequisites
This document assumes the following:
- Your Spinnaker cluster is up and running
- You have a Vault instance accessible from your Spinnaker cluster
- You have a valid kubeconfig for the target Kubernetes cluster
  

## Background

External Account Configuration uses Spring Cloud Config Server to allow portions of clouddriver's configuration from an external source. Details on the implementation and
limitations can be found [here](https://www.spinnaker.io/setup/configuration/#external-account-configuration).

The steps involved in setting up Dynamic Kubernetes Accounts include:
- Create a secret in Vault of type json that stores the entire contents of the kubernetes account portion of the clouddriver configuration
- Update (or create) the `spinnakerconfig.yml` file to enable Spring Cloud Config Server and to connect it to Vault
- Re-deploy Spinnaker


## Create secret in vault

The secret in vault will contain the accounts section that was previously in your halyard or operator configuration. Note that you will still need to leave the configuration in halyard or operator for the kubernetes account where spinnaker is deployed. Clouddriver *replaces* all of its account information with what it finds in the vault token. You will need to put the configuration for the spinnaker cluster if you want that cluster to be used as a deployment target for clouddriver. 

The kubeconfig file for each cluster will be stored inline as a single-line string in the kubeconfigContents element of the json. To convert a kubeconfig file to a string, you can use a sed command:
  sed -E ':a;N;$!ba;s/\r{0,1}\n/\\n/g' kubeconfig.yml


Create a secret in vault of type json with contents specific for your accounts:

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



## Update spinnakerconfig.yml

Update the `spinnakerconfig.yml` file with the following contents. This file will normally be in `.hal/default/profiles`. Create it if it does not exist. 
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

If your secret is at spinnaker/clouddriver then your backend will be spinnaker and your default-key will be clouddriver. 

Methods for accessing vault other than by token are available. See the [Spring Cloud Config Server documentation](https://cloud.spring.io/spring-cloud-static/spring-cloud-config/2.2.1.RELEASE/reference/html/#vault-backend) for more information. 


## Re-deploy Spinnaker

After making the changes to `spinnakerconfig.yml` you'll need to re-deploy Spinnaker to apply the changes. Do a `hal deploy apply` and wait for all pods to be running and ready.


## Check Spinnake for New Accounts

When all of the pods are running and ready, do a hard refresh of the Spinnaker web interface. The accounts you added in the vault secret should now be available in the web interface for use.


## Troubleshooting

If the configuration in the spinnakerconfig.yml is incorrect, clouddriver may not start. Because External Account Configuration is also available for the echo and igor services, you may see issues with those pods as well. Check the clouddriver logs for errors related to the vault profile. Use the `kubectl logs <clouddriver pod name>` command to view the logs.

If External Account Configuration is working properly, you should see messages similar to the following in the clouddriver log if the accounts were loaded and there were no changes:
  2020-04-23 13:49:29.921  INFO 1 --- [reshScheduler-0] o.s.boot.SpringApplication               : The following profiles are active: composite,vault,local
  2020-04-23 13:49:29.951  INFO 1 --- [reshScheduler-0] o.s.boot.SpringApplication               : Started application in 1.55 seconds (JVM running for 63660.417)
  2020-04-23 13:49:30.180  INFO 1 --- [reshScheduler-0] k.v.c.KubernetesV2ProviderSynchronizable : No changes detected to V2 Kubernetes accounts. Skipping caching agent synchronization.

If a change to an account is made, you should see messages similar to this:
  2020-04-23 14:07:00.905  INFO 1 --- [reshScheduler-0] o.s.boot.SpringApplication               : The following profiles are active: composite,vault,local
  2020-04-23 14:07:00.921  INFO 1 --- [reshScheduler-0] o.s.boot.SpringApplication               : Started application in 1.602 seconds (JVM running for 64711.387)
  2020-04-23 14:07:01.178  INFO 1 --- [reshScheduler-0] k.v.c.KubernetesV2ProviderSynchronizable : Synchronizing 1 caching agents for V2 Kubernetes accounts.
  2020-04-23 14:07:01.181  INFO 1 --- [reshScheduler-0] k.v.c.KubernetesV2ProviderSynchronizable : Adding 3 agents for account newaccount