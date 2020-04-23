---
layout: post
title: AWS QuickStart Step 2
order: 3
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

Need help setting this up? - For a guided tutorial, see the **Video Walkthrough** at the bottom of this page.

## Prerequisites
Before you start, ensure that have completed the following requirements:
* Finish [AWS QuickStart Step 1](/spinnaker/Armory-Spinnaker-Quickstart-1).
* Have access to the Kubernetes cluster you would like to deploy to, and you need cluster admin permissions on that Kubernetes cluster.
* Have `kubectl` installed on your local workstation have the context set to the EKS cluster you want to deploy to.

    Running the following command from your local machine should return the namespaces for the EKS cluster you want to deploy to.

  ```bash
  kubectl get ns
  ```

* Have a way to copy files from your local workstation to the Minnaker VM, such as `scp`.


# First: Configure the AWS Provider for Spinnaker

![No CREATE Permission](/images/AWS-Deploy-Spinnaker.png)

### Adding AWS Role to Spinnaker through Halyard configuration.  Note AWS account name is within Spinnaker and will appear in UI ###

**NOTE**: You **MUST** configure the regions that Spinnaker can deploy to in the `hal` command below.

The Account name is arbitrary and should be a name that is an identifiable.  The name is visable in Spinnaker UI.  The following examples use `aws-dev-1`.

1. Set environment variables for halyard command:
   
   ```bash 
   export AWS_ACCOUNT_NAME=aws-dev-1 \
   export ACCOUNT_ID=[YOUR_ACCOUNT_ID] \
   export ROLE_NAME=role/Spinnaker-Managed-Role
   ```

2. Add the AWS provider account to Spinnaker:

   ```bash
   hal config provider aws account add ${AWS_ACCOUNT_NAME} \
     --account-id ${ACCOUNT_ID} \
     --assume-role ${ROLE_NAME} \
     --regions us-east-1,us-west-2
   ```

3. Enable the AWS provider:
   
   ```bash
   hal config provider aws enable
   ```

4. Add an account to the ECS provider:
   
   ```bash
   hal config provider ecs account add ecs-account-name --aws-account aws-dev-1
   ```

5. Enable the ECS provider:
   
   ```bash
   hal config provider ecs enable
   ```

6. Apply the new configurations and redeploy Spinnaker:
   
   ```bash
   hal deploy apply
   ```

### Tag AWS Subnets for Spinnaker Auto Discovery

If subnets do not appear in Deck (the Spinnaker UI), perform AWS Subnet tagging.  "example-purpose" should be a descriptor of the subnet and will appear in the Spinnaker UI dropdown.

For more information about AWS Subnet tagging, see [AWS: Configuring AWS Networking](/spinnaker-install-admin-guides/aws-subnets/).

```
Key                 Value
immutable_metadata  {"purpose":"example-purpose"}
```

* Replace `example-purpose` with your subnet identifier. The subnet shows up in Deck as a dropdown option.

**Example:**

* Key: `immutable_metadata`
* Value: `{"purpose":"us-west-2-dev-subnet"}`

# Second: Connect Spinnaker to an Amazon EKS cluster

For the tasks in this section, complete them on your local workstation, *not from the Minnaker VM*. 

![No CREATE Permission](/images/Spinnaker-to-EKS.png)

## Using spinnaker-tools

spinnaker-tools is a wrapper that performs a series of `kubectl` commands for you to automate creating a service account.

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

Provide the following information:
* Select the Kubernetes cluster to deploy to (this helps if you have multiple Kubernetes clusters configured in your local kubeconfig)
* Select the namespace (choose the `kube-system` namespace, or select some other namespace or select the option to create a new namespace).  This is the namespace that the Kubernetes ServiceAccount will be created in.
* Enter a name for the service account.  You can use the default `spinnaker-service-account`, or enter a new (unique) name.
* Enter a name for the output file.  You can use the default `kubeconfig-sa`, or you can enter a unique name.  You should use something that identifies the Kubernetes cluster you are deploying to (for example, if you are setting up Spinnaker to deploy to your us-west-2 dev cluster, then you could do something like `kubeconfig-us-west-2-dev`)

`spinnaker-tools` uses this information to create the service account (and namespace, if applicable) and the ClusterRoleBinding. It then creates the kubeconfig file with the specified name.

Copy this file from your local workstation to your Minnaker VM.  You can use `scp` or some other copy mechanism.

## Add the kubeconfig to Spinnaker's Halyard configuration

On the Minnaker VM, move or copy the file to `/etc/spinnaker/.hal/.secret`. Make sure you are creating a new file, not overwriting an existing one.

Then, run this command:

```bash
hal config provider kubernetes account add kubeconfig-sa-eks \
  --provider-version v2 \
  --kubeconfig-file /home/spinnaker/.hal/.secret/kubeconfig-sa-eks \
  --only-spinnaker-managed true
```

Note:
* Update the `--kubeconfig-file` path with the correct filename.  Note that the path will be `/home/spinnaker/...` **not** `/etc/spinnaker/...`. This is because this command runs inside the Halyard container, which has local volumes mounted into it.

## Apply your changes

Run this command to apply your changes to Spinnaker:

```bash
hal deploy apply --wait-for-completion
```

## Congratulations!  
You have configured the Spinnaker AWS Provider and Kubernetes Account for EKS.  You can now deploy to EC2, ECS, Fargate, and EKS.  Lets build some pipelines in [AWS QuickStart Step 3](/spinnaker/Armory-Spinnaker-Quickstart-3).

# AWS QuickStart Step 2 Video
<!-- blank line -->
<figure class="video_container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/XBdc0z-xdS0" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</figure>
<!-- blank line -->