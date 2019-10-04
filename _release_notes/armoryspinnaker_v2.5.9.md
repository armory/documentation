---
layout: post
title: v2.5.9 Armory Release (OSS Release 1.14.15)
order: -20520191002202712
hidden: false
---

# 10/02/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
There are currently no known issues with this release.




<br><br><br>
## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.5.9-rc2160
timestamp: "2019-10-02 20:07:42"
services:
  clouddriver:
    version: 4.7.3-88e5012-73aefff-rc145
  deck:
    version: 2.0.0-2dfbb1c-b1f75ef-rc17
  dinghy:
    version: 0.0.4-defad9b-rc2226
  echo:
    version: 2.5.2-7f44a96-afcbb51-rc131
  fiat:
    version: 1.5.3-b557350-59546be-rc124
  front50:
    version: 0.17.0-bf00a4f-0540599-rc16
  gate:
    version: 1.8.4-af59d7c-97f6477-rc124
  igor:
    version: 1.3.0-c3c7850-b3f354f-rc121
  kayenta:
    version: 0.9.1-39c3a6b-dd8a91d-rc16
  monitoring-daemon:
    version: 0.13.0-bf01bf2-rc5
  monitoring-third-party:
    version: 0.13.0-bf01bf2-rc5
  orca:
    version: 2.7.7-62b8988-b4db552-rc133
  rosco:
    version: 0.12.0-e1fc510-59f7929-rc14
  terraformer:
    version: 0.0.2-6703356-rc30
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - cd9d1cc...defad9b
 - chore(build): Update oss dinghy dependency (#190)
 - fix(makeSlice): makeSlice added to HCL/Yaml (#189)
 - fix(makeslice): Stub out makeSlice during preproc. (#188)
 - chore(deps): fix broken apache dep (#187)
 - refact(halconfig): remove deck (#183)

#### Terraformer&trade; - c0605a2...6703356
 - Update Dockerfile (#90)

#### Armory Clouddriver  - 88e5012
No Changes

#### Armory Deck  - 2dfbb1c
No Changes

#### Armory Echo  - 7f44a96
No Changes

#### Armory Fiat  - b557350
No Changes

#### Armory Front50  - bf00a4f
No Changes

#### Armory Gate  - af59d7c
No Changes

#### Armory Igor  - c3c7850
No Changes

#### Armory Kayenta  - 39c3a6b
No Changes

#### Armory Orca  - 62b8988
No Changes

#### Armory Rosco  - e1fc510
No Changes

### Armory Open Core

#### Dinghy Open Core
 - fix(debug): Log fatal Redis error (#73)
 - fix(dinghyfile): Filter out makeSlice (#72)
 - fix(deps): fix the broken apache dep (#71)
 - feat(gitlab): Add Gitlab Support (#70)
 - task(tidy): Remove minio dependency (#69)

###  Spinnaker Community Contributions
https://www.spinnaker.io/community/releases/versions/1-14-15-changelog


#### Clouddriver  - 73aefff
No Changes

#### Deck  - b1f75ef
No Changes

#### Echo  - afcbb51
No Changes

#### Fiat  - 59546be
No Changes

#### Front50  - 0540599
No Changes

#### Gate  - 97f6477
No Changes

#### Igor  - b3f354f
No Changes

#### Kayenta  - dd8a91d
No Changes

#### Orca  - b4db552
No Changes

#### Rosco  - 59f7929
No Changes
