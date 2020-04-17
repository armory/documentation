---
layout: post
title: v1.8.4 Armory Halyard (OSS 1.32.0)
order: -202001061114156
---

# 04/17/2020 Release Notes
{:.no_toc}

This version is required to deploy Armory Spinnaker 2.19+. 

## Full Version
1.8.4-rc574 (OSS 1.32.0-214e5ba-stable548 build 574)

## Known Issues

When you try to deploy Spinnaker using Halyard 1.8.4, you encounter the following error:

```
Validation in Global:
! ERROR Could not translate your halconfig: Unrecognized field
  "plugins" (class
```

**Workaround** 

Remove the top level key for Plugins in your Halconfig. 

## Halyard Armory Enterprise Spinnaker
 feat(dinghy): Support for webhook secrets in dinghy 
 feat(dinghy): Changes to add enabled/disable webhook secret validation and default secret

## Halyard Community Contributions
 No Changes
