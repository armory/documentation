---
layout: post
title: v1.10.207 Armory Enterprise Spinnaker
order: TODO
---

# 01/12/18 Release Notes


> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback).

## Highlighted Updates
### Armory Enterprise Spinnaker

Some clusters tasks (e.g. scale down) may take a long time to complete. You can now ADJUST IT!  
Set `orca-local.yml` with `tasks.waitForClusterTimeout` with your own value in ms.


###  Spinnaker Community Contributions
### Orca  - v5.9.1
 - feat(tasks) - adds configuration property to waitForCluster timeouts ([PR-1889](https://github.com/spinnaker/orca/pull/1889))




<br><br><br>
## Detailed Updates
### Armory Enterprise Spinnaker
### Lighthouse&trade; - 8addc87
 - only delete the file if the file exists (#134)
 - blacklist files that are in armoryspinnaker (#133)
 - add env/armory.env to upload blacklist (#131)

### Packager - 581f8d0
 - add comments on where to find examples (#257)
 - add compose/*-secrets.yml sourcing (#258)
 - allow bin/secrets to add to (#256)


###  Spinnaker Community Contributions
### Orca  - v5.9.1
 - feat(tasks) - adds configuration property to waitForCluster timeouts
 - feat(kubernetes): Evaluate spel in remote manifests (#1888)
 - feat(provider/ecs): Added EcsImageFinder (#1886)
 - feat(provider/ecs): Added EcsServerGroupCreator (#1885)
 - feat(spel): Add stageExists helper function. (#1884)
 - fix(provider/kubernetes): promote context as well as output (#1883)
 - feat(provider/kubernetes): deploy both optional & required artifacts (#1882)
 - feat(templates): Allow null valued jinja variables. (#1881)
 - feat(provider/kubernetes): find deployed artifacts from context (#1879)
 - fix(canary-v2): Use new /canary/{executionId} entry point. (#1880)

### Echo  - v1.542.0
 - fix(pubsub): Add attribute constraints to triggers. (#218)

### Deck  - v2.1168.0
 - feat(provider/google): Clarify help messages for pubsub fields. (#4613)
 - feat(deck/settings): Default to searchVersion: 1 (#4621)
 - fix(amazon): Default `copySourceCustomBlockDeviceMappings` to false (#4620)
 - Update ui-route visualizer to 5.1.2
 - style(amazon/azure/cloudfoundry/core/dcos/google/kubernetes/openstack/oracle): Added new spinners per designs (#4611)
 - feat(provider/kubernetes): pick artifacts to deploy (#4595)
 - fix(provider/kubernetes): fix runjob trigger image (#4618)
 - style(core): Pods CSS bug fix + addition of bold variants to type (#4608)
 - fix(all): change deprecated babel preset es2015 to preset-env (#4606)
 - feat(kubernetes): deployed yaml in pipeline (#4591)
 - fix(core): keep restrict execution checkbox checked if its set (#4605)
 - fix(core/reactShims): Add catch block to reactShims state.go() calls
 - fix(core/pipeline) Check to see if .stage.restrictedExecutionWindow exists (#4616)
 - fix(core/pipeline): Fix execution graph of groups when MPT partial contains only one stage (#4615)
 - Fixes issue where jquery-ui was not correctly loaded by webpack (#4614)
 - fix(core): add cluster level tags to server groups (#4612)
 - Set custom parameters using the UI (#4596)
 - style(provider/google): Fix react-style dropdown z-index in Instance Type configurer (#4610)

### Gate  - v4.17.1
 - fix(pipelines): allow utf-8 characters in pipeline fields (#495)
 - feat(provider/ecs): Added role controller + service (#497)
 - feat(provider/ecs): Added ECS cluster controller + service (#499)
 - feat(authz): support migrating clouddriver account authz config to permissions (#494)
 - fix(canary-v2): Canary results entrypoint no longer requires canary config id. (#493)

### Igor  - v1.87.4
 - fix(jenkins): include retrySupport bean (#216)
 - fix(jenkins): add retrySupport to getProperties call (#215)
 - fix(travis/triggers): Keep track of builds in flight. (#214)
 - refactor(travis/cache): Remove migration to cache with ttl set (#213)
 - feat(gitlab-ci): Implement triggering of Spinnaker pipelines by Gitlab CI pipelines (#211)

### Clouddriver  - v1.755.0
 - feat(provider/ecs): ECS Target Group cache client and tests. (#2265)
 - feat(provider/ecs): ECS Loadbalancer cache client and tests. (#2264)
 - Added TaskHealthCaching - Agent/Client/Tests. (#2260)
 - Added EcsCloudMetricAlarmCaching - Agent/Client/Tests. (#2263)
 - fix(provider/kubernetes): v2 Set default namespace dynamically (#2279)
 - fix(jobs): Fix bottleneck around JobLocalExecutor.startJob (#2280)
 - feat(provider/kubernetes): only redeploy versioned artifacts on changes (#2278)
 - fix(provider/kubernetes): annotate artifacts with reference (#2277)
 - fix(provider/kubernetes): Fixed statefulset and daemonset volumesource bugs. (#2276)
 - fix(provider/docker): update bearer_token to access_token (#2274)
 - feat(provider/kubernetes): split out required & optional artifacts (#2273)
 - fix(provider/kubernetes): Replace artifact only if target found (#2259)
 - feat(authz): requiredGroupMemberships to permissions migration (#2272)
 - feat(provider/kubernetes): fail deploy if artifacts don't bind (#2271)
 - feat(provider/kubernetes): return resource create time (#2269)
 - feat(provider/kubernetes): v2 ignore caching flag (#2268)
 - chore(provider/kubernetes): log malformed cache entries (#2262)
 - fix(provider/kubernetes): allow empty serviceName in statefulset (#2261)
 - fix(provider/aws): block device config for missing instance types (#2266)
 - bug(provider/openstack) - allow for binding to multiple loadbalancers with the same port mappings. (#2257)
