---
layout: post
title: PaCRD
order: 171
---

<!-- Note:
  Setting Order as 171 so it shows up at the bottom on the Spinnaker section
  of the Armory docs, given it's experimental status. When/if this product
  hits GA we probably want to move it further up the list and/or replace
  Dinghy docs in time.
!-->

{% include components/experimental_feature.html %}

PaCRD is considered [**Experimental**] software. This feature is working and
installable but is missing functionality and subject to rapid change.

__Interested in joining this experiment?
[Contact us](mailto:pipelines-as-code@armory.io) for more information.__

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Overview

PaCRD (a combination of "Pipelines as Code" and "Custom Resource Definition") is
a [Kubernetes controller] that manages the lifecycle of Spinnaker applications
and pipelines as objects within your cluster. PaCRD extends Kubernetes
functionality to support Spinnaker Application and Pipeline objects that can be
observed for changes through a mature lifecycle management API.

With PaCRD you can:

- Maintain your Spinnaker pipelines as code with the rest of your Kubernetes
manifests.
- Persist Pipeline and Application changes with confidence to your Spinnaker
cluster.
- Leverage existing tools like Helm and Kustomize to template your pipelines
across teams and projects.

To get started right away, check out the [Quick Start](#quick-start) section for installation instructions.

## Prerequisites

To use PaCRD, make sure you meet the following requirements:

- Have a working Kubernetes 1.11+ cluster
- Have a working Spinnaker installation
  - Although there is no minimum version required for this experiment, Armory
  recommends using the latest release
- Have permissions to install CRDs, create RBAC roles, and create service
accounts

## Quick Start

Download the current `pacrd` manifest to your local machine:

```
curl -fsSL https://engineering.armory.io/manifests/pacrd-0.3.1.yaml > pacrd-0.3.1.yaml
```

Then, inspect the manifest to make sure it is compatible with your cluster.

Create the following files in the directory where you downloaded the `pacrd` manifest to customize the
installation: `kustomization.yaml` and `patch.yaml`.

Start by creating a `kustomization.yaml` file, which contains
the installation settings:

```yaml
# file: kustomization.yaml
resources:
  - pacrd-0.3.1.yaml
patchesStrategicMerge:
  - patch.yaml
namespace: spinnaker  # Note: you should change this value if you are _not_ deploying into the `spinnaker` namespace.
```

Next, create a `patch.yaml` file that contains your `pacrd` config. If you are not
deploying into the `spinnaker` namespace, update the `front50` and `orca` keys:

```yaml
# file: patch.yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: pacrd-config
  namespace: spinnaker
data:
  pacrd.yaml: |
    spinnakerServices:
      # NOTE: change `spinnaker` to your namespace name here
      front50: http://spin-front50.spinnaker:8080
      orca: http://spin-orca.spinnaker:8083

```

When you are ready, apply the `pacrd` manifest to your cluster:

```sh
# If using `kubectl` >= 1.14
kubectl apply -k .

# Otherwise, use `kustomize` and `kubectl` toegether
kustomize build | kubectl apply -f -
```

<!--

Since we're still experimental, and we don't allow a lot of configuration right
now, I'm omitting this section of the docs. When we start to firm up the details
of how this will be installed and run we can expand the Installation section
and include details about customizing an install.

# Installation

!-->

# Usage

Once you have PaCRD installed and running in your cluster, you can define your applications and pipelines. Then apply them to the cluster.

While this product is in an [**Experimental**] state, [kind] objects for PaCRD
live under the `pacrd.armory.spinnaker.io/v1alpha1` version moniker.

## Applications

In Spinnaker, an Application is a logical construct that allows you to group
resources under a single name. You can read more about applications in the
Spinnaker [docs][app-docs].

### Creating an application

In Kubernetes, define your application in an `application.yaml` file.  The configuration fields are the same as what you see when you [create an application] using the Spinnaker UI. The following example defines an application named "myapplicationname".

*Note: Application names must adhere to both [Kubernetes][kube-name-doc]
__and__ Spinnaker name standards.*

```yaml
# file: application.yaml
apiVersion: pacrd.armory.spinnaker.io/v1alpha1
kind: Application
metadata:
  name: myapplicationname
spec:
  email: sam.tribal@armory.io
  description: My Application is a catalogue of Widgets surfaced by an API.
```

Create the application in your cluster by running:

```
kubectl apply -f application.yaml
```

Check on the status of your application by using either the `get` or `describe`
commands. `kubectl` recognizes either `app` or `application` for the resource
kind:

```sh
kubectl get app myapplicationname

# or kubectl get application myapplicationname
```

The command returns information similar to the this:

```
NAME                URL                                                             LASTCONFIGURED   STATUS
myapplicationname   http://spinnaker.io/#/applications/myapplicationname/clusters   7m26s            Created
```

### Updating an application

You can update in one of two ways:

- Reapply the application manifest in your repository
   -  `kubectl apply -f application.yaml`
- Edit the application manifest in-cluster
   - `kubectl edit app myapplicationname`

When you update your application in Kubernetes, the changes propagate into
Spinnaker. If an error occurs during the update, your application may show an
`ErrorFailedUpdate` state. You can see the details of that failure by describing
the resource and looking in the "Events" section:

```
kubectl describe app myapplicationname
```

### Deleting an application

You can delete an application in one of two ways:

- Reapply the application manifest in your repository
   - `kubectl delete -f application.yaml`
- Delete the application directly
   - `kubectl delete app myapplicationname`

When you delete your application in Kubernetes, the deletion propagates into
Spinnaker. If an error occurs during deletion, your application may show an
`ErrorFailedDelete` state. You can see the details of that failure by describing
the resource and looking in the "Events section":

```
kubectl describe app myapplicationname
```

## Pipelines

Pipelines allow you to encode the process that your team follows to take a
service from commit to a desired environment, such as production. You can
read more about pipelines in the Spinnaker [docs][pipe-docs].

### Creating pipelines

In Kubernetes, define your pipeline in a `pipeline.yaml` file. The configuration fields are the same as what you see when you [create a pipeline] using the Spinnaker UI. The following example defines a simple pipeline named "myapplicationpipeline", which bakes a manifest and prompts for a manual judgment.

*Note: This example assumes that you've created the `myapplicationname`
application from the [previous section](#applications). Create one before
proceeding if you have not done so already.*

```yaml
# file: pipeline.yaml
apiVersion: pacrd.armory.spinnaker.io/v1alpha1
kind: Pipeline
metadata:
  name: myapplicationpipeline
spec:
  description: Delivery pipeline for the MyApplicationName service.
  application: myapplicationname
  stages:
    # Note: In `v0.1.x` you are required to specify _both_ `type: BakeManifest`
    #       as well as place options under a `bakeManifest` key. Consult the
    #       "Known Limitations" section below for more information.
    - type: BakeManifest
      name: Bake Application
      refId: "1"
      bakeManifest:
        evaluateOverrideExpressions: false
        outputName: myapplicationname
        templateRenderer: helm2
    - type: ManualJudgment
      name: Bake Successful?
      refId: "2"
      requisiteStageRefIds: [ "1" ]
      manualJudgment:
        comments: Was the bake successful?
        failPipeline: true
        instructions: Check to see if the helm template was baked correctly
```

Create your pipeline in your cluster:

```
kubectl apply -f pipeline.yaml
```

Check on the status of your pipeline by using either the `get` or `describe`
commands. `kubectl` will recognize either `pipe` or `pipeline` for the resource
kind:

```sh
kubectl get pipe myapplicationpipeline

# or ... kubectl get pipeline myapplicationpipeline
```

The command returns information similar to the this:

```
NAME                    STATUS    LASTCONFIGURED   URL
myapplicationpipeline   Updated   5s               http://spinnaker.company.com/#/applications/myapplicationname/executions/configure/f1eb82ce-5a8f-4b7a-9976-38e4aa022702
```

A `describe` call can give you additional contextual information about the
status of your pipeline:

```
kubectl describe pipeline myapplicationpipeline
```

The command returns information similar to the this::

```
Name:         myapplicationpipeline
API Version:  pacrd.armory.spinnaker.io/v1alpha1
Kind:         Pipeline
Metadata:
  # omitted for brevity
Spec:
  # omitted for brevity
Status:
  Id:               f1eb82ce-5a8f-4b7a-9976-38e4aa022702
  Last Configured:  2020-03-09T15:55:27Z
  Phase:            Updated
  URL:              http://localhost:9000/#/applications/myapplicationname/executions/configure/f1eb82ce-5a8f-4b7a-9976-38e4aa022702
Events:
  Type     Reason                 Age                From       Message
  ----     ------                 ----               ----       -------
  Normal   Updated                94s                pipelines  Pipeline successfully created in Spinnaker.
  Warning  ErrorUpdatingPipeline  93s                pipelines  Bad Request: The provided id f1eb82ce-5a8f-4b7a-9976-38e4aa022702 doesn't match the pipeline id null
  Normal   Updated                91s (x2 over 91s)  pipelines  Pipeline successfully updated in Spinnaker.
```

### Updating pipelines

You can update a pipeline in one of two ways:

- Reapply the pipeline manifest in your repository
   - `kubectl apply -f pipeline.yaml`
- Edit the pipeline manifest in-cluster
   - `kubectl edit pipeline myapplicationpipeline`

When you update your pipeline in Kubernetes, the changes propagate into
Spinnaker. If an error occurs during the update, your pipeline may show an
`ErrorFailedUpdate` state. You can see the details of that failure by describing
the resource and looking in the "Events" section:

```
kubectl describe pipeline myapplicationpipeline
```

### Deleting pipelines

You can delete a pipeline in one of two ways:

- Delete the pipeline manifest from your repository definition
   - `kubectl delete -f pipeline.yaml`
- Delete the pipeline directly
   - `kubectl delete pipeline myapplicationpipeline`

When you delete your pipeline in Kubernetes, the deletion propagates into
Spinnaker. If an error occurred during deletion, then your pipeline may show an
`ErrorFailedDelete` state. You can see the details of that failure by describing
the resource and looking in the "Events section":

```
kubectl describe pipeline myapplicationpipeline
```

# Known Limitations

## v0.1.x - v0.3.x

### Applications

- Documentation for available Application spec fields must be
found in the installation manifest for this controller. You can do so by
grepping for `applications.pacrd.armory.spinnaker.io` in the installation
manifest. Fields are documented under `spec.validation.openAPIV3Schema`.
- For users of version `v0.1.x`, deleting an application in Kubernetes triggers
the following behavior:

    - Delete the application in Kubernetes.
    - Delete the application in Spinnaker.
    - Delete pipelines associated with the application _in Spinnaker only_.

### Pipelines

- Pipeline stages must be defined with a `type` key for the stage name and a
key of the same name where all stage options live. For example, for the
"Bake Manifest" stage you would structure your definition like this:

```yaml
# ...
stages:
  - type: BakeManifest
    bakeManifest:
      name: Bake the Bread
      # ...
# ...
```

- Documentation for available Pipeline spec fields must be
found in the installation manifest for this controller. You can do so by
grepping for `pipelines.pacrd.armory.spinnaker.io` in the installation
manifest. Fields are documented under `spec.validation.openAPIV3Schema`.


[**Experimental**]: https://kb.armory.io/releases/early-release-beta-GA/
[Kubernetes controller]: https://kubernetes.io/docs/concepts/architecture/controller/
[app-docs]: https://www.spinnaker.io/guides/user/applications/#about-applications
[kube-name-doc]: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/
[pipe-docs]: https://www.spinnaker.io/concepts/pipelines/
[kind]: https://github.com/kubernetes-sigs/kind
[create an application]: https://www.spinnaker.io/guides/user/applications/create/#create-an-application
[create a pipeline]: https://www.spinnaker.io/guides/user/pipeline/managing-pipelines/#create-a-pipeline
