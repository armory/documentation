---
layout: post
title: v2.5.1 Armory Release (OSS Release 1.14.4)
order: -20190611211700
hidden: false
---

# 06/11/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
* Igor and Clouddriver do not properly import `armory-commons` in this release. As a result, these services will fail to start when `Vault Secrets` are enabled.
* SAML timeout cannot be overridden in this release

Please upgrade to `Armory Spinnaker 2.5.3`

## Highlighted Updates
### Armory

* Terraformer now allows for `plan` output to be used in later stages
* Deck now properly displays ECS `Configure Cluster Deployment` wizard


###  Spinnaker Community Contributions

[Spinnaker 1.14.4 Release Notes](https://www.spinnaker.io/community/releases/versions/1-14-4-changelog)


<br><br><br>
## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.5.1-rc179
timestamp: "2019-06-11 21:04:24"
services:
  clouddriver:
    version: 4.6.0-b343903-deec487-rc111
  deck:
    version: 2.0.0-6fedca0-b1f75ef-rc13
  dinghy:
    version: 0.0.3-4c4879c-rc7
  echo:
    version: 2.5.0-445f4ca-e68a464-rc114
  fiat:
    version: 1.5.0-7c1b280-381db2c-rc103
  front50:
    version: 0.17.0-18ed588-0540599-edge5
  gate:
    version: 1.8.2-4106a87-ee90e98-rc103
  igor:
    version: 1.3.0-15850d3-b3f354f-rc104
  kayenta:
    version: 0.8.1-39c3a6b-cf89374-edge5
  monitoring-daemon:
    version: 0.13.0-bf01bf2-rc1
  monitoring-third-party:
    version: 0.13.0-bf01bf2-rc1
  orca:
    version: 2.7.2-bdb4a78-026a6d1-rc110
  rosco:
    version: 0.12.0-e1fc510-59f7929-edge5
  terraformer:
    version: 0.0.1-e745818-rc14
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>


### Armory
#### Dinghy&trade; - 4c4879c
No Changes

#### Terraformer&trade; - 71c7209...e745818
 - feat(planfiles): persist plan output for later use in stage (#70)

#### Armory Clouddriver  - b343903
No Changes

#### Armory Deck  - 9e49836...6fedca0
 - fix(azure): resolve ecs/azure modules conflict

#### Armory Echo  - 95a01ea...445f4ca
 - fix(alpn): Enable ALPN in the Alpine container (#106)

#### Armory Fiat  - 7c1b280
No Changes

#### Armory Front50  - 18ed588
No Changes

#### Armory Gate  - 4106a87
No Changes

#### Armory Igor  - 15850d3
No Changes

#### Armory Kayenta  - 39c3a6b
No Changes

#### Armory Orca  - fd7fa3e...bdb4a78
 - feat(artifacts): terraformer produces artifacts, grab them (#44)

#### Armory Rosco  - e1fc510
No Changes



###  Spinnaker Community Contributions

See Spinnaker's release notes that are included in this release:  
* [Spinnaker 1.14.4 Release Notes](https://www.spinnaker.io/community/releases/versions/1-14-4-changelog)

#### Clouddriver  - 07db9e9...deec487
 - fix(ecs): Don't specify load balancer role for non-load-balanced service (#3740) (#3759)
 - fix(appengine): Use getOutput() instead of getStdOut(). (#3771) (#3772)

#### Deck  - b1f75ef
No Changes

#### Echo  - e23ee15...e68a464
 - fix(webhooks): bitbucket server or cloud determination (#572) (#575)

#### Fiat  - 381db2c
No Changes

#### Front50  - 0540599
No Changes

#### Gate  - ee90e98
No Changes

#### Igor  - b3f354f
No Changes

#### Kayenta  - cf89374
No Changes

#### Orca  - 6ceeba0...026a6d1
 - fix(gcb): Bind artifacts produced from GCB stage

#### Rosco  - 59f7929
No Changes
