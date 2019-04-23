---
layout: post
title: v1.5.0 Armory Halyard
order: 1
---

# 04/22/2019 Release Notes
{:.no_toc}


## Halyard Armory Enterprise Spinnaker
- feat(config/aws): Add assumeRoleArn and anonymousAccess support (#182)

##  Halyard Community Contributions
- feat(kube/v2): add ability to specify NodeAffinity, PodAffinity, and PodAntiAffinity (#1273)
- fix(build): Fix aws-iam-authenticator in docker container (#1278)
- fix(secrets): fix file prefix for saml keystore (#1276)
- fix(halyard): Use "kubectl replace --force" for Kubernetes Secret creation (#1272)
- fix(secrets): Always decrypt monitoring secrets (#1274)
- fix(halyard): #3268 Adds missing ldap config parameters managerDn managerPassword groupSearchBase (#1031)
- fix(clouddriver/profile): re-parentify deployment configuration after cloning providers (#1271)
- chore: update kubectl to version 1.14.1 (#1270)
- feat(buildmasters): Permission support for build masters (CI's) (#1224)
- fix(halyard): Ignore the user profile if it doesn't exist. (#1268)
- fix(config): Deck support for --infrastructure-stages (#1267)
- feat(jenkins): Support for  overriding TrustStore used by Jenkins (#1264)
- fix(cf): Correct metricsUri and appsManagerUri configuration (#1262)
- feat(gremlin): Allow Gremlin to get configured via Halyard (#1261)
- feat(secrets): add decryptAsBytes to enable decryption of binary files (#1263)
- feat(provider/azure): Add SSH public key support to provision linux vm (#1255)
- feat(secrets): set minimum version for decryption in services (#1249)
- fix(secrets): fix saml secret decryption (#1247)
- feat(kubernetes): add livenessProbe (#1253)
