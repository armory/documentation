---
layout: post
title: v1.5.69-release Armory Enterprise Spinnaker
order: 994
---

# 06/15/17 Release Notes


## Armory Enterprise Spinnaker


### lighthouse - 26aae12
 - Enable endpoint to clear Clouddriver cache

### dashboard - 00f0dd0
 - Sort by failures, deployments, then executions. highlight failures (#13)
 - Dashboard UI redesign

### echo - v1.136.0
 - feat(rest): extensible JSON payloads for Spinnaker events (#146)

## Spinnaker Community Contributions


### orca - v2.7.8
 - fix(queue): allow expressions to refer to global context values
 - fix(application): simplify dependency verification on app delete (#1368)
 - fix(executionwindows): allow windows to encompass entire day if no windows selected (#1344)
 - refactor(upsertapplication): remove accounts field from create/update application tasks (#1291)
 - fix(v2executions): do not mark pipeline terminal if skipped stage is completeOtherBranchesThenFail (#1366)
 - fix(persistence): append to global execution context instead of overwriting it
 - fix(queue) Fix occasional stalled pipelines caused by parallel stages completing at the same time
 - fix(webhook): retry webhook creation on exception (#1358)
 - fix(metrics): fixed queue metrics broken by spring declared bean type
 - refactor(queue): better separation of concerns in queue / atlas integration
 - fix(expressions): Allow access to additional execution attributes.
 - fix(queue): correct last poll metrics which should be per-instance
 - chore(queue): remove dummy scheduler in integration test
 - fix(queue): avoid silly spikes in queue polling metrics
 - fix(queue): retry start stage messages if upstream stages incomplete
 - chore(queue): upgrade Spek
 - fix(expressions): control allowed types in object traversal
 - chore(queue): make queue polling and retry intervals configurable (#1355)
 - feat(webhooks): Support preconfigured webhook stages
 - Added Atlas metrics to nü-orca queue (#1353)
 - chore(fiat): Bump fiat version (#1349)

### front50 - v1.98.0
 - refactor(applications): remove accounts field from applications (#220)
 - feat(core): Support not warming cache for types that do not need it (ie. entity tags) (#236)
 - fix(google): Log file udpates. (#237)
 - fix(entity_tags): Fix item cache refresh (#235)
 - chore(orca): removed v1-v2 migrator

### spinnaker - v0.81.0
 - fix(dev): Fixed halyard install in create_google_dev_vm and added updates (#1670)
 - Fix Ubuntu check to stop installation on Ubuntu 16.04 LTS (#1553)
 - fix(bake_and_deploy_test): Change jenkins trigger job name. (#1675)
 - feat(validate): add --test_stack (#1672)
 - Refactor validate and add azure (#1671)
 - fix(azure): Allow azure smoke test to run from anywhere. (#1664)
 - fix(validate): handle overriden test paths. (#1668)
 - chore(validate): Cleanup error handling and reporting. (#1665)
 - feat(azure): Run azure interoperability tests during validation (#1666)
 - fix(validate): Add --deploy_verison (#1660)
 - fix(generate_bom): Don't checkout code branch. (#1659)
 - Use raw scp/ssh instaed of gcloud (#1658)
 - fix(google_component_image): Run ssh command with correct script location (#1656)
 - fix(profile): Correctly package contents of tar archives (#1655)
 - feat(testing): collect logs after validating boms. (#1647)
 - fix(publish_bom): Export GIST_URI for email notification. (#1646)
 - fix(generate_bom): Unconflate tarfile and profile paths. (#1645)
 - fix(generate_bom): Missing paren and some indentation. (#1644)
 - feat(profiles): Publish a tar.gz for profile directories (#1641)
 - feat(testing): ValidateBom with kubernetes deployment. (#1643)
 - feat(dev): Fixes to google image scripts. (#1642)
 - feat(gce): adds `associate public ip` flag to settings.js (#1640)
 - feat(docs): publish api docs (#1639)
 - feat(testing): Script for deploying and validating a bom. (#1636)
 - fix(echo): Add Slack botName to echo configs (#1637)
 - fix(component_image): Don't leave residual images in build project. (#1635)
 - Revert "Revert "feat(halyard_release): push directly to docs repo" (#1633)" (#1634)
 - Revert "feat(halyard_release): push directly to docs repo" (#1633)
 - fix(google_smoke_test): Include operation context name in L4 upsert. (#1631)
 - feat(halyard_release): push directly to docs repo (#1629)
 - feat(halyard_release): publish halyard docs when releasing halyard (#1628)
 - fix(halyard_install): Cut back over to spinnaker-releases repo. (#1627)
 - fix(prevalidate): Support for building patch releases. (#1626)
 - fix(ha_images): Get rid of cross-project ssh. (#1625)
 - fix(release): Point to correct halyard install scripts. (#1620)
 - fix(release): Temporarily cut over to 'spinnaker-team/spinnakerbuild'. (#1619)
 - fix(publish_bom): Set versions.yml entry link to changelog gist. (#1618)
 - feat(publish_changelog): Open changelog PR against upstream docs repo. (#1615)
 - fix(google): Install codelab boot scripts. (#1613)
 - fix(google): Fixed codelab image construction (#1611)
 - feat(spinnaker_release): Add orchestration script for Spinnaker release. (#1609)
 - config(provider/openstack): Added extra settings and some documentation (#1552)
 - fix(hal_k8s_run): Enable GCS. (#1608)
 - chore(bake): Spit out contents of log files after build completes (#1606)
 - fix(hal_k8s_run): Update GCS config command. (#1607)
 - fix(generate_bom): Removed 'hostname' field from BOM. (#1604)
 - feat(publish_bom): Append release version to available versions file. (#1603)
 - feat(hal_promote): Adds script to promote stable Halyard. (#1602)
 - fix(bake): Fixes bake of consul & vault servers (#1601)

### deck - v2.1120.0
 - fix(core): remove application accounts before saving
 - Surface custom userdata under advanced settings. (#3744)
 - chore(core): rev package
 - fix(applications): shrink header for long application names
 - feat(application): remove account field from create/edit application modals
 - fix(*): Fix css imports to fix the build (#3762)
 - chore(*): Bump amazon and core package versions and fix a couple things to fix module publishing (#3761)
 - feat:(amazon): Add ALB Support (#3757)
 - feat(core) permissions configurer (#3756)
 - fix(provider/google): Return proper structure when just the command's image is returned as search results. (#3760)
 - chore(core): rev core version
 - fix(pipelines): allow stage to declare executionAlias value
 - fix(core): avoid NPE when disabling autorefresh
 - chore(core): rev version
 - fix(provider/google): Avoid console errors and mangled instance details for standalone instances.
 - fix(entitytags): include maxResults parameter when retrieving tags (#3753)
 - fix(core/instance): fix alignment of health indicators in multi-selected server group (#3752)
 - feat(provider/oraclebmcs): Implement disable ASG pipeline stage
 - fix(provider/aws): Edit Advanced Settings of asg w/ enabledMetrics should copy over just the names of the metrics. (#3750)
 - feat(core): add a button to navigate to the pipeline configuration from execution details view (#3748)
 - fix(provider/aws): Clone of asg w/ enabledMetrics should copy over just the names of the metrics.
 - feat(provider/oraclebmcs): Implement findAmi pipeline stage
 - fix(pipelines): inject app, set on scope in pipeline configurer
 - fix(core): unique package for analytics service; external version.json
 - feat(webhooks): Add preconfigurable webhook support
 - fix(webhooks): Checkbox moving around when clicked and not in line with text
 - chore(core): bump core package version
 - refactor(core): convert applicationCtrl to TS, executions to component
 - fix(application): avoid refresh icon wobble on narrow screens
 - fix(application): avoid URL flashing when application not found
 - feat(provider/oraclebmcs): Implement shrink cluster pipeline stage
 - feat(provider/oraclebmcs): Implement bake stage pipeline
 - feat(provider/oraclebmcs): Implement security groups for Oracle BMCS
 - feat(provider/oraclebmcs): Implement scale down cluster pipeline stage
 - fix(applications): use front50 application name instead of state param
 - feat(pipelines): auto-focus stage type field on new stage
 - refactor(netflix/titus): remove netflix/titus modules
 - chore(core/amazon): rev package.json versions
 - fix(amazon): fix ng-if in security group refresh dom element
 - fix(gce): prevent instance register for non-network load balancers

### gate - v3.39.0
 - refactor(applications): ignore front50 account entries on applications (#398)
 - feat(api): Expose orca resolve Pipeline Template endpoint (#397)
 - feat(webhooks): Support preconfigured webhook stages (#389)
 - chore(fiat): bump fiat version, fixing deserialization issue (#394)

### clouddriver - v1.626.1
 - fix(provider/amazon): Stop breaking when trying to cache other ELBv2 types (#1650)
 - feat(provider/aws): Support caching of ALBs and target groups (#1638)
 - fix(provider/amazon): Fix isInternal flag on load balancer description (#1649)
 - Fixed stringToUserDataMap so that it delimits on new lines and commas. (#1648)
 - feat(provider/kubernetes): Added a common PodSpec struct for deploy and clone operations. (#1641) (#1647)
 - feat(provider/kubernetes): Added a common PodSpec struct for deploy and clone operations. (#1641)
 - feat(authz): Enable read-only permissions for Kubernetes provider (#1646)
 - feat(authz): Enables read-only permission on AWS provider (#1645)
 - refactor(provider/kubernetes): remove SERVER_GROUP label dependency when loading instance data and fix unit test.. (#1640)
 - feat(authz): Enables read-only permission object on GCE and AppEngine providers (#1642)
