---
layout: post
title: v2.18.0 Armory Release (OSS Release 1.18.2)
order: -21820200214230343
hidden: false
---

# 02/14/20 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues

### Breaking Changes

Two known breaking changes with this release:
* Lambda stages changed casing on the JSON for the bucket information.  
* Orca SQL Configuration has changed from
```yaml
executionRepository:
  sql:
    enabled: true
  redis:
    enabled: true

  dual:
   enabled: true
   primaryClass: com.netflix.spinnaker.clouddriver.data.task.jedis.RedisTaskRepository
   previousClass: com.netflix.spinnaker.clouddriver.sql.SqlTaskRepository
```
To using a named configuration 
```yaml
executionRepository:
  sql:
    enabled: true
  redis:
    enabled: true

  dual:
    enabled: true
    primaryName: sqlExecutionRepository
    previousName: redisExecutionRepository
```

### Known Issues

* **Policy Engine**
  
    If your OPA policies contain any top level declarations other than `deny`, the Policy Engine prevents pipelines from being saved.

    **Workaround** 
    
    Only use `deny` declarations at the top level. Other declarations can still be used at lower levels of the policy. 



# Highlighted Updates
## Armory

##  Spinnaker Community Contributions

This release includes fixes, features, and performance improvements across a wide feature set in Spinnaker. Here we share a summary of notable improvements, followed by the comprehensive changelog.

### Fixes
#### [Clouddriver](#clouddriver)
* **kubernetes:**   On refresh, don't replace credentials that have not changed ([b6c2217c](https://github.com/spinnaker/clouddriver/commit/b6c2217cbed8d6b0d182e8a112c3041bf4f0f27f))
#### [Igor](#igor)
* **concourse:**   add support for concourse artifacts (#549) ([127328c3](https://github.com/spinnaker/igor/commit/127328c35d81776ef8b87a81fe7ab1c536453b91))


### Support for deploying and managing Alibaba Cloud load balancers

### Support for executing CloudFormation ChangeSet
CloudFormation stage allows you to create a change set that allows users to review the changes on the AWS infrastructure before applying them. This new feature enables users to pause the pipeline execution until the user executes the change manually through Deck itself without having to go to AWS console. Users can also configure pre-defined behaviour when the created change set contains a "replacement" in CloudFormation jargon, which can protect users from data-loss and unrecoverable changes in the infrastructure.

### Support for ECS services with multiple target groups
The ECS provider now supports routing traffic from multiple load balancers to your ECS service.

### Add initContainer logs to Kubernetes v2 provider container logs
View your pod initContainer and container logs side by side from the Spinnaker UI.

### Propagate gcloud failures from job executor to task for AppEngine deployments
Errors emitted from gcloud while deploying to AppEngine will now be surfaced via the pipeline json and the pipeline UI.

### Surface managed pipeline template versions and enable versioned actions
The Managed Pipeline Templates V2 UI now displays all versions of a given template. Individual template versions can be viewed, deleted, or used to create a new templated pipeline.

### Add SpEL preview to Evaluate Variables stage
The new Evaluate Variables stage UI allows you to preview the value of your SpEL expressions against past executions.

### Support Postgres as Front50 backend

### Add plugin artifact repository
Added plugin metadata repository to act as source of truth for installed plugins within a spinnaker installation.

### Add ability to invoke existing GCB triggers
The Google Cloud Build stage now provides first-class support for invoking Cloud Build [triggers](https://cloud.google.com/cloud-build/docs/running-builds/create-manage-triggers).

### Add exponential backoff to Kayenta query retries
There were already retries, but now there is also backoff.

### Stats collection
Spinnaker’s community stats are now available for users wishing to opt-in. When enabled, the telemetry module sends data about all completed pipelines to a centralized service. See more details in this [blog post](https://blog.spinnaker.io/spinnaker-1-18-release-introduces-spinnaker-community-stats-da140ad4c045).

### Java 11 Migration
The Java 11 JRE runs Front50 and Igor when deployed to a Kubernetes cluster using Halyard (or if you consume the official containers in some other way). If this causes problems, or your organization isn't ready to run Java 11 in production, you can specify `deploymentEnvironment.imageVariant: JAVA8` (or `UBUNTU_JAVA8`) in your Halyard config. Please notify sig-platform@spinnaker.io if you run into issues and decide to downgrade.

**All users** need to switch to a Java 11 JRE by Spinnaker 1.21, which is scheduled to be released in early July. We encourage everyone to start testing Spinnaker under a Java 11 JRE now in preparation for the cutover. If you have any concerns about the migration timeline, please reach out to sig-platform@spinnaker.io.

### Clouddriver cache cleanup agent
Resources from deleted Spinnaker accounts will now be purged from the SQL cache automatically. Enable the cleanup agent by adding `sql.unknown-agent-cleanup-agent.enabled: true` to your `clouddriver-local.yml`.

### Kubernetes V1 provider removal scheduled
The Kubernetes V1 provider will be removed in release 1.21. Please check out the [RFC](https://github.com/spinnaker/governance/blob/master/rfc/eol_kubernetes_v1.md) for more details.

<br>

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.18.0-rc265
timestamp: "2020-02-14 21:18:32"
services:
  clouddriver:
    version: 6.5.1-f969aaf-2f123de-rc6
  deck:
    version: 2.14.0-5f306f6-df9097d-rc6
  dinghy:
    version: 0.0.4-bb15163-rc238
  echo:
    version: 2.10.0-48991a0-e3df630-rc6
  fiat:
    version: 1.9.0-fa3a735-695585e-rc5
  front50:
    version: 0.21.0-cca684d-4e0f6fc-rc5
  gate:
    version: 1.14.0-42ccb4f-a2428e6-rc5
  igor:
    version: 1.8.1-7bd757d-127328c-rc5
  kayenta:
    version: 0.13.0-e7f465e-dcad431-rc5
  monitoring-daemon:
    version: 0.16.1-7d506f0-rc1
  monitoring-third-party:
    version: 0.16.1-7d506f0-rc1
  orca:
    version: 2.12.0-67f03ef-c3b6f15-rc8
  rosco:
    version: 0.16.0-7c38ed6-508e253-rc5
  terraformer:
    version: 0.0.2-266ac86-rc3
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - bb15163
No Changes

#### Terraformer&trade; - b6cdbbf...266ac86
 - feat(profiles): Add /v1/profiles endpoint (#117)
 - feat(namedEnv): adds support for named profiles in terraformer config (#114)
 - feat(terraform): add versions 0.12.19 and 0.12.20 (#115)

#### Armory Clouddriver  - 09a60e8...f969aaf
 - chore(release): bump versions for kork, armory-commons, oss service (#51)

#### Armory Deck  - d5d7828...5f306f6
 - chore(release): bump versions for kork, armory-commons, oss service (#569)
 - feat(terraformer): display plan detailed result (#568)

#### Armory Echo  - 787cde5...48991a0
 - fix(compile): Fix build due to different scope for rest config (#123)
 - chore(release): bump versions for kork, armory-commons, oss service (#122)

#### Armory Fiat  - cb77e1e...fa3a735
 - chore(release): bump versions for kork, armory-commons, oss service (#34)

#### Armory Front50  - 9c0b294...cca684d
 - chore(release): bump versions for kork, armory-commons, oss service (#31)
 - chore(opa): refactor opa to be more idiomatic (#30)

#### Armory Gate  - 250616f...42ccb4f
 - chore(release): bump versions for kork, armory-commons, oss service (#87)

#### Armory Igor  - 54d7797...7bd757d
 - chore(release): bump versions for kork, armory-commons, oss service (#41)

#### Armory Kayenta  - 0085ac5...e7f465e
 - chore(release): bump versions for kork, armory-commons, oss service (#46)

#### Armory Orca  - 25ef38f...67f03ef
 - chore(release): bump versions for kork, armory-commons, oss service (#63)

#### Armory Rosco  - 33810a8...7c38ed6
 - chore(release): bump versions for kork, armory-commons, oss service (#31)


### Armory Open Core
#### Dinghy (Open Core) - 60cb2f5
No Changes


###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release:  
[Spinnaker's 1.18.2](https://www.spinnaker.io/community/releases/versions/1-18-2-changelog#individual-service-changes)

#### Clouddriver  - 5f272cd...2f123de
 - fix(ecs): ECS handling of IAM Roles with a path (#4321) (#4322)
 - fix(kubernetes): On refresh, don't replace credentials that have not changed (#4301)
 - fix(sql): SqlUnknownAgentCleanupAgent should not throw errors on nonexistent tables (#4262) (#4264)
 - chore(kork): bump kork version (#4263)
 - fix(sql): Add cache cleanup agent for removed accounts (#4232) (#4255)
 - fix(kubernetes): do not throw NPE when no initContainers (#4251) (#4252)
 - fix(kubernetes): Core caching agent is authoritative for artifacts (#4247) (#4248)
 - Add ssh:// as valid git URL start. (#4241)
 - fix(kubernetes): Core caching agent is authoritative for artifacts (#4247)
 - fix(kubernetes): Delete namespace caching agent (#4246)
 - fix(kubernetes): permit null properties of NetworkPolicy PortRules (#4245)
 - fix(cf): remove cf secondary cache expiry to prevent expensive api calls (#4244)
 - fix(appengine): Propagate gcloud failures from job executor to task. (#4243)
 - chore(core): standardize on javax nonnull and nullable annotations (#4242)
 - fix(kubernetes): Fix stability for stateful/daemon set (#4239)
 - fix(unittests): Added dependency required to run spock tests along with Junit5 tests (#4240)
 - chore(dependencies): Reverting Spring Boot 2.2 upgrade (#4236)
 - feat(kubernetes): add initContainer logs to kubernetes v2 provider container logs (#4235)
 - chore(release): update the containers to Alpine 3.11 (#4234)
 - chore(build): upgrade to GitHub Actions checkout@v2 (#4231)
 - feat(aws/cfn): Add execute CloudFormation ChangeSet (#4195)
 - fix(provider/aws): updated clouddriver to accept aws accesskey and secret when loaded from external sources (#4202)
 - fix(saga): Handle concurrency issue when same op is sent more than once (#4229)
 - feat(provider/ecs): add support for services with multiple target groups (#4218)
 - feat(IPRangeRuleDescription) Description for IPRangeRules (#4215)
 - fix(saga): Removing the `list` endpoints as the current implementation is a performance liability (#4228)
 - chore(dependencies): Autobump fiatVersion (#4221)
 - fix(tests): Fixed failing SagaService test and also enable Junit5 plaâ€¦ (#4225)
 - chore(dependencies): Autobump korkVersion (#4212)
 - chore(testfix): liquibase/jackson incompatibility (#4223)
 - fix(cfn): do not add roleARN if empty or null (#4206) (#4220)
 - fix(ecs): reject task def artifact if it contains unknown properties (#4211) (#4219)
 - fix(kubernetes): Null check in health endpoint to avoid NPE (#4226)
 - chore(release): Use the alpine containers instead of openjdk (#4224)
 - chore(dependencies): Autobump fiatVersion (#4214)
 - chore(dependencies): Upgrade Spring Boot to 2.2.1 (#4168)
 - fix(cfn): do not add roleARN if empty or null (#4206)
 - fix(ecs): reject task def artifact if it contains unknown properties (#4211)
 - feat(huaweicloud): initializing work to add cache agent of security gâ€¦ (#4187)
 - chore(dependencies): Autobump fiatVersion (#4213)
 - fix(saga): Missed a function parameter type conversion from List to Set (#4210)
 - fix(sagas): Use a Set instead of List to avoid duplicate Task SagaIds (#4209)
 - chore(dependencies): Autobump korkVersion (#4208)
 - fix(cats/sql): fix table names with long type names (#4166) (#4207)
 - fix(provider/kubernetes): validate spec.template is a map before cast (#4200)
 - chore(dependencies): Autobump fiatVersion (#4204)
 - Update the clouddriver lambda APIs to support additional attributes and Update the load balancer to support lambda target. (#4169)
 - chore(dependencies): Autobump korkVersion (#4203)
 - fix(kubernetes): correct spelling in error message (#4199)
 - refactor(artifacts): Use builder to create artifacts (#4198)
 - chore(dependencies): Autobump korkVersion (#4197)
 - fix(cats/sql): ensure cache agent tables exist when using sql backend (#4196)
 - feat(authz): add Permissions to titus account configuration
 - chore(dependencies): update to latest titus-api-definitions
 - chore(dependencies): Autobump korkVersion (#4193)
 - feat(mergify): Allow OSS approvers to auto-submit without review (#4189)
 - fix(kubernetes): do not throw NPE on NetworkPolicies with ingresses with null ports (#4182) (#4186)
 - chore(dependencies): Autobump korkVersion (#4190)
 - fix(revert): Fixes method signature issue (#4188)
 - fix(kubernetes): do not throw NPE on NetworkPolicies with ingresses with null ports (#4182)
 - fix(titus): shutdown the executor for titus streaming agent (#4185)
 - fix(thread): make sure to provide NamedThreadFactory to all executors (#4184)
 - fix(docker): Fix sorting array of non-comparable types (#4183)
 - feat(securityGroup*): Add support to set ipIngress.description and geâ€¦ (#4162)
 - fix(kubernetes): do not throw NPE on NetworkPolicies with null ingress and egress (#4172) (#4173)
 - fix(kubernetes): Add missing limitrange kind (#4170) (#4174)
 - feat(huaweicloud): first commit for huaweicloud (#4176)
 - fix(titus): Resolve next sequence number when cluster details match sequence pattern (#4177)
 - fix(securityGroup): Add tags field to AmazonSecurityGroup model (#4165)
 - chore(saga): Log when sagaId added to task (#4175)
 - chore(dependencies): Autobump korkVersion (#4171)
 - fix(kubernetes): do not throw NPE on NetworkPolicies with null ingress and egress (#4172)
 - fix(kubernetes): Add missing limitrange kind (#4170)
 - feat(cf): add SpEL support for cf manifests (#4167)
 - fix(caching): Config to disable fully qualified caching agents (#4158)
 - fix(cats/sql): fix table names with long type names (#4166)
 - chore(dependencies): Autobump korkVersion (#4164)
 - chore(dependencies): Autobump korkVersion (#4163)
 - fix(aws): support for cross-application CLBs with the sql backend (#4141) (#4142)
 - chore(dependencies): Autobump korkVersion (#4161)
 - refactor(cf): removed unused code, fix spelling and etc (#4159)
 - feat(cf): separate lb and sg into separate caching agents (#4154)
 - feat(saga): Saga exception handler and TitusExceptionHandler implementation (#4155)
 - feat(cf): increase logging for cf to better detect fails (#4156)
 - fix(aws): Protect against huge upsert security group operations (#4157)
 - feat(*): Try removing gradle-command-action (#4152)
 - feat(*): Github Actions Experiment (#4150)
 - chore(dependencies): Autobump fiatVersion (#4149)
 - fix(titus): backoff for caching agent observeJob retries (#4147)
 - chore(dependencies): Autobump korkVersion (#4146)
 - chore(dependencies): Autobump korkVersion (#4145)
 - chore(dependencies): Autobump fiatVersion (#4144)
 - feat(*): CODEOWNERS experiment (#4143)
 - feat(alibabacloud): clouddriver-alicloud supports deploying and managing load balancer (#3916)
 - fix(aws): support for cross-application CLBs with the sql backend (#4141)
 - chore(dependencies): Autobump korkVersion (#4140)
 - fix(titus): allow setting jobGroupDetails and jobGroupStack for Titus Batch Job requests (#4138)
 - feat(cf): provide more info when retrying an API (#4137)
 - fix(kubernetes): Fix mis-spelled API group (#4135) (#4136)
 - fix(kubernetes): Fix mis-spelled API group (#4135)
 - fix(saga-retry): Opt-in pattern for retrying non-SpinnakerExceptions (#4097)

#### Deck  - 75cecc4...df9097d
 - Revert "chore(actions): 1.18.x release branch needs ci workflow definition. (#7878)" (#7880)
 - fix(core/confirmationModal): Supply the 'source' location when canceling (#7816) (#7876)
 - chore(actions): 1.18.x release branch needs ci workflow definition. (#7878)
 - fix(core): do not render the server group warning message in <pre> (#7774) (#7777)
 - fix(core): display task monitor above page navigator chrome (#7772) (#7773)
 - fix(appconfig): Fix error thrown when slack object is not defined (#7770) (#7771)
 - fix(core): manual cherry-pick of MapEditor fixes (#7769)
 - fix(plugins): Remove plugins entry that is causing runtime errors (#7767) (#7768)
 - feat(aws/cfn): Cloudformation ChangeSet execution (#7671)
 - chore(chore): bump to 0.0.441 (#7766)
 - fix(core/pipeline): use fresh trigger + stage list for upstream flag validation (#7765)
 - fix(core): catch cancelling of resource pause from server group modal (#7764)
 - chore(titus): bump package to 0.0.123 (#7763)
 - chore(amazon): bump package to 0.0.231 (#7762)
 - chore(core): Bump version to 0.0.440 (#7761)
 - refactor(*): de-angularize confirmationModalService (#7759)
 - feat(core/amazon/titus): do not allow create/clone in managed clusters (#7754)
 - fix(core): catch/handle confirmation modal dismissal (#7758)
 - fix(core): keep health counts on one line in server group title (#7757)
 - feat(managed-delivery): Add UI for importDeliveryConfig stage (#7733)
 - fix(kubernetes): remove accidental static from resolveIndexedSecurityGroups (#7760)
 - fix(core): Update functional tests with new modal heading el (#7756)
 - fix(core): do not log all help contents to the console (#7755)
 - chore(titus): bump package to 0.0.123 (#7753)
 - chore(amazon): bump package to 0.0.230 (#7752)
 - chore(core): bump package to 0.0.439 (#7751)
 - feat(core/amazon/titus): restrict menu items on managed resources (#7750)
 - chore(titus): bump package to 0.0.122 (#7749)
 - chore(docker): bump package to 0.0.50 (#7748)
 - chore(amazon): bump package to 0.0.229 (#7747)
 - chore(core): bump package to 0.0.438 (#7746)
 - feat(core): offer to pause managed resources before performing actions (#7728)
 - refactor(*): use consistent styles on modal headers
 - feat(core): add pause/resume to managed resource menu
 - feat(core): add validator for stage/trigger providing repository info
 - Apply suggestions from code review
 - refactor(*): favor optional chaining over lodash.get
 - fix(core): do not try to render task monitor if monitor is missing (#7744)
 - refactor(core): use useForceUpdate hook instead of more opinionated hook
 - refactor(core): convert confirmation modal to react
 - refactor(core/amazon): remove unused CSS rules (#7732)
 - refactor(core): provide wrapper for dangerously setting html (#7721)
 - fix(ecs): Fixes AmazonLoadBalancerChoiceModal for ecs (#7741)
 - chore(kubernetes): Bump version to 0.0.30 (#7739)
 - Bump Amazon version to 0.0.228
 - fix(amazon): Fix additionalIpRules component imports (#7737)
 - Template version ui (#7708)
 - fix(plugins): Default plugins to empty list to prevent NPE (#7736)
 - chore(amazon): Bump amazon version to 0.0.227 (#7735)
 - test(plugins): test the plugin registry
 - refactor(plugin): rename metadata/manifest references to be consistent - switch 'version' to be a 'string' - add getRegisteredPlugins() - move import() to a function to be testable - add 'module' to manifest interface
 - refactor(plugin): remove ILocalDevPluginManifestData and move url to IPluginManifestData.devUrl
 - feat(plugins): Add a PluginRegistry and simplify bootstrapping
 - feat(plugins): able to load plugin stages into UI
 - feat(aws/additionalIpRules): Add a component for aws security group aâ€¦ (#7726)
 - chore(amazon): Bump amazon to 0.0.226 (#7727)
 - feat(managed): allow pausing/resuming managed resources via indicator (#7717)
 - chore(core): Bump to 0.0.437 (#7724)
 - feat(provider/ecs): add support for services with multiple target groups (#7692)
 - fix(awsIngressHelpText): Add help text for cross account ingress rules (#7720)
 - fix(core): updateStageField should not update reserved fields (#7722)
 - refactor(core): remove unused parameter options from confirmation modal (#7716)
 - fix(core): allow scroll in main view when content has extra stuff (#7712)
 - fix(core): increase CSS specificity on select2 overrides (#7719)
 - fix eslint issues
 - minor fixup
 - fixup
 - feat(aws/iprules): Create react component for IPRule details
 - fix(plugins): Fix linter error and rename file
 - feat(plugins): Expose sharedLibraries on the Spinnaker global object
 - fix(core/utils): Only set window.spinnaker if the window object is present
 - chore(core): upgrade to latest prettier (#7713)
 - fix(travis): Fail PRs when they have eslint errors (#7715)
 - chore(eslint): lint the entire app/ directory not just modules/ (#7714)
 - chore(amazon): Remove unused AmazonTemplates (#7707)
 - fix(core): derive security group view options from filterModel (#7711)
 - fix(projects): Fixing clusters error validation (#7701) (#7704)
 - chore(core): bump to 0.0.436 (#7703)
 - fix(spel2js): Use named exports (#7710)
 - fix(core): Fix security group load performance (#7709)
 - refactor(google): lazily initialize state with function
 - refactor(google): #native defaulting
 - refactor(google): refactor GCB stage to use new FormikFormFields and hooks APIs
 - fix(eslint): dcos import must conform to new eslint rules (#7705)
 - fix(projects): Fixing clusters error validation (#7701)
 - fix(eslint): Run eslint rules on canary and dcos
 - fix(eslint): Run eslint scripts on all modules, even those without a src directory - Rename from `yarn eslint` to `yarn lint`
 - refactor(eslint): Fix all '@typescript-eslint/no-inferrable-types' eslint rule violations
 - refactor(eslint): Fix all '@spinnaker/ng-no-component-class' eslint rule violations
 - refactor(eslint): Fix all 'prefer-const' eslint rule violations
 - refactor(eslint): Fix all 'one-var' eslint rule violations
 - refactor(eslint): Fix all 'no-var' eslint rule violations
 - chore(eslint): Turn off some more eslint rules These rules do not spark joy
 - test(eslint): Add basic tests for all custom eslint rules and fix strictdi rule's fixer for javascript classes
 - chore(eslint): remove tslint
 - refactor(eslint): rename rules prefixing with 'ng'
 - feat(eslint): Create prefer-bare-module rule to prefer import { module } from 'angular'
 - feat(eslint): Create no-require-dot-name rule that prefers imports over requires for angular modules
 - feat(eslint): Create no-ng-module-export rule that prefers exporting an NG module name, not the module object (with fixer)
 - chore(eslint): customize eslint configuration for deck and add to package.json and webpack scripts
 - feat(eslint): Create eslint rules: strictdi and component-literal
 - chore(eslint): add eslint DI rule from eslint-plugin-angular
 - feat(eslint): Create skeleton spinnaker eslint plugin
 - fix(core): make resources paused if app is paused (#7699)
 - refactor(karma): migrate karma-shim to es6 imports
 - fix(angular-ui-bootstrap): Kludge: cast angular-ui-bootstrap default import as 'any'
 - fix(typescript): Add basic typescript definitions for some angular libs
 - fix(imports): move imports out of describe() blocks
 - refactor(angularjs): use ES6 to import angular - migrate from `const angular = require('angular')` to `import * as angular from 'angular'` - Where possible, migrate from `import angular from 'angular'; angular.module('asdf')` to `import { module } from 'angular'; module('asdf')`
 - refactor(angularjs): use ES6 imports for angularjs module deps - migrate from `require('@uirouter/angularjs').default` to import UIROUTER_ANGULARJS from '@uirouter/angularjs' - migrate from `require('angular-ui-bootstrap')` to import ANGULAR_UI_BOOTSTRAP from 'angular-ui-bootstrap'
 - refactor(angularjs): Import angularjs module dependencies by name - Migrate angularjs module dependencies to import the exported string identifier, not via require('module').name
 - refactor(angularjs): Always export the ng module name, not the module itself
 - refactor(core): add pause status flags to managed resources (#7698)
 - chore(core): bump to 0.0.435 (#7696)
 - refactor(core/managed): switch from ApplicationVeto to pause API (#7695)
 - chore(core): Bump core to 0.0.434 (#7694)
 - fix(core/slack): Abstract Slack base url (#7693)
 - chore(titus): Bump version to 0.0.121 (#7689)
 - test(core): Fix intermittent Executions test (#7691)
 - fix(titus): Temporarily disabling previous image rollbacks for Titus (#7688)
 - fix(tests): Use webpack-dev-middleware for functional tests (#7687)
 - refactor(core): move managed entity fields to separate interface (#7686)
 - refactor(core): convert security groups views to React (#7676)
 - chore(typescript): Migrate most wildcard imports to javascript style imports - Migrate from "import * as foo from 'foo'" to "import foo from 'foo'"
 - feat(typescript): enable allowJs and allowSyntheticDefaultImports
 - chore(package): update to react-tether@1.0.5 (#7684)
 - chore(titus): Bump version to 0.0.120 (#7683)
 - chore(core): Bump to version 0.0.433
 - fix(core): fix npe on first project cluster creation (#7673) (#7675)
 - feat(strictDi): allow non-strict-di for whitelisted modules - angular-mocks (unit tests) doesn't explicitly annotate some code.
 - chore(angularjs): Enable strictdi mode
 - feat(angularjs): Add eager strictDi checking for all known inject types
 - feat(core/presentation): add text breaking/wrapping components (#7679)
 - fix(titus): Remove default metricName (#7680)
 - feat(gcb): Ability to invoke existing GCB triggers (#7632)
 - fix(core): fix npe on first project cluster creation (#7673)
 - chore(typescript): update to typescript 3.7.x (#7668)
 - fix(webpack): use a less race-y way of generating CSS Module TS files (#7674)
 - fix(page): Do not auto-close modal on success (#7672)
 - feat(core/presentation): expose all the Modal-related components
 - feat(core/presentation): add <ModalFooter/> component
 - feat(core/presentation): add <ModalBody/> component
 - feat(core/presentation): add <ModalHeader/> component
 - feat(core/presentation): add <Modal/> component
 - feat(core/presentation): add low-level CSS modules for color, z-index, breakpoints
 - chore(core/presentation): expose some new hooks to consumers
 - chore(deps): add react-transition-group, postcss-nested
 - refactor(*): Remove exports-loader from n3-chart import
 - fix(kubernetes/serverGroup): Remove unused controller file for 'kubernetesServerGroupLoadBalancersController' (#7663)
 - feat(slack): Introduce slack support channel selector (#7658)
 - fix(amazon/instance): don't blow up on standalone instances (#7666)
 - fix(lint): Fixes for linter rules @typescript-eslint/ban-types and @typescript-eslint/no-inferrable-types
 - fix(lint): Fixes for no-useless-escape linter rule
 - fix(angularJS): Fix all remaining non-strict angularJS DI code via @spinnaker/strictdi linter rule
 - fix(core/pipeline): Fix for eslint rule no-case-declarations
 - feat(core/presentation): add four new hooks + tests (#7659)
 - chore(npm): GitHub Actions publishing modules to npm (#7657)
 - chore(react-select): Update react-select type modules (#7660)
 - chore(tsconfig): standardize all tsconfig.json files to es2017 (#7656)
 - chore(titus): Bump version to 0.0.119 (#7654)
 - chore(npm): Pilot GitHub Action for publishing titus
 - chore(npm): Adding a script to publish modules from GitHub Actions
 - fix(amazon): Update load balancer validations to match user expectations (#7584)
 - chore(amazon): Bump version to 0.0.225 (#7653)
 - fix(amazon): Removing negative lookbehind (#7651)
 - fix(typo): Fix typo (#7652)
 - feat(core): add support for CSS modules to dev server + lib build (#7650)
 - chore(amazon): Bump version to 0.0.224 (#7646)
 - fix(amazon): Copy capacity from current server group does not persist (#7644)
 - fix(core/pipeline): ExecutionAndtagePicker Fix auto selection of stage (#7640)
 - fix(travis): Fixing typos in package bump checks (#7647)
 - feat(aws): Allow filtering cross account ingress (#7645)
 - test(npm): Ensuring module version changes are standalone PRs (#7637)
 - chore(deps): [security] bump https-proxy-agent from 2.2.1 to 2.2.4
 - fix(azure,gce): Fix typo breaking bake stage (#7631) (#7639)
 - feat(provider/aws): Lambda function target support for AWS ALB (#7630)
 - fix(azure,gce): Fix typo breaking bake stage (#7631)
 - chore(core): Bump version to 0.0.432
 - fix(core/pipeline): Use markdown to render evaluated variables as JSON (#7628)
 - test(core/presentation): Re-add removed isInitialValid logic (#7627)
 - feat(provider/aws): Function create/update/delete feature. (#7586)
 - chore(core): Bump version to 0.0.431 (#7626)
 - feat(core/pipeline): Evaluate Variables: show message if no previous executions were found
 - feat(core/pipeline): Added execution/stage picker and some help text to the Evaluate Variables stage - add "column" labels to Evaluate Variables stage - add one variable by default when the component loads
 - feat(core/pipeline): Added an ExecutionAndStagePicker component Used in Evaluate Variables to choose the stage to preview Spel Expressions against
 - feat(core/pipeline): Add spel preview to Evaluate Variables stage - Migrate EvaluateVariablesStageConfig from MapEditor to SpelInputs
 - Bump package core to 0.0.430 and amazon to 0.0.223 (#7625)
 - test(core/presentation): Update tests with new previewStage API
 - feat(core/presentation): Add previous execution description to spel preview
 - fix(core/presentation): SpelInput: when updating spel preview, continue to render the previous preview result
 - fix(core/utils): Invoke callback on null/undefined properties (#7620)
 - fix(core/presentation): Do not render SpinFormik form until formik has been initialized. (#7619)
 - fix(artifacts): enable inline editing of base64 artifacts (#7612) (#7614)
 - fix(kubernetes): fix patchBody input in Patch (Manifest) stage (#7600) (#7615)
 - feat(amazon/instance): add configurable exclusion rules for families + categories (#7623)
 - feat(core/managed): visually refresh/rebrand infra details indicator (#7617)
 - fix(core/managed): properly diff/patch mutable infra groupings (#7618)
 - feat(core/presentation): Create a SpelInput that supports server-side preview of spel expressions (against previous executions)
 - feat(core/spel): Add a SpelService to (initially) evaluate expressions on the Server
 - refactor(core/presentation): use useInternalValidator in NumberInput
 - feat(core/presentation): Create a useInternalValidator hook for FormInputs to use
 - add 'ready to rebase' label to mergify config (#7616)
 - feat(core/presentation): Made useData hook default result behavior more reasonable (#7602)
 - feat(core/managed): add RESUMED resource status (#7611)
 - feat(core/managed): add deep links to status reference doc (#7610)
 - fix(core/presentation): Handle 'null' in orEmptyString helper (#7606)
 - chore(core/presentation): updates icon font (#7613)
 - feat(core/presentation): Mark all SpinFormik initialValues fields as 'touched' (#7604)
 - feat(core/presentation): Add generic type param (for selected data type) to ReactSelectInput (#7603)
 - fix(core/presentation): MapEditor: Make errors fill the entire row width.
 - fix(core/presentation): FormikFormField: call revalidate whenever internal validators change
 - fix(core/presentation): pass objects through in useValidationData There's a weird case where a FormikFormField may be used for a complex object with multiple fields and/or arrays. In this case, the Field's validator should return a structured error object. This isn't fully accounted for in the FormField API. For now, pass the complex error object through as 'validationMessage'. Tag it as "hidden" so we don't try to render it elsewhere as a ReactNode.
 - fix(kubernetes): fix patchBody input in Patch (Manifest) stage (#7600)
 - fix(artifacts): enable inline editing of base64 artifacts (#7612)
 - feat(huaweicloud): first commit for huaweicloud (#7598)
 - chore(core/presentation): rename test file to FormValidator.spec.ts
 - fix(core/application): add error state to application models, log exceptions (#7599)
 - fix(core/presentation): remove style + wrapperClassName from HoverablePopover (#7597)
 - feat(script): expose propertiesFile field (#7595)
 - chore(core): Bump version to 0.0.429 (#7596)
 - feat(managed): Add status popovers, new props for HoverablePopover
 - feat(managed): add resource status indicator to security groups
 - feat(managed): add managed resource data to security group groups
 - feat(managed): add resource status indicator to load balancers
 - feat(managed): add managed resource data to load balancer groups
 - feat(managed): add resource status indicator to clusters
 - feat(managed): add managed resource data to cluster groups
 - feat(dataSources): add runtime error when defaultData isn't provided (#7591)
 - fix(cf): delete lb confirmation not displaying (#7594)
 - feat(core/presentation): Reduce unnecessary renders in useLatestPromise, add tests
 - feat(core/presentation): Reduce unnecessary renders in useDebouncedValue, add tests
 - refactor(core/presentation): extract useIsMountedRef hook
 - chore(package): update to @types/enzyme@3.10.3, enzyme@3.10.0, enzyme-adapter-react-16@1.15.1 (#7585)
 - chore(deps): bump @spinnaker/kayenta from 0.0.87 to 0.0.88 (#7587)
 - chore(deps): bump @spinnaker/styleguide from 1.0.14 to 1.0.15 (#7589)
 - chore(help): Update help.contents.ts (#7588)
 - fix(rerun): Hiding re-run as strategies should not be re-run (#7583)
 - fix(helptext): clarify text for stage timeout (#7336)
 - chore(titus): Bump version to 0.0.118
 - chore(amazon): Bump version to 0.0.222
 - chore(core): Bump version to 0.0.428
 - feat(managed): Update resource indicators to use new data source
 - feat(managed): Join managed data to infra data, add moniker to Security Groups
 - feat(managed): Use new data source for 'Managed Resources' config section
 - feat(managed): add 'managedResources' data source
 - feat(dataSources): widen + parameterize types, add default values
 - Reactify titus launch configuration (#7581)
 - fix(core): Ensure default port used for target group healthcheck link (#7576)

#### Echo  - 771a15b...e3df630
 - chore(kork): bump kork version (#750)
 - fix(stats): Fix NPE when pipeline explicitly sends 'source=null' (#741) (#742)
 - fix(stats): mpt tracking (#740)
 - fix(slack): Allow specifying full url for webhooks integration (#738)
 - fix(discovery): make spring config order explicit to fix Conditional bean loading (#739)
 - chore(dependencies): Reverting Spring Boot 2.2 upgrade (#735)
 - chore(dependencies): Autobump fiatVersion (#734)
 - chore(dependencies): Autobump korkVersion (#732)
 - perf(pipelines): Use new endpoint to fetch pipeline config (#733)
 - fix(github): Put back github endpoint configuration (#726) (#731)
 - fix(github): Put back github endpoint configuration (#726)
 - chore(dependencies): Autobump fiatVersion (#730)
 - chore(dependencies): Autobump fiatVersion (#729)
 - chore(dependencies): Autobump korkVersion (#728)
 - chore(dependencies): Autobump korkVersion (#727)
 - fix(mpt): include templateVariables in pipeline model (#725)
 - chore(dependencies): Autobump fiatVersion (#724)
 - chore(dependencies): Upgrade Spring Boot to 2.2.1 (#702)
 - chore(dependencies): Autobump fiatVersion (#723)
 - chore(dependencies): Autobump korkVersion (#721)
 - fix(stats): Apply https://github.com/spinnaker/echo/pull/706 to halconfig (#720)
 - chore(dependencies): Autobump korkVersion (#719)
 - chore(dependencies): Autobump fiatVersion (#718)
 - chore(dependencies): Autobump fiatVersion (#717)
 - chore(dependencies): Autobump korkVersion (#716)
 - refactor(artifacts): Use builder to create artifacts (#715)
 - chore(dependencies): Autobump korkVersion (#714)
 - fix(pubsub): Fix #4835 by using a pubsub library that includes a fix (#713)
 - chore(dependencies): Autobump korkVersion (#712)
 - feat(mergify): Allow OSS approvers to autosubmit (#711)
 - chore(dependencies): Autobump korkVersion (#710)
 - fix(models): add spelEvaluator field to pipeline (#709)
 - feat(extension): Add flattenEvent parsing to RestEventParser and convert Groovy to Java in echo-rest (#708)
 - feat(extension): Add event parser extension for echo-rest (#703)
 - feat(stats): Pull apart the cloudProviders passed along during application creation (#707)
 - fix(stats): Deregister the telemetry circuit breaker from the health indicator (#706)
 - feat(stats): Update stat collection to whitelisted cloud providers (#704)
 - chore(dependencies): Autobump korkVersion (#701)
 - chore(dependencies): Autobump korkVersion (#700)
 - chore(dependencies): Autobump korkVersion (#699)
 - chore(dependencies): Autobump fiatVersion (#698)
 - chore(dependencies): Autobump korkVersion (#697)
 - chore(dependencies): Autobump korkVersion (#696)
 - chore(dependencies): Autobump fiatVersion (#695)
 - chore(dependencies): Autobump korkVersion (#694)
 - feat(triggers) Adds support for payloadConstraints on property files for build triggers (#691)
 - feat(triggers): add action field to git triggers (#693)

#### Fiat  - c62d038...695585e
 - chore(kork): bump kork version (#544)
 - chore(dependencies): Reverting Spring Boot 2.2 upgrade (#535)
 - chore(dependencies): Autobump korkVersion (#536)
 - chore(release): update the containers to Alpine 3.11 (#534)
 - feat(*): Github Actions for PR builds (#533)
 - chore(dependencies): Autobump korkVersion (#530)
 - chore(permissions): Add unpack() public method to Permissions (#532)
 - chore(release): Use the alpine containers instead of openjdk (#531)
 - fix(redis): only remove a key if it wouldn't be overwritten (#529)
 - fix(metrics-logs): Record permissionsCache caffeine metrics with CaffeineStatsCounter and add debug log when access denied to accounts (#528)
 - chore(dependencies): Autobump korkVersion (#527)
 - chore(dependencies): Autobump korkVersion (#525)
 - fix(log): Add request headers to access denied exception handler log (#526)
 - chore(dependencies): Upgrade Spring Boot to 2.2.1 (#510)
 - chore(dependencies): Autobump korkVersion (#524)
 - chore(log): Log request method, URI, and exception in FiatAccessDeniedExceptionHandler (#523)
 - chore(dependencies): Autobump korkVersion (#522)
 - refactor(fallback): Add FallbackPermissionsResolver and default implementation (#521)
 - chore(dependencies): Autobump korkVersion (#520)
 - fix(permissionSource): Set order (lowest precedence) on default permission sources (#519)
 - chore(dependencies): Autobump korkVersion (#518)
 - chore(dependencies): Autobump korkVersion (#517)
 - feat(mergify): Allow OSS approvers to autosubmit (#516)
 - fix(serviceAccount): Filter non-valid roles when converting to UserPermission (#513) (#514)
 - chore(dependencies): Autobump korkVersion (#515)
 - fix(serviceAccount): Filter non-valid roles when converting to UserPermission (#513)
 - chore(dependencies): Autobump korkVersion (#511)
 - fix(roles): file-based roles fail when the user is not provided in the file (#508) (#509)
 - fix(roles): file-based roles fail when the user is not provided in the file (#508)
 - chore(dependencies): Autobump korkVersion (#507)
 - chore(dependencies): Autobump korkVersion (#506)
 - chore(dependencies): Autobump korkVersion (#505)
 - fix(authorization): canCreate should not return void (#502) (#504)
 - fix(authorization): canCreate should not return void (#502)
 - chore(dependencies): Autobump korkVersion (#503)
 - chore(dependencies): Autobump korkVersion (#501)
 - fix(unrestricted): load permissions for unrestricted roles (#500)
 - feat(*): CODEOWNERS experiment (#498)
 - chore(dependencies): Autobump korkVersion (#499)

#### Front50  - 9415a44...4e0f6fc
 - chore(kork): bump kork version (#686)
 - fix(permissions): Return updated permission if permission is not restricted (#676)
 - fix(permissions): Add abstract class ChaosMonkeyEventListener and chaos monkey ApplicationPermissionEventListener implementation (#675)
 - Revert "fix(permissions): Apply chaos monkey permissions on application update permissions event (#673)" (#674)
 - fix(permissions): Apply chaos monkey permissions on application update permissions event (#673)
 - fix(permissions): Update and persist chaos monkey permissions on application PRE_UPDATE event (#672)
 - Revert "fix(plugins): Add GET by pluginId (#670)" (#671)
 - fix(plugins): Add GET by pluginId (#670)
 - feat(plugins): Adds plugin artifact repository (#651)
 - chore(dependencies): Reverting Spring Boot 2.2 upgrade (#666)
 - chore(dependencies): Autobump korkVersion (#668)
 - chore(dependencies): Autobump korkVersion (#667)
 - chore(release): update the containers to Alpine 3.11 (#665)
 - feat(core): Filter by v2 and group template versions (#658)
 - feat(*): Disable GitHub Actions cache (#664)
 - feat(*): Github Actions for PR builds (#663)
 - feat(chaosmonkey): Enforce chaos monkey permissions when enabled (#660)
 - chore(java11): Switch the default containers to use Java 11. (#662)
 - chore(dependencies): Autobump fiatVersion (#661)
 - chore(dependencies): Autobump korkVersion (#657)
 - chore(release): Use the alpine containers instead of openjdk (#659)
 - chore(dependencies): Autobump fiatVersion (#656)
 - chore(dependencies): Autobump fiatVersion (#655)
 - chore(dependencies): Autobump korkVersion (#654)
 - chore(dependencies): Autobump korkVersion (#653)
 - chore(dependencies): Autobump fiatVersion (#652)
 - chore(dependencies): Autobump fiatVersion (#650)
 - chore(dependencies): Autobump korkVersion (#649)
 - chore(dependencies): Autobump korkVersion (#648)
 - chore(dependencies): Autobump korkVersion (#647)
 - chore(dependencies): Autobump fiatVersion (#646)
 - fix(pipelinetemplate): NPE on listing pipeline templates with redis storage (#640)
 - feat(core): Add endpoint to get current pipeline definition (#644)
 - chore(dependencies): Autobump korkVersion (#645)
 - chore(dependencies): Autobump korkVersion (#643)
 - feat(sql): Enables composite storage service to be backed by SQL storâ€¦ (#641)
 - chore(dependencies): Autobump korkVersion (#642)
 - feat(mergify): Allow OSS approvers to autosubmit (#639)
 - chore(dependencies): Autobump korkVersion (#638)
 - chore(dependencies): Autobump korkVersion (#637)
 - chore(dependencies): Autobump korkVersion (#636)
 - feat(PostgreSQL DB Storage): Added support for Postgres. Changes inclâ€¦ (#635)
 - chore(dependencies): Autobump korkVersion (#634)
 - chore(dependencies): Autobump korkVersion (#633)
 - chore(dependencies): Autobump korkVersion (#632)
 - fix(authorization): update fiatVersion to fix canCreate (#631)
 - chore(dependencies): Autobump fiatVersion (#630)
 - chore(dependencies): Autobump korkVersion (#629)
 - chore(dependencies): Autobump korkVersion (#628)
 - chore(dependencies): Autobump fiatVersion (#627)
 - chore(dependencies): Autobump korkVersion (#626)

#### Gate  - a453541...a2428e6
 - chore(kork): bump kork version (#1012)
 - chore(dependencies): Reverting Spring Boot 2.2 upgrade (#999)
 - chore(release): update the containers to Alpine 3.11 (#998)
 - feat(core): Update Gate to return Map of versioned pipeline templates (#989)
 - feat(*): Github Actions for PR builds (#996)
 - feat(managed): endpoint for getting artifact versions per environment
 - chore(md): remove create/delete individual resource endpoints (#992)
 - chore(dependencies): Autobump fiatVersion (#994)
 - fix(md): really move models: (#993)
 - feat(md): move model classes to gate, update artifacts (#991)
 - chore(release): Use the alpine containers instead of openjdk (#990)
 - fix(md): fix post request (#987)
 - fix(auth): Basic auth was missing the cookie serializer like othâ€¦ (#986)
 - chore(dependencies): Autobump fiatVersion (#985)
 - feat(md): expose pause resources (#984)
 - chore(dependencies): Autobump fiatVersion (#980)
 - refactor(managed): switch from veto -> pause APIs (#983)
 - chore(dependencies): Autobump korkVersion (#982)
 - chore(dependencies): Autobump korkVersion (#977)
 - chore(dependencies): Upgrade Spring Boot to 2.2.1 (#966)
 - fix(slack): Increase delay between scheduled calls to Slack API (#978)
 - chore(dependencies): Autobump fiatVersion (#979)
 - chore(dependencies): Autobump korkVersion (#976)
 - chore(dependencies): Autobump korkVersion (#975)
 - chore(dependencies): Autobump fiatVersion (#973)
 - feat(expressions): add evaluateVariables endpoint (#971)
 - chore(dependencies): Autobump korkVersion (#972)
 - chore(dependencies): Autobump korkVersion (#970)
 - chore(dependencies): Autobump korkVersion (#969)
 - feat(mergify): Allow OSS approvers to autosubmit (#968)
 - chore(dependencies): Autobump korkVersion (#967)
 - fix(ldap): Fix an issue where LDAP logins using SameSite cookies (#962)
 - feat(slack): Add slack service (#955)
 - chore(dependencies): Autobump korkVersion (#963)
 - fix(md): fix return type of deliver-config diff (#961)
 - feat(gcb): Ability to invoke existing GCB triggers (#956)
 - chore(dependencies): Autobump korkVersion (#960)
 - chore(dependencies): Autobump korkVersion (#959)
 - fix(md): resource name -> id (#958)
 - chore(dependencies): Autobump korkVersion (#957)
 - fix(swagger): add explicit http methods (#953)
 - chore(dependencies): Autobump fiatVersion (#954)
 - feat(expressions): add ability to query expression capabilities (#952)
 - chore(dependencies): Autobump korkVersion (#951)
 - chore(dependencies): Autobump korkVersion (#950)
 - chore(dependencies): Autobump fiatVersion (#949)
 - chore(dependencies): Autobump korkVersion (#948)
 - Revert "Revert "chore(builds): Remove the temp line in README (#945)" (#946)" (#947)
 - Revert "chore(builds): Remove the temp line in README (#945)" (#946)
 - chore(builds): Remove the temp line in README (#945)
 - Update README.md (#944)
 - fix(md): diff endpoint accepts yaml (#943)
 - fix(pipeline): update invokePipelineConfig for proper return (#885)

#### Igor  - 37fe1ed...127328c
 - fix(concourse): add support for concourse artifacts (#549) (#606)
 - chore(kork): bump kork version (#588)
 - chore(jaxb): explicitly add JAXB to the classpath (#581)
 - chore(dependencies): Reverting Spring Boot 2.2 upgrade (#577)
 - chore(dependencies): Autobump korkVersion (#578)
 - chore(release): update the containers to Alpine 3.11 (#576)
 - feat(managed-delivery): API to retrieve Managed Delivery manifests (#573)
 - chore(java11): Switch the default containers to use Java 11. (#575)
 - chore(dependencies): Autobump fiatVersion (#574)
 - chore(dependencies): Autobump korkVersion (#571)
 - chore(release): Use the alpine containers instead of openjdk (#572)
 - chore(dependencies): Autobump fiatVersion (#570)
 - chore(dependencies): Autobump fiatVersion (#569)
 - feat(Artifactory Trigger): Add helm repo artifacts support to artifacâ€¦ (#556)
 - chore(dependencies): Autobump korkVersion (#568)
 - chore(dependencies): Autobump korkVersion (#565)
 - chore(dependencies): Autobump fiatVersion (#567)
 - chore(dependencies): Upgrade Spring Boot to 2.2.1 (#554)
 - chore(dependencies): Autobump fiatVersion (#566)
 - refactor(*): Move artifactory integration into module (#562)
 - chore(dependencies): Autobump korkVersion (#564)
 - chore(dependencies): Autobump korkVersion (#563)
 - fix(ArtifactoryPollingMonitor): Fix failing validation on lockName (#557)
 - chore(dependencies): Autobump fiatVersion (#561)
 - chore(dependencies): Autobump korkVersion (#560)
 - refactor(artifacts): Use builder to create artifacts (#559)
 - chore(dependencies): Autobump korkVersion (#558)
 - chore(dependencies): Autobump korkVersion (#555)
 - feat(mergify): Allow OSS approvers to autosubmit (#553)
 - chore(dependencies): Autobump korkVersion (#551)
 - chore(dependencies): Autobump korkVersion (#550)
 - chore(dependencies): Autobump korkVersion (#548)
 - chore(dependencies): Autobump korkVersion (#547)
 - chore(dependencies): Autobump korkVersion (#546)
 - feat(gcb): Allow invoking existing GCB triggers (#545)
 - chore(dependencies): Autobump fiatVersion (#544)
 - chore(dependencies): Autobump korkVersion (#543)
 - chore(dependencies): Autobump korkVersion (#542)
 - feat(jenkins): Add retry logic on getting build artifact (#539)
 - chore(dependencies): Autobump fiatVersion (#541)
 - chore(dependencies): Autobump korkVersion (#540)
 - fix(keel): use enabled property rather than base-url (#538)

#### Kayenta  - 5dcec80...dcad431
 - chore(orca): Bump orca version to get kork fix. (#653)
 - chore(dependencies): Reverting Spring Boot 2.2 upgrade (#648)
 - chore(release): update the containers to Alpine 3.11 (#647)
 - chore: catch 403s and throw error when checking for GCS bucket (#645)
 - feat(*): Github Actions for PR builds (#643)
 - feat(Kayenta/Atlas): Add context to atlas query error message (#641)
 - chore(release): Use the alpine containers instead of openjdk (#642)
 - chore(dependencies): Upgrade Spring Boot to 2.2.1 (#637)
 - feat(mergify): Allow OSS approvers to autosubmit (#639)
 - feat(retries): Add exponential backoff to query retries. (#635)
 - chore(docs): Add FAQ and Kayenta standalone docs. (#632)

#### Orca  - b88f62a...c3b6f15
 - fix(aws/cfn): Stage won't try to execute deleted change sets. (#3436) (#3440)
 - chore(kork): bump kork version (#3372)
 - fix(stats): mpt tracking (#3360)
 - refactor(trigger): Clean-up from adding SourceCodeTrigger (#3358)
 - feat(managed-delivery): Add support for other types of code triggers (#3357)
 - feat(queue): use keiko 3.1.0 with eventless metrics (#3349)
 - chore(dependencies): Reverting Spring Boot 2.2 upgrade (#3353)
 - chore(dependencies): Autobump korkVersion (#3354)
 - refactor(managed-delivery): Rename stage for clarity (#3352)
 - chore(release): update the containers to Alpine 3.11 (#3351)
 - feat(managed-delivery): Introduce stage to publish Delivery Config manifests to keel (#3344)
 - Revert "chore(dependencies): Upgrade Spring Boot to 2.2.1 (#3333)" (#3350)
 - feat(aws/cfn): Execute cloudformation ChangeSets (#3326)
 - fix(*): Remove 'javadoc' from GHA build (#3348)
 - feat(*): Github Actions for PR builds (#3347)
 - perf(pipelines): Use new endpoint to fetch pipeline config (#3345)
 - chore(kork): Bump to 7.3.0 (#3346)
 - chore(dependencies): Autobump fiatVersion (#3339)
 - chore(dependencies): Upgrade Spring Boot to 2.2.1 (#3333)
 - chore(release): Use the alpine containers instead of openjdk (#3343)
 - fix(rollback): Ignore disabled server groups in automatic rollbacks (#3341)
 - fix(execution): Resume parent pipeline when a failed stage in a child pipeline restarts (#3317) (#3340)
 - fix(execution): Resume parent pipeline when a failed stage in a child pipeline restarts (#3317)
 - fix(expression): various fixes related to SpEL v4 (#3335)
 - chore(dependencies): Autobump fiatVersion (#3338)
 - chore(dependencies): Autobump korkVersion (#3336)
 - fix(monitored deploy): Give more leniency to scale down operations (#3329)
 - chore(dependencies): Autobump korkVersion (#3334)
 - fix(cfn): include credentials on the task sent to clouddriver (#3323) (#3332)
 - chore(dependencies): Autobump fiatVersion (#3331)
 - chore(dependencies): Autobump korkVersion (#3330)
 - fix(cfn): include credentials on the task sent to clouddriver (#3323)
 - refactor(artifacts): Use builder to create artifacts (#3328)
 - chore(dependencies): Autobump korkVersion (#3327)
 - feat(provider/aws): Add a new stage task, to invoke the Clouddriver Lambda OnDemand caching agent. (#3305)
 - chore(dependencies): Autobump korkVersion (#3325)
 - feat(mergify): Allow OSS approvers to autosubmit (#3324)
 - chore(dependencies): Autobump korkVersion (#3321)
 - fix(spel): make contextParameterProcess.process side-effect free (#3322)
 - fix(logs): make timeout logs less noisy (#3320)
 - fix(executions): Only import executions if application exists in Front50 (#3316)
 - fix(notifications+spel): follow up to #3311 (#3319)
 - chore(cf): correct the Copyright header (#3315)
 - feat(executions): Adding new ADMIN endpoint to import execution (#3310)
 - feat(expressions): Enhance expression evaluation order (#3286)
 - fix(notifications/expressions): properly construct spel context (#3311)
 - feat(stats): Add application details to stage context during application upsert (#3313)
 - fix(bakery): Include cloudProvider in CompleteBakeTask output results (#3312)
 - chore(dependencies): Autobump korkVersion (#3309)
 - feat(cf): add SpEL support for cf manifests (#3299)
 - fix(perf): Unexpanding pipeline without StageContext (#3307)
 - feat(sql): add support for a secondary sql execution repo (#3302)
 - fix(core): Replace Unchecked Cast in TriggerDeserializer (#3285)
 - fix(webhook): Retry on socket timeout for GET requests (#3300)
 - chore(sql): replace SqlInstrumentedExecutionRepository
 - chore(sql): migrate to kork-sql based configuration
 - feat(gcb): Ability to invoke existing GCB triggers (#3288)
 - fix(monitoreddeploy): unset pinMinimumCapacity when scaling to 100% (#3294)
 - chore(dependencies): Autobump korkVersion (#3293)
 - chore(dependencies): Autobump korkVersion (#3292)
 - fix(cloudformation): Support Cloudformation templates as lists (#3270) (#3277)
 - fix(kubernetes): fix patchBody typing depending on strategy type (#3283) (#3287)
 - chore(dependencies): Autobump korkVersion (#3290)
 - fix(gradle): Add spring-boot-autoconfigure to kayenta and mine (#3289)
 - fix(kubernetes): fix patchBody typing depending on strategy type (#3283)
 - fix(notifications): Fix regression from https://github.com/spinnaker/orca/pull/3280 (#3284)
 - chore(dependencies): Autobump fiatVersion (#3282)
 - feat(expressions): add ability to query expression capabilities (#3273)
 - feat(terminal-retry): Retry terminal monitor kato tasks with dynamic back off (#3274)
 - chore(dependencies): Autobump korkVersion (#3281)
 - fix(notifications): Evaluate SpEL expressions in pipeline notifications (#3280)
 - chore(dependencies): Autobump korkVersion (#3279)
 - chore(dependencies): Autobump fiatVersion (#3278)
 - fix(alibabacloud): modify creator to ensure it can get the imageId from last pipeline (#3091)
 - chore(dependencies): Autobump korkVersion (#3275)
 - fix(plugins): Remove unnecessary code (#3271)
 - feat(monitoreddeploy): allow overriding maxAnalysisMinutes and failOnError (#3261)
 - fix(kayenta): Make sure we destroy canary clusters (#3262)
 - fix(expressions): various quality of life improvements for SpEL (#3272)
 - feat(triggers): add action field to git triggers context (#3269)
 - fix(cloudformation): Support Cloudformation templates as lists (#3270)
 - chore(api): Switch to kork-annotations from guava (#3268)
 - feat(script stage): set a context value REPO_URL after starting a script job (#3267)

#### Rosco  - 269dc83...508e253
 - chore(kork): bump kork version
 - chore(dependencies): Reverting Spring Boot 2.2 upgrade (#492)
 - chore(dependencies): Autobump korkVersion (#493)
 - chore(release): update the containers to Alpine 3.11 (#491)
 - chore(jobexecutor): log stdout/err for failed bakes to debug integration test failures (#490)
 - chore(dependencies): Autobump korkVersion (#488)
 - fix(release): switch back to Alpine, but don't use the openjdk container (#487)
 - chore(release): Use buster-slim instead of alpine as the base OS (#485)
 - chore(dependencies): Autobump korkVersion (#484)
 - chore(dependencies): Autobump korkVersion (#483)
 - chore(dependencies): Upgrade Spring Boot to 2.2.1 (#468)
 - chore(dependencies): Autobump korkVersion (#482)
 - chore(dependencies): Autobump korkVersion (#481)
 - chore(dependencies): Autobump korkVersion (#480)
 - refactor(artifacts): Use builder to create artifacts (#479)
 - chore(dependencies): Autobump korkVersion (#478)
 - chore(dependencies): Autobump korkVersion (#475)
 - fix(gce): Remove Trusty GCE image in halconfig/images.yml, add Bionic (#474)
 - fix(gce): Hardcode Trusty GCE image in halconfig/images.yml (#473)
 - fix(gce): Remove recently unpublished 'trusty' base image, add 'bionic' (#470)
 - fix(gce): Hardcode last published version of Trusty base image, add deprecation language, and add Bionic as option (#471)
 - chore(mergify): Allow OSS approvers to auto-submit (#472)
 - chore(dependencies): Autobump korkVersion (#469)
 - feat(provider/huaweicloud): Add Huawei Cloud bakery to build VM image (#466)
 - chore(dependencies): Autobump korkVersion (#467)
 - chore(dependencies): Autobump korkVersion (#465)
 - chore(dependencies): Autobump korkVersion (#464)
 - chore(dependencies): Autobump korkVersion (#463)
 - chore(dependencies): Autobump korkVersion (#462)
 - chore(dependencies): Autobump korkVersion (#461)
 - chore(dependencies): Autobump korkVersion (#460)
 - feat(aws): ability to resolve base ami id by name (#458)
