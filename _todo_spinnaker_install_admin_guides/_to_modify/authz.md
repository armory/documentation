---
layout: post
title: Authorization
order: 120
published: false
---

{% include components/legacy_documentation.html %}

Refer to the Spinnaker documentation for configuring authorization at
[https://www.spinnaker.io/setup/security/authorization/](https://www.spinnaker.io/setup/security/authorization/)

<div class="deprecation-warning">
  The information below has been deprecated.
</div>

# Turning on Fiat
{:.no_toc}

Authorization is handled by a micro-service called `Fiat`.  Fiat is responsible for access control for both applications and accounts.  It's also responsible for executing triggers with service accounts. Fiat authorization model is open by default, read more about authorizations [here](https://www.spinnaker.io/setup/security/authorization).
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}



## Open Port

On the internal ELB make sure port 7003 is open. If there's no listener for 7003 then add it, copying the configuration used for the listener on port 7002.

## Enabling Fiat

To enable fiat, set the following: `FIAT_ENABLED=true` in your environment variable.  This is
typically stored at `/opt/spinnaker/env/` with a correlated environment file.  You'll also have to make sure that [authentication
is setup first](http://docs.armory.io/install-guide/auth/).  Next steps are to configure an authorization provider (see below) which will inform Fiat
about users and their group membership.

## LDAP

Consider the following sample ldap database:

```yml
### Users group

dn: ou=users,dc=mycompany,dc=com
objectClass: organizationalUnit
ou: users
description: generic users branch

### Container for groups which users belong to

dn: ou=groups,dc=mycompany,dc=com
objectClass: organizationalUnit
ou: groups
description: generic groups branch

### A sample group

dn: cn=eng,ou=groups,dc=mycompany,dc=com
objectClass: groupOfNames
cn: eng
description: Engineering group
member: cn=isaac,ou=users,dc=armory,dc=io
member: ...

### First user

dn: uid=isaac,ou=users,dc=mycompany,dc=com
objectClass: posixAccount
cn: isaac
uid: isaac
uidNumber: 16000
gidNumber: 100
homeDirectory: /home/isaac
loginShell: /bin/bash
```

This sample data could be handled by adding the following configuration to the
file `/opt/spinnaker/config/fiat-local.yml`:

```yml
auth:
  groupMembership:
    service: ldap
    ldap:
      url: ldaps://ldap.mycompany.com
      managerDn: cn=admin,dc=mycompany,dc=com
      managerPassword: myPassword
      groupSearchBase: ou=groups,dc=mycompany,dc=com
      groupSearchFilter: member={0},dc=mycompany,dc=com
      groupRoleAttributes: cn
      userDnPattern: uid={0},ou=users
      userSearchBase: dc=mycompany,dc=com
      userSearchFilter: ''
```

You must tailor this configuration to match your ldap database.
* adjust `mycompany` and `com` to match your organization.
* adjust `managerDn` and `managerPassword` on lines 8 & 9.
* adjust `groups` to be the parent DN of your groups.
* replace `member` with the key that you use when you add a user to a group. In the sample data, 'member' is used to add isaac and don to the eng group.


## Github

Fiat supports application and AWS account access based on [Github teams](https://help.github.com/articles/about-teams/). Fiat will poll Github to find changes to teams in Github.

You'll need to generate a personal API access token here: [https://github.com/settings/tokens](https://github.com/settings/tokens). It only needs to have `read:org` permissions.
> *Note*: You might want to create a GitHub Bot account for this and add it to your organization

![](/images/Image-2017-01-06-at-5.23.33-PM.png)

Add the configuration below to: `/opt/spinnaker/config/fiat-local.yml`:

```yml
auth:
  groupMembership:
    service: github
    github:
      organization: YOUR_ORGANIZATION
      baseUrl: https://api.github.com
      access_token: YOUR_ACCESS_TOKEN  # access token handled by secret store
```

## OKTA

OKTA has its own [separate guide](/admin-guides/okta/) due to its lengthy configuration

## Application Access

To modify an application's access go to `application -> config > edit application attributes -> permissions`

![application permissions](/images/Image-2017-08-09-at-12.34.13-PM.png)

Once you have your authorization provider configured you should be able to see available groups for your user.  For each group that is added to the list you can select "Read-Only" or "Read/Write" Permissions.  Once groups are added to the list no other users will be able to access that application.

![application permissions](/images/Image-2017-08-09-at-12.35.25-PM.png)

## Account Access

To restrict access to an account based on group membership add you'll need to add
the `permissions` field to your accounts which is configured in
`/opt/spinnaker/config/clouddriver-local.yml`.

```yml
aws:
  accounts:
    - name: mobile-apps-account
      accountId: "111111111111"
      permissions:
        read:
          - mobile-team-devs
          - mobile-team-qa
        write:
          - mobile-team-qa
```

then restart armory-spinnaker:
```
service armory-spinnaker restart
```

# Configure a Service Account
When fiat is enabled, some Spinnaker operations require [adding a service account](https://www.spinnaker.io/setup/security/authorization/service-accounts/).  The service
account should be a `memberOf` of `armoryspinnaker`'s permission groups.

This account will be used to shutdown old instances when you re-deploy `armoryspinnaker`. To configure the service account, edit `spinnaker-local.yml` to include:
```yml
services:
  lighthouse:
    # Put your service account here;
    defaultServiceAccount: armory-lighthouse
```
