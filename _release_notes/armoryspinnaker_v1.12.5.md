---
layout: post
title: v1.12.5 Armory Enterprise Release
order: 952
---

# 4/2/18 Release Notes
{:.no_toc}
> Note: this is the release notes comparing against [v1.10.207](https://docs.armory.io/release-notes/armoryspinnaker_v1.10.207/), because v1.11.262 has stability issues.

> Note: For some cases we are seeing issues when passing parent parameters using SpEL, or pipeline expressions, to child pipelines from parent pipelines.

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback).
> 

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Highlighted Updates
### Armory

#### Platform&trade;
- Slackbot Alpha
- Oneclick Alpha


#### Deck-Armory
- New styling for splash page
- New styling for Spinnaker background



###  Spinnaker Community Contributions
We've are now tracking Spinnaker releases, namely, [release-v1.6.x](https://www.spinnaker.io/community/releases/versions/1-6-0-changelog) instead of HEAD of each subservice for stability purposes.

This release has early access functionality for the [Kubernetes V2 provider](http://docs.armory.io/user-guides/kubernetes-v2/), modifies trigger execution and processing within Orca, and adds ECS support.




<br><br><br>
## Detailed Updates
### Armory
#### Packager&trade; - 1a895af
 - increment version for change from release branches (#302)
 - Pull in the full version from extended components (#301)
 - Use port 5001 (#299)
 - Expose Slack callback port 10000. (#298)
 - Grr. Wrong env var here. (#296)
 - Add platform config for deck to pick up (#295)
 - Ah, "platform" wasn't docker-specific. (#294)
 - Fix kayenta references (#292)
 - Add dinghy to armoryspinnaker (#291)
 - Although it's under Armory for now, it's Spinnaker (#290)
 - ENG-1422 add kayenta to distro (#289)
 - Update igor.yml (#288)
 - First configuration attempt for Kayenta. (#286)
 - append, not override resolved.env (#285)
 - reversing the order of resolution because some use default.env (#284)
 - Adds platform to the list of upstream projects
 - Adds the setting to keep platform from running cron on nonpolling
 - unpinning orca (#281)
 - Eng 1341 platform (#279)
 - Incr minor (#280)
 - unpinning cd (#278)
 - pinning orca to rc candidate (#277)
 - unpinning orca (#276)
 - Rosco 0.104.0 has changed the default back type back, try unpinning (#274)
 - Looks like this unpinning broke k8s deploys (#273)
 - Unpinning orca, the 6.2.8 release is working for all tests (#272)
 - Pinning orca again, webhooks are still broken (#271)
 - Remove the orca pin, retesting webhooks (#270)
 - we have to remove secrets because it collides with a user provided one (#269)
 - fixing default credentials in our configuration (#268)
 - Revert "Removing the orca pin, retesting webhooks (#266)" (#267)
 - Removing the orca pin, retesting webhooks (#266)
 - Pin rosco, changes to spot pricing settings are erroring (#265)
 - Datadog canary is failing, trying to roll back (#264)
 - Repin orca cause webhooks are failing (#263)
 - Checking to see if fixes in deck resolve the webhook issue (#262)
 - Pin Orca at previous (#261)
 - unpin rosco and clouddriver (#260)
 - pin clouddriver for breaking kub v2 server groups (#259)


#### Lighthouse&trade; - 86bfefa
 - Need to healthcheck platform when it is enabled. (#135)
 - Should not save these docker-compose files. (#136)

#### Platform&trade; - master-41aefad
- Slackbot Alpha
- Oneclick Alpha

#### Dinghy&trade; - master-f2716b5
- Pipelines as Code Alpha

#### Gate-Armory - 0191333
No changes


#### Echo-Armory - d0feee3
 - armory webhooks were throwing exceptions due to content being null (#50)
 - Use our Jenkins build instead of OSS when pulling the parent project (#48)
 - add conditional on expression to handle missing configs (#49)
 - namespaced classes to avoid conflict with OSS echo (#47)
 - Webhook event (#46)
 - add application to jira comments (#45)
 - if moniker exists, fill in template (#44)


#### Deck-Armory - 17004dd
 - Update detail lines in EventList and open typing for detail to any
 - Fix styling of buttons
 - 🛡 New package.json with some things for fancy Glamorous styling in the future
 - Integrate new typing structure for existing components
 - Update application of ArmoryWrapper for consistency and simplicity
 - Export a single component from ArmoryInsightFeed
 - Move contents of AmoryInsightFeed component to their own component folders
 - ArmoryPRNotification moves to its own component
 - Use ArmoryPageWrapper component effectively
 - Refactor to use ArmoryPageWrapper component
 - Add new typings from /types, adjacent to /components and /pages
 - Remove old separate types file from within the ArmoryInsightFeed component
 - Restore nav.js and other tweaks
 - 🏅 Bring back the bulk of the styling
 - Use the gate proxy to platform. (#202)
 - ENG-1484 slackbot feature flag (#201)
 - add webhook trigger features (#200)
 - extend webpack.common.js by using OSS and webpack.config.js (#199)
 - Error when overriding OSS packages and cleanup package.json (#197)
 - 🍱 CSS Namespacing to save Deck (#198)
 - Change to a copy/paste friendly example (#196)
 - Moving the pin for deck OSS forward (#195)
 - bring back lambda (#193)
 - Check for Kayenta enabled, add config hash if so. (#192)
 - UI Updates (#188)
 - fix linting (#186)
 - Update manual judgment actions (#191)
 - Add manual judgments to insight feed (#190)
 - add platform host to settings template so that it can be changed from ~/.spinnaker/spinnaker-local.yml (#189)
 - update styling for errmsg (#187)
 - sometimes there's no subscriptions to refresh. (#185)
 - the component didn't mount yet, but the DataService already has data (#184)
 - default sla to 77.7% to workaround no data before component is mounted (#183)
 - Add tooltips to each deploy in Understand graph (#181)
 - added sla percent to the title (#182)
 - made insights page a little better (#180)
 - Added button to open links (#175)
 - better loading message (#177)
 - Eng 1381 (#179)
 - Eng 1385 (#178)
 - Make Pagination work (#176)
 - warning if appname is worng, display giturl after creation and fixed golang/scala images (#174)
 - Rollback button in UI should work (#173)
 - fix bug (#172)
 - redraw graph on app change (#171)
 - Show graph "to present". (#170)
 - fixed setState when not mounted and linting (#169)
 - Add app selection to Insights (#168)
 - Add ability to select the application from a dropdown (#167)
 - Add SLA history to graphs (#166)
 - Insights, Modal, and Understand Styling Cleanup (#165)
 - Eng 1370 (#164)
 - Use Google Charts for graphs (#163)
 - stats! (#156)
 - Cleaning up all the styles! (#161)
 - ENG-1973: Make sure limits are saved as numbers (#162)
 - UI Additions (#160)
 - Fixes (#159)
 - Do not allow duplicate Insights (#158)
 - Use default lookback time for violations (#157)
 - ENG-1249: Add bars showing deploys (#155)
 - made event stream more human readable (#154)
 - render understand event stream (#153)
 - Fix subs (#152)
 - Generic data to insight parsing. Show unmerged PRs (#150)
 - Removed warnings (#149)
 - Insights feed (#147)
 - display timeline events for understand page (#145)
 - Chart (#143)
 - fix webpack warnings (#142)
 - add container components (#141)
 - Eng 1329 header (#139)
 - added uuid to the sla definition json (#140)
 - bring sla back... for real (#138)
 - added padding inside panel around custom sla metric (#136)
 - prevent user from removing sole SLA defn (#135)
 - Eng 1321 (#134)
 - Link SLA to App Config (#133)
 - Eng 1329 (#132)
 - bring back the SLA% in the nav bar!! fixed warnings (#131)
 - Two apps (#130)
 - disable cloudprovider input for cloudwatch and default to aws (#129)
 - make aggregator for datadog a dropdown (#128)
 - pinned message should be different than armoryspinnaker's (#127)
 - fixed LB name issue (#126)
 - add option to delete sla definition (#125)
 - Custom SLA metric definition
 - release bot will warn if there's pins for deck (#123)
 - dynamic merge of node modules from OSS deck (#122)
 - Cleanup, factors out two functions and adds some comments. (#121)
 - Pinning deck modules at a version from before the load balancer problem (#115) (#120)
 - Pin react-select at exactly 1.0.0-rc.5 (anything beyond is having issues (#119)
 - armory logo links to armoryspinnaker pipeline executions (#118)
 - add link back to spinnaker pipelines to do a redeploy (#117)
 - Pinning at older deck was breaking pipeline creation (#116)
 - Pinning deck modules at a version from before the load balancer problem (#115)
 - Switch between loading SLA from platform and lighthouse/gate (#114)
 - Fixing typo. (#113)
 - webpack has trouble reading into functions for requires (#111)
 - Eng 1227 (#106)
 - Wrong path for where node is installed (#110)
 - Clean the local versions of yarn and node (#109)
 - export PATH (#108)
 - ENG-1266 fix settings.js webpack giant builds (#107)
 - Eng 1246 replay (#104)
 - Revert "ENG-1225 (#100)"
 - Revert "Remove dual header for now (#102)"
 - Remove dual header for now (#102)
 - ENG-1225 (#100)
 - Added formik (#101)




###  Spinnaker Community Contributions

#### Orca  - release-1.6.x-d0ba41ed8    
- fix(spel): Revert "fix(spel): Operate on evaluated stage in handlers. (#1972)" (#2075)
- fix(notifications): sending required fields to echo (#2007) (#2008)
- fix(artifacts): fix unconverted artifacts on triggers (#2001) (#2002)
- fix(stage): npe no longer thrown when stage name is not present (#1999) (#2000)
- feat(artifacts): allow stages to 'produce artifacts' (#1994)
- fix(trigger): Add trigger to processed pipeline (#1988)
- Further fixes for #1937. To also make it work with #1941, I couldn't just simply copy the trigger as was done before.
- fix(queue): Only remove synthetic stages if there are replacements (#1992)
- Currently any non-started synthetic stage is removed from the graph
- even if there are no `onFailure` stages to replace them.
- fix(windows): NPE if skipRemainingWait is not set
- fix(trigger): orchestrations may have no trigger
- refactor(trigger): determine trigger types based on fields present not declared type
- refactor(trigger): determine trigger types based on fields present not declared type
- fix(triggers/kubernetes) - triggers need to know where to find the account field
- fix(core): use correct object mapper for context processing (#1984)
- fix(clouddriver/kubernetes) - Handle complex security group descriptions for kubernetes ingresses. (#1975)
- feat(rollback): Support for automatic rollback when a deployment fails (#1944)
- fix(jenkins): ignore full display name in trigger
- fix(provider/kubernetes) - fixes exception when deploying with manual or container based trigger
- feat(core): Allow a synthetic stage to override `stageTimeoutMs` (#1978)
- fix(spel): Operate on evaluated stage in handlers. (#1972)
- chore(cruft): HOW DO THESE KEEP COMING BACK? I SWEAR I'VE DELETED THEM LIKE 3 TIMES NOW
- fix(trigger): fix NPE caused by changing PipelineTrigger to a map
- fix(trigger/jenkins): add support for display path (#1971)
- fix(artifacts): fix passing of pipeline artifacts (#1970)
- fix(pipelines): Fix templated pipelines not being triggered
- fix(artifacts): supply commit version (#1968)
- Appending to log file (#1965)
- feat(artifacts) Artifact passing in pipelines (#1966)
- fix(webhook): Deprecate use of buildInfo (#1959)
- fix(manualJudgment) - Allows user to manually override timeout for stage
- feat(provider/kubernetes): v2 Add find artifacts from resource stage (#1914)
- chore(docker): Upgrade base image (#1946)
- chore(queue): Remove execution logs endpoint (#1962)
- fix(persistence): fix bugs when running w/previousRedis (#1960)
- fix(triggers): verify a trigger is a Jenkins trigger before trying to pull buildInfo
- feat(dryrun): pipeline stages and strategies can run for real
- feat(dryrun): dry run strategies and downstream pipelines
- feat(dryrun): Stubs for Titus bake and run job
- fix(trigger): trigger params & artifacts need to be mutable
- fix(trigger): Fix bug with trying to read trigger during initialization
- feat(provider/kubernetes): support multiple docs in one artifact (#1955)
- chore(echo): Stop storing redundant information with each stage
- feat(dryrun): Run manual judgment in dry run
- feat(dryrun): allow different stubs for different cloud providers
- fix(wait): Wait stage seems to sometimes get decimal waitTime
- chore(spel): Add forgotten spec for webhook body fix. (#1949)
- fix(spel): Fix assumptions made that were broke by #1892. (#1947)
- fix(core): Fix auth propagation from manual judgment stages (#1945)
- test(pipelines): Improve failed pipeline tests (#1943)
- fix(triggers): fix instances of Groovy code assuming triggers are Maps
- fix(pipeline/validate): throw pipeline error _after_ recording failure (#1942)
- fix(triggers): evaluate incoming triggers (& artifacts) (#1941)
- fix(pipelines): Improve pipeline error reporting (#1937)
- fix(triggers): derived properties of Jenkins triggers
- chore(expressions): fix javadoc (#1939)
- fix(amazon): derive image regions when tagging from Clouddriver data (#1936)
- fix(clouddriver): Fixing trigger interaction inside deploy strategy codepaths
- fix(trigger): Remove redundant parsing of artifacts
- fix(artifacts): fix bind behavior (#1932)
- feat(dryrun): Dry run is a flag not a separate trigger type
- fix(redis): Fix bug starting Redis pool with no path on the connection
- chore(java): Convert all Groovy in orca-core to Java
- chore(canary-v2): Pass application and parent pipeline execution id to canary runs. (#1929)
- Trigger types (#1890)
- More useful dry run (#1924)
- refactor(queue): Queue as a standalone library (#1916) (#1928)
- chore(queue): Increase work queue poll interval
- fix(queue): Execution w/o initial stages should go TERMINAL immediately (#1925)
- fix(core): Correctly handle "" when parsing `requisiteStageRefIds` (#1923)
- chore(warnings): when in doubt, go utf8
- chore(warnings): make operator precedence explicit
- chore(warnings): replace String::split with Splitter::on
- chore(warnings): Add missing @Override annotations
- fix(core): ancestors() of a synthetic stage should include `STAGE_BEFORE` siblings (#1920)
- chore(restarts): remove redundant logic from stage restart methods
- fix(queue): synthetic stages aren't restartable (#1919)
- chore(): Cleanup appConfig cruft
- fix(rrb): Include pipeline parameters when invoking validation pipeline (#1915)
- chore(cruft): Removed unused executionEngine flag
- fix(canary-v2): Ensure that at least one canary interval exists. (#1913)
- fix(front50): save with existing pipeline index (#1910)
- fix(persistence): remove javafx dep for vanilla openjdk (#1912)
- fix(clouddriver): fix IndexOutOfBoundsException in tag cleanup (#1911)
- chore(dependencies): Newest of the new Kotlins
- fix(persistence): fix updateStageContext bug, add test (#1908)
- fix(migrations): jedisPoolPrevious bean is now conditional (#1907)
- refactor(persistence): java rewrite (#1903)
- perf(clouddriver): skip cooldown on disable if no server groups disabled
- refactor(appengine): Reduce artifact resolve code (#1899)
- fix(spel): Evaluate stage notifications before sending. (#1906)
- chore(build): remove accidentally committed file
- chore(kotlin): Kotlin 1.2.20 syntax updates
- chore(kotlin): Apply kotlin-spring plugin
- chore(build): don't default to using Groovy
- fix(expressions): restrict spel fx deployedServerGroups to valid deploy stages (#1901)
- feat(canary-v2): Support specifying multiple scopes per canary request. (#1900)
- feat(keel): upsert and delete intents through stages (#1891)
- fix(queue): s/Registering/Refreshing (#1898)
- fix(queue): Move `RedisActiveExecutionsMonitor` off @Scheduler thread (#1897)
- fix(queue): Add the metrics for the task scheduler thread pool
- fix(queue): Handle completing stage after error in planning
- fix(queue): Give Spring's scheduler a thread pool
- chore(dependencies): Latest Kotlin
- fix(monitor) unwire RedisActiveExecutionsMonitor (#1895)
- Fix typo in Dockerfile.slim
- chore(core): Consistency around `Millis` suffix on `task.*` values
- fix(core): WaitForNewUpInstancesLaunchTask should support stage-level timeout override (#1893)
- fix(spel): Evaluate expressions in synthesized stages. (#1892)
- feat(webhooks): support preconfig params (#1887)


#### Echo  - release-1.6.x-be7fd9e    
- fix(stage notifications): consuming updated orca payload (#238) (#239)
- fix(pubsub): changing amazon subscription name (#237)
- fix(sqs): worker startup conditional on enabled (#236)
- fix(sqs): fix startup (#235)
- feat(pubsub): adding support for AWS SQS/SNS (#231)
- feat(notifications): Allow processing when template group is not passed in request (#234)
- refactor(pubsub): adding redisClientDelegate (#233)
- chore(halconfig): add redis config (#232)
- Appending to log file (#229)
- feat(artifacts): default dockerhub artifact parser (#228)
- chore(docker): Upgrade base image (#227)
- chore(pubsub): bump google pubsub client library (#226)
- fix(webhooks): assorted triggering problems (#225)
- fix(tests): Small fixes to PubsubEventMonitorSpec (#224)
- feat(pubsub): add translate helpers (#220)
- fix(webhooks): Correctly deserialize webhook artifacts (#222)
- fix(tests): Move tests to correct package as source (#223)
- fix(pubsub): Add payload to pubsub triggers. (#221)
- fix(triggers): Include image as a received artifact for Docker (#219)

#### Deck  - release-1.6.x-fd93a1700    
- fix(provider/kubernetes): v1 namespace lookup (#4950) (#4951)
- fix(provider/gce): Fix call to list backends (#4946)
- fix(provider/kubernetes): update stage's kind when controller's rawKind changes (#4940) (#4944)
- fix(artifacts): Fix no expected artifacts message (#4943)
- fix(provider/kubernetes): deploy manifests array nests itself on save (#4921) (#4935)
- feat(kubernetes): Surfacing timeout override for Deploy (Manifest) (#4871) (#4895)
- Revert "fix(core/pipeline): Fix pipeline config - add stage that uses BaseProviderStageCtrl (#4885) (#4891)" (#4894)
- fix(core/pipeline): Fix pipeline config - add stage that uses BaseProviderStageCtrl (#4885) (#4891)
- fix(provider/kubernetes): add type to manifestController resolver funcs (#4882)
- fix(provider/kubernetes): delete action broken for all but server groups (#4880)
- fix(artifacts): show artifact execution config (#4870) (#4876)
- chore(amazon): bump to 0.0.74
- fix(amazon): Fix lint
- fix(aws): filters target groups to only instance type ones (#4859)
- feat(artifacts): allow specific stages to 'produce' artifacts (#4858)
- fix(package): add `.cache-loader` to the dirs cleaned by `npm run clean` (#4857)
- fix(core/canary): don't die if the `monitorCanary` synthetic stage is missing (#4856)
- feature(provider/kubernetes): hide stages in applications with only k8s v2 account (#4855)
- fix(amazon/loadBalancers): Remove clear all from security group select (#4854)
- chore(core): bump package to 0.0.149 (#4852)
- fix(core): allow overflow on details panel for menus (#4850)
- refactor(core): convert security group filter service to TS (#4849)
- refactor(core/filterModel): Refactor filter.model.service to a typescript class (#4846)
- fix(provider/appengine): gcs storage account -> artifact account (#4847)
- chore(amazon): bump package to 0.0.73 (#4841)
- fix(core): restore pod header widths to fill container (#4845)
- fix(core/stages): Hide excluded providers (#4831)
- feat(core/pipelines): allow triggering of execution via deep link (#4844)
- fix(provider/kubernetes): fix instance dereg lb (#4842)
- fix(amazon/serverGroup): Fix opening of Advanced Settings modal (#4840)
- fix(core): avoid scrollbars in cluster pod header (#4836)
- fix(core/accounts): fix versioned account lookup (#4837)
- chore(amazon): bump package to 0.0.72 (#4835)
- fix(amazon/vpc): Fix initial render of vpc (#4834)
- refactor(amazon): remove local storage caches: instance types, load balancers (#4777)
- fix(openstack/instance) - Add custom instance links to details. (#4827)
- fix(core): add authorized field to test accounts (#4832)
- fix(provider/kubernetes): allow stages to exclude specific provider versions (#4825)
- chore(core): Bump to 0.0.148 (#4830)
- fix(core/*): Fix viewing of account badges, and servergroup/instance/foo details for accounts you don't have access to (#4829)
- feat(dryrun): some style changes (#4826)
- Fix a couple server group details issues (#4828)
- chore(help): Swap server groups for ASGs in Chaos Monkey tooltip. (#4824)
- support custom apiPrefix in a k8s account (#4664)
- feat(provider/kubernetes): v2 Add find artifacts from resource stage (#4732)
- Added variables to the zindex styleguide file (#4796)
- chore(amazon): Bump to 0.0.71
- chore(core): Bump to 0.0.147
- fix(amazon/serverGroup): Fix edit scaling processes button (#4823)
- feat(provider/kubernetes): adds missing details (#4820)
- fix(amazon/serverGroup): Make sure image exists before showing details (#4821)
- feat(artifacts): better default artifact behavior (#4817)
- fix(core/serverGroup): Fallback to no providerVersion if user does not have account permission (#4818)
- bump version (#4816)
- feat(provider/kubernetes): List trigger artifacts in execution status (#4813)
- fix(core): Don't use '@spinnaker/core' imports inside core package (#4815)
- fix(amazon/serverGroup): stop closing details panel after it was closed once (#4812)
- fix(amazon/loadBalancer): Handle when ALB listener actions may not have a target group (#4810)
- feat(provider/kubernetes): provide name of deployed manifest (#4811)
- feat(dryrun): distinguish dry run pipelines in execution view
- feat(provider/kubernetes): support mulitple manifests from text (#4808)
- fix(core/loadBalancer): Only parse load balancer health state if exists (#4807)
- fix(core/serverGroup): Add key to running tasks in server group details (#4806)
- chore(amazon): Bump to 0.0.69
- chore(core): Bump to 0.0.145
- chore(amazon): Bump to 0.0.68
- chore(core): bump to 0.0.144
- feat(amazon/loadBalancer): Better target group validation
- feat(core/presentation): Add helper components/functions for form validation
- fix(amazon/serverGroup): Show enable server group when appropriate (#4803)
- Aligning react inputs to spinnaker select styles (#4802)
- chore(linter): missed " inplace of ' (#4801)
- feat(provider/kubernetes): useful UI metadata (#4800)
- chore(docker): Upgrade base image (#4799)
- fix(core/task): Set PlatformOverrideHealthMessage state properly (#4797)
- fix(core/pipeline): When deselecting the last filter, update executions properly (#4794)
- chore(amazon): bump package to 0.0.67 (#4795)
- chore(core): Bump module to 0.0.143 (#4793)
- chore(core): Bump module to 0.0.142 (#4792)
- feat(dryrun): enable/disable dry run with a feature flag
- fix(amazon/serverGroup): Fix showing server group actions (#4791)
- fix(amazon/serverGroup): Close the server group details if server group cannot be found (#4789)
- fix(amazon/serverGroup): Guard against missing launchConfig in details (#4788)
- fix(amazon/loadBalancer): Disallow editing port/protocol (#4782)
- fix(core/pipeline): Sometimes executions do not have stages; still show details (#4781)
- fix(core/search): Select first search tab with >0 results, if no tab is already selected. (#4785)
- fix(core): parameter descrption and default arent required (#4786)
- chore(core): Bump module to 0.0.141 (#4784)
- feat(dryrun): temporarily disable dry run until Orca goes out
- chore(core): Bump module to 0.0.140 (#4780)
- chore(amazon): bump package to 0.0.66 (#4779)
- feat(core/search): Consolidate search registries and v1/v2 data fetching (#4775)
- fix(core): restore auto-scroll on deep linked server group render (#4776)
- fix(core): Fix missing wizard section labels (#4778)
- refactor(core/search): Clean up GlobalSearch, make state mgmt. way less flaky (#4760)
- refactor(amazon/loadBalancer): Pull out load balancer create type since it is generic
- fix(core/loadBalancer): Fix create load balancer button for multiple providers.
- fix(core): avoid flickering scrollbars in clusters view (#4774)
- fix(rxjs): switch RxJS deep imports to `import { Foo } from 'rxjs'` (#4772)
- fix(core): shrink tag marker to fit better in cluster header (#4773)
- feat(core/application): reactify applications search (#4759)
- fix(provider/kubernetes): stack/detail aren't required (#4770)
- fix(provider/appengine): Spelling mistake (#4771)
- fix(core/search): Remove angular2react bridging of native react component (#4763)
- fix(provider/appengine): dont throw error when git credentials are missing (#4768)
- fix(core): handle challengeDestructiveActions being undefined in API response (#4766)
- chore(amazon): bump package to 0.0.65 (#4767)
- fix(amazon): restore server group actions (#4765)
- fix(core/cluster): Vertically align icons and make them the same size (#4764)
- chore(amazon): Bump module to 0.0.64
- chore(core): Bump module to 0.0.139
- feat(amazon/serverGroups): Convert server group details to react
- feat(core/serverGroup): Prepare for Reactification of provider server group details
- fix(core/search): Vertically center spinners and 'no results found' messages (#4758)
- feat(dryrun): made dry run a flag on the trigger rather than a different type (#4761)
- fix(core): consistent button sizing in details panels (#4757)
- fix(provider/kubernetes): remove a trailing 'for' from title (#4756)
- chore(core): bump package to 0.0.138 (#4755)
- feat(dryrun): added a checkbox to let users dry run pipelines (#4747)
- refactor(core): limit calls to /credentials (#4752)
- fix(core): eagerly fetch more than one cluster grouping pod (#4753)
- fix(amazon): copy EBS volumes when explicitly cloning an ASG (#4754)
- feat(details): Migrate the following to @Overridable() decorator: (#4749)
- feat(core/overrideRegistry): Add react component decorators to enable UI overrides (#4741)
- fix(core): allow multiselect toggling on instance checkbox click (#4745)
- style(pipelines): Remove explicit use of $q.defer (#4746)
- fix(details): allow details dropdowns to wrap (at smaller widths). remove clearfix (#4748)
- feat(core): allow hidden (but enable-able) data sources (#4738)
- fix(core/search): Export the new GlobalSearch react component (#4750)
- fix(pipelines/help): explains when concurrent pipelines get canceled (#4744)
- fix(pipelines): Fix polling for manual execution (#4743)
- Feat(provider/openstack): Add Scheduler Hints and Availability Zone Select (#4740)
- fix(provider/kubernetes): add error message when manifest yaml isn't valid (#4739)
- fix(provider/kubernetes): Disable editing of managed ReplicaSets (#4696)
- feat(core/search): Require 3 chars for global search, move to React (#4737)
- chore(chore): bump package to 0.0.137
- fix(core/instance): Make navigating to instance details work again post-React-rewrite (#4735)
- chore(core): bump package to 0.0.136 (#4734)
- refactor(core): convert instance list body to React (#4733)
- style(all): Added grids to the main container of the app (#4691)
- fix(core): append pipeline dropdown to body (#4727)
- feat(core): Add support for react versions of stage details (#4731)
- feat(core/reactShims): Add angularJS template/controller adapter (#4730)
- fix(core): Improved pipeline template tooltip copy (#4729)
- docs(provider/kubernetes) - Adding additional tool tips around kubernetes v2 provider (#4723)
- feat(core): Indicate templated pipelines (#4728)
- fix(provider/gce): Fix search endpoint calls. (#4726)
- chore(amazon): Bump to 0.0.63 (#4725)
- fix(provider/kubernetes): prevent npe in run job stage if no triggers configured (#4724)
- chore(core): bump package version (#4722)
- feat(core): map editor hidden keys (#4721)
- feat(provider/kubernetes): v1 subpath UI support (#4720)
- chore(kayenta): bump deck-kayenta version (#4719)
- feat(provider/appengine): Surface container deploy with free text container url or expected artifact (#4686)
- feat(amazon): Convert create load balancer modal to react (#4705)
- chore(core): bump package to 0.0.134 (#4718)
- chore(amazon): bump package to 0.0.62 (#4717)
- fix(core): Add styleguide.html back since it breaks the docker build (#4716)
- chore(core): Ignore styleguide.html changes since it is generated (#4714)
- reverting to cogs for the pipeline saving button (#4715)
- fix(core/amazon): wrap spinner size in quotes (#4710)
- Add watch on the region to update subnets properly (#4713)
- fix(core): handle load failures in entityTags datasource (#4708)
- fix(core): Fix module creation by not using internal type (#4712)
- fix(provider/kubernetes) - manfiests can be provided now through artifacts (#4709)
- Added disabled states for button + a button group for buttons to be arranged (#4704)
- chore(core): upgrade jQuery to 3.3.1 (#4703)
- chore(kayenta): bump deck-kayenta version (#4707)
- fix(core/account): Fix account tag color rendering during scroll/filter operation (#4706)
- feat(core): Create a react modal wizard (#4695)
- chore(amazon): bump package to 0.0.61 (#4702)
- chore(chore): bump package to 0.0.133 (#4701)
- fix(amazon): show load balancer actions menu (#4700)
- fix(core): reset cluster measure cache when groups update (#4698)
- fix(core): use small loader instead of nano on task monitor (#4699)
- chore(core): bump package to 0.0.132
- fix(core/search): Fix external search types for v1 search/global search
- chore(core): bump package to 0.0.131
- refactor(core/search): Use flex classes
- refactor(core/search): Switch to ul/li in search tabs. Convert AccountTag to react.
- feat(core/search): Show search results as they arrive -- do not wait for all to complete
- chore(core): bump package to 0.0.130 (#4693)
- chore(amazon): bump package to 0.0.60 (#4692)
- style(pipeline): Fit contents in the debugging section (#4622)
- refactor(core): remove redundant div from cluster pod wrapper (#4690)
- fix(core): Add loadBalancerWriter to react injector
- feat(core/validation): Add react component for form validation errors
- feat(core/entityTag): Create react wrapper for add entity tag links
- feat(core/region): Create react version of region select field
- feat(core/account): Create react wrapper for account select field
- feat(core/forms): Create a react version of the checklist component
- refactor(core): Remove unused function in waypoint service
- refactor(amazon/loadBalancer): Make load balancer actions button a react component
- perf(core/clusters): use ReactVirtualized to render clusters (#4688)
- refactor(core/search): Reactify SearchV2
- refactor(core/search): Use router state to drive search results.
- refactor(core/search): Refactor Search V2.
- fix(amazon/loadBalancer): Show region and account when deleting a load balancer (#4684)
- fix(provider/kubernetes): Fix label wording (#4683)
- fix(amazon/loadBalancers): Fix editing load balancers that are associated with an app that no longer exists (#4682)
  - fix(core/search): Fix calling setState on unmounted RecentlyViewedItems (#4680)
- style(amazon/application/projects/pipeline/google/kubernetes): Replacing fa-cog icons with new spinner (#4630)
- fix(core): surface app data status in views without active states (#4675)
- fix(core/presentation): Add padding to filter sidebar as a scrolling affordance (#4679)
- fix(webhooks): default parameters to empty list (#4678)
- fix(core/search): Fix instance searches (#4670)
- fix(core/vis): Fix visualizer toggle to clean up old copies of the visualizer (#4672)
- fix(core): fix restore to this version behavior on pipeline config (#4671)
- Add/update Travis Slack notifications (#4673)
- chore(amazon): bump package to 0.0.59 (#4677)
- chore(provider/kubernetes): bump kubernetes package version (#4676)
- feat(provider/kubernetes): export k8s server group interface (#4674)
- feat(webhooks): preconfigured webhook params (#4669)
- feat(amazon/serverGroup): warn that scaling policies will not work when capacity is pinned (#4668)
- chore(core): bump package to 0.0.129 (#4666)
- fix(core): remove lazy datasource config on security groups, load balancers (#4665)
- feat(provider/ecs): Updated the ECS Module with all its content (#4658)
- feat(provider/ecs): Added serverGroup Transformer (#4650)
- chore(core): bump package to 0.0.128 (#4663)
- perf(core): lazy load data for load balancers, security groups (#4661)
- fix(core): fix link to deployed server group in tasks view (#4662)
- fix(core/pipelines): do not show no pipelines message while initializing (#4660)
- fix(core): handle execution window expressions gracefully (#4656)
- chore(build): remove halconfig from webpack common (#4659)
- feat(deck) - Add gitlab as a gitSource and allow gitSources to be configured via settings.js (#4657)
- fix(ecs): clean up imports, method signature (#4655)
- feat(provider/ecs): Added IAM role reader to ECS (#4631)
- feat(provider/ecs): Updated the ECS help file (#4653)
- feat(provider/ecs): Added ServerGroup Wizard (#4651)
- feat(provider/ecs): Added Disable ASG stage (#4646)
- feat(provider/ecs): Added instance details view (#4644)
- feat(provider/ecs): Added CloneServerGroup.ecs.controller (#4652)
- feat(provider/ecs): Added MetricAlarms reader (#4637)
- feat(provider/ecs): Added horizontal scaling section to deploy modal (#4633)
- feat(provider/ecs): Added the ServerGroup Configuration Service (#4654)
- feat(provider/ecs): Added an ECS Cluster reader (#4642)
- feat(provider/ecs): Added Resize server group menu option (#4639)
- feat(provider/ecs): Added Placement strategy service (#4641)
- feat(provider/ecs): Added Location section to deploy modal (#4636)
- feat(provider/ecs): Added Rollback menu option (#4638)
- feat(provider/ecs): Added template selection view (#4645)
- feat(provider/ecs): Added LoadBalancers section to deploy modal (#4635)
- feat(provider/ecs): Updated the ECS logo less file (#4643)
- feat(provider/ecs): Added Server group details view (#4640)
- feat(provider/ecs): Added advancedSettings section to deploy modal (#4634)
- feat(provider/ecs): Added vertical scaling section to deploy modal (#4632)
- chore(core): bump package to 0.0.127 (#4649)
- feat(core): enable highlighting of invalid pristine fields (#4648)
- feat(core): import kayenta (#4628)
- fix(core): allow side filters to be collapsed (#4629)
- feat(provider/kubernetes): v2 rename required deployed artifacts (#4627)
- chore(amazon): bump package to 0.0.58 (#4626)
- chore(core): bump package to 0.0.126 (#4625)
- fix(core): remove "0" from filter list when no pipelines present (#4623)
- chore(package): upgrade uirouter/visualizer to 5.1.3
- fix(core/search): Fix redirect from 'home.infrastructure' to 'home.search'


#### Gate  - release-1.6.x-edd0ad3    
- refactor(mine): Pass `application` parameter when fetching canary configs (#510)
- feat(authz): include full credentials list (#509)
- Appending to log file (#508)
- chore(docker): Upgrade base image (#507)
- feat(canary-v2): Add support for listing an applications canary runs. (#505)
- fix(credentials): collection<map> isnt compatible with app engine regions (#504)
- feat(credentials): provide proxy for ?expand on /credentials (#502)
- feat(canary-v2): Add /v2/canaries/metadata/metricsService endpoint. (#503)
- feat(provider/ecs): Added cloud metrics controller + service (#498)
- fix(roleService): Fixed the namespacing for Hystrix (#500)
- fix(search): Ensure that keyword searches are >= 3 characters (#501)


#### Igor  - release-1.6.x-3d9468a    
- feat(jenkins): Adds csrf crumb config and handling. (#222)
- Appending to log file (#221)
- chore(docker): Upgrade base image (#220)
- fix(jenkins): Continue to process builds from a master if a single build fetch fails (#219)
- fix(log) get stack trace for build controller runtime execptions (#218)
- feat(jenkins): add log message when artifact cannot be found (#217)


#### Clouddriver  - release-1.6.x-6dfcf4f81    
- fix(provider/kubernetes): v2 statefulset services don't need to be unique (#2406) (#2408)
- fix(provider/kubernetes): don't return empty apps in app list (#2400) (#2401)
- feat(artifacts): versoin is not required to load an aritfact (#2396) (#2399)
- fix(provider/gae): Fix artifact deploy switch statement. (#2388)
- chore(cherry pick): fix cherry-picked code based on refactor (#2386)
- feat(provider/kubernetes): v2 Add support for Kubernetes jobs (#2380) (#2385)
- fix(aws): Continue if launch configuration already exists (#2376)
- fix(aws): return targetType for target groups for filtering (#2374)
- fix(provider/amazon): Handle missing IAM permissions in caching agent (#1874)
- fix(provider/appengine): deploy with artifact reference when available (#2372)
- feat(clouddriver/gce) - Add 'required' flag to account configs. (#2151)
- Append to clouddriver.log (#2155)
- fix(provider/kuberentes): v2 fix ingress caching (#2336)
- fix(provider/kubernetes): v2 omit null manifests (#2370)
- perf(provider/kubernetes): v2 small perf improvements (#2369)
- chore(build): use correct python release candidate (#2368)
- chore(build): fix python constraint (#2367)
- fix(artifacts): supply commit version (#2366)
- fix(provider/kubernetes): v2 suppress missing replacements (#2365)
- fix(roles): Fix startup on unsatisfied dependency (#2364)
- Added RoleController. (#2362)
- feat(provider/kubernetes): support configmap & secret refs (#2363)
- chore(docker): Upgrade base image (#2359)
- feat(provider/kubernetes): support deploying multiple manifests (#2360)
- fix(eureka): Handle missing instances when determining what to disable (#2361)
- feat(provider/kubernetes): v2 image buildinfo (#2357)
- fix(provider/kubernetes): v2 converter is missing using lombok (#2358)
- fix(provider/kubernetes): only delete statefulset and daemonset if kind is presented. (#2351)
- feat(provider/kubernetes): v2 per-account, custom resources (#2354)
- fix(provider/appengine): surface timeouts to frontend during job execution (#2356)
- feat(provider/kubernetes): v2 Extract artifact name from reference (#2322)
- fix(provider/kubernetes): Add top level `kind` to make Deck happy (#2355)
- fix(provider/kubernetes): concurrent modification of kind list (#2353)
- bug(provider/openstack) - cleanly handle errors when caching OST server groups. (#2350)
- refactor(provider/ecs): Caching agents enabled, code cleanup. (#2349)
- feat(provider/ecs): Disable Service Atomic Operation (#2345)
- feat(provider/ecs): Enable Service Atomic Operation (#2343)
- Added ResizeServiceAtomicOperation. (#2341)
- fix(): Force using hashtags for dynomite connections (#2348)
- Added CreateServerGroup AO. (#2338)
- Added TerminateInstancesAtomicOperation. (#2339)
- feat(provider/kubernetes): v2 hpa support (#2347)
- fix(provider/kubernetes): v2 reduce noise when polling older clusters (#2344)
- fix(provider/kubernetes): v2 gracefully handle unknown kind/version (#2342)
- fix(provider/kubernetes): v2 fix caching of malformed annotations (#2340)
- fix(provider/appengine): dont prepend "gs" to all repository URLs (#2346)
- feat(provider/kubernetes): make kubectl configurable per-account (#2337)
- feat(provider/ecs): Destroy Service Atomic Operation (#2334)
- feat(provider/ecs): ECS Load Balancer Provider (#2333)
- fix(entitytags): Increase default 'maxResults' from 100 -> 2000 (#2335)
- feat(credentials): add expand parameter to /accounts endpoint (#2326)
- feature(provider/openstack) implementing senlin zone policy and scheduler hints (#2325)
- Added EcsServerClusterProvider. (#2332)
- Added EcsCloudMetricService. (#2331)
- feat(provider/ecs): ECS Instance Provider (#2330)
- Added EcsImagesController. (#2329)
- fix(provider/kubernetes): v1 oom killed job has exit code 0 (#2328)
- fix(rrb): Disable percentage calculation should use Math.ceil() (#2327)
- EcsCredentialsInitializer now initializes NetflixAssumeRoleEcsCredentials. (#2323)
- fix(provider/ecs): ECS Caching Agents - Account/Region awareness (#2315)
- Added ContainerInformationService. (#2314)
- fix(provider/amazon): propagate serverGroupNamesByRegion result on copyLastAsg (#2270)
- feat(provider/ecs): ECS Cluster Controller (#2313)
- feat(provider/ecs): ECR Image Provider (#2309)
- Corrected capitalization for cloudMetrics endpoint. (#2312)
- fix(gcs): Prevent NPE when gcs artifact account has no credentials path (#2324)
- fix(provider/kubernetes): v1 eventual consistency bug in disable (#2321)
- fix(provider/gce): Fix typo in metric tag. (#2320)
- fix(artifacts): improve github artifact downloader error handling (#2319)
- feat(provider/kubernetes): default artifact replacers (#2318)
- fix(provider/kubernetes): v1 fix red/black for svgs without lbs (#2317)
- feat(provider/kubernetes): v1 volume mount subpath support (#2316)
- fix(provider/kubernetes) : disable v1 controller caching #2239 (#2301)
- refactor(provider/appengine): artifact logic from orca (#2305)
- fix(provider/kubernetes): v2 Make workloads authoritative for apps (#2307)
- feat(provider/kubernetes) - adds configMap replacer support for replicasets (#2310)
- poc(provider/aws): Index a subset of instance details (#2204) (#2308)
- Added EcsCloudMetricProvider and EcsCloudMetricController. (#2294)
- Added EcsApplicationProvider, EcsApplication model, and TestCredential.. (#2293)
- Added EcsRoleProvider. (#2292)
- Added EcsClusterProvider. (#2291)
- feat(provider/ecs): ECS Scalable Targets caching classes and tests (#2290)
- feat(provider/ecs): Ecs instance cache client (#2289)
- fix(provider/kubernetes): only include app & cluster frigga details (#2306)
- feat(provider/openstack): Add support for availability zones (#2304)
- fix(provider/kubernetes): v2 cache clusters for workloads only (#2303)
- feat(provider/kubernetes): allow artifact types to be extended (#2302)
- fix(provider/aws): Handle ApplicationLoadBalancers with invalid actions (#2300)
- fix(provider/kubernetes): fix cast from double in replica count (#2298)
- fix(provider/kubernetes): prevent NPE if resource does not have creation timestamp (#2299)
- poc(provider/aws): Index a subset of server group / instance details (#2204)
- fix(core): Support an empty NamerRegistry (#2297)
- feat(provider/kubernetes): look up namer by class name (#2288)
- fix(provider/kubernetes): load replicas for non replicaset server groups (#2287)
- perf(provider/gce): De-dupe getHealth() calls in LB caching agents. (#2281)
- fix(core): Allow for versioned providers in lb controller (#2284)
- refactor(provider/kubernetes): remove obsolete source check (#2283)
- feat(artifacts): add artifact download endpoint (#2282)


#### Fiat  - release-1.6.x-2a7603f    
- Appending to log file (#216)
- chore(docker): Upgrade base image (#215)
- feat(admin) Add admin functionality to fiat
- fix(authz): ensure anonymous role is not cleared
- fix(roles): ensure UserRolesSyncer always refreshes anonymous user
