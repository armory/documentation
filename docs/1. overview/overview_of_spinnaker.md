# Overview of Armory-Spinnaker


## What Armory-Spinnaker Does

Armory-Spinnaker is a preconfigured distribution of spinnaker that runs on Amazon Web Services. Spinnaker can help you coordinate and orchestrate complicated tasks for deploying software. 


## Opinions and Conventions

A normal work flow in Armory-Spinnaker would be to start with a Debian package to create an Amazon Machine Image (AMI) for deployment to multiple environments, such as staging, development, and production. The Elastic Cloud Compute (EC2) instances themselves are never modified, but replaced with new instances as you produce new versions of your software. This concept is commonly referred to as Immutable Infrastructure.
