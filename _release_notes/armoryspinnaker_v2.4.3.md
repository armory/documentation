---
layout: post
title: v2.4.3 Armory Release (OSS Release 1.13.9)
order: -20420190613232138
hidden: false
---

# 06/13/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
Igor and Clouddriver do not properly import `armory-commons` in this release. As a result, these services will fail to start when `Vault Secrets` are enabled.

Please upgrade to `Armory Spinnaker 2.4.4`

## Highlighted Updates
### Armory

* Fix for SAML timeout issue

###  Spinnaker Community Contributions

* [Spinnaker's 1.13.9 Release Notes](https://www.spinnaker.io/community/releases/versions/1-13-9-changelog#individual-service-changes)


<br><br><br>
## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.4.3-rc120
timestamp: "2019-06-13 21:17:41"
services:
  clouddriver:
    version: 4.4.6-409682d-0724ff9-rc28
  deck:
    version: 2.8.6-9c13904-6a9b0a2-rc10
  dinghy:
    version: 0.0.3-4c4879c-rc22
  echo:
    version: 2.4.3-ae6694f-d69a577-rc27
  fiat:
    version: 1.4.1-641cb40-13f855f-rc28
  front50:
    version: 0.16.2-18ed588-b796e80-rc24
  gate:
    version: 1.7.2-cd74006-28beaaa-rc27
  igor:
    version: 1.2.1-faf13ca-98de62d-rc25
  kayenta:
    version: 0.7.1-39c3a6b-f95afd1-rc25
  monitoring-daemon:
    version: 0.12.1-efa6f3f-edge1
  monitoring-third-party:
    version: 0.12.1-efa6f3f-edge1
  orca:
    version: 2.6.3-5ca6c7b-92bc10d-rc27
  rosco:
    version: 0.11.0-e1fc510-95a2e29-rc26
  terraformer:
    version: 0.0.1-3023e2e-rc18
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - 4c4879c
No Changes

#### Terraformer&trade; - e745818...3023e2e
 - fix(exe): create dir structure for exe to be copied (#72)
 - feat(customProviders): add terraform custom provider download (#71)

#### Armory Clouddriver  - 409682d
No Changes

#### Armory Deck  - 9c13904
No Changes

#### Armory Echo  - ae6694f
No Changes

#### Armory Fiat  - 641cb40
No Changes

#### Armory Front50  - 18ed588
No Changes

#### Armory Gate  - 68ad717...cd74006
 - fix(saml): Fix of the workaround to override SAML max age. Broken from changes in Gate 1.13.x (#66)

#### Armory Igor  - faf13ca
No Changes

#### Armory Kayenta  - 39c3a6b
No Changes

#### Armory Orca  - 5ca6c7b
No Changes

#### Armory Rosco  - e1fc510
No Changes



###  Spinnaker Community Contributions

#### Clouddriver  - 0724ff9
No Changes

#### Deck  - 6a9b0a2
No Changes

#### Echo  - d69a577
No Changes

#### Fiat  - 13f855f
No Changes

#### Front50  - b796e80
No Changes

#### Gate  - 28beaaa
No Changes

#### Igor  - 98de62d
No Changes

#### Kayenta  - f95afd1
No Changes

#### Orca  - 92bc10d
No Changes

#### Rosco  - 95a2e29
No Changes
