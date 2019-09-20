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
    apiVersion: spinnaker.io/v1alpha1
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
- `spec.expose.service.overrides`: Allows overriding the service type and specifying extra annotations. By default, all services will receive the same `type`, `annotations`, `, so you can use this to override annotations. This a map containing:
  - **key**(`gate`, `deck`, `gate-x509`) of the Spinnaker service name.
  - **value**: the structure supports the same keys `spec.expose` contains.


## Examples

**Minimal valid SpinnakerService**

```yaml
    apiVersion: spinnaker.io/v1alpha1
    kind: SpinnakerService
    metadata:
      name: spinnaker
    spec:
      spinnakerConfig:
        configMap:
          name: spinconfig-v001
```

**Exposing Spinnaker with LoadBalancer services**

```yaml
    apiVersion: spinnaker.io/v1alpha1
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

**Exposing Spinnaker with different service types for Deck (UI) and Gate (API)**

```yaml
    apiVersion: spinnaker.io/v1alpha1
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
    apiVersion: spinnaker.io/v1alpha1
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
      profiles: |
        gate:
          default.apiPort: 8085
      serviceSettings: |
        gate:
          artifactId: xxxxx
      files__profiles__rosco__packer__aws-custom.json: |
        {
          "variables": {
            "docker_source_image": "null",
            "docker_target_image": null,
          },
          ...
        }
```
        
- `config`: the deployment configuration in the same format as in Halyard. For instance, given the following `~/.hal/config`:
    currentDeployment: default
    deploymentConfigurations:
    - name: default
      version: 1.15.2
      providers:
      ...

The `config` key would contain:

    name: default
    version: 1.15.2
    providers:
    ...
    
- `profiles`: the content of the local profile files (`~/.hal/<deployment>/profiles/`) by service name, e.g.:
    profiles: |
      gate:
          default.apiPort: 8085
          
- `serviceSettings`: the content of the service settings file (`~/.hal/<deployment>/service-settings/`) by service name, e.g.:
    serviceSettings: |
      gate:
        artifactId: xxxxx
        
- `files__<relative path to other file>`: Other supporting files with a path relative to the main deployment. The file path is encoded with `__` as a path separator. This includes other profile files such as a custom packer template in `files__profiles__rosco__packer__aws-custom.json`.
