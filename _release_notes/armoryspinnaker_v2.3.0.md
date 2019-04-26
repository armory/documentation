---
layout: post
title: v2.3.0 Armory Release (OSS v1.12.x)
order: -20190328005257
hidden: false
---

# 03/28/19 Release Notes
{:.no_toc}

> Note: If you're experiencing production issues after upgrading Spinnaker, rollback to a [previous working version](http://docs.armory.io/admin-guides/troubleshooting/#i-upgraded-spinnaker-and-it-is-no-longer-responding-how-do-i-rollback) and please report issues to [http://go.armory.io/support](http://go.armory.io/support).

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Known Issues
The following known issues exist in this release. 
- Fiat service accounts are not used properly by Dinghy
- Enabling SSL Termination at Deck results in Deck failing to start

Please upgrade to Armory Spinnaker 2.3.4

## Highlighted Updates
### Armory

#### Dinghy
- fix(bitbucket/cloud): Added bitbucket cloud specific implementation

#### Terraformer
- feat(git): add branch to clone options
- fix(artifacts): fix varfile artifacts (#41)

#### Armory Deck
- chore(docker): alpine + apache2

#### Armory Gate
 - feat(auth/saml): Allow saml.maxAuthenticationAge (kludge)



###  Spinnaker Community Contributions
- GovCloud and China Regions are now supported [clouddriver/6529edd](https://github.com/spinnaker/clouddriver/commit/6529edd80807f8c9e88ef32a381541bc43cfe2c7)
- Deck: The JSON pipeline config editor now supports syntax checking and syntax highlighting.
- The webhook stage now allows users to specify HTTP status codes that cause the stage to fail fast.
- Kayenta: This release adds support for Graphite as a metrics service. A standalone canary analysis module was also added, and this makes it easier to consume Kayenta from non-Spinnaker environments.


See Spinnaker's release notes that are included in this release:
- [Spinnaker v1.12.0](https://www.spinnaker.io/community/releases/versions/1-12-7-changelog#spinnaker-release-1-12-0)
- [Spinnaker's v1.12.7](https://www.spinnaker.io/community/releases/versions/1-12-7-changelog#spinnaker-release-1-12-9)



<br>

## Detailed Updates

### version.manifest
Here's the version.manifest for this version.
<details><summary>Expand</summary>
<pre class="highlight">
<code>export jenkins_build_number=26
export packager_version=e35743d
export oss_release_type=stable
export armoryspinnaker_version=2.3.0-rc26
export armoryspinnaker_version_manifest_url=https://s3-us-west-2.amazonaws.com/armory-web/install/release/armoryspinnaker-v2.3.0-rc26-version.manifest
export deck_version=2.7.6-6324862-stable6
export deck_armory_version=2.7.6-353206e-6324862-rc24
export igor_version=1.1.1-63d06a5-stable4
export igor_armory_version=1.1.1-77b94ee-63d06a5-rc5
export front50_armory_version=0.15.2-cc25587-3105e86-rc3
export front50_version=0.15.2-3105e86-stable4
export clouddriver_version=4.3.7-171c3ba-stable5
export clouddriver_armory_version=4.3.7-0cd856f-171c3ba-rc3
export spinnaker_monitoring_version=0.11.2-232c84a-rc4
export echo_version=2.3.1-5db9d43-stable4
export echo_armory_version=2.3.1-a6b93b0-5db9d43-rc4
export kayenta_armory_version=0.6.1-7fab32f-81d906b-rc2
export kayenta_version=0.6.1-81d906b-stable4
export dinghy_version=0.0.2-b491663-rc4
export rosco_armory_version=0.10.0-0377c71-af545ba-rc2
export rosco_version=0.10.0-af545ba-stable4
export gate_armory_version=1.5.2-6f60d35-b238ab9-rc4
export gate_version=1.5.2-b238ab9-stable5
export terraformer_version=0.0.1-661752d-rc2
export orca_version=2.4.1-c488de1-stable5
export orca_armory_version=2.4.1-c201555-c488de1-rc4
export fiat_armory_version=1.3.2-888fafe-daf21b2-rc4
export fiat_version=1.3.2-daf21b2-stable4</code>
</pre>
</details>



### Armory
#### Dinghy&trade; - 0c66ede...b491663
 - fix(stalePipelines): pass parameter from dinghyfile instead of always taking it as false (#121)
 - fix(dinghyfiles): fix to dinghyfiles not on root being reported as not changes to dinghyfile (#120)
 - chore(build): jenkins provides the docker tag
 - fix(preprocessor): return error from ParseGlobalVar
 - refactor(dinghy): standardize logging and error handling (#117)
 - chore(build): Shared pipeline
 - feat(modules): declare variable for redability
 - feat(modules): change test to check the actual result without removing whitespaces
 - feat(modules): declare variable for redability
 - chore(tests): fix broken test
 - feat(modules): allow passing variables from dinghyfile to module inside a module
 - fix(dinghy/github): Added missing initialization of configs
 - feat(test): small unit tests in util
 - fix(modules): fix issue for all request where PipelineAPI was not being setup properly
 - chore(dependencies): Added more tests
 - chore(dependencies): Don't ignore vendor folder
 - chore(bitbucket/cloud): Added tests, refactored logic
 - refactor(spinnaker): refactor spinnaker package (#110)
 - fix(bitbucket/cloud): Added bitbucket cloud specific implementation (#106)
 - refactor(settings): no reference global settings (#109)
 - refactor(settings): refactor settings to be more testable (#108)
 - chore(build): use consistent commit-hash length (7) (#107)
 - chore(build): use armory golang-dep for images (#105)
s
#### Terraformer&trade; - a1adbb1...661752d
 - refactor(executor): no mas workers (#46)
 - chore(build): jenkins provides the dockertag
 - chore(build): Shared pipeline
 - fix(terraformer/github): Fixed master branch reference name (#43)
 - chore(build): use consistent commit-hash length (7)
 - fix(artifacts): fix varfile artifacts (#41)
 - feat(git): add branch to clone options
 - use armory golang-dep for images (#39)

#### Armory Clouddriver  - cedd917...0cd856f
 - chore(build): Don't exclude data-rest, we need it
 - fix(build): make gradle use https
 - chore(build): Shared pipeline, gradle plugin (#26)
 - sort apk add packages
 - dockerfile
 - ignore large unused files when doing docker build
 - fix(build): we were grabbing the wrong springboot version
 - upgrade gradle to 4.10.2
 - chore(build): use consistent commit-hash length (7) (#23)
 - chore(build): Delete lock file if it exists but not referenced (#21)
 - fix(gitignore): remove deprecated file
 - adding clouddriver-armory-dependneices and global.lock to gitignore
 - updating .gitignore and removing build files
 - check if global.lock exists before using it
 - chore(build): always add dependencies to props

#### Armory Deck  - f63c795...353206e
 - fix(index): remove overflow rule because scrolling was weird (#497)
 - fix(build): update yarn.lock to resolve integrity check failure (#496)
 - fix(build): don't override OSS packages (#494)
 - chore(build): Shared pipelines (#493)
 - fix(build): Add compression (#492)
 - chore(build): grant on deck dir (#491)
 - chore(build): Add directory index, re-add require (#490)
 - chore(build): remove Require usage (#489)
 - chore(build): Remove require (#488)
 - chore(docker): alpine + apache2 (#487)
 - chore(build): use consistent commit-hash length (7) (#486)

#### Armory Echo  - 7c03592...a6b93b0
 - fix(build): make gradle use https (#97)
 - chore(build): Bump gradle plugin version (#96)
 - chore(build): Use gradle plugin (#95)
 - chore(build): Use gradle plugin (#94)
 - chore(build): Move to managed job and shared pipeline (#93)
 - chore(docker): align dockerfile with oss (#92)
 - chore(build): use consistent commit-hash length (7) (#91)
 - Kork dependency (#90)
 - Kork dependency (#87)
 - fix(dinghy) add bitbucket-cloud as a supported source, this will allow requests to /git/bitbucket-cloud (#88)
 - chore(build): set kork dependencies (#86)

#### Armory Fiat  - 67eb37f...888fafe
 - fix(build): make gradle use https
 - chore(build): Shared pipelines, gradle plugin (#12)
 - chore(docker): align dockerfile with oss
 - chore(build): use consistent commit-hash length (7) (#10)
 - chore(build): use idiomatic groovy
 - fix(build): reference service when reading buildDef
 - chore(build): conditionally set kork version
 - chore(build): set kork dependencies

#### Armory Front50  - 0c68eb2...cc25587
 - fix(build): make gradle use https
 - chore(build): bump plugin version
 - Update .gitignore
 - chore(build): Ignore the right bin/
 - chore(build): Shared pipeline, gradle plugin
 - chore(docker): align dockerfile with oss
 - chore(build): use consistent commit-hash length (7) (#8)
 - chore(build): use idiomatic groovy (#7)
 - chore(build): set kork dependencies (#6)

#### Armory Gate  - 34eb422...6f60d35
 - feat(auth/saml): Allow saml.maxAuthenticationAge (kludge) (#58)
 - fix(build): make gradle use https (#57)
 - chore(build): Bump gradle plugin (#56)
 - chore(docker): align dockerfile with oss (#54)
 - chore(build): Use gradle plugin and shared pipelines (#55)
 - chore(build): use consistent commit-hash length (7) (#53)
 - fix(build): do not check file size (#52)
 - chore(build): use idiomatic groovy (#51)
 - chore(build): set kork dependencies (#50)
 - chore(build): set kork dependencies (#49)

#### Armory Igor  - 803f082...77b94ee
 - fix(build): make gradle use https
 - chore(build): Shared pipeline, gradle plugin (#17)
 - dont use crumb for w/e reason, prob using the getCrumb(), stupid groovy
 - chore(docker): align dockerfile with oss
 - chore(build): use consistent commit-hash length (7) (#15)
 - chore(build): use idiomatic groovy (#14)
 - chore(build): set kork dependencies (#13)

#### Armory Kayenta  - 3ef38cd...7fab32f
 - chore(build): Shared pipeline, gradle plugin (#23)
 - chore(docker): align dockerfile with oss
 - chore(build): use consistent commit-hash length (7) (#21)
 - chore(build): use idiomatic groovy (#20)
 - chore(build): set kork dependencies (#19)

#### Armory Orca  - 5880fa3...c201555
 - fix(build): make gradle use https
 - chore(build): Bump plugin version (#29)
 - chore(build): springboot version from OSS (#28)
 - chore(build): Shared pipeline, gradle plugin (#27)
 - force using groovy 2.5.0 for springboot compatability
 - chore(docker): align dockerfile with oss
 - chore(build): use consistent commit-hash length (7) (#25)
 - chore(build): use idiomatic groovy
 - fix(build): reference service when reading buildDef
 - chore(build): set kork dependencies (#23)
 - chore(build): conditionally set kork version
 - chore(build): set kork dependencies

#### Armory Rosco  - becf57a...0377c71
 - fix(build): make gradle use https
 - chore(build): Use shared pipelines and gradle plugin (#11)
 - chore(build): use consistent commit-hash length (7) (#10)
 - chore(build): use idiomatic groovy (#9)
 - chore(build): set kork dependencies (#8)
 - chore(build): set kork dependencies (#7)

#### Packager - 200cdad...e35743d
 - Revert "feat(core/execution-parameters): condense parameters/artifacts and make it collapsable (#522)" (#523)
 - feat(core/execution-parameters): condense parameters/artifacts and make it collapsable (#522)
 - chore(release): point deck to 2.2.x release branch (#521)
 - chore(release): start building 1.12.x (i.e. 2.3.x) (#520)
 - chore(build): Managed job for Deck (#519)
 - chore(build): Skip go services on PR (#518)
 - chore(build): Manage non extended services (#517)
 - chore(build) (#516)
 - chore(build): Managed jobs for other java extended services (#515)
 - chore(build): Gate managed job (#514)
 - chore(build): Managed job for orca (#513)
 - chore(build): Move echo-armory to managed (#512)
 - chore(build): escape dollar signs (#511)
 - add release name (#510)
 - split version on - (#509)
 - chore(build): Pass base version for rpm (#508)
 - fix(build): version number for non stable (#506)
 - fix(build): Def of 2.1.x (#505)
 - chore(build): removing kork as a dependency for deck (#504)
 - chore(build): adding build job to kork (#503)
 - chore(build): adding armory-io/kork to services.yml (#502)
 - chore(build): create secrets-2.2.x (#501)
 - chore(builds): point back to spinnaker/clouddriver for 2_2_x (#500)
 - chore(release): bump version of 2.2.x rc to 2.2.1 (#499)



###  Spinnaker Community Contributions
<!-- UNCOMMENT ME:
See Spinnaker's release notes that are included in this release:
[Spinnaker's v1.8.0](https://www.spinnaker.io/community/releases/versions/1-8-0-changelog#individual-service-changes)
[Spinnaker's v1.8.1](https://www.spinnaker.io/community/releases/versions/1-8-1-changelog#individual-service-changes)

<!-- UNCOMMENT ME: Changes listed below is are extra changes that have not yet made it to another Spinnaer release version: -->
<!-- You may need to pick out some extra contributions from OSS -->

#### Clouddriver  - 5fd694ffe...171c3ba
 - fix(provider/kubernetes): Properly set unstable flag for deployment (#3477) (#3478)
 - fix(appengine): Allow suppression of sequence in deployed servergroup names (#3453) (#3457)
 - fix(appengine): add configurable caching agent interval (#3446)
 - fix(provider/kubernetes): Support the renaming of the heptio-authenticator-aws to aws-iam-authenticator (#3316) (#3437)
 - fix(provider/azure): add support for Azure US Government environment (#3400) (#3418)
 - fix(google): Fix search for Google provider (#3419) (#3420)
 - fix(dependencies): have spinnaker-dependencies manage common-langs version (#3388) (#3410)
 - fix(artifacts/github): Fix threading bug in github artifact resolver (#3386) (#3408)
 - fix(kubernetes/v2): Parallelize checking for omitKinds (#3366) (#3407)
 - fix(kubernetes): return only valid kinds from UnregisteredCrdCachingAgent.primaryKinds (#3394) (#3397)
 - fix(search/cats): Avoid short-circuiting when filters are empty. (#3393) (#3396)
 - fix(dependencies): have spinnaker-dependencies manage common-langs version
 - fix(dependencies): specify version for commons-lang3
 - fix(provider/kubernetes): Fix NPE on ingress with no http (#3379) (#3380)
 - fix(provider/appengine): Fix NPE thrown when deploying GCS object using default creds (#3377) (#3378)
 - fix(kubernetes): fix image resolution for project clusters view (#3286) (#3375)
 - fix(provider/kubernetes): Set podSecurityPolicy to not be namespaced (#3350) (#3374)
 - fix(provider/kubernetes): Allow for custom suffix on managed-by label. (#3369) (#3373)
 - fix(provider/aws): change STS endpoints for GovCloud and China regions (#3352) (#3370)
 - fix(provider/gce): Fix metadata for autoscaler deletes. (#3368) (#3371)
 - fix(provider/aws): Only describe instance health for ELBs (#2699) (#3196) (#3360)
 - chore(*): Pin spring-boot-starter-test to springBoot version (#3336) (#3341)
 - fix(provider/kubernetes): fix NPE on KubernetesV2ServerGroup disabled… (#3325) (#3334)
 - fix(provider/kubernetes): fix NPE on KubernetesV2ServerGroup disabled… (#3325) (#3331)
 - chore(dependencies): Bump spinnaker-dependencies (#3329)
 - fix(provider/kubernetes): events relate to cluster-scope objs (#3312) (#3314)
 - Fix missing jars release 1.11.x (#3306)
 - chore(provider/kubernetes): add agent type to caching logs (#3307) (#3313)
 - chore(dependencies): Autobump spinnaker-dependencies (#3302) (#3303)
 - chore(dependencies): Autobump spinnaker-dependencies (#3300) (#3301)
 - chore(dependencies): Autobump spinnaker-dependencies (#3298)
 - config(google): Update GCE's base URL to the new domain (#3288)
 - feat(provider/gce): Support accelerator types for zonal migs. (#3296)
 - fix(titus): streaming agent is authoritative for clusters (#3289)
 - fix(kubernetes): fix image resolution for project clusters view (#3286)
 - feat(aws/cloudformation): Add cloudformation caching agent and provider (#3278)
 - chore(dependencies): Autobump spinnaker-dependencies (#3287)
 - feat(ecs): Copy scaling policies from source server group (#3238)
 - feat(core): Add DualTaskRepository (#3283)
 - fix(google): differentiate among autohealing health check kinds (#3282) (#3285)
 - fix(google): differentiate among autohealing health check kinds (#3282)
 - chore(dependencies): Autobump spinnaker-dependencies (#3284)
 - perf(aws): Restrict the relationships fetched for aws load balancers (#3281)
 - perf(cats): small improvement when storing cache data (#3111)
 - feat(provider/kubernetes): apply sequence label (#3277)
 - fix(aws): Fix concurrent list modification exception (#3276)
 - chore(test): Move ProviderCache coverage to cats-test (#3275)
 - fix(*): Consolidate default ObjectMapper mutations (#3274)
 - chore(dependencies): Autobump spinnaker-dependencies (#3259)
 - fix(provider/kubernetes): ensure crds are registered before using creds (#3272) (#3273)
 - fix(provider/kubernetes): ensure crds are registered before using creds (#3272)
 - fix(provider/kubernetes): sync updates to account properties (#3270) (#3271)
 - fix(provider/kubernetes): sync updates to account properties (#3270)
 - fix(search): Add sane defaults to search executor config. (#3261) (#3269)
 - fix(provider/gce): Adds flexibility to autoscaler upsert for scaleDown (#3260) (#3264)
 - fix(titus): Cloning does not respect default stack or details (#3236)
 - fix(google): prevent parent server group from overwriting null clone autohealing policies (#3268)
 - fix(google): prevent parent server group from overwriting null clone autohealing policies (#3266)
 - chore(core): Decouple scheduler backend from cache backend (#3265)
 - fix(search): Add sane defaults to search executor config. (#3261)
 - fix(provider/gce): Adds flexibility to autoscaler upsert for scaleDown (#3260)
 - fix(cf): repair scale-to-zero issue (#3257)
 - fix(provider/docker): No longer depend on service in authentication (#3772) (#3237)
 - chore(dependencies): Autobump spinnaker-dependencies (#3256)
 - fix(artifacts): fixed property prefix for maven artifacts (#3255)
 - fix(provider/gce): Decorate XPN resources when upserting instance (#3252) (#3253)
 - fix(provider/gce): Decorate XPN resources when upserting instance (#3252)
 - feat(provider/kubernetes): allow v2 to set a cacheIntervalSeconds (#3251)
 - fix(kubernetes): fix fetching clusters for project (#3247) (#3250)
 - fix(kubernetes): fix fetching clusters for project (#3247)
 - feat(cf): support user provided services (#3243)
 - fix(provider/kubernetes): v2 handle 0 replica scale-down (#3248) (#3249)
 - fix(provider/kubernetes): v2 handle 0 replica scale-down (#3248)
 - chore(dependencies): Autobump spinnaker-dependencies (#3246)
 - fix(core): include instanceCounts when fetching project clusters, fix ClassCastException for gce and appengine fetch cluster methods (#3244) (#3245)
 - fix(core): include instanceCounts when fetching project clusters, fix ClassCastException for gce and appengine fetch cluster methods (#3244)
 - fix(provider/kubernetes): bail out of caching on error (#3241) (#3242)
 - fix(provider/kubernetes): bail out of caching on error (#3241)
 - perf(provider/kubernetes): ignore ondemand requests for other accounts (#3234) (#3240)
 - fix(provider/cf): handle error when route exists in other org/space (#3239)
 - fix(provider/cf): show SG and Instance info with LoadBalancers (#3235)
 - fix(ecs): check for null service before getTaskDefinition (#3231)
 - feat(ecs): Migrate to standard server group name resolver (#3233)
 - Fix evictions typo (#3232)
 - perf(provider/kubernetes): ignore ondemand requests for other accounts (#3234)
 - feat(entitytags): a simple `deleteByNamespace` admin api (#3229)
 - perf(provider/kubernetes): check for caching behavior before crd lookup (#3230)
 - feat(provider/kubernetes): 'liveManifestCall' mode (#3227)
 - chore(dependencies): Autobump spinnaker-dependencies (#3228)
 - fix(ecs): support multiple network binds for non-network-interfaced containers (#3222)
 - Log scope (#3176)
 - fix(provider/titus): reworks titus streaming provider so it just uses a buffer for updates (#3224)
 - fix(provider/ecs): Include port in Fargate health checks (#3220)
 - feat(provider/cf): multi buildpack push support (#3225)
 - fix(provider/cf): cloning across CF foundations fails (#3226)
 - chore(titus): add log when job is null (#3221)
 - fix(aws/region support): Use RegionUtils instead of Regions (#3223)
 - feat(artifacts): Add support for helm/chart artifacts (#3108)
 - fix(core): Make uses of snakeyaml threadsafe (#3219)
 - feat(provider/lambda) : adding support for aws lambda (#3040)
 - chore(dependencies): Autobump spinnaker-dependencies (#3217)
 - fix(provider/titus): improve lookup of security group details (#3218)
 - fix(provider/oracle): fix update/edit LoadBalancer (#3162) (#3216)
 - feat(provider/cf): add SG clone action (#3215)
 - feat(provider/cf): add metrics links to SG (#3210)
 - feat(provider/cf): manifest based service config (#3188)
 - chore(oracle/dependency): upgrade oracle oci sdk version to 1.3.2 (#3214)
 - fix(provider/aws): Only describe instance health for ELBs (#2699) (#3196)
 - chore(dependencies): Autobump spinnaker-dependencies (#3212) (#3213)
 - refactor(provider/cf): convert tests to junit5 (#3137)
 - refactor(cats): Moving non-redis cats classes to cats-core (#3211)
 - chore(dependencies): Autobump spinnaker-dependencies (#3212)
 - fix(provider/ecs): Handle different CPU/mem limit settings in server group details view (#3203)
 - feat(provider/cf): update the appsManagerUri to the specific serverGroup (#3192)
 - fix(provider/kubernetes): fix v2 cronjob status (#3207) (#3209)
 - fix(security): Fix CVE-2017-5929 security issue threat level 9 (#3206) (#3208)
 - fix(provider/kubernetes): fix v2 cronjob status (#3207)
 - fix(security): Fix CVE-2017-5929 security issue threat level 9 (#3206)
 - fix(provider/oracle): fix update/edit LoadBalancer (#3162)
 - chore(cats): update test for future logic change (#3204)
 - perf(provider/kubernetes): share CRD list between threads (#3201) (#3202)
 - perf(provider/kubernetes): share CRD list between threads (#3201)
 - fix(cache/introspection): sort by descending execution (#3199) (#3200)
 - fix(cache/introspection): sort by descending execution (#3199)
 - fix(titus): fix when job data is cached apart from instances (#3198)
 - chore(cats): getter for allowableRelationshipPrefixes (#3197)
 - fix(provider/cf): use ServerGroup.Capacity type for scaling server groups
 - fix(provider/cf): provide more info when JSON conversion fails on Retrofit call
 - fix(provider/cf): correct pagination logic when iterating
 - chore(cache): adds introspection to caching agents (#3194) (#3195)
 - chore(cache): adds introspection to caching agents (#3194)
 - fix(provider/cf): set the status to DOWN when no process stats returned (#3186)
 - fix(provider/oracle): fix missing oci-sdk jars in web startScript (#3160)
 - fix(provider/kubernetes): hold entries in on-demand longer (#3190) (#3191)
 - fix(provider/kubernetes): hold entries in on-demand longer (#3190)
 - feat(provider/cf): display cf health check details for app (#3185)

#### Deck  - 48a3495c1...6324862
 - fix(google): select all zones by default when deploying a regional gce server group (#6751) (#6755)
 - fix(core): In baseProvider, fixed autoselection of React stage (#6673) (#6675)
 - fix(provider/azure): Fix the account list can't show when "Create Server Group" in cluster page (#6438) (#6686)
 - fix(core): Filter v2 pipeline templates from create pipeline modal (#6660)
 - fix(appengine): allow sequence to be suppressed in servergroup names (#6667) (#6671)
 - fix(core): Remove ability to trigger manual exec for mptv2 pipelines (#6651) (#6658)
 - fix(core): titus run jobs override all other providers (#6647) (#6649)
 - fix(core): Remove configure button and setup redirect for mptv2 pipeline (#6644) (#6648)
 - fix(bake/oracle): Added extendedAttributes (#6631)
 - fix(google): Only show authorized accounts during Server group creation. (#6626)
 - fix(core/css): be explicit on which file we're importing (#6554) (#6561)
 - fix(core/css): be explicit on which file we're importing (#6554) (#6560)
 - fix(core): Match order of pipeline config nav items to page sections (#6546) (#6548)
 - fix(appengine): older apps that dont have cloudProviders field dont select correct serverGroup modal (#6544) (#6545)
 - fix(kubernetes): do not override `location` and `replicas` in new Scale Manifest stage (#6532)
 - fix(core): read displayTimestampsInUserLocalTime off SETTINGS.feature
 - fix(core/ga): Re-enable google analytics (#6453) (#6455)
 - fix(kubernetes): post strategic patch body as object (#6444)
 - fix(kubernetes): fix account selection by handling null values passed to ManifestSelector.isExpression (#6442)
 - fix(kubernetes): fix account selection by handling null values passed to ManifestSelector.isExpression (#6441)
 - fix(amazon): Fixed similar image finder so concat happens (#6406)
 - feat(tests): add pipelines_list functional test for GCE (#6405)
 - (feat/webhook) Make urls of the webhook stage clickable (#6403)
 - fix(provider/azure): When "Add server group" in pipeline build step, the regions selector can't be displayed. (#6404)
 - config(google): Update GCE's base URL to the new domain (#6401)
 - fix(amazon): Fixing load balancers isInternal flag (#6402)
 - feat(ecs): Add option to copy scaling policies from previous server group (#6251)
 - chore(amazon/): Bump version to 0.0.156 (#6400)
 - refactor(aws): export cert field; rename cert field prop field (#6399)
 - chore(amazon): Bump version to 0.0.155 (#6398)
 - refactor(aws): export IAmazonCertificate (#6397)
 - Bump package core to 0.0.313 and amazon to 0.0.154 (#6396)
 - refactor(aws): move certificate selector to separate component (#6395)
 - fix(amazon): better style of react-select for certificates (#6391)
 - fix(core): clear cluster height cache when resizing window (#6393)
 - feat(notifications): Read SMS settings from hal config
 - fix(tests): network fixtures need to handle deck requesting /auth/user (#6392)
 - feat(tests): Add functional tests for creating applications (#6388)
 - fix(google): safe healthcheck lookups when cloning server group
 - fix(google): safe healthcheck lookups when cloning server group
 - fix(google): differentiate among autohealing health check kinds
 - fix(google): differentiate among autohealing health check kinds
 - chore(amazon/): Bump version to 0.0.153 (#6386)
 - chore(core): Bump version to 0.0.312 (#6385)
 - refactor(aws): remove certificate loading from NLB modal (#6379)
 - feat(core): include original capacity in server group resize title (#6352)
 - fix(core): do not overwrite strategy app in cluster config (#6384)
 - fix(aws): filter out subnets with no purpose (#6383)
 - fix(stage): Fixing addAliasToConfig (#6381)
 - feat(core): Show timestamp in user's (browser's) timezone (#6362)
 - chore(titus): Bump version to 0.0.67 (#6378)
 - feat(titus/runJob): Add support for env attrs and container attrs (#6377)
 - chore(amazon): Bump version to 0.0.152
 - chore(core): Bump version to 0.0.311
 - chore(docker): Bump version to 0.0.30 (#6375)
 - fix(amazon/deploy): Stop dying when target groups is an expression (#6374)
 - feat(loadBalancer): Support insight actions on load balancers (#6372)
 - fix(core): include non-run strategy headers (#6367)
 - fix(core/deploymentStrategy): Fix rolling red/black NPE (#6373)
 - fix(amazon/deploy): Stop dying when load balancers is an expression (#6369)
 - fix(pubsub): Change from topic to publisherName (#6371)
 - feat(tests): add appengine and applications functional tests (#6370)
 - feat(aws/titus): warn on scaling policy creation if min/max are identical (#6366)
 - fix(amazon/loadBalancer): Fix availability zone selector default values (#6368)
 - fix(google): fix autohealing clone logic
 - fix(google): fix autohealing clone logic
 - fix(validation): Validator should pass checkParentTriggers through (#6360)
 - chore(design): updates icon library (#6358)
 - fix(core): get region for deployed link from multiple sources (#6350)
 - refactor(artifacts): Deprecate kind field (#6359)
 - fix(core/presentation): make detail dropdowns not visually crop
 - refactor(artifacts): Add customKind flag to artifact config (#6357)
 - refactor(cf): make SG inputs reusable components
 - refactor(artifacts): Remove explicit references to kind from artifacts (#6351)
 - fix(core): clear stage-specific fields when changing stage types (#6355)
 - feat(core): allow min/max on NumberSpelInput, zero wait on Wait Stage (#6353)
 - fix(core): fix instance details sorting (#6349)
 - fix(docker): Show the tag not found warning more smarterly (#6354)
 - fix(appengine/google/kubernetes): change logo background colors to official brand colors (#6347)
 - Bump package (#6346)
 - fix(core/deployment): Fix rolling red back rollback checkbox state (#6345)
 - refactor(amazon/loadBalancer): Migrate LoadBalancerLocation and SecurityGroups to RxJS streams (#6318)
 - Bump package core to 0.0.309 and docker to 0.0.29 and amazon to 0.0.150 and titus to 0.0.66 (#6343)
 - fix(docker): Do not clear an existing imageId even if fields cannot be found in registry (#6342)
 - fix(google): prevent parent server group from overwriting null clone autohealing policies
 - fix(*): allow modal to stay open on auto-close (#6329)
 - fix(core): do not flag pipelines dirty on initial save (#6340)
 - feat(core): allow searching in pipeline JSON (#6341)
 - fix(google): prevent parent server group from overwriting null clone autohealing policies
 - Bump package core to 0.0.308 and amazon to 0.0.149 (#6336)
 - refactor(stages): Deriving stages that provide version info for bakes (#6328)
 - chore(core): Bump version to 0.0.307 (#6335)
 - feat(core): add InstanceWriter to CoreReactInject
 - feat(artifacts): Add HTTP to artifact icon list and service (#6333)
 - feat(core/serverGroup): Add digests to docker insight server group link (#6327)
 - Bump package core to 0.0.306 and docker to 0.0.28 (#6332)
 - fix(core): navigate to failed stage with message if possible on details toggle (#6331)
 - fix(core): do not overhydrate executions (#6330)
 - fix(core): allow deep linking to filtered tasks view (#6319)
 - chore(dependabot): Add .dependabot/config.yml with whitelist of dependencies to update
 - feat(cf): Reactify resize and rollback modals (#6325)
 - fix(kubernetes): specify monospace fonts to prevent cursor misalignment in ace editor
 - chore(deps): bump @spinnaker/kayenta from 0.0.65 to 0.0.68
 - fix(pipelines): hit target for labels is off by 8px (#6324)
 - feat(cf): create AccountRegionClusterSelector React component (#6314)
 - Bump package core to 0.0.305 and amazon to 0.0.148 and titus to 0.0.65 (#6315)
 - fix(core): disable manual executions while trigger data loads (#6301)
 - feat(core): use Ace Editor for pipeline/stage JSON editing (#6226)
 - feat(core): allow setting params via query string on manual execution (#6302)
 - feat(artifacts): Changed helm artifact API requests (#6202)
 - refactor(provider/cf): reactify instance details (#6172)
 - fix(core/account): Return empty array if no preferred zones are found in a region
 - refactor(core/help): Switch HelpField to PureComponent
 - refactor(cf): reactify load balancer details pane (#6295)
 - feat(cf): add user provided service support (#6293)
 - refactor(cf): separate SG details sections (#6291)
 - feat(artifacts): add ivy and maven expected artifact editors (#6241)
 - refactor(*): use mask-image CSS for cloud provider logos (#6280)
 - fix(core): fix next CRON trigger calculation offset (#6242)
 - fix(aws): clarify all ports/protocols on IP range ingress (#6231)
 - fix(aws): provide help explanation when load balancer delete is disabled (#6236)
 - fix(core): avoid in sync race condition when saving pipelines (#6235)
 - feat(core): show pipeline stage durations by default (#6215)
 - feat(aws): make image sort options sticky; sort by TS by default (#6267)
 - fix(amazon/loadBalancer): Restore the "security group removed" warning when switching regions
 - feat(stage): manual judgement continue button moved to right (#6292)
 - styles(core): Making the main ui-view container positive relative (#6264)
 - chore(deps-dev): [security] bump webpack-dev-server from 3.1.1 to 3.1.13
 - feat(core/deploy): Support `scaleDown` as part of a rolling red/black deployment (#6265)
 - chore(scripts): Improve publish safety, add assert_clean_master.sh and build_order.sh
 - chore(amazon): Bump version to 0.0.147
 - chore(kubernetes): Bump version to 0.0.20
 - chore(core): Bump version to 0.0.304
 - fix(bake): Allow null extended attributes in bake stages (#6256)
 - fix(core): Prevent cluster saved state filter overrides (#6252)
 - fix(appengine): move artifact account dropdown below radio buttons (#6255)
 - fix(pubsub): Make application-level notifications show up (and with details!) (#6254)
 - fix(core/executions): Fix NPE in ExecutionGroup->Notifications when there is a Strategy visible (#6087) (#6253)
 - feat(core): add label filter UI to clusters view
 - fix(settings): Fix syntax error. (#6250)
 - fix(judgement): Adding stage refId as component key to bust residual state (#6243)
 - fix(oracle/pipeline): Rename ng module to spinnaker.oracle.* (#6219) (#6238)
 - fix(core): encode pipeline names in API request paths (#6221) (#6237)
 - feat(notifications): Adds pubsub notification module. Alphabetize the notification list. (#6234)
 - refactor(triggers): move expected artifact definition before trigger definition (#6233)
 - feat(core): add ability to search clusters by labels
 - fix(tests): End child process properly on Linux (#6217)
 - style(tests): Fixed misspelled test filename (#6222)
 - feat(provider/cf): support multiple buildpacks (#6223)
 - fix(provider/cf): show SG and Instance info with LoadBalancers (#6224)
 - fix(core): encode pipeline names in API request paths (#6221)
 - fix(oracle/pipeline): Rename ng module to spinnaker.oracle.* (#6219)
 - fix(aws): do not hardcode amiName when adding pipeline cluster (#6218)
 - refactor(provider/cf): refactor create SG to use FormikFormField (#6212)
 - feat(tests): add gradle task to run functional tests for easier CI (#6216)
 - feat(tests): add script to automate mock server and deck build (#6214)
 - refactor(core): convert analytics initializer to plain TS (#6213)
 - fix(tests): Use wait-on to await webpack dev server (#6208)
 - refactor(core/modal): Extract WizardStepLabel to its own file (#6209)
 - fix(quiet): Add caveat that quietPeriod does not affect pipeline triggers (#6206)
 - fix(tests): remove express from static server test runner class (#6207)
 - feat(tests): Add downloader to fetch pre-recorded network fixtures (#6205)
 - feat(tests): simple static server for functional tests (#6204)
 - feat(tests): Add network fixture support for functional tests (#6203)
 - refactor(amazon/serverGroup): don't sort images on every render (#6200)
 - refactor(amazon/subnet): Reactify SubnetSelectField (#6192)
 - fix(provider/cf): do not trigger validation on serviceName when hidden (#6197)
 - feat(tests): add flags to functional test runner to configure browser (#6199)
 - feat(tests): add some functional tests to Deck (#6198)
 - fix(core): Cherry-pick "do not load GA script if not configured (#6177)". (#6196)
 - chore(amazon): Bump version to 0.0.146 (#6195)
 - fix(core): add missing parenthesis (#6193)
 - fix(aws): really properly sort instance types (#6191)
 - fix(aws): sort instance type options in server group modal (#6190)
 - chore(docker): Bump version to 0.0.27 (#6189)
 - chore(core): Bump version to 0.0.303 (#6187)
 - fix(docker): Make sure to preselect define type for image selector (#6188)
 - fix(core): Allow auto removal of pipelines when applications are removed (#6185)
 - chore(docker): Bump version to 0.0.26 (#6184)
 - Package bump (#6183)
 - fix(preconfigured): Stage config needs alias attribute (#6182)
 - feat(aws): allow sorting of image options in server group modal (#6174)
 - feat(docker): Support inputting image id directly
 - feat(core): Add new form styles
 - fix(titus): Simplify image id validation
 - fix(core/presentation): Handle null `validation` prop
 - fix(docker): Allow image id to be an expression (#6181)
 - fix(provider/ecs): Add memory limit to server group details (#6135)
 - feat(core): differentiate pipelines and strategies in filters (#6173)
 - feat(core): allow deep linking to app config sections (#6170)
 - fix(core): do not load GA script if not configured (#6177)
 - chore(provider/cf): re-add cf to halconfig (#6178)
 - fix(core/presentation): Give WatchValue better typing, tolerate no children (#6176)
 - feat(core): increase visibility of hover on clickable pods (#6146)
 - fix(formik): Fixed validation and props for AccountSelectInput and RegionSelectInput (#6171)
 - test(amazon/serverGroup): Add tests for AmazonImageSelectInput
 - test(amazon/serverGroup): fix failing test (due to angular upgrade) by reordering initialization call
 - chore(*): Update to AngularJS 1.6.10 to get the fix for this issue: https://github.com/angular/angular.js/issues/15855
 - refactor(amazon/serverGroup): Refactor code to load package images
 - feat(amazon/serverGroup): Make image loading lazy in clone server group modal - Extract AmazonImageSelectInput to a separate component
 - feat(provider/cf): add SG clone action (#6162)
 - feat(provider/cf): Server Group Detail port is default health check type (#6159)
 - feat(runJob): Stage config defaults, execution details for preconfigured (#6168)
 - chore(core): Bump version to 0.0.301 (#6167)
 - refactor(core): remove ON_DEMAND_THRESHOLD from cluster service, use settings
 - chore(core): Bump version to 0.0.300 (#6165)
 - refactor(core): make onDemandClusterThreshold configurable
 - chore(core): alphabetize settings
 - fix(amazon/serverGroup): Fix react key in forEach
 - feat(core): Export FormikApplicationsPicker for reuse (#6156)
 - chore(titus): Bump version to 0.0.63
 - chore(docker): Bump version to 0.0.25
 - chore(amazon): Bump version to 0.0.144
 - chore(core): Bump version to 0.0.299
 - feat(runJob): Adding support for preconfigured run job stages (#6152)
 - refactor(core/region): extract RegionSelectInput from RegionSelectField
 - refactor(core/account): Refactor AccountSelectInput to use 'value' prop
 - refactor(core/account): rename AccountSelectField to AccountSelectInput
 - feat(core/pipelines): Add an apply entity tags stage (#6151)
 - feat(provider/cf): add the metrics link to SG details (#6147)
 - feat(provider/cf): deploy Service via manifest (#6094)
 - fix(core/amazon): avoid overflow on server group modal components (#6153)
 - fix(amazon/serverGroup): Do not remove existing target groups (#6144)
 - chore(*): Add core alias to module tsconfigs
 - chore(amazon): Remove imports directly from 'amazon'
 - chore(config): blacklist direct imports from 'core', 'amazon', 'kubernetes', etc
 - chore(config): sort tslint rules
 - fix(imports): Avoid "import { thing } from 'core'"
 - fix(core): do not cache getAllSecurityGroups API call (#6145)
 - feat(provider/cf): shorten the appsManagerUri (#6105)
 - refactor(core/presentation): Switch from a separate IControlledInputProps `field` object prop to spread props (#6141)
 - refactor(amazon/image): Convert amazon image reader to a TS class (#6118)
 - fix(provider/cf): make validators more robust (#6047)
 - fix(amazon): use arrow functions in server group modal (#6140)
 - chore(design): updates icon library and documentation
 - fix(core/artifacts): hide artifact list on trigger if artifacts disabled (#6138)
 - chore(core): Bump version to 0.0.298 (#6136)
 - fix(core/dataSources): make child sources always honor their parents' disabled state (#6134)
 - feat(core): allow custom stuck deploy instructions on deploy details (#6131)
 - fix(core): increment running task time in step details (#6132)
 - fix(core): correctly render value in CRON minutes select field (#6133)
 - fix(amazon/loadBalancer): Fix load balancer VPC selection (#6117)
 - feat(core): Support for setting application attributes from react (#6122)
 - Package bump (#6130)
 - fix(provider/cf): use ICapacity type for scaling server groups
 - chore(deps): [security] bump atob from 2.0.3 to 2.1.2
 - chore(deps): [security] bump stringstream from 0.0.5 to 0.0.6
 - chore(deps): bump deck-kayenta version to 0.0.65
 - chore(deps): bump deck-kayenta version to 0.0.65
 - chore(provider/kubernetes): add tests for yaml editor utils
 - style(amazon): fix load balancer label alignment in server groups modal (#6126)
 - fix(kubernetes): cherry-pick execution and link fixes from master (#6124)
 - feat(provider/cf): option to define timeouts for service creation/destroy
 - fix(kubernetes): clicking execution details link filters clusters screen (#6120)
 - chore(deps): [security] bump lodash-es from 4.17.4 to 4.17.11
 - fix(stages/evaluateVariables): Make empty string less confusing by not replacing it with a dash (#6119)
 - fix(amazon/loadBalancer) Fixed load balancer with multiple accounts (#6108)
 - fix(kubernetes): namespace details links in executions dont work (#6114)
 - fix(core): sort stage matches by label, then description (#6112)
 - fix(titus): display security groups in details when firewalls feature is disabled (#6103)
 - feat(docker): Add help text to digest field (#6111)
 - fix(core/pipeline): Fix grouped stages rendering in execution graph (#6113)
 - fix(core/entityTag): Use pipeline.id for pipeline entity tag's `entityId` value (#6098)
 - fix(kubernetes): fix manifest update race condition (#6101)
 - refactor(amazon/serverGroup): use ngimport for $q (#6107)
 - fix(core): fix copy-to-clipboard on deep-linked tasks (#6102)
 - fix(artifact): hide artifact account selector when deploying manifest as text (#6100)
 - feat(webhook): add artifact status tab to webhook stage execution details (#6095)
 - fix(core): Actually default to using new manual trigger endpoint (#6097) (#6099)
 - fix(core/executions): Fix NPE in ExecutionGroup->Notifications when there is a Strategy visible (#6087)
 - fix(core): Actually default to using new manual trigger endpoint (#6097)
 - fix(core/pipeline): Inherit artifacts/parameters/triggers from MPT template by default (#6088)
 - chore(core): Bump version to 0.0.296 (#6096)
 - feat(core): export worker pool class (#6093)
 - chore(docker): Bump version to 0.0.23 (#6092)
 - Package bump (#6091)
 - refactor(core): remove unused applicationMap code from ApplicationReader (#6089)
 - feat(docker): Add digest support to manual docker trigger (#6085)
 - fix(core/pipeline): Fix manual execution dropdown when execution has no buildInfo (#6086)
 - feat(analytics): Allow to configure siteSpeedSampleRate for Google Analytics (#5922)
 - fix(webhook): Move from buildInfo to webhook field. buildInfo is deprecated. (#6053)
 - feat(deck): Support Github Status notification type (#6084)
 - fix(kubernetes): yaml editor support for multi docs
 - fix(kubernetes): yaml editor support for multi docs
 - feat(provider/cf): display cf health check details for app (#6081)
 - fix(docker): RunAsUser select box appears doubled (#6082)

#### Echo  - 22a704d...5db9d43
 - fix(pipelines): Add keepWaitingPipelines to Pipeline model (#463) (#464)
 - chore(dependencies): Autobump spinnaker-dependencies (#445) (#446)
 - chore(dependencies): Autobump spinnaker-dependencies (#442) (#443)
 - chore(dependencies): Autobump spinnaker-dependencies (#441)
 - fix(webhooks/bitbucket): Correct repoProject for Bitbucket Server (#436)
 - fix(webhooks/bitbucket): Refs for Bitbucket Server (#435)
 - chore(dependencies): Autobump spinnaker-dependencies (#440)
 - feat(artifacts): Artifact extraction template for Docker (#439)
 - fix(pubsub): Reintroduces 'name' field to google pubsub publishers (#437)
 - chore(dependencies): Autobump spinnaker-dependencies (#438)
 - chore(dependencies): Autobump spinnaker-dependencies (#432)
 - feat(artifacts/bitbucket): Accept Bitbucket Server hooks (#424)
 - fix(swabbie): fix email template to handle missing value (#433)
 - refactor(eventhandlers): specify WebhookEvent content expectations in its type (#430)
 - fix(triggers): Fix NPE when no ref exist for github notifications (#422)
 - feat(pubsub): update GCB transform template to extract more artifacts (#431)
 - chore(dependencies): Autobump spinnaker-dependencies (#429)
 - fix(pipelines): Pass resolveArtifacts = true to plan endpoint (#427) (#428)
 - fix(artifacts): Allow customFormat to be a boolean (#426)
 - fix(pipelines): Pass resolveArtifacts = true to plan endpoint (#427)
 - chore(dependencies): Autobump spinnaker-dependencies (#425)
 - fix(notification/githubStatus): add retries to update github check (#407)
 - feat(pubsub): Enables Pubsub as first class notification mechanism (#417)
 - fix(jenkins): Fix encoding of Jenkins URL (#421) (#423)
 - fix(jenkins): Fix encoding of Jenkins URL (#421)
 - chore(dependencies): Autobump spinnaker-dependencies (#413)
 - fix(core): Fix auth propagation for manual triggers (#418) (#420)
 - fix(core): Fix auth propagation for manual triggers (#418)
 - fix(artifacts): Fix artifact population in manual triggers (#414) (#415)
 - fix(artifacts): Fix artifact population in manual triggers (#414)
 - chore(dependencies): Autobump spinnaker-dependencies (#411)
 - fix(slack): send token on postMessage in request body (#405)
 - feat(trigger/cron): populate eventId in cron triggers (#365)
 - fix(email): Support comma-separated email addresses (#412)
 - chore(dependencies): Autobump spinnaker-dependencies (#409) (#410)
 - chore(dependencies): Autobump spinnaker-dependencies (#409)
 - chore(build): Bump dev plugin to 5.2.2 (#406)
 - Revert "fix(triggers): Fix triggered pipeline template artifact resolution." (#403) (#404)
 - Revert "fix(triggers): Fix triggered pipeline template artifact resolution." (#403)

#### Fiat  - 71ce645...daf21b2
 - chore(google): Update google API dependencies (#317) (#318)
 - chore(google): Update google API dependencies (#317) (#319)
 - chore(dependencies): Autobump spinnaker-dependencies (#315) (#316)
 - chore(dependencies): Autobump spinnaker-dependencies (#313) (#314)
 - chore(dependencies): Autobump spinnaker-dependencies (#312)
 - chore(dependencies): Autobump spinnaker-dependencies (#311)
 - chore(dependencies): Autobump spinnaker-dependencies (#310)
 - chore(dependencies): Autobump spinnaker-dependencies (#306)
 - fix(redis): New a JedisPoolConfig instead of GenericObjectPoolConfig (#309)
 - chore(dependencies): Autobump spinnaker-dependencies (#305)
 - chore(dependencies): Autobump spinnaker-dependencies (#304)
 - chore(dependencies): Autobump spinnaker-dependencies (#302)
 - chore(dependencies): Autobump spinnaker-dependencies (#301)
 - chore(dependencies): Autobump spinnaker-dependencies (#298) (#300)
 - chore(dependencies): Autobump spinnaker-dependencies (#298)
 - chore(build): Bump dev plugin to 5.2.2 (#295)

#### Front50  - 129b407...3105e86
 - fix(authz): Invalidate local Fiat cache on service acct creation. (#466) (#467)
 - fix(application): fix tests (#453) (#460)
 - fix(core): Fix merge conflict on cherry-pick (#454)
 - fix(core): correctly save traffic guard configurations (#449) (#450)
 - Fix missing jars release 1.11.x (#426)
 - chore(dependencies): Autobump spinnaker-dependencies (#424) (#425)
 - chore(dependencies): Autobump spinnaker-dependencies (#422) (#423)
 - chore(dependencies): Autobump spinnaker-dependencies (#421)
 - fix(core): Better handle case-insensitive identifiers. (#420)
 - fix(gcs): Increased default timeout with config override. (#419)
 - chore(dependencies): Autobump spinnaker-dependencies (#418)
 - fix(trafficguards): default to empty list of traffic guards (#417)
 - feat(trafficguards): set enabled flag on traffic guards; default to true (#416)
 - chore(dependencies): Autobump spinnaker-dependencies (#415)
 - chore(dependencies): Autobump spinnaker-dependencies (#414)
 - chore(dependencies): Autobump spinnaker-dependencies (#413)
 - chore(dependencies): Autobump spinnaker-dependencies (#412)
 - feat(notifications): Adds pubsub notification type (#411)
 - chore(dependencies): Autobump spinnaker-dependencies (#409)
 - fix(MPTv2): Support saving v2 templated pipeline configs. (#410)
 - chore(dependencies): Autobump spinnaker-dependencies (#407)
 - fix(migrations): MigrationRunner did not log the stactrace of errors (#393)
 - chore(oracle/dependency): upgrade oracle oci sdk version to 1.3.2 (#405)
 - feat(app/permission): endpoint for single app permissions (#403)
 - fix(web): Security checks around notifications (read/write) (#408)
 - chore(dependencies): Autobump spinnaker-dependencies (#404) (#406)
 - chore(dependencies): Autobump spinnaker-dependencies (#404)
 - fix(serviceAccounts): Sync new service accounts with Fiat explicitly (#400)
 - fix(provider/oracle): fix missing oci-sdk jars in web startScript (#397)

#### Gate  - b83dea9...b238ab9
 - fix(swagger): Adds kayenta enabled prop to fake test. (#735) (#736)
 - fix(MPTv2): Wait for downstream Orca ops for v2 MPTs. (#732)
 - chore(dependencies): Autobump spinnaker-dependencies (#705) (#706)
 - chore(dependencies): Autobump spinnaker-dependencies (#703) (#704)
 - chore(dependencies): Autobump spinnaker-dependencies (#702)
 - chore(dependencies): Autobump spinnaker-dependencies (#701)
 - feat(loadBalancer): Support insight actions on load balancers (#698)
 - fix(swagger): enable conditional features when generating static swagger docs. (#697)
 - fix(fiat/roles/sync): Fix exception in roles/sync (#669)
 - chore(dependencies): Autobump spinnaker-dependencies (#699)
 - chore(dependencies): Autobump spinnaker-dependencies (#694)
 - fix(web): Handle null Body in call to EchoService.webhooks (#696)
 - fix(kayenta-https): use standard https settings for kayenta (#695)
 - fix(web): Make Bitbucket Server Ping work (#693)
 - fix(authn/basic): Enable basic auth in gate (#675)
 - chore(dependencies): Autobump spinnaker-dependencies (#692)
 - feat(artifacts): Add support for helm/chart artifacts (#656)
 - chore(dependencies): Autobump spinnaker-dependencies (#691)
 - chore(swagger): Included /projects/ endpoints for use in spin-cli. (#690)
 - chore(dependencies): Autobump spinnaker-dependencies (#686)
 - Revert "fix(web): require application write permission to start a pipeline (#633)" (#657) (#687)
 - Revert "fix(web): require application write permission to start a pipeline (#633)" (#657)
 - fix(Azure OAuth): Map username for Azure OAuth provider (#676)
 - feat(MPTv2): Adds endpoint for new v2 plan. (#685)
 - chore(dependencies): Autobump spinnaker-dependencies (#684)
 - chore(dependencies): Autobump spinnaker-dependencies (#680) (#683)
 - chore(API): Removes 'responseContainer' in favor of Lists in swagger specs. (#682)
 - chore(dependencies): Autobump spinnaker-dependencies (#680)
 - fix(jobs): preconfigured jobs endpoints is in orca (#681)
 - chore(license): add missing license headers (#679)
 - feat(jobs): endpoint for preconfigured jobs (#678)

#### Igor  - 0b3a637...63d06a5
 - fix(jenkins): Use new location for revision information (#367) (#368)
 - chore(dependencies): Autobump spinnaker-dependencies (#355) (#356)
 - chore(dependencies): Autobump spinnaker-dependencies (#353) (#354)
 - chore(dependencies): Autobump spinnaker-dependencies (#352)
 - chore(dependencies): Autobump spinnaker-dependencies (#351)
 - chore(dependencies): Autobump spinnaker-dependencies (#350)
 - chore(dependencies): Autobump spinnaker-dependencies (#348)
 - fix(jenkins): guard against NPE on parameter definitions (#349)
 - chore(dependencies): Autobump spinnaker-dependencies (#347)
 - chore(dependencies): Autobump spinnaker-dependencies (#346)
 - fix(docker): Update cache when a null tag becomes non-null (#344)
 - chore(dependencies): Autobump spinnaker-dependencies (#343)
 - fix(jenkins) Don't retry conversion errors in getGitDetails (#265)
 - chore(dependencies): Autobump spinnaker-dependencies (#340)
 - fix(travis/build_tracking): fix for travis build tracking (#342)
 - fix(http): make the getProperties endpoint return HTTP 404 status (#341)
 - chore(dependencies): Autobump spinnaker-dependencies (#338) (#339)
 - chore(dependencies): Autobump spinnaker-dependencies (#338)
 - chore(build): Bump dev plugin to 5.2.2 (#335)
 - fix(jenkins): don't mistake the queue id for the job number (#337)
 - fix(jenkins): don't error out on queue item responses with missing field (#336)

#### Kayenta  - 8a49a32...81d906b
 - fix(orca): Update Orca to 6.139.0 (#496) (#498)
 - chore(dependencies): Autobump spinnaker-dependencies (#471) (#472)
 - chore(dependencies): Autobump spinnaker-dependencies (#468) (#469)
 - chore(dependencies): Autobump spinnaker-dependencies (#467)
 - chore(dependencies): Autobump spinnaker-dependencies (#466)
 - chore(dependencies): Autobump spinnaker-dependencies (#461)
 - chore(dependencies): Autobump spinnaker-dependencies (#459)
 - feat(prometheus): Add support for basic auth attribute on Prometheus accounts. (#460)
 - chore(dependencies): Autobump spinnaker-dependencies (#457)
 - feat(graphite): add Graphite integration (#447)
 - feat(standalone-canary-analysis): Edits to API descriptions (#452)
 - feat(standalone-canary-analysis): Add siteLocal map to standalone canary analysis request and propagate it to the individual canary executions as well, so that notification metadata can be passed to external event listeners. (#451)
 - fix(orca): Bump orca to 6.119.0 to resolve redis evalsha issue. (#450) (#453)
 - fix(orca): Bump orca to 6.119.0 to resolve redis evalsha issue. (#450)
 - feat(standalone-canary-analysis): Add Standalone Canary Analysis Module. (#445)
 - chore(dependencies): Autobump spinnaker-dependencies (#449)
 - chore(stackdriver): Use example instead of defaultValue in anticipation of swagger upgrade. (#448)
 - feat(kayenta): allow more flexible queries in canary config (#431)
 - chore(dependencies): Autobump spinnaker-dependencies (#443)
 - chore(dependencies): Autobump spinnaker-dependencies (#438) (#442)
 - chore(dependencies): Autobump spinnaker-dependencies (#438)
 - feat(judge): Remote Judge (#437)
 - feat(signalfx): Implement build query method for signalfx metric source (#425)
 - feat(prometheus): add customInlineTemplate logic to enable metric-specific PromQL queries (#433) (#435)
 - feat(prometheus): add customInlineTemplate logic to enable metric-specific PromQL queries (#433)

#### Orca  - 352222d11...c488de1
 - fix(artifacts): Fix successful filter for find artifacts (#2780) (#2783)
 - fix(MPTv2): Supports artifact resolution for v2 MPTs. (#2725) (#2729)
 - fix(artifacts): Revert double artifact resolution (#2720)
 - feat(MPTv2): Support artifacts when executing v2 templated pipelines. (#2710) (#2711)
 - fix(execution): Honor 'if stage fails' config for synthetic stages. (#2686) (#2689)
 - fix(dependencies): update minutest dependency in orca-sql to fix build (#2654) (#2669)
 - fix(kubernetes): Fix possible NPE with `WaitForManifestStableTask` (#2624) (#2625)
 - fix(pipelines): Add expected artifacts to pipeline template spec (#2577) (#2621)
 - chore(dependencies): Autobump spinnaker-dependencies (#2618) (#2619)
 - chore(dependencies): Autobump spinnaker-dependencies (#2616) (#2617)
 - fix(webhooks) use error field consistently (#2614)
 - chore(dependencies): Autobump spinnaker-dependencies (#2613)
 - fix(webhooks): Propogate webhook response reliably (#2612)
 - feat(retrofit): Support registering custom interceptors (#2611)
 - fix(notifications): Propagate auth for application notifications (#2609)
 - feat(webhooks): adds optional map usable in preconfigured webhooks... (#2343)
 - feat(webhooks): Ability to specify HTTP status codes that cause the stage to fail fast (#2602)
 - chore(dependencies): Autobump spinnaker-dependencies (#2610)
 - chore(core): log known stage types on NoSuchStageDefinitionBuilder exception (#2606)
 - fix(sql): compare executions by id not object (#2608)
 - fix(sql): trying not to return duplicate results in get executions (#2607)
 - fix(appDelete): Handle retrofit exceptions with no response object. (#2605)
 - chore(dependencies): Autobump spinnaker-dependencies (#2601)
 - fix(pipelines): detailed error when jenkins trigger prop file not found (#2600)
 - fix(jenkins): handle property file not found better (#2599)
 - feat(pipeline): Support conditional disabling of `ServerGroupCacheForceRefreshTask` (#2596)
 - fix(pubsub): Make manual judgement notifications work with pubsub (#2565)
 - fix(search): execution results < limit == no more matches (#2593)
 - chore(dependencies): Autobump spinnaker-dependencies (#2587)
 - feat(urlRestrictions): Add urlRestrictions.rejectedIps flag to blacklist IPs/IP ranges from webhook calls and SpEL jsonFromUrl, propertiesFromUrl, and fromUrl calls. (#2591) (#2594)
 - feat(urlRestrictions): Add urlRestrictions.rejectedIps flag to blacklist IPs/IP ranges from webhook calls and SpEL jsonFromUrl, propertiesFromUrl, and fromUrl calls. (#2591)
 - fix(clouddriver): Support for delay before scale down in RRB (#2592)
 - fix(scaleDown): Fixes scaleDown task for autoscaled gce mig. (#2588) (#2590)
 - fix(scaleDown): Fixes scaleDown task for autoscaled gce mig. (#2588)
 - fix(pipelines): allow access to evaluation result attributes (#2583)
 - fix(pipelines): make evaluation context and transform public (#2584)
 - fix(pipelines): make String and List expression transforms public (#2586)
 - fix(traffic-guards): bypass the traffic guard capacity check during RRB
 - chore(dependencies): Autobump spinnaker-dependencies (#2585)
 - fix(pipelines): Fix rendering of templated pipelines (#2581)
 - refactor(echo/notifications) Log exceptions (#2582)
 - fix(sql): Fix intermittently failing tests (#2580)
 - fix(pipelines): Allow caller to specify whether to resolve artifacts (#2579)
 - fix(pipelines): Fix plan endpoint (#2578)
 - fix(pipelines): Add expected artifacts to pipeline template spec (#2577)
 - fix(pipelines): Allow caller to specify whether to resolve artifacts (#2576)
 - chore(dependencies): bump keiko version (#2573) (#2574)
 - chore(dependencies): bump keiko version (#2573)
 - fix(cancel): consistently cancel both pipelines and orchestrations. (#2572)
 - fix(clouddriver): Propagate `RetrofitError` from `DetermineSourceServerGroupTask` (#2570)
 - chore(dependencies): Autobump spinnaker-dependencies (#2569)
 - fix(sql): Pin minutest dependency (#2571)
 - feat(clouddriver): Support `scaleDown` for rolling red/black deployments (#2568)
 - fix(MPTv2): Ensures v2 templates are marked correctly for preprocessing. (#2566)
 - fix(triggers): Handle explicitly null container fields in triggers (#2545) (#2546)
 - feat(notifications): Adds pubsub as available notification types. This appears to only be used during Manual Judgement. (#2563)
 - fix(orchestrate): Fixes starting/triggering v2 templated pipelines. (#2562)
 - fix(core): Remove use of JsonManagedReference on getStages() and replace with JsonIgnoreProperties (#2549)
 - chore(license): missing license headers (#2561)
 - chore(dependencies): Autobump spinnaker-dependencies (#2560)
 - feat(pipeline): Support conditional disabling of `ServerGroupCacheForceRefreshTask` (#2559)
 - fix(traffic-guards): be more permissive with no-op removals
 - fix(traffic-guards): handle server groups in a namespace
 - chore(traffic-guards): more details in error message and log
 - fix(instrumentation): Remove temporary instrumentation. (#2556)
 - feat(waitUntil): add waitUntil stage for internal use (#2558)
 - chore(dependencies): Autobump spinnaker-dependencies (#2554)
 - feat(provider/cf): add clone SG action (#2551)
 - feat(pipeline): Support conditional disabling of `ServerGroupCacheForceRefreshTask` (#2555)
 - fix(instrumentation): Temporarily add instrumentation to help troubleshoot build failures. (#2553)
 - fix(jobs): sends preconfigured job parameters to the stage context (#2552)
 - fix(jobs): preserve original parameters sent to preconfigured jobs (#2550)
 - chore(dependencies): Autobump spinnaker-dependencies (#2544) (#2548)
 - fix(triggers): Handle explicitly null container fields in triggers (#2545)
 - chore(dependencies): Autobump spinnaker-dependencies (#2544)
 - feat(MPTv2): Adds separate v2 plan endpoint. (#2543)
 - feat(web): Allow orchestrating pipeline configs by id (#2538)
 - fix(packageInfo/tests): Enable tests that where commented out (#2459)
 - fix(jobs): clean up configuration for preconfigured run job so it is the same as webhooks (#2542)
 - feat(traffic-guards): extend capacity check to cluster wide ops (#2539)
 - fix(MPTv2): Remove unused static logger. (#2541)
 - feat(MPTv2): Initial pass at hydrating + executing v2 templates. (#2534)
 - feat(jobs): preconfigured run job stage (#2540)
 - fix(webhooks): Add enabled flag for webhook trust (#2536) (#2537)
 - fix(webhooks): Add enabled flag for webhook trust (#2536)
 - chore(clouddriver): Remove unused tasks list service method (#2449)
 - fix(sql): Fixing tests (#2535)
 - feat(webhook): Support for `application/x-www-form-urlencoded` (#2532)
 - chore(build): Bump dev plugin to 5.2.2 (#2523)
 - fix(provider/kubernetes): manifest refresh is retryable (#2530) (#2531)
 - fix(provider/kubernetes): manifest refresh is retryable (#2530)
 - fix(MPT): Always resolve artifacts (#2510) (#2528)
 - fix(webhook): using okhttp configs instead of defaults (#2529)
 - fix(MPT): Always resolve artifacts (#2510)
 - fix(bake): initialize retry support (#2527)
 - feat(bake): pass owner as application owner (#2525)
 - fix(tasks): do not fail if execution not found in /pipelines call (#2526)

#### Rosco  - 0e336fc...af545ba
 - config(provider/azure): update the packer image base vm size (#337) (#356)
 - feat(provider/azure): Use Azure Managed Disk instead of VHD in bake (#327) (#357)
 - chore(dependencies): Autobump spinnaker-dependencies (#325) (#326)
 - chore(dependencies): Autobump spinnaker-dependencies (#322) (#323)
 - chore(dependencies): Autobump spinnaker-dependencies (#321)
 - config(google): Update GCE's base URL to the new domain (#319)
 - feat(provider/azure): Update Azure VM image list (#320)
 - chore(dependencies): Autobump spinnaker-dependencies (#318)
 - Image lookup endpoint (#237)
 - chore(dependencies): Autobump spinnaker-dependencies (#317)
 - chore(dependencies): Autobump spinnaker-dependencies (#316)
 - chore(dependencies): Autobump spinnaker-dependencies (#314)
 - fix(packer): Determine image name from unencrypted AMI log line (#315)
 - chore(dependencies): Autobump spinnaker-dependencies (#313)
 - chore(dependencies): Autobump spinnaker-dependencies (#312)
 - fix(packer): Fix spot pricing flags (#310) (#311)
 - fix(packer): Fix spot pricing flags (#310)
 - chore(dependencies): Autobump spinnaker-dependencies (#309)
 - chore(dependencies): Autobump spinnaker-dependencies (#307) (#308)
 - chore(dependencies): Autobump spinnaker-dependencies (#307)
 - chore(build): Bump dev plugin to 5.2.2 (#306)
