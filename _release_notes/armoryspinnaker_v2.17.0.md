---
layout: post
title: v2.17.0 Armory Release (OSS Release 1.17.1)
order: -21720191114011639
hidden: false
---

# 11/14/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
This release has a problem where Kayenta does not start properly. This issue is fixed with Armory Spinnaker `2.17.1`

## Highlighted Updates
### Armory

#### Prometheus metrics in Terraformer
Terraformer now supports Prometheus metrics. The scraping interval of these metrics is configurable but defaults to `30s`.  Finally, the metrics endpoint is exposed at `/metrics`.

#### Horizontal Scaling of Terraformer

Terraformer jobs are now persisted to the data store before being submitted to the queue. This new behavior allows Terraformer to be horizontally scaled.

#### Deck Plugin Support - Alpha
Deck is now able to consume Plugins, enabling UI creation for custom stages.

###  Spinnaker Community Contributions

#### Git Repo Artifact Support
In 1.17 we’ve added support for representing Git repositories as artifacts. The intent for this type of artifact is to enable us to build features around tools that work with a collection of files rather than a single file, like the Deploy (Manifest) stage. Currently, this artifact type is only supported by the Bake (Manifest) stage when using the Kustomize rendering engine but other areas are being explored to determine where this might make sense. Halyard support for configuring this artifact type is forthcoming. See [the proposal](https://github.com/spinnaker/spinnaker/issues/4824) for more details.

#### Improved Kustomize Support
Support for Kustomize has been improved to utilize the Git Repo artifact type which should make it more broadly useable. The previous implementation was limited to a small subset of artifact types, like GitHub File. This new artifact support will enable use by teams using any type of Git hosting service including (but not limited to) GitHub, Bitbucket and GitLab. Be aware, if you’ve used Kustomize in a previous release, configuration of the stage has changed and will need to be updated. Instructions for using Kustomize in 1.17 can be found [here](https://www.spinnaker.io/guides/user/kubernetes-v2/kustomize-manifests/).

#### Kubernetes Deployment Rolling-Restart Support
After years of [demand](https://github.com/kubernetes/kubernetes/issues/13488) from the Kubernetes community, a command for initiating a rolling restart of Deployment pods landed in kubectl 1.15 with [kubectl rollout restart](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#-em-restart-em-). Spinnaker now provides first-class support for initiating rolling restarts of Deployment pods alongside Deck’s other ad-hoc infrastructure actions.

#### GCE Regional Server Group Guest Accelerator Support
Google Compute Engine supports adding additional GPUs to VMs, and there is now first-class support in Spinnaker for configuring additional hardware for the instances of a regional server group with multiple zones explicitly selected.

#### Fixes to GCE Red/Black Deployments
In a GCE red/black, we previously pinned the source server group’s minimum capacity to its desired capacity before executing the rollout. As of 1.17, we will bring the GCE red/black implementation to parity with the AWS implementation and no longer adjust the source server group’s minimum capacity. The potential drawback to this is that during the period when both the source and target server groups are taking traffic, an autoscaler may scale down the source server group as it will only be taking 50% of the traffic: in the case a rollback is necessary, it will need to scale back up. However, as Netflix has experienced, the potential downsides of pinning the source server group are much worse, as there are many unpredictable ways to get into a state where the server group is never unpinned (see Netflix post-mortem [here](https://twitter.com/FakeRyanGosling/status/1106714429247221761)).

#### Improved isolation between Kubernetes V2 accounts
Clouddriver will start up significantly faster for users with many Kubernetes V2 accounts as of Spinnaker 1.17.  In addition, an error communicating with one account’s cluster will not affect the functionality of other accounts; users will still be able to see resources for and deploy to unaffected accounts.  Prior to this release, an error communicating with one account’s cluster would degrade functionality for other Kubernetes V2 accounts.

#### More flexible authorization model
Fiat now accepts permissions coming from different sources. The legacy permissions for applications, for example, are stored inside the application itself in front50. However, it is possible now to provide those permissions from multiple sources (the legacy being one of those sources), and to decide how the permissions coming from those different sources are to be resolved.

The default resolution strategy of the permission sources just reads from the legacy source. To override it for applications for example, the user must provide a value other than `default` to the parameter `auth.permissions.provider.application`. Currently, the only possible values are `default`, which only reads from the legacy source, or `aggregate`, which reads from all available sources, and adds their permissions.

The currently available sources are the legacy sources, which are enabled by default, but could be disabled by setting the following parameters to false:
* `auth.permissions.source.account.resource.enabled`
* `auth.permissions.source.application.front50.enabled`
* `auth.permissions.source.build-service.resource.enabled`

Applications also have a new source (disabled by default), which applies permissions to any application whose name starts with a given prefix. Below is a sample configuration of this permission source:

```yaml
auth.permissions.source.application.prefix:
  enabled: true
  prefixes:
    - prefix: "fooapp"
      permissions:
        READ:
          - "foo-readers-role@mycompany.org"
    - prefix: "bar*"
      permissions:
        CREATE:
          - "bar-ops-team@mycompany.org"
```

This will apply the READ restriction only on app `fooapp`, and the CREATE restriction on all apps starting with bar. If multiple prefixes match a given app, they are resolved using the resolution strategy provided in `auth.permissions.source.application.prefix.resolutionStrategy`, which could either be `AGGREGATE`, meaning the permissions will be aggregated from all matching prefixes, or `MOST_SPECIFIC`, meaning that only the permissions from the most-specific prefix will be applied.

#### Restrict application creation permissions:
Before this version, there was no way to control who can create an application. In 1.17, users can restrict application creation by setting `fiat.restrictApplicationCreation` to `true`, and then providing `CREATE` permissions using a permission source (see above). Note that `CREATE` permissions provided by the front50 source of applications will be ignored. So currently, the way to provide `CREATE` permissions is using the prefix source explained above.


<br>

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.17.0-rc125
timestamp: "2019-11-13 00:46:47"
services:
  clouddriver:
    version: 6.4.0-daa86fe-e192026-rc8
  deck:
    version: 2.13.0-89149ff-17d3ea2-rc10
  dinghy:
    version: 0.0.4-defad9b-rc97
  echo:
    version: 2.9.0-4f2b8ee-acca50a-rc8
  fiat:
    version: 1.8.0-9f554ae-9dcab2c-rc6
  front50:
    version: 0.20.0-e1a3aa0-9415a44-rc5
  gate:
    version: 1.13.0-6c154ae-a453541-rc7
  igor:
    version: 1.7.0-bbde849-37fe1ed-rc6
  kayenta:
    version: 0.12.0-ec111bd-5dcec80-rc6
  monitoring-daemon:
    version: 0.16.0-59cbbec-edge2
  monitoring-third-party:
    version: 0.16.0-59cbbec-edge2
  orca:
    version: 2.11.0-ccfcee7-ed38c00-rc8
  rosco:
    version: 0.15.0-f8aa480-2f92d63-rc7
  terraformer:
    version: 0.0.2-e11852d-rc3
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - defad9b
No Changes

#### Terraformer&trade; - e2d3b75...e11852d
 - feat(metrics): add prometheus metrics (#95)
 - fix(scaling): horizontal scaling (#93)

#### Armory Clouddriver  - 9db8e9d...daa86fe
No Changes

#### Armory Deck  - cbab764...89149ff
 - refactor(carbonpage): remove carbonpage components (#535)
 - feat(plugins): add support for plugins (#533)

#### Armory Echo  - b8d5392...4f2b8ee
No Changes

#### Armory Fiat  - 84d2119...9f554ae
No Changes

#### Armory Front50  - 195043d...e1a3aa0
No Changes

#### Armory Gate  - 6ce586c...6c154ae
No Changes

#### Armory Igor  - 3a56ef6...bbde849
No Changes

#### Armory Kayenta  - f295c50...ec111bd
No Changes

#### Armory Orca  - 4517040...ccfcee7
No Changes

#### Armory Rosco  - 5936b02...f8aa480
No Changes

### Armory Open Core
#### Dinghy (Open Core) - 960a6240
No Changes


###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release:

[Spinnaker 1.17.1](https://www.spinnaker.io/community/releases/versions/1-17-1-changelog#individual-service-changes)

#### Clouddriver  - bd1a453...e192026
 - fix(aws): support for cross-application CLBs with the sql backend (#4141) (#4142)
 - fix(kubernetes): Fix mis-spelled API group (#4135) (#4136)
 - fix(kubernetes): surface dockerRegistries to credentials endpoint (#4134)
 - refactor(kubernetes): Delete unused code (#4133)
 - feat(gce): support autoscaler scale-down controls (#4129)
 - fix(cf): reduce unnecessary calls to foundation to improve performance. (#4130)
 - chore(dependencies): Autobump fiatVersion (#4131)
 - feat(kubernetes): permit multiple ReplicaSets to be deployed with a single rollout strategy config (#4126)
 - fix(kubernetes): Fix all agents caching cluster-scoped resources (#4128)
 - chore(dependencies): Autobump korkVersion (#4125)
 - feat(cfn): delete CFN changeset if empty upon request (#4101)
 - fix(google): don't leave orphaned applications in the cache (#4123)
 - fix(cloudconfig): Log errors and continue (#4118)
 - chore(dependencies): upgrade kork (#4124)
 - chore(dependencies): fiatVersion 1.7.2 (#4121)
 - refactor(google): Update to latest google credentials style. (#4119)
 - fix(fiat-api): fiatVersion 1.7.1 (#4120)
 - chore(dependencies): fiatVersion 1.7.0 (#4117)
 - chore(dependencies): Autobump korkVersion (#4116)
 - chore(mergify): add 'auto merged' label (#4115)
 - chore(dependencies): Autobump korkVersion (#4114)
 - chore(dependencies): Autobump korkVersion (#4113)
 - feat(titus) : Add support to set signedAddressAllocation for Titus Jobs (#4094)
 - chore(dependencies): Autobump korkVersion (#4112)
 - perf(kubernetes): Fix all agents handling on-demand requests (#4110)
 - chore(dependencies): Autobump korkVersion (#4111)
 - refactor(google): use Optional.ofNullable() instead of if/else (#4093)
 - chore(dependencies): Autobump korkVersion (#4103)
 - chore(github): Add mergify config (#4109)
 - chore(auto_merge): remove it (#4107)
 - refactor(core): Move RequestQueue to core (#4104)
 - refactor(kubernetes): remove unnecessary casts to credentials classes
 - fix(titus): Adjust retries on upsert scaling policy operation (#4090)
 - fix(kubernetes): add param to KubernetesAtomicOperationDescription to prevent having to cast credentials
 - feat(kubernetes): support rolling restart operation for deployments
 - fix(runJob): fix output on multi container (#4102) (#4105)
 - fix(runJob): fix output on multi container (#4102)
 - feat(aws): upgrade awscli (#4088)
 - chore(dependencies): Autobump korkVersion (#4098)
 - fix(kubernetes/v1): Fix NPE in autoscaler caching (#4096)
 - fix(*): Change event & saga root exceptions to nonretryable (#4095)
 - chore(github): Move automerge action to correct directory
 - feat(google): permit guest accelerator config for regional server groups with zones explicitly selected
 - feat(provider/google): test fix
 - feat(provider/google): test for GoogleLoadBalancerProvider, minor clean up
 - feat(provider/google): fixed issues + more test cases
 - feat(provider/google): added first test
 - feat(provider/google): fixed existing tests
 - feat(provider/google): improved sessionAffinity handling logic
 - feat(provider/google): explicitly fail if a request tries to change session affinity while there are connected instances
 - feat(provider/google): added Session Affinity value to the view
 - feat(provider/google): return Session Affinity value
 - feat(provider/google): Set Session Affinity for new target pools
 - fix(config): adding some missing instances block device config (#4087)
 - feat(dynamicRetry): Pull comma-delimited list of non-retryable exceptions from dynamic config store (#4089)
 - chore(build): Update and rename .github/workflows/main.yml to automerge.yml (#4085)
 - feat(secrets/gcs): Support for decrypting spinnaker secrets in GCS (#4063)
 - feat(provider/aws): Fix lifecycle hooks racing condition (#4082)
 - fix(saga-npe): Set sagaContext on DeployDescription object where atomic operations operate on TitusDeployHandler (#4084)
 - fix(titus): Scorched earth removing Lombok for Jackson compat (#4083)
 - fix(titus): Serde fix for SagaContext (#4081)
 - feat(retry): Resilience4j Spring Boot2 implementation in clouddriver-sql (#4071)
 - feat(provider/aws): Add roleARN to cloudformation deployments (#4080)
 - fix(kubernetes): Fix matching of artifacts in deploy/patch stages (#4078) (#4079)
 - fix(kubernetes): Fix matching of artifacts in deploy/patch stages (#4078)
 - fix(travis): Fix default gradle command on the release build (#4076)
 - fix(travis): Giving max-workers=3 a shot on the release build (#4075)
 - fix(travis): Giving max-workers=2 a shot on the release build (#4074)
 - fix(travis): Removing 'javadoc' and 'publishBuildDeb' from the release build (#4073)
 - fix(travis): Attempt to remove the explicit 'assemble' from 'installViaTravis' (#4072)
 - fix(titus): Fix SagaContext wiring in DeployHandler cases (#4070)
 - fix(travis): Skip 'check' when doing release builds (#4069)
 - fix(cf): when scaling cf disabled SG we should use max capacity (#4067) (#4068)
 - fix(cf): when scaling cf disabled SG we should use max capacity (#4067)
 - fix(dockerfile): use deterministic version for kubectl (#4064) (#4065)
 - fix(dockerfile): use deterministic version for kubectl (#4064)
 - feat(titus): Mimicker property testing (#4014)
 - fix(saga): Update sql task with saga IDs (#4062)
 - fix(kubernetes): Escape special characters for label names in JSON patches (#4893) (#4030)
 - chore(dependencies): Autobump korkVersion (#4045)
 - feat(auth): Optionally skip authentication for image tagging (#3795)
 - refactor(cats-core): Remove Cache.StoreType (#4050)
 - feat(artifacts/gitRepo): support SSH auth (#4052)
 - chore(kubernetes): Bump fabric8 library to 4.6.0 (#4060)
 - fix(kotlin): spring config classes shouldn't use constructors (#4054) (#4059)
 - chore(kubernetes): Update API group of NetworkPolicy and PodSecurityPolicy (#4058)
 - fix(kubernetes): Fix missing API versions (#4057)
 - fix(titus): Fixing titus instance id search (#4053)
 - fix(kubernetes): Add networking.k8s.io/v1beta1 ingress versions (#4056)
 - fix(kubernetes): add support 'apps/v1' for deployments/replicaset (#4055)
 - fix(kotlin): spring config classes shouldn't use constructors (#4054)
 - fix(titus): Do not automatically assume all Titus exceptions are retryable (#4044)
 - feat(artifacts/gitRepo): add support for git repo (#4049)
 - fix(gce): Fix an NPE in AbstractGoogleServerGroupCachingAgent (#4051)
 - change error response massage from GitHub to GitLab (#4027)
 - chore(build): Delete circleci config (#4040)
 - feat(sql): Conditionally allow MySQL Connector to be excluded from the build (#4043)
 - fix(aws/loadbalancing): don't mark an instance out of service until draining completes. (#4042)
 - fix(kubernetes): Fix credentials endpoint with unreachable cluster (#4041)
 - fix(saga): Fix off-by-one error in sagaflow seeker (#4039)
 - Add more details in call reason header for Titus (#4031)
 - chore(dependencies): Autobump korkVersion (#4038)
 - fix(sql): Remove accidental exception throw (#4037)
 - feat(sagas): Add resume task endpoint (#4032)
 - perf(kubernetes): Reduce namespace lookups in a loop (#4036)
 - fix(saga): Unwrap exception coming from a saga action (#4035)
 - chore(dependencies): Autobump korkVersion (#4034)
 - refactor(kubernetes): Look up CRD details on-demand (#4033)
 - feat(saga): Add support for retryable tasks within OrchestrationProcessor (#4025)
 - refactor(kubernetes): Reduce API surface of KubernetesKindProperties (#4029)
 - refactor(kubernetes): Move V1 code to clouddriver-kubernetes-v1 (#4028)
 - feat(saga): Add support for re-entrance of sagas (#4019)
 - refactor(kubernetes): Move V2-only code to clouddriver-kubernetes-v2 (#4024)
 - refactor(kubernetes): Fix some unsafe casts in credential creation (#4023)
 - refactor(kubernetes): Clean up ArtifactReplacer (#4020)
 - fix(kubernetes): Fix deserialization of account property (#4022)
 - fix(aws): Alter AllowLaunchDescription to not overload account (#4021)
 - chore(dependencies): Autobump korkVersion (#4018)
 - refactor(*): Remove credentialAccount from all AWS-derived cloud providers (#4017)
 - perf(kubernetes): Fix startup when a cluster is unreachable (#4016)
 - fix(titus): Additional serialization issues from SQL backend (#4015)
 - refactor(gce): Convert GoogleRegionalServerGroupCachingAgent to java (#4007)
 - refactor(kubernetes): Remove extraneous null checks (#4013)
 - chore(dependencies): Autobump korkVersion (#4012)
 - fix(kubernetes): Fix handling of kinds not available on the server (#4010)
 - chore(dependencies): Autobump korkVersion (#4011)
 - perf(kubernetes): Defer loading namespaces until first use (#4008)
 - chore(dependencies): Autobump korkVersion (#4006)
 - feat(sql): Support event storage in SQL backend (#4004)
 - perf(kubernetes): Defer checking valid kinds until after startup (#4005)
 - refactor(gce): convert GoogleZonalServerGroupCachingAgent to Java (#4002)
 - chore(dependencies): Autobump korkVersion (#4003)
 - refactor(titus): Allow serde of operation descriptions (#4001)

#### Deck  - 96332ba...17d3ea2
 - fix(artifacts): enable inline editing of base64 artifacts (#7612) (#7614)
 - fix(kubernetes): fix patchBody input in Patch (Manifest) stage (#7600) (#7615)
 - fix(runJob): fix artifact output creation (#7579) (#7580)
 - feat(google): add gce scale-down controls (#7570)
 - feat(kubernetes): permit multiple ReplicaSets to be deployed with a single rollout strategy config (#7574)
 - fix(runJob): fix artifact output creation (#7579)
 - feat(git/repo): add git/repo artifact support in kustomize bake manifest (#7572)
 - chore(titus): Bump version to 0.0.117
 - chore(amazon): Bump version to 0.0.221
 - chore(docker): Bump version to 0.0.49
 - fix(rosco): Re-evaluate roscoSelector on stage updates (#7577)
 - feat(rosco): Allow optional roscoDetailUrl for roscoMode bakes (#7575)
 - chore(amazon): Bump version to 0.0.220
 - chore(docker): Bump version to 0.0.48
 - chore(core): Bump version to 0.0.427
 - fix(core/pipeline): fully re-render list of trigger configs after a delete (#7571)
 - fix(core/pipeline): make revision dropdown usable, layout tweaks (#7569)
 - feat(rosco): Allow roscoMode per stage/execution (#7564)
 - feat(provider/aws): Functions (listing and searching) (#7568)
 - Revert "feat(provider/aws): Functions (listing and searching) (#7536)" (#7567)
 - chore(deps): bump @spinnaker/kayenta from 0.0.86 to 0.0.87 (#7566)
 - fix(kubernetes): disable project cluster filtration by stack/detail (#7562)
 - feat(provider/aws): Functions (listing and searching) (#7536)
 - fix(core/pipeline): make UX less bad when a pipeline stage never happened (#7563)
 - fix(triggers): do not allow manual definition of docker image in trigger (#7561)
 - chore(titus): Bump version to 0.0.116
 - chore(amazon): Bump version to 0.0.219
 - chore(core): Bump version to 0.0.426
 - fix(core/pipeline): Force rebake not displayed for templated pipelines (#7558)
 - chore(core/notification): remove remainder of hipchat notifications (#7557)
 - fix(config): Fix typings for SpinnakerSettings (#7556)
 - fix(core/config): Fix typing for githubStatus notification type
 - fix(core/instance): use fragment on non-UP health code path (#7555)
 - chore(titus): remove unused autoScalingEnabled toggle from settings interface (#7554)
 - feat(provider/aws): Add capabilities in cloudformation deploy stage (#7544)
 - chore(settings): Remove unused feature toggle: 'jobs' (#7553)
 - Bump package core to 0.0.425 and amazon to 0.0.218 (#7551)
 - chore(mergify): add 'auto merged' label (#7552)
 - chore(settings): remove defaultCategory from settings.js (#7550)
 - fix: credentails typo (#7541)
 - feat(provider/aws): Show load balancer warning based on settings (#7542)
 - chore(core/presentation): update icon font for managed delivery (#7548)
 - feat(core): alphabetize applications in project config dropdown (#7549)
 - fix(awslb): Preventing edits against orphaned load balancers (#7547)
 - feat(core/jenkins): Refer to Jenkins controller instead of master (#7531)
 - chore(github): Add mergify config
 - feat(core/presentation): add revalidate api to IFormInputValidation - Make all fields on IFormInputValidation non-optional
 - feat(core/presentation): Add useDebouncedValue react hook renamed hooks files to '.hook.ts' and exported all from an index.ts
 - refactor(aws): move Resize item in the AmazonServerGroupAction dropdown into separate component
 - feat(kubernetes): support rolling restart operation for deployments (#7538)
 - fix(monitored deploy): fix the rollback config to match what orca expects (#7532)
 - chore(titus): Bump version to 0.0.115
 - chore(amazon): Bump version to 0.0.217
 - chore(core): Bump version to 0.0.424
 - fix(artifact/bitbucket): Bitbucket Use Default Artifact (#7523) (#7535)
 - fix(google): replace missing character in functional test (#7534)
 - fix(artifact/bitbucket): Bitbucket Use Default Artifact (#7523)
 - feat(ui): Show health check url beside target group (#7520)
 - chore(titus): Bump version to 0.0.114
 - chore(docker): Bump version to 0.0.47
 - chore(core): Bump version to 0.0.423
 - fix(docker,titus): re-align digest field on image + tag selector (#7526)
 - fix(core/presentation): Fix null reference in FieldLayout components
 - feat(google): permit guest accelerator config for regional server groups with zones explicitly selected (#7528)
 - feat(google): Added UI to specify Session Affinity for Network LB
 - fix(google): do not display zones for regional mig unless selected explicitly (#7527)
 - chore(core): Bump version to 0.0.422
 - fix(core/presentation): Fix FormikExpressionInput initial state
 - fix(kubernetes): add missing `app` config param for patch manifest stages (#7521) (#7522)
 - fix(kubernetes): add missing `app` config param for patch manifest stages (#7521)
 - fix(bakeManifest/helm): rawOverrides option (#7514) (#7517)
 - chore(amazon): Bump version to 0.0.216
 - chore(core): Bump version to 0.0.421
 - fix(core/presentation): Do not use a regexp with /test/s because it's not supported in firefox (#7518)
 - feat(provider/aws): Add roleARN to the deploy cloudformation stage (#7492)
 - chore(amazon): Bump version to 0.0.215
 - chore(core): Bump version to 0.0.420
 - fix(core/presentation): fix null reference in ReactSelectInput (#7515)
 - feat(core/presentation): allow markdown in ValidationMessage
 - fix(core/presentation): Make all DOMPurify'd links open in a new window (#7511)
 - fix(ui): Type field missing for CLB detail view (#7504)
 - fix(bakeManifest/helm): rawOverrides option (#7514)
 - fix(deck): Show fail fast status code only if they are not pre-configured (#7512)
 - fix(amazon/loadBalancer): Disable CLB deletion if instances exist (#7509)
 - fix(core/pipeline): fix Artifactory and Nexus trigger NPE These were throwing upon initial mount because 'error' wasn't defined.
 - refactor: Migrate user code to new validation message API
 - refactor(core/presentation): Remove validationStatus from forms apis
 - refactor(core/presentation): Split forms interfaces into three files: - /forms/fields/interface.ts - /forms/inputs/interface.ts - /forms/layouts/interface.ts
 - feat(core/utils): extract firstDefined utility function
 - refactor(core/validation): Move ValidationMessage from core/validation to core/presentation/forms/validation
 - feat(core/presentation): Extract useValidationData hook
 - fix(core/presentation): Handle empty message in validation message functions, e.g., `errorMessage(undefined)`
 - chore(package): bump spel2js to 0.2.6
 - fix(core): fix jumping cursor in trigger inputs (#7486)
 - fix(core/pipeline): Pass Trigger validateFn to the trigger's Formik
 - fix(core/pipeline): KLUDGE: use react 'key' to reinitialize formik when pipeline reverted (#7500)
 - chore(core): Bump version to 0.0.419
 - fix(ui): Add icon when target group registration in progress (#7502)
 - refactor(application): reactify delete application section (#7501)
 - chore(core): Bump version to 0.0.418
 - fix(core/pipeline): KLUDGE: use react 'key' to reinitialize formik when pipeline reverted
 - chore(titus): Bump version to 0.0.113
 - chore(amazon): Bump version to 0.0.214
 - chore(docker): Bump version to 0.0.46
 - chore(core): Bump version to 0.0.417
 - fix(core/pipeline): When a trigger is updated, replace the entire object (#7496)
 - feat(core): filter out providers that don't support creating security groups (#7370)
 - fix(core): Separate how config and plans are updated, add tests (#7491) (#7494)
 - fix(core): Separate how config and plans are updated, add tests (#7491)
 - chore(core): Bump version to 0.0.416 (#7493)
 - feat(amazon/serverGroup): add AmazonMQ CloudWatch namespace (#7489)
 - feat(core/presentation): Add helper functions for generating categorized validation messages (#7488)
 - fix(pipeline): triggers were not reverting in the ui (#7485) (#7490)
 - fix(pipeline): triggers were not reverting in the ui (#7485)
 - refactor(core/help): Migrate HelpContext to react hooks style (#7487)
 - feat(core/presentation): Migrate ValidationMessage to new CSS styles (#7481)
 - fix(triggers): fix a few minor issues with manual execution triggers (#7484)
 - fix(artifacts/bitbucket): Update the help key to the correct reference to bitbucket (#7475) (#7482)
 - fix(monitored deploy): properly initialize defaults (#7473)
 - fix(titus/pipeline): use proper git ssh URL for docker bakes (#7480)
 - chore(package): update @spinnaker/styleguide@1.0.14 (#7479)
 - Revert "chore(package): update to "@spinnaker/styleguide": "^1.0.13" (#7477)" This color scheme change was too jarring. Reverting for now and applying the new colors *only to form validation* for now
 - chore(package): update to "@spinnaker/styleguide": "^1.0.13" (#7477)
 - feat(core/presentation): Put margin between StandardFieldLayout's input and validation (#7476)
 - refactor(pipeline): Reactify the copy stage modal (#7453)
 - feat(precondition): add custom message to precondition (#7448)
 - fix(artifacts/bitbucket): Update the help key to the correct reference to bitbucket (#7475)
 - fix(core/serverGroup): Correct 'simple scaling' heuristic (#7385)
 - fix(amazon/pipeline): sort list of available bake regions (#7472)
 - fix(core/utils): Support traversing keys which contain dots in them using array notation (#7471)
 - feat(core/presentation): Begin adding support for error categories in validation API (#7467)
 - chore(amazon): Bump version to 0.0.213
 - chore(core): Bump version to 0.0.415
 - fix(bakeManifest): fix bake manifest UI rendering (#7463) (#7465)
 - fix(artifacts/bitbucket): Allow updates to bitbucket default artifact text input (#7469)
 - feat(monitored deploy): add basic monitored deploy UI (#7426)
 - fix(artifacts/bitbucket): Allow updates to bitbucket default artifact text input Allows updates to the artifact text input even when the regex pattern does not match the bitbucket cloud regex Create regex pattern for bitbucket server to match input against Fixes https://github.com/spinnaker/spinnaker/issues/4958
 - chore(core): Bump version to 0.0.414
 - fix(core/task): properly cleanup TaskMonitor polling, fix digest thrashing (#7458)
 - feat(displayName): Adding display name property for the bakery baseOS options (#7464)
 - fix(bakeManifest): fix bake manifest UI rendering (#7463)
 - chore(deps): bump macaddress from 0.2.8 to 0.2.9
 - chore(deps): bump no-case from 2.3.1 to 2.3.2
 - chore(deps): bump diff from 3.2.0 to 3.5.0
 - chore(deps): bump sshpk from 1.13.0 to 1.16.1
 - chore(deps): bump js-yaml from 3.12.1 to 3.13.1
 - chore(deps): [security] bump mixin-deep from 1.3.1 to 1.3.2
 - chore(deps): [security] bump eslint-utils from 1.3.1 to 1.4.2
 - fix(core/infrastructure): Fix deep links with filters (#7459)
 - fix(help text): update webhook help text (#7456)
 - fix(kubernetes): Fix merge strategy field (#7455) (#7457)
 - refactor(core/validation): move FormValidator classes to separate files (#7460)
 - fix(kubernetes): Fix merge strategy field (#7455)
 - refactor(kubernetes): remove unnecessary angular and non-typescript deps (#7454)
 - feat(core/utils): Add `traverseObject` which deeply walks object properties (#7452)
 - refactor(kubernetes): isolate v1 code (#7451)
 - refactor(pipeline): reactify pipeline config actions dropdown (#7447)
 - fix(bake/kustomize): fix name validation (#7450)
 - fix(core/pipeline): Revision history is vertically challenged in Safari (#7449)
 - feat(core/utils): Add 'api' to window.spinnaker object for interactive debugging (#7439)
 - fix(pipeline): unset `locked` instead of `lock` when unlocking pipeline (#7445) (#7446)
 - fix(pipeline): unset `locked` instead of `lock` when unlocking pipeline (#7445)
 - fix(core/pipeline): "Depends On" doesn't always update when reverting (#7441) (#7443)
 - fix(core/pipeline): "Depends On" doesn't always update when reverting (#7441)
 - fix(core/pipeline): Fix revert button for non-templated pipelines (#7440) (#7442)
 - fix(core/pipeline): Fix revert button for non-templated pipelines (#7440)
 - feat(core/presentation): Migrate form validation API to class-based API
 - fix(core/presentation): In min/max validators, validate that the value is a number
 - chore(core): Bump version to 0.0.413 (#7438)
 - fix(core/pipeline): Fixes UX of saving non-templated pipelines (#7437)
 - feat(core/forms): Remove all async support from the spinnaker validation apis (#7435)
 - fix(pipeline): Fix NPE in stage requisiteStageRefIds (#7417)
 - fix(kubernetes): remove former 24-char limit on services names (#7389)
 - fix(core/pipeline): Fix execution details chevron for grouped stages (#7421)
 - feat(aws): Add copy-to-clipboard button to copy instance id (#7388)
 - fix(core/pipeline): Don't break templated pipelines when updating config (#7428) (#7430)
 - fix(core/pipeline): Fix revert button regression for templated pipelines (#7427) (#7429)
 - chore(core): Bump version to 0.0.412
 - fix(tasks): (re)-enable durations on canceled tasks (#7433)
 - fix(core/pipeline): migrate more manual execution field layouts
 - fix(core/forms): MapEditorInput: Add validation for empty keys and empty values. Remove `errors` prop in favor of using `validation.validationMessage` which is passed from FormField/FormikFormField
 - fix(core/pipeline): Don't break templated pipelines when updating config (#7428)
 - fix(core/pipeline): Fix revert button regression for templated pipelines (#7427)
 - feat(core): rerun child pipelines with artifacts (#7422)
 - Bump package core to 0.0.411 and titus to 0.0.112 (#7423)
 - feat(core/pipeline): Add timestamp for failed executions (#7419)
 - feat(core/pipeline): Make custom artifacts more readable (#7418)
 - fix(core/pipeline): Add space before Source-link for failed executions (#7420)
 - chore(titus): Deprecating pipeline migration strategy (#7414)
 - fix(core/pipeline): standardize manual execution field layouts (#7413)
 - fix(artifacts): Support custom artifacts with custom type (#7415)
 - chore(core): Bump version to 0.0.410 (#7412)
 - fix(core): Sanitize confirmation modal body (#7407)
 - feat(core/managed): add Managed Resources section to app config, allow opting out (#7409)
 - chore(titus): Bump version to 0.0.111
 - chore(amazon): Bump version to 0.0.212
 - chore(core): Bump version to 0.0.409
 - fix(amazon): Fix compatibility when cloudProviders missing (#7410)
 - fix(core): fix manual execution (#7408)
 - chore(deck): bump kayenta version (#7402) (#7404)
 - feat(pipeline): Custom alert for start manual execution dialog (#7406)
 - fix(help): reflect reality in rollingredblack help text bubble-things (#7405)
 - chore(deck): bump kayenta version (#7402)
 - feat(titus): direct link to stdout and stderr ( based on Netflix internal JIRA SSPLAT-653 ) (#7400)
 - Revert "fix(nexus): nexus trigger selectable in UI (#7381) (#7398)"
 - fix(nexus): nexus trigger selectable in UI (#7381) (#7398)
 - fix(nexus): nexus trigger selectable in UI (#7381)
 - chore(core): Bump version to 0.0.408 (#7397)
 - fix(core): Exporting DiffView component (#7396)
 - chore(titus): Bump version to 0.0.110
 - chore(amazon): Bump version to 0.0.211
 - chore(core): Bump version to 0.0.407
 - feat(pager): Looking up multiple apps by name to page (#7387)
 - fix(core): ensure filter tag removal removes tags from filter (#7212)
 - refactor(core): reactify the show pipeline history modal (#7382)
 - refactor(titus): Adding load balancer incompatibility (#7386)
 - fix(google): add default gce instance type disk constants to front end (#7383)
 - fix(apache): configure apache to log to stdout/stderr (#7375)
 - fix(core/pipeline): exclude correlation IDs (and more) when re-running (#7374)
 - chore(amazon): Bump version to 0.0.210 (#7380)
 - refactor(amazon): choices prop is actually optional (#7379)
 - Bump package core to 0.0.406 and amazon to 0.0.209 (#7378)
 - fix(triggers): Protecting from undefined triggers (#7377)
 - feat(core/managed): Add resource dropdown with links to history + source JSON (#7376)

#### Echo  - 55a1580...acca50a
 - chore(dependencies): Autobump fiatVersion (#692)
 - chore(dependencies): Autobump korkVersion (#690)
 - chore(dependencies): Autobump korkVersion (#689)
 - chore(dependencies): fiatVersion 1.7.2 (#688)
 - fix(swabbie): Update email template (#687)
 - fix(fiat-api): fiatVersion 1.7.1 (#686)
 - chore(dependencies): fiatVersion 1.7.0 (#685)
 - chore(dependencies): Autobump korkVersion (#684)
 - chore(readme): add mergify status (#683)
 - chore(mergify): make mergify add a label when a PR is automatically merged (#682)
 - chore(dependencies): Autobump korkVersion (#681)
 - chore(dependencies): Autobump korkVersion (#680)
 - chore(dependencies): Autobump korkVersion (#679)
 - chore(dependencies): Autobump korkVersion (#677)
 - chore(github): Add mergify config (#678)
 - chore(dependencies): Autobump korkVersion (#676)
 - Revert "chore(github): test out mergify config (#673)" (#675)
 - chore(readme): update readme and test mergify (#674)
 - chore(github): test out mergify config (#673)
 - - remove extra s (#672)
 - fix(swabbie): Update swabbie email template (#671)
 - feat(secrets/gcs): Support for decrypting spinnaker secrets in GCS (#667)
 - feat(slack): Make slack base url configurable (#633)
 - fix(triggers): add missing docker properties to trigger model (#669) (#670)
 - fix(triggers): add missing docker properties to trigger model (#669)
 - feat(tasks): allow notifications for tasks (#668)
 - chore(dependencies): Autobump korkVersion (#666)
 - fix(notifications): Don't send failure notifications for cancelled pipelines and stages (#663)
 - fix(triggers): Remove confusing/unnecessary error log (#664)
 - chore(dependencies): Autobump korkVersion (#658)
 - feat(stats): Adds salt to application ID hash (#662)
 - fix(stats): Parse Event objects into structured POJOs for Telemetry events (#660)
 - fix(build): whitelist build package to avoid being ignored by gcloud cloudbuild (#657) (#661)
 - fix(build): whitelist build package to avoid being ignored by gcloud cloudbuild (#657)
 - feat(sql): Conditionally allow MySQL Connector to be excluded from the build (#656)
 - feat(stats): Adds circuit breaker logic via resilience4j
 - chore(dependencies): Autobump korkVersion (#655)
 - Revert "fix(nexus): get artifacts from nexus events (#643) (#652)" (#653)
 - fix(nexus): get artifacts from nexus events (#643) (#652)
 - fix(nexus): get artifacts from nexus events (#643)
 - fix(stats): Remove synthetic stages from Stages list
 - feat(stats): Add stage's CloudProvider
 - fix(health): Remove old Spring 1.x health endpoint config to remove an error printed during startup.
 - feat(telemetry): Use kork-proto as source of proto library, remove some GRPC cruft.
 - feat(telemetry): adds listener for telemetry metrics
 - chore(dependencies): Autobump korkVersion (#649)
 - test(google): Enable the GoogleChatNotificationAgent test (#650)
 - fix(notification/slack): fix missing logger (#644) (#648)
 - chore(dependencies): Autobump korkVersion (#647)
 - chore(dependencies): Autobump korkVersion (#646)
 - chore(dependencies): export fiat api in echo-bom (#645)
 - fix(notification/slack): fix missing logger (#644)
 - chore(dependencies): Autobump korkVersion (#642)
 - chore(dependencies): Autobump korkVersion (#641)

#### Fiat  - e92cfbc...9dcab2c
 - fix(authorization): canCreate should not return void (#502) (#504)
 - fix(build): fix autobump config (#497)
 - fix(build): update build.gradle for autobump (#496)
 - feat(build): enable autobump PRs for fiat-api consumers (#495)
 - chore(dependencies): Autobump korkVersion (#494)
 - feat(authorization): implement application prefix permission source (#490)
 - chore(dependencies): Autobump korkVersion (#493)
 - fix(fiat-api): revert breaking change to Permissions. (#492)
 - fix(api): fix serialization issues with new Authorization enum values. (#491)
 - chore(dependencies): Autobump korkVersion (#489)
 - feature(authorization): Add creation access control (#485)
 - chore(mergify): add 'auto merged' label (#488)
 - chore(dependencies): Autobump korkVersion (#487)
 - chore(dependencies): Autobump korkVersion (#486)
 - chore(dependencies): Autobump korkVersion (#483)
 - chore(github): Add mergify config (#484)
 - fix(roles): Allow anonymous calls from Fiat to other Spinnaker modules (#479)
 - chore(dependencies): Autobump korkVersion (#482)
 - feat(permission): enables customization of permission sources and aggregation (#481)
 - feat(secrets/gcs): Support for decrypting spinnaker secrets in GCS (#477)
 - chore(dependencies): Autobump korkVersion (#476)
 - chore(dependencies): Autobump korkVersion (#473)
 - fix(error): Test various access denied scenarios and improve readability (#475)
 - fix(error): Improve access denied error messaging (#474)
 - chore(dependencies): Autobump korkVersion (#471)
 - fix(boot2): camel -> snake case (#470)
 - chore(dependencies): Autobump korkVersion (#469)
 - chore(dependencies): Autobump korkVersion (#467)
 - chore(dependencies): Autobump korkVersion (#466)
 - chore(dependencies): Autobump korkVersion (#465)
 - chore(dependencies): Autobump korkVersion (#464)

#### Front50  - abc5c16...9415a44
 - fix(authorization): update fiatVersion to fix canCreate (#631)
 - chore(dependencies): Autobump fiatVersion (#623)
 - chore(dependencies): Autobump korkVersion (#622)
 - fix(authorization): Sync roles after an application is created (#619)
 - fix application creation bug (#620)
 - feat(authorization): Add create restriction to application creation (#618)
 - chore(dependencies): Autobump korkVersion (#617)
 - fix(fiat-api): fix usage of deprecated method from Permissions (#616)
 - fix(fiat): roll back fiat to 1.5.1 (#615)
 - fix(fiat-api): fiatVersion 1.7.1 (#614)
 - chore(dependencies): fiatVersion 1.7.0 (#613)
 - chore(dependencies): Autobump korkVersion (#612)
 - chore(mergify): add 'auto merged' label (#611)
 - chore(dependencies): Autobump korkVersion (#610)
 - chore(dependencies): Autobump korkVersion (#609)
 - chore(dependencies): Autobump korkVersion (#608)
 - chore(dependencies): Autobump korkVersion (#604)
 - fix(fiat): Fix access denied for new apps with no roles (#597)
 - chore(github): Add mergify config (#607)
 - refactor(gcs): Bump kork version and update google credentials to latest style. (#605)
 - chore(dependencies): Autobump korkVersion (#603)
 - feat(secrets/gcs): Support for decrypting spinnaker secrets in GCS (#602)
 - chore(dependencies): Autobump korkVersion (#601)
 - fix(error): Swap out AccessDeniedExceptionHandler for FiatAccessDeniedExceptionHandler (#600)
 - chore(dependencies): Autobump korkVersion (#598)
 - feat(sql): Conditionally allow MySQL Connector to be excluded from the build (#596)
 - chore(logging): make access denies log more stronger (#595)
 - chore(dependencies): Autobump korkVersion (#594)
 - chore(dependencies): Autobump korkVersion (#593)
 - chore(dependencies): Autobump korkVersion (#592)
 - chore(dependencies): Autobump korkVersion (#591)
 - chore(dependencies): Autobump korkVersion (#590)
 - chore(dependencies): Autobump korkVersion (#589)

#### Gate  - 2cdf6f9...a453541
 - chore(dependencies): Autobump fiatVersion (#941)
 - fix(keel): force yaml when exporting resources (#940)
 - chore(dependencies): Autobump korkVersion (#939)
 - chore(dependencies): Autobump korkVersion (#938)
 - fix(managed): Use RequestParam instead of Query so Swagger UI does it right (#937)
 - chore(dependencies): fiatVersion 1.7.2 (#936)
 - feat(bakery): option to derive rosco bakeOptions from gate.yml (#935)
 - fix(fiat-api): fiatVersion 1.7.1 (#934)
 - chore(dependencies): fiatVersion 1.7.0 (#933)
 - chore(dependencies): Autobump korkVersion (#932)
 - chore(mergify): add 'auto merged' label
 - feat(keel): add resource export endpoint (#930)
 - chore(dependencies): Autobump korkVersion (#929)
 - chore(dependencies): Autobump korkVersion (#928)
 - feat(saml): add prefix to saml files if not present (#919)
 - chore(dependencies): Autobump korkVersion (#927)
 - feat(canary): Adds new canary exec endpoint sans canary config id path param. (#924)
 - chore(dependencies): Autobump korkVersion (#922)
 - chore(github): Add mergify config
 - fix(keel): fix managed controller endpoint (#923)
 - feat(keel): add diff endpoints (#921)
 - chore(dependencies): Autobump korkVersion (#920)
 - feat(secrets/gcs): Support for decrypting spinnaker secrets in GCS (#917)
 - feat(canary): Exposes API initiating canary given a config. (#918)
 - chore(dependencies): Autobump korkVersion (#916)
 - feat(artifact): expose get single artifact (#915)
 - feat(displayNameBaseOs): Add displayName to baseOS
 - fix(oauth2): Add before filter to fix basic auth (#899) (#912)
 - feat(provider/aws): Added a new API, to get the lambda functions. (#859)
 - chore(dependencies): Autobump korkVersion (#910)
 - fix(keel): passthrough errors (#911)
 - fix(swagger): Enable canary config store for generating with swagger (#908)
 - fix(saml): make saml email address configurable (#907)
 - feat(keel): add veto-related endpoints (#898)
 - chore(dependencies): Autobump korkVersion (#906)
 - chore(cleanup): Remove no-longer-supported API (#905)
 - Revert "fix(nexus): add nexus repo names endpoint (#890) (#903)" (#904)
 - fix(oauth2): Add before filter to fix basic auth (#899)
 - fix(nexus): add nexus repo names endpoint (#890) (#903)
 - fix(nexus): add nexus repo names endpoint (#890)
 - feat(monitored deploy): expose monitor deploy orca endpoints
 - fix(md): valid json not a string response (#902)
 - feat(md): expose status of resource (#901)
 - chore(dependencies): Autobump korkVersion (#897)
 - chore(history): maps not typed (#896)
 - feat(cors): Configurable whitelist of origins that are allowed to make cross-origin requests (#891)
 - chore(dependencies): Autobump korkVersion (#894)
 - feat(keel): endpoints for delivery config manifests
 - chore(dependencies): Autobump korkVersion (#892)
 - chore(dependencies): Autobump korkVersion (#889)
 - feat(keel): reflect change in how resource history works in Keel API
 - chore(dependencies): Autobump korkVersion (#888)

#### Igor  - 5e6c31e...37fe1ed
 - feat(keel): send keel docker events if enabled (#535)
 - chore(dependencies): Autobump fiatVersion (#537)
 - chore(dependencies): Autobump korkVersion (#536)
 - chore(dependencies): Autobump korkVersion (#534)
 - style(igor): Removed unused variables in InfoController (#531)
 - chore(dependencies): fiatVersion 1.7.2 (#533)
 - fix(fiat-api): fiatVersion 1.7.1 (#532)
 - chore(dependencies): fiatVersion 1.7.0 (#529)
 - fix(concourse): Fix caching of concourse build events (#525) (#530)
 - chore(dependencies): Autobump korkVersion (#528)
 - feat(gcb): Add permissioning to Google Cloud Build accounts (#523)
 - fix(concourse): Fix caching of concourse build events (#525)
 - chore(mergify): add 'auto merged' label (#527)
 - refactor(google): Update google credentials to latest style. (#526)
 - chore(dependencies): Autobump korkVersion (#524)
 - chore(dependencies): Autobump korkVersion (#522)
 - chore(dependencies): Autobump korkVersion (#521)
 - chore(dependencies): Autobump korkVersion (#519)
 - chore(github): Add mergify config (#520)
 - chore(dependencies): Autobump korkVersion (#518)
 - feat(secrets/gcs): Support for decrypting spinnaker secrets in GCS (#517)
 - chore(dependencies): Autobump korkVersion (#516)
 - chore(travis): Remove old build cache migrator (#514)
 - chore(dependencies): Autobump korkVersion (#515)
 - fix(nexus): change Nexus config (#513)
 - chore(dependencies): Autobump korkVersion (#512)
 - Revert "fix(nexus): add nexus name endpoint and artifact location (#506) (#510)" (#511)
 - fix(travis): Correctly parse global_env from Travis v3 API (#504)
 - fix(nexus): add nexus name endpoint and artifact location (#506) (#510)
 - fix(nexus): add nexus name endpoint and artifact location (#506)
 - chore(dependencies): Autobump korkVersion (#509)
 - chore(dependencies): Autobump korkVersion (#508)
 - chore(dependencies): Autobump korkVersion (#507)
 - chore(dependencies): Autobump korkVersion (#505)
 - chore(dependencies): Autobump korkVersion (#503)
 - fix(jenkins): don't npe on dynamic choice parameters (#502)

#### Kayenta  - 8aa41e6...5dcec80
 - chore(mergify): add 'auto merged' label (#629)
 - refactor(google): Update to latest google credentials style. (#628)
 - chore(docs): add documentation on the object structure of canary config. (#622)
 - fix(judge): Disable first pass outlier removal by default. (#621)
 - chore(github): Add mergify config (#627)
 - feat(secrets/gcs): Bumping orca dep for pulling gcs secrets module (#620)
 - fix(signalfx): fix typo in signalflow error message template (#618)
 - feat(signalfx): Provide additional context about the results of the signalflow programs. (#617)
 - fix(kayenta): Retry in case of network errors (#615)
 - fix(docker): docker compose fixes (#616)
 - feat(config): Allow canary config id to be passed in instead of always randomly generated. (#611)

#### Orca  - 8855208...ed38c00
 - fix(cloudformation): Support Cloudformation templates as lists (#3270) (#3277)
 - fix(kubernetes): fix patchBody typing depending on strategy type (#3283) (#3287)
 - chore(dependencies): Autobump fiatVersion (#3266)
 - feat(kubernetes): permit multiple ReplicaSets to be deployed with a single rollout strategy (#3264)
 - fix(kubernetes): Fix Optional ofNullable (#3265)
 - feat(bakeManifest/kustomize): add kustomizeFilePath to support git/repo artifact type (#3260)
 - chore(dependencies): Autobump korkVersion (#3263)
 - feat(monitoredDeploy): Completed event should include details of success/failure (#3214)
 - feat(cfn): request to delete CFN changeset if empty (#3234)
 - fix(kayenta): Make sure we destroy canary clusters (#3259)
 - feat(orchestration): Allow sibling stages to continue on FAILED_CONTINUE (#3252)
 - fix(dependent pipelines): failure to trigger a dependend pipeline shouldn't affect others (#3258)
 - fix(monitored deploy): add deploymentId parameter (#3255)
 - feat(plugins): Back orca stage plugins via PF4J (#3248)
 - chore(dependencies): Autobump korkVersion (#3257)
 - chore(dependencies): fiatVersion 1.7.2 (#3256)
 - fix(fiat-api): fiatVersion 1.7.1 (#3254)
 - fix(bakery): fix bakery select by baseOs (#3253)
 - fix(conditions): invalid stageEnabled expressions disable stage (#3249)
 - chore(dependencies): fiatVersion 1.7.0 (#3251)
 - chore(dependencies): Autobump korkVersion (#3250)
 - refactor(*): Merge orca-extensionpoint module into orca-core (#3240)
 - chore(mergify): add 'auto merged' label (#3247)
 - fix(gcb): process spel in gcb build definition artifact (#3246)
 - feat(plugins): Add kork-plugins, wire up initial spel function extension point (#3242)
 - refactor(kubernetes): clean up bake manifest error messaging (#3244)
 - chore(dependencies): Autobump korkVersion (#3241)
 - fix(rrb): Store RRB before-cleanup pipeline ID in the right context field (#3239)
 - chore(dependencies): Autobump korkVersion (#3238)
 - fix(bake): Fix the fix for inconsistent names in parallel bakes (#3236)
 - fix(mergify): use `ready to merge` label (#3237)
 - chore(dependencies): Autobump korkVersion (#3231)
 - chore(github): Add mergify config (#3235)
 - feat(kubernetes): support rolling restart operation for deployments (#3233)
 - feat(EvaluateVariables): Support complex objects in EvaluateVariables stage (#3232)
 - fix(front-50): Use stage.context.pipelineId for strategies (#3224)
 - feat(monitored deploy): Support rollback on failure (#3222)
 - chore(clouddriver): Add fast prop for disabling saga retries (#3229)
 - feat(dynamicBackoff): Dynamically configurable task backoff (#3228)
 - chore(kayenta): add config id and execution to outputs (#3227)
 - fix(bakeManifest): add option for rawOverrides (#3225) (#3226)
 - fix(bakeManifest): add option for rawOverrides (#3225)
 - fix(webhook): Add fail fast status to the preconfigured webhook properties (#3223)
 - feat(secrets/gcs): Support for decrypting spinnaker secrets in GCS (#3205)
 - fix(bake): Fail bake stage when image names don't match across regions (#3219)
 - fix(pipeline): allow mid-task spel evaluation to reference prior stage outputs (#3220)
 - fix(titus): use labels as override only for titus health providers (#3221)
 - fix(Kayenta): Change exception type to kork.UserException (#3218)
 - fix(pipelines): Fixed interpretation of missing startTime during instâ€¦ (#2820)
 - refactor(strategies): clean up some strategies from my past refactor (#3213)
 - fix(cfn): Return RUNNING if an error occurred (#3210) (#3216)
 - chore(core): Adding stage.toString() (#3209)
 - chore(mysql): add drop database to init script for convenience (#3217)
 - feat(Kayenta): Support canaryConfigName as canary identifier (#3215)
 - fix(cf): cf rolling red black did not resize old SG correctly (#3211) (#3212)
 - fix(cfn): Return RUNNING if an error occurred (#3210)
 - fix(cf): cf rolling red black did not resize old SG correctly (#3211)
 - fix(webhook): Don't try to deserialize fields we don't really nâ€¦ (#3202) (#3207)
 - fix(rollback): pass authentication context and consider errors fatal
 - fix(webhook): Don't try to deserialize fields we don't really nâ€¦ (#3202)
 - feat(tasks): attach notifications to execution (#3206)
 - fix(deploy): Correctly detect images in parent executions (#3203)
 - fix(cfn): Add retries when force cache refreshing (#3200)
 - chore(dependencies): Autobump korkVersion (#3201)
 - fix(monitored deploy): send complete notification on failure & add shrink cluster (#3199)
 - fix(RRB & MD): pin and unpin the correct server group (#3197)
 - chore(dependencies): Autobump korkVersion (#3188)
 - fix(monitored deploy): make reason singular (#3195)
 - chore(dependencies): bump keiko to 2.14.2 (#3196)
 - fix(monitored deploy): add monitored deploy to same checks as RRB (#3190)
 - fix(shrinkCluster): ensure we are injecting disable before shrink (#3194)
 - fix(tasks): limit task maxBackoff time to 2min (#3193)
 - chore(dependencies): bump keiko to 2.14.1 (#3192)
 - fix(queue): fix wiring for keiko redis to sql migrator (#3191)
 - fix(rollback): timebox how long we spend blocking in ExplicitRollback
 - feat(rollback): avoid scaling down during rollback
 - fix(webhooks): Construct Webhook status check URL honoring the original webhook protocol/scheme (#3187)
 - fix(pipelines): Copying of failed child pipeline outputs (#3186)
 - fix(monitored deploy): don't store any context in the task (#3184)
 - fix(redblack): fix red/black deploy (#3182)
 - fix(SpEL): Execution context injected into expressions dynamically (#3142) (#3183)
 - fix(monitored deploy): log everything better (#3180)
 - fix(google): do not pin source server group capacity in red/black (#3181)
 - fix(google): fix scale down cluster task in gce red/black (#3177) (#3179)
 - feat(sql): Conditionally allow MySQL Connector to be excluded from the build (#3175)
 - refactor(StageDefinitionBuilder): Delete deprecated aroundStages (#3133)
 - fix(google): fix scale down cluster task in gce red/black (#3177)
 - fix(google): fix deploying with red/black into an empty cluster (#3173)
 - docs(readme): Add service overview (#3122)
 - chore(kubernetes): upgrade kubernetes client-java from beta to 5.0.0 (#3171)
 - chore(dependencies): Autobump korkVersion (#3170)
 - chore(dependencies): bump keiko to 2.14.0 (#3172)
 - chore(intellij): fixing first time builds in intellij (#3169)
 - fix(clouddriver): small typo fix (#3167)
 - chore(dependencies): bump keiko to 2.13.7 (#3168)
 - chore(dependencies): bump keiko to 2.13.6 (#3166)
 - feat(clouddriver): Basic support for retryable kato tasks (#3162)
 - fix(rollback): capture the source capacity before anything else
 - chore(dependencies): bump keiko to 2.13.5 (#3165)
 - fix(core): run CancellableStage cancel method on dedicated thread pool (#3164)
 - chore(dependencies): Autobump korkVersion (#3163)
 - fix(source resolver): prefer older servergroup when copying capacity (#3161)
 - feat(orcestration): add support for dynamic task timeout (#3159)
 - chore(core): removing clusterLock feature (#3136)
 - refactor(google): convert GceDeployStagePreProcessor to Java (#3157)
 - feat(sql): ability to override SqlHealthIndicator by dynamic config (#3158)
 - fix(boot2): Replacing camel with snake case (#3151)
 - chore(dependencies): keiko 2.13.4 (#3156)
 - fix(conditions): Only pause pipeline deploys (#3150)
 - chore(monitored deploy): clean up naming broadcast -> notify (#3155)
 - chore(dependencies): bump keiko to 2.13.3 (#3154)
 - Revert "fix(nexus): deserialize nexus trigger (#3130) (#3149)" (#3153)
 - fix(nexus): deserialize nexus trigger (#3130) (#3149)
 - fix(nexus): deserialize nexus trigger (#3130)
 - fix(polling): Updating conditional property casing (#3143)
 - chore(dependencies): bump keiko to 2.13.2 (#3148)
 - fix(sql/repository): return to sorting stages only by refId (#3145)
 - fix(SpEL): Execution context injected into expressions dynamically (#3142)
 - feat(monitored deploy): add endpoint to get a list of deployment monitors (#3138)
 - feat(sql): sql NotificationClusterLock implementation (#3141)
 - fix(queue/sql): fix clash between orca/keiko changelogs (#3140)
 - fix(gce): revert a conditional that was accidentally flipped in #3128 (#3139)
 - feat(strategy): Monitored deploy strategy ALPHA (#3128)
 - feat(queue): shovel support to move to/from keiko-sql (#3137)
 - chore(dependencies): Autobump korkVersion (#3135)
 - feat(core): Add SpEL Function Helpers for Resolved Trigger Artifacts (#3118)
 - feat(queue): add support for keiko-sql (#3134)
 - chore(dependencies): Autobump korkVersion (#3132)
 - chore(dependencies): Autobump korkVersion (#3131)
 - chore(dependencies): Autobump korkVersion (#3129)
 - chore(dependencies): Autobump korkVersion (#3127)

#### Rosco  - 338a41d...2f92d63
 - feat(kustomize): support git/repo artifact in kustomize bake manifest (#449)
 - feat(kustomize): upgrade binary v3.1.0 -> v3.3.0 (#459)
 - chore(dependencies): Autobump korkVersion (#457)
 - chore(dependencies): Autobump korkVersion (#456)
 - chore(dependencies): Autobump korkVersion (#455)
 - feat(packer): set custom repository per base image (#435)
 - chore(mergify): add 'auto merged' label (#454)
 - fix(artifact): improve error messaging for failed artifact downlâ€¦ (#453)
 - chore(dependencies): Autobump korkVersion (#448)
 - chore(github): Add mergify config (#451)
 - fix(dockerfile): correct hashicorp packer path to 1.4.4 (#452)
 - fix(rosco): Update packer version in rosco (#450)
 - chore(dependencies): Autobump korkVersion (#447)
 - fix(kustomize): fetch new artifacts with the same version (#446)
 - fix(bakeManifest): helm --set option (#441) (#445)
 - refactor(manifest): Some refactoring of manifest bakery classes (#444)
 - fix(bakeManifest): helm --set option (#441)
 - fix(helm): Fix baking of helm artifacts (#442) (#443)
 - fix(helm): Fix baking of helm artifacts (#442)
 - feat(secrets/gcs): Support for decrypting spinnaker secrets in GCS (#438)
 - fix(bakeManifest): revert to set-string (#439) (#440)
 - fix(bakeManifest): revert to set-string (#439)
 - chore(dependencies): Autobump korkVersion (#437)
 - chore(dependencies): Autobump korkVersion (#432)
 - chore(dependencies): Autobump korkVersion (#431)
 - chore(dependencies): Autobump korkVersion (#430)
 - fix(bake/helm): ignore tests drectory when baking Helm chart (#429)
 - chore(dependencies): Autobump korkVersion (#428)
 - chore(dependencies): Autobump korkVersion (#427)
 - chore(dependencies): Autobump korkVersion (#426)
 - chore(dependencies): Autobump korkVersion (#425)
