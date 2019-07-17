---
layout: post
title: v2.5.4 Armory Release (OSS Release 1.14.9)
order: -20520190717221945
hidden: false
---

# 07/17/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
There are currently no known issues with this release.

## Highlighted Updates
### Armory

This release updates a dependency in the non-gradle5 JDK services (`Front50`, `Kayenta`, and `Rosco`) which provides support for `K/V v2` with the `Kubernetes Secrets` engine.

###  Spinnaker Community Contributions
[Spinnaker 1.14.9 Release Notes](https://www.spinnaker.io/community/releases/versions/1-14-9-changelog)

<br>

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.5.4-rc590
timestamp: "2019-07-17 21:48:47"
services:
  clouddriver:
    version: 4.6.5-651caee-387dde5-rc126
  deck:
    version: 2.0.0-6fedca0-b1f75ef-rc13
  dinghy:
    version: 0.0.4-1090363-rc369
  echo:
    version: 2.5.1-7f44a96-afcbb51-rc118
  fiat:
    version: 1.5.1-b557350-ff44172-rc108
  front50:
    version: 0.17.0-bf00a4f-0540599-rc10
  gate:
    version: 1.8.2-83b6e52-935a334-rc107
  igor:
    version: 1.3.0-c3c7850-b3f354f-rc107
  kayenta:
    version: 0.9.0-39c3a6b-dd8a91d-rc10
  monitoring-daemon:
    version: 0.13.0-bf01bf2-rc1
  monitoring-third-party:
    version: 0.13.0-bf01bf2-rc1
  orca:
    version: 2.7.4-62b8988-8c46567-rc117
  rosco:
    version: 0.12.0-e1fc510-59f7929-rc8
  terraformer:
    version: 0.0.2-9d63ba2-rc21
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - 9cece7f...1090363
 - fix(slack): include error in slack message (#179)

#### Terraformer&trade; - c845d1d...9d63ba2
 - chore(durability): harden terraformer by making it wait on background threads and currently executing terraform jobs (#81)

#### Armory Clouddriver  - 651caee
No Changes

#### Armory Deck  - 6fedca0
No Changes

#### Armory Echo  - 7f44a96
No Changes

#### Armory Fiat  - b557350
No Changes

#### Armory Front50  - bf00a4f
* Updated `armory-commons`

#### Armory Gate  - 83b6e52
No Changes

#### Armory Igor  - c3c7850
No Changes

#### Armory Kayenta  - 39c3a6b
* Updated `armory-commons`

#### Armory Orca  - 62b8988
No Changes

#### Armory Rosco  - e1fc510
* Updated `armory-commons`



###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release:  
* [Spinnaker 1.14.9 Release Notes](https://www.spinnaker.io/community/releases/versions/1-14-9-changelog)

#### Clouddriver  - 387dde5
No Changes

#### Deck  - b1f75ef
No Changes

#### Echo  - afcbb51
No Changes

#### Fiat  - ff44172
No Changes

#### Front50  - 0540599
No Changes

#### Gate  - 935a334
No Changes

#### Igor  - b3f354f
No Changes

#### Kayenta  - dd8a91d
No Changes

#### Orca  - 8c46567
No Changes

#### Rosco  - 59f7929
No Changes
