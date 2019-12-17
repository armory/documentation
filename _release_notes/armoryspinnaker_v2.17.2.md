---
layout: post
title: v2.17.2 Armory Release (OSS Release 1.17.5)
order: -21720191216230858
hidden: false
---

# 12/16/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
There are currently no known issues with this release.

## Highlighted Updates
### Armory

This release includes the following: 

* Alpha release of `Terraformer` UI
* Dynatrace provider support in Kayenta


###  Spinnaker Community Contributions
* Kubernetes provider: fixes NullPointerException on NetworkPolicies with ingresses with null ports
* SQL support: fixes table names with long type names
<br>

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.17.2-rc2072
timestamp: "2019-12-16 22:39:25"
services:
  clouddriver:
    version: 6.4.4-daa86fe-22f8150-rc1001
  deck:
    version: 2.13.2-0ca8441-12edf0a-rc216
  dinghy:
    version: 0.0.4-defad9b-rc904
  echo:
    version: 2.9.0-4f2b8ee-acca50a-rc560
  fiat:
    version: 1.8.3-9f554ae-c62d038-rc1001
  front50:
    version: 0.20.1-e1a3aa0-9415a44-rc998
  gate:
    version: 1.13.0-45ca2bb-a453541-rc1077
  igor:
    version: 1.7.0-bbde849-37fe1ed-rc844
  kayenta:
    version: 0.12.0-6c2fb5a-5dcec80-rc754
  monitoring-daemon:
    version: 0.16.0-59cbbec-rc503
  monitoring-third-party:
    version: 0.16.0-59cbbec-rc503
  orca:
    version: 2.11.2-dd253cf-b88f62a-rc883
  rosco:
    version: 0.15.1-f8aa480-269dc83-rc873
  terraformer:
    version: 0.0.2-9c5c667-rc8
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

#### Terraformer&trade; - 4145425...9c5c667
 - feat(versions): add api for versions (#101)
 - feat(metrics): replace prometheus with armory-io/spectator (#100)
 - chore(readme): update readme and example request (#99)

#### Armory Clouddriver  - daa86fe
No Changes

#### Armory Deck  - 5f346cf...0ca8441
 - feat(terraform): execution details ui (#548)
 - feat(versions): source terraform versions from API (#547)
 - feat(terraform): add stage config (#545)
 - feat(terraform): define and export terraform stage (#541)

#### Armory Echo  - 4f2b8ee
No Changes

#### Armory Fiat  - 9f554ae
No Changes

#### Armory Front50  - e1a3aa0
No Changes

#### Armory Gate  - 6c154ae...45ca2bb
 - feat(versions-api): add the terraform versions api (#80)
 - feat(terraformer): add api endpoints for terraform (#79)

#### Armory Igor  - bbde849
No Changes

#### Armory Kayenta  - 6b89afd...6c2fb5a
 - feat(kayenta): dyna integration (#37)

#### Armory Orca  - ccfcee7...dd253cf
 - fix(terraform): surface errors from job status (#54)

#### Armory Rosco  - f8aa480
No Changes

### Armory Open Core
#### Dinghy (Open Core) - e977717
No Changes


###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release:

[Spinnaker 1.17.5](https://www.spinnaker.io/community/releases/versions/1-17-5-changelog#individual-service-changes)

#### Clouddriver  - e192026...22f8150
 - fix(cfn): do not add roleARN if empty or null (#4206) (#4220)
 - fix(ecs): reject task def artifact if it contains unknown properties (#4211) (#4219)
 - fix(cats/sql): fix table names with long type names (#4166) (#4207)
 - fix(kubernetes): do not throw NPE on NetworkPolicies with ingresses with null ports (#4182) (#4186)
 - fix(kubernetes): do not throw NPE on NetworkPolicies with null ingress and egress (#4172) (#4173)
 - fix(kubernetes): Add missing limitrange kind (#4170) (#4174)

#### Deck  - 137f539...12edf0a
 - fix(core): fix npe on first project cluster creation (#7673) (#7675)

#### Echo  - acca50a
No Changes

#### Fiat  - 47a6a00...c62d038
 - fix(serviceAccount): Filter non-valid roles when converting to UserPermission (#513) (#514)

#### Front50  - 9415a44
No Changes

#### Gate  - a453541
No Changes

#### Igor  - 37fe1ed
No Changes

#### Kayenta  - 5dcec80
No Changes

#### Orca  - ed38c00...b88f62a
 - fix(execution): Resume parent pipeline when a failed stage in a child pipeline restarts (#3317) (#3340)
 - fix(cfn): include credentials on the task sent to clouddriver (#3323) (#3332)

#### Rosco  - 2f92d63...269dc83
 - fix(gce): Hardcode Trusty GCE image in halconfig/images.yml (#473)
 - fix(gce): Hardcode last published version of Trusty base image, add deprecation language, and add Bionic as option (#471)
