---
layout: post
title: Overview of Armory Halyard
order: 10
---

First, a bit of background.  Spinnaker is composed of a numnber of microservices (primarily Spring Java-based), that often run as Docker containers in a Kubernetes cluster.

The OSS Halyard installer works roughly as follows:
* You run the `hal` command (locally on your machine, in a container, or on a VM) to start up a Halyard daemon, which you then interact with and which also interacts with your Spinnaker cluster
* You run various `hal` commands to tell the daemon how to create/update your '**halconfig**', which is a codified definition of your Spinnaker cluster.  For example, in order to set up a basic Spinnaker cluster, you'd need several of the following:
   * `hal config provider kubernetes enable` to enable the Kubernetes Cloud Provider
   * `hal config provider kubernetes account add X --<flags>` to add a Kubernetes account
   * `hal config storage edit --<flags>` to configure persistent storage using some blob storage
   * `hal config deploy edit --type distributed --account-name X --<flags>` to configure Halyard to deploy Spinnaker as a distributed set of Kuberntes deployments on account X
* All of the various configs you add via `hal config` are added to a dot directory called `.hal`.  For example, most of the above configurations would be reflected in `~/.hal/config`
* You run `hal deploy apply` to 'apply' all of the changes that you've made and install Spinnaker to your cluster.  This does the following:
   * Renders a number of intermediate yaml (and other configuration) files in a `staging` directory (`~/.hal/<deployment>/staging`)
   * Creates a number of Kubernetes secrets containing the rendered configuration files
   * Creates a Kubernetes *deployment* for each of the Spinnaker microservices
   * Creates a Kubernetes *service* entity for each of the Spinnaker microservices

Then, you'd add additional cloud providers (again, via `hal config`), and apply them to your cluster with `hal deploy apply`, which create corresponding secrets and configurations which would then get updated on your deployments.

*†This is greatly simplified, but should provide enough background to understand what's going on.*

**The Armory Halyard installer is an extension of the OSS Halyard installer**.  We make the initial deployment of Spinnaker much simpler if you're working with a Kubernetes cluster and AWS S3, by adding a command that triggers a series of prompts (sort of a mini tutorial) that handles a lot of the initial configuration.  This occurs when you run `hal armory init` - it will prompt you for the following information:
* Which kubeconfig to use, and which Kubernetes cluster within that kubeconfig to deploy to
* Which AWS credential profile to use to connect to S3
* Which S3 bucket to store state in

So with the Armory Halyard installer, we make it much easier to get your initial Spinnaker up and running by automating a lot of the initial configuration.

Therefore - the Armory Spinnaker distribution does not currently *use* Terraform to get up and running; it basically relies on a bunch of user provided configuration to deploy a number of Kubernetes manifests to create the mulitple microservices that comprise Spinnaker.

It's not a single Docker container, and it's not a set of static VMs - it's a highly-resilient distributed microservices architecture that runs on top of Kubernetes.

Here are a couple key points:
* Armory makes getitng started with Spinnaker very easy
* We extend Halyard and other Spinnaker services to add capabilitles; we never fork
* We handle a lot of the manual configuration of Spinnaker for you
* We make it much easier to upgrade Spinnaker, as well.

If you already have a Kubernetes cluster, and you already have access to S3, we make installing Spinnaker insanely easy - just run our installation script, and you can have Spinnaker up and running in 15 minutes or less.

If you're not using S3 or not using Kubernetes, you can still get all the other benefits of the Armory distribution, just by following the standard OSS `hal` configuration steps using our extended Halyard package.

Either way, feel free to reach out to us at [hello@armory.io](hello@armory.io) and we can help you get started!