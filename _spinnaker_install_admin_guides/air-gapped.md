---
layout: post
title: Air-Gapped Environments
order: 210
published: true
---

The purpose of this document is to outline the steps involved in deploying Armory Spinnaker within an air-gapped environment.


## What is an air-gapped environment?

Air-gapped environment could mean any combination of:
- no access to Armory bill of materials published on s3
- no ability to pull images from docker.io/armory
- no ability for engineers to deploy with Halyard from their machine

### No Access to Armory's Bill Of Materials

Armory's bills of materials are stored in `s3://halconfig` bucket and are publicly available. If you are unable to access this bucket from the machine running Halyard, you'll need to host bills of materials in either GCS or an S3 compatible storage (minio, ...).

#### Custom Bucket with Bills of Materials

Your bucket (s3 compatible or GCS) needs to contain a `versions.yml` at the root of the bucket that contains:

```
latestHalyard: 1.7.1
latestSpinnaker: 2.16.0
versions:
- version: 2.16.0
  alias: OSS Release 1.16.1
  changelog: https://docs.armory.io/release-notes/armoryspinnaker_v2.16.0/
  minimumHalyardVersion: 1.2.0
  lastUpdate: "1568853000000"
```

`latestHalyard` and `latestSpinnaker` are used to notify users of new version of Halyard and Spinnaker. You can optionally update them with newer versions. `versions` is a list of versions available. It is also optional if you don't intend to show new versions in `hal version list`.

#### Enable Custom Bucket From Halyard

To enable custom storage in Halyard, create `/opt/spinnaker/config/halyard-local.yml` with the following content and restart Halyard:

```yaml
spinnaker:
  config:
    input:
      gcs:
        # To use a custom GCS bucket
        # enabled: true
      # Name of your private bucket
      bucket: myownbucket
      # If your s3 bucket is not in us-west-2
      # region: us-east-1
      # For s3 like storage with custom endpoint
      # endpoint: https://my.minio:9000
      # To enable path style access to your bucket: https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html#access-bucket-intro
      # enablePathStyleAccess: true
```


#### Enabling a New Version of Armory Spinnaker

You can download version `x.y.z` of Armory Spinnaker with this [script](https://gist.github.com/ncknt/37b1743111eb727bcd81e21dffda90d6). Modify `NEW_DOCKER_REGISTRY` to point to your own docker repository if needed.

For example:

```bash
$ download-bom.sh 2.16.0 versions/
```

You can then upload the files you just downloaded to your own storage. Make sure they are readable from wherever Halyard (not necessarily Spinnaker services) will run. For example:

```bash
$ aws cp --recursive versions/ s3://myownbucket
```

### Custom Docker Registry

If you're unable to pull from `docker.io/armory` directly, you can use your own registry.

#### Docker Registry Proxy

Some registries allow pulling remote Docker images from another source. You can replace the `dockerRegistry` value in the script above via `NEW_DOCKER_REGISTRY`.

#### Isolated Docker Registry

If you cannot proxy `docker.io/armory`, you'll need to push images to your own registry. Images are determined from the BOM. For instance:

```yaml
...
services:
  deck:
    version: 2.11.0-896d15d-b0aac47-rc8
  gate:
    version: 1.11.0-83b97ab-fd0128a-rc4
  ...
artifactSources:
  dockerRegistry: docker.io/armory
```

You'd need to copy `docker.io/armory/deck/2.11.0-896d15d-b0aac47-rc8` and `docker.io/armory/gate/1.11.0-83b97ab-fd0128a-rc4` to your own registry.

### Halyard cannot be run on the engineer’s machine

The following solutions assume the engineer can `kubectl` to the cluster where Spinnaker is installed.

#### Option 1: Halyard as a `Deployment`

If Halyard cannot be installed directly on the machine on which you are working (not OSX, cannot run in Docker) but you have `kubectl` access to the cluster you are deploying to you can simply run Halyard as a `Deployment` within that cluster. The deployment is available here: https://gist.github.com/imosquera/e6b42a187bd921dbb8a61e523cf568d8

You’ll want to fetch the `Deployment` manifest and edit any appropriate values if necessary (namespace, perhaps). Once you’ve edited the manifest, you can deploy it with `kubectl apply -f manifest.yml`.

Finally, to access the deployed Halyard environment, run `kubectl get pods` to get the Pod name for Halyard and then run `kubectl exec -it {pod-name} /bin/bash` which will drop you into a shell.

#### Option 2: Spinnaker Operator

The [Spinnaker operator](/spinnaker/operator/) lets you manage Spinnaker with `kubectl`.

If you also need to use privately hosted bill of materials, you'll need to configure the operator to point to your bucket. See [Custom Halyard Configuration](/spinnaker/operator/#custom-halyard-configuration)

