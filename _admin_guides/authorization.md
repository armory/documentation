---
layout: post
title: Authorization
order: 70
published: True
---

# Authorization
Authorization is handled by a micro-service called `Fiat`.  Fiat is responsible for access control  
for both applications and accounts.  It's also responsible for executing triggers with service accounts.

## Enabling Fiat

To enable fiat, set the following: `FIAT_ENABLED=true` in your environment variable.  This is
typically stored at `/opt/spinnaker/env/` with a correlated environment file.  You'll also have to make sure that [authentication
is setup first](http://docs.armory.io/admin-guides/auth/).  Next steps are to configure an underlying service which will inform Fiat
about users and access control.

## LDAP Authorization

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
1 auth:
2   groupMembership:
3     service: ldap
4
5     ldap:
6       url: ldaps://ldap.mycompany.com
7
8       managerDn: cn=admin,dc=mycompany,dc=com
9       managerPassword: myPassword
10
11      groupSearchBase: ou=groups,dc=mycompany,dc=com
12      groupSearchFilter: member={0},dc=mycompany,dc=com
13      groupRoleAttributes: cn
14
15      userDnPattern: uid={0},ou=users
16      userSearchBase: dc=mycompany,dc=com
17      userSearchFilter: ''
```

You must tailor this configuration to match your ldap database.
* adjust `mycompany` and `com` to match your organization.
* adjust `managerDn` and `managerPassword` on lines 8 & 9.
* On line 11, you should change `groups` to be the parent DN of your groups.
* On line 12, replace `member` with the key that you use when you add a user to a group. In the sample
data, 'member' is used to add isaac and don to the eng group.
