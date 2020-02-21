---
layout: post
title: v1.8.2 Armory Halyard (OSS 1.31)
order: -202001061114156
---

# 02/19/2020 Release Notes
{:.no_toc}

## Full Version
1.8.2-rc560 (OSS 1.31.0-bba2b3e-stable546 build 560)

## Known Issues
No known issues

## Halyard Armory Enterprise Spinnaker
 No Changes

## Halyard Community Contributions
 - feat(kubernetes): Enable TCP probe for containers (#1542)
 - feat(plugins): deploy PF4J plugins to orca (#1520)
 - feat(codebuild): Add support for manipulating AWS CodeBuild accounts (#1528)
 - feat(provider/tencentcloud): Add TencentCloud account configuration support to Halyard (#1501)
 - fix(plugins): Ignore extraneous pluginConfigurations when parsing config file. (#1522)
 - feat(deployment): Overwrite deploy command's timeout value (#1502)
 - fix(kubernetes): Only load kubeconfig if it's a local file (#33) (#1507)
 - fix(container): leave Python and curl installed (#1512)
 - fix(versions): reenable version checking (#1511)
 - config(core): Remove MPTV2 UI feature flag (#1510)
 - feat(plugins): able to add plugin repositories (#1498)
 - fix(java11): remove deprecated JVM flags (#1489)
 - fix(container): set the spinnaker user to uid 1000 (#1488)
 - feat(Artifactory Search): Add new search fields to support multiple reps (#1472)
 - fix(container): Fix the slim container (#1487)
 - chore(release): Use the alpine containers instead of openjdk (#1486)
 - feat(halyard): Add support for the new java8 containers (#1485)
 - feat(stats): Adds Telemetry validator, which prints a new Info level message that will get printed during all hal config telemetry enable|disable and hal deploy apply invocations (#1479)
 - feat(huaweicloud): add provider of huaweicloud (#1476)
 - fix(deployments): Fixed k8s manifests templates generating invalid yaml (#1456)
 - Revert "feat(huaweicloud): first commit for huaweicloud (#1461)" (#1473)
 