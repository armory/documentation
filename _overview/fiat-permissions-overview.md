---
layout: post
title: Permissions in Spinnaker
order: 210
published: true
---

## Overview

Fiat is the microservice in Spinnaker responsible for authorization (authz) for the other Spinnaker services. By default it is not enabled, so users are able to perform any action in Spinnaker. This page describes how Fiat interacts with other Spinnaker services, but at a high level, Fiat works with the following Spinnaker services:
* Clouddriver for account permission
* Front50 for application permissions
* Igor for build services permissions

## Requirements

To use Fiat, you need an external identity provider. Create the user roles and maintain them in the identity provider. Fiat controls what permissions are mapped to roles. 

Fiat supports the following identity providers:
* SAML
* LDAP
* Oauth
* X509

## Clouddriver accounts

Clouddriver is the Spinnaker service that interacts with the various cloud providers. When Fiat is enabled, account permissions for Clouddriver determine whether a role or group can perform the following actions:
* `READ` - See objects in a given cloud account.
* `WRITE` - Deploy objects to a given account. 

Note that for AWS, a role/group needs both read and write access to deploy an AMI from the AWS account that Rosco uses to build AMIs.

## Front50 accounts

Front50 is the Spinnaker service that acts as the system of record for all the other Spinnaker services. In other words, all metadata for things such as applications and pipelines are stored in and served by Front50.

To use Fiat with Front50, you need to create service accounts in Front50. This can be done through a series of [cURL commands](https://www.spinnaker.io/setup/security/authorization/service-accounts/).

Service accounts are used to delegate authority to a pipeline to perform actions in Spinnaker. Users with ALL the roles defined in the service account can grant a pipeline “Run as” permission. The service accounts created should map to roles/groups in the identity provider. All pipelines configured to run off of a trigger must also be configured with “Run as” permission, or it will fail.

The best practice for service accounts is to map one service account per role/group in the IDP that will be accessing Spinnaker. This prevents privilege escalation and makes it easier to figure out which roles/group ran what pipeline.




This page uses the following example roles to illustrate how Fiat works:

* `admin`
* `dev`
* `qa`
* `ops`

Note that roles, as far as Fiat is concerned, are case insensitive. This means that `admin` is equivalent to `Admin`, `ADMIN`, or any other permutation. 

When Fiat is enabled, users start with no permissions and must be explicitly granted permissions. 