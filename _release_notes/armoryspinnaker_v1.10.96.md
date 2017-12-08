---
layout: post
title: v1.10.98 Armory Enterprise Spinnaker
order: TODO
---

# 12/08/17 Release Notes

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback).

## Highlighted Updates
### Armory Enterprise Spinnaker

### deck-armory - dd17801
- ENG-1016: Make apiPrefix a configurable setting (#87)


<br><br><br>
## Detailed Updates
### Armory Enterprise Spinnaker
### deck-armory - dd17801
 - ENG-1016: Make apiPrefix a configurable setting (#87)

### packager - 8413c7a
 - unpin igor (#229)
 - ENG-1015 wait for the version to exist in bintray before continuing (#228)

###  Spinnaker Community Contributions
### orca - v4.12.2
 - fix(expressions): process notification content (#1842)
 - fix(expressions): Fixing NPE on deployedServerGroups (#1845)
 - feat(loadBalancer): Pass loadBalancerType to force cache refresh (#1841)
 - feat(expressions): deployed server groups helper functions & misc fixes (#1840)
 - fix(mdc): `executionId` was not propagated across threads in a few spots (#1839)
 - fix(pipeline_parsing) Protect against NPEs with trigger params. (#1838)
 - feat(pipelinetemplate): Support inheritance of expectedArtifacts. (#1835)
 - feat(pipeline_template) Allow partials to be injected from template configuration. (#1798)
 - fix(job): retry on call to clouddriver for job status (#1834)

### echo - v1.153.0
 - feat(slack): allow more compact slack notifications (#209)
 - Adding ability for custom webhook triggers to pass parameters. (#207)
 - chore(systemd_logs): Remove unneeded log redirection. (#206)

### igor - v1.82.3
 - fix(docker): Making the redis key correct (#206)
 - fix(discovery): Removing spring cyclic health indicator deps (#205)
 - fix(discovery): Fixing cyclic dependency issue on startup when discovery client avail (#204)
 - feat(web): RedisClientDelegate for Dynomite support (#203)
 - fix(lookback): add times together correctly (#202)
 - fix(buildevents): lookback window checks end time, improved logs (#201)
 - chore(systemd_logs): Remove unneeded log redirection. (#200)
 - feat(authz): Add ability to specify Google service account credential or raw OAuth bearer token to Jenkins master request (#188)
 - feat(xenial_builds): Added systemd config for igor. (#199)
 - fix(jenkins): adding retry for gitDetails (#196)

### clouddriver - v1.744.0
 - fix(provider/gce): Tolerate null instance template lists. (#2216)
 - feat(provider/kubernetes): support envFrom (#2213)
 - fix(core/search): Fix search query which matches non-conforming cache keys (#2209)
