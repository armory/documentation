---
layout: post
title: v2.18.1 Armory Release (OSS Release 1.18.7)
order: -21820200403172919
hidden: false
---

# 04/03/20 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
There are currently no known issues with this release.


## Highlighted Updates
### Armory
This release includes the following:
  - Improved error handling in Pipelines as Code and its microservice, Dinghy.
  - The Terraform integration now uses Clouddriver's built-in support for `git/repo` artifact types. Previously, you had to create a custom artifact that was a `git/repo` type.
  - Improved edge case handling in Policy Engine to better support more complex policies that include other top-level declarations besides `deny`. This resolves a previous known issue with Policy Engine where OPA policies that contain a top level declaration other than `deny` prevent any pipeline from being saved.
  - Addressed a number of CVE's related to `springframework`, `tomcat`, and `jackson-databind` found in Spinnaker Java services.



###  Spinnaker Community Contributions

There have also been numerous enhancements, fixes and features across all of Spinnaker's services from the open source community. See their changes here: [Spinnaker's v1.18.7](https://www.spinnaker.io/community/releases/versions/1-18-7-changelog).  

<br>

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.18.1-rc1286
timestamp: "2020-04-03 15:09:43"
services:
  clouddriver:
    version: 6.5.6-40c9a8c-6a11468-rc30
  deck:
    version: 2.15.1-367a2b6-b4e03e7-rc13
  dinghy:
    version: 0.0.4-16cebe7-rc1198
  echo:
    version: 2.10.2-925793f-ee73077-rc14
  fiat:
    version: 1.9.0-6bc50c7-695585e-rc10
  front50:
    version: 0.21.1-ed17bd1-efb3326-rc13
  gate:
    version: 1.14.0-23b4000-86b6626-rc15
  igor:
    version: 1.8.2-2066eb2-a6fa3a7-rc12
  kayenta:
    version: 0.13.0-c02d436-dcad431-rc10
  monitoring-daemon:
    version: 0.16.1-7d506f0-rc2
  monitoring-third-party:
    version: 0.16.1-7d506f0-rc2
  orca:
    version: 2.12.2-a0c169e-5a77dcb-rc18
  rosco:
    version: 0.17.0-8f59952-f8e1d2c-rc11
  terraformer:
    version: 0.0.2-4ed31a9-rc18
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

#### Terraformer&trade; - 266ac86...4ed31a9
 - fix(vulns): fix vulnerabilities by upgrading go (#129)
 - chore(artifacts): refactor plugin handling logic (#127)
 - chore(artifacts): fix git/repo handling & refactor (#126)
 - fix(command): fix building target options (#125)
 - fix(artifacts): improve error messaging (#124)
 - feat(artifacts): defer git/repo to clouddriver (#123)
 - feat(terraform): add additional context arround terraform executable errors (#122)
 - chore(dependencies): updated and vendored go-yaml-tools (#119)
 - fix(profiles): handle case where no profile is configured (#118)


#### Armory Clouddriver  - f969aaf...40c9a8c
 - chore(docker): Bump to Python3 for AWS CLI and Google SDK (#86)
 - chore(cve): Upgrading Spring version to fix critical CVE vulnerabilities (#83)
 - fix(policyEngine): only call out to OPA for valid operation descriptions (#68)
 - fix(policyEngine): don't fail when OPA returns unknown JSON fields (#62)
 - feat(policyEngine): add runtime validation features to release (#58)

#### Armory Deck  - 5f306f6...367a2b6


#### Armory Echo  - 48991a0...925793f
 - fix(cve): upgrade sprint, tomcat, jackson-databind (#131)

#### Armory Fiat  - fa3a735...6bc50c7
 - chore(cve): upgrade spring, tomcat, jackson-databind, commons-collections deps (#39)

#### Armory Front50  - cca684d...ed17bd1
 - fix(dependencies): upgrade spring, tomcat, jackson-databind deps (#41)
 - fix(policyEngine): don't fail when OPA returns unknown JSON fields (#36)

#### Armory Gate  - 42ccb4f...23b4000
 - chore(cve): upgrade spring, tomcat, jackson-databind deps (#95)


#### Armory Igor  - 7bd757d...2066eb2
 - fix(build): fixes CVE-2020-5398, CVE-2020-1938, CVE-2020-8840 (#45)

#### Armory Kayenta  - e7f465e...c02d436
 - chore(cve): upgrade spring, tomcat, jackson-databind deps (#49)

#### Armory Orca  - 67f03ef...a0c169e
 - fix(dependencies): upgrade spring, tomcat, jackson-databind deps (#75)

#### Armory Rosco  - 7c38ed6...8f59952
 - chore(cve): upgrade spring, tomcat, jackson-databind deps (#34)


### Armory Open Core
#### Dinghy (Open Core) - 60cb2f5...3b0247e
 - fix(templates): templateOrg can be different from target repo (#81)
 - fix(github): Change ref of github to master from refs/heads/master (#79)
 - fix(notif): surface policy engine errors in notifications (#78)

###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release:

[Spinnaker's v1.18.7](https://www.spinnaker.io/community/releases/versions/1-18-7-changelog#individual-service-changes)

#### Clouddriver  - 2f123de...6a11468
 - fix(core): Only log relevant details of description (#4456) (#4458)
 - fix (ecs): Unstable deployments when there are more than one container in task definition (#5544) (#4411)
 - fix(ecs): Improve debug messaging for task health (#4431) (#4433)
 - fix(sql): use jooq constructs instead of string constructs (#4412) (#4424)
 - fix(repository): Enforce serialization order for JedisTask (#4394) (#4397)
 - chore(kork): bump kork to get Java 11 fix (#4392)
 - fix(kubernetes): return provider field with kubernetes /search results (#4249) (#4388)
 - fix(cloudFoundry): fix cloudFoundry job provider (#4379) (#4380)
 - fix(ecs): Prevent NPE when a task def ARN is no longer in the cache (#4338) (#4361)
 - fix(ecs): provide port mappings if legacy target group setting is set (#4340) (#4362)
 - fix(ecs): only add service role to create request if there is one lb (#4349) (#4350)

#### Deck  - df9097d...b4e03e7
 - fix(artifacts): only remove deleted expected artifacts from stages on trigger update (#8071) (#8073)
 - chore(container builds): exclude large cache directories from GCB upload (#7919) (#8002)
 - fix(artifacts): fix editing expected artifacts in artifact rewrite trigger flow (#7989) (#7990)
 - fix(ecs): add memory and cpu to container inputs (#7869) (#7913)
 - fix(docker): Fix handling Docker Image name with digest (#7896) (#7918)
 - chore(buildtool): add an empty .gcloudignore file (#7909) (#7910)
 - fix(artifacts): Fix find artifacts from execution stage (#7801) (#7907)

#### Echo  - e3df630...ee73077
 - fix(front50): Add SpinnakerRequestInterceptor to Front50 OkHttpClient (#816) (#823)
 - fix(pubsub): Default NodeIdentity to 'UnknownHost' to prevent NPE (#781) (#785)

#### Fiat  - 695585e
No Changes

#### Front50  - 4e0f6fc...efb3326
 - chore(kork): bump kork to get Java 11 fix (#738)

#### Gate  - a2428e6...86b6626
 - fix(etag): produce weak ETag (#1127) (#1132)

#### Igor  - 127328c...a6fa3a7
 - chore(container builds): exclude large cache directories from GCB upload (#633) (#655)
 - chore(buildtool): add an empty .gcloudignore file (#631) (#653)
 - chore(kork): bump kork to get Java 11 fix (#650)

#### Kayenta  - dcad431
No Changes

#### Orca  - c3b6f15...5a77dcb
 - fix(bakery): only conditionally override input artifact account in CreateBakeManifestTask (#3562) (#3567)
 - fix(execution): Fix START_TIME_OR_ID comparator (#3392) (#3498)

#### Rosco  - 508e253...f8e1d2c
 - Update the windows-configure-chocolatey.ps1 script to allow the use of TLS1.2 (#530) (#549)
