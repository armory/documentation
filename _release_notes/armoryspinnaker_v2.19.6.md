---
layout: post
title: v2.19.6 Armory Release (OSS Release 1.19.5)
order: -21920200420212728
hidden: false
---

# 04/20/20 Release Notes
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

**Plugins**

This version of Spinnaker includes updates to how Deck is built. Previously, Deck's builds were non-deterministic, causing issues with loading plugins into the UI. Deck's builds are now deterministic and support UI plugins.





###  Spinnaker Community Contributions
The following highlights describe some of the major changes from the Spinnaker community for version OSS Release 1.19.5, which is included in this release of Armory Spinnaker 2.19:



<br><br><br>

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.19.6-rc.2
timestamp: "2020-04-20 20:57:37"
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
    commit: 2bb01d9e
    version: 2.19.5
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

#### Armory Deck  - e8ded5b9...4f6b2719
 - fix(build): don't strip comments, see https://github.com/spinnaker/deck/pull/8180

###  Spinnaker Community Contributions
See the Open Source Spinnaker Release Notes for the versions included in this release:

This version cherry-picks ![spinnaker/deck/pull/8180](https://github.com/spinnaker/deck/pull/8180)
