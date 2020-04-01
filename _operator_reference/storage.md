---
layout: post
title: Storage Config Reference
order: 14
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


```yaml
persistentStorage:
  persistentStoreType: s3
  azs:
	storageAccountName: abc # The name of an Azure Storage Account used for Spinnaker's persistent data.
	storageAccountKey: abc # The key to access the Azure Storage Account used for Spinnaker's persistent data.
	storageContainerName: abc # (Default: spinnaker) The container name in the chosen storage account to place all of Spinnaker's persistent data.
  gcs:
	jsonPath: sa.json # A path to a JSON service account with permission to read and write to the bucket to be used as a backing store.
	project: abc # The Google Cloud Platform project you are using to host the GCS bucket as a backing store.
	bucket: abc #  The name of a storage bucket that your specified account has access to. If not specified, a random name will be chosen. If you specify a globally unique bucket name that doesn't exist yet, Halyard will create that bucket for you.
	rootFolder: front50 # The root folder in the chosen bucket to place all of Spinnaker's persistent data in.
	bucketLocation: abc #  This is only required if the bucket you specify doesn't exist yet. In that case, the bucket will be created in that location. See https://cloud.google.com/storage/docs/managing-buckets#manage-class-location.
  oracle:
	bucketName: abc # The bucket name to store persistent state object in
	namespace: abc # The namespace the bucket and objects should be created in
	compartmentId: abc # Provide the OCID of the Oracle Compartment to use.
	region: abc # An Oracle region (e.g., us-phoenix-1)
	userId: abc # Provide the OCID of the Oracle User you're authenticating as
	fingerprint: abc # Fingerprint of the public key
	sshPrivateKeyFilePath: key.pem # Path to the private key in PEM format
	privateKeyPassphrase: abc # Passphrase used for the private key, if it is encrypted
	tenancyId: abc # Provide the OCID of the Oracle Tenancy to use.
  s3:
	bucket: spinnaker # The name of a storage bucket that your specified account has access to. If not specified, a random name will be chosen. If you specify a globally unique bucket name that doesn't exist yet, Halyard will create that bucket for you.
	rootFolder: front50 # The root folder in the chosen bucket to place all of Spinnaker's persistent data in.
	region: us-west-2 # This is only required if the bucket you specify doesn't exist yet. In that case, the bucket will be created in that region. See http://docs.aws.amazon.com/general/latest/gr/rande.html#s3_region.
	pathStyleAccess: false # when true, use path-style to access bucket; when false, use virtual hosted-style to access bucket. See
	endpoint: abc #  An alternate endpoint that your S3-compatible storage can be found at. This is intended for self-hosted storage services with S3-compatible APIs, e.g. Minio. If supplied, this storage type cannot be validated.
	accessKeyId: abc # Your AWS Access Key ID. If not provided, Halyard/Spinnaker will try to find AWS credentials as described at http://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html#credentials-default
	serverSideEncryption: AES256 # Use Amazon Server-Side Encryption ('x-amz-server-side-encryption' header). Supports 'AES256' (for Amazon S3-managed encryption keys, equivalent to a header value of 'AES256') and 'AWSKMS' (for AWS KMS-managed encryption keys, equivalent to a header value of 'aws:kms'.
	secretAccessKey: abc # Your AWS Secret Key.
```
