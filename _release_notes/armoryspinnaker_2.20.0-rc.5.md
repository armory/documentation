---
layout: post
title: v2.20.0 Armory Release (OSS Spinnaker v1.20.5)
order: -2201592574068
hidden: false
---

# 2020/06/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
There are currently no known issues with this release.

## Highlighted Updates

### Armory

Summary of changes in the latest release.

###  Spinnaker Community Contributions

There have also been numerous enhancements, fixes and features across all of Spinnaker's other services. See their changes here:  
[Spinnaker v1.20.5](https://www.spinnaker.io/community/releases/versions/1-20-5-changelog)

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.20.0-rc.5
timestamp: "2020-06-19 06:26:18"
services:
    clouddriver:
        commit: 6d1cfe10
        version: 2.20.1
    deck:
        commit: 121fba95
        version: 2.20.3
    dinghy:
        commit: bb5b15e2
        version: 2.20.1
    echo:
        commit: 74ed4f27
        version: 2.20.1
    fiat:
        commit: f7c1d974
        version: 2.20.2
    front50:
        commit: 97ae40e8
        version: 2.20.2
    gate:
        commit: 69ba2895
        version: 2.20.2
    igor:
        commit: d7f3747a
        version: 2.20.2
    kayenta:
        commit: 4b9f2d68
        version: 2.20.2
    monitoring-daemon:
        version: 2.20.0-rc.5
    monitoring-third-party:
        version: 2.20.0-rc.5
    orca:
        commit: 3d2cf0a1
        version: 2.20.1
    rosco:
        commit: 59a9a00b
        version: 2.20.2
    terraformer:
        commit: e042ac6a
        version: 2.20.1
dependencies:
    redis:
        version: 2:2.8.4-2
artifactSources:
    dockerRegistry: docker.io/armory
</code>
</pre>
</details>

### Armory


#### Armory Front50 - 2.19.12...2.20.2

  - armory commons updates (#38)
  - fix(mergify): fix rules (#49)
  - fix(plugins): add plugins dir (#52)
  - chore(cve): fix CVE-2019-17495 CVE (#83)
  - chore(build): update build w/ aquasec scan (#85)
  - fix(opa): fix conflicting beans (#90)
  - chore(actions): update github workflow (#96)
  - fix(security): resolve CVE-2020-1695 relating to resteasy-jaxrs (#99)
  - chore(deps): update dependencies (#106)

#### Armory Gate - 2.19.11...2.20.2

  - chore(commons): Armory commons bump (#92)
  - Java 11 and gradle plugin update (#91)
  - fix(mergify): fix rules (#103)
  - fix(plugins): add plugins dir (#106)
  - chore(cve): CVE fixes (#108)
  - chore(build): update build add aquasec scan (#110)
  - fix(cve): exclude converter-simplexml lib due to CVE-2017-1000190. (#114)
  - chore(deps): update dependencies (#125)

#### Armory Kayenta - 2.19.13...2.20.2

  - fix(mergify): fix rules (#59)
  - fix(mergify): fix rules (#60)
  - fix(plugins): add plugins dir (#64)
  - chore(cve): fix CVE-2019-17495 CVE (#67)
  - fix(dependencies): Exclude the dependencies that I manaully determined that Kayenta defines itself from the armory-commons bom platform so that Kayenta has the version or orca and kork that it expects (#66)
  - fix(dependencies): tweak deps so that the right orca and kork are used and port oss integration tests so that dep issues pop up in CI (#70)
  - chore(build): update to use aquasec scan (#72)
  - chore(build): update github workflow (#78)
  - chore(release): master -> 2.20.x (#87)

#### Armory Orca - 2.19.14...2.20.1

  - feat(terraformer): add save toggle config (#72)
  - chore(config): update default redis endpoint (#78)
  - chore(mergify): automatically merge backports from @mergifyio (#80)
  - fix(orca.yaml): copied from 1.19.x (#84)
  - fix(terraformer): just pass through the var instead of setting it (#86)
  - fix(mergify): fix rules (#89)
  - fix(plugins): add plugins dir (#94)
  - feat(terraformer): pass selected profile to backend (#93)
  - chore(aquasec): update build to scan using aquasec (#100)
  - feat(terraformer): send spinnaker user on createJob request (#102)
  - chore(version): Generate build-info properties file (#104) (#109)

#### Armory Deck - 2.19.12...2.20.3

  - fix(mptv2): restore feature flag (#586)
  - fix(mergify): fix rules (#589)
  - feat(ui-help): add docs widget to deck (#593)
  - feat(plugins): copy plugins manifest to right location for serving (#592)
  - Revert "feat(ui-help): add docs widget to deck (#593)" (#594)
  - chore(build): update build add aquasec scan (#595)
  - fix(terraform): fix stage version selector (#599)
  - chore(build): remove Xray scan (#601)
  - chore(release): update to oss 1.19.11 (#605)
  - fix(canary): use hotfixed v0.0.89 deck-kayenta from artifactory until OSS release is created and backported. (#608)
  - chore(release): update to oss 1.20.5 (#612) (#613)
  - chore(release): update to oss 1.20.5-rc2 (#614) (#615)
  - fix(commons): rollback version of commons (#616) (#617)

#### Armory Echo - 2.19.14...2.20.1

  - chore(commons): Bump armory commons (#126)
  - fix(build): Restrict Hibernate validator to 6.1.x (#130)
  - feature(mergify): First stab at a mergify build (#132)
  - chore(readme): add \n to match formatting (#133)
  - updated rule to allow mergify prs to be auto approved on fixes backported (#135)
  - fix merge conflicts from release
  - fix(echo.yaml): copied from 1.19.x (#143)
  - feat(dinghy): Support for webhook secrets in dinghy (#138)
  - fix(mergify): fix rules (#147)
  - fix(plugins): add plugins dir (#151)
  - feat(aquasec): Trying aquasec scanner (#153)
  - chore(actions): update github workflow (#160)
  - chore(release): master -> 2.20.x (#166)

#### Armory Rosco - 2.19.13...2.20.2

  - fix(mergify): fix rules (#41)
  - feat(docker): include changes from 1.18.x->1.19.x (bp #45) (#46)
  - fix(plugins): add plugins dir (#47)
  - chore(build): update to aquasec scan (#50)
  - chore(cve): fix CVE-2019-17495 CVE (#49)
  - chore(cve): fix for CVE-2017-18640 (#55)
  - chore(build): update github workflow (#60)
  - chore(release): upgrade deps (#66)

#### Terraformer™ - 1.0.13...2.20.1

  - refactor(terraform): split terraform code into pkg (#143)
  - chore(docker): setup docker image build to debug terraformer via dlv (#144)
  - refactor(version): refactor executable path (#146)
  - feat(profiles): add static credential support (#145)
  - refactor(command): support command outputs (#147)
  - refactor(terraform): reduce code duplication (#148)
  - feat(terraform): output planfile as json (#149)
  - feat(artifacts): support b64 artifacts as var file (#150)
  - feat(aws): support aws keypair as cred type (#151)
  - feat(profiles): support assume role for aws (#152)
  - fix(apply): don't assume planfile (#153)
  - chore(build): update to use aquasec scan (#154)
  - revert(show): revert changes to plan command (#158)
  - fix(builder): actually inject environment (#159)
  - chore(dockerfile): add kubectl and aws-iam-authenticator to image (#160)
  - build(security): apk del gnupg after installing tf versions; fixes cv… (#161)
  - fix(docker): remove pip3 from image for cve (#163)
  - fix(persistence): write plan file before marking complete (#165)
  - chore(actions): update github workflow (#167)
  - chore(deps): update go-yaml-tools to latest (#169)
  - feat(profiles): add authorization to named profiles (#173)
  - fix(profiles): refactor authz a bit (#174)
  - fix(tests): fix slice equality check for named profiles (#175)
  - feat(profiles): add more error logging for profiles authz (#176)
  - fix(profile_api): return empty slice if no profiles (#177)
  - chore(apis): use common response writers (#179)
  - feat(profile): add default Fiat baseUrl (#178)
  - feat(main): refactor main (#180)
  - refactor(profile): decouple profile from config (#181)
  - fix(profiles): dont evaluate permissions on a nil Profile (#183) (#184)

#### Dinghy™ - 2.19.13...2.20.1

  - chore(build): update Dinghy (#201)
  - feat(vendor): upgrade base dinghy, but don't upgrade go-gitlab (#204)
  - fix(mergify): fix rules (#207)
  - fix(dinghy) fix conditionals and rawdata (#210)
  - fix(security): Fix for CVE-2019-18276 (#211)
  - chore(build): update build w/ aquasec scan (#212)
  - feat(validation): refIds and stagerefIds fields for stages are validated (#218)
  - Added support for local_module, validation for requisitestageref and fixed a bug regarding app creation throwing an error message (#221)
  - Added git commit status and bug fix for app creation (#223)
  - chore(deps): update dinghy to latest (#225)
  - feat(slacknotifications): Send slack applications notifications (#228) (#230)

#### Armory Fiat - 2.19.13...2.20.2

  - chore(commons): Armory commons bump (#36)
  - fix(mergify): fix rules (#42)
  - fix(plugins): add plugins dir (#46)
  - chore(cve): fix CVE-2019-17495 CVE (#48)
  - chore(build): update build add aquasec scan (#50)
  - chore(build): add missing task dockerPush (#54)
  - chore(actions): update github workflow (#58)
  - chore(release): master -> 2.20.x (#68)

#### Armory Clouddriver - 2.19.20...2.20.1

  - Java 11 and gradle plugin update (#74)
  - fix(jvm): Switched to java 11 (#77)
  - fix(bumps): Spinnaker bump version (#88)
  - fix(clouddriver.yaml): copied from 1.19.x (#94)
  - fix(mergify): fix rules (#98)
  - fix(plugins): add plugins dir (#103)
  - chore(cve): Upgrade to AWS 1.18.13 - resolves CVE-2020-1747 (#105)
  - chore(cve): Fully remove anthoscli, CVE-2019-18658 (#107)
  - chore(cve): workaround for CVE-2019-17495 (#109)
  - chore(build): update build add aquasec scan (#116)
  - chore(build): add missing task dockerPush (#118)
  - fix(opa): fix opa bean conflict (#125)
  - fix(opa): fix NPE when no upstream validator found (#127)
  - feat(container): add docker hub publish on successful scan (#132)
  - chore(vulnerabilities): resolve CVEs and other security issues (#129)
  - chore(release): master -> 2.20.x (#142)

#### Armory Igor - 2.19.12...2.20.2

  - chore(dockerfile): changes from 1.18.x -> 1.19.x (#48)
  - fix(mergify): fix rules (#54)
  - fix(cve): CVE-2020-11612 (#55)
  - fix(plugins): add plugins dir (#58)
  - chore(build): update to use aquasec scan (#60)
  - chore(build): update github workflow (#67)
  - chore(release): master -> 2.20.x (#74)

