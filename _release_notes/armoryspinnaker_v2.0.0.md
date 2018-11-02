---
layout: post
title: v2.0.0 Armory Release
order: -20181102195919
hidden: false
---

# 11/02/18 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues



<!--- Example of a problem
Igor added ..... which does.....

**Symptoms:**
**Fix:**
-->





## Highlighted Updates
### Armory
<!--- A quick summary of what's changed with Armory -->

#### Packager
 - [feat(release): New versioning scheme for edge and rc releases (#398)](https://docs.armory.io/release-notes/#understanding-armory--open-source-spinnaker-releases)

#### Armory Deck
 - feat(cloudfoundry): enable cloudfoundry in our builds (#450)
 - feat(ecs) add ecs (#446)
 - feat(platform/ui): feature flag to enable/disable header (#435)

#### Dinghy&trade;
Dinghy is now configurable through [`hal armory dinghy`](https://docs.armory.io/spinnaker/armory_halyard/#hal-armory-dinghy)
 - feat(halconfig): Use FiatUser coming from halyard settings

###  Spinnaker Community Contributions
#### Orca
 - [fix(core): Avoid revisiting stages when traversing ancestors (#2349)](https://github.com/spinnaker/orca/pull/2349)


## Breaking Changes
###  Spinnaker Community Contributions
#### Echo
 - [feat(artifacts): Artifact matching should use entire string (#298)](https://github.com/spinnaker/echo/pull/298)

#### Fiat
 - [fix(core): Remove the circular dependency on clouddriver (#234)](https://github.com/spinnaker/fiat/pull/234)

#### Orca
 - [feat(artifacts): Artifact matching should use entire string (#2325)](https://github.com/spinnaker/orca/pull/2325)
 - [fix(auth): Avoid propagating auth to triggered pipelines (#2295)](https://github.com/spinnaker/orca/pull/2295)

There have also been numerous other enhancements, fixes, and features across all of Spinnaker's services. See their changes here:  

[Spinnaker's v1.9.5](https://www.spinnaker.io/community/releases/versions/1-9-5-changelog#spinnaker-release-1-9-5)  
[Spinnaker's v1.9.4](https://www.spinnaker.io/community/releases/versions/1-9-4-changelog#spinnaker-release-1-9-4)  
[Spinnaker's v1.9.3](https://www.spinnaker.io/community/releases/versions/1-9-3-changelog#spinnaker-release-1-9-3)  
[Spinnaker's v1.9.2](https://www.spinnaker.io/community/releases/versions/1-9-2-changelog#spinnaker-release-1-9-2)  
[Spinnaker's v1.9.1](https://www.spinnaker.io/community/releases/versions/1-9-1-changelog#spinnaker-release-1-9-1)  

## Detailed Updates

### version.manifest
Here's the version.manifest for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>export jenkins_build_number=2449
export packager_version=79b6ffd
export oss_release_type=stable
export armoryspinnaker_version=2.0.0-rc2449
export armoryspinnaker_version_manifest_url=https://s3-us-west-2.amazonaws.com/armory-web/install/release/armoryspinnaker-v2.0.0-rc2449-version.manifest
export fiat_version=release-1.9.x-2c8212d
export front50_version=release-1.9.x-9ab3290
export igor_version=release-1.9.x-6a38a83
export rosco_version=release-1.9.x-c057c1d
export clouddriver_version=release-1.9.x-a148701
export spinnaker_monitoring_version=release-1.9.x-1b2c9a2
export lighthouse_version=2a93314
export barometer_version=64a613c
export configurator_version=master-0db688c
export dinghy_version=master-9058c2f
export platform_version=master-edcbfde
export gate_armory_version=3934e4a-release-1.9.x-95b28a6
export gate_version=release-1.9.x-95b28a6
export echo_armory_version=24c4e36-release-1.9.x-c52ac8a
export echo_version=release-1.9.x-c52ac8a
export kayenta_armory_version=1b3b7bb-release-1.9.x-3f7ed70
export kayenta_version=release-1.9.x-3f7ed70
export orca_armory_version=886068c-release-1.9.x-e52579de1ad0e7e1f01f5468af0249d0f4f21bca
export orca_version=release-1.9.x-e52579de1ad0e7e1f01f5468af0249d0f4f21bca
export deck_armory_version=30e43a4-release-1.9.x-b66f7fe
export deck_version=release-1.9.x-b66f7fe
export deck_artifacts_url=https://s3-us-west-2.amazonaws.com/armory-artifacts/spinnaker/deck/spinnaker-deck-release-1.9.x-b66f7fe.tgz
export OSS_VERSION=version-2.4.3
export OSS_GIT_HASH=b66f7fe
export TAGGED_IMAGE=armory/deck:2.4.3-b66f7fe-b520-30e43a4
export SERVICE_REPO=deck
export SERVICE_VERSION=2.4.3
export SERVICE_BRANCH=master
export SERVICE_HASH=b66f7fe</code>
</pre>
</details>



### Armory
#### Lighthouse&trade; - 2a93314
No Changes

#### Dinghy&trade; - 0dce367...9058c2f
 - fix(halconfig) correct redis address
 - fix(github): support payloads without organization (#76)
 - chore(halconfig): add base config for halyard
 - chore(dependency): Update lint path
 - feat(logging): log imported settings after resolution/merging is complete
 - refactor(settings): Split settings away from their initializing; use spinnaker.yml for redis
 - feat(halconfig): Use FiatUser coming from halyard settings
 - feat(github/stash): Accept tokens directly from config

#### Platform&trade; - 12608ac...edcbfde
 - chore(dependency): Update lint path

#### Armory Echo  - 0fb709d...24c4e36
 - chore(build): update tagging for halyard (#74)
 - feat(build): OSS edge builds (#72)
 - fix(docker): update base image (#71)

#### Armory Deck  - cdb4fc2...30e43a4
 - feat(build): Bump yarn version (#467)
 - fix(build): Env variables in Docker (#457)
 - Fix(build): docker hub registry (#456)
 - chore(build): update tagging (#455)
 - feat(cloudfoundry) enable cloudfoundry in our builds (#450)
 - feat(build) move uirouter/react-hybrid resolution to merge-package.json (#449)
 - feat(ecs) add ecs to deck builds (#446)
 - feat(dep): upgrade react-ace (#443)
 - feat(configurator): preserve code-view for legacy installs
 - fix(configurator): dont fetch unless enabled (#436)
 - chore(platform/ui): read feature flag for header (#435)

#### Armory Gate  - ddbea5c...3934e4a
 - feat(build): oss edge builds (#30)
 - feat(build): Use latest jre alpine (#29)

#### Armory Kayenta  - f46ee34...1b3b7bb
 - feat(build): oss edge builds

#### Packager - fcb854c...79b6ffd
 - feat(release): Move to 2.0.0 (OSS release 1.9.x) (#409)
 - fix(post-install): pin aws-cli at 1.16.38 due to issues with cloudinit (#407)
 - feat(release): New versioning scheme for edge and rc releases (#398)
 - feat(build) pin orca to fix long ancestors issue (#396)
 - refactor(build): improvements (#386)
 - feat(build) oss edge builds (#384)

###  Spinnaker Community Contributions
See Spinnaker's release notes that are included in this release:  
[Spinnaker's v1.9.5](https://www.spinnaker.io/community/releases/versions/1-9-5-changelog#spinnaker-release-1-9-5)  
[Spinnaker's v1.9.4](https://www.spinnaker.io/community/releases/versions/1-9-4-changelog#spinnaker-release-1-9-4)  
[Spinnaker's v1.9.3](https://www.spinnaker.io/community/releases/versions/1-9-3-changelog#spinnaker-release-1-9-3)  
[Spinnaker's v1.9.2](https://www.spinnaker.io/community/releases/versions/1-9-2-changelog#spinnaker-release-1-9-2)   
[Spinnaker's v1.9.1](https://www.spinnaker.io/community/releases/versions/1-9-1-changelog#spinnaker-release-1-9-1)  
<!-- UNCOMMENT ME: Changes listed below is are extra changes that have not yet made it to another Spinnaer release version: -->
<!-- You may need to pick out some extra contributions from OSS -->

#### Clouddriver  - 95ac999...a148701
 - fix(provider/gce): Filter instance caching by location. (#2991) (#2992)
 - fix(provider/kubernetes): fix FCR for cluster-scoped resources w/ namespace (#2985) (#2989)
 - fix(provider/kubernetes): ignore cluster-scoped namespace lookup (#2984) (#2987)
 - fix(appengine): defer to configured project when using ADC (#2937)
 - fix(provider/gce): set autoscaling cap before target size in deploys. (#2952)
 - fix(provider/google): Fix caching of >500 forwarding rules (#2934) (#2943)
 - fix(provider/google): batch & service path must match (#2925) (#2927)
 - fix(provider/google): batch & service path must match (#2925) (#2926)
 - fix(core): fix error when no matching converter is found (#2915) (#2917)
 - fix(provider/kubernetes): reduce crd lookups when none exist (#2886) (#2887)
 - fix(provider/aws) : adding useragent suffix (#2889)
 - fix(core): Fix dependency in Dockerfile (#2890)
 - fix(provider/docker): Clear docker token cache after 401 (#2888)
 - fix(core): Fix dependency in Dockerfile (#2883) (#2884)
 - fix(provider/kubernetes): make request timeout configurable (#2869) (#2873)
 - fix(provider/kubernetes): Services have a cluster relationship (#2865) (#2868)
 - fix(provider/kubernetes): skip redundant check of kinds already omitted (#2866) (#2867)
 - fix(provider/kubernetes): reduce allocations during cache merge (#2863) (#2864)
 - fix(provider/kubernetes): speed up stratifying cache elements (#2857) (#2861)
 - fix(provider/kubernetes): don't record namespace relationship in cache (#2859) (#2860)
 - fix(provider/kubernetes): only load relevant on demand keys (#2854) (#2858)
 - fix(provider/kubernetes): record if a crd is namespace-scoped (#2849) (#2851)
 - fix(provider/kubernetes): deployment w/ 0 replicas is 'stable' (#2848) (#2850)
 - fix(provider/kubernetes): Speed up caching server group (#2834) (#2847)
 - fix(provider/kubernetes): avoid caching empty artifacts (#2841) (#2844)
 - fix(provider/kubernetes): be permissive of unreachable clusters on startup (#2840) (#2843)
 - fix(cats): saner redis defaults (#2836)
 - fix(provider/kubernetes): set cluster type in k8s v2 provider (#2788)
 - fix(provider/aws) : Adding name tag to newly created Security Group (#2823)
 - feat(provider/kubernetes): check kind availability before caching (#2833)
 - fix(cats): Remove unsupported annotations (#2832)
 - fix(google): Guard against null backend in disabled load balancer check (#2827)
 - feat(aws): Adding a delete ami operation (#2822)
 - refactor(provider/cf): delete existing cloud foundry implementation (#2828)
 - chore(dependencies): spinnaker-dependencies 1.0.5 (#2831)
 - fix(dependencies): Remove AWS and Google modules from the clouddriver-security dependency list. (#2830)
 - feat(builds): Introduces ability to only build specific cloud provider platforms. (#2819)
 - fix(provider/kubernetes): upgrade to latest version of spinnaker-dependencies to fix spinnaker/spinnaker#3082 (#2807) (#2825)
 - fix(artifacts): fixes multiple http base providers (#2820) (#2824)
 - fix(artifacts): fixes multiple http base providers (#2820)
 - fix(perf): reverts DefaultProviderCache metric changes (#2821)
 - feat(provider/kubernetes): Adds support for strategy.spinnaker.io/useâ€¦ (#2812)
 - fix(provider/docker): Clear docker token cache after 401 (#2817)
 - feat(provider/kubernetes): v2 Add support for api service kind (#2798)
 - fix(perf): fix performance regression due to default provider cache metrics causing extra redis reads. (#2816)
 - feat(provider/aws): r5d instance type (#2813)
 - fix(provider/openstack): fix several issues in glance v2 support (#2787)
 - fix(provider/kubernetes): upgrade to latest version of spinnaker-dependencies to fix spinnaker/spinnaker#3082 (#2807)
 - fix(google): Properly handle failures caching HTTPS load balancers (#2811)
 - feat(cache): metrics on putCacheResult. (#2790)
 - feat(kubernetes): add manifest warnings (#2810)
 - fix(google): Wait for firewall operations to complete (#2805)
 - feat(provider/kubernetes): v2 Add support for PodDisruptionBudget kind (#2808)
 - fix(titus): Handle empty tasks when constructing `TitusJobStatus` (#2806)
 - fix(provider/kubernetes): v2 check that artifact & cluster account match (#2799) (#2804)
 - fix(titus): adding another nullcheck to titusJubStatus (#2803)
 - fix(provider/gce): Fetch instance relationships for regional MIGs. (#2801) (#2802)
 - fix(provider/gce): Fetch instance relationships for regional MIGs. (#2801)
 - fix(titus): null check for titusJobStatus (#2800)
 - fix(provider/kubernetes): v2 check that artifact & cluster account match (#2799)
 - feat(aws/subnets): allow all specific subnetIds (#2796)
 - fix(provider/kubernetes): bind initContainers (#2783)
 - chore(dependencies): spinnaker-dependencies to 1.0.2 (#2797)
 - fix(titus): Handle/report incomplete target group cache data (#2793)
 - chore(docker): Reduce log level for not found tags (#2785)
 - fix(provider/kubernetes): Fix broken dockerfile (#2794)
 - feat(provider/kubernetes): adding heptio for seamless iam auth on aws (#2791)
 - feat(provider/aws): r5 and z1d instance types (#2789)
 - fix(provider/gce): Stop modifying onDemand namespace in force cache refreshes. (#2768)
 - fix(provider/gce): Fix NPEs in instance cache relationships. (#2742)
 - fix(provider/gce): Null proof cache data relationships. (#2739)
 - chore(provider/gce): Reduce GCE image SSCANs in Redis. (#2734)
 - fix(provider/titus): fix copying of scaling policies (#2784)
 - fix(cats): remove obsolete reindex code (#2782)
 - feat(aws/caching): flag to ignore public images
 - feat(scheduler): make maxConcurrentAgents a dynamic property
 - feat(provider/kubernetes): v2 Add support for storage class kind (#2779)
 - chore(dependencies): spinnaker-dependencies to 0.162.1 (#2778)
 - chore(loadtest): Removing loadtest module (#2775)
 - fix(provider/openstack): tolerate null stack. (#2769) (#2777)
 - fix(provider/openstack): tolerate null stack. (#2769)
 - chore(dependencies): update spinnaker-dependencies
 - feat(provider/kubernetes): Parse container URI in clouddriver (#2773)
 - fix(provider/titus): job with group sequence validation error has changed type to INVALID_ARGUMENT (#2774)
 - feat(provider/kubernetes): Allow image selection by digest (#2772)
 - chore(Dockerfile): Update python version to match alpinelinux. (#2770) (#2771)
 - fix(provider/openstack): tolerate null stack. (#2761)
 - chore(Dockerfile): Update python version to match alpinelinux. (#2770)
 - fix(provider/gce): Stop modifying onDemand namespace in force cache refreshes. (#2768)
 - fix(provider/titus): support specifying a digest as part of imageId (#2765)
 - fix(titus): really ignore not found on terminate (#2766)
 - feat(auth): enable/disable the accounts validator based on `FiatStatus` (#2767)
 - feat(provider/kubernetes): enable applying app labels (#2764)
 - feat(provider/appengine): Enables App Engine Standard Java 8. (#2759)
 - feat(provider/kubernetes): make id field unique, add name field for full resource name (#2756)
 - fix(provider/kubernetes): always honor the server property of a kubeconfig cluster block #3005 (#2763)
 - chore(dependencies): spinnaker-dependencies 0.161.4
 - fix(provider/titus): only fetch tasks if includeDetails is requested (#2758)
 - feat(provider/kubernetes): add UID field to LoadBalancerInstance (#2754)
 - chore(lars/typo): Fix typo in comment. (#2755)
 - fix(providers/aws): only require security groups for ALBs ( not NLBs ) (#2753)
 - feat(provider/kubernetes): add ID field to k8s manifest objects (#2751)
 - fix(provider/kubernetes): be more tolerant of failing health checks (#2750) (#2752)
 - fix(provider/kubernetes): be more tolerant of failing health checks (#2750)
 - feat(provider/kubernetes): support HPA binding (#2749)
 - fix(entity_tagger): allow for no server group providers (#2708)
 - fix(provider/eureka): change Eureka timeout to 5 minutes
 - fix(aws) only set encryption if snapshotId is not provided (#2746)
 - fix(aws) only set encryption if snapshotId is not provided (#2747)
 - fix(provider/eureka): allow polling time to be configured for eureka (#2744)
 - fix(provider/gce): Fix NPEs in instance cache relationships. (#2742)
 - feat(openstack): glance v2 api in Openstack Clouddriver (#2694)
 - fix(titus): filter out Accepted tasks since they might never be scheduled (#2741)
 - chore(dependencies): spinnaker-dependencies 0.161.0
 - fix(provider/gce): Null proof cache data relationships. (#2739)
 - fix(aws): Equality of `RateLimitingRequestHandler` should not depend on counter (#2738)
 - fix(provider/kubernetes): fix regex perf bug when parsing images (#2736) (#2737)
 - fix(provider/kubernetes): fix regex perf bug when parsing images (#2736)
 - fix(titus): only default zone balance soft constraint on services, not batch jobs (#2735)
 - perf(provider/gce): Reduce GCE image SSCANs in Redis. (#2734)
 - fix(titus): exponentially retry on submit job failures and improve error logging (#2733)
 - chore(dependencies): spinnaker-dependencies 0.158.0
 - fix(titus): refresh vpcs in addition to aws accounts (#2731)
 - fix(provider/kubernetes): fix v2 error message (#2726) (#2730)
 - fix(provider/kubernetes): fix v2 error message (#2726)
 - fix(titus): try to prevent null vpcId resolution (#2725)
 - fix(install): install kubectl if missing (#2728) (#2729)
 - fix(install): install kubectl if missing (#2728)
 - feat(kubernetes): surface kind mapping to credentials API (#2722)
 - fix(titus): scaling policies were incorrectly filtered out (#2724)
 - fix(provider/gce): Guard against null autoscaler in enable/disable. (#2723)
 - fix(titus): replace load balancer ips with instance ids (#2721)
 - fix(titus): generate correct target group key in v2 cluster caching agent (#2720)
 - fix(provider/dcos): Check if Integer null before unboxing (#2715)
 - fix(provider/amazon): ignore not found when already deleted (#2719)
 - fix(provider/amazon): improve image not found error message (#2716)
 - fix(artifacts): improve error message when account misconfigured (#2717) (#2718)
 - fix(artifacts): improve error message when account misconfigured (#2717)
 - feat(provider/gce): Adds support for autoscaling policy mode in upsert. (#2712)
 - refactor(provider/oracle): oraclebmcs cloud driver is renamed to oracle (#2702)
 - fix(provider/kubernetes): handle empty repsonse (#2710) (#2714)
 - fix(provider/kubernetes): v2 tolerate empty delete options (#2709) (#2713)
 - fix(provider/kubernetes): handle empty repsonse (#2710)
 - fix(provider/kubernetes): v2 tolerate empty delete options (#2709)
 - fix(startup): Fix startup warnings (#2700)
 - fix(titus): don't ask for instances when they're not wanted (#2707)
 - fix(provider/dcos): less verbose spectator metrics labels for dc/os exceptions
 - Adds copyright information
 - fix(provider/dcos): Cache per cluster/service account pair.
 - fix(titus): Ensure containerAttributes values are strings (#2704)
 - feat(entity_tagger): Support generic tag interface (#2696)

#### Deck  - e3122cc...b66f7fe
 - fix(amazon): Fix availability zone selector showing correct state (#5693) (#5779)
 - fix(provider/google): Deploy custom archetype fixes. (#5771) (#5772)
 - fix(core/serverGroup): Guard for existence of callbacks (#5730) (#5765)
 - fix(ecs): fixed ecs module lib path (#5712)
 - fix(kubernetes): Replace all periods in image name (#5711) (#5714)
 - fix(kubernetes): Fix container selection with multiple triggers (#5705) (#5706)
 - fix(amazon/deploy): Fix security group selector to show pre-selected security groups (#5704)
 - fix(aws): Fix clone stage. (#5700)
 - fix(artifacts): Fix artifact in execution history (#5656) (#5657)
 - fix(trigger/webhook): fix runas user (#5631)
 - fix(appengine): add server group button broken (#5628)
 - chore(halconfig): allow enabling travis & wercker in halconfig (#5609) (#5610)
 - fix(amazon/deploy): Edit deployment cluster button did not work (#5580) (#5595)
 - fix(wercker): feature toggle for wercker stages (#5586) (#5593)
 - fix(core/overrideRegistry): Fix @Overridable + Stateless Functional Component (#5573)
 - fix(artifacts): Handle Docker registries with port specifications
 - chore(core): Bump package to 0.0.251' (#5569)
 - feat(core): Export './AuthenticationInitializer' (#5568)
 - refactor(core): Convert CancelModal to react (#5564)
 - chore(core): Disable tests for CreatePipelineModal until enzyme updates
 - refactor(amazon): Convert the deploy dialog to react
 - refactor(amazon): Move AvailabilityZoneSelector
 - chore(canary): Support react deploy dialogs
 - refactor(core): Support react deploy dialogs
 - refactor(core): Add imageReader, instanceTypeService, and providerServiceDelegate to react injector
 - chore(core): Improve server group command view state interface
 - refactor(core): Remove unused addWatches from clone server group
 - refactor(core): Remove ngreact instance list
 - chore(core): Export some more serverGroup types for use by other modules
 - feat(core/wizard): Show a tooltip of errors for each sections title
 - refactor(core): Create react version of MapEditor
 - refactor(core): Create react version of platform health override
 - refactor(core): Create react version of TaskReason
 - refactor(core): Convert instance archetype selector to a component
 - refactor(core): Convert instance type selector to a component
 - refactor(core/overrides): Since overridable now has a forwardedRef, only support ComponentClass
 - refactor(core): Create a react version of DeployInitializer
 - fix(core): Make sure deploy initializer has a parentState
 - fix(google): Remove image region validation from find image stage (#5565)
 - feat(tagging): Select which upstream stages to include in image search
 - feat(checklist): Support for using Map for key/value pairs in checklist
 - feat(artifacts): alphabetically sort artifact types by label (#5563)
 - fix(authz): Fix help text for pipeline permissions. (#5562)
 - fix(core): Remove bashisms from start.sh
 - chore(amazon): Bump package to 0.0.109
 - chore(core): Bump package to 0.0.250
 - chore(amazon): Remove old load balancer controller (#5559)
 - feat(amazon/loadBalancers): Support overriding OIDC client and add help text (#5558)
 - fix(provider/google): cloning server group doesnt correctly copy disk (#5554)
 - chore(core): Update typescript and tslint dependencies (#5557)
 - chore(core): bump core package to 0.0.249 (#5556)
 - fix(kubernetes): fixes package build (#5555)
 - fix(provider/google): cloning server group doesnt correctly copy disk (#5553)
 - docs(artifacts): GitLab example URL typo (#5525)
 - chore(titus): bump to 0.0.35 (#5551)
 - feat(ecs): adds ability to build ecs as a module (#5549)
 - fix(titus): sets default disk size to 10000 and retry on run job stage to 0
 - chore(kubernetes): bump kubernetes package to 0.0.16 (#5547)
 - style(kubernetes): Removing unused variable (#5548)
 - feat(core): Adding null check to protect against undefined config (#5546)
 - feat(wercker): add wercker trigger and stage (#5519) (#5535)
 - fix(core/pipeline): Don't fail when checking Force Rebake without a trigger (#5445) (#5545)
 - feat(artifacts): Kubernetes V1 provider removes deleted artifacts (#5544)
 - feat(provider/kubernetes-v2): Add pod logs output for job kinds in deploy manifest (#5537)
 - chore(*): Update karma dependency
 - refactor(*): Add server group configuration command to all configured command functions
 - chore(core): bump core package to 0.0.248 (#5543)
 - refactor(core): Create react wrapper around deployment strategy selector
 - chore(core): account select field supports strings
 - fix(core): Support WizardModal not having any hidden sections
 - fix(core): Modal close button sometimes would submit the form
 - refactor(core): Improve server group command interface
 - feat(authz/config): Add a pipeline roles section to pipeline config. (#5536)
 - refactor(amazon): Make LoadBalancerModal use ReactModal
 - refactor(core): Make WizardModal usable in ReactModal
 - fix(artifacts): Remove kubernetes import from core (#5540)
 - Bump core and amazon (#5531)
 - feat(kubernetes): Add consumed artifacts to Kubernetes V1 provider (#5538)
 - Revert "feat(wercker): add wercker trigger and stage (#5519)" (#5534)
 - feat(wercker): add wercker trigger and stage (#5519)
 - chore(kubernetes): bump package version (#5532)
 - fix(core): Fix undefined on spel decorator (#5529)
 - fix(core): Fix stage execution windows from undefined error (#5530)
 - fix(core): Fix undefined when page navigator inits (#5528)
 - feat(amazon/loadBalancer): Add confirmation if removing an existing oidc rule from an ALB (#5521)
 - chore(titus): bump to 0.0.34
 - fix(loading): Surface error connecting to gate on applications screen (#5515)
 - fix(titus): no longer hide metadata fields since they are not set by the backend to labels anymore
 - feat(kubernetes): Allow deploying containers specified as artifacts (#5524)
 - fix(pipeline): Correctly handle saving pipeline templates (#5450) (#5520)
 - chore(core): Bump core to 0.0.246 (#5523)
 - chore(core): Bump up core to 0.0.245 (#5522)
 - fix(core/cluster): Do not scroll to bottom of clusters view when no cluster is selected (#5518)
 - fix(kubernetes): console output broken for instances (#5516)
 - feat(instances): support name field on IInstance (#5506)
 - chore(core): bump to 0.0.245
 - fix(docker): change link format for docker insight link
 - fix(core): properties message for jenkins stage is wrong
 - fix(trigger/webhook): fix linting issue (#5510)
 - fix(trigger/webhook): fix lint issue - 1.8 (#5511)
 - fix(trigger/webhook): add runAsUser to webhook (#5508)
 - fix(trigger/webhook): add runAsUser to webhook (#5507)
 - chore(amazon): Bump to 0.0.107
 - feat(aws): nlb support
 - fix(provider/kubernetes): Remove patch manifest stage from v1 provider (#5502)
 - chore(amazon): Bump to 0.0.106 (#5501)
 - chore(core): bump to 0.0.244
 - fix(core): Warnings to publish core
 - feat(core): customizing maximum number of pipelines displayed (#5497)
 - fix(amazon/loadBalancer): Support order property in listener actions (#5495)
 - feat(core): Adding option to fail pipeline on failed expressions (#5494)
 - feat(core): bump up package version to 0.0.243
 - fix(core): Fixed cluster scroll jump
 - chore(kayenta): Bump to 0.0.54. (#5493)
 - chore(kayenta): Bump to 0.0.53. (#5492)
 - fix(amazon/loadBalancer): Make sure oidc actions have client secret (#5491)
 - feat(titus): Show amazon account for run job stage
 - feat(titus): Show aws account backing titus account in deploy dialog
 - fix(amazon): Force user to ack removed load balancers before saving deploy config (#5485)
 - fix(amazon/loadBalancer): Fix DNS link in target group to match load balancer (#5489)
 - fix(build): add cachebust query param to scripts in index.html (#5482) (#5488)
 - fix(kubernetes): menifest -> manifest (#5487)
 - feat(kubernetes): add more info about k8s-v2 loadbalancer (#5486)
 - fix(pubsub): tooltip specifies constraint value is java regex (#5484)
 - feat(notification): Add support for Google Chat. (#5478)
 - fix(core): Should trim pipeline name on save (#5481)
 - feat(build): add cachebust query param to scripts in index.html (#5482)
 - Revert "feat(build): add cache bust for builds (#5479)" (#5480)
 - feat(build): add cache bust for builds (#5479)
 - chore(amazon): bump package to 0.0.105 (#5477)
 - chore(core): Bump to 0.0.242 (#5476)
 - chore(build): remove console.log (#5475)
 - fix(titus): Fix links to titus servergroups from amazon load balancer (#5474)
 - feat(pipeline): Support `runAsUser` for implicit pipeline triggers (#5473)
 - chore(titus): Bump to 0.0.33 (#5472)
 - fix(titus): Default to 1 percent for container migrations vs 1 instance (#5471)
 - feat(kubernetes): add account tag to pipeline headers (#5470)
 - feat(kubernetes): use kind mapping to determine details view (#5469)
 - chore(core): bump package to 0.0.241 (#5468)
 - chore(kayenta): Bump package to 0.0.52. (#5467)
 - fix(kubernetes): don't restrict runnningExecution spinner to deployManifest stages (#5466)
 - chore(core): bump package to 0.0.240 (#5465)
 - feat(kubernetes): render ongoing deploy manifest executions in clusters tab (#5464)
 - feat(provider/kubernetes): generic details view for unmapped resources (#5463)
 - feat(provier/kubernetes): add artifact tab to bakeManifest executions (#5462)
 - refactor(provider/oracle): oraclebmcs provider is renamed to oracle (#5441)
 - chore(core): bump package to 0.0.239 (#5461)
 - feat(core): feedback link (#5460)
 - feat(provider/gce): Adds mode to autoscaling detail and upsert. (#5458)
 - feat(notification): add bearychat support (#5430)
 - chore(amazon): bump package to 0.0.104 (#5459)
 - chore(core): Bump to 0.0.238 (#5453)
 - fix(bake/manifest): fix passing namespace in helm bakery (#5457)
 - feat(google/iap): Refreshes IAP session after they expire.
 - fix(bake/manifest): fix passing namespace in helm bakery (#5456)
 - fix(core/application): Fix delete application modal hanging (#5455)
 - fix(pipeline): Correctly handle saving pipeline templates (#5450)
 - feat(core/presentation): use ValidationMessage for BasicLayout error/warning/preview (#5452)
 - fix(core/presentation): BasicLayout: align the input and actions items (#5451)
 - fix(core/presentation): add className prop to SubmitButton.tsx, use html button (not bootstrap) (#5449)
 - fix(core/presentation): fix broken travis
 - chore(deps): bump kayenta to 0.0.50 (#5447)
 - feat(core/presentation): Add React components for Form Inputs/Layouts/Fields
 - refactor(core/validation): Rename ValidationError to ValidationMessage, add 'type' prop
 - fix(core/pipeline): Don't fail when checking Force Rebake without a trigger (#5445)
 - fix(core/application): Fix delete application modal hanging
 - fix(core/securityGroup): Fix links to titus server groups (in sidebar) from firewalls screen

#### Echo  - 56a9f63...c52ac8a
 - fix(artifacts): Fix GCB message format support. (#315) (#321)
 - feat(echo): add trigger field for custom triggers that deal with artifacts (#309)
 - chore(dependencies): spinnaker-dependencies 1.0.5 (#308)
 - feat(pubsub): allow custom jinjava (#307)
 - fix(aws pubsub): add allow jar path and don't fail if parsing artifact fails (#306)
 - fix(github): Fail github authentication when header is absent (#302) (#303)
 - fix(github): Fail github authentication when header is absent (#302)
 - feat(trigger/wercker): Add wercker trigger (#295)
 - feat(artifacts/quay): add native quay parser (#299)
 - feat(artifacts/gitlab): gitlab artifact parser (#301)
 - chore(dependencies): spinnaker-dependencies to 1.0.2 (#300)
 - fix(cron): retain and pass the rebake field to orca (#284)
 - chore(dependencies): spinnaker-dependencies 0.162.1
 - chore(dependencies): spinnaker-dependencies 0.162.0
 - feat(artifacts): Artifact matching should use entire string (#298)
 - fix(notifications): Support email notifications with ' ' in them (#294)
 - fix(docker) fixed command to add spinnaker user (#290)
 - fix(healthcheck): pipelines might have no triggers (#293)
 - fix(healthcheck): pipelines might have no triggers (#292)
 - feat(trigger): adds pipeline trigger status field (#289)
 - fix(notifications): Fix variable reference bug in Google Chat (#288)
 - chore(logs+tests): removing excessive logging, adding tests (#287)
 - fix(fiat): Set `@EnableFiatAutoConfig` to avoid unnecessary auth requirements (#286)
 - fix(pubsub/amazon): pull utils to kork, update permissions on sqs (#285)
 - feat(notification): Add support for Google Chat. (#282)
 - feat(webhooks): Update webhooks endpoint to forward and return a eventId. (#277)
 - feat(fiat): Delegate whether fiat is enabled to `FiatStatus` (#283)
 - chore(*): Bump kork to 0.159.2 (#281)
 - chore(*): Bump spinnaker-dependencies to 0.158.0 (#280)
 - fix(pubsub/google): don't restart when subscription doesn't exist (#276) (#279)
 - fix(pubsub/google): don't restart when subscription doesn't exist (#276)
 - fix(pipelines): Generalize fix for pipeline race condition (#275)
 - fix(pubsub): Wait until pipelines are loaded to process pubsub messages (#274)
 - feat(notification): add bearychat support (#272)

#### Fiat  - 112f58a...2c8212d
 - fix(ldap): Return a new ExternalUser from multiLoadRoles in LDAP (#260)
 - fix(roles): Avoid filtering when `allowAccessToUnknownApplications` is enabled (#255)
 - feat(api): FiatPermissionEvaluator reliablity (#254)
 - feat(api): Allow `admin` to access any resource regardless of permission (#253)
 - fix(api): Fix enabled/legacyFallback fallbacks in `FiatStatus` (#252)
 - feat(roles): Adding dynomite support (#249)
 - feat(metrics): Enable the `OkHttpMetricsInterceptor` for `FiatService` (#251)
 - fix(web): getUserPermission() should set `AllowAccessToUnknownApplications`
 - feat(core): Support allowing default access to all unknown applications
 - chore(dependencies): spinnaker-dependencies to 0.161.6 (#246)
 - feat(logs): Bit of logging when permissions are updated (#245)
 - fix(roles): Introduce cache / short refresh around clouddriver calls (#243)
 - feat(roles): Support passing additional user details to `UserRolesProvider` (#242)
 - fix(core): s/legacyFallback/fiat.legacyFallback (#241)
 - feat(core): Support a fallback to legacy account permissions (#240)
 - fix(roles): Stop syncing if list of users is empty. (#239)
 - fix(authz/api): Perform a full sync if the specific roles are an empty list (#238)
 - feat(core): User role syncing should pause when not in discovery (#237)
 - fix(tests): Ensure that the `UserRolesSyncer` does not run mid-test (#236)
 - fix(core): Explicitly create `ObjectMapper` (#235)
 - fix(core): Remove the circular dependency on `clouddriver` (#234)
 - feat(api): Support enabling fiat at runtime (#233)

#### Front50  - 93febf2...9ab3290
 - fix(s3): Add control over nb of objects retrieved per batch (maxKeys) (#366)
 - chore(dependencies): spinnaker-dependencies 1.0.5 (#342)
 - chore(dependencies): spinnaker-dependencies to 1.0.2 (#341)
 - fix(core): Fix race condition in cache invalidation (#340)
 - chore(dependencies): spinnaker-dependencies to 0.162.1 (#339)
 - feat(metrics): Enable the OkHttpMetricsInterceptor (#338)
 - chore(dependencies): spinnaker-dependencies to 0.162.0 (#337)
 - chore(typo): Fix typos. (#336)
 - fix(gcs): Cleanup old timestamps less eagerly to reduce chance of rate limiting. (#335)
 - chore(dependencies): spinnaker-dependencies to 0.161.4 (#334)
 - fix(web): savePipeline() should return the newly created pipeline (#333)
 - fix(gcs): tolerate rate limit errors on timestamp files. (#328)
 - chore(dependencies): update spinnaker-dependencies (#332)
 - feat(notification): Add support for Google Chat. (#330)
 - fix(service-accounts): Perform a full sync on service account creation. (#329)
 - chore(dependencies): bump to 0.161.0 (#331)
 - fix(google): Fix caching of permissions (#326) (#327)
 - fix(google): Fix caching of permissions (#326)
 - chore(build): Add debug flag to front50 build (#325)

#### Gate  - 5d505ca...95b28a6
 - fix(iap/x509): Properly call the x509 configurer if set. (#604) (#607)
 - fix(authn/iap): Change filter to respect AuthConfig permitted paths. (#591) (#592)
 - fix(security): Sets all WebSecurityConfigurerAdapters to LOWEST_PRECEDENCE. With this change and the management.port set to a different port, it ensures that requests to management endpoints do not get caught by the AnyRequest matcher of the application. This is part of an effort to Make Endpoints Great Again (#557) (#589)
 - feat(iap/x509): Allow IAP and x509 to be enabled together. (#580)
 - feat(security): Adds ability to turn on security debug information with (#556)
 - feat(wercker): added a 'type' query param to the /v2/builds endpoint in BuildController (#574)
 - chore(dependencies): spinnaker-dependencies to 1.0.2 (#579)
 - chore(swagger): Update generate_swagger script. (#577)
 - fix(cors): improved corsfilter log message
 - feat(cors): cors allowed origin auditing
 - feat(auth): conditional fiat session filter
 - feat(x509): debounce login calls to fiat with x509
 - fix(fiat): Add retries around `permissionService.loginWithRoles()` (#571)
 - fix(fiat): Smidge of logs when loading a saml user (#570)
 - fix(auth): throw classified exceptions from PermissionService
 - chore(build): Add debug flag to gate build (#567)
 - fix(web): Enable the `OkHttpMetricsInterceptor` (#566)
 - fix(fiat): Always create `FiatService` regardless of `services.fiat.enabled` (#565)
 - chore(dependencies): spinnaker-dependencies 0.161.3 (#564)
 - feat(fiat): Delegate whether fiat is enabled to `FiatStatus` (#563)
 - feat(triggers): Add endpoint to search for pipeline executions and change webhooks endpoint to return a map. (#560)
 - chore(dependencies): spinnaker-dependencies 0.161.0
 - chore(dependencies): spinnaker-dependencies 0.158.0
 - fix(hystrix): Avoid an `NaN` when publishing `hystrix.currentTime` (#558) (#559)
 - fix(hystrix): Avoid an `NaN` when publishing `hystrix.currentTime` (#558)
 - fix(fiat): Transitional support for fiat migration.
 - fix(logging): reduce legacy permission logging

#### Igor  - 6a38a83
No Changes

#### Kayenta  - 9f62a06...3f7ed70
 - feat(judge): Implement effect size post-MannWhitney check (#356)
 - feat(config): Externalize tolerance anc confLevel as configurable settings of MannWhitney test. (#357)
 - chore(metric-source): Refator to make metric sources fully modular (#350)
 - fix(judge): Round the Summary Score to 2 decimal places (#351)
 - chore(mann-whitney): Clean-up Mann-Whitney test suite (#346)
 - fix(stats): Move the toMap method to the MetricStatistics class (#345)
 - fix(metrics): store end time so we can synthesize missing data later (#344)
 - fix(buckets): Implicitly create non-existent buckets during config indexer run. (#348)
 - fix(judge): Handle tied ranks by adding Gaussian white noise (#343)
 - feat(stackdriver): Support alternate alignment & reduction settings. (#342)
 - fix(aws): Set region and other attributes before invoking build() on builder. (#341)
 - fix(judge): for NaN replacement, nodata means pass (#339)
 - chore(stackdriver): Make resource type error message clearer. (#338)
 - feat(stackdriver): Add support for legacy gke_container resource type. (#337)
 - feat(judge): Add REMOTE_JUDGE type of account credentials. (#336)
 - fix(judge): catch all runtime exceptions with a message (#334)
 - chore(deps): update orca (#331)
 - chore(deps): update deps (#329)
 - fix(Judge): Handle Nodata groups correctly (#326)
 - feat(judges): Add test controller for canary judges. (#328)
 - remove accidently included file
 - fix(mann-whitney): fix exception class (#327)
 - feat(influxdb): added integration to influxdb as a metric source (#324)
 - chore(orca): update, also add allow-all http access (#319)
 - feat(aws/s3): Add support for named profiles. (#322)

#### Orca  - de4ab55...e52579de1ad0e7e1f01f5468af0249d0f4f21bca
 - fix(provider/kubernetes): fix FCR for cluster-scoped resources w/ (#2427) (#2429)
 - fix(orca) fix force cache refresh sometimes taking 12 minutes (#3366) (#2422) (#2424)
 - fix(canary): When resolving final run score, filter on parent id and sort all child run canary stages. (#2372)
 - fix(orca/redis) fix multi-redis configuration (#2352)
 - feat(trafficguards): add a check on deregisterInstancesFromLoadBalancer (#2351)
 - feat(tagging): Select which upstream stages to include in image search (#2138)
 - fix(core): Avoid revisiting stages when traversing ancestors (#2349) (#2451)
 - fix(pipeline_templates): Fix trigger inheritance (#2348)
 - feat(qos): namespace redis buffered execution index (#2347)
 - feat(core): Add source field to execution (#2345)
 - fix(spel): Fix escaping of SpEL expressions (#2341)
 - chore(dependencies): spinnaker-dependencies 1.0.5 (#2344)
 - feat(traffic guards): perform check on disableInstancesInDiscovery (#2342)
 - feat(spel): add support for Instant.java in spel (#2338)
 - feat(kubernetes): add manifest warnings to context (#2337)
 - feat(stage/wercker): Implemented a Wercker Pipeline Stage for triggering Wercker Builds (#2313)
 - chore(trafficguard): Add metrics to traffic guards (#2335)
 - chore(dependencies): spinnaker-dependencies to 1.0.2 (#2336)
 - fix(retrofit): Do not retry requests that cannot succeed (#2334)
 - fix(pipeline_template): Better HTTP loader handling of unsuccessful requests (#2333)
 - feat(pipeline_templates): Add stage looping support (#2331)
 - feat(artifacts): Artifact matching should use entire string (#2325)
 - chore(core): Add test to ensure expressions allow string method calls (#2324)
 - feat(queue): Add hydrate queue admin command (#2315)
 - fix(serviceAccounts): Ensure service account names are always lowercase (#2332)
 - fix(titus): restore min capacity if using source capacity (#2327)
 - fix(caching): Poll for completion if any cache update is not immediate (#2330)
 - feat(authz): Generate fiat service accounts on pipeline save. (#2314)
 - feat(clouddriver): Allow `TASK_NOT_FOUND_TIMEOUT` to be overridden (#2328)
 - fix(pipeline_template): Ignore jackson @class annotations (#2326)
 - chore(dependencies): spinnaker-dependencies to 0.162.1 (#2322)
 - chore(dependencies): spinnaker-dependencies to 0.162.0 (#2320)
 - fix(pipeline_template): Support rendering on map keys (#2319)
 - feat(kubernetes): Resolve docker containers passed as artifacts (#2318)
 - fix(entitytags): improved timeout handling for servergroup entity tagging.
 - feat(redis): Adding instrumented redis execution repo (#2310)
 - fix(timeout): Allow for execution windows when checking timeout override
 - fix(titus): Include `application` in context of a job run (#2312)
 - fix(auth): Avoid propagating auth to triggered pipelines (#2295)
 - feat(core): Adding custom trigger deserializer capability (#2294)
 - fix(pipelines): Remove test endpoint that was accidentally added. (#2309)
 - fix(front50): Correctly extract the pipeline identifier (#2308)
 - fix(bake): strip baseOs from titus bake reqs (#2307)
 - fix(bake): fix NPE when baseOs is absent (#2306)
 - chore(debugging): log out details of weird intermittent error (#2305)
 - feat(orca-web): Support parallel jobs in tasks submitted to /ops (#2304)
 - feat(expressions): Adding support for failing stage on failed evaluations (#2303)
 - fix(provider/kubernetes): fail when an artifact couldn't be bound (#2301) (#2302)
 - fix(provider/kubernetes): fail when an artifact couldn't be bound (#2301)
 - feat(notification): Add support for Google Chat. (#2297)
 - chore(dependencies): bump `spinnaker-dependencies` to 0.161.1 (#2300)
 - feat(kayenta): annotate canary run results with warnings (#2299)
 - feat(pipelines): Add endpoint to search for pipeline executions. (#2292)
 - feat(fiat): Delegate whether fiat is enabled to `FiatStatus` (#2298)
 - chore(dependencies): update to spinnaker-dependencies 0.158.0
 - refactor(core): Move stage sort logic to utility function (#2276)
 - fix(gce/deploy): Don't capacity pin all types of strategies. (#2293)
 - fix(provider/kubernetes): fix NPE when no artifact given (#2289) (#2291)
 - fix(provider/kubernetes): fix NPE when no artifact given (#2289)
 - refactor(provider/oracle): oraclebmcs provider is renamed to oracle (#2287)
 - feat(deploy/gce): Support for capacity pinning on GCE deploys. (#2284)
 - Filter preconfigured webhooks based on READ permissions (#2272)
 - feat(kayenta): support analysis lifetimes shorter than 1 hour (#2282)
 - fix(pipeline_template): Allow underscores in published templates (#2281)

#### Rosco  - adf0e78...c057c1d
 - chore(packer): upgrade packer binary to 1.2.2 (#271) (#272)
 - fix(install_packages): support for multiple repos (#268)
 - fix(install_packages): support for multiple repos (#267)