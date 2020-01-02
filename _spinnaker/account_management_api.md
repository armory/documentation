---
layout: post
title: Account Management API
order: 99
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Armory Account Management API

The Armory Account Management API is an API that allows you to manage accounts through an API instead of manually editing configuration files. This API works by adding a write layer to backends supported by Spring Cloud Config natively, such as Git (or Github, for our purposes). Accounts added using the API get converted into the correct configuration form for the backend and stored. The service *using* the configuration backend will be able to read and refresh configurations from this source. In the case of [Clouddriver](https://blog.armory.io/deep-dive-into-clouddriver/), changes made with the API are automatically picked up without requiring a restart or redeploy.

The Account Management API is currently in [Early Release](https://kb.armory.io/releases/early-release-beta-GA/). The feature is working and installable, but some functionality is likely to be missing and a number of known and unknown issues are likely to surface.


## Requirements
- A Github (or Github Enterprise) repo must be used as the source
  
## Known Issues with Github Backend

- The Account Management API currently only supports managing accounts for 1 installation of Spinnaker. This is because the backend only supports managing one set of accounts stored in a single file.
- Race condition may occur when submitting concurrent requests.


## Best Practices with Github Backend

When using the Account Management API, Armory recommends the following best practice:

- The API manages accounts in a single file. This file can be named whatever you like as long as it follows the Spring configuration profile naming. Name the file something like `clouddriver-remote.yml` to avoid overriding any other profiles that can have conflicting configuration, such as the `-local.yml` files for Spinnaker services.


## Installation

Use Kubernetes Manifests to install the Management API. This can be deployed by Spinnaker using a `Deploy (Manifest)` stage. You can also store it in source control and use it as an artifact.


    apiVersion: v1
    data:
      mgmtapi.yml: |
        storage:
          github:
            owner: {owner}
            repo: {repo}
            password: {redacted}
            file: clouddriver-remote.yml
            baseUrl: {baseUrl for Github Enterprise, if appropriate}
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

Configuring the Account Management API similar to other Spinnaker services. For Github integration, add the config (shown above). This enables the Github integration and uses the supplied credentials when making changes.

*There is a sample configuration in the manifests above.*


    # mgmtapi.yml
    storage:
      github:
        owner: armory-io
        repo: spinnaker-remote-config
        password: {redacted}
        file: clouddriver-remote.yml

When using the Github integration, you need to configure Clouddriver to use Github as well. Note, the `remote` profile corresponds to the `clouddriver-remote` file that the API manages. To enable remote configuration, add the snippet below to `~/.hal/{DEPLOYMENT_NAME}/profiles/spinnakerconfig.yml`.

    spring:
      profiles:
        include: git,remote
      cloud:
        config:
          server:
            git:
              uri: https://github.com/armory-io/spinnaker-remote-config 
              password: {redacted}
              username: doogie

More details on configuring Spinnaker for remote configuration can be found [here.](https://www.spinnaker.io/setup/configuration/)

## Usage

The Account Management API works by hooking into the same backends as Spring’s Cloud Config - the core of Dynamic Accounts within Spinnaker. For example, if you are using Github as a backend for storing your account configuration, you can use the same backend with the Account Management API. Changes are reflected into Clouddriver as the Management API makes changes to the backing data.

*Note -* *today,* *only Github is supported as a Management API backend.*

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


## Future Work

Have functionality you want added to the Account Mangement API? [Contact us](https://www.armory.io/contact/) and to share your feedback and ideas.

Some functionality we are considering or working on include the following: 

- Support for more storage backends.
- Resolving race conditions when using non-database backends.
- Ability to manage accounts for multiple Spinnaker installations
