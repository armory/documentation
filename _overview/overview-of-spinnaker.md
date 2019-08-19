---
layout: post
title: Overview of Armory Spinnaker
order: 10
permalink: '/'
---

<script type="application/json" class="js-hypothesis-config">

{"showHighlights": true}

</script>

<script src="https://hypothes.is/embed.js" async></script>

## What is Spinnaker?
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

<a href="https://kb.armory.io/spinnaker/what-is-spinnaker"><img height="20" style="float: left;" src="https://drod.io/1h3I273p002U/video-file.png"></a>[ Watch Ethan explain Spinnaker in three minutes](https://kb.armory.io/spinnaker/what-is-spinnaker/)

Spinnaker is an open source, multi-cloud Continuous Delivery and Deployment platform that provides a single pane of glass with visibility across your deployment for deployment status, infrastructure, security and compliance, and metrics. It uses a flexible and customizable series of deployment stages, known as pipelines, which allow for easy customization and enhancement to fit a variety of cloud deployment needs.

Spinnaker can deploy to and manage clusters across Amazon Web Services (AWS), Kubernetes, and Google Cloud Platform (GCP) with full feature compatibility for those cloud providers. Spinnaker can also deploy to Cloud Foundry, and full integration with Microsoft Azure is currently underway.


## Why is Spinnaker relevant?

Spinnaker not only encourages businesses to move to the cloud (an expected migration) but makes it easier for them to adopt the cloud’s advantages.

Spinnaker encourages

**Safety and Speed**

Today’s world revolves around software and services working reliably and continuously -- the internet is accessible 24 hours a day, and users expect 100% uptime. The cost of business services experiencing downtime, planned or unplanned, is only growing. This means that companies need to be able to deploy software in a way that is safe. In the past, increasing safety meant decreasing or even halting development velocity while increasing velocity commonly meant decreasing safety. That is a tradeoff that is getting more and more difficult to justify.

Spinnaker enables safer and faster deployments by facilitating the following:

- **Immutable infrastructure** that builds trust by making sure infrastructure matches an understood and explicit pattern that does not change once it is deployed. If changes are required, a brand new server group gets deployed. Having new builds deploy on a new server group enables the use of different deployment strategies, which are another benefit of Spinnaker.
- **Deployment strategies** to fit your needs and infrastructure. The strategies include the following:
  - Blue/Green (Red/Black):  An easy way to think about this is that it is similar to active-active high availability. You have two instances of your deployment running concurrently, the production build and a new one. Once you feel confident that the newer build is stable, traffic is shifted all at once from the old deployment to the new one. Both server groups are maintained, which allows for easy rollback in case of issues.
  - Rolling Blue/Green (Red/Black):  Similar to Blue/Green, but traffic is gradually shifted from the older deployment to the new one.
  - Highlander:  Similar to Blue/Green, except the old deployment is destroyed once traffic is shifted.
  - Canary: This consists of three clusters: the current production cluster, a baseline cluster (a smaller clone of production), and a canary cluster with the new deployment. The production cluster handles most of the load while the baseline and canary each receive a smaller amount. After a predetermined amount of time, performance of the baseline and canary are compared, and deployment of the canary build depends on canary analysis, automated or manual.
- **Automated canary analysis** through Kayenta, an artificial intelligence-powered canary analysis tool that is integrated with Spinnaker. Without manual intervention, Kayenta can determine if a canary deployment should be pushed to production.
- **Multi-cloud deployments** to avoid lock-in and allow you to optimize for cost and geographic distribution.

**Innovation**

Shipping changes more frequently allows developers to gather real user feedback sooner, enabling them to iterate and build based on actual data. Additionally, Spinnaker abstracts away much of the cloud configuration details, giving developers more time to focus on meaningful tasks.

**Visiblity**

Spinnaker's single pane of glass is focused around the applications page in the Spinnaker UI. You can see the status of all your application deployments across cloud providers without having to log into multiple locations. Furthermore, if you need to take an action, such as rolling back an instance, you can do so within the application page.

## What a typical workflow looks like

![Spinnaker's Responsibilities](/assets/images/armory_what_is_spinnaker.png)

A typical work flow on AWS with Armory Spinnaker starts with baking a Linux-based Amazon Machine Image (AMI). This image along with your launch configurations define an immutable infrastructure that you can use to deploy into Amazon EC2 with Spinnaker. After the deployment, run your tests, which can be integrated with Spinnaker and automatically triggered. Based on your deployment strategy and any criteria you set, go live with the build.

## What Armory Spinnaker is

Armory Spinnaker is an enterprise-grade distribution of Spinnaker that forms the core of Armory's Platform. It is preconfigured and runs in your Kubernetes cluster. The platform is an extension of open source Spinnaker and includes all those benefits as well as the following:
- Pipeline as Code (Dinghy) allows you to store Spinnaker pipelines in Github and manage them like you would manage code, including version control, templatization, and modularization. Combine all these to rapidly and repeatably scale pipelines in your Spinnaker deployment.
- Armory Halyard Installer to help you configure, deploy, and update Spinnaker
- Certified Pipelines give you the ability to automate and enforce policies, such as load testing and security scanning.
- SLA Dashboards help quantify an application's general health.
- Integrations with many of your existing tools, such as Terraform. For a full list, see [Integrations](https://www.armory.io/armory-integrations/.)

## Need more help?

Questions, comments, or suggestions about this documentation? Chat with us by clicking on the icon on the bottom right of each page.  Our entire team monitors these chats, and we'll respond as quickly as we can.

## Want to help?

- We encourage you to [issue pull requests](https://github.com/armory/documentation) to improve this documentation.
- Join the Spinnaker Open Source Community on the [Spinnaker Slack channel](http://join.spinnaker.io/)

## Features and Pricing

Armory's Platform helps software teams ship better software, faster.  [Learn more here](http://www.armory.io/pricing).
