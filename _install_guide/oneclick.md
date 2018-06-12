---
layout: post
title: 1-Click App Creation
order: 125
---

# What To Expect
This guide should include:
- Configuration changes needed to configure the 1-click app/resource provisioning feature

## Overview
Armory's 1-click app/resource provisioning feature allows you to bootstrap a brand new application and provision the following resources for the app with the click of a button:
- Github Repo
- Spinnaker application
- Loadbalancer (service) in the Kubernetes cluster where the app will be deployed
- DNS name for the app

The above is just a sample list of steps that will happen during  app provisioning. This list is extensible through configuration (explained later).

## Steps to follow to configure 1-click app creation:

- Enable the *Armory Platform*, by setting the following feature flags in `spinnaker-local.yml`:
```
features:
    armoryPlatform:
      enabled: true
      uiEnabled: true
```

- Create a new file: `config/platform-local.yml` with the following contents:
```
github:
    apiCredentialsPath: /opt/spinnaker/credentials/github-creds.txt
    organization: armory-io  # your github Org
oneClick:
    templatesConfigPath: /config/oneclick-local.yml  # the config file for the oneclick template (optional)
    lbNamespace: default   # The K8s namespace where the Loadbalancer is created
```

> Note: The contents of the file `/opt/spinnaker/credentials/github-creds.txt` should be of the format: `username:token` for the github API. You can create a personal access token (in  [GitHub](https://github.com/settings/tokens)) that has read/write access in the org where the new application will be created.


With the above config changes, once you redeploy Armory spinnaker, you should see a navbar on top that looks like this:

![navbar](http://f.cl.ly/items/0P0u2v2J3l3f103Z2N0e/navbar.png)

Clicking on the `Create App` button on the top right corner should bring up a modal that will allow you to select a template, enter an application name to provision the app:

![modal](http://f.cl.ly/items/1D3D0y2y1Z3C0w29253L/1-click-modal.png)

By default, the 1-Click App Creation performs the following tasks:
- `createPipeline` : This step creates a Deploy pipeline in spinnaker for the new app. If the spinnaker application doesn't exist, it creates the application first before creating the pipeline. This pipeline is copied over from a template pipeline that is already in spinnaker and defaults to `oneclickgotemplate` app in spinnker. The default app to copy from can be overwritten in the configs (explained below)
  
- `createLoadBalancer` : This step creates a load balancer in the Kubernetes cluster where the app will be deployed. (If deploying to a non-Kubernetes cloud provider, this step should be disabled in the configs)

- `createGithubRepo` : This step creates a repo in github to bootstrap the app. Ideally this repo follows a widly adopted project structure (such as [this](https://github.com/golang-standards/project-layout) for Golang). It has a `Jenkinsfile` which triggers of a build of the repo on every check-in. That build can push an artifact to a repository (like docker hub), which can be the trigger for the Deploy pipeline created above (in the `createPipeline` step). Additionally, this repo can also have a `dinghyfile` [Pipelines-as-code](http://docs.armory.io/user-guides/dinghy) to create a custom pipeline instead of using the one created above.

- `createGoogleDNSEntry` : This step creates a DNS entry (in GCP for the alpha version) for the app that is deployed.

The follwing is a sample `config/oneclick-local.yml` template that can be used to customize/override defaults. Points to note:
- We're skipping the `createLoadBalancer` _action_ in the yaml file.
- The `basePipelineApp` is the app in spinnaker where the deploy pipeline is copied over from (the dashes `-` in the name are ignored since spinnaker doesn't allow them in app names).
- The `repoURL` field is the template repo on which the app is based.
- The `name` field is used for the name of the template to copy from (usually same as `basePipelineApp`)
- The `image` field controls what image is displayed in the modal while choosing templates. (leave it as `gopher` in the alpha version)

```{% raw %}
templates: 
  - actions: 
      - createPipeline
      - createGithubRepo
      - createGoogleDNSEntry
    basePipelineApp: oneclick-go-template
    image: gopher
    name: oneclick-go-template
    repoURL: "https://github.com/armory-io/oneclick-go-template"
{% endraw %}```