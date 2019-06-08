---
layout: post
title: v2.5.0 Armory Release (OSS Release 1.14.3)
order: -20190608004538
hidden: false
---

# 06/08/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
There are currently no known issues with this release.


## Highlighted Updates
### Armory

**Terraformer**

* You can now select your Terraform version
* Added support for Terraform Workspaces


###  Spinnaker Community Contributions

[Spinnaker 1.14.3 Release Notes](https://www.spinnaker.io/community/releases/versions/1-14-3-changelog)  

<br><br><br>
## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.5.0-rc169
timestamp: "2019-06-07 23:27:03"
services:
  clouddriver:
    version: 4.5.3-b343903-07db9e9-rc109
  deck:
    version: 2.0.0-9e49836-5a941ed-rc10
  dinghy:
    version: 0.0.3-4c4879c-rc7
  echo:
    version: 2.5.0-95a01ea-e23ee15-rc112
  fiat:
    version: 1.5.0-7c1b280-381db2c-rc103
  front50:
    version: 0.17.0-18ed588-0540599-edge5
  gate:
    version: 1.8.2-4106a87-ee90e98-rc103
  igor:
    version: 1.3.0-15850d3-b3f354f-rc104
  kayenta:
    version: 0.8.1-39c3a6b-cf89374-edge5
  monitoring-daemon:
    version: 0.13.0-bf01bf2-rc1
  monitoring-third-party:
    version: 0.13.0-bf01bf2-rc1
  orca:
    version: 2.7.1-fd7fa3e-6ceeba0-rc108
  rosco:
    version: 0.12.0-e1fc510-59f7929-edge5
  terraformer:
    version: 0.0.1-71c7209-rc13
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - e37d9a2...4c4879c
  - chore(testing): More builder coverage (#16)
 - task(tests): Upped code coverage for render.go (#15)
 - fix(bitbucket-cloud): consolidates bitbucket server and bitbucket-cloud to work with Echo refactor (#10)
 - fix(timer): make sure we stop the timer, fix spelling mistake (#14)
 - feat(monitor): monitor redis. if it goes away, stop dinghy (#13)
 - chore(redis): throw fatal when we can't connect to redis. up log verbosity for redis (#12)
 - task(testing): Add pipelineIDFunc unit tests (#11)
 - refactor(render): Refactoring renderer so it can be a runtime decision (#9)
 - feat(events): send rendered modules and dinghyfiles to armory echo (#8)
 - refactor(dinghy): Move main logic into module (#7)

#### Terraformer&trade; - cc82d20...71c7209
 - chore(log): improve logs (#69)
 - feat(locking): allow disable of backend lock with flag (#68)
 - feat(workspaces): select workspace for stage (#67)
 - chore(make): auto-incr git tags for releases (#66)
 - fix(error): we should return an error if the terraform version is missing (#65)
 - feat(redis): add redis monitor, proper logging passthrough (#63)
 - feat(version): select terraform version at runtime (#64)

#### Armory Clouddriver  - ccad514...b343903
 - chore(build): Update default clouddriver.yml (#36)
 - fix(build): Fix app packaging (#35)
 - fix(beans): Object mapper is now added to Main. Remove workaround (#34)
 - chore(build): Upgrade to Spring boot2, gradle5, dep via kork (#33)

#### Armory Deck  - 9c13904...9e49836
 - feat(provider/azure): import azure module (#510)
 - chore(dependencies): 2.5.x dependencies update (#509)

#### Armory Echo  - ae6694f...95a01ea
 - chore(build): Update echo.yml + build (#105)
 - fix(boot2): Packaging + kebab casing (#104)
 - chore(build): Upgrade to Spring boot2, gradle5, dep via kork (#103)

#### Armory Fiat  - 641cb40...7c1b280
 - chore(build): Update fiat-package paths and Dockerfile (#21)
 - fix(build): Spring boot2 packaging (#20)
 - chore(build): upgrade to gradle5 spring-boot 2, etc (#19)

#### Armory Front50  - 18ed588
No Changes

#### Armory Gate  - 68ad717...4106a87
 - chore(build): Enable local dev, update default gate.yml (#65)
 - fix(springboot2): Fix build and kebab casing (#64)
 - chore(build): Gradle5, dependencies in kork (#63)

#### Armory Igor  - faf13ca...15850d3
 - chore(build): Update igor.yml & package (#25)
 - fix(build): Fix distribution (#24)
 - chore(build): Gradle 5, kork dependencies (#23)

#### Armory Kayenta  - 39c3a6b
No Changes

#### Armory Orca  - 3ae75fe...fd7fa3e
 - feat(locking): support disabling locks on backend ops. default: true (#43)
 - chore(build): Update orca.yml + package (#41)
 - feat(workspace): support terraform workspace selection (#40)
 - fix(boot2): Fix packaging and kebab casing (#39)
 - feat(version): support dynamic terraform version for run (#37)
 - chore(build): Gradle 5, dependencies via kork (#36)

#### Armory Rosco  - e1fc510
No Changes



###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release: 

[Spinnaker 1.14.3](https://www.spinnaker.io/community/releases/versions/1-14-3-changelog#individual-service-changes)  


#### Clouddriver  - a7ce3a5...07db9e9
 - fix(cf): remove sensitive information from credentials payload (#3752) (#3754)
 - fix(kubernetes): Allow namespaces that don't exist in validation (#3748) (#3750)
 - perf(kubernetes): Improve performance of cache kind lookup (#3741) (#3745)
 - perf(kubernetes): Reduce memory allocation during caching cycles (#3736) (#3744)
 - fix(kubernetes): add cleaned up artifact manifests to output (#3711) (#3742)
 - fix(kubernetes): Properly handle empty kubectl input stream (#3734) (#3739)
 - fix(cf): Exponentially backoff when Cloud Foundry is unavailable (#3725) (#3726)
 - fix(ecs): Add image info to cluster's server groups (#3702) (#3720)
 - fix(provider/azure): Fix several issues in Azure Load Balancer (#3713) (#3714)
 - fix(artifacts): resolve version of artifacts (#3705) (#3708)
 - fix(runJob/kubernetes): collect pods and status (#3697) (#3707)
 - fix(cf): cacheTime should be stored as a long (#3704) (#3706)
 - fix(cf): only create artifact metadata for Maven artifacts (#3687) (#3689)
 - fix(runJob): fix v1 job collection (#3676) (#3677)
 - fix(appengine): Allow gcloud path to be configured (#3674) (#3675)
 - fix(cf): separate ci build and artifact info (#3670) (#3672)
 - fix(provider/kuberneteres): can not load servergroup when dnsPolicy is set as 'None'. (#3663) (#3667)
 - fix(provider/kuberneteres): can not load servergroup when dnsPolicy is set as 'None'. (#3663) (#3668)
 - feat(provider/azure): Add Azure Load Balancer as another type of load balancer than Azure Application Gateway (#3646)
 - chore(*): Apply codestyles to clouddriver (#3662)
 - chore(*): Bump spinnaker-dev plugin (#3661)
 - feat(cloudformation): support cfn tags (#3625)
 - fix(cloudformation): force update only when account and region match (#3576)
 - fix(titus): set default disruption interval to 10m (#3658)
 - feat(ecs): Support non-load-balanced services (#3660)
 - fix(ecs): allow sub-org ecr repos (#3633)
 - fix(cf): add ci build info under build info (#3655)
 - fix(core): Spring does not override default configuration files (#3656)
 - test(gce): Fix GCE upsert image tags test (#3657)
 - refactor(runJob): v2 job provider tests (#3651)
 - fix(titus): only set containerHealthProviders if front50 says to (#3652)
 - Clouddriver to boot2 (#3650)
 - feat(kubernetes): Add metrics support to live manifest mode (#3649)
 - fix(provider/azure): add logic to remove associated security group from subnet while deleting firewall (#3647)
 - fix(titus): If a run job spits out a yaml file, we were parsing it as properties. Now we parse it as yaml. (#3645)
 - fix(docker): Added missing insecureRegistry property (#3616)
 - fix(amazon): use source credentials when retrieving scaling policies to copy (#3641)
 - fix(ecs): Retry on ECS service eventual consistency (#3628) (#3637)
 - fix(kubernetes): Fail validation if account has no namespaces (#3639)
 - fix(aws): Image endpoint returning null server groups (#3445)
 - fix(titus): ignore migration policy if set to "systemDefault" (#3640)
 - refactor(gce): Remove some redundant arguments from GCEUtil.queryImage (#3624)
 - refactor(kubernetes): Simplify v2 account creation code (#3634)
 - feat(jobproviders): k8s v2 getFileContents (#3620)
 - fix(provider/azure): Fail to destroy server group when there is only one server group (#3635)
 - fix(provider/azure): update the error message when it failed to destroy load balancer (#3636)
 - fix(cf): previously unhandled exception from bad application state (#3631) (#3632)
 - fix(cf): previously unhandled exception from bad application state (#3631)
 - feat(titus) : Update job disruption operation (#3627)
 - refactor(kubernetes): Simplify account creation code (#3630)
 - feat(titus): use default disruption budget if none supplied (#3629)
 - feat(ecs): Add service discovery support (#3604)
 - feat(ecs): Configure tags (#3609)
 - feat(ecs): Support for placement constraints & platform version (#3610)
 - fix(ecs): Retry on ECS service eventual consistency (#3628)
 - fix(core): Adjust build order to reduce build times (#3623)
 - chore(dependencies): Autobump spinnaker-dependencies (#3626)
 - fix(provider/google): ServiceAccount should be a Set<ServiceAccount> (#3613)
 - refactor(runJob/kubernetes): don't record logs (#3617)
 - fix(titus): convert RateUnlimited flag to boolean (#3622)
 - fix(titus): serialize empty RateUnlimited field in DisruptionBudget (#3621)
 - feat(titus): enable reads of job disruption budgets (#3618)
 - chore(dependencies): Bump dependencies to 1.44.0 (new kork + fiat) (#3615)
 - fix(runJob/kubernetes): defer cleanup to k8s (#3614)
 - feat(cf): add build info to server group (#3612)
 - chore(*): Bump dependencies to 1.42.0 (#3611)
 - feat(provider/google): Support service account security groups (#3608)
 - feat(provider/kubernetes): replace annotation support (#3603)
 - fix(aws): AllowLaunchAtomicOperation - Add retries when resolving AMI (#3607)
 - chore(dependencies): ensure direct dependency on kork-secrets-aws (#3606)
 - fix(provider/kubernetes): Fix cache refresh timeout for HA clouddriver (#3600) (#3605)
 - feat(cf): Added support for rolling red black deployments (#3602)
 - fix(cf): Create / Delete Service Key timeouts (#3601)
 - fix(provider/kubernetes): Fix cache refresh timeout for HA clouddriver (#3600)
 - feature(google): Add a SetStatefulDisk operation. (#3598)
 - refactor(provider/kubernetes): Remove reflection from cache constructors (#3597)
 - chore(sql): remove hasApplicationIndex property
 - feat(cf): Implement on-demand caching (#3537)
 - fix(provider/google): Prevent returning all security groups targeting (#3593) (#3594)
 - fix(provider/google): Prevent returning all security groups targeting (#3593)
 - docs(lambda): Update lambda function API documentation #4213 (#3570)
 - chore(openstack): remove openstack provider (#3584)
 - chore(dependencies): Autobump spinnaker-dependencies (#3591)
 - feat(cf): Delete Service Key (#3561)
 - feat(sql): preparing sql backend for upstream
 - feat(cats/sql): support for indexing and retrieving by application
 - fix(sql): cleanup MDC agentClass additions
 - fix(sql): ensure shared coroutine scope
 - feat(sql): admin controller to drop tables from alt-namespace
 - fix(cats/sql): guard against overly long resource ids
 - feat(cats/sql): cleanup agent for stale onDemand keys
 - chore(cats/sql): table size metrics
 - feat(cats-sql): admin controller to assist in namespace flips
 - fix(sql): apply onDemand cleanup avoidance to all agents
 - feat(sql): agent information on MDC
 - fix(sql): onDemand agents manage their own evictions
 - chore(sql): log when created a threadpool based couroutine context
 - fix(sql): pass withAsync state in DataWithRelationshipPointersResult object
 - chore(sql): fix async spectator tag
 - feat(cats-sql): optinally use async when fetching > 2 * readBatchSize items
 - chore(sql): remove typesWithoutFwdRelationships optimization
 - feat(sql): dynamic config settings for sqlcache
 - fix(sql): Suppress table not exist exceptions on fresh db
 - chore(sql): implement existingIdentifiers for k8s v2 compatibility
 - fix(sql): dont increment evict metrics if evictAll is called without ids
 - fix(sql): dedupe relationships while parsing resultSet
 - fix(sql): metrics fix
 - chore(sql): test reading collections larger than batch size
 - fix(sql): fix chunked reads bug
 - feat(sql): namespace lock table for SqlAgentScheduler
 - feat(sql): load cache data and additional relationship keys in a single query
 - feat(sql): sql version of ProviderCache.addCacheResult
 - fix(sql): make sql.enabledAgents regex case insensitive
 - fix(sql): fix relationship filtering
 - chore(sql): refactor retry impl in sql cache
 - feat(sql): prework support for dual task repository usage
 - chore(cats-sql): companion objs and precompiled regexs
 - chore(sql): remove remaining refs to location column
 - fix(sql): onDemand fixes
 - feat(sql): test coverage for SqlProviderCache
 - feat(sql): retrysupport
 - fix(sql): resource cleanup fix
 - fix(sql): fix batched updates
 - fix(sql): cats-sql gradle test detection
 - feat(sql): write batching, test fixes
 - fix(sql): dont swallow sql select exceptions
 - chore(*): update package names
 - feat(sql): sql cache metrics
 - feat(sql): onDemand support
 - fix(sql): remove unnecessary lock cleanup conditional
 - fix(sql): concurrency bug in sql scheduler
 - feat(sql): correct time unit
 - feat(sql): scheduling agent constraint handling
 - fix(sql): correctly account for available agents
 - fix(sql): fix cats-sql tests
 - feat(sql): sql agent scheduler
 - feat(cats/sql): configurable table prefix
 - fix(sql): initial cats-sql implementation
 - feat(cats/sql): support for indexing and retrieving by application
 - fix(cats/sql): guard against overly long resource ids
 - feat(cats-sql): admin controller to assist in namespace flips
 - fix(sql): Ignore internal SqlTask properties
 - fix(sql): Fix thisInstance task state query
 - feat(sql): Support named connection pools
 - feat(sql): rel table index to support joins
 - fix(sql): sqlTask completion fix
 - fix(sql): task cleanup agent, now with the cleaning power of mister sparkle
 - fix(sql): txn around task read
 - fix(sql): task logging
 - fix(sql): SqlTask internal consistency issue
 - feat(sql): SqlTask consistency improvements
 - feat(sql): SqlTaskRepository tests
 - feat(sql): namespace lock table for SqlAgentScheduler
 - fix(sql): refactor retry impl in sql cache
 - feat(sql): prework support for dual task repository usage
 - feat(sql): sql.readOnly support
 - feat(sql): cats-sql agent locks schema tweak
 - feat(sql): sql agent scheduler
 - feat(sql): clouddriver-sql module initial commit
 - feat(sql): initial SqlTask implementation
 - feat(kubernetes): validate manifests for spinnaker-managed rollout strategies (#3589)
 - refactor(google): Add an abstraction around {Region,}InstanceGroupManagers. (#3578)
 - chore(dependencies): Autobump spinnaker-dependencies (#3588)
 - fix(provider/google): Waits for ssl cert and url map ops. (#3583) (#3585)
 - fix(provider/google): Waits for ssl cert and url map ops. (#3583)
 - chore(dependencies): Autobump spinnaker-dependencies (#3568)
 - fix(aws): DetachInstances op: only run min capacity checks when decrementDesiredCapacity is true (#3581)
 - fix(kubernetes): include unclassified kinds in spinnakerKindMap so they can be surfaced for deletion (#3580) (#3582)
 - fix(kubernetes): include unclassified kinds in spinnakerKindMap so they can be surfaced for deletion (#3580)
 - refactor(google): switch the caching log messages from INFO to DEBUG. (#3579)
 - fix(aws/deploy): image lookup when deploying my imageId rather than name (#3575)
 - feat(lambda): Ability to get details of an individual function #4214 (#3569)
 - fix(lambda): Current implementation of upsert lambda function does not work #4304 (#3571)
 - fix(artifacts): Maven release artifact resolution by version results in 404 (#3574)
 - fix(titus): Map titus containerIp to privateIpAddress (#3572)
 - chore(*): Seeding initial OWNERS file (#3573)
 - feat(provider/google): Support Shielded VM policies (#3566)
 - fix(aws/caching): only add application attribute to authoritative types (#3567)
 - fix(cf): cf exception should display message from throwable (#3556) (#3560)
 - fix(cf): handle timeouts in CF api calls better (#3557) (#3559)
 - fix(kubernetes): Initialize credentials after CRDs are registered (#3563) (#3565)
 - fix(kubernetes): Initialize credentials after CRDs are registered (#3563)
 - fix(google): correctly filter instanceCacheData in GoogleClusterProvider.clusterFromCacheData (#3562) (#3564)
 - fix(google): correctly filter instanceCacheData in GoogleClusterProvider.clusterFromCacheData (#3562)
 - fix(titus): Don't copy migrationPolicy from source during job creation (#3553)
 - fix(provider/kubernetes): Support Windows paths validation (#3232) (#2970)
 - fix(cf): cf exception should display message from throwable (#3556)
 - fix(cf): donâ€™t attempt to start app if instance count is 0 (#3555) (#3558)
 - fix(cf): handle timeouts in CF api calls better (#3557)
 - fix(cf): donâ€™t attempt to start app if instance count is 0 (#3555)
 - fix(auth): s/applicationName/appName when determining application name (#3554)
 - feat(provider/kubernetes): Add traffic options to deploy description (#3551)
 - fix(provider/azure): Enable Azure Load Balancer from Azure VM Scale Set (#3552)
 - fix(cf): Fix server group name resolver (#3549) (#3550)
 - fix(cf): Fix server group name resolver (#3549)
 - feat(cf): Create Service Key (#3545)
 - feat(cf): add deployment info to deployment result (#3538)
 - feat(provider/azure): Add redblack strategy for azure (#3533)
 - feat(metrics): Add metrics for deleteSnapshot operation (#3498)
 - feat(kubernetes): Use streaming job executor for k8s manifests (#3531)
 - fix(provider/cf): Get latest server group from API rather than cache (#3541) (#3548)
 - fix(provider/cf): Get latest server group from API rather than cache (#3541)
 - fix(provider/cf): Fix clone from manifest artifact (#3540) (#3546)
 - fix(provider/cf): Fix clone from manifest artifact (#3540)
 - fix(titus): Additional fields for job disruption budget (#3542)
 - fix(titus): Support additional relocation description for disruption budget (#3535)
 - feat(moveTitusTasks): Add support for tasks moving between jobs (#3516)
 - fix(provider/gce): Wait on LB backend service updates. (#3532) (#3534)
 - fix(provider/gce): Wait on LB backend service updates. (#3532)
 - refactor(core): Modularize JobExecutorLocal.runJob (#3529)
 - fix(aws): call correct constructor when autowiring DefaultScalingPolicyCopier (#3528)
 - feat(amazon): use semantically meaningful name when copying scaling policies (#3526)
 - feat(amazon): return launch config name on modify operation (#3525)
 - fix(cf): Clone server group sets environment variables in new server group (#3520) (#3527)
 - fix(cf): Clone server group sets environment variables in new server group (#3520)
 - chore(dependencies): Autobump spinnaker-dependencies (#3513)
 - fix(provider/google): Paginates autoscaler aggregated list calls. (#3518) (#3522)
 - fix(provider/google): Paginates autoscaler aggregated list calls. (#3518)
 - feat(artifacts): Support relative chart urls (#3515)
 - fix(core): add `cloudProvider` to `LoadBalancerServerGroup` as expected by deck (#3517) (#3519)
 - fix(core): add `cloudProvider` to `LoadBalancerServerGroup` as expected by deck (#3517)
 - feat(kuberenetes): v2 run job stage (#3501)
 - fix(aws): ALB support for serving pendingOnDemandRequests (#3509)
 - feat(aws): Remove all ec2-classic migration code (#3510)
 - fix(provider/google): Wait on autoscaler operations. (#3508)
 - fix(cf): correct invalid route message (#3506) (#3507)
 - fix(cf): correct invalid route message (#3506)
 - chore(dependencies): Autobump spinnaker-dependencies (#3504)
 - fix(aws): fix ALB onDemand caching (#3505)
 - fix(aws): use asg.instances to resolve instance members instead of cache relationships (#3503)
 - refactor(artifacts): Rewrite Maven artifact account with aether (#3502)
 - chore(dependencies): Autobump spinnaker-dependencies (#3500)
 - fix(titus): remove TitusHealthIndicator (#3499)
 - fix(provider/cf): Form-based manifest input for clone server group (#3496) (#3497)
 - fix(provider/cf): Form-based manifest input for clone server group (#3496)
 - fix(aws/alb): improve perf of targetgroup instance app resolution (#3494)
 - fix(aws): fix cluster provider issue when using sql app indexing (#3495)
 - fix(aws/edda): improve perf of edda lb instance health caching (#3492)
 - fix(titus): fix and hydrate titus instance search results (#3491)
 - fix(cf): Unmap LBs too aggressive (#3489) (#3493)
 - fix(cf): Unmap LBs too aggressive (#3489)
 - fix(titus): set adjustmentType when copying scaling policies on clone (#3490)
 - fix(provider/azure): re-add resource names to the deployment name (#3487)
 - fix(cf): Remove "//" from routes (#3486) (#3488)
 - fix(cf): Remove "//" from routes (#3486)
 - feat(provider/azure): Add instance tags in AzureServerGroupDescription (#3485)
 - feat(cats): initial support for indexing resource by application (#3481)
 - fix(titus): Handle empty cachedata results while getting an instance (#3431)
 - fix(testing): Fixed Unable to create aws lambda functions #4128 (#3480)
 - fix(titus): fix erroneous error log noise (#3484)
 - fix(kubernetes): Infer API version when missing on patch manifest (#3482) (#3483)
 - fix(kubernetes): Infer API version when missing on patch manifest (#3482)

#### Deck  - 6a9b0a2..5a941ed
 - chore(build/azure): make azure follow module conventions
 - fix(provider/azure): fix missing closing tag (#7099)
 - fix(kubernetes): fix req. artifacts to bind selector in patch manifest stage (#7095) (#7096)
 - chore(deps): bump @spinnaker/kayenta from 0.0.79 to 0.0.81 (#7086) (#7089)
 - fix(deps): hoist appropriate version of d3-format (#7084) (#7088)
 - fix(cf): Change CUPS label to Route Service URL (#7090) (#7091)
 - fix(amazon): explicitly import d3 for scaling policy graphs (#6989) (#7072)
 - fix(runJob/kubernetes): reliably display logs (#7060) (#7061)
 - fix(provider/azure): Fix UI for Azure Load Balancer in server group configuration (#7055) (#7057)
 - fix(runJob/kubernetes): use explicit pod name (#7039) (#7047)
 - fix(kubernetes): fix runjob stage init (#7029) (#7031)
 - fix(cf): server group header build links should precede images (#7027) (#7038)
 - fix(authz): Handle apps without execute permissions (#7017) (#7025)
 - fix(artifacts): HTTP default artifact needs reference field (#6836) (#7026)
 - fix(kubernetes): Fix NPE in bake manifest details (#7022) (#7023)
 - fix(artifacts): Artifacts are shown on pipeline execution when artifactsRewrite is enabled (#6973) (#7014)
 - fix(core): request project pipeline configs just in time (#6980) (#7006)
 - fix(core): request project pipeline configs just in time (#6980) (#7005)
 - fix(artifacts): Fix fetching helm artifact versions (#6995) (#6998)
 - fix(artifacts): Fix fetching helm artifact versions (#6995) (#6999)
 - fix(cf): add Artifactory link (#6994) (#6996)
 - chore(deps): bump @spinnaker/kayenta to 0.0.79 (#6988)
 - feat(provider/azure): Add Azure Load Balancer as another type of load balancer than Azure Application Gateway (#6955)
 - chore(core): Bump version to 0.0.364 (#6986)
 - fix(titus): Shimming the execution logs for preconfigured jobs (#6972)
 - Bump package core to 0.0.363 and amazon to 0.0.189 (#6985)
 - refactor(amazon): de-angularize load balancer transformer (#6984)
 - fix(core): show no results message on v2 search (#6982)
 - feat(core): allow dynamic resolution of docker insights URL (#6981)
 - fix(aws): add NLB info to target group help text (#6977)
 - fix(cf): reorg build info details on server group detail and summary (#6983)
 - feat(runjob): capture output ui (#6978)
 - chore(deps): bump @spinnaker/kayenta to 0.0.77 (#6976)
 - fix(core): Add expected artifacts to inheritable mptv2 collections (#6975)
 - feat(cloudformation): support cfn tags (#6928)
 - refactor(core): Reactified parameters for triggers (#6923)
 - feat(gcb): allow pre-artifacts-rewrite expected artifacts to be selected in gcb stage (#6948)
 - fix(executions): URI Encode pipeline names (#6971)
 - chore(kubernetes): Bump version to 0.0.22 (#6969)
 - fix(server group): show a CI build link in server group.buildinfo (#6967)
 - feat(core): Enable manual execution of mptv2 pipelines (#6968)
 - chore(deps): bump @spinnaker/kayenta from 0.0.75 to 0.0.76 (#6965)
 - Bump package core to 0.0.362 and titus to 0.0.96 (#6964)
 - feat(stages): Support SpEL autocompletion for Evaluate Variables stage editor (#6958)
 - fix(titus): consider platformHealthOnly flag when setting budget health (#6963)
 - fix(core/presentation): Handle non-string inputs to Markdown component using .toString() (#6960)
 - fix(core/executions): make text on truncated params selectable (#6959)
 - fix(artifacts): Allow defaulting in execution artifact (#6961)
 - feat(stages): Add Concourse stage (#6957)
 - Bump package core to 0.0.361 and titus to 0.0.95 (#6954)
 - fix(core): use new ProviderSelectionService everywhere (#6953)
 - fix(titus): import TitusReactInjector from subdirectory (#6952)
 - Bump package core to 0.0.360 and amazon to 0.0.188 and titus to 0.0.94 (#6951)
 - feat(titus): allow editing of existing disruption budget (#6950)
 - feat(core): compress AWS security groups before caching (#6947)
 - chore(*): cleanup unused files (#6949)
 - refactor(core): convert providerSelection modal to React (#6936)
 - chore(titus): Bump version to 0.0.93 (#6946)
 - feat(titus): show disruption duration in readable format (#6945)
 - chore(deps): bump @spinnaker/kayenta from 0.0.74 to 0.0.75 (#6944)
 - feat(kubernetes): expose rendered helm template in execution details (#6943)
 - fix(artifacts): remove stage references to removed artifacts in artifacts rewrite mode (#6939)
 - fix(bake/manifest): Preserve artifact account selection (#6937) (#6941)
 - Bump package core to 0.0.359 and titus to 0.0.92 (#6942)
 - feat(titus): show disruption budget in job details panel (#6938)
 - feat(gcb): accept gcb definition file as artifact (#6935)
 - fix(bake/manifest): Preserve artifact account selection (#6937)
 - feat(runJob/kubernetes): render external link (#6930)
 - feat(ecs): service discovery configuration (#6899)
 - feat(provdier/google): Display serviceAccount properties for firewall rules (#6929)
 - fix(core): use padding instead of margin on form flex columns (#6934)
 - fix(CRON): update links for CRON expression reference (#6933)
 - fix(titus): allow editing default policy options when toggling default (#6932)
 - fix(core/api): normalize API request urls (#6927)
 - Bump package core to 0.0.358 and titus to 0.0.91 (#6931)
 - feat(titus): job disruption budget UI (#6925)
 - fix(cf): Clone sg modal appears. Removed unused lb code. (#6915)
 - feat(roles): Add execute permission type to create new application. (#6901)
 - refactor(runJob/kubernetes): refactor exec details (#6924)
 - refactor(runJob/kubernetes): use joblogviewer (#6917)
 - feat(cf): add build info to server group (#6912)
 - feat(gcb): add gcb-specific execution details tab
 - chore(core): Bump version to 0.0.357 (#6921)
 - feat(core): modify form CSS for help text, group headers (#6920)
 - feat(core): add ChecklistInput form component (#6919)
 - fix(core): Fixed exception while configuring strategies (#6918)
 - fix(helm): Fix Helm artifact editor (names state unset) (#6914)
 - feat(provider/kubernetes): run job manifest artifacts (#6902)
 - chore(titus): Bump version to 0.0.90 (#6911)
 - feat(ecs): Configuration for platform version & placement constraints (#6906)
 - refactor(titus): Allow customization of instance details (#6908)
 - fix(cf): Allow deletion of non existing cluster (#6907)
 - Bump package core to 0.0.356 and docker to 0.0.38 and amazon to 0.0.187 (#6910)
 - fix(core): use relative imports for ReactSelectInput (#6909)
 - fix(core): update stage failure component when JSON changes (#6889)
 - fix(core): filter pipeline param choices by search text (#6903)
 - feat(ecs): Configure tags (#6905)
 - feat(aws): show ALB listener redirect info in details (#6904)
 - chore(*): Remove YOLO (#6900)
 - fix(provider/azure): improve react code for rollback function (#6898)
 - feat(cf): Added support for rolling red black deployments (#6897)
 - fix(core): Restore config button on exec view and dropdown for mptv2 (#6894)
 - feat(cf): Create service key SpEL expression (#6828)
 - refactor(cf): remove destination from the SG command model (#6892)
 - feat(cf): Reduce angular dependencies (#6893)
 - refactor(provider/azure): convert rollback function from angularjs to react (#6896)
 - feat(cf): Delete Service Key pipeline stage (#6844)
 - fix(core): Show all app selections when creating a pipeline from mptv2 (#6891)
 - fix(kubernetes): fix discrepancy between orca deploy stage model and artifacts rewrite stage model
 - fix(core): initialize default artifact with type (#6885) (#6886)
 - feat(core): UI for configuring pipelines from mptv2 (#6880)
 - chore(openstack): remove openstack provider (#6883)
 - feat(cf): Remove React shims from pipeline stages (#6856)
 - fix(docker): Fix subscription leak in DockerTriggerTemplate (#6874)
 - fix(core): do not overdo showing the auth modal (#6882)
 - fix(core): initialize default artifact with type (#6885)
 - refactor(stages): Wire up Pipeline validation to stage validateFn (#6881)
 - fix(kubernetes): hide manifest artifact selector in text mode
 - chore(core): Bump version to 0.0.355 (#6878)
 - fix(core): make imports relative on AccountSelectInput, RegionSelectInput (#6877)
 - chore(deps): [security] bump jquery from 3.3.1 to 3.4.0 (#6876)
 - Bump package (#6875)
 - fix(docker): Fix subscription leak in DockerTriggerTemplate (#6874)
 - refactor(stages): FormikStageConfig to provide Formik for StageConfigs (#6871)
 - chore(titus): Bump version to 0.0.89 (#6873)
 - fix(titus): correctly render JSON objects in run job details (#6872)
 - feat(kubernetes): remove rollout strategies feature flag
 - feat(kubernetes): validate text manifests when rollout strategies enabled
 - fix(kubernetes): handle k8s-specific account/region task keys in tasks history view (#6869)
 - config(provider/azure): add Azure logo at Stage and Resource appearence (#6868)
 - Bump package core to 0.0.353 and titus to 0.0.88 (#6867)
 - fix(core): conditionally show/label parameters section of execution bar (#6865)
 - chore(design): adds new icons (#6866)
 - feat(titus): Include links appropriately from property file contents (#6730)
 - fix(azure): remove unused imports (#6864)
 - chore(core): Bump version to 0.0.352 (#6863)
 - refactor(*): remove cache-clearing calls that do not do anything (#6861)
 - fix(core): do not assume READ and WRITE are set on app permissions attribute (#6862)
 - fix(stage): remove pipeline filter for findArtifactFromExecution (#6858)
 - chore(amazon): Bump version to 0.0.186 (#6860)
 - refactor(amazon): export load balancer choice modal, remove customization hook (#6859)
 - chore(*): Seeding initial OWNERS file (#6857)
 - Bump package core to 0.0.351 and docker to 0.0.36 and amazon to 0.0.185 and titus to 0.0.87 (#6855)
 - fix(provider/azure): Disabling Inbound NAT when Zones are enabled (#6853)
 - refactor(core/amazon): allow custom load balancer creation flow (#6852)
 - fix(titus): send serverGroupName when terminating instances (#6854)
 - fix(titus): correctly set dirty field on command viewstate (#6795)
 - Update README.adoc (#6823)
 - feat(help): Custom help link (#6842)
 - fix(cloudfoundry): ensure basic validation of artifacts (#6851)
 - feat(provider/google): Support Shielded VM policies (#6849)
 - chore: upgrade to react 16.8 (#6846)
 - fix(pipeline/executionStatus): "details" link hidden by scrollbar. (#6850)
 - feat(preconfiguredJobs): support produce artifacts (#6845)
 - fix(kubernetes): safer lookups for deploy stage validators (#6847)
 - feat(kubernetes): add rollout strategies to deploy manifest stage (#6841)
 - fix(core/pipeline): un-shadow parameter (#6843)
 - feat(core/pipeline): add execution UI for waitForCondition stage (#6826)
 - fix(artifacts): HTTP default artifact needs reference field (#6836)
 - feat(preconfiguredJob): logs for k8s jobs (#6840)
 - feat(k8s): Exclude inline base 64 artifact editing in k8s manifest (#6839)
 - feat(core/pipelineConfig): toggle pins individually (#6830)
 - fix(artifacts): Clean pipeline expected artifacts when triggers are removed (#6799)
 - fix(artifacts): Clean pipeline expected artifacts when triggers are removed (#6799)
 - fix(k8s): Fix deploy manifest (#6833) (#6837)
 - fix(k8s): Fix deploy manifest (#6833)
 - fix(provider/azure): Region can't be selected while creating loadbalancer with only one region (#6834)
 - fix(provider/azure): Simplify processed stages of rollback function (#6835)
 - feat(kuberntes): v2 runJob (#6831)
 - refactor(cf): use Observable to set state to prevent memory leaks (#6832)
 - fix(provider/azure): Enable Azure Load Balancer from Azure VM Scale Set (#6829)
 - feat(core/execution-parameters): condense parameters/artifacts and make it collapsable (#6756)
 - feat(cf): add deployment strategy to clone SG (#6827)
 - chore(github): add some tips to improve pull requests (#6825)
 - feat(kubernetes): feature-flagged support for kubernetes traffic management strategies (#6816)
 - feat(cf): Create Service Key pipeline stage (#6821)
 - fix(provider/cf): Clone model so Orca monitors the correct foundation for up instances (#6817) (#6822)
 - feat(core): Create pipeline from v2 template list
 - fix(provider/cf): Clone model so Orca monitors the correct foundation for up instances (#6817)
 - chore(kubernetes): refactor BasicSettings component to be usable in stages (#6820)
 - fix(triggers): Remove RunAsUser if pipeline permissions enabled for react triggers. (#6818)
 - feat(provider/azure): Add redblack strategy for azure (#6801)
 - fix(mptv2): clicking a view link on template list screen throws exception (#6815)
 - fix(provider/cf): Fix provider selection for resize stage in pipeline (#6754) (#6813)
 - fix(artifacts): default helm artifact editor is broken (#6811) (#6812)
 - fix(artifacts): helm artifact, replace object assignw with object spread (#6814)
 - fix(provider/cf): Fix provider selection for resize stage in pipeline (#6754)
 - fix(artifacts): default helm artifact editor is broken (#6811)
 - fix(google): revert "select all zones by default when deploying a regional gce server group (#6751)" (#6808) (#6809)
 - fix(google): revert "select all zones by default when deploying a regional gce server group (#6751)" (#6808)
 - fix(google): GCE create server group and load balancer fixes (#6806)
 - Bump package core to 0.0.350 and amazon to 0.0.184 (#6807)
 - fix(amazon): hide security groups on NLBs (#6803)
 - refactor(core): de-angularize ApplicationModelBuilder, fix project executions (#6802)
 - fix(google): fix autohealing health checks in deploy stages (#6804) (#6805)
 - fix(google): fix autohealing health checks in deploy stages (#6804)
 - fix(kubernetes): show Deployment clusters in Find Artifacts from Resource stages (#6794)
 - fix(triggers): Add lastSuccessfulBuild as a build option in Jenkins default artifact (#6797) (#6800)
 - fix(provider/cf): Make expected artifacts selectable as clone manifests (#6796) (#6798)
 - fix(triggers): Add lastSuccessfulBuild as a build option in Jenkins default artifact (#6797)
 - fix(provider/cf): Make expected artifacts selectable as clone manifests (#6796)
 - feat(mptv2): Add delete button & confirm modal to pipeline templates list (#6792)
 - Bump package amazon to 0.0.183 and titus to 0.0.86 (#6793)
 - fix(ecs): populate load balancers when configuring cmd (#6778)
 - fix(amazon): Added AWS/ApplicationELB namespace to cloudwatch namespaces (#6791)
 - fix(amazon): allow deletion of scaling policies without alarms (#6779)
 - chore(core): Bump version to 0.0.349 (#6790)
 - fix(core/pagerDuty): give appropriate app to PagerDutyWriter (#6789)
 - fix(pipeline): Fix target impedance validator for clone server group (#6785) (#6788)
 - fix(gremlin): Changed flag from features.gremlinEnabled to features.gremlin (#6776)
 - fix(gremlin): Changed flag from features.gremlinEnabled to features.gremlin (#6776)
 - chore(deps): bump @spinnaker/kayenta from 0.0.73 to 0.0.74 (#6786) (#6787)
 - fix(pipeline): Fix target impedance validator for clone server group (#6785)
 - chore(deps): bump @spinnaker/kayenta from 0.0.73 to 0.0.74 (#6786)
 - fix(artifacts): Persist default artifact account in ExpectedArtifactModal (#6783) (#6784)
 - fix(artifacts): Persist default artifact account in ExpectedArtifactModal (#6783)
 - fix(lint): Fix lint in pipeline templates list (#6782)
 - feat(templates): add Save button to export pipeline json modal (#6761)
 - fix(kubernetes): safe lookups for apiVersion on patch manifest deploy status (#6775) (#6781)
 - fix(kubernetes): safe lookups for apiVersion on patch manifest deploy status (#6775)
 - fix(kubernetes): fix validation for Find Artifact from Resource stage (#6777) (#6780)
 - fix(kubernetes): fix validation for Find Artifact from Resource stage (#6777)
 - feat(gcb): add Google Cloud Build stage (#6774)
 - chore(core): Bump version to 0.0.348 (#6773)
 - feat(core): provide link when task/stage fails due to traffic guards (#6772)
 - fix(ecs): Fix name of health check grace period attribute (#6746) (#6749)
 - fix(core): make chaos monkey opt-in for new apps (#6766)
 - chore(titus): Bump version to 0.0.85 (#6771)
 - fix(titus): send cloudProvider as a string to ConfigBinLink (#6770)
 - chore(titus): Bump version to 0.0.84 (#6769)
 - fix(titus): remove metricOptions field (#6768)
 - refactor(titus): remove config bin code (#6767)
 - chore(core): Bump version to 0.0.347 (#6765)
 - fix(core): send application when paging via PagerDuty (#6764)
 - chore(titus): Bump version to 0.0.83 (#6763)
 - style(titus): tweak styles for config bin modal (#6762)
 - chore(titus): Bump version to 0.0.82 (#6760)
 - refactor(titus): export more config bin stuff (#6759)
 - Bump package core to 0.0.346 and amazon to 0.0.182 and titus to 0.0.81 (#6758)
 - refactor(titus): generalize ConfigBin and export it (#6757)
 - fix(google): select all zones by default when deploying a regional gce server group (#6751) (#6753)
 - fix(google): select all zones by default when deploying a regional gce server group (#6751)
 - fix(google): add better help text around accelerators (#6750) (#6752)
 - fix(IAP) Fix refresher not enabling (#6740)
 - fix(google): add better help text around accelerators (#6750)
 - fix(core/projects): Submit task against the 'spinnaker' application (#6748)
 - feat(amazon): show certificate upload/expiration when selected for load balancers (#6731)
 - fix(trigger): add webhook to triggerTypes (#6747)
 - fix(ecs): Fix name of health check grace period attribute (#6746)
 - feat(core): add markdown functionality to custom app banners (#6745)
 - fix(cf): Repair Rollback Cluster pipeline stage (#6743) (#6744)
 - fix(cf): Repair Rollback Cluster pipeline stage (#6743)
 - feat(mptv2): add a search input to the mptv2 list (#6742)
 - fix(concourse): Support manual trigger execution by build number (#6738) (#6741)
 - fix(concourse): Support manual trigger execution by build number (#6738)
 - fix(core): Grey out execution actions for mptv2 pipelines (#6734)
 - fix(cf): Map/Unmap LBs and UI cleanup (#6737) (#6739)
 - fix(cf): Map/Unmap LBs and UI cleanup (#6737)
 - feat(ecs): docker image selection (#6687)
 - fix(provider/cf): Default clone operations to start on creation (#6735) (#6736)
 - fix(provider/cf): Default clone operations to start on creation (#6735)
 - feat(mptv2): add list screen for pipeline templates (#6723)
 - feat(tests): Add functional test for manual execution link (#6733)
 - fix:(core): Replace copy icon with descriptive text in template modal (#6725)
 - fix(tests): update app creation fixture after tasks endpoint changed (#6732)
 - fix(amazon): consider all target group names when creating new ones (#6727)
 - refactor(forms): Creating contexts for Layout and Help (#6718)
 - fix(stages): Do not delete stageTimeoutMs when rendering (#6729)
 - fix(artifacts): Exclude unmatchable expected artifact types (#6709) (#6728)
 - fix(artifacts): Exclude unmatchable expected artifact types (#6709)
 - Bump package core to 0.0.345 and amazon to 0.0.181 and titus to 0.0.80 (#6726)
 - fix({core,cloudfoundry}/deploy): better red/black, rolling red/black help text (#6699)
 - fix(titus): use arrow function to avoid bad this binding in callback (#6724)
 - feat(titus): Surface env and resources for runjob stage (#6697)
 - perf(core): cache subnets in window session (#6717)
 - refactor(core): use non-deprecated tasks endpoint for app tasks (#6721)
 - feat(provider/azure): Add custom tags support in server group configuration (#6722)
 - fix(triggers): Add timeout to polling on manual trigger (#6707)
 - fix(concourse): Fix concourse trigger config (#6715) (#6720)
 - fix(concourse): Fix concourse trigger config (#6715)
 - fix(kubernetes): fix copy manifest from infrastructure button (#6719)
 - fix(artifacts): Fix SpEL text input used in React components (#6712) (#6714)
 - fix(cf): Share / unshare execution details (#6710) (#6713)
 - fix(artifacts): Fix SpEL text input used in React components (#6712)
 - fix(cf): Share / unshare execution details (#6710)


#### Echo  - 9ea33eb...e23ee15
 - fix(webhooks): handle NPE when source invalid (#552) (#554)
 - fix(webhooks): handle NPE when source invalid (#552) (#553)
 - chore(*): Bump spinnaker-dev plugin (#548)
 - feat(triggers): Add Nexus webhook artifact extractor (#547)
 - fix(pipelines): Don't swallow exceptions when parsing pipeline templates (#546)
 - fix(email): fix email parser to not fail on multiple addresses (#545)
 - fix(twilio): Correctly read the twilio config (#544)
 - chore(*): Remove stale comments from gradle file (#541)
 - feat(gcb): Call igor to extract artifacts when triggering (#539)
 - chore(*): Applying java codestyles (#537)
 - fix(core): Spring does not override default configuration files. (#536)
 - chore(dependencies): ensure direct dependency on kork-secrets-aws (#535)
 - chore(dependencies): update to spring boot 2 and kork BOM dependency management (#534)
 - chore(triggers): add application and pipeline fields to Trigger (#532)
 - fix(triggers): avoid single event causing >1 executions of same pipeline (#531)
 - feat(gcb): Notify igor of GCB builds (#527)
 - feat(auth): Propagate `X-SPINNAKER-ACCOUNTS` when triggering pipelines (#530)
 - chore(dependencies): Autobump spinnaker-dependencies (#528)
 - fix(triggers): prevent double-triggering for pipelines with >1 triggers (#529)
 - chore(dependencies): Autobump spinnaker-dependencies (#519)
 - perf(triggers): index triggers based on type (#526)
 - feat(declarative): changed Keel endpoint URL
 - fix(pubsub): Don't log all pubsub events (#524)
 - refactor(pubsub): Encapsulate logic for creating events (#523)
 - fix(triggers): fetch latest config from front50 on impending trigger (#518)
 - chore(*): Seeding initial OWNERS file (#522)
 - fix(triggers): Ensure build number is present (#521)
 - fix(mpt): fix planing of v1 pipelines for manual triggers (#512) (#520)
 - fix(retrofit): make sure all retrofit clients use Jackson (#515)
 - refactor(logging): Log better messages when events fail (#514)
 - fix(triggers): Better error handling for trigger failures (#513)
 - fix(mpt): fix planing of v1 pipelines for manual triggers (#512)
 - fix(events): Guard against NPE when artifacts is not set. (#511)
 - fix(pipeline): if map -> Pipeline fails, log and move on (#510)
 - feat(artifacts): populate artifacts for manual trigger (#509)
 - fix(MPT): Fixes triggering for template triggers. (#504) (#508)
 - chore(dependencies): Autobump spinnaker-dependencies (#507)
 - feat(buildmasters): Permission support for build masters (CI's) (#467)
 - fix(MPT): Fixes triggering for template triggers. (#504)
 - chore(dependencies): Autobump spinnaker-dependencies (#506)
 - chore(dependencies): Autobump spinnaker-dependencies (#505)
 - fix(scheduler): springify quartz jobs (#494)

#### Fiat  - 13f855f...381db2c
 - fix(apps): Clear resource provider caches to ensure up-to-date data (#413)
 - chore(*): Bump spinnaker-dev plugin (#407)
 - fix(core): Spring does not override default configuration files (#406)
 - fix(ldap): Disable LDAP health indicator (#405)
 - feat(roles): Handle `allowAccessToUnknownApplications` when determining `EXECUTE` (#402)
 - feat(api): Log any access granted as part of a legacy fallback. (#400)
 - fix(api): Rebuild the legacy fallback if it has no account grants (#399)
 - chore(*): Apply java codestyle (#395)
 - feat(google): Add support for using group email as a Fiat role name (#389)
 - feat(roles): Add execute authz when its missing. (#390)
 - chore(build): Enable gradle parallel execution (#393)
 - fix(test): Fix flaky test by setting cache expire immediately after write (#392)
 - chore(dependencies): ensure direct dependency on kork-secrets-aws (#391)
 - upgrades fiat to boot2 and new BOM dependency management (#388)
 - chore(build): upgraded to gradle 5.0 (#383)
 - chore(*): Seeding initial OWNERS file (#374)
 - fix(api): Support `legacyFallback` for `BUILD_SERVICE` (#385)
 - chore(dependencies): Autobump spinnaker-dependencies (#384)
 - feat(roles): Add Execute as a type of Authorization (#373)
 - feat(api): Support overriding the connect/read timeouts for `FiatService` (#382)
 - chore(dependencies): Autobump spinnaker-dependencies (#372)
 - fix(api): s/maxBackoffMills/maxBackoffMillis (#381)
 - Revert "fix(front50): Update Front50 cache periodically and serve live calls from cache. (#351)" (#378) (#380)
 - Revert "fix(front50): Update Front50 cache periodically and serve live calls from cache. (#351)" (#378)
 - feat(api): Support for dynamic configuration of the Fiat retry policies (#379)
 - feat(api): Allow access to unknown applications when legacyFallback=true (#375)
 - fix(igor): boot1 doesn't love kebab case (#370)
 - fix(roles): Better logging (and metrics) if a user roles sync fails (#369)
 - fix(igor): endpoint config picks up endpoint (#368)
 - feat(admin): Implement isAdmin check in FiatPermissionEvaluator. (#366)
 - test(core): Add a basic startup test. (#367)
 - chore(redis): bump Jedis to version that fixes block/wait issue (#364)
 - fix(health): remove potentially expensive Redis health indicator (#363)
 - chore(dependencies): Autobump spinnaker-dependencies (#362)
 - chore(dependencies): Autobump spinnaker-dependencies (#360)
 - feat(permissions): allow username string to be passed to hasPermissions (#358)
 - chore(dependencies): Autobump spinnaker-dependencies (#359)
 - feat(buildservices): Permission support for build services (CI's) (#355)

#### Front50  - b796e80...0540599
 - fix(core): Publicly expose attributes of `ObjectType` (#525)
 - chore(dependencies): Autobump spinnaker-dependencies (#522)
 - chore(dependencies): Autobump spinnaker-dependencies (#521)
 - feat(authz): Check service acct has EXECUTE permission on application. (#518)
 - fix(provider/azure): Fix when fetching multiple versions of pipeline, it always fetches old version. (#520)
 - chore(dependencies): ensure direct dependency on kork-secrets-aws (#519)
 - chore(dependencies): Autobump spinnaker-dependencies (#517)
 - chore(dependencies): Autobump spinnaker-dependencies (#511)
 - feat(MPTv2): Adds inherit -> exclude migrator for v2 pipelines. (#515)
 - fix(permissions): fix for #513 (#514)
 - fix(permissions): Make permission retrieval consistent (#513)
 - chore(*): Seeding initial OWNERS file (#512)
 - feat(MPTv2): Updates latest tag on v2 MPT write. (#510)
 - fix(fiat): feature flag triggering of fiat role syncs (#508)
 - fix(MPTv2): Migrates v2 MPTs with template source to artifact. (#494) (#500)
 - fix(MPTv2): Fix tag storage for pipeline config caching. (#507)
 - refactor(MPTv2): Change nomenclature from versions to tags. (#506)
 - feat(applications): include permissions from /applications list endpoint (#505)
 - fix(fiat): only sync users if there are any roles to process (#504)
 - chore(dependencies): Autobump spinnaker-dependencies (#501)
 - fix(MPTv2): Avoids looking up v2 MPTs by 'latest'. (#502) (#503)
 - fix(MPTv2): Avoids looking up v2 MPTs by 'latest'. (#502)
 - chore(dependencies): Autobump spinnaker-dependencies (#499)
 - chore(dependencies): Autobump spinnaker-dependencies (#497)
 - fix(MPTv2): Migrates v2 MPTs with template source to artifact. (#494)
 - feat(s3): Make pathStyleAccess configurable (#496)
 - fix(authz): Automatic Service Account migration missing some pipelines (#493)
 - chore(syncroles): Sync only the service account roles (#489)

#### Gate  - 28beaaa...ee90e98
 - fix(saml): ensure session cookie survives idp redirect (#801) (#809)
 - fix(oauth): remove samesite cookie attribute (#803) (#808)
 - chore(*): Apply codestyles (#799)
 - chore(*): Bump spinnaker-dev plugin (#798)
 - chore(dependencies): korkVersion 5.3.1 (#797)
 - fix(ldap): Disable the broken LdapHealthIndicatorAutoConfiguration (#796)
 - fix(core): Spring does not override default configuration files. (#795)
 - chore(dependencies): upgrades to spring-boot 2 and spring-security 5 (#794)
 - feat(stages): Add API to support Concourse stage (#771)
 - feat(ecs): Retrieve AWS Cloud Map services for service discovery (#786)
 - chore(dependencies): Autobump spinnaker-dependencies
 - chore(dependencies): Autobump spinnaker-dependencies (#790)
 - fixup! chore(dependencies): Autobump spinnaker-dependencies
 - chore(dependencies): Autobump spinnaker-dependencies
 - fix(core): Handle possible null `authentication` when logging out (#789)
 - feat(authz): Use EXECUTE instead of READ for triggering pipelines. (#785)
 - fix(gremlin): Remove Gremlin config template and let Halyard write it from scratch (#788)
 - chore(dependencies): ensure direct dependency on kork-secrets-aws (#787)
 - chore(*): Seeding initial OWNERS file (#779)
 - chore(dependencies): Autobump spinnaker-dependencies (#783)
 - chore(dependencies): Autobump spinnaker-dependencies (#782)
 - chore(dependencies): Autobump spinnaker-dependencies (#778)
 - feat(auth): Ensure that a legacy fallback is not cached beyond a request (#780)
 - fix(gate): Allow gate to startup before Redis is available. (#775) (#781)
 - chore(deps): kotlin 1.3.20 (#777)
 - fix(gate): fix startup with redis.configuration.secure (#776)
 - fix(jobcontroller): remove un-used, non-existent API
 - fix(jobcontroller): getJobDetails must use a POST not a GET to clouddriver
 - fix(gate): Allow gate to startup before Redis is available. (#775)
 - test(core): Basic startup test (#774)
 - fix(artifacts): Make igor service optional (#773)
 - feat(auth): Restrict `/auth/roles/sync` to Spinnaker administrators (#772)
 - feat(artifact): expose endpoint for manual artifact triggers (#770)
 - fix(iap): Add a clock skew flag for IAP issue time and expiration time checks. (#766) (#769)
 - fix(iap): Add a clock skew flag for IAP issue time and expiration time checks. (#766)
 - refactor(MPTv2): Change nomenclature from versions to tags. (#765)
 - feat(gremlin): Add Halyard config for Gremlin (#762) (#763)
 - feat(gremlin): Add Halyard config for Gremlin (#762)
 - chore(dependencies): Autobump spinnaker-dependencies (#761)
 - feat(gcb): Add endpoint for listing GCB accounts (#760)
 - chore(dependencies): Autobump spinnaker-dependencies (#758)
 - chore(auth/oauth2): Make SpinnakerUserInfoTokenServices roles extensible (#759)
 - chore(dependencies): Autobump spinnaker-dependencies (#757)
 - fix(igor): Remove igor as a requirement for artifactory and concourse (#755) (#756)
 - fix(igor): Remove igor as a requirement for artifactory and concourse (#755)

#### Igor  - 98de62d...b3f354f
 - feat(artifactory): add link to artifactory app for artifact (#439) (#440)
 - chore(*): Bump spinnaker-dev plugin (#438)
 - feat(gcb): Add tag to builds triggered by Spinnaker (#435)
 - feat(gcb): Add endpoint to fetch build artifacts (#433)
 - chore(*): Applying java codestyles (#432)
 - feat(gcb): Add ttl to build cache entries and fall back to polling (#431)
 - fix(core): Spring does not override default configuration files. (#430)
 - chore(dependencies): ensure direct dependency on kork-secrets-aws (#429)
 - feat(artifactory): add build to artifact metadata (#428)
 - chore(dependencies): update to spring boot 2 and kork BOM dependency management (#427)
 - fix(concourse): Fix deserialization of put resource metadata (#419)
 - chore(build): upgraded to gradle 5.0 (#423)
 - feat(gcb): Add endpoints for storing and retrieving build status (#425)
 - chore(dependencies): Autobump spinnaker-dependencies (#426)
 - chore(dependencies): Autobump spinnaker-dependencies (#421)
 - fix(artifactory): Avoid AQL 500 when context root is non-empty (#424)
 - chore(*): Seeding initial OWNERS file (#422)
 - fix(travis): Check that logs are complete before parsing them (#418)
 - feat(stages): Add support for Concourse stage (#417)
 - refactor(travis/log): Add details about log (#345)
 - fix(cf): okhttp3 connector now trusts all certificates (#415) (#416)
 - fix(cf): okhttp3 connector now trusts all certificates (#415)
 - feat(travis): Customize the Travis build message on triggered builds (#414)
 - chore(dependencies): Autobump spinnaker-dependencies (#413)
 - feat(buildmasters): Permission support for build masters (CI's) (#374)
 - feat(gcb): Add endpoint for listing accounts (#412)
 - feat(gcb): Add support for triggering GCB builds (#408)
 - chore(dependencies): Autobump spinnaker-dependencies (#411)
 - test(core): Simple startup integration test (#410)
 - fix(artifacts): fixed parsing of version (#409)
 - Artifact services (#407)
 - chore(dependencies): Autobump spinnaker-dependencies (#406)
 - fix(concourse): Tweak return type to support manual execution build listing (#404) (#405)
 - fix(concourse): Tweak return type to support manual execution build listing (#404)
 - fix(concourse): Detect Concourse token expiry (#402) (#403)
 - fix(concourse): Detect Concourse token expiry (#402)

#### Kayenta  - f95afd1...cf89374
 - fix(datadog): Create metricset placeholder (#534) (#535)
 - chore(dependencies): Autobump spinnaker-dependencies (#531)
 - chore(dependencies): Autobump spinnaker-dependencies (#528)
 - chore(dependencies): ensure direct dependency on kork-secrets-aws (#530)
 - fix(prometheus): Canary Analysis fails with Illegal Argument Exception. (#525) (#529)
 - fix(judge): Incorrect Deviation and Effect Size with Zero Means (#510) (#527)
 - chore(dependencies): Autobump spinnaker-dependencies (#523)
 - fix: error response for IllegalArgumentException is now sent in json format (#430)
 - feat(atlas): Find atlas back-end by accountId (#526)
 - fix(prometheus): Canary Analysis fails with Illegal Argument Exception. (#525)
 - chore(*): Seeding initial OWNERS file
 - bug(builds): Use correct build file for docker build (#424)
 - chore(dependencies): Autobump spinnaker-dependencies (#520)
 - chore(dependencies): Autobump spinnaker-dependencies (#519)
 - chore(dependencies): Autobump spinnaker-dependencies (#518)

#### Orca  - 92bc10d...6ceeba0
 - fix(kubernetes): force cache refresh after deploy stage artifact cleanup
 - fix(bake/rosco): fix regression in snake casing of rosco specific bake properties (#2926) (#2927)
 - chore(*): Apply codestyles to orca (#2915)
 - feat(clouddriver): Adding a poller to cache basic account details (#2913)
 - feat(canary)- Add support for offsetting a canary by baselineOffsetAnalysisInMins (#2836)
 - chore(*): Bump spinnaker-dev plugin (#2914)
 - feat(declarative): New endpoint to list correlated executions
 - fix(runJob): use explicit artifact source (#2912)
 - feat(stages): Add Concourse stage (#2904)
 - feat(pipelines): Add validation errors to failure message (#2910)
 - test(gcb): Add test for starting build with artifact (#2897)
 - chore(*): Rename time.kt to timeutil.kt to keep intelliJ happy (#2907)
 - fix(artifacts): Find from execution should use default artifact (#2905)
 - fix(core): Spring does not override default configuration files. (#2908)
 - chore(*): remove reliance on servo library (#2906)
 - feat(runJob/consumeArtifact): consume artifacts (#2903)
 - fixup! chore(dependencies): Boot 2 and the BOM
 - fixup! chore(dependencies): Boot 2 and the BOM
 - fixup! chore(dependencies): Boot 2 and the BOM
 - fixup! chore(dependencies): Boot 2 and the BOM
 - chore(dependencies): Boot 2 and the BOM
 - chore(build): Gradle 5.4.1
 - fix(logs): Allow anonymous calls (#2892)
 - feat(titus) : Adding stage to update disruption budget details (#2901)
 - feat(runJob/kubernetes): extract log annotation (#2893)
 - feat(gcb): Allow the build definition to come from an artifact (#2896)
 - chore(dependencies): Autobump spinnaker-dependencies (#2891)
 - fix(logging): use logger.GetFactory over @slf4j (#2894)
 - refactor(logging): improve logging for AbstractWaitForClusterWideClouddriverTask (#2888)
 - feat(kayenta): pass the accountId to Kayenta for deployments (#2889)
 - feat(core): ability to resolve targeted SG on different accounts and regions (#2862)
 - refactor(headers): Update spinnaker headers (#2861)
 - chore(conditions): Adding a flag to skip wait (#2885)
 - fix(gcb): Properly set buildInfo in the context (#2890)
 - feat(gce): Add SetStatefulDisk{Task,Stage} (#2887)
 - refactor(TaskResult): Add a TaskResultBuilder and use it everywhere (#2872)
 - feat(gcb): Fetch artifacts produced by a GCB build (#2882)
 - fix(gremlin): Remove Gremlin config template and let Halyard do it from scratch (#2873)
 - fix(cloudformation): Scope force update by account and region (#2843)
 - fix(web): s/pipeline/config (#2884)
 - fix(web): s/pipeline/config (#2883)
 - refactor(ci): Generify RetryableIgorTask (#2880)
 - feat(core): Allow `ExecutionPreprocessor` to discriminate on type (#2881)
 - chore(*): Bump dependencies to 1.42.0 (#2879)
 - chore(conditions): Adding metrics around deploy pauses (#2877)
 - feat(core): Add support for more flexible execution preprocessors (#2798)
 - feat(core): Delegate task/stage lookup to `TaskResolver` and `StageResolver` respectively (#2868)
 - fix(FindImageFromCluster): only infer regions from deploy for aws (#2851) (#2854)
 - fix(MPTv2): Fails plan on missing template variable value. (#2876)
 - feat(gcb): Monitor GCB build status after starting a build (#2875)
 - feat(cf): Delete Service Key pipeline stage (#2834)
 - feat(cf): Added support for rolling red black deployments (#2864)
 - chore(conditions): Adding better log messages (#2867)
 - fix(clouddriver): Hoist inferredRegions var to parent scope so it is accessible to groovy code down below (#2874)
 - fix(provider/kubernetes): Don't poll immediately after cache refresh (#2871)
 - chore(dependencies): ensure direct dependency on kork-secrets-aws (#2870)
 - refactor(provider/kubernetes): Add tests and simplify cache refresh (#2869)
 - chore(conditions): Adding logging (#2866)
 - chore(openstack): remove openstack provider (#2865)
 - Revert "chore(gradle): Convert orca to use kork-bom (#2860)" (#2863)
 - chore(cf): Move cfServiceKey from orca-core to orca-integrations-cloudfoundry (#2857)
 - chore(gradle): Convert orca to use kork-bom (#2860)
 - refactor(conditions): Do not inject waitForCondition on no conditions (#2859)
 - fix(webhooks): Avoid a nasty HTTP 500 fetching preconfigured webhooks (#2858)
 - chore(dependencies): Autobump spinnaker-dependencies (#2856)
 - chore(dependencies): Autobump spinnaker-dependencies (#2838)
 - fix(orca): if build stage fails and prop file exists, try and fetch (#2855)
 - fix(FindImageFromCluster): only infer regions from deploy for aws (#2851)
 - fix(orca-core): Add CANCELED to list of COMPLETED statuses (#2845)
 - feat(kubernetes): pass DeployManifestTask strategy to Clouddriver to enable downstream validation
 - fix(kubernetes): remove unused imports from DeployManifestStage
 - refactor(gcb): Use generic maps for GCB objects (#2853)
 - feat(cf): Fetch created service key via SpEL (#2827)
 - Revert "fix(provider/azure): Failed to disable azure server group when rollback (#2848)" (#2850)
 - fix(provider/azure): Failed to disable azure server group when rollback (#2848)
 - feat(kubernetes): support redblack and highlander strategies (#2844)
 - fix(MPTv2): Restricts config var scope based on declared template vars. (#2849)
 - chore(migrations): ignore empty migrations (#2846)
 - fix(logging): Correctly propagate stage IDs for logging (#2847)
 - feat(MPTv2): Inverts inherit -> exclude in template inheritance. (#2842)
 - fix(expressions): populate context for evaluateExpression endpoint (#2841)
 - chore(*): Seeding initial OWNERS file (#2840)
 - fix(aws/imagetag): ensure matched images by name includes all upstream ids (#2839)
 - fix(repository): don't generate invalid grammar (#2833)
 - feat(preconfiguredJobs): produces artifacts (#2835)
 - fix(travis): Support timestamp in JenkinsBuildInfo (provided by Travis) (#2813)
 - fix(k8s): Deploy manifest now accepts stage-inlined artifacts (#2830)
 - fix(webhook): catch URL validation failures in MonitorWebhookTask
 - feat(webhook): retry on name resolution failures
 - chore(build): Upgrade to Gradle 5.0
 - chore(expressions): Don't create new objectmapper all the time (#2831)
 - feat(provider/kubernetes): Add traffic options to deploy manifest (#2829)
 - feat(exp): deployedServerGroups now grabs deployments from deploy result (#2812)
 - feat(conditions): Adding support for config based conditions (#2822)
 - fix(cloneservergrouptask): undo the move of CloneServerGroupTask (#2826)
 - feat(deleteSnapshot): Adding deleteSnapshot stage and deleteSnapshot â€¦ (#2769)
 - fix(MPTv2): Fix for #2803 (#2823)
 - feat(cf): Create Service Key Stage (#2819)
 - fix(expressions): make sure trigger is a map (#2817)
 - fix(provider/cf): Bind clone manifest artifacts (#2815) (#2821)
 - fix(provider/cf): Bind clone manifest artifacts (#2815)
 - fix(MPTv2): Allow unresolved SpEL in v2 MPT plan. (#2816) (#2818)
 - fix(MPTv2): Allow unresolved SpEL in v2 MPT plan. (#2816)
 - refactor(MPTv2): Change nomenclature from version to tag. (#2814)
 - feat(gremlin): Add Halyard config for Gremlin (#2806) (#2810)
 - fix(clouddriver): Enable the parameter of allowDeleteActive (#2801)
 - feat(gremlin): Add Halyard config for Gremlin (#2806)
 - fix(MPTv2): Fix pipeline triggers for v2 templated pipelines. (#2803) (#2809)
 - fix(MPTv2): Avoid resolving artifacts during v2 MPT plan. (#2777) (#2808)
 - chore(dependencies): Autobump spinnaker-dependencies (#2800)
 - fix(MPTv2): Fix pipeline triggers for v2 templated pipelines. (#2803)
 - Revert "fix(imagetagging): asset foundImage count >= upstreamImageIds count (#2799)" (#2807)
 - fix(preconfiguredJob): add tests preconfig job (#2802)
 - feat(runJob): support kubernetes jobs (#2793)
 - fix(imagetagging): asset foundImage count >= upstreamImageIds count (#2799)
 - chore(logging): remove high volume logs used to debug old issue
 - chore(clouddriver): rest helper for deploying clouddriver-sql with an empty cache (#2690)
 - fix(loadbalancer): wait for onDemand cache processing when supported (#2795)
 - feat(clouddriver): Remove ec2-classic migration code (#2794)
 - feat(gcb): Add Google Cloud Build stage (#2787)
 - fix(queue): Ensure that after stages run with an authenticated context (#2791)
 - chore(dependencies): Autobump spinnaker-dependencies (#2789)
 - fix(conditions): Make task conditional per config (#2790)
 - fix(sql): Fix intermittently failing tests (#2788)
 - fix(clouddriver): Reduce jardiff connect/read timeouts (#2786)
 - fix(triggers): Add Jenkins and Concourse build info types to allowed deserialization types (#2785)
 - feat(core): Add support for a condition aware deploy preprocessor (#2749)
 - chore(dependencies): Autobump spinnaker-dependencies (#2784)
 - fix(artifacts): Fix successful filter for find artifacts (#2780) (#2782)
 - fix(artifacts): Fix successful filter for find artifacts (#2780)
 - fix(concourse): Fix concourse build info type (#2779) (#2781)
 - feat(ecs): Grab container image from trigger or context (#2751)
 - fix(concourse): Fix concourse build info type (#2779)
 - chore(logging): add complete explanations
 - chore(logging): add a log wrapper in chatty WaitForUpInstancesTask
 - fix(unpin): touch up ResizeStrategySupportSpec
 - fix(unpin): bug caused us to not be able to unpin to 0
 - fix(MPTv2): Avoid resolving artifacts during v2 MPT plan. (#2777)
 - fix(spel): Optionally auto-inject execution for spel helpers (#2772)
 - chore(core): Remove noisy spel function registration log message (#2776)
 - fix(jenkins): Fix Jenkins trigger serialization (#2774) (#2775)
 - fix(jenkins): Fix Jenkins trigger serialization (#2774)
 - test(pipelinetemplates): Add tests to ModuleTag (#2767)
 - test(ci): Add tests to JenkinsStage and ScriptStage (#2768)
 - fix(tests): Use JUnit vintage engine so Spock tests still run (#2766) (#2773)
 - feat(core): Add support for Concourse triggers (#2770) (#2771)
 - fix(tests): Use JUnit vintage engine so Spock tests still run (#2766)
 - feat(core): Add support for Concourse triggers (#2770)

#### Rosco  - 95a2e29...59f7929
 - fix(artifacts): Fix NPE on empty artifact (#373) (#374)
 - chore(dependencies): ensure direct dependency on kork-secrets-aws (#369)
 - chore(openstack): remove openstack provider (#368)
 - perf(redis): Stop using KEYS command in BakeStore (#366)
 - chore(dependencies): Autobump spinnaker-dependencies (#364)
 - chore(*): Seeding initial OWNERS file (#365)
 - fix(bake/manifests): capture only stdout in Helm bakery - 2nd attempt (#362)
 - chore(.gitignore) Update .gitignore (#363)
 - chore(dependencies): Autobump spinnaker-dependencies (#361)
 - chore(dependencies): Autobump spinnaker-dependencies (#360)
 - chore(dependencies): Autobump spinnaker-dependencies (#359)
