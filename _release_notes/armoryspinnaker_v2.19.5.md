---
layout: post
title: v2.19.5 Armory Release (OSS Release 1.19.4)
order: -21920200417225049
hidden: false
---

# 04/17/20 Release Notes
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
The following highlights describe some of the major changes from the Spinnaker community for version OSS Release 1.19.4, which is included in this release of Armory Spinnaker 2.19:


#### Igor
REMOVE ME: FOR EACH OF SPINNAKER'S SERVICES, PICK OUT SOME NOTIBLE CHANGES

<!-- An example of a problem
Igor added ..... which does.....

**Symptoms:**
**Fix:**
-->



<br><br><br>

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.19.5-rc.1
timestamp: "2020-04-17 22:46:33"
services:
  clouddriver:
    commit: ef9da881
    version: 2.19.7
  echo:
    commit: 43e1966a
    version: 2.19.8
  fiat:
    commit: a955c640
    version: 2.19.4
  front50:
    commit: eaeb2a64
    version: 2.19.5
  gate:
    commit: 61291021
    version: 2.19.4
  igor:
    commit: 8cbc70d2
    version: 2.19.5
  orca:
    commit: 85dbdae9
    version: 2.19.8
  rosco:
    commit: 2d6fdf58
    version: 2.19.4
  deck:
    commit: e8ded5b9
    version: 2.19.4
  dinghy:
    commit: ef444037
    version: 2.19.5
  terraformer:
    commit: f3edd3da
    version: 1.0.6
  kayenta:
    commit: c04d2e7c
    version: 2.19.4
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
#### Dinghy&trade; - e691b529...ef444037
 - fix(bump): Autobump armory commons and spinnaker release (#209)

#### Terraformer&trade; - f498d00e...f3edd3da
 - fix(mergify): fix rules (#142)
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Ve… (#141)
 - fix(api/createJob): make sure to init a runner (#139)
 - feat(terraform/versions): 0.12.21, 0.12.22, 0.12.23, 0.12.24 (#138)
 - fix(api/createJob): handle when savePlanOutput is undefined/null (#136)
 - fix(bump): Autobump armory commons and spinnaker release (#133)

#### Armory Clouddriver  - 07ce2a12...ef9da881
 - fix(spinnakerBump): AutoBump Spinnaker Versions/ArmoryCommons Ve… (#102)

#### Armory Deck  - 5c34e55b...e8ded5b9
 - fix(bump): Autobump armory commons and spinnaker release (#591)
 - fix(mptv2): restore feature flag (bp #586) (#587)

#### Armory Echo  - 9ac67cce...43e1966a
 - fix(bump): Autobump armory commons and spinnaker release (#150)

#### Armory Fiat  - a75473f4...a955c640
 - fix(bump): Autobump armory commons and spinnaker release (#44)

#### Armory Front50  - 51451737...eaeb2a64
 - fix(bump): Autobump armory commons and spinnaker release (#51)

#### Armory Gate  - 771300da...61291021
 - fix(bump): Autobump armory commons and spinnaker release (#105)

#### Armory Igor  - 360d9491...8cbc70d2
 - fix(bump): Autobump armory commons and spinnaker release (#56)
 - fix(cve): CVE-2020-11612 (bp #55) (#57)

#### Armory Kayenta  - 527c4dc4...c04d2e7c
 - fix(bump): Autobump armory commons and spinnaker release (#63)

#### Armory Orca  - 685ae010...85dbdae9
 - fix(bump): Autobump armory commons and spinnaker release (#91)

#### Armory Rosco  - 6e6f34c3...2d6fdf58
 - fix(gradle): update spinnaker release (#44)



###  Spinnaker Community Contributions
<!-- UNCOMMENT ME and add these by hand:
See the Open Source Spinnaker Release Notes for the versions included in this release:

[Spinnaker's v1.8.0](https://www.spinnaker.io/community/releases/versions/1-8-0-changelog#individual-service-changes)  
[Spinnaker's v1.8.1](https://www.spinnaker.io/community/releases/versions/1-8-1-changelog#individual-service-changes)  
