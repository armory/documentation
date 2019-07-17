---
layout: post
title: v2.4.1 Armory Release (OSS Release 1.13.8)
order: -20190603222212
hidden: false
---

# 06/03/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
* SAML timeout cannot be overridden in this release

Please upgrade to `Armory Spinnaker 2.4.5`

## Highlighted Updates
### Armory

 Terraformer now produces usable outputs for later stages

###  Spinnaker Community Contributions

[Spinnaker's v1.13.8 Release Notes](https://www.spinnaker.io/community/releases/versions/1-13-8-changelog)  

<br>

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.4.1-rc99
timestamp: "2019-06-03 20:24:34"
services:
  clouddriver:
    version: 4.4.6-ccad514-a7ce3a5-rc27
  deck:
    version: 2.8.6-9c13904-6a9b0a2-rc10
  dinghy:
    version: 0.0.3-e37d9a2-rc17
  echo:
    version: 2.4.3-ae6694f-9ea33eb-rc26
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
    version: 2.6.3-3ae75fe-92bc10d-rc25
  rosco:
    version: 0.11.0-e1fc510-95a2e29-rc26
  terraformer:
    version: 0.0.1-cc82d20-rc8
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - 91ae72b...e37d9a2
 - chore(release): Prepare to handle pinned deps. (#169)

#### Terraformer&trade; - 5f338d8...cc82d20
 - feat(outputs): send outputs with jobStatus api call (#61)
 - feat(vars): add var handler which returns structured json, if any, in a job output (#60)
 - feat(spel): add output command to spel (#56)

#### Armory Clouddriver  - ccad514
No Changes

#### Armory Deck  - c7e8629...9c13904
 - refact(app): cleanup app.ts according to 1.14.x (#508)

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

#### Armory Orca  - f1b82e2...3ae75fe
 - feat(terraformer): outputs is undefined json (#35)

#### Armory Rosco  - e1fc510
No Changes



###  Spinnaker Community Contributions
<!-- UNCOMMENT ME:
See Spinnaker's release notes that are included in this release:  
[Spinnaker's v1.8.0](https://www.spinnaker.io/community/releases/versions/1-8-0-changelog#individual-service-changes)  
[Spinnaker's v1.8.1](https://www.spinnaker.io/community/releases/versions/1-8-1-changelog#individual-service-changes)  

<!-- UNCOMMENT ME: Changes listed below is are extra changes that have not yet made it to another Spinnaer release version: -->
<!-- You may need to pick out some extra contributions from OSS -->

#### Clouddriver  - a7ce3a5
No Changes

#### Deck  - f9cc5a5...6a9b0a2
 - fix(artifacts): HTTP default artifact needs reference field (#6836) (#7026)
 - fix(core): request project pipeline configs just in time (#6980) (#7005)

#### Echo  - 28bde7a...9ea33eb
 - fix(webhooks): handle NPE when source invalid (#552) (#554)

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
