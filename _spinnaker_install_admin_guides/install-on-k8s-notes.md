---
layout: post
title: Installing Spinnaker in EKS - Prereqs
order: 21
# Change this to true
published: false
redirect_from:
  - /spinnaker_install_admin_guides/install_on_eks/
  - /spinnaker_install_admin_guides/install-on-eks/
  - /spinnaker-install-admin-guides/install_on_eks/
---

This is a workspace for adding additional content to the K8s doc, and is not published


### Connecting to a GKE cluster

If we're using a GKE cluster, we must be able to connect to the EKS cluster. This assumes you have already configured the `gcloud` SDK with a project, zone, and region (see directions [here](https://cloud.google.com/kubernetes-engine/docs/how-to/creating-a-cluster)

If we have access to the role that created the EKS cluster, we can update our kubeconfig with access to our Kubernetes cluster with this command:

```bash
gcloud container clusters get-credentials <your-cluster-name>
```

From here, we can validate access to the cluster with this command (should receive a number of namespaces)

```bash
kubectl get namespaces
```


### Using GCS for Front50

Spinnaker (the <code>Front50</code> service, specifically) will need access to a GCS bucket. There are a number of ways to achieve this.

This section describes how to do the following:

* Create a Google Service Account and GCS bucket
* Configure Spinnaker to use the Google Service Account to access the GCS bucket

<details><summary><b>Click to expand</b></summary>

<details><summary>Creating a Google Service Account and GCS bucket</summary>

Spinnaker uses a GCS bucket to store persistent configuration (such as pipeline definitions).  This section will create a Google IAM service account as well as a Google credential file for use by Halyard and Spinnaker.

</details>

<details><summary>Configuring Spinnaker use the Google Service Account to access the GCS bucket</summary>

</details>

</details>
