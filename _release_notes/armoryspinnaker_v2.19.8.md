---
layout: post
title: v2.19.8 Armory Release (OSS Release 1.19.5)
order: -21920200422015413
hidden: false
---

# 04/21/20 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

<!--
## Breaking Changes
<!--
most of the time this will be empty, however we're leaving this section for a consistent format.
-->
### HTTP sessions for Gate
This version includes an upgrade to the Spring Boot dependency. This requires you to flush all the Gate sessions for your Spinnaker deployment. For more information, see [Flushing Gate Sessions](https://kb.armory.io/admin/flush-gate-sessions/).

-->



## Known Issues
There are currently no known issues with this release.

<!-- example format of a known issue
### Igor wants his name to be changed to eye-gor
Igor (pronounced "eye-gor" /ˈaɪɡɔːr/)[1] is a fictional character in the 1974 film Young Frankenstein and its 2007 musical adaptation. He is the hunchbacked assistant of Dr. Frederick Frankenstein, and the grandson of Igor, the original assistant of Frederick's grandfather, Victor Frankenstein.

**Symptoms:**
Calling eye-gor by Igor will invoke his wrath

**Fix:**
Call eye-gor by eye-gor
-->



## Highlighted Updates
### Armory
Highlighted Updates describe some of the major changes in this release. Highlights specific to Armory Spinnaker for this release include:

<!-- format should look something like this
**Policy Engine**

Armory's Policy Engine ....


**CVEs**

Addressed a number of CVEs found within the Spinnaker services.
-->



###  Spinnaker Community Contributions
The following highlights describe some of the major changes from the Spinnaker community for version OSS Release 1.19.5, which is included in this release of Armory Spinnaker 2.19:




<br><br><br>

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.19.8-rc.1
timestamp: "2020-04-22 01:49:47"
services:
  clouddriver:
    commit: 2bd55acb
    version: 2.19.8
  echo:
    commit: 43e1966a
    version: 2.19.8
  fiat:
    commit: e7d5efa3
    version: 2.19.6
  front50:
    commit: 32cc7a7c
    version: 2.19.6
  gate:
    commit: 5ea58df0
    version: 2.19.5
  igor:
    commit: 67f5ae20
    version: 2.19.6
  orca:
    commit: be0f8e7a
    version: 2.19.9
  rosco:
    commit: e168a011
    version: 2.19.6
  deck:
    commit: 4f6b2719
    version: 2.19.7
  dinghy:
    commit: ef444037
    version: 2.19.5
  terraformer:
    commit: f3edd3da
    version: 1.0.6
  kayenta:
    commit: fa1521ae
    version: 2.19.5
  monitoring-daemon:
    version: 0.16.1-7d506f0-rc1
  monitoring-third-party:
    version: 0.16.1-7d506f0-rc1
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - ef444037
No Changes

#### Terraformer&trade; - f3edd3da
No Changes

#### Armory Clouddriver  - ef9da881...2bd55acb
 - fix(plugins): add plugins dir (bp #103) (#104)

#### Armory Deck  - 4f6b2719
No Changes

#### Armory Echo  - 43e1966a
No Changes

#### Armory Fiat  - 8494a0c4...e7d5efa3
 - fix(plugins): add plugins dir (bp #46) (#47)

#### Armory Front50  - eaeb2a64...32cc7a7c
 - fix(plugins): add plugins dir (bp #52) (#53)

#### Armory Gate  - 61291021...5ea58df0
 - fix(plugins): add plugins dir (bp #106) (#107)

#### Armory Igor  - 8cbc70d2...67f5ae20
 - fix(plugins): add plugins dir (#58) (#59)

#### Armory Kayenta  - c04d2e7c...fa1521ae
 - fix(plugins): add plugins dir (bp #64) (#65)

#### Armory Orca  - 85dbdae9...be0f8e7a
 - fix(plugins): add plugins dir (bp #94) (#95)

#### Armory Rosco  - 2bb01d9e...e168a011
 - fix(plugins): add plugins dir (bp #47) (#48)



###  Spinnaker Community Contributions
See the Open Source Spinnaker Release Notes for the versions included in this release:

[Spinnaker's v1.8.0](https://www.spinnaker.io/community/releases/versions/1-8-0-changelog#individual-service-changes)  
[Spinnaker's v1.8.1](https://www.spinnaker.io/community/releases/versions/1-8-1-changelog#individual-service-changes)  
