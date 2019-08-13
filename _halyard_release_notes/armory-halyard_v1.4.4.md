---
layout: post
title: v1.4.4 Armory Halyard
order: -20190410000000
---

# 04/10/2019 Release Notes
{:.no_toc}


## Halyard Armory Enterprise Spinnaker

- fix(k8s): add fix for clouddriver profile NPE on hal deploy apply
- feat(docker): allow spinnaker user to edit the .bashrc
- fix(bom): Use HTTP requests for downloading BOM instead of AWS SDK
- feat(debug): Fixed ClassCastException on hal shutdown
- fix(clouddriverRw): fix HA startup issues by removing duplicate udf props


### Notable changes in OSS Halyard since previous release

- feat(provider/kubernetes): Pods security context in service-settings
- fix(secrets): fix saml secret decryption
- feat(secrets): decrypt as bytes in serializer and mount k8s secrets as bytes
