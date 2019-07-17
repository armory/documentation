---
layout: post
title: v2.4.0 Armory Release (OSS Release 1.13.6)
order: -20190515204547
hidden: false
---

# 05/15/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
* SAML timeout cannot be overridden in this release

Please upgrade to `Armory Spinnaker 2.4.5`

## Highlighted Updates
### Armory

* Armory Spinnaker now supports managing secrets through [Vault's Kubernetes Auth Method](https://www.vaultproject.io/docs/auth/kubernetes.html)


###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release:  
[Spinnaker's v1.13.6](https://www.spinnaker.io/community/releases/versions/1-13-6-changelog)  

<br><br><br>
## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.4.0-rc78
timestamp: "2019-05-15 18:18:07"
services:
  clouddriver:
    version: 4.4.5-ccad514-a7ce3a5-rc24
  deck:
    version: 2.8.5-c7e8629-f9cc5a5-rc7
  dinghy:
    version: 0.0.3-91ae72b-rc15
  echo:
    version: 2.4.2-ae6694f-28bde7a-rc21
  fiat:
    version: 1.4.1-641cb40-13f855f-rc24
  front50:
    version: 0.16.2-18ed588-b796e80-rc20
  gate:
    version: 1.7.2-68ad717-28beaaa-rc22
  igor:
    version: 1.2.1-faf13ca-98de62d-rc22
  kayenta:
    version: 0.7.1-39c3a6b-f95afd1-rc22
  monitoring-daemon:
    version: 0.12.1-efa6f3f-edge1
  monitoring-third-party:
    version: 0.12.1-efa6f3f-edge1
  orca:
    version: 2.6.2-f1b82e2-92bc10d-rc20
  rosco:
    version: 0.11.0-e1fc510-95a2e29-rc22
  terraformer:
    version: 0.0.1-5f338d8-rc3
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - 03c1637...91ae72b
 - chore(refactor): Build off of OpenCore Dinghy (#167)
 - fix(security): bump alpine container version to fix CVE-2019-5021 (#166)

#### Terraformer&trade; - ed701ec...5f338d8
 - fix(security): bump alpine to fix CVE-2019-5021 (#55)

#### Armory Clouddriver  - ccad514
No Changes

#### Armory Deck  - 3278985...c7e8629
 - fix(security): bump alpine container version to fix CVE-2019-5021 (#504)
 - fix(build): Upgrade to OSS 1.13.x (#502)

#### Armory Echo  - 95870b0...ae6694f
 - chore(build): add armory-commons (#102)

#### Armory Fiat  - 641cb40
No Changes

#### Armory Front50  - 18ed588
No Changes

#### Armory Gate  - 68ad717
No Changes

#### Armory Igor  - cb9b244...faf13ca
 - chore(build): add armory-commons (#22)
 - fix(extension): Add properties map to GenericBuild (#21)

#### Armory Kayenta  - 39c3a6b
No Changes

#### Armory Orca  - f1b82e2
No Changes

#### Armory Rosco  - e1fc510
No Changes



###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release:  
[Spinnaker's v1.13.6](https://www.spinnaker.io/community/releases/versions/1-13-6-changelog)  

#### Clouddriver  - 44e0457...a7ce3a5
 - fix(provider/kuberneteres): can not load servergroup when dnsPolicy is set as 'None'. (#3663) (#3668)
 - fix(ecs): Retry on ECS service eventual consistency (#3628) (#3637)
 - fix(cf): previously unhandled exception from bad application state (#3631) (#3632)
 - fix(provider/kubernetes): Fix cache refresh timeout for HA clouddriver (#3600) (#3605)
 - fix(provider/google): Prevent returning all security groups targeting (#3593) (#3595)
 - fix(provider/google): Prevent returning all security groups targeting (#3593) (#3594)
 - fix(provider/google): Waits for ssl cert and url map ops. (#3583) (#3586)
 - fix(provider/google): Waits for ssl cert and url map ops. (#3583) (#3585)
 - fix(kubernetes): include unclassified kinds in spinnakerKindMap so they can be surfaced for deletion (#3580) (#3582)
 - fix(cf): cf exception should display message from throwable (#3556) (#3560)
 - fix(cf): handle timeouts in CF api calls better (#3557) (#3559)
 - fix(kubernetes): Initialize credentials after CRDs are registered (#3563) (#3565)
 - fix(google): correctly filter instanceCacheData in GoogleClusterProvider.clusterFromCacheData (#3562) (#3564)
 - fix(cf): donâ€™t attempt to start app if instance count is 0 (#3555) (#3558)
 - fix(cf): Fix server group name resolver (#3549) (#3550)
 - fix(provider/cf): Get latest server group from API rather than cache (#3541) (#3548)
 - fix(provider/cf): Fix clone from manifest artifact (#3540) (#3546)
 - fix(provider/gce): Wait on LB backend service updates. (#3532) (#3536)
 - fix(provider/gce): Wait on LB backend service updates. (#3532) (#3534)
 - fix(cf): Clone server group sets environment variables in new server group (#3520) (#3527)
 - fix(provider/google): Paginates autoscaler aggregated list calls. (#3518) (#3523)
 - fix(provider/google): Paginates autoscaler aggregated list calls. (#3518) (#3522)
 - fix(core): add `cloudProvider` to `LoadBalancerServerGroup` as expected by deck (#3517) (#3519)
 - fix(cf): correct invalid route message (#3506) (#3507)
 - fix(provider/cf): Form-based manifest input for clone server group (#3496) (#3497)
 - fix(cf): Unmap LBs too aggressive (#3489) (#3493)
 - fix(cf): Remove "//" from routes (#3486) (#3488)
 - fix(kubernetes): Infer API version when missing on patch manifest (#3482) (#3483)
 - fix(cf): Destroy service should be idempotent (#3479)
 - fix(provider/kubernetes): Scope custom resource kinds by API group (#3003)
 - fix(provider/kubernetes): Properly set unstable flag for deployment (#3477) (#3478)
 - fix(provider/kubernetes): Properly set unstable flag for deployment (#3477)
 - fix(docker): fix gradle build step (#3475)
 - feat(cf): Add Updatable flag for services (#3474)
 - feat(amazon): delete snapshot atomic operation (#3470)
 - chore(dependencies): Autobump spinnaker-dependencies (#3471)
 - feat(provider/azure): Enable user agent (#3473)
 - fix(provider/azure): Failed to edit load balancer (#3472)
 - feat(core): add jenkins artifact type (#3469)
 - feat(provider/azure): Enable Ssh public key for VM provisioning (#3468)
 - fix(aws/cloudformation): Allow more generic failures to be displayed (#3318)
 - feat(provider/azure): Add availability zones in credential data structure (#3467)
 - feat(cf): Enable service sharing / unsharing (#3466)
 - test(provider/kubernetes): Add tests to valid kind checking (#3465)
 - chore(cf): remove usage of task fail and throw an exception (#3462)
 - fix(provider/kubernetes): Fix isValidKind (#3464)
 - fix(provider/gce): Use a concrete type for InstanceProperties. (#3463)
 - feat(aws/cloudformation): Allow on demand cache request/invalidation (#3295)
 - feat(cloudformation): support capabilities (#3458)
 - fix(cf): Provide error message for region case mismatch (#3406)
 - chore(kubernetes): Improved error messages on failing deployments (#3442)
 - fix(titus): fix wiring DynamicConfigService (#3461)
 - fix(titus): streaming updates cleanup tasks/instances (#3454)
 - feat(titus): dynamic config for streaming parameters (#3455)
 - fix(appengine): Allow suppression of sequence in deployed servergroup names (#3453) (#3457)
 - fix(appengine): Allow suppression of sequence in deployed servergroup names (#3453)
 - fix(provider/gce): Use concrete types rather than 'def' in name resolver. (#3451)
 - fix(aws): ensure any deployments objects are persisted (#3447)
 - feat(titus): Support deploying with a disruption budget (#3443)
 - fix(appengine): add configurable caching agent interval (#3446)
 - chore(provider/azure): Enable NSG source IP/CIDR filtering (#3439)
 - fix(aws): Log any `deployments` that were created via `BasicAmazonDeployHandler` (#3444)
 - refactor(cf): Adopt artifact model for deploy stages (#3438)
 - fix(provider/gce): Fix moniker recording in instance metadata. (#3441)
 - chore(dependencies): Autobump spinnaker-dependencies (#3440)
 - fix(provider/kubernetes): Support the renaming of the heptio-authenticator-aws to aws-iam-authenticator (#3316) (#3437)
 - feat(aws/cloudformation): Add task to deploy a cloudformation stack (#3280)
 - fix(provider/gce): Fix seqence generation for server groups. (#3434)
 - fix(build): make gradle use https (#3428)
 - feat(appengine): add configurable caching agent interval (#3433)
 - feat(provider/azure): Add instance type in credential data structure (#3432)
 - feat(cf): do not update service if unnecessary (#3416)
 - feat(cf): standardize exceptions when creating load balancer (#3426)
 - feat(cf): default env if not set for account (#3425)
 - feat(artifacts): Add docker and kubernetes artifact types (#3424)
 - feat(provider/gce): Moniker support for GCE server groups (#3258)
 - feat(provider/azure): Apply NSG to a custom subnet (#3422)
 - chore(core): Throw with underlying exception when LocalJobExecutor fails (#3423)
 - feat(provider/azure): Update Azure Java SDK from 1.0.0-beta to 1.19.0 (#3417)
 - fix(provider/azure): add support for Azure US Government environment (#3400) (#3418)
 - fix(titus): fix for null jobs that still have health objects (#3421)
 - fix(google): Fix search for Google provider (#3419) (#3420)
 - fix(google): Fix search for Google provider (#3419)
 - chore(dependencies): Autobump spinnaker-dependencies (#3415)
 - fix(provider/azure): add support for Azure US Government environment (#3400)
 - fix(provider/azure): respect vm scale set schema for custom extensions (#3395)
 - test(core): Simple startup integration test (#3414)
 - fix(core): Fix clouddriver startup (#3412)
 - fix(dependencies): have spinnaker-dependencies manage common-langs version (#3388) (#3410)
 - fix(dependencies): have spinnaker-dependencies manage common-langs version (#3388)
 - fix(cf): make start on creation flag work again (#3391)
 - feat(cf): rely on Spinnaker's timeouts (#3349)
 - chore(azure): remove useless secret from a comment (#3404)
 - fix(core/search): derive application accounts from clusters (#3398)
 - feat(amazon): auto-create app/elb security groups when creating ALBs (#3389)
 - feat(aws): Support for disabling an account (#3409)
 - fix(artifacts/github): Fix threading bug in github artifact resolver (#3386) (#3408)
 - fix(kubernetes/v2): Parallelize checking for omitKinds (#3366) (#3407)
 - fix(redis): Clean up embedded redis in tests (#3405)
 - fix(elasticsearch): Fix connection string for elasticsearch tests (#3403)
 - fix(openstack): Fix openstack unit tests (#3402)
 - fix(aws): ensure all cache types are stored authoritatively (#3401)
 - chore(dependencies): Autobump spinnaker-dependencies (#3399)
 - fix(kubernetes): return only valid kinds from UnregisteredCrdCachingAgent.primaryKinds (#3394) (#3397)
 - fix(kubernetes): return only valid kinds from UnregisteredCrdCachingAgent.primaryKinds (#3394)
 - fix(search/cats): Avoid short-circuiting when filters are empty. (#3393) (#3396)
 - fix(search/cats): Avoid short-circuiting when filters are empty. (#3393)
 - refactor(artifacts): Clean up Spring dependency injection (#3392)
 - fix(artifacts): Fix threading bug in HTTP artifact credentials (#3390)
 - fix(provider/kubernetes): Support the renaming of the heptio-authenticator-aws to aws-iam-authenticator (#3316)
 - fix(artifacts/github): Fix threading bug in github artifact resolver (#3386)
 - feat(cf): add clone SG pipeline stage (#3384)
 - fix(aws): Fallback if asg instances cannot be described (#3383)
 - chore(dependencies): Autobump spinnaker-dependencies (#3385)
 - feat(eureka): store instance to eureka health relationships (#3382)
 - fix(artifacts/front50): Fix serialization of artifacts (#3381)
 - fix(provider/kubernetes): Fix NPE on ingress with no http (#3379) (#3380)
 - fix(provider/kubernetes): Fix NPE on ingress with no http (#3379)
 - fix(provider/appengine): Fix NPE thrown when deploying GCS object using default creds (#3377) (#3378)
 - fix(provider/appengine): Fix NPE thrown when deploying GCS object using default creds (#3377)
 - fix(provider/azure): Remove Azure Load Balancer from Azure VM Scale Set (#3376)
 - fix(provider/kubernetes): Set podSecurityPolicy to not be namespaced (#3350) (#3374)
 - fix(provider/kubernetes) Set podSecurityPolicy to not be namespaced (#3350)
 - feat(artifacts/front50): First pass at front50 artifact support. (#3365)
 - fix(provider/kubernetes): Allow for custom suffix on managed-by label. (#3369) (#3373)
 - fix(provider/aws): change STS endpoints for GovCloud and China regions (#3352) (#3370)
 - fix(provider/gce): Fix metadata for autoscaler deletes. (#3368) (#3371)
 - chore(dependencies): Autobump spinnaker-dependencies (#3372)
 - feat(provider/kubernetes): Allow for custom suffix on managed-by label. (#3369)
 - fix(provider/gce): Fix metadata for autoscaler deletes. (#3368)
 - fix(appengine): Fix appengine deployments (#3367)
 - chore(aws): update status with size on ASG creation (#3347)
 - fix(kubernetes/v2): Parallelize checking for omitKinds (#3366)
 - fix(titus): retry job submission for grpc internal errors (#3364)
 - refactor(core): Make JobExecutor synchronous (#3361)
 - chore(tasks): task completion read after write consistency (#3362)
 - feat(provider/azure): Use Azure Managed Disk instead of VHD when creating server group (#3317)
 - chore(cf): rename serviceName to serviceInstanceName (#3358)
 - feat(core): `DeploymentResult` support for returning target capacity (#3356)
 - chore(dependencies): Autobump spinnaker-dependencies (#3357)
 - chore(dependencies): Autobump spinnaker-dependencies (#3355)
 - feat(cf): Add CF provider support to Halyard (#3353)
 - fix(provider/aws): change STS endpoints for GovCloud and China regions (#3352)
 - fix(entitytags): Handle non-deserializable entity tags (#3351)
 - chore(dependencies): Autobump spinnaker-dependencies (#3344)
 - chore(test): coverage for cache.existingIdentifiers (#3346)
 - feat(entitytags): a simple `deleteByTag` admin api (#3348)
 - feat(cf): Map/Unmap SGs and LBs (#3345)
 - feat(cf): Add artifacts for user-defined services (#3343)
 - chore(dependencies): Autobump spinnaker-dependencies (#3342)
 - chore(*): Pin spring-boot-starter-test to springBoot version (#3336) (#3341)
 - chore(*): Pin spring-boot-starter-test to springBoot version (#3336)
 - fix(google): convert accelerator count to int from implicit double (#3340)
 - feat(amazon/loadBalancer): Support redirect action (#3339)
 - chore(dependencies): Autobump spinnaker-dependencies
 - feat(provider/kubernetes): recreate annotation support (#3332)
 - chore(google): Clean up clouddriver-google-common dependencies
 - chore(google): Bump clouddriver-google dependencies
 - chore(google): Bump appengine dependencies
 - feat(provider/titus): incrementally persist evented updates (#3326)
 - chore(dependencies): Autobump spinnaker-dependencies (#3333)
 - refactor(google): Clean up clouddriver-google dependencies (#3330)
 - fix(provider/kubernetes): fix NPE on KubernetesV2ServerGroup disabledâ€¦ (#3325) (#3331)
 - chore(dependencies): Bump spinnaker-dependencies (#3329)
 - fix(provider/kubernetes): fix NPE on KubernetesV2ServerGroup disabledâ€¦ (#3325)
 - refactor(cloudformation): rename cf model and use accountName instead of accountId (#3323)
 - chore(dependencies): Autobump spinnaker-dependencies (#3327)
 - refactor(google): Clean up clouddriver-google-common dependencies (#3324)
 - fix(titus/deploy): Throw job submit exception to get better context for failure in ui (#3310)
 - chore(dependencies): Autobump spinnaker-dependencies (#3321)
 - refactor(aws): Make cloudformation controllers consistent with rest of project (#3320)
 - feat(cats): improved support for incremental CacheResults (#3315)
 - fix(provider/kubernetes): events relate to cluster-scope objs (#3312) (#3314)
 - fix(aws): Support disabling cloud formation via `aws.features.cloudFormation` (#3319)
 - feat(aws/cloudformation): Add cloudformation controller (#3279)
 - fix(provider/kubernetes): events relate to cluster-scope objs (#3312)
 - chore(provider/kubernetes): add agent type to caching logs (#3307) (#3313)
 - fix(provider/titus): dont store ephemeral state in class vars (#3311)
 - fix(provider/titus): fix eviction of completed jobs (#3309)
 - fix(provider/titus): fix streaming agent poll interval (#3308)
 - chore(provider/kubernetes): add agent type to caching logs (#3307)
 - feat(aws/rolling push): support supplying user data when updating a launch configuration (#3305)
 - fix(provider/titus): factor result build time in stream update threshold (#3304)
 - chore(dependencies): Autobump spinnaker-dependencies (#3302) (#3303)
 - chore(dependencies): Autobump spinnaker-dependencies (#3302)
 - chore(dependencies): Autobump spinnaker-dependencies (#3300) (#3301)
 - chore(dependencies): Autobump spinnaker-dependencies (#3300)
 - fix(titus): fix titus streaming snapshot and error handling (#3299)

#### Deck  - 851847e...f9cc5a5
 - fix(artifacts): Fix fetching helm artifact versions (#6995) (#6999)
 - fix(bake/manifest): Preserve artifact account selection (#6937) (#6941)
 - fix(bake/manifest): Preserve artifact account selection (#6937) (#6940)
 - fix(core): initialize default artifact with type (#6885) (#6886)
 - fix(docker): Fix subscription leak in DockerTriggerTemplate (#6874)
 - fix(docker): Fix subscription leak in DockerTriggerTemplate (#6874)
 - fix(artifacts): Clean pipeline expected artifacts when triggers are removed (#6799)
 - fix(k8s): Fix deploy manifest (#6833) (#6837)
 - fix(provider/cf): Clone model so Orca monitors the correct foundation for up instances (#6817) (#6822)
 - fix(provider/cf): Fix provider selection for resize stage in pipeline (#6754) (#6813)
 - fix(artifacts): default helm artifact editor is broken (#6811) (#6812)
 - fix(google): revert "select all zones by default when deploying a regional gce server group (#6751) (#6755)" (#6810)
 - fix(google): revert "select all zones by default when deploying a regional gce server group (#6751)" (#6808) (#6809)
 - fix(google): fix autohealing health checks in deploy stages (#6804) (#6805)
 - fix(triggers): Add lastSuccessfulBuild as a build option in Jenkins default artifact (#6797) (#6800)
 - fix(provider/cf): Make expected artifacts selectable as clone manifests (#6796) (#6798)
 - fix(pipeline): Fix target impedance validator for clone server group (#6785) (#6788)
 - fix(gremlin): Changed flag from features.gremlinEnabled to features.gremlin (#6776)
 - chore(deps): bump @spinnaker/kayenta from 0.0.73 to 0.0.74 (#6786) (#6787)
 - fix(artifacts): Persist default artifact account in ExpectedArtifactModal (#6783) (#6784)
 - fix(kubernetes): safe lookups for apiVersion on patch manifest deploy status (#6775) (#6781)
 - fix(kubernetes): fix validation for Find Artifact from Resource stage (#6777) (#6780)
 - fix(ecs): Fix name of health check grace period attribute (#6746) (#6749)
 - fix(google): select all zones by default when deploying a regional gce server group (#6751) (#6755)
 - fix(google): select all zones by default when deploying a regional gce server group (#6751) (#6753)
 - fix(google): add better help text around accelerators (#6750) (#6752)
 - fix(cf): Repair Rollback Cluster pipeline stage (#6743) (#6744)
 - fix(concourse): Support manual trigger execution by build number (#6738) (#6741)
 - fix(cf): Map/Unmap LBs and UI cleanup (#6737) (#6739)
 - fix(provider/cf): Default clone operations to start on creation (#6735) (#6736)
 - fix(artifacts): Exclude unmatchable expected artifact types (#6709) (#6728)
 - fix(concourse): Fix concourse trigger config (#6715) (#6720)
 - fix(artifacts): Fix SpEL text input used in React components (#6712) (#6714)
 - fix(cf): Share / unshare execution details (#6710) (#6713)
 - fix(trigger): Fix react trigger components don't receive prop updates (#6711)
 - fix(kubernetes): Use apiGroup when looking up deploy status for CRDs (#6691)
 - feat(kubernetes): add expression evaluation options to bake and deploy manifest stages (#6696)
 - fix(artifacts): Fix trigger artifact feature conditionalization (#6708)
 - feat(cf): prefix apps manager and metrics urls with https:// (#6637)
 - fix(cf): map single route at a time (#6700)
 - fix(artifacts): HTTP artifact needs to set the reference field (#6679)
 - feat(cf): Add Updatable Flag To Create Service (#6706)
 - fix(cf): provide meaningful labels in resize dialog (#6704)
 - chore(core): upgrade the version to formik 1.4.1 (#6705)
 - fix(cf): fix the alignment issue for artifacts in deploy SG (#6701)
 - chore(core): add artifactory to settings.js for halconfig (#6695)
 - fix(triggers): Add pipeline name to search request (#6703)
 - fix(tests): looking for app links sometimes fails because page isnt ready (#6702)
 - feat(provider/azure): Add availability zones support in server group â€¦ (#6688)
 - feat(triggers): Add Concourse trigger type (#6692)
 - feat(cf): Share/Unshare services (#6685)
 - feat(core): save pipelines stage was added (#6654)
 - fix(artifacts): Make artifacts and artifactsRewrite flags mutually exclusive (#6694)
 - chore(artifactory): Polish imports and labels (#6693)
 - feat(core/deploy): UI widget for 'Delay Before Scale Down' (#6698)
 - feat(core): add jenkins artifact type (#6690)
 - fix(cf): populate saved pipeline stage data (#6689)
 - feat(provider/gce): Moniker support for GCE server groups (#6317)
 - feature(aws): Add the cloudformation stage (#6521)
 - fix(core): In baseProvider, fixed autoselection of React stage (#6673) (#6675)
 - fix(provider/azure): Fix the account list can't show when "Create Server Group" in cluster page (#6438) (#6686)
 - refactor(core): Remove triggerViaEcho feature flag (#6680)
 - chore(amazon): Bump version to 0.0.180 (#6683)
 - fix(ecs): Remove unused cacheInitializer injection (#6681)
 - fix(aws): do not aggressively and endlessly fetch vpcs (#6682)
 - fix(core): Filter v2 pipeline templates from create pipeline modal (#6660)
 - fix(cf): make Deploy Service pipeline stage work again (#6677)
 - chore(design): adds new icons (#6676)
 - chore(core): Bump version to 0.0.344 (#6674)
 - fix(artifacts): Simplify display name generation (#6670)
 - fix(core): In baseProvider, fixed autoselection of React stage (#6673)
 - Bump package core to 0.0.343 and amazon to 0.0.179 and titus to 0.0.79 (#6672)
 - feat(core): Warning message about invalid job params (#6669)
 - fix(core): Surface invalid params for a pipeline stage (#6668)
 - refactor(*): remove unused local storage caches (#6665)
 - fix(appengine): allow sequence to be suppressed in servergroup names (#6667) (#6671)
 - fix(appengine): allow sequence to be suppressed in servergroup names (#6667)
 - feat(core): Add support for an Artifactory Trigger (#6664)
 - feat(jenkins): Add artifact status tab to Jenkins execution details (#6666)
 - feat(artifacts): Re-use artifacts when re-running a pipeline (#6663)
 - feat(core): Filter v2 pipeline templates from create pipeline modal (#6660)
 - chore(provider/azure): Enable the firewall work and add source IP/CIDR filtering (#6657)
 - fix(core/pipeline): make cancelmodal take markdown for body (#6662)
 - fix(artifacts): Correct render-if-feature for new artifacts on stage 'produces artifact' (#6661)
 - refactor(cf): Adopt artifact model in deploy stages (#6659)
 - fix(artifacts): Maven/ivy reference field, Base64 validation, SpelText performance (#6656)
 - fix(core): Remove ability to trigger manual exec for mptv2 pipelines (#6651) (#6658)
 - fix(core): Remove ability to trigger manual exec for mptv2 pipelines (#6651)
 - feat(core): Add pipeline to IStageConfigProps (#6655)
 - chore(angularjs): explicitly annotate more angularjs injections (#6653)
 - chore(package): Move jasmine and babel to devDependencies (#6652)
 - fix(artifacts): save HTTP URL as artifact reference (#6650)
 - fix({core,amazon}/serverGroup): filter out empty tags, change 'tags' field type (#6645)
 - fix(core): titus run jobs override all other providers (#6647) (#6649)
 - fix(core): titus run jobs override all other providers (#6647)
 - fix(core): Remove configure button and setup redirect for mptv2 pipeline (#6644) (#6648)
 - fix(core): Remove configure button and setup redirect for mptv2 pipeline (#6644)
 - fix(provider/azure): Enable strategy for azure (#6646)
 - refactor(artifacts): Combine expected artifacts and trigger artifact constraints (#6634)
 - fix(cf): rename text from load balancers to load balancer (#6643)
 - fix(build): make gradle use https (#6639)
 - feat(provider/azure): Add support for instance type in server group (#6642)
 - feat(users): Always surface authenticated user for executions/tasks (#6638)
 - chore(core): Bump version to 0.0.342 (#6636)
 - feature(core): allow custom tooltip, modal body on Cancel Execution (#6635)
 - fix(bake/oracle): Added extendedAttributes (#6631)
 - fix(kubernetes): only set manifestName in static mode manifest selector
 - feat(kubernetes): add dynamic target selection to patch manifest stage
 - fix(kubernetes): remove unnecessary delete manifest stage defaults
 - fix(chaos): do not let user save invalid chaos monkey config (#6629)
 - fix(bake/oracle): Added extendedAttributes (#6627)
 - fix(kubernetes): allow text input for replicas in `Scale (Manifest)` stage (#6630)
 - feat(kubernetes): add label mode to manifest selector component to enable dynamic target selection in delete manifest stage (#6628)
 - fix(google): Only show authorized accounts during Server group creation. (#6626)
 - fix(google): Only show authorized accounts during Server group creation (#6625)
 - feat(core): Export Pipeline Template action with modal and command copy (#6595)
 - Bump package core to 0.0.341 and amazon to 0.0.178 (#6624)
 - fix(amazon/loadBalancer): Fix AZ autobalance, subnet AZ default value, and isInternal checkbox (#6623)
 - fix(artifacts): lookup of artifact id with incorrect string (#6622)
 - fix(projects): config state was stale after update (#6464)
 - chore(angularjs): Move $inject annotation above hoisted functions (#6621)
 - fix(gremlin): Check for fetched data from API (#6553)
 - fix(provider/azure): respect vm scale set schema for custom extensions (#6582)
 - chore(angularjs): Explicitly annotate directive controllers
 - Bump package core to 0.0.340 and titus to 0.0.78 (#6620)
 - feat(titus): Reordering properties file contents based on length (#6617)
 - chore(core): yank out fastProperties formatters (#6619)
 - chore(deps): bump @spinnaker/kayenta from 0.0.72 to 0.0.73 (#6616)
 - Bump package core to 0.0.339 and amazon to 0.0.177 and titus to 0.0.77 (#6615)
 - refactor(core): migrate momentjs functionality to luxon + date-fns (#6604)
 - chore(deps): bump @spinnaker/kayenta from 0.0.70 to 0.0.72 (#6614)
 - fix(amazon/serverGroup): Do not apply default AZs unless the user wants to usePreferredZones (#6609)
 - fix(titus): Help users with iam profile setting (#6552)
 - fix(build): Pass --frozen-lockfile to travis builds (#6611)
 - chore(*): Fix inconsistent @uirouter/react-hybrid versions (#6610)
 - chore(package): update bootstrap@3.4.1
 - fix(ecs/instance): restore accidentally deleted section in instance details
 - chore(deps): bump @spinnaker/styleguide from 1.0.10 to 1.0.12
 - feat(cf): Display details in pipeline for services
 - fix(core/executions): Disable text selection when re-ordering pipelines (#6603)
 - chore(deps): bump @spinnaker/kayenta from 0.0.69 to 0.0.70 (#6589)
 - chore(titus): Bump version to 0.0.76
 - chore(amazon): Bump version to 0.0.176
 - chore(docker): Bump version to 0.0.35
 - chore(core): Bump version to 0.0.338
 - chore(yarn): Update yarn.lock (#6601)
 - chore(prettier): Just Use Prettierâ„¢ (#6600)
 - fix(html): Fix various invalid HTML (#6599)
 - fix(html): Fix various invalid HTML (#6597)
 - fix(core/diffs): Fix misnamed tempate field
 - chore(prettier): Just Use Prettierâ„¢
 - chore(angularjs): Do not use .component('foo', new Foo())
 - feat(gremlin): Per feedback review within gate, change the Gate gremlin endpoint prefix from "gremlin" to "integrations/gremlin" (#6591)
 - fix(core): loading spinner for LBs not dismissed
 - Bump package core to 0.0.337 and docker to 0.0.34 and amazon to 0.0.175 and titus to 0.0.75 (#6593)
 - fix(core): Child pipeline should route back correctly (#6586)
 - fix(core): allow selecting accounts via simple select field in AccountSelectInput (#6592)
 - feat(cf): Use spinnaker's built-in timeouts (#6476)
 - refactor(core): move Ace Editor CSS to core module (#6588)
 - chore(angularjs): Remove all 'ngInject'; in favor of explicit DI annotation
 - chore(prettier): Just Use Prettierâ„¢
 - chore(angularjs): Explicitly annotate all AngularJS injection points
 - chore(angularjs): Remove angularjs-annotate babel plugin in favor of explicitly DI annotation
 - fix(securityGroups): User `securityGroupName` for upsertSecurityGroupTask (#6569)
 - fix(dcos): Catch null argument in new servergroup command (#6307)
 - feat(aws): allow override of scaling policies section (#6584)
 - fix(aws): prevent clone submit when ingress rule removal in not acked (#6577)
 - fix(kubernetes): properly detect if autoscaler is attached to server groups (#6578)
 - Bump package core to 0.0.336 and amazon to 0.0.174 (#6581)
 - fix(aws): set redirectActionConfig on ALB rules (#6579)
 - fix(core/clipboard): correctly type CopyToClipboard's displayText prop (#6580)
 - fix(cf): pipeline edit deploy server group (#6576)
 - chore(deps): bump deck-kayenta to 0.0.69 (#6558)
 - chore(core): Bump version to 0.0.335 (#6575)
 - refactor(core): move stages/core to stages/common (#6574)
 - chore(core): Bump version to 0.0.334 (#6573)
 - Bump package core to 0.0.333 and amazon to 0.0.173 (#6572)
 - fix(core): do not blow away the screen when copying to clipboard (#6571)
 - fix(core/amazon): Loadbalancer tags should have spinner to avoid panic (#6562)
 - fix(core): do not try to parse/unescape execution status parameters (#6570)
 - chore(eslint): disable eslint namespace rule for Gremlin component
 - chore(amazon/instance): Promote the recommended high-memory family to r5 (#6566)
 - Bump package core to 0.0.332 and amazon to 0.0.172 (#6565)
 - fix(aws): fix security group rule updates (#6564)
 - fix(core): use $timeout to handle change event in accountSelectField (#6563)
 - chore(Dockerfile): Use node:10 base image, do not use gradle to build
 - fix(core/css): be explicit on which file we're importing (#6554) (#6561)
 - fix(core/css): be explicit on which file we're importing (#6554)
 - feat(core): display unescaped JSON if pipeline parameter input was JSON (#6556)
 - feat(cf): add clone SG pipeline stage (#6555)
 - chore(docker): Add 'free -h' to dockerfile to diagnose build failures on quay.io
 - fix(core): make one request per pipeline/strategy re-indexing event (#6519)
 - fix(eslint): Fix eslint warnings for @typescript-eslint/camelcase
 - fix(eslint): Fix eslint warnings for @typescript-eslint/no-empty
 - fix(eslint): Fix eslint warnings for @typescript-eslint/camelcase
 - fix(eslint): Fix eslint warnings for @typescript-eslint/array-type
 - fix(eslint): Fix eslint warnings for @typescript-eslint/no-namespace
 - fix(eslint): Fix eslint warnings for @typescript-eslint/no-use-before-define
 - fix(eslint): Fix eslint warnings for @typescript-eslint/ban-types
 - fix(eslint): Fix eslint warnings for no-extra-boolean-cast
 - fix(eslint): Fix eslint warnings for no-console
 - fix(eslint): Fix eslint warnings for no-useless-escape
 - fix(eslint): Fix eslint warnings for noundef
 - fix(eslint): Fix eslint warnings for no-case-declarations
 - Bump package core to 0.0.331 and amazon to 0.0.171 and titus to 0.0.74 (#6551)
 - refactor(core): remove navigation from stage config details (#6528)
 - feat(gremlin): Gremlin UI which takes API key input then fetches commâ€¦ (#6549)
 - fix(aws): allow ingress creation from all accounts (#6543)
 - chore(core): Check in changes to yarn.lock (#6550)
 - fix(core): Match order of pipeline config nav items to page sections (#6546) (#6548)
 - refactor(core): de-angularize UrlBuilder (#6541)
 - fix(core): Match order of pipeline config nav items to page sections (#6546)
 - fix(appengine): older apps that dont have cloudProviders field dont select correct serverGroup modal (#6544) (#6545)
 - fix(appengine): older apps that dont have cloudProviders field dont select correct serverGroup modal (#6544)
 - Bump package kubernetes to 0.0.21 and google to 0.0.5 (#6540)
 - fix(provider/azure): subnet is null after select same loadbalancer (#6539)
 - Bump package core to 0.0.330 and amazon to 0.0.170 (#6537)
 - chore(build): Use newer base image for deck build (#6538)
 - chore(eslint): Fix some linter errors
 - chore(eslint): add typescript support to eslint
 - fix(amazon): Display capacity as text if using SPEL (#6535)
 - chore(eslint): Fix lint errors
 - chore(package): update eslint@5.13.0, eslint-loader@2.1.2
 - chore(package): collapse dupe fsevents deps to the same version in yarn lockfile
 - chore(package): Just Update Prettierâ„¢
 - chore(package): update husky@1.3.1, prettier@1.16.4, pretty-quick@1.10.0
 - fix(provider/azure): Add Application Name Validator for Azure (#6473)
 - fix(kubernetes): do not override `location` and `replicas` in new Scale Manifest stage (#6532)
 - fix(provider/azure): Editing servergroup presents previously selected data (#6531)
 - fix(core): enable new traffic guards by default (#6527)
 - fix(core): only use <g> for popovers in within SVGs (#6530)
 - fix(provider/azure): update stack and detail field validation for azure
 - chore(cf): rename serviceName to serviceInstanceName (#6523)
 - refactor(validation): First class support for required or optional (#6526)
 - feat(core): rename feature flag for managed pipeline templates v2 ui (#6525)
 - fix(core): Max remaining ASG should honor value being removed and reflect correctly (#6522)
 - feat(core): add feature flag for managed pipeline templates v2 (#6520)
 - refactor(artifacts): Generalize artifact delegate for reuse (#6495)
 - fix(amazon/core): Sorting order of regions in bake stage + lint fix (#6518)
 - fix(core): introduce state when the modal has been initialized (#6516)
 - fix(kubernetes): do not override `location` and `replicas` in new Scale Manifest stage
 - chore(core): update banner spec
 - chore(amazon): Bump version to 0.0.169 (#6515)
 - fix(amazon/loadBalancer): Fix NLB health check port validator (#6514)
 - chore(core): Bump version to 0.0.329 (#6513)
 - feat(core): add getApplicationAttributes method (#6512)
 - chore(amazon): Bump version to 0.0.168 (#6511)
 - chore(amazon): fix lint (#6510)
 - fix(amazon): do not call setState inside validate (#6509)
 - fix(bootstrap): make sure jquery loads before angular why did this fix it i dont know
 - Bump package core to 0.0.328 and docker to 0.0.33 and amazon to 0.0.167 and titus to 0.0.73 (#6507)
 - fix(titus): do not call setState on wizard validation (#6506)
 - fix(cf): fix SG pipeline modal display issues (#6504)
 - chore(webpack): Switch to TerserPlugin. Split bundles into ~5mb chunks
 - chore(webpack): update @types/webpack@4.4.24 @types/webpack-env@1.13.7 babel-loader@^7.1.5 cache-loader@2.0.1 copy-webpack-plugin@4.6.0 css-loader@2.1.0 file-loader@3.0.1 fork-ts-checker-webpack-plugin@0.5.2 html-webpack-plugin@3.2.0 istanbul-instrumenter-loader@3.0.1 loader-utils@1.2.3 ngtemplate-loader@2.0.1 postcss-loader@3.0.0 style-loader@0.23.1 thread-loader@2.1.2 ts-loader@5.3.3 url-loader@1.1.2 webpack@4.29.1 webpack-cli@3.2.3 webpack-dev-server@3.1.14 webpack-node-externals@1.7.2 babel-plugin-angularjs-annotate@0.10.0
 - chore(deps): [security] bump extend from 3.0.1 to 3.0.2
 - fix(style): Upgrade bootstrap to avoid XSS vulnerabilities (#6499)
 - fix(style): Fix all lint errors for colors in forms (#6500)
 - refactor(amazon): make cluster selection optional (#6502)
 - fix(tests): functional test runner needs imports converted to requires because its node (#6497)
 - chore(amazon): Bump version to 0.0.166
 - chore(core): Bump version to 0.0.327
 - chore(publish): Removing git alias from publish.sh
 - chore(titus): Bump version to 0.0.72 (#6496)
 - fix(core): filter unauthorized accounts (#6490)
 - fix(core/modal): Validate initialValues so isValid is real (#6494)
 - feat(cf): Add artifacts for user-defined services (#6468)
 - fix(titus): Make iamProfile a required field in run job stage (#6487)
 - chore(core): Bump version to 0.0.326 (#6493)
 - style(core): add revert icon to font library (#6492)
 - Bump package core to 0.0.325 and docker to 0.0.32 and amazon to 0.0.165 and titus to 0.0.71 (#6491)
 - refactor(core): modularize execution status display on executions (#6489)
 - fix(kubernetes/serverGroup): Remove module.exports assignment in typescript file
 - refactor(core/insight): refactor modules to avoid circular dependency
 - chore(visualizer): Switch from deprecated System.import() to dynamic import()
 - chore(package): bump @uirouter/visualizer@7.0.0
 - chore(typescript): Switch module from 'commonjs' to 'esnext' to emit raw dynamic 'import()'
 - fix(core): read displayTimestampsInUserLocalTime off SETTINGS.feature
 - fix(core): read displayTimestampsInUserLocalTime off SETTINGS.feature
 - chore(amazon): Bump version to 0.0.164 (#6485)
 - fix(amazon): do not mutate nested objects on clone server group command (#6484)
 - feat(core): add application-specific custom banners
 - Bump package core to 0.0.324 and amazon to 0.0.163 and titus to 0.0.70 (#6482)
 - fix(stages): Fixed stage/details out-of-sync due to state bug (#6480)
 - fix(titus): use variable for account on configbin scaling metrics (#6481)
 - feat(amazon/loadBalancer): Rudimentary support for redirect actions (#6470)
 - feat(artifacts): Human readable expected artifact display names (#6344)
 - feat(publish): Copy changelog for all published modules to the clipboard for use in a PR comment
 - fix(core/modal): Import IModalComponentProps relatively instead of from 'core' so downstream projects don't need a 'core' alias in tsconfig
 - chore(package): Add .npmignore to all packages
 - Bump package core to 0.0.323 and amazon to 0.0.162 and titus to 0.0.69 (#6475)
 - fix(aws): do not filter out security group ip ranges using wildcards (#6474)
 - refactor(validation): Create validation directory, split up validation and validators, de-class Validation
 - feat(cf): Add Map/Unmap SGs and LBs
 - fix(executions): Fixed stage does not open when clicked (#6469)
 - feat(google): Add support for accelerators when deploying VMs (#6467)
 - refactor(titus/modal): Refactor titus modals to use WizardPage component
 - refactor(kubernetes/modal): Refactor kubernetes modals to use WizardPage component
 - refactor(cloudfoundry/modal): Refactor cloudfoundry modals to use WizardPage component
 - refactor(amazon/modal): Refactor amazon modals to use new WizardPage component
 - refactor(core/projects): Migrate to wizardmodal render props
 - refactor(core/modal): Rewrite wizard modal to use render props - Move label from wrapped component to WizardPage prop - Expose 'formik' as a separate prop in the render prop callback - Access wrapped component validate() function using 'innerRef' - Remove wizardPage() HOC - Remove hideSections prop
 - chore(core): Bump version to 0.0.322 (#6465)
 - feat(core): better handle stage removal (#6461)
 - style(core): add cool new cloud icon (#6463)
 - fix(validation): Small fixes for validation (#6458)
 - chore(core): Bump version to 0.0.321 (#6460)
 - fix(core): do not edit live copy of pipeline configs (#6454)
 - fix(core): consider NOT_INITIALIZED as fetched when setting app status
 - fix(core/ga): Re-enable google analytics (#6453) (#6455)
 - chore(amazon): Bump version to 0.0.161
 - chore(core): Bump version to 0.0.320
 - feat(cf/serverGroup): Use discriminator 'type' field to improve type checking (#6449)
 - fix(core/ga): Re-enable google analytics (#6453)
 - fix(webhooks): Ensure body and status code are shown for webhooks with monitoring (#6452)
 - feat(kubernetes/v2): Converts CopyToClipboard to React Component (#6451)
 - fix(core/pipeline): Support expressions for pipeline name in the pipeline stage
 - fix(*): Remove all self closing tags in AngularJS templates Reference: https://github.com/angular/angular.js/issues/1953#issuecomment-13135021
 - fix(kubernetes): post strategic patch body as object (#6444)
 - fix(kubernetes): post strategic patch body as object
 - fix(kubernetes): fix account selection by handling null values passed to ManifestSelector.isExpression (#6442)
 - fix(kubernetes): fix account selection by handling null values passed to ManifestSelector.isExpression
 - chore(amazon): Bump version to 0.0.160 (#6439)
 - fix(amazon/loadBalancer): Fix display of rule condition in alb config (#6437)
 - fix(provider/azure): Fix the account list can't show when "Create Server Group" in cluster page (#6438)
 - Bump package core to 0.0.319 and docker to 0.0.31 and amazon to 0.0.159 and titus to 0.0.68 (#6436)
 - fix(core): better word break (#6412)
 - feat(core): allow disabling traffic guards (#6380)
 - fix(core): make react-select CSS resets more specific (#6432)
 - fix(tests): give anonymous auth fixture to mountebank (#6434)
 - chore(package): remove unused (hopefully) spin.js package
 - refactor(*): Don't use ts or js file extension in imports
 - refactor(*): Don't use js or ts file extension in require()
 - refactor(validation): Adding new form validation builders (#6394)
 - fix(core/instance): Show instance id not found message in details panel - Export react components from index
 - chore(k8s): clean up imports (#6430)
 - Bump package core to 0.0.318 and amazon to 0.0.158 (#6429)
 - refactor(aws): move certificate config to second line on elb/alb (#6428)
 - feat(kubernetes/v2): Adds CopyToClipboard component to ease getting text from UI (#6419)
 - chore(*): bump @types/enzyme@3.1.15, @types/jasmine@3.3.7, enzyme@3.8.0, enzyme-adapter-react-16@1.7.1, karma@4.0.0, karma-jasmine@2.0.1, karma-webpack@3.0.5, typescript@^3.2.4, jasmine-core@3.3.0 - disable jasmine 3.0's random test order by default feature
 - refactor(core/artifact): Explicitly annotate summarizeExpectedArtifact
 - refactor(core/bootstrap): Move uiSelect decorator to bootstrap file and convert to typescript
 - refactor(pageTitleService): Use exact DI name in .run block
 - chore(core): Bump version to 0.0.317 (#6424)
 - fix(core): fix filtering on no details in clusters view (#6423)
 - Revert "chore(uiSelect): Remove decorators for uiSelectMultiple which we no longer use, AFAICT"
 - chore(core): Bump version to 0.0.316 (#6422)
 - fix(core): Fix stack filter on none (#6421)
 - chore(uiSelect): Remove decorators for uiSelectMultiple which we no longer use, AFAICT
 - refactor(core/forms): Save 19kb in deck bundle by not using 'util' package
 - chore(tslint): Turn off picky member-ordering rule (#6417)
 - chore(core): Bump version to 0.0.315 (#6413)
 - fix(webhooks): Various webhook stage improvements (#6407)
 - Bump package core to 0.0.314 and amazon to 0.0.157 (#6411)
 - feat(amazon/loadBalancer): Support traffic-port for healthcheck (#6408)
 - fix(core): correctly sort instances by launch time (#6409)
 - fix(tests): add anonymous /auth/user stub for all tests (#6410)

#### Echo  - 5db9d43...28bde7a
 - fix(mpt): fix planing of v1 pipelines for manual triggers (#512) (#520)
 - fix(MPT): Fixes triggering for template triggers. (#504) (#508)
 - feat(artifacts): Support inflation of artifacts from trigger buildInfo (#503)
 - fix(tests): Use JUnit vintage engine so Spock tests still run (#502)
 - feat(triggers): Add Concourse trigger (#499)
 - fix(triggers): Use linear backoff for calls to igor (#501)
 - chore(dependencies): Autobump spinnaker-dependencies (#500)
 - fix(trigger): Fixed configuration for manual pipeline triggers (#492)
 - fix(pubsub/google): Remove tag from image name (#498)
 - refactor(triggers): Improve code sharing for manual and build triggers (#497)
 - refactor(artifacts): Call igor instead of parsing artifacts (#484)
 - feat(core): Add support for an Artifactory Trigger (#489)
 - fix(trigger): Fixing mistake in #481 (#485)
 - feat(triggers): Replacing dependence on scheduled-actions with quartz (#481)
 - chore(dependencies): Autobump spinnaker-dependencies (#483)
 - fix(artifacts): Extract artifacts before enforcing constraints (#478)
 - fix(artifacts): Move build fetching to build event handler (#473)
 - fix(build): make gradle use https (#474)
 - test(core): Basic startup test (#472)
 - fix(artifacts): don't require keel (#471)
 - feat(artifacts): emit artifacts received in echo (#469)
 - chore(dependencies): Autobump spinnaker-dependencies (#470)
 - fix(lombok): Use annotationProcessor scope for lombok to support Gradle 5.+ (#468)
 - chore(dependencies): Autobump spinnaker-dependencies (#466)
 - chore(dependencies): Autobump spinnaker-dependencies (#465)
 - fix(pipelines): Add keepWaitingPipelines to Pipeline model (#463) (#464)
 - fix(pipelines): Add keepWaitingPipelines to Pipeline model (#463)
 - chore(dependencies): Autobump spinnaker-dependencies (#462)
 - fix(expressions): Fix NPE in artifact expression evaluation (#460)
 - chore(dependencies): Autobump spinnaker-dependencies (#461)
 - feat(expressions): Allow SpEL expressions in expected artifacts (#459)
 - chore(dependencies): Autobump spinnaker-dependencies (#458)
 - chore(dependencies): Autobump spinnaker-dependencies (#457)
 - chore(dependencies): Autobump spinnaker-dependencies (#456)
 - chore(dependencies): Autobump spinnaker-dependencies (#455)
 - fix(echo): relax healthcheck constraints (#454)
 - chore(dependencies): Autobump spinnaker-dependencies (#453)
 - chore(dependencies): Autobump spinnaker-dependencies (#452)
 - chore(dependencies): Autobump spinnaker-dependencies (#450)
 - chore(dependencies): Autobump spinnaker-dependencies (#449)
 - refactor(pubsub): Rename the controller and add 'get' prefix to subscriber interface methods (#448)
 - chore(webhooks): cleanup unnecessary annotations (#447)
 - refactor(webhooks): refactor git webhook handling (#434)
 - chore(email): removing custom nflx email templates (#444)
 - chore(dependencies): Autobump spinnaker-dependencies (#445) (#446)
 - chore(dependencies): Autobump spinnaker-dependencies (#445)
 - chore(dependencies): Autobump spinnaker-dependencies (#442) (#443)
 - chore(dependencies): Autobump spinnaker-dependencies (#442)

#### Fiat  - daf21b2...13f855f
 - Revert "fix(front50): Update Front50 cache periodically and serve live calls from cache. (#351)" (#378) (#380)
 - chore(syncroles): Improve partial sync of roles (#356)
 - chore(dependencies): Autobump spinnaker-dependencies (#357)
 - fix(front50): Update Front50 cache periodically and serve live calls from cache. (#351)
 - chore(dependencies): Autobump spinnaker-dependencies (#344)
 - fix(build): make gradle use https (#340)
 - chore(dependencies): Autobump spinnaker-dependencies (#336)
 - fix(redis): Fix leaked embedded redis from tests (#335)
 - chore(dependencies): Autobump spinnaker-dependencies (#334)
 - chore(dependencies): Autobump spinnaker-dependencies (#333)
 - chore(dependencies): Autobump spinnaker-dependencies (#332)
 - chore(dependencies): Autobump spinnaker-dependencies (#331)
 - chore(dependencies): Autobump spinnaker-dependencies (#330)
 - chore(dependencies): Autobump spinnaker-dependencies (#327)
 - feat(api): Support turning off dynamic refreshing of fiat status (#328)
 - chore(dependencies): Autobump spinnaker-dependencies (#326)
 - chore(core): Clean up dependencies (#324)
 - feat(serviceAccounts/orMode): Change group behaviour of service accounts (#296)
 - chore(dependencies): Autobump spinnaker-dependencies (#325)
 - chore(dependencies): Autobump spinnaker-dependencies (#323)
 - chore(dependencies): Autobump spinnaker-dependencies (#321)
 - chore(dependencies): Autobump spinnaker-dependencies (#320)
 - chore(google): Update google API dependencies (#317) (#318)
 - chore(google): Update google API dependencies (#317)
 - chore(dependencies): Autobump spinnaker-dependencies (#315) (#316)
 - chore(dependencies): Autobump spinnaker-dependencies (#315)
 - chore(dependencies): Autobump spinnaker-dependencies (#313) (#314)
 - chore(dependencies): Autobump spinnaker-dependencies (#313)

#### Front50  - 3105e86...b796e80
 - fix(MPTv2): Migrates v2 MPTs with template source to artifact. (#494) (#500)
 - fix(MPTv2): Avoids looking up v2 MPTs by 'latest'. (#502) (#503)
 - fix(docker): fix gradle build step (#491)
 - fix(MPTv2): Don't use explicit latest tag for v2 MPTs. (#492)
 - chore(dependencies): Autobump spinnaker-dependencies (#490)
 - fix(pipelines): More robust handling of missing cron trigger id's (#488)
 - fix(application): do not blow away cloudProviders when updating application (#487)
 - feat(validation): `PipelineValidator` extension point (#479)
 - chore(dependencies): Autobump spinnaker-dependencies (#480)
 - feat(authz): Migrate manual service users to managed service users (#476)
 - fix(build): make gradle use https (#474)
 - chore(MPTv2): Remove unused listIds endpoint. (#471)
 - feat(core): add detailed logging when deleting application components (#470)
 - chore(dependencies): Autobump spinnaker-dependencies (#468)
 - fix(authz): Invalidate local Fiat cache on service acct creation. (#466) (#467)
 - fix(authz): Invalidate local Fiat cache on service acct creation. (#466)
 - fix(redis): Fix embedded redis leak (#465)
 - fix(delivery): save create time when updating (#464)
 - test(redis): Use embedded redis for unit tests (#463)
 - chore(dependencies): Autobump spinnaker-dependencies (#462)
 - fix(applications): add dao to application before updating (#461)
 - refactor(applications): remove accounts field from application metadata (#459)
 - fix(application): fix tests (#453) (#460)
 - feat(MPTv2): Update v2 model to use Artifact for template. (#458)
 - fix(delivery): update endpoints to use deliveries (#457)
 - chore(dependencies): Autobump spinnaker-dependencies (#456)
 - feat(delivery): managed delivery controller and storage (#455)
 - feat(core): add endpoint for reordering pipelines (#448)
 - fix(core): Fix merge conflict on cherry-pick (#454)
 - fix(application): fix tests (#453)
 - chore(dependencies): Autobump spinnaker-dependencies (#452)
 - feat(MPTv2): Adds list by decorated id for artifact support. (#451)
 - fix(core): correctly save traffic guard configurations (#449) (#450)
 - fix(core): correctly save traffic guard configurations (#449)
 - fix(core): do not overwrite traffic guard configurations (#447)
 - chore(dependencies): Autobump spinnaker-dependencies (#446)
 - chore(dependencies): Autobump spinnaker-dependencies (#445)
 - chore(dependencies): Autobump spinnaker-dependencies (#443)
 - chore(dependencies): Autobump spinnaker-dependencies (#442)
 - chore(dependencies): Autobump spinnaker-dependencies (#441)
 - chore(dependencies): Autobump spinnaker-dependencies (#440)
 - fix(test/redis): cloudProviders is promoted to its own field now (#439)
 - feat(MPTv2): Adds delete by version for MPTs. (#437)
 - chore(dependencies): Autobump spinnaker-dependencies (#436)
 - feat(MPTv2): Adds get by version for MPTs. (#435)
 - chore(google): Clean up front50-gcs dependencies (#434)
 - fix(application): Fix persistence of cloudProviders (#432)
 - chore(dependencies): Autobump spinnaker-dependencies (#431)
 - fix(MPTv2): Recursive key sort for digest hash. (#430)
 - refactor(applications): migrate cloudProviders to comma-separated string (#428)
 - feat(MPTv2): First pass at versioned v2 MPTs. (#429)
 - refactor(application): ensure cloudProviders is a comma-separated string (#427)
 - chore(dependencies): Autobump spinnaker-dependencies (#424) (#425)
 - chore(dependencies): Autobump spinnaker-dependencies (#424)
 - chore(dependencies): Autobump spinnaker-dependencies (#422) (#423)
 - chore(dependencies): Autobump spinnaker-dependencies (#422)

#### Gate  - aa01759...28beaaa
 - fix(gate): Allow gate to startup before Redis is available. (#775) (#781)
 - fix(iap): Add a clock skew flag for IAP issue time and expiration time checks. (#766) (#769)
 - fix(iap): Add a clock skew flag for IAP issue time and expiration time checks. (#766) (#767)
 - feat(gremlin): Add Halyard config for Gremlin (#762) (#763)
 - fix(igor): Remove igor as a requirement for artifactory and concourse (#755) (#756)
 - chore(MPTv2): Marks MPTv2 endpoints as alpha. (#754)
 - chore(dependencies): Autobump spinnaker-dependencies (#753)
 - feat(triggers): Add autocompletion APIs for Concourse trigger (#752)
 - fix(authn/saml): Fix extra [] in username (#750)
 - feat(core): Add support for an Artifactory Trigger (#746)
 - chore(dependencies): Autobump spinnaker-dependencies (#743)
 - fix(build): make gradle use https (#740)
 - fix(swagger): Adds kayenta enabled prop to fake test. (#735) (#736)
 - fix(swagger): Adds kayenta enabled prop to fake test. (#735)
 - feat(delivery): get all deliverys and single delivery config (#734)
 - chore(dependencies): Autobump spinnaker-dependencies (#733)
 - fix(MPTv2): Wait for downstream Orca ops for v2 MPTs. (#732)
 - feat(gremlin): Add proxy of Gremlin API to retrieve command and target templates (#725)
 - feat(cf): Expose open service broker information (#730)
 - chore(dependencies): Autobump spinnaker-dependencies (#729)
 - fix(authn/saml): Make role delimiter configurable (#728)
 - feat(x509): Support for `x509.requiredRoles` (#727)
 - chore(dependencies): Autobump spinnaker-dependencies (#726)
 - feat(web): expose endpoints for reordering pipelines and strategies (#723)
 - chore(dependencies): Autobump spinnaker-dependencies (#724)
 - chore(dependencies): Autobump spinnaker-dependencies (#722)
 - chore(dependencies): Autobump spinnaker-dependencies (#721)
 - chore(dependencies): Autobump spinnaker-dependencies (#717)
 - fix(MPTv2): Wait for downstream Orca ops for v2 MPTs. (#719)
 - chore(dependencies): Autobump spinnaker-dependencies (#716)
 - chore(dependencies): Autobump spinnaker-dependencies (#715)
 - chore(dependencies): Autobump spinnaker-dependencies (#714)
 - feat(MPTv2): Adds delete by version for MPTs. (#712)
 - chore(dependencies): Autobump spinnaker-dependencies (#711)
 - feat(MPTv2): Adds GET for versioned MPTs. (#710)
 - chore(dependencies): Autobump spinnaker-dependencies (#709)
 - feat(MPTv2): Adds endpoints for versioned MPTs. (#708)
 - Revert "feat(halconfig): adds server config for proxies (#700)" (#707)
 - feat(halconfig): adds server config for proxies (#700)
 - chore(dependencies): Autobump spinnaker-dependencies (#705) (#706)
 - chore(dependencies): Autobump spinnaker-dependencies (#705)
 - chore(dependencies): Autobump spinnaker-dependencies (#703) (#704)
 - chore(dependencies): Autobump spinnaker-dependencies (#703)

#### Igor  - 63d06a5...98de62d
 - fix(cf): okhttp3 connector now trusts all certificates (#415) (#416)
 - fix(concourse): Tweak return type to support manual execution build listing (#404) (#405)
 - fix(concourse): Detect Concourse token expiry (#402) (#403)
 - feat(jenkins): Expected artifact matchable Jenkins artifacts (#401)
 - fix(tests): Use JUnit vintage engine so Spock tests still run (#400)
 - fix(docker): fix gradle build step (#399)
 - Revert "feat(core): add jenkins artifact type (#395)" (#398)
 - chore(dependencies): Autobump spinnaker-dependencies (#397)
 - fix(web): make concourse wiring optional (#396)
 - feat(concourse): Add Concourse build monitor (#394)
 - feat(core): add jenkins artifact type (#395)
 - feat(core): Add support for an Artifactory Trigger (#389)
 - feat(artifacts): Add igor endpoint to get artifacts from a build (#386)
 - chore(dependencies): Autobump spinnaker-dependencies (#385)
 - fix(build): make gradle use https (#381)
 - feat(artifactory): Add Artifactory artifact monitor (#377)
 - refactor(jenkins): Move logic from BuildController to JenkinsService (#378)
 - chore(dependencies): Autobump spinnaker-dependencies (#375)
 - chore(dependencies): Autobump spinnaker-dependencies (#373)
 - chore(dependencies): Autobump spinnaker-dependencies (#372)
 - fix(jenkins): Use new location for revision information (#367) (#368)
 - chore(dependencies): Autobump spinnaker-dependencies (#371)
 - chore(dependencies): Autobump spinnaker-dependencies (#370)
 - chore(dependencies): Autobump spinnaker-dependencies (#369)
 - fix(jenkins): Use new location for revision information (#367)
 - feat(jenkins): Support for overriding TrustStore used by Jenkins clients (#363)
 - chore(dependencies): Autobump spinnaker-dependencies (#364)
 - chore(dependencies): Autobump spinnaker-dependencies (#362)
 - chore(dependencies): Autobump spinnaker-dependencies (#361)
 - chore(dependencies): Autobump spinnaker-dependencies (#359)
 - chore(dependencies): Autobump spinnaker-dependencies (#358)
 - fix(jenkins): Add Spinnaker user-agent string to Jenkins requests (#357)
 - chore(dependencies): Autobump spinnaker-dependencies (#355) (#356)
 - chore(dependencies): Autobump spinnaker-dependencies (#355)
 - chore(dependencies): Autobump spinnaker-dependencies (#353) (#354)
 - chore(dependencies): Autobump spinnaker-dependencies (#353)

#### Kayenta  - 81d906b...f95afd1
 - fix(prometheus): Canary Analysis fails with Illegal Argument Exception. (#525) (#529)
 - chore(dependencies): Autobump spinnaker-dependencies (#517)
 - refactor('signalfx'): add additional test metrics (#500)
 - chore(dependencies): Autobump spinnaker-dependencies (#509)
 - fix(build): make gradle use https (#505)
 - fix(MixerService): properly handle missing metrics (#499)
 - chore(dependencies): Autobump spinnaker-dependencies (#502)
 - fix(archive-controller): variable names and types fixed (#501)
 - fix(orca): Update Orca to 6.139.0 (#496) (#498)
 - fix(orca): Update Orca to 6.139.0 (#496)
 - fix(remote-judge-timeout): extend connect and read timeouts (#497)
 - chore(dependencies): Autobump spinnaker-dependencies (#495)
 - chore: remove direct storage of judge results (#493)
 - fix(results): use judge results in pipeline, not storage (#491)
 - fix(pipelineController): fix list path to not end in a / (#492)
 - chore(dependencies): Autobump spinnaker-dependencies (#490)
 - feat(pipelines): endpoint to retrieve all IDs (#489)
 - fix: compile kotlin (#488)
 - feat(pipelines): allow executions to be deleted (#487)
 - feat(canary-results): archive exactly what we return via HTTP (#486)
 - chore(dependencies): Autobump spinnaker-dependencies (#484)
 - feat(wavefront): Add Wavefront integration (#444)
 - chore(dependencies): Autobump spinnaker-dependencies (#483)
 - chore(dependencies): Autobump spinnaker-dependencies (#482)
 - chore(dependencies): Autobump spinnaker-dependencies (#479)
 - chore(dependencies): Autobump spinnaker-dependencies (#478)
 - chore(dependencies): Autobump spinnaker-dependencies (#477)
 - chore(dependencies): Autobump spinnaker-dependencies (#475)
 - chore(google): Clean up google dependencies (#474)
 - chore(dependencies): Autobump spinnaker-dependencies (#473)
 - feat(signalfx): add optional default scope and location keys when configuring accounts (#470)
 - chore(dependencies): Autobump spinnaker-dependencies (#471) (#472)
 - refactor(standalone-canary-analysis): add more constructers to CanaryAnalysisExecutionResponse so that it can be deserialized with Jackson (#463)
 - chore(dependencies): Autobump spinnaker-dependencies (#471)
 - fix(s3): re-enable AUTO_DETECT_IS_GETTERS after using Netflix Amazon Object Mapper Configurer on the Kayenta object mapper. (#465)
 - chore(dependencies): Autobump spinnaker-dependencies (#468) (#469)
 - chore(dependencies): Autobump spinnaker-dependencies (#468)

#### Orca  - c488de1...92bc10d
 - fix(FindImageFromCluster): only infer regions from deploy for aws (#2851) (#2854)
 - fix(provider/cf): Bind clone manifest artifacts (#2815) (#2821)
 - fix(MPTv2): Allow unresolved SpEL in v2 MPT plan. (#2816) (#2818)
 - feat(gremlin): Add Halyard config for Gremlin (#2806) (#2810)
 - fix(MPTv2): Fix pipeline triggers for v2 templated pipelines. (#2803) (#2809)
 - fix(MPTv2): Avoid resolving artifacts during v2 MPT plan. (#2777) (#2808)
 - fix(artifacts): Fix successful filter for find artifacts (#2780) (#2782)
 - fix(artifacts): Fix successful filter for find artifacts (#2780) (#2783)
 - fix(concourse): Fix concourse build info type (#2779) (#2781)
 - fix(jenkins): Fix Jenkins trigger serialization (#2774) (#2775)
 - fix(tests): Use JUnit vintage engine so Spock tests still run (#2766) (#2773)
 - feat(core): Add support for Concourse triggers (#2770) (#2771)
 - fix(docker): fix gradle build step (#2765)
 - feat(kubernetes): add expression evaluation options to bake and deploy manifest stages (#2761)
 - fix(aws): fix NPE when image name is not yet available (#2764)
 - feat(expressions): adding #pipeline function (#2738)
 - fix(executions): Break up execution lookup script. (#2757)
 - chore(dependencies): Autobump spinnaker-dependencies (#2763)
 - fix(scriptStage): add get properties task (#2762)
 - feat(pipelines): if saving multiple pipelines, continue on failure (#2755)
 - fix(ci): Fix cast error in CIStage (#2760)
 - fix(pipelines): Remove gating of SavePipelineTask (#2759)
 - fix(authz): Fix copying pipelines with managed service accounts (#2754)
 - fix(clouddriver): Revert change to pin source capacity for redblack deploys (#2756)
 - test(core): Remove front50 bean from startup test (#2752)
 - fix(core): Fix startup (#2753)
 - feat(cf): Add Sharing / Unsharing of services (#2750)
 - feature(ci): Fetch artifacts from CI builds (#2723)
 - feat(metrcis): convert stage.invocations.duration to PercentileTimer (#2743)
 - refactor(triggers): Gate calls to igor from orca (#2748)
 - feat(buildservices): Permission support for build services (CI's) (#2673)
 - feat(clouddriver): Favor target capacity when current desired == 0 (#2746)
 - fix(evaluateVariables): enable EvaluateVariables stage to run in dryRun (#2745)
 - feat(core): add save pipelines stage (#2715)
 - fix(provider/azure): Failed to delete firewall (#2747)
 - feat(cloudformation): support YAML templates (#2737)
 - debug(clouddriver): Include cloudprovider in server group capacity logs (#2744)
 - debug(clouddriver): Include cloudprovider in server group capacity logs (#2742)
 - fix(mpt): temporarily pin back jinjava (#2741)
 - debug(clouddriver): Log when initial target capacity cannot be found (#2736)
 - debug(clouddriver): Log when initial target capacity cannot be found (#2734)
 - feat(core): Add support for an Artifactory Trigger (#2728)
 - feat(rrb): add support for preconditions check as part of deploy stage
 - fix(artifacts): Make artifact resolution idempotent (#2731)
 - fix(MPTv2): Supports artifact resolution for v2 MPTs. (#2725) (#2729)
 - fix(MPTv2): Supports artifact resolution for v2 MPTs. (#2725)
 - feat(spel): Moved `stageByRefId` to `StageExpressionFunctionProvider` (#2721)
 - feat(core): add #stageByRefId SpEL helper function (#2699)
 - feat(spel): New `currentStage()` function (#2718)
 - fix(artifacts): Revert double artifact resolution (#2720)
 - fix(artifacts): Revert double artifact resolution (#2719)
 - chore(dependencies): Autobump spinnaker-dependencies (#2716)
 - chore(jinja): Upgrade jinjava (#2717)
 - refactor(cf): Adopt artifacts model for CF deployments (#2714)
 - fix(imagetagging): retry for missing namedImages (#2713)
 - feat(MPTv2): Support artifacts when executing v2 templated pipelines. (#2710) (#2711)
 - feat(MPTv2): Support artifacts when executing v2 templated pipelines. (#2710)
 - feat(upsertScalingPolicyTask): make upsertScalingPolicyTask retryable (#2703)
 - fix(artifacts): handle bound artifact account missing (#2705)
 - fix(redblack): unpin min size of source server group when deploy fails
 - feat(redblack): pin min size of source server group
 - refactor(core): Allow registering custom SpEL expression functions (#2701)
 - feat(artifacts): Add stage artifact resolver (#2702)
 - fix(execution): Honor 'if stage fails' config for synthetic stages. (#2686) (#2689)
 - chore(artifacts): Clean up generics in ArtifactResolver (#2700)
 - fix(expressions): Fix ConcurrentModificationException (#2698)
 - fix(build): make gradle use https (#2695)
 - feat(spel): add manifestLabelValue helper function (#2691)
 - feat(gremlin): Adds a Gremlin stage (#2664)
 - fix(templated-pipelines): handle a missing notifications field in the template config (#2687)
 - fix(execution): Honor 'if stage fails' config for synthetic stages. (#2686)
 - feat(kubernetes): add dynamic target selection to Patch Manifest Stage (#2688)
 - test(core): Basic startup test (#2685)
 - fix(orca-redis): delete stageIndex when deleting a pipeline (#2676)
 - fix(kayenta): fix NPE when moniker defined without a cluster name (#2684)
 - fix(triggers): surface error if build not found (#2683)
 - fix(execution): Ensure exceptions in stage planning are captured (#2680)
 - fix(MPT): Propagate notifications from pipeline config (#2681)
 - fix(clouddriver): Expose attributes of `StageDefinition` (#2682)
 - chore(dependencies): Autobump spinnaker-dependencies (#2678)
 - chore(serviceaccounts): Do not update service account if no change in roles (#2674)
 - feat(cf): Move service polling into orca (#2671)
 - fix(redis): Fix intermittently failing test (#2675)
 - feat(delivery): upsert and delete delivery configs through orca (#2672)
 - chore(dependencies): Autobump spinnaker-dependencies (#2670)
 - fix(securityGroups): User `securityGroupName` for upsertSecurityGroupTask (#2668)
 - feat(MPTv2): Resolve template source as Artifact. (#2667)
 - fix(dependencies): update minutest dependency in orca-sql to fix build (#2654) (#2669)
 - chore(dependencies): Autobump spinnaker-dependencies (#2666)
 - feat(cf): add clone SG pipeline stage (#2665)
 - feat(aws/cloudformation): Add a deploy cloud formation stage (#2603)
 - fix(rrb): pass targetHealthyDeployPercentage to resize tasks
 - feat(core): add support for reordering pipelines (#2663)
 - chore(logs): add execution id explicitly to RRB logs
 - chore(resize): replace nullable with optional
 - fix(resize): use registry instance, not Registry class
 - chore(deploy): add a counter on failed unpins
 - fix(rrb): support for scaling and pinning in ScaleExactResizeStrategySpec
 - chore(dependencies): Autobump spinnaker-dependencies (#2659)
 - fix(logging context): add application name to the MDC (#2658)
 - Adding database creation as part of the setup script (#2646)
 - fix(errors): Better error messages (#2653)
 - chore(queue): De-escalate requeue messages, as this is normal behavior (#2628)
 - fix(dependencies): update minutest dependency in orca-sql to fix build (#2654)
 - feat(clouddriver): Consider target capacity if supplied from `clouddriver` (#2648)
 - fix(webhooks): propogate body on failed calls (#2652)
 - chore(dependencies): Autobump spinnaker-dependencies (#2650)
 - fix(stage): removing immutable empty list from allDownstreamStages (#2647)
 - fix(FindImageFromCluster): infer regions from deploy stages (#2640)
 - fix(canary): capture exceptions from findImage in DeployCanaryStage
 - chore(dependencies): Autobump spinnaker-dependencies (#2644)
 - chore(dependencies): Autobump spinnaker-dependencies (#2642)
 - chore(dependencies): Autobump spinnaker-dependencies (#2641)
 - feat(core): Map/Unmap SGs and Load Balancers (#2629)
 - fix(notifications): Support multiple app-level notifications (#2622)
 - feat(core): Support pipeline correlation ids (#2639)
 - fix(webhooks): give better error message for monitored webhooks (#2635)
 - fix(queue): make SKIPPED a valid Task ExecutionStatus (#2638)
 - fix(mpt): Ensure that a merged template ends up with a `source` set (#2637)
 - chore(dependencies): Autobump spinnaker-dependencies (#2636)
 - feat(bake): if base name is empty string, remove from bake request (#2633)
 - chore(dependencies): Autobump spinnaker-dependencies (#2634)
 - feat(MPTv2): Adds delete by version and digest for MPTs. (#2631)
 - chore(dependencies): Autobump spinnaker-dependencies (#2630)
 - chore(mysql): adding an init script for mysql (#2627)
 - chore(dependencies): Autobump spinnaker-dependencies (#2626)
 - fix(kubernetes): Fix possible NPE with `WaitForManifestStableTask` (#2624) (#2625)
 - feat(MPTv2): Adds ops for versioned v2 MPTs. (#2623)
 - fix(kubernetes): Fix possible NPE with `WaitForManifestStableTask` (#2624)
 - feat(trafficguards): allow disabling of traffic guards (#2598)
 - chore(logging): Log request data alongside pipeline id for traceability
 - feat(queue): Make `taskStartTime` available on MDC context (#2615)
 - chore(dependencies): Autobump spinnaker-dependencies (#2618) (#2619)
 - chore(dependencies): Autobump spinnaker-dependencies (#2618)
 - fix(applications): Validate app names based on cloud provider. (#2604)
 - chore(dependencies): Autobump spinnaker-dependencies (#2616) (#2617)
 - chore(dependencies): Autobump spinnaker-dependencies (#2616)

#### Rosco  - af545ba...95a2e29
 - chore(dependencies): Autobump spinnaker-dependencies (#358)
 - config(provider/azure): update the packer image base vm size (#337) (#356)
 - feat(provider/azure): Use Azure Managed Disk instead of VHD in bake (#327) (#357)
 - chore(dependencies): Autobump spinnaker-dependencies (#349)
 - fix(build): make gradle use https (#345)
 - chore(dependencies): Autobump spinnaker-dependencies (#341)
 - chore(dependencies): Autobump spinnaker-dependencies (#340)
 - chore(dependencies): Autobump spinnaker-dependencies (#339)
 - chore(dependencies): Autobump spinnaker-dependencies (#338)
 - config(provider/azure): update the packer image base vm size (#337)
 - chore(dependencies): Autobump spinnaker-dependencies (#336)
 - chore(dependencies): Autobump spinnaker-dependencies (#335)
 - chore(dependencies): Autobump spinnaker-dependencies (#333)
 - chore(dependencies): Autobump spinnaker-dependencies (#332)
 - feat(provider/azure): Use Azure Managed Disk instead of VHD in bake (#327)
 - chore(dependencies): Autobump spinnaker-dependencies (#331)
 - chore(dependencies): Autobump spinnaker-dependencies (#329)
 - chore(dependencies): Autobump spinnaker-dependencies (#328)
 - chore(dependencies): Autobump spinnaker-dependencies (#325) (#326)
 - chore(dependencies): Autobump spinnaker-dependencies (#325)
 - chore(dependencies): Autobump spinnaker-dependencies (#322) (#323)
 - chore(dependencies): Autobump spinnaker-dependencies (#322)
