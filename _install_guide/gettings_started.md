---
layout: post
title: Gettings Started
order: 10
---

In this guide you will learn how to install Armory Spinnaker on AWS. You will learn how to configure Spinnaker so that you can use it to deploy your applications to any environment safely and securely.

As you go through this guide, keep in mind that there are four major milestones:

- Installing Spinnaker
- Re-deploying Spinnaker
- Deploying an Application
- Production Readyness


## Spinnaker's Workflow

Before we dive in, it is important to understand the workflow that Spinnaker prefers. This will allow us to understand what we need to install and configure and why. Lets go over it from the beginning to the end. The process starts with a code change and ends with that code running in production. The general case is:

1. A change is made to master in your code repository.
2. The build system creates an artifact.
3. The build system pushes that artifact to a central artifact repository or registry.
4. This causes a deploy pipeline to trigger within Spinnaker.
5. Spinnaker downloads the artifact from the central artifact repository or registry.
6. (Optional) Spinnaker creates an image from the artifact.
7. Spinnaker deploys the image to an environment.


For example, suppose you are using GitHub, Jenkins, Artifactory and AWS. Then a deployment workflow might look like:

1. A change is made to master in your code repository.
2. Jenkins creates a deb package from the code in the GitHub repo.
3. Jenkins archives the deb package and uploads it to Artifactory.
4. Spinnaker triggers a pipeline based on the Jenkins job completing.
5. Spinnaker downloads the artifact from Artifactory.
6. Spinnaker creates and AMI with the artifact and any of its dependencies.
7. Spinnaker deploys the AMI to an environment.



## Milestones

The following steps are broken up insto milestones. However, you should follow them serially. Click on the bullet points below to go to the guide.


### Installing Armory Spinnaker

The first goal is to get Spinnaker installed and running to the point where we can connect to its UI.

We will do the following:

- [Install Armory Spinnaker]()


### Re-Deploying Spinnaker

Next we will configure Spinnaker so that it can re-deploy itself. This way we can make configuration changes without any trouble.

We will do the following:

- [Tag AWS Subnets]()
- [Create a GitHub repo for Spinnaker's configuration files]()
- [Use Jenkins to create a deb package from configuration files]()
- [Configure Spinnaker to trigger from Jenkins]()
- [Configure Spinnaker to download the package from a central artifact repository]()
- [Create a pipeline for Spinnaker to deploy Spinnaker]()


### Deploying An Application

After we have Spinnaker in a re-deployable state we can get started on deploying an application.

We will do the following:

- [Add additional cloud provider accounts (and possibly subnets)]()
- [Adjust Packer scripts]()
- [Create a pipeline to deploy the application]()


### Production Ready

Before opening Spinnaker up for general availability within your organization, there are several concerns to address.

We will do the following:

- [Add a DNS name and SSL]()
- [Setup Authentication]()
- [Setup Authorization]()
- [Configure centralized logging]()
- [Pre-create common Packer templates]()


### Next Steps

Optionally, you may want to:

- [Configure Notifications]()
- [Setup Audit Logging]()

Once you have Spinnaker production ready, it is time to onboard users. You may want to:

- Make Packer scripts to help [migrate from Chef, Puppet or Salt]()
- Share the [User Guides]()
- Provide example pipelines that are specific to your organization
