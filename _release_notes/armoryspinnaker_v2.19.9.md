---
layout: post
title: v2.19.9 Armory Release (OSS Release 1.19.11)
order: -21920200605174937
hidden: false
---

## 06/05/20 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Breaking Changes

### Required Halyard version

Armory Spinnaker 2.19.x requires Armory Halyard 1.8.3 or later.

### HTTP sessions for Gate
Armory Spinnaker 2.19.x includes an upgrade to the Spring Boot dependency. This requires you to flush all the Gate sessions for your Spinnaker deployment. For more information, see [Flushing Gate Sessions](https://kb.armory.io/admin/flush-gate-sessions/).

### Scheduled Removal of Kubernetes V1 Provider
The Kubernetes V1 provider will be removed in Spinnaker 1.21. Please see the [RFC](https://github.com/spinnaker/governance/blob/master/rfc/eol_kubernetes_v1.md) for more details.

Breaking change: Kubernetes accounts with an unspecified providerVersion will now default to V2. Update your Halconfig to specify `providerVersion: v1` for any Kubernetes accounts you are currently using with the V1 provider.

## Known Issues

### Upgrading from 2.18.x with MySQL used for Front50 renames the plugin_artifacts table
As a part of the upgrade from 2.18.x to 2.19.x, the table **plugin_artifacts** gets renamed to `plugin_info`. Downgrades from 2.19.x to 2.18.x do not revert the table name. The table remains named `plugin_info`, preventing access to the table.  

This issue only occurs if you upgrade to 2.19.x and then downgrade.

## Highlighted Updates

### Armory

This release includes several fixes to CVEs in addition to bug fixes and general improvements. 

Armory has also made enhancements to the following feature:

### Pipelines as code

- Messages surfaced by Pipelines as code (through the Dinghy service) to GitHub now provide more information about warnings or failures in pipeline rendering.
- Pipelines as code now supports validating stage references in a pipeline. If you attempt to save a pipeline that references a stage that does not exist, you get a warning.

### Security update

This releases focuses on making Spinnaker more secure. Although several CVEs are resolved, the following still exist:

#### Clouddriver

The following three CVEs still exist in Clouddriver:

- CVE-2020-1747
- CVE-2017-18342
- CVE-2016-10745

All three are embedded dependencies in the Google Cloud SDK. A version of the Google Cloud SDK addressing these CVEs has not been released. The risk to Clouddriver users is low: all three CVEs deal with untrusted input, which Clouddriver does not provide to the Google Cloud SDK. Additionally, users deploying to other cloud providers are not at risk for this vulernability.

#### Igor

The following CVE still exists in Igor:

- CVE-2017-1000190

Igor depends on SimpleXML as a transitive dependency. The Travis and Jenkins modules use for annotations in their models. Because Igor uses the Jackson library to parse XML directly, the service is not at risk for this vulnerability.

###  Spinnaker Community Contributions

There have also been numerous enhancements, fixes and features across all of Spinnaker's other services from the open source community. See highlights and detailed changes here:  

* [Spinnaker's v1.19.11](https://www.spinnaker.io/community/releases/versions/1-19-11-changelog)  

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.19.9-rc.4
timestamp: "2020-06-04 17:31:17"
services:
  clouddriver:
    commit: 7d487dd7
    version: 2.19.20
  echo:
    commit: 32f5cf60
    version: 2.19.14
  fiat:
    commit: 1ee16925
    version: 2.19.13
  front50:
    commit: a22bdd0b
    version: 2.19.12
  gate:
    commit: af5b3644
    version: 2.19.11
  igor:
    commit: 1bbc54c0
    version: 2.19.12
  orca:
    commit: 8d204f72
    version: 2.19.14
  rosco:
    commit: ead24b65
    version: 2.19.13
  deck:
    commit: aa5f3507
    version: 2.19.12
  dinghy:
    commit: 51a44549
    version: 2.19.13
  terraformer:
    commit: bf339cab
    version: 1.0.13
  kayenta:
    commit: 19860f83
    version: 2.19.13
  monitoring-daemon:
    version: 0.16.1-7d506f0-rc1
  monitoring-third-party:
    version: 0.16.1-7d506f0-rc1
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - 2.19.5...2.19.13
 - chore(deps): update dinghy to latest (#225) (#226)
 - Added git commit status and bug fix for app creation (#223) (#224)
 - Added support for local_module, validation for requisitestageref and fixed a bug regarding app creation throwing an error message (#221) (#222)
 - feat(validation): refIds and stagerefIds fields for stages are validated (#218) (#219)
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#214)
 - fix(security): Fix for CVE-2019-18276 (#211)
 - chore(build): update build w/ aquasec scan (#212)
 - fix(dinghy) fix conditionals and rawdata (#210)

#### Terraformer&trade; - 1.0.6...1.0.13
 - chore(deps): update go-yaml-tools to latest (#169) (#170)
 - chore(actions): update github workflow (#167) (#168)
 - fix(docker): remove pip3 from image for cve (#163) (#164)
 - build(security): apk del gnupg after installing tf versions; fixes cv… (#161) (#162)
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (bp #156) (#157)
 - chore(build): update to use aquasec scan (#154) (#155)

#### Armory Clouddriver  - 2.19.8...2.19.20
 - chore(vulnerabilities): resolve CVEs and other security issues (#129) (#138)
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#136) (#137)
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#130) (#135)
 - feat(container): add docker hub publish on successful scan (#132) (#133)
 - fix(opa): fix NPE when no upstream validator found (#127) (#128)
 - fix(opa): fix opa bean conflict (#125) (#126)
 - chore(build): add missing task dockerPush (#118) (#119)
 - chore(build): update build add aquasec scan (#116) (#117)
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#111) (#115)
 - chore(cve): workaround for CVE-2019-17495 (#109) (#110)
 - chore(cve): Fully remove anthoscli, CVE-2019-18658 (#107) (#108)
 - chore(cve): Upgrade to AWS 1.18.13 - resolves CVE-2020-1747 (bp #105) (#106)

#### Armory Deck  - 2.19.7...2.19.12
 - chore(release): update to oss 1.19.11 (#605) (#606)
 - chore(build): remove Xray scan (#601) (#602)
 - fix(terraform): fix stage version selector (bp #599) (#600)
 - chore(build): update build add aquasec scan (#595) (#598)
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#597)

#### Armory Echo  - 2.19.8...2.19.14
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#162) (#163)
 - chore(actions): update github workflow (#160) (#161)
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#157) (#159)
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#155) (#156)
 - feat(aquasec): Trying aquasec scanner (#153) (#154)
 - fix(plugins): add plugins dir (bp #151) (#152)

#### Armory Fiat  - 2.19.6...2.19.13
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#61) (#63)
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#56) (#60)
 - chore(actions): update github workflow (#58) (#59)
 - chore(build): add missing task dockerPush (#54) (#55)
 - chore(build): update build add aquasec scan (#50) (#53)
 - chore(release): update oss spinnaker version (#52)
 - chore(cve): fix CVE-2019-17495 CVE (#48) (#51)

#### Armory Front50  - 2.19.6...2.19.12
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (bp #97) (#98)
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#94) (#95)
 - fix(opa): fix conflicting beans (#90) (#91)
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#87) (#88)
 - chore(cve): fix CVE-2019-17495 CVE (bp #83) (#84)
 - chore(build): update build w/ aquasec scan (#85) (#86)

#### Armory Gate  - 2.19.5...2.19.11
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#119) (#120)
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#116) (#118)
 - fix(cve): exclude converter-simplexml lib due to CVE-2017-1000190. (#114) (#115)
 - chore(build): update build add aquasec scan (#110) (#113)
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#111) (#112)
 - chore(cve): CVE fixes (#108) (#109)

#### Armory Igor  - 2.19.6...2.19.12
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#69) (#70)
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#64) (#66)
 - chore(build): update github workflow (#67) (#68)
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#62) (#63)
 - chore(build): update to use aquasec scan (#60) (#61)

#### Armory Kayenta  - 2.19.5...2.19.13
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#81) (#82)
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#76) (#80)
 - chore(build): update github workflow (#78) (#79)
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#74) (#75)
 - chore(build): update to use aquasec scan (#72) (#73)
 - fix(dependencies): tweak deps so that the right orca and kork are used and port oss integration tests so that dep issues pop up in CI (#70) (#71)
 - fix(dependencies): Exclude the dependencies that I manaully determined that Kayenta defines itself from the armory-commons bom platform so that Kayenta has the version or orca and kork that it expects (#66) (#69)
 - chore(cve): fix CVE-2019-17495 CVE (#67) (#68)

#### Armory Orca  - 2.19.9...2.19.14
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#106) (#107)
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#103) (#105)
 - chore(aquasec): update build to scan using aquasec (#100) (#101)
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#97) (#98)
 - feat(terraformer): pass selected profile to backend (#93) (#96)

#### Armory Rosco  - 2.19.6...2.19.13
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (bp #62) (#63)
 - chore(build): update github workflow (#60) (#61)
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#57) (#59)
 - chore(cve): fix for CVE-2017-18640 (#55) (#56)
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Versions (#53) (#54)
 - chore(cve): fix CVE-2019-17495 CVE (#49)
 - chore(build): update to aquasec scan (#50) (#51)
