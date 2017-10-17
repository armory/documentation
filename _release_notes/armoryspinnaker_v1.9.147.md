---
layout: post
title: v1.9.147 Armory Enterprise Spinnaker
order: 980
---

# 10/17/17 Release Notes


## Highlighted Updates
### Armory Enterprise Spinnaker
Some summary what got released in this release.
For each of the subservices, pick out notable updates from Verbose updates and add them below.

### lighthouse - ff1b1e7

### barometer - 1c8ac5c

### deck-armory - a5ae983


###  Spinnaker Community Contributions
### orca - v3.28.1

### echo - v1.147.1

### front50 - v1.115.0

### gate - v4.8.0

### clouddriver - v1.689.0




<br><br><br>
## Detailed Updates
### Armory Enterprise Spinnaker
### lighthouse - ff1b1e7
 - Change log level of http errors from old orca status endpoint.
 - Disable error logging for the first WARMUP seconds.
 - Cleanups.
 - increase timeouts for healthchecks for gate (#103)
 - healthcheck should be on root (#99)
 - Do not allow user to edit `settings.js`
 - Don't trigger armoryspinnaker, watch will be done upstream
 - Eng 633 build properties (#98)
 - Change our shutdown method to support new Orca. (#97)

### barometer - 1c8ac5c
 - Now that build is cleaned up, try to fix the archive step
 - Pull out the armoryspinnaker rebuild, testing out another method
 - Archive just the build properties
 - Write out a build.properties and archive, build armoryspinnaker instead (#92)

### deck-armory - a5ae983
 - Updating dashboard to c88dc51 in version.manifest
 - Change name of load test stage (#39)
 - Add back job params for loadtest stage.
 - ENG-685: Load Test stage (copied from Jenkins) (#37)
 - Updating dashboard to cac56a0 in version.manifest
 - Updating dashboard to 3545cfa in version.manifest
 - angular now requires module name instead of module
 - copied src/settings.js from OSS
 - copy from OSS, keeping armory canary
 - oss removed colors.less, instead moving to variables
 - copied canaryScore style from oss version
 - Updating dashboard to 4e8240e in version.manifest
 - updating deck version


###  Spinnaker Community Contributions
### orca - v3.28.1
 - fix(dryrun): need injected property class to support list of values
 - feat(rrb): Support for running a pipeline between scale up and disable (#1694)
 - feat(artifacts): Check if default artifact was intended (#1701)
 - core(manifest): Delete manifest op (#1700)
 - chore(imports): remove unused frigga import
 - feat(moniker): use moniker over frigga in ScaleToClusterResize
 - feat(core): Force cache refresh manifest task (#1687)
 - feat(artifacts): simplify artifact matching (#1696)
 - fix(pipeline_template): Do not treat markdown lists as YAML alias (#1645)
 - fix(log) ensure MDC cleanup occurs in correct thread (#1698)
 - feat(moniker): Use monikers within server-group tasks (#1693)
 - feat(moniker): Use moniker for instance check task (#1689)
 - feat(stages): make FAILED_CONTINUE bubble up from synthetic stages
 - fix(log): ensure executionId is cleaned up from MDC (#1685)
 - feat(pipeline_template): PipelineIdTag checks context for variables defining application and name (#1688)
 - fix(pipeline_template): Fixing regression in test harness (#1686)
 - Oort get server groups (#1680)
 - fix(rrb): RRB should determine resize percentages at runtime (#1681)
 - add executionId to MDC (#1682)
 - feat(qa): dry run pipelines
 - fix(queue): don't keep pushing dead messages indefinitely
 - feat(moniker): Allow moniker field to pass through to StageData and TargetServerGroups (#1678)
 - fix(pipeline_template): Propagate nested render errors (#1679)
 - feat(get_commits): Display SCM changes in pipeline-triggered pipelines (#1652)
 - feat(pipeline_template): Add marker support to disable rendered value expansion (#1665)
 - fix(queue): treat waiting pipelines queue as FIFO if keepWaitingPipelines (#1677)

### echo - v1.147.1
 - fix(pipelinetriggers): Add retry on network & http errors (#177)
 - refactor(pubsub): Simpler artifact matching (#179)
 - refactor(pubsub): Use more idiomatic name in config (#178)
 - feat(dryrun) capability for triggering dry run executions in prestaging
 - feat(artifact): Replace 'Artifact' with 'ExpectedArtifact' in triggers. (#175)
 - fix(pubsub): s/artifacts/receivedArtifacts/ in Pipelines. (#174)
 - fix(pubsub): s/pubsubType/pubsubSystem/ (#173)

### front50 - v1.115.0
 - feat(log): annotations for json logging (#282)

### gate - v4.8.0
 - feat(pipeline_template): Expose skipPlanDependents flag on update op (#468)
 - feat(v2-canary): canary result endpoints (#466)

### clouddriver - v1.689.0
 - feat(cats): Adding cache gzip compression (#2000)
 - feat(provider/kuberentes): implement capacity (#2004)
 - feat(provider/kubernetes): Supply app name in attributes (#2003)
 - fix(appengine): fix deploy failures (#2001)
 - feat(provider/dcos): Adding proxy for marathon-client to make use of spectator. (#1960)
 - feat(provider/kubernetes): v2 delete operation (#1999)
 - fix(provider/kubernetes): reads correct fields from cache refresh (#1998)
 - fix hidden exception while pulling docker tags (#1708)
 - chore(dependencies): Bump spinnaker-dependencies to 0.115.0. (#1996)
 - fix(provider/gae): Set path correct when application root non-empty. (#1970)
 - feat(logging) compile logstashEncoder for json logging (#1995)
 - feat(provider/kubernetes): Re-encode api types (#1991)
 - fix(aws): Enable stale key evictions for amazon load balancers (#1994)
 - feat(provider/aws): add executionId to user-agent for cloudtrail (#1992)
 - feat(provider/kubernetes): v2 on-demand manifest caching (#1988)
 - fix(aws): Do not do stale key evictions of amazon load balancers (#1993)
 - fix(core): Support the eviction of stale cache key identifiers (#1985)
 - refactor(provider/kubernetes): use deployed names in result (#1989)
 - feat(provider/gce): Replace instanceTemplate get with list call. (#1990)
 - fix(provider/kubernetes): Fix v2 operation converter (#1987)
 - feat(provider/kubernetes): V2 instance state (#1986)
 - feat(provider/kubernetes): Support resize operations (#1981)
 - feat(core/search): Improve search speed: faster validation that search keys exists (#1984)
 - feat(provider/amazon): Create app elb specific security group for new ELBs (#1982)
 - refactor(provider/google): Rely on cached instance details instead of calling platform MIG.listInstances() api. (#1983)
 - feat(dynomite): hashtags & dynomite pipelines (#1832)
 - feat(provider/kubernetes): Support resize statefulset operation. (#1976)
 - refactor(provider/kubernetes): Move ops w/ kind into v1 only (#1980)
 - refactor(provider/kubernetes): Move manifest desc. into package (#1979)
 - feat(provider/kuberentes): Register kind mapping using autowired deploy (#1978)
 - feat(provider/kubernetes): v2 instance counts (#1975)
 - feat(moniker): Add getServerGroup endpoint that does not require application name. (#1967)
 - fix(provider/aws): Allow updating healthy threshold count on target groups (#1977)
 - feat(provider/kubernetes): V2 cluster provider finishing touches (#1974)
 - chore(provider/docker): Only log trailing whitespace warning during failure (#1973)
 - fix(provider/aws): fix issue with VPCZoneIdentifier containing deleted subnets (#1972)
 - feat(provider/kuberentes): Application provider (#1971)
 - fix(provider/kubernetes): Don't store-unowned artifacts (#1969)
 - feat(provider/kubernetes): Feature-flag debug mode (#1968)
 - feat(provider/gae): Modify deploy description and validators for artifacts. (#1966)
 - refactor(provider/kubernetes): V2 deploy 1 manifest at a time (#1965)
 - fix(provider/aws): Return load balancers for all target groups associated with an application (#1955)
 - fix(provider/kubernetes): v1 client call to list pods (#1963)
 - chore(provider/kubernetes): Bump client to 1.0.0-beta1 (#1961)
 - feat(appengine): Add AppengineStorageController to list accounts (#1957)
 - feat(core): Add provider version to creds controller (#1958)
 - fix(provider/dcos): fix cluster provider to guard against errors from invalid ids (#1928)
 - fix(provider/kubernetes): Fixed an issue with jobProvider failing out other providers. (#1690)
 - feat(search): cull missing ASGs before returning (#1951)
