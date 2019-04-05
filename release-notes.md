---
layout: post
title: Armory Release Notes
permalink: /release-notes/
description: Release Notes For Armory Spinnaker
collection: release_notes
redirect_from:
  - /releases
---
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Understanding Armory + Open Source Spinnaker Releases
Armory is based off OSS's (Open Source Spinnaker) [release cadence](https://www.spinnaker.io/community/releases/release-cadence), in which we extend OSS with Armory features. We provide a few different release types.

A **stable** release for customers who need stability in their production environment. You can find these [releases here](#stable-armory-releases) or use [Armory Halyard](#differences-between-releases).

For customers who want to test the latest Armory + OSS (Open Source Spinnaker) release, we provide **rc** release candidates, which you can find using [Armory Halyard](#differences-between-releases).

We also provide nightly **ossedge** builds from OSS master without Armory features, _these are untested_. You can find these versions using [Armory Halyard](#differences-between-releases).

We don't consistently build, but provide when a customer has need for it, **edge** builds. These consist of nightly OSS master along with Armory edge features, _both of which are untested_.


### Differences between Releases
#### Stable Releases
```yml
$ hal version list
...
 - 2.2.0 (OSS Release 1.11.9):
   Changelog: https://docs.armory.io/release-notes/armoryspinnaker_v2.2.0/
   Published: Mon Feb 25 04:58:47 GMT 2019
   (Requires Halyard >= 1.2.0)
 - 2.3.0 (OSS Release 1.12.x):
   Changelog: https://docs.armory.io/release-notes/armoryspinnaker_v2.3.0/
   Published: Thu Mar 28 03:44:19 GMT 2019
   (Requires Halyard >= 1.2.0)
```
**Stable** releases have been tested by Armory. Most of our customers will be using them.

We use [semantic versioning](https://semver.org/) for tagging, e.g. `12.3.4`.
- MAJOR versions correspond to any major Armory platform changes or breaking OSS changes.
- MINOR versions correspond to a new OSS release branch.
- PATCH versions are reserved for minor changes in the same OSS branch.

| Armory Release | OSS Release Branch |
| -------------- | -----------        |
| 1.14.x         | 1.8.x              |
| 2.0.x          | 1.9.x              |
| 2.1.x          | 1.10.x             |
| 2.2.x          | 1.11.x             |
| 2.3.x          | 1.12.x             |

#### RC Releases
```yml
$ hal version list --release=rc
...
 - 2.2.1-rc463 (2.2.1 Release Candidate):
   Changelog: https://docs.armory.io/release-notes/armoryspinnaker_v2.2.1/
   Published: Mon Apr 01 16:53:32 GMT 2019
   (Requires Halyard >= 1.2.0)
 - 2.3.1-rc40 (2.3.1 Release Candidate):
   Changelog: https://docs.armory.io/release-notes/armoryspinnaker_v2.3.1/
   Published: Mon Apr 01 16:53:33 GMT 2019
   (Requires Halyard >= 1.2.0)
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
 - 2019.04.03-edge2143 (OSS Edge release):
   Changelog: https://docs.armory.io/release-notes
   Published: Wed Apr 03 18:34:18 GMT 2019
   (Requires Halyard >= 1.2.0)
```
An **ossedge** release is created from OSS `master`.
- This version has not been tested at Armory, only built and served.
- This is mainly being used for development work by our customers and **should not be** used in production or any critical workloads

Armory uses dates and build numbers for their versions. e.g.:
- `2019.04.03-edge2143`
- `2019.04.02-edge2142`
- `2019.04.01-edge2141`
- (Weekend! 🎉💃)
- `2019.03.29-edge2140`
- `2019.03.28-edge2139`
- `2019.03.27-edge2138`
- ...


## List of Stable Armory Releases
<div class="Post__content" itemprop="articleBody">
  {% include components/articles-list.html %}
</div>

## Selecting a version to install
```yml
$ hal config version edit --version 2.1.0
```
See [halyard reference](https://www.spinnaker.io/reference/halyard/commands/#hal-config-version-edit) for additional information.

