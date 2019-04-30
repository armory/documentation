---
layout: post
title: v2.3.1 Armory Release
order: -20190418211949
hidden: false
---

# 04/18/19 Release Notes
{:.no_toc}

> Note: please report issues to [http://go.armory.io/support](http://go.armory.io/support).
{:toc}


## Known Issues
The following known issues exist in this release. 
- Fiat service accounts are not used properly by Dinghy
- Enabling SSL Termination at Deck results in Deck failing to start

Please upgrade to Armory Spinnaker 2.3.4

###  Spinnaker Community Contributions
## Detailed Updates

### version.manifest
Here's the version.manifest for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>export jenkins_build_number=184
export packager_version=ce8bbf7
export oss_release_type=stable
export armoryspinnaker_version=2.3.1-rc184
export armoryspinnaker_version_manifest_url=https://s3-us-west-2.amazonaws.com/armory-web/install/release/armoryspinnaker-v2.3.1-rc184-version.manifest
export deck_version=2.7.7-caad681-stable7
export deck_armory_version=2.7.7-a47f9ec-caad681-rc27
export kork_version=3.8.1-5814b41-stable2
export igor_version=1.1.1-63d06a5-stable59
export igor_armory_version=1.1.1-2ccbc6a-63d06a5-rc60
export front50_armory_version=0.15.2-c616ed3-3105e86-rc59
export front50_version=0.15.2-3105e86-stable59
export clouddriver_version=4.3.9-f68bdcb-stable62
export clouddriver_armory_version=4.3.9-0cd856f-f68bdcb-rc61
export spinnaker_monitoring_version=0.11.2-232c84a-rc5
export echo_version=2.3.1-5db9d43-stable62
export echo_armory_version=2.3.1-0b32095-5db9d43-rc17
export kayenta_armory_version=0.6.1-138dc7b-81d906b-rc57
export kayenta_version=0.6.1-81d906b-stable59
export plank_version=0.0.1-ece0a97-stable9
export dinghy_version=0.0.2-034a6d5-rc36
export rosco_armory_version=0.10.0-0de36d8-af545ba-rc57
export rosco_version=0.10.0-af545ba-stable59
export gate_armory_version=1.5.3-a01ab0f-aa01759-rc62
export gate_version=1.5.3-aa01759-stable61
export terraformer_version=0.0.1-cbdb295-rc8
export orca_version=2.4.2-c488de1-stable60
export orca_armory_version=2.4.2-9354f52-c488de1-rc60
export fiat_armory_version=1.3.2-310bff9-daf21b2-rc59
export fiat_version=1.3.2-daf21b2-stable59</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - b491663...034a6d5
 - fix(events): always send events to echo (#142)
 - fix(events): add content header to events request (#145)
 - feat(events): adds echo to dinghy yml
 - feat(events): point events at echo (#141)
 - feat(render events): adds functionality to send render events to debug (#137)
 - fix(build): fail build on failing tests (#134)
 - fix(config): Make Dinghy use baseUrl appropriately. (#136)
 - fix(docker): use the correct declared user
 - fix(docker): need to add user before using user
 - chore(github): makes github functions testable and adds coverage (#131)
 - test(default-variable): test default variable being empty works
 - fix(default-variable): empty default variable causes panic
 - chore(go112): move to go module and 1.12.1
 - fix(github): Return 404 for File Not found in Github (#126)
 - chore(github): use github library (#125)

#### Terraformer&trade; - 661752d...cbdb295
 - chore(terraform): Add terraform 0.11.12 and 0.11.13 support
 - fix(build): Install both 0.11.11 and 0.11.10
 - chore(build): Fix install terraform
 - fix(docker): use the correct declared user
 - fix(docker): need to add user before using user

#### Armory Clouddriver  - 0cd856f
No Changes

#### Armory Deck  - 353206e...a47f9ec
 - fix(ui): the main container shouldn't be scrollable (#498)

#### Armory Echo  - a6b93b0...0b32095
No Changes

#### Armory Fiat  - 888fafe...310bff9
No Changes

#### Armory Front50  - cc25587...c616ed3
No Changes

#### Armory Gate  - 6f60d35...a01ab0f
- fix(secrets): Support for keystore as secret

#### Armory Igor  - 77b94ee...2ccbc6a
No Changes

#### Armory Kayenta  - 7fab32f...138dc7b
No Changes

#### Armory Orca  - c201555...9354f52
 - chore(build): Add RDS certificates to truststore (#32)

#### Armory Rosco  - 0377c71...0de36d8
No Changes


###  Spinnaker Community Contributions
#### Clouddriver  - 171c3ba...f68bdcb
 - fix(provider/gce): Wait on LB backend service updates. (#3532) (#3536)
 - fix(provider/google): Paginates autoscaler aggregated list calls. (#3518) (#3523)

#### Deck  - 6324862...caad681
 - fix(google): revert "select all zones by default when deploying a regional gce server group (#6751) (#6755)" (#6810)

#### Echo  - 5db9d43
No Changes

#### Fiat  - daf21b2
No Changes

#### Front50  - 3105e86
No Changes

#### Gate  - b238ab9...aa01759
 - fix(iap): Add a clock skew flag for IAP issue time and expiration time checks. (#766) (#767)

#### Igor  - 63d06a5
No Changes

#### Kayenta  - 81d906b
No Changes

#### Orca  - c488de1
No Changes

#### Rosco  - af545ba
No Changes
