---
layout: post
title: Troubleshooting
order: 200
---


#### I upgraded Spinnaker and it is no longer responding, how do I rollback?

If you deploy a configuration or a change that takes down Spinnaker it'll be impossible to rollback since Spinnaker would not be available.  In order to manually to deploy back you'll have to do the following:

1.  Look for an existing deployment with the `armoryspinnaker` prefix.  

1.  Find the ASGs of Armory Spinnaker that were deployed.  Typically it should be `armoryspinnaker-ha-polling-v${VER}` where `${VER}` is something like `023`.  You should see 2 ASGS, one that is active instead and the older version should be disabled. ![armory spinnaker ASGs](http://f.cl.ly/items/052s3x3Z0i0g3T1R0V2L/Image%202017-02-02%20at%2011.57.41%20AM.png?v=c049b757)

1. Edit the older ASG and remove any suspended processes that are listed ![remove suspended process](http://f.cl.ly/items/3D3f1Z2t2s06050x3734/%5B25db0756e39ea3537131a8220e10f18d%5D_Image%2525202017-02-02%252520at%25252012.00.50%252520PM.png?v=a6380340)

1.  Increase the number of instances for the `armoryspinnaker-ha-polling` ASG to just 1 and set the other ASG `armoryspinnaker-ha`, the non-polling ASG back to atleast 2.
![ASG upping desired capacity count](http://f.cl.ly/items/0C3r3r3e0p3r2a0e3t2i/%5B28125238555a966ddf3b571e617e8cba%5D_Image%25202017-02-02%2520at%252012.11.20%2520PM.png?v=8c16dc8f)

1.  Reduce the latest ASGs down to 0 so that they're no longer behind the ELB

1.  Check the Armory Spinnaker ELB.  Make sure all instances are attached to the user-facing and internal-services ELB and are healthy.

1.  Go back to your Armory Spinnaker URL and make sure all is back to a working state.

#### How can I debug Armory Spinnaker?

You'll need to SSH into a box running Armory Spinnaker.  You can find an active node by going to clusters view and selecting a node.
![selecting a node](https://cl.ly/0I321x3I0p0e/Screen%20Recording%202017-09-14%20at%2004.18%20PM.gif)

Once you have SSH'ed into a box you'll need to find which sub-service is unhealthy:
```
curl localhost:5000/healthcheck
```

This should return a response similar to:
```
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

```
docker logs -f clouddriver
```

This should stream all the `clouddriver` logs to your terminal.  You'll want to look for any obvious exceptions or stack-traces to share with the Armory Support team.

#### How can I flush the Redis cache?

1.  SSH into an active Armory Spinnaker node
1.  Install redis server which comes with the cli tool.  
```
apt-get install redis-tools
```

1.  Flush all content.  This will remove old executions.

```
. /opt/spinnaker/env/resolved.env redis-cli -h ${REDIS_HOST} FLUSHALL
```

#### How do I remove hung operations in the tasks view?

From time-to-time you might have hung tasks.  In order to clear them out you'll have to use Redis you'll have to remove the key from the server.

1.  SSH into an active Armory Spinnaker node
1.  Install redis server which comes with the cli tool.  
```
apt-get install redis-tools
```
1.  Find the host of the Armory Spinnaker Redis server.  This is typically kept in ```/opt/spinnaker/env/resolved.env``` under the key ```REDIS_HOST```.
1.  Find the key of the task you want to delete.
![alt text](http://f.cl.ly/items/043D1P1s1T353Y3E352D/%5B8c4dbdb8b3942adf28094343663d5588%5D_Image+2017-08-01+at+11.37.03+AM.png?X-CloudApp-Visitor-Id=2686178&v=7e43486e)
You can then grab the ID from the url:
`https://${YOURSPINNAKER_INSTANCE}:8084/applications/armoryspinnaker/tasks/bf06a51c-083f-40f0-964a-71314c97ae17`

4.  Delete the orchestration keys from redis:<br/>
`. /opt/spinnaker/env/resolved.env redis-cli -h ${REDIS_HOST} DEL orchestration:${TASK_KEY}`<br/> <br/>
`. /opt/spinnaker/env/resolved.env redis-cli -h ${REDIS_HOST} DEL  orchestration:bf06a51c-083f-40f0-964a-71314c97ae17:stageIndex`


#### How do I add DEBUG level logging?

You can specify logging levels based on the package that you're trying to debug or reduce messaging by adding the following to `/opt/spinnaker/config/spinnaker-local.yml`

```
logging:
  level:
    com.netflix.spinnaker.gate: DEBUG
    com.netflix.spinnaker..clouddriver: WARN
```
