---
layout: post
title: v2.15.1 Armory Release (OSS Release 1.15.2)
order: -21520190826232221
hidden: false
---

# 08/26/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
* `Clouddriver` caching of `Docker Registry` tags is slow in this release. Registries containing a large number of tags **(> 1000)** will result in `docker triggers` not properly triggering until caching is complete -- which might take 10 minutes or more.

> Note: Updating to OSS 1.15.x created an issue with the secrets config in Clouddriver and Echo. Armory Halyard 1.6.5 fixes this issue. Please update your Halyard to 1.6.5 or later:
`sudo update-halyard --version 1.6.5`

## Highlighted Updates
### Armory
This release fixes an issue where the `clouddriver-ro` pod fails to start when using Vault secrets with HA Clouddriver enabled.

###  Spinnaker Community Contributions
[Spinnaker 1.15.2 Release Notes](https://www.spinnaker.io/community/releases/versions/1-15-2-changelog)  

<br>

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.15.1-rc876
timestamp: "2019-08-26 16:13:58"
services:
  clouddriver:
    version: 6.1.0-9db8e9d-ad713a7-rc25
  deck:
    version: 2.10.2-8850beb-09e4382-rc20
  dinghy:
    version: 0.0.4-5cb920e-rc815
  echo:
    version: 2.6.0-16a503d-6160b79-rc14
  fiat:
    version: 1.6.1-84d2119-fced26e-rc14
  front50:
    version: 0.18.0-318214b-a8c2462-rc16
  gate:
    version: 1.10.0-83b6e52-a9ee8eb-rc14
  igor:
    version: 1.4.0-0dbfd5e-3245969-rc14
  kayenta:
    version: 0.10.1-1a6b0ea-6a3c60f-rc19
  monitoring-daemon:
    version: 0.14.0-a37ddce-rc6
  monitoring-third-party:
    version: 0.14.0-a37ddce-rc6
  orca:
    version: 2.8.2-9605212-a55e367-rc17
  rosco:
    version: 0.13.0-7b4de48-f01311c-rc19
  terraformer:
    version: 0.0.2-63b5d5c-edge2
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - 9ccc528...5cb920e
 - fix(yaml): Change how we sub modules in preprocess (#184)

#### Terraformer&trade; - 63b5d5c
No Changes

#### Armory Clouddriver  - 1862b8b...9db8e9d
No Changes

#### Armory Deck  - 1c65f72...8850beb
No Changes

#### Armory Echo  - 7f44a96...16a503d
No Changes

#### Armory Fiat  - b557350...84d2119
No Changes

#### Armory Front50  - 318214b
No Changes

#### Armory Gate  - 83b6e52
No Changes

#### Armory Igor  - 0dbfd5e
No Changes

#### Armory Kayenta  - 83f4056...1a6b0ea
No Changes

#### Armory Orca  - 62b8988...9605212
No Changes

#### Armory Rosco  - d7a038b...7b4de48
No Changes

### Armory Open Core

#### Dinghy (Open Core) 1214a73...d62dc4a
 - fix(network): catch only 404. if there's some other kind of error, don't continue (#66)
 - fix(configurablebranches): fix branch name comparison (#65)
 - chore(config): refactor config handling (#51)
 - fix(parse): If templateOrg not configured, error. (#64)
 - fix(errs): bubble up module errors to caller (#63)
 - fix(errs): err -> debug for benign cache lookup issues (#62)
 - feat(pushData): surface push into dinghy template (#61)

###  Spinnaker Community Contributions

#### Clouddriver  - ad713a7
No Changes

#### Deck  - 39a74be...09e4382
 - fix(gce): remove use of ONLY_DOWN deprecated autoscaler policy (#7310) (#7315)
 - fix(kubernetes): allow base64 manifests in deploy stage (#7298) (#7303)
 - fix(kayenta): bump deck-kayenta to 0.0.85 to include fixes (#7297)

#### Echo  - 4aae0bc...6160b79
 - fix(notifications/googlechat): Fix field visibility. (#622) (#623)

#### Fiat  - fced26e
No Changes

#### Front50  - e6c5f94...a8c2462
 - fix(web): Better handling when `ApplicationPermissionDAO` does not exist (#579) (#580)

#### Gate  - 193c7b9...a9ee8eb
 - fix(x509): check if fiat is enabled before fetching permissions on x509 login (#875) (#876)
 - Allow overriding maxAuthenticationAge (#861) (#865)

#### Igor  - 3245969
No Changes

#### Kayenta  - 6a3c60f
No Changes

#### Orca  - 2661d79...a55e367
 - fix(kotlin): spring config classes shouldn't use constructors (#3030) (#3100)
 - fix(runJob): inject manifest fcr for k8s runjob (#3090) (#3094)
 - fix(gce): remove use of ONLY_DOWN deprecated autoscaler policy (#3087) (#3093)

#### Rosco  - f01311c
No Changes
