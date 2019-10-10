---
layout: post
title: Spinnaker Operator Reference
order: 12
---

This document describes available fields in the SpinnakerService CRD used by Spinnaker Operator as well as a description of the ConfigMap where Spinnaker stores its configuration.

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


# SpinnakerService CRD
The following example shows the general structure of a manifest file for SpinnakerService:

```yaml
apiVersion: spinnaker.armory.io/v1alpha1
kind: SpinnakerService
metadata:
  name: [spinnaker service name]
spec:
  spinnakerConfig:
    configMap:
      name: [configmap name]
  expose:
    type: service
    service:
      type: [kubernetes service type]
      annotations:
        [map of key:value pairs]
      publicPort: [integer]
      overrides:
        [service name]:
          type: [kubernetes service type]
          annotations:
            [map of key:value pairs]
```

**spec.spinnakerConfig**: Reference to a ConfigMap or Secret that contains Spinnaker configuration files coming from Halyard. Only `configMap` is currently supported. This configuration is described [below](#spinnakerconfig).

**spec.expose**: This section contains configuration for exposing Spinnaker.


- `spec.expose.type`: How Spinnaker will be exposed. The only supported `service` is currently a Kubernetes services.
- `spec.expose.service.type`: Should match a valid kubernetes service type (i.e. `LoadBalancer`, `NodePort`, `ClusterIP`.
- `spec.expose.service.annotations`: Map containing any annotation to be added to Gate (API) and Deck (UI) services.
- `spec.expose.service.publicPort`: Integer allowing you to change the listening port.
- `spec.expose.service.overrides`: Allows overriding all the keys of `spec.expose` for each of the following services: `gate`, `deck`, `gate-x509`.


## Examples

### Minimal valid SpinnakerService

```yaml
apiVersion: spinnaker.armory.io/v1alpha1
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    configMap:
      name: spinconfig-v001
```

### Exposing Spinnaker with LoadBalancer services

```yaml
apiVersion: spinnaker.armory.io/v1alpha1
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    configMap:
      name: spinconfig-v001
  expose:
    type: service
    service:
      type: LoadBalancer
      annotations:
        "service.beta.kubernetes.io/aws-load-balancer-backend-protocol": "http"
        "service.beta.kubernetes.io/aws-load-balancer-ssl-ports": "80,443"
        "service.beta.kubernetes.io/aws-load-balancer-ssl-cert": "arn:aws:acm:us-west-2:xxxxxxxxxxxx:certificate/xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
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


### Exposing Spinnaker with different service types for Deck (UI) and Gate (API)

```yaml
apiVersion: spinnaker.armory.io/v1alpha1
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    configMap:
      name: spinconfig-v001
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


**Exposing Spinnaker, different annotations for Deck (UI) and Gate (API)**

```yaml
apiVersion: spinnaker.armory.io/v1alpha1
kind: SpinnakerService
metadata:
  name: spinnaker
spec:
  spinnakerConfig:
    configMap:
      name: spinconfig-v001
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


# SpinnakerConfig
This is an example ConfigMap that is referenced by SpinnakerService.
Note that the *metadata.name* field in this example should match *spec.spinnakerConfig.configMap.name* on SpinnakerService manifest.

```yaml
apiVersion: v1
kind: ConfigMap
metadata:
  name: spinconfig-v001
data:
  config: |
    name: default
    version: 1.15.2
    ...
    provider:
      kubernetes:
      - name: prod1
        kubeconfigFile: prod1-k8s.yml
        ...
  profiles: |
    gate:
      default.apiPort: 8085
  profiles__settings-local.js: |
    window.spinnakerSettings.feature.kustomizeEnabled = true;

  service-settings: |
    gate:
      artifactId: xxxxx

  # file referenced in the section `config.providers.kuberentes[0].kubeconfigFile`
  prod1-k8s.yml: |
    <content of the kubeconfig file>

  # other custom files
  profiles__rosco__packer__aws-custom.json: |
    {
      "variables": {
        "docker_source_image": "null",
        "docker_target_image": null,
      },
      ...
    }
```

## `data.config` Section
The deployment configuration in the same format as in Halyard. For instance, given the following `~/.hal/config`:

```yaml
currentDeployment: default
deploymentConfigurations:
- name: default
  version: 2.15.2
  providers:
    # ...
```

The `config` key would be the contents of `deploymentConfigurations[0]`:
```yaml
name: default
version: 2.15.2
providers:
  # ...
```

## `data.profiles` Section
The content of the local profile files (`~/.hal/<deployment>/profiles/`) by service name, e.g.:
```yaml
  profiles: |
    gate:
      default.apiPort: 8085
    front50:
      # ...
```

## `data.profiles__settings-local.js` Section
This contains the local deck profile, i.e. `settings-local.js` (`~/.hal/<deployment>/profiles/settings-local.js`) e.g.:
  ```yaml
  profiles__settings-local.js: |
    // window.spinnakerSettings.feature. ...
  ```

## `data.service-settings` Section
The content of the service settings file (`~/.hal/<deployment>/service-settings/`) by service name, e.g.:
```yaml
  service-settings: |
    gate:
      artifactId: xxxxx
```

## Other Custom Files
Other supporting files with a path relative to the main deployment. The file path is encoded with `__` as a path separator. 

This includes other profile files such as a custom packer template in `profiles__rosco__packer__aws-custom.json`, and packer scripts `profiles__rosco__packer__my-script.sh`.
