---
layout: post
title: v2.3.5 Armory Release
order: -20190508042505
hidden: false
---

# 04/23/19 Release Notes
{:.no_toc}

> Note: please report issues to [http://go.armory.io/support](http://go.armory.io/support).
{:toc}



## Known Issues
There are currently no known issues with this release.

###  Spinnaker Community Contributions
## Detailed Updates

### version.manifest
Here's the version.manifest for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>export jenkins_build_number=441
export packager_version=f4bca65
export oss_release_type=stable
export armoryspinnaker_version=2.3.5-rc441
export armoryspinnaker_version_manifest_url=https://s3-us-west-2.amazonaws.com/armory-web/install/release/armoryspinnaker-v2.3.5-rc441-version.manifest
export deck_version=2.7.9-851847e-stable10
export deck_armory_version=2.7.9-3278985-851847e-rc31
export igor_armory_version=1.1.1-cb9b244-63d06a5-rc173
export kork_version=4.0.2-13d0531-stable53
export igor_version=1.1.1-63d06a5-stable162
export armory_commons_version=0.0.2-0ae4580-rc17
export front50_armory_version=0.15.2-241c444-3105e86-rc105
export front50_version=0.15.2-3105e86-stable162
export clouddriver_version=4.3.9-44e0457-stable165
export clouddriver_armory_version=4.3.9-409682d-44e0457-rc177
export spinnaker_monitoring_version=0.11.2-232c84a-rc5
export echo_version=2.3.1-5db9d43-stable165
export echo_armory_version=2.3.1-95870b0-5db9d43-rc133
export kayenta_version=0.6.1-81d906b-stable162
export kayenta_armory_version=0.6.1-d9c5148-81d906b-rc171
export dinghy_version=0.0.2-72d75ef-rc50
export rosco_armory_version=0.10.0-cb75050-af545ba-rc169
export rosco_version=0.10.0-af545ba-stable162
export gate_armory_version=1.5.3-8f87d50-aa01759-rc175
export gate_version=1.5.3-aa01759-stable164
export terraformer_version=0.0.1-ed701ec-rc9
export orca_armory_version=2.4.2-a2c5a38-c488de1-rc174
export orca_version=2.4.2-c488de1-stable163
export fiat_armory_version=1.3.2-1c1379a-daf21b2-rc179
export fiat_version=1.3.2-daf21b2-stable166</code>
</pre>
</details>

### Armory
#### Dinghy&trade; - b2cde94...72d75ef
 - fix(delete): don't delete a pipeline you just created (#155)
 - fix(upsert): plank v1.0.1 to fix upsert call (#154)
 - chore(tests): Added unit tests to repro customer-reported issues (#153)
 - chore(logging): Add more logging for critical ops.
 
#### Terraformer&trade; - ed701ec
No Changes

#### Armory Clouddriver  - 8b754b0...409682d
 - chore(build): Add armory-commons

#### Armory Deck  - 3278985
No Changes

#### Armory Echo  - a7a3cb5...95870b0
 - chore(build): Add armory-commons (#101)

#### Armory Fiat  - c4a55e7...1c1379a
 - chore(build): Add armory-commons Bump plugin version

#### Armory Front50  - 5d3e94b...241c444
 - chore(build): Add armory-commons

#### Armory Gate  - a01ab0f...8f87d50
 - chore(build): Add armory-commons (#61)

#### Armory Igor  - 2ccbc6a...cb9b244
 - chore(build): Add armory-commons

#### Armory Kayenta  - 138dc7b...d9c5148
 - chore(build): Add armory-commons

#### Armory Orca  - 9354f52...a2c5a38
 - chore(build): Add armory-commons

#### Armory Rosco  - 0de36d8...cb75050
 - chore(build): Add armory-commons

###  Spinnaker Community Contributions

#### Clouddriver  - 44e0457
No Changes

#### Deck  - da50323...851847e
 - fix(bake/manifest): Preserve artifact account selection (#6937) (#6940)

#### Echo  - 5db9d43
No Changes

#### Fiat  - daf21b2
No Changes

#### Front50  - 3105e86
No Changes

#### Gate  - aa01759
No Changes

#### Igor  - 63d06a5
No Changes

#### Kayenta  - 81d906b
No Changes

#### Orca  - c488de1
No Changes

#### Rosco  - af545ba
No Changes
