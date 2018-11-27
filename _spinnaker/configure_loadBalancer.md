---
layout: post
title: Expose Spinnaker with LoadBalancer Service on EKS
order: 30
---
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Create an LoadBalancer service

Note: This guide assumes you’re deploying Spinnaker on Kubernetes using the Distributed deployment type with Halyard.

While there are many way to expose Spinnaker, we find the method described in this post to be the easiest way to get started. If your organization has other requirements, this post may be helpful as you start working through the process.

First, we’ll start by creating LoadBalancer Services which will expose the API (Gate) and the UI (Deck) via a Load Balancer in your cloud provider. We’ll do this by running the commands below and creating the spin-gate-public and spin-deck-public Services.
NAMESPACE is the Kubernetes namespace where your Spinnaker install is located. Halyard defaults to spinnakerunless explicitly overridden.

```
  export NAMESPACE={namespace}
 
  kubectl expose service -n ${NAMESPACE} spin-gate --type LoadBalancer \
  --port 8084 \
  --target-port 8084 \
  --name spin-gate-public
 
  kubectl expose service -n ${NAMESPACE} spin-deck --type LoadBalancer \
  --port 9000 \
  --target-port 9000 \
  --name spin-deck-public
```

Once these Services have been created, we’ll need to update our Spinnaker deployment so that the UI understands where the API is located. To do this, we’ll use Halyard to override the base URL for both the API and the UI and then redeploy Spinnaker.

```
  export NAMESPACE={namespace}
  export API_URL=$(kubectl get svc -n $NAMESPACE spin-gate-public -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
  export UI_URL=$(kubectl get svc -n $NAMESPACE spin-deck-public -o jsonpath='{.status.loadBalancer.ingress[0].hostname}')
  hal config security api edit --override-base-url http://${API_URL}:8084
  hal config security ui edit --override-base-url http://${UI_URL}:9000
  hal deploy apply
```

### Secure with SSL

This tutorial presumes you've already created a certificate in the AWS Certificate Manager.

* Edit the LoadBalancer service `spin-gate-public` and  `spin-deck-public` to include the following annotations
```
service.beta.kubernetes.io/aws-load-balancer-backend-protocol: http
service.beta.kubernetes.io/aws-load-balancer-ssl-cert: {acm-cert-arn}
service.beta.kubernetes.io/aws-load-balancer-ssl-ports: 80,443
```
Where {acm-cert-arn} is your certificate