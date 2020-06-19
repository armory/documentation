---
layout: post
title: Installing from the AWS Container Marketplace
order: 99
redirect_from:
  - /spinnaker/aws_container_marketplace/
published: true
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

Spinnaker Operator is a Kubernetes Operator that makes it easier to install, deploy, and upgrade Armory Spinnaker.

The AWS Container Marketplace offering for Spinnaker Operator will install the Armory Spinnaker Operator in an EKS cluster.

Spinnaker can be installed in any namespace in your EKS cluster; this document assumes that Spinnaker will be installed in the `spinnaker` namespace.

**_This document is intended only for users of the Armory AWS Container Marketplace offering that have purchased the offering._**

## Prerequisites

This document requires the following:

* An EKS cluster (Kubernetes 1.16 or above) configured with [IAM roles for service accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html)
* An ingress controller for your EKS cluster (documentation for using either the NGINX Ingress Controller or ALB Ingress Controller are included)
* `cluster-admin` access on the EKS cluster
* An AWS S3 bucket to store Spinnaker application and pipeline configuration

## Overview

This document covers the following high-level steps:

1. Creating and configuring the necessary AWS IAM roles for your Kubernetes cluster
1. Installing the Armory Spinnaker Custom Resource Definitions (CRDs) into your Kubernetes cluster
1. Installing the Armory Spinnaker Operator
1. Creating a SpinnakerService Custom Resource
1. Exposing your Spinnaker instance

## Installation

### Creating and configuring the necessary AWS IAM roles for your Kubernetes cluster

AWS IAM permissions will be granted to Spinnaker via the use of AWS's IAM roles for Kubernetes Service Accounts (this feature must be enabled at a cluster level).  You will create three IAM roles:
* An IAM role to be used by Operator (`spinnaker-operator` ServiceAccount in `spinnaker-operator` Namespace) that will have these permissions:
    * `aws-marketplace:RegisterUsage`
    * `s3:*` on your AWS Bucket
* An IAM role to be used by the Spinnaker Front50 service (`front50` ServiceAccount in `spinnaker` Namespace), that will have these permissions:
    * `s3:*` on your AWS Bucket
* An IAM role to be used by the Spinnaker Clouddriver service (`clouddriver` ServiceAccount in `spinnaker` Namespace).  It does not require any explicit permissions for now; if you want Spinnaker to deploy AWS resources (AWS EC2, AWS ECS, AWS Lambda, or other AWS EKS clusters), permissions for these can be added later.
    * _AWS permissions are **not** needed to deploy to the EKS cluster where Spinnaker is installed._

If you do not already have an AWS S3 bucket created, create one with these settings:

* Versioning turned on ("Keep all versions of an object in the same bucket")
* Default encryption turned on
* All public access blocked

You will end up with these three IAM roles:
* `arn:aws:iam::AWS_ACCOUNT_ID:role/eks-spinnaker-operator` granted to the Kubernetes Service Account `system:serviceaccount:spinnaker-operator:spinnaker-operator`
* `arn:aws:iam::AWS_ACCOUNT_ID:role/eks-spinnaker-front50` granted to the Kubernetes Service Account `system:serviceaccount:spinnaker:front50`
* `arn:aws:iam::AWS_ACCOUNT_ID:role/eks-spinnaker-clouddriver` granted to the Kubernetes Service Account `system:serviceaccount:spinnaker:clouddriver`


#### IAM Role for Operator Pod

Create an IAM role to be used by the Operator pod (call it `eks-spinnaker-operator`)

Grant it the AWS managed policy `AWSMarketplaceMeteringRegisterUsage`

Grant it an inline policy granting permissions on your S3 bucket (replace `BUCKET_NAME` with the name of your bucket):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
    "Effect": "Allow",
    "Action": "s3:*",
    "Resource": [
      "arn:aws:s3:::BUCKET_NAME",
      "arn:aws:s3:::BUCKET_NAME/*"
    ]
    }
  ]
}
```

For example:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
    "Effect": "Allow",
    "Action": "s3:*",
    "Resource": [
      "arn:aws:s3:::my-spinnaker-bucket",
      "arn:aws:s3:::my-spinnaker-bucket/*"
    ]
    }
  ]
}
```

Create this trust relationship on the IAM role; with these fields replaced:
* replace `AWS_ACCOUNT_ID` with your AWS account ID
* replace `OIDC_PROVIDER` with the "OpenID Connect provider URL" for your Kubernetes cluster (_with the `https://` removed_)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::AWS_ACCOUNT_ID:oidc-provider/OIDC_PROVIDER"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "OIDC_PROVIDER:sub": "system:serviceaccount:spinnaker-operator:spinnaker-operator"
        }
      }
    }
  ]
}
```

For example:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::111222333444:oidc-provider/oidc.eks.us-east-1.amazonaws.com/id/AAAABBBBCCCCDDDDEEEEFFFF00001111"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "oidc.eks.us-east-1.amazonaws.com/id/AAAABBBBCCCCDDDDEEEEFFFF00001111:sub": "system:serviceaccount:spinnaker-operator:spinnaker-operator"
        }
      }
    }
  ]
}
```

#### IAM Role for Front50 Pod

Create an IAM role to be used by the Operator pod (call it `eks-spinnaker-front50`)

Grant it an inline policy granting permissions on your S3 bucket (replace `BUCKET_NAME` with the name of your bucket):

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
    "Effect": "Allow",
    "Action": "s3:*",
    "Resource": [
      "arn:aws:s3:::BUCKET_NAME",
      "arn:aws:s3:::BUCKET_NAME/*"
    ]
    }
  ]
}
```

For example:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
    "Effect": "Allow",
    "Action": "s3:*",
    "Resource": [
      "arn:aws:s3:::my-spinnaker-bucket",
      "arn:aws:s3:::my-spinnaker-bucket/*"
    ]
    }
  ]
}
```

Create this trust relationship on the IAM role; with these fields replaced:
* replace `AWS_ACCOUNT_ID` with your AWS account ID
* replace `OIDC_PROVIDER` with the "OpenID Connect provider URL" for your Kubernetes cluster (_with the `https://` removed_)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::AWS_ACCOUNT_ID:oidc-provider/OIDC_PROVIDER"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "OIDC_PROVIDER:sub": "system:serviceaccount:spinnaker:front50"
        }
      }
    }
  ]
}
```

For example:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::111222333444:oidc-provider/oidc.eks.us-east-1.amazonaws.com/id/AAAABBBBCCCCDDDDEEEEFFFF00001111"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "oidc.eks.us-east-1.amazonaws.com/id/AAAABBBBCCCCDDDDEEEEFFFF00001111:sub": "system:serviceaccount:spinnaker:front50"
        }
      }
    }
  ]
}
```



#### IAM Role for Clouddriver Pod

Create an IAM role to be used by the Operator pod (call it `eks-spinnaker-clouddriver`)

It will not need explicit AWS permissions (for now).

Create this trust relationship on the IAM role; with these fields replaced:
* replace `AWS_ACCOUNT_ID` with your AWS account ID
* replace `OIDC_PROVIDER` with the "OpenID Connect provider URL" for your Kubernetes cluster (_with the `https://` removed_)

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::AWS_ACCOUNT_ID:oidc-provider/OIDC_PROVIDER"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "OIDC_PROVIDER:sub": "system:serviceaccount:spinnaker:clouddriver"
        }
      }
    }
  ]
}
```

For example:

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "Federated": "arn:aws:iam::111222333444:oidc-provider/oidc.eks.us-east-1.amazonaws.com/id/AAAABBBBCCCCDDDDEEEEFFFF00001111"
      },
      "Action": "sts:AssumeRoleWithWebIdentity",
      "Condition": {
        "StringEquals": {
          "oidc.eks.us-east-1.amazonaws.com/id/AAAABBBBCCCCDDDDEEEEFFFF00001111:sub": "system:serviceaccount:spinnaker:clouddriver"
        }
      }
    }
  ]
}
```

### Installing the Armory Spinnaker Custom Resource Definitions (CRDs) into your Kubernetes cluster 

Download the Kubernetes manifest for Operator, and install them into your Kubernetes cluster:

```bash
mkdir -p spinnaker-operator && cd spinnaker-operator
bash -c 'curl -L https://github.com/armory/marketplace/releases/latest/download/marketplace.tgz | tar -xz'

# Install or update CRDs cluster wide
kubectl apply -f manifests/crds/
```

### Installing the Armory Spinnaker Operator

The manifest for the Armory Spinnaker Operator has to be updated with this:
* `AWS_ACCOUNT_ID` (in the ServiceAccount annotation) has to be updated with your account ID, so the ServiceAccount can accesss your AWS IAM roles

```bash
export AWS_ACCOUNT_ID=111122223333

sed -i.bak "s|AWS_ACCOUNT_ID|${AWS_ACCOUNT_ID}|g" manifests/operator/ServiceAccount.yaml
rm manifests/operator/ServiceAccount.yaml.bak

# Install the operator
kubectl apply -f manifests/operator
```

It may take a little bit of time for the Operator to come up.  You can monitor its status by running this command:

```bash
kubectl -n spinnaker-operator get pod -owide
```

You're looking for the Deployment to be completely up (READY of `2/2` and STATUS of `Running`)

### Creating a SpinnakerService Custom Resource

The manifest for the SpinnakerService object needs to be updated with these:
* `AWS_ACCOUNT_ID` (in both ServiceAccount annotations) has to be updated with your account ID, so the ServiceAccount can accesss your AWS IAM roles
* `BUCKET_NAME` (in the SpinnakerService) needs to be updated with the name of your AWS S3 Bucket

```bash
export AWS_ACCOUNT_ID=111122223333
export BUCKET_NAME=my-spinnaker-bucket

sed -i.bak "s|AWS_ACCOUNT_ID|${AWS_ACCOUNT_ID}|g" manifests/spinnaker/ServiceAccount-clouddriver.yaml
sed -i.bak "s|AWS_ACCOUNT_ID|${AWS_ACCOUNT_ID}|g" manifests/spinnaker/ServiceAccount-front50.yaml
rm manifests/spinnaker/ServiceAccount-clouddriver.yaml.bak
rm manifests/spinnaker/ServiceAccount-front50.yaml.bak

sed -i.bak "s|BUCKET_NAME|${BUCKET_NAME}|g" manifests/spinnaker/SpinnakerService.yaml
rm manifests/spinnaker/SpinnakerService.yaml.bak

# Install the operator
kubectl apply -f manifests/spinnaker
```

If everything is configured properly, the Spinnaker Operator should see the SpinnakerService custom resource, and start creating Kubernetes Deployments, ServiceAccounts, and Secrets in the `spinnaker` Namespace.  You can monitor this with the following:

```bash
kubectl -n spinnaker get all -owide
```

### Exposing your Spinnaker instance

Once your Spinnaker instance is up and running, you need to configure it so that it is accessible.  There are two main parts to this:

1. Expose the `spin-deck` and `spin-gate` services so that they can be reached by your end users (and client services)
1. Configure Spinnaker so that it knows about the endpoints it is exposed on

