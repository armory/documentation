---
layout: post
title: Exposing the API Endpoint
order: 47
published: true
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
* Obtaining / Creating a CA certificate.  If your organization has an internal (or other) CA, you can use the organization CA certificate (you only need the certificate in PEM format).  All API clients must present a certificate signed by this CA; if you are creating a self-signed certificate, you can create client certs on your own.  If you are using an organization CA, you must be able to request client certs from your organization CA.
* Obtaining / Creating a certificate and private key for use by Deck (Spinnaker's UI microservice).  You can either request the certificate from your organization's CA, or use the self-signed CA created above.
* Obtaining / Creating a certificate and private key for use by Gate (Spinnaker's UI microservice).   You can either request the certificate from your organization's CA, or use the self-signed CA created above.
* Creating a JKS (Java Keystore) for Gate containing these two objects:
  * The CA certificate imported as a trust store.  Gate will use this to validate all inbound certificate-based clients.  Specifically, this operates in this fashion:
    * Spinnaker only needs the certificate, not the private key.  Generally speaking, the certificate is not a sensitive piece of information (it is what is publicly presented)
    * This CA certificate can either be an organization-wide CA certificate, or a CA certificate built specifically for Spinnaker
    * Gate (Spinnaker's API layer) will trust clients that present a certificate signed by this certificate
  * Gate's server certificate and private key, which does not necessarily need to be a valid certificate if Gate is fronted by a load balancer
* Enabling Deck to use the certificate generated for Deck
* Enabling Gate to use the JKS
* Configuring Gate to support X509 client certificate-based authentication, on a second port.

### Spinnaker Endpoints

At the end of this process, you will end up with three endpoints for Spinnaker:
* A UI endpoint on the Deck microservice.  You can terminate TLS on the load balancer (Ingress or other load balancer), and end up with a flow that looks like this:
  ```bash
  [Browser] ---HTTPS--> [Load Balancer with TLS Termination] ---HTTP--> [Deck:9000]
  ```
* An API endpoint on the Gate microservice for browser clients.  You can terminate TLS on the load balancer (Ingress or other load balancer).  Authentication will be handled by your primary authentication provider (LDAP, SAML, OAuth2.0, etc.).  You may end up with a flow that looks like this:
  ```bash
  [Browser] ---HTTPS--> [Load Balancer with TLS Termination] ---HTTP--> [Gate:8084]
  ```
* An API endpoint on the Gate microservice for automation clients.  Clients must present an x509 client certificate in order to use this endpoint, so you *cannot* terminate TLS on a load balancer in front of Gate.  The data flow may look something like this:
  ```bash
  [API Client] ---HTTPS--> [TCP Load Balancer] ---HTTPS--> [Gate:8085]
  ```
  or
  ```bash
  [API Client] ---HTTPS--> [TLS Pass Through Load Balancer] ---HTTPS--> [Gate:8085]
  ```

### Decision Points

Before moving on, you should decide the following:
* For the CA used to validate client certificates, are you using an organization CA or creating a self-signed CA?
* For the Gate and Deck certificate, are you using certificates signed by an organization CA, certificates signed by a self-signed CA, or self-signed certificates?
* In order to access the API endpoint, the API endpoint (which is an extra port on the existing Gate service) must be directly exposed.  Clients must be able to provide their certificates to Gate; there should be no TLS termination in front of it.  This means you must do one of the following:
  * Set up a Layer 4 (TCP) load balancer in front of this endpoint
  * Set up a Layer 7 (HTTPS) load balancer that supports TLS passthrough.

This document borrows heavily from the Open Source Spinnaker document on SSL, found here: [Setup / Security / SSL](https://www.spinnaker.io/setup/security/ssl/).

## Obtaining / Creating a Self-Signed CA Certificate

If your organization has a CA that you can use to sign client certificates, then you must obtain a copy of the CA certificate (note: this is generally the public-facing certificate, and therefore not sensitive information).  You must get this in a PEM-formatted file, or convert it to a PEM-formatted file.

Alternatively, you can create a self-signed CA certificate to use to sign client certificates, and configure Gate to trust certificates signed by this CA certificate.

### Obtaining the Organization Certificate

If your organization has a CA certificate, you should obtain the CA certificate in PEM format.  You do not need the private key, as long as your organization has a way to request client certificates signed by the CA.

You should have the following items:

* `ca.crt`: a `pem`-formatted certificate.  Spinnaker will trust client certificates that were signed by this CA.

### Creating a Self-Signed CA Certificate

If your organization has a CA certificate or you do not have a way to request client certificates signed by the CA, you can generate a self-signed CA certificate and private key.  We will use this

We will use `openssl` to generate a Certificate Authority (CA) key and a server
certificate. These instructions create a self-signed CA and key. You might want to
use an external CA, to minimize browser configuration, but it's not necessary
(and can be expensive).

Use the steps below to create a Certificate Authority. (If you're using an
external CA, skip to the next section.)

It will produce the following items:

* `ca.key`: a `pem`-formatted private key, which will have a pass phrase.
* `ca.crt`: a `pem`-formatted certificate, which (with the private key) acts as
a self-signed Certificate Authority.

1. Create the CA key, which will be encrypted with a passphrase.  You can remove the `-passout` flag to have the command prompt for the passphrase.

   ```bash
   CA_KEY_PASSWORD=SOME_PASSWORD_FOR_CA_KEY

   openssl genrsa \
     -des3 \
     -out ca.key \
     -passout pass:${CA_KEY_PASSWORD} \
     4096
   ```

1. Self-sign the CA certificate.  You can remove the `-passin` flag to have the command prompt for the passphrase.  This should be the pass phrase used to
encrypt `ca.key`.

   ```bash
   CA_KEY_PASSWORD=SOME_PASSWORD_FOR_CA_KEY

   openssl req \
     -new \
     -x509 \
     -days 365 \
     -key ca.key \
     -out ca.crt \
     -passin pass:${CA_KEY_PASSWORD}
   ```

## Obtain or Generate a Server Certificate for the Deck (UI) Service

_This step is technically optional, but it requires setting up separate exposure mechanisms for Deck and Gate if this step is skipped.  For simplicity' sake, we recommend completing this step_

You will need a server certificate and private key.  If you have a load balancer in front of Deck that is terminating TLS, the certificate on Deck generally won't matter aside from the fact that you must have one.  There are two main options here:

1. Obtaining a server certificate and private key from your organization CA
1. Generating a server certificate and private key from the self-signed CA

### Obtaining a Deck server certificate and private key from your organization CA

If your organization has a CA certificate, you should request a server certificate for use with Deck.  This should result in the following files:

* `deck.key`: a `pem`-formatted private key, which will have a pass phrase.
* `deck.crt`: a `pem`-formatted x509 certificate, which matches the private key and was signed by your CA.

### Generating a Deck server certificate and private key from the self-signed CA

If you want to generate your own certificates (for example, from the self-signed CA certificate created above), you can follow these steps:

1. Create a server key for Deck. Keep this file safe!

   ```bash
   # This will be the passphrase used to encrypt the Deck private key
   DECK_KEY_PASSWORD=SOME_PASSWORD_FOR_DECK_KEY

   openssl genrsa \
     -des3 \
     -out deck.key \
     -passout pass:${DECK_KEY_PASSWORD} \
     4096
   ```

1. Generate a certificate signing request (CSR) for Deck. Specify `localhost` or
Deck's eventual fully-qualified domain name (FQDN) as the Common Name (CN).  

   ```bash
   # This should be the passphrase used to encrypt the Deck private key
   DECK_KEY_PASSWORD=SOME_PASSWORD_FOR_DECK_KEY

   openssl req \
     -new \
     -key deck.key \
     -out deck.csr \
     -passin pass:${DECK_KEY_PASSWORD}
   ```

1. Use the CA to sign the server's request and create the Deck server certificate
(in `pem` format). If using an external CA, they will do this for you.  

   ```bash
   # This should be the passphrase used to encrypt the self-signed CA private key
   CA_KEY_PASSWORD=SOME_PASSWORD_FOR_CA_KEY

   openssl x509 \
     -req \
     -days 365 \
     -in deck.csr \
     -CA ca.crt \
     -CAkey ca.key \
     -CAcreateserial \
     -out deck.crt \
     -passin pass:${CA_KEY_PASSWORD}
   ```

1. You should end up with these two files:
    * `deck.key`: a `pem`-formatted private key, which will have a pass phrase
    * `deck.crt`: a `pem`-formatted x509 certificate, which matches the private key and was signed by your CA

## Obtain or Generate a Server Certificate for the Gate (API) Service

You will need a server certificate and private key.  This server certificate will be used for both Gate endpoints - one for the authenticated API endpoint used by browser clients, one for the certificate-authenticated (X509) API endpoint used by automated clients.

There are two main options here:

1. Obtaining a server certificate and private key from your organization CA
1. Generating a server certificate and private key from the self-signed CA

### Obtaining a server certificate and private key from your organization CA

If your organization has a CA certificate, you should request a server certificate for use with Gate.  

Because the X509 API is exposed directly to your automation endpoints, it may be helpful to request a certificate with a CN that matches a DNS name that resolves to your load balancer.  For example, if you can point `api.spinnaker.domain.com` at your load balancer, you may want to request a certificate that has `api.spinnaker.domain.com` as its CN.

Alternatively you can configure your clients to skip server certificate validation (this is usually the `-k` flag for `curl`).

This should result in the following files:

* `gate.key`: a `pem`-formatted private key, which will have a pass phrase.
* `gate.crt`: a `pem`-formatted x509 certificate, which matches the private key and was signed by your CA.

### Generating a server certificate and private key from the self-signed CA

If you want to generate your own certificates (for example, from the self-signed CA certificate created above), you can follow these steps:

1. Create a server key for Gate. Keep this file safe!

   This will prompt for a pass phrase to encrypt the key.

   ```bash
   # This will be the passphrase used to encrypt the Gate private key
   GATE_KEY_PASSWORD=SOME_PASSWORD_FOR_GATE_KEY

   openssl genrsa \
     -des3 \
     -out gate.key \
     -passout pass:${GATE_KEY_PASSWORD} \
     4096
   ```

1. Generate a certificate signing request (CSR) for Gate. Ideally, specify
Gate's eventual fully-qualified domain name (FQDN) as the Common Name (CN).  

   This will prompt for the pass phrase for `gate.key`.

   ```bash
   # This should be the passphrase used to encrypt the Gate private key
   GATE_KEY_PASSWORD=SOME_PASSWORD_FOR_GATE_KEY

   openssl req \
     -new \
     -key gate.key \
     -out gate.csr \
     -passin pass:${GATE_KEY_PASSWORD}
   ```

1. Use the CA to sign the server's request and create the Gate server certificate
(in `pem` format). If using an external CA, they will do this for you.  

   This will prompt for the pass phrase used to encrypt `ca.key`.

   ```bash
   # This should be the passphrase used to encrypt the self-signed CA private key
   CA_KEY_PASSWORD=SOME_PASSWORD_FOR_CA_KEY

   openssl x509 \
     -req \
     -days 365 \
     -in gate.csr \
     -CA ca.crt \
     -CAkey ca.key \
     -CAcreateserial \
     -out gate.crt \
     -passin pass:${CA_KEY_PASSWORD}
   ```

1. You should end up with these two files:
    * `gate.key`: a `pem`-formatted private key, which will have a pass phrase
    * `gate.crt`: a `pem`-formatted x509 certificate, which matches the private key and was signed by your CA

## Checkpoint

At this point, you should have these files:
    * `deck.key` (with a distinct passphrase)
    * `deck.crt`
    * `gate.key` (with a distinct passphrase)
    * `gate.crt`
    * `ca.crt`

Also, if you are using a self-signed CA, you will also have these files:
    * `ca.key` (with a distinct passphrase)
    * `ca.srl` (automatically generated, used to keep track of certificates generated by a given CA)

We will use all of these below.

## Create JKS

Gate expects all certificates in JKS (Java KeyStore) format, so we have to do some conversion and combination.  Specifically, we will generate a JKS that has these two items in it:

  * An entry containing the **Gate** private key and public certificate
  * An entry containing the **CA** public certificate

1. Convert the `pem` format Gate server certificate into a PKCS12 (`p12`) file,
which is importable into a Java Keystore (JKS).  

   ```bash
   # GATE_KEY_PASSWORD should be the passphrase you used to encrypt `gate.key`
   GATE_KEY_PASSWORD=SOME_PASSWORD_FOR_GATE_KEY

   # GATE_EXPORT_PASSWORD can be a new passphrase that will be used to encrypted `gate.p12`
   GATE_EXPORT_PASSWORD=SOME_PASSWORD_FOR_GATE_P12

   openssl pkcs12 \
     -export \
     -clcerts \
     -in gate.crt \
     -inkey gate.key \
     -out gate.p12 \
     -name gate \
     -passin pass:${GATE_KEY_PASSWORD} \
     -password pass:${GATE_EXPORT_PASSWORD}
   ```

   This creates a p12 keystore file with your certificate imported under the alias "gate".

1. Create a new Java Keystore (JKS) containing your `p12`-formatted Gate server certificate.

   Because Gate assumes that the keystore password and the password for the key
   in the keystore are the same, we must provide both via the command line.

   ```bash
   # GATE_EXPORT_PASSWORD should be the passphrase that was used to encrypted `gate.p12`
   GATE_EXPORT_PASSWORD=SOME_PASSWORD_FOR_GATE_P12

   # JKS_PASSWORD can be a new password that will be used to encrypt `gate.jks`
   JKS_PASSWORD=SOME_JKS_PASSWORD

   keytool -importkeystore \
     -srckeystore gate.p12 \
     -srcstoretype pkcs12 \
     -srcalias gate \
     -destkeystore gate.jks \
     -destalias gate \
     -deststoretype pkcs12 \
     -deststorepass ${JKS_PASSWORD} \
     -destkeypass ${JKS_PASSWORD} \
     -srcstorepass ${GATE_EXPORT_PASSWORD}
   ```

1. Import the CA certificate into the Java Keystore.  


   ```bash
   # JKS_PASSWORD should be the password that was used to encrypt `gate.jks`
   JKS_PASSWORD=SOME_JKS_PASSWORD

   keytool -importcert \
     -keystore gate.jks \
     -alias ca \
     -file ca.crt \
     -storepass ${JKS_PASSWORD} \
     -noprompt
   ```

1. Verify the Java Keystore contains the correct contents.

   ```bash
   # JKS_PASSWORD should be the password that was used to encrypt `gate.jks`
   JKS_PASSWORD=SOME_JKS_PASSWORD

   keytool \
     -list \
     -keystore gate.jks \
     -storepass ${JKS_PASSWORD}
   ```

   It should contain two entries:

   * `gate` as a `PrivateKeyEntry`
   * `ca` as a `trustedCertEntry`

## Back Up Your Spinnaker Configuration

**Operator**

Backup all `SpinnakerService` related files.

**Halyard**

    Before making any changes with Halyard, Armory recommends backing up your current configuration.  You can back up your Halyard configuration with the following command:

```bash
hal backup create
```

    Copy the generated `.tar` file somewhere it will be preserved in the event of a container restart or system reboot (ideally, off to another system).

## Enable Deck SSL

Next, we will configure Spinnaker's Deck service to use the Deck certificate and private key that we've generated.

* **Operator**

    Add the following snippet to the `SpinnakerService` manifest:

    ```yaml
    apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
    kind: SpinnakerService
    metadata:
      name: spinnaker
    spec:
      spinnakerConfig:  
        config:
          security:
            uiSecurity:
              ssl:
                enabled: true
                sslCertificateFile: encrypted:k8s!n:spin-deck-secrets!k:deck.crt
                sslCertificateKeyFile: encrypted:k8s!n:spin-deck-secrets!k:deck.key
                sslCertificatePassphrase: abc # Your passphrase
    ```

    Create a new Kubernetes secret having the above files. Here we assume that Spinnaker is installed in the `spinnaker` namespace, and you are in the folder where `deck.crt` and `deck.key` are located:

    ```bash
    kubectl -n spinnaker create secret generic spin-deck-secrets --from-file=deck.crt --from-file=deck.key
    ```

* **Halyard**

    Copy `deck.crt` and `deck.key` to locations accessible to your Halyard. For example, if Halyard is a Docker container with the `.secret` directory mounted into it, copy `deck.crt` and `deck.key` to `.secret/`.

    Then, run this Halyard configuration:

    *This will prompt for the pass phrase used to encrypt `deck.crt`.*

    ```bash
    SERVER_CERT=   # /path/to/deck.crt
    SERVER_KEY=    # /path/to/deck.key

    hal config security ui ssl edit \
        --ssl-certificate-file ${SERVER_CERT} \
        --ssl-certificate-key-file ${SERVER_KEY} \
        --ssl-certificate-passphrase

    hal config security ui ssl enable
    ```

Depending on how your load balancer is configured (if you're using an Ingress vs. a Service), you may have to change your service and/or ingress configuration. This is discussed below, in **Update Load Balancers and URLs**

## Enable Gate SSL

Next, we will configure Spinnaker's Gate service to use the JKS that we've generated.

**Operator**

   Add the following snippet to the `SpinnakerService` manifest:

   ```yaml
   apiVersion: spinnaker.armory.io/{{ site.data.versions.perator-extended-crd-version }}
   kind: SpinnakerService
   metadata:
     name: spinnaker
   spec:
     spinnakerConfig:  
       config:
         security:
           apiSecurity:
             ssl:
               enabled: true
               keyAlias: gate
               keyStore: encrypted:k8s!n:spin-gate-secrets!k:gate.jks
               keyStoreType: jks
               keyStorePassword: abc # The password to unlock your keystore. Due to a limitation in Tomcat, this must match your key's password in the keystore.
               trustStore: encrypted:k8s!n:spin-gate-secrets!k:gate.jks
               trustStoreType: jks
               trustStorePassword: abc # The password to unlock your truststore.
               clientAuth: WANT # Declare 'WANT' when client auth is wanted but not mandatory, or 'NEED', when client auth is mandatory.
   ```

   Create a new Kubernetes secret having the above files. Here we assume that Spinnaker is installed in the `spinnaker` namespace, and you are in the folder where `gate.jks` is located:

   ```bash
   kubectl -n spinnaker create secret generic spin-gate-secrets --from-file=gate.jks
   ```

**Halyard**

   First, copy `gate.jks` to a location accessible to your Halyard.  For example, if Halyard is a Docker container with the `.secret` directory mounted into it, copy `gate.jks` to `.secret/`.

   Then, run this Halyard configuration:

   *This will prompt twice, once for the keystore password and once for the truststore password, which are the same.*

   ```bash
   KEYSTORE_PATH= # /path/to/gate.jks

   hal config security api ssl edit \
       --key-alias gate \
       --keystore ${KEYSTORE_PATH} \
       --keystore-password \
       --keystore-type jks \
       --truststore ${KEYSTORE_PATH} \
       --truststore-password \
       --truststore-type jks

   hal config security api ssl enable
   ```

## Update Load Balancers and URLs

When you apply the above changes, Gate and Deck will change in the following ways:

* Deck will continue to use port 9000, but it will be an HTTPS port instead of an HTTP port
* Gate will continue to use port 8084, but it will be an HTTPS port instead of an HTTP port

Depending on your load balancer and infrastructure configuration, this will likely necessitate one of the following changes:

* If you have a load balancer (such as an Ingress) in front of your Gate/Deck, you'll likely need to change the way that Ingress communicates with Deck/Gate.
* If you have no load balancer in front of your Gate/Deck and are instead using a basic Kubernetes Service, you'll likely need to change the base URL overrides for Deck and Gate

### Changing Ingress

If you are using an Ingress in front of Deck and Gate, the Ingress is likely configured to communicate via HTTP to your backend services.  You'll need to change this to communicate via HTTPS.

The mechanism to achieve this will depend on what type of Ingress you are using.  Here are two of the most common:

* If you are using an NGINX Ingress Controller, you will need to add these annotations to the `Ingress` resource that is set up for Deck and gate:

  ```
  nginx.ingress.kubernetes.io/backend-protocol: "HTTPS"
  ```

* If you are using the Amazon AWS ALB Ingress Controller, you will need to add these annotations to the `Ingress` resource that is set up for Deck and gate:

  ```
  alb.ingress.kubernetes.io/backend-protocol: "HTTPS"
  alb.ingress.kubernetes.io/healthcheck-protocol: "HTTPS"
  ```

### Changing URL Overrides

If you are instead using a Layer 4 (TCP) load balancer (such as a `Service` configured as a `LoadBalancer` in EKS), or directly exposing your Kubernetes `Service` objects using a `NodePort` configuration, then you'll need to change the base URL overrides.

**Operator**

In the `SpinnakerService` manifest you need to change the `overrideBaseUrl` settings of Deck and Gate in the following way:

```yaml
apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:  
    config:
      security:
        apiSecurity:
          overrideBaseUrl: https://spinnaker.domain.com/api/v1 # URL to access Gate, using HTTPS scheme
        uiSecurity:
          overrideBaseUrl: https://spinnaker.domain.com        # URL to access Deck, using HTTPS scheme
```

Although Spinnaker also supports using a different DNS name, Armory recommends that you use the same DNS but different paths for Deck and Gate. Tasks such as Cross-Origin Resource Sharing (CORS) between your Gate and Deck endpoints and securing Gate and Deck are much easier when both services use the same DNS name.

**Halyard**

Look at your existing Halconfig (`cat .hal/config` or `hal config`), and look for these sections:
* `security.apiSecurity.overrideBaseUrl`
* `security.uiSecurity.overrideBaseUrl`

These may be configured to something like this:

* `https://spinnaker.domain.com` -- URL to access Deck
* `https://spinnaker.domain.com/api/v1` -- URL to access Gate

Although Spinnaker also supports using a different DNS name, Armory recommends that you use the same DNS but different paths for Deck and Gate. Tasks such as Cross-Origin Resource Sharing (CORS) between your Gate and Deck endpoints and securing Gate and Deck are much easier when both services use the same DNS name.

We need to update these to use the https-equivalent URLs.  This can be achieved with these Halyard commands:

```bash
SPINNAKER_FQDN=spinnaker.domain.com
GATE_FQDN=spinnaker.domain.com/api/v1
hal config security ui edit --override-base-url https://${SPINNAKER_FQDN}
hal config security api edit --override-base-url https://${GATE_FQDN}
```

## Apply SSL Changes and Test Changes

Before enabling the API endpoint, we should apply the changes that we've made so far and make sure everything continues to work.

**Operator**

```bash
kubectl -n <spinnaker namespace> apply -f <SpinnakerService manifest>
```

**Halyard**

```bash
hal deploy apply
```

1. Apply your Ingress / Service changes, as indicated abvoe in the **Changing Ingress** section.

2. Verify that you're still able to access Spinnaker.  You may have to switch existing URLs from `http` to `https`.

3. Verify that you can still see Spinnaker applications and pipelines as before.

4. If you have any issues, perform various troubleshooting steps (such as those related to HTTPS in our [KB](https://kb.armory.io/category/troubleshooting/)), or restore your prior backup:

**Operator**

Apply the backed up manifests files with `kubectl -n <spinnaker namespace> apply -f ...`

**Halyard**

```bash
hal backup restore --backup-path <backup-name>.tar
```

## Gate-local

Once you've verified that your existing Gate and Deck endpoints continue to work as expected, we can enable the API endpoint.  This requires the following steps:

1. Enable x509 Authentication

   **Operator**

   ```yaml
   apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
   kind: SpinnakerService
   metadata:
     name: spinnaker
   spec:
     spinnakerConfig:  
       config:
         security:
           authn:
             x509:
               enabled: true
   ```

   **Halyard**

   ```bash
   hal config security authn x509 enable
   ```

2. Configure Gate to use a second port for the x509 API port.  

   **Operator**

   ```yaml
   apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
   kind: SpinnakerService
   metadata:
     name: spinnaker
   spec:
     spinnakerConfig:  
       profiles:
         gate:
           default:
             apiPort: 8085
   ```

   **Halyard**

   This must currently be done via a local profile override.  Create and/or update the file `.hal/default/profiles/gate-local.yml` with these contents:

   ```yml
   default:
     apiPort: 8085
   ```

3. Apply your changes

   **Operator**

   ```bash
   kubectl -n <spinnaker namespace> apply -f <SpinnakerService manifest>
   ```

   **Halyard**

   ```bash
   hal deploy apply
   ```

Gate will now have a second API port set up listening on port 8085, which will expect an x509 client certificate from all clients trying to communicate with it.  We have to expose this port externally.

## Update Load Balancers and URLs

You must expose port 8085 on your Gate containers externally, and you should **not** terminate TLS in front of them.  Depending on how your Kubernetes cluster lives, you may be able to use a `LoadBalancer` or `NodePort` Service.  Alternatively, if your Ingress Controller is configured to support TLS pass-through, you can use that.

**Operator**

   No action needed; Operator automatically exposes Gate's API port.

**Halyard**

We detail two options here.

If your Kubernetes cluster is configured to set up a TCP load balancer for `LoadBalancer` Services:

```bash
# Replace this with the namespace where Spinnaker is installed
NAMESPACE=<spinnaker-namespace>

tee gate-api-service.yml <<-'EOF'
apiVersion: v1
kind: Service
metadata:
  labels:
    app: spin
    cluster: spin-gate
  name: spin-gate-api
  namespace: NAMESPACE
spec:
  ports:
  - port: 8085
    protocol: TCP
    targetPort: 8085
  selector:
    app: spin
    cluster: spin-gate
  sessionAffinity: None
  type: LoadBalancer
EOF

sed -i "s|NAMESPACE|${NAMESPACE}|g" gate-api-service.yml

kubectl apply -f gate-api-service.yml
```

Otherwise, if you're going to use a NodePort:

```bash
# Replace this with the namespace where Spinnaker is installed
NAMESPACE=spinnaker

tee gate-api-service.yml <<-'EOF'
apiVersion: v1
kind: Service
metadata:
  labels:
    app: spin
    cluster: spin-gate
  name: spin-gate-api
  namespace: NAMESPACE
spec:
  ports:
  - port: 8085
    protocol: TCP
    targetPort: 8085
  selector:
    app: spin
    cluster: spin-gate
  sessionAffinity: None
  type: NodePort
EOF

sed -i "s|NAMESPACE|${NAMESPACE}|g" gate-api-service.yml

kubectl apply -f gate-api-service.yml
```

This should expose the endpoint.  For example, with the LoadBalancer configuration in EKS, you will get an ELB endpoint (get this with `kubectl -n NAMESPACE get svc -owide`).  With the NodePort configuration, you can use any instance in your cluster with the generated NodePort port.

You can verify that the client certificate is set up properly by `curl`ing the endpoint with the `-v` and `-k` (verbose, no validation) flags. You should get an alert for bad certificate, since the endpoint is expecting a client certificate and you are not providing one:

```bash
curl https://<endpoint>:8085 -v -k
```

For example:

```bash
curl https://abcd-123456789.us-west-2.elb.amazonaws.com:8085 -v -k
* Rebuilt URL to: https://abcd-123456789.us-west-2.elb.amazonaws.com:8085/
*   Trying 35.0.0.1...
* TCP_NODELAY set
* Connected to abcd-123456789.us-west-2.elb.amazonaws.com (35.0.0.1) port 8085 (#0)
* ALPN, offering h2
* ALPN, offering http/1.1
* Cipher selection: ALL:!EXPORT:!EXPORT40:!EXPORT56:!aNULL:!LOW:!RC4:@STRENGTH
* successfully set certificate verify locations:
*   CAfile: /etc/ssl/cert.pem
  CApath: none
* TLSv1.2 (OUT), TLS handshake, Client hello (1):
* TLSv1.2 (IN), TLS handshake, Server hello (2):
* TLSv1.2 (IN), TLS handshake, Certificate (11):
* TLSv1.2 (IN), TLS handshake, Server key exchange (12):
* TLSv1.2 (IN), TLS handshake, Request CERT (13):
* TLSv1.2 (IN), TLS handshake, Server finished (14):
* TLSv1.2 (OUT), TLS handshake, Certificate (11):
* TLSv1.2 (OUT), TLS handshake, Client key exchange (16):
* TLSv1.2 (OUT), TLS change cipher, Client hello (1):
* TLSv1.2 (OUT), TLS handshake, Finished (20):
* TLSv1.2 (IN), TLS alert, Server hello (2):
* error:1401E412:SSL routines:CONNECT_CR_FINISHED:sslv3 alert bad certificate
* stopped the pause stream!
* Closing connection 0
curl: (35) error:1401E412:SSL routines:CONNECT_CR_FINISHED:sslv3 alert bad certificate
```

## Signing Client Certificates using the Self-Signed CA
If you created a self-signed CA, you can use that CA to sign certificates for your API clients to use.

1. Create the client key. Keep this file safe!

   ```bash
   # This will be the passphrase used to encrypt the client private key
   CLIENT_PASSWORD=SOME_CLIENT_PASSPHRASE

   openssl genrsa \
     -des3 \
     -out client.key \
     -passout pass:${CLIENT_PASSWORD} \
     4096
   ```

1. Generate a certificate signing request for the client. Ensure the `Common Name` is set to a non-empty value.

   ```bash
   # This should be the same passphrase used to encrypt the client private key
   CLIENT_PASSWORD=SOME_CLIENT_PASSPHRASE

   openssl req \
     -new \
     -key client.key \
     -out client.csr \
     -passin pass:${CLIENT_PASSWORD}
   ```

1. Use the CA to sign the client's request.

   ```bash
   # This should be the passphrase used to encrypt the self-signed CA private key
   CA_KEY_PASSWORD=SOME_PASSWORD_FOR_CA_KEY

   openssl x509 \
     -req \
     -days 365 \
     -in client.csr \
     -CA ca.crt \
     -CAkey ca.key \
     -CAcreateserial \
     -out client.crt \
     -passin pass:${CA_KEY_PASSWORD}
   ```

1. You should end up with these two files:
    * `client.key`: a `pem`-formatted private key, which will have a pass phrase
    * `client.crt`: a `pem`-formatted x509 certificate, which matches the private key and was signed by your CA

## Connecting to the API with the client certificate

Now that you have a client certificate (with key), you can use it to connect to the Spinnaker API.  For example, to get a list of Spinnaker applications from Gate:

```bash
curl https://abcd-123456789.us-west-2.elb.amazonaws.com:8085//applications \
  -k \
  --cert client.crt:SOME_CLIENT_PASSPHRASE\
  --key client.key
[{"accounts":"spinnaker","name":"ingress"},{"accounts":"spinnaker","name":"ldap"},{"accounts":"spinnaker","name":"spin"}]
```

## Using Authorization with Spinnaker, and other Configurations

If your Spinnaker is configured with Authorization (based on groups), it can be helpful to encode groups into the client Certificate that will allow the API client access to things that are restricted to specific groups.  This is achieved by doing these two things:

* Configuring Gate to look at a specific OID in the client certificate for groups
* Adding the groups at that specific OID in the client certificate

### Configuring Gate to use a specific OID for groups

The OID `1.2.840.10070.8.1` is used to identify roles for a given user, so it is perfect for identifying the groups that a given client certificate will have access to.

You can configure Gate to look for a list of endline-delimited groups in the `1.2.840.10070.8.1` OID:

**Operator**

```yaml
apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:  
    config:
      security:
        authn:
          x509:
            roleOid: 1.2.840.10070.8.1
```

```bash
kubectl -n <spinnaker namespace> apply -f <SpinnakerService manifest>
```

**Halyard**

```bash
hal config security authn x509 edit --role-oid 1.2.840.10070.8.1

hal deploy apply
```

### Adding groups and signing certificates with the OID extensions

In order to allow a client certificate access to specific groups, when you're generating the CSR and the certificate, you can specify custom fields in OpenSSL by providing them via an OpenSSL configuration file.  For example, to add these two groups:

* spinnaker-example0
* spinnaker-example1

To a client certificate, construct a string with the groups delimited by `\n`, like this:
`spinnaker-example0\nspinnaker-example1`.

Then, add that to a configuration file that looks like this (replacing `GROUP_STRING` with your group string)

 ```bash
 # group.conf
 [ req ]
 distinguished_name	= req_distinguished_name
 attributes		= req_attributes
 req_extensions = v3_req

 [ req_distinguished_name ]
 countryName			= Country Name (2 letter code)
 countryName_min			= 2
 countryName_max			= 2
 stateOrProvinceName		= State or Province Name (full name)
 localityName			= Locality Name (eg, city)
 0.organizationName		= Organization Name (eg, company)
 organizationalUnitName		= Organizational Unit Name (eg, section)
 commonName			= Common Name (eg, fully qualified host name)
 commonName_max			= 64
 emailAddress			= Email Address
 emailAddress_max		= 64

 [ req_attributes ]
 challengePassword		= A challenge password
 challengePassword_min		= 4
 challengePassword_max		= 20

 [ v3_req ]
 keyUsage = nonRepudiation, digitalSignature, keyEncipherment
 1.2.840.10070.8.1 = ASN1:UTF8String:GROUP_STRING
 ```

Here's an example of how to use this:

1. Create the configuration file

   ```bash
   tee group.conf <<-'EOF'
   [ req ]
   distinguished_name	= req_distinguished_name
   attributes		= req_attributes
   req_extensions = v3_req

   [ req_distinguished_name ]
   countryName			= Country Name (2 letter code)
   countryName_min			= 2
   countryName_max			= 2
   stateOrProvinceName		= State or Province Name (full name)
   localityName			= Locality Name (eg, city)
   0.organizationName		= Organization Name (eg, company)
   organizationalUnitName		= Organizational Unit Name (eg, section)
   commonName			= Common Name (eg, fully qualified host name)
   commonName_max			= 64
   emailAddress			= Email Address
   emailAddress_max		= 64

   [ req_attributes ]
   challengePassword		= A challenge password
   challengePassword_min		= 4
   challengePassword_max		= 20

   [ v3_req ]
   keyUsage = nonRepudiation, digitalSignature, keyEncipherment
   1.2.840.10070.8.1 = ASN1:UTF8String:spinnaker-example0\nspinnaker-example1
   EOF
   ```

1. Create the client key. Keep this file safe!

   ```bash
   # This will be the passphrase used to encrypt the client private key
   CLIENT_PASSWORD=SOME_CLIENT_PASSPHRASE

   openssl genrsa \
     -des3 \
     -out client.key \
     -passout pass:${CLIENT_PASSWORD} \
     4096
   ```

1. Specify the configuration file when you generate the CSR with the `-config group.conf`

   ```bash
   # This should be the same passphrase used to encrypt the client private key
   CLIENT_PASSWORD=SOME_CLIENT_PASSPHRASE

   openssl req \
     -new \
     -key client.key \
     -out client.csr \
     -passin pass:${CLIENT_PASSWORD} \
     -config group.conf
   ```

1. Specify the configuration file when you use the CA to sign the certificate with the `-extensions v3_req` and `-extfile group.conf` flags:

   ```bash
   # This should be the passphrase used to encrypt the self-signed CA private key
   CA_KEY_PASSWORD=SOME_PASSWORD_FOR_CA_KEY

   openssl x509 \
     -req \
     -days 365 \
     -in client.csr \
     -CA ca.crt \
     -CAkey ca.key \
     -CAcreateserial \
     -out client.crt \
     -passin pass:${CA_KEY_PASSWORD} \
     -extensions v3_req \
     -extfile group.conf
   ```

Now, when you use the generated certificate and key, your API client will be able to access Spinnaker items that are restricted to those groups.

### Configuring Spinnaker to parse out usernames from client certificate(s)
When looking at audit logs, it can be helpful to differentiate different API clients. One way to achieve this is to parse out a "username" from the client for each API client certificate.  This is achieved by configuring Spinnaker to use regex to pull out a subject from the certificate. This is set up with the `subject principal regex` field, which is configured like this:

**Operator**

```yaml
apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:  
    config:
      security:
        authn:
          x509:
            subjectPrincipalRegex: DESIRED_REGEX # For example, if you want to use the "Email Address" field from the certificate, the regex would be: EMAILADDRESS=(.*?)(?:,|$)
```

```bash
kubectl -n <spinnaker namespace> apply -f <SpinnakerService manifest>
```

**Halyard**

```bash
hal config security authn x509 edit \
    --subject-principal-regex "DESIRED_REGEX"

hal deploy apply
```

For example, if you want to use the "Email Address" field from the certificate,

```bash
hal config security authn x509 edit \
    --subject-principal-regex "EMAILADDRESS=(.*?)(?:,|$)"

hal deploy apply
```
