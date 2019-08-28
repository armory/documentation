---
layout: post
title: v2.15.2 Armory Release (OSS Release 1.15.3)
order: -21520190827235723
hidden: false
---

# 08/27/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
There are currently no known issues with this release.

## Highlighted Updates

This release addresses the slow cache warm up time of `Clouddriver` when configured with a `Docker Registry` containing a large number of images and tags.

### Armory

###  Spinnaker Community Contributions
[Spinnaker 1.15.3 Release Notes](https://www.spinnaker.io/community/releases/versions/1-15-3-changelog)  

<br>
## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.15.2-rc887
timestamp: "2019-08-27 23:13:58"
services:
  clouddriver:
    version: 6.2.0-9db8e9d-7a485ae-rc27
  deck:
    version: 2.10.2-8850beb-09e4382-rc20
  dinghy:
    version: 0.0.4-cd9d1cc-rc847
  echo:
    version: 2.6.0-16a503d-6160b79-rc15
  fiat:
    version: 1.6.1-84d2119-fced26e-rc15
  front50:
    version: 0.18.0-195043d-a8c2462-rc18
  gate:
    version: 1.10.0-5b9fb1b-a9ee8eb-rc16
  igor:
    version: 1.4.0-a3f5664-3245969-rc16
  kayenta:
    version: 0.10.1-1a6b0ea-6a3c60f-rc20
  monitoring-daemon:
    version: 0.14.0-a37ddce-rc6
  monitoring-third-party:
    version: 0.14.0-a37ddce-rc6
  orca:
    version: 2.8.2-9605212-a55e367-rc18
  rosco:
    version: 0.13.0-7b4de48-f01311c-rc20
  terraformer:
    version: 0.0.2-5bf57b6-rc4
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - 5cb920e...cd9d1cc
 - fix(tests): update tests to account for refactored code (#185)

#### Terraformer&trade; - 63b5d5c...5bf57b6
 - chore(yaml): update go-yaml-tools (#89)

#### Armory Clouddriver  - 9db8e9d
No Changes

#### Armory Deck  - 8850beb
No Changes

#### Armory Echo  - 16a503d
No Changes

#### Armory Fiat  - 84d2119
No Changes

#### Armory Front50  - 318214b...195043d
 - chore(build): Artifactory support (#20)

#### Armory Gate  - 83b6e52...5b9fb1b
 - refactor(gradle): Artifactory (#71)

#### Armory Igor  - 0dbfd5e...a3f5664
 - chore(build): support artifactory (#30)

#### Armory Kayenta  - 1a6b0ea
No Changes

#### Armory Orca  - 9605212
No Changes

#### Armory Rosco  - 7b4de48
No Changes

### Armory Open Core

#### Dinghy (Open Core) 1214a73...d62dc4a
 - fix(security): Redact logging of secrets on start (#68)
 - fix(module): Template repo always uses master (#67)

###  Spinnaker Community Contributions

#### Clouddriver  - ad713a7...7a485ae
 - perf(docker): Use parallel streams for caching docker images

#### Deck  - 09e4382
No Changes

#### Echo  - 6160b79
No Changes

#### Fiat  - fced26e
No Changes

#### Front50  - a8c2462
No Changes

#### Gate  - a9ee8eb
No Changes

#### Igor  - 3245969
No Changes

#### Kayenta  - 6a3c60f
No Changes

#### Orca  - a55e367
No Changes

#### Rosco  - f01311c
No Changes
