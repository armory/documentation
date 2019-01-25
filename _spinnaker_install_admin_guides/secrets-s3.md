---
layout: post
title: Spinnaker Secrets and S3
order: 150
---
Managing Spinnaker secrets separately from its configuration is a necessary step to enabling Spinnaker through an SCM like git. This document describes how to store secrets in s3 and these secrets are used in Spinnaker and Halyard.

<div class="alpha-warning">
  This feature is in alpha stage with Armory Spinnaker. <a href="https://www.armory.io/contact">Get in touch</a> and give us feedback!
</div>

{:toc}

## Overview
We can now store secrets (tokens, passwords, sensitive files) separately from the Spinnaker and Halyard configurations. We'll provide references to these secrets to services that need them.

- Spinnaker services that support decryption will decrypt these secrets upon startup.
- Halyard can decrypt these secrets when it needs to use them (e.g. when validating resources).
- Halyard can send secret references to the services that support decryption or send decrypted secrets if the service does not support it.

## Secrets in S3
In this example, we'll be using a `mybucket` bucket in the `us-west-2` region to store Github credentials and a kubeconfig file. We'll be referencing the bucket by its URL `mybucket.us-west-2.amazonaws.com`.

### Authorization
Since we're storing sensitive information, we'll protect the bucket by restricting access and [enabling encryption](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/default-bucket-encryption.html).

The important thing to remember is to run Halyard's daemon and Spinnaker services that support decryption with IAM roles that allows them to read that content.


### Storing credentials
Let's store our github credentials in `mybucket/spinnaker-secrets.yml`:

```yaml
github:
  password: <PASSWORD>
  token: <TOKEN>
```

Note: *We could have chosen to store the password under a different key than `github.password`. We'd just need to change how to reference the secret further down.*

### Storing sensitive files
Some of Spinnaker configuration also uses information stored in files. Let's upload the `kubeconfig` file of our Kubernetes account to `mybucket/mykubeconfig`:


```yaml
apiVersion: v1
clusters:
- cluster:
    certificate-authority-data: <ca authority>
    server: https://<clusterurl>
...
```

Note: we could also have base 64 encoded the file content and stored in the yaml file above.

## How to reference secrets
Now that secrets are safely stored in our bucket, we'll reference them from Spinnaker with the following format:

```
encrypted:s3!r:<region>!b:<bucket>!f:<path to file>!k:<optional key>
```

Note: The S3 specific parameters, e.g. r:<region>, b:<bucket>, etc, can be in any order

For example to reference `github.password`, we'll use:
```
encrypted:s3!r:us-west-2!b:mybucket!f:spinnaker-secrets.yml!k:github.password
```

And to reference the content of our kubeconfig file:
```
encrypted:s3!f:mykubeconfig!r:us-west-2!b:mybucket
```

## Using Secrets

### In Halyard
Halyard can understand the secrets we provided. If the service we're deploying is able to decrypt secrets, Halyard will pass the reference directly, otherwise it will decrypt the configuration before sending it.

For instance, after deploying the following change:
```
hal config artifact github account edit github \
  --token=encrypted:s3!r:us-west-2!b:mybucket!f:spinnaker-secrets.yml!k:github.token
```

We'd find the following in clouddriver.yml:
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

### Non Halyard configuration
We can also provide secret references directly in `*-local.yml` profile files or directly to Spinnaker services.
