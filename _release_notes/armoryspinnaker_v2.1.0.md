---
layout: post
title: v2.1.0 Armory Release
order: -20181226230826
hidden: false
---

# 12/26/18 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
There's currently no known issues with this release.

## Highlighted Updates
### Armory
No notable changes.

###  Spinnaker Community Contributions
This release adds:
- support for high availability setup (Clouddriver read-only(-deck), caching, read-write, Echo scheduler and worker),
- support for Pivotal Cloudfoundry provider,
- multiple performance improvements.


### Breaking Changes
If you're using Github Enterprise for authorization, you'll need to add the `/api/v3/` suffix to your domain name (see [here](https://www.spinnaker.io/community/releases/versions/1-10-2-changelog#version-1-10))

## Detailed Updates

### version.manifest
Here's the version.manifest for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>export jenkins_build_number=2552
export packager_version=ac50da7
export oss_release_type=stable
export armoryspinnaker_version=2.1.0-rc2552
export armoryspinnaker_version_manifest_url=https://s3-us-west-2.amazonaws.com/armory-web/install/release/armoryspinnaker-v2.1.0-rc2552-version.manifest
export fiat_version=release-1.10.x-83a7ef2
export front50_version=release-1.10.x-98b4ab9
export igor_version=release-1.10.x-a4fd897
export rosco_version=release-1.10.x-2f1a4f8
export clouddriver_version=release-1.10.x-863271e
export spinnaker_monitoring_version=release-1.10.x-4a87d20
export lighthouse_version=2a93314
export barometer_version=64a613c
export configurator_version=master-0db688c
export dinghy_version=master-d861f34
export platform_version=master-30ccd55
export gate_armory_version=01034e4-release-1.10.x-a8bb998
export gate_version=release-1.10.x-a8bb998
export echo_armory_version=0052e0f-release-1.10.x-a568cf9
export echo_version=release-1.10.x-a568cf9
export kayenta_armory_version=429b739-release-1.10.x-788433f
export kayenta_version=release-1.10.x-788433f
export orca_armory_version=f4ebde1-release-1.10.x-7b1f06a0
export orca_version=release-1.10.x-7b1f06a0
export deck_armory_version=8ef4883-release-1.10.x-9fb2a65
export deck_version=release-1.10.x-9fb2a65
export deck_artifacts_url=https://s3-us-west-2.amazonaws.com/armory-artifacts/spinnaker/deck/spinnaker-deck-release-1.10.x-9fb2a65.tgz
</code>
</pre>
</details>



### Armory
#### Lighthouse&trade; - 2a93314
No Changes

#### Dinghy&trade; - d861f34
No Changes

#### Platform&trade; - 30ccd55
No Changes

#### Armory Echo  - 0052e0f
No Changes

#### Armory Deck  - 74c964c...8ef4883
No Changes

#### Armory Gate  - 01034e4
No Changes

#### Armory Kayenta  - 429b739
No Changes

#### Packager - 317d7e7...ac50da7
No Changes

###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release:
- [Spinnaker's v1.10.0](https://www.spinnaker.io/community/releases/versions/1-10-0-changelog#changelog)
- [Spinnaker's v1.10.1](https://www.spinnaker.io/community/releases/versions/1-10-1-changelog#changelog)
- [Spinnaker's v1.10.2](https://www.spinnaker.io/community/releases/versions/1-10-2-changelog#changelog)
- [Spinnaker's v1.10.3](https://www.spinnaker.io/community/releases/versions/1-10-3-changelog#changelog)
- [Spinnaker's v1.10.4](https://www.spinnaker.io/community/releases/versions/1-10-4-changelog#changelog)
- [Spinnaker's v1.10.5](https://www.spinnaker.io/community/releases/versions/1-10-5-changelog#changelog)
- [Spinnaker's v1.10.6](https://www.spinnaker.io/community/releases/versions/1-10-6-changelog#changelog)

#### Clouddriver  - a148701...863271e
 - fix(provider/gce): Set device name on attached disks. (#3159) (#3165)
 - fix(provider/kubernetes): consult kind list for crd caching (#3144) (#3146)
 - Patch 1.10.x (#3104)
 - fix(provider/gce): Fix autoscaling mode parsing. (#3088) (#3092)
 - fix(ha): Add clouddriver-ro-deck.yml halconfig. (#3033) (#3085)
 - fix(provider/ecs): Rename ResizeServiceAtomicOperationConverter component name so it doesn't conflict with resizeServerGroup atomic operation (#3078)
 - fix(provider/kubernetes): associate ingress w/ app (#3069) (#3071)
 - fix(provider/gce): Include sourceImages for all disks in clone. (#3067)
 - fix(provider/kubernetes): role & roleBinding are namespaced (#3052) (#3053)
 - fix(provider/cf): fix route definitions for CF manifest-based deployments
 - feat(provider/cf): caching agent backwards compatible to CAPI 2.94.0/3.29.0
 - fix(artifacts/gcs): fix version resolution (#3020) (#3021)
 - chore(builds): Reformat spinnakerDependenciesVersion (#3012)
 - chore(provider/titus): excludes generated files from javadocs and license header check (#3010)
 - chore: license headers (#3009)
 - feat(provider/titus): don't cache pending scaling policies (#3008)
 - perf(core): Attempted move away from fetching _every_ possible Project cluster (#3005)
 - fix(provider/titus): fix retry logic when getting duplicate job ids (#3004)
 - fix(providers/amazon): f1.4xlarge block device mapping (#3002)
 - feat(provider/ecs): Use secrets from Secrets Manager for the ECS dockâ€¦ (#2998)
 - feat(provider/kubernetes): make checking permissions optional on startup (#3000)
 - fix(provider/kubernetes): validate kind on edit (#2999)
 - chore(core): Add TaskRepositoryTck (#2997)
 - feat(provider/kubernetes): first pass at disable (#2996)
 - fix(provider/gce): Index public COS images. (#2995)
 - fix(config): Move core config to clouddriver.config package (#2994)
 - feat(artifact/oracle): Added oracle artifact. (#2990)
 - fix(provider/gce): Filter instance caching by location. (#2991) (#2992)
 - fix(provider/gce): Filter instance caching by location. (#2991)
 - feat(provider/kubernetes): attach lb during deploy (#2988)
 - fix(provider/kubernetes): fix FCR for cluster-scoped resources w/ namespace (#2985) (#2989)
 - fix(provider/kubernetes): fix FCR for cluster-scoped resources w/ namespace (#2985)
 - fix(provider/kubernetes): ignore cluster-scoped namespace lookup (#2984) (#2987)
 - fix(core): Handle projects in `allowList` that may not actually exist (#2986)
 - fix(provider/kubernetes): ignore cluster-scoped namespace lookup (#2984)
 - refactor(google): Remove Task as a paramter for doRetry (#2981)
 - fix(aws): Retries around security group tagging (#2982)
 - refactor(provider/kubernetes): remove unused relationships (#2980)
 - feat(provider/cf): Open Service Broker model and operations
 - fix(provider/kubernetes): don't return all related types from search (#2979)
 - feat(proivder/kubernetes): allow custom resource scope config (#2978)
 - fix(provider/kubernetes): fix admission kind scopes (#2977)
 - fix(google): Stop retrying if allowable error encountered.
 - fix(appengine): defer to configured project when using ADC (#2936)
 - fix(google): Fix error to include missing load balancers. (#2973)
 - Revert "chore(*): Update PULL_REQUEST_TEMPLATE.md - put reviewers mention in (#2974)" (#2975)
 - chore(*): Update PULL_REQUEST_TEMPLATE.md - put reviewers mention in (#2974)
 - fix(appengine): defer to configured project when using ADC (#2937)
 - fix(provider/kubernetes): sane namespace lookup (#2972)
 - feat(provider/kubernetes): support PodPreset, PodSecurityPolicy (#2971)
 - fix(provider/ecs): fetch all images for ECR repos with >100 images (#2948)
 - feat(provider/kubernetes): v2 admission controllers (#2969)
 - fix(provider/oracle): remove oci-java-sdk-full-shaded from classpath (#2967)
 - fix(project): Send lastPush in json responses (#2968)
 - fix(provider/titus): don't load rules when resolving security group names and ids (#2964)
 - feat(provider/ecs): Added support for environment variables (#2961)
 - style(provider/cf): fix license headers (#2963)
 - feat(cats/search): Enable substring matching for instance search (#2923)
 - feat(provider/dcos): update healthcheck to use AlwaysUpHealthIndicator class (#2894)
 - fix(provider/titus): more logging around security group lookup (#2962)
 - feat(provider/ecs): Added LogDriver, LogOptions and DockerLabels (#2946)
 - fix(core): Front50 perf; separate normalized allow list method (#2960)
 - feat(provider/cf): add deploy, server group, and load balancer operations (#2957)
 - fix(provider/titus): Add more logs on deployment timings (#2959)
 - fix(core): Make project clusters caching optional (#2958)
 - fix(provider/kubernetes): Improved log output from KubernetesOperationException (#2956)
 - fix(core): Handle null jenkins build info (#2955)
 - perf(core): Moving project clusters generation to a caching agent (#2949)
 - Fix titus jobs (#2954)
 - fix(provider/titus): avoid resolving asg name and scaling policy copy / loadBalancer for jobs (#2953)
 - fix(provider/gce): set autoscaling cap before target size in deploys. (#2952)
 - fix(provider/gce): set autoscaling cap before target size in deploys. (#2951)
 - fix(provider/titus): need to retry job submits on DEADLINE_EXCEEDED (#2950)
 - feat(build): Allow building only specified cloud providers (#2901)
 - fix(google): Fix bugs in pagination of caching (#2947)
 - feat(aws): allow regex filtering of instance types (#2944)
 - chore(dependencies): Bump spinnaker dependencies to 1.0.13 (#2945)
 - feat(provider/cf): API client and caching agent (#2939)
 - fix(provider/google): Fix caching of >500 forwarding rules (#2934) (#2943)
 - fix(aws): Move RoleController to clouddriver-aws (#2940)
 - feat(provider/titus): log run job requests for better traceability (#2942)
 - chore(dependencies): Bump gradle plugin to 4.3.0 (#2941)
 - refactor(provider/google): Move non-batch requests to PaginatedRequest (#2935)
 - fix(projects): remove parallel cluster lookups (#2938)
 - fix(provider/ecs): Explicitly declare dependency for ECS account mapper on ECS creds being already initialized (#2930)
 - fix(provider/google): Fix caching of >500 forwarding rules (#2934)
 - fix(provider/openstack): Use directUrl property for image location (#2912)
 - fix(ha): Fix clouddriver-ro/rw/caching service names to be camel-cased rather than hyphenated. (#2933)
 - fix(provider/ecs): Display VPC & security groups based on network config (#2921)
 - fix(aws): Handle null desired capacity in `DefaultAfterResizeEventHandler` (#2932)
 - chore(dependencies): Bump spinnaker dependencies to 1.0.10 (#2929)
 - fix(provider/oracle): upgrade to latest oci-sdk to fix many issues (#2874)
 - fix(provider/google): batch & service path must match (#2925) (#2926)
 - fix(provider/google): batch & service path must match (#2925)
 - fix(provider/ecs): Gracefully ignore zone lookup for tasks without a container instance (e.g. Fargate) (#2920)
 - chore(dependencies): Bump spinnaker dependencies to 1.0.9 (#2924)
 - fix(aws): avoid terminating instances when lifecycle hooks are present (#2919)
 - refactor(build): Depend on aws-sdk-s3 instead of the entire sdk (#2922)
 - refactor(web): clouddriver-web should not depend on cloud provider models. (#2918)
 - feat(provider/ecs): Add support for Fargate launch type (#2909)
 - feat(provider/ecs): Add server group setting for public IP address (#2908)
 - feat(provider/ecs): Added support for ENIs in the instance details view (#2881)
 - feat(deploy/ha): Add halconfig yamls for clouddriver-ro, clouddriver-rw, and clouddriver-caching. (#2914)
 - fix(core): fix error when no matching converter is found (#2915) (#2917)
 - fix(core): fix error when no matching converter is found (#2915)
 - fix(entitytags): Don't set _type field on Elasticsearch documents (#2913)
 - feat(providers/amazon): block device mappings for t3 (#2910)
 - chore(build): Bump gradle plugin version
 - fix(provider/ecs): Resolve ECS security group names (#2903)
 - fix(provider/kubernetes): reduce crd lookups when none exist (#2886) (#2887)
 - fix(build): Add a NoopSearchableProvider (#2902)
 - refactor(build): Move top level provider config to com.spinnaker.config (#2905)
 - fix(core): use snakeyaml's SafeConstructor (#2906)
 - fix(provider/ecs): Handle null startedAt field for tasks (#2904)
 - feat(provider/ecs): Support for Elastic Network Interfaces (AWSVPC networking mode) (#2852)
 - fix(provider/kubernetes): security groups are related to apps (#2893)
 - feat(titus): Add console log endpoint (#2899)
 - feat(provider/kubernetes): surface metrics (#2898)
 - feat(provider/kubernetes): cache pod metrics (#2896)
 - feat(titus): adding timestamp to deploy operation log (#2895)
 - fix(provider/aws) : adding useragent suffix (#2889)
 - chore(provider/kubernetes): helpful startup & runtime logging (#2891)
 - fix(provider/kubernetes): deployment sequence only applies to rs (#2892)
 - fix(provider/docker): Clear docker token cache after 401 (#2818)
 - fix(provider/docker): Clear docker token cache after 401 (#2888)
 - fix(openstack): error exception message while deleting server group #2885 (#2885)
 - feat(provider/aws) : adding useragent suffix
 - update null check to be explicit
 - feat(provider/dcos): accommodates changes to secrets in metronome.
 - fix(provider/kubernetes): reduce crd lookups when none exist (#2886)
 - fix(core): Fix dependency in Dockerfile (#2883) (#2884)
 - fix(core): Fix dependency in Dockerfile (#2883)
 - feat(core): give clouddriver the option to shutdown gracefully (#2882)
 - feat(provider/cf): add model and cache keys (#2875)
 - feat(provider/kubernetes): add server group managers to sg endpoint (#2878)
 - feat(provider/ecs): Server group events endpoint (#2877)
 - fix(provider/kubernetes): make request timeout configurable (#2869) (#2873)
 - fix(provider/kubernetes): make request timeout configurable (#2869)
 - feat(provider/cf): add provider skeleton with credentials management (#2838)
 - feat(artifacts): expose types supported by a given artifact credential (#2871)
 - fix(cats/search): fix NPE in findMatches (#2870)
 - fix(provider/kubernetes): Services have a cluster relationship (#2865) (#2868)
 - fix(provider/kubernetes): Services have a cluster relationship (#2865)
 - fix(provider/kubernetes): skip redundant check of kinds already omitted (#2866) (#2867)
 - fix(provider/kubernetes): skip redundant check of kinds already omitted (#2866)
 - fix(provider/kubernetes): reduce allocations during cache merge (#2863) (#2864)
 - fix(provider/kubernetes): reduce allocations during cache merge (#2863)
 - fix(provider/kubernetes): only record app relationships for clusters (#2862)
 - fix(provider/kubernetes): speed up stratifying cache elements (#2857) (#2861)
 - fix(provider/kubernetes): speed up stratifying cache elements (#2857)
 - fix(provider/kubernetes): don't record namespace relationship in cache (#2859) (#2860)
 - fix(provider/kubernetes): don't record namespace relationship in cache (#2859)
 - fix(provider/kubernetes): only load relevant on demand keys (#2854) (#2858)
 - fix(provider/kubernetes): only load relevant on demand keys (#2854)
 - fix(aws): Adding missing `@Component` to `deregister image` converter (#2856)
 - feat(entitytags): Reconcile elastic search if entity tags don't exist (#2855)
 - fix(web): fix getServerGroupsForIds method (#2853)
 - fix(provider/kubernetes): record if a crd is namespace-scoped (#2849) (#2851)
 - fix(provider/kubernetes): record if a crd is namespace-scoped (#2849)
 - fix(provider/kubernetes): deployment w/ 0 replicas is 'stable' (#2848) (#2850)
 - fix(provider/kubernetes): deployment w/ 0 replicas is 'stable' (#2848)
 - fix(provider/kubernetes): Speed up caching server group (#2834) (#2847)
 - fix(provider/kuberneteres): Speed up caching server group (#2834)
 - fix(entitytags): Bit of logging around the `DeleteEntityTagsAtomicOperation` (#2846)
 - fix(entitytags): Bit of logging around the `UpsertEntityTagsAtomicOperation` (#2845)
 - fix(provider/kubernetes): avoid caching empty artifacts (#2841) (#2844)
 - fix(provider/kubernetes): avoid caching empty artifacts (#2841)
 - fix(provider/kubernetes): be permissive of unreachable clusters on startup (#2840) (#2843)
 - fix(provider/kubernetes): be permissive of unreachable clusters on startup (#2840)
 - feat(provider/docker): adding passwordCommand option for retrieving docker credentials (#2837)
 - fix(titus): actually ignore NOT_FOUND (#2839)

#### Deck  - 8b0ee0d...9fb2a65
 - fix(core): encode pipeline names in API request paths (#6221) (#6240)
 - fix(oracle/pipeline): Rename ng module to spinnaker.oracle.* (#6219) (#6239)
 - fix(amazon/loadBalancer): Fix load balancer VPC selection (#6116)
 - fix(amazon/loadBalancer) Fix load balancer VPC selection (#6115)
 - fix(provider/kubernetes): Change FileSystem to Filesystem (#6044) (#6055)
 - fix(kubernetes): Allow resource name to be added as expression #3513
 - fix(aws/serverGroups): always show AWS sever group settings (#6007)
 - fix(aws/serverGroups): always show AWS sever group settings (#6006)
 - fix(kubernetes): defaults can be passed in as null (#5975) (#5976)
 - fix(docker): fix binding of `handleRefreshImages` method #3514 (#5973)
 - chore(dependencies): bump deck-kayenta to 0.0.63 (#5950)
 - fix(artifacts): hide artifact editor when source of manifest is text (#5916)
 - fix(appengine): the selectedProvider is received as null when Create Server Group btn clicked (#5908) (#5909)
 - fix(buildModules): switch to nvm install [version]
 - fix(provider/cf): fix environment variable definition for CF deployment (#5862)
 - fix(bakery/oracle): use read-only text field for bake region (#5846)
 - fix(kubernetes): fix saving of kubernetes yaml patches (#5838) (#5845)
 - fix(provider/cf): create servergroup ux improvements (#5834)
 - chore(titus): Bump to 0.0.48
 - chore(amazon): Bump to 0.0.126
 - fix(amazon/loadBalancer): Fix editing load balancer from another app
 - fix(titus/deploy): Preserve parameterized imageId
 - chore(titus): Bump to 0.0.47
 - chore(amazon): Bump to 0.0.125
 - fix(amazon/deploy): Pass provider to security group refresh
 - fix(titus/deploy): Firewall selector did not refresh on account change
 - chore(titus): Bump to 0.0.46
 - chore(docker): Bump to 0.0.16
 - fix(titus/runJob): Set defaults earlier in lifecycle
 - fix(docker/image): Add empty defaults for docker fields
 - fix(google): backend service selection in server group wizard (#5813)
 - fix(provider/cf): repair null errors in deploy
 - chore(titus): Bump to 0.0.45
 - chore(docker): Bump to 0.0.15
 - chore(amazon): Bump to 0.0.124
 - chore(core): Bump to 0.0.273
 - refactor(docker/dcos): Move angular docker selector to dcos module
 - refactor(titus/runJob): Convert run job stage config to react
 - chore(core/account): Add registry to IAccountDetails
 - refactor(core/config): Add application to stage config and export
 - refactor(amazon): Export security group controls
 - fix(provider/kubernetes): remove warnings for stages (#5811)
 - chore(provider/kubernetes): bump k8s package version (#5812)
 - chore(core): Bump to 0.0.272
 - chore(titus): Bump to 0.0.44
 - feat(ecs): support private registry credentials (#5799)
 - chore(package): prepare -> prepublishOnly for everything (#5806)
 - feat(core/presentation): Support validation when fields are touched (and some other things) (#5808)
 - fix(titus/runJob): Fix log link to not go to archived (#5809)
 - fix(kubernetes): copy into pipeline stage (#5795)
 - Call new manual execution endpoint in Executions.tsx (#5805)
 - fix(core): Fix polling cancellation on manual trigger (#5804)
 - feat(webhooks): Sort predefined webhook parameters by order attr (#5770)
 - feat(kubernetes): provide namespace and kind hints in manifest selector component (#5769)
 - chore(core): Bump to 0.0.271 (#5803)
 - feat(core): Remove ability to delete tasks from ui (#5777)
 - chore(prettier): Just Update Prettierâ„¢ (#5802)
 - fix(core/trigger): Fix react trigger reload (#5800)
 - refactor(core/modal): Improve wizardPage types so no type param is necessary
 - feat(provider/cf): add deploy and delete service pipeline stages
 - chore(docker): Bump to 0.0.14
 - chore(core): Bump to 0.0.270
 - chore(titus): Bump to 0.0.43
 - fix(core): Fix parameter in webpack dev configuration (#5798)
 - refactor(docker/pipeline): Convert docker trigger config to react
 - refactor(core/pipeline): Create react version of RunAsUser
 - feat(core/pipeline): Support trigger configs in react
 - fix(titus/deploy): Disable image selection for titus deploy stage (#5796)
 - feat(core): Call new manual execution endpoint behind a flag (#5794)
 - fix(core): Fix error when changing execution grouping (#5793)
 - chore(titus): bump to 0.0.42 (#5792)
 - fix(titus/serverGroup): Do not send undefined tag to Docker Tag Selector (#5790)
 - chore(core): bump to 269
 - refactor(core/*): Change core imports to core/module instead of @spinnaker/core
 - chore(core): bump to 268 (#5788)
 - chore(titus): Bump to 0.0.41
 - chore(amazon): Bump to 0.0.123
 - fix(kubernetes): fix yaml editor in manifest wizard (#5786)
 - refactor(core/modal): Refactor remaining Wizard Pages to use prop instead of spreading. (#5784)
 - fix(amazon/loadBalancer): Stop adding default security groups when editing (#5780)
 - fix(amazon/loadBalancer): Do not ask for an SSL cert unless it's an SSL protocol (#5783)
 - fix(titus/runJob): Fix firewall selector (#5781)
 - fix(kubernetes): fix after formik modal wizard refactor
 - feat(core): collapse execution group account tags if there are more than 2 (#5778)
 - fix(amazon): Fix availability zone selector showing correct state (#5693) (#5779)
 - chore(titus): Bump to 0.0.39
 - chore(docker): Bump to 0.0.13
 - chore(amazon): Bump to 0.0.122
 - chore(core): Bump to 0.0.267
 - refactor(core/modal): Use `formik` prop instead of spreading. Simplify WizardPage props.
 - fix(amazon/loadBalancer): Show cert input box if ssl certs not able to load (#5774)
 - refactor(titus/deploy): Convert deploy dialog to react
 - refactor(core): Add form-field-loading css class for loaders in forms
 - feat(docker): Add react image and tag selector
 - refactor(titus): Expose server group command services in react injector
 - chore(titus): Remove unused advanced settings selector
 - fix(core/deploy): Fix whitespace in platform health override
 - refactor(titus/serverGroup): Move the security group refreshing into the server group configuration
 - refactor(amazon/deploy): Use new note section in wizard pages
 - feat(core/wizard): Support a note section at the bottom of the wizard page
 - refactor(titus/serverGroup): Switch server group configuration to use standard dirty map
 - refactor(amazon/deploy): Support hiding load balancers and/or target groups in load balancer selector
 - refactor(titus/deploy): Convert serverGroupConfiguration to TS, refactor load balancer selector to not manage data
 - feat(core/deploy): Make templateSelectionText optional
 - refactor(amazon/deploy): Clean up interfaces and comments; fix a validation error typo
 - chore(titus): Support importing from titus/
 - feat(provider/kubernetes): show manifest condition times as relative (#5773)
 - feat(kubernetes): show images in server group details (#5767)
 - fix(provider/google): Deploy custom archetype fixes. (#5771) (#5772)
 - fix(provider/google): Deploy custom archetype fixes. (#5771)
 - fix(artifacts): Creating new expected artifact doesn't save first time (#5768)
 - feat(core): allow accounts to be parameterized (#5766)
 - fix(core/serverGroup): Guard for existence of callbacks (#5730) (#5765)
 - refactor(kubernetes): convert manifest wizard to react (#5764)
 - refactor(core/task): Migrated task progress bar to react (#5753)
 - fix(core): Projects calls interval increased to 3min from 30s (#5762)
 - fix(artifacts): use default artifact kind before match artifact kind (#5763)
 - feat(kubernetes): allow a copy from running infrastructure into deploy manifest stage (#5751)
 - fix(bake/oracle): always show rebake option in bake configuration. (#5761)
 - chore(core/amazon): bump core to 0.0.266, amazon to 0.0.121 (#5760)
 - fix(core/application): Use relative import of ICluster (#5759)
 - refactor(core/modal): Use TSX generics to render WizardModal
 - refactor(formik): Use TSX generics to render Formik components
 - chore(prettier): Just Update Prettierâ„¢ (#5755)
 - chore(prettier): Just Update Prettierâ„¢ (#5754)
 - chore(travis): parallelize module build tests (#5750)
 - feat(kayenta): show image sources (#5749)
 - test(travis): ensure modules are buildable (#5723)
 - chore(artifacts): remove angular expected artifact selector (#5748)
 - fix(kayenta): fix editing canary + baseline server groups (#5747)
 - feat(artifacts): default artifact type auto selected from match artifact (#5746)
 - chore(core): Bump to 0.0.264 (#5745)
 - fix(amazon/instance): Fix standalone instance view (#5744)
 - fix(ecs): angular is declared as global, so let's not redefine it (#5743)
 - fix(cloudfoundry): module builds require the use of alias instead of a path directly in core (#5742)
 - doc(core/presentation): Add docs for Forms: Input, Layout, Field components (#5741)
 - feat(kubernetes): bake manifest artifacts inline editor (#5740)
 - fix(ux): hover flicker on cluster instances (#5738)
 - feat(provider/ecs): Added support for environment variables (#5739)
 - feat(bake/oracle): Added oracle OCI bakery. (#5697)
 - feat(provider/ecs): Added support for logDriver, logOptions, dockerLabels (#5668)
 - refactor(core/application): Migrate Application Data Sources to Rx streams (#5720)
 - refactor(core/application): Rename createApplication to createApplicationForTests (#5737)
 - feature(provider/cf): new CloudFoundry implementation
 - Security groups standalone missing vpcName (#5736)
 - feat(artifacts): add inline artifact editor for appengine artifacts (#5735)
 - refactor(core/application): Add strong typing to ApplicationModelBuilder.createApplication() (#5732)
 - feat(google): add inline artifact editor to google deploy stage (#5731)
 - fix(core/serverGroup): Guard for existence of callbacks (#5730)
 - test(*): Switch karma reporter to super-dots and add mocha style error reporter (#5729)
 - refactor(core): All region-select-field to use RegionSelectField.tsx (#5726)
 - test(openstack): Fix some openstack load balancer update tests (#5728)
 - Revert "refactor(core/entityTag): Remove dataUpdated() call from DataSource onLoad"
 - chore(ecs): fixed typing (#5724)
 - feat(api): reject invalid content API responses with message (#5725)
 - fix(kubernetes): hide expected artifact label when manifest source is text (#5722)
 - fix(kubernetes): fix lint from patch manifest inline artifact editor merge (#5721)
 - feat(kubernetes): add inline artifact editor to patch manifest stage (#5717)
 - refactor(core/entityTag): Remove dataUpdated() call from DataSource onLoad I verified that no current afterLoad() implementation mutates the current data source's data[], therefore calling dataUpdated() should be unnecessary.
 - fix(ecs): fixed ecs module lib path (#5712)
 - chore(amazon): Bump to 0.0.120 (#5716)
 - fix(amazon/deploy): Fix instance monitoring and ebs optimized checkboxes (#5715)
 - fix(pipeline): Fixed missing MPT icon for pipelines with no executions (#5709)
 - fix(kubernetes): add missing typings (#5713)
 - fix(ecs): fixed ecs module lib path (#5712)
 - fix(kubernetes): Replace all periods in image name (#5711) (#5714)
 - fix(kubernetes): Replace all periods in image name (#5711)
 - fix(trigger): add labels for gitlab trigger fields (#5708)
 - feat(kubernetes): use inline artifact editor for deploy manifest artifact (#5707)
 - fix(kubernetes): Fix container selection with multiple triggers (#5705) (#5706)
 - fix(kubernetes): Fix container selection with multiple triggers (#5705)
 - fix(amazon/deploy): Fix security group selector to show pre-selected security groups (#5704)
 - fix(pipeline/deploy): Fixed missing tab by reevaluating scope after initialization (#5703)
 - fix(artifacts): appease tslint (#5702)
 - feat(artifacts): add expected artifact selector with option to create new artifacts (#5701)
 - fix(aws): Fix clone stage. (#5700)
 - chore(amazon): Bump to 0.0.119
 - chore(titus): Bump to 0.0.38
 - chore(amazon): Bump to 0.0.118
 - chore(core): Bump to 0.0.263
 - chore(deps): bump @spinnaker/kayenta to 0.0.57 (#5696)
 - feat(artifacts): add inline artifact editor (#5692)
 - refactor(core/task): Simplify task monitoring in React Modals Some other minor modal related bug fixes
 - fix(core): Server group details could not be opened (#5688)
 - fix(amazon/deploy): Allow spel expressions in ami names (#5694)
 - fix(amazon): Fix availability zone selector showing correct state (#5693)
 - feat(artifacts): add a select box for choosing an artifact source (#5690)
 - feat(artifacts): add an artifact kind select box (#5689)
 - feat(artifacts): add select box for artifact accounts (#5691)
 - feat(artifacts): add icon helper and use stage config field where possible (#5687)
 - feat(artifacts): provide helpers for working with sources of artifacts (#5686)
 - refactor(core/reactShims): Remove spread-resolves-objects-to-props router shim now that `@uirouter/react` does this natively (#5685)
 - fix(core/pipeline): Add error message to ApplySourceServerGroupCapacityDetails stage (#5684)
 - feat(amazon/loadBalancers): Allow setting to disable manual oidc config (#5683)
 - fix(core/search): Trim whitespace for global search (#5680)
 - fix(core/projects): remove duplicative home.projects.project.** substates (#5682)
 - feat(provider/ecs): Add launch type option to support Fargate (#5667)
 - fix(core/bootstrap): Remove vis=true/vis=false from URL after toggling visualizer (#5679)
 - feat(halconfig): Have AWS settings configured by halyard to be picked up in settings.js (#5681)
 - fix(provider/oracle): Fix Oracle cloud provider so that Deploy works correctly from pipeline stage. This commit handles all regions, adds handlers for server group drop downs, and adds a findImageFromTags pipeline stage. (#5605)
 - fix(provider/ecs): Now satisfying the expectation of a securityGroup.transformer for ECS (#5669)
 - fix(amazon/bake): Cleanup labels when docker store type
 - chore(core,amazon): Bump core to 0.0.262, amazon to 0.0.117 (#5677)
 - fix(amazon): Security Group cloning did not refresh fields with changes to region/account/vpc (#5647)
 - fix(pipeline): fix invisible parameter when default is not in options (#5673)
 - fix(core/notifications): Render negative TTL correctly in ephemeral server group popover (#5676)
 - fix(provider/kubernetes): fixup lb details view (#5662)
 - fix(kubernetes): links from server groups + instances in load balancer view (#5675)
 - fix(ux): deploy stage table layout
 - chore(kayenta): bump kayenta module to 0.0.56 (#5671)
 - chore(build): Bump gradle plugin version (#5670)
 - feat(kubernetes): better undo rollout ux (#5663)
 - feat(provider/ecs): Add option to associate public IP address (#5666)
 - feat(amazon/instance): Switch General Purpose instance from m4 -> m5 (#5665)
 - fix(ux): minor text revisions for server group enable modal (#5664)
 - fix(core): fixes server group manager reload (#5661)
 - feat(kubernetes): add ace yaml editor (#5660)
 - feat(provider/kubernetes): move logs up to top section (#5658)
 - fix(provider/kubernetes): remove 'instance' ref in dropdown (#5659)
 - fix(artifacts): Fix artifact in execution history (#5656) (#5657)
 - feat(provider/kubernetes): container metrics & QOS tier (#5654)
 - fix(artifacts): Fix artifact in execution history (#5656)
 - chore(titus): Bump to 0.0.37
 - chore(core): Bump to 0.0.261
 - fix(ecs): Fix core import
 - feat(titus): Support stdout console logs (#5653)
 - feat(provider/ecs): Added server group events (#5566)
 - feat(artifacts): add react implementations of artifact editors (#5652)
 - feat(titus): Add titus ui endpoint to the instance object
 - feat(core): Support different instance link sections by cloud provider
 - fix(help): update help text for force-rebake option (#5651)
 - fix(ecs/deploy): Clarified binpack strategy as being memory binpack (#5539)
 - feat(provider/ecs): Added support for ENIs in the instance details view (#5626)
 - fix(kubernetes): fix scrolling behavior for deployments in cluster view (#5649)
 - feat(artifacts): move artifact creation into central service (#5648)
 - fix(core): Long app names hide and make refresh unusable (#5640)
 - chore(titus): Bump to 0.0.36 (#5646)
 - fix(titus): Fix run job firewall picker (#5645)
 - chore(core): Bump to 0.0.260 (#5644)
 - feat(core): Add source field to pipeline interface (#5643)
 - fix(pipeline/create): Added workaround to address typeahead issue in react-select (#5637)
 - fix(kayenta): fixes for kayenta stage (#5642)
 - fix(provider/kubernetes): edit last applied config (#5641)
 - feat(provider/ecs): Added support for network mode and health grace period (#5575)
 - refactor(provider/cf): delete existing CloudFoundry implementation to make way for the new. (#5615)
 - fix(kubernetes): placate compiler (#5639)
 - fix(provider/kubernetes): fix missing event message check (#5638)
 - feat(kubernetes): new deployment representation in cluster view (#5617)
 - fix(amazon/deploy): Use the right text for submit btn when cloning (#5636)
 - refactor(trigger): pull link and or text from ITrigger (#5635)
 - fix(core/mpt): Fix configure template checkbox initial state (#5634)
 - chore(amazon): Bump to 0.0.116 (#5633)
 - fix(trigger/webhook): fix runas user (#5631)
 - fix(amazon/loadBalancer): Re-add ability to load all load balancers (#5632)
 - fix(trigger/webhook): fix runas user (#5630)
 - feat(appengine): filter container image artifacts to just docker images (#5629)
 - fix(appengine): add server group button broken (#5628)
 - fix(appengine): add server group button broken (#5627)
 - fix(locking): updated LockFailureException details (#5619)
 - fix(pipeline): Fixed missing triggers/parameters/artifacts when inherited from template (#5624)
 - fix(canary): Make deploy dialog command handling and cluster edits work (#5623)
 - fix(artifacts): expected artifacts can be null-ish (#5625)
 - chore(core): Bump to 0.0.259 (#5622)
 - feat(kubernetes): filter artifact types that dont make sense for a manifest (#5621)
 - fix(core/serverGroup): Make forced deploy template selection actually work (#5620)
 - feat(artifacts): filter set of available artifact kinds by configured artifact accounts (#5612)
 - feat(kubernetes): use native language on action buttons (#5618)
 - feat(provider/kubernetes): Hide min/max label in servergroup details when min is null-ish (#5616)
 - refactor(instances): Convert instance-load-balancer-health to react (#5604)
 - chore(core): Bump to 0.0.258
 - chore(amazon): Bump to 0.0.115
 - fix(loadBalancer): Use correct provider for titus server groups/instances (#5613)
 - fix(core/executions): Fix rerun button when grouped by anything other than pipeline (#5607)
 - fix(amazon/loadBalancer): Fix load balancer tag on server groups for same named target groups in multiple accounts (#5608)
 - chore(halconfig): allow enabling travis & wercker in halconfig (#5609) (#5610)
 - chore(halconfig): allow enabling travis & wercker in halconfig (#5609)
 - fix(kubernetes): correct lint error (#5606)
 - feat(provider/kubernetes): hide artifact account selector when only one suitable account is available (#5598)
 - chore(core): Bump to 0.0.256
 - chore(amazon): Bump to 0.0.114
 - fix(amazon/deploy): Fix image searching by ami (#5601)
 - fix(core/overrideRegistry): Fix copying of static methods over to @Overridable High Order Component + React.forwardRef
 - fix(amazon/deploy): Fix iamRole, userData, instanceMonitoring, and ebsOptimized fields (#5597)
 - fix(kubernetes): pick correct account when opening manifest wizard (#5599)
 - fix(amazon/deploy): Fix security group selector to show pre-selected security groups
 - fix(amazon/deploy): Stop assuming fields are filled in
 - fix(amazon/deploy): Edit deployment cluster button did not work (#5580) (#5595)
 - fix(wercker): feature toggle for wercker stages (#5586) (#5593)
 - feat(wercker): feature toggle for wercker stages (#5586)
 - fix(kubernetes): duplicate 'replicas' label in scale manifest stage (#5592)
 - fix(kubernetes): return type of server group command builder (#5591)
 - fix(kubernetes): replace all hyphens in annotation driven titles (#5590)
 - feat(kubernetes): remove annotations from details view (#5588)
 - fix(kubernetes): manifest editor loading (#5589)
 - fix(kubernetes): remove asterisks for basic settings component (#5587)
 - fix(kubernetes): help text spelling (#5585)
 - refactor(core): Convert subnet-tag to react (#5584)
 - chore(amazon): bump amazon to 0.0.113
 - chore(core): Bump to 0.0.255
 - chore(core): bump core to 254
 - fix(core/search): remove unneeded "see more" li elements
 - fix(amazon/serverGroup): Improve image dropdown UX (#5582)
 - fix(amazon/deploy): Make source capacity work again, other misc. fixes (#5581)
 - fix(amazon/deploy): Edit deployment cluster button did not work (#5580)
 - feat(core/search): Add "show all" links to each category (#5577)
 - refactor(search): Update BasicCell to allow children (#5576)
 - chore(amazon): bump package to 112
 - fix(amazon/serverGroup): Fix clone dialog's capacity inputs
 - fix(core/search): When calling a faceted backend search such as stack:int, tell clouddriver not to worry about minimum query length of 3
 - fix(core/overrideRegistry): Fix @Overridable + Stateless Functional Component (#5573)
 - chore(core): bump package to 253
 - fix(core/overrideRegistry): Fix @Overridable + Stateless Functional Component - Upgrade uirouter/react-hybrid - Pin uirouter libs using yarn 'resolutions' - Switch to React 16.3 new context API
 - chore(amazon): Bump package to 0.0.111
 - fix(amazon/deploy): Fix send traffic to new instances checkbox

#### Echo  - c52ac8a...a568cf9
 - fix(MPT): Fix manual triggering of templated pipelines (#419)
 - fix(artifacts): Fix artifact population in manual triggers (#414) (#416)
 - fix(triggers): Fix triggered pipeline template artifact resolution. (#397)
 - fix(MPT): Fixes templated pipeline triggers from Echo. (#383)
 - chore(builds): Reformat spinnaker deps version (#349)
 - Add echo manual trigger handler (#341)
 - fix(ha): Rename echo-replica to echo-worker. (#347)
 - fix(echo-email): Echo send email with garbled message if content incloud mandarin (#342)
 - fix(pubsub): some extra beans need to be predicated on pubsub.enabled (#346)
 - chore(pubsub): add a global enable flag for pubsub (#345)
 - refactor(scheduler): Remove cassandra scheduler (#343)
 - fix(cron): don't try to compensate for crons that should have run very very recently
 - fix(ha): Rename echo-slave.yml to echo-replica.yml. (#340)
 - refactor(core): Push shared functionality to TriggerMonitor.java (#339)
 - chore(dependencies): Bump spinnaker dependencies to 1.0.13 (#337)
 - fix(ha): Fix echo-scheduler/slave service names to be camel-cased rather than hyphenated. (#336)
 - chore(pubsub): switch to seconds and setex redis command (#335)
 - fix(cron): add explicit trigger in compensation job (#334)
 - feat(deploy/ha): Add halconfig yamls for echo-scheduler and echo-slave. (#332)
 - revert(cron): add cron pipeline started metric (#326) (#331)
 - chore(build): Bump gradle plugin version (#330)
 - fix(redis): default to redis.enabled:false like before (#329)
 - fix(pubsub): don't infinitely nack duplicate messages (#327)
 - feat(pubsub): allow alternate id in msg attrs and define key (#328)
 - feat(pubsub): add sqs msgattr parsing, optional id in msgattrs (#325)
 - chore(metrics): add cron pipeline started metric (#326)
 - fix(cron): don't use a static time value in the cron compensation job (#324)
 - feat(pubsub): Adds Pubsub Publisher as an EchoEventListener. The first impl pushes all events to a configured Google Pubsub topic. (#314)
 - fix(pubsub): echo starts up when pubsub not enabled (#323)
 - chore(dep): bump kork - dynomite config fix (#322)
 - refactor(core): Convert echo-model to Java (#318)
 - fix(artifacts): Fix GCB message format support. (#315) (#321)
 - feat(pubsub/google): GCB message format added (#319)
 - chore(dependencies): spinnaker-dependencies 1.0.7 (#317)
 - feat(redis): allow dynomite, backwards compatable (#316)
 - fix(artifacts): Fix NPE when no artifact is found in pubsub message. Specifically the NPE is from [this line](https://github.com/ttomsu/echo/blob/ad32e054fd0a547e0b40f09c10dc1f4a66f94bbc/echo-pubsub-google/src/main/java/com/netflix/spinnaker/echo/pubsub/google/GooglePubsubSubscriber.java#L207), and this change just ensures the variable is not null. (#315)
 - chore(swabbie): formatting swabbie email notification (#313)
 - feat(trigger): provide link to triggering event and link text (#312)
 - fix(cron): Adding fuzzy expression parsing support (#311)
 - fix(scheduler): Prevent cron parse err from aborting compensation batch (#310)

#### Fiat  - 2c8212d...83a7ef2
 - Revert "fix(sync): Stop syncing service accounts in roleProvider (#289)" (#293)
 - fix(sync): Stop syncing service accounts in roleProvider (#289)
 - fix(ldap): Return mutable list to support "addAll" operation (#269) (#270)
 - chore(builds): Reformat spinnaker deps version (#266)
 - chore(build): add debug flag to fiat build (#264)
 - fix(ldap): Fix NPE for serviceAccounts when userSearchFilter set (#265)
 - feat(roles): Configurable `__unrestricted_user__` roles (#263)
 - chore(dependencies): Bump spinnaker dependencies to 1.0.13 (#262)
 - fix(roles/github): Reduce burden of github reads for teams and make reâ€¦ (#247)
 - chore(dependencies): spinnaker-dependencies to 1.0.10 (#261)
 - fix(ldap): Return a new ExternalUser from multiLoadRoles in LDAP (#260)
 - fix(ldap): Return a new ExternalUser from multiLoadRoles in LDAP (#257)
 - feat(api): Surface context around what resource was denied access (#256)

#### Front50  - 9ab3290...98b4ab9
 - fix(storage/oracle): add private key passphrase (#401)
 - fix(s3): Add control over nb of objects retrieved per batch (maxKeys) (#367)
 - fix(s3): Add control over nb of objects retrieved per batch (maxKeys) (#366)
 - chore(builds): Reformat spinnaker deps version (#361)
 - fix(persistentStorage/oracle): add support for permission etc. (#359)
 - fix(persistentStorage/oracle): fix sdk upgrade code incompatibility issue. (#358)
 - chore(oracle/dependency): upgrade oracle oci sdk version to 1.2.44 (#356)
 - chore(*): Bump spinnaker-dependencies to 1.0.23 (#357)
 - refactor(gcs): Update doRetry and bump clouddriver version (#355)
 - refactor(providers): Remove cassandra as a storage provider (#353)
 - refactor(web): Remove unused code (#352)
 - feat(builds): Modular builds for Front50 (#351)
 - fix(gcs): Retry write operations. (#350)
 - chore(dependencies): Bump spinnaker dependencies to 1.0.13 (#349)
 - chore(dependencies): Bump gradle plugin to 4.3.0 (#348)
 - chore(build): Bump gradle plugin version (#347)
 - fix(core): Warn when an object's key does not match its id (#346)
 - feat(google): Add GCS statusCodes to metrics (#345)
 - fix(google): Block updates to lastmodified when update is queued (#344)

#### Gate  - 95b28a6...a8bb998
 - fix(iap/basicauth): Configure the BasicAuth auth manager for IAP. (#662) (#663)
 - Revert "feat(web): Serve `/applications` out of the recent cache (#603)" (#627) (#628)
 - fix(test): Ensure executor service does not run in tests (#612)
 - chore(builds): Make spinnakerDependencyVersion more grep-able (#610)
 - chore(okhttp): pick up okhttp from spinnaker-dependencies 1.0.26 (#609)
 - feat(web): Disregard `X-Spinnaker-Priority` when shedding requests (#608)
 - refactor(core): Create new endpoint to manually trigger with Echo (#600)
 - feat(ecs): Add support for retrieving available Secrets Manager secrets (#606)
 - fix(iap/x509): Properly call the x509 configurer if set. (#604) (#607)
 - fix(web): Remove stale t.printStackTrace() (#605)
 - fix(iap/x509): Properly call the x509 configurer if set. (#604)
 - feat(web): Serve `/applications` out of the recent cache (#603)
 - chore(dependencies): Update gradle plugin to 4.3.0 (#602)
 - feat(provider/cf): Add open service broker list services controller
 - feat(artifacts): Add API to fetch artifact contents (#601)
 - feat(web): Low priority request shedding interceptor (#597)
 - feat(pipeline_template): Expose dependent pipelines endpoint (#598)
 - feat(cors): Allow new 'X-Spinnaker-Priority' header (#595)
 - feat(web): Added generic proxy support for `POST` requests (#596)
 - chore(dependencies): Bump spinnaker dependencies to 1.0.13 (#594)
 - chore(swagger): Generates swagger spec for some missing controllers. (#593)
 - fix(authn/iap): Change filter to respect AuthConfig permitted paths. (#591) (#592)
 - fix(authn/iap): Change filter to respect AuthConfig permitted paths. (#591)
 - feat(version): Expose Gate's version via an endpoint. (#590)
 - fix(security): Sets all WebSecurityConfigurerAdapters to LOWEST_PRECEDENCE. With this change and the management.port set to a different port, it ensures that requests to management endpoints do not get caught by the AnyRequest matcher of the application. This is part of an effort to Make Endpoints Great Again (#557) (#589)
 - fix(web): Add v3 builds api so swagger-generated clients work correctly (#588)
 - fix(swagger): Include pipeline templates in Swagger (#585)
 - fix(swagger): Include pipeline-config-controller in Swagger (#586)
 - chore(build): Bump gradle plugin version (#587)
 - fix(security): Sets all WebSecurityConfigurerAdapters to LOWEST_PRECEDENCE. With this change and the management.port set to a different port, it ensures that requests to management endpoints do not get caught by the AnyRequest matcher of the application. This is part of an effort to Make Endpoints Great Again (#557)
 - feat(swabbie): expose optOut endpoint (#584)
 - feat(ecs): Server group events endpoint (#583)
 - feat(oidc): Add an endpoint to get the oidc config by id (#582)

#### Igor  - 6a38a83...a4fd897
 - fix(travis): Make artifact decorator optional (#313)
 - chore(builds): Reformat spinnaker deps version (#304)
 - chore(dependencies): Bump spinnaker dependencies to 1.0.13 (#303)
 - chore(web): Cleanup rest exception handlers (#302)
 - chore(build): Bump gradle plugin version (#301)
 - fix(core): use snakeyaml's SafeConstructor (#300)
 - feat(admin): improve error response (#299)
 - refactor(healthcheck): Improving Poll Monitor health check (#293)

#### Kayenta  - 3f7ed70...788433f
 - chore(license): add missing license headers (#387)
 - feat(atlas): Map locations forward to a specific back-end (#386)
 - fix(stackdriver): Drop project_id from response tags. (#382)
 - refactor(stackdriver): Move some config fields from canary stage to canary (metric) config. (#381)
 - feat(locations): provide location hints for atlas (#375)
 - refactor(scoring): Overload method with java-friendly signature. (#378)
 - fix(judge): handle integers where we expect doubles (#376)
 - bug(thresholds): add thresholds back until UI is adjusted
 - feat(cors-headers): add if we have an Origin header on request (#374)
 - refactor(scoring): Add scoring helper. (#373)
 - feat(thresholds): require on execution, remove from config (#370)
 - feat(judge): Implement critical effect size check (#369)
 - chore(monitoring): Record controller invocations. (#367)
 - fix(scopes): Make MetricSetPair.MetricSetScope public. (#366)

#### Orca  - e52579d...7b1f06a0
 - fix(triggers): Handle explicitly null container fields in triggers (#2545) (#2547)
 - fix(MPT): Fix templating pipeline triggering. (#2480) (#2507)
 - fix(authz): Use pipeline ids for managed service account names. (#2501) (#2504)
 - fix(core): Avoid revisiting stages when traversing ancestors (#2349) (#2451)
 - chore(builds): Reformat spinnaker deps version (#2436)
 - fix(webhook): ignore empty expectedArtifacts list in webhook stage response (#2435)
 - fix(locking): determine lock should not fail when locking is disabled (#2434)
 - fix(front50): Allow pipeline triggers to refer to triggers via spel (#2417)
 - fix(moniker): handle Monikers without cluster (#2433)
 - refactor(provider/kubernetes): share update/fcr logic (#2432)
 - feat(webhooks): Add optional sort order to preconfigured webhook params (#2425)
 - fix(locking): fix strategies / child pipelines (#2431)
 - feat(queue): Add `stageType` and `taskType` to MDC while task executing (#2428)
 - fix(pipeline_templates): Fix expected artifacts when templated pipeline is triggered by a parent pipeline (#2430)
 - fix(provider/kubernetes): fix FCR for cluster-scoped resources w/ (#2427) (#2429)
 - fix(provider/kubernetes): fix FCR for cluster-scoped resources w/ (#2427)
 - fix(artifacts): Populate parent artifacts when a templated pipeline is trigger by a parent pipeline (#2406)
 - feat(locking): lock traffic guarded operations (#2420)
 - fix(metrics): Correctly handle potentially empty account tag (#2426)
 - feat(provider/cf): pipeline stages to delete and deploy service broker services
 - fix(orca) fix force cache refresh sometimes taking 12 minutes (#3366) (#2422) (#2424)
 - chore(*): bump keiko to 2.9.6 (#2423)
 - fix(orca) fix force cache refresh sometimes taking 12 minutes (#3366) (#2422)
 - fix(queue): `ContinueParentStageHandler` should complete if all after stages are complete (#2419)
 - feat(sql): Support multiple root liquibase changesets (#2421)
 - feat(bake/manifests): use custom output artifact name in helm bakery (#2402)
 - fix(spring): Disable JDBC autoconfigure (#2415)
 - feat(sql): Adding SQL execution persistence backend (#2394)
 - refactor(provider/cf): initial commit for cloud foundry implementation (#2413)
 - fix(redis): Cleaning up kork redis client configuration (#2412)
 - fix(tests): stop leaking redis processes
 - fix(metrics): use string instead of class name (#2410)
 - fix(provider/oracle): Add OracleImageFinder which is needed by findImageByTags pipeline stage (#2370)
 - chore(dependencies): Bump spinnaker dependencies to 1.0.13 (#2409)
 - fix(dryrun): Rollback cluster stages can run for real
 - chore(dependencies): Bump gradle plugin to 4.3.0 (#2407)
 - feat(bake/oracle): Added oracle OCI bakery. (#2405)
 - feat(core): Pipeline/Orchestration cleanup should only run for redis (#2404)
 - feat(core/webhook): Provide pattern hostname must match when fails (#2350)
 - feat(destroy): Destroy latest server group after failed Deploy (#2285)
 - chore(dependencies): spinnaker-dependencies 1.0.12 (#2403)
 - feat(agents): store class names on MDC for sql query annotation (#2378)
 - fix(queue): Move task interceptor execution to within try/catch (#2399)
 - Revert "fix(cancel): consistent CANCELED event (#2398)" (#2401)
 - fix(core): use correct time interval for agent locks (#2400)
 - fix(cancel): consistent CANCELED event (#2398)
 - chore(*): Bump keiko to 2.9.5 (#2396)
 - fix(clouddriver): stop logging the force cache contents (#2397)
 - feat(clouddriver): Allow username to be overridden in `RestorePinnedServerGroupsPoller` (#2395)
 - fix(clouddriver): Guard against an NPE when determining rollback target (#2392)
 - chore(build): Bump gradle plugin version (#2393)
 - fix(executions): revert ExecutionComplete event publishing change (#2391)
 - fix(timeouts): don't even evaluate timeouts when running execution windows
 - feat(canary): allow for multiple control/experiment deployments per canary stage (#2346)
 - fix(core): use snakeyaml's SafeConstructor (#2389)
 - fix(timeouts): don't time out execution windows (#2388)
 - fix(apps): Report task result status properly for app ops. (#2387)
 - fix(metrics): null value is string null, optional values actually optional (#2385)
 - feat(provider/kubernetes): v2 Include manifest when finding resource
 - feat(pipelines): add metrics for starting dependend pipelines (#2382)
 - refactor(webhooks): add webhook error information to the pipeline (#2340)
 - fix(core): Handle null pipeline source value (#2383)
 - chore(*): Bump keiko (#2381)
 - chore(queue): Bump keiko to 2.9.2 (#2380)
 - fix(deleteImage): Fixing delete image stage (#2379)
 - fix(core): Add pipeline source to pipeline builder (#2377)
 - fix(core): Make polling interval time unit configurable (#2376)
 - fix(spel): always make a map called parameters available in SPEL even if not set in trigger (#2375)
 - refactor(agents): All agents now use locking by default (#2366)
 - refactor(provider/cf): delete existing cloud foundry implementation (#2374)
 - feat(queue): Upgrade keiko to 2.9.1 (#2373)
 - feat(lock): Improved restarting/failure semantics. (#2369)
 - fix(canary): When resolving final run score, filter on parent id and sort all child run canary stages. (#2372)
 - fix(canary): When resolving final run score, filter on parent id and sort all child run canary stages. (#2371)
 - feat(core): Serialize execution source (#2368)
 - feat(locking): Adds basic locking support. (#2358)
 - feat(image): Adding a delete image stage (#2339)
 - fix(cache/ondemand): re-request missed server group cache refreshes (#2367)
 - fix(quip): update constructor thanks groovy (#2365)
 - fix(migrator): Set a limit on ExecutionCriteria so we get results back (#2364)
 - fix(clouddriver): Unpinning server group should only adjust min capacity (#2363)
 - fix(telemetry): cleanup corrupt orphaned executions (#2362)
 - fix(igor): fix commit hash resolution exception (#2361)
 - feat(core): Genericize execution migrators (#2355)
 - feat(bake): parse version from kork Artifacts (#2357)
 - chore(log): log ids for execution repo serialization errors (#2360)
 - fix(clouddriver): Handle situations where the wrong `pinned_capacity` tags were deleted (#2359)
 - fix(core): Avoid revisiting stages when traversing ancestors (#2349)
 - feat(queue): Adding completed executions metric (#2353)
 - fix(clouddriver): Handle missing server groups when checking instances (#2356)
 - feat(clouddriver): Logging around entity tag creation for deployments (#2354)

#### Rosco  - c057c1d...2f1a4f8
 - chore(builds): Reformat spinnaker deps version (#280)
 - Revert "fix(bake/manifests): capture onny stdout in Helm bakery" (#279)
 - fix(bake/oracle): scrape image id as well as name. (#278)
 - feat(bake/manifests): use custom output artifact name in helm bakery (#275)
 - fix(bake/manifests): capture onny stdout in Helm bakery (#269)
 - feat(bake/windows): Allow Chocolatey version control via attributes (#277)
 - feat(bake/oracle): Added oracle OCI bakery (#273)
 - fix(bake/chocolatey): Observe Chocolatey exit codes (#276)
 - chore(build): Bump gradle plugin version (#274)
 - chore(packer): upgrade packer binary to 1.2.2 (#271) (#272)
 - chore(packer): upgrade packer binary to 1.2.2 (#271)
 - fix(google): Fix race condition in rosco config (#270)