---
layout: post
title: Kubernetes V2 Provider Guide
published : false
---
This guide should include:

- Kubernetes V2 Provider Overview
- What to expect (and what not to) from the Kubernetes V2 provider
- Setting up the V2 provider
- Create a Kubernetes V2 Pipeline

## Kubernetes V2 Provider Overview
This new Kubernetes provider is centered around delivering and promoting Kubernetes manifests to different Kubernetes environments. These manifests are delivered to Spinnaker using [artifacts](https://www.spinnaker.io/reference/artifacts/in-kubernetes-v2/#kubernetes-objects-as-artifacts) and applied to the target cluster using `kubectl`. Currently there is support to supply artifacts through Git, GCS and Google Pub/Sub.  The manifests that are deployed are automatically versioned by appending a the string such as `v421` to the resource that was deployed to Kubernetes.

### What To Expect From The V2 Provider
The new Kubernetes provider is very much a work in progress and is subject to many changes to the UI and APIs. Manifests The user experience is still a work in progress and we're interested in understanding real-world usage patterns as we iterate on the provider to optimize the experience.  

### Current Limitations
- S3, SQS, and SNS are not support for Artifact delivery
- Native Spinnaker red/black, highlander, rolling red/black deployment strategies are not supported and if desired you should use the deployment object.
- Only `containers` and `configMaps` are bounded to the deployed manifest. `secrets` and other resource types are coming soon.


## Setting Up The V2 Provider

Setting up the V2 provider is similar to the [V1 Kubernetes configuration](http://docs.armory.io/admin-guides/configure_kubernetes/#configure-clouddriver-to-use-the-kubectl-config-file) but we'll need to change the provider flag in `/opt/spinnaker/config/clouddriver-local.yml` to `v2` like in the example below:

```
kubernetes:
  accounts:
    - name: k8s-v2
      providerVersion: v2
      kubeconfigFile: /opt/spinnaker/credentials/kubeconfig
      dockerRegistries:
        - accountName: gcr
```

We'll also need to enable artifact handling in Spinnaker by setting a flag in `/opt/spinnaker/config/spinnaker-local.yml`

```
features:
  artifacts:
    enabled: true
```

Then restart Armory Spinnaker `service armory-spinnaker restart`

## Creating a Kubernetes V2 Pipeline

### Configuring The Pipeline Trigger
We'll begin by creating a pipeline that is triggered from Kuberentes artifacts delivered through Github.  Below we'll define two artifacts that will be deployed as Kuberenetes manifests: `deployment.yml` and `config-map.yml` which are valid Kubernetes manifests.  Make sure to select the source as `Github`.

![artifacts](https://cl.ly/091z2h232r0d/page.png)


![github trigger](https://cl.ly/3G1T0W3N1o3Q/trigger.png)
