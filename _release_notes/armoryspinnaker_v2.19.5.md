---
layout: post
title: v2.19.5 Armory Release (OSS Release 1.19.5)
order: -21920200417225655
hidden: false
---

# 04/17/20 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Breaking Changes

### Required Halyard version

Armory Spinnaker 2.19.x requires Armory Halyard 1.8.3 or later.


### HTTP sessions for Gate

Armory Spinnaker 2.19.x and later include an upgrade to the Spring Boot dependency. This requires you to flush all the Gate sessions for your Spinnaker deployment if you are upgrading from a version before 2.19.4. For more information, see [Flushing Gate Sessions](https://kb.armory.io/admin/flush-gate-sessions/).



## Known Issues
There are currently no known issues with this release.



## Highlighted Updates
### Armory
Highlighted Updates describe some of the major changes in this release. Highlights specific to Armory Spinnaker for this release include:

**CVE**

Fixed a recently discovered CVE that affects Igor: `CVE-2020-11612`.

**Managed Pipeline Templates v2 UI**

Armory Spinnaker 2.19.x contains the latest version of Managed Pipeline Templates v2 (MPTv2), which is the default pipeline templating solution offered in OSS Spinnaker. 

Armory recommends using Armory's Pipeline as Code feature instead of MPTv2 because it offers the following benefits:

* Integration with GitHub, GitLab and BitBucket enabling teams to store pipelines with application code
* Templates and access to the templates can be stored and managed separately from pipelines
* The ability to compose complex templates and pipelines from modules

Note that Armory's Pipeline as Code and the open source Managed Pipeline Templates are not integrated and do not work together.

By default, the MPTv2 UI is disabled in Armory Spinnaker 2.19.5. Leaving the UI disabled maintains the same experience you had with Armory Spinnaker 2.18.x (OSS 1.18.x).

If you want to enable the MPTv2 UI, see [Enabling the Managed Pipeline Templates UI](https://kb.armory.io/admin/enable-mptv2/).

###  Spinnaker Community Contributions

See the release notes for [2.19.4](/release-notes/armoryspinnaker_v2.19.4/) for the Spinnaker Community Contributions for Armory Spinnaker 2.19.x (OSS 1.19.x).

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.19.5
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
#### Terraformer&trade; - f498d00e...f3edd3da
 - fix(api/createJob): make sure to init a runner (#139)
 - feat(terraform/versions): 0.12.21, 0.12.22, 0.12.23, 0.12.24 (#138)
 - fix(api/createJob): handle when savePlanOutput is undefined/null (#136)

#### Armory Deck  - 5c34e55b...e8ded5b9
 - fix(mptv2): restore feature flag (bp #586) (#587)

#### Armory Igor  - 360d9491...8cbc70d2
 - fix(cve): CVE-2020-11612 (bp #55) (#57)



###  Spinnaker Community Contributions

<<<<<<< HEAD
[Spinnaker's v1.19.5](https://www.spinnaker.io/community/releases/versions/1-19-5-changelog#individual-service-changes)  
=======
See the Open Source Spinnaker Release Notes for the versions included in this release:  

* [Spinnaker's v1.19.0](https://www.spinnaker.io/community/releases/versions/1-19-5-changelog#spinnaker-release-1-19-0)  
* [Spinnaker's v1.19.1](https://www.spinnaker.io/community/releases/versions/1-19-5-changelog#spinnaker-release-1-19-1)  
* [Spinnaker's v1.19.2](https://www.spinnaker.io/community/releases/versions/1-19-5-changelog#spinnaker-release-1-19-2)
* [Spinnaker's v1.19.3](https://www.spinnaker.io/community/releases/versions/1-19-5-changelog#spinnaker-release-1-19-3)
* [Spinnaker's v1.19.4](https://www.spinnaker.io/community/releases/versions/1-19-5-changelog#spinnaker-release-1-19-4)
>>>>>>> add highlights
