---
layout: post
title: Installing Spinnaker in EKS - Prereqs
order: 0
# Change this to true
published: false
redirect_from:
  - /spinnaker_install_admin_guides/install_on_eks_prereqs/
  - /spinnaker_install_admin_guides/install-on-eks-prereqs/
  - /spinnaker-install-admin-guides/install_on_eks_prereqs/
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

The basic prerequisites to get Spinnaker up and running are the following:

* A Kubernetes cluster, which is where the microservices that make up Spinnaker live
* An S3 bucket (or similar object storage system), which is used by the `front50` service to store Spinnaker pipeline configurations

There are many ways to stand up these infrastucture components.  This document describes one way to set up these infrastructure components in Amazon Web Services (AWS).

## Prerequities / Environments

This document assumes the following:

* You have a workstation configured with the `aws` Amazon CLI tool and credentials to create AWS resources.

This document will create the following:
* Two AWS roles:
    * One role which will be attached to the EKS control plane
    * One role which will be attached to the EKS worker nodes
* One AWS VPC, with the following:
    * Three subnets
    * A Internet Gateway (IGW)
    * Routing for the subnets to use the IGW to get to the internet
* Two Security Groups:
    * One Security Group which will be attached to the EKS control plane
    * One Security Group which will be attached to the EKS worker nodes
    * 

## EKS Cluster Creation

Choose a unique name for the EKS Cluster:

```bash
CLUSTER_NAME=spinnaker-eks-cluster

# Role attached to cluster control plane
EKS_ROLE=${CLUSTER_NAME}-eksrole

# Name for stacks
CF_VPC_STACK_NAME=${CLUSTER_NAME}-vpc
CF_NODE_STACK_NAME=${CLUSTER_NAME}-nodes
CF_NODE_STACK_NAME_PARAMETERS=${CF_NODE_STACK_NAME}-parameters.json

tee assume-role-policy-document.json <<-'EOF'
{
  "Version": "2012-10-17",
  "Statement": [
      {
          "Effect": "Allow",
          "Principal": {
              "Service": "eks.amazonaws.com"
          },
          "Action": "sts:AssumeRole"
      }
  ]
}
EOF

# Create the cluster control plane role
aws iam create-role --role-name ${EKS_ROLE} \
  --assume-role-policy-document file://assume-role-policy-document.json

# Attach two policies to the role:
# * AmazonEKSServicePolicy
# * AmazonEKSClusterPolicy
aws iam attach-role-policy \
  --role-name ${EKS_ROLE} \
  --policy-arn arn:aws:iam::aws:policy/AmazonEKSServicePolicy

aws iam attach-role-policy \
  --role-name ${EKS_ROLE} \
  --policy-arn arn:aws:iam::aws:policy/AmazonEKSClusterPolicy

# This Amazon-provided CF template will create these objects:
# * VPC
# * IGW
# * IGW/VPC attachment
# * RouteTable
# * Route (to IGW)
# * Route to table attachment
# * 3 Subnets
# * 3 Subnets attached to Route Table
# * Security Group "cluster control plane, used for communication with worker nodes" - used to identify control plane
aws cloudformation create-stack \
  --stack-name ${CF_VPC_STACK_NAME} \
  --template-url https://amazon-eks.s3-us-west-2.amazonaws.com/cloudformation/2019-01-09/amazon-eks-vpc-sample.yaml

# Wait for the stack to be completely created
aws cloudformation wait stack-create-complete \
  --stack-name ${CF_VPC_STACK_NAME}

# Gather information from the VPC to create the EKS cluster:
STACK_VPC=$(aws cloudformation describe-stacks \
    --stack-name ${CF_VPC_STACK_NAME} \
    --query 'Stacks[0].Outputs[?OutputKey==`VpcId`].OutputValue' \
    --output text)

# Subnets for EKS nodes
STACK_SUBNETS=$(aws cloudformation describe-stacks \
    --stack-name ${CF_VPC_STACK_NAME} \
    --query 'Stacks[0].Outputs[?OutputKey==`SubnetIds`].OutputValue' \
    --output text)

# Security group attached to cluster control plane
STACK_CONTROL_PLANE_SECURITY_GROUP=$(aws cloudformation describe-stacks \
    --stack-name ${CF_VPC_STACK_NAME} \
    --query 'Stacks[0].Outputs[?OutputKey==`SecurityGroups`].OutputValue' \
    --output text)

# Get the role attached to be attached to the EKS cluster (attached to the control plane)
ROLE_ARN=$(aws iam get-role \
    --role-name ${EKS_ROLE} \
    --query 'Role.Arn' \
    --output text)

# Create the EKS cluster
aws eks create-cluster \
    --name ${CLUSTER_NAME} \
    --role-arn ${ROLE_ARN} \
    --resources-vpc-config subnetIds=${STACK_SUBNETS},securityGroupIds=${STACK_CONTROL_PLANE_SECURITY_GROUP}


```