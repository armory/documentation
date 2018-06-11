---
layout: post
title: v1.9.280 Armory Enterprise Spinnaker
order: 960
---

# 11/02/17 Release Notes
{:.no_toc}
> Note: If you're experiencing production issues after upgrading Spinnaker rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback)

> Note: This release requires an update to your IAM access policy.  You can alway find the [latest policy in our  documentation](http://docs.armory.io/install-guide/adding_accounts/#assume-roles-in-iam).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Highlighted Updates
### Armory Enterprise Spinnaker
- New features for SLA monitoring of applications
- Fix for certified pipelines

### lighthouse - 17afad7
- Initial implementation SLA computation.

### barometer - ebebe12
- Upate CanaryConfig to include newmetric flag and metrics.

### deck-armory - c863768
- Require at least one LB be defined for SLA

###  Spinnaker Community Contributions
### orca - v3.35.1
- feat(manualJudgment): allow standard notification types for manual judgment (#1739)

### echo - v1.150.1
- fix(email): handle link/executionId replacement in custom email body (#193)
- feat(hipchat/email): allow custom messages for hipchat/email notifications (#192)
- feat(slack): allow ad-hoc message publishing via Slack (#189)
- feat(pubsub): Adds endpoint to surface configured pubsub subscriptions. (#187)


### front50 - v1.116.0
- fix(pipeline_template): Default scope to none (#286)
- feat(keel): adding basic storage of intents (#285)

### gate - v4.9.2
 - fix(web): NPE when no scopes provided (#475)
 - feat(echo/pubsub): Expose endpoint to query subscriptions. (#472)

### igor - v1.78.0
- feat(travis): New caching strategy for builds (#194)
- feat(travis) configurable number of repositories to track on each poll (#193)

### clouddriver - v1.691.0
- feat(provider/aws): Support specifying explicit subnet ids for deploy (#2026)
- fix(aws): Only autocreate app elb security group on Create (#2025)
- feat(provider/kubernetes): Enable annotations, labels and secrets for security groups (aka ingress resources) (#2000) (#2005)

### fiat - v0.32.0
 - Add backoff and rety to GCP directory listings. (#202)
 - fix(authz/github): Default cache TTL (#201)
 - fix(authz/github): Add cache to team membership check to prevent excessive http requests (#200)

<br><br><br>
## Detailed Updates
### Armory Enterprise Spinnaker
### lighthouse - 17afad7
 - Add blocking_timeout
 - Change redis locking, put TTL on it "just in case". (#122)
 - Use Redis to cache metrics per LB/metric pair
 - Don't query to compute SLA *unless* LB defined
 - Put back error logging if current pipeline config query fails.
 - log both to instance and stdout.
 - Jsonrequests does auth, simplify /v1/pipelines & termination.
 - Attempt to resolve the X-Spinnaker-User issue.
 - If present, pass along the X-Spinnaker-User header for auth.
 - Initial implementation SLA computation.

### barometer - ebebe12
 - Upate CanaryConfig to include newmetric flag and metrics.
 - Copy/edits on the test files.
 - Remove timeboard related stuff.
 - Remove timeboards.
 - Clone datadog & rename.
 - Add some docs about time bucket size based on the query window.
 - Use aggregation functions with canaries.
 - Compute recommended deviation value.
 - Filter historic data by tags. (#99)
 - Return status 400 if no data for metric. (#98)

### deck-armory - c863768
 - Take out debug console.log that got missed.
 - Require at least one LB be defined for SLA
 - Change out the account config for LB list config
 - Eng 704 config sla (#53)
 - Fix Error about implicit type.
 - Use the actual gateUrl.
 - pass aggregation to historical analysis
 - use recomendedHistoricalMultiplier instead of deviation

###  Spinnaker Community Contributions
### orca - v3.35.1
 - fix(mahe): do not clean up properties that have been updated (#1741)
 - fix(dryrun): ignore additional context field
 - feat(manualJudgment): allow standard notification types for manual judgment (#1739)
 - feat(moniker): Use moniker for app name over frigga in flex (#1736)
 - feat(moniker): Pass moniker to cleanup stages. (#1732)
 - feat(moniker): Use moniker for Rollingpush tasks. (#1703)
 - Attempt to use moniker before frigga (#1697)
 - fix(exec window): leave shared state alone (#1737)
 - fix(manual judgment): switching back to polling to respect timeout overrides (#1735)
 - fix(dryrun): try to cope with values that are sometimes floats or ints
 - fix(tasks): stop using 'shared' task state (#1731)
 - fix(rrb): Only inject pipeline stage if applicaton + pipelineId present (#1729)
 - fix(dryrun): strip nested nulls when comparing context
 - fix(logging): updating timeout message w/ timeout value (#1728)
 - fix(cancel): cancel during wait stage (#1726)
 - fix(dryrun): ignore certain keys in context

### echo - v1.150.1
 - fix(email): handle link/executionId replacement in custom email body (#193)
 - feat(hipchat/email): allow custom messages for hipchat/email notifications (#192)
 - chore(artifacts): Add regex test (#181)
 - fix(logging) slf4j for retrofit (#191)
 - feat(pubsub): Support firing triggers from configured subscriptions. (#190)
 - feat(slack): allow ad-hoc message publishing via Slack (#189)
 - feat(dryrun) replace default notifications with custom
 - feat(pubsub): Adds endpoint to surface configured pubsub subscriptions. (#187)

### front50 - v1.116.0
 - fix(pipeline_template): Default scope to none (#286)
 - feat(keel): adding basic storage of intents (#285)
 - fix(logging) StructuredArgument consistency (#283)

### gate - v4.9.2
 - fix(web): NPE when no scopes provided (#475)
 - feat(v2-canary): add application query param to config list endpoint (#474)
 - fix(pipeline_template): Default no scopes for pipeline templates (#473)
 - feat(echo/pubsub): Expose endpoint to query subscriptions. (#472)
 - feat(gae): Adds endpoint to surfact GAE storage accounts. (#470)

### igor - v1.78.0
 - feat(travis): New caching strategy for builds (#194)
 - feat(travis) configurable number of repositories to track on each poll (#193)
 - chore(dependencies): upgrade spinnaker-dependencies to 0.117.0 (#192)

### clouddriver - v1.691.0
 - feat(provider/aws): Support specifying explicit subnet ids for deploy (#2026)
 - fix(aws): Only autocreate app elb security group on Create (#2025)
 - fix(provider/gce): Fix broken deploys with namedPorts. (#2023)
 - fix(cats): Remove unmodifiable collections from modifiable codepaths (#2022)
 - feat(google): Instrument individual google API calls. (#2016)
 - feat(provider/kubernetes): Enable annotations, labels and secrets for security groups (aka ingress resources) (#2000) (#2005)

### fiat - v0.32.0
 - Add backoff and rety to GCP directory listings. (#202)
 - fix(authz/github): Default cache TTL (#201)
 - fix(authz/github): Add cache to team membership check to prevent excessive http requests (#200)
