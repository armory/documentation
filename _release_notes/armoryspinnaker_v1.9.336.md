---
layout: post
title: v1.9.336 Armory Enterprise Spinnaker
order: 959
---

# 11/08/17 Release Notes

> Note: If you're experiencing production issues after upgrading Spinnaker rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback)



## Highlighted Updates
### Armory Enterprise Spinnaker

Earlier versions
Of these release notes were not
Proofread by humans

### barometer - 54d8390
- Begin work for new relic support. (#105)

### deck-armory - c254801
- New Relic UI so you can choose per-pipeline.

### gate-armory - 535da1f


###  Spinnaker Community Contributions
### orca - v3.42.2
- fix(rollingpush): Ensure `waitTaskState` is cleared between iterations (#1767)
- fix(pipeline_template): Resave all pipelines on template update (#1766)
- feat(orca) Place produced artifacts in stage output (#1441)
- fix(canary-v2): Avoid naming collision between mine/kayenta tasks. (#1761)
- fix(security): Prevent webhook users from spoofing authed user

### deck - v2.1149.0
 - feat(trigger/pubsub): Suggest subscriptions from echo configuration. (#4328)
 - fix(core): Fix webpackJsonp not being defined for local dev (#4322)
 - fix(core): Fix wait stage task time updating (#4320)

### gate - v4.10.0
- feat(pipeline_template): Support pipeline templates with dynamic sources (#471)

### rosco - v0.102.0
- fix(rosco) Make pause_before configurable, maintaining current default (#224)

### clouddriver - v1.707.0
- feat(provider/aws): Enable optional AWS Shield protection on ELB & ALBs (#2089)
- feat(provider/kubernetes): allow users to skip creating pull secrets (#2088)
- feat(provider/ecs): ECS Account Credentials (#2034)
- fix(provider/gce): Update L7 delete for UHCs. (#2066)
- fix(aws): Flagging elb security group autocreation (defaults to off)
- fix(amazon/alb): Fix rule comparison so listeners do not get updated when they are the same (#2047)
- feat(provider/kubernetes): v2 load balancer provider (#2050)
- fix(provider/kubernetes): allow to configure with service account. (#2044)
- feat(provider/kubernetes): support delete and update strategies operaâ€¦ (#2021)
- feat(provider/kubernetes): v2 manifest provider (#2033)
- feat(provider/kubernetes): use kubectl to handle deploy apply (#2031)

### fiat - v0.33.0
- fix(UserRoleSyncer) add config timeout to agent polling (#203)


<br><br><br>
## Detailed Updates
### Armory Enterprise Spinnaker
### lighthouse - 7d238ac
 - Add Barometer to health check ONLY if enabled. (#125)

### barometer - 54d8390
 - Tailor for New Relic, serve static point list. (#105)
 - Update yml resources for NewRelic.

### deck-armory - c254801
 - Initial pass on adding New Relic support for canary stages
 - chore(deck) - version bump

### gate-armory - 535da1f
 - Include the gate.yml in the distribution files

###  Spinnaker Community Contributions
### orca - v3.42.2
 - fix(trafficguards): Fix Moniker usage in instance termination (#1781)
 - fix(log): clarify missing custom strategy error (#1780)
 - fix(front50): Avoid canceling an already canceled child pipeline (#1779)
 - Use StageContext consistently without breaking strategies (#1772)
 - Fixes restarting ACA task stages (#1777)
 - fix(web): Make trigger map mutable (#1776)
 - fix(pipeline_template): Deal with whitespace in jinja module kv pairs (#1773)
 - fix(canary): fix wait task after baseline asg disable (#1771)
 - feat(core): Add correlation ids to orchestrations (#1748)
 - chore(gradle): Avoid running junit platform tests on master/release branch (#1775)
 - fix(manifest): Fix delete behavior (#1774)
 - chore(gradle): Avoid running tests on master/release branch (#1769)
 - fix(orca/canary): Don't presume array present (#1770)
 - fix(core): `DetachInstancesTask` should have traffic guards (#1768)
 - feat(moniker): Use moniker in TrafficGuard. (#1727)
 - fix(rollingpush): Ensure `waitTaskState` is cleared between iterations (#1767)
 - fix(pipeline_template): Resave all pipelines on template update (#1766)
 - chore(dependencies): Bump spinnaker-dependencies to 0.120.1 (#1765)
 - fix(front50): Don't try to run dependent pipelines that are disabled
 - fix(trafficguards): adds retry logic to validateClusterStatus (#1759)
 - feat(artifacts): Resolve expectedArtifact by ids in trigger. (#1763)
 - feat(orca) Place produced artifacts in stage output (#1441)
 - fix(canary-v2): Avoid naming collision between mine/kayenta tasks. (#1761)
 - Revert "fix(deploy): avoid crossing the streams in parallelized deploys"
 - fix(front50): Keep front50 optional (#1760)
 - chore(canary-v2): Update to new json-based initiate canary entrypoint. (#1756)
 - fix(titus): Tag titus server groups with previous image metadata (#1758)
 - fix(context): stop looking for properties in trigger until we can figure out what is going on
 - feat(core): Wait for manifest stable task (#1755)
 - fix(triggers): ensure canceling pipeline sends ExecutionComplete event (#1753)
 - fix(fastproperties): Processing expressions in property override (#1754)
 - fix(mahe): check property structure on cleanup (#1752)
 - fix(moniker): hotfix canary deploy stages
 - fix(security): Prevent webhook users from spoofing authed user
 - fix(canary): fix cleanup of unhealthy canaries with multiple clusters (#1749)
 - fix(mahe): send correct query to determine if fast property exists (#1747)
 - fix(expressions): stop stripping null context values
 - fix(deploy): avoid crossing the streams in parallelized deploys
 - fix(mahe): fix property extraction on cleanup (#1743)

### front50 - v1.117.0
 - fix(intent): lowercasing name (#289)
 - fix(keel): changing controller to upstart (#288)
 - fix(s3): don't create sqs and sns topics when eventing is disabled (#287)

### deck - v2.1149.0
 - chore(amazon): bump package to 0.0.47
 - chore(core): bump package to 0.0.94
 - fix(canary): Fix moniker for baseline/canary clusters
 - fix(core): Fix unhandled rejection on auth recheck (#4335)
 - fix(core): replace word-break CSS with overflow-wrap (#4334)
 - fix(core): Fix groups from breaking executions view (#4336)
 - chore(core): Remove console.log statement. (#4333)
 - chore(core): remove happypack in favor of thread-loader/cache-loader (#4330)
 - fix(core): Stop grouping groups with only one stage (#4332)
 - chore(amazon): bump package to 0.0.46 (#4331)
 - fix(amazon): do not set useSourceCapacity on clones (#4329)
 - feat(trigger/pubsub): Suggest subscriptions from echo configuration. (#4328)
 - chore(core): bump package to 0.0.93 (#4326)
 - fix(core): handle spel expressions in map editors (#4325)
 - refactor(*): More execution details refactoring (#4324)
 - fix(core/executions): tweak padding on details tabs, status glyph (#4323)
 - fix(core): Fix webpackJsonp not being defined for local dev (#4322)
 - fix(core): Fix lint (#4321)
 - chore(core): bump package to 0.0.92
 - feat(core/modal): Silence all rejection warning in console when ui-bootstrap modals are closed/cancelled.
 - fix(core): Fix wait stage task time updating (#4320)
 - fix(core): handle running execution fetch failure (#4319)
 - chore(amazon): bump to 0.0.45 (#4317)
 - chore(core): Bump core to 0.0.91 (#4316)
 - refactor(*): Remove duplicate execution details templates (#4314)
 - fix(core/pipeline): Show errors in time window stage execution details (#4315)
 - chore(core): bump package to 0.0.90 (#4313)
 - chore(amazon): bump package to 0.0.44 (#4312)
 - feat(core): add detail filter to cluster/lb/sg views (#4311)
 - bugfix(aws): don't show copy capacity options for clone dialog either (#4310)
 - feat(rrb): Allow for specifying pipelines to run before disable (#4308)
 - fix(core): Navigate to the first stage if passed in stage does not exist (#4309)
 - feat(provider/kubernetes): Enable annotations, labels and secrets for security groups (aka ingress resources) (#2000) (#4235)
 - fix(core/amazon): don't show copy capacity options for create server group (#4301)
 - refactor(*): Consistent bracket spacing (#4307)
 - refactor(core/delivery): Convert waitExecutionDetails to react (#4297)
 - fix(core): Fix lint (#4306)
 - fix(core/loadBalancer): Actually check for all the changes to props (#4305)
 - refactor(*): Fix all the postcss-color warnings except the hard one (#4304)
 - fix(amazon/loadBalancer): Modify shouldComponentUpdate to allow for more specific updates (#4303)
 - fix(core/loadBalancer): Modify shouldComponentUpdate to allow for more specific updates (#4302)
 - feat(amazon): Add load balancer dns name to target group details (#4300)
 - fix(provider/gce): Render namedPorts in svg details, not listeningPort. (#4299)
 - fix(core/amazon): fix application name on server group command (#4298)
 - refactor(core/delivery): Convert stageFailureMessage to react (#4296)
 - chore(amazon): bump package to 0.0.42 (#4293)
 - chore(core): bump package to 0.0.88 (#4295)
 - chore(core/amazon): make moniker changes library-friendly (#4294)
 - chore(core): bump package to 0.0.87 (#4292)
 - refactor(core/delivery): Convert ExecutionDetails to react (#4282)
 - feat(provider/amazon): Rollback support for PREVIOUS_IMAGE strategy (#4291)
 - feat(provider/kubernetes): Enable setting of labels on k8s Service objects spinnaker/spinnaker#2035 (#4287)
 - fix(core): render reason as HTML in tasks view (#4290)
 - feat(provider/gae): Specify artifact in GAE deploy from GCS. (#4280)
 - fix(azure): retain `this` binding in azure cache initializer (#4289)
 - chore(appengine): remove edit load balancer feature flag (#4285)
 - feat(entitytags): Show replaced server group details in popover (#4284)
 - chore(package): update uirouter libs to latest (#4283)
 - fix(provider/openstack): load balancer network and sg creation bugfixes (#4281)
 - feat(provider/kubernetes): v2 resize modal (#4279)
 - chore(core): bump package to 0.0.86 (#4277)
 - feat(moniker) - adding monikers to load balancers (#4278)
 - fix(core): Fix configure pipeline links when details is open (#4276)
 - fix(core): catch exceptions on server group source when pipeline 404s (#4275)
 - refactor(core): Convert executionDetailsSectionNav, executionStepDetails, statusGlyph to react (#4273)
 - feat(moniker) - adding monikers to the deploy stage (#4268)
 - fix(appengine): remove unused import (#4272)
 - fix(appengine): allow non-default accounts in deploy dialogue (#4270)
 - fix(artifact): s/ul/ol (#4271)
 - feat(artifact): Custom artifact helpers (#4267)
 - chore(core): Remove unused components (#4269)
 - chore(core): Bump module to 0.0.85 (#4265)
 - feat(artifacts): Simplify expected artifacts (#4266)
 - fix(core): Fix rendering executions that have JSON in the parameters (#4264)
 - fix(pipelines): add validator to webhook stage "method" field (#4263)
 - refactor(core): Convert executions to react (#4260)
 - chore(amazon): bump package to 0.0.41 (#4262)
 - refactor(aws): make transformScalingPolicy method public (#4261)
 - chore(core): bump package to 0.0.84 (#4259)
 - feat(provider/kubernetes): V2 server group details (#4258)
 - fix(core/datasource): Possibly unhandled rejection: undefined (#4257)
 - refactore(core): Convert ExecutionStatus to react (#4254)
 - fix(amazon/securityGroup): Fix lint warning (#4255)
 - fix(kubernetes): fix template loading (#4256)
 - refactor(core/search): Remove client-side fetch of servergroups in favor of culling missing entities on the server
 - feat(search): add server groups to clusters
 - fix(provider/gce): Fix credential account handling in svg wizard. (#4252)
 - chore(core): bump package to 0.0.83 (#4251)
 - fix(core): catch dismiss of confirmation/cancel modals (#4250)
 - refactor(core): convert create pipeline to react (#4248)
 - chore(halconfig): enable versioned providers (#4247)
 - fix(pipelines): guard against missing info on deploy stage (#4246)
 - chore(amazon): bump package to 0.0.40 (#4245)
 - chore(core): bump package to 0.0.81 (#4244)
 - fix(core): catch modal dismiss (#4242)
 - feat(amazon): clarify naming/description on create load balancer/security group (#4241)
 - chore(core): Remove some old files and convert a test to ts (#4243)
 - feat(core): Version server group transformer delegate (#4237)
 - feat(pipelines): use textarea for expression entry (#4240)
 - chore(core): bump package to 0.0.80 (#4239)
 - fix(network): include backoff, max number of retries in network recovery (#4238)
 - chore(core): bump package to 0.0.79 (#4236)
 - fix(core/http): retry http calls failing due to network issues (#4234)
 - feat(provider/kubernetes): V2 server group transformer (#4232)
 - fix(core/modal): avoid throwing errors on modal $dismiss (#4233)
 - chore(amazon): bump package to 0.0.39 (#4231)
 - chore(core): bump package to 0.0.78 (#4230)
 - fix(provider/kubernetes): Adds correct cloudprovider field (#4229)
 - feat(provider/kubernetes): Create manifest (#4228)

### gate - v4.10.0
 - feat(pipeline_template): Support pipeline templates with dynamic sources (#471)
 - chore(canary-v2): Do not return bare strings. (#477)

### rosco - v0.102.0
 - fix(rosco) Fix aws enhanced_networking backwards incompatibilities (#227)
 - Revert "fix(rosco) Make pause_before configurable, maintaining current default (#224)" (#226)
 - fix(rosco) Make pause_before configurable, maintaining current default (#224)
 - fix(rosco) Make baked artifacts adhere to the proposed standard (#222)

### clouddriver - v1.707.0
 - feat(provider/aws): Enable optional AWS Shield protection on ELB & ALBs (#2089)
 - feat(provider/kubernetes): V2 enable minimal clusters (#2090)
 - feat(provider/kubernetes): v2 cache namespaces & relationship (#2087)
 - fix(provider/gce):Enable RPS when only RATE or UTILIZATION (#2083)
 - feat(provider/ecs): ECS Cache base classes (#2065)
 - feat(provider/kubernetes): allow users to skip creating pull secrets (#2088)
 - fix(core): Handle potentially null `.instances` when target/LARGEST (#2086)
 - perf(provider/gce): Replace L7 health check and backend service get() with list(). (#2073)
 - feat(provider/kubernetes): v2 ingress support (#2085)
 - feat(provider/kubernetes): check controller type for disable/enable operation (#2068)
 - fix(provider/gce): Distinguish instance id from gceId. (#2084)
 - fix(provider/amazon): Commentary on when includePartialInstances = false (#2081)
 - fix(provider/kubernetes): use location over namespace in op (#2082)
 - fix(cats/dynomite): Don't hash ttl'd keys (#2080)
 - chore(provider/kubernetes): improve v2 cache logging (#2079)
 - chore(gradle): Avoid running tests on master/release branch (#2078)
 - fix(cats/redis): Don't hash ttl'd keys (#2076)
 - fix(provider/amazon): Include partial instances iff includeDetails = false (#2077)
 - fix(provider/amazon): Only include non-terminating instances (#2075)
 - feat(provider/kubernetes): v2 statefulset support (#2074)
 - fix(provider/kubernetes): Dedup kind map (#2072)
 - fix(provider/openstack): Fix type error in LoadBalancerSummary (#2071)
 - feat(provider/kubernetes): register deployment caching agent (#2070)
 - feat(provider/kubernetes): v2 register pod handler (#2069)
 - feat(provider/kubernetes): automatically configure caching agents (#2067)
 - feat(provider/ecs): ECS Account Credentials (#2034)
 - feat(cats): Add keyspaces support to dynomite backend (#2042)
 - fix(config): SpringApplicationBuilder().showBanner() does not exists in Spring Boot 1.4.1.RELEASE (#2018)
 - fix(provider/kubernetes): allow cache data to be serailized/deserialized (#2052)
 - fix(provider/gce): Update L7 delete for UHCs. (#2066)
 - perf(cluster): Optimize target/LARGEST lookups (#2064)
 - fix(amazon/alb): Reorder/refactor alb upsert to handle updating port and protocol (#2062)
 - fix(gce/defaults): instanceType vs. instance-type (#2061)
 - fix(provider/google): Cache and propagate GCE numeric instance id. (#2058)
 - refactor(artifacts): artifact config lives under artifacts (#2059)
 - fix(aws): Flagging elb security group autocreation (defaults to off)
 - feat(cats): dynomite version bump to stable (#2056)
 - fix(provider/gce): Fix NPE if no legacy health checks. (#2057)
 - fix(amazon/alb): Fix rule comparison so listeners do not get updated when they are the same (#2047)
 - fix(javadoc): Load balancer provider typo (#2054)
 - feat(provider/kubernetes): instance provider (#2053)
 - fix(provider/kubernetes): v2 expire logical keys (#2051)
 - feat(provider/kubernetes): v2 load balancer provider (#2050)
 - Create README.md (#2043)
 - fix(amazon): do not copy location-specific policy actions cross-account (#2046)
 - Closed #2072 - Implement GoogleExecutorTraits and wired in spectator. (#2049)
 - fix(provider/gce): Fix GCE destroy backend calls on LB cache misses. (#2048)
 - feat(provider/google): Support UHCs in L7 load balancers. (#2030)
 - feat(provider/kubernetes): depend on kubectl where possible (#2041)
 - fix(provider/kubernetes): allow to configure uwith service account. (#2044)
 - fix(provider/kubernetes): collectJob status ClassCastException (#2029)
 - fix(provider/aws): No-op ami tag update when no tags provided (#2045)
 - fix(startup): Kubernetes manifest provider autowired ambig bean (#2040)
 - feat(provider/kubernetes): moniker status (#2039)
 - refactor(provider/kubernetes): ignore api versions (#2038)
 - fix(appengine): remove batch calls, revert client library (#2037)
 - feat(provider/kubernetes): support delete and update strategies operaâ€¦ (#2021)
 - chore(dependencies): Bump spinnaker-dependencies version and pin google (#2036)
 - feat(provider/kubernetes): v2 manifest provider (#2033)
 - fix(provider/kubernetes): fixes ClassCastException on resize operations (#2024)
 - feat(core): Manifest provider (#2032)
 - feat(provider/kubernetes): use kubectl to handle deploy apply (#2031)
 - fix(eureka): fix instanceId on eureka caching
 - fix(provider/gce): Paginate instance template list in svg caching. (#2027)

### fiat - v0.33.0
 - fix(UserRoleSyncer) add config timeout to agent polling (#203)
