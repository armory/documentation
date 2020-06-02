---
layout: post
title: v2.19.6 Armory Release (OSS Release 1.19.5)
order: -21920200420212728
hidden: false
---

# 04/20/20 Release Notes
{:.no_toc}

> Note: Do not upgrade to Armory Spinnaker 2.19.6 (this version). Instead, upgrade to Armory Spinnaker [2.19.7](/release-notes/armoryspinnaker_v2.19.7/) or later.

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Breaking Changes

### Required Halyard version

Armory Spinnaker 2.19.x requires Armory Halyard 1.8.3 or later.

### HTTP sessions for Gate
This version includes an upgrade to the Spring Boot dependency. This requires you to flush all the Gate sessions for your Spinnaker deployment. For more information, see [Flushing Gate Sessions](https://kb.armory.io/admin/flush-gate-sessions/).

### Scheduled Removal of Kubernetes V1 Provider
The Kubernetes V1 provider will be removed in Spinnaker 1.21. Please see the [RFC](https://github.com/spinnaker/governance/blob/master/rfc/eol_kubernetes_v1.md) for more details.

Breaking change: Kubernetes accounts with an unspecified providerVersion will now default to V2. Update your Halconfig to specify `providerVersion: v1` for any Kubernetes accounts you are currently using with the V1 provider.

## Known Issues

### Upgrading from 2.18.x with MySQL used for Front50 renames the plugin_artifacts table
As a part of the upgrade from 2.18.x to 2.19.x, the table **plugin_artifacts** gets renamed to `plugin_info`. Downgrades from 2.19.x to 2.18.x do not revert the table name. The table remains named `plugin_info`, preventing access to the table.  

### Service Accounts using Fiat

There is an issue creating or updating service accounts. This causes the pipeline permissions feature to not work.  

**Affected versions**: Armory Spinnaker 2.19.6 and earlier.

**Fixed versions**: Armory Spinnaker 2.19.7 and later

### Plugins Framework

There is a known issue with the Plugins framework in Armory Spinnaker 2.17.6. If you want to build or use custom plugins, do not use this version. Use Armory Spinnaker 2.17.8 or later.

## Highlighted Updates

### Armory
Highlighted Updates describe some of the major changes in this release. Highlights specific to Armory Spinnaker for this release include:

**Policy Engine**

Armory's Policy Engine for the SDLC now also performs Runtime validation on Spinnaker pipelines. This means that when a pipeline runs, the Policy Engine evaluates the pipeline. This validation only operates on tasks that you have explicitly created policies for. For more information, see [Policy Engine](/spinnaker/policy-engine).

**CVEs**

Addressed a number of CVEs found within the Spinnaker services.

**Plugins**

This release supports Plugin deployment using Armory Halyard or the [Spinnaker Operator](/_spinnaker/operator/). Consult the open source [Plugin](https://www.spinnaker.io/guides/user/plugins/user-guide/) docs for Halyard usage or the [Plugins Operator Reference](/_operator_reference/plugins/) for a manifest example.

Additionally, this version of Spinnaker includes updates to how Deck is built. Previously, Deck's builds were non-deterministic, causing issues with loading plugins into the UI. Deck's builds are now deterministic and support UI plugins.

**Managed Pipeline Templates v2 UI**

Armory Spinnaker 2.19.x contains the latest version of Managed Pipeline Templates v2 (MPTv2), which is the default pipeline templating solution offered in OSS Spinnaker. 

Armory recommends using Armory's Pipeline as Code feature instead of MPTv2 because it offers the following benefits:

* Integration with GitHub, GitLab and BitBucket enabling teams to store pipelines with application code
* Templates and access to the templates can be stored and managed separately from pipelines
* The ability to compose complex templates and pipelines from modules

Note that Armory's Pipeline as Code and the open source Managed Pipeline Templates are not integrated and do not work together.

By default, the MPTv2 UI is disabled in Armory Spinnaker 2.19.6. Leaving the UI disabled maintains the same experience you had with Armory Spinnaker 2.18.x (OSS 1.18.x).

If you want to enable the MPTv2 UI, see [Enabling the Managed Pipeline Templates UI](https://kb.armory.io/admin/enable-mptv2/).



###  Spinnaker Community Contributions
The following highlights describe some of the major changes from the Spinnaker community for OSS Release 1.19.5, which is included in this release of Armory Spinnaker 2.19:

**Java 11**
> The migration to Java 11 continues. This should not affect Spinnaker users. If you extend Spinnaker, this change may affect you.

The Java 11 JRE runs Spinnaker when deployed to a Kubernetes cluster using Halyard (or if you consume the official containers in some other way). If this causes problems, or your organization isn't ready to run Java 11 in production, you can specify deploymentEnvironment.imageVariant: JAVA8 (or UBUNTU_JAVA8) in your Halyard config. Please notify [sig-platform@spinnaker.io](sig-platform@spinnaker.io) if you run into issues and decide to downgrade.

All users need to switch to a Java 11 JRE by Spinnaker 1.21, which is scheduled to be released in early July. Please see the [RFC](https://github.com/spinnaker/governance/blob/master/rfc/java11.md) for the full schedule and more details. We encourage everyone to start testing Spinnaker under a Java 11 JRE now in preparation for the cutover. If you have any concerns about the migration timeline, please reach out to sig-platform@spinnaker.io.

**IAM service-linked roles for ECS**

The ECS provider now requires IAM service-linked roles for use with ECS and Application Auto Scaling. Deployments to AWS accounts that do not already have service-linked roles for these AWS services may see failed deployments after upgrading to Spinnaker 1.19. To create the required service-linked roles, run the following:

```
aws iam create-service-linked-role --aws-service-name ecs.amazonaws.com
aws iam create-service-linked-role --aws-service-name ecs.application-autoscaling.amazonaws.com
```

Visit the [ECS service-linked role documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using-service-linked-roles.html) and the [Application Auto Scaling service-linked role documentation](https://docs.aws.amazon.com/autoscaling/application/userguide/application-auto-scaling-service-linked-roles.html) for information on the permissions in these roles.

**Changes to default settings for non-Halyard users**

In order to make default settings consistent whether deploying using Halyard or manually, the following properties of Orca and Clouddriver have had their defaults changed. This change does not affect users who deploy using Halyard, as Halyard was already setting these properties to the new values.

* Clouddriver
  * `shutdown-wait-seconds`, which sets the number of seconds Clouddriver waits for outstanding work to complete when shutting down, will now default to 600 seconds.
* Orca
  * Orca will no longer consider the environment variable `REDIS_URL` when setting the connection to Redis.
  * The setting `echo.enabled` now defaults to `true`.
  * The `bakery.extractBuildDetails` setting now defaults to `true`.

<br><br><br>

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.19.6-rc.2
timestamp: "2020-04-20 20:57:37"
services:
  clouddriver:
    commit: ef9da881
    version: 2.19.7
  echo:
    commit: 43e1966a
    version: 2.19.8
  fiat:
    commit: a955c640
    version: 2.19.4
  front50:
    commit: eaeb2a64
    version: 2.19.5
  gate:
    commit: 61291021
    version: 2.19.4
  igor:
    commit: 8cbc70d2
    version: 2.19.5
  orca:
    commit: 85dbdae9
    version: 2.19.8
  rosco:
    commit: 2bb01d9e
    version: 2.19.5
  deck:
    commit: 4f6b2719
    version: 2.19.7
  dinghy:
    commit: ef444037
    version: 2.19.5
  terraformer:
    commit: f3edd3da
    version: 1.0.6
  kayenta:
    commit: c04d2e7c
    version: 2.19.4
  monitoring-daemon:
    version: 0.16.1-7d506f0-rc1
  monitoring-third-party:
    version: 0.16.1-7d506f0-rc1
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>

### Armory

#### Armory Deck  - e8ded5b9...4f6b2719
 - fix(build): don't strip comments, see https://github.com/spinnaker/deck/pull/8180

###  Spinnaker Community Contributions

See the Open Source Spinnaker Release Notes for the versions included in this release:  

* [Spinnaker's v1.19.0](https://www.spinnaker.io/community/releases/versions/1-19-5-changelog#spinnaker-release-1-19-0)  
* [Spinnaker's v1.19.1](https://www.spinnaker.io/community/releases/versions/1-19-5-changelog#spinnaker-release-1-19-1)  
* [Spinnaker's v1.19.2](https://www.spinnaker.io/community/releases/versions/1-19-5-changelog#spinnaker-release-1-19-2)
* [Spinnaker's v1.19.3](https://www.spinnaker.io/community/releases/versions/1-19-5-changelog#spinnaker-release-1-19-3)
* [Spinnaker's v1.19.4](https://www.spinnaker.io/community/releases/versions/1-19-5-changelog#spinnaker-release-1-19-4)
* [Spinnaker's v1.19.5](https://www.spinnaker.io/community/releases/versions/1-19-5-changelog#individual-service-changes) 

This version cherry picks [spinnaker/deck/pull/8180](https://github.com/spinnaker/deck/pull/8180).
