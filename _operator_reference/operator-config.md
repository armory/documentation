---
layout: post
title: Spinnaker Operator Reference
order: 1
---
This page describes the fields in `SpinnakerService` CRD and example manifests.

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


# SpinnakerService CRD
The following example shows the general structure of `SpinnakerService`.

```yaml
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  # spec.spinnakerConfig - This section is how to specify configuration spinnaker
  spinnakerConfig:
    # spec.spinnakerConfig.config - This section contains the contents of a deployment found in a halconfig .deploymentConfigurations[0]
    config:
      version: 2.17.1   # the Armory Spinnaker version to be deployed
      persistentStorage:
        persistentStoreType: s3
        s3:
          bucket: mybucket
          rootFolder: front50 # Change me

    # spec.spinnakerConfig.profiles - This section contains the YAML of each service's profile
    profiles:
      clouddriver: {} # Contents of ~/.hal/default/profiles/clouddriver.yml
      # deck has a special key "settings-local.js" for the contents of settings-local.js
      deck:
        # settings-local.js - contents of ~/.hal/default/profiles/settings-local.js
        # Use the | YAML symbol to indicate a block-style multiline string
        settings-local.js: |
          window.spinnakerSettings.feature.kustomizeEnabled = true;
      echo: {}    # Contents of ~/.hal/default/profiles/echo.yml
      fiat: {}    # Contents of ~/.hal/default/profiles/fiat.yml
      front50: {} # Contents of ~/.hal/default/profiles/front50.yml
      gate: {}    # Contents of ~/.hal/default/profiles/gate.yml
      igor: {}    # Contents of ~/.hal/default/profiles/igor.yml
      kayenta: {} # Contents of ~/.hal/default/profiles/kayenta.yml
      orca: {}    # Contents of ~/.hal/default/profiles/orca.yml
      rosco: {}   # Contents of ~/.hal/default/profiles/rosco.yml

    # spec.spinnakerConfig.service-settings - This section contains the YAML of the service's service-setting
    # see https://www.spinnaker.io/reference/halyard/custom/#tweakable-service-settings for available settings
    service-settings:
      clouddriver: {}
      deck: {}
      echo: {}
      fiat: {}
      front50: {}
      gate: {}
      igor: {}
      kayenta: {}
      orca: {}
      rosco: {}

    # spec.spinnakerConfig.files - This section allows you to include any other raw string files not handle above.
    # The KEY is the filepath and filename of where it should be placed.
    #   - Files here will be placed into ~/.hal/default/ on halyard.
    #   - __ (double underscore) is used in place of / for the path separator.
    # The VALUE Contents of the file.
    #   - Use the | YAML symbol to indicate a block-style multiline string.
    #   - We currently only support string files.
    #   - NOTE: Kubernetes has a manifest size limitation of 1MB.
    files: {}
  #      profiles__rosco__packer__example-packer-config.json: |
  #        {
  #          "packerSetting": "someValue"
  #        }
  #      profiles__rosco__packer__my_custom_script.sh: |
  #        #!/bin/bash -e
  #        echo "hello world!"


  # spec.expose - This section defines how Spinnaker should be publicly exposed.
  expose:
    type: service  # Kubernetes LoadBalancer type (service/ingress). Note that only "service" is supported for now.
    service:
      type: LoadBalancer

      # Annotations to be set on Kubernetes LoadBalancer type.
      # They only apply to spin-gate, spin-gate-x509, or spin-deck.
      annotations:
        service.beta.kubernetes.io/aws-load-balancer-backend-protocol: http
        # Uncomment the line below to provide an AWS SSL certificate to terminate SSL at the LoadBalancer.
        #service.beta.kubernetes.io/aws-load-balancer-ssl-cert: arn:aws:acm:us-west-2:9999999:certificate/abc-123-abc

      # Provide an override to the exposing KubernetesService.
      overrides: {}
      # The following example is an example config for the Gate-X509 configuration.
#        deck:
#          annotations:
#            service.beta.kubernetes.io/aws-load-balancer-ssl-cert: arn:aws:acm:us-west-2:9999999:certificate/abc-123-abc
#            service.beta.kubernetes.io/aws-load-balancer-backend-protocol: http
#        gate:
#          annotations:
#            service.beta.kubernetes.io/aws-load-balancer-ssl-cert: arn:aws:acm:us-west-2:9999999:certificate/abc-123-abc
#            service.beta.kubernetes.io/aws-load-balancer-backend-protocol: https  # X509 requires https from LoadBalancer -> Gate
#       gate-x509:
#         annotations:
#           service.beta.kubernetes.io/aws-load-balancer-backend-protocol: tcp
#           service.beta.kubernetes.io/aws-load-balancer-ssl-cert: null
#         publicPort: 443

  validation:
```
### metadata.name

Name of your Spinnaker service. Use this name to view, edit, or delete Spinnaker. The following example uses the name `prod`:

```bash
$ kubectl get spinsvc prod
```

Note that you can use spinsvc for brevity. You can also use `spinnakerservices.spinnaker.armory.io`.

### .spec.spinnakerConfig

Contains the same information as the `deploymentConfigurations` entry in a Halyard configuration.

For example, given the following `~/.hal/config` file:

```yaml
currentDeployment: default
deploymentConfigurations:
- name: default
  version: 2.17.1
  persistentStorage:
    persistentStoreType: s3
    s3:
      bucket: mybucket
      rootFolder: front50
```

The equivalent of that Halyard configuration is the following `spec.spinnakerConfig`:

```yaml
spec:
  spinnakerConfig:
    config:
      version: 2.17.1
      persistentStorage:
        persistentStoreType: s3
        s3:
          bucket: mybucket
          rootFolder: front50
```

`.spec.spinnakerConfig.config` contains the following sections:

* [armory](/operator_reference/armory)
* [artifact](/operator_reference/artifact)
* [canary](/operator_reference/canary)
* [ci](/operator_reference/ci)
* [deploymentEnvironment](/operator_reference/deploy)
* [features](/operator_reference/features)
* [metricStores](/operator_reference/metricstores)
* [notification](/operator_reference/notification)
* [persistentStorage](/operator_reference/persistent-storage)
* [plugins](/operator_reference/plugins)
* [providers](/operator_reference/providers)
* [pubsub](/operator_reference/pubsub)
* [repository](/operator_reference/repository)
* [security](/operator_reference/security)
* [stats](/operator_reference/stats)
* [webhook](/operator_reference/webhook)

### .spec.spinnakerConfig.profiles

Configuration for each service profile. This is the equivalent of `~/.hal/default/profiles/<service>-local.yml`. For example the following `profile` is for Gate:

```yaml
spec:
  spinnakerConfig:
    config:
    ...
    profiles:
      gate:
        default:
          apiPort: 8085
```
Note that for Deck, the profile is a string under the key `settings-local.js`:

```yaml
spec:
  spinnakerConfig:
    config:
    ...
    profiles:
      deck:
        settings-local.js: |
          window.spinnakerSettings.feature.artifactsRewrite = true;
```

### .spec.spinnakerConfig.service-settings

Settings for each service. This is the equivalent of `~/.hal/default/service-settings/<service>.yml`. For example the following settings are for Clouddriver:

```yaml
spec:
  spinnakerConfig:
    config:
    ...
    service-settings:
      clouddriver:
        kubernetes:
          serviceAccountName: spin-sa
```

### .spec.spinnakerConfig.files

Contents of any local files that should be added to the services. For example to reference the contents of a kubeconfig file:

```yaml
spec:
  spinnakerConfig:
    config:
      providers:
        kubernetes:
          enabled: true
          accounts:
          - name: cluster-1
            kubeconfigFile: cluster1-kubeconfig
            ...
    files:
      cluster1-kubeconfig: |
        <FILE CONTENTS HERE>
```

A double underscore (`__`) in the file name is translated to a path separator (`/`). For example to add custom packer templates:

```yaml
    files: {}
      profiles__rosco__packer__example-packer-config.json: |
        {
          "packerSetting": "someValue"
        }
      profiles__rosco__packer__my_custom_script.sh: |
        #!/bin/bash -e
        echo "hello world!"
```

### spec.expose
Optional. Controls how Spinnaker gets exposed. If you omit it, no load balancer gets created. If this section gets removed, the Load Balancer does not get deleted.

Use the following configurations:

- `spec.expose.type`: How Spinnaker gets exposed. Currently, only `service` is supported, which uses Kubernetes services to expose Spinnaker.
- `spec.expose.service`: Service configuration
- `spec.expose.service.type`: Should match a valid Kubernetes service type (i.e. `LoadBalancer`, `NodePort`, or `ClusterIP`).
- `spec.expose.service.annotations`: Map containing annotations to be added to Gate (API) and Deck (UI) services.
- `spec.expose.service.overrides`: Map with key for overriding the service type and specifying extra annotations: Spinnaker service name (Gate or Deck) and value. By default, all services receive the same annotations. You can override annotations for a Deck (UI) or Gate (API) services.

### spec.validation

**Currently these configurations are experimental. By default, the Operator always validates Kubernetes accounts when applying a SpinnakerService manifest.**

Validation options that apply to all validations that Operator performs:

- `spec.validation.failOnError`: Boolean. Defaults to true. If false, the validation runs and the results are logged, but the service is always considered valid.
- `spec.validation.failFast`: Boolean. Defaults to false. If true, validation stops at the first error.
- `spec.validation.frequencySeconds`: Optional. Integer. Define a grace period before a validation runs again. For example, if you specify a value of `120` and edit the `SpinnakerService` without changing an account within a 120 second window, the validation on that account does not run again.

Additionally, the following settings are specific to providers, CI tools, metric stores, persistent storage, or notification systems:
- `spec.validation.providers`
- `spec.validation.ci`
- `spec.validation.metricStores`
- `spec.validation.persistentStorage`
- `spec.validation.notifications`

Supported settings are `enabled` (set to false to turn off validations), `failOnError`, and `frequencySeconds`.

The following example disables all Kubernetes account validations:
```yaml
spec:
  validation:
    providers:
      kubernetes:
        enabled: false
```
### spec.accounts

Support for `SpinnakerAccount` CRD (**Experimental**):

- `spec.accounts.enabled`: Boolean. Defaults to false. If true, the `SpinnakerService` uses all `SpinnakerAccount` objects enabled.
- `spec.accounts.dynamic` (experimental): Boolean. Defaults to false. If true, `SpinnakerAccount` objects are available to Spinnaker as the account is applied (without redeploying any service).

# Example Manifests for Exposing Spinnaker
The following example manifests deploy Spinnaker with different configurations:
- [SpinnakerService CRD](#spinnakerservice-crd)
    - [metadata.name](#metadataname)
    - [.spec.spinnakerConfig](#specspinnakerconfig)
    - [.spec.spinnakerConfig.profiles](#specspinnakerconfigprofiles)
    - [spec.expose](#specexpose)
    - [spec.validation](#specvalidation)
    - [spec.accounts](#specaccounts)
- [Example Manifests for Exposing Spinnaker](#example-manifests-for-exposing-spinnaker)
  - [Load balancer Services](#load-balancer-services)
  - [Different Service Types for Deck (UI) and Gate (API)](#different-service-types-for-deck-ui-and-gate-api)
  - [Different Annotations for Deck (UI) and Gate (API)](#different-annotations-for-deck-ui-and-gate-api)
  - [X509](#x509)

## Load balancer Services

```yaml
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  expose:
    type: service
    service:
      type: LoadBalancer
      annotations:
        "service.beta.kubernetes.io/aws-load-balancer-backend-protocol": "http"
        "service.beta.kubernetes.io/aws-load-balancer-ssl-ports": "80,443"
        "service.beta.kubernetes.io/aws-load-balancer-ssl-cert": "arn:aws:acm:us-west-2:xxxxxxxxxxxx:certificate/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
```

The preceding manifest generates these two services:

*spin-deck*

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-backend-protocol: http
    service.beta.kubernetes.io/aws-load-balancer-ssl-ports: 80,443
    service.beta.kubernetes.io/aws-load-balancer-ssl-cert": arn:aws:acm:us-west-2:xxxxxxxxxxxx:certificate/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  labels:
    app: spin
    cluster: spin-deck
  name: spin-deck
spec:
  ports:
 - name: deck-tcp
   nodePort: xxxxx
   port: 9000
   protocol: TCP
   targetPort: 9000
  selector:
   app: spin
   cluster: spin-deck
  sessionAffinity: None
  type: LoadBalancer
```

*spin-gate*

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-backend-protocol: http
    service.beta.kubernetes.io/aws-load-balancer-ssl-ports: 80,443
    service.beta.kubernetes.io/aws-load-balancer-ssl-cert": arn:aws:acm:us-west-2:xxxxxxxxxxxx:certificate/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  labels:
     app: spin
     cluster: spin-gate
  name: spin-gate
spec:
  ports:
  - name: gate-tcp
    nodePort: xxxxx
    port: 8084
    protocol: TCP
    targetPort: 8084
  selector:
    app: spin
    cluster: spin-gate
  sessionAffinity: None
  type: LoadBalancer
```


## Different Service Types for Deck (UI) and Gate (API)

```yaml
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  expose:
    type: service
    service:
      type: LoadBalancer
      annotations:
        "service.beta.kubernetes.io/aws-load-balancer-backend-protocol": "http"
        "service.beta.kubernetes.io/aws-load-balancer-ssl-ports": "80,443"
        "service.beta.kubernetes.io/aws-load-balancer-ssl-cert": "arn:aws:acm:us-west-2:xxxxxxxxxxxx:certificate/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      overrides:
        gate:
          type: NodePort
```

The preceding manifest generates these two services:

*spin-deck*

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-backend-protocol: http
    service.beta.kubernetes.io/aws-load-balancer-ssl-ports: 80,443
    service.beta.kubernetes.io/aws-load-balancer-ssl-cert": arn:aws:acm:us-west-2:xxxxxxxxxxxx:certificate/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  labels:
    app: spin
    cluster: spin-deck
  name: spin-deck
  spec:
  ports:
  - name: deck-tcp
    nodePort: xxxxx
    port: 9000
    protocol: TCP
    targetPort: 9000
  selector:
    app: spin
    cluster: spin-deck
  sessionAffinity: None
  type: LoadBalancer
```

*spin-gate*

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-backend-protocol: http
    service.beta.kubernetes.io/aws-load-balancer-ssl-ports: 80,443
    service.beta.kubernetes.io/aws-load-balancer-ssl-cert": arn:aws:acm:us-west-2:xxxxxxxxxxxx:certificate/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  labels:
    app: spin
    cluster: spin-gate
  name: spin-gate
spec:
  ports:
  - name: gate-tcp
    nodePort: xxxxx
    port: 8084
    protocol: TCP
    targetPort: 8084
  selector:
    app: spin
    cluster: spin-gate
  sessionAffinity: None
  type: NodePort
```

## Different Annotations for Deck (UI) and Gate (API)

```yaml
apiVersion: spinnaker.armory.io/v1alpha2
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  expose:
    type: service
    service:
      type: LoadBalancer
      annotations:
        "service.beta.kubernetes.io/aws-load-balancer-backend-protocol": "http"
        "service.beta.kubernetes.io/aws-load-balancer-ssl-ports": "80,443"
        "service.beta.kubernetes.io/aws-load-balancer-ssl-cert": "arn:aws:acm:us-west-2:xxxxxxxxxxxx:certificate/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
      overrides:
        gate:
          annotations:
            "service.beta.kubernetes.io/aws-load-balancer-internal": "true"
```

Above manifest file will generate these two services:

*spin-deck*

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-backend-protocol: http
    service.beta.kubernetes.io/aws-load-balancer-ssl-ports: 80,443
    service.beta.kubernetes.io/aws-load-balancer-ssl-cert": arn:aws:acm:us-west-2:xxxxxxxxxxxx:certificate/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
  labels:
    app: spin
    cluster: spin-deck
  name: spin-deck
spec:
  ports:
  - name: deck-tcp
    nodePort: xxxxx
     port: 9000
     protocol: TCP
     targetPort: 9000
  selector:
     app: spin
     cluster: spin-deck
  sessionAffinity: None
  type: LoadBalancer
```

*spin-gate*

```yaml
apiVersion: v1
kind: Service
metadata:
  annotations:
    service.beta.kubernetes.io/aws-load-balancer-backend-protocol: http
    service.beta.kubernetes.io/aws-load-balancer-ssl-ports: 80,443
    service.beta.kubernetes.io/aws-load-balancer-ssl-cert": arn:aws:acm:us-west-2:xxxxxxxxxxxx:certificate/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
    service.beta.kubernetes.io/aws-load-balancer-internal: true
  labels:
    app: spin
    cluster: spin-gate
  name: spin-gate
spec:
  ports:
 - name: gate-tcp
    nodePort: xxxxx
    port: 8084
    protocol: TCP
    targetPort: 8084
  selector:
    app: spin
    cluster: spin-gate
  sessionAffinity: None
  type: Loadbalancer
```
## X509

```yaml
spec:
  config:
    profiles:
      gate:
        default:
          apiPort: 8085  
  expose:
    type: service
    service:
      type: LoadBalancer

      annotations:
        service.beta.kubernetes.io/aws-load-balancer-backend-protocol: http

      overrides:
      # Provided below is the example config for the Gate-X509 configuration
        deck:
          annotations:
            service.beta.kubernetes.io/aws-load-balancer-ssl-cert: arn:aws:acm:us-west-2:9999999:certificate/abc-123-abc
            service.beta.kubernetes.io/aws-load-balancer-backend-protocol: http
        gate:
          annotations:
            service.beta.kubernetes.io/aws-load-balancer-ssl-cert: arn:aws:acm:us-west-2:9999999:certificate/abc-123-abc
            service.beta.kubernetes.io/aws-load-balancer-backend-protocol: https  # X509 requires https from LoadBalancer -> Gate
       gate-x509:
         annotations:
           service.beta.kubernetes.io/aws-load-balancer-backend-protocol: tcp
           service.beta.kubernetes.io/aws-load-balancer-ssl-cert: null
         publicPort: 443
```
