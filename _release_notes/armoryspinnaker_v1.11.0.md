---
layout: post
title: v1.11.0 Armory Enterprise Spinnaker
order: 953
visibile: 0
---

# 03/15/18

> Note: We have found stability issues with this release. Please do not upgrade until further notice. If you have already upgraded we recommend to rollback.

# 02/19/18 Release Notes

> Note: This release includes a major version update to Orca 6.5.5 and changes the processing and management of triggers in Orca.  It might affect actively executing pipelines during a deployment of Armory Spinnaker.

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback).

## Highlighted Updates
This release has early access functionality for the [Kubernetes V2 provider](http://docs.armory.io/user-guides/kubernetes-v2/), modifies trigger execution and processing within Orca, and adds ECS support.

### Orca  - v6.5.5
- fix(jenkins): ignore full display name in trigger
- chore(cruft): HOW DO THESE KEEP COMING BACK? I SWEAR I'VE DELETED THEM LIKE 3 TIMES NOW
- fix(trigger): fix NPE caused by changing PipelineTrigger to a map
- fix(trigger/jenkins): add support for display path (#1971)
- fix(manualJudgment) - Allows user to manually override timeout for stage
- feat(provider/kubernetes): support multiple docs in one artifact (#1955)
- useful dry run (#1924)
- refactor(queue): Queue as a standalone library (#1916) (#1928)
- refactor(persistence): java rewrite (#1903)
- fix(spel): Evaluate stage notifications before sending. (#1906)
- feat(keel): upsert and delete intents through stages (#1891)
- fix(spel): Evaluate expressions in synthesized stages. (#1892)
- feat(webhooks): support preconfig params (#1887

### Echo  - v1.546.0
- feat(pubsub): adding support for AWS SQS/SNS (#231)
- fix(tests): Small fixes to PubsubEventMonitorSpec (#224)
- fix(pubsub): Add payload to pubsub triggers. (#221)

### Deck  - v2.1171.0
- feat(provider/kubernetes): export k8s server group interface (#4674)
- feat(webhooks): preconfigured webhook params (#4669)
- feat(deck) - Add gitlab as a gitSource and allow gitSources to be configured via settings.js (#4657)
- feat(provider/ecs): Add ECS Support

### Gate  - v4.20.0
- feat(authz): include full credentials list (#509)
- feat(provider/ecs): Added cloud metrics controller + service (#498)
- fix(search): Ensure that keyword searches are >= 3 characters (#501)

### Clouddriver  - v1.774.4
- Added ECS Cloud Provider
- feat(provider/kubernetes): support deploying multiple manifests (#2360)
- fix(provider/kubernetes): v2 cache clusters for workloads only (#2303)
- feat(provider/kubernetes): allow artifact types to be extended (#2302

### Fiat  - v0.39.0
- feat(admin) Add admin functionality to fiat

<br><br><br>
## Detailed Updates
### Armory Enterprise Spinnaker
### Packager - 98aec78
 - Incr minor (#280)
 - unpinning cd (#278)
 - pinning orca to rc candidate (#277)
 - unpinning orca (#276)
 - Rosco 0.104.0 has changed the default back type back, try unpinning (#274)
 - Looks like this unpinning broke k8s deploys (#273)
 - Unpinning orca, the 6.2.8 release is working for all tests (#272)
 - Pinning orca again, webhooks are still broken (#271)
 - Remove the orca pin, retesting webhooks (#270)
 - we have to remove secrets because it collides with a user provided one (#269)
 - fixing default credentials in our configuration (#268)
 - Revert "Removing the orca pin, retesting webhooks (#266)" (#267)
 - Removing the orca pin, retesting webhooks (#266)
 - Pin rosco, changes to spot pricing settings are erroring (#265)
 - Datadog canary is failing, trying to roll back (#264)
 - Repin orca cause webhooks are failing (#263)
 - Checking to see if fixes in deck resolve the webhook issue (#262)
 - Pin Orca at previous (#261)
 - unpin rosco and clouddriver (#260)
 - pin clouddriver for breaking kub v2 server groups (#259)


###  Spinnaker Community Contributions
### Orca  - v6.5.5
 - refactor(trigger): determine trigger types based on fields present not declared type
 - fix(triggers/kubernetes) - triggers need to know where to find the account field
 - fix(core): use correct object mapper for context processing (#1984)
 - fix(clouddriver/kubernetes) - Handle complex security group descriptions for kubernetes ingresses. (#1975)
 - feat(rollback): Support for automatic rollback when a deployment fails (#1944)
 - fix(jenkins): ignore full display name in trigger
 - fix(provider/kubernetes) - fixes exception when deploying with manual or container based trigger
 - feat(core): Allow a synthetic stage to override `stageTimeoutMs` (#1978)
 - fix(spel): Operate on evaluated stage in handlers. (#1972)
 - chore(cruft): HOW DO THESE KEEP COMING BACK? I SWEAR I'VE DELETED THEM LIKE 3 TIMES NOW
 - fix(trigger): fix NPE caused by changing PipelineTrigger to a map
 - fix(trigger/jenkins): add support for display path (#1971)
 - fix(artifacts): fix passing of pipeline artifacts (#1970)
 - fix(pipelines): Fix templated pipelines not being triggered
 - fix(artifacts): supply commit version (#1968)
 - Appending to log file (#1965)
 - feat(artifacts) Artifact passing in pipelines (#1966)
 - fix(webhook): Deprecate use of buildInfo (#1959)
 - fix(manualJudgment) - Allows user to manually override timeout for stage
 - feat(provider/kubernetes): v2 Add find artifacts from resource stage (#1914)
 - chore(docker): Upgrade base image (#1946)
 - chore(queue): Remove execution logs endpoint (#1962)
 - fix(persistence): fix bugs when running w/previousRedis (#1960)
 - fix(triggers): verify a trigger is a Jenkins trigger before trying to pull buildInfo
 - feat(dryrun): pipeline stages and strategies can run for real
 - feat(dryrun): dry run strategies and downstream pipelines
 - feat(dryrun): Stubs for Titus bake and run job
 - fix(trigger): trigger params & artifacts need to be mutable
 - fix(trigger): Fix bug with trying to read trigger during initialization
 - feat(provider/kubernetes): support multiple docs in one artifact (#1955)
 - chore(echo): Stop storing redundant information with each stage
 - feat(dryrun): Run manual judgment in dry run
 - feat(dryrun): allow different stubs for different cloud providers
 - fix(wait): Wait stage seems to sometimes get decimal waitTime
 - chore(spel): Add forgotten spec for webhook body fix. (#1949)
 - fix(spel): Fix assumptions made that were broke by #1892. (#1947)
 - fix(core): Fix auth propagation from manual judgment stages (#1945)
 - test(pipelines): Improve failed pipeline tests (#1943)
 - fix(triggers): fix instances of Groovy code assuming triggers are Maps
 - fix(pipeline/validate): throw pipeline error _after_ recording failure (#1942)
 - fix(triggers): evaluate incoming triggers (& artifacts) (#1941)
 - fix(pipelines): Improve pipeline error reporting (#1937)
 - fix(triggers): derived properties of Jenkins triggers
 - chore(expressions): fix javadoc (#1939)
 - fix(amazon): derive image regions when tagging from Clouddriver data (#1936)
 - fix(clouddriver): Fixing trigger interaction inside deploy strategy codepaths
 - fix(trigger): Remove redundant parsing of artifacts
 - fix(artifacts): fix bind behavior (#1932)
 - feat(dryrun): Dry run is a flag not a separate trigger type
 - fix(redis): Fix bug starting Redis pool with no path on the connection
 - chore(java): Convert all Groovy in orca-core to Java
 - chore(canary-v2): Pass application and parent pipeline execution id to canary runs. (#1929)
 - Trigger types (#1890)
 - More useful dry run (#1924)
 - refactor(queue): Queue as a standalone library (#1916) (#1928)
 - chore(queue): Increase work queue poll interval
 - fix(queue): Execution w/o initial stages should go TERMINAL immediately (#1925)
 - fix(core): Correctly handle "" when parsing `requisiteStageRefIds` (#1923)
 - chore(warnings): when in doubt, go utf8
 - chore(warnings): make operator precedence explicit
 - chore(warnings): replace String::split with Splitter::on
 - chore(warnings): Add missing @Override annotations
 - fix(core): ancestors() of a synthetic stage should include `STAGE_BEFORE` siblings (#1920)
 - chore(restarts): remove redundant logic from stage restart methods
 - fix(queue): synthetic stages aren't restartable (#1919)
 - chore(): Cleanup appConfig cruft
 - fix(rrb): Include pipeline parameters when invoking validation pipeline (#1915)
 - chore(cruft): Removed unused executionEngine flag
 - fix(canary-v2): Ensure that at least one canary interval exists. (#1913)
 - fix(front50): save with existing pipeline index (#1910)
 - fix(persistence): remove javafx dep for vanilla openjdk (#1912)
 - fix(clouddriver): fix IndexOutOfBoundsException in tag cleanup (#1911)
 - chore(dependencies): Newest of the new Kotlins
 - fix(persistence): fix updateStageContext bug, add test (#1908)
 - fix(migrations): jedisPoolPrevious bean is now conditional (#1907)
 - refactor(persistence): java rewrite (#1903)
 - perf(clouddriver): skip cooldown on disable if no server groups disabled
 - refactor(appengine): Reduce artifact resolve code (#1899)
 - fix(spel): Evaluate stage notifications before sending. (#1906)
 - chore(build): remove accidentally committed file
 - chore(kotlin): Kotlin 1.2.20 syntax updates
 - chore(kotlin): Apply kotlin-spring plugin
 - chore(build): don't default to using Groovy
 - fix(expressions): restrict spel fx deployedServerGroups to valid deploy stages (#1901)
 - feat(canary-v2): Support specifying multiple scopes per canary request. (#1900)
 - feat(keel): upsert and delete intents through stages (#1891)
 - fix(queue): s/Registering/Refreshing (#1898)
 - fix(queue): Move `RedisActiveExecutionsMonitor` off @Scheduler thread (#1897)
 - fix(queue): Add the metrics for the task scheduler thread pool
 - fix(queue): Handle completing stage after error in planning
 - fix(queue): Give Spring's scheduler a thread pool
 - chore(dependencies): Latest Kotlin
 - fix(monitor) unwire RedisActiveExecutionsMonitor (#1895)
 - Fix typo in Dockerfile.slim
 - chore(core): Consistency around `Millis` suffix on `task.*` values
 - fix(core): WaitForNewUpInstancesLaunchTask should support stage-level timeout override (#1893)
 - fix(spel): Evaluate expressions in synthesized stages. (#1892)
 - feat(webhooks): support preconfig params (#1887)

### Echo  - v1.546.0
 - fix(pubsub): changing amazon subscription name (#237)
 - fix(sqs): worker startup conditional on enabled (#236)
 - fix(sqs): fix startup (#235)
 - feat(pubsub): adding support for AWS SQS/SNS (#231)
 - feat(notifications): Allow processing when template group is not passed in request (#234)
 - refactor(pubsub): adding redisClientDelegate (#233)
 - chore(halconfig): add redis config (#232)
 - Appending to log file (#229)
 - feat(artifacts): default dockerhub artifact parser (#228)
 - chore(docker): Upgrade base image (#227)
 - chore(pubsub): bump google pubsub client library (#226)
 - fix(webhooks): assorted triggering problems (#225)
 - fix(tests): Small fixes to PubsubEventMonitorSpec (#224)
 - feat(pubsub): add translate helpers (#220)
 - fix(webhooks): Correctly deserialize webhook artifacts (#222)
 - fix(tests): Move tests to correct package as source (#223)
 - fix(pubsub): Add payload to pubsub triggers. (#221)
 - fix(triggers): Include image as a received artifact for Docker (#219)

### Deck  - v2.1171.0
 - fix(core/search): Fix calling setState on unmounted RecentlyViewedItems (#4680)
 - style(amazon/application/projects/pipeline/google/kubernetes): Replacing fa-cog icons with new spinner (#4630)
 - fix(core): surface app data status in views without active states (#4675)
 - fix(core/presentation): Add padding to filter sidebar as a scrolling affordance (#4679)
 - fix(webhooks): default parameters to empty list (#4678)
 - fix(core/search): Fix instance searches (#4670)
 - fix(core/vis): Fix visualizer toggle to clean up old copies of the visualizer (#4672)
 - fix(core): fix restore to this version behavior on pipeline config (#4671)
 - Add/update Travis Slack notifications (#4673)
 - chore(amazon): bump package to 0.0.59 (#4677)
 - chore(provider/kubernetes): bump kubernetes package version (#4676)
 - feat(provider/kubernetes): export k8s server group interface (#4674)
 - feat(webhooks): preconfigured webhook params (#4669)
 - feat(amazon/serverGroup): warn that scaling policies will not work when capacity is pinned (#4668)
 - chore(core): bump package to 0.0.129 (#4666)
 - fix(core): remove lazy datasource config on security groups, load balancers (#4665)
 - feat(provider/ecs): Updated the ECS Module with all its content (#4658)
 - feat(provider/ecs): Added serverGroup Transformer (#4650)
 - chore(core): bump package to 0.0.128 (#4663)
 - perf(core): lazy load data for load balancers, security groups (#4661)
 - fix(core): fix link to deployed server group in tasks view (#4662)
 - fix(core/pipelines): do not show no pipelines message while initializing (#4660)
 - fix(core): handle execution window expressions gracefully (#4656)
 - chore(build): remove halconfig from webpack common (#4659)
 - feat(deck) - Add gitlab as a gitSource and allow gitSources to be configured via settings.js (#4657)
 - fix(ecs): clean up imports, method signature (#4655)
 - feat(provider/ecs): Added IAM role reader to ECS (#4631)
 - feat(provider/ecs): Updated the ECS help file (#4653)
 - feat(provider/ecs): Added ServerGroup Wizard (#4651)
 - feat(provider/ecs): Added Disable ASG stage (#4646)
 - feat(provider/ecs): Added instance details view (#4644)
 - feat(provider/ecs): Added CloneServerGroup.ecs.controller (#4652)
 - feat(provider/ecs): Added MetricAlarms reader (#4637)
 - feat(provider/ecs): Added horizontal scaling section to deploy modal (#4633)
 - feat(provider/ecs): Added the ServerGroup Configuration Service (#4654)
 - feat(provider/ecs): Added an ECS Cluster reader (#4642)
 - feat(provider/ecs): Added Resize server group menu option (#4639)
 - feat(provider/ecs): Added Placement strategy service (#4641)
 - feat(provider/ecs): Added Location section to deploy modal (#4636)
 - feat(provider/ecs): Added Rollback menu option (#4638)
 - feat(provider/ecs): Added template selection view (#4645)
 - feat(provider/ecs): Added LoadBalancers section to deploy modal (#4635)
 - feat(provider/ecs): Updated the ECS logo less file (#4643)
 - feat(provider/ecs): Added Server group details view (#4640)
 - feat(provider/ecs): Added advancedSettings section to deploy modal (#4634)
 - feat(provider/ecs): Added vertical scaling section to deploy modal (#4632)
 - chore(core): bump package to 0.0.127 (#4649)
 - feat(core): enable highlighting of invalid pristine fields (#4648)
 - feat(core): import kayenta (#4628)
 - fix(core): allow side filters to be collapsed (#4629)
 - feat(provider/kubernetes): v2 rename required deployed artifacts (#4627)
 - chore(amazon): bump package to 0.0.58 (#4626)
 - chore(core): bump package to 0.0.126 (#4625)
 - fix(core): remove "0" from filter list when no pipelines present (#4623)
 - chore(package): upgrade uirouter/visualizer to 5.1.3
 - fix(core/search): Fix redirect from 'home.infrastructure' to 'home.search'

### Gate  - v4.20.0
 - refactor(mine): Pass `application` parameter when fetching canary configs (#510)
 - feat(authz): include full credentials list (#509)
 - Appending to log file (#508)
 - chore(docker): Upgrade base image (#507)
 - feat(canary-v2): Add support for listing an applications canary runs. (#505)
 - fix(credentials): collection<map> isnt compatible with app engine regions (#504)
 - feat(credentials): provide proxy for ?expand on /credentials (#502)
 - feat(canary-v2): Add /v2/canaries/metadata/metricsService endpoint. (#503)
 - feat(provider/ecs): Added cloud metrics controller + service (#498)
 - fix(roleService): Fixed the namespacing for Hystrix (#500)
 - fix(search): Ensure that keyword searches are >= 3 characters (#501)

### Igor  - v1.87.5
 - feat(jenkins): add log message when artifact cannot be found (#217)

### Clouddriver  - v1.774.4
 - fix(aws): Continue if launch configuration already exists (#2376)
 - fix(aws): return targetType for target groups for filtering (#2374)
 - fix(provider/amazon): Handle missing IAM permissions in caching agent (#1874)
 - fix(provider/appengine): deploy with artifact reference when available (#2372)
 - feat(clouddriver/gce) - Add 'required' flag to account configs. (#2151)
 - Append to clouddriver.log (#2155)
 - fix(provider/kuberentes): v2 fix ingress caching (#2336)
 - fix(provider/kubernetes): v2 omit null manifests (#2370)
 - perf(provider/kubernetes): v2 small perf improvements (#2369)
 - chore(build): use correct python release candidate (#2368)
 - chore(build): fix python constraint (#2367)
 - fix(artifacts): supply commit version (#2366)
 - fix(provider/kubernetes): v2 suppress missing replacements (#2365)
 - fix(roles): Fix startup on unsatisfied dependency (#2364)
 - Added RoleController. (#2362)
 - feat(provider/kubernetes): support configmap & secret refs (#2363)
 - chore(docker): Upgrade base image (#2359)
 - feat(provider/kubernetes): support deploying multiple manifests (#2360)
 - fix(eureka): Handle missing instances when determining what to disable (#2361)
 - feat(provider/kubernetes): v2 image buildinfo (#2357)
 - fix(provider/kubernetes): v2 converter is missing using lombok (#2358)
 - fix(provider/kubernetes): only delete statefulset and daemonset if kind is presented. (#2351)
 - feat(provider/kubernetes): v2 per-account, custom resources (#2354)
 - fix(provider/appengine): surface timeouts to frontend during job execution (#2356)
 - feat(provider/kubernetes): v2 Extract artifact name from reference (#2322)
 - fix(provider/kubernetes): Add top level `kind` to make Deck happy (#2355)
 - fix(provider/kubernetes): concurrent modification of kind list (#2353)
 - bug(provider/openstack) - cleanly handle errors when caching OST server groups. (#2350)
 - refactor(provider/ecs): Caching agents enabled, code cleanup. (#2349)
 - feat(provider/ecs): Disable Service Atomic Operation (#2345)
 - feat(provider/ecs): Enable Service Atomic Operation (#2343)
 - Added ResizeServiceAtomicOperation. (#2341)
 - fix(): Force using hashtags for dynomite connections (#2348)
 - Added CreateServerGroup AO. (#2338)
 - Added TerminateInstancesAtomicOperation. (#2339)
 - feat(provider/kubernetes): v2 hpa support (#2347)
 - fix(provider/kubernetes): v2 reduce noise when polling older clusters (#2344)
 - fix(provider/kubernetes): v2 gracefully handle unknown kind/version (#2342)
 - fix(provider/kubernetes): v2 fix caching of malformed annotations (#2340)
 - fix(provider/appengine): dont prepend "gs" to all repository URLs (#2346)
 - feat(provider/kubernetes): make kubectl configurable per-account (#2337)
 - feat(provider/ecs): Destroy Service Atomic Operation (#2334)
 - feat(provider/ecs): ECS Load Balancer Provider (#2333)
 - fix(entitytags): Increase default 'maxResults' from 100 -> 2000 (#2335)
 - feat(credentials): add expand parameter to /accounts endpoint (#2326)
 - feature(provider/openstack) implementing senlin zone policy and scheduler hints (#2325)
 - Added EcsServerClusterProvider. (#2332)
 - Added EcsCloudMetricService. (#2331)
 - feat(provider/ecs): ECS Instance Provider (#2330)
 - Added EcsImagesController. (#2329)
 - fix(provider/kubernetes): v1 oom killed job has exit code 0 (#2328)
 - fix(rrb): Disable percentage calculation should use Math.ceil() (#2327)
 - EcsCredentialsInitializer now initializes NetflixAssumeRoleEcsCredentials. (#2323)
 - fix(provider/ecs): ECS Caching Agents - Account/Region awareness (#2315)
 - Added ContainerInformationService. (#2314)
 - fix(provider/amazon): propagate serverGroupNamesByRegion result on copyLastAsg (#2270)
 - feat(provider/ecs): ECS Cluster Controller (#2313)
 - feat(provider/ecs): ECR Image Provider (#2309)
 - Corrected capitalization for cloudMetrics endpoint. (#2312)
 - fix(gcs): Prevent NPE when gcs artifact account has no credentials path (#2324)
 - fix(provider/kubernetes): v1 eventual consistency bug in disable (#2321)
 - fix(provider/gce): Fix typo in metric tag. (#2320)
 - fix(artifacts): improve github artifact downloader error handling (#2319)
 - feat(provider/kubernetes): default artifact replacers (#2318)
 - fix(provider/kubernetes): v1 fix red/black for svgs without lbs (#2317)
 - feat(provider/kubernetes): v1 volume mount subpath support (#2316)
 - fix(provider/kubernetes) : disable v1 controller caching #2239 (#2301)
 - refactor(provider/appengine): artifact logic from orca (#2305)
 - fix(provider/kubernetes): v2 Make workloads authoritative for apps (#2307)
 - feat(provider/kubernetes) - adds configMap replacer support for replicasets (#2310)
 - poc(provider/aws): Index a subset of instance details (#2204) (#2308)
 - Added EcsCloudMetricProvider and EcsCloudMetricController. (#2294)
 - Added EcsApplicationProvider, EcsApplication model, and TestCredential.. (#2293)
 - Added EcsRoleProvider. (#2292)
 - Added EcsClusterProvider. (#2291)
 - feat(provider/ecs): ECS Scalable Targets caching classes and tests (#2290)
 - feat(provider/ecs): Ecs instance cache client (#2289)
 - fix(provider/kubernetes): only include app & cluster frigga details (#2306)
 - feat(provider/openstack): Add support for availability zones (#2304)
 - fix(provider/kubernetes): v2 cache clusters for workloads only (#2303)
 - feat(provider/kubernetes): allow artifact types to be extended (#2302)
 - fix(provider/aws): Handle ApplicationLoadBalancers with invalid actions (#2300)
 - fix(provider/kubernetes): fix cast from double in replica count (#2298)
 - fix(provider/kubernetes): prevent NPE if resource does not have creation timestamp (#2299)
 - poc(provider/aws): Index a subset of server group / instance details (#2204)
 - fix(core): Support an empty NamerRegistry (#2297)
 - feat(provider/kubernetes): look up namer by class name (#2288)
 - fix(provider/kubernetes): load replicas for non replicaset server groups (#2287)
 - perf(provider/gce): De-dupe getHealth() calls in LB caching agents. (#2281)
 - fix(core): Allow for versioned providers in lb controller (#2284)
 - refactor(provider/kubernetes): remove obsolete source check (#2283)
 - feat(artifacts): add artifact download endpoint (#2282)

### Fiat  - v0.39.0
 - feat(admin) Add admin functionality to fiat
 - fix(authz): ensure anonymous role is not cleared
 - fix(roles): ensure UserRolesSyncer always refreshes anonymous user
