---
layout: post
title: Spinnaker Secrets
order: 150
---
Storing Spinnaker configs in a git repository is a great solution for maintaining versions of your configurations, but storing secrets in plain text is a bad security practice. If you're using the Operator to deploy Spinnaker, separating your secrets from your configs through end-to-end secrets management is already supported. If you're using Halyard, this is supported as of `halyard-armory:1.4.1`. All you need to do is replace secrets in the configuration files with the syntax described here, and Spinnaker will decrypt them as needed.

{:toc}

## Overview
We can now store secrets (tokens, passwords, sensitive files) separately from the Spinnaker configurations. We'll provide references to these secrets to services that need them.

- Spinnaker services that support decryption will decrypt these secrets upon startup.
- Operator (or Halyard) can decrypt these secrets when it needs to use them (e.g. when validating resources).
- Operator (or Halyard) can send secret references to the services that support decryption or send decrypted secrets if the service does not support it.


## Using Secrets

### Secret Format

When referencing string secrets (passwords, tokens) in configs, use the following general format:

```
encrypted:<secret engine>!<key1>:<value1>!<key2>:<value2>!...
```

When referencing files, the same parameters are used but with the `encryptedFile` prefix:

```
encryptedFile:<secret engine>!<key1>:<value1>!<key2>:<value2>!...
```


The keys and values making up the string vary with each secret engine. Refer to the specific documentation for each engine for more information.

### In main configuration

This applies to section `spec.spinnakerConfig.config` of the `SpinnakerService` manifest if using the Operator, or `~/.hal/config` if using Halyard.

Operator and Halyard can understand the secrets you provide. If the service you are deploying is able to decrypt secrets, Operator (or Halyard) will pass the reference directly. Otherwise it will decrypt the configuration before sending it.

For instance, after replacing the GitHub token in our main config with the encrypted syntax:

```yaml
...
  github:
    enabled: true
    accounts:
    - name: github
      token: encrypted:s3!r:us-west-2!b:mybucket!f:spinnaker-secrets.yml!k:github.token
...
```


You find the following in `/opt/spinnaker/config/clouddriver.yml` inside clouddriver pod:

```yaml
...
  github:
    enabled: true
    accounts:
    - name: github
      token: encrypted:s3!r:us-west-2!b:mybucket!f:spinnaker-secrets.yml!k:github.token
...
```

And for an older release of Clouddriver that does not support decryption:

```yaml
...
  github:
    enabled: true
    accounts:
    - name: github
      token: <TOKEN>
...
```

### In other configuration

You can also provide secret references directly in `SpinnakerService` manifest under section `spec.spinnakerConfig.profiles` if using the Operator, or in `*-local.yml` profile files if using Halyard, as well as directly in Spinnaker services.


### Secret Engines Supported

* [Encrypted S3 buckets](../secrets-s3/) (Open Source Spinnaker)
* [Google Storage (GCS)](../secrets-gcs/) (Open Source Spinnaker)
* [Kubernetes Secrets](../secrets-kubernetes/) (Open Source Spinnaker, only available if using the Operator)
* [Hashicorp Vault](../secrets-vault/) (Armory Spinnaker)
* Is there a secret engine you'd like us to support? Submit a feature request [here](http://go.armory.io/support)!
