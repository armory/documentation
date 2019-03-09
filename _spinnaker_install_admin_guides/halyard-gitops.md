---
layout: post
title: Spinnaker Gitops with Halyard
order: 152
---
This article describes how to automate the deployment of Spinnaker and manage its configuration in source control.
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Store your current configuration in source control
You can group configurations of different Spinnakers in a single repository, use different repositories, or even use a single `config` file with multiple deployments.

As a pre-requisite:
- you should [store secrets outside of your configuration](../secrets-s3).
- you should also not store multiple deployments in the same `config` file. This makes it easier to see the history of configuration changes and avoid deploying all configurations when only one has changed.

## Configure Halyard
In `halyard.yml`, configure the deployments you'd like to manage:

```yaml
halyard:
  halconfig:
    storage:
      github:
        # You can use encrypted secrets here to pass sensitive information
        token: encrypted:...
    configs:
    - name: staging
      github:
        path: github.com:acmecorp/spinnaker-configs/staging
        branch: master
    - name: prod
      github:
        path: github.com:acmecorp/spinnaker-configs/prod
        branch: master
...
```

The `path` should be to the root of the directory containing the `config` file.


Note: Make sure the `currentDeploymentName` in the configuration is the one you want to deploy (or `default` if not specified).

## Option 1: Deploy from the CI tool environment

Configure your CI tool to perform the following action on pushes to `master` (or the branch of your choice):

```
docker run  \
    -e AWS_ACCESS_KEY_ID:${AWS_ACCESS_KEY_ID} \
    -e AWS_SECRET_ACCESS_KEY:${AWS_SECRET_ACCESS_KEY} \
    docker.io/armory/halyard-armory:{{ site.data.versions.halyard-armory-version }} \
    hal deploy apply
```

`AWS_ACCESS_KEY_ID` and `AWS_SECRET_ACCESS_KEY` environment variables specify an account that has access to your configuration secrets. [Other authentication methods](https://docs.aws.amazon.com/sdk-for-java/v1/developer-guide/credentials.html) are available.


## Option 2: Deploy Halyard as a service
Halyard Armory can be configured to read configurations from source control and automatically deploy Spinnaker when changes on a specific branch are detected. This allows Halyard to be deployed in the same cluster as Spinnaker making validations more accurate.


<div class="alpha-warning">
  This feature is in alpha stage with Armory Spinnaker. <a href="https://www.armory.io/contact">Get in touch</a> and give us feedback!
</div>


Create a config map for Halyard's configuration:
```
kubeconfig -n YOUR_NAMESPACE create configmap halyard-config --from-file=./halyard.yml
```

Then make a deployment manifest:
```yaml
apiVersion: extensions/v1beta1
kind: Deployment
metadata:
  annotations:
  labels:
    app: halyard
  name: halyard-armory
  namespace: YOUR_NAMESPACE
spec:
  replicas: 1
  selector:
    matchLabels:
      app: halyard
  template:
    metadata:
      labels:
        app: halyard
    spec:
      containers:
      - name: halyard
        image: docker.io/armory/halyard-armory:{{ site.data.versions.halyard-armory-version }}
        volumeMounts:
        - name: halyard-config-volume
          mountPath: /opt/spinnaker/config
        ports:
        - containerPort: 8064
          protocol: TCP
      volumes:
      - name: halyard-config-volume
        configMap:
          name: halyard-config
```

We can then expose Halyard. Refer to [Kubernetes](https://kubernetes.io/docs/reference/generated/kubectl/kubectl-commands#expose) or your cloud provider documentation for more options:
```
kubectl -n YOUR_NAMESPACE expose deployment halyard-armory --type=LoadBalancer --port=80
```

Don't forget to:
- Refer to your cloud provider documentation to create a secure endpoint.
- Secure Halyard's endpoints by limiting IP sources or using security groups of your cloud provider.
- Make sure Halyard is configured to access to your secret store so it can decrypt secrets.
- Add a DNS record for Halyard

### Option 2a: Direct webhook
Note: As of this time, only Github webhooks are supported.

In Github, navigate to the settings of the repository containing your Spinnaker configuration, find the webhook section, and select "Add webhook".
- Use `https://HALYARD_HOSTNAME/webhook/github` for the Payload URL
- Select Push events and Pull Requests for the types of events you'd like to receive.

![Github Webhook](/assets/images/halyard-webhook-github.png)

Note: You'll need to make sure that the service is exposed externally and reachable by [Github servers](https://help.github.com/en/articles/about-githubs-ip-addresses).

### Option 2b: Use CI
You may already have a CI tool configured with Github that validates pull requests and reacts to merges.

To validate, run a simple script - replacing `CONFIG_NAME` with the value specified in `halyard.yml` (staging and prod in the examples above):
```
curl -XPOST https://HALYARD_HOSTNAME/v1/config/deployments/CONFIG_NAME/generate
```

To deploy:
```
curl -XPOST https://HALYARD_HOSTNAME/v1/config/deployments/CONFIG_NAME/deploy
```

Note that you'll need to determine the `CONFIG_NAME` from the CI's job trigger if you use the same repository for multiple Spinnaker configurations.

### Option 2c: CI + Spinnaker
A third option is to use Spinnaker itself to deploy configuration changes and keep your CI tool validating changes.


## Forcing redeploy
If webhooks or CI jobs fail, you can still force a redeployment by going into the Halyard pod and issuing:
```bash
hal deploy apply --deployment DEPLOYMENT_NAME
```

Or remotely - if you can reach the service - by issuing:

```bash
hal deploy apply --daemon-endpoint https://HALYARD_HOSTNAME --deployment DEPLOYMENT_NAME
```

Finally, you still have the option of deploying Spinnaker from another remote machine with a [local Halyard installation](/spinnaker/install/#installation-1) if your network access allows it.

## Usage
Making configuration changes to Spinnaker is as easy as a pull request:

```bash
git clone git@github.com:acmecorp/spinnaker-configs.git
cd spinnaker-configs
git checkout -b new-accounts
# Make the change to the config
...
# Push the branch and make a pull request
...
```

Changes are controlled via your current organization authorization policies ensuring any configuration change is auditable, reviewed, and reversible.
