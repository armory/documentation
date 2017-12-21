---
layout: post
title: v1.10.143 Armory Enterprise Spinnaker
order: 956
---

# 12/21/17 Release Notes


> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback).

## Highlighted Updates

Enjoy the Happy Holidays with these changes to Armory Spinnaker!

If you're using Kubernetes, and you've been a good boy or girl this season,
you'll enjoy the expanded support for Kubernetes!  Armory and Google have
been working together on Kubernetes v2 support in the open source packages,
and this version pulls in more of that work for our customers to enjoy.

If you're not a Kubernetes user, there are still plenty of stocking
stuffers in this release.  Take a look below to see all the features and
fixes we've wrapped up for you this Yule!

### Armory Enterprise Spinnaker

### Packager - b3fa281

 - adding api prefix (#231)

###  Spinnaker Community Contributions
### Orca  - v5.5.1

 - feat(core): Support for rolling back a cluster (across multiple regions) (#1866)
 - feat(pipelinetemplate): Support inheritance of expectedArtifacts. (#1835)
 - feat(pipeline_template) Allow partials to be injected from template configuration. (#1798)

### Echo  - v1.541.0

 - feat(slack): allow more compact slack notifications (#209)

### Front50  - v1.120.0

 - feat(xenial_builds): Added systemd service configuration for Front50. (#292)

### Gate  - v4.14.0

 - feat(artifacts): artifact credentials endpoints (#489)

### Igor  - v1.84.0

 - feat(gitlab): Add Gitlab SCM integration (spinnaker/spinnaker#2047) (#197)
 - feat(authz): Add ability to specify Google service account credential or raw OAuth bearer token to Jenkins master request (#188)
 - feat(xenial_builds): Added systemd config for igor. (#199)

### Clouddriver  - v1.750.1

 - feat(artifacts): Download artifacts from GitHub (#2231)
 - feat(provider/kubernetes): deploy from artifact (#2223)
 - feat(aws/loadBalancer): Support on demand caching for target groups (#2214)



<br><br><br>
## Detailed Updates
### Armory Enterprise Spinnaker

### Packager - b3fa281
 - Support 242 packer config (#238)
 - turn on webhook artifacts (#237)
 - giving restart a bigger sleep (#234)
 - Move the check for deb package being available (#233)
 - adding api prefix (#231)
 - add cloudstack to resolved env (#230)

###  Spinnaker Community Contributions
### Orca  - v5.5.1
 - fix(runJob): retry fetching property files from CI if not found (#1836)
 - feat(amazon): Ensure that server groups are unpinned when a deploy fails (#1877)
 - fix(queue): really cancel queued pipelines that were canceled (#1872)
 - feat(executionWindow): optional random wait when entering window (#1856)
 - fix(core): Generate the correct lock key (#1874)
 - feat(core): Support for rolling back a cluster (across multiple regions) (#1866)
 - fix(queue): Simplifying gauge code (#1871)
 - feat(manifests): promote manifests in separate stage (#1868)
 - feat(artifacts): find artifact from pipeline execution (#1869)
 - fix(queue): Register dynamically created gauges (#1867)
 - fix(provider/kubernetes): correctly handle ops on many manifests (#1863)
 - fix(travis): Dont generate html reports in travis anymore (#1865)
 - feat(queue): Active executions monitoring (#1855)
 - fix(pipeline_templates): Allow modules to be directly used on stage configs (#1864)
 - feat(queue): stage execution montioring (#1854)
 - refactor(core): Removing jesque (#1861)
 - fix(expressions): fix cast where parentExecution assumed to be Map
 - fix(mpt): allow default values to be templated from other variables (#1857)
 - fix(expressions): ensure parentExecution is an execution not a map
 - fix(core): Fix leaky pipeline expression evaluator test (#1858)
 - fix(manifests): s/name/manifestName (#1852)
 - feat(core): AFTER_STAGE stages can now be planned post task completion (#1843)
 - fix(canary): canary cluster AMI should come from prior stage
 - fix(pipeline_template) Do not throw IllegalTemplateConfigurationException if empty inject object is passed with pipeline stage configuration (#1850)
 - fix(pipeline_template): Fix markdown processing as invalid YAML alias (#1848)
 - Revert "fix(moniker): fix cluster if detail is set to empty via SpEL #1832" (#1849)
 - Remove global context with legacy support for expressions
 - fix(expressions): Fixing spel in notifications (#1847)
 - fix(aws/loadBalancer): Pass the load balancer type properly (#1846)
 - fix(expressions): process notification content (#1842)
 - fix(expressions): Fixing NPE on deployedServerGroups (#1845)
 - feat(loadBalancer): Pass loadBalancerType to force cache refresh (#1841)
 - feat(expressions): deployed server groups helper functions & misc fixes (#1840)
 - fix(mdc): `executionId` was not propagated across threads in a few spots (#1839)
 - fix(pipeline_parsing) Protect against NPEs with trigger params. (#1838)
 - feat(pipelinetemplate): Support inheritance of expectedArtifacts. (#1835)
 - feat(pipeline_template) Allow partials to be injected from template configuration. (#1798)
 - fix(job): retry on call to clouddriver for job status (#1834)

### Echo  - v1.541.0
 - fix(artifacts): Git artifacts should be added to the pipeline when triggering (#217)
 - fix(artifacts/github): Correctly pull github artifact out of echo event (#216)
 - fix(webhooks) Webhook trigger events should be treated as immutable. (#212)
 - fix(webhooks): fix disabled webhook startup (#215)
 - feature(OrcaService) add extra query params to getLatestPipelineExecutions (#208)
 - feat(github): adds artifact extractor (#210)
 - fix(webhooks): Ensure only matching-source triggers are used (#211)
 - feat(slack): allow more compact slack notifications (#209)
 - Adding ability for custom webhook triggers to pass parameters. (#207)
 - chore(systemd_logs): Remove unneeded log redirection. (#206)

### Front50  - v1.120.0
 - fix(s3): ensure sqs queue names are valid
 - chore(systemd_logs): Remove unneeded log redirection (#296)
 - chore(dependencies): latest spinnaker-dependencies and gradle 3.5
 - fix(pipelineTemplates): throw exception when not supported (#294)
 - feat(xenial_builds): Added systemd service configuration for Front50. (#292)
 - fix(azure): AzureStorageService should throw exception if object not found (#291)
 - fix(intent, pipeline_template): controllers conditional on storage backend (#290)
 - fix(intent): lowercasing name (#289)
 - fix(keel): changing controller to upstart (#288)
 - fix(s3): don't create sqs and sns topics when eventing is disabled (#287)

### Gate  - v4.14.0
 - chore(dependencies): update gradle/boot/spinnaker-dependencies
 - feat(artifacts): artifact credentials endpoints (#489)
 - fix(oauth2): Ensure we use 'Bearer' instead of 'bearer' when forwarding auth token (#486)

### Igor  - v1.84.0
 - feat(gitlab): Add Gitlab SCM integration (spinnaker/spinnaker#2047) (#197)
 - Revert "refactor(cache): Replace usage of redis keys command with scan (#208)" (#210)
 - feat(travis/commit_info): Add commit timestamp to build info (#191)
 - refactor(core): Reduce code duplication in polling monitors (#209)
 - refactor(cache): Replace usage of redis keys command with scan (#208)
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

### Clouddriver  - v1.750.1
 - fix(provider/aws): Avoid being marked unhealthy after initialization (#2245)
 - feat(provider/gcp): Add ability for default app creds to impersonate â€¦ (#2240)
 - feat(artifacts): Download artifacts from GitHub (#2231)
 - chore(dependencies): bump spinnaker-dependencies to 0.131.0 (#2242)
 - fix(provider/kubernetes): disable v1 controller caching (#2239)
 - feat(provider/kubernetes): v2 make rollback dynamic (#2237)
 - feat(provider/kubernetes): return deployed manifests (#2235)
 - fix(appengine): remove batch calls, revert client library (#2221)
 - feat(provider/kubernetes): ds & ss stability conditions (#2238)
 - fix(dockerRegistry): handle 400 for token refresh (#2215)
 - feat(provider/kubernetes): return modified manifests (#2234)
 - fix(core): Create the 'RetrySupport' bean (#2233)
 - fix(entitytags): Retry support when fetching entity tags from Front50 (#2232)
 - bug(provider/openstack) - filter images by region if provided. (#2230)
 - fix(provider/amazon): ignore description when upserting security group rules (#2229)
 - fix(registry): Handle situations where tag creation date cannot be fetched (#2228)
 - fix(provider/aws): block device configs for h1.* and i3.* (#2227)
 - fix(provider/amazon): correctly propagate ipv6 ingress security group rules on upsert (#2225)
 - fix(provider/appengine): fix monikers for app engine server groups (#2224)
 - feat(provider/kubernetes): deploy from artifact (#2223)
 - fix(provider/kubernetes):Server Group is disable in Daemonset when replic set to 0 (#2206)
 - fix(provider/kubernetes): s/name/manifestName (#2222)
 - feat(provider/kubernetes): init containers (#2219)
 - feat(provider/appengine): allow gcloud version to be configurable (#2217)
 - fix(provider/amazon): render IPv6 ingress security group rules (#2212)
 - chore(dependencies): Bump spinnaker-dependencies version. (#2220)
 - feat(artifacts): sets up artifact module (#2218)
 - refactor(provider/kubernetes): refactor delete pods operation (#2210)
 - feat(aws/loadBalancer): Support on demand caching for target groups (#2214)
 - fix(provider/gce): Tolerate null instance template lists. (#2216)
 - feat(provider/kubernetes): support envFrom (#2213)
 - fix(core/search): Fix search query which matches non-conforming cache keys (#2209)


