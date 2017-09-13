---
layout: post
title: Authorization
order: 120
published: True
---

This guide should include:
* How to enable and configure Fiat
* Configure LDAP as an authorization provider
* Restrict access based on account/application

# Authorization
Authorization is handled by a micro-service called `Fiat`.  Fiat is responsible for access control for both applications and accounts.  It's also responsible for executing triggers with service accounts.

## Open Port

On the internal ELB make sure port 7003 is open. If there's no listener for 7003 then add it, copying the configuration used for the listener on port 7002.

## Enabling Fiat

To enable fiat, set the following: `FIAT_ENABLED=true` in your environment variable.  This is
typically stored at `/opt/spinnaker/env/` with a correlated environment file.  You'll also have to make sure that [authentication
is setup first](http://docs.armory.io/admin-guides/auth/).  Next steps are to configure an authorization provider (see below) which will inform Fiat
about users and their group membership.

## LDAP

Consider the following sample ldap database:

```
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

```
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

## OKTA

OKTA has its own [separate guide](/admin-guides/okta/) due to its lengthy configuration

## Application Access

To modify an application's access go to `application -> config > edit application attributes -> permissions`

![application permissions](https://cl.ly/0Z3j0k1L3Q0m/Image%202017-08-09%20at%2012.34.13%20PM.png)

Once you have your authorization provider configured you should be able to see available groups for your user.  For each group that is added to the list you can select "Read-Only" or "Read/Write" Permissions.  Once groups are added to the list no other users will be able to access that application.  

![application permissions](https://cl.ly/2K3D0V3F170i/Image%202017-08-09%20at%2012.35.25%20PM.png)

## Account Access

To restrict access to an account based on group membership add you'll need to add
the `requiredGroupMembership` field to your accounts which is configured in
`/opt/spinnaker/config/clouddriver-local.yml`.

```
aws:
  accounts:
    - name: mobile-apps-account
      accountId: "111111111111"
      requiredGroupMembership: mobile-apps-group
```

then restart armory-spinnaker:
```
service armory-spinnaker restart
```
