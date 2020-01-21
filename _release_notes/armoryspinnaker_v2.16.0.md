---
layout: post
title: v2.16.0 Armory Release (OSS Release 1.16.1)
order: -21620190918175500
hidden: false
---

# 09/18/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
There are currently no known issues with this release.

## Highlighted Updates
### Armory

###  Spinnaker Community Contributions
There have also been numerous enhancements, fixes and features across all of Spinnaker's other services. See their changes here:  
* [Spinnaker's v1.16.1](https://www.spinnaker.io/community/releases/versions/1-16-1-changelog)  

<br>

## Detailed Updates

### Bill of Materials
Here's the bom for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>version: 2.16.0-rc161
timestamp: "2019-09-18 18:55:35"
services:
  clouddriver:
    version: 5.6.2-9db8e9d-031bcec-edge1
  deck:
    version: 2.11.0-896d15d-b0aac47-rc8
  dinghy:
    version: 0.0.4-9b3b84f-rc316
  echo:
    version: 2.7.0-16a503d-7aae214-edge4
  fiat:
    version: 1.6.0-84d2119-e92cfbc-edge1
  front50:
    version: 0.18.0-195043d-abc5c16-edge1
  gate:
    version: 1.11.0-83b97ab-fd0128a-rc4
  igor:
    version: 1.5.0-a3f5664-c9bbca8-edge3
  kayenta:
    version: 0.10.0-b2d0be0-8aa41e6-rc2
  monitoring-daemon:
    version: 0.15.0-922385d-edge126
  monitoring-third-party:
    version: 0.15.0-922385d-edge126
  orca:
    version: 2.9.0-4517040-7b4e3dd-rc6
  rosco:
    version: 0.13.0-368e336-cfb88bb-rc2
  terraformer:
    version: 0.0.2-c0605a2-edge1
dependencies:
  redis:
    version: 2:2.8.4-2
artifactSources:
  dockerRegistry: docker.io/armory</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - cd9d1cc...9b3b84f
 - fix(makeslice): Stub out makeSlice during preproc. (#188)
 - chore(deps): fix broken apache dep (#187)
 - refact(halconfig): remove deck (#183)

#### Terraformer&trade; - c0605a2
No Changes

#### Armory Clouddriver  - 9db8e9d
No Changes

#### Armory Deck  - 155f05a...896d15d
 - chore(deps): bump kayenta version (#525)

#### Armory Echo  - 16a503d
No Changes

#### Armory Fiat  - 84d2119
No Changes

#### Armory Front50  - 195043d
No Changes

#### Armory Gate  - 5b9fb1b...83b97ab
No Changes

#### Armory Igor  - a3f5664
No Changes

#### Armory Kayenta  - 1a6b0ea...b2d0be0
No Changes

#### Armory Orca  - 9605212...4517040
 - chore(build): support plugins (#49)

#### Armory Rosco  - 7b4de48...368e336
No Changes

### Armory Open Core
#### Dinghy (Open Core) d62dc4a..7072f60
 - fix(dinghyfile): Filter out makeSlice in prep (#72)
 - fix(deps): fix the broken apache dep (#71)
 - feat(gitlab): Add Gitlab Support (#70)
 - task(tidy): Remove minio dependency (#69)

###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release: 

[Spinnaker 1.16.1](https://www.spinnaker.io/community/releases/versions/1-16-1-changelog#individual-service-changes)  

#### Clouddriver  - 7a485ae...031bcec
 - feat(ecs): suspend/resume autoscaling during disable/enable service operations (#3995)
 - fix(kubernetes): Fix log message when checking readable kinds (#4000)
 - fix(appengine): add RANDOM as a supported ShardBy (#3998)
 - chore(dependencies): Autobump korkVersion (#3996)
 - fix(ecs): Handle task def not cached yet (#3980)
 - fix(ecs): set correct key for clusterNames in applications list (#3981)
 - fix(ecs): new task ID format is valid for instance details and termination (#3983)
 - fix(kubernetes): Dynamic accounts reload when kubeconfig content changed (#3990)
 - test(kubernetes): Add tests of KubernetesKind serialization (#3992)
 - fix(kubernetes): Add Json annotations (#3991)
 - fix(kubernetes): Use consistent casing for built-in kinds (#3989)
 - fix(circle): Bump up resources (#3988)
 - fix(kubernetes): Use consistent casing for kind names (#3987)
 - fix(ecs): look up security groups by AWS account name (#3986)
 - fix(kubernetes): Use an account-specific kind registry (#3985)
 - chore(dependencies): Autobump korkVersion (#3984)
 - perf(docker): Use parallel streams for caching docker images
 - refactor(eventing): Simplify interaction with SpinnakerEvents (#3943)
 - fix(aws): Only consider accounts for the AWS cloud provider (#3982)
 - fix(core): Create better task exception summaries (#3979)
 - fix(kubernetes): improve error messaging around invalid service names
 - chore(dependencies): Autobump korkVersion (#3976)
 - refactor(gce): More plumbing work for the caching code (#3978)
 - fix(cf): fix artifact metadata for clone stage (#3977)
 - chore(circle): Upgrade the resource class for builds (#3975)
 - feat(titus): Adding optional sharedMemory resource attribute (#3937)
 - refactor(gce): a lot of compute wrapper plumbing needed for the caching layer (#3970)
 - perf(docker): Set cache data id, missing from un-grooving code (#3961)
 - chore(build): Increase parallelism of circle builds (#3971)
 - fix(titus): Add default app sg flag to description (#3969)
 - test(gce): add tests for GoogleZonalServerGroupCachingAgent (#3968)
 - refactor(kubernetes): Fix some code style issues (#3967)
 - chore(dependencies): Autobump korkVersion (#3962)
 - fix(titus): Pass nextCommand if front50 app doesnt exist (#3966)
 - refactor(kubernetes): Add global and account-specific registry (#3965)
 - feat(build): Ubuntu image variant support (#3964)
 - fix(titus): Consolidate & verify security group assignment behavior (#3963)
 - feat(build): Add CircleCI config to (hopefully) reduce build times. (#3910)
 - fix(sql): enable ProjectClustersCachingAgent in non-redis modes (#3960)
 - chore(dependencies): Autobump korkVersion (#3959)
 - Revert "perf(docker): Fix for ConcurrentHashMap cast error. Added unit tests (#3942)" (#3958)
 - Revert "perf(docker): Fix for ConcurrentHashMap cast error. Added unit tests (#3942) (#3951)" (#3957)
 - fix(titus): Loading front50 app should be optional (#3955)
 - chore(dependencies): Autobump korkVersion (#3956)
 - fix(event): Fixing some concurrency issues in event store (#3954)
 - fix(artifacts): Make HttpCredentials fetchUrl throws exception on non-successful response (#3946) (#3953)
 - perf(docker): Fix for ConcurrentHashMap cast error. Added unit tests (#3942) (#3951)
 - fix(aws): Reservation API support for `metal` instance types (#3950)
 - fix(artifacts): Make HttpCredentials fetchUrl throws exception on non-successful response (#3946)
 - chore(dependencies): Autobump korkVersion (#3939)
 - fix(titus): Functionality parity with behavior before refactor (#3948)
 - chore(dependencies): add missing dependency (#3949)
 - perf(docker): Fix for ConcurrentHashMap cast error. Added unit tests (#3942)
 - refactor(kubernetes): Convert all V2 code in clouddriver-kubernetes to Java (#3947)
 - chore(saga): Adding logs to SagaService (#3945)
 - fix(titus): "Fix" circular dependency with Provider (#3944)
 - feat(titus): Refactor deploy operation to use sagas (#3936)
 - fix(docker): REVERT - Use parallel streams for caching docker images (#3926)
 - Revert "perf(docker): Use parallel streams for caching docker images (#3926)" (#3940)
 - perf(docker): Use parallel streams for caching docker images (#3926) (#3938)
 - perf(docker): Use parallel streams for caching docker images (#3926)
 - chore(dependencies): Get the Oracle API jar from Maven. (#3932)
 - feat(saga): Initial beta saga library (#3930)
 - chore(dependencies): manually bump korkVersion (#3935)
 - fix(provider/k8s): return operation result data (#3931) (#3934)
 - fix(provider/k8s): return operation result data (#3931)
 - fix(provider/azure): build Azure Resource Group before create LB. (#3820)
 - feat(provider/eureka): retry/http configuration for eureka caching agent (#3927)
 - feat(event): Adding eventing lib (#3922)
 - chore(build): Update cloudbuild.yaml file (#3928)
 - fix(ecs): Additional null checks around cached EC2 instance data (#3901) (#3908)
 - feat(provider/k8s): support artifacts in v2 runjob (#3924)
 - fix(gce): add a TODO about removing the ONLY_DOWN autoscaler policy
 - fix(google): return null guards to GoogleApplicationProvider (#3921)
 - chore(dependencies): Autobump korkVersion (#3913)
 - perf(google): improve performance of /serverGroups endpoint (#3906)
 - refactor(google): convert GoogleApplicationProvider to Java (#3880)
 - fix(google): return null guards to GoogleApplicationProvider (#3921)
 - chore(dependencies): Autobump korkVersion (#3913)
 - perf(google): improve performance of /serverGroups endpoint (#3906)
 - fix(metrics): strip the provider's package name in agent metrics (#3920)
 - fix(kubernetes/v1): re-add currentCpuUtilization (#3917) (#3918)
 - fix(kubernetes/v1): re-add currentCpuUtilization (#3917)
 - fix(kubernetes/v1): set currentCpuUtilization from currentMetrics (#3912) (#3914)
 - fix(kubernetes/v1): set currentCpuUtilization from currentMetrics (#3912)
 - feat(alibabacloud): add alibaba cloud provider's credential config (#3898)
 - chore(dependencies): Autobump korkVersion (#3911)
 - feat(aws): upgrade awscli (#3907)
 - feat(cloudformation): Treat template as string instead of yaml (#3849)
 - fix(ecs): Additional null checks around cached EC2 instance data (#3901)
 - feat(cf): Logs support for run job stage and app instance (#3900)
 - chore(build): Update cloudbuild.yaml file (#3905)
 - refactor(cats): Make the AgentDataType constructor private (#3904)
 - chore(dependencies): Autobump korkVersion (#3891)
 - fix(ecs): search through whole list of tasks for vpc ID (#3886) (#3902)
 - fix(ecs): search through whole list of tasks for vpc ID (#3886)
 - chore(dependencies): fix some accidental transitive dependencies (#3899)
 - fix(ecs): Add validation for loadBalancedContainer when using artifact (#3888) (#3896)
 - fix(ecs): Add validation for loadBalancedContainer when using artifact (#3888)
 - fix(kubernetes): fix property parser exception (#3885) (#3894)
 - fix(javadoc): fix invalid javadoc / run javadoc on PRs (#3892)
 - feat(alibabacloud): add alibaba cloud provider's model definition (#3852)
 - fix(kubernetes): improve error messaging when fetching logs for deleted pods (#3890)
 - fix(titus): Don't set default ZoneBalance during cloneServerGroup operation (#3887)
 - fix(kubernetes): fix property parser exception (#3885)
 - fix(configServer): add /opt/spinnaker/config/ as default (#3884)
 - chore(dependencies): Autobump korkVersion (#3881)
 - refactor(*): Move config server integration to kork-config (#3850)
 - refactor(google): convert GoogleApplicationProvider to Java (#3880)
 - perf(google): when fetching lbs, only load every sg if needed (#3876)
 - fix(k8s): improve determineOmitKinds (#3870)
 - refactor(google): use Get instead of List to find a specific image (#3879)
 - chore(intellij): Add IDEA project files and upgrade the Spinnaker Gradle project (#3873)
 - fix(appengine): check for null versions in servergroup caching agent (#3875) (#3877)
 - fix(appengine): check for null versions in servergroup caching agent (#3875)
 - feat(kubernetes): allow multi-manifest with rollout strategies (#3874)
 - fix(doc): fix invalid javadoc in KubernetesKindRegistry (#3867) (#3868)
 - fix(doc): fix invalid javadoc in KubernetesKindRegistry (#3867)
 - chore(aws): Replacing bastion configs with korks (#3858)
 - fix(appengine): Fix threading bugs in AppengineMutexRepository (#3862) (#3866)
 - fix(appengine): Fix threading bugs in AppengineMutexRepository (#3862)
 - fix(kubernetes): Fix daemonset stability condition (#3863) (#3865)
 - fix(kubernetes): Fix daemonset stability condition (#3863)
 - chore(dependencies): Autobump korkVersion (#3860)

#### Deck  - 09e4382...b0aac47
 - chore(deck): bump kayenta version (#7402) (#7404)
 - Revert "fix(nexus): nexus trigger selectable in UI (#7381) (#7398)"
 - fix(nexus): nexus trigger selectable in UI (#7381) (#7398)
 - fix(typos): fix a few typos in help messages (#7373)
 - Bump package core to 0.0.405 and titus to 0.0.109 (#7372)
 - fix(titus): Removing NLB as it is not compatible with Titus (#7317)
 - refactor(core): Reactify rename pipeline modal (#7368)
 - feat(notifications): Add additional fields for Github and get config from halyard (#7239)
 - refactor(core): use a fieldLayout for manualExecution (#7356)
 - fix(core/pipeline): fix date picker for manual execution parameters where constraint == 'date'
 - feat(core/presentation): Add DayPickerInput form input component
 - feat(ecs): Add security group view for ECS (#7363)
 - feat(core): improve readability of pipeline cancellation message (#7369)
 - fix(artifacts): fix uncaught undefined exception with artifacts (#7362)
 - fix(core): Fix shadowed var usage (#7367)
 - refactor(core): Reactify lock and unlock pipeline modal (#7366)
 - fix(core): separate multiple task errors by newline (#7355)
 - chore(core/presentation): update icon font for illumination UI
 - refactor(core): Reactify enable pipeline modal (#7360)
 - refactor(core): Reactify disable pipeline modal (#7358)
 - fix(kustomize): fix artifact selector (#7359)
 - refactor(core): Reactify delete pipeline modal (#7357)
 - fix(kubernetes): add StageFailureMessage to Bake Manifest execution details (#7354)
 - feat(core): add stage status precondition type (#7348)
 - refactor(titus): Making service job processes human friendly (#7350)
 - fix(core): pipeline execution was not displaying all resolvedArtifacts (#7353)
 - fix(artifacts/k8s): fix rewrite k8s artifact edit (#7352)
 - chore(core): Bump version to 0.0.404 (#7351)
 - fix(notifications): Fixing custom message text shape (#7349)
 - feat(artifacts): add artifactsRewrite flag to halconfig (#7347)
 - feat(build): Ubuntu image variant support (#7346)
 - fix(core): fix vertical alignment of radio buttons (#7344)
 - fix(artifacts): set the artifacts on trigger before the pipeline to sync problems with Angular (#7345)
 - fix(core): fix produces artifacts UI (#7343)
 - feat(bakeManifest): add kustomize support (#7342)
 - chore(core): Bump version to 0.0.403 (#7341)
 - fix(core/forms): revert legacy MapEditor adapter to old component (#7340)
 - fix(core/presentation): adds arrow icons back in (#7339)
 - fix(ecs): Fix creation of new ECS server group from existing (#7338)
 - fix(core/pipeline): fix side menu rendering for trigger config (#7337)
 - chore(core): Bump version to 0.0.402 (#7335)
 - fix(execution): Parameter names should be treated as strings (#7334)
 - chore(core): Bump version to 0.0.401 (#7333)
 - fix(pipelines): Correct text about cancelling (#7332)
 - fix(executions): Fixing execution marker ordering (#7331)
 - fix(artifacts): fix artifact account default logic (#7324)
 - chore(design): update icomoon font file for functions support
 - chore(core): Bump version to 0.0.400
 - fix(core/pipeline): Fix github trigger manual execution missing 'hash' property Adding `key={trigger.description}` to `Triggers.tsx` in a recent PR had an unexpected side effect of remounting the component when this submit method deletes the trigger 'description' field. Clone the trigger before mutating to stop this.
 - feat(tasks): Adding redirect for task by id without application (#7307)
 - chore(core): Bump version to 0.0.399
 - refactor(hooks): Pulling out useData (#7325)
 - fix(core/pipeline): Refresh jenkins jobs component when manual execution trigger is changed (#7323)
 - fix(core/pipeline): make dropdown option labels always be strings (#7322)
 - perf(core): avoid nested looping in execution transformation (#7217)
 - feat(kubernetes): permit creatable options for service and namespace in rollout strategy config (#7320)
 - Bump package amazon to 0.0.208 and titus to 0.0.108 (#7321)
 - refactor(core): Reactify the pipeline trigger configuration (#7318)
 - chore(core): Bump version to 0.0.398 (#7319)
 - refactor(core/presentation): use render props everywhere (#7316)
 - fix(gce): remove use of ONLY_DOWN deprecated autoscaler policy (#7310) (#7315)
 - fix(core/presentation): prevent the hover jitters on pipeline graph labels (#7311)
 - chore(build): Update cloudbuild.yaml file (#7314)
 - feat(provider/k8s): support artifacts in run job (#7309)
 - fix(ui): require application, pipeline, and a status when adding a pipeline trigger (#7308)
 - fix(ui): require type on the stage (#7304)
 - feat(helm): allow manual execution overrides for helm charts (#7312)
 - fix(gce): remove use of ONLY_DOWN deprecated autoscaler policy (#7310)
 - fix(tasks): Not bothering with null user when we have an authed one (#7305)
 - chore(ecs): Bump version to 0.0.251
 - chore(titus): Bump version to 0.0.107
 - chore(amazon): Bump version to 0.0.207
 - chore(cloudfoundry): Bump version to 0.0.93
 - chore(docker): Bump version to 0.0.45
 - chore(google): Bump version to 0.0.9
 - chore(kubernetes): Bump version to 0.0.29
 - chore(oracle): Bump version to 0.0.3
 - chore(core): Bump version to 0.0.397
 - feat(executions): Allow rerun on active executions (#7293)
 - chore(core/pipeline): remove debug statement from werckertrigger
 - fix(core/pipeline): did you know 'window.status' is a thing? Me neither.
 - refactor(core/pipeline): Migrate triggers to formik. Fetch data with react hooks.
 - fix(cf): Deploy stage config template import missing routes (#7291)
 - feat(cloudformation): Make the template editor more lenient (#7290)
 - refactor(core/forms): Extract a controlled MapEditorInput component Retains the old API in MapEditor.tsx
 - refactor(core/forms): Remove some cached state from MapEditor Move MapPair component to its own file
 - feat(core/presentation): Add refresh() api to useLatestPromise react hook (#7300)
 - feat(core/form): Disable ReactSelect ignoreAccents by default (#7301)
 - feat(ecs): Add CPU-binpack placement strategies (#7288)
 - fix(kubernetes): allow base64 manifests in deploy stage (#7298) (#7303)
 - fix(kubernetes): allow base64 manifests in deploy stage (#7298)
 - fix(kayenta): bump deck-kayenta to 0.0.85 to include fixes (#7297)
 - chore(deps): bump @spinnaker/kayenta from 0.0.83 to 0.0.85 (#7296)
 - fix(execution): Adding rerun option to execution details view (#7292)
 - fix(executions): Fix time boundary grouping with never started executions (#7294)
 - feat(webhooks): add support for cancellation to webhooks (#7289)
 - Louis/modal fixes (#7287)
 - feat(*/pipeline): Remove the concept of default stage timeouts, rename option (#7286)
 - fix(tests): fix tests for the refactored manual execution (#7285)
 - fix(core/pipeline): Fix concourse trigger state onChange callbacks
 - fix(core): plan templated pipelines when triggering manual exec (#7283)
 - feat(cf): Logs for Run Job stage (#7263)
 - fix(history): use the correct query param name when getting history (#7274)
 - fix(core/presentation): Add support for multi in ReactSelectInput onChange adapter
 - chore(build): Update cloudbuild.yaml file (#7282)
 - fix(core): Prevent reloads when hitting enter in create pipeline modal (#7277) (#7278)
 - fix(core/presentation): Only flex the first direct child, not descendent
 - chore(titus): Bump version to 0.0.106
 - chore(amazon): Bump version to 0.0.206
 - chore(appengine): Bump version to 0.0.8
 - chore(docker): Bump version to 0.0.44
 - chore(kubernetes): Bump version to 0.0.28
 - chore(core): Bump version to 0.0.396
 - fix(core): Prevent reloads when hitting enter in create pipeline modal (#7277)
 - feat(ui): add spinnaker version to UI, addresses #4383 (#7254)
 - chore(deps): upgrade deck-kayenta version to 0.0.83 (#7266)
 - fix(core): remove the logic to initialize after props change (#7271)
 - refactor(core/pipeline): Remove TriggerFieldLayout and BaseTrigger - Switch from TriggerFieldLayout to StandardFieldLayout - Switch to rendering Trigger description inside the dropdown
 - fix(core/presentation): StandardFieldLayout: add top margin, flex first element, render blank label - Add margin-top between fields - Flex-fill the first element in the input content area - Render the label section even when passed an empty string - Add CSS classes to layout sections for customization by callers
 - fix(core/presentation): Fix mount check -- useRef instead of useState
 - feat(core/presentation): Add a <Formik/> wrapper which applies fixes and opinions that we want in Spinnaker (#7272)
 - feat(core/entityTag): Add maxResults to settings.js (#7270)
 - fix(appengine): handle multiple cluster accounts in server group modal (#7265) (#7269)
 - fix(appengine): handle multiple cluster accounts in server group modal (#7265)
 - refactor(core/details): Creating generic component for entity details (#7262)
 - refactor(core): reactify notification and manual execution modal (#7075)
 - refactor(core/pipeline): Refactor most trigger to use <FormField/> components (#7255)
 - fix(core/pipeline): stage executionDetailsSections resolving the wrong cloudProvider (#7260)
 - fix(k8s/runJob): External logs URL to support manifest with implicit default namespace (#7252)
 - fix(k8s/runJob): Allowing only v1 accounts for v1 runJob (#7258) (#7259)
 - fix(k8s/runJob): Allowing only v1 accounts for v1 runJob (#7258)
 - fix(k8s): fix job log modal overflow (#7256) (#7257)
 - fix(k8s): fix job log modal overflow (#7256)
 - feat(core/presentation): Add virtualized support to ReactSelectInput (#7253)
 - fix(artifacts): correct bitbucket placeholder text (#7251)
 - fix(k8s): fix bake manifest selector (#7249) (#7250)
 - fix(k8s): fix bake manifest selector (#7249)
 - fix(core/presentation): Default FormField 'name' prop to '', not noop (#7248)
 - fix(core/pipeline): When changing trigger type, only retain the fields common to all trigger types (#7247)
 - fix(k8s/runJob): null property file if value none (#7243) (#7246)
 - chore(amazon): Bump version to 0.0.205
 - chore(kubernetes): Bump version to 0.0.27
 - chore(core): Bump version to 0.0.395
 - fix(k8s/runJob): null property file if value none (#7243)
 - fix(core): save and validate trigger type in pipeline config (#7241)
 - feat(pager): Allow providing pager duty subject/details in URL (#7242)
 - fix(kubernetes): fix radio button alignment in deploy manifest stage (#7240)
 - chore(core): Bump version to 0.0.394 (#7238)
 - fix(core): Changing switch to a map (#7236)
 - feat(aws): Support new artifact model for deploy cloudformation (#7180)
 - chore(core): add license finder plugin (#7188)
 - fix(ssl/apache2): Port conflict in ports.conf.gen (#7225) (#7233)
 - chore(core): Bump version to 0.0.393 (#7232)
 - refactor(pipeline): Export PipelineStageExecutionDetails (#7230)
 - fix(core): Render templated pipeline params in the pipeline run stage (#7228) (#7231)
 - fix(core): Render templated pipeline params in the pipeline run stage (#7228)
 - chore(titus): Bump version to 0.0.105
 - chore(amazon): Bump version to 0.0.204
 - chore(google): Bump version to 0.0.8
 - chore(kubernetes): Bump version to 0.0.26
 - chore(core): Bump version to 0.0.392
 - refactor(core): Script stage to react and formik (#7213)
 - chore(deps): [security] bump lodash-es from 4.17.11 to 4.17.14
 - test(core/filterModel): Add tests for restoring filters on router transitions, remove tests for removed functionality
 - refactor(core/filterModel): Simplify the AngularJS compatibility code which syncs the 'sortFilter' object and the router params - Removed the FilterModelServiceConverters code which duplicates the router param types code
 - refactor(core/filterModel): Use router hooks to save/restore filters
 - fix(core/reactShims): Fix the state.go wrapper such that it correctly exposes the `transition` (it's been inconsequentially broken a long time and nobody noticed)
 - fix(core/pipeline): Trigger pipeline validation when a trigger is updated
 - fix(core/pipeline): Fix initial trigger type state
 - refactor(core): refactored the trigger to react
 - fix(google): replace stateful MIG image input with dropdown (#7210) (#7227)
 - fix(google): replace stateful MIG image input with dropdown (#7210)
 - chore(deps): [security] bump lodash from 4.17.11 to 4.17.13
 - fix(ssl/apache2): Port conflict in ports.conf.gen (#7225)
 - fix(core): Render template triggers, notif, params for manual execution (#7223) (#7224)
 - fix(core): Render template triggers, notif, params for manual execution (#7223)
 - fix(amazon): Update default internalPort for CLBs to 80 (#7220)
 - feat(core): Allow filtering PAUSED executions
 - feat(kubernetes): allow multi-manifest for rollout strategies (#7219)
 - Bump package core to 0.0.391 and amazon to 0.0.203 (#7218)
 - feat(titus): Adding support for service job processes (#7186)
 - fix(tests): functional test clone form locators to match new reality (#7215) (#7216)
 - fix(tests): functional test clone form locators to match new reality (#7215)
 - perf(google): improve performance of GCE image selection (#7208) (#7209)
 - perf(google): improve performance of GCE image selection (#7208)
 - feat({core,amazon}/pipeline): add support per-OS AWS VM type choices (#7187)
 - Bump package core to 0.0.390 and amazon to 0.0.202 and titus to 0.0.104 (#7207)
 - refactor(amazon): allow custom CLB config when ejecting from a wizard (#7206)
 - fix(spel): Fix exceptions when account is an expression (#7168)

#### Echo  - 6160b79...7aae214
 - Revert "fix(nexus): get artifacts from nexus events (#643) (#652)" (#653)
 - fix(nexus): get artifacts from nexus events (#643) (#652)
 - fix(notification/slack): fix missing logger (#644) (#648)
 - chore(dependencies): Autobump korkVersion (#639)
 - fix(error handling): mark executions failed (#638)
 - feat(core): Use Spring Cloud Config for external configuration of accounts (#636)
 - chore(dependencies): Autobump korkVersion (#637)
 - chore(dependencies): Autobump korkVersion (#632)
 - fix(auth): Only trigger pipeline if service account has access to app (#562)
 - chore(docs): add high level overview to readme (#634)
 - fix(typo): Fix error message for bearychat (#631)
 - chore(dependencies): Autobump korkVersion (#630)
 - chore(dependencies): Autobump korkVersion (#629)
 - chore(dependencies): Autobump korkVersion (#626)
 - feat(build): Ubuntu image variant support (#628)
 - chore(artifact): logging the artifacts we get (#627)
 - chore(dependencies): Autobump korkVersion (#625)
 - chore(dependencies): Autobump korkVersion (#624)
 - chore(dependencies): Autobump korkVersion (#621)
 - fix(notifications/googlechat): Fix field visibility. (#622) (#623)
 - fix(notifications/googlechat): Fix field visibility. (#622)
 - chore(dependencies): Autobump korkVersion (#620)
 - feat(cron): Make database-mysql.sql idempotent (#614)
 - fix(notifications/manual-judgements): don't let echo work wrap slack messages to 80 chars (#616)
 - chore(dependencies): Autobump korkVersion (#619)
 - chore(build): Update cloudbuild.yaml file (#618)
 - chore(dependencies): Autobump korkVersion (#615)
 - chore(dependencies): Autobump korkVersion (#613)
 - feat(notifications/github): Add more general way to get status destination (#607)
 - refactor(slack): Add trace logging of Slack responses (#612)
 - fix(echo): Trigger properly off Github Pull Requests (#609)
 - chore(build): Update cloudbuild.yaml file (#611)
 - chore(dependencies): Autobump korkVersion (#608)
 - chore(dependencies): fix some accidental transitive dependencies (#610)
 - fix(pubsub): Increase socket timeout (#606)
 - chore(dependencies): Autobump korkVersion (#605)
 - fix(swabbie): Update swabbie email tempalte to link ASG resource (#597)
 - chore(dependencies): Autobump korkVersion (#603)
 - fix(gcb): Allow anonymous calls to igor (#602)

#### Fiat  - fced26e...e92cfbc
 - chore(dependencies): Autobump korkVersion (#462)
 - fix(logging): log at higher level for some auth failures (#463)
 - chore(dependencies): Autobump korkVersion (#461)
 - chore(dependencies): Autobump korkVersion (#459)
 - chore(dependencies): Autobump korkVersion (#458)
 - chore(dependencies): Autobump korkVersion (#456)
 - feat(build): Ubuntu image variant support (#457)
 - chore(dependencies): Autobump korkVersion (#455)
 - chore(dependencies): Autobump korkVersion (#454)
 - chore(dependencies): Autobump korkVersion (#453)
 - chore(dependencies): Autobump korkVersion (#452)
 - chore(dependencies): Autobump korkVersion (#451)
 - chore(build): Update cloudbuild.yaml file (#450)
 - chore(dependencies): Autobump korkVersion (#449)
 - chore(dependencies): Autobump korkVersion (#446)
 - fix(logs): add logback-encoder to classpath (#441) (#447)
 - chore(build): Update cloudbuild.yaml file (#445)
 - chore(dependencies): Autobump korkVersion (#442)
 - chore(intellij): Add IDEA project files. (#443)
 - chore(build): update gradle/spinnaker-gradle-plugin versions (#444)
 - fix(logs): add logback-encoder to classpath (#441)
 - chore(dependencies): Autobump korkVersion (#440)
 - chore(dependencies): Autobump korkVersion (#439)

#### Front50  - a8c2462...abc5c16
 - chore(dependencies): Autobump korkVersion (#587)
 - fix(exception handlers): log out exception for access denied (#586)
 - chore(dependencies): Autobump korkVersion (#584)
 - fix(web): Better handling when `ServiceAccountPermissionDAO` does notâ€¦ (#583)
 - feat(s3): Front50 Storage: Support Server Side Encryption in S3 headers (#577)
 - feat(docs): Migrated service overview from spinnaker.github.io to README (#582)
 - fix(web): Better handling when `ApplicationPermissionDAO` does not exist (#579) (#580)
 - chore(dependencies): Autobump korkVersion (#581)
 - chore(dependencies): Autobump korkVersion (#578)
 - fix(web): Better handling when `ApplicationPermissionDAO` does not exist (#579)
 - chore(dependencies): Autobump korkVersion (#574)
 - feat(build): Ubuntu image variant support (#575)
 - chore(dependencies): Autobump korkVersion (#573)
 - chore(dependencies): Autobump korkVersion (#572)
 - chore(dependencies): Autobump korkVersion (#569)
 - fix(docs): Update README.md
 - chore(dependencies): Autobump korkVersion (#568)
 - chore(dependencies): Autobump korkVersion (#566)
 - chore(build): Update cloudbuild.yaml file (#565)
 - chore(dependencies): Autobump korkVersion (#564)
 - chore(dependencies): Autobump korkVersion (#563)
 - chore(build): Update cloudbuild.yaml file (#562)
 - chore(dependencies): Autobump korkVersion (#559)
 - chore(intellij): Add IDEA project files. (#560)
 - chore(dependencies): fix some accidental transitive dependencies (#561)
 - chore(dependencies): Autobump korkVersion (#558)
 - feat(web): New `/admin/recover` endpoint
 - chore(dependencies): Autobump korkVersion (#556)

#### Gate  - a9ee8eb...fd0128a
 - Revert "fix(nexus): add nexus repo names endpoint (#890) (#903)" (#904)
 - fix(nexus): add nexus repo names endpoint (#890) (#903)
 - chore(dependencies): Autobump korkVersion (#886)
 - chore(dependencies): Autobump korkVersion (#884)
 - fix(core): Merge account list string for applications that span providers (#883)
 - chore(dependencies): Autobump korkVersion
 - chore(dependencies): Autobump korkVersion
 - chore(dependencies): Autobump korkVersion (#880)
 - feat(build): Ubuntu image variant support (#877)
 - chore(dependencies): Autobump korkVersion (#879)
 - chore(dependencies): Autobump korkVersion (#878)
 - chore(dependencies): Autobump korkVersion (#874)
 - fix(x509): check if fiat is enabled before fetching permissions on x509 login (#875) (#876)
 - fix(x509): check if fiat is enabled before fetching permissions on x509 login (#875)
 - chore(dependencies): Autobump korkVersion (#873)
 - chore(dependencies): Autobump korkVersion (#872)
 - chore(build): Update cloudbuild.yaml file (#871)
 - Allow overriding maxAuthenticationAge (#861) (#865)
 - feat(keel): app-specific endpoints (#870)
 - chore(dependencies): Autobump korkVersion
 - chore(dependencies): Autobump korkVersion (#868)
 - fix(ratelimit): replace broken use of gauge with a counter (#867)
 - feat(expressions): exposing expression eval by stage endpoint (#866)
 - chore(build): Update cloudbuild.yaml file (#864)
 - chore(dependencies): Autobump korkVersion (#860)
 - chore(dependencies): fix some accidental transitive dependencies (#863)
 - chore(intellij): Add IDEA project files. (#862)
 - Allow overriding maxAuthenticationAge (#861)
 - fix(auth): Enable auth to all connectors except API port (1.15.x) (#858)
 - fix(requestlogging): quiet down anonymous request logging
 - chore(dependencies): Autobump korkVersion (#856)
 - fix(auth): Enable auth to all connectors except API port (#844)
 - chore(dependencies): Autobump korkVersion (#852)
 - feat(bakery): add optional vmType field to base images (#847)

#### Igor  - 3245969...c9bbca8
 - Revert "fix(nexus): add nexus name endpoint and artifact location (#506) (#510)" (#511)
 - fix(nexus): add nexus name endpoint and artifact location (#506) (#510)
 - fix(boot2): Allow url-encoded % in URLs (#499)
 - feat(nexus): add Nexus webhook for artifact triggering (#501)
 - chore(dependencies): Autobump korkVersion (#500)
 - feat(core): Use Spring Cloud Config for external configuration of accounts (#498)
 - chore(dependencies): Autobump korkVersion (#496)
 - config(polling): add global spinnaker.build.pollingEnabled flag (#497)
 - chore(health): delete PollingMonitorHealth (#495)
 - config(jenkins): add a separate property to enable the poller (#494)
 - chore(docs): document Igor's behavior and features in README.md (#492)
 - chore(dependencies): Autobump korkVersion (#493)
 - chore(dependencies): Autobump korkVersion (#491)
 - chore(dependencies): Autobump korkVersion (#489)
 - feat(build): Ubuntu image variant support (#490)
 - chore(dependencies): Autobump korkVersion (#488)
 - chore(dependencies): Autobump korkVersion (#487)
 - chore(dependencies): Autobump korkVersion (#485)
 - chore(cleanup): minor dependency cleanup (#486)
 - chore(dependencies): Autobump korkVersion (#484)
 - chore(dependencies): Autobump korkVersion (#483)
 - chore(build): Update cloudbuild.yaml file (#482)
 - chore(dependencies): Autobump korkVersion (#481)
 - feat(travis): Refactor and simplify Travis polling (#467)
 - chore(dependencies): Autobump korkVersion (#480)
 - fix(travis): List tag builds from travis (#479)
 - chore(build): Update cloudbuild.yaml file (#478)
 - chore(dependencies): Autobump korkVersion (#476)
 - chore(intellij): Add IDEA project files. (#477)
 - chore(dependencies): Autobump korkVersion (#475)

#### Kayenta  - 6a3c60f...8aa41e6
 - refactor(newrelic): get nr endpoint from config (#609)
 - feat(build): Ubuntu image variant support (#607)
 - chore(build): Update cloudbuild.yaml file (#606)
 - feat(canary): Add additional metadata to the canary status response. (#604)
 - feat(deps): Depend on aws-java-sdk-s3 dependency instead of aws-java-sdk and remove awsobjectmapper (#592)
 - fix(typeahead/prometheus): Consider account name when querying metadata. (#598) (#601)
 - feat(newrelic): added ability for operators to set default scope and location keys. Also Added inline template support. (#603)
 - feat(kayenta): Prepare automated integration tests for kayenta (#594)
 - feat(standalone-canary-analysis): add SCAPE complete event listener and archive the status response object in the object store. (#593)
 - fix(kayenta): added support for nrql-functions which return more than one value (e.g. percentiles) (#596)
 - feat(Azure): Azure cloud storage(Blobs) support added for Kayenta (#587)
 - chore(build): Add cloudbuild.yaml file (#602)
 - chore(intellij): Add IDEA project files. (#599)
 - fix(typeahead/prometheus): Consider account name when querying metadata. (#598)
 - chore: Upgraded the Spinnaker Gradle Plugin and ran the new code formating spotlessApply task (#591)
 - chore: Made some tweaks to the /standalone_canary_analysis api docs. (#583)
 - fix(standalone_canary_analysis): use the supplied user when present. (#584)
 - fix(build): docker build (#578)
 - fix(kayenta): Bad requests to metrics storage are retried, but should not fixes #436 (#568)

#### Orca  - a55e367...7b4e3dd
 - Revert "fix(nexus): deserialize nexus trigger (#3130) (#3149)" (#3153)
 - fix(nexus): deserialize nexus trigger (#3130) (#3149)
 - chore(dependencies): Autobump korkVersion (#3125)
 - fix(error handling): add endpoint to mark executions failed (#3126)
 - feat(bakeManifest/kustomize): add support for kustomize renderer (#3120)
 - feat(plugins): Added ability to create plugin stages (#3105)
 - refactor(clouddriver): Shortening kato operation request id (#3111)
 - chore(dependencies): Autobump korkVersion (#3123)
 - fix(authorization): Use `EXECUTE` privilege for restarting stages (#3097)
 - chore(dependencies): Autobump korkVersion (#3119)
 - chore(dependencies): Autobump korkVersion (#3117)
 - feat(pipeline): add stage status precondition task (#3116)
 - fix(tasks): duplicate empty keys ignored (#3115)
 - chore(dependencies): Autobump korkVersion (#3112)
 - fix(orchestration): mark tasks failed when the stage is marked as ignore failure (#3114)
 - feat(build): Ubuntu image variant support (#3113)
 - fix(correlationId): force correlationId to String (#3110)
 - chore(dependencies): Autobump korkVersion (#3109)
 - fix(core) Handle circular reference in Stage class (#3107)
 - fix(pipelines): Increase the timeout for SaveServiceAccountTask (#3065)
 - fix(queue): only emit queue metrics if keiko enabled (#3108)
 - fix(webhooks): don't deref null object (#3106)
 - fix(expressions): add missed allowed classes back in (#3104)
 - chore(dependencies): Autobump korkVersion (#3098)
 - fix(core): Handle validation of templates with no defined stages (#3102)
 - feat(bakery): use bakerySelector for monitorBakeTask (#3103)
 - feat(queue): Add 'origin' to 'executions.completed' metric (#3101)
 - fix(kotlin): spring config classes shouldn't use constructors (#3030) (#3100)
 - chore(bakery): config to enable multi-bakery selection without stage context magic (#3099)
 - chore(dependencies): Autobump korkVersion (#3095)
 - fix(runJob): inject manifest fcr for k8s runjob (#3090) (#3094)
 - fix(gce): remove use of ONLY_DOWN deprecated autoscaler policy (#3087) (#3093)
 - fix(runJob): inject manifest fcr for k8s runjob (#3090)
 - refactor(runjob): remove ignored body parameter from collectJob call (#2932)
 - chore(dependencies): Autobump korkVersion (#3089)
 - chore(build): Update cloudbuild.yaml file (#3088)
 - feat(runJob): support artifacts in k8s run job (#3086)
 - fix(gce): remove use of ONLY_DOWN deprecated autoscaler policy (#3087)
 - fix(webhooks): correctly detect DNS failures (#3085)
 - refactor(core): Use kork-expressions (#3071)
 - chore(dependencies): Autobump korkVersion (#3079)
 - fix(dependentPipeline): add more info to dependent pipeline corr id (#3083)
 - fix(clouddriver): Add stage information to KatoService request id (#3080)
 - fix(clouddriver): Generate consistent client request id (#3077)
 - fix(aws): add default config for security groups (#3078)
 - chore(dependencies): Autobump korkVersion (#3076)
 - feat(alibabacloud): add a new provider of alicloud (#3055)
 - Revert changes made to add pipeline name header (#3075)
 - feat(expressions): entpoint to eval an expression from a stage (#3073)
 - fix(logging context header): add pipeline description details to MDC (#3074)
 - fix(pipelines): an execution only starts a downstream pipeline once (#3070)
 - fix(clone): make sure we run allowLaunch before cloneServerGroup
 - feat(webhooks): add support for cancellation to webhooks (#3069)
 - feat(cloudformation): treat yaml as string instead of map (#3024)
 - fix(core): update validaton to exclude hyphenated variable names (#3066) (#3067)
 - fix(core): update validaton to exclude hyphenated variable names (#3066)
 - feat(aws/findImage): if present use appversion to filter results (#3064)
 - chore(build): Update cloudbuild.yaml file (#3063)
 - fix(pipelines): expectedArtifacts inheritance from dynamic parent templates (#3023)
 - chore(dependencies): Autobump korkVersion (#3062)
 - fix(kayenta): plumb through siteLocal for kayenta email support (#3061)
 - chore(intellij): Add IDEA project files. (#3059)
 - Feat(plugins): adding ability to use plugins (#3058)
 - chore(dependencies): fix some accidental transitive dependencies (#3060)
 - fix(queue): fix spring config for migrating queue to redis cluster (#3056)
 - fix(RRB): Do not consider traffic guards during RRB deploy (#3054)
 - feat(queue): shovel support going to/from redis cluster (#3053)
 - fix(RRB): fix NPE introduced in https://github.com/spinnaker/orca/pull/3031 (#3050)
 - fix(webhook): Support verification of redirected urls (#3049)
 - feat(redis): redis cluster support for queue and locking (#3052)
 - chore(test): update test to reflect class change (#3051)
 - fix(preconfiguredJob): make cluster.application optional (#3047)
 - fix(core): Plan templated pipelines before triggering from start tasks (#3039) (#3046)
 - fix(core): Plan templated pipelines before triggering from start tasks (#3039)
 - fix(webhook): Supply additional context when fetching `RestTemplate` (#3045)
 - feat(webhook): Allow for customization of the default `RestTemplate` (#3044)
 - fix(RRB): disable traffic on the source server group only (#3037)
 - fix(RRB): Correctly determine source ASG (#3031)
 - chore(queue): log when pending messages found in previous service (#3043)
 - chore(webhook-task): Added test for injecting artifacts from webhook (#3032)
 - fix(queue): clearer error message gramar (#3042)
 - fix(queue): fully cancel not_started executions rejected from pending due to q-depth (#3041)
 - chore(queue): properties class for SqlPendingExecutionService (#3038)
 - feat(queue): DualPendingExecutionService for redis/sql migration (#3036)
 - feat(queue): sql backed pending execution service (#3035)
 - feat(kubernetes): allow multi-manifest in rollout strategies (#3034)
 - chore(sql): tests now use testcontainer mysql (#3033)
 - fix(kotlin): spring config classes shouldn't use constructors (#3030)
 - chore(dependencies): Autobump korkVersion (#3029)

#### Rosco  - f01311c...cfb88bb
 - chore(dependencies): Autobump korkVersion (#423)
 - chore(docs): Update gradlew command. (#424)
 - refactor(manifests): a few small cleanups for the manifest bakery (#422)
 - feature(kustomize): add integration for kustomize (#421)
 - chore(dependencies): Autobump korkVersion (#420)
 - feat(aws/ami_regions): add support for copies of amis (#413)
 - chore(dependencies): Autobump korkVersion (#419)
 - fix(bake/helm): use --set instead of --set-string (#418)
 - chore(dependencies): Autobump korkVersion (#416)
 - feat(build): Ubuntu image variant support (#417)
 - chore(dependencies): Autobump korkVersion (#415)
 - chore(dependencies): Autobump korkVersion (#414)
 - chore(dependencies): Autobump korkVersion (#408)
 - chore(aws): log when baseAmi resolved via dynamic property (#412)
 - chore(packer): upgrade packer binary to 1.4.2 (#410)
 - chore(dependencies): clean up some bad imports
 - chore(dependencies): gradle 5.5.1 / spinnaker-gradle-project 7.0.2
 - chore(packer): upgrade packer binary to 1.3.5 (#409)
 - chore(packer) - upgrade packer binary to 1.3.2 (#407)
 - chore(dependencies): Autobump korkVersion (#406)
 - chore(dependencies): Autobump korkVersion (#403)
 - chore(build): Update cloudbuild.yaml file (#404)
 - fix(buildtool): Set trusty dist for travis (#405)
 - chore(dependencies): Autobump korkVersion (#402)
 - chore(build): Update cloudbuild.yaml file (#401)
 - chore(dependencies): Autobump korkVersion (#399)
 - chore(intellij): Add IDEA project files. (#400)
 - feat(provider/alicloud): Add Alibaba Cloud bakery to build VM image (#396)
 - chore(dependencies): Autobump korkVersion (#398)
 - chore(dependencies): Autobump korkVersion (#397)
