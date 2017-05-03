---
layout: post
title: Authentication
order: 70
published: false
---

# Authentication

There are a few authentication mechanisms in Spinnaker.  Spinnaker supports the following mechanisms:

* OAuth
* X509
* SAML
* Basic Auth

## Enabling HTTPS/SSL

 * Configuration to enable SSL
 * Self-signed certs on gate-local.yml?



## OAuth

 * OAuth for github
 * OAuth for Google
 * OAuth for any provider

## X509

@imosquera just a heads up in case you encounter such problems — when creating the .pem file from the `.p12`, the `-nodes` bit is necessary to play nice with default ciphers used by python.  E.g: `openssl pkcs12 -in server.p12 -out server.pem -nodes`

[9:26]
I am sure your other customers would be delighted to have that information and save themselves frustration

## SAML
