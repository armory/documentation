---
layout: post
title: Spinnaker Secrets in S3 buckets
order: 30
---
Storing Spinnaker secrets separately from its configuration is a necessary step to managing Spinnaker through an SCM like git. This document describes how to manage secrets with an s3 bucket.

<div class="alpha-warning">
  This feature is in alpha stage with Armory Spinnaker. <a href="https://www.armory.io/contact">Get in touch</a> and give us feedback!
</div>

{:toc}

## Store Secrets
In this example, we'll be using a `mybucket` bucket in the `us-west-2` region to store github credentials and a kubeconfig file. We'll be referencing the bucket by its URL `mybucket.us-west-2.amazonaws.com`.

### Authorization
Since we're storing sensitive information, we'll protect the bucket by restricting access and [enabling encryption](https://docs.aws.amazon.com/AmazonS3/latest/user-guide/default-bucket-encryption.html).

The important thing to remember is that Spinnaker services and Halyard (daemon) should both have IAM roles that can read content from the bucket.


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


## How to reference secrets
Now that your secrets are safely stored in our bucket, we'll reference them from Spinnaker with the following format:

```
encrypted:s3!<bucket and path to file>!<optional key>
```

For example to reference `github.password`, we'll use:
```
encrypted:s3!mybucket.us-west-2.amazonaws.com/spinnaker-secrets.yml!github.password
```

And to reference the content of our kubeconfig file:
```
encrypted:s3!mybucket.us-west-2.amazonaws.com/mykubeconfig
```

## Using Secrets

### With Halyard
Halyard can understand the secrets you entered. If the service you're deploying is able to decrypt secrets, Halyard will pass the reference directly, otherwise it will decrypt the configuration before sending it.

For instance, after deploying the following change:
```
hal config artifact github account edit <GITHUB_ACCOUNT> \
  --token=encrypted:s3!mybucket.us-west-2.amazonaws.com/spinnaker-secrets.yml!github.token
```

We'd find the following in clouddriver.yml:
```yaml
...
  github:
    enabled: true
    accounts:
    - name: github
      token: encrypted:s3!mybucket.us-west-2.amazonaws.com/spinnaker-secrets.yml!github.token
...
```

And for an older release of Clouddriver:
```yaml
...
  github:
    enabled: true
    accounts:
    - name: github
      token: <TOKEN>
...
```

## Using Secrets without Halyard
Without Halyard, we can add encrypted secrets directly to the configuration files. You need to make sure first that the service you're configuring support decryption.


