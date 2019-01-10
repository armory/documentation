---
layout: post
title: Terraform Integration
order: 141
---

The following tutorial will walk you through how to setup the alpha version of our Terraform integration and execute Terraform code stored in a Github repo as part of a Spinnaker pipeline. We'll assume that you're using Terraform to create and manage infrastructure on AWS.


## How to submit feedback

If you decide to enable this feauture and have any feedback you'd like to submit, please let us know at [go.armory.io/ideas](go.armory.io/ideas)! We're constantly iterating on customer feedback to ensure that the features we build make your life easier!

## Prerequisites

1. A Armory Spinnaker installation running on Kubernetes and installed via Armory Halyard. ([instructions](/spinnaker/install)).
2. A Github API token that has access to your Terraform project. See [this documentation](https://blog.github.com/2013-05-16-personal-api-tokens/) for details on how to generate this token.
3. An AWS keypair with with enough permission to access your state store in S3 and manage the resources created by Terraform.

## Installation

#### Deploying the Terraformer service

The core of our Terraform integration is the Terraformer service. This is the service which is responsible for fetching your Terraform code and executing it. To do this, we'll need to install the following Kubernetes manifest using `kubectl`. *Note: we'll be adding support for deploying Terraformer via Halyard in future releases.* 

You'll need to replace 4 references before doing so:
1. `your-github-api-token` - the API token which will be used to fetch your repository
2. `profile-name` - the name of the AWS profile which your Terraform code will use to provision infrastructure
3. `your-aws-access-key` - the AWS Access Key ID of your keypair
4. `your-aws-secret-access=key` - the AWS Secret Access Key of your keypair

```
apiVersion: v1
kind: ConfigMap
metadata:
  name: terraformer-config
  namespace: spinnaker
data:
  terraformer.yml: |
    server:
      host: 0.0.0.0
      port: 7088
    redis:
      enabled: ${services.redis.enabled}
      host: ${services.redis.address}
      port: ${services.redis.port}
    clouddriver:
      baseUrl: http://spin-clouddriver:7002
    git:
      token: {your-github-api-token}
    executor:
      workers: 3
---
apiVersion: v1
kind: ConfigMap
metadata:
  name: terraformer-credentials
  namespace: spinnaker
data:
  credentials: |
    [profile-name]
    aws_access_key_id = {your-aws-access-key}
    aws_secret_access_key = {your-aws-secret-access-key}
---
apiVersion: apps/v1
kind: Deployment
metadata:
  name: spin-terraformer
  namespace: spinnaker
  labels:
    app: spin
    cluster: spin-terraformer
spec:
  replicas: 1
  selector:
    matchLabels:
      app: spin
      cluster: spin-terraformer
  template:
    metadata:
      labels:
        app: spin
        cluster: spin-terraformer
    spec:
      containers:
      - name: terraformer
        image: docker.io/armory/terraformer:0.0.1-master-cc65a45
        ports:
        - containerPort: 7088
        volumeMounts:
        - name: terraformer-config
          mountPath: /opt/spinnaker/config
        - name: terraformer-credentials
          mountPath: /root/.aws
      volumes:
      - name: terraformer-config
        configMap:
          name: terraformer-config
      - name: terraformer-credentials
        configMap:
          name: terraformer-credentials
---
kind: Service
apiVersion: v1
metadata:
  name: spin-terraformer
  namespace: spinnaker
  labels:
    app: spin
    cluster: spin-terraformer
spec:
  selector:
    app: spin
    cluster: spin-terraformer
  ports:
  - protocol: TCP
    port: 7088
    targetPort: 7088
  type: ClusterIP
```


### Configuring other services

In order to enable the Terraform stage, you'll need to override the Orca Docker image that is deployed by Halyard. Future releases will include this by default but, since this feature is in alpha, we need to use a special version of Orca. To do so, we'll override the `artifactId` for Orca by creating a file called `~/.hal/default/service-settings/orca.yml` with the following content.

```
# ~/.hal/default/service-settings/orca.yml
artifactId: docker.io/armory/orca:1.0.2-e52579de1ad0e7e1f01f5468af0249d0f4f21bca-b5-b8d7410
```

Next, we need to enable Terraform support within Orca by creating a custom configuration profile. In a file called `~/.hal/default/profiles/orca-local.yml` add the following configuration

```
# ~/.hal/default/profiles/orca-local.yml
terraformer:
  enabled: true
  baseUrl: http://spin-terraformer:7088
````

Finally, we'll add a proxy configuration to Gate. This will enable us to access the log output from Terraform executions via the UI. Create a file called `~/.hal/default/profiles/gate-local.yml` with the following configuration.

```
proxies:
  - id: terraform
    uri: http://spin-terraformer:7088
    methods:
      - GET
```

Roll these configuration changes out with `hal deploy apply`. 


## Configuring a Terraform stage

Our Terraform integration exposes a new stage in Spinnaker called `terraform`. Since there's no UI for Terraform (yet) we'll need to edit the stage as JSON. The JSON representation for this stage is as follows:

```

{
  "action": "{terraform-command-to-execute}",
  "artifacts": [
    {
      "reference": "{github-repo-where-your-code-lives}",
      "type": "git/repo"
    }
  ],
  "dir": "{target-terraform-directory}",
  "type": "terraform"
}
```

So, for example, if you want to execute `terraform plan` against a Github repository stored at `https://github.com/myorg/my-terraform-repo` the stage would be configured as such.

```
{
  "action": "plan",
  "artifacts": [
    {
      "reference": "https://github.com/myorg/my-terraform-repo",
      "type": "git/repo"
    }
  ],
  "dir": "/",
  "type": "terraform"
}
```

When run, this stage will tell Terraformer to clone your repository and execute `terraform plan` against it. In order to run `terraform apply` simply change the `action` from `plan` to `apply`. *Note: we execute `terraform init` before all Terraform actions to initialize the project.*

## Viewing Terraform log output

Terraform's primary interface for user feedback is logging. When executed on your workstation, this log output is streamed to `stdout`. Out integration captures that output and makes it available via the API. While we work on fine-tuning the UI for this integration these logs can be viewed by inserting the following spinnet into the Comments section of the `terraform` stage or the Instructions section of a Manual Judgement stage.

*Note: replace the reference to `your-gate-url` with the actual URL for Gate and the `Plan` stage name to the name of your plan or apply stages.*

```
View the logs <a href="https://your-gate-url/proxies/terraform/api/v1/job/${#stage('Plan')['context']['status']['id']}/logs">here</a>
```


## Reference pipeline

A reference pipeline which uses this feature can be found [here](https://gist.github.com/ethanfrogers/5123a5336f7e6ae4fd5fcda76536199b). It should help you get started! To use it, simply create a pipeline in the UI and click "Edit as JSON" under the "Pipeline Actions" dropdown and past the pipeline JSON into the text box.
