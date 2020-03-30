---
layout: post
title: Artifact Config Reference
order: 12
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Bitbucket

**artifacts.bitbucket.accounts**

```
artifacts:
  bitbucket:
	enabled: false
	accounts:
	- name: my-bitbucket-account
	  username:
	  password:
	  usernamePasswordFile:
```

## Account parameters

- `username`: Bitbucket username
- `password`: Bitbucket password
- `usernamePasswordFile`: File containing "username:password" to use for Bitbucket authentication

# GCS

**artifacts.gcs.accounts**

```
gcs:
  enabled: false
  accounts:
  - name: my-gcs-account
    jsonPath:
```

## Account parameters

 - `json-path`: The path to a JSON service account that Spinnaker will use as credentials. This is only needed if Spinnaker is not deployed on a Google Compute Engine VM, or needs permissions not afforded to the VM it is running on. See [service-accounts](https://cloud.google.com/compute/docs/access/service-accounts) for more information.


# GitHub

**artifacts.github.accounts**

```
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

## Account parameters

 - `username`: GitHub username
 - `password`: GitHub password
 - `usernamePasswordFile`: File containing "username:password" to use for GitHub authentication
 - `token`: GitHub token
 - `tokenFile`: File containing a GitHub authentication token

# GitLab

**artifacts.github.accounts**

```
gitlab:
  enabled: false
  accounts:
  - name: gitlab-account
	token:
	tokenFile:
```

## Account parameters

 - `token`: Gitlab token
 - `tokenFile`: File containing a Gitlab authentication token

# GitRepo

**artifacts.gitrepo.accounts**

```
gitrepo:
  enabled: false
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

## Account parameters

- `username`: Git username
- `password`: Git password
- `usernamePasswordFile`: File containing "username:password" to use for Git authentication
- `token`:  Git token
- `tokenFile`: File containing a Git authentication token
- `sshPrivateKeyFilePath`: Path to the ssh private key in PEM format
- `sshPrivateKeyPassphrase`: Passphrase for encrypted private key
- `sshKnownHostsFilePath`: File containing the known and trusted SSH hosts.
- `sshTrustUnknownHosts`: Setting this to true allows Spinnaker to authenticate with unknown hosts

# Helm

**artifacts.helm.accounts**

```
helm:
  enabled: false
  accounts:
  - name: my-helm-account
	repository:
	username:
	password:
	usernamePasswordFile:
```

## Account parameters

 - `repository`: Helm chart repository
 - `username`: Helm chart repository basic auth username
 - `password`: Helm chart repository basic auth password
 - `usernamePasswordFile`: File containing "username:password" to use for helm chart repository basic auth


# HTTPS

**artifacts.https.accounts**

```
http:
  enabled: false
  accounts:
  - name: my-http-account
	username:
	password:
	usernamePasswordFile:
```

## Account parameters

 - `username`: HTTP basic auth username
 - `password`: HTTP basic auth password
 - `usernamePasswordFile`: File containing "username:password" to use for HTTP basic auth


# Maven

 **artifacts.maven.accounts**

 ```
 maven:
   enabled: false
   accounts:
   - name: my-maven-account
 	repositoryUrl:
 ```

## Account parameters

- `repositoryUrl`: Full URI for the Maven repository ie.```http://some.host.com/repository/path```

# Oracle

```
oracle:
  enabled: false
  accounts:
  - name: my-oracle-account
	namespace:
	region:
	userId:
	fingerprint:
	sshPrivateKeyFilePath:
	privateKeyPassphrase:
	tenancyId:
```

## Account parameters

- `namespace`:  The namespace the bucket and objects should be created in
- `region`: An Oracle region (e.g., us-phoenix-1)
- `userId`:  Provide the OCID of the Oracle User you're authenticating as
- `fingerprint`:  Fingerprint of the public key
- `sshPrivateKeyFilePath`:  Path to the private key in PEM format
- `privateKeyPassphrase`:  Passphrase used for the private key, if it is encrypted
- `tenancyId`: Provide the OCID of the Oracle Tenancy to use.

# S3

```
s3:
  enabled: false
  accounts:
  - name: my-s3-account
	apiEndpoint:
	apiRegion:
	region:
	awsAccessKeyId:
	awsSecretAccessKey:
```

## Account parameters

- `apiEndpoint`: S3 api endpoint; only required when using an S3 clone such as Minio
- `apiRegion`: S3 api region; only required when using an S3 clone such as Minio
- `region`: S3 region
- `awsAccessKeyId`: Your AWS Access Key ID. If not provided, Halyard/Spinnaker will try to find AWS credentials as described at http://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html#credentials-default
- `awsSecretAccessKey`: Your AWS Secret Key.

# Templates

```
templates:
- name: my-template
  templatePath: 
 ```

`templatePath`: The path to the Jinja template to use for artifact extraction
