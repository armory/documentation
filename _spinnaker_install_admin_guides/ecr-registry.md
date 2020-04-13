---
layout: post
title: "AWS: Configuring AWS ECR as a registry"
order: 52
redirect_from:
  - /admin-guides/ecr-registry/
  - /admin-guides/ecr_registry/
  - /admin_guides/ecr-registry/
  - /admin_guides/ecr_registry/
  - /spinnaker_install_admin_guides/ecr_registry/
  - /spinnaker_install_admin_guides/ecr-registry/
  - /spinnaker-install-admin-guides/ecr_registry/
---

This document reviews configuring ECR as a registry for a Spinnaker installation

### Adding ECR as a Docker Registry

When configuring a registry, you normally use standard `SpinnakerService` configuration if using the Operator, or the `hal` command for [adding a Docker Registry](https://www.spinnaker.io/reference/halyard/commands/#hal-config-provider-docker-registry-account-add) if using Halyard.

This works great for Dockerhub, but ECR requires a bit more work for configuration. Amazon ECR requires access tokens to access the images and those access tokens expire after a time.

In order to automate updating the token, we will use a [sidecar container](https://docs.microsoft.com/en-us/azure/architecture/patterns/sidecar) with a script that does it for us. Since both Clouddriver and the sidecar container need access to the ECR access token, we will use a shared volume to store the access token.

The sidecar we're going to add does not start with an access token, it needs to be able to request an access token from ECR. The Spinnaker installation must have the `AmazonEC2ContainerRegistryReadOnly` policy attached to the role assigned in order to request and update the required access token.


Note: If using Halyard, this process is easier in version `v1.10` and later. In these later versions, use the `--password-command` option to pass the command to update your access token.


## Update Configs

### Add a Sidecar for Token Refresh

In your `SpinnakerService` manifest, update the `spec.spinnakerConfig.config.deploymentEnvironment.sidecars` section if using Operator. If using Halyard, update your `~/.hal/config` in the `deploymentEnvironment.sidecars` section:

```yaml
  deploymentEnvironment:
    sidecars:
      spin-clouddriver:
      - name: token-refresh
        dockerImage: quay.io/skuid/ecr-token-refresh:latest
        mountPath: /etc/passwords
        configMapVolumeMounts:
        - configMapName: token-refresh-config
          mountPath: /opt/config/ecr-token-refresh
```

### Define an ECR registry

Add the following snippet in `SpinnakerService` manifest under section `spec.spinnakerConfig.profiles.clouddriver` if using the Operator, or create the file `~/.hal/<deployment>/profiles/clouddriver-local.yml` if using Halyard:

```yaml
dockerRegistry:
  enabled: true
  accounts:
  - name: my-ecr-registry
    address: https://<aws-account-id>.dkr.ecr.<aws-region>.amazonaws.com
    username: AWS
    passwordFile: /etc/passwords/my-ecr-registry.pass
```

Create a `config.yaml` to be used as a configmap

```yaml
interval: 30m # defines refresh interval
registries: # list of registries to refresh
  - registryId: "<aws-account-id>"
    region: "<aws-region>"
    passwordFile: "/etc/passwords/my-ecr-registry.pass"
```

Note: You can configure multiple registries here by adding another registry to both files listed above.


Apply it to the cluster with:
```bash
kubectl -n <namespace> create configmap token-refresh-config --from-file <config.yaml location>
```

### Update your Spinnaker installation

* **Operator**

    ```bash
    kubectl -n <spinnaker namespace> apply -f <SpinnakerService manifest>
    ```

* **Halyard**

    ```bash
    hal deploy apply --service-names clouddriver
    ```

Success! Now you will be able to use ECR as a docker registry in the configuration stage.

![](/images/Image 2018-12-18 at 2.02.02 PM.png)
