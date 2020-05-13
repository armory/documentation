---
layout: post
title: Configuring Vault for Kubernetes Auth
order: 155
---

{:toc}

To utilize the Kubernetes auth method for managing your Spinnaker secrets, you need to configure your Vault server. This document describes how to configure Vault for this purpose. It concludes by testing that a pod running in your Kubernetes cluster can authenticate with your Vault server using the Kubernetes auth method.

## Overview

Configuration of Vault for the Kubernetes auth method requires configuring both Vault and Kubernetes. We will begin by configuring Kubernetes and wrap things up by then configuring Vault itself.

## Kubernetes configuration

**1. Create a Service Account.**

**vault-auth-service-account.yml**

```yaml
---
apiVersion: rbac.authorization.k8s.io/v1beta1
kind: ClusterRoleBinding
metadata:
  name: role-tokenreview-binding
  namespace: default
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: system:auth-delegator
subjects:
- kind: ServiceAccount
  name: vault-auth
  namespace: default
```

```
# Create a service account, 'vault-auth'
$ kubectl -n default create serviceaccount vault-auth

# Update the 'vault-auth' service account
$ kubectl -n default apply --filename vault-auth-service-account.yml
```

## Vault Configuration


---
**NOTE: This guide assumes that [Key/Value version 1](https://www.vaultproject.io/api/secret/kv/kv-v1.html) secret engine is enabled at `secret/`.**

---


**2. Create a read-only policy `spinnaker-kv-ro` in Vault**

**spinnaker-kv-ro.hcl**

```
# For K/V v1 secrets engine
path "secret/spinnaker/*" {
    capabilities = ["read", "list"]
}
# For K/V v2 secrets engine
path "secret/data/spinnaker/*" {
    capabilities = ["read", "list"]
}
```

```
$ vault policy write spinnaker-kv-ro spinnaker-kv-ro.hcl
```


**3. Set environment variables required for Vault configuration**

```
# Set VAULT_SA_NAME to the service account you created earlier
$ export VAULT_SA_NAME=$(kubectl -n default get sa vault-auth -o jsonpath="{.secrets[*]['name']}")

# Set SA_JWT_TOKEN value to the service account JWT used to access the TokenReview API
$ export SA_JWT_TOKEN=$(kubectl -n default get secret $VAULT_SA_NAME -o jsonpath="{.data.token}" | base64 --decode; echo)

# Set SA_CA_CRT to the PEM encoded CA cert used to talk to Kubernetes API
$ export SA_CA_CRT=$(kubectl -n default get secret $VAULT_SA_NAME -o jsonpath="{.data['ca\.crt']}" | base64 --decode; echo)

# Look in your cloud provider console for this value
$ export K8S_HOST=<your_API_server_endpoint>
```

**4. Configure Vault's Kubernetes auth method**


---
**NOTE on TTL and Token Renewal**

The Kubernetes Vault Auth Secrets Engine does not currently support token renewal. As such the `spinnaker` role created below provides a `TTL` of `two months`.

**Note** by default Vault has a max_ttl parameter set to `768h0m0s` that's 32 days, if you want to set the `TTL` to a higher value, you need to modify this parameter.


**Important:** Spinnaker must be redeployed sometime during the defined `TTL` window -- Armory recommends this be done by updating to a new version of Spinnaker and running `kubectl -n <spinnaker namespace> apply -f <SpinnakerService manifest>` if using Operator, or `hal deploy apply` if using Halyard.

---


```
# Enable the Kubernetes auth method at the default path ("kubernetes")
$ vault auth enable kubernetes

# Tell Vault how to communicate with the Kubernetes cluster
$ vault write auth/kubernetes/config \
        token_reviewer_jwt="$SA_JWT_TOKEN" \
        kubernetes_host="https://$K8S_HOST" \
        kubernetes_ca_cert="$SA_CA_CRT"

# Create a role named, 'spinnaker' to map Kubernetes Service Account to
# Vault policies and default token TTL
$ vault write auth/kubernetes/role/spinnaker \
        bound_service_account_names=default \
        bound_service_account_namespaces='*' \
        policies=spinnaker-kv-ro \
        ttl=1440h
```

## Verify Configuration

It is time verify that the Kubernetes auth method has been properly configured.

**5. Deploy Armory's [debug container](https://github.com/armory/docker-debugging-tools/blob/master/Dockerfile) into your cluster -- this container has the Vault cli pre-installed.**

**Note: This should be deployed into the same namespace as your Spinnaker install**

```$ kubectl apply -f  https://raw.githubusercontent.com/armory/docker-debugging-tools/master/deployment.yml```

**6. `exec` into the pod**

```
$ POD_NAME=$(kubectl get pod -l app=debugging-tools -o go-template --template '{% raw %}{{range .items}}{{.metadata.name}}{{"\n"}}{{end}}{% endraw %}' --sort-by=".status.startTime" | tail -n 1)
$ kubectl exec -it $POD_NAME bash
```

**7. Test the auth method**

```
$ export VAULT_ADDR='http://your.vault.address:port'
$ SA_TOKEN=$(cat /var/run/secrets/kubernetes.io/serviceaccount/token)

$ vault write auth/kubernetes/login role=spinnaker jwt=$SA_TOKEN
```

This command should return output like the following
```
Key                                       Value
---                                       -----
token                                     s.bKSSrYOcETCADGvGxhbDaaaD
token_accessor                            0ybx2CEPZqxBEwFk8jUPkBk7
token_duration                            24h
token_renewable                           true
token_policies                            ["default" "spinnaker-kv-ro"]
identity_policies                         []
policies                                  ["default" "spinnaker-kv-ro"]
token_meta_role                           spinnaker
token_meta_service_account_name           default
token_meta_service_account_namespace      default
token_meta_service_account_secret_name    default-token-h9knn
token_meta_service_account_uid            13cee6Dbc-0bc2-11e9-9fd2-0a32f8e530cc
```

Using the token from the output above allows for the following

```
$ vault login s.bKSSrYOcETCADGvGxhbDaaaD
```

Once logged in you should be able to read secrets

```
$ vault kv get secret/spinnaker/test
```

As a reminder, the policy we created provides ro access *only* so you will need to have written the secret using a separate authenticated client.
