---
layout: post
title: Overview of Armory Spinnaker
order: 10
permalink: '/'
---

## What is Spinnaker?
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

<a href="https://kb.armory.io/spinnaker/what-is-spinnaker"><img height="25" style="float: left;" src="https://drod.io/1h3I273p002U/video-file.png"></a>&nbsp; [Watch Ethan explain Spinnaker in three minutes](https://kb.armory.io/spinnaker/what-is-spinnaker/)

Spinnaker is an open source multi-cloud Continuous Delivery and Deployment tool started by Netflix for fast and stable deployments. 

Spinnaker’s flexible pipeline model allows for easy customization and enhancement in addition to facilitating smart pipeline management to serve a variety of cloud deployment needs. 

As of today, Spinnaker can deploy to and manage clusters simultaneously across both Amazon Web Services (AWS), Kubernetes and Google Cloud Platform (GCP) with full feature compatibility for those cloud providers. Spinnaker can also deploy to Cloud Foundry, and support for full integration with Microsoft Azure is currently underway.

![Spinnaker's Responsibilities](/assets/images/armory_what_is_spinnaker.png)


## Why is it relevant?

Today’s world revolves around software and services working reliably and continuously - the internet is increasingly accessible from all time-zones and having business services experience downtime is becoming increasingly costly. Spinnaker is an advanced tool for cloud deployments that not only encourages businesses to move to the cloud (an expected migration) but makes it easier for them to adopt the cloud’s advantages, such as immutable infrastructure and multi-cloud deployments.


## What Armory Spinnaker Does

Armory Spinnaker is a preconfigured distribution of Spinnaker that runs in your Kubernetes cluster. Spinnaker can help you coordinate and orchestrate complicated tasks with pipelines for deploying software. 


## Opinions and Conventions

A normal work flow in Armory Spinnaker would be to start with a Debian package to create an Amazon Machine Image (AMI) for deployment to multiple environments, such as staging, development, and production. The Elastic Cloud Compute (EC2) instances themselves are never modified, but replaced with new instances as you produce new versions of your software. This concept is commonly referred to as Immutable Infrastructure.


## Need More Help? 

If you have questions, comments or suggestions about this documentation *(especially if anything is unclear)*, just chat with us by clicking on the icon on the bottom right of each page.  Our entire team monitors these chats and we'll respond as quickly as we can.

## Want to Help?

- We encourage you to [issue pull requests](https://github.com/armory/documentation) to improve this documentation.
- Join the Spinnaker Open Source Community on the [Spinnaker Slack channel](http://join.spinnaker.io/)

## Features and Pricing

Armory Spinnaker is an enterprise-grade distribution of Spinnaker that forms the core of Armory's Platform. Armory's Platform helps software teams ship better software, faster.  [Learn more here](http://www.armory.io/pricing).
