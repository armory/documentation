---
layout: post
title: v2.4.4 Armory Release (OSS Release 1.13.9)
order: -20190618202512
hidden: false
---

# 06/18/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
Jenkins triggers are not working properly in this release due to a broken dependency.

Please update to `Armory Spinnaker 2.4.5`

## Highlighted Updates
### Armory
This release addresses an issue with `Vault Secrets` for the Igor and Clouddriver services.

###  Spinnaker Community Contributions
* [Spinnaker's 1.13.9 Release Notes](https://www.spinnaker.io/community/releases/versions/1-13-9-changelog#individual-service-changes)


<br><br><br>
## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.4.4-rc126
timestamp: "2019-06-18 17:20:56"
services:
  clouddriver:
    version: 4.4.6-87cabfc-0724ff9-rc30
  deck:
    version: 2.8.6-9c13904-6a9b0a2-rc10
  dinghy:
    version: 0.0.3-4c4879c-rc22
  echo:
    version: 2.4.3-ae6694f-d69a577-rc28
  fiat:
    version: 1.4.1-641cb40-13f855f-rc29
  front50:
    version: 0.16.2-18ed588-b796e80-rc25
  gate:
    version: 1.7.2-cd74006-28beaaa-rc28
  igor:
    version: 1.2.1-8963aab-98de62d-rc29
  kayenta:
    version: 0.7.1-39c3a6b-f95afd1-rc26
  monitoring-daemon:
    version: 0.12.1-efa6f3f-edge1
  monitoring-third-party:
    version: 0.12.1-efa6f3f-edge1
  orca:
    version: 2.6.3-5ca6c7b-3072865-rc29
  rosco:
    version: 0.11.0-e1fc510-95a2e29-rc27
  terraformer:
    version: 0.0.1-ab4618d-rc19
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

#### Terraformer&trade; - 3023e2e...ab4618d
 - fix(output): terraform command output should be in a hash to catch problems with each individual command and for machine processing (#73)

#### Armory Clouddriver  - 409682d...87cabfc
 - fix(secrets): Fix @ComponentScan (#38)

#### Armory Deck  - 9c13904
No Changes

#### Armory Echo  - ae6694f
No Changes

#### Armory Fiat  - 641cb40
No Changes

#### Armory Front50  - 18ed588
No Changes

#### Armory Gate  - cd74006
No Changes

#### Armory Igor  - faf13ca...8963aab
 - fix(secrets): Add armory-commons dependencies (#26)

#### Armory Kayenta  - 39c3a6b
No Changes

#### Armory Orca  - 5ca6c7b
No Changes

#### Armory Rosco  - e1fc510
No Changes



###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release:  
[Spinnaker's v1.13.9](https://www.spinnaker.io/community/releases/versions/1-13-9-changelog#individual-service-changes)

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

#### Orca  - 92bc10d...3072865
 - perf(artifacts): use pageSize=1 when resolving prior artifacts (#2955) (#2990)

#### Rosco  - 95a2e29
No Changes
