---
layout: post
title: DNS and SSL
order: 43
# This has different content than install-guide/dns-and-ssl
redirect_from:
  - /spinnaker_install_admin_guides/dns_and_ssl/
  - /spinnaker_install_admin_guides/dns-and-ssl/
  - /spinnaker-install-admin-guides/dns_and_ssl/
---

# What To Expect
{:.no_toc}
This guide includes:
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

In order to use Spinnaker in your organization, you're going to want to configure your infrastructure so that users can access Spinnaker.  This has several steps:

* Expose the Spinnaker endpoints (Deck and Gate)
* Configure TLS encryption for the exposed endpoints
* Create DNS entries for your endpoints
* Update Spinnaker so that it's aware of its new endpoints.

## Expose the Spinnaker endpoints
Spinnaker users need access to two endpoints within Spinnaker

* Deck (the Spinnaker UI microservice), which listens on port 9000
* Gate (the spinnaker API microservice), which listens on port 8084

There are a number of ways to expose these endpoints, and your configuration of these will be heavily dependent on the Kubernetes environment where Spinnaker is installed.  Several common options are as follows:

* Set up an ALB ingress controller within your Kubernetes environment, and add an ingress for the `spin-deck` and `spin-gate` services.
* Set up an nginx ingress controller within your Kubernetes environment, and add an ingress for the `spin-deck` and `spin-gate` services.
* Create Kubernetes `loadbalancer` services for both the `spin-deck` and `spin-gate` Kubernetes deployments

## Configure TLS encryption for the exposed endpoints

It's recommended to encrypt the exposed Spinnaker endpoints.  There are three high-level ways of achieving this:

* Most common: Terminate TLS on the load balancer(s) in front of the endpoints, and allow HTTP traffic between the load balancer and the endpoint backends.
* Terminate TLS on the load balancer(s) in front of the endpoints, and configure the load balancer and endpoint backends with TLS between them, as well.
* Least common: Configure your load balancer(s) to support the SNI so that the load balancer passes the initial TLS connection to the backends.

There are a number of ways to achieve all of these - you can work with your Kubernetes, security, and networking teams to determine which methods best meet your organization(s) needs.

If you need to terminate TLS on the backend containers (the second or third options), review the Open Source Spinnaker documentation regarding configuring TLS certificates on the backend microservices: (Setup/Security/Authentication/SSL)[https://www.spinnaker.io/setup/security/authentication/ssl/].

## Create a DNS Entry for your Load Balancer

Add a DNS Entry to your DNS management system.  You should only need to add a DNS entry for the user-facing ALB, ELB, or other load balancer which is what you use to currently access Spinnaker.   It typically has a name such as the one below

```
armoryspinnaker-prod-external-123456789.us-west-1.elb.amazonaws.com
```

Add a CNAME entry for the given ELB to create a simple name you will use to access your instance of Spinnaker, e.g. `spinnaker.armory.io`.

## Update Spinnaker Configuration

Update the endpoints for Spinnaker Deck (the Spinnaker UI microservice) and Spinnaker Gate (the Spinnaker API microservice)

* **Operator**

    ```yaml
    apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
    kind: SpinnakerService
    metadata:
      name: spinnaker
    spec:
      spinnakerConfig:
        config:
          security:
            apiSecurity:
              overrideBaseUrl: https://spinnaker-gate.mydomain.com
            uiSecurity:
              overrideBaseUrl: https://spinnaker.mydomain.com
    ```

    Don't forget to apply your changes:

    ```bash
    kubectl -n <spinnaker namespace> apply -f <SpinnakerService manifest>
    ```

* **Halyard**

    ```bash
    hal config security ui edit --override-base-url=https://spinnaker.mydomain.com
    hal config security api edit --override-base-url=https://spinnaker-gate.mydomain.com
    ```

    Don't forget to apply your changes:

    ```bash
    hal deploy apply
    ```
