---
layout: post
title: Permissions in Spinnaker
order: 210
published: true
---

## Overview
{:.no_toc}

Fiat is the microservice in Spinnaker responsible for authorization (authz) for the other Spinnaker services. By default it is not enabled, so users are able to perform any action in Spinnaker. This page describes how Fiat interacts with other Spinnaker services. At a high level, Fiat works with the following Spinnaker services:

* Clouddriver for account permission
* Front50 for application permissions
* Igor for build services permissions

When Fiat is enabled, users start with no permissions and must be explicitly granted permissions. 

For a deeper dive into how authz works for Spinnaker, see [Authorization](https://www.spinnaker.io/setup/security/authorization). Much of Spinnaker's configuration is done through your Halconfig, which can be found in `~/.hal/config`. 

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Requirements

To use Fiat, you need an external identity provider. Create the user roles and maintain them in the identity provider. Fiat controls what permissions are mapped to roles.  

Fiat supports the following identity providers:
* SAML groups (includes OAuth ONLY with OIDC)
* LDAP
* GitHub teams
* Google Groups
  
In all these methods, users are referenced by a userId, which is determined by the authentication method of your choice.

You also need access to the Halyard machine in order to configure Spinnaker.
  
## Spinnaker services

## Clouddriver accounts

Clouddriver is the Spinnaker service that interacts with the various cloud providers. When Fiat is enabled, account permissions for Clouddriver determine whether a role or group can perform the following actions:
* `READ` - See objects in a given cloud account.
* `WRITE` - Deploy objects to a given account. 

Note that for AWS, a role/group needs both read and write access to deploy an AMI from the AWS account that Rosco uses to build AMIs.

## Front50 accounts

Front50 is the Spinnaker service that acts as the system of record for all the other Spinnaker services. In other words, all metadata for things such as applications and pipelines are stored in and served by Front50. Control access to Front50 by creating service accounts. This can be done through a series of [cURL commands](https://www.spinnaker.io/setup/security/authorization/service-accounts/).

Service accounts are used to delegate authority to a pipeline to perform actions in Spinnaker. Users with ALL the roles defined in a service account can grant a pipeline “Run as” permission. The service accounts you create should map to roles/groups in your identity provider. Additionally, all pipelines configured to run off of a trigger must also be configured with “Run as” permission, or it will fail.

Armory recommends that you map one service account for each role/group in the identity provider that will be accessing Spinnaker. This prevents privilege escalation and makes it easier to figure out which roles/group ran which pipeline.

## Example roles

The rest of this explanation uses the following example roles to illustrate how Fiat works:

* `fiat-admin`
  * Administrator for all of Spinnaker. Can do anything implicitly.
* `admin`
  * Administrator. Can do anything for all apps. Can read and execute build/ci jobs.
* `dev`  
  * Full control of pipeline definition for app1 & app2
  * Can deploy to `dev-infra`
  * Can see `qa-infra`
  * Can attach a build/ci trigger to a pipeline definition
* `qa`  
  * Full control of pipeline definition for app1 & app3 
  * Can deploy to `qa-infra`
  * Can see `dev-infra`
  * Can attach a build/ci trigger to pipeline definitions
* `ops` 
  * Can deploy to all accounts but cannot change the pipeline definitions. Can read and execute build/ci jobs.

Note that roles, as far as Fiat is concerned, are case insensitive. This means that `admin` is equivalent to `Admin`, `ADMIN`, or any other permutation. 


## Mapping exercise

Before you configure permissions, answer the following questions to figure out how to map roles and permissions in your deployment:

* Which roles/groups have READ and/or WRITE access to which Clouddriver accounts
* Which roles/groups have READ, WRITE, EXECUTE access to each Spinnaker Application
* Which roles/groups have READ and/or WRITE/EXECUTE access to which CI/Build accounts

Answering these questions will help you determine what permissions and roles are needed.

The following image shows an example result of this exercise based on the user roles described in [Example Fiat](#example-fiat):

![Mapping Exercise Role Matrix](/images/fiat_overview_role_matrix.png)

## Example Configurations

The following describe 

## Superuser

`fiat-admin` is the superuser and has permissions across your whole Spinnaker deployment.

The configuration for `fiat-admin` in the `fiat-local.yml` file looks like the following snippet:

```
admin:
  roles:
    - fiat-admin
```
## Infrastructure

`dev-infra` is one of the potential deployment targets (pictured in ([Mapping exercise](#mapping-exercise)). 

The Halconfig snippet for configuring access to `dev-infra` based on our mapping exercise looks similar to the following:

```
accounts:
- name: dev-infra
  permissions:
    READ:
      - admin
      - dev
      - qa
      - ops
    WRITE
      - admin
      - dev
      - ops
```

Based on which roles have what access to other infrastructure accounts, the configuration looks different.

Note that `fiat-admin` does not need to be explicitly granted permissions. Every other user role must be granted permissions explicitly. 

For information about how to configure permissions for Clouddriver accounts, see [Accounts](https://www.spinnaker.io/setup/security/authorization/#accounts).

## Continuous integration system

`build1` is a Jenkins deployment used for CI in this example. The Halconfig for controlling access to `build1` looks similar to the following snippet:

```
ci:
  jenkins:
    enabled: true
    masters:
    - name: build1
      permissions:
        READ:
        - admin
        - dev
        - qa
        - ops
        WRITE:
        - admin
        - ops
```

## Applications

`app1` is one of the applications that need to be deployed. Configuring permissions for an application is done in Deck, Spinnaker's UI, when you create or edit an application:

![app1 permissions](/images/fiat_overview_app1_perms.png)

`app2`, `app3`, and `app4` will look slightly different since they have different permissions based on the mapping exercise. 

For information about how to configure permissions for applications, see [Applications](https://www.spinnaker.io/setup/security/authorization/#applications).

## Applying changes

Whenever you make a change to permissions, run `hal deploy apply` to apply your changes to the Spinnaker deployment.

## Verifying permissions

You can verify what permissions are assigned to a role at any time.

### Admin permissions

Check `fiat-local.yml` to see who is assigned an `admin` role.

### Permissions in Halconfig

In your Halconfig, you can verify several sets of permissions.

For example, search for `ci` to find the continuous integration section. Look for the `permissions` key and examine the `READ` and `WRITE` subkeys. All the user roles that have read or write permission for the CI system are listed here. The same thing can be done for Clouddriver accounts.

### Permissions for apps

Check the permissions for all applications in Spinnaker with a REST API call to Gate.

**Headers** 

|  Request URL  |  `$GATE_URL/applications`  |
|  Request Method  |  `GET`  |
|  content-type  |  `application/json;charset=UTF-8`  |

The API call returns information about the apps. Refer to the `name` and `permissions` sections to find your applications and the corresponding permissions:

```
{
    ...
    "name": "app2",
    "permissions": {
          "EXECUTE": [
            "admin",
            "dev",
            "ops"
          ],
          "READ": [
            "admin",
            "dev",
            "ops"
          ],
          "WRITE": [
            "admin",
            "dev"
          ]
    },
    ...
}

```

### Permissions for Spinnaker service accounts

Verifying the permissions for service accounts requires access to the Front50 and Fiat pods.

List all the service accounts with the following command (from the Front50 pod):

```
export FRONT50=http://spin-front50:8080
curl -s $FRONT50/serviceAccounts
```

Check user or service account permissions for all of Spinnaker (from the Fiat pod):

```
export FIAT=http://spin-fiat:7003
curl -s $FIAT/authorize/$user-or-service-account
```

The command returns a JSON listing the following:
 * Roles the user/service account is in
 * Spinnaker applications the user/service account has access to
 * Clouddriver accounts the user/service account has access toW
 * Build services the user/service account has access to
