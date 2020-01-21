---
layout: post
title: Spinnaker GitOps with Halyard
order: 158
---
This article describes how to automate the deployment of Spinnaker and manage its configuration in source control.
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Workflow

This approach enables the following workflow:

1. Spinnaker configurations are stored under source control.
2. Users have two options for updating configurations:
    * Clone the repo, make changes to the config files and commit the changes.
    * Clone the repo, run halyard container locally to update configurations using `hal` commands, and commit the changes.
3. A job in your existing CI tool automatically runs `hal deploy apply` to deploy Spinnaker changes.

## Step 1: Remove secrets from your halyard configuration

Since we'll be storing halyard configuration under source control, you need first to remove any secrets from it. Make sure to follow [these instructions](../secrets).

## Step 2: Store your current configuration in source control

Create a new repository under source control with the following structure, copying your current Spinnaker configuration files:

```bash
README.md
<spin-installation-1>/
  hal/
    config
    ...
<spin-installation-2>/
  hal/
    config
    ...
<spin-installation-n>/
```

There are some files that you can safely ignore from source control, because they are auto generated when running some `hal` commands.

*.gitignore*
```bash
staging/
history/
```

You can manage multiple Spinnaker installations from a single repository.

## Step 3: Create helper scripts to run Halyard and deploy Spinnaker

Halyard needs to be run as a Docker container for portability across machines.

Here is a sample script to be put in the repo's root. It runs Halyard as a container, execs into it, and issues halyard commands. This example assumes AWS credentials present at `~/.aws` and `AWS_PROFILE` environment variable used to select the right profile from those credentials, but you can mount any authentication files or environment variables needed to run your Halyard commands.

*run-halyard.sh*
```bash
#/bin/bash

set -ex

ENVIRONMENT=$1

[[ "x$ENVIRONMENT" = "x" ]] && echo "Usage: $0 <spin installation>" && exit 1

export HALYARD_VERSION=x.x.x
export HAL_HOME=`pwd`/$ENVIRONMENT/hal
export AWS_HOME='~/.aws'

# Run container
docker run --name armory-halyard --rm \
    -v $HAL_HOME:/home/spinnaker/.hal \
    -v $AWS_HOME:/home/spinnaker/.aws \
    -e AWS_PROFILE \
    -d docker.io/armory/halyard-armory:$HALYARD_VERSION

# Wait for container to start
sleep 30

# Connect to the running conainer
docker exec -it armory-halyard bash
sleep 3

docker stop armory-halyard
```

This other script is used for your CI tool to automatically deploy Spinnaker changes after a commit is pushed to the repo. It's basically the same as the previous one but it only executes `hal deploy apply`. You need to account for this script being run in your CI environment; provide any authentication credentials needed by your environment.

*apply-configs.sh*
```bash
#/bin/bash

set -ex

ENVIRONMENT=$1

[[ "x$ENVIRONMENT" = "x" ]] && echo "Usage: $0 <spin installation>" && exit 1

# Delete dangling halyards
EXISTING=`docker ps -q -a -f name="halyard"`
if [ "x$EXISTING" != "x" ]
then
    docker stop $EXISTING && sleep 5
    EXISTING=`docker ps -q -a -f name="halyard"`
    if [ "x$EXISTING" != "x" ]
    then
        docker rm $EXISTING
    fi
fi

export HALYARD_VERSION=x.x.x
export HAL_HOME=`pwd`/$ENVIRONMENT/hal
export AWS_HOME='~/.aws'

# Run container
docker run --name armory-halyard --rm \
    -v $HAL_HOME:/home/spinnaker/.hal \
    -e AWS_ACCESS_KEY_ID \
    -e AWS_SECRET_ACCESS_KEY \
    -d docker.io/armory/halyard-armory:$HALYARD_VERSION

# Wait for container to start
sleep 30

# Apply the configurations
docker exec armory-halyard hal deploy apply

sleep 3

docker stop armory-halyard
```

Finally, this is a sample Jenkins pipeline that executes the above script.

*Jenkinsfile*
```groovy
pipeline {
  agent any
  environment {
    AWS_CREDS = credentials('AWS_SPINNAKER')
  }
  stages {
     stage('Run hal deploy apply') {
      steps {
        sh '''
          export AWS_ACCESS_KEY_ID=$AWS_CREDS_USR
          export AWS_SECRET_ACCESS_KEY=$AWS_CREDS_PSW
          ./apply-configs.sh
        '''
      }
    }
  }
}
```

Putting it all together, you'll end up with the following repo structure:

```bash
README.md
run-halyard.sh
apply-configs.sh
Jenkinsfile
<spin-installation-1>/
  hal/
    config
    ...
<spin-installation-2>/
  hal/
    config
    ...
<spin-installation-n>/
```
