---
layout: post
title: Armory Release Notes
permalink: /release-notes/
description: Release Notes For Armory Spinnaker
collection: release_notes
---
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Understanding Armory + Open Source Spinnaker releases
Armory is based off of [Spinnaker's Halyard release Cadence](https://www.spinnaker.io/community/releases/release-cadence).

Armory provides a **stable** release for customers who need stability in their production environment. You can find these [releases here](#stable-armory-releases) or use [Armory Halyard](#differences-between-releases).

For customers who want to test the latest Armory + OSS (Open Source Spinnaker) release, we provide **rc** release candidates, which you can find using [Armory Halyard](#differences-between-releases). See OSS's [Release Cadence](https://www.spinnaker.io/community/releases/release-cadence/) for more information.

We also provide nightly **edge** builds from **OSS master**, which is only built, but not tested by Armory, which you can find using [Armory Halyard](#differences-between-releases).


### Differences between Releases
Let's say the releases from Open Source are:
- ...
- `OSS 1.9.1`
- `OSS 1.9.2 <-- "Armory stable"`
- `OSS 1.9.2+more <-- "Armory rc"`
- `OSS 1.10.0`
- `OSS 1.10.1 <-- "Armory next rc"`
- `OSS master <-- "Armory edge"`

#### Stable Releases
```bash
$ hal version list
```
A **stable** release is created using the OSS `v1.9.2`
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
- A **rc** release will be created from OSS `>v1.9.2 and <v1.10.0`
  + This version is what's currently being used at Armory.
  + We're using this internally and fixing issues as needed.
  + A few customers maybe using it, but we do not recommend going to production.
- A **next rc** will be created from OSS `v1.10.*`
  + This version has not been tested at Armory, only built and served.
  + A few customers maybe using it, but we do not recommend going to production.

**RC**s also follow semantic versioning with the format like `13.9.3-rc202`.


#### Edge Releases
```bash
$ hal version list --release=edge
```
An **edge** release will be created from OSS `master` nightly
- This version has not been tested at Armory, only built and served.
- We may consider a more frequent releases cycle on a case by case basis
- This is mainly being used for development work by our customers and **should not be** used in production or any critical workloads

Armory uses dates and build numbers for their versions. e.g.:
- `2018.10.12-edge43`
- `2018.10.12-edge44`
- `2018.10.12-edge45`
- (Weekend! 🎉💃)
- `2018.10.15-edge46`
- `2018.10.15-edge47`
- `2018.10.15-edge48`
- ...


## List of Stable Armory Releases
<div class="Post__content" itemprop="articleBody">
  {% include components/articles-list.html %}
</div>
