---
layout: post
title: Armory Release Notes
permalink: /release-notes/
description: Release Notes For Armory Spinnaker
collection: release_notes
---
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Understanding Armory + Open Source Spinnaker Releases
Armory is based off OSS's (Open Source Spinnaker) [Halyard release Cadence](https://www.spinnaker.io/community/releases/release-cadence), in which we extend OSS with Armory features. We provide a few different release types.

A **stable** release for customers who need stability in their production environment. You can find these [releases here](#stable-armory-releases) or use [Armory Halyard](#differences-between-releases).

For customers who want to test the latest Armory + OSS (Open Source Spinnaker) release, we provide **rc** release candidates, which you can find using [Armory Halyard](#differences-between-releases). See OSS's [Release Cadence](https://www.spinnaker.io/community/releases/release-cadence/) for more information.

We also provide nightly **ossedge** builds from **OSS master**, which is only built, but not tested by Armory. You can find these versions using [Armory Halyard](#differences-between-releases).


### Differences between Releases
Given this example:
- ...
- `OSS 1.9.1 + Armory`
- `OSS 1.9.2 + Armory <-- "Armory stable"`
- `OSS 1.9.2+more + Armory <-- "Armory rc"` (**more** means commits created in OSS for `OSS 1.9.3`, but not officially released)
- `OSS 1.10.0 + Armory`
- `OSS 1.10.1 + Armory <-- "Armory next rc"`
- `OSS master <-- "ossedge"`


#### Stable Releases
```bash
$ hal version list
```
A **stable** release is created using the OSS `1.9.2`
- This version has been tested at Armory and verified that it will work for our normal uses cases.
- Most of our customers will be using stable releases.

We use [semantic versioning](https://semver.org/) for tagging, e.g. `12.3.4`.
- MAJOR versions correspond to an OSS minor release
- MINOR versions are released on Armory's own cadence
- PATCH versions are reserved for fixes to minor versions


#### RC Releases
```bash
$ hal version list --release=rc
```
- A **rc** release will be created from OSS `>1.9.2 and <1.10.0`
  + This version is what's currently being used at Armory.
  + We're using this internally and fixing issues as needed.
  + A few customers maybe using it, but we do not recommend going to production.
- A **next rc** will be created from OSS `1.10.*`
  + This version has not been tested at Armory, only built and served.
  + A few customers maybe using it, but we do not recommend going to production.

**RC**s also follow semantic versioning with the format like `13.9.3-rc202`.


#### OSS Edge Releases
```bash
$ hal version list --release=ossedge
```
An **ossedge** release is created from OSS `master`.
- This is created through OSS `hal version list --release=master-latest-unvalidated`
- This version has not been tested at Armory, only built and served.
- This is mainly being used for development work by our customers and **should not be** used in production or any critical workloads

Armory uses dates and build numbers for their versions. e.g.:
- `2018.10.12-ossedge43`
- `2018.10.12-ossedge44`
- `2018.10.12-ossedge45`
- (Weekend! 🎉💃)
- `2018.10.15-ossedge46`
- `2018.10.15-ossedge47`
- `2018.10.15-ossedge48`
- ...


## List of Stable Armory Releases
<div class="Post__content" itemprop="articleBody">
  {% include components/articles-list.html %}
</div>
