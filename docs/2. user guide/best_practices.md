# Best practices

This guide should include:

- Configuration management
- Secret management


## Configuration Management

### Baking configuration

It is common practice to bake the bulk of your application's configuration into your AMI. Secrets should not be included. Configuration that frequently changes and service discovery is often managed by another system. Some common choices for this include but are not limitted to [Consul](https://www.consul.io/), [Archaius](https://github.com/Netflix/archaius), [Zookeeper](https://zookeeper.apache.org/), and [etcd](https://github.com/coreos/etcd).

If you are running the default installation of ArmorySpinnaker, then every AWS instance will details about its environment/stack stored in `/etc/default/server-env`. This can be used to load the correct configuration.


### Service discovery

While it is not feasable for every type of application, using a load balancer can greatly simplify things. Spinnaker treats load balancers as first class citizens and will not need additional integrations to work right out of the box.

For applications and workloads that can not utilize a load balancer, the tools listed above may help.


### Isolate Delivery Pipelines from Integration

While it's possible to have Spinnaker webhook off of github repos or trigger from Jenkins jobs, it's generally preferable to isolate the delivery pipeline from the code build. That means triggering Spinnaker pipelines off of Docker repos currently. That frees up the development teams to restructure their build systems and validation in whatever way they want, as long as the Docker image makes it up to the repo everything in the delivery process can remain the same.

If you're triggering off of Docker images sometimes you'll need some extra info however. For instance you might want to release anything on the master branch to production, but release any other branch to the staging area. To handle that put the extra information into the tag, and the pipeline triggers in Spinnaker can use regular expression matches on the tag name in Docker to determine which pipeline to execute.


## Secret Management

Managing secrets is a major part of deploying software. Spinnaker does not directly do this for you. However, there are still some guiding principles to help you along the way.

It would be best not to bake secrets into your images. If you have the default installation of ArmorySpinnaker then you can find `/etc/default/server-env` on your instance. This file will have information (in the format of key-value pairs) about the environment and stack you are running on. You can use this to load the correct secrets.

Since secrets are not baking, that implies that loading them will have to be done at runtime. 

Specifically for SSL, it can be beneficial to terminate SSL at the ELB whenever feasable. Amazon has the [Key Management Service (KMS)](https://aws.amazon.com/kms/) to help with this. If you need to handle certificate management at the application level, you might want to check out [Netflix's Lemur](http://techblog.netflix.com/2015/09/introducing-lemur.html) project.

Some other general purpose secret management tools include:
- [HashiCorp's Vault](https://www.vaultproject.io/)
- [Nike's Cerberus](http://engineering.nike.com/cerberus/)