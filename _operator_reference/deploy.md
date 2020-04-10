---
layout: post
title: Deployment Environment Config
order: 6
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


```yaml
deploymentEnvironment:
  size:
  type:
  accountName:
  imageVariant:
  bootstrapOnly:
  updateVersions:
  consul:
    enabled:
    address:
  vault:
    enabled:
    address:
  location:
  customSizing:
    spin-clouddriver:
      replicas:
      requests:
    memory:
    cpu:
    limits:
      memory:
      cpu:
  sidecars:
    spin-clouddriver:
    - name:
      dockerImage:
      port:
      env:
    abc:
      args:
      - arg1
      command:
      - arg1
      configMapVolumeMounts:
      - configMapName:
    mountPath:
      secretVolumeMounts:
      - secretName:
    mountPath:
      mountPath:
      securityContext:
    privileged:
  initContainers: {}
  hostAliases: {}
  nodeSelectors:
    abc:
  affinity: {}
  tolerations:
    spin-clouddriver:
    - key:
      operator:
      value:
      effect:
  gitConfig:
    upstreamUser:
    originUser:
  livenessProbeConfig:
    enabled:
    initialDelaySeconds:
  haServices:
    clouddriver:
      enabled:
      disableClouddriverRoDeck:
      redisMasterEndpoint:
      redisSlaveEndpoint:
      redisSlaveDeckEndpoint:
    echo:
      enabled:
```


- `size`: `SMALL`
- `type`: `Distributed`, `LocalDebian`, or `LocalGit`; `Distributed`: Deploy Spinnaker with one server group per microservice, and a single shared Redis. `LocalDebian`: Download and run the Spinnaker debians on the machine running the Daemon. `LocalGit`: Download and run the Spinnaker git repos on the machine running the Daemon.
- `accountName`: The Spinnaker account that Spinnaker will be deployed to, assuming you are running a deployment of Spinnaker that requires an active cloud provider.
- `imageVariant`: The container image variant type to use when deploying a distributed installation of Spinnaker. `SLIM`: Based on an Alpine image ubuntu: Based on Canonical's ubuntu:bionic image. `JAVA8`: A variant of slim that uses the Java 8 runtime. `UBUNTU-JAVA8`: A variant of ubuntu that uses the Java 8 runtime Default value: `SLIM`
- `bootstrapOnly`: true or false; a bootstrap-only account is the account in which Spinnaker itself is deployed. When true, this account will not be included the accounts managed by Spinnaker.
- `updateVersions`: true or false; when set to "false", any local version of Spinnaker components will be used instead of attempting to update. This does not work for distributed installations of Spinnaker, where no local version exists.
- `consul`:
  - `enabled`: true or false; whether or not to use Consul as a service discovery mechanism to deploy Spinnaker.
  - `address`: The address of a running [Consul](https://www.consul.io/) cluster. This is only required when Spinnaker is being deployed in non-Kubernetes clustered configuration.
- `vault`:
  - `enabled`: true or false; whether or not to use Vault as a secret storage mechanism to deploy Spinnaker.
  - `address`: The address of a running [Vault](https://www.vaultproject.io/) datastore. This is only required when Spinnaker is being deployed in non-Kubernetes clustered configuration.
- `location`: This is the location spinnaker will be deployed to. When deploying to Kubernetes, use this flag to specify the namespace to deploy to (defaults to `spinnaker`)
- `customSizing`: Configure, validate, and view the component sizings for the Spinnaker services.
  - `spin-clouddriver`:
    - `replicas`: Set the number of replicas (pods) to be created for this service.
    - `requests`:
      - `memory`: Sets the memory request for the container running the spinnaker service. Examples: 512Mi, 8Gi
      - `cpu`: Sets the cpu request for the container running the spinnaker service. Example: 250m.
  - `limits`:
      - `memory`: example: 8Gi
      - `cpu`: example: 250m
- `sidecars`:
  - `spin-clouddriver`:
    - `name`:
    - `dockerImage`:
    - `port`:
    - `env`:
      - key: definition
    - `args`:
      - arg1
    - `command`:
      - arg1
    - `configMapVolumeMounts`:
      - `configMapName`:
      - `mountPath`:
    - `secretVolumeMounts`:
      - `secretName`:
      - `mountPath`:
    - `mountPath`:
    - `securityContext`:
      - `privileged`: true or false.
- `initContainers`: {}
- `hostAliases`: {}
- `nodeSelectors`:
  - key: definition
- `affinity`: {}
- `tolerations`:
  - `spin-clouddriver`:`
    - `key`:
    - `operator`: Exists, Equal, or DoesNotExist
    - `value`:
    - `effect`:
- `gitConfig`:
  - `upstreamUser`: This is the upstream git user you are configuring to pull changes from & push PRs to.
  - `originUser`: This is the git user your github fork exists under.
- `livenessProbeConfig`:
  - `enabled`: true or false; when true, enable Kubernetes liveness probes on Spinnaker services deployed in a Distributed installation. See [docs](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/) for more information.
  - `initialDelaySeconds`: The number of seconds to wait before performing the first liveness probe. Should be set to the longest service startup time. See [docs](https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/) for more information.
- `haServices`:
  - `clouddriver`:
    - `enabled`: true or false.
    - `disableClouddriverRoDeck`: true or false.
    - `redisMasterEndpoint`: Set external Redis endpoint for clouddriver-rw and clouddriver-caching. The Redis URI schema is described [here](https://www.iana.org/assignments/uri-schemes/prov/redis). clouddriver-rw and clouddriver-caching are configured to use the shared Redis, by default.
    - `redisSlaveEndpoint`: Set external Redis endpoint for clouddriver-ro. The Redis URI schema is described [here](https://www.iana.org/assignments/uri-schemes/prov/redis). clouddriver-ro is configured to use the shared Redis, by default.
    - `redisSlaveDeckEndpoint`: Set external Redis endpoint for clouddriver-ro-deck. The Redis URI schema is described [here](https://www.iana.org/assignments/uri-schemes/prov/redis). clouddriver-ro-deck is configured to use the shared Redis, by default.
  - `echo`:
    - `enabled`: true or false.
