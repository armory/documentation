---
layout: post
title: Artifact Config
order: 3
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Parameters

**spec.spinnakerConfig.config.artifacts**

```yaml
artifacts:
  bitbucket:
  gcs:
  oracle:
  github:
  gitlab:
  http:
  helm:
  s3:
  maven:
  templates:
```
## Bitbucket

**spec.spinnakerConfig.config.artifacts.bitbucket**

```yaml
artifacts:
  bitbucket:
    enabled: false
    accounts:
    - name:
      username:
      password:
      usernamePasswordFile:
```

- `enabled`: true or false

### Account parameters

- `username`: Bitbucket username
- `password`: Bitbucket password. Supports encrypted value.
- `usernamePasswordFile`: File containing "username:password" to use for Bitbucket authentication. File needs to be present on the machine running Spinnaker. Supports encrypted file.

Note: supply `username` and `password` OR `usernamePasswordFile`

## GCS

**spec.spinnakerConfig.config.artifacts.gcs**

```yaml
gcs:
  enabled: false
  accounts:
  - name: my-gcs-account
    jsonPath:
```
- `enabled`: true or false

### Account parameters

 - `json-path`: The path to a JSON service account that Spinnaker will use as credentials. This is only needed if Spinnaker is not deployed on a Google Compute Engine VM, or needs permissions not afforded to the VM it is running on. See [service-accounts](https://cloud.google.com/compute/docs/access/service-accounts) for more information. File needs to be present on the machine running Spinnaker. Supports encrypted file.


## GitHub

**spec.spinnakerConfig.config.artifacts.github**

```yaml
github:
  accounts:
  - name: my-github
    username:
    password:
    usernamePasswordFile:
    token:
    tokenFile:
  enabled: true
```

- `enabled`: true or false

### Account parameters

 - `username`: GitHub username
 - `password`: GitHub password. Supports encrypted value.
 - `usernamePasswordFile`: File containing "username:password" to use for GitHub authentication. File needs to be present on the machine running Spinnaker. Supports encrypted file.
 - `token`: GitHub token. Supports encrypted value.
 - `tokenFile`: File containing a GitHub authentication token. File needs to be present on the machine running Spinnaker. Supports encrypted file.

Note: supply `username` and `password` OR `usernamePasswordFile` or `token` or `tokenFile`

## GitLab

**spec.spinnakerConfig.config.artifacts.gitlab**

```yaml
gitlab:
  enabled:
  accounts:
  - name:
    token:
    tokenFile:
```

- `enabled`: true or false

### Account parameters

 - `token`: Gitlab token. Supports encrypted value.
 - `tokenFile`: File containing a Gitlab authentication token. File needs to be present on the machine running Spinnaker. Supports encrypted file.

Note: supply `token` or `tokenFile`

## GitRepo

**spec.spinnakerConfig.config.artifacts.gitrepo**

```yaml
gitrepo:
  enabled:
  accounts:
  - name:
    username:
    password:
    usernamePasswordFile:
    token:
    tokenFile:
    sshPrivateKeyFilePath:
    sshPrivateKeyPassphrase:
    sshKnownHostsFilePath:
    sshTrustUnknownHosts:
```

- `enabled`: true or false

### Account parameters

- `username`: Git username
- `password`: Git password. Supports encrypted value.
- `usernamePasswordFile`: File containing "username:password" to use for Git authentication. File needs to be present on the machine running Spinnaker. Supports encrypted file.
- `token`:  Git token. Supports encrypted value.
- `tokenFile`: File containing a Git authentication token. File needs to be present on the machine running Spinnaker. Supports encrypted file.
- `sshPrivateKeyFilePath`: Path to the ssh private key in PEM format. File needs to be present on the machine running Spinnaker. Supports encrypted file.
- `sshPrivateKeyPassphrase`: Passphrase for encrypted private key. Supports encrypted value.
- `sshKnownHostsFilePath`: File containing the known and trusted SSH hosts. File needs to be present on the machine running Spinnaker. Supports encrypted file.
- `sshTrustUnknownHosts`: Setting this to true allows Spinnaker to authenticate with unknown hosts

Note: supply `username` and `password` OR `usernamePasswordFile` or `token` or `tokenFile`

## Helm

**spec.spinnakerConfig.config.artifacts.helm**

```yaml
helm:
  enabled:
  accounts:
  - name:
    repository:
    username:
    password:
    usernamePasswordFile:
```

- `enabled`: true or false

### Account parameters

 - `repository`: Helm chart repository
 - `username`: Helm chart repository basic auth username
 - `password`: Helm chart repository basic auth password. Supports encrypted value.
 - `usernamePasswordFile`: File containing "username:password" to use for helm chart repository basic auth. File needs to be present on the machine running Spinnaker. Supports encrypted file.

Note: supply `username` and `password` OR `usernamePasswordFile`

## HTTPS

**spec.spinnakerConfig.config.artifacts.https**

```yaml
http:
  enabled:
  accounts:
  - name:
    username:
    password:
    usernamePasswordFile:
```

- `enabled`: true or false

### Account parameters

 - `username`: HTTP basic auth username
 - `password`: HTTP basic auth password. Supports encrypted value.
 - `usernamePasswordFile`: File containing "username:password" to use for HTTP basic auth. File needs to be present on the machine running Spinnaker. Supports encrypted file.

Note: supply `username` and `password` OR `usernamePasswordFile`

## Maven

 **spec.spinnakerConfig.config.artifacts.maven.accounts**

 ```yaml
 maven:
   enabled:
   accounts:
   - name:
     repositoryUrl:
 ```

- `enabled`: true or false

### Account parameters

- `repositoryUrl`: Full URI for the Maven repository ie.```http://some.host.com/repository/path```

## Oracle

```yaml
oracle:
  enabled:
  accounts:
  - name:
    namespace:
    region:
    userId:
    fingerprint:
    sshPrivateKeyFilePath:
    privateKeyPassphrase:
    tenancyId:
```

- `enabled`: true or false

### Account parameters

- `namespace`:  The namespace the bucket and objects should be created in
- `region`: An Oracle region (e.g., us-phoenix-1)
- `userId`:  Provide the OCID of the Oracle User you're authenticating as
- `fingerprint`:  Fingerprint of the public key
- `sshPrivateKeyFilePath`:  Path to the private key in PEM format. File needs to be present on the machine running Spinnaker. Supports encrypted file.
- `privateKeyPassphrase`:  Passphrase used for the private key, if it is encrypted. Supports encrypted value.
- `tenancyId`: Provide the OCID of the Oracle Tenancy to use.

## S3

```yaml
s3:
  enabled:
  accounts:
  - name:
    apiEndpoint:
    apiRegion:
    region:
    awsAccessKeyId:
    awsSecretAccessKey:
```

- `enabled`: true or false

### Account parameters

- `apiEndpoint`: S3 api endpoint; only required when using an S3 clone such as Minio
- `apiRegion`: S3 api region; only required when using an S3 clone such as Minio
- `region`: S3 region
- `awsAccessKeyId`: Your AWS Access Key ID. If not provided, Halyard/Spinnaker will try to find AWS credentials as described at http://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html#credentials-default
- `awsSecretAccessKey`: Your AWS Secret Key. Supports encrypted value.

## Templates

```yaml
templates:
- name:
  templatePath:
 ```

`templatePath`: The path to the Jinja template to use for artifact extraction. File needs to be present on the machine running Spinnaker.
