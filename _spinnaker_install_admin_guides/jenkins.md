---
layout: post
title: Configure Jenkins
order: 50
redirect_from:
  - /spinnaker_install_admin_guides/jenkins/
---

Before you can make use of Jenkins in Spinnaker, you'll need to use Halyard
to configure access to your Jenkins masters.

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

> The Spinnaker project has more in-depth documentation on configuring Jenkins
> in Spinnaker [here](https://www.spinnaker.io/setup/ci/jenkins/)

## Enable Jenkins Support

If you haven't already done it, you'll need to enable Jenkins with Halyard
with the command below.  Don't worry if it was already enabled -- nothing bad
will happen if you've already enabled it.

```bash
hal config ci jenkins enable
```

## Add a Jenkins Master

You can add as many Jenkins masters as needed.  Once the master is configured
properly, Spinnaker will use the credentials provided to query for all
available jobs and make them available in the UI for triggers and stages.

```bash
hal config ci jenkins master add my-jenkins-master \
  --address https://jenkins.my.com/ \
  --username myusername \
  --password # You'll be prompted for your password interactively

# Remember to apply changes!
hal deploy apply
```

## Jenkins Auth when Jenkins is configured with an Auth Provider
If you have are trying to authenticate Spinnaker against a Jenkins master that has some third party authentication set up, you have to create an API token for Spinnaker to use as a password to authenticate against Jenkins.  This is how to do this:

1. Log into Jenkins
2. Click on your username (in the top right)
3. Click on "Configure" (on the left)
4. Under the "API Token" section, click on "Add new Token", and "Generate" and record the generated token
5. Record your username (should be in the URL for the current page - if you're at https://jenkins.domain.com/user/justin/configure, then the username is `justin`)
6. Add the Jenkins master to Spinnaker with this (replace the environment variables with your own values):
    ```
    JENKINS_NAME=my-jenkins-master-2
    USERNAME=justin
    JENKINS_URL=https://jenkins.domain.com
    TOKEN=1234567890abcdefghijklmnopqrstuvwx

    hal config ci jenkins enable
    echo ${TOKEN} | hal config ci jenkins master add ${JENKINS_NAME} \
        --address ${JENKINS_URL} \
        --username ${USERNAME} \
        --password

        # Password will be read from STDIN
    ```

## Troubleshooting Authentication / Connectivity
Igor is the service that interacts with Jenkins.  If you want to test connectivity to your Jenkins master using the username and password/token, you can try test connectivity like this from a pod adjacent to Igor (Deck or Clouddriver is a good option, because they both often have `curl` built in):

```bash
curl https://JENKINS_URL/api/json \
    --user USERNAME:TOKEN
```

This should return a JSON list of jobs.
For example:

```bash
# Exec into the Clouddriver container:
kubectl exec -it spin-clouddriver-6cf45f4db-lkg7t bash

bash-4.4$ curl https://jenkins.domain.com/api/json --user justin:1234567890abcdefghijklmnopqrstuvwx
{"_class":"hudson.model.Hudson","assignedLabels":[{"name":"master"}], [...] }
```