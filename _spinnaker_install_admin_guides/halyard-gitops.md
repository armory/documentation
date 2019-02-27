---
layout: post
title: Deploying Spinnaker gitops with Halyard
order: 150
---
Spinnaker allows teams to deploy applications automatically. What about Spinnaker itself? This article describes how to set up Halyard to automatically deploy Spinnaker.

<div class="alpha-warning">
  This feature is in alpha stage with Armory Spinnaker. <a href="https://www.armory.io/contact">Get in touch</a> and give us feedback!
</div>

{:toc}

## Overview
Halyard Armory can be configured to read configurations from a source repository and automatically deploy Spinnaker when changes on a specific branch are detected.

## Store your current configuration in Github
You can group configurations of different Spinnakers in a single repository, use different repositories, or even use a single `config` file with multiple deployments.

As a pre-requisite, you should [store secrets outside of your configuration](../secrets-s3).

## Configure Halyard
In `halyard.yml`, configure the deployments you'd like to manage:

```yaml
halyard:
  halconfig:
    storage:
      github:
        # You can use encrypted secrets here to pass sensitive information
        token: encrypted:...
    configs:
    - name: staging
      github:
        path: github.com:acmecorp/spinnaker-configs/staging
        branch: master
    - name: prod
      github:
        path: github.com:acmecorp/spinnaker-configs/prod
        branch: master
...
```

The `path` should be to the root of the directory containing the `config` file.

Note: When using mutiple deployments in a single file or if the deployment name is not `default`, you should distinguish between deployments by using `deploymentName`:

```yaml
halyard:
  halconfig:
    storage:
      github:
        token: encrypted:...
    configs:
    - name: staging
      github:
        path: github.com:acmecorp/spinnaker-configs
        branch: master
        deploymentName: staging
    - name: prod
      github:
        path: github.com:acmecorp/spinnaker-configs
        branch: master
        deploymentName: prod
...
```


## Deploy Halyard as a service

We recommend deploying Halyard in the same cluster as Spinnaker to make validation more accurate. You can however deploy Halyard in its own namespace.

Create a config map for Halyard's configuration:
```
kubeconfig -n YOUR_NAMESPACE create configmap halyard-config --from-file=./halyard.yml
```

Then make a deployment manifest:
```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  annotations:
  labels:
    app: halyard
  name: halyard-armory
  namespace: YOUR_NAMESPACE
spec:
  replicas: 1
  selector:
    matchLabels:
      app: halyard
  template:
    metadata:
      labels:
        app: halyard
    spec:
      containers:
      - name: halyard
        image: docker.io/armory/halyard-armory:{{ site.data.versions.halyard-armory-version }}
        ports:
        - containerPort: 8064
          protocol: TCP
      volumes:
      - name: halyard-config-volume
        configMap:
          name: halyard-config
```

We can then expose Halyard. Refer to [Kubernetes](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#expose) or your cloud provider documentation for more options:
```
kubectl -n YOUR_NAMESPACE expose halyard-armory --type=LoadBalancer
```

Don't forget to:
- Secure Halyard's endpoints by limiting IP sources or using security groups of your cloud provider.
- Add a DNS entry for Halyard

# Deploy Spinnaker automatically
You have two options at your disposal: using a webhook directly into Halyard or initiating validation and deployments from your CI tool.

## Option 1: Direct webhook
Note: As of this time, only Github webhooks are supported.

In Github, navigate to your repository settings, find the webhook section, and select "Add webhook".
- Use `https://HALYARD_HOSTNAME/webhook/github` for the Payload URL
- Select Push events and Pull Requests for the types of events you'd like to receive.

![Github Webhook](/assets/images/halyard-webhook-github.png)

Note: You'll need to make sure that the service is exposed externally and reachable by Github. You can restrict which IP are reachable only by [Github servers](https://help.github.com/en/articles/about-githubs-ip-addresses).

## Option 2: Use CI tool
Add a job in your CI tool to listen to your source control events.

To validate, run a simple script - replacing `DEPLOYMENT_NAME` with the value specified in `halyard.yml` (staging and prod in the examples above):
```
curl -XPOST https://halyard.spinnaker.acmecorp.com/v1/config/deployments/DEPLOYMENT_NAME/generate
```

To deploy:
```
curl -XPOST https://halyard.spinnaker.acmecorp.com/v1/config/deployments/DEPLOYMENT_NAME/deploy
```

Note that you'll need to determine the `DEPLOYMENT_NAME` from the CI's job trigger if you use the same repository for multiple Spinnaker configurations.

# Usage
An engineer wants to add a new account:

```
git checkout git@github.com:acmecorp/spinnaker-configs.git
cd spinnaker-configs
git checkout -b new-accounts
# Make the change to the config
vi prod/config
git add prod/config
git commit -m "Adding a new Kubernetes account"
git push --
```

The pull request goes through the workflow your organization has configured where it will get validated. When it gets merged, Halyard will deploys Spinnaker.