---
layout: post
title: v2.15.0 Armory Release (OSS Release 1.15.1)
order: -21520190805061413
hidden: false
---

# 08/05/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## A Note on the `2.15.x` release name
We have made the decision to bump the minor version of our releases to match the minor version of the OSS release. This is done with the intent of making it easier to track which version of OSS Spinnaker is included in a particular version of Armory Spinnaker.  

As such, `Armory Spinnaker 2.15.x` tracks `OSS Release 1.15.x`.

This decision has no effect on previous release names. 

## Known Issues

* `Clouddriver` caching of `Docker Registry` tags is slow in this release. Registries containing a large number of tags **(> 1000)** will result in `docker triggers` not properly triggering until caching is complete -- which might take 10 minutes or more.
* The `clouddriver-ro` pod fails to start when using Vault secrets with HA Clouddriver enabled.

*Note*: Fixes for these issues will appear in `Armory Spinnaker 2.15.1`

##  Spinnaker Community Contributions
[Spinnaker 1.15.1 Release Notes](https://www.spinnaker.io/community/releases/versions/1-15-1-changelog)  

<br>

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.15.0-rc322
timestamp: "2019-08-05 05:22:36"
services:
  clouddriver:
    version: 1.0.0-1862b8b-e9a7226-rc8
  deck:
    version: 2.10.0-1c65f72-39a74be-edge13
  dinghy:
    version: 0.0.4-9ccc528-rc298
  echo:
    version: 2.6.0-7f44a96-4aae0bc-edge3
  fiat:
    version: 1.6.0-b557350-fced26e-edge4
  front50:
    version: 0.18.0-318214b-e6c5f94-edge6
  gate:
    version: 1.9.0-83b6e52-193c7b9-edge3
  igor:
    version: 1.4.0-0dbfd5e-3245969-edge5
  kayenta:
    version: 0.10.0-83f4056-6a3c60f-edge9
  monitoring-daemon:
    version: 0.14.0-a37ddce-edge2
  monitoring-third-party:
    version: 0.14.0-a37ddce-edge2
  orca:
    version: 2.8.1-62b8988-2661d79-edge4
  rosco:
    version: 0.13.0-d7a038b-f01311c-edge9
  terraformer:
    version: 0.0.2-63b5d5c-edge2
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Armory Dinghy&trade; - 9ccc528
No Changes

#### Armory Terraformer&trade; - 8361728...63b5d5c
 - feat(terraformer): Add 0.12.5 and 0.12.6 to terraform (#86)

#### Armory Clouddriver  - 88e5012...1862b8b
 - feat(aws): upgrade awscli (#39) (#41)
 
#### Armory Deck  - fec48f6...1c65f72
 - chore(kayenta): Bump version (#519)
 
#### Armory Echo  - 7f44a96
No Changes

#### Armory Fiat  - b557350
No Changes

#### Armory Front50  - bf00a4f...318214b
 - chore(build): move to springboot2 and gradle5 (#19)

#### Armory Gate  - 83b6e52
No Changes

#### Armory Igor  - c3c7850...0dbfd5e
 - chore(upgrade): Fix jacoco lib version (#29)

#### Armory Kayenta  - 39c3a6b...83f4056
 - chore(build): update kayenta.yml + package (#28)
 - chore(release): spring boot 2 & updates to gradle (#27)

#### Armory Orca  - 62b8988
No Changes

#### Armory Rosco  - e1fc510...d7a038b
 - chore(build): update rosco.yml + package (#17)
 - chore(build): migrate to springboot2 and gradle5 (#16)

### Armory Community Contributions

##### Dinghy (Open Source)  - 68a1800...daf85e4
 - feat(conditionals): test conditionals and range (#60)
 - chore(yaml): Update go-yaml-tools (secrets fix) (#59)
 - fix(github): webhook response (#58)
 - feat(configurablebranch): remove the need for the full branch path (#57)

###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release: 

[Spinnaker 1.15.1](https://www.spinnaker.io/community/releases/versions/1-15-1-changelog#individual-service-changes)  

#### Clouddriver  - 9e336dd...e9a7226
 - fix(kubernetes/v1): set currentCpuUtilization from currentMetrics (#3912) (#3914)
 - fix(ecs): search through whole list of tasks for vpc ID (#3886) (#3903)
 - fix(ecs): search through whole list of tasks for vpc ID (#3886) (#3902)
 - fix(ecs): Add validation for loadBalancedContainer when using artifact (#3888) (#3896)
 - fix(kubernetes): fix property parser exception (#3885) (#3894)
 - fix(configServer): add /opt/spinnaker/config/ as default (#3884)
 - fix(appengine): check for null versions in servergroup caching agent (#3875) (#3878)
 - fix(appengine): check for null versions in servergroup caching agent (#3875) (#3877)
 - fix(appengine): Fix threading bugs in AppengineMutexRepository (#3862) (#3871)
 - fix(doc): fix invalid javadoc in KubernetesKindRegistry (#3867) (#3868)
 - fix(appengine): Fix threading bugs in AppengineMutexRepository (#3862) (#3866)
 - fix(kubernetes): Fix daemonset stability condition (#3863) (#3864)
 - fix(kubernetes): Fix daemonset stability condition (#3863) (#3865)
 - chore(dependencies): Autobump korkVersion (#3857)
 - feat(google): propagate the GCE statefulPolicy through to deck (#3855)
 - perf(kubernetes): Improve performance of kubernetes search (#3856)
 - chore(*): Removing dynomite from project (#3828)
 - fix(titus): adjust page size for titus queries (#3854)
 - Support `aws eks ...` (#3848)
 - feat(k8s): dynamic account config (#3824)
 - perf(kubernetes): Store Kind on the KubernetesManifest object (#3853)
 - chore(dependencies): Autobump korkVersion (#3851)
 - fix(deps): bump fiat version to 1.0.9 (#3842)
 - fix(bom): Fix generated pom.xml to omit invalid lombok declaration (#3847)
 - feat(core): add custom artifact type for new artifacts refactor (#3835)
 - fix(web-config): force spring to always return json (#3846)
 - perf(kubernetes): Use a more efficient kind registry (#3845)
 - chore(deps): bump fiat version to 1.4.0 (#3844)
 - fix(SqlCache): modify typeSanitization regex to filter MySQL non-permitted chars (#3839) (#3841)
 - refactor(kubernetes): Create KubernetesKindRegistry (#3843)
 - fix(SqlCache): modify typeSanitization regex to filter MySQL non-permitted chars (#3839)
 - fix(titus): Do not copy serviceJobProcesses from source job (#3827)
 - fix(kubernetes): Don't register kinds on deserialization (#3840)
 - perf(redis): Don't re-encode string when computing hash (#3838)
 - perf(redis): Replace String.format with String.join (#3836)
 - feat(ecs): Add support for task definition artifact (#3825)
 - refactor(kubernetes): A few improvements to KubernetesKind (#3834)
 - feat(docker): Use cache for "/dockerRegistry/images/tags" instead of requesting docker registry every time (#3809)
 - chore(sql): convert tests to use tc-mysql, unpin jooq (#3832)
 - perf(kubernetes): Improve performance of API group and version (#3831)
 - refactor(kubernetes): Move pod metrics to use KubernetesCacheData (#3830)
 - perf(kubernetes): Only create applications for some kinds (#3829)
 - refactor(kubernetes): Make cache keys immutable (#3826)
 - feat(kubernetes,google): Support retrieving config files from config server. (#3812)
 - fix(kubernetes): Improve failure mode for unreachable cluster (#3770) (#3823)
 - feat(cfn/changeset): Introduce CFN change sets (#3731)
 - fix(cf): Task and CreateTask JSON deserialization issues (#3818)
 - fix(logging): add logstash-logback-encoder to runtimeClasspath (#3666) (#3817)
 - feat(titusserviceJobProcesses): Support serviceJobProcesses for create and clone ops (#3816)
 - feat(google): add a StatefullyUpdateBootImage GCE operation (#3815)
 - fix(cf): removing tags hiding as env vars kept clone from working (#3814)
 - refactor(kubernetes): A few minor refactors and perf fixes (#3813)
 - fix(kubernetes): Fix a few other bugs from client library upgrade (#3811)
 - refactor(gce): Add support for batch requests to the compute API wrapper (#3792)
 - feat(cf): "Run Job" stage support for CloudFoundry (#3789)
 - fix(cf): allow environmentVars values to be deserializable to objects (#3804)
 - fix(appengine): Properly account for GCS object version in deploy (#3806) (#3807)
 - fix(appengine): Properly account for GCS object version in deploy (#3806)
 - fix(kubernetes): fix breaking api changes in kubernetes java client library (#3805)
 - feat(kubernetes): Add support for excluding event loading on manifest… (#3796)
 - fix(kubernetes): update fabric HPA model in v1 provider (#3801)
 - fix(aws): lbv2 listener rule priorty should be a string (#3803)
 - chore(kubernetes): upgrade k8s client to 5.0.0 version (#3784)
 - fix(titus): calling non-existant method (#3797)
 - fix(deps): bump fabric8 to 4.1.1 (#3800)
 - fix(titus): add auth to destroy job operation (#3798)
 - feat(clouddriver-bom): publish clouddriver-bom (#3794)
 - chore(dependencies): Autobump korkVersion (#3787)
 - fix(snapshots): ignore not found in delete operation (#3793)
 - refactor(gce): Add a wrapper around compute.instanceTemplates() (#3790)
 - fix(ecs): If in "host" network mode, host and container port should be the same (#3776) (#3791)
 - fix(ecs): If in "host" network mode, host and container port should be the same (#3776)
 - fix(jobcontroller): better error message if property file not found on job (#3783)
 - feat(provider/azure): Enable data disk for server group (#3788)
 - fix(ecs): Fix incorrect de-duping of clusters with same name, but different accounts (#3782) (#3786)
 - fix(ecs): Fix incorrect de-duping of clusters with same name, but different accounts (#3782)
 - perf(google): improve performance of gce image fetching (#3785)
 - feat(cats): Allow partial cache updates
 - fix(ecs): Handle container instances no longer being cached, but showing up in stopped ECS tasks in the account (#3765) (#3781)
 - fix(ecs): Handle container instances no longer being cached, but showing up in stopped ECS tasks in the account (#3765)
 - fix(docker): Tweak messages for exception and log (#3763)
 - fix(edda): Better error message on edda lookup failures (#3774)
 - fix(cf): fail destoryService stage if service not found (#3779) (#3780)
 - fix(cf): fail destoryService stage if service not found (#3779)
 - fix(cf): capture build info for a manual trigger (#3773)
 - fix(ecs): Don't specify load balancer role for non-load-balanced service (#3740) (#3759)
 - fix(appengine): Use getOutput() instead of getStdOut(). (#3771) (#3772)
 - fix(appengine): Use getOutput() instead of getStdOut(). (#3771)
 - fix(kubernetes): Improve failure mode for unreachable cluster (#3770)
 - refactor(clouddriver): Add accountName to several startup logs for better debugging (#3769)
 - feat(provider/azure): Enable highlight effect for server group in load balancer section (#3768)
 - chore(dependencies): Autobump korkVersion (#3767)
 - chore(dependencies): kork 5.4.8, fiat 1.1.0 (#3766)
 - feat(titus): delete job with just id (#3762)
 - fix(misc): Update error message with region and account details (#3761)
 - fix(cf): regions must be associated with accounts (#3760)
 - perf(kubernetes): Remove cluster relationship from pod kind (#3758)
 - fix(kubernetes): Improve error message on kubectl failure (#3757)
 - fix(ecs): Don't specify load balancer role for non-load-balanced service (#3740)
 - Revert "chore(clouddriver/oracle): Get the Oracle API jar from Maven. (#3695)" (#3756)
 - fix(cf): Filter by provider type when deciding which accounts to delete (#3755)
 - fix(cf): remove sensitive information from credentials payload (#3752) (#3754)
 - fix(cf): remove sensitive information from credentials payload (#3752)
 - chore(dependencies): Autobump korkVersion (#3749)
 - fix(kubernetes): Allow namespaces that don't exist in validation (#3748) (#3750)
 - fix(provider/azure): The cache data of firewall hasn't been removed after deleting firewall successfully (#3751)
 - fix(kubernetes): Allow namespaces that don't exist in validation (#3748)
 - fix(metrics): fix caching agent drift gauge usage (#3747)
 - perf(kubernetes): Improve performance of cache kind lookup (#3741) (#3745)
 - feat(provider/azure): Enable dns label (#3722)
 - perf(kubernetes): Reduce memory allocation during caching cycles (#3736) (#3744)
 - feat(cf): Cloudfoundry API endpoint server certificate now validated by default (#3737)
 - chore(dependencies): Autobump korkVersion (#3743)
 - fix(kubernetes): add cleaned up artifact manifests to output (#3711) (#3742)
 - fix(kubernetes): add cleaned up artifact manifests to output (#3711)
 - perf(kubernetes): Improve performance of cache kind lookup (#3741)
 - fix(kubernetes): Properly handle empty kubectl input stream (#3734) (#3739)
 - chore(dependencies): Autobump korkVersion (#3738)
 - perf(kubernetes): Reduce memory allocation during caching cycles (#3736)
 - fix(kubernetes): Properly handle empty kubectl input stream (#3734)
 - fix(eureka): Handles duplicate eureka records (#3735)
 - chore(*): Kork bump (#3733)
 - refactor(aws/cloudformation): remove unnecessary hierarchy (#3673)
 - chore(sql/scheduler): make agent lock release ttl threshold dynamic
 - fix(cf): CloudFoundryCredentials#getRegions NPE on using an uninitialized field. (#3727)
 - fix(cf): Exponentially backoff when Cloud Foundry is unavailable (#3725) (#3726)
 - feat(provider/kubernetes): Deploy kubernetes kind List (#3716)
 - fix(cf): Exponentially backoff when Cloud Foundry is unavailable (#3725)
 - feat(provider/google): Pass labels along when creating disks (#3694)
 - fix(clouddriver): Unsuccessful default namespace resolution in Kubernetes v2 provider
 - chore(dependencies): Autobump korkVersion (#3703)
 - feat(titus): Add updateJobProcesses operation (#3699)
 - fix(titus): Return job constraints with serverGroup details (#3717)
 - feature(cf): use trigger for build metadata (#3721)
 - fix(ecs): Add image info to cluster's server groups (#3702) (#3720)
 - fix(ecs): Add image info to cluster's server groups (#3702)
 - chore(aws): legacyUdf no longer enabled by default
 - fix(gce): fix waiting on regional operations from the new MIG compute wrapper (#3718)
 - refactor(gce): introduce a WaitableComputeOperation (#3715)
 - chore(cf): additional info when droplet fails (#3700)
 - fix(provider/azure): Fix several issues in Azure Load Balancer (#3713) (#3714)
 - fix(provider/azure): Fix several issues in Azure Load Balancer (#3713)
 - refactor(*): Remove ProviderSynchronizerTypeWrapper and usage from all providers. (#3682)
 - fix(cf): use the artifactory link now that we construct it correctly (#3709)
 - fix(titus): handle additional task states (#3710)
 - fix(artifacts): resolve version of artifacts (#3705) (#3708)
 - fix(titus): Support Titus value base constraints (#3690)
 - fix(runJob/kubernetes): collect pods and status (#3697) (#3707)
 - fix(artifacts): resolve version of artifacts (#3705)
 - fix(cf): cacheTime should be stored as a long (#3704) (#3706)
 - fix(cf): cacheTime should be stored as a long (#3704)
 - chore(dependencies): Autobump korkVersion (#3701)
 - fix(runJob/kubernetes): collect pods and status (#3697)
 - fix(RRB): Minor fixes in rolling red black (#3665)
 - chore(clouddriver/oracle): Get the Oracle API jar from Maven. (#3695)
 - fix(kubernetes): Fix compiler warnings (#3698)
 - refactor(kubernetes): Consolidate constructors (#3693)
 - chore(dependencies): align on guava version from caffeine (#3692)
 - fix(openstack): Remove a few remaining openstack files (#3691)
 - fix(cf): only create artifact metadata for Maven artifacts (#3687) (#3689)
 - fix(cf): only create artifact metadata for Maven artifacts (#3687)
 - fix(kubernetes): Improve error message on unbound artifact (#3688)
 - fix(kubernetes) : inbound/outbound rules only detected in apiVersion=network.k8s.io/v1 (#3684)
 - feat(cf): Improved flexibility of Map deserialization for Service manifest fields. (#3686)
 - feat(provider/kubernetes): namespace deployManifest (#3678)
 - fix(*): Use default profile for default config server configuration. (#3683)
 - chore(dependencies): externalize versions to gradle.properties (#3681)
 - feat(cf): Use Spring Cloud Config for external configuration of providers and credentials (#3638)
 - fix(boot2): kebab-case dynamic properties (#3679)
 - fix(runJob): fix v1 job collection (#3676) (#3677)
 - fix(runJob): fix v1 job collection (#3676)
 - fix(provider/azure): fail to delete application for azure (#3671)
 - fix(appengine): Allow gcloud path to be configured (#3674) (#3675)
 - fix(appengine): Allow gcloud path to be configured (#3674)
 - feat(titus) : Return ServiceJobProcesses details for titus jobs (#3653)
 - fix(cf): separate ci build and artifact info (#3670) (#3672)
 - fix(cf): separate ci build and artifact info (#3670)
 - fix(provider/kuberneteres): can not load servergroup when dnsPolicy is set as 'None'. (#3663) (#3667)
 - fix(provider/kuberneteres): can not load servergroup when dnsPolicy is set as 'None'. (#3663)
 - fix(logging): add logstash-logback-encoder to runtimeClasspath (#3666)
 - test(*): Fix startup test (#3664)


#### Deck  - a7c50c6...39a74be
 - fix(core): Prevent reloads when hitting enter in create pipeline modal (#7277) (#7278)
 - fix(appengine): handle multiple cluster accounts in server group modal (#7265) (#7269)
 - fix(k8s/runJob): Allowing only v1 accounts for v1 runJob (#7258) (#7259)
 - fix(k8s): fix job log modal overflow (#7256) (#7257)
 - fix(k8s): fix bake manifest selector (#7249) (#7250)
 - fix(k8s/runJob): null property file if value none (#7243) (#7246)
 - fix(ssl/apache2): Port conflict in ports.conf.gen (#7225) (#7233)
 - fix(core): Render templated pipeline params in the pipeline run stage (#7228) (#7231)
 - fix(google): replace stateful MIG image input with dropdown (#7210) (#7227)
 - fix(core): Render template triggers, notif, params for manual execution (#7223) (#7224)
 - fix(tests): functional test clone form locators to match new reality (#7215) (#7216)
 - perf(google): improve performance of GCE image selection (#7208) (#7209)
 - fix(executions): Correctly populate trigger when rerunning an execution (#7205)
 - feat(google): support stateful MIG operations (#7196)
 - chore(core): Bump version to 0.0.389 (#7204)
 - refactor(core): export ExecutionsTransformer in core module (#7203)
 - chore(titus): Bump version to 0.0.103 (#7202)
 - fix(titus): fix resize from Server Group Actions menu (#7201)
 - Bump package core to 0.0.388 and amazon to 0.0.201 (#7200)
 - feat(amazon): allow custom help message on scaling policy selection modal (#7199)
 - fix(core): correctly compute pipeline graph scroll position (#7198)
 - fix(amazon): Disallow enable instance in a disabled server group (#7197)
 - chore(core): Bump version to 0.0.387 (#7195)
 - fix(core): consider stage count when hydrating executions (#7194)
 - chore(core): Bump version to 0.0.386 (#7193)
 - fix(core): check stage label hydration status when mousing over (#7192)
 - chore(core): Bump version to 0.0.385 (#7191)
 - fix(core): fix overrideTimeout behavior on existing stages (#7190)
 - fix(core): fix flickering render of stage labels on hydration (#7181)
 - chore(core): Bump version to 0.0.384
 - feat(gce): Support new artifact model for deploy SG (#7178)
 - fix(executions): Clarify why executions are NOT_STARTED (#7183)
 - fix(core/pipeline): Change 'pipelines' state to redirect to the default child 'executions' ... instead of having an abstract state
 - chore(ecs): Bump version to 0.0.250
 - chore(titus): Bump version to 0.0.102
 - chore(amazon): Bump version to 0.0.200
 - chore(appengine): Bump version to 0.0.7
 - chore(cloudfoundry): Bump version to 0.0.92
 - chore(google): Bump version to 0.0.7
 - chore(kubernetes): Bump version to 0.0.25
 - chore(core): Bump version to 0.0.383
 - refactor(core/serverGroup): Extract capacity details components to reuse across providers (#7182)
 - refactor(titus/serverGroup): Reactify Titus Resize Server Group Modal (#7175)
 - Bump package core to 0.0.382 and amazon to 0.0.199 (#7179)
 - fix(kubernetes): Fix link to strategic merge patch docs (#7177)
 - feat(trigger): Allow entry of explicit build number (#7176)
 - fix(ecs): Disable artifact selection outside of pipelines (#7170)
 - fix(ecs): Set viewState.mode when creating server group for pipeline (#7169)
 - fix(pipeline): Fixed stage config for faileventual (#7174)
 - feat(core/task): UserVerification: Accept an 'account' prop. (#7173)
 - refactor(core/serverGroup): Extract MinMaxDesiredChanges component (#7171)
 - chore(core): Bump version to 0.0.381 (#7172)
 - fix(core): correctly build permalinks for executions (#7167)
 - feat(esc): Add support for task definition artifacts (#7162)
 - fix(core/managed): add docs link to managed infra indicator (#7166)
 - refactor(core/presentation): Refactor FormField components using hooks (#7148)
 - chore(titus): Bump version to 0.0.101 (#7165)
 - fix(runjob): Fixing security group matching by name (#7164)
 - Bump package core to 0.0.380 and docker to 0.0.43 and amazon to 0.0.198 and titus to 0.0.100 (#7163)
 - feat(docker): allow extra inline help on tag selector (#7143)
 - fix(titus): allow security group in cluster config by name (#7160)
 - feat(core/amazon): add a visual indicator to infra managed by Keel (#7161)
 - Bump package core to 0.0.379 and amazon to 0.0.197 (#7159)
 - fix(core/pipeline): When a pipeline or jenkins parameter is no longer accepted by the job/pipeline, show the parameter value (in addition to the name) in the warning message. (#7149)
 - fix(core): fix alignment on cards in card choices (#7158)
 - chore(amazon): Bump version to 0.0.196 (#7157)
 - fix(amazon): attach instanceId as id field on standalone instance details (#7156)
 - feat(cfn/changesets): Introduce support for CFN changesets (#7071)
 - Bump package core to 0.0.378 and amazon to 0.0.195 (#7155)
 - fix(core): properly update execution permalink on location change (#7152)
 - fix(projects): Fixed project dashboard to application link (#7154)
 - fix(amazon): Fix SpEL support for load balancers (#7151)
 - feat(appengine): Enable new artifacts for config artifacts in deploy SG (#7153)
 - feat(appengine): Enable new artifacts workflow in deploy SG (#7147)
 - feat(k8s): Enable new artifacts workflow in Patch Manifest (#7109)
 - Bump package core to 0.0.377 and docker to 0.0.42 and amazon to 0.0.194 (#7150)
 - refactor(core): virtualize execution rendering (#7140)
 - feat(core): allow users to override pipeline graph positions (#7141)
 - fix(core): do not send a cloud provider on v2 search calls (#7142)
 - chore(core): clarify clone stage help text (#7131)
 - fix(core): Display latest template in pipeline template list (#7145)
 - fix(webhooks): addresses issue 3450 - introduce a delay before polling webhook (#7144)
 - feat(core): Enable new artifacts workflow in bakeManifest (#7138)
 - feat(artifacts): find multiple artifacts from single execution (#7139)
 - fix(ecs): add missing context images when building new server group for pipeline (#7123)
 - fix(core): provide key for repeating param JSX elements (#7136)
 - feat(cf): "Run Job" stage support for CloudFoundry (#7119)
 - fix(core): filter falsy error messages from errors object on tasks (#7135)
 - refactor(core): Reactify overrideTimeout (#7126)
 - feat(core/presentation): Always call onBlur in Checklist to "mark as touched" (#7134)
 - chore(package): Just Update Prettier™
 - chore(prettier): upgrade to prettier@1.18.2, pretty-quick@1.11.1
 - feat(prettier): Add prettier command to package.json npm scripts
 - fix(amazon): Support SpEL in advanced capacity (#7124)
 - chore(deck): Update to Typescript 3.4
 - fix(kubernetes): use cncf approved svg (#7130)
 - fix(core): do not stretch provider logos in selection modal (#7128)
 - chore(core): Bump version to 0.0.376 (#7129)
 - fix(pipeline): fix invisible parameter when default is not in options (#7125)
 - fix(core/pipeline): stop searching stage context, being greedy about parentExecutions (#7127)
 - fix(core): do not inject default execution window values on render (#7122)
 - fix(core/pipeline): use correct visibility default for stage durations (#7121)
 - fix(docker): Allow auto-switch to manual entry when refreshing images (#7120)
 - refactor(stages): Fixed alias matching, added fallback and unit tests (#7080)
 - refactor(core): Reactify ExecutionWindows component (#7113)
 - chore(deps): bump @spinnaker/kayenta from 0.0.81 to 0.0.82 (#7103)
 - fix(artifact): use artifact icons in server group link (#7118)
 - fix(tests): change query param for gce deck functional tests (#7117)
 - feat(provider/azure): Enable data disk for server group (#7116)
 - perf(google): avoid unnecessary fetching and filtering of gce images (#7115)
 - fix(forms): Fixed SpelText not firing onChange upon autocomplete (#7114)
 - refactor(core): reactify overrideFailure component (#7107)
 - fix(core): Make template table list scrollable (#7111)
 - fix(core): Display template inherited items (mptv2) as read only (#7102)
 - fix(*): Fix build_order.sh edge case when only publishing core
 - chore(core): Bump version to 0.0.375 (#7108)
 - fix(google): allow SpEL in stack/detail in deploy stage (#7105)
 - fix(core): fix auto-navigation on route=true searches (#7092)
 - refactor(core): reactify pipelineRoles component (#7104)
 - refactor(cf): use new inline RadioInput (#7085)
 - fix(google): Help text on GCE load balancer type selection screen (#7044)
 - fix(cf): Assuming valid appsManager and metrics URLS (#7100)
 - chore(build/azure): made azure follow module conventions
 - fix(provider/azure): fix missing closing tag (#7099)
 - fix(publish): Change instruction text to use 'Rebase and merge' instead of squash
 - fix(kubernetes): fix req. artifacts to bind selector in patch manifest stage (#7095)
 - chore(ecs): Bump version to 0.0.249
 - chore(titus): Bump version to 0.0.99
 - chore(amazon): Bump version to 0.0.193
 - chore(appengine): Bump version to 0.0.6
 - chore(cloudfoundry): Bump version to 0.0.91
 - chore(google): Bump version to 0.0.6
 - chore(kubernetes): Bump version to 0.0.24
 - chore(oracle): Bump version to 0.0.2
 - chore(core): Bump version to 0.0.374
 - fix(publish): Fix build_order.sh publish script to correctly order implicit inner dependencies such as docker (#7093)
 - fix(cf): Change CUPS label to Route Service URL (#7090)
 - refactor(*): make accountExtractor return an array of strings (#7068)
 - chore(deps): bump @spinnaker/kayenta from 0.0.79 to 0.0.81 (#7086)
 - fix(deps): hoist appropriate version of d3-format (#7084)
 - feat(core/presentation): support JSX for validationMessage in FormFields (#7083)
 - feat(provider/azure): Enable dns label (#7065)
 - fix(core): Disable rewriteLinks to allow proper event handling (#7064)
 - feat(executions): Adding redirect for execution without application (#7076)
 - feat(core/presentation): Add "success" type to ValidationMessage (#7082)
 - refactor(core/presentation): Consolidate Checklist and ChecklistInput components (#7077)
 - feat(core/presentation): Support inline radio buttons (#7078)
 - fix(provider/azure): Fail to run pipeline at WaitForUpInstance task (#7081)
 - refactor(titus): Moving constraints from lists to maps (#7069)
 - chore(kubernetes): Bump version to 0.0.23 (#7073)
 - fix(triggers): Poll on execution id instead of event id (#7067)
 - refactor(pipeline): Pipeline stage execution details to react (#7063)
 - Bump package core to 0.0.373 and docker to 0.0.41 and titus to 0.0.98 (#7066)
 - feature(cf): server group details creation timestamp links to pipeline (#7062)
 - fix(runJob/kubernetes): reliably display logs (#7060) (#7061)
 - fix(runJob/kubernetes): reliably display logs (#7060)
 - fix(cf): fix deploy service manifest artifact selection (#7059)
 - fix(provider/azure): Fix UI for Azure Load Balancer in server group configuration (#7055) (#7057)
 - refactor(core): allow checklist component to accept objects as a prop (#7058)
 - refactor(core): expose clusterService in react injector (#7043)
 - fix(provider/azure): Fix UI for Azure Load Balancer in server group configuration (#7055)
 - fix(core): Build triggers: Properly render large number of jobs (#7056)
 - chore(core): remove angular-cron-gen from package.json (#7052)
 - fix(artifacts/helm): support regex/spel in version (#7033)
 - fix(docker): Fixed imageId parsing and digest support (#7053)
 - fix(runJob/kubernetes): use explicit pod name (#7039) (#7047)
 - chore(amazon): Bump version to 0.0.192 (#7051)
 - fix(amazon): do not set target group errors to falsy values (#7050)
 - chore(core): Bump version to 0.0.372 (#7049)
 - fix(core): set runAsUser field correctly on triggers (#7048)
 - fix(runJob/kubernetes): use explicit pod name (#7039)
 - fix(kubernetes): fix runjob stage init (#7029) (#7031)
 - fix(core): allow clearing of run as user field in triggers (#7045)
 - refactor(core): reactify CRON trigger (#7020)
 - feat(cf): Accepting both JSON and YAML in the Deploy Service Configuration stage `parameters` field (#7042)
 - Bump package core to 0.0.371 and docker to 0.0.40 and amazon to 0.0.191 (#7041)
 - feat(core): allow any json subtypes in API response (#7040)
 - fix(core/amazon): validate target group healthcheck fields (#6962)
 - fix(core): blur active element when rendering task monitor (#7034)
 - fix(docker): Stop losing manually defined imageId (#7037)
 - fix(core): unwrap font-awesome span from button label (#7032)
 - feat(amazon): remove s3 as store type option for baking (#7035)
 - fix(cf): server group header build links should precede images (#7027) (#7038)
 - fix(cf): server group header build links should precede images (#7027)
 - fix(executions): Fixed missing account tags in standalone (#7036)
 - fix(artifact/helm): fix version list (#7030)
 - fix(kubernetes): fix runjob stage init (#7029)
 - fix(chaos): Stack and detail are actually not required (#7028)
 - fix(authz): Handle apps without execute permissions (#7017) (#7025)
 - refactor(core): minor fixes to the refactored triggers (#7024)
 - fix(authz): Handle apps without execute permissions (#7017)
 - fix(kubernetes): Fix NPE in bake manifest details (#7022) (#7023)
 - fix(kubernetes): Fix NPE in bake manifest details (#7022)
 - chore(core): Bump version to 0.0.370 (#7021)
 - fix(core/pipeline): fix type mismatch in pipeline trigger, broken webhook trigger (#7018)
 - feat(provider/kubernetes): namespace deployManifest (#7016)
 - refactor(kubernetes): namespace selector component (#7012)
 - fix(artifacts): Artifacts are shown on pipeline execution when artifactsRewrite is enabled (#6973) (#7014)
 - refactor(kubernetes): convert deploy manifest stage to react (#7002)
 - fix(artifacts): Artifacts are shown on pipeline execution when artifactsRewrite is enabled (#6973)
 - fix(core): Hide "Run as user" when using managed service users (#7013)
 - chore(core): Bump version to 0.0.369 (#7010)
 - fix(core): do not automatically inject parameterConfig on pipelines (#7009)
 - chore(core): bump package to 0.0.368 (#7008)
 - fix(core): provide formatLabel option for all trigger types (#7007)
 - fix(core): request project pipeline configs just in time (#6980) (#7006)
 - chore(core): Bump version to 0.0.367 (#7004)
 - fix(core): do not validate pipeline configs before initialization (#7003)
 - fix(artifacts): Fix fetching helm artifact versions (#6995) (#6998)
 - Bump package core to 0.0.366 and titus to 0.0.97 (#7001)
 - feat(titus): Render run job output file as YAML (#6992)
 - fix(core): filter empty URL parts in ApiService, do not next scheduler on unsubscribe (#7000)
 - Bump package core to 0.0.365 and docker to 0.0.39 (#6997)
 - fix(core): request project pipeline configs just in time (#6980)
 - fix(core): include un-run pipelines when filtering by text (#6979)
 - fix(core): set graph label node height correctly (#6993)
 - fix(artifacts): Fix fetching helm artifact versions (#6995)
 - refactor(core): add React Components for PageSection and PageNavigator (#6926)
 - fix(cf): add Artifactory link (#6994) (#6996)
 - fix(cf): add Artifactory link (#6994)
 - chore(core): remove hipchat notification module (#6884)
 - fix(*): Fix imports (#6991)
 - refactor(core): Convert most triggers from angular to react
 - chore(amazon): Bump version to 0.0.190 (#6990)
 - fix(amazon): explicitly import d3 for scaling policy graphs (#6989)

#### Echo  - afcbb51...4aae0bc
 - chore(dependencies): Autobump korkVersion (#601)
 - fix(bitbucket): typo on eventType switch (#591) (#594)
 - chore(dependencies): Autobump korkVersion (#599)
 - fix(bitbucket): use equals for string comparison on event_type (#600)
 - fix(bom): Fix generated pom.xml to omit invalid lombok declaration (#596)
 - fix(cron): add trigger id to pipeline execution logs (#598)
 - fix(scheduler): Set instanceid to AUTO for clustered mode support (#595)
 - fix(webhooks): Test for empty ref on Git hooks (#590)
 - fix(cron): fix to not fire the same cron job on multiple instances (#592)
 - fix(kork_update): bump kork to 5.8 and fix pipeline model (#593)
 - fix(bitbucket): typo on eventType switch (#591)
 - fix(notifications): Need to maintain enum order (#589)
 - chore(intellij): Add IDEA project files. (#586)
 - fix(bitbucket): Log when Bitbucket event unknown (#581)
 - fix(build): replace references to removed init-publish.gradle in Dockerfile (#580)
 - chore(dependencies): Autobump korkVersion (#579)
 - feat(echo-bom): publish echo-bom (#578)
 - chore(dependencies): Autobump korkVersion (#577)
 - chore(dependencies): Autobump korkVersion (#576)
 - fix(webhooks): bitbucket server or cloud determination (#572) (#575)
 - fix(webhooks): bitbucket server or cloud determination (#572)
 - chore(dependencies): Autobump korkVersion (#573)
 - chore(dependencies): kork 5.4.8, fiat 1.1.0 (#571)
 - chore(dependencies): Autobump korkVersion (#568)
 - fix(awspubsub): add error logging (#569)
 - chore(dependencies): Autobump korkVersion (#567)
 - chore(dependencies): Autobump korkVersion (#566)
 - chore(dependencies): Autobump korkVersion (#565)
 - feat(pipelinetriggers): Support client-provided execution ID for pipeline triggers (#563)
 - feat(cron): echo-scheduler SQL (#561)
 - fix(auth): propagate MDC across the thread boundary for pipeline execution (#560)
 - chore(dependencies): Autobump korkVersion (#559)
 - chore(dependencies): Autobump korkVersion (#558)
 - fix(logging): add fabulous logging for when pipelines fail to trigger (#555)
 - fix(webhooks): handle NPE when source invalid (#552) (#553)
 - fix(webhooks): handle NPE when source invalid (#552)
 - chore(dependencies): externalize versions to properties (#550)
 - fix(cron): Correctly detect if an expression is fuzzy or not (#549)
 - chore(hipchat): remove Hipchat integration (#533)

#### Fiat  - ff44172...fced26e
 - fix(logs): add logback-encoder to classpath (#441) (#447)
 - chore(dependencies): Autobump korkVersion (#438)
 - chore(dependencies): Autobump korkVersion (#432)
 - fix(bom): Fix generated pom.xml to omit invalid lombok declaration (#437)
 - fix(core): add null check to auth in FiatPermissionEvaluator.getUsername (#435) (#436)
 - fix(core): add null check to auth in FiatPermissionEvaluator.getUsername (#435)
 - fix(core): add back isEnabled check to hasPermission method to prevent NPEs (#433) (#434)
 - fix(core): add back isEnabled check to hasPermission method to prevent NPEs (#433)
 - chore(dependencies): Autobump korkVersion (#431)
 - feat(fiat-bom): publish fiat-bom (#429)
 - feat(igor): only poll igor if it is enabled (#428)
 - chore(dependencies): Autobump korkVersion (#427)
 - chore(dependencies): Autobump korkVersion (#426)
 - chore(dependencies): Autobump korkVersion (#425)
 - chore(dependencies): Autobump korkVersion (#423)
 - chore(dependencies): kork 5.4.8 (#422)
 - fix(redis): mitigate JedisPool depletion (#419)
 - chore(dependencies): Autobump korkVersion (#418)
 - chore(dependencies): Autobump korkVersion (#417)
 - chore(dependencies): Autobump korkVersion (#416)
 - chore(dependencies): Autobump korkVersion (#415)
 - fix(apps): Clear resource provider caches to ensure up-to-date data (#413)
 - chore(dependencies): Autobump korkVersion (#411)
 - fix(apps): Clear resource provider caches to ensure up-to-date data (#409)
 - chore(dependencies): Autobump korkVersion (#410)
 - chore(dependencies): externalize versions to properties (#408)

#### Front50  - 0540599...e6c5f94
 - chore(dependencies): Autobump korkVersion (#555)
 - fix(sql): Remove pinned jooq
 - feat(sql): preparing sql backend for upstream
 - fix(sql): Treat a 404 from listObjectVersions() as `debug` vs `error`
 - feat(sql): Migrate from mariadb to hikaricp
 - feat(sql): Cleanup insert/update usage
 - feat(sql): Support ENTITY_TAGS writes to primary and previous storage services
 - feat(sql): Set initial delay for `migrateEntityTags()`
 - feat(sql): Support for migrating entity tags
 - fix(sql): Ensure that the columns are kept in sync with `body`
 - feat(sql): Ability to enable/disable `StorageServiceMigrator` via FP or YAML
 - fix(sql): Simple tests for SqlStorageService.loadObjects()
 - fix(s3): Add `front50-sql-mariadb` to settings.gradle
 - feat(s3): Add front50-sql-mariadb
 - fix(sql): Support for a new `sqlValidation` stack
 - fix(sql): Add is_deleted_idx
 - fix(sql): Cleanup orphans less agressively during migration
 - fix(sql): Slightly more buffer when migrating s3 objects
 - fix(sql): Avoid migrating objects solely due to s3 precision loss
 - fix(sql): `last_modified_at` should be updated when a record is deleted
 - fix(sql): `listObjectVersions()` should return a `mutableListOf()``
 - fix(sql): Properly apply `maxResults` in `listObjectVersions()`
 - feat(sql): For now, don't persist ENTITY_TAGS to sql.
 - feat(sql): `StorageServiceMigrator` support for deleting orphaned records
 - feat(sql): Adjust sql jdbc connection params
 - feat(sql): `compositeStorageService.read` gauge
 - feat(sql): Support for finer grained toggling of where reads should be sent
 - fix(sql): Some additional tests and fixed for `front50-sql`
 - feat(sql): CompositeStorageService should log NotFoundException at DEBUG
 - feat(sql): Flipped over to the mariadb driver and jdbc urls
 - feat(sql): CRUD Tests for SqlStorageService
 - Revert "feat(sql): CRUD Tests for SqlStorageService"
 - feat(sql): CRUD Tests for SqlStorageService
 - feat(sql): Support for a SQL `StorageService` implementation
 - chore(dependencies): Autobump korkVersion (#550)
 - fix(bom): Fix generated pom.xml to omit invalid lombok declaration (#552)
 - fix(core): A better case insensitive comparison when bulk loading objects (#551)
 - chore(dependencies): Autobump korkVersion (#549)
 - feat(front50-bom): publish front50-bom (#547)
 - chore(dependencies): Autobump korkVersion (#546)
 - feat(core): Support for `loadObjects` (#545)
 - chore(dependencies): Autobump korkVersion (#544)
 - chore(dependencies): Autobump korkVersion (#543)
 - chore(dependencies): Autobump korkVersion (#542)
 - chore(dependencies): kork 5.4.8, fiat 1.1.0 (#541)
 - chore(dependencies): Autobump korkVersion (#539)
 - chore(dependencies): Autobump korkVersion (#538)
 - chore(dependencies): Autobump korkVersion (#537)
 - chore(dependencies): Autobump korkVersion (#536)
 - feat(s3): Support for disabling s3 eventing on a per-ObjectType basis (#534)
 - fix(core): Provide a multi-thread capable `taskScheduler` (#533)
 - chore(dependencies): Autobump korkVersion (#532)
 - chore(dependencies): Autobump korkVersion (#531)
 - fix(core): Ensure lastModified and lastModifiedBy is set on item (#530)
 - chore(front50/oracle): Get the Oracle API jar from Maven. (#529)
 - chore(dependencies): externalize versions to properties (#528)
 - fix(core): Switch location to additional-location (#527)
 - chore(boot2): Upgrading front50 to Spring Boot 2 (#526)

#### Gate  - 97f6477...193c7b9
 - fix(auth): Enable auth to all connectors except API port (1.15.x) (#858)
 - fix(auth): Enable auth to all connectors except API port (1.14.x) (#857)
 - chore(dependencies): Autobump korkVersion (#851)
 - chore(build): Remove init-publish script (#850)
 - chore(dependencies): Autobump korkVersion
 - fix(bom): Fix generated pom.xml to omit invalid lombok declaration compileOnly dependency should not be added to generated pom.xml, see discussion: https://discuss.gradle.org/t/publishing-plugin-should-respect-compileonly-configuration/22903/2 see related commit: nebula-plugins/nebula-publishing-plugin@a5432aa
 - feat(web): Include `requestUserAgent` and `requestPort` in request log (#843)
 - fix(json): json is returned as the default for controllers (#842)
 - feat(keel): add yaml processing (#841)
 - feat(md): crud of resources (#840)
 - fix(web): Better merging of `/applications/{app}?expand=false` responses (#839)
 - feat(web): Add 'requestDuration' to MDC (#838)
 - feat(artifacts): add optional release status param to fetching artifacts (#837)
 - feat(history): expose keel history api (#835)
 - chore(dependencies): Autobump korkVersion (#834)
 - chore(dependencies): Autobump korkVersion (#833)
 - feat(oauth): add retry/legacyFallback support (#831)
 - feat(oauth2): support roles from userInfo mapping (#830)
 - fixup! feat(gate-bom): publish gate-bom
 - feat(gate-bom): publish gate-bom
 - chore(dependencies): Autobump korkVersion (#828)
 - fix(ldap): allow http basic credentials for LDAP auth (#826) (#827)
 - fix(ldap): allow http basic credentials for LDAP auth (#826)
 - chore(dependencies): fix for intellij groovy compiler (#825)
 - chore(dependencies): Autobump korkVersion (#824)
 - chore(dependencies): Autobump korkVersion (#823)
 - chore(dependencies): Autobump korkVersion (#822)
 - chore(dependencies): kork 5.4.8, fiat 1.1.0 (#821)
 - chore(dependencies): Autobump korkVersion (#819)
 - chore(core): replace runtime with runtimeOnly in build.gradle (#818)
 - chore(dependencies): Autobump korkVersion (#817)
 - feat(fiat): for x509 users, add roles read from fiat on login (#816)
 - chore(dependencies): Autobump korkVersion (#815)
 - chore(*): Kork bump (#814)
 - fix(pipelines): V2 trigger API now correctly returns an execution reference (#811)
 - chore(tags): add swagger annotation (#810)
 - fix(saml): ensure session cookie survives idp redirect (#801) (#809)
 - fix(oauth): remove samesite cookie attribute (#803) (#808)
 - chore(dependencies): Autobump korkVersion
 - chore(dependencies): Autobump korkVersion (#805)
 - chore(dependencies): externalize versions to properties (#804)
 - feat(bakery): Add rosco service selector (#800)
 - fix(oauth): remove samesite cookie attribute (#803)
 - fix(firewalls): enable retrieval of all firewalls in an account+region (#793)
 - fix(saml): ensure session cookie survives idp redirect (#801)

#### Igor  - b3f354f...3245969
 - chore(dependencies): Autobump korkVersion (#474)
 - chore(dependencies): Autobump korkVersion (#470)
 - fix(bom): Fix generated pom.xml to omit invalid lombok declaration (#473)
 - chore(gradle): Upgrade the Spinnaker gradle plugin (#472)
 - feat(travis): Support for log_complete from Travis API (#449)
 - feat(artifacts): allow release status to be propagated to artifact service (#471)
 - chore(dependencies): Autobump korkVersion (#466)
 - fix(gcb): Correctly fetch artifact manifest when it contains a version (#468)
 - feat(igor-bom): publish igor-bom (#464)
 - chore(dependencies): Autobump korkVersion (#463)
 - chore(dependencies): Autobump korkVersion (#461)
 - fix(boot2): Allow paths with URL-encoded slashes (#454)
 - fix(gitlab): Don't send events to echo if not enabled (#462)
 - chore(dependencies): Autobump korkVersion (#460)
 - chore(dependencies): kork 5.4.8, fiat 1.1.0 (#459)
 - chore(dependencies): kork 5.4.8 (#457)
 - chore(dependencies): Autobump korkVersion (#455)
 - chore(dependencies): Autobump korkVersion (#453)
 - chore(dependencies): Autobump korkVersion (#452)
 - chore(auth): Allow anonymous requests from Igor to Echo (#447)
 - chore(dependencies): Autobump korkVersion (#451)
 - fix(artifactory): correctly construct Artifactory URL (#446)
 - chore(dependencies): Autobump korkVersion (#445)
 - chore(dependencies): Autobump korkVersion (#444)
 - chore(dependencies): externalize versions to properties (#443)
 - feat(artifactory): add link to artifactory app for artifact (#439) (#440)
 - feat(artifactory): add link to artifactory app for artifact (#439)

#### Kayenta  - dd8a91d...6a3c60f
 - fix(typeahead/prometheus): Consider account name when querying metadata. (#598) (#601)
 - fix(kayenta): remove spring-boot-properties-migrator from depedencies as not needed after migration to Spring Boot 2 (#581)
 - fix(kayenta): Fixes generated pom.xml to omit invalid declaration of lombok (#582)
 - fix(templates): Escape custom inline templates. (#579) (#580)
 - feat(kayenta): Provide autoconfigurations for all Kayenta integration modules (#577)
 - fix(kayenta): Generated poms have all dependencies in runtime scope (#572)
 - feat(aws): support explicit AWS credentials (#576)
 - fix(templates): Escape custom inline templates. (#579)
 - fix(config): Do not override default Spring config locations. (#575)
 - fix(core): Re-enable resolvedEnv endpoint. (#574)
 - fix(kayenta): Fix management endpoints configuration after migration to Spring Boot 2 (#567)
 - feat(signalfx): Add configurable remote baseurls to support realms. (#551) (#566)
 - feat(kayenta-bom): publish kayenta-bom (#565)
 - chore(dependencies): Autobump korkVersion (#561)
 - chore(dependencies): Autobump korkVersion (#560)
 - chore(dependencies): Autobump korkVersion (#558)
 - chore(dependencies): Autobump korkVersion (#555)
 - chore(dependencies): Autobump korkVersion (#552)
 - feat(signalfx): Add configurable remote baseurls to support realms. (#551)
 - chore(core): replace runtime with runtimeOnly in kayenta-web.gradle (#550)
 - chore(dependencies): Autobump korkVersion (#548)
 - chore(dependencies): Autobump korkVersion (#547)
 - chore(dependencies): update to spring-boot 2 and dependency management via kork-BOM (#543)
 - chore(dependencies): Autobump korkVersion (#546)
 - fix(datadog): Create metricset placeholder (#534) (#535)
 - fix(datadog): Create metricset placeholder (#534)

#### Orca  - 3888a93...2661d79
 - fix(core): update validaton to exclude hyphenated variable names (#3066) (#3068)
 - fix(core): update validaton to exclude hyphenated variable names (#3066) (#3067)
 - fix(core): Plan templated pipelines before triggering from start tasks (#3039) (#3048)
 - fix(core): Plan templated pipelines before triggering from start tasks (#3039) (#3046)
 - feat(aws): Support new artifact model for deploy cloudformation (#3022)
 - chore(dependencies): Autobump korkVersion (#3028)
 - fix(queue): Propagate auth context on CancelStageHandler (#3027)
 - fix(webhook-task): replace deprecated method for json parsing (#3026)
 - chore(dependencies): Autobump korkVersion (#3025)
 - fix(bom): Fix generated pom.xml to omit invalid lombok declaration (#3017)
 - feat(ecs): Add support for task definition artifacts (#3016)
 - feat(core): Support deserializing `Execution.initialConfig` (#3019)
 - feat(gce): Support new artifact model for deploy SG (#3018)
 - chore(dependencies): Autobump korkVersion (#3009)
 - fix(exceptions): don't let `null` strings leak into errors field (#3021)
 - fix(bake): Lookup artifact details from all upstream stages (#3011)
 - feat(cfn/changesets): introduce support CFN change sets (#2950)
 - feat(appengine): Support new artifact model for configArtifacts in deploy SG (#3013)
 - fix(queue): After trying to start a queued execution that is CANCELED, check the pipeline queue for additional waiting executions (#3015)
 - fix(kubernetes): Fix NPE when traffic management not specified (#3014)
 - fix(k8s): fix deserialization for patchBody (#3012)
 - feat(gce): Add StatefullyUpdateBootDisk{Task,Stage} (#3007)
 - feat(k8s): Support new artifact model in Patch Manifest stage (#2982)
 - feat(appengine): Support new artifact model in deploy SG (#3008)
 - fix(task): FindArtifactFromExecutionTask no longer matches its own artifacts (#2992)
 - chore(dependencies): Autobump korkVersion (#3000)
 - feat(core): Support new artifact model in bake Manifest stage (#3005)
 - fix(webhooks): addresses issue 3450 - introduce a delay before polling wehook (#2984)
 - perf(kubernetes): WaitForManifestStableTask - don't check already comâ€¦ (#2998)
 - feat(artifacts): allow multiple artifacts in find artifact from execution stage
 - fix(front50): Handle failures in pipeline config history lookup (#3004)
 - feat(cf): "Run Job" stage support for CloudFoundry (#2987)
 - fix(findImageFromTags): don't fail on missing tags (#3002)
 - fix(front50): Handle failures in pipeline config history lookup (#3003)
 - feat(kubernetes): Skip loading events for manifest retrieval in WaitFâ€¦ (#2997)
 - feat(perf): Favor a single pipeline config lookup (#3001)
 - fix(cleanup): remove 2nd check on thresholdDays in old pipeline cleanup (#2948)
 - fix(expressions): Whitelist `DayOfWeek` enum for expressions
 - feat(orca-bom): publish orca-bom (#2995)
 - fix(jobs): fix race condition in override (#2994)
 - fix(pipelines): Fix pipeline triggers for some templated pipelines (#2963)
 - feat(bakery): Making bakery service selectable by parameters (#2973)
 - chore(dependencies): Autobump korkVersion (#2986)
 - fix(jobs): fix race condition in override (#2988)
 - feat(mptv1): Support templated stage IDs in looped stages (#2977)
 - feat(cloudformation): add stack as output of CFN stage (#2911)
 - fix(runJob): cancel underlying job on cancel stage (#2966)
 - fix(fromUrl): Better error message for redirects (#2978)
 - perf(artifacts): use pageSize=1 when resolving prior artifacts (#2955)
 - fix(findImage) : Fix findImage bug introduced in #2960 (#2980)
 - fix(core): Mark mptv2 items as inherited (#2971) (#2979)
 - fix(core): Mark mptv2 items as inherited (#2971)
 - Revert "fix(Orca): Feature: option to add a delay before polling starts in Webhook stage #3450 (#2974)" (#2976)
 - feat(pipeline/expressions): support yaml parsing (#2946)
 - fix(Orca): Feature: option to add a delay before polling starts in Webhook stage #3450 (#2974)
 - fix(gcb): Bind artifacts produced from GCB stage
 - fix(gcb): Bind artifacts produced from GCB stage
 - fix(spel): Fix NPE in SpEL evaluation
 - fix(findImage) : Fix child deploy to use correct find image when clouâ€¦ (#2960)
 - fix(RRB): Add dedicated pin stage (#2968)
 - chore(dependencies): Autobump korkVersion (#2970)
 - chore(dependencies): kork 5.4.8, fiat 1.1.0 (#2969)
 - chore(dependencies): Autobump korkVersion (#2964)
 - fix(zombie-check): make zombie check run regardless of instance status (#2962)
 - perf(artifacts): use pageSize=1 when resolving prior artifacts (#2955)
 - chore(dependencies): Autobump korkVersion (#2959)
 - fix issue 4469: orca-core skipping most tests in build (#2957)
 - fix(kubernetes): force cache refresh after deploy stage artifact cleanup
 - fix(kubernetes): force cache refresh after deploy stage artifact cleanup
 - fix(pipelines): save pipelines task shouldnâ€™t reuse pipeline id (#2951)
 - chore(*): Bump kork (#2954)
 - fix(sql): add precondition check to pipeline_config_id_idx migration (#2953)
 - fix(sql): optimize reading executions by pipeline id (#2949)
 - perf(orca): reuse ObjectMapper instances (#2937)
 - feat(core): Support client-provided execution IDs (#2945)
 - feat(aws/lambda): Lambda stage can handle arbitrary ops (#2943)
 - feat(sql): batch fetch stages (#2941)
 - fix(artifacts): Use client error code for multiple matching artifacts (#2942)
 - feat(aws/lambda): Add update lambda stage. (#2940)
 - feat(titus): UpdateJobProcesses Stage (#2934)
 - fix(config): fix bakery port in orca-web/config (#2936)
 - feature(cf): pass execution ID and trigger to server group creation (#2939)
 - fix(clouddriver): WaitForUpInstances should block on Starting health providers (#2935)
 - chore(dependencies): Autobump korkVersion (#2931)
 - chore(clouddriver): Use kork's `selectableService` (#2917)
 - chore(dependencies): Autobump korkVersion (#2930)
 - fix(wait for *): Allow min/max/desired to be strings (cos expressions)
 - chore(dependencies): externalize versions to properties (#2925)
 - fix(entitytags): correctly fetch prior asg details without depending on forceCacheRefresh (#2928)
 - fix(bake/rosco): fix regression in snake casing of rosco specific bake properties (#2926) (#2927)
 - fix(bake/rosco): fix regression in snake casing of rosco specific bake properties (#2926)
 - feat(clouddriver): favor configured capacity for certain operations (#2923)
 - perf(sql): Add indexes on correlated execution ids for faster deletes (#2924)
 - fix(executionprocessor): add @Order to execution processors (#2919)
 - fix(dynamicConfig): Removed rogue no-op service
 - fix(mptv1): revert back Jinjava to 2.2.3 (#2921)
 - fix(boot2): camel to kebab for fast properties (#2920)
 - fix(MPTv1): Fix template expansion (#2918)
 - chore(bakery): propagate auth context to bakery for logging (#2916)

#### Rosco  - 59f7929...f01311c
 - chore(dependencies): Autobump korkVersion (#395)
 - chore(dependencies): Autobump korkVersion (#393)
 - chore(*): Apply codestyles (#394)
 - refactor(core): Upgrade rosco to Spring Boot 2 (#392)
 - chore(dependencies): Autobump korkVersion (#391)
 - refactor(core): Use a rest controller for status endpoints (#388)
 - test(core): Fix tests that break with groovy upgrade (#390)
 - refactor(core): Convert package name logic to java (#389)
 - chore(dependencies): Autobump korkVersion (#385)
 - chore(dependencies): Autobump korkVersion (#384)
 - chore(dependencies): Autobump korkVersion (#383)
 - chore(dependencies): Autobump korkVersion (#379)
 - chore(dependencies): Autobump korkVersion (#378)
 - fix(bake): Improve error message (#375)
 - fix(artifacts): Fix NPE on empty artifact (#373) (#374)
 - fix(artifacts): Fix NPE on empty artifact (#373)
 - chore(packer): ability to add default packer options via spring config (#372)
 - chore(logging): propagate and log orca executionId (#371)
 - feat(aws): ability to lookup sourceAmi via dynamic configs (#370)
