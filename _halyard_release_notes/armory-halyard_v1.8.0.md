---
layout: post
title: v1.8.0 Armory Halyard (OSS 1.27)
order: -201911211114156
---

# 11/21/2019 Release Notes
{:.no_toc}

## Full Version
1.8.0-rc7 (OSS 1.27.0-5cb84f7-stable1 build 7)

## Highlights
This release adds support for configuring the [`git/repo`](https://www.spinnaker.io/reference/artifacts-with-artifactsrewrite/types/git-repo/) artifact type.

In addition to support for configuring `git/repo` artifact types, this release includes a number of other fixes and improvements. See included commits below.

## Known Issues
No known issues

## Halyard Armory Enterprise Spinnaker
 - fix(halconfigParser): access halconfigPath via new method (#278)
 - chore(testing): add additional integration tests (#275)
 - feat(docker): add gcloud to container (#274)

##  Halyard Community Contributions
 - fix(artifacts/gitrepo): use Boolean class instead of primitive (#1466)
 - fix(saml): get saml file path instead of file contents in saml validator (#1455)
 - fix(build): `spinnaker` user/group id=1000 in Ubuntu image (#1465)
 - fix(build): Missing Ubuntu image dependency (#1464)
 - fix(config): fix anonymous Google storage credentials (#1462)
 - fix(provider/aws): Support for specifying lifecycle hooks for AWS accounts (#1420)
 - feat(artifacts): add git repo artifact support (#1458)
 - feat(config): HalconfigDirStruct source of truth, allow override (#1454)
 - chore(dependencies): Autobump korkVersion (#1453)
 - feat(slack): Allow configurable slack endpoint (#1446)
 - fix(deployments): Fix sub-service name for HA echo in warning m… (#1435)
 - refactor(google): Update to latest google credentials style. (#1452)
 - chore(dependencies): Autobump korkVersion (#1448)
 - chore(core): remove unused jobs feature flag (#1451)
 - fix(halyard): Change deployment to support new Kubernetes API (… (#1443)
 - fix(plugins): plugins should be able to reference their own config values (#1444)
 - test(k8s): Verify propagation of service account name to pod spec. (#1450)
 - fix(kubernetes): remove user-facing references to todo(lwander) (#1449)
 - chore(dependencies): Autobump korkVersion (#1447)
 - feat(kubernetes): add flag for Kubernetes custom resources (#1436)
 - feat(monitoring): add new relic monitoring daemon config (#1442)
 - feat(secrets/gcs): Support for decrypting spinnaker secrets in GCS (#1441)
 - feat(signalfx): add endpoint, scope and location configuration (#1429)
 - fix(install): fix the problem with JDK 13.0 (#1445)
 - feat(build): Ubuntu base image support (#1438)
 - feat(plugins): enable plugin config overrides (#1439)
 - chore(dependencies): Autobump korkVersion (#1440)
 - chore(dependencies): Autobump korkVersion (#1433)
