---
layout: post
title: Installing Spinnaker in EKS - Prereqs
order: 21
# Change this to true
published: false
redirect_from:
  - /spinnaker_install_admin_guides/install_on_eks/
  - /spinnaker_install_admin_guides/install-on-eks/
  - /spinnaker-install-admin-guides/install_on_eks/
---

***

# This is a WIP - do not publish

***

### Create the VPC and Subnets for EKS
And EKS cluster will be built
This creates a minimal EKS cluster in your default region and zone.  Follow the official EKS instructions to set more complex type of EKS cluster.

Run this command to create the GKE cluster (from the `workstation machine`):
```bash
STACK_NAME
aws cloudformation create-stack --stack
```

Run this command to configure `kubectl` to use the cluster you've created:
```bash
gcloud container clusters get-credentials spinnaker-cluster
```

Alternately, if you're using a pre-existing GKE cluster:
```bash
gcloud ccontainer clusters get-credentials <your-cluster-name>
```

(Feel free to use a different region and zones)

```bash
CLUSTER_NAME=jlee-kubernetes-eks-deleteafter20190210

# Role attached to cluster control plane
EKS_ROLE=${CLUSTER_NAME}-eksrole

# CF_STACK_NAME=jlee-kubernetes-eks-deleteafter20190210
# ROLE_NAME=jlee-kubernetes-eks-deleteafter20190210-assumerole
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

aws iam create-role --role-name ${EKS_ROLE} \
  --assume-role-policy-document file://assume-role-policy-document.json

aws iam attach-role-policy \
  --role-name ${EKS_ROLE} \
  --policy-arn arn:aws:iam::aws:policy/AmazonEKSServicePolicy

aws iam attach-role-policy \
  --role-name ${EKS_ROLE} \
  --policy-arn arn:aws:iam::aws:policy/AmazonEKSClusterPolicy

### Role for control plane:
# * Trusts eks.amazonaws.com
# * Has these two permissions:
#   * AmazonEKSClusterPolicy
#   * AmazonEKSServicePolicy

aws cloudformation create-stack \
  --stack-name ${CF_VPC_STACK_NAME} \
  --template-url https://amazon-eks.s3-us-west-2.amazonaws.com/cloudformation/2019-01-09/amazon-eks-vpc-sample.yaml

### Creates the following:
# * VPC
# * IGW
# * IGW/VPC attachment
# * RouteTable
# * Route (to IGW)
# * Route to table attachment
# * 3 Subnets
# * 3 Subnets attached to Route Table
# * Security Group "cluster control plane, used for communication with worker nodes" - used to identify control plane

aws cloudformation wait stack-create-complete \
  --stack-name ${CF_VPC_STACK_NAME}

# VPC for EKS nodes
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

# Get the role attached to be attached to the EKS cluster (used to interact with control plane? or something?)
ROLE_ARN=$(aws iam get-role \
    --role-name ${EKS_ROLE} \
    --query 'Role.Arn' \
    --output text)

aws eks create-cluster \
    --name ${CLUSTER_NAME} \
    --role-arn ${ROLE_ARN} \
    --resources-vpc-config subnetIds=${STACK_SUBNETS},securityGroupIds=${STACK_CONTROL_PLANE_SECURITY_GROUP}

### Lives in VPC
# * Knows about subnets
# * Has security group attached to control plane

aws eks update-kubeconfig \
  --name ${CLUSTER_NAME}

tee ${CF_NODE_STACK_NAME_PARAMETERS}.template <<-'EOF'
[
  {
    "ParameterKey": "KeyName",
    "ParameterValue": "KEY_NAME"
  },
  {
    "ParameterKey": "NodeImageId",
    "ParameterValue": "NODE_AMI_ID"
  },
  {
    "ParameterKey": "NodeInstanceType",
    "ParameterValue": "t3.medium"
  },
  {
    "ParameterKey": "NodeAutoScalingGroupMinSize",
    "ParameterValue": "1"
  },
  {
    "ParameterKey": "NodeAutoScalingGroupMaxSize",
    "ParameterValue": "5"
  },
  {
    "ParameterKey": "NodeAutoScalingGroupDesiredCapacity",
    "ParameterValue": "3"
  },
  {
    "ParameterKey": "NodeVolumeSize",
    "ParameterValue": "20"
  },
  {
    "ParameterKey": "ClusterName",
    "ParameterValue": "CLUSTER_NAME"
  },
  {
    "ParameterKey": "NodeGroupName",
    "ParameterValue": "NODE_GROUP_NAME"
  },
  {
    "ParameterKey": "ClusterControlPlaneSecurityGroup",
    "ParameterValue": "STACK_CONTROL_PLANE_SECURITY_GROUP"
  },
  {
    "ParameterKey": "VpcId",
    "ParameterValue": "STACK_VPC"
  },
  {
    "ParameterKey": "Subnets",
    "ParameterValue": "STACK_SUBNETS"
  }
]
EOF

sed -e "s|KEY_NAME|justin-armory-dev|g" \
  -e "s|NODE_AMI_ID|ami-0a2abab4107669c1b|g" \
  -e "s|CLUSTER_NAME|${CLUSTER_NAME}|g" \
  -e "s|NODE_GROUP_NAME|${CLUSTER_NAME}-nodes|g" \
  -e "s|STACK_CONTROL_PLANE_SECURITY_GROUP|${STACK_CONTROL_PLANE_SECURITY_GROUP}|g" \
  -e "s|STACK_VPC|${STACK_VPC}|g" \
  -e "s|STACK_SUBNETS|${STACK_SUBNETS}|g" \
  ${CF_NODE_STACK_NAME_PARAMETERS}.template > ${CF_NODE_STACK_NAME_PARAMETERS}

aws cloudformation create-stack \
  --stack-name ${CF_NODE_STACK_NAME} \
  --template-url https://amazon-eks.s3-us-west-2.amazonaws.com/cloudformation/2019-01-09/amazon-eks-nodegroup.yaml \
  --parameters file://${CF_NODE_STACK_NAME_PARAMETERS} \
  --capabilities CAPABILITY_IAM

aws cloudformation wait stack-create-complete \
  --stack-name ${CF_NODE_STACK_NAME}

### Creates the following:
# * Launch config
# * ASG
# * Security Group with following permissions:
#   * All inbound from itself
#   * 443 and 1025-65535 from cluster control plane security group
# * Attach SG to Launch Config
# * Also modifies cluster control plane SG as follows:
#   * Outbound to node SG (443 and 1025-65535)
#   * Inbound from node SG
# * IAM Role:
#   * Trusts ec2
#   * Has:
#     * AmazonEKSWorkerNodePolicy
#     * AmazonEC2ContainerRegistryReadOnly
#     * AmazonEKS_CNI_Policy
# * "Profile" attaching role to ASG instances (via LC)

curl -LO https://amazon-eks.s3-us-west-2.amazonaws.com/cloudformation/2019-01-09/aws-auth-cm.yaml
  # -o ${CLUSTER_NAME}-aws-auth-cm.yaml

NODE_INSTANCE_ROLE=$(aws cloudformation describe-stacks \
    --stack-name ${CF_NODE_STACK_NAME} \
    --query 'Stacks[0].Outputs[?OutputKey==`NodeInstanceRole`].OutputValue' \
    --output text)

sed "s|rolearn: .*|rolearn: ${NODE_INSTANCE_ROLE}|g" \
  aws-auth-cm.yaml > ${CLUSTER_NAME}-aws-auth-cm.yaml

kubectl apply -f ${CLUSTER_NAME}-aws-auth-cm.yaml

# # To add additional users, add this to the auth configmap:
#   mapUsers: |
#     - userarn: arn:aws:iam::555555555555:user/admin
#       username: admin
#       groups:
#         - system:masters
#     - userarn: arn:aws:iam::111122223333:user/ops-user
#       username: ops-user
#       groups:
#         - system:masters

# kubectl config rename-context $(kubectl config current-context) ${CLUSTER_NAME}


```