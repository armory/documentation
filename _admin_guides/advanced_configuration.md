---
layout: post
order: 80
---

This document reviews some advanced configuration for each of the Armory Spinnaker sub-services

# Orca

### Increasing `WaitForCluster` timeout

Example of 60 minute `WaitForCluster` timeout:
```
tasks:
  waitForClusterTimeout: 3600000
```
