---
layout: post
title: v2.1.2 Armory Release
order: -20190122231936
hidden: false
---

# 01/22/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
There's currently no known issues with this release.


## Highlighted Updates
### Armory
- fix(module): Support top-level modules when using global variables


###  Spinnaker Community Contributions
[Spinnaker v1.10.12](https://www.spinnaker.io/community/releases/versions/1-10-12-changelog)  

 - fix(kubernetes): cherry-pick [#3286](https://github.com/spinnaker/clouddriver/pull/3286) into 1.10.x (#3293)
 - fix(kubernetes): cherry-pick [#3247](https://github.com/spinnaker/clouddriver/pull/3247) into 1.10.x (#3292)
 - fix(provider/kubernetes): cherry-pick [#3054](https://github.com/spinnaker/clouddriver/pull/3054) into 1.10.x; fix sticky lb & pod relationship (#3054) (#3297)
 - fix(core): cherry-pick commit [#3244](https://github.com/spinnaker/clouddriver/pull/3244) into 1.10; include instanceCounts when fetching project clusters, fix ClassCastException for gce and appengine fetch cluster methods (#3244) (#3291)

<br><br><br>
## Detailed Updates

### version.manifest
Here's the version.manifest for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>export jenkins_build_number=2590
export packager_version=f6e6b46
export oss_release_type=stable
export armoryspinnaker_version=2.1.2-rc2590
export armoryspinnaker_version_manifest_url=https://s3-us-west-2.amazonaws.com/armory-web/install/release/armoryspinnaker-v2.1.2-rc2590-version.manifest
export fiat_version=release-1.10.x-83a7ef2
export front50_version=release-1.10.x-98b4ab9
export igor_version=release-1.10.x-a4fd897
export rosco_version=release-1.10.x-2f1a4f8
export clouddriver_version=release-1.10.x-921a277
export spinnaker_monitoring_version=release-1.10.x-4a87d20
export lighthouse_version=2a93314
export barometer_version=64a613c
export configurator_version=master-0db688c
export dinghy_version=master-a31fac8
export platform_version=master-30ccd55
export gate_armory_version=1232c37-release-1.10.x-a8bb998
export gate_version=release-1.10.x-a8bb998
export echo_armory_version=f3d877e-release-1.10.x-a568cf9
export echo_version=release-1.10.x-a568cf9
export kayenta_armory_version=20403e3-release-1.10.x-9690617
export kayenta_version=release-1.10.x-9690617
export orca_armory_version=62da02c-release-1.10.x-7b1f06a0
export orca_version=release-1.10.x-7b1f06a0
export deck_armory_version=12927b8-release-1.10.x-c9abb38e5
export deck_version=release-1.10.x-c9abb38e5
export deck_artifacts_url=https://s3-us-west-2.amazonaws.com/armory-artifacts/spinnaker/deck/spinnaker-deck-release-1.10.x-c9abb38e5.tgz
export OSS_VERSION=version-2.5.7
export OSS_GIT_HASH=c9abb38e5
export OSS_BRANCH=release-1.10.x
export TAGGED_IMAGE=armory/deck:2.5.7-c9abb38e5-b558-12927b8
export SERVICE_REPO=deck
export SERVICE_VERSION=2.5.7
export SERVICE_BRANCH=release-1.10.x
export SERVICE_HASH=c9abb38e5</code>
</pre>
</details>



### Armory
#### Lighthouse&trade; - 2a93314
No Changes

#### Dinghy&trade; - 8261525...a31fac8
 - fix(module): Support top-level modules when using global variables
 - fix(globals): fix global variables in monorepo

#### Platform&trade; - 30ccd55
No Changes

#### Armory Echo  - f3d877e
No Changes

#### Armory Deck  - 12927b8
No Changes

#### Armory Gate  - 1232c37
No Changes

#### Armory Kayenta  - 20403e3
No Changes

#### Packager - 872d223...f6e6b46
 - chore(version): bump to v2.1.2 (#445)



###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release: [Spinnaker v1.10.12](https://www.spinnaker.io/community/releases/versions/1-10-12-changelog)  

#### Clouddriver  - ab0df80...921a277
 - fix(kubernetes): cherry-pick #3286 into 1.10.x (#3293)
 - fix(kubernetes): cherry-pick #3247 into 1.10.x (#3292)
 - fix(provider/kubernetes): cherry-pick #3054 into 1.10.x; fix sticky lb & pod relationship (#3054) (#3297)
 - fix(core): cherry-pick commit 3244 into 1.10; include instanceCounts when fetching project clusters, fix ClassCastException for gce and appengine fetch cluster methods (#3244) (#3291)

#### Deck  - c9abb38e5
No Changes

#### Echo  - a568cf9
No Changes

#### Fiat  - 83a7ef2
No Changes

#### Front50  - 98b4ab9
No Changes

#### Gate  - a8bb998
No Changes

#### Igor  - a4fd897
No Changes

#### Kayenta  - 9690617
No Changes

#### Orca  - 7b1f06a0
No Changes

#### Rosco  - 2f1a4f8
No Changes
