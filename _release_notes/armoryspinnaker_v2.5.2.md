---
layout: post
title: v2.5.2 Armory Release (OSS Release 1.14.6)
order: -20520190618212248
hidden: false
---

# 06/18/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
There are currently no known issues with this release.

## Highlighted Updates
### Armory

* This release addresses an issue with `Vault Secrets` for the Igor and Clouddriver services.
* Fix for SAML timeout issue

###  Spinnaker Community Contributions
[Spinnaker 1.14.6 Release Notes](https://www.spinnaker.io/community/releases/versions/1-14-6-changelog)

<br><br><br>
## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.5.2-rc198
timestamp: "2019-06-18 19:05:34"
services:
  clouddriver:
    version: 4.6.1-651caee-8607d42-rc117
  deck:
    version: 2.0.0-6fedca0-b1f75ef-rc13
  dinghy:
    version: 0.0.3-4c4879c-rc7
  echo:
    version: 2.5.0-445f4ca-e68a464-rc115
  fiat:
    version: 1.5.0-7c1b280-381db2c-rc104
  front50:
    version: 0.17.0-18ed588-0540599-edge5
  gate:
    version: 1.8.2-83b6e52-935a334-rc106
  igor:
    version: 1.3.0-c3c7850-b3f354f-rc106
  kayenta:
    version: 0.8.1-39c3a6b-cf89374-edge5
  monitoring-daemon:
    version: 0.13.0-bf01bf2-rc1
  monitoring-third-party:
    version: 0.13.0-bf01bf2-rc1
  orca:
    version: 2.7.4-c73ed0e-8c46567-rc115
  rosco:
    version: 0.12.0-e1fc510-59f7929-edge5
  terraformer:
    version: 0.0.1-ab4618d-rc17
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

#### Terraformer&trade; - e745818...ab4618d
 - fix(output): terraform command output should be in a hash to catch problems with each individual command and for machine processing (#73)
 - fix(exe): create dir structure for exe to be copied (#72)
 - feat(customProviders): add terraform custom provider download (#71)

#### Armory Clouddriver  - b343903...651caee
 - fix(secrets): Proper location for @ComponentScan (#37)

#### Armory Deck  - 6fedca0
No Changes

#### Armory Echo  - 445f4ca
No Changes

#### Armory Fiat  - 7c1b280
No Changes

#### Armory Front50  - 18ed588
No Changes

#### Armory Gate  - 4106a87...83b6e52
 - fix(saml): Fix workaround for SAML max age in 1.14 (#67)

#### Armory Igor  - 15850d3...c3c7850
 - fix(secrets): Add armory-commons dependencies (#26)

#### Armory Kayenta  - 39c3a6b
No Changes

#### Armory Orca  - bdb4a78...c73ed0e
 - feat(logs): restructure terraformer log output (#45)

#### Armory Rosco  - e1fc510
No Changes



###  Spinnaker Community Contributions

See Spinnaker's release notes that are included in this release:  
* [Spinnaker 1.14.6 Release Notes](https://www.spinnaker.io/community/releases/versions/1-14-6-changelog)

#### Clouddriver  - deec487...8607d42
 - fix(ecs): If in "host" network mode, host and container port should be the same (#3776) (#3791)
 - fix(ecs): Fix incorrect de-duping of clusters with same name, but different accounts (#3782) (#3786)
 - fix(ecs): Handle container instances no longer being cached, but showing up in stopped ECS tasks in the account (#3765) (#3781)
 - fix(cf): fail destoryService stage if service not found (#3779) (#3780)

#### Deck  - b1f75ef
No Changes

#### Echo  - e68a464
No Changes

#### Fiat  - 381db2c
No Changes

#### Front50  - 0540599
No Changes

#### Gate  - ee90e98...935a334
 - fix(ldap): allow http basic credentials for LDAP auth (#826) (#827)

#### Igor  - b3f354f
No Changes

#### Kayenta  - cf89374
No Changes

#### Orca  - 026a6d1...8c46567
 - fix(jobs): fix race condition in override (#2994)
 - perf(artifacts): use pageSize=1 when resolving prior artifacts (#2955)
 - fix(core): Mark mptv2 items as inherited (#2971) (#2979)

#### Rosco  - 59f7929
No Changes
