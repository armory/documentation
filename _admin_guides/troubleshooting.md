---
layout: post
title: Troubleshooting
order: 200
---

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

1.  Install redis server which comes with the cli tool.  
```apt-get install redis-tools```

2.  Flush all content.  This will remove old executions.

```
. /opt/spinnaker/env/resolved.env redis-cli -h ${REDIS_HOST} FLUSHALL
```

#### How do I remove hung operations in the tasks view?

From time-to-time you might have hung tasks.  In order to clear them out you'll have to use Redis you'll have to remove the key from the server.

1.  Install redis server which comes with the cli tool.  
```apt-get install redis-tools```
2.  Find the host of the Armory Spinnaker Redis server.  This is typically kept in ```/opt/spinnaker/env/resolved.env``` under the key ```REDIS_HOST```.
3.  Find the key of the task you want to delete.
![alt text](http://f.cl.ly/items/043D1P1s1T353Y3E352D/%5B8c4dbdb8b3942adf28094343663d5588%5D_Image+2017-08-01+at+11.37.03+AM.png?X-CloudApp-Visitor-Id=2686178&v=7e43486e)
You can then grab the ID from the url:
`https://${YOURSPINNAKER_INSTANCE}:8084/applications/armoryspinnaker/tasks/bf06a51c-083f-40f0-964a-71314c97ae17`

4.  Delete the orchestration keys from redis:<br/>
`redis-cli -h ${HOST_FROM_STEP_2} DEL orchestration:${TASK_KEY}`<br/> <br/>
`redis-cli -h ${HOST_FROM_STEP_2} DEL  orchestration:bf06a51c-083f-40f0-964a-71314c97ae17:stageIndex`
