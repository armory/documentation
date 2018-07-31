---
layout: post
title: v1.4.35 Armory Enterprise Spinnaker
order: 997
---

# 04/18/2017 Release Notes
{:.no_toc}
> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Armory Enterprise Spinnaker

### Lighthouse - 7f4a5c4
 - Created endpoints for working with Spinnaker statistics
 - Spinnaker subservice version can be discovered by a web endpoint
 - Check the health of Gate differently depending on how auth is configured


## Spinnaker Community Contributions

### Gate - v3.27.0
 - feat(images): endpoint to get all image tags - only docker for now
 - fix(ldap): make LDAP login page come before the rest of auth config (#375)
 - feat(servergroups): send clusters param on /serverGroups
 - feat(applications): better handling of synthetic apps when expand=false
 - fix(authn): Move Fiat session filter later in the chain, bump Fiat API to fix 404 issue (#372)
 - feat(applications): allow clusters to be skipped when loading application details
 - fix(auth): (Re)add auth protection for Spring management endpoints (#370)
 - feat(authN/ldap): Adds userSearchBase and userSearchFilter properties for LDAP (#369)
 - feat(fiat): Adds Fiat Session filter to force relogin if Fiat entry is missing. (#368)
 - feat(fiat): Uses Fiat API module's new cache of the whole user permission view. (#367)
 - feat(ratelimit): Add enforcing & ignoring principal list configs (#356)
 - feat(ratelimit): Adding source IP address to anonymous prinicipal (#355)
 - fix(tls): tls updates from kork 1.89.0
 - feat(web): Adding rate limit headers to all 429 errors (#365)
 - fix(instanceService): prevents merge of instance and account details
 - refactor(auth): Removes basicAuth.enabled in favor of standard security.basic.enabled (#358)
 - chore(changelog): Extend changelog commit keywords. (#363)
