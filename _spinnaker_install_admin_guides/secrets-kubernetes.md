---
layout: post
title: Secrets in Kubernetes
order: 153
---

{:toc}

>Note: Storing Spinnaker secrets in a Kubernetes secret is only supported if you're using the Operator to deploy and manage Spinnaker.

This document describes how to set up Spinnaker secrets in a Kubernetes secret. This example uses a Kubernetes secret to store GitHub credentials and a kubeconfig file.

## Creating a Kubernetes secret

Spinnaker can read secrets only within its own namespace. It cannot access Kubernetes secrets stored in a different namespace. In this document, assume that Spinnaker lives in the namespace `spinnaker`.

You can store files as well as individual text values in Kubernetes secrets to be referenced by Spinnaker. To create the secret you can use this command, assuming you have a file named `kubeconfig-prod` where you are running the command:

```bash
kubectl -n spinnaker create secret generic spin-secrets \
    --from-file=kubeconfig-prod \
    --from-literal=github-token=aaaaaabbbbbbbbccccccccc
```

The command will create a secret named `spin-secrets` in the `spinnaker` namespace, having two keys: one is a kubeconfig file with key `kubeconfig-prod` , and the other is a text value for a GitHub token with key `github-token`.

Kustomize also has a secret generator, so you can automatically deploy secrets using Kustomize along with the `SpinnakerService` manifest. This is a `kustomization.yml` file that creates the same secret as above:

```yaml
apiVersion: kustomize.config.k8s.io/v1beta1
kind: Kustomization

secretGenerator:
  - name: spin-secrets
    files:
      - kubeconfig-prod
    literals:
      - github-token=aaaaaabbbbbbbbccccccccc
```

For more information on how to create secrets in Kubernetes refer to the [official Kubernetes docs](https://kubernetes.io/docs/concepts/configuration/secret/#creating-your-own-secrets) or the [Kustomize docs](https://github.com/kubernetes-sigs/kustomize/blob/master/examples/secretGeneratorPlugin.md).


## Referencing secrets

You reference secret values in your config with the following format:

```
encrypted:k8s!n:<secret name>!k:<secret key>
```

Similarly you can reference secret files:

```
encryptedFile:k8s!n:<secret name>!k:<secret key>
```

For example, to reference the GitHub token:
```
encrypted:k8s!n:spin-secrets!k:github-token
```

And to reference the content of our kubeconfig file:
```
encryptedFile:k8s!n:spin-secrets!k:kubeconfig-prod
```
