---
layout: post
title: Configure Jenkins
order: 50
redirect_from:
  - /spinnaker_install_admin_guides/jenkins/
---

Before you can make use of Jenkins in Spinnaker, you'll need to
configure access to your Jenkins masters.

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

> The Spinnaker project has more in-depth documentation on configuring Jenkins
> in Spinnaker [here](https://www.spinnaker.io/setup/ci/jenkins/)

## Enable Jenkins Support

* **Operator**

    Add the following snippet to your `SpinnakerService` manifest:

    ```yaml
    apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
    kind: SpinnakerService
    metadata:
      name: spinnaker
    spec:
      spinnakerConfig:  
        config:
          ci:
            jenkins:
              enabled: true
    ```

* **Halyard**

    Enable Jenkins using the Halyard command:

    ```bash
    hal config ci jenkins enable
    ```

## Create a User API Token in Jenkins

Spinnaker uses your Jenkins username and API token for authentication.

1. Log into Jenkins
2. Click on your username (in the top right)
3. Click on "Configure" (on the left)
4. Under the "API Token" section, click on "Add new Token", and "Generate" and record the generated token
5. Record your username; this is the value in the current page URL between 'user' and 'configure' (http://<jenkins-url>/user/<username>/configure)

## Add a Jenkins Master

You can add as many Jenkins masters as needed.  Once the master is configured
properly, Spinnaker will use the credentials provided to query for all
available jobs and display them in the UI for triggers and stages.

Add the Jenkins master to Spinnaker:

* **Operator**

    Add the following snippet to your `SpinnakerService` manifest:

    ```yaml
    apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
    kind: SpinnakerService
    metadata:
      name: spinnaker
    spec:
      spinnakerConfig:  
        config:
          ci:
            jenkins:
              enabled: true
              masters:
              - name: <jenkins-master-name>
                address: https://<jenkins-url>/ # The address your jenkins master is reachable at.
                username: <jenkins-username>    # The username of the jenkins user to authenticate as.
                password: abc                   # The password of the jenkins user to authenticate as. This field support "encrypted" secret references.
    ```

    Don't forget to apply your changes:

    ```bash
    kubectl -n >spinnaker namespace> apply -f <SpinnakerService manifest>
    ```

* **Halyard**

    ```bash
    hal config ci jenkins master add <jenkins-master-name> \
        --address https://<jenkins-url>/ \
        --username <jenkins-username> \
        --password # You will be prompted for your Jenkins API token interactively
    ```

    Apply your changes using ```hal deploy apply```.

## Troubleshooting Authentication / Connectivity

Igor is the service that interacts with Jenkins.  You can test Spinnaker-Jenkins connectivity using `curl` from another pod. The Deck or Clouddriver pod is a good option since `curl` is already installed there.

```bash
curl https://<jenkins-url>/api/json --user <jenkins-username>:<jenkins-api-token>
```

This returns a JSON list of jobs.

For example:

```bash
# Exec into the Clouddriver container:
kubectl exec -it spin-clouddriver-6cf45f4db-lkg7t bash

bash-4.4$ curl https://jenkins.domain.com/api/json --user justin:1234567890abcdefghijklmnopqrstuvwx
{"_class":"hudson.model.Hudson","assignedLabels":[{"name":"master"}], [...] }
```
