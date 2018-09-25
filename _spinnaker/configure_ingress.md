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
  name: demo-ingress
  namespace: demo
  labels:
    app: "spin"
  annotations:
    # trigger the alb-ingress-controller
    kubernetes.io/ingress.class: "alb"

    # set ALB parameters
    alb.ingress.kubernetes.io/scheme: "internet-facing"
    alb.ingress.kubernetes.io/target-type: "ip"
    alb.ingress.kubernetes.io/security-groups: sg-abcdef12
    alb.ingress.kubernetes.io/subnets: "subnet-aaaaaaaa, subnet-bbbbbbbb, subnet-cccccccc"
    # HTTPS configuration instructions COMING SOON!
    # alb.ingress.kubernetes.io/certificate-arn: my-acm-certificate-arn
    # alb.ingress.kubernetes.io/listen-ports: '[{"HTTP":80,"HTTPS": 443}]'
    alb.ingress.kubernetes.io/listen-ports: '[{"HTTP":80}]'

    # allow 404s on the health check; Deck doesn't have a /health path.
    alb.ingress.kubernetes.io/healthcheck-path: "/health"
    alb.ingress.kubernetes.io/success-codes: "200,404"
    
spec:
  rules:
  - host: demo.armory.io
    http:
      paths:
      - backend:
          serviceName: spin-deck
          servicePort: 9000
        path: /*
  - host: gate.demo.armory.io 
    http:
      paths:
      - backend:
          serviceName: spin-gate
          servicePort: 8084
        path: /*

```

### Create DNS CNAMEs

You should shortly see your new load balancer appear in the AWS console; you
will need to copy the DNS name from the description.  Alternatively, you should
also be able to edit the load balancer in Spinnaker and fine the hostname
at the bottom of the YAML, under `status:`.  Create your CNAMEs using this
hostname as the canonical name.  You'll need to do this for both your
Deck and Gate hostnames (demo.armory.io and gate.demo.armory.io in this
example), using the same canonical name.

It's useful to test the names work at this point.  Point a browser to
`gate.demo.armory.io/health` and verify you get a JSON response, and try
`demo.armory.io` (substituting your own hostnames, of course) and verify
you get at least some of the UI to load (it may not load completely because
we haven't finished configuring the hostnames).

### Update the Internal URLs in Spinnaker

The reason your UI may not have been working completely when you tried it
in the previous step is because Spinnaker is expecting to find Gate served
off `localhost`.  We need to configure it to use the new hostnames:

```
$ hal config security api edit --override-base-url http://gate.demo.armory.io
$ hal config security ui edit --override-base-url http://demo.armory.io
$ hal deploy apply
```

Once this change has settled, try hitting the Deck URL again, and verify
everything is working.  You can now use your DNS names to access your
Spinnaker instance.

## Secure with SSL

COMING SOON




