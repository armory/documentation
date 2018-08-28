---
layout: post
title: v1.14.192 Armory Release
order: -20180828224324
hidden: false
---

# 08/28/18 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
There's currently no known issues with this release.

<!-- Example of a problem
Igor added ..... which does.....

**Symptoms:**
**Fix:**
-->





## Highlighted Updates
### Armory
We've added our Kayenta Integration! Be on the lookout for new and exciting things to hit Kayenta!



###  Spinnaker Community Contributions
There have also been numerous enhancements, fixes and features across all of Spinnaker's other services. See their changes here:
[Spinnaker's v1.8.2](https://www.spinnaker.io/community/releases/versions/1-8-2-changelog)
[Spinnaker's v1.8.3](https://www.spinnaker.io/community/releases/versions/1-8-3-changelog)
[Spinnaker's v1.8.4](https://www.spinnaker.io/community/releases/versions/1-8-4-changelog)
[Spinnaker's v1.8.5](https://www.spinnaker.io/community/releases/versions/1-8-5-changelog)




<br><br><br>
## Detailed Updates
### Armory
### Lighthouse&trade; - e70f1e6...2a93314
 - feat(upgrades) Adds ability to add a warning entry to upgrade specs (#220)

### Dinghy&trade; - f8a6984...0dce367
 - feat(config) Mark json tags as omitempty (#66)

### Platform&trade; - 12608ac
No Changes

### Armory Echo  - c36d576
No Changes

### Armory Deck  - 26d06b4...0365c72
 - feat(armory-nav-bar) Add link to classic config for non-k8s installs (#431)
 - feat(configatron) Add repositories textarea for docker (#426)
 - feat(configatron) Cut over to new configurator called configatron (#422)
 - feat(configatron) Use Enabled field passed from backend (#425)
 - feat(deck-armory) Deck Kayenta integration (#423)
 - feat(configatron) Do not have user set spinnaker ui url (#421)
 - feat(configatron) Kubernetes (#420)
 - feat(nginx) Remove default server (#419)
 - feat(nginx) Removed ipv6 (#418)
 - feat(configatron) Disable omitIfPristine for now (#417)
 - feat(configatron) Fix use cloned data on save (#416)
 - feat(configatron) Enable for Github, Dinghy, other resources w/out enabled flag (#415)
 - feat(configatron) Fix slack (#414)
 - feat(configatron) Validation for multi record w/ right path + Slack/Jira enabled flag (#412)
 - feat(configatron) Eng 1945 autogenerate ui (#406)
 - feat(armory-updates) ENG-2155: Supports inclusion of a warning field in upgrade data (#409)
 - feat(configatron)  Always show the Armory header. (#403)
 - feat(package.json) remove husky git hooks (#402)
 - feat(settings.js) Reference yaml for architecture env var (#382)

### Armory Gate  - dfafe73...ddbea5c
 - fix(wget): update wget (#27)
 - feat(auth) Auth for configurator (#24)
 
### Packager - 582efc3...32bd04b
 - feat(build) Build BOM on each commit (#378)
 - fix(kayenta) fix typo in name (#374)
 - feat(kayenta) add the kayenta to the builds. (#373)
 - feat(kayenta) Switch kayenta to kayenta-armory (#372)
 - fix(version.manifest) use version number instead of branch+hash (#369)



###  Spinnaker Community Contributions
### Clouddriver  - 14c9664...6e56553
 - fix(core): Fix dependency in Dockerfile (#2890)
 - fix(provider/kubernetes): upgrade to latest version of spinnaker-dependencies to fix spinnaker/spinnaker#3082 (#2807) (#2825)
 - fix(artifacts): fixes multiple http base providers (#2820) (#2824)
 - fix(provider/docker): Clear docker token cache after 401 (#2817)
 - fix(provider/kubernetes): v2 check that artifact & cluster account match (#2799) (#2804)
 - fix(provider/gce): Fetch instance relationships for regional MIGs. (#2801) (#2802)
 - fix(provider/gce): Stop modifying onDemand namespace in force cache refreshes. (#2768)
 - fix(provider/gce): Fix NPEs in instance cache relationships. (#2742)
 - fix(provider/gce): Null proof cache data relationships. (#2739)
 - chore(provider/gce): Reduce GCE image SSCANs in Redis. (#2734)

### Deck  - 0a33f94...e3122cc
 - fix(provider/google): cloning server group doesnt correctly copy disk (#5554)
 - fix(core/pipeline): Don't fail when checking Force Rebake without a trigger (#5445) (#5545)

### Echo  - 617c567...56a9f63
 - fix(github): Fail github authentication when header is absent (#302) (#303)

### Fiat  - 112f58a
No Changes

### Front50  - 93febf2
No Changes

### Gate  - 5d505ca
No Changes

### Igor  - ae2b329
No Changes

### Kayenta  - 9f62a06
No Changes

### Orca  - de4ab55
No Changes

### Rosco  - adf0e78
No Changes