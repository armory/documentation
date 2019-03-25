---
layout: post
title: Exposing the API Endpoint
order: 47
published: false
redirect_from:
  - /spinnaker_install_admin_guides/api-endpoint/
  - /spinnaker_install_admin_guides/api_endpoint/
  - /spinnaker-install-admin-guides/api_endpoint/
---
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

When you have third-party authentication set up for your Spinnaker cluster, automating against the Spinnaker API can be slightly more difficult.  One way to achieve this is to set up X509 client certificate authentication, which can optionally be enabled on a second port on Gate (which then must be exposed to clients).  This document details one way to do this.

This document details the following:
* Obtaining / Creating a CA certificate.  If your organization has an internal (or other) CA, you can use the organization CA certificate (you only need the certificate in PEM format)
* Obtaining / Creating a certificate and private key for use by Deck (Spinnaker's UI microservice).  You can either request the certificate from your organization's CA, or use the self-signed CA created above, or create a self-signed certificate and key.
* Obtaining / Creating a certificate and private key for use by Gate (Spinnaker's UI microservice).   You can either request the certificate from your organization's CA, or use the self-signed CA created above, or create a self-signed certificate and key.
* Creating a JKS (Java Keystore) for Gate containing these two objects:
  * The CA certificate imported as a trust store.  Gate will use this to validate all inbound certificate-based clients.  Specifically, this operates in this fashion:
    * Spinnaker only needs the certificate, not the private key.  Generally speaking, the certificate is not a sensitive piece of information (it is what is publicly presented)
    * This CA certificate can either be an organization-wide CA certificate, or a CA certificate built specifically for Spinnaker
    * Gate (Spinnaker's API layer) will trust clients that present a certificate signed by this certificate
  * Gate's server certificate and private key, which does not necessarily need to be a valid certificate if Gate is fronted by a load balancer
* Enabling Deck to use the certificate generated for Deck
* Enabling Gate to use the JKS
* Configuring Gate to support X509 client certificate-based authentication, on a second port.

Before moving on, you should decide the following:

This document borrows heavily from the Open Source Spinnaker document on SSL, found here: [Setup / Security / Authentication / SSL](https://www.spinnaker.io/setup/security/authentication/ssl/).

## Decide Architecture



## (Optional) Create CA

If your organization has an internal (or other) CA that they use to sign certificates, you can skip this step

## (Optional) Get Deck Cert
## (Optional) Get Gate Cert
## Checkpoint
## Create JKS
## Enable Deck SSL
## Enable Gate SSL
## Configuring Gate
### Gate-local

.hal/default/profiles/gate-local.yml
```yml
default:
  apiPort: 8085
```
```bash
hal config security authn x509 enable
```

## Expose Set up service
set up service
talk about pass-through
look at principal name
look at authz: roleOid