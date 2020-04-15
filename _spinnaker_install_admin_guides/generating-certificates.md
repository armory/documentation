---
layout: post
title: Generating Certificates
order: 46
---

# What To Expect
{:.no_toc}
This guide includes helpful commands to get started with self-signed certificates:
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Prerequisites

You need a recent version of OpenSSL.


## Generating self-signed certificate authority

Generate a key for our certificate authority:

```
openssl genrsa -aes256 -passout pass:TRUSTSTORE_PASS -out ca.key 2048 
```

Replace `TRUSTSTORE_PASS` with your own CA password.

**Important:** Keep `ca.key` secure and do not distribute it. 

Next, generate the certificate of the CA:

```
openssl req -x509 -new -nodes -key ca.key -sha256 -days 3650 -out ca.pem -passin pass:TRUSTSTORE_PASS -subj /C=US/ST=California/O=Acme Corp/OU=Devops/CN=mydomain.com"
```

Replace the values of the `subj` parameter with your own. Only the `CN` part is required and doesn't need to match a real domain.

## Generating a PKCS12 truststore (Java)

Import the `ca.pem` file you generated into a Java truststore:

```
keytool -importcert -storetype PKCS12 -keystore services/ca.p12 -storepass TRUSTSTORE_PASS -alias ca -file ca.pem -noprompt
```

## Generating a keystore for a Java server

The `CN` attribute must match the hostname of the service. It will generally be `spin-[service].[namespace]` or `spin-[service]`, for example `spin-clouddriver.spinnaker`.

Generate the keystore with the following commands:

```
openssl genrsa -aes256 -passout pass:KEY_PASSWORD -out svc.key 2048
openssl req -new -key svc.key -out svc.csr -subj /C=US/CN=spin-svc.spinnaker -passin pass:KEY_PASSWORD
openssl x509 -req -in svc.csr -CA ca.pem -CAkey ca.key -CAcreateserial -out svc.crt -days 3649 -sha256 -passin pass:TRUSTSTORE_PASS
openssl pkcs12 -export -out svc.p12 -inkey svc.key -in svc.crt -passout pass:KEY_PASSWORD -passin pass:KEY_PASSWORD
```

### Alternate names

If you want the Spinnaker service to support alternate names, replace the `openssl pkcs12` command in the previous section with:

```bash
openssl x509 -req -sha256 -in svc.csr -CA ca.pem -CAkey ca.key -CAcreateserial -out svc.crt -days 3650 -extfile svc-cert.ext -passin pass:TRUSTSTORE_PASS
```

The `svc-cert.ext` referenced in the command should contain the following (example for Clouddriver):
```
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = spin-clouddriver.spinnaker
DNS.2 = spin-clouddriver
```

**Note**: If you are setting up mTLS, you can use the same command (or the same file) for client-side certificates.


## Generating keys and certificates (Golang)

```
openssl genrsa -aes256 -passout pass:KEY_PASSWORD -out svc.key 2048
openssl req -new -key svc.key -out svc.csr -subj /C=US/CN=spin-svc.spinnaker -passin pass:KEY_PASSWORD
openssl x509 -req -in svc.csr -CA ca.pem -CAkey ca.key -CAcreateserial -out svc.crt -days 3650 -sha256 -passin pass:TRUSTSTORE_PASS
```


## Putting it together (TLS)

The following script generates these files in the `services` directory:
- Self-signed CA (`ca.pem`) and its PKCS12 truststore (`ca.p12`)
- Keystore files for each Java service (`clouddriver.p12`, ...)
- Certificate and key files for each Golang services (`terraformer.crt` and `terraformer.key`, ...)
- a `tls-passwords` file containing all the passwords. You can store as-is in a bucket.


```
#!/bin/bash -e

# You can change it to a different method
newPassword() {
  echo $(openssl rand -base64 32)
}

# Namespace where you're installing Spinnaker. Used for the hostname.
NAMESPACE="spinnaker"

CA_PASSWORD="password"
TRUSTSTORE_PASSWORD=$(newPassword)
JAVA_SVCS=("clouddriver" "orca" "echo" "fiat" "igor" "rosco" "front50" "kayenta" "gate")
# JAVA_SVCS=("clouddriver-rw" "clouddriver-caching" "clouddriver-ro" "clouddriver-ro-deck" "orca" "echo-scheduler" "echo-worker" "fiat" "igor" "rosco" "front50" "kayenta" "gate")
GOLANG_SVCS=("dinghy" "terraformer")

echo "Cleaning up..."
rm -rf services/*
mkdir -p services/

echo "Generating CA key..."
openssl genrsa -aes256 -passout pass:${CA_PASSWORD} -out services/ca.key 4096 

echo "Generate self signed root certificate"
openssl req -x509 -new -nodes -key services/ca.key -sha256 -days 3650 -out services/ca.pem -passin pass:${CA_PASSWORD} -subj /C=US/CN=Test

echo "Generate trust store as PKCS12"
keytool -importcert -storetype PKCS12 -keystore services/ca.p12 -storepass $TRUSTSTORE_PASSWORD -alias ca -file services/ca.pem -noprompt

echo "truststore: ${TRUSTSTORE_PASSWORD}" > services/tls-passwords

for i in ${!JAVA_SVCS[@]};
do
  svc=${JAVA_SVCS[$i]}
  password=$(newPassword)
  echo "Generating $svc key and certificate..."
  openssl genrsa -aes256 -passout pass:${password} -out services/${svc}.key 4096
  openssl req -new -key services/${svc}.key -out services/${svc}.csr -subj /C=US/CN=spin-${svc}.${NAMESPACE} -passin pass:${password}
  cat <<EOF>services/${svc}.ext
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = spin-${svc}.${NAMESPACE}
DNS.2 = spin-${svc}.${NAMESPACE}.svc.cluster.local
EOF
  openssl x509 -req -in services/${svc}.csr -CA services/ca.pem -CAkey services/ca.key -CAcreateserial -out services/${svc}.crt -days 3649 -sha256 -passin pass:${CA_PASSWORD} -extfile services/${svc}.ext
  openssl pkcs12 -export -out services/${svc}.p12 -inkey services/${svc}.key -in services/${svc}.crt -passout pass:${password} -passin pass:${password}
  echo "${svc}: ${password}" >> services/tls-passwords
done


for i in ${!GOLANG_SVCS[@]};
do
  svc=${GOLANG_SVCS[$i]}
  password=$(newPassword)
  echo "Generating $svc key and certificate..."
  openssl genrsa -aes256 -passout pass:${password} -out services/${svc}.key 4096
  cat <<EOF>services/${svc}.ext
authorityKeyIdentifier=keyid,issuer
basicConstraints=CA:FALSE
keyUsage = digitalSignature, nonRepudiation, keyEncipherment, dataEncipherment
subjectAltName = @alt_names

[alt_names]
DNS.1 = spin-${svc}.${NAMESPACE}
DNS.2 = spin-${svc}.${NAMESPACE}.svc.cluster.local
EOF
  openssl req -new -key services/${svc}.key -out services/${svc}.csr -subj /C=US/CN=spin-${svc}.${NAMESPACE} -passin pass:${password}
  openssl x509 -req -in services/${svc}.csr -CA services/ca.pem -CAkey services/ca.key -CAcreateserial \
    -out services/${svc}.crt -days 3650 -sha256 -passin pass:${CA_PASSWORD} -extfile services/${svc}.ext

  echo "${svc}: ${password}" >> services/tls-passwords
done
```
