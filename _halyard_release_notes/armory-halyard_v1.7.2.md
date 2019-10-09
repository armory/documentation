---
layout: post
title: v1.7.2 Armory Halyard (OSS 1.23)
order: -201910091114156
---

# 10/09/2019 Release Notes
{:.no_toc}

## Full Version
1.7.2-rc17 (OSS 1.23.0-e625604-stable2 build 17)

## Highlights
This release adds support for `Armory Halyard` to pull and deploy `OSS Spinnaker` releases.

The following configuration is required to deploy `OSS Spinnaker` releases.
<br>

### Set `spinnaker.config.gcs: enabled` in halyard.yml

```
## /opt/spinnaker/config/halyard.yml
.
.
.
spinnaker:
  artifacts:
    debian: https://dl.bintray.com/spinnaker-releases/debians
    docker: gcr.io/spinnaker-marketplace
  config:
    input:
      gcs:
        enabled: true
      writerEnabled: false
      bucket: halconfig
.
.
.      
```
## Stop Halyard
```
hal shutdown
```

## Set and deploy OSS Version with Halyard

```
hal config version edit --version ${OSS_VERSION}
hal deploy apply
```
See [OSS Releases](https://www.spinnaker.io/community/releases/versions/#latest-stable) for the latests Stable OSS releases

## Known Issues
No known issues

## Halyard Armory Enterprise Spinnaker
 - feat(deploy): Allow BOMs in GCS via spinnaker.config.input.gcs.enabled (#268)
 - fix(bom): Expire BOM cahe after 1m (#267)
 - feat(gitlab): Add Dinghy config for Gitlab (#266)

##  Halyard Community Contributions
 - fix(kubeconfig): Get contents of local kubeconfig files (#1425)
 - chore(core): Compile using the java compiler (#1432)
 - feat(canary): add newrelic as canary service (#1422)
 - fix(saml): make email address configurable (#1427)
 - chore(dependencies): Autobump korkVersion (#1426)
 - feat(secrets): Support SAML metadata as secret (#1411)
