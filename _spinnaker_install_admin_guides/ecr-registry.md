---
layout: post
title: Configuring an ECR as a registry
order: 120
---

This document reviews configuring ECR as a registry for a Spinnaker installation

### Adding ECR as a Docker Registry

When configuring a registry, you normally use the `hal` command for [adding a Docker Registry](https://www.spinnaker.io/reference/halyard/commands/#hal-config-provider-docker-registry-account-add).

This works great for Dockerhub, but ECR requires a bit more work for configuration. Amazon ECR requires access tokens to access the images and those access tokens expire after a time.

In order to automate updating the token, we will use a [sidecar container](https://docs.microsoft.com/en-us/azure/architecture/patterns/sidecar) with a script that does it for us. Since both Clouddriver and the sidecar container need access to the ECR access token, we will use a shared volume to store the access token.

The sidecar we're going to add does not start with an access token, it needs to be able to request an access token from ECR. The Spinnaker installation must have the `AmazonEC2ContainerRegistryReadOnly` policy attached to the role assigned in order to request and update the required access token.


Note: This will become easier to do in 1.10, you will be able to use the `--password-command` option to pass the command to update your access token. There will documentation for this once it becomes available in an Armory release.


## Update Configs

### Add a Sidecar for Token Refresh

In your `~/.hal/config`, update the `deploymentEnvironment.sidecars` section:
```
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

### Define ECR registry



Create `~/.hal/<deployment>/profiles/clouddriver-local.yml`:
```
dockerRegistry:
  enabled: true
  accounts:
  - name: my-ecr-registry
    address: https://<aws-account-id>.dkr.ecr.<aws-region>.amazonaws.com
    username: AWS
    passwordFile: /etc/passwords/my-ecr-registry.pass
```

Create a `config.yaml`

```
interval: 30m # defines refresh interval
registries: # list of registries to refresh
  - registryId: "<aws-account-id>"
    region: "<aws-region>"
    passwordFile: "/etc/passwords/my-ecr-registry.pass"
```

Note: You can configure multiple registries here by adding another registry to both files listed above.


Apply it to the cluster with:
```
kubectl -n <namespace> create configmap token-refresh-config --from-file <config.yaml location>
```

### Update your Spinnaker installation
```
hal deploy apply --service-names clouddriver
```


Now you can add ECR as a docker registry in the configuration stage

![](https://d2ddoduugvun08.cloudfront.net/items/430k0r1Q2s1m1f032z3E/Image%202018-12-18%20at%202.02.02%20PM.png)
