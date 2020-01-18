---
layout: post
title: v2.17.4 Armory Release (OSS Release 1.17.6)
order: -21720200118001905
hidden: false
---

# 01/18/20 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
There are currently no known issues with this release.

## Highlighted Updates
### Armory
This release includes the following:

- TLS and mTLS support added to Terraformer and Dinghy services
- Terraformer UI/UX improvements for displaying logs
- Forces the correct `aws-sdk` version to be used (known issue in `2.17.2` and `2.17.3`)

###  Spinnaker Community Contributions

No changes to report. 

<br>

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.17.4-rc3328
timestamp: "2020-01-17 23:44:14"
services:
  clouddriver:
    version: 6.4.4-37fca53-5f272cd-rc1067
  deck:
    version: 2.13.4-93a8f76-75cecc4-rc251
  dinghy:
    version: 0.0.4-0f8317f-rc1676
  echo:
    version: 2.9.1-c413c8a-771a15b-rc591
  fiat:
    version: 1.8.3-940de73-c62d038-rc1067
  front50:
    version: 0.20.1-ce3824b-9415a44-rc1064
  gate:
    version: 1.13.0-a14ec61-a453541-rc1871
  igor:
    version: 1.7.0-182a383-37fe1ed-rc910
  kayenta:
    version: 0.12.0-d49aed7-5dcec80-rc821
  monitoring-daemon:
    version: 0.16.0-59cbbec-rc543
  monitoring-third-party:
    version: 0.16.0-59cbbec-rc543
  orca:
    version: 2.11.2-a6e8420-b88f62a-rc951
  rosco:
    version: 0.15.1-5ac82a7-269dc83-rc903
  terraformer:
    version: 0.0.2-26397ae-rc15
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - defad9b...0f8317f
 - feat(server): Add support for TLS and mTLS (#191)

#### Terraformer&trade; - 7b64a33...26397ae
 - fix(output): output an empty string for nil errors instead of aâ€¦ (#106)
 - fix(gitrepo): support branches prefixed with refs/heads/... (#107)
 - feat(mTLS): Add support for (m)TLS (#108)

#### Armory Clouddriver  - 37fca53
No Changes

#### Armory Deck  - f6026b5...93a8f76
 - fix(terraform): order logs and refresh when console output link is clicked (#563)
 - fix(terraform): only show subdirectory if field is set (#562)

#### Armory Echo  - c413c8a
No Changes

#### Armory Fiat  - 940de73
No Changes

#### Armory Front50  - ce3824b
No Changes

#### Armory Gate  - a14ec61
No Changes

#### Armory Igor  - 182a383
No Changes

#### Armory Kayenta  - d49aed7
No Changes

#### Armory Orca  - a6e8420
No Changes

#### Armory Rosco  - 5ac82a7
No Changes

### Armory Open Core
#### Dinghy (Open Core) - e977717...7dfd930
 - feat(mTLS): Add mTLS options and server configuration (#76)

###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release:

[Spinnaker 1.17.6](https://www.spinnaker.io/community/releases/versions/1-17-6-changelog#individual-service-changes)

#### Clouddriver  - 5f272cd
No Changes

#### Deck  - 75cecc4
No Changes

#### Echo  - 771a15b
No Changes

#### Fiat  - c62d038
No Changes

#### Front50  - 9415a44
No Changes

#### Gate  - a453541
No Changes

#### Igor  - 37fe1ed
No Changes

#### Kayenta  - 5dcec80
No Changes

#### Orca  - b88f62a
No Changes

#### Rosco  - 269dc83
No Changes
