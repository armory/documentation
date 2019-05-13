---
layout: post
title: v2.3.3 Armory Release (OSS Release 1.12.x)
order: -20190424201749
hidden: false
---

# 04/23/19 Release Notes
{:.no_toc}

> Note: please report issues to [http://go.armory.io/support](http://go.armory.io/support).
{:toc}



## Known Issues
The following known issues exist in this release. 
- Enabling SSL Termination at Deck results in Deck failing to start
- Terraformer fails to resolve Redis baseUrl
- Dinghy does not properly create/update pipelines
- Dinghy does not populate expected artifacts

Please upgrade to Armory Spinnaker 2.3.6

###  Spinnaker Community Contributions
## Detailed Updates

### version.manifest
Here's the version.manifest for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>export jenkins_build_number=392
export packager_version=4f6da8d
export oss_release_type=stable
export armoryspinnaker_version=2.3.3-rc392
export armoryspinnaker_version_manifest_url=https://s3-us-west-2.amazonaws.com/armory-web/install/release/armoryspinnaker-v2.3.3-rc392-version.manifest
export deck_version=2.7.8-da50323-stable9
export deck_armory_version=2.7.8-a47f9ec-da50323-rc29
export kork_version=3.8.1-5814b41-stable145
export igor_version=1.1.1-63d06a5-stable160
export igor_armory_version=1.1.1-2ccbc6a-63d06a5-rc161
export front50_armory_version=0.15.2-c616ed3-3105e86-rc90
export front50_version=0.15.2-3105e86-stable160
export clouddriver_version=4.3.9-44e0457-stable165
export clouddriver_armory_version=4.3.9-0cd856f-44e0457-rc164
export spinnaker_monitoring_version=0.11.2-232c84a-rc5
export echo_version=2.3.1-5db9d43-stable163
export echo_armory_version=2.3.1-0b32095-5db9d43-rc118
export kayenta_armory_version=0.6.1-138dc7b-81d906b-rc158
export kayenta_version=0.6.1-81d906b-stable160
export dinghy_version=0.0.2-3defde5-rc39
export rosco_armory_version=0.10.0-0de36d8-af545ba-rc158
export rosco_version=0.10.0-af545ba-stable160
export gate_armory_version=1.5.3-a01ab0f-aa01759-rc163
export gate_version=1.5.3-aa01759-stable162
export terraformer_version=0.0.1-cbdb295-rc8
export orca_version=2.4.2-c488de1-stable161
export orca_armory_version=2.4.2-9354f52-c488de1-rc161
export fiat_armory_version=1.3.2-310bff9-daf21b2-rc160
export fiat_version=1.3.2-daf21b2-stable160</code>
</pre>
</details>

### Armory
#### Dinghy&trade; - d48a007...3defde5
 - bug(plank): Update plank and support Fiat. (#149)

#### Terraformer&trade; - cbdb295
No Changes

#### Armory Clouddriver  - 0cd856f
No Changes

#### Armory Deck  - a47f9ec
No Changes

#### Armory Echo  - 0b32095
No Changes

#### Armory Fiat  - 310bff9
No Changes

#### Armory Front50  - c616ed3
No Changes

#### Armory Gate  - a01ab0f
No Changes

#### Armory Igor  - 2ccbc6a
No Changes

#### Armory Kayenta  - 138dc7b
No Changes

#### Armory Orca  - 9354f52
No Changes

#### Armory Rosco  - 0de36d8
No Changes

###  Spinnaker Community Contributions

#### Clouddriver  - d893ca5...44e0457
 - fix(provider/google): Prevent returning all security groups targeting (#3593) (#3595)

#### Deck  - caad681...da50323
 - fix(docker): Fix subscription leak in DockerTriggerTemplate (#6874)

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
