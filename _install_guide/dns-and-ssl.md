---
layout: post
title: DNS and SSL
order: 100
# This page should not be redirected to a new page, as it is significantly different from the Kubernetes DNS-SSL page.
redirect_from:
  - /install_guide/dns_and_ssl/
  - /install-guide/dns_and_ssl/
---

{% include components/legacy_documentation.html %}

# What To Expect
{:.no_toc}
This guide should include:
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Create a DNS Entry for your Load Balancer

Add a DNS Entry to your DNS management system.  You should only need to add a DNS entry for the user-facing ELB which is what you use to currently access Spinnaker.   It typically has a name such as the one below

```
armoryspinnaker-prod-external-123456789.us-west-1.elb.amazonaws.com
```

Add a CNAME entry for the given ELB to create a simple name you will use to access your instance of Spinnaker, e.g. `spinnaker.armory.io`.

## Update Spinnaker Configuration

Update the values for `DECK_HOST` and `API_HOST` in your environment file in the `/opt/spinnaker/env` directory.

```
DECK_HOST=http://spinnaker.mydomain.com
API_HOST=http://spinnaker.mydomain.com:8084
```

## SSL Termination at the ELB

For SSL, it can be beneficial to terminate SSL at the Elastic Load Balancer (ELB) whenever feasible. Amazon has the [Key Management Service (KMS)](https://aws.amazon.com/kms/) for this purpose. If you need to handle certificate management at the application level, you might want to check out [Netflix's Lemur](http://techblog.netflix.com/2015/09/introducing-lemur.html) project.

> Note: Even if you terminate SSL at the ELB, you must still give Spinnaker a certificate due to workflow bugs between Spring and Tomcat.  This certificate is only used between the ELB and Spinnaker.

## Enabling HTTPS/SSL in Spinnaker

In order to enable SSL we'll need to provide Gate (and thus Java) with certificates in a java keystore (JKS) _and_ terminate at the ELB.  This will ensure secure communication between your browser/clients and Spinnaker Deck & Gate

> Note: Even if you terminate SSL at the ELB, you must still give Spinnaker a certificate due to workflow bugs between Spring and Tomcat.  This certificate is only used between the ELB and Spinnaker.

For the following example we're going to create self-signed certificates although for production use you will want to have an official certificate authority (CA) sign your certificate.

You can **either** import your own cert **or** create a self signed cert:

 - Importing **your own Certificate**.
```
export YOUR_KEY_PASSWORD=""
export YOUR_KEYSTORE_PASSWORD=""
keytool -importkeystore -srckeystore server.p12 -srcstoretype pkcs12 -srcalias spinnaker -srcstorepass ${YOUR_KEY_PASSWORD} -destkeystore keystore.jks -deststoretype jks -destalias server -deststorepass ${YOUR_KEY_PASSWORD} -destkeypass ${YOUR_KEYSTORE_PASSWORD}
```

- Creating a **self-signed CA (EXPIRES IN 360 DAYS)** with java keystore.
```
apt-get install -y openjdk-7-jre-headless
export YOUR_KEYSTORE_PASSWORD="someRandomPa33W0rdForKeystoreForELBtoGateCommunication"
echo -e "\n\n\n\n\n\ny\n" | keytool -genkey -keyalg RSA -alias server -keystore keystore.jks -storepass ${YOUR_KEYSTORE_PASSWORD} -validity 360 -keysize 2048
mv keystore.jks /opt/spinnaker/config/
```

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

![elb](/images/Image 2017-12-18 at 10.36.37 AM.png)


Now you can restart Armory Spinnaker by doing
```
service armory-spinnaker restart
```
