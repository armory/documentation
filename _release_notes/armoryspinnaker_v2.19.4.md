---
layout: post
title: v2.19.4 Armory Release (OSS Release 1.19.4)
order: -21920200416012751
hidden: false
---

# 04/15/20 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Breaking Changes
<!--
most of the time this will be empty, however we're leaving this section for a consistant format.
-->

### Halyard
Armory Spinnaker 2.19.x requires Armory Halyard 1.8.3 or later.

### HTTP sessions for Gate
This version includes an upgrade to the Spring Boot dependency. This requires you to flush all the Gate sessions for your Spinnaker deployment. For more information, see [Flushing Gate Sessions](https://kb.armory.io/admin/flush-gate-sessions/).



## Known Issues
There are currently no known issues with this release.


## Highlighted Updates
### Armory
Highlighted Updates describe some of the major changes in this release. Highlights specific to Armory Spinnaker for this release include:

**Policy Engine**
Armory's Policy Engine for the SDLC now also performs Runtime validation on Spinnaker pipelines. This means that when a pipeline runs, the Policy Engine evaluates the pipeline. This validation only operates on tasks that you have explicitly created policies for. For more information, see [Policy Engine](/spinnaker/policy-engine).

**CVEs**
Addressed a number of CVEs found within the Spinnaker services.

**Support for Plugins**
This release supports Plugin deployment using Armory Halyard or the [Spinnaker Operator](/_spinnaker/operator/). Consult the open source [Plugin](https://www.spinnaker.io/guides/user/plugins/user-guide/) docs for Halyard usage or the [Plugins Operator Reference](/_operator_reference/plugins/) for a manifest example.


###  Spinnaker Community Contributions

The following highlights describe some of the major changes from the Spinnaker community for version 1.19.x, which is included in this release of Armory Spinnaker 2.19:

**Scheduled Removal of Kubernetes V1 Provider**
The Kubernetes V1 provider will be removed in Spinnaker 1.21. Please see the [RFC](https://github.com/spinnaker/governance/blob/master/rfc/eol_kubernetes_v1.md) for more details.

Breaking change: Kubernetes accounts with an unspecified providerVersion will now default to V2. Update your Halconfig to specify `providerVersion: v1` for any Kubernetes accounts you are currently using with the V1 provider.

**Java 11**
> The migration to Java 11 continues. This should not affect Spinnaker users. If you extend Spinnaker, this change may affect you.

The Java 11 JRE runs Spinnaker when deployed to a Kubernetes cluster using Halyard (or if you consume the official containers in some other way). If this causes problems, or your organization isn't ready to run Java 11 in production, you can specify deploymentEnvironment.imageVariant: JAVA8 (or UBUNTU_JAVA8) in your Halyard config. Please notify [sig-platform@spinnaker.io](sig-platform@spinnaker.io) if you run into issues and decide to downgrade.

All users need to switch to a Java 11 JRE by Spinnaker 1.21, which is scheduled to be released in early July. Please see the [RFC](https://github.com/spinnaker/governance/blob/master/rfc/java11.md) for the full schedule and more details. We encourage everyone to start testing Spinnaker under a Java 11 JRE now in preparation for the cutover. If you have any concerns about the migration timeline, please reach out to sig-platform@spinnaker.io.

**IAM service-linked roles for ECS**

The ECS provider now requires IAM service-linked roles for use with ECS and Application Auto Scaling. Deployments to AWS accounts that do not already have service-linked roles for these AWS services may see failed deployments after upgrading to Spinnaker 1.19. To create the required service-linked roles, run the following:

```
aws iam create-service-linked-role --aws-service-name ecs.amazonaws.com
aws iam create-service-linked-role --aws-service-name ecs.application-autoscaling.amazonaws.com
```

Visit the [ECS service-linked role documentation](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/using-service-linked-roles.html) and the [Application Auto Scaling service-linked role documentation](https://docs.aws.amazon.com/autoscaling/application/userguide/application-auto-scaling-service-linked-roles.html) for information on the permissions in these roles.

**Changes to default settings for non-Halyard users**

In order to make default settings consistent whether deploying using Halyard or manually, the following properties of Orca and Clouddriver have had their defaults changed. This change does not affect users who deploy using Halyard, as Halyard was already setting these properties to the new values.

* Clouddriver
  * `shutdown-wait-seconds`, which sets the number of seconds Clouddriver waits for outstanding work to complete when shutting down, will now default to 600 seconds.
* Orca
  * Orca will no longer consider the environment variable `REDIS_URL` when setting the connection to Redis.
  * The setting `echo.enabled` now defaults to `true`.
  * The `bakery.extractBuildDetails` setting now defaults to `true`.

<br><br><br>

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.19.4-rc.9
timestamp: "2020-04-16 01:25:59"
services:
  clouddriver:
    commit: 07ce2a12
    version: 2.19.6
  echo:
    commit: 3e2dc3b3
    version: 2.19.6
  fiat:
    commit: a75473f4
    version: 2.19.3
  front50:
    commit: 51451737
    version: 2.19.4
  gate:
    commit: 771300da
    version: 2.19.3
  igor:
    commit: 360d9491
    version: 2.19.3
  orca:
    commit: b36c6800
    version: 2.19.6
  rosco:
    commit: 6e6f34c3
    version: 2.19.3
  deck:
    commit: 5c34e55b
    version: 2.19.2
  dinghy:
    commit: 135a0758
    version: 2.19.3
  terraformer:
    commit: f498d00e
    version: 1.0.5
  kayenta:
    commit: 527c4dc4
    version: 2.19.3
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
#### Dinghy&trade; - 16cebe7...135a0758
 - chore(build): update Dinghy (#201) (#202)
 - fix(bump): Autobump armory commons and spinnaker release (#199) (#200)
 - fix(templates): allow separate template orgs (#198)
 - chore(build): fixing up some local build experience things (#193)
 - fix(build): explicitly add dockerPush to Github Action release flows (#197)
 - feat(builds): Revamped Build System (#196)

#### Terraformer&trade; - 4ed31a9...f498d00e
 - fix(api/createJob): make sure to init a runner (bp #139) (#140)
 - fix(api/createJob): handle when savePlanOutput is undefined/null… (#137)
 - fix(bump): Autobump armory commons and spinnaker release (#133) (#134)
 - feat(command): add savePlanOutput toggle (#131)
 - fix(security): bump golang version
 - fix(security): bump golang version
 - fix(security): bump golang version (#132)
 - feat(builds): Revamped Build System (#130)

#### Armory Clouddriver  - 40c9a8c...07ce2a12
 - fix(clouddriver.yaml): copied from 1.19.x (bp #94) (#95)
 - fix(bump): Autobump armory commons and spinnaker release (#92) (#93)
 - release(2.19.x): new release (#89)
 - fix(dockerfile): reverting awscli version to 1.16.314 to fix integration tests (#87)
 - chore(docker): update to python3 (#86)
 - fix(cve): update awscli=1.18.13 so we can use PyYAML=5.3.1 (#85)
 - chore(cve): Upgrading Spring version to fix critical CVE vulnerabilities (#83)
 - release(java11): Java 11 now (#78)
 - fix(jvm): Java 11 and gradle plugin update (#74) (#75)
 - working on triggering a release
 - feat(builds): Revamped Build System #63 (#64)
 - fix(policyEngine): only call out to OPA for valid operation descr… (#68)
 - fix(docker): Bump to Python3 for AWS CLI and Google SDK (#69)
 - fix(policyEngine): only call out to OPA for valid operation descr… (#66)
 - fix(policyEngine): don't fail when OPA returns unknown JSON fields (#62)
 - fix(policyEngine): don't fail when OPA returns unknown JSON fields (#61)
 - feat(policyEngine): add runtime validation features to release (#58)
 - fix(policyEngine): fix logging (#56)
 - feat(policyEngine): deployment validation call to opa (#55)
 - feat(policyEngine): add base classes for deployment validation (#53)
 - chore(release): bump versions for kork, armory-commons, oss service (#52)
 - chore(release): bump versions for kork, armory-commons, oss service (#51)
 - chore(release): bump versions for kork, armory-commons, oss service (#51)
 - release(2.18.0): Initial release

#### Armory Deck  - 367a2b6...5c34e55b
 - fix(bump): Autobump armory commons and spinnaker release (#583) (#584)
 - feat(terraformer): save output (#581)
 - chore(terraform): fix broken link in help text (#580)
 - feat(builds): Revamped Build System (#577)
 - Delete main.yml (#579)
 - chore(github-actions): adding workflow through ui
 - feature(terraformer): removed SYSTEM_DEFINED option from Terraform version dropdown menu, and made the latest version selected by default (#573)
 - feature(terraformer): added profile selection to the Terraformer stage (#576)
 - chore(terraformer): merge terraformer features into release (#574)
 - chore(plugins): removed old plugin code now that it is in OSS (#564)
 - chore(UI): Update Terraformer UI text and help text (#572)
 - feature(terraformer): added profile selection to the Terraformer stage form (#571)

#### Armory Echo  - 925793f...3e2dc3b3
 - fix(echo.yaml): copied from 1.19.x (#143) (#144)
 - fix(bump): Autobump armory commons and spinnaker release (#141) (#142)
 - release(2.19.x): Release 2.19.x (#137)
 - fix(build): Restrict Hibernate validator to 6.1.x (#130) (#134)
 - fix(cve): upgrade sprint, tomcat, jackson-databind (#131)
 - chore(commons): Bump armory commons (#126) (#127)
 - Readme
 - feat(builds): Revamped Build System (#125)
 - fix(build): change scope for rest config (#124)
 - fix(compile): Fix build due to different scope for rest config (#123)
 - chore(releaes): account for drift with 1.18.x (#122)
 - fix(compile): Fix build due to different scope for rest config (#123)
 - release(2_18): Initial release

#### Armory Fiat  - 6bc50c7...a75473f4
 - release(2.19.x): Release 2.19.x (#41)
 - chore(commons): Armory commons bump (#36) (#37)
 - chore(cve): upgrade spring, tomcat, jackson-databind, commons-collections deps (#39)
 - feat(build): update project to new build system (#35)
 - chore(release): bump versions for kork, armory-commons, oss service (#34)
 - chore(release): bump versions for kork, armory-commons, oss service (#34)
 - release(2_18): Initial release

#### Armory Front50  - ed17bd1...51451737
 - fix(bump): Autobump armory commons and spinnaker release (#46) (#47)
 - release(2.19.x): Release 2.19.x (#43)
 - fix(dependencies): cve fixes (#41)
 - armory commons updates (#38) (#39)
 - feat(build): update project to new build system (#37)
 - fix(policyEngine): don't fail when OPA returns unknown JSON fields (#36)
 - fix(policyEngine): don't fail when OPA returns unknown JSON fields (#35)
 - chore(opa): merge policy engine features into release (#34)
 - chore(msgs): update policy engine msgs (#33)
 - fix(opa): re-add log that was prev removed (#32)

#### Armory Gate  - 23b4000...771300da
 - fix(bump): Autobump armory commons and spinnaker release (#100) (#101)
 - release(2.19.x): Release from master (#97)
 - chore(cve): upgrade spring, tomcat, jackson-databind deps (#95)
 - release(2.19.2): New release jdk 11 (#93)
 - Removed jenkins from readme to trigger release
 - feat(build): update project to new build system (#90)
 - feature(terraformer-profiles): Added Terraformer profile proxy endpoint (#88) (#89)
 - feature(terraformer-profiles): Added Terraformer profile proxy endpoint (#88)

#### Armory Igor  - 2066eb2...360d9491
 - fix(bump): Autobump armory commons and spinnaker release (#51) (#52)
 - fix(bump): Autobump armory commons and spinnaker release (#46) (#47)
 - fix(build): fixes CVE-2020-5398, CVE-2020-1938, CVE-2020-8840 (#45)
 - feat(build): update project to new build system (#43)
 - fix igor (#42)
 - fix igor (#41)

#### Armory Kayenta  - c02d436...527c4dc4
 - fix(bump): Autobump armory commons and spinnaker release (#54) (#55)
 - fix(bump): Autobump armory commons and spinnaker release (#50) (#51)
 - chore(cve): upgrade spring, tomcat, jackson-databind deps (#49)
 - feat(build): update project to new build system (#47)

#### Armory Orca  - a0c169e...b36c6800
 - fix(orca.yaml): copied from 1.19.x (bp #84) (#85)
 - fix(bump): Autobump armory commons and spinnaker release (#82) (#83)
 - chore(config): update default redis endpoint (#78) (#79)
 - feat(terraformer): add save toggle config (#72) (#74)
 - release(2.19.x): Release 2.19.x (#77)
 - fix(dependencies): cve fixes (#75)
 - feat(build): update project to new build system (#70)
 - fix(orca): Missing library (#66) …Jaxb orca (#69)
 - Fix for wrong library for distribution (#67)
 - fix(orca): Missing library (#66)
 - fix(runs): Orca was missing a lib with kotlin changes it seems (#65)
 - fix(terraform): fix terraform monitor task (#64)

#### Armory Rosco  - 8f59952...6e6f34c3
 - fix(bump): Autobump armory commons and spinnaker release (#38) (#39)
 - fix(bump): Autobump armory commons and spinnaker release (#35) (#36)
 - chore(cve): upgrade spring, tomcat, jackson-databind deps (#34)
 - feat(build): update project to new build system (#32)



###  Spinnaker Community Contributions

See the Open Source Spinnaker Release Notes for the versions included in this release:  
* [Spinnaker's v1.19.0](https://www.spinnaker.io/community/releases/versions/1-19-5-changelog#spinnaker-release-1-19-0)  
* [Spinnaker's v1.19.1](https://www.spinnaker.io/community/releases/versions/1-19-5-changelog#spinnaker-release-1-19-1)  
* [Spinnaker's v1.19.2](https://www.spinnaker.io/community/releases/versions/1-19-5-changelog#spinnaker-release-1-19-2)
* [Spinnaker's v1.19.3](https://www.spinnaker.io/community/releases/versions/1-19-5-changelog#spinnaker-release-1-19-3)
* [Spinnaker's v1.19.4](https://www.spinnaker.io/community/releases/versions/1-19-5-changelog#spinnaker-release-1-19-4)
