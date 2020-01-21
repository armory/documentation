---
layout: post
title: v2.17.1 Armory Release (OSS Release 1.17.2)
order: -21720191122181919
hidden: false
---

# 11/22/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Known Issues
There are currently no known issues with this release.

## Highlighted Updates
### Armory

This release fixes an issue in Armory Spinnaker `2.17.0` with Kayenta not starting properly.

###  Spinnaker Community Contributions
<br>

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.17.1-rc362
timestamp: "2019-11-22 17:48:46"
services:
  clouddriver:
    version: 6.4.0-daa86fe-e192026-rc8
  deck:
    version: 2.13.1-5f346cf-137f539-rc13
  dinghy:
    version: 0.0.4-defad9b-rc330
  echo:
    version: 2.9.0-4f2b8ee-acca50a-rc8
  fiat:
    version: 1.8.1-9f554ae-47a6a00-rc7
  front50:
    version: 0.20.0-e1a3aa0-9415a44-rc5
  gate:
    version: 1.13.0-6c154ae-a453541-rc25
  igor:
    version: 1.7.0-bbde849-37fe1ed-rc6
  kayenta:
    version: 0.12.0-6b89afd-5dcec80-rc8
  monitoring-daemon:
    version: 0.16.0-59cbbec-edge2
  monitoring-third-party:
    version: 0.16.0-59cbbec-edge2
  orca:
    version: 2.11.0-ccfcee7-ed38c00-rc8
  rosco:
    version: 0.15.0-f8aa480-2f92d63-rc7
  terraformer:
    version: 0.0.2-4145425-rc5
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - defad9b
No Changes

#### Terraformer&trade; - e11852d...4145425
 - feat(redis): add password field to redis config (#97)
 - chore(secrets): use latest go-yaml-tools secrets (#96)

#### Armory Clouddriver  - daa86fe
No Changes

#### Armory Deck  - 89149ff...5f346cf
 - refactor(code): clean up work (#537)

#### Armory Echo  - 4f2b8ee
No Changes

#### Armory Fiat  - 9f554ae
No Changes

#### Armory Front50  - e1a3aa0
No Changes

#### Armory Gate  - 6c154ae
No Changes

#### Armory Igor  - bbde849
No Changes

#### Armory Kayenta  - ec111bd...6b89afd
 - chore(build): pin kork version (#35)

#### Armory Orca  - ccfcee7
No Changes

#### Armory Rosco  - f8aa480
No Changes

### Armory Open Core
#### Dinghy (Open Core) - 960a6240
No Changes


###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release:

[Spinnaker 1.17.2](https://www.spinnaker.io/community/releases/versions/1-17-2-changelog#individual-service-changes)

#### Clouddriver  - e192026
No Changes

#### Deck  - 17d3ea2...137f539
 - fix(azure,gce): Fix typo breaking bake stage (#7631) (#7639)

#### Echo  - acca50a
No Changes

#### Fiat  - 9dcab2c...47a6a00
 - fix(roles): file-based roles fail when the user is not provided in the file (#508) (#509)

#### Front50  - 9415a44
No Changes

#### Gate  - a453541
No Changes

#### Igor  - 37fe1ed
No Changes

#### Kayenta  - 5dcec80
No Changes

#### Orca  - ed38c00
No Changes

#### Rosco  - 2f92d63
No Changes
