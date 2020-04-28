---
layout: post
title: Secrets with Vault
order: 154
---

{:toc}


This document describes how to set up Spinnaker secrets in Hashicorp's Vault. In this example, we'll be using the default KV secret engine called `secret` and will be storing GitHub credentials, a kubeconfig file and a Java keystore for SAML SSO.

If you are using Halyard to maintain your Spinnaker deployment, verify that you are using Armory Halyard version 1.5.1 or later.


## Authorization

We currently support two methods of authentication with Vault servers.

### 1. Kubernetes service account (recommended)

You'll need to configure Vault to authenticate with Kubernetes per our [Vault Configuration Guide](/spinnaker-install-admin-guides/vault-configuration/) or [Hashicorp's documentation](https://www.vaultproject.io/docs/auth/kubernetes.html#configuration).

Note: If multiple clusters need to access the same Vault server, you'll need to use the [-path flag](https://www.vaultproject.io/docs/commands/auth/enable.html#usage) and give each cluster a different path name. This becomes `<cluster auth path>` in the example below. If using just one cluster, you can use the default `vault auth enable kubernetes` command, in which case your path will be `kubernetes`.

After configuring authentication on the Vault side, use the following configuration to enable Vault secrets in Spinnaker:

**Operator**

Add the following snippet to the `SpinnakerService` manifest:

```yaml
apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:  
    config:
      armory:
        secrets:
          vault:
            enabled: true
            authMethod: KUBERNETES                      # Method used to authenticate with the Vault endpoint. Must be either KUBERNETES for Kubernetes service account auth or TOKEN for Vault token auth. The TOKEN method will require a VAULT_TOKEN environment variable set for Operator and the services.  
            url: <Vault server URL>:<port, if required> # URL of the Vault endpoint from Spinnaker services.
            role: <k8s role with access to Vault>       # (Applies to KUBERNETES authentication method) Name of the role against which the login is being attempted.
              # path: <k8s cluster path>                  # (Optional; default: kubernetes) Applies to KUBERNETES authentication method) Path of the kubernetes authentication backend mount. Default is "kubernetes"
```

**Halyard**

```
hal armory secrets vault enable
hal armory secrets vault edit \
    --auth-method KUBERNETES \
    --url <Vault server URL>:<port, if required> \
    --role <k8s role with access to Vault> \
    --path <k8s cluster path> (*optional*, default is 'kubernetes')
```

### 2. Token authentication

This method is not recommended, but it is supported if you choose to use it. We recommend this for testing and development purposes only. For token authentication, you need to have a `VAULT_TOKEN` environment variable set in the Halyard container of the Operator pod (or in the Halyard machine if using plain Halyard) as well as each of the services.

Use the following configuration to enable Vault secrets using token auth:

**Operator**

Add the following snippet to the `SpinnakerService` manifest:

```yaml
apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:  
    config:
      armory:
        secrets:
          vault:
            enabled: true
            authMethod: TOKEN                           # Method used to authenticate with the Vault endpoint. Must be either KUBERNETES for Kubernetes service account auth or TOKEN for Vault token auth. The TOKEN method will require a VAULT_TOKEN environment variable set for Operator and the services.  
            url: <Vault server URL>:<port, if required> # URL of the Vault endpoint from Spinnaker services.
```

**Halyard**

```
hal armory secrets vault enable
hal armory secrets vault edit \
    --auth-method TOKEN \
    --url <Vault server URL>:<port, if required>
```

## Configuring the Operator to use Vault secrets

If you are using the Spinnaker Operator, set up a custom Halyard configuration per [this section](https://docs.armory.io/spinnaker/operator/#custom-halyard-configuration) with this content:

```yaml
secrets:
  vault:
    enabled: true
    url: <Vault server URL>
    authMethod: KUBERNETES
    role: <k8s role>
    path: <k8s cluster path>
```

Once you've mounted your `ConfigMap` to the `spinnaker-operator` deployment, it will restart the Halyard container with your Vault config.

## Configuring Halyard to use Vault secrets

Halyard will need access to the Vault server in order to decrypt secrets for validation and deployment. While the Spinnaker services are configured through `~/.hal/config`, the Halyard daemon has its own configuration file found at `/opt/spinnaker/config/halyard.yml`. The contents of your file may look different than this example, but just make sure to add the secrets block somewhere at the root level.

### Halyard Locally or in Docker
If you're running Halyard locally, you can use Token auth method. Set your `VAULT_TOKEN` environment variable and add the secrets block to `halyard.yml` like so:

```
halyard:
  halconfig:
    ...

spinnaker:
  artifacts:
    ...

secrets:
  vault:
    enabled: true
    url: <Vault server URL>
    authMethod: TOKEN
```
Then, restart the daemon if this is the first time you are configuring the Token auth method:
```
hal shutdown
```
Your next hal command automatically starts the daemon if you're running Halyard locally. If it's running within a Docker container, mount the volume containing the updated `halyard.yml` and restart the container.

### Halyard in Kubernetes
Or if you're running Halyard in Kubernetes, you can have Halyard use Kubernetes auth:
```
halyard:
  halconfig:
    ...

spinnaker:
  artifacts:
    ...

secrets:
  vault:
    enabled: true
    url: <Vault server URL>
    authMethod: KUBERNETES
    role: <k8s role>
    path: <k8s cluster path>
```
Restart the pod so that Halyard restarts with your new config.

## Storing secrets
To store a file, simply prepend the file path with `@`. It accepts relative paths but cannot resolve `~`:

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

Now that secrets are safely stored in Vault, you'll reference them in config files with the general syntax below. The format for referencing string values and files is the same, with the exception of the additional `b:true` parameter for a base64 encoded file. The specific parameters, e.g. `e:<engine>`, `k:<key>`, etc, can be in any order. Only `b:true` is optional.

```
encrypted:vault!e:<secret engine>!p:<path to secret>!k:<key>!b:<is base64 encoded?>
```


For example, to reference the GitHub password from above:
```
encrypted:vault!e:secret!p:spinnaker/github!k:password
```

---
**NOTE:** That we created the secrets using the path `secret/spinnaker/github` but we reference it as `spinnaker/github`

---

And the same for referencing a file:
```
encrypted:vault!e:secret!p:spinnaker/kubernetes!k:config
```

---
**NOTE:** The `p` param is used (but `n` is still supported) starting in Armory Halyard version 1.6.4 and Armory Spinnaker version 2.15.0. Previous versions use the now deprecated `n` param for the path.

---

### Binary files

Important! Spinnaker needs to base64 decode binary files on the way out of Vault, so make sure to add the `b:true` to the encrypted syntax. For example, to reference the Java keystore:
```
encrypted:vault!e:secret!n:spinnaker/saml!k:base64keystore!b:true
```


## Supported Versions

Vault secrets are supported end-to-end in Armory Spinnaker 2.4.0 and with partial service support in 2.3.7.
