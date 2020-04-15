---
layout: post
title: Spinnaker Services TLS
order: 44
redirect_from:
  - /spinnaker_install_admin_guides/spinnaker-services-tls/
  - /spinnaker_install_admin_guides/services_tls/
  - /spinnaker-install-admin-guides/spinnaker-services-ssl/
---

# What To Expect
{:.no_toc}
This guide includes:
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

Spinnaker services communicate with each other and can exchange potentially sensitive data. Enabling TLS between services ensures that this data is encrypted and that a service will only communicate with another service that has a valid certificate.

Switching from plain HTTP to HTTPS will cause some short disruption to the services as they become healthy at different times.


## Introduction

When a client attempts to communicate with a server over SSL:
- the server must present a certificate to the user.
- the client must validate that certificate by checking it against its known valid certificate authorities (CA).

To properly set up TLS between services, we need to provide each service with:
1. a certificate signed by a CA
2. the CA certificate to verify these certificates

Note that distributing a CA public key is only needed if you sign certificates with a CA that is not bundled in most systems. **In this document, we assume that you are using a self-signed CA.**

**Java**

Java services can present #1 as a keystore and #2 as a trust store in PKCS12 (preferred) or JKS format. 

**Golang**

Golang services need a X509 certificate (PEM format) and a private key for #1 as well as the X509 certificate of the CA for #2.


## What You Need

The following table lists the Armory Spinnaker services, their type (Java or Golang), and which certificates they need:

| Service | Type | Server | Client |
|------|---|--|--|
| Clouddriver | Java  | Yes | Yes |
| Deck | N/A | - | - |
| Dinghy* | Golang | Yes | Yes |
| Echo | Java | Yes | Yes |
| Fiat | Java | Yes | Yes |
| Front50 | Java | Yes | Yes |
| Gate | Java | Maybe | Yes |
| Kayenta | Java | Yes | Yes |
| Igor | Java | Yes | Yes |
| Orca | Java | Yes | Yes |
| Rosco | Java | Yes | Yes |
| Terraformer* | Golang | Yes | Yes |

* Dinghy is the service for Pipelines as Code.
* Terraformer is the service for the Terraform Integration.

**Note**: Gate may be handled differently if you already [terminating SSL at Gate](../dns-and-ssl). If not, make sure the load balancer and ingress you are using supports self-signed certificates.

In the following sections, you need to have the following information available:

- `ca.pem` (all Golang servers): the CA certificate in PEM format
- `[service].crt` (each Golang server): the certificate and (optionally) the private key of the Golang server in PEM format
- `[service].key` (each Golang server): the private key of the Golang server if not bundled with the certificate you're using
- `[GOSERVICE]_KEY_PASS` (each Golang server): the password to the private key of the server
- `truststore.p12` (all Java clients): a PKCS12 truststore with CA certificate imported
- `TRUSTSTORE_PASS` (all Java clients): the password to the truststore you're using
- `[service].p12` (each Java server): a PKCS12 keystore containing the certificate and private key of the server
- `[SERVICE]_KEY_PASS` (each Java server): the password to the keystore you're using


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

# Needed for all Java services
ok-http-client:
  key-store: <reference to truststore.p12>
  key-store-type: PKCS12
  key-store-password: <TRUSTSTORE_PASS>
  trust-store: <reference to truststore.p12>
  trust-store-type: PKCS12
  trust-store-password: <TRUSTSTORE_PASS>
```

**Note:** Currently, `ok-http-client.key-store` is required even though it is not used in a simple TLS setup.

## Configuration (Golang services)

```yaml
server:
  ssl:
    enabled: true
    certFile: <reference to [service].crt>
    keyFile: <reference to [service].key if not included in the certFile's PEM>
    keyPassword: <[GOSERVICE]_KEY_PASS if required>

http:
  cacertFile: <reference to ca.pem>
```

## Changing Service Endpoints

### Halyard
You can change each Java or Golang service endpoints by adding the following in `<hal directory>/<deployment>/service-settings/<service>.yml`:
```yaml
baseUrl: https://spin-<SERVICE>.<NAMESPACE>:<SERVICE PORT>
```

### Spinnaker Operator

Similarly, you can change the SpinnakerService custom resource:

```yaml
kind: SpinnakerService
...
spec:
  spinnakerConfig:
    service-settings:
      clouddriver:
        baseUrl: https://spin-clouddriver.<NAMESPACE>:7002
      dinghy:
        baseUrl: https://spin-dinghy.<NAMESPACE>:8081
      echo:
        baseUrl: https://spin-echo.<NAMESPACE>:8089
      fiat:
        baseUrl: https://spin-fiat.<NAMESPACE>:7003
      front50:
        baseUrl: https://spin-front50.<NAMESPACE>:8080
      gate:
        baseUrl: https://spin-gate.<NAMESPACE>:8084
      kayenta:
        baseUrl: https://spin-kayenta.<NAMESPACE>:8090
      orca:
        baseUrl: https://spin-orca.<NAMESPACE>:8083
      igor:
        baseUrl: https://spin-igor.<NAMESPACE>:8088
      rosco:
        baseUrl: https://spin-rosco.<NAMESPACE>:8087
      terraformer:
        baseUrl: https://spin-terraformer.<NAMESPACE>:7088
```

## Deployment

After you finish modyfing the service YAML files, run `kubectl -n <spinnaker namespace> apply -f <SpinnakerService manifest>` if using Operator, or `hal deploy apply` if using Halyard to apply your changes to your Spinnaker deployment.

Switching from plain HTTP to HTTPS will cause some short disruption to the services as they become healthy at different times.


## Providing certificates and passwords to services

### Secret Engines

You can store secrets (and non secrets) in [supported secret stores](../secrets) as well as in Kubernetes secrets if using the [Spinnaker Operator](../../spinnaker/operator/). This is the simplest route.

For instance, assuming all the information is stored in a bucket named `mybucket` on s3 that all services have access to, `SpinnakerService` manifest (or the corresponding `echo-local.yml` in Halyard) might look like:

```yaml
apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    profiles:
      echo:
        server:
          ssl:
            enabled: true
            key-store: encryptedFile:s3!b:mybucket!r:us-west-2!f:echo.jks
            key-store-type: JKS
            key-alias: echo
            key-store-password: encrypted:s3!b:mybucket!r:us-west-2!f:passwords.yml!k:echo.keyPassword

        ok-http-client:
          key-store: encryptedFile:s3!b:mybucket!r:us-west-2!f:truststore.jks
          key-store-type: JKS
          key-store-password: encrypted:s3!b:mybucket!r:us-west-2!f:passwords.yml!k:truststorePassword
          trust-store: encryptedFile:s3!b:mybucket!r:us-west-2!f:truststore.jks
          trust-store-type: JKS
          trust-store-password: encrypted:s3!b:mybucket!r:us-west-2!f:passwords.yml!k:truststorePassword
```

Run `kubectl -n <spinnaker namespace> apply -f <SpinnakerService manifest>` if using Operator, or `hal deploy apply` if using Halyard after you make your changes.

### Manually Providing Information

An alternative if you cannot use one of the supported secret engine is to store the information in Kubernetes secrets and manually provide the information. Files are added through a `volumeMount` and passwords through an environment variable.

For instance, assuming `mysecrets` Kubernetes Secret is available in the same namespace as Spinnaker with the following keys:

```yaml
data:
  echo.jks: <base64 encoded keystore>
```

We'll now provide the following in `service-settings/echo.yml`:
```yaml
kubernetes:
  volume:
  - name: secretvol
    mountPath: /var/mysecrets
```

And a reference would then be:

```yaml
server:
  ssl:
    key-store: /var/mysecrets/echo.jks
```

Run `hal deploy apply` after you make your changes.

**Note**: There is currently no way to pass passwords stored in Kubernetes secrets as environment variables using Halyard. You can remove passwords from the keys you're using or use the Spinnaker Operator to reference Kubernetes secrets directly.

