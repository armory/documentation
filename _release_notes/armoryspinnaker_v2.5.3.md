---
layout: post
title: v2.5.3 Armory Release (OSS Release 1.14.9)
order: -20190716232158
hidden: false
---

# 07/16/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Known Issues

* non-gradle5 JDK services (`Front50`, `Kayenta`, and `Rosco`) do not support `K/V v2` with the `Kubernetes Secrets` engine in this release

Please upgrade to `Armory Spinnaker 2.5.4`

## Highlighted Updates
### Armory
<!--- A quick summary of what's changed with Armory -->
This release: 
* adds support for HCL and YAML as template formats for Dinghy
* adds support for K/V v2 for the Kubernetes Secrets engine
* updates Terraformer and Dinghy to natively decrypt secrets


###  Spinnaker Community Contributions
[Spinnaker 1.14.9 Release Notes](https://www.spinnaker.io/community/releases/versions/1-14-9-changelog)

<br>

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.5.3-rc558
timestamp: "2019-07-16 22:05:02"
services:
  clouddriver:
    version: 4.6.5-651caee-387dde5-rc126
  deck:
    version: 2.0.0-6fedca0-b1f75ef-rc13
  dinghy:
    version: 0.0.4-9cece7f-rc345
  echo:
    version: 2.5.1-7f44a96-afcbb51-rc118
  fiat:
    version: 1.5.1-b557350-ff44172-rc108
  front50:
    version: 0.17.0-bf00a4f-0540599-rc6
  gate:
    version: 1.8.2-83b6e52-935a334-rc107
  igor:
    version: 1.3.0-c3c7850-b3f354f-rc107
  kayenta:
    version: 0.9.0-39c3a6b-dd8a91d-rc7
  monitoring-daemon:
    version: 0.13.0-bf01bf2-rc1
  monitoring-third-party:
    version: 0.13.0-bf01bf2-rc1
  orca:
    version: 2.7.4-62b8988-8c46567-rc117
  rosco:
    version: 0.12.0-e1fc510-59f7929-edge5
  terraformer:
    version: 0.0.2-c845d1d-rc20
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - 4c4879c...9cece7f
 - feat(fiat): Enable Armory Endpoints (for Fiat) (#178)
 - feat(hcl): support hcl as a template format (#176)
 - feat(yaml): support yaml as template format for dinghy (#175)
 - feat(slack): Add slack notifications (#174)
 - chore(release): updates to handle new main func in open source (#172)

#### Terraformer&trade; - ab4618d...c845d1d
 - feat(secrets): support s3 and vault secret decryption (#75)
 - feat(targets): allow specifying specific targets during apply stage (#74)

#### Armory Clouddriver  - 651caee
No Changes

#### Armory Deck  - 6fedca0
No Changes

#### Armory Echo  - 445f4ca...7f44a96
 - fix(jira): Don't set up EchoController w/o Jira (#107)

#### Armory Fiat  - 7c1b280...b557350
 - fix(cache): force forceRefresh through endpoint (#22)

#### Armory Front50  - 18ed588...bf00a4f
 - feat(policy): add policy engine prototype to front50 (opa) (#18)

#### Armory Gate  - 83b6e52
No Changes

#### Armory Igor  - c3c7850
No Changes

#### Armory Kayenta  - 39c3a6b
No Changes

#### Armory Orca  - c73ed0e...62b8988
 - feat(targets): add target resource specifications to apply stage (#47)

#### Armory Rosco  - e1fc510
No Changes



###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release:  
* [Spinnaker 1.14.9 Release Notes](https://www.spinnaker.io/community/releases/versions/1-14-9-changelog)

#### Clouddriver  - 8607d42...387dde5
 - fix(appengine): check for null versions in servergroup caching agent (#3875) (#3878)
 - fix(appengine): Fix threading bugs in AppengineMutexRepository (#3862) (#3871)
 - fix(kubernetes): Fix daemonset stability condition (#3863) (#3864)
 - fix(deps): bump fiat version to 1.0.9 (#3842)
 - fix(SqlCache): modify typeSanitization regex to filter MySQL non-permitted chars (#3839) (#3841)
 - fix(kubernetes): Improve failure mode for unreachable cluster (#3770) (#3823)
 - fix(logging): add logstash-logback-encoder to runtimeClasspath (#3666) (#3817)
 - fix(appengine): Properly account for GCS object version in deploy (#3806) (#3807)

#### Deck  - b1f75ef
No Changes

#### Echo  - e68a464...afcbb51
 - fix(bitbucket): typo on eventType switch (#591) (#594)

#### Fiat  - 381db2c...ff44172
 - fix(core): add null check to auth in FiatPermissionEvaluator.getUsername (#435) (#436)
 - fix(core): add back isEnabled check to hasPermission method to prevent NPEs (#433) (#434)

#### Front50  - 0540599
No Changes

#### Gate  - 935a334
No Changes

#### Igor  - b3f354f
No Changes

#### Kayenta  - cf89374...dd8a91d
 - fix(templates): Escape custom inline templates. (#579) (#580)
 - feat(signalfx): Add configurable remote baseurls to support realms. (#551) (#566)

#### Orca  - 8c46567
No Changes

#### Rosco  - 59f7929
No Changes
