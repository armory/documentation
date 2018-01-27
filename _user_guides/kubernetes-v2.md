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
- Native Spinnaker red/black, highlander, rolling red/black deployment strategies are not supported. If desired you should use the deployment object.
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

After configuring the artifacts we'll need to associate them with a Github trigger so the pipeline is triggered whenever there are modifications pushed to Github.  For example, the pipeline below will only trigger when _either_ `deployment.yml` _or_ `config-map.yml` are modified and pushed to the repository.

> Note: If you haven't already, you'll need to configure [Github webhooks](https://www.spinnaker.io/setup/features/notifications/#github) for your Spinnaker instance.

![github trigger](https://cl.ly/3G1T0W3N1o3Q/trigger.png)


### Configuring The Config Map Manifest Delivery

We'll configure the config map to be deployed first. Add a "Deploy(Manifest)" stage to your pipelines

![deploy manifest](https://cl.ly/3p3T360a3f37/deploy_manifest.png)


Once you've added the stage, select `Artifact` below and it will allow you to choose one of the expected artifacts that we configured in the previous section.  Choose `config-map.yml` and hit `save`. Spinnaker will deploy the chosen artifact but append a version to the name of the artifact. For [our example config map](https://github.com/Armory/spinnaker-k8s-v2-example/blob/master/config-map.yml). So for the name `k8-v2-config-map` it will appear in the Kubernetes cluster with `k8-v2-config-map-v001`.

![config map](https://cl.ly/2C0Z1A0Z3c2G/Image%202018-01-26%20at%204.36.29%20PM.png)

### Configuring Deployment Manifest Delivery

Next we'll configure the stage to deploy the [deployment.yml](https://github.com/Armory/spinnaker-k8s-v2-example/blob/master/deployment.yml) manifest.  This manifest references our config-map as a volume and it's source will be replaced by the versioned artifact deployed in the previous step: `k8-v2-config-map-v001`.  So if our `deployment.yml` contains the following:
```
volumes:
  - name: k8-config
    configMap:
      name: k8-v2-config-map
```

the name will be replaced with the properly versioned artifact:
```
volumes:
  - name: k8-config
    configMap:
      name: k8-v2-config-map-v000
```

![deployment](https://cl.ly/0v1o1o0t2x2A/Image%202018-01-26%20at%205.36.53%20PM.png)

### Executing The Pipeline

Your final pipeline should look similar to the one below.
![final pipeline](https://cl.ly/2V32230w301Q/pipeline.png)

In order to execute your pipeline the first time you'll need to edit both the `config-map.yml` and `deployment.yml`, commit the changes to git and push the changes to Github. The pipeline should trigger and execute flawlessly =)

but if it doesn't, don't hesitate to reach out: http://go.armory.io/chat
