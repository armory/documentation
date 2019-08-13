---
layout: post
title: v2.5.6 Armory Release (OSS Release 1.14.11)
order: -20520190726174146
hidden: false
---

# 07/26/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
Dinghyfile yaml parsing issues with nested maps.  

Please upgrade to `Armory Spinnaker 2.5.7` to fix this issue.

## Highlighted Updates
### Armory

This release fixes an issue with the pipelineID function in Dinghyfiles.


###  Spinnaker Community Contributions
[Spinnaker 1.14.11 Release Notes](https://www.spinnaker.io/community/releases/versions/1-14-11-changelog)

<br>

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.5.6-rc813
timestamp: "2019-07-26 16:05:02"
services:
  clouddriver:
    version: 4.7.0-651caee-9e336dd-rc128
  deck:
    version: 2.0.0-fec48f6-b1f75ef-rc15
  dinghy:
    version: 0.0.4-8dfa005-rc584
  echo:
    version: 2.5.1-7f44a96-afcbb51-rc118
  fiat:
    version: 1.5.2-b557350-ff44172-rc109
  front50:
    version: 0.17.0-bf00a4f-0540599-rc11
  gate:
    version: 1.8.3-83b6e52-97f6477-rc109
  igor:
    version: 1.3.0-c3c7850-b3f354f-rc108
  kayenta:
    version: 0.9.1-39c3a6b-dd8a91d-rc11
  monitoring-daemon:
    version: 0.13.0-bf01bf2-rc1
  monitoring-third-party:
    version: 0.13.0-bf01bf2-rc1
  orca:
    version: 2.7.5-62b8988-dfafeef-rc119
  rosco:
    version: 0.12.0-e1fc510-59f7929-rc9
  terraformer:
    version: 0.0.2-8361728-rc25
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - eb0bb9c...8dfa005
 - fix(pipelineID): fix issue with pipelineID parsing in Dinghyfiles

#### Terraformer&trade; - 88b8e1c...8361728
No Changes

#### Armory Clouddriver  - 651caee
No Changes

#### Armory Deck  - fec48f6
No Changes

#### Armory Echo  - 7f44a96
No Changes

#### Armory Fiat  - b557350
No Changes

#### Armory Front50  - bf00a4f
No Changes

#### Armory Gate  - 83b6e52
No Changes

#### Armory Igor  - c3c7850
No Changes

#### Armory Kayenta  - 39c3a6b
No Changes

#### Armory Orca  - 62b8988
No Changes

#### Armory Rosco  - e1fc510
No Changes



###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release:
* [Spinnaker 1.14.11 Release Notes](https://www.spinnaker.io/community/releases/versions/1-14-11-changelog)

#### Clouddriver  - 387dde5...9e336dd
 - fix(ecs): search through whole list of tasks for vpc ID (#3886) (#3903)

#### Deck  - b1f75ef
No Changes

#### Echo  - afcbb51
No Changes

#### Fiat  - ff44172
No Changes

#### Front50  - 0540599
No Changes

#### Gate  - 97f6477
No Changes

#### Igor  - b3f354f
No Changes

#### Kayenta  - dd8a91d
No Changes

#### Orca  - dfafeef
No Changes

#### Rosco  - 59f7929
No Changes

