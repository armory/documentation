---
layout: post
title: Air-Gapped Environments
order: 210
published: true
---
If your environment is air-gapped, you have several options for deploying: 

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

An Air-gapped environment is one where any combination of the following conditions are true:
- No access to Armory Bill Of Materials (BOM), which are published on S3
- No ability to pull images from docker.io/armory
- No ability for engineers to deploy with Halyard from their machines

## Host Armory's Bill Of Materials

Armory's BOMs are stored in the following bucket and are publicly available: `s3://halconfig`. 

If you are unable to access this bucket from the machine running Halyard, host the BOM in either a GCS or S3 compatible storage, such as MinIO.

### Using a Custom Bucket and Bills of Materials

Your GCS or S3 compatible bucket needs to contain a `versions.yml` at the root of the bucket with the following information:

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

`latestHalyard` and `latestSpinnaker` are used to notify users of new version of Halyard and Spinnaker. You can optionally update them with newer versions. `versions` is a list of available versions. It is optional if you don't intend to show new versions when `hal version list` is run.

### Enabling a Custom Bucket From Halyard

To enable custom storage in Halyard, create `/opt/spinnaker/config/halyard-local.yml` with the following content and restart Halyard:

```yaml
spinnaker:
  config:
    input:
      # To use a custom GCS bucket, switch this to true
      gcs:
        enabled: false
      # Name of your private bucket
      bucket: myownbucket
      # If your s3 bucket is not in us-west-2 (region does not matter for Minio)
      region: us-east-1
      # If you are using a platform that does not support PathStyleAccess, such as Minio, switch this to true
      # https://docs.aws.amazon.com/AmazonS3/latest/dev/UsingBucket.html#access-bucket-intro
      enablePathStyleAccess: false
      # For s3 like storage with custom endpoint, such as Minio:
      # endpoint: https://my.minio:9000
```


### Enabling a New Version of Armory Spinnaker

You can download version `x.y.z` of Armory Spinnaker with this [script](https://gist.github.com/ncknt/37b1743111eb727bcd81e21dffda90d6). Set the value for `NEW_DOCKER_REGISTRY` to point to your docker repository if needed.

For example:

```bash
$ download-bom.sh 2.16.0 versions/
```

You can then upload the files you just downloaded to your storage. Make sure they are readable from wherever Halyard (not necessarily Spinnaker services) will run. For example:

**AWS**

```
$ aws cp --recursive versions/ s3://myownbucket
```           
**GCS**

```
$ gsutil cp -m -r ...
```

## Use Custom Docker Registry

If you're unable to pull from `docker.io/armory` directly, you can use your own registry.

### Docker Registry Proxy

Some registries allow pulling remote Docker images from another source. You can replace the `dockerRegistry` value in the script above via `NEW_DOCKER_REGISTRY`.

### Isolated Docker Registry

If you cannot proxy `docker.io/armory`, push images to your own registry. Images are determined from the BOM. For instance:

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

You need to copy `docker.io/armory/deck/2.11.0-896d15d-b0aac47-rc8` and `docker.io/armory/gate/1.11.0-83b97ab-fd0128a-rc4` to your own registry.

## Halyard Cannot Run on the Local Machine

The following solutions assume the that you can use `kubectl` to access the cluster where Spinnaker is installed.

### Option 1: Halyard as a Deployment

You can run Halyard as a `Deployment` within the cluster that runs Spinnaker if the following conditions are true:

* You cannot run Halyard directly on your machine. This might be because the local machine cannot run Docker.
* You have `kubectl` access to the cluster you are deploying to

The `halyard-deployment.yml`manifest file can be found here: https://gist.github.com/imosquera/e6b42a187bd921dbb8a61e523cf568d8

Fetch the deployment manifest and edit values that are relevant to your deployment, such as `namespace`. After you edit the manifest, deploy it with the following command:

```
kubectl apply -f manifest.yml
```

Finally, to access the deployed Halyard environment, perform the following steps:

1. Get the name for the Halyard pod: 
   ```
   kubectl get pods
   ```
2. Exec into the pod: 
   ```
   kubectl exec -it {pod-name} /bin/bash
   ``` 
    
### Option 2: Spinnaker Operator

The [Spinnaker Operator](/spinnaker/operator/) lets you manage Spinnaker with `kubectl`.

If you also need to use privately hosted bill of materials, configure the operator to point to your bucket. See [Custom Halyard Configuration](/spinnaker/operator/#custom-halyard-configuration)
