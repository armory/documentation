---
layout: post
title: Architecture
order: 10
---
# Architecture

We provide two methods of installing Spinnaker: Stand-Alone and High-Availability (HA).  The stand-alone version is there for development and evaluation purposes.  It's a simplified deployment and is the quickest way to evaluate Spinnaker.  The HA deployment provides redundancy and additional security such that there is no single point of failure.  It also allows you to easily


## Stand-Alone
Below is a diagram of the architecture & components deployed in a stand-alone configuration.

![](https://d17oy1vhnax1f7.cloudfront.net/items/1v2S0C0l0p3m18060g06/Image%202017-01-26%20at%2012.03.11%20PM.png?v=3aa888eb)

### Security Groups
In order to not expose Spinnaker sub-services which may not contain authentication, we use internal and user-facing security groups.  The user-facing security group exposes ports for `gate` and `deck`, typically 8084 and 80 respecitively.  We use a separate security group for internal communication between services.

### Autoscaling Groups & Launch Configurations
We'll create an ASG with the name `armoryspinnaker-preprod-v000`.  

By default, we create an instance with a private IP and keys which should only be accessible by your team.

## High Availability (HA)
Below is a diagram of the architecture & components deployed in an HA configuration.

![](https://d17oy1vhnax1f7.cloudfront.net/items/3a272r1D3S1j0R2N3H2f/Image%202017-01-26%20at%2011.18.35%20AM.png?v=38d7cea6)

## Systems Requirements

Armory Spinnaker runs only on Ubuntu & CentOS and RHEL based machines within AWS.  It uses AWS resources to run manage and run Armory Spinnaker.

### Cloud & Operating Systems

We currently support running Armory Spinnaker in AWS.

### Target Cloud Providers
  We currently Support

## Docker

Armory Spinnaker uses Docker and Docker-Compose for every component possible.  


## Stand Alone

 * Local redis
 * local networking

## High Availability

* redudancy, performane, intermediate step before breaking out into many more components
