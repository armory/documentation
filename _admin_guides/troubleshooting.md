---
layout: post
title: Troubleshooting
order: 200
---
{% include components/legacy_documentation.html %}

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

#### I upgraded Spinnaker and it is no longer responding, how do I rollback?

If you deploy a configuration or a change that takes down Spinnaker it'll be impossible to rollback since Spinnaker would not be available.  In order to manually to deploy back you'll have to do the following:

1.  Look for an existing deployment with the `armoryspinnaker` prefix.  

1.  Find the ASGs of Armory Spinnaker that were deployed.  Typically it should be `armoryspinnaker-ha-polling-v${VER}` where `${VER}` is something like `023`.  You should see 2 ASGS, one that is active instead and the older version should be disabled. ![armory spinnaker ASGs](/images/Image 2017-02-02 at 11.57.41 AM.png)

1. Edit the older ASG and remove any suspended processes that are listed
 ![remove suspended process](/images/admin-user-guide-1.png)

1.  Increase the number of instances for the `armoryspinnaker-ha-polling` ASG to just 1 and set the other ASG `armoryspinnaker-ha`, the non-polling ASG back to atleast 2.
![ASG upping desired capacity count](/images/admin-user-guide-2.png)

1.  Reduce the latest ASGs down to 0 so that they're no longer behind the ELB

1.  Check the Armory Spinnaker ELB.  Make sure all instances are attached to the user-facing and internal-services ELB and are healthy.

1.  Go back to your Armory Spinnaker URL and make sure all is back to a working state.

#### How can I debug Armory Spinnaker?

You'll need to SSH into a box running Armory Spinnaker.  You can find an active node by going to clusters view and selecting a node.
![selecting a node](/images/Screen Recording 2017-09-14 at 04.18 PM.gif)

Once you have SSH'ed into a box you'll need to find which sub-service is unhealthy:
```sh
curl localhost:5000/healthcheck
```

This should return a response similar to:
```json
{
   "healthy":true,
   "systems":{
      "gate":true,
      "clouddriver":false,
      "echo":true,
      "igor":true,
      "orca":true,
      "rosco":true,
      "front50":true,
      "deck":true,
      "host":{
         "diskUsage":65.7
      }
   }
}
```

In the example above `clouddriver` is `false` so it's likely unhealthy.  To check for exceptions or errors tail the logs:

```sh
docker logs -f clouddriver
```

This should stream all the `clouddriver` logs to your terminal.  You'll want to look for any obvious exceptions or stack-traces to share with the Armory Support team.

#### How can I flush the Redis cache?
**NOTE: When using Docker or Jenkins triggers, Redis's `FLUSHALL` could leave you vulnerable to extraneous pipeline runs, which could affect production piplines.** 

<br/>
1.  SSH into an active Armory Spinnaker node
1.  Install redis server which comes with the cli tool. `apt-get install redis-tools`
1.  Flush all content.  This will remove old executions.

```sh
. /opt/spinnaker/env/resolved.env redis-cli -h ${REDIS_HOST} FLUSHALL
```

#### How do I remove hung operations in the tasks view?

From time-to-time you might have hung tasks.  In order to clear them out you'll have to use Redis you'll have to remove the key from the server.

1.  SSH into an active Armory Spinnaker node
1.  Install redis server which comes with the cli tool. `apt-get install redis-tools`
1.  Find the host of the Armory Spinnaker Redis server.  This is typically kept in `/opt/spinnaker/env/resolved.env` under the key `REDIS_HOST`.
1.  Find the key of the task you want to delete.
![alt text](/images/[8c4dbdb8b3942adf28094343663d5588]_Image+2017-08-01+at+11.37.03+AM.png)
You can then grab the ID from the url:
`https://${YOURSPINNAKER_INSTANCE}:8084/applications/armoryspinnaker/tasks/bf06a51c-083f-40f0-964a-71314c97ae17`

4.  Delete the orchestration keys from redis:<br/>
`. /opt/spinnaker/env/resolved.env && redis-cli -h ${REDIS_HOST} DEL orchestration:${TASK_KEY}`<br/> <br/>
`. /opt/spinnaker/env/resolved.env && redis-cli -h ${REDIS_HOST} DEL  orchestration:bf06a51c-083f-40f0-964a-71314c97ae17:stageIndex`


#### How do I add DEBUG level logging?

You can specify logging levels based on the package that you're trying to debug or reduce messaging by adding the following to `/opt/spinnaker/config/spinnaker-local.yml`

```yaml
logging:
  level:
    # turn on request logging
    org.springframework.web.servlet.DispatcherServlet: DEBUG

    # turn on logging for the service
    com.netflix.spinnaker.gate: DEBUG
    com.netflix.spinnaker.clouddriver: WARN

    # if you want all the debug logs, be warned, there's a lot here
    root: DEBUG
```

#### Accessing a service's `/resolvedEnv` endpoint
Spinnaker uses Spring underneath the covers.  Spring has a sophisticated property file system which merges property files based on profiles, environment variables, and variable substitution. To see how Spring has resolved a final property set you'll need to disable security before issuing a GET request to the `/resolvedEnv` endpoint of the service.

>Note:  Disabling security will leave secrets exposed through the `resolvedEnv` endpoint and should only be used for debugging purposes

```yaml
security:
  basic:
    enabled: false

management:
  security:
    enabled: false
```

#### I can't see recently deployed server groups in the infrastructure view with the V2 Kubernetes provider

This is typically a lack of permissions on Kubernetes service account which Spinnaker uses to deploy.  Make sure that you give the service account access to other namespaces in the cluster where you want Spinnaker to deploy to.
