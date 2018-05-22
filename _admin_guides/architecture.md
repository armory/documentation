---
layout: post
title: Architecture
order: 10
---
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}



We provide two methods of installing Spinnaker: Stand-Alone and High-Availability (HA).  The stand-alone version is there for development and evaluation purposes.  It's a simplified deployment and is the quickest way to evaluate Spinnaker.  The HA deployment provides redundancy and additional security such that there is no single point of failure.


## Stand-Alone

 * Local instance Redis
 * Local networking
 * Configuration persistance is done through s3


Below is a diagram of the architecture & components deployed in a stand-alone configuration.

![](http://f.cl.ly/items/1v2S0C0l0p3m18060g06/Image%202017-01-26%20at%2012.03.11%20PM.png?v=3aa888eb)


### Security Groups
In order to not expose any Spinnaker sub-services which may not contain authentication, we use internal and user-facing security groups.  The user-facing security group exposes ports for `gate` and `deck`, typically 8084 and 80 respectively.  A separate security group is used for internal communication between services.


### Autoscaling Groups & Launch Configurations
We'll create an ASG with the name `armoryspinnaker-preprod-v000`.  

By default, we create an instance with a private IP and keys which should only be accessible by your team.


## High Availability (HA)

* Redudancy and solid performance
    - Multiple Availability Zones (AZ) failovers
    - Scheduled jobs failovers into a new AZ
    - Polling jobs (jenkins, etc.) failovers into a new AZ
* HA is our intermediate step before breaking up each sub-service into multiple AZs

Below is a diagram of the architecture & components deployed in an HA configuration.

![](http://f.cl.ly/items/3a272r1D3S1j0R2N3H2f/Image%202017-01-26%20at%2011.18.35%20AM.png?v=38d7cea6)

## Polling and Non-Polling environments

For certain components you'll only want a single instance running on an ASG on "polling" mode.  Namely Igor and Echo which need to run on a
single instance so that multiple trigger events are not sent to Spinnaker and issuing multiple events for the same build.

## Systems Requirements

Armory Spinnaker runs only on Ubuntu & CentOS and RHEL based machines within AWS.  It uses AWS resources to run manage and run Armory Spinnaker.  

### Cloud & Operating Systems

We currently support running Armory Spinnaker in AWS.  By default it uses (3) m4.2xlarge machines for redudancy.  Once launched, this is completely configurable and based on your team's usage patterns can be scaled up and down with Spinnaker.

### Target Cloud Providers
We currently support AWS and Kubernetes. We plan to support GCP and Azure in the future.

## Docker

Armory Spinnaker uses Docker and Docker-Compose for every component possible.  

### Security Groups
In order to not expose any Spinnaker sub-services which may not contain authentication, we use internal and user-facing security groups to match the internal and external facing ELB.  The user-facing security group exposes ports for `gate` and `deck`, typically 8084 and 80 respectively.  If you choose to [configure SSL/HTTPS](http://docs.armory.io/admin-guides/auth/#enabling-httpsssl) at a later time, then 443 will need to be opened as well.  A separate security group is used for internal communication between services which exposes ports but only between members of the security group.
