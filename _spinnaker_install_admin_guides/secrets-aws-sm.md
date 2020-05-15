---
layout: post
title: Secrets with AWS Secrets Manager
order: 151
---

Set up Spinnaker secrets using AWS Secrets Manager.

{:toc}

## Referencing secrets stored in AWS Secrets Manager

You can reference a keyStore or keyStorePassword stored in AWS Secrets Manager. Based on which type of secret you want to reference, use one of the following formats:

```
  keyStore: encryptedFile:secrets-manager!r:<some region>!s:<secret name>

  keyStorePassword: encrypted:secrets-manager!r:<some region>!s:<secret name>!k:some-key
```

* `encryptedFile` or `encrypted` - **Required**. Indicates that this is an encrypted file or an encrypted string, respectively.
* `secrets-manager` - **Required**. Indicates that secrets are stored in AWS Secrets Manager
* `!` - **Required**. Delimiter between parameters.
* `r:<AWS region>` - **Required**. The AWS region your secret is stored in. For example, use `r:us-west-2` for a secret stored in the `us-west-2` region.
* `s:<Secret name>` - **Required**. The name of the secret stored in AWS Secrets Manager
* `k<some-key>` - **Required** for encrypted strings. The Secret Key. Omit for keyStores.

For example, the 