---
layout: post
# title: Installation from AWS Container Marketplace
order: 99
redirect_from:
  - /spinnaker/aws_container_marketplace/
published: true
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Overview

**_This is a placeholder document, and will be updated once the Armory Spinnaker AWS Container Marketplace offering has been published._**

Spinnaker Operator is a Kubernetes Operator that makes it easier to install, deploy, and upgrade Armory Spinnaker.

The AWS Container Marketplace offering for Spinnaker Operator will install the Armory Spinnaker Operator in an EKS cluster.

Spinnaker can be installed in any namespace in your EKS cluster; this document assumes that Spinnaker will be installed in the `spinnaker` namespace.

**_This document is intended only for users of the Armory AWS Container Marketplace offering that have purchased the offering._**

## Prerequisites

This document requires the following:

* An EKS cluster (Kubernetes 1.16 or above) configured with [IAM roles for service accounts](https://docs.aws.amazon.com/eks/latest/userguide/iam-roles-for-service-accounts.html)
* An ingress controller for your EKS cluster (documentation for using either the NGINX Ingress Controller or ALB Ingress Controller are included)
* `cluster-admin` access on the EKS cluster (and/or access to the `system:master` group in the EKS cluster)
* An AWS S3 bucket to store Spinnaker application and pipeline configuration

In addition, Spinnaker will need the following permissions, configured via IAM roles attached to Kuberrnetes service accounts:

* An IAM role to be used by Operator, that needs these permissions:
    * `aws-marketplace:RegisterUsage`
    * `s3:*` on your AWS Bucket
* An IAM role to be used by the Spinnaker Front50 service, that needs these permissions:
    * `s3:*` on your AWS Bucket

## Steps

1. Create and configure the necessary IAM roles in your Kubernetes cluster
1. Install the Armory Spinnaker Custom Resource Definitions (CRDs) into your Kubernetes cluster
1. Install the Armory Spinnaker Operator
1. Create a SpinnakerService Custom Resource
1. Expose your Spinnaker instance

