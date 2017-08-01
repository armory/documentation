  ---
layout: post
title: Troubleshooting
order: 200
published: true
---

#### How do I remove hung operations in the tasks view?

From time-to-time you might have hung tasks.  In order to clear them out you'll have to use Redis you'll have to remove the key from the server.

1.  Install redis server which comes with the cli tool.  `apt-get install redis-server`
2.  Find the host of the Armory Spinnaker Redis server.  This is typically kept in `/opt/spinnaker/env/resolved.env` under the key `REDIS_HOST`.
3.  Find the key of the task you want to delete.
![alt text](https://s3.amazonaws.com/f.cl.ly/items/043D1P1s1T353Y3E352D/%5B8c4dbdb8b3942adf28094343663d5588%5D_Image%202017-08-01%20at%2011.37.03%20AM.png?AWSAccessKeyId=AKIAJEFUZRCWSLB2QA5Q&Expires=1501616352&Signature=emvxrm9E0G44rJhwpptgXJD0MLM%3D&X-CloudApp-Visitor-Id=2686178)
You can then grab the ID from the url:
`https://${YOURSPINNAKER_INSTANCE}:8084/applications/armoryspinnaker/tasks/bf06a51c-083f-40f0-964a-71314c97ae17`

4.  Delete the orchestration key from redis

`redis-cli -h ${HOST_FROM_STEP_2} DEL orchestration:${TASK_KEY}`

`redis-cli -h ${HOST_FROM_STEP_2} orchestration:bf06a51c-083f-40f0-964a-71314c97ae17:stageIndex`
