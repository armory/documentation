---
layout: post
title: v1.5.23 Armory Enterprise Spinnaker
order: 996
---

# 05/08/2017 Release Notes
{:.no_toc}
> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Armory Enterprise Spinnaker

### Lighthouse - af54315
 - Use `/login` for gate's liveness probe only when auth is enabled.
 - Expose AMI ancestory through an API endpoint
 - Dashboard: Only count terminal pipelines as failed
 - When exposing configuration files via API, show .env files in addition to .yml (#44)
 - Dashboard: Order by app.
 - Add gunicorn layer in front of API.
 - Set connection idle timeout to 90 (making higher than the ELB 60 sec idle)
 - Enable CORS
 - Allow empty `spinnaker-local.yml` files.

### Dashboard - a42b0e8
 - First version of Audit Portal - AMI history
 - Exposes prototype of configuration portal
 - Basic statistics dashboard

## Spinnaker Community Contributions

### Orca - v1.395.1
 - chore(pipelinetemplate): Removing unused handlebar gradle deps (#1286)
 - fix(pipelinetemplate): Child stages of conditional stages should be preserved
 - feat(web): Adding resolve pipeline template endpoint (#1284)
 - fix(dcd): fixes NPE if template does not have variables (#1283)
 - make sure synthetic stages don't get re-generated on restart
 - fix(titus): pass authenticated user to titus when creating new jobs
 - fix(core): waitForUpInstances should not consider platform health "unknown" as "down" (#1277)
 - fix(expressions) - test case highlighting why classes should be explicitly whitelisted
 - fix(expressions) - fix allowed class whitelisting.
 - fix(url restriction) - includes url restriction on webhook stages
 - fix(titus): fix run job stage for titus so all fields in the stage get sent to clouddriver
 - fix(expressions) - restrict expressions
 - send cloudProvider to Clouddriver instead of providerType
 - chore(aws): remove no longer used amiId
 - fix(aws/cloneServerGroup): prefer region when configuring allowLaunch in clone stage
 - feat(pipelinetemplate): Removing handlebars rendering option (#1272)
 - fix(pipelinetemplate): Bubbling up root cause errors (#1271)
 - feat(rrb) Bare bones RRB support (#1197)
 - feat(loadtest): Skeleton loadtest (#1270)
 - fix(core/notifications): Application-level pipeline notifications were not having their expressions evaluated. (#1269)
 - feat(stages/webhook): Webhoook stage (#1257)
 - fix(pipelinetemplate): Render stage name and comments (#1268)
 - fix(pipelinetemplate): Correctly handle template inheritance with injection (#1267)
 - fix(clouddriver): Add missing locations to failed find image error message (#1252)
 - feat(pipelinetemplate): Adding group & example to template variables (#1262)
 - fix(orca): fix ami retrieval for diff commits
 - chore(halyard): Fix rosco reference in orca (#1266)
 - feat(script): allow script stages to customize branch
 - fix(execution windows): allow RestrictExecutionDuringTimeWindow to wait for 7 days
 - feat(travis stage): Add Travis Stage
 - fix(core): Don't apply traffic checks w/o front50 (#1261)
 - fix(compiler): fix compilation issues with stage.mapTo
 - fix(quip): fix for quip version not correctly propagating
 - chore(dependencies): update to spinnaker-dependencies 0.87.0
 - chore(fiat): Bump Fiat API to start using UserPermission cache (#1255)
 - feat(pipelinetemplate): Frigga jinja filter (#1243)
 - feat(titus): resolve imageName from property files
 - fix(pipelinetemplate): Resolve EL expressions in module param arguments (#1249)
 - feat(pipelinetemplate): Support YAML output from templates (#1250)
 - refactor(core): removed DefaulTaskResult and made TaskResult a class
 - fix(authentication): subtly different handling of varargs between Java & Groovy
 - refactor(core): removed old immutable flag from Stage
 - refactor(core): convert Execution, Pipeline, Orchestration to Java
 - fix(core): Recast parameter strategy check to boolean (#1247)
 - fix(core): Remove unsafe bool cast (#1246)
 - fix(tagging): Cleaning up tags on Rolling Push
 - refactor(core): stop extending ObjectMapper
 - refactor(model): unify stage types
 - fix(pipelinetemplate): Default spring condition if prop is unset (#1240)
 - feat(pipelinetemplate): Metadata for UI; template protection (#1238)
 - fix(pipelinetemplate): Ensure plan flag is not overwritten by preprocessors (#1237)
 - feat(pipelinetemplate): Adding a Jinja template renderer alternative (#1234)
 - chore(changelog): Extend changelog commit keywords. (#1236)
 - feat(traffic guards): check traffic guards on terminate/disable instances
 - refactor(pipelinetemplate): Improving error output of handlebars rendering (#1232)

### Front50 - v1.90.0
 - chore(dependencies): update to spinnaker-dependencies 0.87.0
 - chore(fiat): Bump Fiat API to start using UserPermission cache (#217)
 - chore(fiat): Bumps Fiat API, adding EnableFiatAutoConfig annotation (#213)
 - chore(changelog): Extend changelog commit keywords. (#216)

### Deck - v2.1074.0
 - fix(core): allow cancel execution modal to open
 - fix(pipelines): force stage config rerender on refId change
 - refactor(core/pipeline): Convert execution to a react component, Create a react Tooltip wrapper, Create a LabelTemplate component.
 - refactor(core/projects): Convert projectPipeline to react
 - refactor(netflix/canary): Convert canaryScore to react
 - refactor(core): React wrappers for angular components: accountLabelColor, executionDetails, executionStatus, pipelineGraph, copyToClipboard
 - refactor(core): Make importable: $state, cancelModal.service, confirmationModal.service, executionFilter.model, execution.service and scheduler.factory
 - refactor(core/forms): Convert buttonBusyIndicator to a react component
 - refactor(core/delivery): Convert executionBuildNumber to a react component and bring in react-ga
 - refactor(neflix/feedback): Convert feedback to a react component, create a new SubmitButton react component
 - fix(pipelines): prevent page navigator from unsticking in pipeline config
 - fix(core): Selected section arrow was offset
 - chore(core): update typescript to v5
 - fix(gce): autohealer config in server group dialogue (#3521)
 - feat(core): adds replace filter (#3525)
 - fix(docker): make tag optional, do not set to null if undefined
 - chore(core): remove ng2 hybrid mode
 - fix(netflix): use angular.equals to compare fp scopes
 - chore(modal): convert modal close component back to ng1
 - fix(kubernetes): fixes autoscaler details, copying autoscaler in clone stage
 - fix(popover): stringify popover triggers
 - chore(netflix): revert pager duty modules to ng1
 - perf(aws): do not overfetch execution for ASG source/changes
 - feat(core): render pipeline stages without UIs
 - feat(netflix): allow user to pick commit for git trigger
 - fix(netflix/fp): add clickable cursor to FP row
 - refactor(core/application): make $scope nullable for onRefresh registration
 - feat(aws/netflix): Add UX for specifying ASG Metrics
 - chore(core): Add prefer-const tslint rule
 - fix(clusters): convert on-demand params to filter params for small apps
 - fix(instances): preserve filters when double-clicking
 - chore(docker): Make SSL passphrase configurable (#3460)
 - fix(kubernetes): fixes load balancer refresh in server group create dialogue (#3499)
 - feat(clusters): fetch clusters on demand for very large apps
 - chore(core/insight): Migrate insight filters to typescript/components.
 - chore(core/insight): Rename JS files to TS (and various other renames)
 - refactor(core/application): Use submitButton component in a few places we were not before
 - fix(pipelines): prevent overlapping graph lines
 - fix(securitygroups): render entity tags on standalone security groups
 - feat(netflix): include documentation link in canary description
 - feat(titus): manually sort docker registry tags on manual trigger
 - fix(kubernetes): fixes load balancer annotations details view (#3500)
 - fix(core): fix submit button (#3498)
 - fix(core): fix pipeline stage navigation (#3497)
 - refactor(core/modal): Convert submitButton to TS
 - feat(kubernetes): makes internal DNS name configurable (#3495)
 - refactor(core/utils): Convert timeFormatters to TS and export filters as standard JS functions.
 - feat(stages/webhook): Webhook stage https://github.com/spinnaker/spinnaker/issues/1512
 - refactor(core/delivery): Convert executionFilter.service to TS
 - refactor(core/delivery): Convert executionFilter.model to TS
 - refactor(core/scheduler): Convert schedulerFactory to TS
 - refactor(core/delivery): Convert executionService to TS
 - refactor(core/delivery): Convert executionDetails to TS
 - refactor(core/delivery): Convert execution to TS
 - refactor(core/account): Convert accountLabelColor to TS
 - fix(aws/netflix): fix diff view when no metadata
 - feat(aws/netflix): add diff view to ASG details
 - fix(pipelines): render account tag inline on time boundary view
 - feat(titus): expose retries for run job stage
 - feat(appengine): application name validator (#3489)
 - refactor(tags): dedupe tagIds before fetching
 - chore(core): move what's new components to core module (#3478)
 - Update load balancer list when change Namespace (#3482)
 - (kubernetes) Delete Security Group Namespace (#3483)
 - fix(clusters): preserve filters when clicking active item
 - refactor(gce): remove separate http health check read service (#3480)
 - feat(script stage): allow users to set a branch
 - feat(appengine): render dispatch rules (#3479)
 - fix(kubernetes): replicas targetCPUUtilizationPercentage can be larger than 100% (#3467)
 - fix(travis stage): Bake stages do not recognize Travis stage or trigger
 - feat(git): pre-populate git trigger source
 - feat(gce): select external ip for http(s) load balancers
 - fix(security groups): prevent page flashing on security groups
 - fix(pagination) fix pagination on /applications, /projects
 - fix(core/serverGroup): Fix a bug where serverGroups do not load correctly when checking for sticky headers
 - feat(titus): eureka support should be same as other providers
 - fix(core/delivery): keep padding the same whether stage durations are on or off
 - refactor(core/delivery): Convert executionStatus to TS
 - refactor(core/util): Convert copyToClipboard to TS
 - refactor(core/delivery): Convert executionGroups to TS
 - refactor(core/delivery): Convert executionGroup to TS
 - refactor(core/clusters): Convert clusterPod to TS
 - refactor(core/clusters): Convert serverGroup to TS
 - feat(gce): adds address reader service (#3469)
 - refactor(gce): health check and certificate service (#3463)
 - fix(pipelines): fix alignment on multi-line account labels
 - chore(netflix): convert override module to TS
 - fix(travis stage): Trigger component not working properly
 - fix(kubernetes): resize modal bugs (#3462)
 - chore(all): Upgrade angular 1.5 to 1.6
 - fix(core/presentation): Fix details standalone view size
 - chore(core): convert search service to TS
 - fix(core): avoid NPE when extracting accounts for pipeline execution headers
 - fix(gce): dedupe backend service health checks (#3457)
 - feat(pipelines): show accounts from config if no executions found
 - fix(dev): make start.sh executable
 - (netflix) Fix option to show and select FP Scopes with zero instance counts (#3453)
 - (netflix) Use Manual Strategy for Fast Property Updates (#3451)
 - fix(ui refresh): grab bag of UI tweaks
 - fix(netflix): Fix yellow colors to not cause text to be unreadable
 - chore(halconfig): Add version settings option (#3449)
 - (netflix) Clone Property with new scope. (#3441)
 - fix(gce): populate custom instance types in edit deploy stage (#3438)
 - refactor(gce): refactor http load balancer utils (#3435)
 - fix(pipelines): cleaner resize of sticky headers on window resize
 - fix(pipelines) better handle execution details on small screen
 - fix(ui): fix scroll on pipeline config
 - fix(netflix) prevent blesk from pushing down other content
 - refactor(executions): better render accounts, headings in executions
 - fix(executions): auto-navigate away from missing execution
 - feat(style): UI refresh
 - fix(azure): Specify cloud provider when deleting lb
 - fix(gce): render backend services in edit deploy stage (#3436)
 - fix(travis stage): Tabs should be displayed in execution details
 - fix(pipelines): hide cluster configuration on deploy stages in strategies
 - refactor(sticky-headers) convert sticky headers to TS, fix offset bug
 - feat(k8s) lifecycle hooks (#3429)
 - chore(netflix/app) convert to typescript
 - feat(travis): Add explicit Travis integration
 - chore(netflix/errors): convert exception handler
 - feat(provider/google): Add support for canIpForward property. (#3430)
 - (feat, netfilx) Create Fast Property with mutiple scopes (#3423)
 - fix(core): Fix for deck breaking if some default settings are missing
 - fix(core/pipeline): handle long cluster names
 - refactor(core): Stop injecting global settings via angular and provide some typings around settings
 - feat(core/monkey): add cluster match
 - fix(kubernetes) update user selected load balancer
 - chore(core): update angular and fix build
 - chore(netflix): fix filename spelling
 - fix(netflix): Clean up console error for availability
 - fix(gce): show bake stage advanced options if any options have been selected (#3418)
 - chore(build): Switch from npm to yarn
 - fix(gce): normalize server group load balancers (#3415)
 - feat(netflix): Improve Availability Module Context
 - chore(changelog): Remove 'bc' keyword. (#3411)
 - chore(changelog): Extend changelog commit keywords. (#3410)
 - fix(netflix): Fixed ITT stage automatic VIP override value when oldVip is a comma separated list
 - Remove unused lodash import. (#3407)
 - feat(gce): fetch disk defaults from clouddriver (#3406)
 - prefer buildInfoUrl over jenkins details when showing link to ci build
 - chore(netflix/pagerduty): convert pagerduty to ng2

### gate - v3.28.0
 - feat(web): Adding request logging interceptor (#378)

### igor - v1.65.0
 - feat(artifact/decoration): Artifact decoration spinnaker/spinnaker#1348 (#138)
 - fix(web): Handling two different cases of NPEs (#158)
 - chore(changelog): Extend changelog commit keywords. (#157)
 - Parse a full JSON line from travis logs based on a magic string

### clouddriver - v1.592.0
 - fix(kubernetes): allow upsert load balancer as a pipeline stage (#1581)
 - (aws) Add ALB Support
 - fix invalid use of health instance code (#1578)
 - fix(provider/kubernetes): Get node selector from ReplicaSet/ReplicationControllerSet and set in the deploy description (#1573)
 - feat(provider/kubernetes): Specify termination grace period seconds (#1572)
 - fix(L4 caching): Ignore 'targetInstances' in regional forwarding rules. (#1575)
 - fix(provider/kubernetes): kinds are now capitalized (#1571)
 - fix(provider/oraclebmcs): Handle missing instances (#1566)
 - fix(appengine): capacity values for automatic scaling (#1568)
 - fix(provider/kubernetes): Deployment scaling (#1567)
 - feat(aws) Support enabling/disabling Auto Scaling Group metrics
 - fix(docker): make sorting of tags faster via parallelStream for initial load
 - feat(docker registry): endpoint to get tags sorted by date created
 - feat(appengine): upsert autoscaling policy (#1564)
 - fix(amazon): allow image lookup of AMIs prefixed with "ami"
 - fix(kubernetes): Fix multi-instance clouddriver secret churn (#1525)
 - fix(openstack): Fix to have the OpenstackImageV1Provider return all images when requested. (#1561)
 - feat(servergroups): allow filtering by clusters on application/serverGroups endpoint
 - refactor(provider/azure): Clean AppGateway descriptions (#1537)
 - feat(provider/oraclebmcs): Instance cache agent, provider and tests (#1559)
 - chore(provider/kubernetes): Log pending cache refresh requests (#1557)
 - feat(provider/oraclebmcs): Add security group cache agent, provider and tests. (#1556)
 - feat(appengine): allow user to configure ssh known_hosts filepath or to trust unknown hosts (#1546)
 - fix(kubernetes): Set account in loaderBalancerDescription (#1527)
 - refactor(provider/google): Rely on GCE server-side filtering when querying image by name. (#1555)
 - feat(provider/oraclebmcs): Image caching agent, provider and controller with tests (#1552)
 - fix(provider/google): Correct forwarding rule 'IPAddress' typo. (#1553)
 - feat(provider/google): Added caching for external IP addresses. (#1550)
 - feat(appengine): surface dispatch rules on App Engine load balancers (#1548)
 - feat(provider/oraclebmcs): Subnet caching agent and provider (#1551)
 - fix(provider/google): Add pagination support for retrieving image resources. (#1549)
 - fix(core): Add NoopAtomicOperationConverter. (#1547)
 - feat(provider/oraclebmcs): Network caching agent and provider (#1545)
 - Fix for reservation report metrics w/o availabilityZone
 - Fix for cross-AZ reservation report generation
 - chore(titus): make polling interval 5 seconds for titus
 - chore(dependencies): update spinnaker-dependencies to 0.87.0
 - feat(appengine): adds platform application caching agent (#1538)
 - feat(provider/oraclebmcs): Add initial scaffolding for Oracle BMCS provider (#1532)
 - chore(fiat): Bump Fiat API to start using UserPermission cache (#1539)
 - fix(titus): make onDemand requests noop
 - fix(provider/google): Removed static function keyword in L7 upsert. (#1535)
 - feat(provider/google): Add support for canIpForward property. (#1534)
 - fix(kubernetes): don't set postStart hook as preStop hook (#1533)
 - fix(docker): Prefer repository name over image name when loading tags (#1526)
 - chore(fiat): Bump Fiat API, add @EnableFiatAutoConfig annotation (#1507)
 - chore(changelog): Remove 'bc' keyword. (#1529)
 - chore(changelog): Extend changelog commit keywords. (#1528)
 - feat(gce) surface instance type disk defaults on credentials (#1522)
 - Swallow and log parsing exceptions on immutable_metadata in AWS
 - EntityTags metadata endpoint