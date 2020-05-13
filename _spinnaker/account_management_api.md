---
layout: post
title: Account Management API
order: 99
published: false
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Armory Account Management API

The Armory Account Management API allows you to manage accounts through an API instead of manually editing configuration files. This API works by adding a write layer to backends supported by Spring Cloud Config natively, such as Git (or GitHub, for our purposes). Accounts added using the API get converted into the correct configuration form for the backend and stored. The service *using* the configuration backend will be able to read and refresh configurations from this source. In the case of [Clouddriver](https://blog.armory.io/deep-dive-into-clouddriver/), changes made with the API are automatically picked up without requiring a restart or redeploy.

The Account Management API is currently in [Early Release](https://kb.armory.io/releases/early-release-beta-GA/). The feature is working and installable, but some functionality is likely to be missing and a number of known and unknown issues are likely to surface.


## Requirements
- Source repo stored in GitHub or GitHub Enterprise
  
## Known Issues and Limitations with GitHub Backend

- The API backend stores accounts in a single file, so you can only use the Account Management API to manage accounts for one installation of Spinnaker.
- Submitting concurrent requests may cause a race condition.


## Best Practices with GitHub Backend

When using the Account Management API, Armory recommends the following best practice:

- The API manages accounts in a single file. This file can be named whatever you like as long as it follows the Spring configuration profile naming. Name the file something like `clouddriver-remote.yml` to avoid overriding any other profiles that can have conflicting configuration, such as the `-local.yml` files for Spinnaker services.


## Installation

Use Kubernetes Manifests to install the Management API. This can be deployed by Spinnaker using a `Deploy (Manifest)` stage. You can also store it in source control and use it as an artifact.

For more information aout how to deploy a manifest, see [Deploy Kubernetes Manifests](https://www.spinnaker.io/guides/user/kubernetes-v2/deploy-manifest/).


    apiVersion: v1
    data:
      mgmtapi.yml: |
        storage:
          github:
            owner: {owner}
            repo: {repo}
            password: <password>
            file: clouddriver-remote.yml
            baseUrl: {baseUrl for GitHub Enterprise if appropriate}
    kind: ConfigMap
    metadata:
      name: acct-mgmt-api-config
    ---
    apiVersion: apps/v1
    kind: Deployment
    metadata:
      labels:
        app: acct-mgmt-api
      name: acct-mgmt-api
    spec:
      replicas: 1
      selector:
        matchLabels:
          app: acct-mgmt-api
      template:
        metadata:
          labels:
            app: acct-mgmt-api
        spec:
          containers:
            - image: armory/acct-mgmt-api:0.0.1-7fb4dfd-dev0000
              name: api
              ports:
                - containerPort: 3000
              volumeMounts:
                - mountPath: /opt/spinnaker/config
                  name: config
          volumes:
            - configMap:
                name: acct-mgmt-api-config
              name: config
    ---
    apiVersion: v1
    kind: Service
    metadata:
      labels:
        app: acct-mgmt-api
      name: acct-mgmt-api
    spec:
      ports:
        - port: 3000
          protocol: TCP
          targetPort: 3000
      selector:
        app: acct-mgmt-api
      type: ClusterIP
    


## Configuration

Configuring the Account Management API similar to other Spinnaker services. For GitHub integration, add the config (shown above). This enables the GitHub integration and uses the supplied credentials when making changes.

*There is a sample configuration in the manifests above.*


    # mgmtapi.yml
    storage:
      github:
        owner: armory-io
        repo: spinnaker-remote-config
        password: <password>
        file: clouddriver-remote.yml

When using the GitHub integration, you need to configure Clouddriver to use GitHub as well. Note, the `remote` profile corresponds to the `clouddriver-remote` file that the API manages. To enable remote configuration, add the snippet below to `~/.hal/{DEPLOYMENT_NAME}/profiles/spinnakerconfig.yml` if you're using Halyard or under `spec.spinnakerConfig.profiles.clouddriver` of the `SpinnakerService` manifest if you're using Operator:

    spring:
      profiles:
        include: git,remote
      cloud:
        config:
          server:
            git:
              uri: https://github.com/armory-io/spinnaker-remote-config 
              password: <password>
              username: doogie

For more information about configuring Spinnaker for remote configuration, see [External Account Configuration](https://www.spinnaker.io/setup/configuration/).

## Usage

The Account Management API works by hooking into the same backends as Spring’s Cloud Config - the core of Dynamic Accounts within Spinnaker. For example, if you are using GitHub as a backend for storing your account configuration, you can use the same backend with the Account Management API. When the Management API changes the backing data, it replicates the change to Clouddriver.

Once configured, you can interact with the Account Management API using your favorite API clients. 

Here’s an example using cURL:

    $ curl -X POST http://mgmt-api-url/api/v1/accounts \
      -d '{
          "cloudProvider": "kubernetes",
          "config": {
                  "name": "added-from-api",
                  "providerVersion": "v2",
                  "kubeconfigContents": "",
                  "metrics": false,
                  "liveManifestCalls": false
          }
    }'

**Verify Accounts**

To verify that the account has been added successfully, use cURL to list accounts:

    $ curl http://mgmt-api-url/api/v1/accounts | jq
    [
      {
        "cloudProvider": "kubernetes",
        "config": {
          "kubeconfigContents": "",
          "liveManifestCalls": false,
          "metrics": false,
          "name": "added-from-api",
          "providerVersion": "v2"
        }
      }
    ]

The example includes an optional pipe of the output into JQ for readability.    

**Delete Accounts**

To delete an account with the API, call the `DELETE` route on a particular account by name. For example:

    # curl -X DELETE http://mgmt-api-url/api/v1/accounts/added-by-api

