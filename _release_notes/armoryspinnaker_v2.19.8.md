---
layout: post
title: v2.19.8 Armory Release (OSS Release 1.19.5)
order: -21920200422015413
hidden: false
---

# 04/21/20 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Breaking Changes

### Required Halyard version

Armory Spinnaker 2.19.x requires Armory Halyard 1.8.3 or later.

### HTTP sessions for Gate
Armory Spinnaker 2.19.x includes an upgrade to the Spring Boot dependency. This requires you to flush all the Gate sessions for your Spinnaker deployment. For more information, see [Flushing Gate Sessions](https://kb.armory.io/admin/flush-gate-sessions/).

### Scheduled Removal of Kubernetes V1 Provider
The Kubernetes V1 provider will be removed in Spinnaker 1.21. Please see the [RFC](https://github.com/spinnaker/governance/blob/master/rfc/eol_kubernetes_v1.md) for more details.

Breaking change: Kubernetes accounts with an unspecified providerVersion will now default to V2. Update your Halconfig to specify `providerVersion: v1` for any Kubernetes accounts you are currently using with the V1 provider.


## Known Issues

### Upgrading from 2.18.x with MySQL used for Front50 renames the plugin_artifacts table
As a part of the upgrade from 2.18.x to 2.19.x, the table **plugin_artifacts** gets renamed to `plugin_info`. Downgrades from 2.19.x to 2.18.x do not revert the table name. The table remains named `plugin_info`, preventing access to the table.  

This issue only occurs if you upgrade to 2.19.x and then downgrade.

## Highlighted Updates
### Armory
Highlighted Updates describe some of the major changes in this release. Highlights specific to Armory Spinnaker for this release include:

**Plugins**

This update contians improvements and fixes to the Plugins framework:

* Support for Plugin deployment using Armory Halyard or the [Spinnaker Operator](/spinnaker/operator/). Consult the open source [Plugin](https://www.spinnaker.io/guides/user/plugins/user-guide/) docs for Halyard usage or the [Plugins Operator Reference](/operator_reference/plugins/) for a manifest example.
* Updates to how Deck is built. Previously, Deck's builds were non-deterministic, causing issues with loading plugins into the UI. Deck's builds are now deterministic and support UI plugins.

###  Spinnaker Community Contributions
See the Armory Spinnaker [2.19.7 release notes](/release-notes/armoryspinnaker_v2.19.7/) for detailed list of community contributions.


<br><br><br>

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.19.8-rc.1
timestamp: "2020-04-22 01:49:47"
services:
  clouddriver:
    commit: 2bd55acb
    version: 2.19.8
  echo:
    commit: 43e1966a
    version: 2.19.8
  fiat:
    commit: e7d5efa3
    version: 2.19.6
  front50:
    commit: 32cc7a7c
    version: 2.19.6
  gate:
    commit: 5ea58df0
    version: 2.19.5
  igor:
    commit: 67f5ae20
    version: 2.19.6
  orca:
    commit: be0f8e7a
    version: 2.19.9
  rosco:
    commit: e168a011
    version: 2.19.6
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
    commit: fa1521ae
    version: 2.19.5
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

#### Armory Clouddriver  - ef9da881...2bd55acb
 - fix(plugins): add plugins dir (bp #103) (#104)

#### Armory Echo  - 43e1966a
- fix(plugins): add plugins dir (bp #46) (#47)

#### Armory Fiat  - 8494a0c4...e7d5efa3
 - fix(plugins): add plugins dir (bp #46) (#47)

#### Armory Front50  - eaeb2a64...32cc7a7c
 - fix(plugins): add plugins dir (bp #52) (#53)

#### Armory Gate  - 61291021...5ea58df0
 - fix(plugins): add plugins dir (bp #106) (#107)

#### Armory Igor  - 8cbc70d2...67f5ae20
 - fix(plugins): add plugins dir (#58) (#59)

#### Armory Kayenta  - c04d2e7c...fa1521ae
 - fix(plugins): add plugins dir (bp #64) (#65)

#### Armory Orca  - 85dbdae9...be0f8e7a
 - fix(plugins): add plugins dir (bp #94) (#95)

#### Armory Rosco  - 2bb01d9e...e168a011
 - fix(plugins): add plugins dir (bp #47) (#48)



###  Spinnaker Community Contributions
See the Open Source Spinnaker Release Notes for the versions included in this release:

* [Spinnaker's v1.19.0](https://www.spinnaker.io/community/releases/versions/1-19-5-changelog#spinnaker-release-1-19-0)  
* [Spinnaker's v1.19.1](https://www.spinnaker.io/community/releases/versions/1-19-5-changelog#spinnaker-release-1-19-1)  
* [Spinnaker's v1.19.2](https://www.spinnaker.io/community/releases/versions/1-19-5-changelog#spinnaker-release-1-19-2)
* [Spinnaker's v1.19.3](https://www.spinnaker.io/community/releases/versions/1-19-5-changelog#spinnaker-release-1-19-3)
* [Spinnaker's v1.19.4](https://www.spinnaker.io/community/releases/versions/1-19-5-changelog#spinnaker-release-1-19-4)
* [Spinnaker's v1.19.5](https://www.spinnaker.io/community/releases/versions/1-19-5-changelog#individual-service-changes)   
