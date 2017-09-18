---
layout: post
title: Jenkins
order: 50
---

# What To Expect
This guide should include:
- Configuring Jenkins (or multiple masters) as a trigger to kick-off pipelines

# Continuous Integration (CI)
Spinnaker's goal is to leverage existing CI solutions to build and produce an artifact that can be deployed.

## Enabling Spinnaker to Communicate with Jenkins

To enable Spinnaker to communicate with your Jenkins instance you will need to edit your `spinnaker-local.yml` file.
First prepare to configure Jenkins by finding your password or API Token.  You can find your token here: `http://${YOUR_JENKINS_URL}.armory.io/me/configure`.

Then configure your `/opt/spinnaker/config/spinnaker-local.yml` file and add the following:

```
services:
  igor:
    enabled: true
  jenkins:
    enabled: true
    defaultMaster:
      name: Name-of-Jenkins-Service
      baseUrl: http://${YOUR_JENKINS_URL}
      username: ${YOUR_USERNAME}
      password: ${API_TOKEN}
```

Make sure to restart the Igor service: `sudo docker restart igor`

## Multiple Jenkins Masters

If you have more than one Jenkins master, you'll need to edit your `igor-local.yml`.

```

jenkins:
  enabled: ${services.jenkins.enabled:false}
  masters:
    - name: First-Master
      address: http://firstmaster.example.com:8080
      username: first-master-username
      password: first-master-password
    - name: Second-Master
      address: http://second-master.example.com
      username: second-master-username
      password: second-master-password
```

## Purpose
Igor is an API that is responsible for executing and reading the state of jobs from Jenkins.


## Verify Your Jenkins Configuration
You can see if you've configured your jenkins master correctly by querying `Gate`:
```
curl localhost:8084/v2/builds
```

You should see a response similar to:
```
[
  "Armory Jenkins",
  "First-Master",
  "Second-Master"
]
```
