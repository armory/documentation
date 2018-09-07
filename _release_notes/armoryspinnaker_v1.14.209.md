---
layout: post
title: v1.14.209 Armory Release
order: -20180830211559
hidden: false
---

# 08/30/18 Release Notes
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

###  Spinnaker Community Contributions
❗️ Important for GCP users, you will need to upgrade to this version. There's an important fix to allow Spinnaker 1.8 to talk to the GCE APIs.  
[Spinnaker's v1.8.6](https://www.spinnaker.io/community/releases/versions/1-8-6-changelog#individual-service-changes)  



<br><br><br>
## Detailed Updates

### version.manifest
Here's the version.manifest for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>export jenkins_build_number=2334
export packager_version=fcb854c
export armoryspinnaker_version=1.14.209
export armoryspinnaker_version_manifest_url=https://s3-us-west-2.amazonaws.com/armory-web/install/release/armoryspinnaker-v1.14.209-version.manifest
export fiat_version=release-1.8.x-112f58a
export front50_version=release-1.8.x-93febf2
export igor_version=release-1.8-x-new-install-healthy-ae2b329
export rosco_version=release-1.8.x-adf0e78
export clouddriver_version=release-1.8.x-95ac999
export orca_version=release-1.8.x-de4ab55
export spinnaker_monitoring_version=release-1.8.x-3be42b8
export lighthouse_version=2a93314
export barometer_version=64a613c
export configurator_version=master-0db688c
export dinghy_version=master-0dce367
export platform_version=master-12608ac
export gate_armory_version=ddbea5c-release-1.8.x-5d505ca
export gate_version=release-1.8.x-5d505ca
export echo_armory_version=0fb709d-release-1.8.x-56a9f63
export echo_version=release-1.8.x-56a9f63
export kayenta_armory_version=f46ee34-release-1.8.x-9f62a06
export kayenta_version=release-1.8.x-9f62a06
export deck_armory_version=cdb4fc2-release-1.8.x-e3122cc
export deck_version=release-1.8.x-e3122cc
export deck_artifacts_url=https://s3-us-west-2.amazonaws.com/armory-artifacts/spinnaker/deck/spinnaker-deck-release-1.8.x-e3122cc.tgz</code>
</pre>
</details>



### Armory
#### Lighthouse&trade; - 2a93314
No Changes

#### Dinghy&trade; - 0dce367
No Changes

#### Platform&trade; - 12608ac
No Changes

#### Armory Echo  - c36d576...0fb709d
 - chore(docker): add wget (#70)
 - chore(build): clean before installDist (#69)

#### Armory Deck  - 0365c72...cdb4fc2
 - chore(document): add comment to nginx conf (#434)
 - feat(settings): allow settings-local override (#433)
 - Remove and re-add deck packages (#432)

#### Armory Gate  - ddbea5c
No Changes

#### Armory Kayenta  - f46ee34
No Changes

#### Packager - 32bd04b...fcb854c
 - fix(package) install awscli with lower version of pip (#382)
 - fix(version.manifest) fixed s3 upload path (#379)



###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release:
[Spinnaker's v1.8.6](https://www.spinnaker.io/community/releases/versions/1-8-6-changelog#individual-service-changes)  


#### Clouddriver  - 6e56553...95ac999
 - fix(provider/google): batch & service path must match (#2925) (#2927)

#### Deck  - e3122cc
No Changes

#### Echo  - 56a9f63
No Changes

#### Fiat  - 112f58a
No Changes

#### Front50  - 93febf2
No Changes

#### Gate  - 5d505ca
No Changes

#### Igor  - ae2b329
No Changes

#### Kayenta  - 9f62a06
No Changes

#### Orca  - de4ab55
No Changes

#### Rosco  - adf0e78
No Changes
