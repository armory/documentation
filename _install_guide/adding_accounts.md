---
layout: post
title: Adding Accounts
order: 70
---

{% include components/legacy_documentation.html %}

This guide should include:

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


# Adding A Kubernetes Account

Spinnaker supports deploying to multiple cloud environments. If you're using Kubernetes you'll need to [follow this guide]({% link _admin_guides/configure_kubernetes.md %})  

# Adding Additional AWS Accounts

Spinnaker supports adding multiple AWS accounts with some users reaching 100s of accounts in production.  Spinnaker uses AWS assume roles to create resources in the target account and then passes the role to a target instance profile if it's creating an instance resource.


## Spinnaker's Account Model
In AWS, Spinnaker relies on IAM policies to access temporary keys into configured accounts by [assuming a role](http://docs.aws.amazon.com/IAM/latest/UserGuide/id_roles_use_passrole.html). This allows an administrator to limit and audit the actions that Spinnaker is taking in configured accounts.

![spinnaker assume role](/images/Image 2017-04-17 at 8.32.48 AM.png)

## Clouddriver Configuration

For adding additional accounts into Spinnaker you'll need to extend Clouddriver by adding your configuration into `clouddriver-local.yml`.  Here is an example of a Clouddriver configuration file that has 3 accounts as described above.

```yaml
aws:
  defaultAssumeRole: role/SpinnakerManagedProfile
  accounts:

    - name: prod-account
      accountId: "198765432101"
      regions:
        - name: us-east-1
        - name: us-east-2
        - name: us-west-1

    - name: staging-account
      accountId: "123456789012"
      regions:
        - name: us-east-1
        - name: us-west-2

    - name: service-account
      accountId: "987654321123"
      regions:
        - name: us-east-1
```

You'll also have to set your default account in your `spinnaker-local.yml` file:

```yaml
providers:
  aws:
    primaryCredentials:
      name: prod-account
```

## Assume Roles in IAM

You will need to create a `SpinnakerManagedProfile` role in the target AWS account (prod-account, staging-account, service-account) and give it the
correct trust policy in IAM.  Below is the trust policy you give the `SpinnakerManagedProfile` in the target account to allow the `SpinakerInstanceProfile`.

```yaml
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::987654321123:role/SpinnakerManagedProfile"
      },
      "Action": "sts:AssumeRole"
    },
    {
      "Sid": "",
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::987654321123:role/SpinnakerInstanceProfile"
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

Now that the target account has a `SpinnakerManagedProfile`, you will need to update the Managing account `SpinnakerInstanceProfile` `SpinnakerAssumePolicy` to add each managed account.

```yaml
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Action": "sts:AssumeRole",
      "Resource": [
        "arn:aws:iam::987654321123:role/SpinnakerManagedProfile",
        "arn:aws:iam::123456789012:role/SpinnakerManagedProfile"
      ],
      "Effect": "Allow"
    }
  ]
}
```

Below is the latest EC2 policy to use for allowing `SpinnakerInstanceProfile`.

<script src="https://gist-it.appspot.com/https://github.com/Armory/spinnaker-aws-policy/blob/master/policies/latest/SpinnakerInstanceProfile.json"></script>


# Adding Artifact Accounts

Artifacts are a main driver behind the Kubernetes V2 provider. They allow you to store Kubernetes manifests in external repositories such as Github or S3 and then deploy those artifacts with Spinnaker. There are many different artifact providers and they are all configured in a similar fashion.

To configure an artifact account, add any of the following snippets to `clouddriver-local.yml` under the top level `artifacts` key. For example, if you wanted to configure 2 artifact accounts, S3 and Github, you would configure them as follows:

```yaml
# clouddriver-local.yml
artifacts:
  s3:
    enabled: true
    accounts:
      - name: s3
        region: us-west-2
  github:
    enabled: true
    accounts:
      - name: github
        token: personalAccessToken
```

Some providers allow a `usernamePasswordFile` which looks like:
```
username:password
```

Below are example configuration for all available artifact providers.

## Bitbucket

```yaml
artifacts:
  bitbucket:
    enabled: true
    accounts:
      - name: bitbucket-account-name
        username: armory-bot
        password: supersecretpassword
        # usernamePasswordFile should only be used if username and password are not used
        usernamePasswordFile: /passwords/bitbucketCreds.txt
```


## Github

```yaml
artifacts:
  github:
    enabled: true
    accounts:
      - name: github-account-name
        username: armory-bot
        password: supersecretpassword
        # usernamePasswordFile should only be used if username and password are not used
        usernamePasswordFile: /passwords/githubCreds.txt
        # token can be used instead of a username/password
        token: personalAccessToken
        # tokenFile can be used instead of a token or username/password
        tokenFile: /passwords/githubToken.txt
```

## Gitlab

```yaml
artifacts:
  gitlab:
    enabled: true
    accounts:
      - name: gitlab-account-name
        token: gitlabApiToken
        # tokenFile can be used instead of a token
        tokenFile: /passwords/gitlabToken.txt
```

## GCS

```yaml
artifacts:
  gcs:
    enabled: true
    accounts:
      - name: gcs-account
        # optional, jsonPath is the path to GCP credentials file
        jsonPath: /passwords/gcpServiceAccount.json
```

## S3

```yaml
artifacts:
  s3:
    enabled: true
    accounts:
      - name: s3-account
        # if using AWS S3, use the region where your bucket lives
        region: us-west-2
        # apiEndpoint and apiRegion are used if you're using Minio or another S3 compatible solution
        apiEndpoint: https://my-minio:9000
        apiRegion: us-east-1
```

## HTTP

```yaml
artifacts:
  http:
    enabled: true
    accounts:
      - name: http-account-name
        username: armory-bot
        password: supersecretpassword
        # usernamePasswordFile should only be used if username and password are not used
        usernamePasswordFile: /passwords/httpCreds.txt
```
