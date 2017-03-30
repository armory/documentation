
TODO:
- How does Spinnaker monitor a deployment
  - polling, interval 30 seconds, potential rate limits
  - clouddriver is the main component

- Passing deploy information to your instances
  - UDF0


# Deploying


This guide should include:

- How to deploy AMIs
- TODO


Prerequisites and Assumptions:

- You know how to create pipelines and utilize the [Bake stage](baking_images.md)


The primary objective of Spinnaker is to deploy your software. It would like you to [Bake an image](baking_images.md) and use that same image to deploy to all of your environments.

Spinnaker opinion of an application: load balancer, server groups

The typical type of distributed application that Spinnaker deploys is one with a cluster of homogeneous instances behind a load balancer. The load balancer is resposible for detecting healthy and unhealthy instances.

TODO: more detail about types of applications.

To start off, lets go through an example. This example continues from the example in the [Baking an image guide](baking_images.md).


## Example

