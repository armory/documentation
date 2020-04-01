---
layout: post
title: Deployment Config Reference
order: 5
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


```yaml
deploymentEnvironment:
  size: SMALL
  type: Distributed # Distributed: Deploy Spinnaker with one server group per microservice, and a single shared Redis. LocalDebian: Download and run the Spinnaker debians on the machine running the Daemon. LocalGit: Download and run the Spinnaker git repos on the machine running the Daemon.
  accountName: spinnaker # The Spinnaker account that Spinnaker will be deployed to, assuming you are running a deployment of Spinnaker that requires an active cloud provider.
  imageVariant: SLIM # The container image variant type to use when deploying a distributed installation of Spinnaker. slim: Based on an Alpine image ubuntu: Based on Canonical's ubuntu:bionic image. java8: A variant of slim that uses the Java 8 runtime ubuntu-java8: A variant of ubuntu that uses the Java 8 runtime Default value: slim
  bootstrapOnly: false # A bootstrap-only account is the account in which Spinnaker itself is deployed. When true, this account will not be included the accounts managed by Spinnaker.
  updateVersions: true # When set to "false", any local version of Spinnaker components will be used instead of attempting to update. This does not work for distributed installations of Spinnaker, where no local version exists.
  consul:
	enabled: false # Whether or not to use Consul as a service discovery mechanism to deploy Spinnaker.
	address: abc # The address of a running Consul cluster. See https://www.consul.io/. This is only required when Spinnaker is being deployed in non-Kubernetes clustered configuration.
  vault:
	enabled: false # Whether or not to use Vault as a secret storage mechanism to deploy Spinnaker.
	address: abc  # The address of a running Vault datastore. See https://www.vaultproject.io/. This is only required when Spinnaker is being deployed in non-Kubernetes clustered configuration.
  location: spinnaker # This is the location spinnaker will be deployed to. When deploying to Kubernetes, use this flag to specify the namespace to deploy to (defaults to 'spinnaker')
  customSizing: # Configure, validate, and view the component sizings for the Spinnaker services.
	spin-clouddriver:
	  replicas: 1 # Set the number of replicas (pods) to be created for this service.
	  requests:
		memory: 8Gi # Sets the memory request for the container running the spinnaker service. Example: 512Mi.
		cpu: 250m # Sets the cpu request for the container running the spinnaker service. Example: 250m.
	  limits:
		memory: 8Gi
		cpu: 250m
  sidecars:
	spin-clouddriver:
	- name: abc
	  dockerImage: abc
	  port: 123
	  env:
		abc: def
	  args:
	  - abc
	  command:
	  - abc
	  configMapVolumeMounts:
	  - configMapName: abc
		mountPath: abc
	  secretVolumeMounts:
	  - secretName: abc
		mountPath: abc
	  mountPath: abc
	  securityContext:
		privileged: false
  initContainers: {}
  hostAliases: {}
  nodeSelectors:
	abc: def
  affinity: {}
  tolerations:
	spin-clouddriver:
	- key: abc
	  operator: Exists # Exists, Equal, DoesNotExist
	  value: abc
	  effect: abc
  gitConfig:
	upstreamUser: spinnaker # This is the upstream git user you are configuring to pull changes from & push PRs to.
	originUser: abc # This is the git user your github fork exists under.
  livenessProbeConfig:
	enabled: true # When true, enable Kubernetes liveness probes on Spinnaker services deployed in a Distributed installation. See docs for more information: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/
	initialDelaySeconds: 30 # The number of seconds to wait before performing the first liveness probe. Should be set to the longest service startup time. See docs for more information: https://kubernetes.io/docs/tasks/configure-pod-container/configure-liveness-readiness-probes/
  haServices:
	clouddriver:
	  enabled: false
	  disableClouddriverRoDeck: false
	  redisMasterEndpoint: abc # Set external Redis endpoint for clouddriver-rw and clouddriver-caching. The Redis URI schema is described here: https://www.iana.org/assignments/uri-schemes/prov/redis. clouddriver-rw and clouddriver-caching are configured to use the shared Redis, by default.
	  redisSlaveEndpoint: abc # Set external Redis endpoint for clouddriver-ro. The Redis URI schema is described here: https://www.iana.org/assignments/uri-schemes/prov/redis. clouddriver-ro is configured to use the shared Redis, by default.
	  redisSlaveDeckEndpoint: abc # Set external Redis endpoint for clouddriver-ro-deck. The Redis URI schema is described here: https://www.iana.org/assignments/uri-schemes/prov/redis. clouddriver-ro-deck is configured to use the shared Redis, by default.
	echo:
	  enabled: false
```
