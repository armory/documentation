---
layout: post
title: Best Practices
order: 70
redirect_from:
  - /user-guides/best-practices/
  - /user-guides/best_practices/
  - /user_guides/best-practices/
  - /user_guides/best_practices/
  - /spinnaker_user_guides/best-practices/
  - /spinnaker_user_guides/best_practices/
  - /spinnaker-user-guides/best_practices/
---

This guide includes:
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Configuration Management
{:.no_toc}

### Baking Configuration

It is common practice to bake the bulk of your application's configuration into your AMI. Secrets should not be included. Configurations that frequently change and service discovery is often managed by another system. Some common system choices include but are not limited to: [Consul](https://www.consul.io/), [Archaius](https://github.com/Netflix/archaius), [Zookeeper](https://zookeeper.apache.org/), and [etcd](https://github.com/coreos/etcd).

If you are running the default installation of Armory Spinnaker, then every AWS instance will have details about its environment/stack stored in `/etc/default/server-env`. This can be used to load the correct configuration.


### Service Discovery

While it is not feasible for every type of application, using a load balancer can greatly simplify things. Spinnaker gives load balancers first-class citizenship and will not need additional integrations to work right out of the box.

For applications and workloads that cannot utilize a load balancer, the tools listed above may help.


## Secret Management

Managing Secrets is a major part of deploying software. Spinnaker does not directly do this for you. However, there are still some guiding principles to help you along the way.

It would be best not to bake Secrets into your images. If you have the default installation of Armory Spinnaker then you can find `/etc/default/server-env` on your instance. This file will have information (in the format of key-value pairs) about the environment and stack you are running on. You can use this to load the correct Secrets.

Loading Secrets will have to be done at runtime since Secrets are not baked into images.

Specifically for Secure Sockets Layer (SSL), it can be beneficial to terminate SSL at the Elastic Load Balancer (ELB) whenever feasible. Amazon has the [Key Management Service (KMS)]() for this purpose. If you need to handle certificate management at the application level, you might want to check out [Netflix's Lemur](http://techblog.netflix.com/2015/09/introducing-lemur.html) project.

Some other general purpose Secret Management tools include:
- [HashiCorp's Vault](https://www.vaultproject.io/)
- [Nike's Cerberus](http://engineering.nike.com/cerberus/)


### Using Vault With Spinnaker on AWS

Issuing a Vault token with AWS is an automated process that uses AWS as a [trusted third party to initiate authorization](https://www.vaultproject.io/docs/auth/aws-ec2.html).

One piece of "dynamic metadata" available to the EC2 instance, is the instance identity document, a JSON representation of a collection of instance metadata. AWS also provides PKCS#7 signature of the instance metadata document, and publishes the public keys (grouped by region) which can be used to verify the signature.

You can issue an authentication by issuing the following:

```
$ vault auth-enable aws-ec2
```

And then proceeding with any additional vault commands and execution that needs to happen.  These steps need to happen at startup you'll want add this script as a [base 64 encoded users-data in your deployment steps](https://docs.armory.io/user-guides/deploying/).

### Isolate Delivery Pipelines from Integration

There are several ways to trigger a deployment pipeline. However, depending on the asset you are delivering, some methods are easier to work with than others.

*Docker Images*

It is best to have Spinnaker trigger off of a push to a Docker registry instead of triggering off of a GitHub push or Jenkins job. Doing so frees up the development teams to restructure their build systems and validation as they desire because everything in the delivery process can remain the same as long as the Docker image makes it up to the repo.

Sometimes you may need extra information if you're triggering off of Docker images. For instance you might want to release anything on the master branch to production, but release any other branch to the staging area. In order to do so, put the extra information into the tag, and the pipeline triggers in Spinnaker can use regular expression matches on the tag name in Docker to determine which pipeline to execute. Here is an example:

![](/images/Image 2017-04-17 at 4.35.46 PM.png)
