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
This release adds support for `Armory Halyard` to access [Bill of Materials](https://www.spinnaker.io/reference/halyard/#bill-of-materials) stored in `GCS`.

The following configuration is required.

#### Enable GCS in halyard.yml or halyard-local.yml

Edit `/opt/spinnaker/config/halyard-local.yml` to have the following set:

    spinnaker.config.input.gcs.enabled: true

#### Optionally set bucket name

Edit `/opt/spinnaker/config/halyard-local.yml` to set the following:

    spinnaker.config.input.bucket: BUCKET_NAME

Note: **BUCKET_NAME** should be one of the following:
* `halconfig` if you desire to deploy OSS Spinnaker releases
* some other name if you desire to deploy releases from a different GCS bucket (such as when managing Spinnaker in an airgapped environment)


#### Stop Halyard
```
hal shutdown
```

#### Set and deploy Version with Halyard

```
hal config version edit --version ${DESIRED_VERSION}
hal deploy apply
```

## Known Issues
No known issues

## Halyard Armory Enterprise Spinnaker
 - feat(deploy): Allow BOMs in GCS via spinnaker.config.input.gcs.enabled (#268)
 - fix(bom): Expire BOM cache after 1m (#267)
 - feat(gitlab): Add Dinghy config for Gitlab (#266)

##  Halyard Community Contributions
 - fix(kubeconfig): Get contents of local kubeconfig files (#1425)
 - chore(core): Compile using the java compiler (#1432)
 - feat(canary): add newrelic as canary service (#1422)
 - fix(saml): make email address configurable (#1427)
 - chore(dependencies): Autobump korkVersion (#1426)
 - feat(secrets): Support SAML metadata as secret (#1411)
