---
layout: post
title: Authentication
order: 70
published: True
---

There are several authentication mechanisms available in Spinnaker:

* OAuth
* x509
* SAML
* Basic Auth

> *Note*: If you are going to use authentication with your Spinnaker instance you will no longer be able to use the API without setting up x509 auth

## Enabling HTTPS/SSL
In order to enable SSL we'll need to provide Gate (and thus Java) with certificates in a java keystore (JKS) or terminate at the ELB.  This will ensure secure communication between your browser/clients and Spinnaker Deck & Gate

For the following example we're going to create self-signed certificates although for production use you will want to have an official certificate authority (CA) sign your certificate.
Let's start by first creating a self-signed CA for a java keystore

```
keytool -genkey -keyalg RSA -alias selfsigned -keystore keystore.jks -storepass ${YOUR_KEYSTORE_PASSWORD} -validity 360 -keysize 2048
```

If you already have a certificate you would like to use you can import it:

```
keytool -importkeystore -srckeystore server.p12 -srcstoretype pkcs12 -srcalias spinnaker -srcstorepass ${YOUR_KEY_PASSWORD} -destkeystore keystore.jks -deststoretype jks -destalias server -deststorepass ${YOUR_KEY_PASSWORD} -destkeypass ${YOUR_KEYSTORE_PASSWORD}
```

Place the resulting keystore.jks in `/opt/spinnaker/config`

In `/opt/spinnaker/config/gate-local.yml` add the following, making sure to replace the password with your own that you provided in the previous step:

```
server:
  ssl:
    enabled: true
    keyStore: /opt/spinnaker/config/keystore.jks
    keyStorePassword: ${YOUR_KEYSTORE_PASSWORD}
    keyAlias: server
```

Update our API_HOST and DECK_HOST environment variables to now have `https`. Add the following into `default.env` or if your environment specific env file place it in there: `${CLOUD_STACK}.env`:

```
API_HOST=https://spinnaker.example-domain.com:8084
DECK_HOST=https://spinnaker.example-domain.com
```

Update your ELB to contain the following port mappings:

![elb](https://cl.ly/3i0o0b38103J/Image%202017-05-05%20at%203.42.27%20PM.png)


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
