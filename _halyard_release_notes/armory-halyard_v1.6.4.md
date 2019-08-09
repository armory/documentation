---
layout: post
title: v1.6.4 Armory Halyard (OSS 1.20)
order: -201908091114156
---

# 07/16/2019 Release Notes
{:.no_toc}

## Full Version
1.6.4-rc318 (OSS 1.22.0-6315b3f-stable291 build 326)

## Highlights

This release: 
* Brings Halyard Armory in line with OSS Halyard 1.22
* Enables logging on all HA Clouddriver services


## Known Issues

- None

## Halyard Armory Enterprise Spinnaker
 - fix(logging): add logback to all clouddriver HA profiles (#246) 
 - chore(release): pin 1_6_x to a later commit (#243)
 - fix(installer): Avoid changing existing customer UUID on hal armory init (#241)
 - feat(aws): upgrade awscli (#240)

##  Halyard Community Contributions
 - chore(dependencies): Autobump korkVersion (#1383)
 - feat(secret): decrypt secrets before sending to deck (#1379)
 - fix(core): Fix reading of external files as binary instead of text (#1380)
 - chore(dependencies): Autobump korkVersion (#1375)
 - fix(config): parse 'oauthScopes' stanzas that were incorrectly written (#1376)
 - feat(core): Support external configuration using Spring Cloud Config (#1368)
 - fix(deploy/deck): Port conflict in ports.conf (#1372)
 - chore(dependencies): Autobump korkVersion (#1371)
 - feat:(provider/Kubernetes) Add ability to set deployment strategy for service settings (#1370)
 - chore(dependencies): Autobump korkVersion (#1369)
 - feat(kubernetes): add opt-in livenessProbe with configurable initialD… (#1367)
 - chore(dependencies): Autobump korkVersion (#1366)
 - chore(dependencies): Autobump korkVersion (#1359)
 - fix(canary/google): Take into account presence or absence of bucket property when determining supported types for each account. (#1363)
 - fix(kubernetes): Fix readiness probe (#1360)
 - chore(dependencies): Autobump korkVersion (#1352)
 - fix(core): Re-enable resolvedEnv endpoint (#1356)
 - fix(cf): Strict validation of CF account appsManager and metrics URLs format (#1337)
 - fix(config/validation): Moved strict account name validation to docker only (#1354)
 - fix(shutdown): Replace String with StringBodyRequest (#1353)
 - fix(deps): upgrade fabric8 to 4.1.1 in response to okhttp upgrade to address connection leaks (#1350)
 - chore(dependencies): Autobump korkVersion (#1349)
 - chore(docs): Automatically linkify urls when generating commands.md. (#1348)
 - chore(dependencies): Autobump korkVersion (#1347)
 - chore(dependencies): Autobump korkVersion (#1345)
 - chore(docs): Update links throughout halyard. (#1346)
