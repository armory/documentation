# Spinnaker Deploying Spinnaker

## Orca State
A single Orca instance maintains the state of single pipeline.  If that orca instance dies then the pipeline will hang.  You have to make sure to never kill a pipeline.

### Redis

Redis maintains the state of each pipeline where the key of the executing pipeline is `pipeline:${KEY_ID}`  

## Lighthouse
One of the jobs that Lighthouse does is to monitor a Spinnaker Server Group to make sure that the instance is not executing any pipelines.  You can find executing pipelines by querying the Spinnaker API with a GET request here: `https://${YOUR_GATE_HOST}:8084/executions/activeByInstance` which can be seen here.
