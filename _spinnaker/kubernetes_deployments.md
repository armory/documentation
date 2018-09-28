---
layout: post
title: Kubernetes Deployments
order: 132
---
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

This document focuses on the manifest based (aka V2) Kubernetes provider.

## Kubernetes Deployments
Armory Spinnaker delegates the deployment of containers to Kubernetes. Kubernetes then proceeds with a rolling update deployment which is effectively a rolling blue/green deployment.
Pods are created in batches. When a pod is healthy it starts receiving traffic.

### Example
We've defined a simple pipeline where we first define an artifact (a Docker image) with a version coming from a parameter. You'd usually get the image from a trigger via container registry or a Jenkins job.

![image](https://cl.ly/b93f96f9cf44/%255Bf1c1b353770f4fcb2ef259a94c46a9ca%255D_Image%2525202018-09-27%252520at%2525204.47.42%252520PM.png)
*In our example, the container version comes from a pipeline parameter.*


The second step defines the deployment of that image. It's a simple "*Deploy (Manifest)*" step. Here we're adding the static deployment manifest via a text field but you'd usually retrieve it as an artifact directly
or via a [Helm bake stage](https://kb.armory.io/kubernetes/using-spinnaker-and-helm/).

![image](https://cl.ly/912a0bfea50a/%255Bb2347374090ddd8ccff9178ac0cee09a%255D_Image%2525202018-09-27%252520at%2525206.01.23%252520PM.png)

As a matter of fact the deployment manifest is not entirely static,
Spinnaker will replace the image name with the actual name (with tag) from the bound artifact.

Let's see how a new version of the container gets deployed:
![image](/assets/images/rollingupdate-default.gif)


## Can we change how containers are deployed?
In our example so far, we observed that we go down to 3 pods and 5 containers existing simultaneously (*Terminating* state doesn't count).
You actually have some control over how Kubernetes handles the pod creation.
Two [parameters](https://kubernetes.io/docs/concepts/workloads/controllers/deployment/#rolling-update-deployment) will help you:
- `maxSurge` sets a limit on how many pods can be created over the desired number of pods. Default is 25%.
- `maxUnavailable` sets a limit on how many pods can be non-running. Default is also 25%.

Let's modify our deployment manifest and ensure that we always have our 4 pods running during deployment:

![image](https://cl.ly/ef88045a31e2/%255Be955d4e3d765b2bba04eca65d1f87153%255D_Image%2525202018-09-27%252520at%2525205.58.29%252520PM.png)

Let's see how we deploy with our new configuration:
![image](/assets/images/rollingupdate-0.gif)

We keep 4 pods running throughout the deployment and never more than 5 pods (4 pods + 25%) existing at any given time.
