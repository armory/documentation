---
layout: post
title: v2.5.7 Armory Release (OSS Release 1.14.12)
order: -20520190731213137
hidden: false
---

# 07/31/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
There are currently no known issues with this release.

<!--- Example of a problem
Igor added ..... which does.....

**Symptoms:**
**Fix:**
-->



## Highlighted Updates
### Armory
<!--- A quick summary of what's changed with Armory -->



###  Spinnaker Community Contributions
[Spinnaker 1.14.12 Release Notes](https://www.spinnaker.io/community/releases/versions/1-14-12-changelog)


<br><br><br>
## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.5.7-rc939
timestamp: "2019-07-31 21:05:13"
services:
  clouddriver:
    version: 4.7.0-88e5012-9e336dd-rc129
  deck:
    version: 2.0.0-fec48f6-b1f75ef-rc15
  dinghy:
    version: 0.0.4-9ccc528-rc710
  echo:
    version: 2.5.1-7f44a96-afcbb51-rc118
  fiat:
    version: 1.5.2-b557350-ff44172-rc109
  front50:
    version: 0.17.0-bf00a4f-0540599-rc11
  gate:
    version: 1.8.3-83b6e52-97f6477-rc109
  igor:
    version: 1.3.0-c3c7850-b3f354f-rc108
  kayenta:
    version: 0.9.1-39c3a6b-dd8a91d-rc11
  monitoring-daemon:
    version: 0.13.0-bf01bf2-rc1
  monitoring-third-party:
    version: 0.13.0-bf01bf2-rc1
  orca:
    version: 2.7.6-62b8988-3888a93-rc120
  rosco:
    version: 0.12.0-e1fc510-59f7929-rc9
  terraformer:
    version: 0.0.2-8361728-rc25
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - 8dfa005...9ccc528
 - fix(yaml): fix an issue with serializing yaml into something that can be converted to json (#182)

#### Terraformer&trade; - 8361728
No Changes

#### Armory Clouddriver  - 651caee...88e5012
 - feat(aws): upgrade awscli (#39) (#41)

#### Armory Deck  - fec48f6
No Changes

#### Armory Echo  - 7f44a96
No Changes

#### Armory Fiat  - b557350
No Changes

#### Armory Front50  - bf00a4f
No Changes

#### Armory Gate  - 83b6e52
No Changes

#### Armory Igor  - c3c7850
No Changes

#### Armory Kayenta  - 39c3a6b
No Changes

#### Armory Orca  - 62b8988
No Changes

#### Armory Rosco  - e1fc510
No Changes



###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release:  
[Spinnaker's v1.14.12](https://www.spinnaker.io/community/releases/versions/1-14-12-changelog#individual-service-changes)  

#### Clouddriver  - 9e336dd
No Changes

#### Deck  - b1f75ef
No Changes

#### Echo  - afcbb51
No Changes

#### Fiat  - ff44172
No Changes

#### Front50  - 0540599
No Changes

#### Gate  - 97f6477
No Changes

#### Igor  - b3f354f
No Changes

#### Kayenta  - dd8a91d
No Changes

#### Orca  - dfafeef...3888a93
 - fix(core): update validaton to exclude hyphenated variable names (#3066) (#3068)

#### Rosco  - 59f7929
No Changes
