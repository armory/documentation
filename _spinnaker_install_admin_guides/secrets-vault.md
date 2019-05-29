---
layout: post
title: Secrets with Vault
order: 152
---

{:toc}


This document describes how to set up Spinnaker secrets in Hashicorp's Vault. In this example, we'll be using the default KV secret engine called `secret` and will be storing GitHub credentials, a kubeconfig file and a Java keystore for SAML SSO.

## Authorization

We currently support two methods of authentication with Vault servers.

### 1. Kubernetes service account (recommended)

You'll need to configure Vault to authenticate with Kubernetes per our [Vault Configuration Guide](/spinnaker-install-admin-guides/vault-configuration/) or [Hashicorp's documentation](https://www.vaultproject.io/docs/auth/kubernetes.html#configuration).

Note: If multiple clusters need to access the same Vault server, you'll need to use the [-path flag](https://www.vaultproject.io/docs/commands/auth/enable.html#usage) and give each cluster a different path name. This becomes `<cluster auth path>` in the example below. If using just one cluster, you can use the default `vault auth enable kubernetes` command, in which case your path will be `kubernetes`.

```yaml
secrets:
  vault:
    enabled: true
    url: <Vault server URL>
    authMethod: KUBERNETES
    role: <k8s role with access to Vault>
    path: <cluster auth path>
```

### 2. Token authentication

This method is not recommended but it is supported if you choose. We recommend this for testing and development purposes only. For token authentication, you'll need to have a `VAULT_TOKEN` environment variable set for halyard and each of the services.

```yaml
secrets:
  vault:
    enabled: true
    url: <Vault server URL>
    authMethod: TOKEN
```

## Configuring Halyard to use Vault secrets
Halyard will need access to the Vault server in order to decrypt secrets for validation and deployment. While the Spinnaker services are configured through `~/.hal/config`, the Halyard daemon has its own configuration file found at `/opt/spinnaker/config/halyard.yml`. You'll need to add the same config block to this file as well:

```yaml
secrets:
  vault:
    enabled: true
    url: <Vault server URL>
    authMethod: KUBERNETES
    role: <k8s role>
    path: <k8s cluster path>
```
Then restart the daemon (you'll only need to do this the first time):
```
hal shutdown
```
Your next hal command will automatically bring the daemon back up if you're running Halyard locally. If it's running within a docker container, you'll need to mount the volume containing the updated `halyard.yml` and restart the container.


## Storing secrets
To store a file, simply prepend the file path with `@`. It will accept relative paths but cannot resolve `~`: 

```
vault kv put secret/spinnaker/kubernetes config=@path/to/kube/config
```
The command above stores a single key-value pair at the `secret/spinnaker/kubernetes` path. **Any updates to that path will replace the existing values even if using a different key!** In order to store multiple secrets at the same path, it must be done in a single command, like so:
```
vault kv put secret/spinnaker/github password=<password> token=<token>
```
Otherwise, just store different secrets at different paths, like we're doing in these examples.

Make sure to base64 encode any binary files:
```
base64 -i saml.jks -o saml.b64
vault kv put secret/spinnaker/saml base64keystore=@saml.b64
```


## Referencing secrets

Now that secrets are safely stored in Vault, you'll reference them in config files with the general syntax below. The format for referencing string values and files is the same, with the exception of the additional `b:true` parameter for a base64 encoded file.

```
encrypted:vault!e:<secret engine>!n:<namespace>!k:<key>!b:<is base64 encoded?>
```

> Note: The specific parameters, e.g. `e:<engine>`, `k:<key>`, etc, can be in any order. Only `b:true` is optional.


For example, to reference the GitHub password:
```
encrypted:vault!e:secret!n:spinnaker/github!k:password
```

And the same for referencing a file:
```
encrypted:vault!e:secret!n:spinnaker/kubernetes!k:config
```

### Binary files

Important! Spinnaker needs to base64 decode binary files on the way out of Vault, so make sure to add the `b:true` to the encrypted syntax. For example, to reference the Java keystore:
```
encrypted:vault!e:secret!n:spinnaker/saml!k:base64keystore!b:true
```


## Supported Versions

Vault secrets are supported end-to-end in Armory Spinnaker 2.4.0 and with partial service support in 2.3.7.

