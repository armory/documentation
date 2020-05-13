---
layout: post
title: Upgrading Open Source Spinnaker to Armory Spinnaker
order: 28
published: true
---

Armory Spinnaker is installed with Armory Halyard, very similarly to the way Open Source Spinnaker is installed with Open Source Halyard. These are the key differences:

* Armory Halyard installs Armory Spinnaker; Open Source Halyard installs Open Source Spinnaker.
* Armory Spinnaker versions are one major version ahead of Open Source. For example, Armory Spinnaker 2.18.x maps to Open Source Spinnaker 1.18.x.
* Armory Spinnaker has an extra subcommand block `hal armory` (mapping to an `armory` block in your `.hal/config`), which controls Armory-specific features.

This guide differentiates between the two by referring to them as Armory Spinnaker and OSS Spinnaker, respectively.

If you are currently on OSS Spinnaker and interested in upgrading to Armory Spinnaker, you can easily upgrade if you used Halyard to install your Spinnaker cluster.

This guide assumes the following:
* Spinnaker is currently running in Kubernetes
* Spinnaker is configured with some form of persistent storage (Minio, S3, GCS, or AZS)
* Spinnaker was installed with Halyard in one of these forms:
  * Halyard is running locally on a workstation
  * Halyard is running in a Docker container in Docker daemon (in Linux, Windows, or OSX)
  * Halyard is running in a Kubernetes pod

Depending on where Halyard is currently running, the detailed installation instructions will be slightly different, but the high level process is the same:

1. Start Armory Halyard in a Docker container with your OSS Halyard configuration directories available to Armory Halyard.
2. Enter the Armory Halyard container.
3. Update the Spinnaker version to use an Armory version. Recall that Armory Spinnaker versions are ahead of OSS Spinnaker by one major version.
4. Apply your changes.

## Halyard running locally on a workstation

If Halyard is running locally on your workstation, then perform the following steps:

1. Make copies of any directores used by Halyard. These include`~.hal` and `~.kube` and potentially `~/.aws`, `~/.config/gcloud`, `~/.azure`). *You can mount these directly into Halyard, but it may be safer to operate on copies.*

   ```bash
   mkdir -p ~/armory/.config
   cp -rpv ~/.hal ~/armory/
   cp -rpv ~/.aws ~/armory/
   cp -rpv ~/.kube ~/armory/
   cp -rpv ~/.azure ~/armory/
   cp -rpv ~/.config/gcloud ~/armory/.config
   ```
   Omit any directories that do not apply to you. For example, if you do not use Azure, omit it.

2. Start Halyard as a Docker container in daemon mode, with your directories mounted in (add/remove volume mounts as applicable):

   ```bash
   docker run --name armory-halyard --rm \
     -v ${HOME}/armory/.hal:/home/spinnaker/.hal \
     -v ${HOME}/armory/.kube:/home/spinnaker/.kube \
     -v ${HOME}/armory/.aws:/home/spinnaker/.aws \
     -v ${HOME}/armory/.azure:/home/spinnaker/.azure \
     -v ${HOME}/armory/.config:/home/spinnaker/.config \
     -d \
     -u $(id -u) \
     index.docker.io/armory/halyard-armory:{{ site.data.versions.halyard-armory-version }}
   ```

   Omit any directories that do not apply to you. For example, if you do not use Azure, omit it.

   _The above specifies that Halyard will run as your local user id. Depending on how your Halyard daemon was initially run and what user id owns the various Halyard directories, you may need to specify some other user. For example, if user `1000` owns the .hal directory, replace "`-u $(id -u)`" with "`-u 1000`"_

3. Exec into the Halyard container

   ```
   docker exec -it armory-halyard bash
   ```

4. Update the version of Spinnaker

   ```bash
   hal config version edit --version $(hal version latest -q)
   ```

   This will use the latest stable version; If you want to use a different version, use `hal version list` to get a list of available versions. Then, run `hal config version edit --version X.X.X` to specify a version.

5. Apply your changes

   ```bash
   hal deploy apply
   ```

## Halyard running in a Docker container in Docker daemon

If Halyard is already running in a Docker container in your Docker daemon, you can do an in-place upgrade.

1. First, do a backup of your existing Halyard configuration. Exec into the Docker container, then run `hal backup create`.

2. Stop the Halyard docker container, and re-start it with the Armory Halyard image (`index.docker.io/armory/halyard-armory:{{ site.data.versions.halyard-armory-version }}`) instead of the OSS Halyard image (`gcr.io/spinnaker-marketplace/halyard:stable`). Also, change the user id for Armory Halyard to be `1000`. For example, if you run the previous Docker image (OSS Halyard) like this:

   ```bash
   docker run --name halyard --rm \
     -v ${HOME}/armory/.hal:/home/spinnaker/.hal \
     -v ${HOME}/armory/.kube:/home/spinnaker/.kube \
     -d \
     gcr.io/spinnaker-marketplace/halyard:stable
   ```

   Then run Armory Halyard like this:

   ```bash
   docker run --name armory-halyard --rm \
     -v ${HOME}/armory/.hal:/home/spinnaker/.hal \
     -v ${HOME}/armory/.kube:/home/spinnaker/.kube \
     -d \
     index.docker.io/armory/halyard-armory:{{ site.data.versions.halyard-armory-version }}
   ```

    Note the different Docker image and different container name.

3. Exec into the Halyard container:

   ```
   docker exec -it armory-halyard bash
   ```

4. Update the version of Spinnaker:

   ```bash
   hal config version edit --version $(hal version latest -q)
   ```

   This will use the latest stable version. If you want to use a different version, use `hal version list` to get a list of available versions, and then `hal config version edit --version X.X.X` to specify a specific version.

5. Apply your changes

   ```bash
   hal deploy apply
   ```

## Halyard running in a Kubernetes pod

If Halyard is running in your Kubernetes cluster, either as a Kubernetes Deployment or a Kubernetes StatefulSet, then you can do an in-place upgrade:

1. First, update the image for your Halyard Deployment / StatefulSet from the OSS Halyard image (`gcr.io/spinnaker-marketplace/halyard:stable`) to the Armory Halyard image (`index.docker.io/armory/halyard-armory:{{ site.data.versions.halyard-armory-version }}`)

1. Wait for the pod to start up.

1. Exec into your Kubernetes pod (insert your namespace and pod name, accordingly):

   ```bash
   kubectl exec -it spinnaker bash
   ```

1. Update the version of Spinnaker:

   ```bash
   hal config version edit --version $(hal version latest -q)
   ```

   This will use the latest stable version. If you want to use a different version, use `hal version list` to get a list of available versions, and then `hal config version edit --version X.X.X` to specify a specific version.

1. Apply your changes:

   ```bash
   hal deploy apply
   ```

## Revert

If you want to go back to OSS Spinnaker, you can repeat the same process as above with OSS Halyard. Specifically, replace the Armory Halyard image with the OSS Halyard image, update Spinnaker version (from 2.x to 1.x), and run `hal deploy apply`

## Troubleshooting

Depending on what version of Halyard / Armory Halyard you're moving to/from, there may be some fields in your Halyard configuration that are present in one version but not the other. You'll see an `Unrecognized field` error like this:


```bash
$ hal deploy apply
- Get current deployment
  Failure
Problems in Global:
! ERROR Could not translate your halconfig: Unrecognized field
  "nodeSelectors" (class
  com.netflix.spinnaker.halyard.config.model.v1.node.DeploymentEnvironment), not
  marked as ignorable (14 known properties: "size", "initContainers",
  "updateVersions", "consul", "customSizing", "vault", "gitConfig", "location",
  "sidecars", "haServices", "accountName", "type", "hostAliases",
  "bootstrapOnly"])
at [Source: N/A; line: -1, column: -1] (through reference chain:
  io.armory.halyard.config.model.v1.node.ArmoryHalconfig["deploymentConfigurations"]->java.util.ArrayList[0]->com.netflix.spinnaker.halyard.config.model.v1.node.ArmoryDeploymentConfiguration["deploymentEnvironment"]->com.netflix.spinnaker.halyard.config.model.v1.node.DeploymentEnvironment["nodeSelectors"])

- Failed to get deployment name.
```

If you see the above error, go to the `/home/spinnaker/.hal/config` file in your Halyard container, search for the offending field, and remove the yaml block (comment it out or completely remove it). 

For example, in the above case, find the `deploymentEnvironment.nodeSelectors field`, and remove it. Repeat as necessary.