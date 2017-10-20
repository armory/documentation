---
layout: post
title: v1.9.202 Armory Enterprise Spinnaker
order: 970
---

# 10/20/17 Release Notes


## Highlighted Updates
### Armory Enterprise Spinnaker
Some summary what got released in this release.
For each of the subservices, pick out notable updates from Verbose updates and add them below.

### lighthouse
 - Fixes to terminate disabled instances due to endpoint changes in orca. (#109)

### barometer
- Generate basic statistics on the selected data points so that user can see standard deviation

### deck-armory
- add historical statistic in the deck UI for Barometer users

### packager
 - adding 8085 as an open port in Docker compose for Gate API usage (#177)

###  Spinnaker Community Contributions
### orca - v3.34.2
- feat(queue): update delivery time on runtask (#1676)
- feat(logging): ops controller annotation + logstashEncoder dep (#1692)

### gate - v4.9.0
- feat(pipeline_template): Convert pipeline config to pipeline template (#457)

### clouddriver - v1.690.1
- feat(provider/kubernetes): V2 Cache services (#2009)

<br><br><br>
## Detailed Updates
### Armory Enterprise Spinnaker
### lighthouse
 - remove env/default.env because its in user-data (#111)
 - Fixes to terminate disabled instances. (#109)
 - Remove old orca status call.
 - Fix logic so we don't throw KeyError too soon.
 - Add X-Spinnaker-User to terminate request. (#101)

### barometer
 - Fix streaming, return a MetricHistory model object.
 - Generate basic statistics on the selected data points.
 - Avoid Spring Boot desire to drop anything past final '.' in URL path
 - checkpoint
 - Add parameter processing. (#96)
 - Simplify response body. (#95)
 - Add /metricHistory dummy endpoint. (#94)

### deck-armory
 - add historical lookback hours to ui
 - Remove the files that would update this repo automatically
 - handle barometer errors
 - add tags to query for historical metrics
 - Send deck and deck-armory version to update subservices at the same time (#45)
 - match spinnaker styles (#43)
 - Revert "roll-deck-forward"
 - roll-deck-forward
 - set deviations to historical values button wired up
 - mock to query for historical std deviation

### gate-armory
 - adding a refactored proxy

### packager
 - Updating deck to 2.1142.0 and deck-armory to 5d96d63 in version.legacy
 - Updating deck to 2.1142.0 and deck-armory to 508ce13 in version.legacy
 - Updating deck to 2.1142.0 and deck-armory to 55ae2d8 in version.legacy
 - Remove old crufty jira stage (#178)
 - Updating deck to 2.1142.0 and deck-armory to 21db765 in version.legacy
 - Eng 725 jira integration (#174)
 - Change enhanced_networking to ena_support (Packer update requirement) (#176)
 - Updating deck to 2.1142.0 and deck-armory to 089374b in version.legacy
 - Make the update subservices work only for deck and deck-armory (#175)
 - Updating deck to 2.1142.0 in version.manifest
 - Updating deck_armory to 90162c6 in version.manifest
 - Updating deck to 2.1145.0 in version.manifest
 - Updating deck_armory to 7b220df in version.manifest
 - Updating deck_armory to 47c266d in version.manifest
 - Updating deck_armory to 1999b11 in version.manifest
 - adding baseurl for barometer so we can use it in gate (#173)
 - adding lighthouse to the list of services (#172)


###  Spinnaker Community Contributions
### orca - v3.34.2
 - fix(dryrun): let Echo remove the pipelineConfigId
 - fix(rollback): Propagate `interestingHealthProviderNames` (#1723)
 - fix(canary): gentle canary cleanup (#1711)
 - fix(executionWindow): revert to polling (#1722)
 - fix(runJob): retry fetching property files if not found (#1721)
 - feat(rollback): Support rolling back to a server group that no longer exists (#1716)
 - fix(dryrun): remove pipeline config it for dry runs
 - feat(core): implement noop stage (#1719)
 - fix(fastproperties): always clean up properties marked for rollback (#1717)
 - fix(propertyFiles): change wording of error message to indicate that there might be a syntax error in the file (#1715)
 - fix(dryrun): send dry run notification correctly
 - fix(polling): update time left calculation (#1713)
 - fix(gae): Support new ExpectedArtifact in GAE deploy. (#1706)
 - fix(entitytags): Do not fetch previous server group for Titus (#1712)
 - feat(entitytags): Include previous server group image details (#1705)
 - feat(polling): remove polling for wait, manual judgement, and execution window (#1661)
 - Properly cast Moniker from context
 - fix(dryrun): log dry run activity
 - feat(logging): ops controller annotation + logstashEncoder dep (#1692)
 - feat(queue): update delivery time on runtask (#1676)
 - chore(dependencies): updating spinnaker-depenencies (#1707)
 - feat(moniker): Use moniker for Job stages. (#1699)
 - Use moniker in DetermineHealthProvidersTask (#1702)

### echo - v1.147.5
 - fix(dryrun) remove id when dry running a pipeline
 - fix(dryrun) better error handling in dry run handler
 - feat(dryrun) fix dry run config
 - feat(dryrun) fix bean registration
 - chore(kork): Bump spin-deps to upgrade kork (#180)

### gate - v4.9.0
 - feat(pipeline_template): Convert pipeline config to pipeline template (#457)
 - fix(logging) StructuredArgument consistency (#469)

### igor - v1.76.0
 - fix(travis/triggerBuild) Use request id given by travis for queue id. (#190)
 - chore(web): Selectively applying structured logs (#180)

### rosco - v0.100.0
 - chore(packer): Update the packer version (#223)

### clouddriver - v1.690.1
 - fix(aws): Fix NPE in elb group autocreation (#2020)
 - perf(cluster): Avoid prematurely fetching full server groups (#2019)
 - fix(provider/kubernetes): allows dots in secretNames (#2017)
 - feat(provider/kubernetes): Enable setting of labels on k8s Service objects spinnaker/spinnaker#2035 (#2014)
 - fix(provider/gae): Delete gcs target directory in deploy. (#2015)
 - refactor(aws): Simplified ELB security group autocreation (#1997)
 - feat(provider/kubernetes): load balancer -> sg relationship (#2013)
 - feat(provider/kubernetes): cache non-obvious relationship (#2012)
 - fix(cats): Remove use of unmodifiable collections (#2011)
 - fix(cats): Get bytes in consistent chatset during decompress (#2010)
 - fix(web): Fixing missing property exception (#2008)
 - feat(provider/kubernetes): V2 Cache services (#2009)
 - feat(provider/kubernetes): Show more in the error message (#2007)
 - feat(provider/kubernetes): Update deployable's patch behavior (#2006)
