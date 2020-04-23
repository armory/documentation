---
layout: post
title: Installing Spinnaker in AWS
order: 22
published: true
redirect_from:
  - /spinnaker_install_admin_guides/install_on_eks/
  - /spinnaker_install_admin_guides/install-on-eks/
  - /spinnaker-install-admin-guides/install_on_eks/
  - /spinnaker-install-admin-guides/install-on-eks/
  - /spinnaker-install-admin-guides/install_on_aws/
  - /spinnaker_install_admin_guides/install_on_aws/
  - /spinnaker_install_admin_guides/install-on-aws/
---

This guide describes how to install Spinnaker in AWS or in an on-prem Kubernetes cluster with access to S3. It will create and use the following Amazon Web Services resources:

- A Kubernetes cluster running on Amazon Web Services (AWS). EKS is a good way to get a Kubernetes cluster up on AWS - see the AWS documentation for this.
- An Amazon S3 (Simple Storage Service) bucket. You can use an existing one or create a new one.
- An NGINX Ingress controller in your AWS cluster.

This document currently does not fully cover the following (see [Next Steps](#next-steps) for some links to achieve these)

- TLS Encryption
- Authentication/Authorization
- Add K8s accounts to deploy to
- Add cloud accounts to deploy to

Note: This document is focused on Armory Spinnaker, but can be adapted to install Open Source Spinnaker by using a different Halyard container and a corresponding different Spinnaker version

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Assumptions / Prerequisites / Environments

This document assumes the following:

- You have a Kubernetes cluster up and running, with the following:

  - You can access the Kubernetes API. If using EKS, either your user/role created the EKS cluster or your user/role has been added to the `aws-auth` configmap in the EKS cluster. See the [AWS documentation](https://docs.aws.amazon.com/eks/latest/userguide/add-user-role.html) for more details.
  - At least 2x worker nodes, each with at least 2 vCPUs and 4 GiB of memory. This is the bare minimum to install and run Spinnaker. If you're deploying more intermittent test workloads you will likely need more).

- You have access to an S3 bucket or access to create an S3 bucket

- You have access to an IAM role or user with access to the S3 bucket or can create an IAM role or user with access to the S3 bucket.

This document is written with the following workflow in mind:

- You have a machine (referred to as the `workstation machine` in this document) configured to use the `aws` CLI tool and a recent version of `kubectl` tool
- You have a machine (referred to as the `Halyard machine` in this document) with the Docker daemon installed, and can run Docker containers on it
- You can transfer files created on the `workstation machine` to the `Halyard machine` (to a directory mounted on a running Docker container)
- These two machines can be the same machine

Furthermore:

On the `Halyard machine`:

- Halyard (the tool used to install and manage Spinnaker) is run in a Docker container on the `Halyard machine`
- The Halyard container on the `Halyard machine` will be configured with the following volume mounts, which should be persisted or preserved to manage your Spinnaker cluster

  - `.hal` directory (mounted to `/home/spinnaker/.hal`) - stores all Halyard Spinnaker configurations in a `.hal/config` YAML file and assorted subdirectories
  - `.secret` directory (mounted to `/home/spinnaker/.secret`) stores all external secret keys and files used by Halyard
  - `resources` directory (mounted to `/home/spinnaker/resources`) stores all Kubernetes manifests and other resources that help create Kubernetes resources

- You will create `kubeconfig` files that will be added to the `.secret` directory

Note: If you are not using the Halyard Docker container, but sure to install `kubectl` before you install Halyard. Otherwise you will have to restart the Halyard daemon in order for `hal` to find `kubectl` in your `$PATH`. Execute `hal shutdown` and then any `hal` command to start the daemon.

On the `workstation machine`:

- If using EKS, you can use the `aws` CLI tool to interact with the AWS API and configure/communicate with the following:

  - EKS clusters (or, alternately, have a EKS cluster already built)
  - S3 buckets (or, alternately, have an S3 bucket already built)

- You have the `kubectl` (Kubernetes CLI tool) installed and are able to use it to interact with your Kubernetes cluster

- You have a persistent working directory in which to work in. One option here is `~/aws-spinnaker`

- You will create AWS resources, such as service accounts, that will be permanently associated with your Spinnaker cluster

# Installation Summary

In order to install Spinnaker, this document covers the following things:

- Generating a `kubeconfig` file, which is a Kubernetes credential file that Halyard and Spinnaker will use to communicate with the Kubernetes cluster where Spinnaker will be installed
- Creating an S3 bucket for Spinnaker to store persistent configuration in
- Creating an IAM user that Spinnaker will use to access the S3 bucket
- Running the Halyard daemon in a Docker container

  - Persistent configuration directories from the workstation/host will be mounted into the container

- Running the `hal` client interactively in the same Docker container, to:

  - Build out the halconfig YAML file (`.hal/config`)
  - Configure Spinnaker/Halyard to use `kubeconfig` to install Spinnaker
  - Configure Spinnaker with the IAM credentials and bucket information
  - Turn on other recommended settings (artifacts and http artifact provider)
  - Install Spinnaker
  - Expose Spinnaker

# Connect to the Kubernetes cluster

Spinnaker needs a credential to talk to Kubernetes, so you must create a service account in your Kubernetes cluster.

## Connecting to an EKS cluster

If you're using an EKS cluster, you must be able to connect to the EKS cluster. This assumes you have already configured the `aws` CLI with credentials and a default region / availability zone (see installation directions [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html) and configuration directions [here](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html))

1. Create the local working directory on your workstation. For the purposes of this document, we will be using `~/aws-spinnaker`, but this can be any persistent directory on any Linux or OSX machine.

   ```bash
   mkdir ~/aws-spinnaker
   cd ~/aws-spinnaker
   ```

2. If you have access to the role that created the EKS cluster, you can create a kubeconfig with access to your Kubernetes cluster with this command:

   ```bash
   aws eks update-kubeconfig --name <EKS_CLUSTER_NAME> --kubeconfig kubeconfig-aws
   ```

3. From here, you can validate access to the cluster with this command:

   ```bash
   kubectl --kubeconfig kubeconfig-aws get namespaces
   ```

## Connecting to other Kubernetes clusters

If you've stood up Kubernetes on AWS with KOPS or another Kubernetes tool, ensure that you can communicate with your Kubernetes cluster with kubectl.

Then, copy your `kubeconfig` file (this is typically located in `~/.kube/config`) to your working directory:

```bash
cp ~/.kube/config ~/aws-spinnaker/kubeconfig-aws
```

# Create a `kubeconfig` file for Halyard/Spinnaker

Spinnaker will be installed in its own namespace in your EKS or AWS-hosted Kubernetes cluster. For the purposes of this document, we will be installing Spinnaker in the `spinnaker-system` namespace; you're welcome to use a different namespace for this.

We're going to create the following:

- A namespace called `spinnaker-system` to install Spinnaker in
- A service account for that namespace
- A role and rolebinding in that namespace, granting permissions to the service account
- A kubeconfig containing credentials for the service account

This document uses the Armory `spinnaker-tools` Go CLI (available on [Github](https://github.com/armory/spinnaker-tools)) to create many of these resources. There are separate instructions to perform these steps manually.

Halyard uses this Kubeconfig file to create the Kubernetes deployment objects that create the microservices that compose Spinnaker. This same Kubeconfig is passed to Spinnaker so that Spinnaker can see and manage its own resources.

1. Obtain the `spinnaker-tools` CLI tool. Go to <https://github.com/armory/spinnaker-tools/releases>, and download the latest release for your operating system (OSX and Linux available). You can also use curl:

   ```bash
   # If you're not already in the directory
   cd ~/aws-spinnaker
   # If you're on Linux instead of OSX, use this URL instead:
   # https://github.com/armory/spinnaker-tools/releases/download/0.0.6/spinnaker-tools-linux
   curl -L https://github.com/armory/spinnaker-tools/releases/download/0.0.6/spinnaker-tools-darwin -o spinnaker-tools
   chmod +x spinnaker-tools
   ```

2. Run the tool. Feel free to substitute other values for the parameters:

   ```bash
   # The 'aws eks update-kubeconfig' command from above will create/update this file
   SOURCE_KUBECONFIG=kubeconfig-aws
   # Get the name of the context created by the aws tool)
   CONTEXT=$(kubectl --kubeconfig ${SOURCE_KUBECONFIG} config current-context)
   DEST_KUBECONFIG=kubeconfig-spinnaker-system-sa
   SPINNAKER_NAMESPACE=spinnaker-system
   SPINNAKER_SERVICE_ACCOUNT_NAME=spinnaker-service-account

   ./spinnaker-tools create-service-account \
     --kubeconfig ${SOURCE_KUBECONFIG} \
     --context ${CONTEXT} \
     --output ${DEST_KUBECONFIG} \
     --namespace ${SPINNAKER_NAMESPACE} \
     --service-account-name ${SPINNAKER_SERVICE_ACCOUNT_NAME}
   ```

You should be left with a file called `kubeconfig-spinnaker-system-sa` (or something similar, if you're using a different namespace for spinnaker)

# Create the S3 Bucket and Credentials

If you do not yet have an S3 bucket, create the S3 bucket:

1. Log into the AWS Console (web UI)
2. Navigate to the S3 Console (Click on "Services" at the top, and then on "S3" under "Storage")
3. Click on "Create Bucket"
4. Specify a globally unique name for this bucket, in your AWS region of choice, following your organization's naming convention (if applicable). For this document, we will use, `spinnaker-jq6cqvmpro`.
5. Click "Next"
6. Select the following two checkboxes:

    * Keep all versions of an object in the same bucket
    * Automatically encrypt objects when they are stored in S3

7. Click "Next"

8. Do not add any additional permissions, unless specified by your organization. Click "Next"

9. Click "Create bucket"

Spinnaker (the `front50` service, specifically) will need access to your newly-created bucket. There are a number of ways to achieve this. This document describes two mechanisms to do this.

By default, Spinnaker will store all Spinnaker information in a folder called `front50` in your bucket. You can optionally specify a different directory (for example, if you're using a pre-existing or shared S3 bucket).

## Create an IAM user, using an inline policy

You can create an IAM user with credentials, and provide that to Spinnaker via Halyard

1. Log into the AWS Console (Web UI)
2. Navigate to the IAM Console (Click on "Services" at the top, and then on "IAM" under "Security, Identity, & Compliance")
3. Click on "Users" on the left
4. Click on "Add user"
5. Give your user a distinct name, per your organization's naming conventions. For this document, we will use `s3-spinnaker-jq6cqvmpro`
6. Click on "Programmatic access"
7. We will not be adding a distinct policy to this user. Click on "Next: Tags". _You may receive a warning about how there are no policies attached to this user - this warning can be ignored._
8. Optionally, add tags, then click on "Next: Review"
9. Click "Create user"
10. Save the Access Key ID and Secret Access Key - these will be used later, during Halyard configuration
11. Click "Close"

Then, add an inline policy to your IAM user:

1. Click on your newly-created IAM user
2. Click on "Add inline policy" (on the right)
3. Click on the "JSON" tab
4. Add this text (replace `s3-spinnaker-jq6cqvmpro` with the name of your bucket)

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
         "Effect": "Allow",
         "Action": "s3:*",
         "Resource": [
           "arn:aws:s3:::spinnaker-jq6cqvmpro",
           "arn:aws:s3:::spinnaker-jq6cqvmpro/*"
         ]
       }
     ]
   }
   ```

5. Click on "Review Policy"

6. Give your inline policy some name. For example `s3-spinnaker-jq6cqvmpro`

7. Click "Create Policy"

## Create an IAM policy attached to the Kubernetes nodes, using an inline policy

Alternately, you can attach an IAM policy to the role attached to your Kubernetes nodes.

1. Log into the AWS Console (Web UI)
2. Navigate to EC2 (Click on "Services" at the top, and then on "EC2" under "Compute")
3. Click on one of your Kubernetes nodes
4. In the bottom section, look for "IAM role" and click on the role
5. Click on "Add inline policy" (on the right)
6. Click on the "JSON" tab
7. Add this text (replace `s3-spinnaker-jq6cqvmpro` with the name of your bucket)

   ```json
   {
     "Version": "2012-10-17",
     "Statement": [
       {
        "Effect": "Allow",
        "Action": "s3:*",
        "Resource": [
          "arn:aws:s3:::spinnaker-jq6cqvmpro",
          "arn:aws:s3:::spinnaker-jq6cqvmpro/*"
        ]
       }
     ]
   }
   ```

8. Click on "Review Policy"

9. Give your inline policy some name. For example `s3-spinnaker-jq6cqvmpro`

10. Click "Create Policy"

# Stage files on the Halyard machine

On the Halyard machine, choose a local working directory for Halyard. In it, we will create two folders:

- `WORKING_DIRECTORY/.hal`
- `WORKING_DIRECTORY/.secret`
- `WORKING_DIRECTORY/resources`

```bash
# Feel free to use some other directory for this; make sure it is a persistent directory.
# Also, make sure this directory doesn't live on an NFS mount, as that can cause issues
WORKING_DIRECTORY=~/aws-spinnaker/
mkdir -p ${WORKING_DIRECTORY}/.hal
mkdir -p ${WORKING_DIRECTORY}/.secret
mkdir -p ${WORKING_DIRECTORY}/resources
```

You should have one files:

- A kubeconfig file (`kubeconfig-spinnaker-system-sa`) with the credentials for a service account in your EKS cluster

Copy it into `.secret` so it is available to your Halyard docker container:

```bash
cp kubeconfig-spinnaker-system-sa ${WORKING_DIRECTORY}/.secret
```

# Start the Halyard container

On the `docker machine`, start the Halyard container (see the `armory/halyard-armory` [tag list](https://hub.docker.com/r/armory/halyard-armory/tags)) for the latest Armory Halyard Docker image tag.

_If you want to install OSS Spinnaker instead, use `gcr.io/spinnaker-marketplace/halyard:stable` for the Docker image_

```bash
docker run --name armory-halyard -it --rm \
  -v ${WORKING_DIRECTORY}/.hal:/home/spinnaker/.hal \
  -v ${WORKING_DIRECTORY}/.secret:/home/spinnaker/.secret \
  -v ${WORKING_DIRECTORY}/resources:/home/spinnaker/resources \
  armory/halyard-armory:{{ site.data.versions.halyard-armory-version }}
```

# Enter the Halyard container

From a separate terminal session on your `docker machine`, create a second bash/shell session on the Docker container:

```bash
docker exec -it armory-halyard bash

# Also, once in the container, you can run these commands for a friendlier environment to:
# - prompt with information
# - alias for ls
# - cd to the home directory
export PS1="\h:\w \u\$ "
alias ll='ls -alh'
cd ~
```

# Add the kubeconfig and cloud provider to Spinnaker (via Halyard)

From the `docker exec` separate terminal session, add (re-export) the relevant environment variables

```bash
###### Use the same values as the start of the document
# Enter the namespace that you want to install Spinnaker in.  This should have been created in the previous step.
export NAMESPACE="spinnaker-system"

# Enter the name you want Spinnaker to use to identify the cloud provider account
export ACCOUNT_NAME="spinnaker"

# Update this with the full path to your kubeconfig inside the container)
export KUBECONFIG_FULL=/home/spinnaker/.secret/kubeconfig-spinnaker-system-sa
```

Use the Halyard `hal` command line tool to add a Kubernetes account using your minified kubeconfig

Configure the kubeconfig:

```bash
# Enable the Kubernetes cloud provider
hal config provider kubernetes enable
```

Note: If you get an `AccessDenied` error, change permissions on the host machine's `.hal` folder to allow read/write access by the Halyard container. Example: `chmod 777 ~/.hal`.

Next, configure the account:

```bash
# Add account
hal config provider kubernetes account add ${ACCOUNT_NAME} \
  --provider-version v2 \
  --kubeconfig-file ${KUBECONFIG_FULL} \
  --only-spinnaker-managed true \
  --namespaces ${NAMESPACE}
```

# Configure Spinnaker to install in Kubernetes

**Important: This will by default limit your Spinnaker to deploying to the** namespace specified. If you want to be able to deploy to other namespaces, **either add a second cloud provider target or remove the `--namespaces` flag.**

Use the Halyard `hal` command line tool to configure Halyard to install Spinnaker in your Kubernetes cluster

```bash
hal config deploy edit \
  --type distributed \
  --account-name ${ACCOUNT_NAME} \
  --location ${NAMESPACE}
```

# Enable Artifacts

Within Spinnaker, 'artifacts' are consumable references to items that live outside of Spinnaker, such as a file in a git repository or a file in an S3 bucket. The Artifacts feature must be explicitly turned on.

Enable the "Artifacts" feature and the "http" artifact provider:

```bash
# Enable artifacts
hal config features edit --artifacts true
hal config artifact http enable
```

(In order to add specific types of artifacts, there are further configuration items that must be completed. For now, it is sufficient to just turn on the artifacts feature with the http artifact provider. This will allow Spinnaker to retrieve files via unauthenticated http.)

# Configure Spinnaker to use your S3 bucket

Use the Halyard `hal` command line tool to configure Halyard to configure Spinnaker to use your S3 bucket

## If you are using an IAM user

```bash
# Update these with the information from the bucket that you created
export BUCKET_NAME=spinnaker-jq6cqvmpro
export REGION=us-west-2
export ACCESS_KEY_ID=<access-key>

# This will prompt for the secret key
hal config storage s3 edit \
  --bucket ${BUCKET_NAME} \
  --access-key-id ${ACCESS_KEY_ID} \
  --secret-access-key \
  --region ${REGION}

hal config storage edit --type s3
```

## If you are using the IAM instance roles

```bash
# Update these with the information from the bucket that you created
export BUCKET_NAME=spinnaker-jq6cqvmpro
export REGION=us-west-2

# This will prompt for the secret key
hal config storage s3 edit \
  --bucket ${BUCKET_NAME} \
  --region ${REGION} \
  --no-validate

hal config storage edit --type s3
```

## If you want to use a specific folder in the bucket

By default, Halyard will configure Spinnaker to use the folder `front50` in your S3 bucket. You can configure it to use a different folder with this command:

```bash
ROOT_FOLDER=not_front50
hal config storage s3 edit --root-folder ${ROOT_FOLDER}
```

# Choose the Spinnaker version

Before Halyard will install Spinnaker, you should specify the version of Spinnaker you want to use.

You can get a list of available versions of spinnaker with this command:

```bash
hal version list
```

_If you are installing Armory Spinnaker, you will get a version that starts with `2.x.x`_

_If you are installing OSS Spinnaker and using `gcr.io/spinnaker-marketplace/halyard:stable`, you will get a version that starts with `1.x.x`_

And then you can select the version with this:

```bash
# Replace with version of choice:
export VERSION=$(hal version latest -q)
hal config version edit --version $VERSION
```

# Install Spinnaker

Now that your halconfig is completely configured for the initial Spinnaker, you can tell Halyard to actually install Spinnaker:

```bash
hal deploy apply
```

Once this is complete, congratulations! Spinnaker is installed. Now we have to access and expose it.

# Connect to Spinnaker using `kubectl port-forward`

If you have kubectl on a local machine with access to your Kubernetes cluster, you can test connecting to it with the following:

```bash
NAMESPACE=spinnaker-system
DECK_POD=$(kubectl -n ${NAMESPACE} get pod -l cluster=spin-deck -ojsonpath='{.items[0].metadata.name}')
GATE_POD=$(kubectl -n ${NAMESPACE} get pod -l cluster=spin-gate -ojsonpath='{.items[0].metadata.name}')
kubectl -n ${NAMESPACE} port-forward ${DECK_POD} 9000 &
kubectl -n ${NAMESPACE} port-forward ${GATE_POD} 8084 &
```

Then, you can access Spinnaker at <http://localhost:9000>

(If you are doing this on a remote machine, this will not work because your browser attempts to access localhost on your local workstation rather than on the remote machine where the port is forwarded)

__Note:__ Even if the `hal deploy apply` command returns successfully, the
installation may not be complete yet. This is especially the case with
distributed Kubernetes installs. If you see errors such as `Connection refused`,
the containers may not be available yet. You can either wait
or check the status of all of the containers using the command for your cloud provider
(such as `kubectl get pods --namespace spinnaker`).

## Install the NGINX ingress controller

In order to expose Spinnaker to end users, you have perform the following actions:

- Expose the spin-deck (UI) Kubernetes service on some URL endpoint
- Expose the spin-gate (API) Kubernetes service on some URL endpoint
- Update Spinnaker (via Halyard) to be aware of the new endpoints

We're going to install the NGINX ingress controller on AWS (this uses the Layer 4 ELB, as indicated in the NGINX ingress controller [documentation](https://github.com/kubernetes/ingress-nginx/blob/master/docs/deploy/index.md#aws) - you can use other NGINX ingress controller configurations such as the Layer 7 load balancer per your organization's ingress policy.)

(Both of these are configurable with Spinnaker, but the NGINX ingress controller is also generally much more configurable)

From the `workstation machine` (where `kubectl` is installed):

Install the NGINX ingress controller components:

```bash
kubectl --kubeconfig kubeconfig-aws apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/mandatory.yaml
```

Install the NGINX ingress controller AWS-specific service:

```bash
kubectl --kubeconfig kubeconfig-aws apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/aws/service-l4.yaml
kubectl --kubeconfig kubeconfig-aws apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/master/deploy/static/provider/aws/patch-configmap-l4.yaml
```

# Set up the Ingress for `spin-deck` and `spin-gate`

Identify the URLs you will use to expose Spinnaker's UI and API.

```bash
# Replace with actual values
SPIN_DECK_ENDPOINT=spinnaker.some-url.com
SPIN_GATE_ENDPOINT=api.some-url.com
NAMESPACE=spinnaker-system
```

Create a Kubernetes Ingress manifest to expose spin-deck and spin-gate (change your hosts and namespace accordingly):

```bash
tee spin-ingress.yaml <<-'EOF'
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: spinnaker-nginx-ingress
  namespace: NAMESPACE
  labels:
    app: spin
    cluster: spin-ingress
  annotations:
    kubernetes.io/ingress.class: "nginx"
spec:
  rules:
  - host: SPIN_DECK_ENDPOINT
    http:
      paths:
      - backend:
          serviceName: spin-deck
          servicePort: 9000
        path: /
  - host: SPIN_GATE_ENDPOINT
    http:
      paths:
      - backend:
          serviceName: spin-gate
          servicePort: 8084
        path: /
EOF

sed -i.bak \
  -e "s|NAMESPACE|${NAMESPACE}|g" \
  -e "s|SPIN_DECK_ENDPOINT|${SPIN_DECK_ENDPOINT}|g" \
  -e "s|SPIN_GATE_ENDPOINT|${SPIN_GATE_ENDPOINT}|g" \
  spin-ingress.yaml
```

Create the Ingress

```bash
kubectl apply -f spin-ingress.yaml
```

# Configure Spinnaker to be aware of its endpoints

Spinnaker must be aware of its endpoints to work properly.

This should be done from the halyard container:

```bash
SPIN_DECK_ENDPOINT=spinnaker.some-url.com
SPIN_GATE_ENDPOINT=api.some-url.com
SPIN_DECK_URL=http://${SPIN_DECK_ENDPOINT}
SPIN_GATE_URL=http://${SPIN_GATE_ENDPOINT}

hal config security ui edit --override-base-url ${SPIN_DECK_URL}
hal config security api edit --override-base-url ${SPIN_GATE_URL}

hal deploy apply
```

# Set up DNS

Once the ingress is up (this may take some time), you can get the IP address for the ingress:

```bash
$ kubectl describe -n spinnaker-system ingress spinnaker-nginx-ingress
Name:             spinnaker-nginx-ingress
Namespace:        spinnaker-system
Address:          35.233.216.189
Default backend:  default-http-backend:80 (10.36.2.7:8080)
Rules:
  Host                    Path  Backends
  ----                    ----  --------
  spinnaker.some-url.com
                          /   spin-deck:9000 (<none>)
  api.some-url.com
                          /   spin-gate:8084 (<none>)
Annotations:
  kubectl.kubernetes.io/last-applied-configuration:  {"apiVersion":"extensions/v1beta1","kind":"Ingress","metadata":{"annotations":{"kubernetes.io/ingress.class":"nginx"},"name":"spinnaker-nginx-ingress","namespace":"spinnaker"},"spec":{"rules":[{"host":"spinnaker.some-url.com","http":{"paths":[{"backend":{"serviceName":"spin-deck","servicePort":9000},"path":"/"}]}},{"host":"api.some-url.com","http":{"paths":[{"backend":{"serviceName":"spin-gate","servicePort":8084},"path":"/"}]}}]}}

  kubernetes.io/ingress.class:  nginx
Events:
  Type    Reason  Age   From                      Message
  ----    ------  ----  ----                      -------
  Normal  CREATE  28s   nginx-ingress-controller  Ingress spinnaker/spinnaker-nginx-ingress
  Normal  UPDATE  20s   nginx-ingress-controller  Ingress spinnaker/spinnaker-nginx-ingress
```

Set up DNS so that your two URLs point to the IP address for the ingress (in the above, configure `spinnaker.some-url.com` and `api.some-url.com` to point to `35.233.216.189`). This can be done via whatever your organization uses for DNS.

# Configuring TLS Certificates

Configuration of TLS certificates for ingresses is often very organization-specific. In general, you would want to do the following:

- Add certificate(s) so that your ingress controller can use them
- Configure the ingress(es) so that NGINX (or your ingress) terminates TLS using the certificate(s)
- Update Spinnaker to be aware of the new TLS endpoints (note `https` instead of `http`)

```bash
SPIN_DECK_ENDPOINT=spinnaker.some-url.com
SPIN_GATE_ENDPOINT=api.some-url.com
SPIN_DECK_URL=https://${SPIN_DECK_ENDPOINT}
SPIN_GATE_URL=https://${SPIN_GATE_ENDPOINT}
hal config security ui edit --override-base-url ${SPIN_DECK_URL}
hal config security api edit --override-base-url ${SPIN_GATE_URL}
hal deploy apply
```

# Next Steps

Now that you have Spinnaker up and running, here are some of the next things you may want to do:

- Configuration of certificates to secure your cluster (see [this section](#configuring-tls-certificates) for notes on this)
- Configuration of Authentication/Authorization (see the [Open Source Spinnaker documentation](https://www.spinnaker.io/setup/security/))
- Add Kubernetes accounts to deploy applications to (see [this KB article](https://kb.armory.io/installation/spinnaker-add-kubernetes/))
- Add GCP accounts to deploy applications to (see the [Open Source Spinnaker documentation](https://www.spinnaker.io/setup/install/providers/gce/))
- Add AWS accounts to deploy applications to (see the [Open Source Spinnaker documentation](https://www.spinnaker.io/setup/install/providers/aws/))
