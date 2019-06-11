---
layout: post
title: v2.4.2 Armory Release (OSS Release 1.13.9)
order: -20190611215013
hidden: false
---

# 06/11/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
There are currently no known issues with this release.

## Highlighted Updates
### Armory

**Terraformer**

* You can now select your Terraform version
* Added support for Terraform Workspaces

###  Spinnaker Community Contributions

* [Spinnaker's 1.13.9 Release Notes](https://www.spinnaker.io/community/releases/versions/1-13-9-changelog#individual-service-changes)


<br><br><br>
## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.4.2-rc116
timestamp: "2019-06-11 21:09:14"
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
    version: 1.7.2-68ad717-28beaaa-rc25
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
    version: 0.0.1-e745818-rc16
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - e37d9a2...4c4879c
 - chore(build): pull in latest OC dinghy (#170)

#### Terraformer&trade; - cc82d20...e745818
 - feat(planfiles): persist plan output for later use in stage (#70)
 - chore(log): spit out what we're doing in logs (#69)
 - feat(locking): allow disable of backend lock with flag (#68)
 - feat(workspaces): select workspace for stage (#67)
 - chore(make): auto-incr git tags for releases (#66)
 - fix(error): we should return an error if the terraform version is missing (#65)
 - feat(redis): add redis monitor, proper logging passthrough (#63)
 - feat(version): select terraform version at runtime (#64)

#### Armory Clouddriver  - ccad514...409682d
 - chore(build): add armory-commons (#32)

#### Armory Deck  - 9c13904
No Changes

#### Armory Echo  - ae6694f
No Changes

#### Armory Fiat  - 641cb40
No Changes

#### Armory Front50  - 18ed588
No Changes

#### Armory Gate  - 68ad717
No Changes

#### Armory Igor  - faf13ca
No Changes

#### Armory Kayenta  - 39c3a6b
No Changes

#### Armory Orca  - 3ae75fe...5ca6c7b
 - feat(workspace): support terraform workspace selection (#40) (#42)
 - feat(version): support dynamic terraform version for run (#37) (#38)

#### Armory Rosco  - e1fc510
No Changes



###  Spinnaker Community Contributions

See Spinnaker's release notes that are included in this release:  
[Spinnaker's v1.13.9](https://www.spinnaker.io/community/releases/versions/1-13-9-changelog#individual-service-changes)

#### Clouddriver  - a7ce3a5...0724ff9
 - perf(kubernetes): Reduce memory allocation during caching cycles (#3736) (#3746)

#### Deck  - 6a9b0a2
No Changes

#### Echo  - 9ea33eb...d69a577
 - fix(webhooks): bitbucket server or cloud determination (#572) (#574)

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
