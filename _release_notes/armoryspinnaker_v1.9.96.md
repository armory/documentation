---
layout: post
title: v1.9.96 Armory Enterprise Spinnaker
order: 990
---

# 10/09/17 Release Notes


## Highlighted Updates

### Armory Enterprise Spinnaker

* Certified Pipelines
* Updated Barometer features (Elastic Search and Datadog support)
* Create ELB Stage UI Fixed



### armoryspinnaker - v1.9.96-release

### lighthouse - 674b396
- Only check fiat if service is enabled.
- add stub to enforce pipeline policies (certified pipelines)

### dashboard - 7abb415
- feature flag configurator
- automate updating deck-armory

### barometer - 8ae8fb0
- Do not check std deviation unless some data points exceed threshold. (#91)



###  Spinnaker Community Contributions
### orca - v3.22.5
- fix(stages/bakery): Fix bake stage, ensure deploymentDetails is added to context
- feat(pipeline_template): Allow granular inheritance control on params, triggers, notifications (#1632)
- fix(pipeline_template): Allow conditional stages inside of partials (#1631)
- feat(pipeline_template): Jinja rendering in triggers, params and notifications (#1619)
- chore(expressions): Allow to override global spel version at pipeline level (#1607)
- feat(pipeline_templates): Support jinja expressions in template variables (#1571)

### echo - v1.146.0
 - fix(email): include markdown converter in email notification agent call (#172)

### front50 - v1.114.0

- feat(aws): Support for incremental cache updates based on s3 events (#276)
- feat(s3): Allow to disable versioning via config

### deck - v2.1142.0

- feat(moniker): adds monikers to stages that includes cluster-selects (#4220)
- feat(redblack): Expose `delayBeforeDisableSec` (#4223)
- feat(provider/amazon): Show NLBs in the Load Balancer screen and allow NLB target groups to be selected when deploying (#4149)
- feat (provider/ecs): ECS Support (#4100)
- feat(gce): adds support for configuring multiple persistent disks (#3980)
- fix(aws): Change EBS optimized flag based on AWS defaults (#3991)
- feat(provider/amazon): Add CRUD support for ALB listener rules (#3985)

### igor - v1.75.1
- feat(travis/commit_info) Add commit message to the scm payload (#186)

### clouddriver - v1.684.0

- Enabled Spot pricing for ASG
- fix(provider/kubernetes): fix k8s client configuration and image id p… (#1933)
- feat(provider/kubernetes): Properly version all versioned resources (#1945)
- feat(moniker): Add monikers to security groups & load balancers (#1941)
- fix(all): Broken k8s server group lookup breaking all components (#1937)
- feat(provider/kubernetes): V2 cluster provider (#1911)
- feat(provider/kubernetes): Add proper support for source capacity. (#1906)
- feat(provider/kubernetes): Cache arbitrary resource (#1873)
- feat(provider/kuberenetes): V2 deployments (#1868)
- feat(amazon): Support a generic proxy for static content stored in S3 (#1838)
- feat(provider/ecs): Introduced atomic operation stubs (#1826)

### gate - v4.7.0

- fix(x509): Allow OAuth and x509 to be used together again
- properly enforce pipeline limit when using multiredis (#463)
- feat(web): return x-spinnaker-request-id as a response header (#458)
- feat(web): Enable request trace header, log annotation (#455)
- feat(x509): adds x509 certificate role extractor (#454)


### fiat - v0.30.2
 - feat(permissions): Add ability to specify permissions in a file, rather (#187

<br><br><br>
## Detailed Updates
### Armory Enterprise Spinnaker
### armoryspinnaker - v1.9.96-release
 - Add feature flag for infrastructureStages (ELB) (#156)
 - Version is showing as "development", syntax is a bit different
 - Refacting out the version.manifest (#160)
 - change certifiedPipeline feature name
 - add feature flag for configurator
 - add certifiedPipelineTemplates feature gating
 - Insert the application into the webhook URL.
 - Updating lighthouse to 49ba383 in version.manifest
 - Undo previous change
 - Change the webhook URL to use the DEFAULT_DNS_NAME
 - Add preconfigured webhook for Certified Pipelines
 - Updating lighthouse to b0047dc in version.manifest
 - Use command in the lighthouse container to download config (#153)
 - Use the default name (internal LB) to hit lighthouse, if available. (#155)
 - Explicit enable on rosco for gate, also swap back to standard hostname (#154)
 - Roll clouddriver forward to get Moniker changes
 - default settings don't pull tags add the extension to pull tags
 - Enable spot pricing

### lighthouse - 674b396
 - Revert igor health endpoint change (returns DOWN for some of our environments)
 - update policyId -> id in comments
 - use the correct health endpoint
 - Only check fiat if service is enabled.
 - Remove debug logging and testing conditional.
 - Parallel processing of posts.
 - Download policies in parallel.
 - Check for required stages by name.
 - Post of policy with an id will act like a put.
 - Allow a post of a list of policies.
 - Set up Policy object to parse & process policies.
 - Start plugging in actual pipeline config code
 - PolicyManager.policy_violations_for_pipeline()
 - S3-backed /v1/policies api.
 - Get webhook responses working with Orca/Deck
 - add stub to enforce pipeline policies (certified pipelines)
 - Allow override of HOST from env
 - Only allow -local files in the packer dir when syncing config (#86)
 - allow passing of remote_host to lighthouse
 - Delete a file if the contents are set to null. (#82)
 - Converting to using a versioned bucket instead of different "folders" (#81)

### Armory Dashboard - 7abb415
 - feature flag configurator
 - don't reset view when reloading
 - show configuration version compare if implemented
 - add support to delete certified pipelines policies
 - move update-version-manifest to deck-armory
 - fix res data
 - missing curly bracket
 - automate updating deck-armory
 - add whitespace
 - fixed error on save
 - removing unused files
 - add comments on how spinnakerSettings works
 - use stub for CertifiedPipelineFileService
 - move certified pipeline config to app
 - filter out s3 bucket version with ids null
 - Attempt to use plain text to avoid cors preflight check (#21)
 - filter out no changed content in compare
 - only reload cache after a succesful save
 - inject ConfigFileService for caches
 - refresh compare component with selected file
 - fixed merge with andrew's ui changes
 - Route lighthouse queries through gate. (#19)
 - Send null for deleted file. (#18)
 - Default to master when pushing artifact
 - Migrated configuration portal to React

### barometer - 8ae8fb0
 - Do not check std deviation unless some data points exceed threshold. (#91)


###  Spinnaker Community Contributions

### orca - v3.22.5
 - fix(execution windows): don't add duplicate execution windows to parallel stages
 - fix(expressions): Include evaluation summary in v2 (#1673)
 - feat(pipeline): Resolve received and expected artifacts in trigger. (#1667)
 - feat(core): Deploy manifest stage & task (#1674)
 - perf(build): Removing orca-queue-sqs; unused, unsupported
 - fix(web): Return correct num executions with dual redis (#1668)
 - fix(mine): Search stage definition builders directly instead of depending on stage navigator when trying to cancel canary.
 - chore(expressions): Cleanup some noisy logs (#1666)
 - feat(moniker): Use a cluster's moniker if available. (#1664)
 - feat(clouddriver): Support sharding read-only requests by `user` (#1641)
 - feat(context): Adds trigger contents to stage context (#1659)
 - refactor(clouddriver): monitor clouddriver tasks every 5 seconds (#1639)
 - feat(stage context): Get all stage results in a list (#1655)
 - fix(rollbacks): support for tolerating some instance failures (#1643)
 - fix(web): Revert take calls; unexpected upstream behaviors (#1654)
 - Revert "feat(artifacts): Add receivedArtifacts to Pipeline model. (#1648)" (#1653)
 - fix(pipeline_template): Do not store state in error handler lol (#1651)
 - fix(web): Enforce limit on previous redis for app pipelines endpoint (#1650)
 - feat(job): decrease job timout and make overridable (#1649)
 - feat(artifacts): Add receivedArtifacts to Pipeline model. (#1648)
 - fix(redis_migration): fix logging of pending work (#1647)
 - fix(web): Enforce limit of pipelines when using previous redis conn (#1646)
 - fix(pipeline_template): Check for correct paramConfig field during render (#1642)
 - fix(pipeline_template): Regression in deserializing tempalted pipeline requests (#1644)
 - fix(timeouts): some tasks inherit stage timeout override (#1640)
 - feat(pipeline_template): Support template-less configurations (#1636)
 - tests(pipeline_templates): integrations tests and removing unique ID (#1638)
 - refactor(pipeline_template): Support multiple MPT schema versions (#1621)
 - fix(managed_pipeline): validation of variable types, integration tests for invalid pipelines (#1629)
 - feat(pipeline_template): Jinja rendering in partials (#1637)
 - fix(stages/bakery): Fix bake stage, ensure deploymentDetails is added to context
 - feat(pipeline_template): Allow granular inheritance control on params, triggers, notifications (#1632)
 - fix(pipeline_template): Allow conditional stages inside of partials (#1631)
 - refactor(tag-generator): include server group coordinates in generateTags signature (#1634)
 - perf(rollingpush): Avoid unnecessarily searching for instance ids (#1633)
 - chore(oortService): expose /serverGroups endpoint (#1630)
 - feat(servergroup): allow ad-hoc entity tags on deployments (#1627)
 - fix(queue): Fix stupid spring wiring (#1628)
 - fix(pipeline_template): root-level configs mapped if undefined (#1623)
 - feat(redis_migration): log if there are still pending orchestrations/pipelines (#1626)
 - feat(queue): Add queue shovel for migrating backends (#1624)
 - fix(pipeline_template): config level stage replacement (#1622)
 - fix(canary): target canary cleanup server groups by create date (#1612)
 - feat(cluster-match): implement general purpose cluster matching rule engine (#1579)
 - fix(metrics): missed migrator in refactor of thread pool metrics (#1625)
 - fix(queue): re-prioritize message on queue if an identical one is pushed
 - chore(core): simpler handling of parallel stages
 - refactor(metrics): more configurable metrics wiring for thread pools
 - feat(pipeline_template): Jinja rendering in triggers, params and notifications (#1619)
 - feat(pipeline_template): Convert to pipeline template endpoint (#1615)
 - chore(queue): renamed things to make intent clearer
 - refactor(queue): queue now uses message hash as the message id
 - chore(queue): removed envelope handling code we don't use
 - fix(pipeline_template): Multiple fixes from integration suite (#1616)
 - fix(pipeline_templates): load parent templates when inlining template for plan (#1614)
 - chore(licenses): fix license config and add missing license headers
 - fix(timeout): stage timeout overrides cumulative task durations (#1605)
 - fix(events): start/end pipeline events broke because of missing toString (#1611)
 - fix(fastproperty): do not override context on monitor stage (#1610)
 - fix(gradle): Pin jedis version (#1609)
 - feat(fastproperties): allow individual stage overrides via trigger (#1608)
 - chore(expressions): Allow to override global spel version at pipeline level (#1607)
 - feat(pipeline_template): Re-save dependent pipelines on template save (#1606)
 - fix(events): for some reason no-one rememebers orchestration stage end events were not sent to Echo
 - feat(pipeline_template): Plan all dependent pipelines before updating pipeline templates (#1601)
 - test(pipeline_template): Adding integration test suite (#1603)
 - fix(pipeline_template): Build partials, execute conditionals after and trim conditions as the last step (#1602)
 - fix(pipeline_template): Catch template load errors on pipeline save (#1600)
 - fix(pipeline_template): Respect UI-configured concurrency options (#1599)
 - feat(web) disabling front50 refresh when orca fetches pipeline (#1598)
 - feat(expressions): Including expressions errors to show in UI (#1595)
 - fix(pipeline_templates): allow default variables to be determined from other variable values (#1596)
 - feat(strategies): wait period before disable for rolling push and rolling red black (#1587)
 - feat(canary-v2) Add support for cancelling in-flight kayenta canary. (#1593)
 - kotlin 1.1.4-3
 - refactor(tagging): make server group tagging task pluggable (#1582)
 - feat(expressions): Allowing to globally configure SPEL evaluator version (#1592)
   - feat(canary-v2): Propagate durationString and lastUpdated from kayenta canary pipeline to output of kayenta stage. (#1588)
 - fix(core): handle incoming non-parallelized pipelines
 - fix(canary-v2): Do not propagate score thresholds to kayenta for canary judge. (#1590)
 - fix(core): apply metric recording when reading executions from Redis
 - fix(canary): add timeout buffer for canaries > 48 hours (#1583)
 - fix(clouddriver): Stop deployment from hanging when spotPrice is set (#1572)
 - fix(canary): fix Orchestration constructor in DeployCanary stage (#1585)
 - fix(persistence): requisiteStageRefIds can be null in Redis (#1584)
 - chore(orca): Kotlin enhancements for Spring 1.5
 - feat(pipeline_template): Partials-generated stages should be given generated group name (#1574)
 - fix(pipeline_template): Plan serialization & empty string rendering (#1581)
 - chore(orca): removed old parallel flag from executions
 - chore(orca): update for merged new tests
 - chore(orca): delete unused test listener class
 - chore(orca): removed test usage of PipelineBuilder
 - chore(orca): half-way un-shit pipeline builder for tests
 - chore(orca): assign execution id on construction so it's never null
 - fix(expressions): allow unevaluated values in V2 evaluator (#1577)
 - chore(springBoot): Upgrade to Spring Boot 1.5.4 (#1486)
 - fix(pipeline_templates): notification inheritance (#1576)
 - feat(amazon): allow preferSourceCapacity as fallback on deploy when useSourceCapacity does not find a source (#1545)
 - fix(core): Fixing NPE when sorting by non-existent startTime (#1575)
 - fix(pipeline_templates): prevent expression evaluation during template update operation (#1573)
 - feat(pipeline_templates): Support jinja expressions in template variables (#1571)
 - Re-introduce the stage outputs change

### echo - v1.146.0
 - fix(email): include markdown converter in email notification agent call (#172)
 - feat(pubsub): Enforce expected artifacts in triggers. (#171)
 - refactor(artifact): s/GenericArtifact/Artifact (#170)
 - feat(pubsub): Parse artifacts from pub/sub message contents. (#168)
 - fix(appOwner): convert app owner emails to html (#169)
 - fix(triggers): fix handling of blank regex in docker registry triggers (#166)
 - feat(pubsub): Process message events and forward matching triggers. (#167)
 - feat(notifications): support markdown in slack/email notifications (#165)
 - feat(pubsub): Adds first pass at Google pubsub client. (#161)

### front50 - v1.114.0
 - fix(s3): Wrap eventing poll loop in try/catch and emit error metric (#281)
 - feat(pipeline_template): Adding recursive flag for retrieving dependents (#280)
 - fix(s3): Thou shalt not block the single threaded `taskScheduler` (#279)
 - fix(javadoc) Thou shalt not '<' in your javadoc (#278)
 - feat(aws): Support for incremental cache updates based on s3 events (#276)
 - chore(javadoc): fix invalid javadoc character (#277)
 - fix(applications/pipelines): trim names before upsert operations (#265)
 - fix(pipelines): sort and apply unique index on application pipelines (#274)
 - feat(s3): Allow to disable versioning via config
 - feat(core): Introduce ObjectKeyLoader interface (#273)
 - feat(health): support differing intervals for item dao health
 - perf(core): Debounce concurrent cache refreshes (#271)
 - fix(web): change refresh to default behavior (#269)
 - feat(web): adding optional refresh param for pipelines by application (#268)
 - feat(web): adding optional refresh param for listing pipelines (#267)
 - feat(pipeline_template): Get dependent pipeline configs for template id (#266)

### deck - v2.1142.0
 - chore(halconfig): lint halconfig/settings.js (#4146)
 - feat(moniker): adds monikers to stages that includes cluster-selects (#4220)
 - feat(script,jenkins): show contents of properties file (#4227)
 - chore(core): bump package to 0.0.77 (#4226)
 - fix(executions): fix header alignment (#4225)
 - refactor(core/delivery): Convert execution filters to React (#4197)
 - feat(redblack): Expose `delayBeforeDisableSec` (#4223)
 - chore(amazon): bump package to 0.0.38 (#4222)
 - fix(amazon): properly assign credentials when editing load balancers (#4221)
 - chore(tests): enable all tests (#4217)
 - chore(amazon): bump package to 0.0.37 (#4219)
 - chore(chore): bump package to 0.0.75 (#4218)
 - style(core/amazon/google/kubernetes): Fixed adhoc hexcode colors to use spinnaker palette (#4206)
 - fix(pipelines): show indicator when deleting pipeline config (#4216)
 - chore(modules): Use webpack-node-externals to exclude node_modules from @spinnaker/* bundles (#4215)
 - refactor(moniker): application -> app (#4213)
 - naming service for sequence only uses moniker now (#4189)
 - fix(provider/gce) Update max disk number for local-ssd to 8 from 4 (#4214)
 - fix(rollbacks): support for tolerating some instance failures (#4144)
 - feat(core): Version account lookup (#4212)
 - chore(search): update badge count label (#4207)
 - refactor(provider/kubernetes): Move v1 code into v1 module (#4211)
 - fix(core): correct access modifier from local variable in versionSelector (#4210)
 - feat(provider/aws): Add help text to the LB internal checkbox (#4209)
 - style(all): Removed all less color variables and using CSS4 consolidated colors (#4204)
 - feat(core): Versioned cloud provider deploy select (#4201)
 - fix(provider/amazon) Enable & fix existing "Create LB" stage (#4184)
 - fix(artifacts): Get rid of 'unused' linter errors. (#4205)
 - feat(pipeline): Change Artifact UI to use ExpectedArtifact model. (#4202)
 - fix(core/pipeline): Fix configure view state callback for MPT (#4203)
 - chore(core): bump package to 0.0.74 (#4199)
 - fix(pipelines): properly sync plan/pipeline/renderablePipeline (#4198)
 - adds filter to only retrieve target cluster (#4196)
 - chore(amazon): bump package to 0.0.36 (#4195)
 - chore(core): bump package to 0.0.72 (#4194)
 - feat(provider/kubernetes): Register v2 provider (#4183)
 - fix(search): fix advanced search page title (#4193)
 - refactor(clusterMatch): tweak cluster match component args, export more in lib (#4191)
 - updating server group writer to use moniker (#4185)
 - fix(pipelines): correctly rerender when editing JSON (#4192)
 - style(core/amazon/oracle): Updated spinners to use new designs (#4190)
 - fix(stage): fix default timeout for deploy stage (#4186)
 - fix(pipeline_template): Cast numeric variable types during plan (#4187)
 - feat(core/pipeline): Scroll grouped stages popover (#4182)
 - clone stage now uses moniker (#4166)
 - feat(core): adds settings-local.js for Halyard users (#4181)
 - chore(docker): Load settings-local.js inside docker container (#4180)
 - feat(core): versioned cloud provider service (#4168)
 - fix: Make sure jarDiffs has a default to prevent calling Object.keys on null (#4179)
 - chore(core): bump package to 0.0.71 (#4178)
 - fix(versionCheck): swallow exception if version.json fetch fails (#4177)
 - fix(projects): restore project header width to 100% (#4176)
 - feat(sourceMaps): Embed sources in sourcemaps for lib builds (#4175)
 - chore(docker): bump package to 0.0.5 (#4171)
 - Bump amazon (#4170)
 - feat(core): Make HoverablePopover flip sides if there is not room to render on the provided side (#4173)
 - chore(*): Re-enable source maps (#4169)
 - fix: Fix the build. Remove bad @types/angular from yarn.lock (#4174)
 - fix(core): Fix undefined for getting length of commits (#4172)
 - style(development only): Added linting for colors (#4165)
 - (docs) Update Tooltip: Bake Configuration -> Base AMI (#4161)
 - feat(provider/gce): Support for connection draining in LBs. (#4167)
 - feat(kubernetes): surfacing timeout override for run job (#4162)
 - chore(amazon): bump package to 0.0.34 (#4164)
 - chore(core): bump package to 0.0.70 (#4163)
 - fix(travis) prefer complete buildInfoUrl over composing it. (#4143)
 - chore(search): tweak CSS styles per feedback (#4152)
 - refactor(*): Replace class-autobind-decorator with lodash-decorators BindAll (#4150)
 - refactor(*): Remove angular-loader in favor of using `.name` explicitly (#4157)
 - Update Tooltip: Pipeline Config -> Property File (#4156)
 - chore(imports): remove unused import (#4160)
 - feat(provider/gce): Support named ports for global LBs. (#4154)
 - fix revision history colors, tweak loading screen (#4153)
 - fix(react): Do not suppress unhandled rejections in promises. (#4155)
 - feat(provider/dcos): Enabling strategies for DC/OS. (#4158)
 - chore(*): Update react to 15.6.2 (#4159)
 - feat(provider/amazon): Show NLBs in the Load Balancer screen and allow NLB target groups to be selected when deploying (#4149)
 - Fix subnet selection box (#4124)
 - chore(search): update project icon (#4151)
 - chore(core): bump package to 0.0.69 (#4148)
 - chore(deps): Update lodash-decorators to 4.4.1 to prep for switch from @autoBindMethods to @BindAll (#4147)
 - fix(search): deduplicate cluster results by name (#4145)
 - feat(core/presentation): Add client side SpEL evaluator and Input Validator (#4140)
 - fix(docker) add ProxyPreserveHost On (#4122)
 - fix(search): add default method value (#4142)
 - chore(core): bump package to 0.0.68 (#4141)
 - fix(search): add supplemental searching capability (#4133)
 - feat(core/application): Add 'autoActivate' toggle for DataSources (#4139)
 - refactor(core/formsy): Refactor formsy, create react app-config saver (#4132)
 - chore(core): bump package to 0.0.67 (#4138)
 - fix(build): revert yarn.lock changes (#4136)
 - fix(halconfig): add missing comma in halconfig settings.js (#4134)
 - fix(pipelines): show loading message while fetching version history (#4131)
 - refactor(cluster): allow cluster pod header to be customized (#4127)
 - fix(pipelines): refresh relative start time on interval (#4129)
 - fix(pipelines): enlarge conditional expression input (#4130)
 - fix(pipelines): fix back link when execution cannot be found (#4125)
 - Fixed colors for the containers of server groups (#4128)
 - fix(pipeline): Artifacts feature flagged off by default. (#4126)
 - feat(pipeline): Add pipeline config section for artifacts. (#4118)
 - style(core): Found and replaced with closest colors for variables in color.less (#4120)
 - fix(core): Seatbelt optionalStage directive to make sure stage exists (#4121)
 - chore(*): Bump core and amazon module versions (#4119)
 - feat(core/pipeline): Support grouping stages that have a 'group' property (#4117)
 - fix(pipeline): remove pipeline refresh after del (#4115)
 - fix(pipeline): auto focus input field (#4116)
 - chore(spinner): fix react warning for missing key (#4113)
 - fix(provider/aws): Pre-populate spot price field with ancestor value on clone. Send '' instead of null when no spot price is requested. (#4114)
 - fix(style): fix small regressions on charts, history views (#4112)
 - Fixing colors throughout core with colors defined for styleguide (#4111)
 - style(styleguide): Added additional spinnaker colors (#4110)
 - chore(halconfig): Adds notification support (#4109)
 - refactor(core/pipeline): Convert PipelineGraph to React (#4099)
 - chore(search): change spinner to styleguide loader (#4108)
 - chore(search): move enabled filters (#4107)
 - Adding badges with squared borders that Adam can use (#4105)
 - fix(timeouts): updating help text to reflect new timeout behavior (#4106)
 - feat(search): add ability to search by type (#4104)
 - style(all): Added new page loading spinner (#4102)
 - fix(jenkins): allow duplicates in jenkins option lists (#4098)
 - fix(start): Allow package.json engines: { "node": ">=7.0.0" } (#4101)
 - feat (provider/ecs): Added ECS logo (#4100)
 - chore(core): bump package to 0.0.65 (#4097)
 - style(infrastructure): Add new spinner to infrastructure search (#4093)
 - style(spinner): Applying new spinner to global search (#4083)
 - style(responsiveness): Main spinnaker nav header responsiveness (#4076)
 - added support to show how to use spinners in react/angular (#4096)
 - fix(quay): Un-break quay build (#4095)
 - chore(core): bump package to 0.0.64 (#4094)
 - chore(core): bump package to 0.0.63 (#4092)
 - fix(package): Widen package.json engines fields (#4091)
 - Attaching selectors to input types (#4090)
 - chore(aws): bump package to 0.0.32 (#4088)
 - fix(pipelines): allow field removal when editing pipeline JSON (#4087)
 - style(openStyleguide): Open styleguide for everyone to use (#4077)
 - fix(webpack): fix svg rendering in devServer mode (#4084)
 - fix(aws): fix markDirty call on target group removal in clone dialog (#4085)
 - fix(pipelines): do not save changes to pipeline config on execution run (#4086)
 - feat(webpack): Improve performance of webpack build (#4081)
 - chore(core): bump package to 0.0.62 (#4080)
 - feat(search): add advanced search/filtering (#4072)
 - feat(core): allow data sources to be available only for configured apps (#4078)
 - refactor(core): Remove cruft from ManualJudgementExecutionLabel (#4079)
 - chore(amazon): bump package to 0.0.31 (#4074)
 - chore(core): bump package to 0.0.61 (#4075)
 - feat(pipelines): allow JSON editing of individual stages (#4071)
 - chore(core): bump package to 0.0.60 (#4073)
 - chore(*): Update typescript, tslint, and react (#4070)
 - fix(core/delivery): Stop trying to set stageSummary when null (#4069)
 - fix(provider/amazon): Fix AmazonLoadBalancerTag from exceptions when a target group cannot be found (#4068)
 - chore(amazon): bump package to 0.0.30 (#4067)
 - chore(core): bump package to 0.0.59 (#4066)
 - feat(provider/ecs): Added default settings to the cloud provider registry (#4065)
 - refactor(core): De-angularify OrchestratedItemTransformer (#4064)
 - feat(core): implement cluster matcher functionality (#4056)
 - feat(aws): add feature flag to disable spot price field (#4062)
 - refactor(core/delivery): Convert executions.transformer.service to TS (#4061)
 - feat(provider/ecs): Adding ECS as a cloud provider (#4063)
 - feat(provider/aws): Added support for setting spot price (#4043)
 - fix(core): fix rendering of manual judgment instructions (#4057)
 - fix(styles): fix icons under styleguide class (#4060)
 - fix(core): avoid accessing data source when not present or loaded (#4058)
 - fix(core/delivery): Seatbelt for undefined on execution filter destroy (#4059)
 - fix(core/executions): Fix execution details reloading every refresh (#4055)
 - bump core to 0.58 (#4054)
 - fix(core/executions): Remove `parallel` from Execution and Pipeline interface and usage
 - feat(gce/pubsub): Adds basic UI for configuring pubsub triggers. (#4052)
 - chore(amazon): bump package to 0.0.29 (#4048)
 - chore(core): bump package to 0.0.57 (#4051)
 - fix(core): render whats new content as html (#4049)
 - chore(core): bump package to 0.0.56 (#4047)
 - feat(core): replace marked with commonmark (#4046)
 - feat(amazon): implement preferSourceCapacity flag in deploy config (#4044)
 - chore(build): use npm 5.3.0 (#4042)
 - style(core): Add new spinner styles and a react component for spinner (#4039)
 - feat(amazon): make root volume size configurable on bake stage (#4045)
 - chore(amazon): bump package to 0.0.28 (#4041)
 - chore(amazon): bump package to 0.0.27 (#4040)
 - refactor(aws): consolidate scaling policy update operations (#4035)
 - chore(core): bump version to 0.0.55 (#4038)
 - feat(core): allow customization of manual judgment action labels (#4037)
 - feat(core): include address in context for instance links (#4036)
 - fix(core): sort regions in account/region/cluster selector (#4032)
 - chore(styleguide): fix styleguide config paths (#4034)
 - chore(core): fix build for styleguide (#4031)
 - chore(core): update to latest yarn (#4030)
 - chore(core): bump package to 0.0.54 (#4029)
 - chore(core): move /styleguide under /src (#4027)
 - chore(deck): removed executionEngine flag and force cancel option (#4028)
 - feat(pipeline_templates): adds link to template json (#4026)
 - fix(core): do not overwrite target percentages on rolling red/black (#4025)
 - refactor(core + canary): move shared canary components back to canary module (#4023)
 - style(core/styleguide) Cataloging Spinnaker styles in to a style guide (#4014)
 - feat(provider/kubernetes): add dns policy (#4024)
 - fix(core): Fix deploy template selection when one server group and no template selection is disabled (#4022)
 - chore(core): bump package to 0.0.53 (#4021)
 - fix(core): rename canary score component (#4020)
 - fix(core): add createServerGroup to list of candidate running stages (#4016)
 - fix(core/utils): Fix task running duration when longer than 31 days
 - fix(dcos): Add DC/OS to the list of default providers (#4017)
 - feat(dcos): Add DC/OS to halconfig settings.js (#4015)
 - chore(core): bump package to 0.0.52 (#4013)
 - feat(canary): configurable help fields for canary scores component (#4007)
 - fix(pipeline_graph): sort graph nodes lexicographically by refId if refId is a string (#4012)
 - chore(amazon): bump package to 0.0.26 (#4011)
 - fix(amazon): do not cache certificate data (#4010)
 - chore(core): bump package to 0.0.51 (#4009)
 - fix(pipelines): always show running executions and keep count in sync (#4003)
 - fix(pipelines): do not exponentially load single execution details (#4008)
 - feat(openstack): Add advance options to openstack bake configuration (#4006)
 - chore(core): bump package to 0.0.50 (#4005)
 - chore(core): bump package to 0.0.49 (#4002)
 - refactor(canary): convert canary scores component to React (#3999)
 - fix(core): remove blur handler on HoverablePopover (#4001)
 - fix(core/loadBalancer): Filter nulls from loadbalancers list (#4000)
 - feat(provider/dcos): Add servergroup and instance details (#3996)
 - chore(core): bump package to 0.0.48
 - fix(core/cluster): Fix sort order of accounts in clusters view (#3997)
 - feat(provider/dcos): Add the DC/OS load balancer wizard (#3989)
 - chore(build): Bump apache2 minimum version to a resolvable version. (#3995)
 - chore(amazon): bump package to 0.0.25 (#3994)
 - chore(core): bump package to 0.0.47 (#3993)
 - fix(core/loadBalancers): Fix z-index issues by converting load balancer list to a popover
 - feat(gce): adds support for configuring multiple persistent disks (#3980)
 - fix(aws): Change EBS optimized flag based on AWS defaults (#3991)
 - chore(docker): bump to 0.0.4 (#3990)
 - feat(docker): allow expressions in dockerImageTagSelector (#3988)
 - feat(provider/dcos): Add DC/OS server group wizard (#3986)
 - fix(k8s): allow containers with similar image names to be selected (#3987)
 - feat(provider/amazon): Add CRUD support for ALB listener rules (#3985)
 - feat(provider/dcos): Add DC/OS pipeline stages (#3981)
 - fix(core/loadBalancers): Render LoadBalancerWrapper to switch component based on cloud provider (#3983)
 - fix(core/reactShims): Fix runningTasksTag directive (#3982)
 - fix(apache2): lower bound apache2 version (#3876)
 - React clusters view (#3882)
 - refactor(aws): convert sg details advanced settings view to React (#3978)
 - fix(core/loadBalancers): Move initialization from constructor to componentDidMount
 - feat(provider/dcos): Add DC/OS module + ancillary pieces (#3975)
 - fix(core): fix alignment of copy-to-clipboard icon (#3976)
 - chore(core/search): unbreak core inf searching (#3977)
 - fix(aws/loadbalancer): ensure timeout < interval (#3974)
 - feat(core): add new tagging widget (#3966)
 - feat(provider/amazon): Combine load balancers and target groups in the deploy dialog (#3973)
 - feat(CI/Jenkins): Add parameter type checking/mapped elements to Jenkins (#3972)
 - chore(core): bump package to 0.0.46 (#3971)
 - Arch/fix positioning (#3969)
 - feat(pipeline_templates): add halyard feature flag for pipeline templates (#3970)
 - chore(imports): don't use alias for core imports (#3968)
 - fix(core): provide valid ids for scrollTo clusters (#3965)
 - chore(core): bump package to 0.0.45 (#3964)
 - fix(canary): show exception on STOPPED; extract deploy stages (#3963)
 - fix(core): avoid double-load of execution, treat FAILED_CONTINUE as isFailed (#3961)
 - fix(canary): clean up formatting on exception message (#3962)
 - chore(amazon): bump package to 0.0.24 (#3960)
 - chore(core/amazon): update webpack configs for sourcemaps/externals (#3959)
 - chore(amazon): bump package to 0.0.23 (#3958)
 - fix(amazon): properly set disableScaleIn flag on target tracking policies (#3957)
 - chore(core): bump package to 0.0.44 (#3956)
 - chore(amazon): bump package to 0.0.22 (#3955)
 - feat(amazon): implement target tracking policy support (#3948)
 - chore(core): bump package to 0.0.43 (#3954)
 - fix(core/servergroup): fix filter scrolling on ffx (#3953)
 - fix(core): Load balancers tag popup and runnings tasks popup show up under headers (#3952)
 - fix(core): Fix undefined error in ApplicationComponent (#3951)
 - chore(amazon): bump package to 0.0.21 (#3950)
 - chore(core): bump package to 0.0.42 (#3949)
 - fix(provider/amazon): If ASG only has one target group, tag should say target group (#3946)
 - fix(core): Fix activeState being null for application refresh (#3947)
 - feat(provider/amazon): Support add/remove instance from target group (#3945)
 - Update spinnaker-gradle-project to 3.15.0 for rpm support (#3901)
 - Updates settings for Oracle BMCS (#3935)
 - Fixes create security group controller notices for Oracle BMCS (#3936)
 - chore(core): bump package to 0.0.41 (#3944)
 - fix(core): add margin between collapsed execution group headers (#3943)
 - fix(core): update webhook stage scope on stage change (#3942)
 - chore(amazon): bump package to 0.0.20 (#3941)
 - chore(core): bump package to 0.0.40 (#3940)
 - feat(provider/amazon): Add ability to delete dependent ingress rules when deleting security group (#3939)
 - fix(core): Fix refresher to show the actual current state (#3937)
 - feat(provider/google): Support TCP Proxy Load Balancing (#3894)
 - chore(core): bump version to 0.0.39 (#3934)
 - fix(core): preserve reset methods on settings reset calls (#3933)
 - chore(core): bump package to 0.0.38 (#3931)
 - chore(amazon): bump package to 0.0.19 (#3932)
 - fix(core): update account tag color on account change (#3929)
 - feat(amazon): allow default VPC specification for security group creation (#3924)
 - refactor(): Update typescript to 2.4 and fix breaking changes
 - feat(stickyHeaders): Use pure CSS for sticky headers (#3923)
 - refactor(core): Update tslint to 5.5 (#3925)
 - chore(core): bump package to 0.0.37 (#3928)


### gate - v4.7.0
- fix(x509): Allow OAuth and x509 to be used together again
- fix(web) remove pipeline filter (#465)
- feat(core): Add provider version to cred controller (#464)
- properly enforce pipeline limit when using multiredis (#463)
- fix(serverGroup): fix typo in not found exception message (#461)
- chore(dependencies): spinnaker-dependencies 0.110.5
- feat(web): return x-spinnaker-request-id as a response header (#458)
- feat(web): Enable request trace header, log annotation (#455)
- test(LDAP): Adds ldap integration tests (#429)
- feat(x509): adds x509 certificate role extractor (#454)
- feat(v2-canary): add kayenta credentials endpoint (#451)
- fix(web): reverting pipeline refresh behavior because of front50 improvements (#456)
- fix(x509): add the cert identity as a role for authz checks
- feat(web): Expose the /v1/data/[static|adhoc] api from clouddriver (#448)
- fix(web): restoring default behavior to pipeline refresh (#449)
- perf(web): don't refresh pipeline config on pipeline start (#447)
- chore(springBoot): Upgrade to Spring Boot 1.5.4. Need to migrate all 'spring.oauth2' settings to 'security.oauth2' (#433)
- fix(pipeline_templates): prevent expression evaluation during template update operation (#444)
- feat(web): Filter applications by owner email (#445)
- feat(search): enhance searching capabilities (#443)
- feat(web): Add user to save pipeline & pipeline template tasks (#442)
- feat(canary-v2): adds canary judge endpoint (#441)
- fix(pipelines): add logging, guards in pipeline save code (#440)
- feat(web): AuthenticatedRequest user origin extraction (#439)
- fix(core): disable favorPathExtension (#438)
- feat(web): Save pipelines via orca (#436)
- fix(web): Bubble-up orca MPT errors to API (#435)
- Revert "refactor(web): Update pipelines now goes through orca tasks (#422)" (#434)
- chore(hystrix): Change to return a 503 instead of 429 (#427)
- feat(canary): v2 canary delete endpoint (#430)
- feat(pipeline_templates) delete template operation (#431)
- refactor(web): Update pipelines now goes through orca tasks (#422)

### igor - v1.75.1
 - chore(jenkins): Make logs less chatty (#187)
 - feat(travis/commit_info) Add commit message to the scm payload (#186)
 - feat(travis/commit_info) Add committer and compareUrl to the build status. (#185)

### rosco - v0.99.0
 - chore(gradle) Update buildRpm task to require unzip (#221)
 - chore(dependencies): Bump spinnaker-dependencies version (#220)

### clouddriver - v1.684.0
 - (feat/cats) Add support for an error interval for clustered agent schedulers (#1895)
 - fix(provider/kubernetes): fix k8s client configuration and image id p… (#1933)
 - fix(appengine): Dont assume storage.gce.enabled=true (#1953)
 - fix(provider/gce): Paginate server groups when calculating next name. (#1948)
 - fix(rollbacks): support for tolerating some instance failures (#1922)
 - feat(provider/kubernetes): Properly version all versioned resources (#1945)
 - fix(provider/docker): Assign proper Spinnaker/<version> user agent (#1946)
 - feat(appengine): Deploy from Google Cloud Storage [accounts]. (#1935)
 - feat(provider/docker): Added insecure registry support (#1887)
 - fix(provider/gce): s/it/cacheData/ in zonal svg caching agent. (#1944)
 - feat(provider/google): Support connection draining for LBs (#1943)
 - feat(moniker): Add monikers to security groups & load balancers (#1941)
 - fix(provider/google): Fix named port defaults in server group deploy. (#1939)
 - feat(moniker): Adds moniker to pendingOnDemandResults (#1940)
 - refactor(provider/kubernetes): refactor artifact gen (#1938)
 - feat(provider/google): Adds support for multiple named ports in load balancers. (#1930)
 - fix(all): Broken k8s server group lookup breaking all components (#1937)
 - feat(provider/kubernetes): Cache v2 resources as artifacts (#1931)
 - feat(moniker): adds moniker to server group view model (#1936)
 - fix(provider/kuberentes): v2 guard against non-existent clusters (#1934)
 - fix(provider/kubernetes): v2 guard against empty cache relationships (#1932)
 - feat(provider/kubernetes): Integrate moniker into v2 (#1929)
 - feat(provider/kubernetes): Build v2 creds based on context & kubeconfigFile (#1925)
 - feat(provider/kubernetes): v2 cache network policies (#1927)
 - refactor(provider/kubernetes): v2 cache view lives in cache package (#1926)
 - fix(provider/kubernetes): Advanced targetSize use case. (#1920)
 - chore(provider/kubernetes): Use version 0.2.0 of client-java (#1923)
 - feat(provider/kubernetes): V2 Cluster details (#1918)
 - feat(search): add fallback query param to search (#1912)
 - fix(web): Guard against not finding a ClusterProvider (#1921)
 - fix(aws): CopyLastAsgAtomicOperation instance monitoring.
 - feat(provider/kubernetes): Attach k8s annotation monikers to v2 (#1917)
 - chore(javadocs): Fix lt usage (#1916)
 - feat(moniker): Adds moniker to all clusters & server groups (#1915)
 - refactor(provider/kubernetes): Rename duplicate classes (#1913)
 - refactor(core): s/version/providerVersion (#1914)
 - feat(provider/kubernetes): V2 cluster provider (#1911)
 - feat(provider/kubernetes): Register k8s moniker for manifests (#1910)
 - feat(provider/kubernetes): Add proper support for source capacity. (#1906)
 - refactor(provider/kubernetes): Segregate k8s by provider version (#1909)
 - fix(provider/aws): Clone spot price if not explicitly specified. (#1908)
 - refactor(provider/kubernetes): V2 swap kind & version in cache key (#1907)
 - feat(provider/kubernetes): v2 version deployed manifests as resources (#1905)
 - Revert " fix(provider/aws): ensure STSAssumeRoleSessionCredentialsProvider get the right endpoint (#1888)" (#1904)
 - feat(provider/kubernetes): v2 Cache lb & scg relationships (#1902)
 - fix(provider/docker): fix client constructor (#1903)
 - feat(provider/docker): add catalogFile option (#1890)
 - refactor(provider/kubernetes): v2 include api version in resource id (#1901)
 - feat(provider/kubernetes): v2 generic on demand caching (#1884)
 - fix(provider/aws): ensure STSAssumeRoleSessionCredentialsProvider get the right endpoint (#1888)
 - feat(provider/kubernetes): add daemon & stateful set support
 - fix(provider/kubernetes): Add missing credential props (#1897)
 - fix(google): Add statusCode tag to google API metrics (#1886)
 - fix(provider/aws): trim whitespace when newlines are detected (#1844)
 - feat(provider/aws): Remove ability to automatically remove dependencies when deleting a security group (#1894)
 - fix(search): allow SearchProvider filter exclusion (#1883)
 - fix(aws/tags): ensure tag sync is always performed during allow launch
 - feat(provider/kubernetes): Annotate templates as well (#1880)
 - feat(provider/kubernetes): Cache pods (#1879)
 - feat(provider/ecs): Made EcsCloudProvider public (#1848)
 - feat(search): add filters to project search (#1878)
 - feat(provider/kubernetes): Infer relationships from ownerReference (#1876)
 - docs(intellij): Describe how to enable lombok in intellij (#1869)
 - Additional fix for issue 1632, not able to find AMI with encrypted snapshots in target/managed account (#1846)
 - feat(search): update application search (#1875)
 - feat(provider/kubernetes): Cache arbitrary resource (#1873)
 - feat(provider/kuberenetes): V2 deployments (#1868)
 - chore(provider/kubernetes): On demand caching tests (#1871)
 - feat(provider/kubernetes): Fix on demand caching (#1870)
 - refactor(provider/kubernetes): Share caching agent abstraction (#1865)
 - feat(provider/kubernetes): Add spectator to v2 client (#1866)
 - explicitly setting the maximum size to 100 for calls to describeASG (#1863)
 - fix(provider/aws): Remove copySourceSpotPrice property (#1833)
 - refactor(provider/kubernetes): Pull v1 cache code into separate class (#1864)
 - refactor(provider/kubernetes): Move v1 cache code into v1 package (#1862)
 - feat(provider/kubernetes): V2 deploy other resources (#1856)
 - fix(provider/google): s/IllegalFormatException/IllegalArgumentException. (#1860)
 - fix(amazon): Fix a couple of rather obvious s3 proxy issues (#1858)
 - fix(discovery): skip terminated instances when enabling a disabled asg (#1857)
 - feat(amazon): Support a generic proxy for static content stored in S3 (#1838)
 - feat(provider/kubernetes): V2 Deploy replica set (#1855)
 - feat(provider/docker): Adds configuration of Docker image caching agent. (#1854)
 - fix(provider/google): Handling edge cases with user data files better. (#1852)
 - feat(provider/ecs): Introduced atomic operation stubs (#1826)
 - fix(refactor/google): Avoid casting deserialized GCE resources to model classes. (#1851)
 - feat(provider/kubernetes): V2 Annotations (#1849)
 - test(cluster): Tests against both possible `ClusterController.getServerGroup()` return values (#1847)
 - fix(perf): ClusterController.getServerGroup() should use region if supplied (#1845)
 - fix(authz): Ensure operation checker does not NPE on null annotations. (#1843)
 - fix(perf): Restrict the recent ClusterController-focused perf changes to aws (#1842)
 - feat(provider/kubernetes): V2 operation init (#1835)
 - fix(kubernetes): Hack to include essential server group details when queried from ClusterController or ServerGroupController (#1841)
 - fix(provider/appengine): fix server group endpoint (#1840)
 - feat(core): Version provider accounts/operations (#1820)
 - fix(provider/appengine & provider/kubernetes): Server group lookup (#1834)
 - chore(docs): fix javadocs to unbreak travis (#1830)
 - feat(search): enhance searching capabilities (#1823)

### fiat - v0.30.2
 - chore(dependencides): bump spinnaker-dependencies to 0.109.2 (#199)
 - fix(ldap): Bump LDAP lib version (#198)
 - chore(springBoot): Upgrade to Spring Boot 1.5.4 (#195)
 - fix(hystrix): Sets default timeout on calls to Front50/Clouddriver to 20s (#191)
 - feat(permissions): Add ability to specify permissions in a file, rather (#187)
