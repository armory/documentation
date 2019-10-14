---
layout: post
title: Overview of Armory Spinnaker
order: 10
permalink: '/'
---
## What Is Spinnaker?
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

<a href="https://kb.armory.io/spinnaker/what-is-spinnaker"><img height="20" style="float: left;" src="https://drod.io/1h3I273p002U/video-file.png"></a>[ Watch Ethan explain Spinnaker in three minutes](https://kb.armory.io/spinnaker/what-is-spinnaker/)

Spinnaker is an open source, multi-cloud Continuous Delivery and Deployment platform that provides a single pane of glass with visibility across your deployment for deployment status, infrastructure, security and compliance, and metrics. It uses pipelines, flexible and customizable series of deployment stages, to fit a variety of cloud deployment needs.

Spinnaker can deploy to and manage clusters across Amazon Web Services (AWS), Kubernetes, and Google Cloud Platform (GCP) with full feature compatibility for those cloud providers. Additionally, Spinnaker can deploy to Cloud Foundry, and full integration with Microsoft Azure is currently underway.


## Why is Spinnaker relevant?

Spinnaker not only enables businesses to move to the cloud but makes it easier for them to adopt the cloud’s advantages.

Spinnaker encourages:

**Safety and Speed**

Today’s world revolves around software and services working reliably and continuously -- the internet is accessible 24 hours a day, and users expect 100% uptime. The cost of business services experiencing downtime, planned or unplanned, is only growing. This means that companies need to be able to deploy software in a way that is safe. In the past, releases were big large monoliths, and ensuring uptime (or deployment safety) meant a long time between each release, including maybe even extended code freezes. A company that wants to maintain a stable environment can become averse to pushing out new features, leading to a slowdown in innovation. This tradeoff is getting more and more difficult to justify.

Spinnaker enables safer and faster deployments by facilitating the following:

- **Immutable infrastructure** that builds trust by making sure infrastructure matches an understood and explicit pattern that does not change once it is deployed. If changes are required, a brand new instance gets deployed. Having unique instances for each build enables the use of different deployment strategies, which are another benefit of Spinnaker.
- **Deployment strategies** to fit your needs and infrastructure. The strategies include the following:
  - **Blue/Green (Red/Black)**:  An easy way to think about this is that it is similar to active-active high availability. You have two instances of your deployment running concurrently, the production build and a new one. Once you feel confident that the newer build is stable, traffic is shifted all at once from the old deployment to the new one. A configurable number of server groups are maintained, which allows for easy rollback in case of issues.
  - **Rolling Blue/Green (Red/Black)**:  Similar to Blue/Green, but traffic is gradually shifted from the older deployment to the new one.
  - **Highlander**:  Similar to Blue/Green, except the old deployment is destroyed once traffic is shifted.
  - **Canary**: This consists of three instances: the current production instance, a baseline instance (a smaller clone of production), and a canary intance with the new deployment. The production instance handles most of the load while the baseline and canary each receive a smaller amount. After a predetermined amount of time, performance of the baseline and canary are compared. Whether the a deployment becomes the new production build depends on canary analysis that can be automated or manual.
- **Automated canary analysis** through Kayenta, a canary analysis tool that is integrated with Spinnaker. Without manual intervention, Kayenta can determine if a canary deployment should be pushed to production.
- **Multi-cloud deployments** to avoid lock-in and allow you to optimize for things like cost, latency, and geographic distribution.

**Innovation**

Shipping changes more frequently allows developers to gather real user feedback sooner, enabling them to iterate and build based on actual input from customers. Additionally, Spinnaker abstracts away much of the cloud configuration details, giving developers more time to focus on meaningful tasks instead of infrastructure details.

**Visiblity**

Spinnaker's single pane of glass is focused around the applications page in the Spinnaker UI. You can see the status of all your application deployments across cloud providers without having to log into multiple locations. Furthermore, if you need to take an action, such as rolling back an instance, you can do so within the application page.

## What a Typical Workflow Looks Like

![Spinnaker's Responsibilities](/assets/images/armory_what_is_spinnaker.png)

A typical work flow with Armory Spinnaker starts with baking a Linux-based machine image. This image along with your launch configurations define an immutable infrastructure that you can use to deploy to your cloud provider with Spinnaker. After the deployment, run your tests, which can be integrated with Spinnaker and automatically triggered. Based on your deployment strategy and any criteria you set, go live with the build.

## What Armory Spinnaker Is

Armory Spinnaker is an enterprise-grade distribution of Spinnaker that forms the core of Armory's Platform. It is preconfigured and runs in your Kubernetes cluster. The platform is an extension of open source Spinnaker and includes all those benefits as well as the following:
- Pipeline as Code (Dinghy) allows you to store Spinnaker pipelines in Github and manage them like you would manage code, including version control, templatization, and modularization. Combine all these to rapidly and repeatably scale pipelines in your Spinnaker deployment.
- Armory Halyard Installer to help you configure, deploy, and update Spinnaker
- Certified Pipelines give you the ability to automate and enforce policies, such as load testing and security scanning.
- Policy Engine to help you with compliance requirements.
- SLA Dashboards help quantify an application's general health.
- Integrations with many of your existing tools, such as Terraform. For a full list, see [Integrations](https://www.armory.io/armory-integrations/.)

## Need More help?

Questions, comments, or suggestions about this documentation? Chat with us by clicking on the icon on the bottom right of each page.  Our entire team monitors these chats, and we'll respond as quickly as we can.

## Want to Help?

- We encourage you to [issue pull requests](https://github.com/armory/documentation) to improve this documentation.
- Join the Spinnaker Open Source Community on the [Spinnaker Slack channel](http://join.spinnaker.io/)

## Features and Pricing

Armory's Platform helps software teams ship better software, faster.  [Learn more here](http://www.armory.io/pricing).
