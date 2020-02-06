---
layout: post
title: Installation
order: 1
redirect_from:
  - /install_guide/install/
  - /install-guide/gettings_started/
---
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Installing Armory Spinnaker for Small Teams and POCs 
## Introducing Armory Minnaker
Armory Minnaker is an easy to use installation script that leverages the power of **Kubernetes** with the simplicity of a _Virtual Machine_.  The Kubernetes environmnent that will get installed on your behalf is based on [Rancher's K3s](https://k3s.io/).  You do not need to know how to setup Kubernetes as we have done all of the hard parts for you allowing you to get up and running with Spinnaker in under 10 minutes.  Check out [our video](https://youtu.be/jg8vJEzcuAA) on running Spinnaker across all of the public clouds including VMWare Fusion locally.  This deployment makes it easy to get up and running today and let's you scale your deployment into a medium to large deployment down the road.

## Prerequisites 

Your VM should have 4 vCPUs, 16G of memory and 30G of HDD space.

## Getting Started

Check out the [GitHub project](https://github.com/armory/minnaker) for more information. After you install Minnaker, use the [AWS Quick Start](/spinnaker/Armory-Spinnaker-Quickstart-1) to learn how to configure Spinnaker to deploy to AWS.

# Installing Armory Spinnaker for Medium to Large Enterprise Deployments

## Prerequisites

Make sure you have a kubernetes cluster with a minimum of **15 GB** of memory and **8 CPU's** total _available_ to be used by Spinnaker. At least a single node should have 4 GB and 1 CPU available.

## Install Armory Halyard

You can install Armory's version of Halyard directly on macOS, or use Docker
to run Halyard and its command line.

See also [Armory Halyard configuration](/spinnaker-install-admin-guides/configure-halyard/).

### Install Armory Halyard for macOS

#### Before You Start

The current installer requires your `kubectl` to be version 1.10 or greater.

Our installer currently expects to use your `kubectl` to find your current
configuration (usually stored in `~/.kube/config`).  Ensure that the config
file kubectl defaults to is the one you want to use.

#### Installing Armory Halyard for macOS

You can download the installer and run it with this command:

```
curl -L https://get.armory.io/halyard/install/latest/macos/InstallArmoryHalyard.sh > InstallArmoryHalyard.sh && sudo bash InstallArmoryHalyard.sh --version {{ site.data.versions.halyard-armory-version }}
```

This should install the `hal` command in `/usr/local/bin`.  You can test that
you have the correct version in your path by running `hal armory` and see a
help screen that includes a `SUBCOMMANDS` section with at least an `init`
option that "Runs Armory installer":

```
$ hal armory
ARMORY
...
SUBCOMMANDS

  init
    Runs Armory installer
```
From there, you can issue all your [halyard commands](https://www.spinnaker.io/reference/halyard/).

### Install Armory Halyard in Docker

#### Before You Start

The Docker image will contain most of the files you will need.  However,
you may need to update your `.kube/config` file to use
`heptio-authenticator-aws` instead of `aws-iam-authenticator`; although
both are compatible, the Docker container expects to use the former.

If the `.hal` directory you map in the docker command below
already exist, make sure you have write permission to that directory
(and read permissions to the others).  If the directory doesn't exist,
it will be created by the docker container.

Our installer currently expects to find your kubeconfig named `config` in
the `.kube` directory you map below.  If you've named your config something
else, you'll need to rename or symlink the file accordingly.

#### Installing Armory Halyard in Docker

You can start Armory Halyard in a Docker container with the following command:

```
docker run --name armory-halyard --rm \
    -v ~/.hal:/home/spinnaker/.hal \
    -v ~/.kube:/home/spinnaker/.kube \
    -v ~/.aws:/home/spinnaker/.aws \
    -it docker.io/armory/halyard-armory:{{ site.data.versions.halyard-armory-version }}
```

> Note: If you're installing to Google Cloud, you'll want to change the
> ".aws" mapping above to your Google credentials json file, and then
> you'll need to set the environment variable GOOGLE_APPLICATION_CREDENTIALS
> within the shell so the installer can find it.

Once Armory Halyard is running, you can interact with it by opening a separate
Terminal and running:

```
docker exec -it armory-halyard bash
```

From there, you can issue all your [halyard commands](https://www.spinnaker.io/reference/halyard/).

### Install Armory Halyard in Kubernetes
You can start Armory Halyard in a pod with the following manifest:
```
---
apiVersion: v1
kind: PersistentVolumeClaim
metadata:
  name: halconfig-pvc
  labels:
    app: halyard
  namespace: halyard
spec:
  accessModes:
  - ReadWriteOnce
  resources:
    requests:
      storage: 10Gi

---
apiVersion: apps/v1
kind: StatefulSet
metadata:
  name: halyard
  namespace: halyard
spec:
  replicas: 1
  selector:
    matchLabels:
      app: halyard
  serviceName: halyard
  template:
    metadata:
      labels:
        app: halyard
    spec:
      containers:
      - name: halyard
        image: index.docker.io/armory/halyard-armory:{{ site.data.versions.halyard-armory-version }}
        volumeMounts:
        - name: halconfig
          mountPath: /home/spinnaker/
      securityContext:
        fsGroup: 65533
      volumes:
      - name: halconfig
        persistentVolumeClaim:
          claimName: halconfig-pvc
```

Copy and paste the manifest into a file named halyard.yml, then deploy the above manifest (halyard.yml) into Kubernetes with the following command:
```
kubectl apply -f halyard.yml
```
> Note: This installs Halyard into the namespace 'halyard'

Once the pod is deployed - you can interact with it by running:
```
kubectl -n halyard exec -ti halyard-xxxxx bash  # make sure you get the exact pod name
```

## Installing Armory Spinnaker

With Armory's version of Halyard installed, you can install Armory Spinnaker
with the command:

```
$ hal armory init
```

This will download the Armory installer and walk you through the initial
installation of Spinnaker.  You'll need to have a kubectl file already set
up to use Amazon EKS, and your AWS credentials file handy.

The installer will walk you through the selection of clusters, the region
and bucket names for S3 storage, and the creation of service accounts;
finally, it will set up the pods to run Spinnaker and then provide you a
proxy to interact with.

Options for [hal armory init](https://docs.armory.io/spinnaker/armory_halyard/#hal-armory-init).

#### Notes on Docker

You will not be able to access the proxy in the Docker container from your
machine directly, so you'll need to install kubectl natively on your system
and then run the following two commands:

```bash
SPINNAKER_NAMESPACE=YOUR_NAMESPACE_HERE
kubectl -n ${SPINNAKER_NAMESPACE} port-forward services/spin-deck 9000:9000 &
kubectl -n ${SPINNAKER_NAMESPACE} port-forward services/spin-gate 8084:8084 &
```

You should then be able to connect to http://localhost:9000/ with your
browser and use your newly installed Spinnaker.

# More Information

The following pages provide more detailed information for installing Armory Spinnaker in different environments:

* [Install Armory Spinnaker on AWS](/spinnaker-install-admin-guides/install-on-aws/)
* [Install Armory Spinnaker on GKE](/spinnaker-install-admin-guides/install-on-gke/)
