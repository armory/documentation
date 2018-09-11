---
layout: post
title: Kubernetes Configuration
order: 70
published: True
---

{% include components/legacy_documentation.html %}

To configure Kubernetes, you need to:
{:.no_toc}

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Configure your Docker Registries

Add the following stanza to the file `/opt/spinnaker/config/clouddriver-local.yml` under
the key `dockerRegistry`:
```
dockerRegistry:
  enabled: true
  accounts:
    - name: dockerhub
      address: MY_CONTAINER_PROVIDER  # If you are using dockerhub -
                                      # https://index.docker.io
      username: MY_USERNAME
      passwordFile: /opt/spinnaker/credentials/dockerhub.password
      repositories:
        - myorg/app1
        - myorg/app2
        ...
```
Modify the key `address` to reflect the address of your docker registry.

Modify the credentials in the key `username` and in the contents of the file `passwordFile` to reflect your login credentials.

If you are using **Dockerhub**, you must list the repositories from which you will deploy because
Dockerhub does not provide an api to discover available repositories.

Complete example:
```
dockerRegistry:
  enabled: true
  accounts:
    - name: dockerhub
      address: https://index.docker.io
      username: armoryspinnakerbot
      passwordFile: /opt/spinnaker/credentials/dockerhub.password
      repositories:
        - armory/armory-hello-deploy
        - armory/spinnaker-clouddriver
        - armory/spinnaker-deck
        - armory/spinnaker-igor
```

For additional insight into docker registries, see: [Docker Registries](https://www.spinnaker.io/setup/providers/docker-registry/).
Note that the program **hal** is not used to configure Armory Spinnaker.

### Using ECR Repositories

[AWS ECR](https://aws.amazon.com/ecr/) repositories require special handling within Spinnaker. This is because ECR credentials expire after 12 hours.
In order to use ECR repositories, you'll need to refresh credentials on a regular interval to ensure that Spinnaker can continue to communicate with the registry.
For every interval, `ecr-token-refresh` will request a new password and write it to a file. When configuring your Docker registries, you'll need to use the `passwordFile` option.

To do this, create the configuration file for `ecr-token-refresh` at `/opt/spinnaker/config/ecr/config.yml`
	
```
interval: 30m
registries:
  - registryId: 123456789 # aws account id
    region: us-west-2 # or another aws region
    passwordFile: /opt/passwords/us-west-2.pass
```

Then, add the following to `/opt/spinnaker/compose/docker-compose.override.yml`, creating if necessary.

```
version: "2.1"
services:
  clouddriver:
    volumes:
      - /opt/spinnaker/config/ecr-passwords/:/opt/passwords/
  ecr-token-refresh:
    container_name: ecr-token-refresh
    hostname: ecr-token-refresh-${HOSTNAME_SUFFIX}
    image: quay.io/skuid/ecr-token-refresh:latest
    volumes:
      - /opt/spinnaker/config/ecr/:/opt/config/ecr-token-refresh/ # config directory
      - /opt/spinnaker/config/ecr-passwords/:/opt/passwords/ # password directory
```

Finally, restart Armory Spinnaker by running `service armory-spinnaker restart`.


## Create a Kubectl Config File

You need a config file that you can use to interact with your Kubernetes cluster.

If you already have such a file that uses static configuration to talk
to your cluster, great! A common configuration for the Google Container Engine uses a short-lived access token, which
is problematic for Spinnaker.

To create your inital config file, run the following commands:
```
# (1) Configure cluster - Use the IP address of your cluster
kubectl config --kubeconfig=kubeconfig set-cluster mycluster --server https://192.168.1.1

# (2) Add the CA cert used by your cluster, if necessary;
kubectl config --kubeconfig=kubeconfig set-cluster mycluster --certificate-authority=/path/to/certfile
#
# or #
#
# edit kubeconfig, add the base64-encoded certificate data directory to the kubeconfig file in the
# attribute certificate-authority-data; e.g.,
#
# - cluster:
#     certificate-authority-data: LS0t...Qo=
#     server: https://35.193.38.121
#   name: mycluster

# (3) Create a user with basic auth; Adjust the user/password.
kubectl config --kubeconfig=kubeconfig set-credentials myuser --username=ADMIN --password=ADMINPASSWORD

# (4) Create a context
kubectl config --kubeconfig=kubeconfig set-context default --cluster mycluster --user=myuser
kubectl config --kubeconfig=kubeconfig use-context default
```

[//]: # (Comment) XXX NOTE don - don't know why, the --certificate-authority=filename didn't work for me, don't know why;
[//]: # (Comment) Tried putting both the plain cert and the base64 version in the file; YMMY.

If your kubeconfig file is properly configured, you should now be able to run the following command
to show your namespaces:
```
kubectl --kubeconfig=kubeconfig get ns
```

## Configure Clouddriver to use the kubectl Config File

To configure clouddriver to use your  kubectl config file,
copy your config file - either your existing .kube/config file or the kubeconfig file create above - to
`/opt/spinnaker/credentials/kubeconfig`.

Then, add the following stanza to the the file `/opt/spinnaker/config/clouddriver-local.yml`:

```
kubernetes:
  enabled: true
  accounts:
    - name: kubernetes
      kubeconfigFile: /opt/spinnaker/credentials/kubeconfig
      namespaces:
        - staging
        - default
        - demo
      dockerRegistries: # WARNING! only include configured accounts here
        - accountName: dockerhub
```
The listed namespaces are the the names of your kubernetes namespaces. You can find your configured
namespaces by running the command to list namespaces in the section above.

[//]: # (Comment) XXX NOTE don - What exactly is the point of listing the namespaces?
[//]: # (Comment) Are these allowed namespaces, or what?

Under `dockerRegistries`, you should list the account name of your docker registry.

## Persistence and Secrets Management

In many configurations, your kubeconfig file and your docker registry password file will contain
secrets that you need to protect.

A few possibilities for managing these secrets include:
* Placing a script in /opt/spinnaker/bin/secret to install your credentials;
* Using a secret management system;

If your Kubernetes cluster is non-sensitive, you can keep your kubeconfig file in a source control system.

## Verify Your Changes

### Restart Spinnaker

You must restart or redeploy Spinnaker before these changes will take effect.

### Make Sure Kubernetes shows up as a cloud provider

If Kubernetes is properly configured, kubernetes will appear as one of the choices for "Cloud Providers" when you use
the New Application dialog:

![NewApplication](/assets/images/kubernetes-newapplication.png)

You should see a similar option in the "Cloud Provider" section of the Edit Application dialog when editing existing application attributes via: config -> Edit Application Attributes:

![EditApplication](/assets/images/kubernetes-editapplication.png)


## Additional Information

For additional documentation on configuring Kubernetes, see the [Kubernetes Documentation](https://kubernetes.io/docs/tasks/access-application-cluster/configure-access-multiple-clusters/).
