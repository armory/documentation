---
layout: post
title: Expose Spinnaker with Ingress
order: 30
---
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Expose Spinnaker with an Ingress

You've gotten Spinnaker [installed](/spinnaker/install) on EKS but it's not
exposed to your organization yet.  We'll make this happen by creating a
Kubernetes (k8s) Ingress that takes advantage of Amazon's ALB ingress
controller.

For more detailed information on options, take a look at
[Dan Maas' Amazon EKS Ingress Guide](https://medium.com/@dmaas/amazon-eks-ingress-guide-8ec2ec940a70)

### Expose the Deck and Gate Services

By default, the Spinnaker services are hidden away, even from load balancers.
So we'll need to expose the Deck and Gate services, which are the only two
actually used by the browser.

```
$ export NAMESPACE={namespace}
$ kubectl expose service -n ${NAMESPACE} spin-gate --type LoadBalancer \
	--port 8084 \
	--targetPort 8084 \
	--name spin-gate-public
$ kubectl expose service -n ${NAMESPACE} spin-deck --type LoadBalancer \
	--port 9000 \
	--targetPort 9000 \
	--name spin-gate-public
```

You'll need to use halyard to actually configure the base URLs internally,
since Spinnaker still thinks it's running on "localhost":

```
$ export NAMESPACE={namespace}
$ export API_URL=$(kubectl get svc -n $NAMESPACE spin-gate-public -o jsonpath='{.status.loadBalancer.ingress[0].hostname)
$ export UI_URL=$(kubectl get svc -n $NAMESPACE spin-deck-public -o jsonpath='{.status.loadBalancer.ingress[0].hostname)
$ hal config security api edit --override-base-url http://${API_URL}:8084
$ hal config security ui edit --override-base-url http://${UI_URL}:9000
$ hal deploy apply
```

### Install the alb-ingress-controller.

This tutorial takes advantage of the `aws-alb-ingress-controller` project,
which will automatically create ALBs for your services when you create an
ingress later.  Follow the
[walkthrough](https://github.com/kubernetes-sigs/aws-alb-ingress-controller/blob/master/docs/walkthrough.md)
to get this going first.

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
  - host: gate.paul.armory.io 
    http:
      paths:
      - backend:
          serviceName: spin-gate
          servicePort: 8084
```



