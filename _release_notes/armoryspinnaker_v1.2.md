---
layout: post
title: v1.2 Armory Enterprise Spinnaker
permalink: 'release-notes'
---

## Armory Enterprise Spinnaker
- Smaller container size
- Faster initialization and startup due to optimization of containers
- Debian packaging for Armory Spinnaker
- Streamlined init scripts for more stable startup/shutdown lifecycles
- Options to start local redis through environment variables in /etc/default/armory-spinnaker
- Bug Fix: Install packer into docker image
- Settings.js is automatically generated so you don’t have to define same config in 2 places
- Install and configure truststore for Java8 for docker Images

## Lighthouse
- Previously named Healthcheck
- Endpoint to monitor Orca work endpoint
- Enabled threading on server
- Catch all connection errors
- Additional logging on stdout and endpoint response JSON
- Added more robust error checking from Spinnaker sub-components endpoint

## Spinnaker Community Contributions

## Clouddriver
- (aws) Update to the latest AWS SDK
- (aws) ASG Lifecycle Hooks
- (aws) Instance termination lifecycle agent; early-notifies Eureka of termination events
- (aws) adds options in deploy / clone server group to control whether ancestor ASG custom block device and spotPrice are carried forward
- Ensure queue/topic exists on every iteration of the launch failure agent
- (amazon) Log all requests to create launch configurations (sans user data)

## Echo
- (auth) Adds runAsUser to CRON triggers.
- (auth) Updates isInSync method to consider runAsUser.
- (rest) Add optional basic auth support to outgoing rest webhooks.
- Add support for cc: field to email notifications.
- (manualJudgment) Include 'judgedBy' in manualJudgmentContinue notifications.
- (manualJudgment) Update generic body template for manualJudgmentContinue to match the others.
- Add all templates for manualJudgmentContinue and manualJudgmentStop.
- Add slack template for manualJudgment.

## Gate
- A relaxed RedisHealthIndicator that will never report DOWN once UP
- (cors) - adds a configurable allowedOriginsPattern to whitelist cors access to spinnaker API (breaking) With the change to whitelist cors requests to a specified - regex, anyone relying on the open cors policy will be impacted (if you have developed a separate browser based webapp that uses the spinnaker api, and you have - - authentication enabled you will need to whitelist the host domain for that webapp to propagate the authentication for API requests)
- Adding regex support for oauth2 user info requirements
- update entity tags via POST, partial delete operation

## Deck
- (core) allow users to configure traffic protected clusters
- (aws) Bug-fix bad rendering of instance details title.
- (aws) preserve userdata on pipeline cluster edit
- (all providers) Show that an instance is not found instead of failing silently
- (aws) Quick Patch ASG stage requires a jenkins trigger or stage
- (docker) Add image name, tag and organization to docker bake stage.
- (docker) Make bake stage show up in list of stage choices even when no providers that explicitly provide bake stage are configured.
- (core): upgrade core libs and fix resulting issues
- (core) retry tagging before failing; make retryService tolerate failure
- (core) added validator for service account access
- (core) use IRegionalCluster for entityRef building
- (core) always show disabled warning if any instances present
- (appengine) edit lb stage
- (aws) allow whitelisting of classic launch, default subnet
- (core) refactor disable/destroy warnings on server group actions

## Igor
- Only publish events to echo if a docker registry has been indexed once

## Orca
- Adds clouddriver.readonly.baseUrl config option to point clouddriver read operations at a separate endpoint (read replica)
- Adds a new endpoint that returns counts of active executions running on each orca instance.
- Fix an issue in v2 orchestrations that are using dynamic target server groups
- Bug Fix - Fixes an issue with target server group stages in v2 where > 1 region is not processed because of an unsafe re-entrant method
- Adds a handler for executions failing during the startup phase
- Include pipeline name in server group metadata tag
- Tag server groups with metadata if feature enabled
- Support tagging of server groups when created / cloned
- poll clouddriver for task status less often 1s -> 10s
- force refresh server group caches on a slower interval 5s -> 10s
- (core) Move zombie cleanup logic to core and make it accessible so cancel action can use it.
- (core) Various bits of managed pipeline template implementation
- Bug Fix - Fixes stage restarts in v2

## Rosco
- (core) Bug-Fix - Don't fail worker threads on top-level exceptions.
- (rpm) Allow for multiple RPM repositories.
- (AWS/Azure) Add support for Windows using Chocolatey as package manager.
- (docker) Add docker tag, organization and name handling.
- (core) Add the ability to override the default templateFile for a baseImage.
- (packer/templates) Add DEBIAN_FRONTEND=noninteractive to apt-get install.
- consider optional templateFileName parameter when determining if resolved template is included in templatesNeedingRoot.

## Front50
- (core) Remove unused loadObjectVersion storage API.
- (core) Adding support for searching project by a variety of keywords
- (core) include tagMetadata in EntityTags object
