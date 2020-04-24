---
layout: post
title: Persistent Storage Config
order: 10
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Parameters

**spec.spinnakerConfig.config.persistentStorage**

```yaml
persistentStorage:
  persistentStoreType: s3
  azs:
  gcs:
  oracle:
  s3:
```

- `persistentStorageType`: one of `azs`, `gcs`, `oracle`, `s3`; the configured storage type for Spinnaker to use
- `azs`: Azure persistent storage configuration
- `gcs`: Google Cloud persistent storage configuration
- `oracle`: Oracle persistent storage configuration
- `s3`: Amazon s3 persistent storage configuration


## Azure

```yaml
azs:
  storageAccountName:
  storageAccountKey:
  storageContainerName:
```

- `storageAccountName`: The name of an Azure Storage Account used for Spinnaker's persistent data.
- `storageAccountKey`: The key to access the Azure Storage Account used for Spinnaker's persistent data. Supports encrypted value.
- `storageContainerName`: (Default: `spinnaker`) The container name in the chosen storage account to place all of Spinnaker's persistent data.

## GCS

```yaml
gcs:
  jsonPath:
  project:
  bucket:
  rootFolder:
  bucketLocation:
```

- `jsonPath`: A path to a JSON service account with permission to read and write to the bucket to be used as a backing store. File needs to be present on the machine running Spinnaker. Supports encrypted file.
- `project`: The Google Cloud Platform project you are using to host the GCS bucket as a backing store.
- `bucket`: The name of a storage bucket that your specified account has access to. If not specified, a random name will be chosen. If you specify a globally unique bucket name that doesn't exist yet, Halyard will create that bucket for you.
- `rootFolder`: The root folder in the chosen bucket to place all of Spinnaker's persistent data in.
- `bucketLocation`: This is only required if the bucket you specify doesn't exist yet. In that case, the bucket will be created in that location. See https://cloud.google.com/storage/docs/managing-buckets#manage-class-location.

## Oracle

```yaml
oracle:
  bucketName:
  namespace:
  compartmentId:
  region:
  userId:
  fingerprint:
  sshPrivateKeyFilePath:
  privateKeyPassphrase:
  tenancyId:
```

- `bucketName`: The bucket name to store persistent state object in
- `namespace`: The namespace the bucket and objects should be created in
- `compartmentId`: Provide the OCID of the Oracle Compartment to use.
- `region`: An Oracle region (e.g., us-phoenix-1)
- `userId`: Provide the OCID of the Oracle User you're authenticating as
- `fingerprint`: Fingerprint of the public key
- `sshPrivateKeyFilePath`: Path to the private key in PEM format. File needs to be present on the machine running Spinnaker. Supports encrypted file.
- `privateKeyPassphrase`: Passphrase used for the private key, if it is encrypted. Supports encrypted value.
- `tenancyId`: Provide the OCID of the Oracle Tenancy to use.

## S3

```yaml  
s3:
  bucket:
  rootFolder:
  region:
  pathStyleAccess:
  endpoint:
  accessKeyId:
  serverSideEncryption:
  secretAccessKey:
```

- `bucket`: The name of a storage bucket that your specified account has access to. If not specified, a random name will be chosen. If you specify a globally unique bucket name that doesn't exist yet, Operator will create that bucket for you.
- `rootFolder`: The root folder in the chosen bucket to place all of Spinnaker's persistent data in.
- `region`: This is only required if the bucket you specify doesn't exist yet. In that case, the bucket will be created in that region. See http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region.
- `pathStyleAccess`: true or false; when true, use path-style to access bucket; when false, use virtual hosted-style to access bucket. See
- `endpoint`: An alternate endpoint that your S3-compatible storage can be found at. This is intended for self-hosted storage services with S3-compatible APIs, e.g. Minio. If supplied, this storage type cannot be validated.
- `accessKeyId`: Your AWS Access Key ID. If not provided, Halyard/Spinnaker will try to find AWS credentials as described at http://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html#credentials-default
- `serverSideEncryption`: Use Amazon Server-Side Encryption ('x-amz-server-side-encryption' header). Supports 'AES256' (for Amazon S3-managed encryption keys, equivalent to a header value of 'AES256') and 'AWSKMS' (for AWS KMS-managed encryption keys, equivalent to a header value of 'aws:kms'.
- `secretAccessKey`: Your AWS Secret Key. Supports encrypted value.
