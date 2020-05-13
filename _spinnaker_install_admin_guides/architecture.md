---
layout: post
order: 10
redirect_from:
  - /spinnaker_install_admin_guides/architecture/
---

Spinnaker is the composition of a few microservices for resiliency
and follows the single-responsibility principle.  It allows for faster iteration on each
individual component and a more pluggable architecture for custom components.

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

![Architecture Diagram](/images/install_admin_guides_SpinnakerArchitecture.png)

### Orca

Orca is responsible for the orchestration of pipelines, stages and tasks within Spinnaker.  It acts as the "traffic cop" within Spinnaker making sure that sub-services, their executions and states are passed along correctly.

The smallest atomic unit within Orca is a task - stages are composed of tasks and pipelines are composed of stages.  

### Clouddriver

Clouddriver is a core component of Spinnaker which facilitates the interactions between a given cloud provider such as AWS, GCP or Kubernetes.  There is a common interface that is used so that additional cloud providers can be added.

### Gate

Gate is the front-end API that is exposed to the users of your Spinnaker instance.  It also manages authentication and authorization for sub-service APIs and resources with Spinnaker.  All communication between the UI and the back-end services happen through Gate.  You can find a list of the endpoints available through Swagger:  `http://${GATE_HOST}:8084/swagger-ui.html`

### Rosco

Rosco is the "bakery" service.  It is a wrapper around Hashicorp's Packer command line tool which bakes images for AWS, GCP, Docker, Azure, and [other builders](https://www.packer.io/docs/builders/index.html).

### Deck

Deck is the UI for interactive and visualizing the state of cloud resources.  It is written entirely in Angular and depends on Gate to interact with the cloud providers.

### Igor

Igor is a wrapper API which communicates with Jenkins.  It is responsible for kicking-off jobs and reporting the state of running or completing jobs.

### Echo

Echo is the service for Spinnaker which manages notifications, alerts and scheduled pipelines (Cron).  It can also propagate these events out to other REST endpoints such as an Elastic Search, Splunk's HTTP Event Collector or a custom event collector/processor.

### Front50

Front50 is the persistent datastore for Spinnaker. Most notabily pipelines, configurations, and jobs.

### Kayenta

Kayenta is Spinnaker's canary analysis service, integrating with 3rd party monitoring services such as Datadog or Prometheus.

## Armory Specific Micro-Services

### Dinghy
Dinghy is the Armory-specific microservice used to manage Pipelines as Code.  It supports two main capabilities:
* Automatically synchronizing pipeline definitions from an external Github or BitBucket repository to Armory Spinnaker.
* Creating a library of pipeline modules (components) that can be templatized and used in Dinghy-managed pipeline definitions.

### Terrafomer
Terraformer is the Armory-specific microservice used to run Terraform scripts within a Spinnaker pipeline.