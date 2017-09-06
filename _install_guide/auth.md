---
layout: post
title: Authentication
order: 110
published: True
---

There are several authentication mechanisms available in Spinnaker:

* OAuth
* x509
* SAML
* Basic Auth

> *Note*: If you are going to use authentication with your Spinnaker instance you will no longer be able to use the API without setting up x509 auth

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


## X509

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
  apiPort: 8083
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
