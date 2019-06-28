---
layout: post
title: v2.4.5 Armory Release (OSS Release 1.13.10)
order: -20190628181854
hidden: false
---

# 06/28/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
There are currently no known issues with this release.


## Highlighted Updates
### Armory
This release address an issue with Igor and Jenkins triggers.

###  Spinnaker Community Contributions
* [Spinnaker's 1.13.10 Release Notes](https://www.spinnaker.io/community/releases/versions/1-13-10-changelog#individual-service-changes)

<br>

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.4.5-rc161
timestamp: "2019-06-28 17:09:00"
services:
  clouddriver:
    version: 4.4.7-87cabfc-0724ff9-rc36
  deck:
    version: 2.8.8-1dada86-f50e952-rc14
  dinghy:
    version: 0.0.3-bc32b99-rc37
  echo:
    version: 2.4.4-ae6694f-12ad11e-rc34
  fiat:
    version: 1.4.1-641cb40-13f855f-rc35
  front50:
    version: 0.16.2-18ed588-b796e80-rc31
  gate:
    version: 1.7.2-cd74006-28beaaa-rc34
  igor:
    version: 1.2.1-aa6fa6f-a7e5a73-rc38
  kayenta:
    version: 0.7.1-39c3a6b-f95afd1-rc32
  monitoring-daemon:
    version: 0.12.1-efa6f3f-edge1
  monitoring-third-party:
    version: 0.12.1-efa6f3f-edge1
  orca:
    version: 2.6.4-58aef8e-3072865-rc37
  rosco:
    version: 0.11.0-e1fc510-95a2e29-rc33
  terraformer:
    version: 0.0.1-b8b4ef5-rc21
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - 4c4879c...bc32b99
 - chore(release): handle new main func in open source (#172)

#### Terraformer&trade; - ab4618d...b8b4ef5
 - feat(targets): allow specifying specific targets during apply stage (#74)

#### Armory Clouddriver  - 87cabfc
No Changes

#### Armory Deck  - 9c13904...1dada86
 - refact(app): cleanup app.ts according to 1.14.x (#508)
 - chore(docker): bump alpine version for security (#504)

#### Armory Echo  - ae6694f
No Changes

#### Armory Fiat  - 641cb40
No Changes

#### Armory Front50  - 18ed588
No Changes

#### Armory Gate  - cd74006
No Changes

#### Armory Igor  - 8963aab...aa6fa6f
 - fix(jenkins): use managed igor and add map to GenericBuild (#28)

#### Armory Kayenta  - 39c3a6b
No Changes

#### Armory Orca  - 5ca6c7b...58aef8e
 - chore(update): cherry-pick restructure terraformer log output (#45) (#46)

#### Armory Rosco  - e1fc510
No Changes



###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release:  
[Spinnaker's v1.13.10](https://www.spinnaker.io/community/releases/versions/1-13-10-changelog#individual-service-changes)

#### Clouddriver  - 0724ff9
No Changes

#### Deck  - 6a9b0a2...f50e952
 - fix(provider/openstack): Properly set the attributes of a strtegy pipeline (#7137)
 - fix(kubernetes): fix req. artifacts to bind selector in patch manifest stage (#7095) (#7097)

#### Echo  - d69a577...12ad11e
 - fix(pipeline): if map -> Pipeline fails, log and move on (#510) (#584)

#### Fiat  - 13f855f
No Changes

#### Front50  - b796e80
No Changes

#### Gate  - 28beaaa
No Changes

#### Igor  - 98de62d...a7e5a73
 - fix(artifactory): Avoid AQL 500 when context root is non-empty (#424) (#469)

#### Kayenta  - f95afd1
No Changes

#### Orca  - 3072865
No Changes

#### Rosco  - 95a2e29
No Changes
