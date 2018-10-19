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
Armory provides a **stable** release for customers who need stability in their production environment. You can find these [releases here](#stable-armory-releases) or use [Armory Halyard](#armory-halyard-version).

For customers who want to test the latest Armory + OSS (Open Source Spinnaker) release, we provide **rc** release candidates, which you can find using [Armory Halyard](#armory-halyard-version). See OSS's [Release Cadence](https://www.spinnaker.io/community/releases/release-cadence/) for more information.

We also provide nightly **edge** builds from **OSS master**, which is only built, but not tested by Armory, which you can find using [Armory Halyard](#armory-halyard-version).


## Stable Releases
Armory uses [semantic versioning](https://semver.org/) for releases, e.g. `12.3.4` or `13.9.3-rc202`. See how to switch between [stable](#view-stable-releases) and [rc](#view-rc-releases).
- MAJOR versions correspond to an OSS minor release
- MINOR versions are released on Armory's own cadence
- PATCH versions are reserved for fixes to minor versions


## Edge Releases
Armory uses dates and build numbers for their versions. e.g.:
- `2018.10.12-edge43`
- `2018.10.12-edge44`
- `2018.10.12-edge45`
- (Weekend! 🎉💃)
- `2018.10.15-edge46`
- `2018.10.15-edge47`
- `2018.10.15-edge48`
- ...

Here's how to switch to [edge releases](#view-edge-releases).


### Differences between Releases
Let's say we have releases from Open Source:
- `OSS 1.9.1`
- `OSS 1.9.2 <-- "Armory stable"`
- `OSS 1.9.2+more <-- "Armory rc"`
- `OSS 1.10.0`
- `OSS 1.10.1 <-- "Armory next"`
- `OSS master <-- "Armory edge"`

- A **stable** release is created using the OSS `v1.9.2`
  + This version has been tested at Armory and verified that it will work for our normal uses cases.
  + Most of our customers will be using stable releases.
- A **rc** release will be created from OSS `>v1.9.2 and <v1.10.0`
  + This version is what's currently being used at Armory.
  + We're using this internally and fixing issues as needed.
  + A few customers maybe using it, but we do not recommend going to production.
- A **next** release will be created from OSS `v1.10.*`
  + This version has not been tested at Armory, only built and served.
  + A few customers maybe using it, but we do not recommend going to production.
- A **edge** release will be created from OSS `master` nightly
  + This version has not been tested at Armory, only built and served.
  + We may consider a more frequent releases cycle on a case by case basis
  + This is mainly being used for development work by our customers and **should not be** used in production or any critical workloads


## List of Stable Armory Releases
<div class="Post__content" itemprop="articleBody">
  {% include components/articles-list.html %}
</div>


## Armory Halyard Versions
### View Stable Releases
```bash
# if it's been changed before, edit /opt/spinnaker/halyard.yml
$ cat /opt/spinnaker/halyard.yml
spinnaker:
  artifacts:
    debian: https://dl.bintray.com/spinnaker-releases/debians
    docker: gcr.io/spinnaker-marketplace
  config:
    input:
      bucket: halconfig

$ hal version list
```

### View RC Releases
```bash
$ cat /opt/spinnaker/halyard.yml
spinnaker:
  artifacts:
    debian: https://dl.bintray.com/spinnaker-releases/debians
    docker: gcr.io/spinnaker-marketplace
  config:
    input:
      bucket: rc

$ hal version list
```


### View Edge Releases
```bash
$ cat /opt/spinnaker/halyard.yml
spinnaker:
  artifacts:
    debian: https://dl.bintray.com/spinnaker-releases/debians
    docker: gcr.io/spinnaker-marketplace
  config:
    input:
      bucket: edge

$ hal version list
```

