---
layout: post
title: Using Kustomize for Manifests
order: 100
---
Note that Kustomize is currently in [Beta](https://kb.armory.io/releases/early-release-beta-GA/). The feature is working and installable but is not meant for production use.
​
​
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}
​
​
Kustomize is a tool that lets you create customized Kubernetes deployments without modifying underlying YAML configuration files. Since the files remain unchanged, others are able to reuse the same files to build their own customizations. Your customizations are stored in a file called `kustomization.yaml`. If configuration changes are needed, the underlying YAML files and `kustomization.yaml` can be updated independently of each other.
​
To learn more about Kustomize and how to define a `kustomization.yaml` file, see the following links:
​
* [Kubernetes SIG for Kustomize](https://github.com/kubernetes-sigs/kustomize)
* [Documentation for Kustomize](https://github.com/kubernetes-sigs/kustomize/tree/master/docs)
* [Example Kustomization](https://github.com/kubernetes-sigs/kustomize/tree/master/examples/wordpress)
​
In the context of Spinnaker, Kustomize lets you generate a custom manifest, which can be deployed in a downstream `Deploy (Manifest)` stage. This manifest is tailored to your requirements and built on existing configurations.
​
Spinnaker uses the latest non-kubectl version of Kustomize.
​

# Kustomize in 2.16 (Beta)
​
## Enabling Kustomize in 2.16 (Beta)
​
Kustomize can be enabled by a feature flag in 2.16.

* **Operator**

    Add the following settings to the `SpinnakerService` manifest:

    ```yaml
    apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
    kind: SpinnakerService
    metadata:
      name: spinnaker
    spec:
      spinnakerConfig:    
        profiles:
          deck:
            settings-local.js: |
              window.spinnakerSettings.feature.kustomizeEnabled = true;
    ```
​
* **Halyard**

    Add the following line to `~/.hal/{DEPLOYMENT_NAME}/profiles/settings-local.js`:
​
    ```javascript
    window.spinnakerSettings.feature.kustomizeEnabled = true;
    ```
​
## Using Kustomize
​
Kustomize works by running `kustomize build` against a `kustomization.yaml` file located in a Git repository. This file defines all of the other files needed by Kustomize to render a fully hydrated manifest.
​
Select `Kustomize` as the Render Engine and define the artifact for your `kustomization.yaml`:
​
![](/images/kustomize-render-engine.png)
​
​
With the Kustomize file defined, configure a Produced Artifact to use the result in a stage downstream.
Add an artifact:
​
![](/images/kustomize-add-artifact.png)
​
Define the artifact:
​
![](/images/kustomize-define-artifact.png)
​
You can now run your pipeline and get a Kustomize rendered manifest!
​
# Kustomize in 2.17 (Beta)
​
### Requirements
Kustomize in 2.17+ requires the [git/repo](https://www.spinnaker.io/reference/artifacts/types/git-repo/) artifact type.
​
## Enable Kustomize
​
Kustomize can be enabled by a feature flag in Armory Spinnaker 2.16 and later.

* **Operator**

    Add the following settings to the `SpinnakerService` manifest and apply the changes:

    ```yaml
    apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
    kind: SpinnakerService
    metadata:
      name: spinnaker
    spec:
      spinnakerConfig:    
        profiles:
          deck:
            settings-local.js: |
              window.spinnakerSettings.feature.kustomizeEnabled = true;
    ```

* **Halyard**

    Add the following line to `~/.hal/{DEPLOYMENT_NAME}/profiles/settings-local.js`:
​
    ```javascript
    window.spinnakerSettings.feature.kustomizeEnabled = true;
    ```

    Apply your changes to your Spinnaker deployment:  `hal deploy apply`. Wait until the pods are in a RUNNING state before proceeding.
​

You can now use the *KUSTOMIZE* option on a _Bake (Manifest)_ stage.
​
![](/images/kustomize-enable.png)
​
> **Note:** Sometimes you will need to clear the cache in your browser in order to see the new *KUSTOMIZE* option available on a _Bake (Manifest)_ stage.

​
## Build the Pipeline
​
For this example, we are going to use this [kustomize public repository](https://github.com/kubernetes-sigs/kustomize), specifically the *helloWorld* example.
* * *
### Step 1 - Add an Expected Artifact
​
Add a **git/repo** Expected Artifact in the _Configuration_ section:
​
- **Account** (Required): The `git/repo` account to use.
- **URL** (Required): The location of the Git repository.
- **Branch** (Optional): The branch of the repository you want to use. _Defaults to  `master`._
- **Subpath** (Optional): By clicking `Checkout subpath`, you can optionally pass in a relative subpath within the repository. This provides the option to checkout only a portion of the repository, thereby reducing the size of the generated artifact.

​![](/images/kustomize-expected-artifact.png)

> **Note:** In order to execute the pipeline mannualy, it is necesary to check the *Use Default Artifact* and also fill the fields (same information above).
​

### Step 2 - Add a Bake (Manifest) Stage
​
Add a **Bake (Manifest)** stage and choose the Render Engine *KUSTOMIZE*. Then, select the Expected Artifact you created in step 1 and specify the path for the **kustomization.yaml** file.
​
 ![](/images/kustomize-bake.png)
​
### Step 3 - Produce the Artifact
​
Spinnaker returns the _manifest_ in a Base64 encoded file, so it is necessary to Produce a single Base64 Artifact in this Bake (Manifest) stage:
​
![](/images/kustomize-base64.png)
​
### Step 4 - Deploy
​
Finally, add a **Deploy (Manifest)** stage. Make sure to select the _Manifest Source_: **Artifact** and select the Base64 Artifact produced by the _Bake (Manifest)_ stage.
​
![](/images/kustomize-deploy.png)
​
> **Note:** Due we are deploying a manifest without a specified namespace we need to override the namespace checking the _"Override Namespace"_ option in the deployment stage.

## Run the Pipeline
​
After you execute the pipeline, you can see the manifest generated in YAML format by clicking on the _Baked Manifest YAML_ link:
​
![](/images/kustomize-execution.png)
​
Also in the _Deploy_ stage you can see the Kubernetes objects as result of the manifest deployment.
