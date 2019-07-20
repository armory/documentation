---
layout: post
title: v2.5.5 Armory Release (OSS Release 1.14.10)
order: -20520190719225428
hidden: false
---

# 07/19/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
There are currently no known issues with this release.

## Highlighted Updates
### Armory

This release updates the `deck-kayenta` module.

###  Spinnaker Community Contributions
[Spinnaker 1.14.10 Release Notes](https://www.spinnaker.io/community/releases/versions/1-14-10-changelog)

<br>

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.5.5-rc650
timestamp: "2019-07-20 00:26:43"
services:
  clouddriver:
    version: 4.7.0-651caee-387dde5-rc127
  deck:
    version: 2.0.0-fec48f6-b1f75ef-rc15
  dinghy:
    version: 0.0.4-eb0bb9c-rc422
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
    version: 0.0.2-88b8e1c-rc24
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>


### Armory
#### Dinghy&trade; - 1090363...eb0bb9c
 - chore(updateos): updates for changes to OS Dinghy (#180)

#### Terraformer&trade; - 9d63ba2...88b8e1c
 - fix(replay): revert the replay logic. (#84)
 - chore(versions): add 0.12.2-0.12.4 to container (#83)
 - fix(timeout): make sure we set a deadline for the http server to terminate (#82)

#### Armory Clouddriver  - 651caee
No Changes

#### Armory Deck  - 6fedca0...fec48f6
 - chore(kayenta): Update deck-kayenta package (#513)

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

#### Gate  - 935a334...97f6477
 - fix(auth): Enable auth to all connectors except API port (1.14.x) (#857)

#### Igor  - b3f354f
No Changes

#### Kayenta  - dd8a91d
No Changes

#### Orca  - 8c46567...dfafeef
 - fix(core): Plan templated pipelines before triggering from start tasks (#3039) (#3048)

#### Rosco  - 59f7929
No Changes
