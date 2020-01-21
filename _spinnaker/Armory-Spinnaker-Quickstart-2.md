---
layout: post
title: AWS QuickStart Step 2
order: 2
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Armory Spinnaker AWS Quickstart - Step 2 
# Configure Spinnaker AWS Provider

![No CREATE Permission](/images/AWS-Deploy-Spinnaker.png)

### Adding AWS Role to Spinnaker through Halyard configuration.  Note AWS account name is within Spinnaker and will appear in UI ###

*NOTE* you **MUST** configure the regions that Spinnaker can deploy to in the hal command below

The Account name is arbitrary and should be a name that is an identifiable.  The Name will become visable in Spinnaker UI.  The example account here is "aws-dev-1".

1. Set environment variables for halyard command.
```code
export AWS_ACCOUNT_NAME=aws-dev-1 \
export ACCOUNT_ID=[YOUR_ACCOUNT_ID] \
export ROLE_NAME=role/Spinnaker-Managed-Role
```
2. Run Halyard command to configure AWS Provider with an Account in Spinnaker.

```code
hal config provider aws account add ${AWS_ACCOUNT_NAME} \
    --account-id ${ACCOUNT_ID} \
    --assume-role ${ROLE_NAME} \
    --regions us-east-1,us-west-2
```

```code
hal config provider aws enable
```

```code
hal config provider ecs account add ecs-account-name --aws-account aws-dev-1
```

```code
hal config provider ecs enable
```

```code
hal deploy apply
```

### Tag AWS Subnets for Spinnaker Auto Discovery

3. AWS Subnet tagging if subnets do not appear in Spinnaker UI.  "example-purpose" should be a descriptor of the subnet and will appear in the Spinnaker UI dropdown.

For more information here is the Armory documentation on tagging Subnets

https://docs.armory.io/spinnaker-install-admin-guides/aws-subnets/

```code
Key                 Value
immutable_metadata  {"purpose":"example-purpose"}
```
 Example: immutable_metadata {"purpose":"**us-west-2-dev-subnet**"}

***Note*** Do not change "purpose", and YOUR subnet identifier should replace "example-purpose".  This will show up in Spinnaker UI as dropdown options. 


# NEXT: Connect Spinnaker to Amazon EKS cluster

![No CREATE Permission](/images/Spinnaker-to-EKS.png)

## Prerequisities for Creating Service Account

This process should be run from your local workstation, *not from the Minnaker VM*.  You must have access to the Kubernetes cluster you would like to deploy to, and you need cluster admin permissions on the Kubernetes cluster.

You should be able to run the following (again, from your local workstation, not the Minnaker VM).

```bash
kubectl get ns
```

You should also be able to copy files from your local workstation to the Minnaker VM.

## Using `spinnaker-tools`

On your local workstation (where you currently have access to Kubernetes), download the spinnaker-tools binary:

If you're on a Mac:

```bash
curl -L https://github.com/armory/spinnaker-tools/releases/download/0.0.7/spinnaker-tools-darwin -o spinnaker-tools
chmod +x spinnaker-tools
```

If you're on Linux:

```bash
curl -L https://github.com/armory/spinnaker-tools/releases/download/0.0.7/spinnaker-tools-linux -o spinnaker-tools
chmod +x spinnaker-tools
```

Then, run it:

```bash
./spinnaker-tools create-service-account
```

This will prompt for the following:
* Select the Kubernetes cluster to deploy to (this helps if you have multiple Kubernetes clusters configured in your local kubeconfig)
* Select the namespace (choose the `kube-system` namespace, or select some other namespace or select the option to create a new namespace).  This is the namespace that the Kubernetes ServiceAccount will be created in.
* Enter a name for the service account.  You can use the default `spinnaker-service-account`, or enter a new (unique) name.
* Enter a name for the output file.  You can use the default `kubeconfig-sa`, or you can enter a unique name.  You should use something that identifies the Kubernetes cluster you are deploying to (for example, if you are setting up Spinnaker to deploy to your us-west-2 dev cluster, then you could do something like `kubeconfig-us-west-2-dev`)

This will create the service account (and namespace, if applicable), and the ClusterRoleBinding, then create the kubeconfig file with the specified name.

Copy this file from your local workstation to your Minnaker VM.  You can use scp or some other copy mechanism.

## Add the kubeconfig to Spinnaker's Halyard Configuration

On the Minnaker VM, move or copy the file to `/etc/spinnaker/.hal/.secret` (make sure you are creating a new file, not overwriting an existing one).

Then, run this command:

```bash
hal config provider kubernetes account add kubeconfig-sa-eks \
  --provider-version v2 \
  --kubeconfig-file /home/spinnaker/.hal/.secret/kubeconfig-sa-eks \
  --only-spinnaker-managed true
```

Note two things:
* Replace us-west-2-dev with something that identifies your Kubernetes cluster
* Update the `--kubeconfig-file` path with the correct filename.  Note that the path will be `/home/spinnaker/...` **not** `/etc/spinnaker/...` - this is because this command will be run inside the Halyard container, which has local volumes mounted into it.

## Apply your changes

Run this command to apply your changes to Spinnaker:

```bash
hal deploy apply --wait-for-completion
```

## Congratulations!  
You have configured the Spinnaker AWS Provider and Kubernetes Account for EKS.  You can now deploy to EC2, ECS, Fargate, and EKS.  Lets build some pipelines in Step 3 (Your final step) here.

[![alt text](/images/Armory-AWS-Step-2.png)](https://youtu.be/epKXV2FIm6Y "title")
