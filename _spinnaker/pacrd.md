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

PaCRD is considered [**Experimental**] software. This feature is working and
installable but is missing functionality and subject to rapid change.

__Interested in joining this experiment?
[Contact us](mailto:pipelines-as-code@armory.io) for more information.__

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Overview

PaCRD (a combination of "Pipelines as Code" and "Custom Resource Definition") is
a [Kubernetes controller] that manages the lifecycle of Spinnaker Applications
and Pipelines as objects within your cluster. It does so by extending Kubernetes
to support Spinnaker Application and Pipeline objects that can be observed for
changes through a mature lifecycle management API.

With PaCRD you can:

- Maintain your Spinnaker Pipelines as code with the rest of your Kubernetes
manifests.
- Persist Pipeline and Application changes with confidence to your Spinnaker
cluster.
- Leverage existing tools like Helm and Kustomize to template your pipelines
across teams and projects.


To get started right away, check out the [Quick Start](#quick-start) section for installation
instructions.

## Pre-Requisites

To use PaCRD, make sure you meet the following requirements:

- Have a working Kubernetes 1.11+ cluster
- Have a working Spinnaker installation
  - Although there is no minimum version required for this experiment, Armory
  recommends using the latest release
- Have permissions to install CRDs, create RBAC roles, and create service
accounts

## Quick Start

This quick start assumes the following about your Kubernetes cluster:

- Your Spinnaker cluster is installed into a namespace called `spinnaker`
- Your Spinnaker services have `Service` objects of the form `spin-{service_name}`
  - For example, `spin-front50`

Download the current `pacrd` manifest to your local machine:

```
curl -fsSL https://engineering.armory.io/manifests/pacrd-0.1.0.yaml > pacrd-0.1.0.yaml
```

Then, inspect the manifest to make sure it is compatible with your cluster.


When you're ready, apply the `pacrd` manifest to your cluster:

```
kubectl apply -f pacrd-0.1.0.yaml
```

If you would rather prefer to specify your own namespace then remove
`namepsace` references and apply the manifest with the desired namespace:

```
sed -i '' '/namespace:/d' pacrd-0.1.0.yaml &&\
  kubectl --namespace armory -f pacrd-0.1.0.yaml
```

Alternatively, you can also download and install this feature in a single
command if your organization's security policies allow for this. Armory
recommends only using this method for non-production environments:

```
kubectl apply -f https://engineering.armory.io/manifests/pacrd-0.1.0.yaml
```

<!-- 

Since we're still experimental, and we don't allow a lot of configuration right
now, I'm omitting this section of the docs. When we start to firm up the details
of how this will be installed and run we can expand the Installation section
and include details about customizing an install.

# Installation

!-->

# Usage

Once you have PaCRD installed and running in your cluster, you can begin to define
your Applications and Pipelines and apply them to the cluster.

While this product is in an [**Experimental**] state, Kind objects for PaCRD live
under the `pacrd.armory.spinnaker.io/v1alpha1` version moniker.

## Applications

Applications are a logical construct in Spinnaker that allow you to group
resources under a single name. You can read more about [applications in the
upstream docs][app-docs].

### Creating applications

Applications in Kubernetes can be defined with the same options you define
in the UI. The following example shows how you might define a simple Application:

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

*Note: Application names must adhere to both [Kubernetes][kube-name-doc]
__and__ Spinnaker name standards.*

If you defined this in an `application.yaml` file, then you can create it in
your cluster by running the following `kubectl` command:

```
kubectl apply -f application.yaml
```

Once applied, check on the status of your application by using either
the `get` or `describe` commands. `kubectl` recognizes either `app` or
`application` for the resource kind:

```sh
kubectl get app myapplicationname

# or kubectl get application myapplicationname
```

The command returns information similar to the following:

```
NAME                URL                                                             LASTCONFIGURED   STATUS
myapplicationname   http://spinnaker.io/#/applications/myapplicationname/clusters   7m26s            Created
```

### Updating applications

Applications can be updated in one of two ways:

1. Re-applying the application manifest in your repository
    - `kubectl apply -f application.yaml`
1. Editing the application manifest in-cluster
    - `kubectl edit app myapplicationname`

In both cases, when an application gets updated in your Kubernetes cluster,
you will see changes propagate into Spinnaker shortly. If an error occurs
during the update, your application may show an `ErrorFailedUpdate` state. You
can see the details of that failure by describing the resource and looking in
the "Events" section:

```
kubectl describe app myapplicationname
```

### Deleting applications

When an application is no longer necessary, you can delete it in one of two ways:

1. Re-applying the application manifest in your repository
  - `kubectl delete -f application.yaml`
1. Deleting the application directly
  - `kubectl delete app myapplicationname`

In either case the application, the application gets deleted shortly in Spinnaker as well. If
an error occurs during deletion, then your application may show an
`ErrorFailedDelete` state. You can see the details of that failure by
describing the resource and looking in the "Events section":

```
kubectl describe app myapplicationname
```

## Pipelines

Pipelines allow you to encode the process that your team follows to take a
service from commit to a desired environment (such as production). You can
read more about [pipelines in the upstream Spinnaker documentation][pipe-docs].

### Creating pipelines

Pipelines in Kubernetes can be defined with the same options you would define
in the UI. The following example shows how you might define a simple pipeline
that bakes a manifest and prompts for a manual judgment:

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

_Note: This example assumes that you've created a `myapplicationname` application
from the [previous section](#applications). If you have not done so already, create one before proceeding._

If you defined this in a `pipeline.yaml` file, then you can create it in your
cluster by running the following `kubectl` command:

```
kubectl apply -f pipeline.yaml
```

Once applied, you can check on the status of your pipeline by using either the
`get` or `describe` commands. `kubectl` will recognize either `pipe` or
`pipeline` for the resource kind:

```sh
kubectl get pipe myapplicationpipeline

# or ... kubectl get pipeline myapplicationpipeline
```

Which results in the following output:

```
NAME                    STATUS    LASTCONFIGURED   URL
myapplicationpipeline   Updated   5s               http://spinnaker.company.com/#/applications/myapplicationname/executions/configure/f1eb82ce-5a8f-4b7a-9976-38e4aa022702
```

A `describe` call can give you additional contextual information about the
status of your pipeline:

```
kubectl describe pipeline myapplicationpipeline
```


Which produces the following output:

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

Pipelines can be updated in one of two ways:

1. Re-applying the pipeline manifest in your repository
    - `kubectl apply -f pipeline.yaml`
1. Editing the pipeline manifest in-cluster
    - `kubectl edit pipeline myapplicationpipeline`

In both cases, when a pipeline is updated in your Kubernetes cluster,
the changes propagate into Spinnaker shortly. If an error occurs
during the update, your pipeline may show an `ErrorFailedUpdate` state. You
can see the details of that failure by describing the resource and looking in
the "Events" section:

```
kubectl describe pipeline myapplicationpipeline
```

### Deleting pipelines

When a pipeline is no longer necessary, you can delete it in one of two ways:

1. Deleting the pipeline manifest from your repository definition
  - `kubectl delete -f pipeline.yaml`
1. Deleting the pipeline directly
  - `kubectl delete pipeline myapplicationpipeline`

In either case, the pipeline gets deleted shortly in Spinnaker as well. If
an error occurred during deletion, then your pipeline may show an
`ErrorFailedDelete` state. You can see the details of that failure by
describing the resource and looking in the "Events section":

```
kubectl describe pipeline myapplicationpipeline
```

# Known Limitations

The following sections document limitations with various versions of the PaCRD
controller.

## v0.1.x

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
"Bake Manifest" stage you would structure your definition like so:
  
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
[app-docs]: https://www.spinnaker.company.com/guides/user/applications/
[kube-name-doc]: https://kubernetes.io/docs/concepts/overview/working-with-objects/names/
[pipe-docs]: https://www.spinnaker.company.com/concepts/pipelines/
