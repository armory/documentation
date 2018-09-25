---
layout: post
title: Expose Spinnaker with Ingress
order: 30
---
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

### Install the alb-ingress-controller.

This tutorial takes advantage of the `aws-alb-ingress-controller` project,
which will automatically create ALBs for your services when you create an
ingress later.  Follow the
[walkthrough](https://github.com/kubernetes-sigs/aws-alb-ingress-controller/blob/master/docs/walkthrough.md)
to get this going first.

### DNS Preparation

We'll be setting up two CNAME entries in our DNS in this example; we won't be
able to actually configure the DNS until we get an A record from AWS after
creating the Ingress, but we'll need to select the names in order to configure
the Ingress below.  For this tutorial, we've selected `demo.armory.io` to be
our Deck service (the UI), and `gate.demo.armory.io` to be our Gate service
(the API).

### Create the Ingress

Navigate to your EKS cluster page in the AWS console, and note down the
subnets and security groups; fill them in below (if you have more than one,
use quotes and separate by commas).

```
apiVersion: extensions/v1beta1
kind: Ingress
metadata:
  name: paul-ingress
  namespace: paul
  labels:
    app: "spin"
  annotations:
    # trigger the alb-ingress-controller
    kubernetes.io/ingress.class: "alb"

    # set ALB parameters
    alb.ingress.kubernetes.io/scheme: "internet-facing"
    alb.ingress.kubernetes.io/target-type: "ip"
    alb.ingress.kubernetes.io/security-groups: sg-eced309f
    alb.ingress.kubernetes.io/subnets: "subnet-bbcbb8f0, subnet-8191c0f8, subnet-e7ddfdbd"
    # We'll set up HTTPS later...
    # alb.ingress.kubernetes.io/certificate-arn: my-acm-certificate-arn
    # alb.ingress.kubernetes.io/listen-ports: '[{"HTTP":80,"HTTPS": 443}]'
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTP":80}]'

    # allow 404s on the health check
    alb.ingress.kubernetes.io/healthcheck-path: "/health"
    alb.ingress.kubernetes.io/success-codes: "200,404"
    
spec:
  rules:
  - host: paul.armory.io
    http:
      paths:
      - backend:
          serviceName: spin-deck
          servicePort: 9000
        path: /*
  - host: gate.paul.armory.io 
    http:
      paths:
      - backend:
          serviceName: spin-gate
          servicePort: 8084
        path: /*

```

### Update the Internal URLs

Spinnaker will, by default, expect to be running off `localhost` and will
generate self-referential URLs with that URL.  Now that the public DNS
entries are working, we need to update Spinnaker's configuration to reflect
them:

```
$ hal config security api edit --override-base-url http://gate.demo.armory.io
$ hal config security ui edit --override-base-url http://demo.armory.io
$ hal deploy apply
```

## Securing with SSL



