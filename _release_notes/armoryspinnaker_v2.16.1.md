---
layout: post
title: v2.16.1 Armory Release (OSS Release 1.16.3)
order: -21620191017014817
hidden: false
---

# 10/17/19 Release Notes
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
* [Spinnaker's v1.16.3](https://www.spinnaker.io/community/releases/versions/1-16-3-changelog)  

<br>

## Detailed Updates


### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.16.1-rc833
timestamp: "2019-10-17 00:53:59"
services:
  clouddriver:
    version: 6.3.2-9db8e9d-9dae9f4-rc11
  deck:
    version: 2.12.2-f0fdf1e-a546982-rc23
  dinghy:
    version: 0.0.4-defad9b-rc997
  echo:
    version: 2.8.1-16a503d-55a1580-rc9
  fiat:
    version: 1.7.0-84d2119-e92cfbc-rc4
  front50:
    version: 0.19.0-195043d-abc5c16-rc4
  gate:
    version: 1.12.1-83b97ab-2cdf6f9-rc8
  igor:
    version: 1.6.0-3a56ef6-c9bbca8-rc7
  kayenta:
    version: 0.11.0-b2d0be0-8aa41e6-rc5
  monitoring-daemon:
    version: 0.15.0-f626bb6-rc128
  monitoring-third-party:
    version: 0.15.0-f626bb6-rc128
  orca:
    version: 2.10.1-4517040-8855208-rc16
  rosco:
    version: 0.14.0-368e336-338a41d-rc8
  terraformer:
    version: 0.0.2-6703356-rc2
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - 9b3b84f...defad9b
 - chore(build): Update oss dinghy dependency (#190)
 - fix(makeSlice): makeSlice added to HCL/Yaml (#189)

#### Terraformer&trade; - c0605a2...6703356
 - Update Dockerfile (#90)

#### Armory Clouddriver  - 9db8e9d
No Changes

#### Armory Deck  - 896d15d...f0fdf1e
 - fix(kayenta): update yarn.lock for NewRelic (#526)

#### Armory Echo  - 16a503d
No Changes

#### Armory Fiat  - 84d2119
No Changes

#### Armory Front50  - 195043d
No Changes

#### Armory Gate  - 83b97ab
No Changes

#### Armory Igor  - a3f5664...3a56ef6
No Changes

#### Armory Kayenta  - b2d0be0
No Changes

#### Armory Orca  - 4517040
No Changes

#### Armory Rosco  - 368e336
No Changes

### Armory Open Core
#### Dinghy (Open Core) 7072f60..8f0abe1
 - fix(debug): Log fatal Redis error (#73)

###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release: 

[Spinnaker 1.16.3](https://www.spinnaker.io/community/releases/versions/1-16-3-changelog#individual-service-changes)  

#### Clouddriver  - 031bcec...9dae9f4
 - fix(kubernetes/v1): Fix NPE in autoscaler caching (#4096)
 - fix(kubernetes): Fix matching of artifacts in deploy/patch stages (#4078) (#4079)
 - fix(cf): when scaling cf disabled SG we should use max capacity (#4067) (#4068)
 - fix(dockerfile): use deterministic version for kubectl (#4064) (#4065)
 - fix(kotlin): spring config classes shouldn't use constructors (#4054) (#4059)
 - fix(kubernetes): Fix missing API versions (#4057)

#### Deck  - b0aac47...a546982
 - fix(artifact/bitbucket): Bitbucket Use Default Artifact (#7523) (#7535)
 - fix(kubernetes): add missing `app` config param for patch manifest stages (#7521) (#7522)
 - fix(bakeManifest/helm): rawOverrides option (#7514) (#7517)
 - fix(core/pipeline): KLUDGE: use react 'key' to reinitialize formik when pipeline reverted (#7500)
 - fix(core): Separate how config and plans are updated, add tests (#7491) (#7494)
 - fix(pipeline): triggers were not reverting in the ui (#7485) (#7490)
 - fix(artifacts/bitbucket): Update the help key to the correct reference to bitbucket (#7475) (#7482)
 - fix(bakeManifest): fix bake manifest UI rendering (#7463) (#7465)
 - fix(artifacts/bitbucket): Allow updates to bitbucket default artifact text input (#7469)
 - fix(kubernetes): Fix merge strategy field (#7455) (#7457)
 - fix(pipeline): unset `locked` instead of `lock` when unlocking pipeline (#7445) (#7446)
 - fix(core/pipeline): "Depends On" doesn't always update when reverting (#7441) (#7443)
 - fix(core/pipeline): Fix revert button for non-templated pipelines (#7440) (#7442)
 - fix(core/pipeline): Don't break templated pipelines when updating config (#7428) (#7430)
 - fix(core/pipeline): Fix revert button regression for templated pipelines (#7427) (#7429)

#### Echo  - 7aae214...55a1580
 - fix(triggers): add missing docker properties to trigger model (#669) (#670)
 - fix(build): whitelist build package to avoid being ignored by gcloud cloudbuild (#657) (#661)

#### Fiat  - e92cfbc
No Changes

#### Front50  - abc5c16
No Changes

#### Gate  - fd0128a...2cdf6f9
 - fix(oauth2): Add before filter to fix basic auth (#899) (#912)

#### Igor  - c9bbca8
No Changes

#### Kayenta  - 8aa41e6
No Changes

#### Orca  - 7b4e3dd...8855208
 - fix(bakeManifest): add option for rawOverrides (#3225) (#3226)
 - fix(cfn): Return RUNNING if an error occurred (#3210) (#3216)
 - fix(cf): cf rolling red black did not resize old SG correctly (#3211) (#3212)
 - fix(webhook): Don't try to deserialize fields we don't really nâ€¦ (#3202) (#3207)
 - fix(SpEL): Execution context injected into expressions dynamically (#3142) (#3183)
 - fix(google): fix scale down cluster task in gce red/black (#3177) (#3179)

#### Rosco  - cfb88bb...338a41d
 - fix(bakeManifest): helm --set option (#441) (#445)
 - fix(helm): Fix baking of helm artifacts (#442) (#443)
 - fix(bakeManifest): revert to set-string (#439) (#440)
