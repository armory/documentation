---
layout: post
title: v1.9.2 Armory Halyard (OSS 1.35.3)
order: -202001061114156
---

# 05/20/2020 Release Notes
{:.no_toc}

## Known Issues
No known issues

## Highlights

Resolves an issue in Armory Halyard 1.9.1 where Spinnaker cannot be deployed if it has Kubernetes accounts that use the AWS cli to get authentication tokens. The AWS cli was missing a dependency.

## Halyard Armory Enterprise Spinnaker
- fix(cve): update google-cloud-sdk install params
- fix(aws): Added back python2 required by aws-cli
- fix(aws): python2 base image


## Halyard Community Contributions 

No new changes since the last Armory Halyard release.
