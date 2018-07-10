---
layout: post
title: v1.14.23 Armory Release
order: -20180710000252
hidden: true
---

# 07/09/18 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
There's currently no known issues with this release.

<!--- Example of a problem
Igor added ..... which does.....

**Symptoms:**
**Fix:**
-->





## Highlighted Updates
### Armory
<!--- A quick summary of what's changed with Armory -->


#### Dinghy
 - Add download cache for Github and Stash (#65)
 - feat(github): support github enterprise endpoints (#64)


#### Armory Echo
 - fix(jira) make sure to check for all jira tickets in commit message (#61)
 - feat(jira) support multiple scms from Jenkins (#60)


#### Armory Echo
 - addding ntp (#362)


###  Spinnaker Community Contributions
There have also been numerous enhancements, fixes and features across all of Spinnaker's other services. See their changes here:
[Spinnaker's v1.8.0](https://www.spinnaker.io/community/releases/versions/1-8-0-changelog)
[Spinnaker's v1.8.1](https://www.spinnaker.io/community/releases/versions/1-8-1-changelog)


#### Igor
REMOVE ME: FOR EACH OF SPINNAKER'S SERVICES, PICK OUT SOME NOTIBLE CHANGES

<!---
An example of a problem
Igor added ..... which does.....

**Symptoms:**
**Fix:**
-->




<br><br><br>
## Detailed Updates
### Armory
### Lighthouse&trade; - d7395c7...84a5687
 - k8s installation: fix(health) OSS health checks are on /health (#214)
 - k8s installation: Permitting the use of a "wildcard" migration. (#212)
 - k8s installation: ENG-2083: Update armoryVersion in pipeline after migration (#211)
 - k8s installation: Remove the migration_paths_cache. (#210)
 - k8s installation: Add a /v1/upgrade/current endpoint (#209)
 - k8s installation: Allow a migration definition to be a dict (#207)
 - k8s installation: ENG-1963: add routes for front50 (#206)
 - k8s installation: ENG-1955 add config migrator (#205)

### Dinghy&trade; - 2015849...f8a6984
 - Add download cache for Github and Stash (#65)
 - feat(github): support github enterprise endpoints (#64)
 - feat(config): merge defualt config with -local (#63)
 - Revert "feat(github): make github endpoint configurable (#61)" (#62)
 - feat(github): make github endpoint configurable (#61)
 - option to log to file (#60)
 - close http response body the right way
 - The default value of a var can now come from another var. That var has to be prefixed with an @. e.g.,: "{{ var "discovery-service-name" ?: "@application" }}"

### Platform&trade; - ff5e90c...8812305
 - feat(logging) log each time we're making a request to slack
 - Removed GitHubOrg from AppCreationTask struct and put it in the template since it can potentially be a different org per template, also removed hardcoding of the org and fixed some typos in env var names (#201)
 - feat(logging) add more debug logging (#200)
 - store app creation status in redis (#199)
 - feat(git) ignore vendor.orig (#193)
 - feat(logging) improve debug logging (#196)
 - fix(slack) if payload isn't expected, we should return an actual error (#195)
 - feat(slack) slack message improvements (#194)
 - feat(readme) add slackbot icon to readme
 - feat(assets) add armorybot slack icons
 - feat(settings) try to fetch the password from yaml (#197)
 - read namespace from config (#192)
 - change namespace to K8s account available in dev. This should be re-worked so that we read the namespace either from settings or from the UI (#190)
 - fix(rollback) orca changed it's endpoint and content type for tasks (#189)

### Armory Echo  - 00219be...e8f6375
 - refactor(jira) rename Armory Jira classes due to OSS conflict (#64)
 - If the substitutions are null, replace with blank. (#63)
 - feat(tests) add doc on how which integration tests to run (#62)
 - fix(jira) make sure to check all tickets (#61)
 - feat(jira) support multiple scms (#60)
 - Add README notes (#58)
 - ENG-2009: Remove moniker variables (not supported) (#57)
 - OSS changed the way they identify stages (#55)
 - OSS changed from orca:stage:complete to orca:task:complete (#52)

### Armory Deck  - f57955c...85d49d4
 - Eng 1945 autogenerate ui (#376)
 - adds back "fix(oss): fixes for release-1.8.x (#371)" (#374)" (#375)
 - fetch is async!! duh! (#373)
 - Revert "fix(oss): fixes for release-1.8.x (#371)" (#374)
 - Make sure our api calls are including creds. (#372)
 - fix(oss): fixes for release-1.8.x (#371)
 - Don't even bother checking for updates on AWS (#370)
 - refactor(barometer): removed barometer (#369)
 - Don't except if the parsed URL has no protocol. (#368)
 - ALWAYS load the HEADER_SHIM (#366)
 - Eng 2061 disable ui configs (#365)
 - On AWS, always return 'true' for admin permissions (#364)
 - ENG-2045 config link auth (#363)
 - ENG-1900 software update (#359)
 - Schema-based configurator (#357)
 - Eng 2045 config link auth (#349)
 - moved github org to templates, spinnaker app email now comes from the user through the modal (#350)
 - fix(chaos): allow chaosMonkey enabled (#347)
 - For CORS requests, use the "include" value to allow sending credentia… (#346)
 - inverse header logo and styles (#345)
 - Ui refinements continued (#339)
 - Style modal (#344)
 - ENG-2015: Remove `Armory` prefix from class names (#342)
 - use session cookie in fetch requests to platform (required for prod) (#341)
 - feat(ArmoryOptimize) ability to hide/show link (#340)
 - Eng-1978 (#337)
 - Remove monospace font and adjust top bar bg color (#336)
 - fix(configurator-settings) adds missing brace (#335)

### Armory Gate  - d95a452...f08bd40
 - Forward /configurator/* to configurator (#12)

### Packager - 5e4e88e...94b3599
 - feat(oss): release-1.8.x upgrade (#366)
 - Move the armory ID step (#363)
 - addding ntp (#362)
 - Revert "add spinnaker monitoring job to the list of triggers (#355)" (#356)
 - add spinnaker monitoring job to the list of triggers (#355)
 - mount the right dirs for the monitoring container (#354)
 - feat(build) pinning igor for multiple scms (#350)
 - ENG-2016: update orca-armory.yml (#349)
 - monitoring container (#348)
 - Add configurator version.manifest (#347)
 - feat(artifacts) push manifest as text so the browser can render it without downloading (#346)
 - rename stage to be more descriptive (#345)



###  Spinnaker Community Contributions
To see the detailed changes for each service see: [Spinnaker's v1.8.0](https://www.spinnaker.io/community/releases/versions/1-8-0-changelog#individual-service-changes), [Spinnaker's v1.8.1](https://www.spinnaker.io/community/releases/versions/1-8-1-changelog#individual-service-changes).

<!-- Changes listed below is are extra changes that have not yet made it to another Spinnaer release version: -->




----  YOU GOTTA DO SOME WORK HERE
----  FILTER OUT SOME OF THIS STUFF SO THAT IT"S EXTRAS

### Clouddriver  - f432528...973b46b
 - fix(provider/kubernetes): be more tolerant of failing health checks (#2750) (#2752)
 - fix(aws) only set encryption if snapshotId is not provided (#2747)
 - fix(provider/kubernetes): fix regex perf bug when parsing images (#2736) (#2737)
 - fix(provider/kubernetes): fix v2 error message (#2726) (#2730)
 - fix(install): install kubectl if missing (#2728) (#2729)
 - fix(artifacts): improve error message when account misconfigured (#2717) (#2718)
 - fix(provider/kubernetes): handle empty repsonse (#2710) (#2714)
 - fix(provider/kubernetes): v2 tolerate empty delete options (#2709) (#2713)
 - feat(provider/kubernetes): manifest labeler (#2695)
 - chore(dependencies): bump to 0.157.5 (#2701)
 - feat(amazon/loadBalancer): Support authenticate-oidc type in ELBv2 listener actions (#2698)
 - fix(titus): handle load balancing not enabled in account (#2699)
 - perf(provider/kubernetes): caching agent restrictions by kind (#2697)
 - feat(provider/kubernetes): add CRD handler (#2693)
 - feat(provider/kubernetes): cronjob support (#2691)
 - fix(provider/kubernetes): add version to sequence in moniker (#2690)
 - fix(provider/dcos): Cache instance details with the server group agent
 - feat(provider/kubernetes): Add a new patch manifest stage for V2 provider (#2662)
 - chore(aws): Support for the m5d instance type family (#2692)
 - fix(titus): don't have to load instances when there are no target groups in targetGroupServerGroupProvider (#2689)
 - feat(provider/kubernetes): max-version-history annotation (#2688)
 - feat(provider/kubernetes): Support NFS Volumes (#2685)
 - feat(artifacts/bitbucket): added bitbucket artifact support (#2674)
 - fix(cats): ClusteredAgentScheduler.deleteLock
 - fix(titus): Avoid using a `GString` when building the `Health` details (#2686)
 - improve Alb server groups (#2684)
 - fix(titus): correctly name metric (#2682)
 - fix(redis): Extract `JedisPool` metrics from delegate (#2683)
 - chore(redis): `JedisPool` metrics (numActive, numIdle, numWaiters) (#2681)
 - fix(logs): add more caching info (#2675)
 - fix(titus): return server groups as part of alb for ip based target groups (#2680)
 - chore(dependencies): Update spinnaker-dependencies to 0.157.0 (#2679)
 - perf(aws): `RelationshipCacheFilter.none()` when building reservation report (#2678)
 - fix(Instance): change health type to conatin Object (#2677)
 - perf(aws): Batch up a few cases of `objectMapper.convertValue()` (#2673)
 - fix(titus): oops. wrong constructor. groovy.. (#2672)
 - feat(titus): split caching into two agents (#2636)
 - fix(artifacts/gcs): support generation (#2671)
 - perf(cats): Support `List` -> `Set` relationship deserialization (#2670)
 - fix(caching): add config for number of concurrent scheduled agents (#2668)
 - revert(cats): Reverting the `List` -> `Set` change (#2669)
 - perf(cats): Deserialize relationships into `Set` vs `List` (#2666)
 - fix(titus): on demand eviction (#2643)
 - feat(provider/kubernetes): support kubeconfigContents (#2665)
 - feat(provider/ecs): Removed hard dependency on ECR by allowing non-ECR repositories (#2616)
 - perf(cats): Ensure that `previousSet` is actually a `Set` (#2664)
 - fix(caching): Fix on-demand cache result return status (#2663)
 - fix(provider/kubernetes): default behavior shouldn't version volumes (#2660)
 - fix(titus): only use 2000 page sizes on tasks, not jobs (#2661)
 - fix(authz): Check authz on app name from moniker. (#2615)
 - fix(provider/kubernetes): be tolerant of k8s < v1.7 (#2659)
 - fix(provider/kubernetes): don't override annotations (#2658)
 - perf(aws): Optimize ALB indexing when edda is enabled (#2657)
 - fix(provider/kubernetes): fix NPE in status check (#2586)
 - feat(provider/kubernetes): allow unregistered crds to be cached & deployed (#2653)
 - fix(provider/kubernetes): Adding missing log definition. (#2656)
 - chore(provider/kubernetes): identify server group in enable/disable op (#2655)
 - perf(provider/kubenretes-v2): no need to reschedule agents every 30s (#2654)
 - fix(docker): s/re/e (#2652)
 - fix(docker): Suppress unnecessary stacktraces when `getTags` returns 404 (#2651)
 - fix(provider/amazon): improve instancetype caching
 - feat(titus): add featured flagged ability to request 2000 items in a page (#2650)
 - perf(aws): Same ON_DEMAND loading behavior as `ClusterCachingAgent` (#2648)
 - feat(titus): enable compression on find job and find task endpoints (#2649)
 - refactor(titus): remove json endpoints no longer in use (#2647)
 - fix(provider/kubernetes-v2): thread safe agent scheduling (#2646)
 - Nlb support (#2644)
 - fix(provider/kubernetes): v2 Fix OP_NAME for "undo rollout manifest" (#2546)
 - fix(aws): Sort all duplicate predicate inputs (#2525)
 - fix(provider/kubernetes): sub manifests by namespace (#2641) (#2642)
 - fix(provider/kubernetes): sub manifests by namespace (#2641)
 - fix(provider/dcos) Fixing various outdated tests.
 - fix(provider/dcos) Forcing deployments by default
 - fix(provider/docker) Handling leading '/' _catalog paging link
 - feat(provider/dcos) Adding support for marathon on marathon accounts.
 - feat(providers/dcos) Adding support for marathon 1.5 structures.
 - fix(core): Correctly track any OperationalEvents generated by a deploy (#2640)
 - feat(provider/kubernetes): include container status in health (#2638)
 - feat(providers/amazon): block device mappings for c5d and i3.metal (#2639)
 - fix(provider/kubernetes): support looking up non-namespaced manis (#2634) (#2635)
 - fix(provider/kubernetes): support looking up non-namespaced manis (#2634)
 - provider/kubernetes: remove versioning of HorizontalPodAutoscalers (#2629)
 - fix(provider/kubernetes): Do not raise exception for named port (#2619)
 - fix(google): Fixed call to timeExecute (#2633)
 - fix(artifacts): s3 improvements (#2631)
 - feat(google): Add account label for google.api metrics. (#2628)
 - feat(artifacts): add gitlab artifact provider (#2630)
 - fix(search) less redis interaction on instance cache
 - chore(cache): debug logging for handle (#2627)
 - chore(dependencies): Update spinnaker-dependencies to 0.154.3 (#2618)
 - perf(search): improves search performance
 - fix(entitytags): break circular dependency (#2626)
 - fix(entitytags): Reconciliation API for Entity Tags (#2625)
 - chore(groovy): Convert ClusterProvider from groovy -> java (#2624)
 - fix(cache): metrics support may be null (#2622) (#2623)
 - fix(cache): metrics support may be null (#2622)
 - chore(logs): Minor log message tweak (#2621)
 - fix(titus): respect applicationDefaultSecurityGroup when cloning (#2620)
 - feat(reservations): Backport changes from v4 to v3 (#2617)
 - fix(artifacts/github): fix error with malformed ref (#2613)
 - (provider/gce): Add fallback configuration for instanceType disks. (#2612)
 - perf(amazon): optimize target group loading for /loadBalancers (#2610)
 - fix(provider/kubernetes): v2 check job failed (#2608) (#2611)
 - fix(provider/kubernetes): v2 check job failed (#2608)
 - perf(titus): Optimize how ON_DEMAND records are fetched during caching cycles (#2609)
 - fix(reservations): Include 'region' in metric (second attempt!) (#2607)
 - fix(provider/google): remove json key from logs during init (#2606)
 - fix(provider/google): remove json key from logs during init (#2605)
 - perf(provider/titus): do not load tasks when finding by name unless needed (#2600)
 - fix S3 being unable to talk to custom API endpoint (#2604)
 - chore(provider/kubernetes): cache refresh debug logging (#2603)
 - perf(aws): Optimize how ON_DEMAND records are fetched during caching cycles (#2599)
 - chore(titus): Remove `legacyOnDemand` from `TitusClusterCachingAgent` (#2602)
 - fix(aws) Security group retrieval fix (#2601)
 - feat(provider/titus): retry submits when we encounter unavailable status or job sequence collision (#2598)
 - fix(aws): Handle references to target groups that may not exist (#2597)
 - fix(reservations): Include 'region' in metric (#2596)
 - feat(provider/kubernetes): string annotations w/o quotes (#2595)
 - feat(provider/kubernetes): allow user to set versioning behavior in annotations (#2594)
 - chore(provider/kubernetes): reduce log level for artifact swapping (#2593)
 - feat(reservations): Support for a 'v4' reservation report (#2589)
 - fix(provider/kubernetes): v2 correctly overwrite on-demand (#2590)
 - feat(aws): don't return instances for servergroups if includeDetails is set false (#2592)
 - add support for custom S3 API endpoint (#2591)
 - fix(provider/kubernetes): remove sticky pods from large cache (#2587)
 - feat(*): add includeDetails query parameter for serverGroups (#2588)
 - refactor(provider/aws) Minor refactor on the AWS implementation of the image endpoint (#2448)
 - fix(provider/kubernetes): fix automatically assigned moniker cluster (#2585)
 - feat(titus): adds caller id header and reason to grpc mutating calls (#2583)
 - fix(entitytags): Avoid an `UnsupportedOperationException` (#2582)
 - fix(titus): fix environment variable copying (#2581)
 - feat(titus): support for container attributes (#2580)
 - fix(provider/kubernetes): v2 guard against malformed events in cache (#2576)
 - fix(provider/gce): Merge cache relationships in onDemand resolution. (#2517) (#2579)
 - fix(provider/kubernetes): v2 make cache more tolerant of failures (#2578)
 - fix(cache): make OnDemandMetricsSupport java-friendly (#2577)
 - feat(provider/kubernetes): v2 cluster is optional (#2574)
 - fix(provider/kubernetes): lookup of oldest server group (#2573) (#2575)
 - fix(provider/kubernetes): lookup of oldest server group (#2573)
 - fix(titus): set the owner of the job to be the one set in the application configuration (#2571)
 - fix(provider/kubernetesv2): fix secretVolumeReplacer (#2565) (#2572)
 - fix(provider/kubernetesv2): fix secretVolumeReplacer (#2565)
 - fix(provider/kubernetes): v2 search omit null (#2568) (#2570)
 - fix(provider/kubernetes): v2 search omit null (#2568)
 - fix(titus): Log which flavor of on-demand is being used (#2569)
 - fix(provider/kubernetes): support key ref secrets & cms (#2566) (#2567)
 - fix(provider/kubernetes): support key ref secrets & cms (#2566)
 - perf(titus): A feature flagged alternative OnDemand implementation (#2564)
 - fix(titus): look at job status first before checking task status (#2563)
 - refactor(titus): rename and move v3TitusClient to be more in line with the other RegionScopedCients (#2561)
 - fix(provider/kubernetes): don't fail credentials lookup if cluster is unreachable (#2562)
 - config(titus): removed apiVersion field since we only support v3 client now (#2560)
 - fix(titus): correct retry interval (#2559)
 - fix(titus): add retry to kill task, ignore NOT_FOUND (#2537)
 - perf(titus): avoid passing jobIds unnecessarily (#2534), but with feature flags (#2558)
 - fix(titus): fix load balancing (#2557)
 - perf(core): Optimize instance searches by favoring in-memory vs in-redis (#2543)
 - feat(titus): adding feature flag in region scoped titus client (#2544)
 - fix(provider/gce): De-duplicate instance healths reported from LBs. (#2556)
 - perf(caching): Support retrieving an individual on-demand record by id (#2523)
 - fix(titus): change titus api to make intent of getJob more explicit (#2552)
 - fix(provider/kubernetes): fix v1 red/black pod restarts (#2553) (#2554)
 - fix(provider/kubernetes): fix v1 red/black pod restarts (#2553)
 - perf(titus): increasing page size for titus requests (#2551)
 - chore(build): upgrade to Kotlin 1.2.40
 - chore(build): Gradle 4.7
 - fix(titus): don't retrieve job on resize (#2550)
 - fix(amazon): prevent amazon load balancer from crashing if rules cannot be loaded for an alb (#2547)
 - fix(titus): revert netty but keep titusRegion.url change (#2542)
 - revert(titus): reverting #2534 (#2541)
 - perf(aws): Optimize the retrieval of all security groups (#2539)
 - fix(titus): revert page size for investigation (#2538)
 - perf(provider/kubernetes): make one "large" caching agent (#2535)
 - feat(titus): allow port, url and applicationName to be configured by region (#2536)
 - fix(provider/kubernetes): v2 Check status of workloads after update (#2515)
 - perf(titus): avoid passing jobIds unnecessarily (#2534)
 - fix(docker): Do not cascade docker registry failures to health indicator (#2531)
 - feat(titus): surface aws accountId for insight links (#2532)
 - fix(titus): properly set scaling flags when enabling/disabling/resizing (#2530)
 - fix(core): Adjust message that is logged when a caching agent fails (#2529)
 - fix(titus): make loading load balancers more resilient (#2528)
 - fix(provider/ecs) Changes to allow ECS to work with AWS provider. (#2500) (#2527)
 - fix(provider/kubernetes): harden check for namespace (#2524)
 - fix(provider/ecs) Changes to allow ECS to work with AWS provider. (#2500)
 - refactor(titus): use NettyChannelBuilder for maxInboundMsgSize (#2522)
 - feat(provider/kubernetes): allow kinds to omit data when cached (#2521)
 - fix(titus): fix security groups payload for instances for backwards compatibility (#2520)
 - feat(provider/kubernetes): support tolerations (#2516)
 - perf(titus): increasing page size for titus requests (#2519)
 - fix(titus): removes aws lookup due to performance issues (#2518)
 - fix(provider/gce): Merge cache relationships in onDemand resolution. (#2517)
 - perf(google): Convert image lookup to Java (#2513)

### Deck  - e2296bd...a9ea49c
 - fix(trigger/webhook): fix lint issue - 1.8 (#5511)
 - fix(trigger/webhook): add runAsUser to webhook (#5508)
 - fix(build): add cachebust query param to scripts in index.html (#5482) (#5488)
 - fix(bake/manifest): fix passing namespace in helm bakery (#5457)
 - fix(core/application): Fix delete application modal hanging (#5455)
 - fix(amazon/securityGroups): Fix name validator from clearing the name
 - chore(amazon): Bump to 0.0.103 (#5438)
 - feat(amazon/loadBalancers): Support authenticate-oidc actions (#5437)
 - fix(pubsub): constraint alignment & help text (#5436)
 - fix(artifacts): only show question mark icon for custom artifacts (#5435)
 - fix(provider/kubernetes): re-enable script stage for k8s v2 (#5434)
 - chore(amazon): bump package to 0.0.102
 - chore(core): Bump to 0.0.237
 - fix(core/cluster): Fix broken logic in task.matcher.ts
 - chore(titus): Bump to 0.0.32
 - chore(core): Bump to 0.0.236
 - fix(core/cluster): check stage types both exact and lowercase for taskmatcher lookup (#5420)
 - fix(titus/instance): fix titus instance ssh links (#5429)
 - fix(core/pipeline): Make script stage "Path" field not required (#5428)
 - feat(core/presentation): Make CollapsibleSection less style opinionated (#5427)
 - fix(amazon): update help text (#5426)
 - feat(bake/manifests): Add namespace support for Helm bakery (#5326)
 - fix(appengine): auto pick a source type (#5425)
 - fix(deck): Change RunJob stage to check for logs in HTML (#5424)
 - Add a new patch manifest stage for kubernetes V2 provider (#5417)
 - fix(kubernetes): server group manager button alignment (#5423)
 - fix(kubernetes): break line for each container image in server group pod (#5422)
 - feat(provider/kubernetes): Support NFS volumes (#5421)
 - chore(core): Bump to 0.0.235 (#5419)
 - refactor(core/presentation): Add third 'modalProps' prop to ReactModal.show() (#5418)
 - chore(core): bump package to 0.0.234 (#5415)
 - fix(core): Make force rebake checkbox actually work (#5416)
 - feat(artifacts/bitbucket): added bitbucket artifact (#5414)
 - fix(core): fix check on showAllInstances for cluster height calculations (#5413)
 - chore(core): bump package to 0.0.232 (#5411)
 - fix(core): recompute cluster pod heights on filter changes (#5410)
 - fix(provider/kubernetes): namespace manifests are fetched with namespace of _ (#5412)
 - fix(core): improve pipeline graph mouse event handling for Chrome 67 (#5409)
 - chore(provider/kubernetes): delete unused ng modules (#5408)
 - fix(provider/kubernetes): artifact tab columns compressed in small windows (#5406)
 - chore(amazon): bump package to 0.0.101 (#5407)
 - feat(core/pipeline): Make CreatePipelineModal overridable (#5395)
 - fix(amazon): filter app load balancer options by account/region in cluster config (#5403)
 - chore(core/kubernetes/appengine): core@0.0.231, kubernetes@0.0.14, appengine@0.0.5 (#5405)
 - fix(provider/kubernetes): provide placeholders when manifest API returns 404 (#5404)
 - fix(provider/kubernetes): ensure key uniqueness in artifact icon list (#5402)
 - chore(kubernetes/appengine): bump package versions (#5396)
 - fix(provider/kubernetes): clicking LB doesnt always show correct details view (#5401)
 - fix(artifacts): "expected artifacts" < "artifact constraints" (#5400)
 - fix(provider/kubernetes): manifest.metadata.namespace can be null-ish (#5399)
 - refactor(core): allow React components for stage config (#5398)
 - fix(core/presentation): move some things out of state and just use props. Re-evaluate the expression on each render. (#5397)
 - feat(core): Support buffered executions and sort appropriately (#5394)
 - fix(provider/kubernetes): config relying on name instead of labels incorrectly validates kind (#5393)
 - chore(provider/kubernetes): reactify deployManifest execution details (#5376)
 - chore(*): package bumps: core to 230, amazon to 100, titus to 31 (#5392)
 - refactor(amazon): de-angularize services (#5391)
 - refactor(core) de-angularize more services (#5390)
 - fix(provider/kubernetes): manifest textarea clipped (#5389)
 - fix(core/trafficGuard): Fix unsupported accounts error message firing incorrectly (#5388)
 - fix(oracle): fix InstanceReader import (#5387)
 - refactor(core): de-angularize services (#5385)
 - fix(amazon/loadBalancers): Fix instance health counts in load balancers view (#5386)
 - fix(core): Show stage failure message when necessary (#5384)
 - Revert "fix(core/executions): Fix rapid browser hangs from rapid URL … (#5383)
 - chore(docker): Bump to 0.0.12 (#5382)
 - fix(provider/ecs): generify URL (#5379)
 - chore(build): Add ARTIFACTS_ENABLED env variable. (#5381)
 - chore(titus): Bump to 0.0.30
 - chore(amazon): Bump to 0.0.99
 - chore(core): Update kayenta
 - chore(core): Bump to 0.0.228
 - refactor(core): De-angularize application read service
 - refactor(core): de-angularize application data source registry
 - refactor(core): De-angularize scheduler factory
 - refactor(core): De-angularize inferred application warning service
 - refactor(core): De-angular application write service
 - refactor(core): de-angularize services (#5377)
 - chore(*): bump core/amazon/titus packages (#5375)
 - fix(core/executions): Fix rapid browser hangs from rapid URL cycles triggered by changing a pipeline filter by altering the URL and hitting enter (#5373)
 - feat(artifacts): Add artifact details to GCE bake and deploy stages (#5374)
 - refactor(artifacts): Generalize kubernetes artifact summary (#5370)
 - refactor(core): de-angularize services (#5365)
 - refactor(core): convert notifier functionality to React (#5366)
 - fix(core): avoid NPE on manual execution modal open (#5372)
 - fix(core): Fix warnings about unused variables (#5371)
 - feat(*/instance): add moniker info + env to instance link templates (#5367)
 - fix(core): Added validators for script stage
 - chore(provider/kubernetes): de-angularize manifest command builder (#5369)
 - feat(artifacts): Show artifact icon in artifact.component (#5368)
 - chore(*): bump core/amazon/titus packages (#5363)
 - fix(amazon): unbreak firewall creation button (#5362)
 - fix(provider/kubernetes): correct closing tag in deploy manifest execution details (#5361)
 - fix(core): force Registry config block to run earlier (#5360)
 - fix(*): fix imports from core module (#5359)
 - refactor(core): de-angularize services (#5354)
 - fix(core): Stop assuming trigger will exist for manual executions (#5356)
 - chore(provider/kubernetes): deangularizify k8s manifest services (#5358)
 - feat(artifacts): add gitlab artifacts (#5357)
 - fix(aws): Show CLB cert selector when listener changes to SSL (#5355)
 - chore(*): bump packages for amazon/appengine/core/google/k8s/titus (#5353)
 - refactor(*): de-angular-ize task reader/writer/executor (#5352)
 - fix(artifacts): ensure fieldColumns is not undefined (#5351)
 - chore(provider/appengine): use expected-artifact-selector in place of copy-n-paste (#5350)
 - fix(titus): update UI endpoint when run job details props update (#5349)
 - feat(core/tasks): deep link to text query in tasks view (#5342)
 - chore(artifacts): de-angularize artifact reference service (#5348)
 - fix(core): Fix travis triggers (#5347)
 - chore(provider/kubernetes): de-angularize v2 expected artifact service (#5345)
 - feat(artifacts): type icons in artifact selectors (#5346)
 - feat(artifacts): increase set of artifacts listed in execution artifacts tab (#5343)
 - chore(*): Bump core/amazon/docker/titus/kayenta (#5344)
 - refactor(*): De-angular pipelineConfigProvider and rename to PipelineRegistry (#5340)
 - feat(artifacts): show artifact type as icon in execution summary (#5341)
 - chore(core): Bump to 0.0.222 (#5339)
 - fix(core/clusters): prevent scroll reset on instance clicks; better no rows messaging (#5333)
 - fix(core): Cleanup manual trigger template state when switching pipelines (#5338)
 - chore(core/docker): bump core to 0.0.221, docker to 0.0.10 (#5337)
 - fix(core): Fix the triggers to reload when multiple triggers of same type (#5335)
 - chore(core/docker): bump core to 0.0.220, docker to 0.0.9 (#5336)
 - fix(core): Fix jenkins trigger selection for manual trigger (#5334)
 - fix(docker): Fix docker branch selection for manual trigger (#5332)
 - feat(webhook): override webhook timeout (#5330)
 - perf(core): Support loading an application with `?expand=false` (#5329)
 - chore(core): Bump to 0.0.218 (#5328)
 - feat(ttl): Clearly identify ephemeral server groups (#5325)
 - feat(artifacts): List artifacts consumed / produced by executions (#5322)
 - chore(docker): Bump to 0.0.8
 - chore(core): Bump to 0.0.217
 - refactor(core): Convert travis trigger template to react
 - refactor(core): Convert pipeline trigger template to react
 - refactor(docker): Convert docker trigger template to react
 - refactor(core): convert jenkins trigger template to react
 - chore(core): Add a TetheredSelect component to tether dropdown to body
 - refactor(core): Make manual execution templates need to be react
 - refactor(docker): De-angular docker image reader
 - refactor(*): De-angular retry service
 - chore(core): Bump to 0.0.216
 - refactor(core): Convert load balancer filters to react
 - refactor(core): Create a react filter collapse button
 - refactor(core): Create react component for cloud provider label
 - refactor(core): De-angular dependentFilter.service
 - refactor(core): Collapse load balancer dependent filter helper
 - fix(amazon): Make sure to show the target group from the right region
 - feat(artifacts): Either string or artifact is sufficient for bake stage (#5316)
 - chore(titus): Bump to 0.0.25
 - chore(core): Bump to 0.0.215
 - refactor(core): De-angular pipelineConfig.service (#5306)
 - fix(core/pipelines): fix execution graph overflow in Firefox (#5314)
 - chore(core): bump to 0.0.214
 - chore(titus): bump to 0.0.24
 - chore(titus): bump to 0.0.23
 - feat(titus): make on demand cluster ui more obvious
 - feat(titus): filter .titus prefix in job attritbutes
 - fix(amazon): remove listener certs when switching to HTTP (#5310)
 - fix(core/sms): loosen validation of SMS input for notifications (#5309)
 - feat(core/tasks): If no user for the task, show the authenticated user (#5308)
 - refactor(core): Remove unused instanceList.filter (#5307)
 - fix(settings): add gitlab git source by default (#5304)
 - chore(core): bump package to 0.0.213 (#5303)
 - fix(core/executions): do not overwrite hydrated executions (#5302)
 - fix(core/pipelines): fix this binding on pipeline template controller (#5301)
 - refactor(core): handle TS issue with interface extension (#5300)
 - fix(core): fix path to entity source pipeline (#5299)
 - chore(titus): bump package to 0.0.22 (#5298)
 - chore(*): Bump kayenta dependency to 0.0.47
 - chore(core): Bump to 0.0.212
 - chore(amazon): Bump to 0.0.94
 - fix(titus): fix links to job execution details (#5296)
 - chore(*): Update to react 16.3.2 (#5295)
 - chore(*): Keep dependencies up to date (#5294)
 - refactor(core): rename Security Groups to Firewalls (#5284)
 - feat(amazon): Cluster dialog - only preload load balancers associated with app (#5289)
 - chore(core): bump package to 0.0.211 (#5293)
 - fix(core/executions): ensure group count is set; sync before setting hydrated flag (#5292)
 - chore(core): bump package to 0.0.210 (#5291)
 - Execution fixes (#5290)
 - chore(core): bump package to 0.0.209 (#5288)
 - fix(core/pipelines): display comments on stage details (#5287)
 - fix(provider/gce): Fix whitespace. (#5286)
 - fix(provider/gce): Warn user if using default instanceType storage. (#5285)
 - chore(titus): bump package to 0.0.21 (#5283)
 - refactor(titus): convert run job details to React (#5282)
 - fix(pubsub): Filter displayed list of Pub/Sub Subscription Names by Pub/Sub System Type. (#5281)
 - feat(provider/gce): Surface all available GCE instanceTypes. (#5278)
 - chore(titus): bump package to 0.0.20
 - feat(titus): allow run job to be restarted
 - fix(ssl/apache2): Fix for ports.conf.gen (#5254) (#5277)
 - chore(core): bump package to 0.0.208 (#5276)
 - fix(core): do not use arrow functions for inline ng controllers (#5275)
 - chore(titus): bump to 0.0.19
 - fix(provider/titus): fix premature display of titus logs
 - chore(titus): bump package to 0.0.18 (#5272)
 - feat(artifacts): Allow artifacts to be selected in bake config (#5270)
 - fix(provider/titus): removes allocateIp and ports since these are no longer used (#5271)
 - chore(core/amazon/titus): bump packages (#5267)
 - fix(artifacts): method-syntax functions cant be used as constructors (#5269)
 - refactor(titus): move container attributes above env
 - perf(*): transpile to latest two modern browsers only (#5260)
 - fix(core): trim pipeline name when checking for duplicates (#5262)
 - fix(provider/kubernetes): update manifest status class for babel change (#5266)
 - docs(tootltip): update docker trigger tooltip (#5264)
 - refactor(google): Refactor config fields to use consistent directive (#5263)
 - fix(provider/kubernetes): manifest status fails to show unstable entries (#5265)
 - fix(core): remove tooltip if needed when unmounting instances (#5258)
 - chore(titus): bump package to 0.0.16
 - fix(titus): clean up sidebar to be inline with aws
 - feat(provider/kubernetes): add manifest status in execution summary (#5257)
 - chore(core): update to version 0.206
 - feat(core): send includeDetails=false for server groups (#5255)
 - fix(ssl/apache2): Fix for ports.conf.gen (#5254)
 - chore(core): bump package to 0.0.205 (#5253)
 - fix(core): fix task matcher region check for rollbackServerGroup (#5251)
 - chore(kubernetes): bump package to 0.0.11 (#5252)
 - chore(core): bump package to 0.0.204 (#5250)
 - chore(core): bump package to 0.0.203 (#5249)
 - feat(artifacts): find artifacts from resource should produce artifacts (#5248)
 - chore(titus): bump version to 0.0.15
 - feat(titus): support container attributes
 - fix(core/pipeline): Simplify cache field naming to avoid confusion (#5245)
 - feat(pipeline_templates) Allow Pipelines to Inherit Pipeline Template Configuration (#5214)
 - fix(core/pipeline): Retain show stage durations even if filter applied (#5244)
 - feat(provider/kubernetes): cluster/app/detail no longer configurable in (#5243)
 - Revert "fix(build): re-minify build" (#5241)
 - fix(core): Fix ordering for executions in triggers (#5242)
 - Open links in new tab (#5240)
 - fix(build): re-minify build (#5239)
 - fix(artifacts): limit list of artifacts in execution to those consumed by pipeline (#5238)
 - feat(artifacts) Let pipeline stages emit artifacts (#5193)
 - feat(artifacts): Support Jenkins stages emitting artifacts (#5174)
 - chore(appengine): bump package version to 0.0.2 (#5237)
 - Fixes an "invalid regex" JS error. (#5236)
 - fix(bake/manifest): attach UUID to expected artifact (#5235)
 - chore: Update kayenta dependency (#5234)
 - feat(bake/manifest): allow ui-specified value artifacts (#5232)
 - chore(kubernetes): Bump package to 0.0.10 (#5233)
 - chore(core): Bump package to 0.0.202 (#5231)
 - fix(core/pipeline): Only list decorated artifacts (#5229)
 - chore(bake/manifest): clarifying comment on first artifact (#5223)
 - fix(core) Keep correct stage in summary object for future operations (#5230)
 - fix(core/executions): store execution count filter per application (#5228)
 - chore(docker): Bump package to 0.0.7
 - chore(titus): Bump package to 0.0.14
 - chore(core): Bump package to 0.0.201
 - chore(amazon): Bump package to 0.0.92
 - chore(core): Upgrade kayenta dependency
 - fix(*): Fix tests
 - fix(lint): Thanks prettier
 - refactor(*): De-angularize account service
 - refactor(*): De-angularize API service
 - fix(core/tests): Make sure angular-ui-bootstrap is available for necessary tests
 - refactor(core): De-angularize authentication initializer
 - refactor(core): Convert logged out modal to react
 - refactor(*): De-angularize authentication service
 - refactor(*): De-angularize cloud provider registry
 - fix(core): sort global search results by ranking (#5225)
 - fix(core): attach instance ID tooltip to body (#5224)
 - chore(build): Gradle 4.7
 - feat(bake/manifest): helm values artifacts (#5222)
 - chore(google): bump npm package version (#5182)
 - chore(core): bump package to 0.0.199 (#5219)
 - chore(deck-kayenta): bump package to 0.0.43 (#5217)
 - fix(core/cluster): fix infinite loop toggling listInstances true/false (#5218)
 - chore(deck-kayenta): bump package to 0.0.43 (#5216)
 - chore(provider/kubernetes): tighten deploy manifest details view (#5215)
 - feat(provider/kubernetes): expose optional envvar (#5209)
 - refactor(core): Consolidate securty group dependent filter helper (#5212)
 - fix(core/serverGroup): Default to decoding User Data as text (#5210)
 - fix(provider/ecs): enable ecs provider within deck. (#5190) (#5208)
 - fix(provider/ecs): enable ecs provider within deck. (#5190)
 - fix(provider/kubernetes): fix empty tolerations (#5207)
 - fix(provider/kubernetes): hide bake manifest stage from k8s v1 provider (#5206)
 - fix(provider/kubernetes): hide bake manifest stage from k8s v1 provider (#5205)
 - feat(provider/kubernetes): v1 suport tolerations (#5203)
 - feat(provider/kubernetes): Surface specially named annotations in details UI (#5197)
 - fix(core): fix HelpField export (#5204)
 - chore(core): bump package to 0.0.197 (#5202)
 - fix(core): remove artificial dehydration code from execution service (#5201)
 - chore(*): bump packages for de-angularized help contents (#5200)
 - refactor(*): de-angularize help contents/registry (#5199)
 - fix(core): ExecutionBuildTitle sometimes gets an undefined execution (#5198)
 - fix(core): allow auto-navigation on single search result in V2 (#5196)
 - chore(kubernetes): bump package.json to 0.0.8 (#5194)
 - feat(provider/kubernetes): run job node selector (#5181) (#5191)
 - feat(provider/kubernetes): run job node selector (#5181)
 - chore(titus): bump to 0.0.12
 - fix(titus): backwards compatible instance security groups
 - chore(core): bump package to 0.0.195 (#5187)
 - refactor(core): use running executions to refresh in-place executions (#5186)
 - fix(core): fix refresh on execution patches; default option on judgment (#5183)
 - chore(titus): bump package to 0.11
 - fix(titus): use securityGroup instead of securityGroupDetails
 - fix(titus): rename environment to environment variables and labels to job attributes
 - refactor(core): Remove angular from security groups filter service
 - refactor(core): Remove angular from load balancer filter service
 - refactor(core): Remove angular from cluster filter service
 - refactor(core): Remove angular from security groups filter model
 - refactor(core): Remove angular from multiselect model
 - refactor(core): Convert multiselect model to TS
 - refactor(core): Remove angular from execution filter model
 - refactor(core): Remove angular from cluster filter model
 - refactor(core): Remove angular from load balancer filter model
 - test(filterModel): Make sure 'ui.router' is initialized before tests which depend on it.
 - refactor(core): Remove angular from filter model service

### Echo  - 4a9f9c0...617c567
 - fix(healthcheck): pipelines might have no triggers (#293)
 - fix(pubsub/google): don't restart when subscription doesn't exist (#276) (#279)
 - fix(build): Fix spring warnings about validated classes (#273)
 - fix(json): prevent infinite recursion when serializing pipelines (#271)
 - fix(cron): fallback for cron triggers with null id (#270)
 - chore(build): Add debug flag to echo build (#268)
 - fix(metrics): replace Spring Boot metrics with Spectator (#267)
 - fix(cron): make comp job work for hourly/daily pipelines (#266)
 - fix(cron): Partition pipeline config ids in compensation job (#265)
 - refactor(scheduler): Move cron fuzzing logic to scheduled-actions lib (#264)
 - fix(pubsub): Restart Google Pubsub subscriber on failures (#263)
 - feat(scheduler): Support for fuzzing seconds, minutes and hours on cron expressions (#261)
 - fix(webhooks): make copy of payload to avoid editing it (#262)
 - fix(pubsub): Change /pubsub/subscriptions API to return a list of a datatype containing pubsubSystem and subscriptionName fields. (#260)
 - fix(jira): Allow echo to start up with jira disabled. (#259)
 - feat(jira): Adding Jira notification type (#258)
 - chore(build): Gradle 4.7
 - fix(scheduler): Moving metrics to top-level (#256)
 - feat(scheduler): Enable compensation job to run regularly, not just on startup (#255)
 - Fix typo in Dockerfile.slim (#254)
 - fix(pipeline-triggers): Remove high cardinality tags on echo metrics (#253)

### Fiat  - bac75ed...112f58a
 - feat(api): Support running with `management.security.enabled: false` (#232)
 - fix(authn): invalidatePermission from cache
 - feat(web): Support defaulting to `__unrestricted_user__` when no permissions found (#230)
 - fix(hystrix): prevent silent NPE after timeout (#228)
 - fix(roles/file): Handle empty file-based roles. (#227)
 - chore(dependencies): Update spinnaker-dependencies to 0.154.3 (#226)
 - fix(api): Stop parsing application names in fiat using frigga. (#225)
 - docs(readme): Fix broken link in README (#224)
 - chore(build): Gradle 4.7
 - Fix typo in Dockerfile.slim (#222)

### Front50  - bed259c...93febf2
 - fix(google): Fix caching of permissions (#326) (#327)
 - chore(dependencies): bump to 0.157.5 (#324)
 - feat(notification): add bearychat support (#323)
 - feat(entitytags): Support for bulk delete of entity tags (#322)
 - chore(core): Tweak log message (#321)
 - fix(core): Ensure that all pipeline cron triggers have an identifier (#320)
 - refactor(provider/oracle-bmcs): Rename the sub project front50-oracle-bmcs to front50-oracle (#319)
 - chore(dependencies): Bump to 0.155.1 (#318)
 - fix(s3): Short-circuit needs to be a modifable `List` (#317)
 - perf(s3): Short circuit when asking for object history w/ maxResults = 1 (#316)
 - fix(core): Fix auth propagation for `bulkImport` calls (#315)
 - feat(s3): add regionOverride property (#314)
 - chore(dependencies): Update spinnaker-dependencies to 0.154.3 (#313)
 - fix(logs): adding delete log to correlate pipeline name with pipeline id (#312)
 - fix(oraclebmcs): Throw NotFoundException instead of return null (#311)
 - chore(build): Gradle 4.7
 - Fix typo in Dockerfile.slim (#309)

### Gate  - 18965e0...5d505ca
 - fix(hystrix): Avoid an `NaN` when publishing `hystrix.currentTime` (#558) (#559)
 - chore(dependencies): bump to 0.157.5 (#554)
 - feat(loadBalancers): Add support for an oidc config endpoint (#552)
 - fix(authn/iap): Move iap config values out of Spring default namespace. (#551)
 - chore(swagger): Small update to Swagger annotations. (#549)
 - fix(permission): missing execute on hystrix wrappers (#548)
 - feat(permission): hystrix wrappers for permission service calls (#547)
 - chore(dependencies): Bump to 0.155.1 (#546)
 - feat(web): Support for proxying generic URLs through `gate` (#545)
 - feat(authz): Add ability to disable Fiat session filter. (#534) (#544)
 - feat(pagination): support the 'page' qs param in orca's tasks endpoint
 - fix(web): Propagate any exceptions stemming from a failed pipeline save (#542)
 - feat(expression): evaluateExpression supports POST
 - chore(dependencies): Update spinnaker-dependencies to 0.154.3 (#539)
 - chore(firewalls): Add FirewallController and deprecate SecurityGroupController. (#525)
 - feat(authz): Add ability to disable Fiat session filter. (#534)
 - fix(pubsub): Change /pubsub/subscriptions API to return subscriptions along with their associated Pub/Sub system type. (#538)
 - chore(*): Remove OrcaService.all() call (#537)
 - chore(swagger): Adds a gradle task and script to generate swagger spec. (#536)
 - feat(core): server group includeDetails flag to suppress returning instances (#535)
 - feat(core): ServiceSelector orca queue sharding (#529)
 - feat(cloud-iap): Create new web security integration with IAP (#533)
 - fix(dependencies): bump to latest and remove spring-data-rest (#532)
 - fix(instanceService): surface application name for insight links (#531)
 - chore(build): Gradle 4.7
 - chore(core): Upgrade spinnaker-dependencies to 1.152.1 (#528)
 - chore(api): Finish swagger annotations. (#526)
 - Fix typo in Dockerfile.slim (#527)

### Igor  - ae2b329
No Changes

### Kayenta  - fd99dfa...9f62a06
 - fix(gcs): fixes metric set pair deserialization (#321)
 - chore(build): Stop skipping tests
 - chore(travis): re-enable snapshots (#320)
 - chore(build): attempt to temp. disable snapshots
 - chore(build): update travis link
 - chore(build): update gradle and build scripts (#318)
 - chore(cleanup): delete unneeded rserve conf
 - keys, take 2
 - re-encrypt secrets
 - chore(build): trusty -> xenial
 - chore(dependencies): move to using spinnaker-dependencies (#315)
 - update oss lifecycle to active
 - fix(atlas): use groupByKeys for accurate tag filtering (#310)
 - chore(comments): fixed comments pointing to metric source api docs (#309)
 - chore(err-msg): Improve error message from indexing agent when no storage service is configured. (#303)
 - feat(judge): Implement metric criticality (#299)
 - feat(judge): implement NaN replacement strategy (#298)
 - fix(build): Add back inadvertently-removed imports. (#296) (#297)
 - fix(build): Add back inadvertently-removed imports. (#296)

### Orca  - 324eb37...de4ab55
 - fix(provider/kubernetes): fail when an artifact couldn't be bound (#2301) (#2302)
 - fix(provider/kubernetes): fix NPE when no artifact given (#2289) (#2291)
 - chore(dependencies): bump to 0.157.5 (#2279)
 - feat(notification): add bearychat support (#2277)
 - feat(bake/manifests): Add namespace support for Helm bakery (#2241)
 - Revert "feat(core): revert support for parallel after stages (#2194)" (#2242)
 - feat(provider/kubernetes): Add a new patch manifest stage for V2 provider (#2270)
 - feat(queue): Upgrade keiko to 2.9.0 (#2275)
 - feat(provider/kubernetes): cleanup artifacts task (#2274)
 - fix(redis): Incorrect pipelined results handling (#2273)
 - refactor(qos): Move buffering metric to actuator (#2264)
 - feat(provider/ecs): added support for non-ecr docker repositories (#2221)
 - fix(caching): Fix bug resetting stageData after successful cache refresh (#2268)
 - fix(redis): Broken test with perf refactor (#2269)
 - perf(redis): Pipeline cardinality commands in polling agents (#2267)
 - chore(*): Adding metrics to two polling agents (#2266)
 - fix(redis): Fix polling agent redis implementation (#2265)
 - chore(*): Upgrade Keiko to 2.8.1 (#2263)
 - fix(zombies): log zombie executions (#2262)
 - refactor(qos): Reduce logging noise during actuation (#2261)
 - fix(zombies): check cluster lock and discovery status before running (#2260)
 - chore(queue): Record metrics on task timeouts (#2259)
 - fix(queue): fail stage if `beforeStages` planning fails (#2257)
 - fix(pipeline/expressions): reference trigger as map, not object (#2253) (#2258)
 - fix(pipeline/expressions): reference trigger as map, not object (#2253)
 - fix(qos): Monitoring changes & immediate Execution start (#2256)
 - refactor(qos): Moves enabled flag to FP (#2231)
 - fix(clouddriver): overwrite entity tags when creating new server group (#2255)
 - feat(alerting): detect zombie executions (#2251)
 - fix(provider/kubernetes): retry faster when failing to parse (#2254)
 - fix(queue): Allow restart of a failed branch while pipeline is running
 - fix(redis): Add kotlin to module (#2252)
 - fix(provider/kubernetes): fix lookup of non-namespaced manis (#2249) (#2250)
 - fix(provider/kubernetes): fix lookup of non-namespaced manis (#2249)
 - feat(redis): Add index for buffered executions (#2232)
 - chore(travis): Remove 'junitPlatformTest' references from gradle/*ViaTravis.sh (#2248)
 - fix(front50): s/MonitorFront50Task/monitorFront50Task (#2247)
 - fix(clouddriver): Support restoring pinned server groups in privileged accounts (#2246)
 - fix(front50): Additional flexibility for the `MonitorFront50Task` (#2245)
 - chore(dependencies): Use latest Kotlin
 - chore(tests): Update JUnit platform & Gradle config
 - chore(log): adding execution id (#2244)
 - chore(monitorWebhook): add status code from the url for debugging (#2243)
 - feat(pagination): no need for a new controller
 - feat(pagination): use limit as page size, prevent page < 0
 - refactor(redis): Moving ActiveExecutionsMonitor to orca-redis module (#2238)
 - fix(front50): process expressions in dependent pipeline trigger (#2237)
 - fix(pipelines): synthetic stage in FAILED_CONTINUE state triggers immediate completion of parent (#2230)
 - feat(tasks): add criteria fields for paginating tasks
 - refactor(core): Polling agents are now persistence agnostic (#2214)
 - feat(jira): ability to link issues, set assignee (#2235)
 - Okhttp3 oui oui (#2234)
 - fix(expressions): improved evaluateExpression api
 - chore(dependencies): Update spinnaker-dependencies to 0.154.3 (#2226)
 - Revert "refactor(core): Remove RxJava from ExecutionRepository interface" (#2228)
 - feat(provider/kubernetes): propagate manifest failures to UI (#2229)
 - fix(queue): Fix accidental boolean inversion in shouldQueue
 - fix(core): Spliterators cause the JVM to crash, use Guava (#2224)
 - Revert "config(okhttp3): pick up okhttp3 as retrofit client (#2218)" (#2222)
 - feat(monitoring): Allow for `executions.running` to be tracked for a specific set of applications (#2220)
 - config(okhttp3): pick up okhttp3 as retrofit client (#2218)
 - refactor(core): Remove RxJava from ExecutionRepository interface (#2205)
 - chore(dependencies): Bump keikoVersion to 2.7.2 (#2219)
 - fix(core): prevent app permissions from being lost during an app upsert operation (#2217)
 - feat(jobs): allow run job stage to be restartable (#2215)
 - fix(provider/kubernetes): use thread local yaml parser (#2198) (#2216)
 - feat(core): Change Execution & Stage IDs to use ULIDs (#2189)
 - chore(jira): Adding method to easily create request (#2213)
 - fix(core): made terminology less confusing
 - fix(core): don't immediately restart pipelines if another is running
 - fix(clouddriver): Minor tweak to log message in spinnaker/orca#2211 (#2212)
 - feat(artifacts): Orca passes artifacts to bake to rosco (#2206)
 - fix(provider/kubernetes): support both list formats for remote artifacts (#2207)
 - fix(clouddriver): Automatically retry if replica lag detected when force cache refreshing (#2211)
 - feat(core): fast property based kill-switch for pipeline buffering
 - fix(error msg): adding second ) (#2210)
 - feat(core): fast property based kill-switch for pipeline buffering
 - feat(manifest): add manifest to manifest model (#2203)
 - refactor(jira): Extracted jira creation into a service class (#2204)
 - config(metrics): best effort at pulling account, region, cloud from c… (#2200)
 - refactor(core): ExecutionRepository to require ExecutionType in methods (#2202)
 - fix(provider/kubernetes): use thread local yaml parser (#2198)
 - refactor(qos): Operational changes (#2184)
 - feat(jira): Adding a jira stage support (#2183)
 - feat(queue): make activeExecution key configurable (#2191)
 - feat(artifacts): find artifacts from resource should produce artifacts (#2199)
 - feat(core): revert support for parallel after stages (#2194)
 - fix(deploy/manifest): retry loading & parsing manifests (#2196)
 - fix(pipeline_template): Don't share snakeyaml instance across threads (#2193) (#2197)
 - fix(canary): Logging improvements around canary deploy / registration (#2195)
 - fix(pipeline_template): Don't share snakeyaml instance across threads (#2193)
 - fix(queue): Older ContinueParentStage messages have no phase property
 - fix(executions): Executions cancelled before they start have no end time
 - fix(clouddriver): Minor issue with original groovy -> java conversion (#2188)
 - feat(clouddriver): Allow for external server group force cache refreshes (#2187)
 - chore(*): Upgrade to Boot 1.5.10 (#2185)
 - feat(core): Adding system notifications property to execution (#2173)
 - feat(kayenta): optionally deploy control and experiment clusters before analysis
 - feat(artifacts): Parse Jenkins job properties for artifacts (#2140)
 - fix(bake/manifest): propagate field change to orca (#2181)
 - feat(qos): Adding initial naive Quality of Service module (#2164)
 - feat(redis): Conditional prop for RedisExecutionRepository (#2180)
 - fix(kubernetes) - fixes WaitForClusterDisable timeout for kubernetes during redblack (#2176) (#2179)
 - fix(kubernetes) - fixes WaitForClusterDisable timeout for kubernetes during redblack (#2176)
 - fix(redis): Add JedisConfiguration to import (#2177)
 - refactor(*): Split redis code to its own module (#2175)
 - config(dependencies): float rxJava version (#2174)
 - fix(webhook): after one minute monitor every 15s (#2161)
 - fix(queue): vital concurrency fix in Keiko
 - chore(build): Gradle 4.7
 - feat(bake/manifest): allow multiple input artifacts (#2171)
 - fix(core) Populate trigger.artifacts when it's a manual execution with the context of a previous build trigger (#2160)
 - chore(dependencies): upgrade Kotlin
 - fix(expressions): Include eval summary for unevaluated composite expressions (#2165)
 - fix(provider/kubernetes): properly implement force cache refresh (#2167)
 - fix(q): actually using dead letter handler (#2166)
 - fix(docs) Correct headers parameter in orca.yml (#2017)
 - feat(artifacts) Expose child pipeline outputs as outputs of a pipeline stage (#2152)
 - More tags (#2157)
 - fix(redis): Fix error message interpolation. (#2162)
 - feat(provider/kubernetes): v2 Add stable/failed manifests to output (#2150)
 - fix(core): Fixing a typo in event listener multicaster (#2159)
 - Whitelist java.time.LocalDate to allow for date manipulation (#2153)
 - fix(pipelines): retain group field in stage context if present (#2156)
 - config(metrics): tag task duration metric with task type (#2155)
 - fix(clouddriver): Do not log stacktrace in handled case (#2154)
 - chore(core): equals/hashCode don't need to reference super
 - feat(core): Support for both sync/async application event listeners (#2149)

### Rosco  - f86b041...adf0e78
 - fix(install_packages): support for multiple repos (#268)
 - feat(bake/manifests): Add namespace support for Helm bakery (#261)
 - fix(kubernetes): --set multitple times does not work with exe #266
 - fix(artifacts): Guard access to artifacts file in bake script (#265)
 - chore(Dockerfile): Fix packer url. (#264)
 - fix(artifacts): Include artifact reference in bake key (#263)
 - fix(docs): Fix repository format in rosco.yml comment (#262)
 - Adding verbatim chocolatey package name capability (#230)
 - fix(manifest): Fix using base64 artifacts in manifest bakery
 - fix(artifacts): Use artifact name to construct package name (#258)
 - feat(artifacts): Enable rosco to install packages passed as artifacts (#257)
 - chore(helm): install openssl & curl for helm install (#256)
 - chore(helm): install helm (#255)
 - feat(bake/artifacts): Pass artifacts to packer (#253)
 - feat(bake/manifest): allow multiple input artifacts (#251)
 - chore(build): Gradle 4.7
 - feat(bakery): GCE image bakery supports manifest files (#248)
 - Fix typo in Dockerfile.slim (#249)
