---
layout: post
title: Initial Setup
order: 1
published: false
---
# Setting Up Armory Spinnaker
{:.no_toc}

The [installation guide]({% link _install_guide/subnets.md %}) described how to install Armory Spinnaker for the first time. Once it is installed you will need to configure your environment in order to fully utilize Spinnaker.

An ideal EC2 based deployment has the following workflow:
1. A change is made to master in your code repository.
2. Jenkins builds the repo and archives a artifact.
3. Jenkins uploads the artifact to an artifact repository.
4. Spinnaker triggers a pipeline based on the Jenkins job completing.
5. Spinnaker downloads the artifact from the central artifact repository.
6. Spinnaker creates and AMI with the artifact installed.
7. Spinnaker deploys the AMI to an environment.

This guide will outline the steps necessary to configure Spinnaker for the above workflow.

While configuring Spinnaker for the first time you should scale down your Spinnaker cluster to one instance. You will also need to change the Autoscaling Group healthcheck type from ELB to EC2. This will allow you to restart Armory Spinnaker without the ASG terminating the instance.

Start by SSH'ing to the single instance of Armory Spinnaker. Throughout this guide you will be making changes to the `.yml` files in `/opt/spinnaker/config/`. In order for the changes to take affect you will need to restart Armory Spinnaker. To restart run the following:
```
$ sudo service armory-spinnaker stop
$ sleep 15
$ sudo service armory-spinnaker start
```

It will take a moment for the services to come back online. You can check its status by running:
```
$ watch curl http://localhost:5000/healthcheck
```
Then `ctrl+c` to exit watch once it is healthy.

## Adding AWS Accounts
The first thing you need to do is configure the AWS accounts you would like to use as deploy targets. Check out the instructions [here]({% link _install_guide/adding_accounts.md %}). Restart Spinnaker. You can verify the accounts are registered by SSHing to the Spinnaker instance and running:
```
$ curl http://localhost:8084/credentials
```
You should see something like this:
```
[
  {
    "accountId": "315216489504",
    "name": "default-aws-account",
    "requiredGroupMembership": [],
    "type": "aws"
  },
  {
    "accountId": "025174528366",
    "name": "aws-dev",
    "requiredGroupMembership": [],
    "type": "aws"
  }
  {
    "accountId": "136468154731",
    "name": "aws-staging",
    "requiredGroupMembership": [],
    "type": "aws"
  }
]
```
Verify that the `accountId`s match what you intended.

## Subnets
After you have your accounts added to Spinnaker, you will need to configure the tags on the subnets. Only configured subnets can be deployed to by Spinnaker. Spinnaker would like you to categorize your subnets so that it knows which ones are similar enough to deploy to for different purposes. There is a seperate guide on configuring your subnets that you can find [here]({% link _install_guide/subnets.md %})


## Jenkins
You can add a Jenkins master to Spinnaker by following [this guide]({% link _install_guide/jenkins.md %}). Once the master is added you will need to restart your Spinnaker instance. You can verify that the master has been added correctly by running the following form the instance:
```
$ curl http://localhost:8084/v2/builds
```
You can expect a response similar to:
```
["Prod Jenkins Master", "Dev Jenkins Master"]
```
You should also double check that the Spinnaker instance can access the Jenkins master by running:
```
$ curl http://<your-jenkins-hostname>/api/xml
```
Note: you may need to specify a username and password with your curl command.


## Artifact Repository
You will need to make sure you can communicate the with the artifact repository. This is usually more an excercise in networking and permissions. To double check, you can run curl in a similar fasion to the Jenkins setup above. 

If you are using a deb or RPM repository then you will need to create a base AMI that has your repo's source list and GPG keys installed. Then Spinnaker should use that base AMI in a bake stage.
