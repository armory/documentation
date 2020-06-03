---
layout: post
title: Monitoring Spinnaker with Prometheus
order: 920
---
This article describes how to monitor Spinnaker using Prometheus.
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

Using a monitoring solution to confirm the health of Spinnaker is a best practice that Armory recommends for every production instance. This document describes how to setup a basic Prometheus and Grafana stack along with enabling monitoring sidecars for the Spinnaker microservices. These sidecar pods provide a metrics endpoint that can be read by
Prometheus and graphed using Grafana. 

This document assumes that you have Spinnaker deployed in the spinnaker-system namespace, and that Prometheus and Grafana are deployed in the monitoring namespace. It also 
assumes that you have some familiarity with both Prometheus and Grafana. This document is a starting point for enabling metric collection. Additional Prometheus and Grafana
configuration will be necessary to make them production-grade, and this configuration is not a part of this document. 

## Use kube-prometheus to Create a Monitoring Stack

If you already have a monitoring stack, you can skip this section.

A quick and easy way to standup a cluster monitoring solution is to use kube-prometheus. This project creates a monitoring stack that includes cluster monitoring with Prometheus and dashboards with Grafana. 

To create the stack, follow the quick start instructions beginning with the Compatibility Matrix from the [kube-prometheus](https://github.com/coreos/kube-prometheus#kubernetes-compatibility-matrix) project. 

When you have completed the instructions, you will have pods running in the `monitoring` namespace.

```bash
% kubectl get pods --namespace monitoring

NAME                                  READY   STATUS    RESTARTS   AGE
alertmanager-main-0                   2/2     Running   0          44s
alertmanager-main-1                   2/2     Running   0          44s
alertmanager-main-2                   2/2     Running   0          44s
grafana-77978cbbdc-x5rsq              1/1     Running   0          40s
kube-state-metrics-7f6d7b46b4-crzx2   3/3     Running   0          40s
node-exporter-nrc88                   2/2     Running   0          41s
prometheus-adapter-68698bc948-bl7p8   1/1     Running   0          40s
prometheus-k8s-0                      3/3     Running   1          39s
prometheus-k8s-1                      3/3     Running   1          39s
prometheus-operator-6685db5c6-qfpbj   1/1     Running   0          106s

```

Access the Prometheus web interface by using a `kubectl port-forward`. NOTE: Eventually you will want to create an ingress service if you want to expose this interface for others to use. Before doing so, enable security controls following Prometheus best practices.

```bash
% kubectl --namespace monitoring port-forward svc/prometheus-k8s 9090 &
```

Then navigate to: http://localhost:9090/targets

## Configure Monitoring in Spinnaker

To enable monitoring of Spinnaker by Prometheus, enable the following configuration.

* **Halyard**

  Issue these halyard commands from within your hal directory or within your halyard container:

  ```bash
  halyard-0:~ $ hal config metric-stores prometheus enable

  + Get current deployment
    Success
  + Edit prometheus metric store
    Success
  + Successfully enabled prometheus

  halyard-0:~ $ hal deploy apply
  ```

* **Operator**
  ```bash
    apiVersion: spinnaker.armory.io/v1alpha2
    kind: SpinnakerService
    metadata:
      name: spinnaker
    spec:
      spinnakerConfig:  
        config:
          metricStores:
            prometheus:
              enabled: true
              add_source_metalabels: true          
  ```

Wait for all of the Spinnaker pods to be ready before proceeding to the next step. You can check the status by running a `kubectl get pods` command.  Because you are adding a sidecar to each pod, you may need to ensure you have enough capacity in your kubernetes cluster to be able to support the additional resource requirements. 

##  Configure Prometheus to Monitor Spinnaker

There are two steps to configure Prometheus to monitor Spinnaker.
- Add permissions for Prometheus to talk to the Spinnaker namespace
- Configure Prometheus to find the Spinnaker endpoints

Add permissions for Prometheus by applying the following configuration to your cluster:
```bash
apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: prometheus-k8s
  namespace: spinnaker-system
rules:
- apiGroups:
  - ""
  resources:
  - services
  - endpoints
  - pods
  verbs:
  - get
  - list
  - watch
---
apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: prometheus-k8s
  namespace: spinnaker-system
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: prometheus-k8s
subjects:
- kind: ServiceAccount
  name: prometheus-k8s
  namespace: monitoring
```

Configure Prometheus to find the Spinnaker metrics endpoints by applying this to your spinnaker-system namespace:

```bash
apiVersion: monitoring.coreos.com/v1
kind: ServiceMonitor
metadata:
  name: spinnaker-all-metrics
  labels:
    app: spin
    # this label is here to match the prometheus operator serviceMonitorSelector attribute
    # prometheus.prometheusSpec.serviceMonitorSelector
    # https://github.com/helm/charts/tree/master/stable/prometheus-operator
    release: prometheus-operator
spec:
  selector:
    matchLabels:
      app: spin
    namespaceSelector:
      any: true
  endpoints:
  # "port" is string only. "targetPort" is integer or string.
  - targetPort: 8008
    interval: 10s
    path: "/prometheus_metrics"
```

## Check for Spinnaker Targets in Prometheus

After applying these changes, you should be able to see spinnaker targets in Prometheus. It may take 3 to 5 minutes for this to show up depending on where Prometheus is in its config polling interval.

![Prometheus Targets](/images/prometheus.png)

## Access Grafana

Similar to what we did for Prometheus, port forward into Grafana and access the web interface.

```bash
$ kubectl --namespace monitoring port-forward svc/grafana 3000
```

Access the web interface via http://localhost:3000 and use the default grafana user:password of `admin:admin`.

## Add Armory Dashboards to Grafana

As a starting point for metrics to graph for monitoring, Armory provides a monitoring json file you can load into Grafana. If you are a Grafana expert, you can skip this step.

- Git clone this repo to your local workstation: https://github.com/armory-io/spin-monitoring-dashboards.git
- Access the Grafana web interface (as shown above)
- Navigate to Dashboards then Manage
- Click on the import button
- Upload the spin-monitoring-dashboards/grafana/spinnaker-main.json file from the directory you cloned above

After uploading the dashboards, you can view them by clicking on Dashboards, Manage, and then Spinnaker-main to explore graphs for each service.

![Grafana Dashboard](/images/grafana.png)

Additional example dashboards can be found at this location: https://github.com/spinnaker/spinnaker-monitoring

