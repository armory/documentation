---
layout: post
title: v2.1.1 Armory Release (OSS v1.10.x)
order: -20190119020526
hidden: false
---

# 01/19/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
There are currently no known issues with this release.

## Highlighted Updates
### Armory
 - feat(webserver) migrate to apache for alignment w/OSS (#477)
 - chore(docker) run containers as non-root user
 

<!--- A quick summary of what's changed with Armory -->

###  Spinnaker Community Contributions
There have also been numerous fixes across all of Spinnaker's other services. See their changes here:  
[Spinnaker's v1.10.11](https://www.spinnaker.io/community/releases/versions/1-10-11-changelog)  

<br><br><br>
## Detailed Updates

### version.manifest
Here's the version.manifest for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>export jenkins_build_number=2584
export packager_version=872d223
export oss_release_type=stable
export armoryspinnaker_version=2.1.1-rc2584
export armoryspinnaker_version_manifest_url=https://s3-us-west-2.amazonaws.com/armory-web/install/release/armoryspinnaker-v2.1.1-rc2584-version.manifest
export fiat_version=release-1.10.x-83a7ef2
export front50_version=release-1.10.x-98b4ab9
export igor_version=release-1.10.x-a4fd897
export rosco_version=release-1.10.x-2f1a4f8
export clouddriver_version=release-1.10.x-ab0df80
export spinnaker_monitoring_version=release-1.10.x-4a87d20
export lighthouse_version=2a93314
export barometer_version=64a613c
export configurator_version=master-0db688c
export dinghy_version=master-8261525
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

#### Dinghy&trade; - d861f34...8261525
 - chore(docker): run as spinnaker user (#89)

#### Platform&trade; - 30ccd55
No Changes

#### Armory Echo  - 0052e0f...f3d877e
 - chore(docker): Run as spinnaker user (#79)

#### Armory Deck  - 8ef4883...12927b8
 - fix(apache): switch to debian -- resolve port conflicts (#478)
 - feat(webserver) migrate to apache for alignment w/OSS (#477)

#### Armory Gate  - 01034e4...1232c37
 - chore(docker): run as spinnaker user (#37)
 - feat(auth/oidc): Add support for OpenIdConnect (#36)

#### Armory Kayenta  - 429b739...20403e3
 - chore(docker): run as spinnaker user

#### Packager - ac50da7...872d223
 - fix(build): Services as an array (#443)
 - chore(build): Add build and service definitions (#441)
 - chore(terraformer): add terraformer trigger (#440)
 - Bump version 2.1.1 (#438)


###  Spinnaker Community Contributions
See Spinnaker's release notes for changes included in this release:
[Spinnaker's v1.10.11](https://www.spinnaker.io/community/releases/versions/1-10-11-changelog)

#### Clouddriver  - 863271e...ab0df80
 - fix(provider/gce): Adds flexibility to autoscaler upsert for scaleDown (#3260) (#3263)
 - fix(google): prevent parent server group from overwriting null clone autohealing policies (#3267)
 - fix(provider/gce): Decorate XPN resources when upserting instance (#3252) (#3254)

#### Deck  - 9fb2a65...c9abb38e5
 - fix(google): fix autohealing clone logic
 - fix(google): prevent parent server group from overwriting null clone autohealing policies

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

#### Kayenta  - 788433f...9690617
 - fix(redis): Fix up redis configuration so it works with latest orca. (#455)
 - fix(orca): Bump orca to 6.119.0 to resolve redis evalsha issue. (#450) (#454)

#### Orca  - 7b1f06a0
No Changes

#### Rosco  - 2f1a4f8
No Changes
