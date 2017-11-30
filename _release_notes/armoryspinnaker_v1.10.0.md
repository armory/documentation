---
layout: post
title: v1.10.0 Armory Enterprise Spinnaker
order: 958
---

# 11/28/17 Release Notes

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback).

## Highlighted Updates

#### Notable Changes That Introduce Risk To Upgrade
* Orca 4.0.0 introduced model changes that might break currently executing pipelines.  

### Armory Enterprise Spinnaker

### barometer - f12a2f8
- Barometer now supports New Relic as a data provider

### deck-armory - bc8c9c9
- add openstack as a module (#77)

###  Spinnaker Community Contributions
### orca - v4.4.2
- refactor(model): Unify execution subtypes
- fix(queue): custom de/serializer so we can migrate queue values slowly

### gate - v4.12.0
- feat(pipelines): validate required parameters are supplied on pipeline trigger (#479)

### clouddriver - v1.734.0
- feat(provider/ecs): ECS Service caching classes and tests. (#2144)
- feat(provider/ecs): ECS Service caching classes and tests. (#2144)
- bug(provider/openstack) - Display VIP for LBs that do not have Floating IP instead of null.. (#2170)
- fix(provider/kubernetes): v1 add docker registries in all cases (#2176)
- Use setApiKey when using token from service account (#2178)
- feat(provider/ecs): ECS Task Definition caching classes and tests. (#2145)
- refactor(provider/kubernetes): allow api version subclassing (#2167)
- ECS Container Instance caching classes and tests. (#2143)
- feat(provider/kubernetes): v2 support daemonset (#2161)
- feat(provider/kubernetes): v2 support secrets (#2159)
- feat(provider/kubernetes): v2 configmap support (#2157)
- fix(provider/kubernetes): v2 fix cred validation (#2129)
- feat(provider/kuberentes): v2 non-enum k8s kinds (#2125)
- feat(provider/kubernetes): v2 search endpoint (#2108)
- feat(provider/kubernetes): v2 pod logs (#2099)
- feat(provider/kuberentes): v2 security group provider (#2097)
- feat(provider/kubernetes): v2 server group manager (#2093)
- feat(provider/amazon): block device config for c5 instance types (#2092)

### fiat - v0.35.0
- Back off on 500's or 403 rate limits. (#205)

<br><br><br>
## Detailed Updates
### Armory Enterprise Spinnaker

### lighthouse - 9b639e1
 - adding secrets to whitelist (#126)

### barometer - f12a2f8
 - Handle case where deviation is not config'd
 - Query nr infra metrics (#131)
 - Change 'datadogQuery' to 'query' in resultset
 - Refactor the metricsHistory endpoints
 - Support NewRelic metricHistory calls
 - Jump through hoops to get stacktrace into the log.
 - Add some messaging to the result struct (#127)
 - This should catch and report Retrofit fails (#126)
 - Use the newrelicAppName config value if set
 - Request smaller periods from NewRelic
 - Workaround for the standard deviation bug.
 - Fix outdated tests.
 - Initial stab at iterating over all metrics
 - Fix null pointer exception.
 - Use metric tags to select the timeslice field we want to use.
 - Make NewRelic code actually get called.
 - Handle default metricsProvider (null) case.
 - Actually use the New Relic code when configured.
 - Add sample metrics payload.
 - Return real data, add endpoint to query possible metrics.
 - Add a test, cleanup/fix getApplicationid()
 - compareCanaryMetrics uses List<hostid> rather than asg name
 - Expose more NR client endpoints.
 - feat(newrelic) - new relic scaffold for the service

### deck-armory - bc8c9c9
 - Set the build's version.json before packing (#85)
 - add instructions on how to pin (#84)
 - don't ignore deck_module.versions (#83)
 - added missing features from oss vs armoryspinnaker (#82)
 - Support metricHistory call for NewRelic (#81)
 - NewRelic UI changes (#80)
 - load webpacked settings.js with defered js loading (#79)
 - add openstack (#77)
 - Add New Relic App Name field for config (#73)
 - allow angular to templateCache to run before the registering module (#74)
 - Revert "Rework how settings.js is handled." (#72)
 - Rework how settings.js is handled.
 - don't import module if its featured off (#71)
 - Properly default metricsProvider to Datadog. (#70)
 - Move metricsProvider into canaryConfig scope (#68)
 - :candy: enable 'new version of spinnaker' checker (#67)
 - cleanup unused jenkins param (#66)
 - armoryspinnaker expect lowercase deck_armory_version (#65)
 - jenkins: remove updating armoryspinnaker (#64)
 - feat(refactor) Convert deck-armory to be an extension instead (#59)

###  Spinnaker Community Contributions
### orca - v4.4.2
 - fix(timeouts): prevent stageTimeoutMs ending up in outputs/global
 - fix(alerts): fix formatting of log message for global context alert
 - chore(dependencies): bump JUnit
 - chore(dependencies): bump Kotlin to 1.1.60
 - fix(trafficguards): debug logging when no enabled asgs found (#1814)
 - feat(canary-v2): Add region attributes to kayenta stage. (#1813)
 - fix(moniker): Use the correct moniker when applying source server group (#1805)
 - fix(kubernetes/rollback) Pass cloudProvider to tasks so it doesn't default to aws (#1810)
 - feat(manifest): more robust status handling (#1809)
 - feat(pagerduty): Automatically append 'from' to the details map (#1808)
 - chore(core): Use `RetrySupport` from `kork-exceptions` (#1807)
 - feat(provider/kuberntes): pause/resume rollout (#1806)
 - chore(dependencies): dependency updates
 - feat(provider/kubernetes): scale manifest (#1803)
 - feat(provider/kubernetes): undo rollout stage (#1802)
 - fix(pagerduty): Fix paging by keys only (#1801)
 - fix(mort): Flippy-floppy equalsIgnoreCase to avoid NPE (#1800)
 - feat(pagerduty): Support multiple applications and keys directly (#1797)
 - feat(clouddriver/aws): Allow finding SG vpc IDs by name (#1784)
 - fix(notifications): send correct notification type on pipeline events (#1795)
 - fix(triggers): typo in previous fix
 - fix(tags): stop dumb failures in cleaning up astrid tags
 - chore(dependencies): simpler defaulting of execution type
 - chore(dependencies): upgrade Spring and Jackson
 - fix(pipeline trigger): fix error when parsing parent pipeline with no type
 - fix(): fix startup failure if pipeline templates are not enabled (#1792)
 - fix(metrics): derive executionType tag from type not class name
 - fix(core): Support wait before scaling down in red/black (#1789)
 - chore(logging): shut up spammy logs in integration tests
 - fix(queue): custom de/serializer so we can migrate queue values slowly
 - fix(core): s/orchestrationLauncher/executionLauncher (#1787)
 - fix(web): Reverting needless method sig refactor from #1718 (#1786)
 - refactor(model): Unify execution subtypes
 - fix(netflix): do not send property value when looking up existing property (#1785)
 - feat(pipeline_template): Render configuration for templated pipelines with dynamic source (#1718)
 - fix(mpt): don't NPE on stages without a when (#1783)

### echo - v1.150.3
 - feat(pagerduty): Support passing in details map (#196)
 - feat(pagerduty): Support details field and add error handling/reporting (#195)
 - feat(pubsub): Trigger pipeline matches on expectedArtifact IDs. (#194)

### front50 - v1.116.0
 - fix(intent): lowercasing name (#289)
 - fix(keel): changing controller to upstart (#288)
 - fix(s3): don't create sqs and sns topics when eventing is disabled (#287)

### gate - v4.12.0
 - feat(core/serverGroups): Get a list of servergroups by name (#480)
 - feat(pipelines): validate required parameters are supplied on pipeline trigger (#479)
 - feat(core): server group manager controller (#478)
 - fix(authN): Handle case of missing port(s) in post authN redirect. (#467)
 - chore(swagger): Add webhooks endpoint to swagger docs (#410)

### igor - v1.80.0
 - feat(jenkins): Adding a configurable lookBack window, off by default (#198)
 - perf(travis) fetch list of jobs a lot faster (#195)

### clouddriver - v1.734.0
 - fix(provider/aws): Retry createAutoScalingGroup() / updateAutoScalingGroup() (#2185)
 - feat(provider/aws): Support expected capacity constraint when resizing (#2179)
 - feat(provider/ecs): ECS Service caching classes and tests. (#2144)
 - feat(xenial_debians): Add systemd service configuration. (#2182)
 - feat(provider/kubernetes): replace deployed configmap volumes (#2183)
 - fix(provider/aws): Reservation caching agent, now with less RxJava (#2180)
 - fix(provider/kubernetes): don't throw on invalid lb op (#2184)
 - bug(provider/openstack) - Display VIP for LBs that do not have Floating IP instead of null.. (#2170)
 - fix(provider/kubernetes): v1 add docker registries in all cases (#2176)
 - Use setApiKey when using token from service account (#2178)
 - feat(cats): Support for selectively enabling agents (#2177)
 - refactor(entitytags): Support for alerts/notices on any entity type (#2175)
 - feat(provider/ecs): ECS Task Definition caching classes and tests. (#2145)
 - fix(web): Do not throw exception when sg not found (#2172)
 - chore(jobs): turn down log-level (#2171)
 - refactor(provider/kubernetes): allow api version subclassing (#2167)
 - feat(provider/kubernetes): load artifacts alongside manifest (#2166)
 - chore(dependencies): Bump to 0.123.0 (#2169)
 - bug(provider/openstack) - LoadBalancer security groups are optional. (#2154)
 - refactor(cf): Stop building CF provider until maintainer is found (#1942)
 - feat(provider/kubernetes): runJob logs (#2164)
 - fix(provider/aws): Remove invalid `spinnaker:` tags (#2168)
 - ECS Container Instance caching classes and tests. (#2143)
 - fix(provider/aws): Should use edda to lookup target groups by name (#2165)
 - fix(provider/gce): Break out labels. (#2163)
 - fix(provider/gce): Tolerate failed backend service getHealth() calls. (#2153)
 - feat(provider/kubernetes): v2 support daemonset (#2161)
 - feat(provider/kubernetes): v1 pod logs (#2162)
 - feat(provider/kubernetes): register docker image replacers (#2160)
 - feat(provider/kubernetes): v2 support secrets (#2159)
 - feat(provider/kuberentes): send deployed artifact to orca (#2158)
 - feat(provider/kubernetes): v2 configmap support (#2157)
 - feat(provider/kubernetes): default to frigga (#2156)
 - feat(provider/kubernetes): more robust status (#2152)
 - feat(provider/google): Label instances so they can easily be grouped later. (#2142)
 - fix(provider/aws): Fix updating ALB listeners (#2148)
 - fix(elasticsearch): Force refresh when fetching entity tags from Front50 (#2149)
 - refactor(provider/openstack): Updated openstack4j to 3.1.0 and removed components that are available upstream (#2103)
 - feat(provider/kubernetes): allow OAuth token authentication (#2147)
 - fix(kubectl): --to-revision (#2140)
 - fix(provider/kubernetes): fix security group loading by name (#2134)
 - Added tests for Keys. Changed separator. (#2101)
 - fix(provider/dcos): Use createApp instead of updateApp for deploy (#2136)
 - fix(provider/gce): Tolerate named port values as Doubles. (#2137)
 - feat(entitytags): Support indexing / searching by application (#2132)
 - feat(provider/kubernetes): runJob multi-container (#2135)
 - fix(provider/kubernetes): switch access modifiers for KubernetesKind constructors (#2128)
 - fix(provider/kubernetes): attach correct op decorators (#2130)
 - fix(provider/kubernetes): autowire correct objectmapper (#2133)
 - fix(perf): Avoid manually copying bytes between streams (#2127)
 - fix(provider/kubernetes): v2 fix cred validation (#2129)
 - feat(provider/kubernetes): resume rollout (#2126)
 - feat(provider/kubernetes): search result hydrators (#2124)
 - feat(provider/kuberentes): v2 non-enum k8s kinds (#2125)
 - feat(provider/kuberentes): pause rollout (#2120)
 - fix(provider/kubernetes): read namespace as region (#2123)
 - fix(docker): Use wget instead of curl (#2122)
 - feat(provider/kubernetes): k8s only search provider (#2121)
 - feat(provider/kubernetes): scale manifest (#2119)
 - feat(provider/kubernetes): v2 rollback (undo rollout) (#2118)
 - perf(provider/gce): s/get/list/ in TCP/SSL LB caching agents. (#2117)
 - fix(provider/gce): Fix TCP LB disabled state calculation. (#2116)
 - feat(core/search): Add parameter for fetching a batch of servergroups by name (#2114)
 - feat(provider/kubernetes): reenable kube monitoring (#2115)
 - feat(provider/kubernetes): remove dependency on api-client (#2113)
 - perf(provider/gce): s/get/list/ in ILB caching agent. (#2112)
 - fix(provider/kubernetes): fix application key parsing (#2109)
 - fix(provider/gce): Handle partially-formed L7 LB resources properly. (#2111)
 - feat(provider/kubernetes): Add kubectl to Dockerfile. (#2104)
 - feat(provider/kubernetes): Allow op to override versioning (#2110)
 - feat(provider/kubernetes): v2 search endpoint (#2108)
 - feat(provider/kubernetes): split out k8s providers (#2107)
 - fix(provider/amazon): Do not delete listeners after updating them. Pretty bad idea. (#2105)
 - fix(provider/kubernetes): docker is not a hard-dependency (#2106)
 - feat(kubernetes/artifacts): Support deploying images dynamically (#2102)
 - fix(provider/kubernetes): security group yaml (#2100)
 - feat(provider/kubernetes): v2 pod logs (#2099)
 - feat(provider/kuberentes): v2 security group provider (#2097)
 - feat(provider/ecs): ECS Cluster caching classes and tests. (#2091)
 - fix(provider/kubernetes): fix v2 instance lookup (#2098)
 - feat(provider/amazon): Optionally tag server groups w/ app/stack/details (#2096)
 - feat(provider/kubernetes): v2 server group manager (#2093)
 - feat(provider/kubernetes): cache network policies (#2095)
 - fix(provider/gce): Ensure referenced instances exist during L4 delete. (#2094)
 - feat(provider/amazon): block device config for c5 instance types (#2092)

### fiat - v0.35.0
 - fix(spring): fix autowiring issue
 - chore(dependencies): update to latest spinnaker-dependencies, spinnaker-gradle-plugin, gradle 3.5
 - Back off on 500's or 403 rate limits. (#205)
 - fix(build): fix fiat-web to build normal jar
