---
layout: post
title: v Armory Release
order: -20190223190554
hidden: false
---

# 02/23/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues

## Highlighted Updates
### Armory
- [Armory Terraformer initial release](https://docs.armory.io/spinnaker/terraform_integration/) (alpha release)
 

###  Spinnaker Community Contributions
This release adds:
- [Traffic management support for Kubernetes V2 provider](https://www.spinnaker.io/guides/user/kubernetes-v2/traffic-management/)
- multiple performance improvements.

<br>

## Detailed Updates

### version.manifest
Here's the version.manifest for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>export jenkins_build_number=149
export packager_version=200cdad
export oss_release_type=stable
export armoryspinnaker_version=2.2.0-rc149
export armoryspinnaker_version_manifest_url=https://s3-us-west-2.amazonaws.com/armory-web/install/release/armoryspinnaker-v2.2.0-rc149-version.manifest
export deck_armory_version=2.6.5-f63c795-48a3495c1-rc569
export deck_version=2.6.5-48a3495c1-stable3
export igor_version=1.0.0-0b3a637-stable3
export igor_armory_version=1.0.0-803f082-0b3a637-rc15
export front50_version=0.14.1-129b407-stable7
export front50_armory_version=0.14.1-0c68eb2-129b407-rc13
export clouddriver_version=4.2.6-5fd694ffe-stable11
export clouddriver_armory_version=4.2.6-cedd917-5fd694ffe-rc37
export spinnaker_monitoring_version=release-1.11.x-2fe4272
export echo_armory_version=2.2.3-7c03592-22a704d-rc150
export echo_version=2.2.3-22a704d-stable3
export kayenta_armory_version=0.5.1-3ef38cd-8a49a32-rc37
export kayenta_version=0.5.1-8a49a32-stable3
export dinghy_version=0.0.2-0c66ede-rc133
export rosco_armory_version=0.8.2-becf57a-0e336fc-rc18
export rosco_version=0.8.2-0e336fc-stable4
export gate_version=1.4.0-b83dea9-stable3
export gate_armory_version=1.4.0-34eb422-b83dea9-rc133
export terraformer_version=0.0.1-a1adbb1-rc40
export orca_version=2.2.1-352222d11-stable3
export orca_armory_version=2.2.1-5880fa3-352222d11-rc40
export fiat_version=1.3.1-71ce645-stable4
export fiat_armory_version=1.3.1-67eb37f-71ce645-rc14</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - 7f67616...9e9e001
 - feat(logging): enable remote logging (#99)
 - feat(canary): Support specifying application spec for app creation (#96)
 - fix(config): better config loading (#94)

#### Terraformer&trade; - a1adbb1
 - chore(build): add test_runner_harness
 - chore(build): vendor dependencies
 - chore(logging): enable remote log forwarding
 - feat(destroy): adds destroy command (#32)
 - feat(terraform): overridable versions (#30)
 - feat(terraform): add support for backend-config option (#29)
 - feat(overrides): support var file overrides (#28)
 - feat(git): add username support (#27)
 - feat(health): add healtcheck endpoint (#26)
 - feat(vars): use overrides as vars (#23)
 - feat(git): adds support for downloading git repos (#22)
 - refactor(worker): refactor worker logic (#14)
 - chore(debug): add debug logging (#12)
 - feat(logs): Redis persistence for logs (#9)
 - chore(docker): update terraform version (#10)
 - chore(dev): add dev setup and examples (#4)
 - chore(build): automated builds
 - enhance(queue): change the way we access jobs
 - chore(cleanup): cleaning stuff up
 - chore(package): formalize codebase
 - feat(build): be able to run app in docker (#1)
 - chore(api): sort out apis
 - refactor(artifact): make dl artifacts async
 - chore(documentation): update readme
 - feat(project): initial commit

#### Armory Fiat  - 952a1c6
- feat(logging): enable remote logging 

#### Armory Front50  - 2b1c474
- feat(logging): enable remote logging 

#### Armory Igor  - 6a835e1
- feat(logging): enable remote logging 

#### Armory Orca  - ac46c38
- feat(logging): enable remote logging 

#### Armory Rosco  - db98028
- feat(logging): enable remote logging 

#### Armory Echo  - 5891816...7c03592
 - chore(build): Support for multi-release (#82)

#### Armory Deck  - 12927b8...f63c795
 - fix(ui): Annoying scrollbar over pipeline details (#480)
 - chore(builds): migrate to multi-release system (#479)

#### Armory Gate  - e569fa6...34eb422
 - chore(build): Multi-release builds (#43)
 - feat(auth/oidc): Add support for configured user_name (#40)

#### Armory Kayenta  - b86ccca...3ef38cd
 - chore(build): switch to multi-release

#### Packager - a3b654b...200cdad
 - chore(build): Multi-release support (#474)
 - chore(build): Bump version (#471)

###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release:  
[Spinnaker's v1.11.9](https://www.spinnaker.io/community/releases/versions/1-11-9-changelog#spinnaker-release-1-11-9)  
[Spinnaker's v1.11.8](https://www.spinnaker.io/community/releases/versions/1-11-8-changelog#spinnaker-release-1-11-8)  
[Spinnaker's v1.11.7](https://www.spinnaker.io/community/releases/versions/1-11-7-changelog#spinnaker-release-1-11-7)  
[Spinnaker's v1.11.6](https://www.spinnaker.io/community/releases/versions/1-11-6-changelog#spinnaker-release-1-11-6)  
[Spinnaker's v1.11.5](https://www.spinnaker.io/community/releases/versions/1-11-5-changelog#spinnaker-release-1-11-5)  
[Spinnaker's v1.11.4](https://www.spinnaker.io/community/releases/versions/1-11-4-changelog#spinnaker-release-1-11-4)  
[Spinnaker's v1.11.3](https://www.spinnaker.io/community/releases/versions/1-11-3-changelog#spinnaker-release-1-11-3)  
[Spinnaker's v1.11.2](https://www.spinnaker.io/community/releases/versions/1-11-2-changelog#spinnaker-release-1-11-2)  
[Spinnaker's v1.11.1](https://www.spinnaker.io/community/releases/versions/1-11-1-changelog#spinnaker-release-1-11-1)  
[Spinnaker's v1.11.0](https://www.spinnaker.io/community/releases/versions/1-11-0-changelog#spinnaker-release-1-11-0)  


#### Clouddriver  - 5fd694ffe...bee52673a
 - fix(kubernetes): fix image resolution for project clusters view (#3286) (#3375)
 - fix(provider/aws): Only describe instance health for ELBs (#2699) (#3196) (#3360)
 - fix(provider/kubernetes): fix NPE on KubernetesV2ServerGroup disabled… (#3325) (#3334)
 - fix(provider/kubernetes): fix NPE on KubernetesV2ServerGroup disabled… (#3325) (#3335)
 - Fix missing jars release 1.11.x (#3306)
 - fix(google): differentiate among autohealing health check kinds (#3282) (#3285)
 - fix(provider/kubernetes): ensure crds are registered before using creds (#3272) (#3273)
 - fix(provider/kubernetes): sync updates to account properties (#3270) (#3271)
 - fix(search): Add sane defaults to search executor config. (#3261) (#3269)
 - fix(provider/gce): Adds flexibility to autoscaler upsert for scaleDown (#3260) (#3264)
 - fix(provider/gce): Adds flexibility to autoscaler upsert for scaleDown (#3260) (#3263)
 - fix(google): prevent parent server group from overwriting null clone autohealing policies (#3268)
 - fix(google): prevent parent server group from overwriting null clone autohealing policies (#3267)
 - fix(provider/gce): Decorate XPN resources when upserting instance (#3252) (#3254)
 - fix(provider/gce): Decorate XPN resources when upserting instance (#3252) (#3253)
 - fix(kubernetes): fix fetching clusters for project (#3247) (#3250)
 - fix(provider/kubernetes): v2 handle 0 replica scale-down (#3248) (#3249)
 - fix(core): include instanceCounts when fetching project clusters, fix ClassCastException for gce and appengine fetch cluster methods (#3244) (#3245)
 - fix(provider/kubernetes): bail out of caching on error (#3241) (#3242)
 - perf(provider/kubernetes): ignore ondemand requests for other accounts (#3234) (#3240)
 - fix(provider/oracle): fix update/edit LoadBalancer (#3162) (#3216)
 - chore(dependencies): Autobump spinnaker-dependencies (#3212) (#3213)
 - fix(provider/kubernetes): fix v2 cronjob status (#3207) (#3209)
 - fix(security): Fix CVE-2017-5929 security issue threat level 9 (#3206) (#3208)
 - perf(provider/kubernetes): share CRD list between threads (#3201) (#3202)
 - fix(cache/introspection): sort by descending execution (#3199) (#3200)
 - chore(cache): adds introspection to caching agents (#3194) (#3195)
 - fix(provider/kubernetes): hold entries in on-demand longer (#3190) (#3191)
 - feat(appengine): instrument deployment time
 - feat(scattergather): Initial scatter/gather library (#3173)
 - fix(provider/cf): avoid NPE on incomplete package (#3181)
 - fix(provider/cf): stop NPE on empty error response (#3180)
 - fix(titus): don't fail when job id is null (#3066)
 - chore(dependencies): Autobump spinnaker-dependencies (#3179)
 - feat(artifacts): add ivy/maven artifact account support
 - chore(dockerfile): Add aws cli to container build (#3128)
 - feat(cats): make ProviderRegistry more pluggable (#3178)
 - fix(core): fix CloudDriverConfig wiring when redis disabled (#3175)
 - feat(provider/cf): add apps manager uri to server group model
 - fix(provider/cf): correct pagination logic when iterating over multiple pages
 - feat(provider/cf): add option for user to define service creation/deletion timeout
 - fix(titus): `requiresApplicationRestriction` = false if no apps found (#3172)
 - fix(provider/cf): correct manifest for env vars
 - feat(web): Support disabling request queue by dynamic property (#3168)
 - fix(gce): TerminateGoogleInstancesDescription is not ServerGroupNameable (#3169)
 - fix(reservations): adjust filtering of regional reservations that have been fully utilized (#3167)
 - fix(provider/gce): Set device name on attached disks. (#3159) (#3165)
 - feat(provider/cf): apply health check attributes when deploying
 - feat(provider/cf): Prefer "buildpacks" manifest attribute
 - fix(security): Make all applicable GCE operations implement ApplicationNameable (by way of ServerGroup[s]Nameable)
 - refactor(security): Renames ServerGroupNameable to ServerGroupsNameable. Reimplements ServerGroupNameable to singular implementation.
 - fix(provider/gce): Set device name on attached disks. (#3159)
 - fix(security): Skip application check when deleting AMIs (#3158)
 - fix(provider/gce): Avoid blackholing Exceptions from CachingAgents. (#3156)
 - refactor(provider/cf): added test for deploy operation (#3154)
 - Rollback some GCE batch size changes (#3152)
 - chore(dependencies): Autobump spinnaker-dependencies (#3151)
 - feat(provider/appengine): allow limiting the set of indexed services and versions (#3150)
 - fix(provider/gce): Wait for batch requests to finish before returning (#3149)
 - chore(build): install awscli in container (#3121)
 - feat(provider/cf): add tags property to services
 - fix(provider/cf): correctly filter returned routes
 - fix(titus): Override `requiresApplicationRestriction` (#3148)
 - fix(security): Enforce application/account read when fetching entity tags (#3147)
 - fix(provider/kubernetes): consult kind list for crd caching (#3144) (#3146)
 - feat(provider/titus): move eviction of server group as last event to redis (#3145)
 - fix(provider/kubernetes): consult kind list for crd caching (#3144)
 - fix(security): Handle empty `TerminateInstancesDescription` (#3143)
 - fix(cats): Avoid searching without query string (#3142)
 - refactor(artifacts): Clean up spring in artifacts (#3141)
 - refactor(provider/cf): added test for deploy converter
 - chore(dependencies): Autobump spinnaker-dependencies (#3122)
 - fix(security): Handle empty `TerminateTitusInstancesDescription` (#3136)
 - fix(provider/cf): ensure retry logic succeeds
 - fix(security): Correctly determine application when terminating instances (#3135)
 - fix(security): Avoid logging when `requiresApplicationRestriction` is false (#3134)
 - fix(provider/titus): clear cluster and app on server group delete event (#3131)
 - feat(kubernetes/v2): Support statefulset partition rollouts (#3120)
 - fix(provider/cf): allow async destruction of services
 - fix(provider/cf): NPE on create server group with empty routes
 - fix(security): Override `requiresApplicationRestriction` as needed (#3130)
 - feat(provider/gce): Limit GCE batch sizes. (#3125)
 - fix(provider/cf): do service creation asynchronously so it cannot timeout
 - feat(provider/titus): support setting sequence for server groups (#3126)
 - fix(security): Handle potentially null `ResourcesNameable.getNames()` (#3127)
 - feat(provider/titus): support setting copySourceScalingPoliciesAndActions = false (#3124)
 - chore(build): build on openjdk8 (#3123)
 - fix(aws): Ensure that AWS operations enforce WRITE access to applications (#3118)
 - fix(titus): Ensure that Titus operations enforce WRITE access to applications (#3119)
 - feat(core): General purpose `DescriptionAuthorizer` (#3117)
 - Fix duplication instance health (NLB) [GCP] (#3023)
 - chore(builds): conditionalize settings.gradle includes with includeCloudProviders property
 - perf(provider/kubernetes): parallelize calls to kubectl (#3114)
 - fix(provider/aws): populate loadbalancer attributes (#3113)
 - feat(security): Support multiple applications in `ApplicationNameable` (#3112)
 - fix(provider/kubernetes): address empty namespace metrics (#3109)
 - fix(provider/oracle): fix createServerGroup with LoadBalancer (#3059)
 - fix(provider/cf): fetch services on a per-region basis
 - feat(artifacts): Add support for helm/chart artifacts (#2983)
 - fix(provider/docker): fix docker polling (#3106)
 - fix(web): Increase default page size for entity tags from 2000 -> 5000 (#3105)
 - fix(provider/oracle): add ssh key (#3091)
 - feat(provider/titus): filter out tasks and jobs from observeJobs (#3103)
 - Patch 1.10.x (#3104)
 - feat(aws/subnet): Add accountId to subnet endpoints (#3101)
 - chore(dependencies): Autobump spinnaker-dependencies (#3090)
 - fix(docker): Fixup wiring of dockerOkClientProvider in DockerRegistryCredentialsInitializer. (#3102)
 - fix(google): Make other lb deletions also tolerant of missing, irrelevant resources. (#3100)
 - fix(google): Survive missing, irrelevant target proxies during http lp deletion. (#3099)
 - feat(docker): Allow custom config of Docker OkHttpClient (#3084)
 - refactor(provider/titus): removes v1 caching agent (#3097)
 - fix(provider/gce): Truncate system millis for instance template UUID. (#3096)
 - chore(typos): Make javadoc task happy. (#3095)
 - fix(provider/gce): Fix autoscaling mode parsing. (#3088) (#3092)
 - fix(provider/openstack): Vendor upstream opstack4j fixes. (#3081)
 - fix(provider/cf): handling of service parameters
 - fix(provider/gce): Fix autoscaling mode parsing. (#3088)
 - fix(provider/titus): return target group health for individual server group endpoint (#3089)
 - fix(ha): Add clouddriver-ro-deck.yml halconfig. (#3033) (#3085)
 - chore(dependencies): spinnaker-gradle-project 5.2.1 (#3087)
 - feat(artifacts): Adds support for static credentials in S3 artifact (#3083)
 - fix(providers/aws): check deletion protection for alb/nlb before acting (#3082)
 - fix(provider/ecs): Rename ResizeServiceAtomicOperationConverter component name so it doesn't conflict with resizeServerGroup atomic operation (#3078)
 - fix(provider/ecs): Rename ResizeServiceAtomicOperationConverter component name so it doesn't conflict with resizeServerGroup atomic operation (#3077)
 - feat(provider/appengine): config files from artifacts (#3076)
 - fix(builds): Adds missing build number back to generated .deb file (via gradle plugin bump (#3075)
 - fix(providers/aws): set defaults for deletionProtection & idleTimeout for backwards compatibility (#3074)
 - chore: missing license headers (#3073)
 - feat(provider/aws): load balancer idle timeout and deletion protection (#3057)
 - feat(builds): Reintroduces the composite build CL with an upgraded version of the gradle plugin. (#3072)
 - feat(core): add labels to objects for grouping in UI (#3070)
 - fix(provider/cf): environment variables not returned for server groups (#3068)
 - fix(provider/kubernetes): associate ingress w/ app (#3069) (#3071)
 - fix(provider/kubernetes): associate ingress w/ app (#3069)
 - fix(provider/gce): Include sourceImages for all disks in clone. (#3067)
 - refactor(provider/cf): rename deleteService to destroyService
 - fix(provider/cf): ensure response is preserved for RetryableApiException
 - fix(provider/gce): Include sourceImages for all disks in clone. (#3064)
 - fix(provider/kubernetes): only disable pods owned by controller (#3063)
 - feat(provider/kubernetes): add frn to k8s manifest (#3061)
 - feat(provider/kubernetes): set disabled flag when no lbs attached (#3060)
 - feat(provider/kubernetes): dynamic target selection (#3058)
 - fix(kubernetes): add support for json patching (#3047)
 - fix(revert): Reverts https://github.com/spinnaker/clouddriver/pull/3035 due to missing `buildDeb` gradle task (#3056)
 - chore(dependencies): Autobump spinnaker-dependencies (#3055)
 - fix(provider/kubernetes): fix sticky lb & pod relationship (#3054)
 - fix(provider/kubernetes): role & roleBinding are namespaced (#3052) (#3053)
 - fix(provider/kubernetes): role & roleBinding are namespaced (#3052)
 - chore(dependencies): Autobump spinnaker-dependencies (#3051)
 - chore(dependencies): Autobump spinnaker-dependencies (#3050)
 - fix(provider/cf): fix route definitions for CF manifest-based deployments
 - fix(provider/kubernetes): fix enable patch when key doesn't exist (#3045)
 - fix(aws): Revert "Use Edda during upsert AMI tags operations (#3034)" (#3044)
 - fix(provider/oracle): add private key passphrase (#3043)
 - feat(provider): abstract disable & implement enable (#3042)
 - fix(provider/cf): fix route definitions for CF manifest-based deployments
 - feat(provider/kubernetes): finish disable operation (#3037)
 - fix(provider/titus): fix titus compilation issue due to new format of license block (#3039)
 - fix(builds): moves to publishing opinions via include file (#3035)
 - feat(ha): Add clouddriver-ro-deck.yml halconfig. (#3033)
 - fix(aws): Use Edda during upsert AMI tags operations (#3034)
 - feat(search): Adds parallell executor to search providers. (#3015)
 - chore(aws): update BlockDeviceConfig for the g3s instance family (#3031)
 - fix(provider/amazon): support setting a http health check on a tcp target group (#3028)
 - fix(provider/kubernetes): Assign default sequences to manifests (#3027)
 - chore(dependencies): Autobump spinnaker-dependencies (#3026)
 - chore(dependencies): Autobump spinnaker-dependencies (#3025)
 - feat(provider/kubernetes): Add Builder to KubernetesImageDescription (#3022)
 - feat(provider/kubernetes): k8s resource whitelisting using annotation… (#3014)
 - feat(provider/cf): caching agent backwards compatible to CAPI 2.94.0/3.29.0
 - chore(dependencies): Autobump spinnaker-dependencies (#3016)
 - feat(provider/kubernetes): split kubernetes pod logs by container (#3017)
 - fix(artifacts/gcs): fix version resolution (#3020) (#3021)
 - fix(artifacts/gcs): fix version resolution (#3020)
 - feat(web): Allow for request queue size to be overridden dynamically (#3019)
 - feat(provider/cf): caching agent backwards compatible to CAPI 2.94.0/3.29.0
 - feat(provider/titus): streaming titus client (#3006)
 - chore(dependencies): Autobump spinnaker-dependencies (#3013)

#### Deck  - c9abb38e5...48a3495c1
 - fix(core/css): be explicit on which file we're importing (#6554) (#6560)
 - fix(kubernetes): fix account selection by handling null values passed to ManifestSelector.isExpression (#6441)
 - fix(google): safe healthcheck lookups when cloning server group
 - fix(google): differentiate among autohealing health check kinds
 - fix(google): fix autohealing clone logic
 - fix(google): fix autohealing clone logic
 - fix(google): prevent parent server group from overwriting null clone autohealing policies
 - fix(google): prevent parent server group from overwriting null clone autohealing policies
 - fix(core/executions): Fix NPE in ExecutionGroup->Notifications when there is a Strategy visible (#6087) (#6253)
 - fix(core): encode pipeline names in API request paths (#6221) (#6240)
 - fix(oracle/pipeline): Rename ng module to spinnaker.oracle.* (#6219) (#6239)
 - fix(oracle/pipeline): Rename ng module to spinnaker.oracle.* (#6219) (#6238)
 - fix(core): encode pipeline names in API request paths (#6221) (#6237)
 - fix(core): Cherry-pick "do not load GA script if not configured (#6177)". (#6196)
 - fix(amazon/loadBalancer): Fix load balancer VPC selection (#6117)
 - fix(amazon/loadBalancer): Fix load balancer VPC selection (#6116)
 - chore(deps): bump deck-kayenta version to 0.0.65
 - fix(kubernetes): cherry-pick execution and link fixes from master (#6124)
 - fix(core): Actually default to using new manual trigger endpoint (#6097) (#6099)
 - fix(kubernetes): yaml editor support for multi docs
 - chore(deps): bump @spinnaker/kayenta from 0.0.63 to 0.0.64
 - fix(amazon/securityGroup): Select default vpc by default (neat idea) (#6078)
 - chore(*): Upgrade upath to 1.1.0 (#6079)
 - feat(core): Default to using new manual trigger endpoint (#6077)
 - fix(provider/cf): populate red/black strategy additional fields (#6072)
 - refactor(provider/cf): use custom implementation of DeploymentStrategySelector
 - feat(core/utils): Add WorkerPool class to limit concurrency of promise based tasks (#6065)
 - chore(amazon): Bump version to 0.0.141 (#6075)
 - fix(aws): update load balancer zones when region changes (#6074)
 - refactor(provider/cf): reorder artifact types
 - feat(provider/cf): display service tags for server group
 - feat(provider/cf): Allow health check config on deploy
 - fix(provider/cf): render start application checkbox value
 - refactor(provider/cf): use DeploymentStrategySelector react component
 - refactor(provider/cf): reactify pipeline stages
 - fix(provider/cf): add missing trigger to deploys
 - build(deps): [security] bump marked from 0.3.6 to 0.3.19
 - refactor(provider/cf): make better use of formik library capabilities
 - feat(entityTags):kubernetes support (#5498)
 - chore(amazon): Bump version to 0.0.140
 - chore(core): Bump version to 0.0.294
 - fix(core/spel): Truncate spel autocomplete values to 90 chars (#6049)
 - fix(dependencies): Use fontawesome-free instead of deprecated fonrtawesome-free-webfonts (#5873)
 - fix(provider/kubernetes): Change FileSystem to Filesystem (#6044) (#6055)
 - fix(core/serverGroup): Fix occasional NPE when serverGroup.runningTasks is null (#6054)
 - fix(amazon/serverGroup): Show the list of changed values (min/max/desired) (#6052)
 - fix(amazon/serverGroup): Track min/max values to desired better (#6051)
 - fix(provider/kubernetes): Change FileSystem to Filesystem (#6044)
 - chore(*): Update uirouter/react-hybrid to 0.3.9 (#6048)
 - fix(aws): only send user-changed capacity fields on resize (#6040)
 - fix(core/application): Move observable subscription to componentDidMount() (#6045)
 - fix(provider/oracle): fix update/edit LoadBalancer (#6043)
 - feat(core/presentation): Create IFormFieldApi interface and implement it in FormField and FormikFormField (#6020)
 - fix(core): only show load error message when server groups fail to load (#6031)
 - refactor(core): Reactify AccountRegionClusterSelector (#6029)
 - chore(*): Update uirouter/react-hybrid to 0.3.8
 - chore(core): Bump version to 0.0.293 (#6039)
 - fix(core/pipeline): Only show quiet period tag if respect flag is true (#6038)
 - feat(provider/kubernetes): dynamic lookups in scale/find (#6037)
 - chore(titus): Bump version to 0.0.61
 - chore(amazon): Bump version to 0.0.139
 - chore(core): Bump version to 0.0.292
 - Package bump (#6026)
 - fix(core/pipeline): Fix required for manual execution date picker (#6033)
 - fix(titus): Fix target group tag in clusters view (#6032)
 - feat(titus): Show capacity group is run job advanced options (#6030)
 - feat(core/pipeline): Indicate quiet period enabled on pipeline trigger status (#6008)
 - feat(kubernetes): add execution details for scale + delete stages (#6024)
 - fix(core): restrict CRON trigger minutes options (#6027)
 - fix(kubernetes): prevent namespace as expression from resetting to null
 - refactor(provider/cf): improve error messages on multiple route issues
 - chore(core): Bump version to 0.0.288 (#6023)
 - refactor(amazon): convert resize modal to react (#6013)
 - feat(kubernetes): execution details for manifest traffic stages (#5985)
 - fix(core): Fixed DeploymentStrategySelector not updating strategy (#6022)
 - fix(core/presentation): Use official formik `connect()` api to create `FormikForm` render-prop component.
 - chore(core): upgrade clipboard.js to 1.7.1
 - chore(*): Update uirouter/react-hybrid
 - fix(core): allow in-page deep linking to tasks (#6014)
 - fix(kubernetes): Allow resource name to be added as expression #3513
 - fix(amazon+titus/serverGroup): Revert custom sort logic no longer needed with react-select
 - fix(build): Fix yarn lockfile
 - fix(provider/cf): handle different success/error cases to display checksum
 - fix(core/presentation): Fix perf issue by not processing diacritics in React Select
 - fix(core/presentation): Make fastField property optional
 - fix(aws/serverGroups): always show AWS sever group settings (#6007)
 - fix(aws/serverGroups): always show AWS sever group settings (#6003)
 - feat(kubernetes): collapsible container list in ServerGroupHeader (#5986)
 - chore(design): adds icon (#6002)
 - fix(kubernetes): add custom prompt text for Creatable selects in ManifestSelector, fix error where custom text fails to load in ui
 - fix(kubernetes): add toggleable text input to ManifestSelector so name can be entered as an expression #3513
 - refactor(core/presentation): Move some code around - Extract evaluateExpression to a separate file - Move FormField and FormikFormField to parent directory
 - feat(core/presentation): Support internal Validator(s) in Inputs (#5995)
 - refactor(stages): Adding StageConfigWrapper for cleaner StageConfigs (#5994)
 - chore(core): Bump version to 0.0.287
 - chore(titus): Bump version to 0.0.57
 - chore(docker): Bump version to 0.0.22
 - feat(titus): Support digest in run job stage
 - feat(docker): Support digest
 - refactor(docker): Consolidate and clean up image selector functions
 - fix(provider/cf): allow only alphanumeric and '_' for env variable keys
 - fix(pager): Sanitize any html rendered
 - chore(amazon): Bump version to 0.0.135
 - chore(core): Bump version to 0.0.286
 - chore(*): Update uirouter/react-hybrid+react+angularjs to latest versions (#5992)
 - fix(build): bump memory limits during gradle build (#5991)
 - feat(core/presentation): Automatically generate '${label} cannot be negative' validation messages (#5988)
 - chore(amazon): Bump version to 0.0.134
 - chore(core): Bump version to 0.0.285
 - feat(artifacts): Allow preconfigured webhooks to produce artifacts (#5984)
 - fix(build): re-enable minification (#5966)
 - feat(core/presentation): Perf: use Formik FastField to speed up forms. Opt out using fastField={false}
 - feat(core/presentation): Add isStringArray and switch to string options in various react components
 - feat(core/presentation): Create SelectInput and use in HealthCheck component
 - feat(core/presentation): Add onChange prop to FormikFormField as a replacement for formik-effect - Add WatchValue component to be notified when prop value changes
 - feat(core/presentation): Add minValue/maxValue Validators and use in AdvancedSettings
 - refactor(amazon/loadBalancer): ConfigureOidcConfigModal: use FormikFormField
 - feat(core/presentation): StandardFieldLayout: move inline styles into .css
 - feat(core/presentation): Add CheckboxInput and NumberInput and use in ALBAdvancedSettings
 - feat(core/presentation): Add RadioButton and TextArea Inputs; use in EntityTagEditor w/FormikFormField
 - refactor(core/presentation): Extract validationClassName to utils.ts
 - fix(kubernetes): fix yaml editor (#5981)
 - fix(kubernetes): add k8s kind in artifact icon list (#5978)
 - chore(provider/cf): rename "Add services" to "Bind services"
 - feat(core/modal): Perf: do not rerender entire modal on every scroll
 - fix(core/application): Do not JSON.stringify this.data
 - feat(core): Export projects to be re-used by teams (#5979)
 - fix(kubernetes): defaults can be passed in as null (#5975) (#5976)
 - fix(kubernetes): defaults can be passed in as null (#5975)
 - fix(amazon): distinguish inclusive/exclusive bounds on scaling policy config (#5969)
 - feat(artifacts): Add support for helm/chart artifacts (#5918)
 - fix(docker): fix binding of `handleRefreshImages` method #3514 (#5973)
 - fix(search): firefox unable to scroll search results
 - chore(docker): Bump version to 0.0.21
 - feat(docker): Add utility to extract parts from docker image id
 - fix(kubernetes): bake manifest Name field is required (#5965)
 - fix(core/pipeline): Make quiet period message more specific (#5964)
 - fix(core/presentation): change warning class to match class applied by ValidationMessage component
 - fix(kubernetes): include app and provider in enable + disable stages (#5962)
 - fix(publish.sh): When pushing the branch to origin, use --set-upstream to track remote
 - chore(amazon): Bump version to 0.0.133
 - chore(core): Bump version to 0.0.284
 - fix(amazon/loadBalancer): Fix region selection after account changes
 - feat(kubernetes): include server group manager name in clickable clusters box (#5952)
 - chore(dependencies): bump deck-kayenta to 0.0.63 (#5950)
 - chore(dependencies): bump deck-kayenta to 0.0.63 (#5949)
 - feat(kubernetes): enable / disable stages (#5940)
 - chore(amazon): Bump version to 0.0.132 (#5951)
 - fix(amazon/deploy): Fix clearing invalid security groups (#5948)
 - fix(artifacts): bake manifest artifact scope used before defined (#5947)
 - chore(titus): Bump version to 0.0.56
 - chore(amazon): Bump version to 0.0.131
 - chore(core): Bump version to 0.0.283
 - refactor(core/deploy): Remove angular strategy config support
 - refactor(core/deploy): Convert red black strategy config to react
 - refactor(core/deploy): Convert custom strategy config to react
 - refactor(amazon/deploy): Convert rolling push strategy config to react
 - refactor(core/deploy): Convert rolling red back strategy config to react
 - refactor(core): Expose NumberList in react
 - refactor(core): Convert DeploymentStrategySelector to react
 - chore(core): Bump version to 0.0.282 (#5938)
 - fix(publish.sh): Don't use chris's git aliases
 - feat(webhook): add PATCH to list of options for webhook (#5912)
 - fix(provider/oracle): add ssh key (#5901)
 - feat(core/triggers): Add UI to toggle on/off respectQuietPeriod (#5921)
 - fix(core/presentation): use Option<string> in StringToOptions
 - fix(core/help): Export HelpField and HelpMenu
 - chore(titus): Bump version to 0.0.55
 - chore(docker): Bump version to 0.0.20
 - chore(amazon): Bump version to 0.0.130
 - chore(core): Bump version to 0.0.281 (#5919)
 - feat(modules): Add shell script to publish modules
 - feat(modules): Add shell script to bump modules
 - feat(modules): Add shell script to print dirty modules Modules are dirty if their last commit didn't touch package.json
 - feat(provider/oracle): create/delete LoadBalancer (#5868)
 - chore(core/presentation): Update formik from 0.11.11 to 1.3.1 (#5917)
 - fix(provider/cf): fetch services on a per-region basis
 - feat(core/presentation): Introduce Validation class for reusable validation fns. (#5913)
 - chore(core/pipeline): Cleaning up imports (#5914)
 - fix(artifacts): hide artifact editor when source of manifest is text (#5916)
 - fix(artifacts): hide artifact editor when source of manifest is text (#5915)
 - refactor(core/projects): Simplify TrashButton click handler
 - chore(*): Update react to 16.6 (#5911)
 - refactor(core): Remove invalid <g> from HoverablePopover (#5904)
 - test(core/cluster): fix lint error unused variable (#5910)
 - fix(appengine): the selectedProvider is received as null when Create Server Group btn clicked (#5908) (#5909)
 - fix(appengine): the selectedProvider is received as null when Create Server Group btn clicked (#5908)
 - feat(core): Support a date constraint on trigger parameters (#5907)
 - chore(google): bump google module to 0.0.4 (#5905)
 - feat(pipeline_templates): Display "Force Rebake" checkbox for MPT (#5854)
 - fix(docker): fix binding of `handleRefreshImages` method #3514
 - chore(kubernetes): bump package to 0.0.19 (#5898)
 - chore(core): Bump to 0.0.280 (#5897)
 - feat(appengine): unflag container image url deployments (#5894)
 - feat(stages/evaluatevariables): Using lodash.defaultsDeep instead (#5896)
 - feat(stages/evaluatevariables): Default failOnFailedExpressions to true (#5895)
 - refactor(core/projects): Convert projects header and configuration to react (#5886)
 - fix(provider/cf): ensure regions are initialized before rendering
 - fix(lint): prefer-object-spread false positive
 - feat(provider/appengine): enable artifacts as config files (#5888)
 - chore(aws): bump to 0.0.129
 - fix(providers/aws): fix deletionProtection not being checked when enabled
 - feat(stages/evaluatevariables) Add UI for Evaluate Variables stage (#5871)
 - feat(core/projects): Add a FormikApplicationsPicker react component (#5883)
 - chore(*): bump yarn minimum version to 1.10.0 (#5890)
 - chore(core): bump package version
 - chore(core): bump to 0.0.278
 - feat(core/presentation): add onBlur to react-select-input (#5887)
 - chore(aws): bump to 0.0.128 (#5889)
 - feat(provider/aws): allow editing of idle timeout and deletion protection
 - feat(core/presentation): Add ReactSelectInput component (#5882)
 - fix(provider/cf): fix deploy stage configuration from existing server group
 - fix(kubernetes): fix trailing whitespace (#5881)
 - feat(kubernetes): ad-hoc enable/disable server groups (#5880)
 - feat(artifacts): infer kind from type if kind is not available (#5879)
 - fix(core/modal): Deep merge `errors` object (#5877)
 - chore(titus): bump to 54
 - refactor(provider/cf): rename deleteService to destroyService
 - feat(appengine): move config template into html file (#5870)
 - fix(tasks): Have minimum progress bar when task fails on first step (#5867)
 - fix(chaos): Fix mean and min mins (#5866)
 - docs(core/presentation): Add doc for the validate prop
 - feat(artifacts): Add execution artifacts tab to findArtifactsFromResourceStage (#5865)
 - chore(core): bump to 277 (#5864)
 - fix(kubernetes): add support for json patch
 - refactor(core/presentation): Switch from separate 'error', 'warning', 'preview' props to 'validationMessage' and 'validationStatus' Refactor Expression Inputs and switch to 'validationMessage'
 - refactor(core/presentation): Refactor Expression Form Fields to use new API/Components
 - refactor(core/presentation): Refactor form inputs and layouts for better composability and reuse. - Introduce <CurrentForm render={formikProps => { render the form values }} /> component - Introduce <FormField/> and <FormikFormField/> components with render props - Remove 'formikField' HOC in favor of <FormikFormField/> - Remove TextField in favor of using <FormikFormField input={TextInput} /> - Rename BasicLayout to StandardFieldLayout
 - fix(buildModules): switch to nvm install [version]
 - fix(provider/cf): fix environment variable definition for CF deployment (#5862)
 - fix(provider/cf): fix environment variable definition for CF deployments
 - fix(buildModules): switch to nvm install [version]
 - fix(amazon): Fixed cloning security group across accounts (#5858)
 - fix(core/account): Fixed AccountSelectField missing state initialization (#5860)
 - fix(buildModules): Temporarily add set -x
 - fix(core/pipeline): Do not explode when `buildInfo` is missing in previous execution (#5859)
 - chore(aws): bump to 0.0.127
 - chore(kayenta): bump version to 0.0.62
 - fix(aws): Http healthchecks for NLBs
 - fix(bake): Execution details Rebake was always false when force rebaking
 - refactor(*): Replace all uses of wrapped AccountSelectField with react version (#5832)
 - feat(rollback): Support wait before disable during an orchestrated rollback (#5851)
 - feat(webhook): show status code and response body (#5850)
 - fix(kubernetes): hide copy manifest button if source type is artifact (#5849)
 - fix(kubernetes): filter results, update when account changes (#5848)
 - chore(core): bump package to 0.0.276 (#5847)
 - feat(core): skip stage button (#5835)
 - fix(bakery/oracle): use read-only text field for bake region (#5846)
 - fix(kubernetes): fix saving of kubernetes yaml patches (#5838) (#5845)
 - fix(kubernetes): fix saving of kubernetes yaml patches (#5838)
 - fix(bakery/oracle): use read-only text field for bake region (#5843)
 - refactor(core/account): Cleanup react account select field (#5840)
 - fix(deck): Change Build Stage description (#5839)
 - chore(titus): Bump to 0.0.53 (#5842)
 - chore(kayenta): bump package to 0.0.60 (#5826)
 - fix(titus/deploy): Support extra characters in detail field
 - chore(titus): Bump to 0.0.52
 - chore(docker): Bump to 0.0.19
 - fix(titus/deploy): Account selector set both account and credentials
 - feat(docker/image): Show current value while loading
 - fix(provider/cf): create servergroup ux improvements (#5834)
 - chore(titus): Bump to 0.0.51
 - chore(core): Bump to 0.0.275
 - chore(docker): Bump to 0.0.18
 - fix(titus/runJob): Fix account selector from incorrectly changing account
 - fix(docker): Appropriately handle when organization does not exist
 - refactor(core/account): Create react version of AccountSelectField
 - fix(provider/cf): create servergroup ux improvements
 - fix(titus/deploy): Fix changing repository and tag affecting imageid
 - feat(provider/kubernetes): split kubernetes pod logs by container (#5824)
 - refactor(google): switch var to let/const (#5819)
 - fix (core/deploy): Fix rolling red black pipeline selector and add number button
 - chore(titus): bump to 0.0.49 (#5823)
 - fix(titus/deploy): fix parameterized imageId fix (#5822)

#### Echo  - a568cf9...22a704d
 - fix(pipelines): Pass resolveArtifacts = true to plan endpoint (#427) (#428)
 - fix(jenkins): Fix encoding of Jenkins URL (#421) (#423)
 - fix(core): Fix auth propagation for manual triggers (#418) (#420)
 - fix(MPT): Fix manual triggering of templated pipelines (#419)
 - fix(artifacts): Fix artifact population in manual triggers (#414) (#416)
 - fix(artifacts): Fix artifact population in manual triggers (#414) (#415)
 - chore(dependencies): Autobump spinnaker-dependencies (#409) (#410)
 - Revert "fix(triggers): Fix triggered pipeline template artifact resolution." (#403) (#404)
 - fix(core): Don't retry pipeline initiation when receiving a 400 (#402)
 - feat(artifacts): Add classifier to jar artifact (#401)
 - chore(dependencies): Autobump spinnaker-dependencies (#400)
 - feat(artifacts): Use property to select template (#399)
 - fix(triggers): Fix triggered pipeline template artifact resolution. (#398)
 - fix(triggers): Fix triggered pipeline template artifact resolution. (#397)
 - chore(dependencies): Autobump spinnaker-dependencies (#395)
 - fix(builds): Adds init-publish to Echo's dockerfile (#396)
 - feat(swabbie): add create time of resource to email (#394)
 - feat(core): Add functionality for artifact-extracting Jinja templates (#393)
 - chore(swabbie): update subject line (#392)
 - chore(dependencies): Autobump spinnaker-dependencies (#386)
 - fix(metrics): second attempt at a front50.lastPoll meter (#391)
 - refactor(rx): remove RxJava from scheduler and pipeline poller (#389)
 - feat(core): Add pipeline post-processor functionality (#380)
 - config(front50): make the polling frequency a configurable property (#390)
 - fix(quietPeriod): check in cron catchup (#388)
 - chore(build): build on openjdk8 (#387)
 - fix(swabbie): email logo link (#385)
 - feat(swabbie): adds notification email design (#384)
 - fix(MPT): Fixes templated pipeline triggers from Echo. (#383)
 - Update README.md (#382)
 - fix(build): Fixed Dockerfile for composite builds. (#381)
 - fix(quietperiods): case insensitive trigger type compare (#379)
 - fix(quietperiods): remove conditional bean (#378)
 - feat(swabbie): email template shows last seen info (#372)
 - feat(quiet-periods): optionally supress auto-triggers during quiet periods (#377)
 - chore(dependencies): Autobump spinnaker-dependencies (#376)
 - fix(builds): Add spring data rest dependency to fix build. (#375)
 - chore(builds): Introduces composite builds via gradle plugin. (#374)
 - refactor(core): Clean up echo-pipelinetriggers dependencies (#373)
 - fix(notification/githubStatus) api url for github.com and response format (#360)
 - refactor(core): Split pipeline matching and triggering logic (#369)
 - fix(MPT): Fix NPE in pipeline initiator (#371)
 - fix(MPT): Fix templated pipeline triggers. (#370)
 - refactor(core): Improve interface of PipelineInitiator
 - refactor(core): Autowire PipelineInitiator
 - chore(dependencies): Autobump spinnaker-dependencies
 - chore(dependencies): Autobump spinnaker-dependencies (#366)
 - chore(dependencies): Autobump spinnaker-dependencies (#364)
 - refactor(core): Convert echo-web to Java
 - feat(echo): new notification type: Github status check (#344)
 - refactor(core): Remove some RxJava from TriggerMonitor
 - fix(core): Ensure event processing occurs in the same thread
 - feat(core): Front50 graphql client (#357)
 - chore(dependencies): Autobump spinnaker-dependencies (#356)
 - chore(dependencies): Autobump spinnaker-dependencies (#355)
 - feat(cron): only query execution history for eligible triggers (#353)
 - chore(dependencies): Autobump spinnaker-dependencies (#352)
 - style(core): Add comments and re-order fields in Trigger.java (#350)
 - chore(dependencies): Autobump spinnaker-dependencies (#351)

#### Fiat  - 83a7ef2...71ce645
 - chore(google): Update google API dependencies (#317) (#319)
 - chore(dependencies): Autobump spinnaker-dependencies (#298) (#300)
 - chore(dependencies): Autobump spinnaker-dependencies (#294)
 - fix(sync): Resolve service accounts without role provider calls. (#292)
 - Revert "fix(sync): Stop syncing service accounts in roleProvider (#289)" (#293)
 - Revert "fix(sync): Stop syncing service accounts in roleProvider" (#291)
 - chore(dependencies): Autobump spinnaker-dependencies (#290)
 - fix(sync): Stop syncing service accounts in roleProvider (#289)
 - fix(sync): Stop syncing service accounts in roleProvider (#288)
 - chore(dependencies): Autobump spinnaker-dependencies (#286)
 - chore(build): build on openjdk8 (#287)
 - chore(docs): Fix Readme (#285)
 - chore(dependencies): spinnaker-gradle-plugin 5.2.1 (#284)
 - chore(dependencies): Autobump spinnaker-dependencies (#283)
 - * feat(build): Modular builds for Fiat (#282)
 - chore(builds): Introduces composite builds via gradle plugin. (#281)
 - chore(dependencies): Autobump spinnaker-dependencies (#280)
 - chore(dependencies): Autobump spinnaker-dependencies (#279)
 - chore(dependencies): Autobump spinnaker-dependencies (#278)
 - fix(ldap): Return mutable list to support "addAll" operation (#269) (#270)
 - config(okhttp): kork-web-2.3.0 adds the metrics interceptor by default (#273)
 - chore(dependencies): Autobump spinnaker-dependencies (#272)
 - chore(dependencies): Autobump spinnaker-dependencies (#271)
 - fix(ldap): Return mutable list to support "addAll" operation (#269)
 - chore(dependencies): Autobump spinnaker-dependencies (#268)
 - chore(dependencies): Autobump spinnaker-dependencies (#267)

#### Front50  - 98b4ab9...129b407
 - Fix missing jars release 1.11.x (#426)
 - fix(storage/oracle): add private key passphrase (#401)
 - chore(dependencies): Autobump spinnaker-dependencies (#404) (#406)
 - chore(build): Bump dev plugin to 5.2.2 (#399)
 - chore(dependencies): Autobump spinnaker-dependencies (#398)
 - chore(dependencies): Autobump spinnaker-dependencies (#396)
 - chore(dependencies): Autobump spinnaker-dependencies (#394)
 - chore(build): build on openjdk8 (#395)
 - chore(dependencies): Autobump spinnaker-dependencies (#392)
 - chore(builds): Introduces composite builds via gradle plugin. Removes spring boot plugin (#391)
 - feat(MPTv2): Adds list dependents for v2 templates. (#390)
 - feat(graphql): Additional trigger filtering (#388)
 - feat(MPTv2): Adds list op by scope for templates. (#389)
 - feat(MPTv2): Adds delete op for v2 templates. (#387)
 - feat(MPTv2): Adds MPT v2 template update op. (#385)
 - chore(dependencies): Autobump spinnaker-dependencies (#386)
 - chore(dependencies): Autobump spinnaker-dependencies (#384)
 - chore(dependencies): Autobump spinnaker-dependencies (#383)
 - feat(MPTv2): Create and delete individual v2 templates. (#378)
 - fix(s3/web): Fix s3 TCK tests (#380)
 - fix(storage/oracle): add private key passphrase (#379)
 - fix(web): Support unrestricted fetching of `/applications` (#375)
 - feat(MPTv2): Stubs MPT v2 controllers. (#376)
 - chore(retrofit): remove unused RetrofitConfig (#370)
 - docs(*): Remove Cassandra from Readme (#372)
 - fix(web): Fix startup failure due to graphql (#371)
 - fix(s3): Add control over nb of objects retrieved per batch (maxKeys) (#367)
 - fix(s3): Add control over nb of objects retrieved per batch (maxKeys) (#364)
 - feat(web): Experimental graphql endpoint (#360)
 - chore(dependencies): Autobump spinnaker-dependencies (#369)
 - chore(dependencies): Autobump spinnaker-dependencies (#368)
 - chore(dependencies): Autobump spinnaker-dependencies (#363)
 - chore(dependencies): Autobump spinnaker-dependencies (#362)

#### Gate  - a8bb998...b83dea9
 - Revert "fix(web): require application write permission to start a pipeline (#633)" (#657) (#687)
 - chore(dependencies): Autobump spinnaker-dependencies (#680) (#683)
 - fix(pipelines): make pipelineConfigIds and executionIds params optional on /executions (#674)
 - feat(pipelines): add executionIds, expand params to /pipelines endpoint (#673)
 - fix(clean): fix opt out message (#672)
 - chore(dependencies): Autobump spinnaker-dependencies (#671)
 - fix(core): Add type parameter to ListCommand (#670)
 - feat(clean): expose list of marked and deleted (#668)
 - fix(dependencies): Fix compile static error while bumping spinnaker-depencies version (#667)
 - fix(swabbie): return json not html (#666)
 - fix(ldap): Explicitly add the HTTP basic username/pw before the LDAP auth config. (#664)
 - fix(iap/basicauth): Configure the BasicAuth auth manager for IAP. (#662) (#663)
 - fix(iap/basicauth): Configure the BasicAuth auth manager for IAP. (#662)
 - chore(dependencies): Autobump spinnaker-dependencies (#660)
 - chore(build): build on openjdk8 (#661)
 - fix(provider/cf): fetch services on a per-region basis
 - feat(build): Introduces modular builds for Gate (#654)
 - fix(cleanup): exposing as GET, updating response (#655)
 - refactor(auth): Split auth providers into their own modules (#653)
 - refactor(auth/iap): Extract IAP to its own module (#650)
 - refactor(auth): Move multi-auth support to a common interface (#649)
 - chore(dependencies): Autobump spinnaker-dependencies (#648)
 - refactor(auth): Move security into its own module (#645)
 - fix(builds): Upgrade jedis library (spring boot plugin was doing this for us previously (#647)
 - chore(builds): Introduces composite builds via gradle plugin (#646)
 - feat(MPTv2): Adds list dependents for v2 templates. (#644)
 - feat(MPTv2): Adds list op for v2 templates. (#643)
 - feat(swabbie): html endpoints for optOut and restore (#634)
 - fix(web): request to clouddriver for applications should be unrestricted (#642)
 - feat(MPTv2): Switches delete path to v2. (#641)
 - feat(MPTv2): Adds update op for v2 templates. (#639)
 - chore(dependencies): Autobump spinnaker-dependencies (#640)
 - chore(dependencies): Autobump spinnaker-dependencies (#638)
 - chore(dependencies): Autobump spinnaker-dependencies (#637)
 - feat(MPTv2): Adds create and delete for v2 templates. (#635)
 - fix(web): require application write permission to start a pipeline (#633)
 - feat(MPTv2): Stubs MPT v2 controllers. (#630)
 - feat(web): Serve `/applications` out of the recent cache (#629)
 - Revert "feat(web): Serve `/applications` out of the recent cache (#603)" (#627) (#628)
 - Revert "feat(web): Serve `/applications` out of the recent cache (#603)" (#627)
 - fix(web): Update log message (#624)
 - fix(web): Avoid unnecessary calls to `jedisPool.getResource()` (#623)
 - feat(web): Support rate limits per source application (#619)
 - chore(dependencies): Autobump spinnaker-dependencies (#622)
 - chore(dependencies): Autobump spinnaker-dependencies (#621)
 - feat(web): Avoid shedding 'OPTIONS' requests (#620)
 - feat(canary-v2): add ad-hoc/manual execution endpoint (#618)
 - fix(web): Short-circuit calls to '/execuctions' w/o 'pipelineConfigIds' (#617)
 - chore(dependencies): Autobump spinnaker-dependencies (#615)
 - chore(dependencies): Autobump spinnaker-dependencies (#614)

#### Igor  - a4fd897...0b3a637
 - chore(dependencies): Autobump spinnaker-dependencies (#338) (#339)
 - fix(jenkins): replace SimpleXML with Jackson for XML deserialization (#333)
 - chore(dependencies): Autobump spinnaker-dependencies (#334)
 - fix(travis): grace period before triggering with new travis builds
 - fix(jenkins): try to be better at closing input streams (#332)
 - chore(dependencies): Autobump spinnaker-dependencies (#329)
 - chore(dependencies): Autobump spinnaker-dependencies (#327)
 - feat(core): Apply artifact filtering in Igor (#321)
 - chore(build): build on openjdk8 (#328)
 - feat(jenkins): Instrument jenkins clients (#326)
 - chore(builds): Introduces composite builds via gradle plugin. (#324)
 - chore(dependencies): Autobump spinnaker-dependencies (#323)
 - chore(dependencies): Autobump spinnaker-dependencies (#322)
 - chore(dependencies): Autobump spinnaker-dependencies (#320)
 - fix(artifacts/rpm): the generated version should be complete (#316)
 - fix(travis): Keep artifacts unique (#298)
 - fix(travis): Make artifact decorator optional (#310)
 - chore(dependencies): Autobump spinnaker-dependencies (#309)
 - chore(dependencies): Autobump spinnaker-dependencies (#308)
 - chore(dependencies): Autobump spinnaker-dependencies (#307)
 - chore(*): Reduce logging noise; convert some logs to metrics (#306)
 - chore(dependencies): Autobump spinnaker-dependencies (#305)

#### Kayenta  - 9690617...8a49a32
 - fix(redis): Fix up redis configuration so it works with latest orca. (#455)
 - fix(orca): Bump orca to 6.119.0 to resolve redis evalsha issue. (#450) (#454)
 - fix(orca): Bump orca to 6.119.0 to resolve redis evalsha issue. (#450) (#453)
 - chore(dependencies): Autobump spinnaker-dependencies (#438) (#442)
 - feat(prometheus): add customInlineTemplate logic to enable metric-specific PromQL queries (#433) (#435)
 - chore(dependencies): Autobump spinnaker-dependencies (#432)
 - fix: don't set parentPipelineExecutionId to ad-hoc (#429)
 - fix: fix NPE in map (#428)
 - feat(config): Allow metrics to be specified as must have data. (#421)
 - fix: remove no-parent-pipeline-execution dummy value (#427)
 - Add more retries to more components (#423)
 - chore(dependencies): Autobump spinnaker-dependencies (#422)
 - feat(newrelic): implemention for newrelic insights as a metrics store (#412)
 - chore(dependencies): Autobump spinnaker-dependencies (#416)
 - chore(build): build on openjdk8 (#417)
 - refactor: Add ability to supply application and parentPipelineId to adhoc canary endpoint (#415)
 - refactor: Add additional constructors to CanaryExecutionResponse and CanaryExecutionStatusResponse, so that they can be deserialized by Jackson in a retrofit service (#414)
 - fix(signalfx): Fixed bug where an orphaned 'and' is added to the SignalFx SignalFlow program if no extra query pairs are added to the scope. (#413)
 - chore(dependencies): Autobump spinnaker-dependencies (#409)
 - fix(orchestration): Fix earlier context lookup change that was inadvertantly a breaking change. (#410)
 - feat(judges): First pass at support for exercising pairs of judges on canned data. (#408)
 - chore(builds): Introduces composite builds via gradle plugin (#407)
 - chore(builds): Reformat spinnaker deps version (#389)
 - feat(datadog): Add support for metric name typeahead. (#406)
 - feat(datadog): Add dryRun support. (#405)
 - feat(stackdriver): Add dryRun support. (#404)
 - feat: Add SSL support to jedis config (#396)
 - feat(prometheus): Expose dryRun option via fetch/development controller. (#402)
 - fix(templates): Populate template bindings from metric query config in addition to canary scope. (#401)
 - feat(prometheus): Add support for complete PromQl expressions. (#400)
 - feat(prometheus): Move resourceType from canary scope to query config. (#399)
 - fix(metadata): make metadata work in a canary request (#398)
 - chore(signalfx): Fix typo. (#397)
 - feat(signalfx): Add SignalFx integration (#385)
 - fix(judge): Return a reason when a metric is classified as Nodata (#392)
 - fix(redis): Add newly-required redis.connection property to config. (#394)
 - chore(dependencies): update spinnaker-dependencies (#391)
 - fix(configbin): Add retry support for queries (#390)

#### Orca  - 7b1f06a0...352222d11
 - fix(pipelines): Add expected artifacts to pipeline template spec (#2577) (#2621)
 - feat(urlRestrictions): Add urlRestrictions.rejectedIps flag to blacklist IPs/IP ranges from webhook calls and SpEL jsonFromUrl, propertiesFromUrl, and fromUrl calls. (#2591) (#2594)
 - fix(scaleDown): Fixes scaleDown task for autoscaled gce mig. (#2588) (#2590)
 - fix(pipelines): Allow caller to specify whether to resolve artifacts (#2579)
 - chore(dependencies): bump keiko version (#2573) (#2574)
 - fix(triggers): Handle explicitly null container fields in triggers (#2545) (#2547)
 - fix(triggers): Handle explicitly null container fields in triggers (#2545) (#2546)
 - fix(instrumentation): Remove temporary instrumentation. (#2556)
 - fix(instrumentation): Temporarily add instrumentation to help troubleshoot build failures. (#2553)
 - chore(dependencies): Autobump spinnaker-dependencies (#2544) (#2548)
 - fix(webhooks): Add enabled flag for webhook trust (#2536) (#2537)
 - fix(provider/kubernetes): manifest refresh is retryable (#2530) (#2531)
 - fix(MPT): Always resolve artifacts (#2510) (#2528)
 - fix(artifacts): Use client error return code for missing artifacts (#2524)
 - feat(tasks): add expand flag and executionIds param to /pipelines endpoint (#2522)
 - chore(dependencies): Autobump spinnaker-dependencies (#2521)
 - feat(swabbie): do not monitor delete image (#2520)
 - feat(webhooks): Allow a custom trust store for webhooks (#2517)
 - refactor(artifacts): Remove build artifact filtering from orca (#2503)
 - chore(provider/kubernetes): Add spectator metrics to ManifestForceCacheRefreshTask (#2515)
 - fix(clouddriver): Avoid NPE in terminate and decrement server group task (#2519)
 - feat(MPTv2): Adds v2 config and template validation in /orchestrate. (#2516)
 - fix(findImage): make both find image task timeouts overridable (#2518)
 - fix(authz): Remove service account with no roles from triggers. (#2514)
 - fix(admin): Allow admin users to save service accounts (#2513)
 - feat(traffic-guards): consider capacity ratio (#2509)
 - fix(sql): fix searchForPipelineExecutionsByTriggerUsingGET for sql (#2512)
 - feat(provider/kubernetes): dynamic scale/delete/find (#2511)
 - chore(dependencies): Autobump spinnaker-dependencies (#2508)
 - fix(MPT): Fix templating pipeline triggering. (#2480) (#2507)
 - feat(webhook): accept PATCH method (#2490)
 - fix(rollingPush): ensure context resets on task loop (#2506)
 - fix(authz): Use pipeline ids for managed service account names. (#2501) (#2504)
 - fix(instance termination): handle missing instances (#2505)
 - Fix canary stage timing issues (#2502)
 - fix(authz): Use pipeline ids for managed service account names. (#2501)
 - chore(dependencies): Autobump spinnaker-dependencies (#2497)
 - fix(sql): make additionalChangeLogs mutable (#2500)
 - fix(terminateInstances): handle nulls in instanceIds list
 - chore(build): latest spinnaker-gradle version and gradle 4.10.2
 - chore(build): build on openjdk8 (#2498)
 - fix(expressions): expressions in top level stage planning. (#2495)
 - fix(delete image): make timeout overridable (#2496)
 - fix(core): sets cloud provider type on ephemeral server group poller (#2494)
 - feat(MPTv2): V2 template loader handler in /orchestrate. (#2493)
 - fix(configurationAccountName): propagate (#2491)
 - feat(gce): Adds stage for modifying autoscaling policies. (#2488)
 - chore(dependencies): Autobump spinnaker-dependencies (#2487)
 - chore(builds): Forgot installViaTravis script (#2486)
 - config(retrofit): enable retries on HTTP 503 responses (#2484)
 - chore(builds): Introduces composite builds via gradle plugin. Removes spring boot plugin. (#2485)
 - fix(spring): Wire up force cancel command manually (#2483)
 - feat(provider/appengine): resolve and pass through config file artifacts (#2482)
 - feat(web): Force cancel admin command (#2481)
 - fix(MPT): Fix templating pipeline triggering. (#2480)
 - feat(sql): Expose config for paged iterator batch size (#2452)
 - fix(tasks): Enforce consistent application task ordering (#2478)
 - fix(queue): only push ContinueParentStage message if not in unacked (#2479)
 - refactor(provider/cf): rename deleteService to destroyService
 - feat(MPTv2): Adds delete op for v2 templates. (#2474)
 - fix(queue): remove max attempts from CompleteExecution (#2477)
 - feat(provider/kubernetes): dynamic enable/disable (#2476)
 - feat(stage): evaluate variables stage (#2469)
 - feat(MPTv2): Adds update op for MPT v2 templates. (#2472)
 - chore(dependencies): Autobump spinnaker-dependencies (#2473)
 - fix(orchestrate/failure): Log a warning message when failing orchestration (#2471)
 - chore(dependencies): Autobump spinnaker-dependencies (#2470)
 - chore(dependencies): Autobump spinnaker-dependencies (#2468)
 - feat(MPTv2): Adds create task for v2 templates. (#2465)
 - feat(provider/kubernetes): enable/disable manifest (#2466)
 - fix(MPTv2): Differentiate v1 and v2 paths. (#2464)
 - feat(MPTv2): Stub MPT v2 controllers. (#2463)
 - fix(task): remove unused import (#2462)
 - chore(clouddriver): Reduce log levels for JarDiffsTask (#2461)
 - fix(rollingPush): reset start time (#2457)
 - feat(clouddriver): Add configurable upsert image tags timeout (#2460)
 - fix(artifacts/trigger/buildInfo): This makes rpms supported (#2458)
 - feat(rollback): Support wait before disable during an orchestrated rollback (#2456)
 - feat(webhooks): adds webhook.statusCodeValue (#2453)
 - feat(core): manually skip a stage (#2445)
 - fix(core): Fix http client wrapper by honouring proxy system properties if they are set (#2438)
 - config(okhttp): don't apply redundant properties from latest kork (#2448)
 - chore(dependencies): Autobump spinnaker-dependencies (#2446)
 - fix(locking): more guards around locking (#2444)
 - chore(dependencies): Autobump spinnaker-dependencies (#2443)
 - chore(queue): Add kv logs for zombie executions (#2442)
 - fix(front50): Default handling for any retrofit exceptions (#2440)
 - chore(dependencies): Autobump spinnaker-dependencies (#2439)
 - chore(dependencies): Autobump spinnaker-dependencies (#2437)

#### Rosco  - 2f1a4f8...0e336fc
 - fix(packer): Fix spot pricing flags (#310) (#311)
 - chore(dependencies): Autobump spinnaker-dependencies (#307) (#308)
 - chore(dependencies): Autobump spinnaker-dependencies (#305)
 - chore(dependencies): Autobump spinnaker-dependencies (#304)
 - chore(dependencies): Autobump spinnaker-dependencies (#303)
 - fix(bakery/oracle): private key passphrase is optional (#302)
 - chore(packer): upgrade packer binary to 1.3.1 (#300)
 - chore(dependencies): Autobump spinnaker-dependencies (#301)
 - chore(builds): Introduces composite builds via gradle plugin. Removes spring boot gradle plugin. (#299)
 - chore(dependencies): Autobump spinnaker-dependencies (#298)
 - chore(dependencies): Autobump spinnaker-dependencies (#297)
 - chore(dependencies): Autobump spinnaker-dependencies (#296)
 - fix(bakery/oracle): add private key passphrase (#294)
 - chore(dependencies): Autobump spinnaker-dependencies (#291)
 - chore(dependencies): Autobump spinnaker-dependencies (#290)
 - chore(dependencies): Autobump spinnaker-dependencies (#289)
 - chore(dependencies): Autobump spinnaker-dependencies (#288)
