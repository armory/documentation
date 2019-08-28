---
layout: post
title: v2.5.8 Armory Release (OSS Release 1.14.14)
order: -20520190828225525
hidden: false
---

# 08/28/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
There are currently no known issues with this release.

## Highlighted Updates
### Armory


###  Spinnaker Community Contributions
[Spinnaker 1.14.14 Release Notes](https://www.spinnaker.io/community/releases/versions/1-14-14-changelog)

<br>
## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.5.8-rc1603
timestamp: "2019-08-28 16:06:20"
services:
  clouddriver:
    version: 4.7.3-88e5012-73aefff-rc142
  deck:
    version: 2.0.0-2dfbb1c-b1f75ef-rc17
  dinghy:
    version: 0.0.4-cd9d1cc-rc1377
  echo:
    version: 2.5.2-7f44a96-afcbb51-rc128
  fiat:
    version: 1.5.3-b557350-59546be-rc121
  front50:
    version: 0.17.0-bf00a4f-0540599-rc13
  gate:
    version: 1.8.4-af59d7c-97f6477-rc121
  igor:
    version: 1.3.0-c3c7850-b3f354f-rc118
  kayenta:
    version: 0.9.1-39c3a6b-dd8a91d-rc13
  monitoring-daemon:
    version: 0.13.0-bf01bf2-rc5
  monitoring-third-party:
    version: 0.13.0-bf01bf2-rc5
  orca:
    version: 2.7.7-62b8988-b4db552-rc130
  rosco:
    version: 0.12.0-e1fc510-59f7929-rc11
  terraformer:
    version: 0.0.2-c0605a2-rc29
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - 9ccc528...cd9d1cc
 - fix(tests): update tests after refactor work (#185)
 - fix(yaml): Change how we sub modules in preprocess (#184)

#### Terraformer&trade; - 8361728...c0605a2
 - chore(readme): remove warning message (#87)
 - chore(yaml): update go-yaml-tools (#89)
 - feat(build): Add git, aws (#88)
 - feat(terraformer): Add 0.12.5 and 0.12.6 to terraform (#86)

#### Armory Clouddriver  - 88e5012
No Changes

#### Armory Deck  - fec48f6...2dfbb1c
 - chore(kayenta): Bump version (#519) (#520)

#### Armory Echo  - 7f44a96
No Changes

#### Armory Fiat  - b557350
No Changes

#### Armory Front50  - bf00a4f
No Changes

#### Armory Gate  - 83b6e52...af59d7c
 - fix(oauth2): Optional roles attribute (#70)
 - fix(oauth2): Populate roles in OAuth2 OIDC (#69)

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
 - fix(security): Redact logging of secrets on start (#68)
 - fix(module): Template repo always uses master (#67)
 - fix(network): catch only 404. if there's some other kind of error, don't continue (#66)
 - fix(configurablebranches): fix branch name comparison (#65)
 - chore(config): refactor config handling (#51)
 - fix(parse): If templateOrg not configured, error. (#64)
 - fix(errs): bubble up module errors to caller (#63)
 - fix(errs): err -> debug for benign cache lookup issues (#62)
 - feat(pushData): surface push into dinghy template (#61)
 - feat(conditionals): test conditionals and range (#60)
 - chore(yaml): Update go-yaml-tools (secrets fix) (#59)
 - feat(configurablebranch): remove the need for the full branch path (#57)

###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release:  
[Spinnaker's v1.14.14](https://www.spinnaker.io/community/releases/versions/1-14-14-changelog#individual-service-changes)  

#### Clouddriver  - 9e336dd...73aefff
 - fix(artifacts): Make HttpCredentials fetchUrl throws exception on non-successful response (#3946) (#3952)
 - fix(provider/k8s): return operation result data (#3931) (#3933)
 - fix(ecs): Additional null checks around cached EC2 instance data (#3901) (#3909)
 - perf(redis): Replace String.format with String.join (#3836) (#3915)

#### Deck  - b1f75ef
No Changes

#### Echo  - afcbb51
No Changes

#### Fiat  - ff44172...59546be
 - fix(logs): add logback-encoder to classpath (#441) (#448)

#### Front50  - 0540599
No Changes

#### Gate  - 97f6477
No Changes

#### Igor  - b3f354f
No Changes

#### Kayenta  - dd8a91d
No Changes

#### Orca  - 3888a93...b4db552
 - fix(runJob): inject manifest fcr for k8s runjob (#3090) (#3094) (#3096)

#### Rosco  - 59f7929
No Changes
