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
Armory is based off OSS's (Open Source Spinnaker) [release cadence](https://www.spinnaker.io/community/releases/release-cadence), in which we extend OSS with Armory features. We provide a few different release types.

A **stable** release for customers who need stability in their production environment. You can find these [releases here](#stable-armory-releases) or use [Armory Halyard](#differences-between-releases).

For customers who want to test the latest Armory + OSS (Open Source Spinnaker) release, we provide **rc** release candidates, which you can find using [Armory Halyard](#differences-between-releases).

We also provide nightly **ossedge** builds from OSS master without Armory features, _these are untested_. You can find these versions using [Armory Halyard](#differences-between-releases).


### Differences between Releases
#### Stable Releases
```yml
$ hal version list
...
 - 2.0.0 (OSS Release 1.9.5):
   Changelog: https://docs.armory.io/release-notes/armoryspinnaker_v2.0.0/
   Published: Fri Nov 02 16:42:47 PDT 2018
   (Requires Halyard >= 1.2.0)
 - 2.0.1 (OSS Release 1.9.5):
   Changelog: https://docs.armory.io/release-notes/armoryspinnaker_v2.0.1/
   Published: Fri Dec 14 18:32:56 PST 2018
   (Requires Halyard >= 1.2.0)
```
**Stable** releases have been tested by Armory. Most of our customers will be using them.

We use [semantic versioning](https://semver.org/) for tagging, e.g. `12.3.4`.
- MAJOR versions correspond to major Armory platform changes.
- MINOR versions correspond to a new OSS release branch.
- PATCH versions are reserved for minor changes in the same OSS branch.

| Armory Release | OSS Release Branch |
| -------------- | -----------        |
| 1.14.x         | 1.8.x              |
| 2.0.x          | 1.9.x              |
| 2.1.x          | 1.10.x             |

#### RC Releases
```yml
$ hal version list --release=rc
...
 - 2.0.1-rc2447 (OSS 1.9.x):
   Published: Fri October 12 15:42:49 PDT 2018
   Changelog: https://docs.armory.io/release-notes
 - 2.1.0-rc2448 (OSS 1.10.x):
   Published: Fri October 12 15:42:49 PDT 2018
   Changelog: https://docs.armory.io/release-notes
```
An **rc** release reflects the latest from Armory and OSS release branches
- These versions are used internally at Armory
- A few customers may be using it, but we do not recommend using it in production.

<!--
- A **next rc** will be created from OSS `1.10.*`
  + This version has not been tested at Armory, only built and served.
  + A few customers may be using it, but we do not recommend using it in production.
-->


**RC**s also follow semantic versioning with the format like `1.2.3-rc202`.


#### OSS Edge Releases
```yml
$ hal version list --release=ossedge
...
 - 2018.11.02-ossedge2449 (OSS Edge release):
   Changelog: https://docs.armory.io/release-notes
   Published: Fri October 12 15:42:49 PDT 2018
```
An **ossedge** release is created from OSS `master`.
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
