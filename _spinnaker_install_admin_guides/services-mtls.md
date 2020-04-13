---
layout: post
title: Spinnaker Services mTLS
order: 45
redirect_from:
  - /spinnaker_install_admin_guides/spinnaker-services-mtls/
  - /spinnaker_install_admin_guides/services_mtls/
---

# What To Expect
{:.no_toc}
This guide describes how to enable mutual TLS (mTLS) between Spinnaker services and is building on top of [how to enable TLS](../services-tls):
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

Adding mTLS provides additional security for your Spinnaker services as only validated clients can interact with services when mTLS is enabled.


## Introduction

mTLS is a transport level security measure. When a client connects to a server, as in a TLS connection:
- The server responds with its certificate. Additionally, the server sends a certificate request and a list of Distinguished Names the server recognizes.
- The client verifies the certificate of the server and responds with its own certificate and the Distinguished Name its certificate was (in)directly signed with.
- The server verifies the certificate of the client.


To set up TLS, provide the following:
1. For a server:
- Certificate and private key
- Chain of certificates to validate clients
2. For a client:
- Certificate and private key to present to the server
- Chain of certificates to validate the server (if self signed)


## What You Need

In the following sections, you need the same information that you needed for [TLS setup](../services-tls#what-you-need):

- `ca.pem` (all Golang servers): the CA certificate in PEM format
- `[service].crt` (each Golang server): the certificate and optionally the private key of the Golang server in PEM format
- `[service].key` (each Golang server): the private key of the Golang server if not bundled with the certificate above
- `[GOSERVICE]_KEY_PASS` (each Golang server): the password to the private key of the server
- `truststore.p12` (all Java clients): a PKCS12 truststore with CA certificate imported
- `TRUSTSTORE_PASS` (all Java clients): the password to the truststore above
- `[service].p12` (each Java server): a PKCS12 keystore containing the certificate and private key of the server
- `[SERVICE]_KEY_PASS` (each Java server): the password to the keystore above

The server certificate will serve as its client certificate to other services. You can generate different certificates and use them in `ok-http-client.key-store*` (Java) and `http.key*` (Golang).

To learn how to generate these files, refer to [generating certificates](../generating-certificates/#putting-it-together-tls).

## Configuration (Java services)

Add the following to each Java service profile: `<deploy>/profiles/<service>-local.yml` in Halyard or under `profiles` in the [SpinnakerService's profiles](../../spinnaker/operator-config/#specspinnakerconfigprofiles):

```yaml
# Only needed for "server" role
server:
  ssl:
    enabled: true
    key-store: <reference to [service].p12>
    key-store-type: PKCS12
    key-store-password: <[SERVICE]_KEY_PASS>
    trust-store: <reference to ca.p12>
    trust-store-type: PKCS12
    trust-store-password: <TRUSTSTORE_PASS>
    # Roll out with "want" initially
    client-auth: need

# Needed for all Java services
ok-http-client:
  key-store: <reference to [service].p12>
  key-store-type: PKCS12
  key-store-password: [SERVICE]_KEY_PASS
  trust-store: <reference to truststore.p12>
  trust-store-type: PKCS12
  trust-store-password: <TRUSTSTORE_PASS>
```


## Configuration (Golang services)

```yaml
server:
  ssl:
    enabled: true
    certFile: <reference to [service].crt>
    keyFile: <reference to [service].key if not included in the certFile's PEM>
    keyPassword: <[GOSERVICE]_KEY_PASS if required>
    cacertFile: <reference to ca.pem>
    # Roll out with "want" initially
    clientAuth: need

http:
  cacertFile: <reference to ca.pem>
  clientCertFile: <reference to [service].crt>
  clientKeyFile: <reference to [service.key]>
  clientKeyPassword: <[GOSERVICE]_KEY_PASS if required>
```

## Changing Service Endpoints

This section is identical to [changing endpoints for TLS](../services-tls#changing-service-endpoints).

## Changing Readiness Probe

Change the readiness probe used by Kubernetes from an HTTP request to a TCP probe.

* **Operator**

    Add the following snippet to each service in `SpinnakerService` manifest:

    ```yaml
    apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
    kind: SpinnakerService
    metadata:
      name: spinnaker
    spec:
      spinnakerConfig:  
        service-settings:
          <service>:
            kubernetes:
              useTcpProbe: true
    ```

* **Halyard**

    This can be done by adding the following to each service under `<deploy>/service-settings/<service>.yml`:

    ```
    kubernetes:
      useTcpProbe: true
    ```

    *Important*: Version 1.8.2 or later of Halyard Armory is required to support TCP probe.

## Deployment

Apply your changes to your Spinnaker deployment:

* **Operator**

    ```bash
    kubectl -n <spinnaker namespace> apply -f <SpinnakerService manifest>
    ```

* **Halyard**

    ```bash
    hal deploy apply
    ```

If Spinnaker services are already using HTTPS, you can roll out mTLS without interruption by making the client certificate optional (`want`) in `server.ssl.client-auth` (Java) and `server.ssl.clientAuth`. Then once all the services are stable, rolling out a new configuration with that value set to `need`.
