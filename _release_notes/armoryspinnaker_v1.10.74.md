---
layout: post
title: v1.10.74 Armory Enterprise Spinnaker
order: 957
---

# 12/05/17 Release Notes


> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback).

## Highlighted Updates

This release requires updates to your IAM policy.  You can always find the latest policy [here.](http://docs.armory.io/install-guide/adding_accounts/#assume-roles-in-iam)
The 2 new policies required are:

 - elasticloadbalancing:DeleteRule
 - elasticloadbalancing:ModifyListener

### Armory Enterprise Spinnaker

###  Spinnaker Community Contributions
### orca - v4.8.1
- feat(pipeline_template) Add strategyId tag to render ids by application and strategy name (#1833)
- feat(provider/kubernetes): deploy from artifact (#1831)

### echo - v1.152.0
- feat(): Adding a basic keel template (#204)

### gate - v4.13.0
 - feat(x509) Allow x509 and LDAP to be used together (#476)

## Detailed Updates
### Armory Enterprise Spinnaker
### deck-armory - f4f1cc6
 - we need version.json in both places
 - version.json gets read in at webpack stage (#86)

### packager - 4607490
 - pinning igor due to exception (#226)
 - Try setting the flag to limit concurrency in the top block
 - Properties in the node was killing other things.
 - This should be the right syntax for our style of build
 - Pin redis version, 4.0.5 doesn't have support for AMD (#225)
 - Unpinning clouddriver
 - Unpinning orca, default value fix has been merged
 - Explicit publish for deb and rpm with sync wait. (#224)
 - pinngin orca to 4.50 due to errors in new version (#223)
 - Pinning clouddriver due to policy changes
 - Adding the login and password fields for JIRA (#222)
 - add echo extension (#220)


###  Spinnaker Community Contributions
### orca - v4.8.1
 - fix(moniker): fix cluster if detail is set to empty via SpEL (#1832)
 - feat(pipeline_template) Add strategyId tag to render ids by application and strategy name (#1833)
 - feat(provider/kubernetes): deploy from artifact (#1831)
 - fix(expressions): expressions can reference prior stage outputs (#1828)
 - chore(mahe): remove mahe (#1830)
 - fix(fastproperties): correct separation of context and output values in FP stage
 - feat(artifacts): support 'use prior execution' (#1827)
 - chore(systemd_logs): Remove unneeded log redirection. (#1825)
 - fix(core): Missing closing brace (#1826)
 - Make WaitForClusterDisableTask configurable in yml (#1824)
 - feat(provider/kubernetes): insert artifacts during deploy (#1823)
 - fix(templates): Tolerate all thrown failures on execution lookup. (#1822)
 - chore(dependencies): bump Kotlin to 1.2
 - fix(fastproperties): prevent FP stuff getting written to global context
 - chore(dependencies): bump Mockito and Hamkrest
 - refactor(expressions): Remove v1 SPEL code (#1817)
 - chore(dependencies): update to latest spinnaker-dependencies version
 - Xenial builds (#1819)

### echo - v1.152.0
 - feat(): Adding a basic keel template (#204)
 - feat(pubsub): support constraints (#202)
 - fix(pubsub): Use message IDs instead of payload hash. (#201)
 - Xenial build (#200)
 - feat(slack): Support slack incoming webhooks (#199)
 - feat(webhooks): Support artifacts (#197)
 - feat(local_debian): Add echo systemd service config. (#198)

### gate - v4.13.0
 - feat(x509) Allow x509 and LDAP to be used together (#476)
 - feat(v2-canary): canary result endpoint, metric set list pair endpoint, refactoring (#482)
 - chore(systemd_logs): Remove unneeded log redirection. (#485)
 - feat(xenial_builds): Add systemd configuration for Gate. (#483)
 - feat(manifest): get manifest controller (#481)

### clouddriver - v1.742.0
 - chore(dependencies): update to 0.128.0 (#2208)
 - fix(provider/dcos) Catch the correct exception for the proxy. (#2207)
 - fix(amazon/loadBalancers): Be smarter about updating ALB listeners (#2203)
 - fix(provider/kubernetes): registry init fix (#2205)
 - refactor(clouddriver-core) Fixed to use const value (#2186)
 - feat(provider/ecs): ECS IAM Role caching classes and tests. (#2150)
 - chore(systemd_logs): Cleanup unneeded logging in systemd config. (#2202)
 - feat(provider/gce): Support for RMIG zone selection. (#2201)
 - chore(logging): remove extra logging (#2200)
 - fix(provider/kubernetes): fix envvar source (#2199)
 - fix(provider/aws): s/contraints/constraints (#2198)
 - refactor(kubernetes): change OAuth token configuration (#2196)
 - fix(build): fix spring-boot plugin usage
 - fix(cats): fix conditional instantiation of EurekaNodeStatusProvider
 - feat(provider/ecs): ECS Task caching classes and tests. (#2146)
 - chore(warnings): fix compiler warnings
 - fix(core): fix bean mismatch due to Spring update
 - fix(google): Retry on all 5xx errors from the platform. (#2193)
 - fix(provider/kubernetes): fix registry init 2 (#2191)
 - chore(dependencies): update to latest spinnaker-dependencies
 - fix(provider/kubernetes): fix onDemand cache update in controller agent. (#2131)
 - Xenial builds (#2189)
 - feat(provider/kubernetes): v2 support labels on delete & scale (#2190)
 - fix(provider/kubernetes): fix registry init (#2188)
 - feat(provider/kubernetes): cache controller revisions (#2138)

### fiat - v0.36.0
 - chore(dependencies): update to latest spinnaker-dependencies
 - chore(systemd_logs): Remove unneeded log redirection. (#209)
 - feat(xenial_builds): Added systemd service configuration for fiat. (#208)
