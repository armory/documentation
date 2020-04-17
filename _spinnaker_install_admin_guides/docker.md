---
layout: post
title: Docker Registries
order: 51
redirect_from:
  - /spinnaker_install_admin_guides/docker/
---
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Configuring Docker Registries

This is a quick walkthrough of how to configure your Spinnaker to access a
Docker registry.  Many of the commands below have additional options that
may be useful (or possibly required).  If you need more detailed help, take
a look at the [Halyard command reference](https://www.spinnaker.io/reference/halyard/commands/#hal-config-provider-docker-registry) if you're using Halyard to deploy Spinnaker.

### Enable Docker Registries

If you haven't done this yet (for example, if you've just installed Armory
Spinnaker fresh), you'll need to enable Docker registry providers:

* **Operator**

    Add the following snippet to `SpinnakerService` manifest:

    ```yaml
    apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
    kind: SpinnakerService
    metadata:
      name: spinnaker
    spec:
      spinnakerConfig:  
        config:
          providers:
            dockerRegistry:
              enabled: true
    ```

* **Halyard**

    ```bash
    hal config provider docker-registry enable
    ```

### Add a Registry (and Repositories)

To add a new registry, you'll use some variation of the following configuration.
This example uses a public Docker Hub registry (armory/demoapp) and actually
would not use the `username` or `password` options, since the registry is
public.  In most cases, you'll be configuring a private registry and the
authentication credentials will be required, so the options are shown here
as an example.

* **Operator**

    Add the following snippet to `SpinnakerService` manifest:

    ```yaml
    apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
    kind: SpinnakerService
    metadata:
      name: spinnaker
    spec:
      spinnakerConfig:  
        config:
          providers:
            dockerRegistry:
              enabled: true
              accounts:
              - name: my-docker-registry
                requiredGroupMembership: [] # A user must be a member of at least one specified group in order to make changes to this account's cloud resources.
                providerVersion: V1
                permissions: {}
                address: https://index.docker.io   # The registry address you want to pull and deploy images from. For example: index.docker.io - DockerHub quay.io - Quay gcr.io - Google Container Registry (GCR) [us|eu|asia].gcr.io - Regional GCR localhost - Locally deployed registry
                username: yourusername             # Your docker registry username
                password: abc                      # Your docker registry password. This field support "encrypted" secret references.
                email: fake.email@spinnaker.io     # Your docker registry email (often this only needs to be well-formed, rather than be a real address)
                cacheIntervalSeconds: 30           # How many seconds elapse between polling your docker registry. Certain registries are sensitive to over-polling, and larger intervals (e.g. 10 minutes = 600 seconds) are desirable if you're seeing rate limiting.
                clientTimeoutMillis: 60000         # Timeout time in milliseconds for this repository.
                cacheThreads: 1                    # How many threads to cache all provided repos on. Really only useful if you have a ton of repos.
                paginateSize: 100                  # Paginate size for the docker repository _catalog endpoint.
                sortTagsByDate: false              # Sort tags by creation date.
                trackDigests: false                # Track digest changes. This is not recommended as it consumes a high QPM, and most registries are flaky.
                insecureRegistry: false            # Treat the docker registry as insecure (don't validate the ssl cert).
                repositories:                      # An optional list of repositories to cache images from. If not provided, Spinnaker will attempt to read accessible repositories from the registries _catalog endpoint
                - library/nginx
                # passwordFile: docker-pass        # The path to a file containing your docker password in plaintext (not a docker/config.json file). This field support "encryptedFile" secret references.
                # passwordCommand: abc # Command to retrieve docker token/password, commands must be available in environment
                # environment: dev # The environment name for the account. Many accounts can share the same environment (e.g. dev, test, prod)
    ```

* **Halyard**

    ```bash
    hal config provider docker-registry account add my-docker-registry \
        --address index.docker.io
        --repositories armory/demoapp
        --username yourusername
        --password # you'll be prompted for this interactively
    ```

    Detailed information on all command line options can be found [here](https://www.spinnaker.io/reference/halyard/commands/#hal-config-provider-docker-registry-account-add)

Note:  Some registries, like Docker Hub, require you to identify the
repositories explicitly, like above.  Some do not (such as the Google
Container Registry).  Further details can be found [here](https://www.spinnaker.io/setup/install/providers/docker-registry/).

Amazon's ECR requires additional configuration to work properly with Spinnaker.
[We've documented this separately.](/spinnaker-install-admin-guides/ecr-registry/)
