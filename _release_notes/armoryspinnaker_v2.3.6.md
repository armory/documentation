---
layout: post
title: v2.3.6 Armory Release (OSS Release 1.12.x)
order: -20190513170043
hidden: false
---

# 05/13/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
There are currently no known issues with this release.


## Highlighted Updates
### Armory
This release improves logging output in Dinghy and addresses a regression in Dinghy functionality related to updating pipelines and their handling of `expected artifacts`. 

<br><br>
## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.3.6-rc462
timestamp: "2019-05-11 22:19:23"
services:
  clouddriver:
    version: 4.3.9-ccad514-44e0457-rc182
  deck:
    version: 2.7.9-3278985-851847e-rc31
  dinghy:
    version: 0.0.3-03c1637-rc59
  echo:
    version: 2.3.1-95870b0-5db9d43-rc136
  fiat:
    version: 1.3.2-641cb40-daf21b2-rc184
  front50:
    version: 0.15.2-18ed588-3105e86-rc109
  gate:
    version: 1.5.3-68ad717-aa01759-rc179
  igor:
    version: 1.1.1-cb9b244-63d06a5-rc176
  kayenta:
    version: 0.6.1-39c3a6b-81d906b-rc176
  monitoring-daemon:
    version: 0.11.2-232c84a-rc5
  monitoring-third-party:
    version: 0.11.2-232c84a-rc5
  orca:
    version: 2.4.2-f1b82e2-c488de1-rc178
  rosco:
    version: 0.10.0-e1fc510-af545ba-rc174
  terraformer:
    version: 0.0.1-ed701ec-rc10
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - 72d75ef...03c1637
 - fix(errors): make sure we log json parse errors (#165)
 - fix(pipeline): fix unmarshal error with pipeline type (#164)
 - chore(logging): add more logging around Dinghyfile struct (#163)
 - fix(pipelineID): fix refactor regression with pipline id in builder/render (#162)
 - fix(plank): pull in plank update to fix /applications route (#161)
 - feat(debug): show debug http requests (#160)
 - fix(plank): bump plank version (#159)
 - fix(errors): fix error printing, use newer plank client (#157)

#### Terraformer&trade; - ed701ec
No Changes

#### Armory Clouddriver  - 409682d...ccad514
 - chore(build): add armory-commons (#32)

#### Armory Deck  - 3278985
No Changes

#### Armory Echo  - 95870b0
No Changes

#### Armory Fiat  - 1c1379a...641cb40
 - chore(build): add armory-commons (#18)

#### Armory Front50  - 241c444...18ed588
 - chore(secrets): adding armory-commons (#17)

#### Armory Gate  - 8f87d50...68ad717
 - chore(build): add armory-commons (#62)

#### Armory Igor  - cb9b244
No Changes

#### Armory Kayenta  - d9c5148...39c3a6b
 - chore(build): add armory-commons (#26)

#### Armory Orca  - a2c5a38...f1b82e2
 - chore(build): add armory-commons (#34)

#### Armory Rosco  - cb75050...e1fc510
 - chore(build): add armory-commons (#15)



###  Spinnaker Community Contributions
<!-- UNCOMMENT ME:
See Spinnaker's release notes that are included in this release:  
[Spinnaker's v1.8.0](https://www.spinnaker.io/community/releases/versions/1-8-0-changelog#individual-service-changes)  
[Spinnaker's v1.8.1](https://www.spinnaker.io/community/releases/versions/1-8-1-changelog#individual-service-changes)  

<!-- UNCOMMENT ME: Changes listed below is are extra changes that have not yet made it to another Spinnaer release version: -->
<!-- You may need to pick out some extra contributions from OSS -->

#### Clouddriver  - 44e0457
No Changes

#### Deck  - 851847e
No Changes

#### Echo  - 5db9d43
No Changes

#### Fiat  - daf21b2
No Changes

#### Front50  - 3105e86
No Changes

#### Gate  - aa01759
No Changes

#### Igor  - 63d06a5
No Changes

#### Kayenta  - 81d906b
No Changes

#### Orca  - c488de1
No Changes

#### Rosco  - af545ba
No Changes
