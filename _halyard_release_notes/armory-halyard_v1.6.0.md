---
layout: post
title: v1.6.0 Armory Halyard (OSS 1.20)
order: -20190619173156
---

# 06/13/2019 Release Notes
{:.no_toc}

## Full Version
1.6.0-rc133 (OSS 1.20.0-8b4198c-stable123 build 133)

## Known Issues

- `hal shutdown` returns an `Error 400` message. We will be submitting a PR to OSS Spinnaker to resolve this. 

## Halyard Armory Enterprise Spinnaker
 - chore(gradle): move to gradle5 (#220)
 - fix(release): point to armory-commons/master branch (#218)
 - chore(dependency): add kork dep to halyard-armory (#214)

##  Halyard Community Contributions
 - fix(kubernetes): Added the missing support for the HTTPS scheme to (#1344)
 - feat(backup): Change date format for backups (#1338)
 - fix(deploy): Fix NPE for incorrect file name (#1342)
 - chore(dependencies): Autobump korkVersion (#1336)
 - feat(cf): Cloudfoundry account's API endpoint server certificate validated by default, skipping as an option. (#1332)
 - chore(dependencies): Autobump korkVersion (#1335)
 - chore(*): Apply codestyle enforcement (#1334)
 - chore(dependencies): Autobump korkVersion (#1333)
 - chore(dependencies): Autobump korkVersion (#1331)
 - fix(core): Fix halyard cli (#1330)
 - chore(boot2): Halyard to boot2 (#1328)
 - fix(cf): All CF account fields now optional on edit (#1329)
 - fix(ldap): add managerDn and managerPassword to gate's auth configuration (#1327)
 - feat(kubernetes): Allow adding custom pod and service labels for spinnaker deployments and services (#1312)
 - feat(kubernetes): Support cacheThreads and implement allNamespaces option (#1326)
 - refactor(cf): Improved consistency of `hal config provider cloudfoundry add/edit` parameters (#1325)
 - fix(gcb): Fix gcb command parameters (#1320)
 - fix(deploy): Handle files with special characters (#1319)
 - fix(*): Don't fail validation if openstack is present (#1316)
 - fix(integrations): Fix duplicate config block (#1314)
 - Revert "feat(kubernetes): Allow adding custom pod and service labels for spinnaker deployments and services (#1303)" (#1311)
 - chore(dependencies): Autobump spinnaker-dependencies (#1299)
 - feat(kubernetes): Allow adding custom pod and service labels for spinnaker deployments and services (#1303)
 - chore(cf): improve error msg when cf account has no access to spaces or orgs (#1283)
 - fix(appengine): Allow path to gcloud to be configured (#1310)
 - fix(redis): Ensure redis is started (#1309)
 - feat(s3): Add --path-style-access option to config s3 bucket access style (#4400) (#1308)
 - fix(halyard): Replace non-ASCII quotes (#1307)
 - fix(canary/gcs): Explicitly set secret session manager. (#1304)
 - feat(gcb): Add hal commands for manipulating gcb accounts (#1302)
 - fix(ci): Fix two bugs from refactor of halyard CI commands (#1300)
 - chore(dependencies): Autobump spinnaker-dependencies (#1287)
 - feat(gcb): Add GCB configuration to Halyard (#1298)
 - refactor(ci): Rename interface method getAccounts (#1297)
 - refactor(ci): Remove reflection from Cis class (#1296)
 - fix(gremlin): Fix the Halyard configuration of Gremlin (#1293)
 - fix(install): fix the problem with JDK 12.0 (#1295)
 - chore(openstack): remove openstack provider (#1291)
 - chore(cf): remove env constraint for cf accounts (#1281)
 - feat(core): add support for concourse and artifactory (#1288)
 - fix(local halyard): Correctly set spring config location. (#1290)
 - fix(cli): Use "--no-validate" parameter on "hal config provider * account get" (#1289)
 - chore(build): upgraded to gradle 5.0 (#1285)
 - chore(dependencies): Autobump spinnaker-dependencies (#1275)
