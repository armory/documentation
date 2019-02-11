---
layout: post
title: v2.1.4 Armory Release
order: -20190211213934
hidden: false
---

# 02/11/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, please report issues to [http://go.armory.io/support](http://go.armory.io/support).

{:toc}

## Known Issues
There's currently no known issues with this release.

## Detailed Updates

### version.manifest
Here's the version.manifest for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>export jenkins_build_number=2635
export packager_version=a4e7e61
export oss_release_type=stable
export armoryspinnaker_version=2.1.4-rc2635
export armoryspinnaker_version_manifest_url=https://s3-us-west-2.amazonaws.com/armory-web/install/release/armoryspinnaker-v2.1.4-rc2635-version.manifest
export fiat_version=release-1.10.x-83a7ef2
export front50_version=release-1.10.x-98b4ab9
export igor_version=release-1.10.x-a4fd897
export rosco_version=release-1.10.x-2f1a4f8
export clouddriver_version=release-1.10.x-db473fc
export spinnaker_monitoring_version=release-1.10.x-4a87d20
export lighthouse_version=2a93314
export barometer_version=64a613c
export configurator_version=master-0db688c
export dinghy_version=master-338c1d9
export platform_version=master-30ccd55
export gate_armory_version=0d6729c-release-1.10.x-a8bb998
export gate_version=release-1.10.x-a8bb998
export echo_armory_version=5891816-release-1.10.x-a568cf9
export echo_version=release-1.10.x-a568cf9
export kayenta_armory_version=b86ccca-release-1.10.x-9690617
export kayenta_version=release-1.10.x-9690617
export orca_armory_version=27571fb-release-1.10.x-7b1f06a0
export orca_version=release-1.10.x-7b1f06a0
export deck_armory_version=12927b8-release-1.10.x-c9abb38e5
export deck_version=release-1.10.x-c9abb38e5
export deck_artifacts_url=https://s3-us-west-2.amazonaws.com/armory-artifacts/spinnaker/deck/spinnaker-deck-release-1.10.x-c9abb38e5.tgz
</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - 7f67616...338c1d9
 - feat(canary): Support specifying application spec for app creation (#96)
 - fix(settings): use squash tag for settings (#97)
 - fix(config): better config loading (#94)

#### Armory Echo  - 5891816
No Changes

#### Armory Deck  - 12927b8
No Changes

#### Armory Gate  - e569fa6...0d6729c
 - feat(auth/oidc): Add support for configured user_name (#40)

#### Armory Kayenta  - b86ccca
No Changes

#### Packager - a3b654b...a4e7e61
No Changes

#### Clouddriver  - 3ca7359...db473fc
 - fix(provider/aws): Only describe instance health for ELBs (#2699) (#3196) (#3359)

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