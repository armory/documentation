---
layout: post
title: v1.8.82 Armory Enterprise Spinnaker
order: 992
---

# 08/25/17 Release Notes


## Highlighted Updates
### Armory Enterprise Spinnaker
- **Want to share your Spinnaker instance with all your application developer colleagues, but don't want them deleting each other's pipelines or otherwise crashing your party?** Now you can! We've added support for Fiat, the Auth N/Z service within Spinnaker. 
- With Fiat support you can now safely add others in your company (including end users like application developer teams) to Spinnaker with fine-grained permissions. Enable your application developers to become more self-service by letting them create & manage their own pipelines so you can ~~go drink mai-tais by the beach!~~ focus on other work at hand.


###  Spinnaker Community Contributions
#### fiat - v0.28.0
- ArmorySpinnaker has been validated with Fiat.

#### orca - v3.0.6
- [#1457](https://github.com/spinnaker/orca/pull/1457) Rolling pushes will wait until the instances are healthy to avoid failing by `WaitForUpInstanceHealthTask`
- [#1452](https://github.com/spinnaker/orca/pull/1452) Pipeline or task will noted as canceled by user
- [#1438](https://github.com/spinnaker/orca/pull/1438) Create pipeline JSON requires `name` and `description`

#### echo - v1.141.1
- [#152](https://github.com/spinnaker/echo/pull/152) Structure some log messages for indexing

#### front50 - v1.102.0
- [#243](https://github.com/spinnaker/front50/pull/243) Support for scope pattern matching in pieline templates

#### deck - v2.1128.0
- [#3900](https://github.com/spinnaker/deck/pull/3900) Adds boolean rendering as a checkbox
- [#3898](https://github.com/spinnaker/deck/pull/3898) Kubernetes: Add support for AWS EBS Volumes

#### clouddriver - v1.655.0
- [#1743](https://github.com/spinnaker/clouddriver/pull/1743) Allow `none` for cluster ips
- [#1738](https://github.com/spinnaker/clouddriver/pull/1738) Appengine: permit deployments from `gs://`
- [#1723](https://github.com/spinnaker/clouddriver/pull/1723) Google: support for `useSourceCapacity` on deploy



<br><br><br>
## -v, --verbose    &nbsp;&nbsp;&nbsp;&nbsp;Verbose Mode

### Armory Enterprise Spinnaker
#### lighthouse - 6b9a0c5
- Use echo's `/health` endpoint due to fiat changes
- fixed JSON parsing for boolean values


### Spinnaker Community Contributions
#### fiat - v0.28.0
- released with Armory Spinnaker

#### orca - v3.0.6
 - fix(pipeline_templates): preprocess configs in dependent pipeline starter (#1476)
 - feat(canary-v2): Add unit tests. (#1474)
 - chore(build/publish): Bump spinnaker-gradle-project to 3.16.0. (#1475)
 - fix(core): Correctly handling null startTime value in details data class (#1473)
 - fix(queue) ignore unknown json attributes on messages
 - bump Kotlin
 - feat(queue): Support for attaching arbitrary attributes to a queue `Message`
 - feat(core): Old pipeline cleanup notification poller agent (#1448)
 - feat(canary-v2): First pass at stages/tasks to consume kayenta. (#1471)
 - fix(targetReferenceSupport): retry non-404 errors getting cluster (#1469)
 - chore(model) get rid of initializationStage flag
 - chore(model) no longer need to generate silly ids for synthetic stages
 - chore(orca): remove Spring Batch execution engine
 - fix(queue): Support for deserializing messages that may be wrapped in an Envelope (#1466)
 - fix(pipeline_templates): require scopes (#1463)
 - chore(auth) fix image in readme (#1465)
 - fix(pipelinetemplate): Ignore rendering anything that might look like an EL (#1462)
 - chore(auth) remove redundant auth propagation as it's now done elsewhere
 - fix(metrics) remove some metrics we're not using
 - fix(stage): Fixed an issue with authentication details propagation.
 - chore(dependencies): Bump spinnaker-dependencies to 0.104.0 (#1461)
 - fix(queue): Sets boundary on thread pool work queue and aborts work when full (#1459)
 - chore(pipelinetemplate): Refactor renderer to take a list of tags (#1458)
 - fix(rollingpush): handle new instance termination (#1457)
 - feat(queue): add configuration option for redis queue ack timeout
 - fix(core) - always set the pipeline or task status to be canceled when canceled by an user (#1452)
 - feat(queue): Implement redis-backed dead message handler (#1455)
 - fix(queue): don't pull messages from the queue when no threads available
 - fix(pipelinetemplate): Prefer pipeline ID over templated value; map on save (#1451)
 - feat(queue): Configurable rate limit durations (#1454)
 - chore(dependencies): Bump spinnaker-dependencies to 0.102.0 (#1450)
 - fix(core)- optional stage support cannot handle expressions surrounded by ${} (#1449)
 - chore(pipelinetemplate): Rename default variable group to General (#1446)
 - feat(pipelines): Add support for task-backed pipeline config saves (#1442)
 - fix(pipeline_templates): don't fail if config variables are null (#1445)
 - chore(nightly build): Adds clouddriver-tagged.yaml for nightly builds (#1444)
 - chore(queue): Removing some noisy log messages (#1443)
 - fix(queue) - failed_continue status not being set when a task times out (#1440)
 - fix(pipelinetemplate): Require name and description metadata (#1438)

#### echo - v1.141.1
 - chore(dependencies): Bump spinnaker-dependencies to 0.104.0 (#157)
 - chore(dependencies): Bump spinnaker-dependencies to 0.101.0 (#156)
 - refactor(logs): Structured logs (#152)
 - chore(nightly build): Adds clouddriver-tagged.yaml for nightly builds (#154)
 - fix(template): Remove 'application.accounts' from outdated application owner template (#153)

#### front50 - v1.102.0
 - fix(pipeline_templates): don't NPE if template has no scopes (#250)
 - chore(dependencies): Bump spinnaker-dependencies to 0.104.0 (#249)
 - feat(pipeline_template): delete template (#248)
 - fix(permissions): Merge permissions for single application config call (#244)
 - chore(dependencies): Bump spinnaker-dependencies to 0.101.0 (#247)
 - chore(nightly build): Adds clouddriver-tagged.yaml for nightly builds (#245)
 - feat(pipelinetemplate): Support for scope pattern matching (#243)

#### deck - v2.1128.0
 - refactor(core): use common component for deploy initialization (#3889)
 - chore(core): convert notifierService to TS, export from core (#3926)
 - fix(core): avoid NPE rendering header for missing apps (#3927)
 - chore(core): bump to 0.0.36
 - fix(scroll): Update react-hybrid to 0.0.12 which passes secondary-panel class through to ui-view
 - chore(core): bump to 0.0.35 (#3921)
 - fix(core): fix scrolling regression on pipeline config (#3920)
 - fix(core): Upgrade uirouter to fix initial page load (#3918)
 - feature(core): Add ability to override application icon (#3917)
 - fix(core): Fix application refresher (#3916)
 - feat(pipeline_templates): adds boolean variable configuration type (#3900)
 - chore(amazon): bump package to 0.0.18 (#3915)
 - chore(core): bump version to 0.0.34 (#3914)
 - feat(core): put application, taskWriter, executionService on window (#3911)
 - chore(core): downgrade @types/react to 15.0.35 (#3909)
 - fix(provider/gce): fixes server group wizard load error when no security group has tag (#3912)
 - fix(core): Fix pipelines css (#3913)
 - refactor(core): Convert application component to react (#3907)
 - fix(pipeline_templates): initialize variables if underlying template changes (#3902)
 - chore(*): update @types/react to latest (#3908)
 - chore(core): export account service, viewStateCache, add virtualized-select (#3906)
 - chore(core): bump package version (#3905)
 - feat(core) - ui for rolling red black push (#3904)
 - chore(*): Update react-hybrid to 0.0.7
 - chore(nightly build): Adds clouddriver-tagged.yaml for nightly builds (#3899)
 - feat(provider/kubernetes): Support AWS EBS Volumes (#3898)
 - chore(core/amazon/docker/google): update configs (#3893)
 - chore(core): Version 0.0.32
 - chore(core/bundle): Add @uirouter/react and @uirouter/react-hybrid to webpack externals
 - chore(aws): bump package version (#3896)
 - fix(aws): guard against missing buildInfo on server group details (#3895)
 - fix(traffic_guards): Allow accounts w/ namespaces to use traffic guards (#3860)
 - feat(aws): allow search on LB listener cert select (#3892)
 - feat(core): implement external search API in infrastructure search (#3890)
 - feat(core/amazon): add build info to changes (#3884)
 - chore(core): update yarn lock file for react-router (#3887)
 - refactor(core): convert service delegate to Typescript (#3886)
 - fix(core): Protect against undefined nodes in the pipeline graph (#3885)
 - refactor(core): Refactor security group types to make sense (#3883)
 - Load balancer pod -- shouldComponentUpdate
 - feat(core/utils): Add timing debug decorators (#3880)
 - feat(gce): allow ilb port update (#3879)
 - fix(pipeline_templates): wrap variable name (#3878)
 - fix(provider/amazon): Only enforce TG naming to be based on appname (#3877)
 - feat(react): Route to react components; use react UISref components
 - fix(provider/amazon): Check to make sure cache types exists before showing refresh (#3875)
 - feat(provider/amazon): Load certificates on demand (#3874)
 - fix(provider/amazon): Force certificate type if only one is available (#3873)
 - chore(amazon, core): rev packages (#3872)
 - fix(core): improve error message on script stage failure (#3868)
 - fix(core): fix scroll on standalone views (#3866)
 - feat(provider/amazon): Enforce target group naming convention (#3869)
 - fix(core): hide judgment inputs if manual judgment succeeded (#3865)
 - fix(core): fixes ui-select clearable X button (#3870)
 - feat(kubernetes): Configure Service Account Name (#3864)
 - fix(core): trim spaces from pipeline name before delete (#3867)

#### gate - v3.49.0
 - chore(orca): removed active executions / instance endpoint no longer in orca
 - chore(dependencies): Bump spinnaker-dependencies to 0.104.0 (#428)
 - feat(servergroups): Add server group endpoints for a list of applications (#426)
 - chore(dependencies): Bump spinnaker-dependencies to 0.101.0 (#425)
 - feat(web): Generic exception handling (#423)
 - chore(nightly builds): Remove 'latest' tag from nightly cloudbuild.yml file (#421)
 - chore(nightly build): Adds cloudbuild-tagged.yml to support nightly builds (#420)
 - feat(canary): v2 canary endpoints (#419)
 - fix(fiat): Makes ObjectMapper not fail on unknown enum values. (#418)
 - fix(serviceAccounts): Wrap F50 call and guard with permissionService.enabled flag (#417)
 - feat(serviceAccounts): Allows login by registered service accounts (#415)

#### igor - v1.73.2
 - feat(jenkins) allow polling to be turned off (#177)
 - chore(logs): Adjusting log levels to reduce noise (#170)
 - fix(jenkins): provide better error when a job is disabled (#178)
 - feat(travis/triggerBuild): trace the unique build igor triggered. (#176)
 - chore(dependencies): Bump spinnaker-dependencies to 0.104.0 (#175)
 - chore(dependencies): Bump spinnaker-dependencies to 0.103.0 (#174)
 - chore(nightly build): Adds clouddriver-tagged.yaml for nightly builds (#172)
 - feat(igor/travis) Filter builds on branches, tags and pull requests to populate reasonable amount of builds when manually triggering pipelines (#168)
 - fix(docs): Update PULL_REQUEST_TEMPLATE contributing link (#167)
 - feat(travis): override environment variables instead of replacing. (#166)

#### clouddriver - v1.655.0
 - chore(deps): Bump spinnaker-dependencies to pull in latest AWS client library (#1750)
 - fix(GCEUtil): Fix NPE in urlMap lookups if none exist. (#1748)
 - fix(provider/kubernetes): Cross Account Clone (#1746)
 - chore(dependencies): Bump spinnaker-dependencies to 0.104.0 (#1745)
 - fix(test): Mitigate timeout due to compile load
 - fix(request_queue): explicitly add http annotations to exception subclasses
 - fix(provider/kubernetes): Allow None Cluster IP (#1743)
 - feat(servergroups): Add endpoint to retrieve server groups by applications (#1734)
 - feat(appengine): Permit deployments from gs:// repositories (#1738)
 - chore(dependencies): Bump spinnaker-dependencies to 0.103.0 (#1736)
 - fix(provider/google): Use port from frontend when upserting SSL Proxy (#1740)
 - fix(provider/google): Add missing break when listing load balancers (#1739)
 - feat(provider/aws) - disable an asg by desired percentage (#1733)
 - Update spinnaker-gradle-project to 3.15.0 for rpm support (#1732)
 - feat(provider/dcos): Add destroy, disable, and resize server group (#1717)
 - chore(nightly build): Adds clouddriver-tagged.yaml for nightly builds (#1730)
 - feat(provider/kubernetes): Support EBS Volumes (#1729)
 - feat(provider/google): Support TCP Proxy Load Balancing (#1727)
 - fix(aws): NPE when getting build info on unknown image (#1728)
 - fix(provider/kubernetes): Fix resourceField envVar (#1725)
 - feat(provider/kubernetes): Support resourceField env vars (#1722)
 - feat(provider/google): Add support for useSourceCapacity on Deploy. (#1723)
