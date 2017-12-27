---
layout: post
title: Authentication
order: 110
published: True
---

# What To Expect
This guide should include:
* [Basic Auth](#basic-auth)
* [LDAP Auth](#ldap-authentication)
* [Github OAuth](#github-oauth)
* [Github Organization Restriction](#github-organization-restriction)
* [x509](#x509)
* SAML

> *Note*: If you are going to use authentication with your Spinnaker instance you will no longer be able to use the API without setting up x509 authentication


## Basic Auth

In `/opt/spinnaker/config/gate-local.yml` add the following:

```
security:
  basic:
    enabled: true
  user:
    name: example-username
    password: example-password
```

This will allow you to call the Spinnaker API using basic auth:

`curl --user example-username:example-password --header 'Accept: application/json' http://spinnaker-host.example.com:8084/applications`



## LDAP Authentication

Update the file `/opt/spinnaker/config/gate-local.yml` and add the following section:

```
ldap:
  enabled: true
  url: ldaps://ldap.mycompany.com/dc=mycompany,dc=com
  userDnPattern: uid={0},ou=users
```

You should adjust `mycompany` and `com` to match your organization.
See the [Spinnaker LDAP Documentation](https://www.spinnaker.io/setup/security/authentication/ldap/)
for more info.

> *Note*: Enable [sticky sessions](#enabling-sticky-sessions) on the external ELB when enabling LDAP.   Make sure to use load balancer generated cookies. ![](https://cl.ly/0C1n3m3e3M2z/Image%202017-10-11%20at%209.26.58%20AM.png)


## Github OAuth

The configuration below is for GitHub or GitHub Enterprise, but other possible configurations include Azure OAuth, Okta, [Google](http://www.spinnaker.io/docs/securing-spinnaker) or Facebook.

- *Setup the OAuth2 app in GitHub.* -
![](http://drod.io/1z1P3W2Q040t/Image%202017-01-06%20at%205.21.21%20PM.png)
  * Replace `yourdomain` in the blue box "Homepage URL" above with hostname of Deck
  * For the "Authorization callback URL," in blue replace `yourdomain` with your Gate hostname.
  * **Make sure to use HTTPS for both URLs above.**
- *Add Github Configuration to Spinnaker* -
Add the GitHub configuration to Gate by adding the following to: `/opt/spinnaker/config/gate-local.yml`:

```
security:
  oauth2:
    enabled: true
    client:
      clientId: ###############
      clientSecret: #############################
      userAuthorizationUri: https://github.com/login/oauth/authorize # Used to get an authorization code
      accessTokenUri: https://github.com/login/oauth/access_token # Used to get an access token
      scope: read:org,user:email
    resource:
      userInfoUri: https://api.github.com/user  # Used to the current user's profile
    userInfoMapping:  # Used to map the userInfo response to our User
      email: email
      firstName: name
      lastName:
      username: login
```


The fields to fill in are the `clientID` and `clientSecret` from the yellow box in the first screenshot above.

- *Enable Auth Flag* Set `AUTH_ENABLED=true` in your environment file.  It's typically stored at `/opt/spinnaker/env/ha.env`

- *Restart Spinnaker*: `service armory-spinnaker restart`

> *Note*: Enable [sticky sessions](#enabling-sticky-sessions) on the external ELB when enabling OAuth.  Make sure to use load balancer generated cookies. ![](https://cl.ly/0C1n3m3e3M2z/Image%202017-10-11%20at%209.26.58%20AM.png)



## Github Organization Restriction

By default Github OAuth only requires that a user has a Github account without any restrictions on that account. Many installations will also want to require the user belong to a company organization to be authenticated successfully. When using the organization restriction members must have their visiblity set to `Public`. You can view the visibility setting for members on the `People` tab of your organization.

- Ensure that everyone in your organization has their visibility set to Public if they plan to login to Spinnaker:
![Armory People Screen](/assets/images/github-armory-people.jpg)
- Add a `providerRequirements` section to the file at `/opt/spinnaker/config/gate-local.yml` under security.oauth2 so that your configuration looks like the following:

```
security:
  oauth2:
    enabled: true
    client:
      clientId: ###############
      clientSecret: #############################
      userAuthorizationUri: https://github.com/login/oauth/authorize # Used to get an authorization code
      accessTokenUri: https://github.com/login/oauth/access_token # Used to get an access token
      scope: read:org,user:email
    providerRequirements:
      type: github
      organization: ########
    resource:
      userInfoUri: https://api.github.com/user  # Used to the current user's profile
    userInfoMapping:  # Used to map the userInfo response to our User
      email: email
      firstName: name
      lastName:
      username: login
```
The `organization` field should be the name of the github organization you want to use to restrict membership.

- *Restart Spinnaker*: `service armory-spinnaker restart`

## X509

X509 certificates are typically used to allow users to connect to the Spinnaker API.  This is especially helpful if you want different groups within your organization to maintain different keys.  You can re-use the same certificate as you used in the previous step but might want to maintain different certificates for groups within your organization.

In order to enable x509 certificates we'll need to add an additional trust certificate to the keystore.

In your `/opt/spinnaker/config/gate-local.yml` file add the following:

```
x509:
  enabled: true
  subjectPrincipalRegex: EMAILADDRESS=(.*?)(?:,|$) # optional

server:
  ssl:
    enabled: true
    keyStore: /opt/spinnaker/config/keystore.jks
    keyStorePassword: ${YOUR_PASSWORD}
    keyAlias: server
    trustStore: /opt/spinnaker/config/keystore.jks
    trustStorePassword: ${YOUR_PASSWORD}
    clientAuth: want

default:
  apiPort: 8085
```

The configuration adds an additional port for x509 certificates. This is so you can terminate HTTPS to end-users of the UI on the ELB and continue using API on a different port with x509 client certificates.

We'll need to create an additional key for the client/server to use for authentication.  The example below is for self signed certificates:

Generate Certificate Authority

```
openssl genrsa -des3 -out ca.key 4096
```

Self-sign a certificate with the key that was created in the previous step
```
openssl req -new -x509 -days 365 -key ca.key -out ca.crt
```

Create a client key
```
openssl genrsa -des3 -out client.key 4096
```

Generate a new Certificate Signing Request (CSR) from the client key used in the previous step.
```
openssl req -new -key client.key -out client.csr
```

Next, we'll self-sign the certificate to use on the server
```
openssl x509 -req -days 365 -in client.csr -CA ca.crt -CAkey ca.key -CAcreateserial -out client.crt
```

We'll have to export the certs in a P12 format for standard http communication
```
openssl pkcs12 -export -clcerts -in client.crt -inkey client.key -out client.p12
```

Import the certifcate into the keystore.  This is what will be used by Gate establish the `trustStore`
```
keytool -importkeystore -srckeystore server.p12 -srcstoretype pkcs12 -srcalias spinnaker -srcstorepass ${YOUR_KEY_PASSWORD} -destkeystore keystore.jks -deststoretype jks -destalias server -deststorepass ${YOUR_KEY_PASSWORD} -destkeypass ${YOUR_KEY_PASSWORD}
```

## Enabling Sticky Sessions

Before you configure authentication you'll need to enable sticky sessions for the external ELB for port 8084 (Gate).  This operation must be done through the AWS console.  For an infinite session leave the `Expiration Period` blank.

![Adding Sticky Sessions](https://cl.ly/0C1n3m3e3M2z/Image%202017-10-11%20at%209.26.58%20AM.png)
