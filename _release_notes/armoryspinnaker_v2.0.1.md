---
layout: post
title: v2.0.1 Armory Release
order: -20181215012203
hidden: false
---

# 12/15/18 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
There's currently no known issues with this release.

<!--- Example of a problem
Igor added ..... which does.....

**Symptoms:**
**Fix:**
-->





## Highlighted Updates
### Armory

This is a fix release with notably a fix to pick a VPC when creating load balancer in AWS and better logging for Dinghy.
<!--- A quick summary of what's changed with Armory -->

<br><br><br>
## Detailed Updates

### version.manifest
Here's the version.manifest for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>export jenkins_build_number=2527
export packager_version=317d7e7
export oss_release_type=stable
export armoryspinnaker_version=2.0.1-rc2527
export armoryspinnaker_version_manifest_url=https://s3-us-west-2.amazonaws.com/armory-web/install/release/armoryspinnaker-v2.0.1-rc2527-version.manifest
export fiat_version=release-1.9.x-2c8212d
export front50_version=release-1.9.x-9ab3290
export igor_version=release-1.9.x-6a38a83
export rosco_version=release-1.9.x-c057c1d
export clouddriver_version=release-1.9.x-a148701
export spinnaker_monitoring_version=release-1.9.x-1b2c9a2
export lighthouse_version=2a93314
export barometer_version=64a613c
export configurator_version=master-0db688c
export dinghy_version=master-d861f34
export platform_version=master-30ccd55
export gate_armory_version=01034e4-release-1.9.x-95b28a6
export gate_version=release-1.9.x-95b28a6
export echo_armory_version=0052e0f-release-1.9.x-c52ac8a
export echo_version=release-1.9.x-c52ac8a
export kayenta_armory_version=429b739-release-1.9.x-3f7ed70
export kayenta_version=release-1.9.x-3f7ed70
export orca_armory_version=8376169-release-1.9.x-e52579d
export orca_version=release-1.9.x-e52579d
export deck_armory_version=74c964c-release-1.9.x-8b0ee0d
export deck_version=release-1.9.x-8b0ee0d
export deck_artifacts_url=https://s3-us-west-2.amazonaws.com/armory-artifacts/spinnaker/deck/spinnaker-deck-release-1.9.x-8b0ee0d.tgz
</code>
</pre>
</details>



### Armory
#### Lighthouse&trade; - 2a93314
No Changes

#### Dinghy&trade; - 9058c2f...d861f34
 - feat(web): log all response errors (#87)
 - feat(web): add request logging (#86)

#### Platform&trade; - edcbfde...30ccd55
No Changes

#### Armory Echo  - 24c4e36...0052e0f
No Changes

#### Armory Deck  - 30e43a4...74c964c
No Changes

#### Armory Gate  - 3934e4a...01034e4
No Changes

#### Armory Kayenta  - 1b3b7bb...429b739
No Changes

#### Packager - 79b6ffd...317d7e7
 - Fix OSS edge version in notification (#433)
 - feat(depends): remove docker-engine dependency (#430)
 - feat(dinghy) rename dinghy made pipeline to be more clear (#429)
 - feat(notifications): Disable notifications until correct name is exported (#420)
 - Use Docker hub URL to get latest make-release (#421)



###  Spinnaker Community Contributions
<!-- UNCOMMENT ME:
See Spinnaker's release notes that are included in this release:
[Spinnaker's v1.8.0](https://www.spinnaker.io/community/releases/versions/1-8-0-changelog#individual-service-changes)
[Spinnaker's v1.8.1](https://www.spinnaker.io/community/releases/versions/1-8-1-changelog#individual-service-changes)

<!-- UNCOMMENT ME: Changes listed below is are extra changes that have not yet made it to another Spinnaer release version: -->
<!-- You may need to pick out some extra contributions from OSS -->

#### Clouddriver  - a148701
No Changes

#### Deck  - b66f7fe...8b0ee0d
 - fix(amazon/loadBalancer) Fix load balancer VPC selection (#6115)
 - fix(aws/serverGroups): always show AWS server group settings (#6006)

#### Echo  - c52ac8a
No Changes

#### Fiat  - 2c8212d
No Changes

#### Front50  - 9ab3290
No Changes

#### Gate  - 95b28a6
No Changes

#### Igor  - 6a38a83
No Changes

#### Kayenta  - 3f7ed70
No Changes

#### Orca  - e52579d
No Changes

#### Rosco  - c057c1d
No Changes