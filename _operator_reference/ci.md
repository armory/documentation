---
layout: post
title: CI Config
order: 5
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# AWS CodeBuild

**spec.spinnakerConfig.config.ci.codebuild**

```yaml
codebuild:
  enabled:
  accounts:
  - name:
    permissions:
      READ:
    accountId:
    assumeRole:
    region:
```

- `enabled`: whether this CI tool is enabled
- `accounts`: list of configured accounts

## Account parameters

- `name`: (*Required*) account name
- `permissions`:
    - `READ`:
    - read1
- `accountId`: The AWS account ID that will be used to trigger CodeBuild build.
- `assumeRole`: If set, Operator will configure a credentials provider that uses AWS Security Token Service to assume the specified role.
- `region`: (*Required*) The AWS region in which your CodeBuild projects live.

# Concourse

**spec.spinnakerConfig.config.ci.concourse**

```yaml
concourse:
  enabled:
  masters:
  - name:
    permissions:
      READ:
      WRITE:
    url:
    username:
    password:
```

- `enabled`: whether this CI tool is enabled
- `masters`: list of configured masters

## Master parameters

- `name`: master's name
- `permissions`:  []
    - `READ`: A user must have at least one of these roles in order to view this build master or use it as a trigger source.
    - `WRITE`: A user must have at least one of these roles in order to be able to run jobs on this build master.
- `url`: (*Required*)  The url your concourse search is reachable at.
- `username`: (*Required*)  The username of the concourse user to authenticate as.
- `password`: (*Required*) The password of the concourse user to authenticate as. Supports encrypted value.

# Google CloudBuild (gcb)

**spec.spinnakerConfig.config.ci.gcb**

```yaml
gcb:
  enabled:
  accounts:
  - name:
    permissions:
      READ:
        - read1
    project:
    subscriptionName:
    jsonKey:
```

- `enabled`: whether this CI tool is enabled
- `accounts`: list of configured masters

## Account parameters

- `name`: (*Required*) account name
- `permissions`:  []
   - `READ`: A user must have at least one of these roles in order to view this build master or use it as a trigger source.
- `project`: (*Required*) The name of the GCP project in which to trigger and monitor builds.
- `subscriptionName`: The name of the PubSub subscription on which to listen for build changes.
- `jsonKey`: The path to a JSON service account that Spinnaker will use as credentials. File needs to be present on the machine running Spinnaker. Supports encrypted file.

# Jenkins

**spec.spinnakerConfig.config.ci.jenkins**

```yaml
jenkins:
  enabled:
  masters:
  - name:
    permissions:
      READ:
      - read1
    address:
    username:
    password:
    csrf:
    trustStore:
    trustStoreType:
    trustStorePassword:
```

- `enabled`: whether this CI tool is enabled
- `masters`: list of configured masters

## Master parameters

- `name`: master's name
- `permissions`:  []
   - `READ`: A user must have at least one of these roles in order to view this build master or use it as a trigger source.
- `address`: (*Required*) The address your Jenkins master is reachable at.
- `username`: The username of the Jenkins user to authenticate as.
- `password`: The password of the Jenkins user to authenticate as. Supports encrypted value.
- `csrf`:  Whether or not to negotiate CSRF tokens when calling Jenkins.
- `trustStore`: File needs to be present on the machine running Spinnaker. Supports encrypted file.
- `trustStoreType`:
- `trustStorePassword`: Supports encrypted value.

# Travis

**spec.spinnakerConfig.config.ci.travis**

```yaml
travis:
  enabled:
  masters:
  - name:
    permissions:
      READ:
      - read1
      WRITE:
      - write1
    address:
    baseUrl:
    githubToken:
    numberOfRepositories:
```

- `enabled`: whether this CI tool is enabled
- `masters`: list of configured masters

## Master parameters

- `name`: master's name
- `permissions`:  []
   - `READ`: A user must have at least one of these roles in order to view this build master or use it as a trigger source.
   - `WRITE`: A user must have at least one of these roles in order to be able to run jobs on this build master.
- `address`: (*Required*) The address of the Travis API.
- `baseUrl`: (*Required*) The base URL to the Travis UI.
- `githubToken`: The github token to authenticate against Travis with. Supports encrypted value.
- `numberOfRepositories`: How many repositories the Travis integration should fetch from the api each time the poller runs. Should be set a bit higher than the expected maximum number of repositories built within the poll interval.


# Wercker

**spec.spinnakerConfig.config.ci.wercker**

```yaml
wercker:
  enabled:
  masters:
  - name:
    permissions:
      READ:
      - read1
      WRITE:
      - write1
    address:
    user:
    token:
```

- `enabled`: whether this CI tool is enabled
- `masters`: list of configured masters

## Master parameters

- `name`: master's name
- `permissions`:  []
   - `READ`: A user must have at least one of these roles in order to view this build master or use it as a trigger source.
   - `WRITE`: A user must have at least one of these roles in order to be able to run jobs on this build master.
- `address`: (*Required*) The address your Wercker master is reachable at.
- `user`: The username of the Wercker user to authenticate as.
- `token`: The personal token of the Wercker user to authenticate as. Supports encrypted value.
