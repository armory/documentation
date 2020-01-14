---
layout: post
title: v2.17.3 Armory Release (OSS Release 1.17.6)
order: -21720200114222529
hidden: false
---

# 01/14/20 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
There are currently no known issues with this release.

## Highlighted Updates
### Armory
This release includes the following:

- A fix for x509 proxy filter on api port security stack
- Migration of most services from using `open-jdk8` as their base image to `alpine:3.11`
- UI work for Terraformer stage, including a modal to display logs from a terraform job

###  Spinnaker Community Contributions

This release also includes a number of fixes submitted to OSS Spinnaker; additional details can be found below. 

<br>

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.17.3-rc3212
timestamp: "2020-01-14 21:14:29"
services:
  clouddriver:
    version: 6.4.4-37fca53-5f272cd-rc1065
  deck:
    version: 2.13.4-f6026b5-75cecc4-rc247
  dinghy:
    version: 0.0.4-defad9b-rc1601
  echo:
    version: 2.9.1-c413c8a-771a15b-rc589
  fiat:
    version: 1.8.3-940de73-c62d038-rc1065
  front50:
    version: 0.20.1-ce3824b-9415a44-rc1062
  gate:
    version: 1.13.0-a14ec61-a453541-rc1795
  igor:
    version: 1.7.0-182a383-37fe1ed-rc908
  kayenta:
    version: 0.12.0-d49aed7-5dcec80-rc819
  monitoring-daemon:
    version: 0.16.0-59cbbec-rc543
  monitoring-third-party:
    version: 0.16.0-59cbbec-rc543
  orca:
    version: 2.11.2-a6e8420-b88f62a-rc949
  rosco:
    version: 0.15.1-5ac82a7-269dc83-rc901
  terraformer:
    version: 0.0.2-7b64a33-rc12
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - defad9b
No Changes

#### Terraformer&trade; - 9c5c667...7b64a33
 - fix(gitrepo): users can enter 'master' to fetch master branch (#105)
 - chore(terraform): add newer tf versions (#104)
 - fix(api): add payload Targets to CommandBuilder (#103)
 - feat(metrics): add metrics to api for request recording (#102)

#### Armory Clouddriver  - daa86fe...37fca53
 - chore(releases): use alpine containers instead of open-jdk (#48)

#### Armory Deck  - 0ca8441...f6026b5
 - feat(terraform): refresh button on job logs modal (#559)
 - feat(terraform): make artifact rendering backward compatible ... (#555)
 - feat(targets): add targets input (#554)
 - fix(apache): configure apache to log to stdout/stderr (#550)
 - feat(terraform): job logs modal (#549)

#### Armory Echo  - 4f2b8ee...c413c8a
 - No relevant changes 

#### Armory Fiat  - 9f554ae...940de73
 - chore(releases): use alpine containers instead of open-jdk (#30)

#### Armory Front50  - e1a3aa0...ce3824b
 - chore(releases): use alpine containers instead of open-jdk (#26)

#### Armory Gate  - 45ca2bb...a14ec61
 - chore(releases): use alpine containers instead of open-jdk (#83)
 - fix(x509/proxy): Install X509 proxy filter on api port security stack (#81)

#### Armory Igor  - bbde849...182a383
 - chore(releases): use alpine containers instead of open-jdk (#37)

#### Armory Kayenta  - 6c2fb5a...d49aed7
 - chore(releases): use alpine containers instead of open-jdk (#42)

#### Armory Orca  - dd253cf...a6e8420
 - feat(terraformer): support both artifactsRewrite and pre-ui artifacts (#55)
 - chore(releases): use alpine containers instead of open-jdk (#58)

#### Armory Rosco  - f8aa480...5ac82a7
 - chore(releases): use alpine containers instead of open-jdk (#27)



###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release:

[Spinnaker 1.17.6](https://www.spinnaker.io/community/releases/versions/1-17-6-changelog#individual-service-changes)

#### Clouddriver  - 22f8150...5f272cd
 - fix(kubernetes): Core caching agent is authoritative for artifacts (#4247) (#4248)

#### Deck  - 12edf0a...75cecc4
 - fix(core): manual cherry-pick of MapEditor fixes (#7769)
 - fix(projects): Fixing clusters error validation (#7701) (#7704)

#### Echo  - acca50a...771a15b
 - fix(github): Put back github endpoint configuration (#726) (#731)

#### Fiat  - c62d038
No Changes

#### Front50  - 9415a44
No Changes

#### Gate  - a453541
No Changes

#### Igor  - 37fe1ed
No Changes

#### Kayenta  - 5dcec80
No Changes

#### Orca  - b88f62a
No Changes

#### Rosco  - 269dc83
No Changes
