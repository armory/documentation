---
layout: post
title: v1.4.1 Armory Halyard
order: -20190318000000
---

# 03/18/2019 Release Notes
{:.no_toc}


## Halyard Armory Enterprise Spinnaker

- Secret management using [s3 store](/spinnaker-install-admin-guides/secrets-s3/)


### Notable changes in OSS Halyard since previous release
- CloudFoundry support (#1212)
- SAML: Add userAttributeMapping to configuration (#1220)
- Webhooks: Allow config of custom trust store (#1113)
- Kubernetes: Allow specifying of serviceAccountName (#1130)
- Kubernetes: custom sidecars secret volume mounts (#1109)
- Kubernetes: do not attempt to redeploy Redis deployment if it already exists. (#1152)
- Kubernetes: Extract processing of Volumes (#1151)
- Only include baseUrl and enabled for each service in (#1182)
