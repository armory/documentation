---
layout: post
title: v2.1.3 Armory Release (OSS v1.10.x)
order: -20190130220044
hidden: false
---

# 01/30/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, please report issues to [http://go.armory.io/support](http://go.armory.io/support).

{:toc}


## Known Issues
There's currently no known issues with this release.


## Highlighted Updates
### Armory

This is a fix release that addresses incomplete project dashboard with Kubernetes clusters.

## Detailed Updates

### version.manifest
Here's the version.manifest for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>
export packager_version=a3b654b
export oss_release_type=stable
export armoryspinnaker_version=2.1.3-rc2612
export armoryspinnaker_version_manifest_url=https://s3-us-west-2.amazonaws.com/armory-web/install/release/armoryspinnaker-v2.1.3-rc2612-version.manifest
export fiat_version=release-1.10.x-83a7ef2
export front50_version=release-1.10.x-98b4ab9
export igor_version=release-1.10.x-a4fd897
export rosco_version=release-1.10.x-2f1a4f8
export clouddriver_version=release-1.10.x-3ca7359
export spinnaker_monitoring_version=release-1.10.x-4a87d20
export lighthouse_version=2a93314
export barometer_version=64a613c
export configurator_version=master-0db688c
export dinghy_version=master-7f67616
export platform_version=master-30ccd55
export gate_armory_version=e569fa6-release-1.10.x-a8bb998
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
#### Armory Echo  - f3d877e...5891816
 - chore(logback): add logback dependency (#80)

#### Armory Gate  - 1232c37...e569fa6
 - chore(logback): add logback dependency (#38)
 - chore(oid): Add logging to OpenID Connect (#39)

#### Armory Kayenta  - 20403e3...b86ccca
 - chore(logback): add logback depenendency


###  Spinnaker Community Contributions
#### Clouddriver  - 921a277...3ca7359
 - fix(provider/kubernetes): fix NPE on KubernetesV2ServerGroup disabled (#3325) (#3335)
