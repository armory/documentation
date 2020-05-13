---
layout: post
title: v2.17.7 Armory Release (OSS Release 1.17.8)
order: -21720200330201939
hidden: false
---

# 03/30/20 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues

* **Policy Engine**
  
    If your OPA policies contain any top level declarations other than `deny`, the Policy Engine prevents pipelines from being saved.

    **Workaround** 
    
    Only use `deny` declarations at the top level. Other declarations can still be used at lower levels of the policy. 

## Highlighted Updates
### Armory
This release includes the following:
  - Improved error handling in Pipelines as Code and its microservice, Dinghy.
  - The Terraform integration now uses Clouddriver's built-in support for `git/repo` artifact types. Previously, you had to create a custom artifact that was a `git/repo` type.
  - Addresses a number of CVE's related to `springframework`, `tomcat`, and `jackson-databind` found in Spinnaker Java services



###  Spinnaker Community Contributions

No changes to report. 

<br>

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.17.7-rc6376
timestamp: "2020-03-30 19:11:05"
services:
  clouddriver:
    version: 6.4.6-f8375f1-0f2d1d7-rc1086
  deck:
    version: 2.13.6-1461fcb-ad367c6-rc259
  dinghy:
    version: 0.0.4-16cebe7-rc3306
  echo:
    version: 2.9.1-3b4a8e6-771a15b-rc602
  fiat:
    version: 1.8.3-d2250ba-c62d038-rc1077
  front50:
    version: 0.20.1-0072b4d-9415a44-rc1076
  gate:
    version: 1.13.0-6dc03a7-a453541-rc3289
  igor:
    version: 1.7.0-0bfa2f6-0d9b3f6-rc920
  kayenta:
    version: 0.12.0-4597166-5dcec80-rc826
  monitoring-daemon:
    version: 0.16.0-cbc7624-rc2
  monitoring-third-party:
    version: 0.16.0-cbc7624-rc2
  orca:
    version: 2.11.2-7f0d6fa-a8b1679-rc961
  rosco:
    version: 0.15.1-4007f64-269dc83-rc913
  terraformer:
    version: 0.0.2-4ed31a9-rc38
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - bb15163...16cebe7
 - fix(notif): surface policy engine errors in notifications (#194)

#### Terraformer&trade; - b6cdbbf...4ed31a9
 - fix(vulns): fix vulnerabilities by upgrading go (#129)
 - chore(artifacts): refactor plugin handling logic (#127)
 - chore(artifacts): fix git/repo handling & refactor (#126)
 - fix(command): fix building target options (#125)
 - fix(artifacts): improve error messaging (#124)
 - feat(artifacts): defer git/repo to clouddriver (#123)
 - feat(terraform): add additional context arround terraform executable errors (#122)
 - chore(dependencies): updated and vendored go-yaml-tools (#119)
 - feat(terraform): add versions 0.12.19 and 0.12.20 (#115)

#### Armory Clouddriver  - cad19c3...f8375f1
 - fix(security): remove cves in databind, spring-framework, tomcat (#80)
 - fix(docker): Bump to Python3 for AWS CLI and Google SDK (#69) (#70)

#### Armory Deck  - d5d7828...1461fcb
 - feat(terraformer): display plan detailed result (#568)

#### Armory Echo  - 787cde5...3b4a8e6
 - fix(security): remove cves in databind, spring-framework, tomcat (#128)

#### Armory Fiat  - cb77e1e...d2250ba
 - fix(security): remove cves in databind, spring-framework, tomcat (#38)

#### Armory Front50  - 9c0b294...0072b4d
 - fix(security): remove cves in databind, spring-framework, tomcat (#40)
 - chore(opa): refactor opa to be more idiomatic (#30)

#### Armory Gate  - 250616f...6dc03a7
 - fix(security): remove cves in databind, spring-framework, tomcat (#94)

#### Armory Igor  - 54d7797...0bfa2f6
 - fix(security): remove cves in databind, spring-framework, tomcat (#44)

#### Armory Kayenta  - 0085ac5...4597166
 - fix(security): remove cves in databind, spring-framework, tomcat (#48)

#### Armory Orca  - 25ef38f...7f0d6fa
 - fix(security): remove cves in databind, spring-framework, tomcat (#71)

#### Armory Rosco  - 33810a8...4007f64
 - fix(security): remove cves in databind, spring-framework, tomcat (#33)


### Armory Open Core
#### Dinghy (Open Core) - 60cb2f5...3b0247e
 - fix(templates): templateOrg can be different from target repo (#81)
 - fix(github): Change ref of github to master from refs/heads/master (#79)
 - fix(notif): surface policy engine errors in notifications (#78)


###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release:

[Spinnaker 1.17.8](https://www.spinnaker.io/community/releases/versions/1-17-8-changelog#individual-service-changes)

#### Clouddriver  - 0f2d1d7
- fix(core): Only log relevant details of description (#4456) (#4459)
- fix(sql): Cherry pick jooq changes  (#4435)
- fix(provider/cf): Don't call to spaces on every call to /credentials (#4441) (#4)
- fix(repository): Enforce serialization order for JedisTask (#4394) (#4398)
- fix(cf): More parallel processing in the caching agent (#4352)
- fix(cf): Improved caching agent robustness (#4351)
- fix(cf): remove the empty cache results for SG (#4310)
- fix(cf): Parallelize apps/lbs cache building (#4305)
- fix(cf): allow results per page to be configurable (#4289)
- fix(cf): reduce results per page requests to lower timeout frequency (#4271)
- fix(cf): Improve API client error message reporting
- fix(cf): remove cf secondary cache expiry to prevent expensive api calls (#4244)
- feat(cf): separate lb and sg into separate caching agents (#4154)
- refactor(cf): removed unused code, fix spelling and etc (#4159)
- feat(cf): increase logging for cf to better detect fails (#4156)
- feat(cf): provide more info when retrying an API (#4137)
- fix(kubernetes): return provider field with kubernetes /search results (#4249) (#4387)
- fix(cloudFoundry): fix cloudFoundry job provider (#4379) (#4381)
- fix(ecs): ECS IAM Path role fix for 1.17 (#4323)


#### Deck  - 75cecc4...ad367c6
 - fix(artifacts): only remove deleted expected artifacts from stages on trigger update (#8071) (#8077)
 - chore(container builds): exclude large cache directories from GCB upload (#7919) (#8006)
 - chore(buildtool): add an empty .gcloudignore file (#7909) (#8003)
 - fix(kubernetes): remove accidental static from resolveIndexedSecurityGroups (#7760) (#7999)

#### Echo  - 771a15b
No Changes

#### Fiat  - c62d038
No Changes

#### Front50  - 9415a44
No Changes

#### Gate  - a453541
No Changes

#### Igor  - 37fe1ed...0d9b3f6
 - chore(container builds): exclude large cache directories from GCB upload (#633) (#656)
 - chore(buildtool): add an empty .gcloudignore file (#631) (#654)

#### Kayenta  - 5dcec80
No Changes

#### Orca  - b88f62a...a8b1679
 - fix(execution): Fix START_TIME_OR_ID comparator (#3392) (#3499)

#### Rosco  - 269dc83
No Changes
