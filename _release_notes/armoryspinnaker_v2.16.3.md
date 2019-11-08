---
layout: post
title: v2.16.3 Armory Release (OSS Release 1.16.4)
order: -21620191108230433
hidden: false
---

# 11/08/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
There are currently no known issues with this release.

## Highlighted Updates
### Armory

###  Spinnaker Community Contributions
There have also been numerous enhancements, fixes and features across all of Spinnaker's other services. See their changes here:  
* [Spinnaker's v1.16.4](https://www.spinnaker.io/community/releases/versions/1-16-4-changelog)  

<br>

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.16.3-rc1395
timestamp: "2019-11-08 22:54:13"
services:
  clouddriver:
    version: 6.3.2-9db8e9d-bd1a453-rc12
  deck:
    version: 2.12.3-cbab764-96332ba-rc30
  dinghy:
    version: 0.0.4-defad9b-rc1547
  echo:
    version: 2.8.1-b8d5392-55a1580-rc10
  fiat:
    version: 1.7.0-84d2119-e92cfbc-rc4
  front50:
    version: 0.19.0-195043d-abc5c16-rc4
  gate:
    version: 1.12.1-6ce586c-2cdf6f9-rc9
  igor:
    version: 1.6.0-3a56ef6-5e6c31e-rc8
  kayenta:
    version: 0.11.0-f295c50-8aa41e6-rc6
  monitoring-daemon:
    version: 0.15.0-f626bb6-rc128
  monitoring-third-party:
    version: 0.15.0-f626bb6-rc128
  orca:
    version: 2.10.1-4517040-8855208-rc16
  rosco:
    version: 0.14.0-5936b02-338a41d-rc9
  terraformer:
    version: 0.0.2-e2d3b75-rc5
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

#### Terraformer&trade; - 6703356...e2d3b75
 - chore(metrics): impl basic monitoring interfaces (#94)
 - chore(build): add openssh and new terraform versions (#92)
 - chore(terraform): add 0.12.7 to available versions (#91)

#### Armory Clouddriver  - 9db8e9d
No Changes

#### Armory Deck  - f0fdf1e...cbab764
 - refactor(stepbystep): removed stepbystep (#531)
 - refactor(configurator): removed configurator (#530)
 
#### Armory Echo  - 16a503d...b8d5392
 - fix(dinghy): Added GitLab dinghy support (#109)

#### Armory Fiat  - 84d2119
No Changes

#### Armory Front50  - 195043d
No Changes

#### Armory Gate  - 83b97ab...6ce586c
 - feat(x509): support for x509 behind a trusted proxy (#74)

#### Armory Igor  - 3a56ef6
No Changes

#### Armory Kayenta  - b2d0be0...f295c50
 - feature(armoryJudge): create armory judge for static baseline (#31)

#### Armory Orca  - 4517040
No Changes

#### Armory Rosco  - 368e336...5936b02
 - feat(kustomize): upgrade binary v3.1.0 -> v3.3.0 (#20)

### Armory Open Core
#### Dinghy (Open Core) - 8f0abe1...960a6240
 - fix(custom_branch): branch configuration comparison (#74)


###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release: 

[Spinnaker 1.16.4](https://www.spinnaker.io/community/releases/versions/1-16-4-changelog#individual-service-changes)  

#### Clouddriver  - 9dae9f4...bd1a453
 - fix(runJob): fix output on multi container (#4102) (#4105)

#### Deck  - a546982...96332ba
 - fix(runJob): fix artifact output creation (#7579) (#7580)

#### Echo  - 55a1580
No Changes

#### Fiat  - e92cfbc
No Changes

#### Front50  - abc5c16
No Changes

#### Gate  - 2cdf6f9
No Changes

#### Igor  - c9bbca8...5e6c31e
 - fix(concourse): Fix caching of concourse build events (#525) (#530)

#### Kayenta  - 8aa41e6
No Changes

#### Orca  - 8855208
No Changes

#### Rosco  - 338a41d
No Changes
