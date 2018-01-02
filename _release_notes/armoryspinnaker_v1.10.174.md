---
layout: post
title: v1.10.174 Armory Enterprise Spinnaker
order: 955
---

# 01/02/18 Release Notes
> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback).

## Highlighted Updates
### Armory Enterprise Spinnaker

> Note: The old account permissions properties for Fiat has been deprecated.  Please review [the new account permissions properties.](http://docs.armory.io/install-guide/authz/#account-access)

### Packager - 188d2a0
 - Don't start automatically with upstart, should be done as part of cloud-init (#253)

###  Spinnaker Community Contributions
### Orca  - v5.6.1
- bug(provider/openstack) - look up images by region for Openstack deploys. (#1876)

### Deck  - v2.1166.0
- fix(provider/openstack): Fix region select field to have the correct region selected (#4597)

### Gate  - v4.15.0
- feat(auth) - Adds the ability to restrict github authentication to only users (#490)

### Clouddriver  - v1.753.2
- fix(provider/aws): handle spotPrice == in rollingpush (#2251)

## Detailed Updates
### Armory Enterprise Spinnaker
### Lighthouse&trade; - 1ae2175
 - New endpoint /v1/configs_with_perms
 - Check to see if we get a null version back, error out if so
 - ENG-1098, ENG-1100: Expanded white/blacklists for configurator

### Packager - 188d2a0
 - Force removal of container after pulling profiles/scripts from rosco (#254)
 - Don't start automatically with upstart (#253)
 - Include the spinnaker opt dir env setting
 - Make consistent with the startup (#252)
 - Pull in -local.yml files in compose dir automatically (#251)
 - armory.env comes from the package (#250)
 - automatic polling and nonpolling profiles (#249)
 - always run these scripts because they're going to exist (#248)
 - create cloudstack.env if it doesn't exist (#245)
 - added bin/secrets stub (#247)
 - use SPINNAKER_ENV which is referenced in docker compose (#246)
 - add secrets to active spring profiles (#244)
 - add armory.env to resolved.env (#242)
 - add extra whitespace to resolved.env to fix user env errors (#241)
 - name the lighthouse container that pulls v2 configs (#240)


###  Spinnaker Community Contributions
### Orca  - v5.6.1
 - Add configurable timeout to wait for upserted image tag task (#1870)
 - bug(provider/openstack) - look up images by region for Openstack deploys. (#1876)
 - chore(clouddriver): InstanceCheckTasks add currentInstanceCount to context (#1875)
 - feat(provider/appengine): Allow app engine deploy with container image URL (#1878)

### Deck  - v2.1166.0
 - fix(provider/openstack): Fix region select field to have the correct region selected (#4597)
 - feat(provider/appengine): Enable container deployments from image url (#4607)
 - feat(provider/gce): Adds UI for pubsub attribute constraints. (#4599)
 - fix(build): fixes settings-local for non-local builds (#4602)
 - chore(amazon): bump to 0.0.57 (#4603)
 - chore(core): bump to 0.0.125 (#4601)
 - fix(core): allow HTML in search result display (#4600)
 - feat(core/pipelines): add jitter to exec windows (#4598)

### Gate  - v4.15.0
 - chore(dependencies): bump spinnaker-dependencies to 0.132.0 (#492)
 - This adds the ability to restrict github authentication to only users (#490)

### Igor  - v1.85.0
 - fix(travis) emit build started events for new branches as well (#212)

### Clouddriver  - v1.753.2
 - fix(provider/aws): Ensure that `HttpEntity` is closed on edda failure (#2258)
 - fix(provider/amazon): do not try to create reserved tags (#2256)
 - fix(provider/aws): Specify `connectionRequestTimeout` for edda (#2255)
 - debug(provider/aws): Additional logging for `ReservationReportCachingAgent` (#2254)
 - debug(provider/aws): Avoid thread pool when building reservation report (#2253)
 - fix(provider/aws): handle spotPrice == in rollingpush (#2251)
 - fix(provider/kubernetes): v2 Fix kubectl label selector flag (#2252)
 - fix(clusters): Return all matching server groups for a provider (#2249)
 - fix(startup): make constructor bean optional (#2247)
 - feat(provider/appengine): enable flex deployments (#2241)
