---
layout: post
title: "Restarting Spinnaker"
order: 150
---


## Restarting Armory Spinnaker
You can restart the Armory Spinnaker service on an instance by running:
```bash
sudo service armory-spinnaker stop
docker ps -a   # make sure all the docker instances are gone
sudo service armory-spinnaker start
```
