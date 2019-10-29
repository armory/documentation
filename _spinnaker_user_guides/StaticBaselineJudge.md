---
layout: post
title: Static Judge Canary Analysis (Kayenta)
order: 77
published: True

---

Most metric stores (DataDog, NewRelic, AppD, etc.) already have a way for users to set thresholds. When a threshold is exceeded, an alarm or event is triggered. The alarm or event API can usually be queried. However Graphite doesn’t natively support setting thresholds (it supports it with 3rd party plugins). Therefore the need for setting these thresholds in Spinnaker.

We created a Judge (StaticBaselineJudge-v1.0) that allows us to set a static baseline parameter that, when running a Canary Analysis will take the value of this parameter and use it to compare against the canary data.

## Configuring The Static Baseline Judge

On the Canary Configuration page when creating a new Config, you will have the option for selectin the StaticBaselineJudge-v1.0 or regular NetflixACAJudge-v1.0.

![image](/images/Image 2019-10-29 at 11.35.11 AM.png)

Select the Static Judge

To input the metric value we need to edit the config as Json

![image](/images/Image 2019-10-29 at 11.39.07 AM.png)

And in there, set the property 

```

"extendedProperties": {
   "staticBaseline": 300
}

```

![image](/images/Image 2019-10-29 at 11.40.08 AM.png)

You need to do this for each metric you want to compare against a Static Baseline.
By default, if this property is not set then the judge is going to perfom the same analysis that the NetflixACAJudge-v1.0 does.

That means you can have multiple metrics in your canary config. Ones that make use of the Static Baseline and others that use the regular Judge.

As an example of this, this Canary Config has two metrics defined, one is setting the staticBaseline parameter and the other is not.

```
{
  "applications": [
    "training"
  ],
  "classifier": {
    "groupWeights": {
      "Group 1": 100
    }
  },
  "configVersion": "1",
  "createdTimestamp": 1569534009252,
  "createdTimestampIso": "2019-09-26T21:40:09.252Z",
  "description": "",
  "judge": {
    "judgeConfigurations": {},
    "name": "StaticBaselineJudge-v1.0"
  },
  "metrics": [
    {
      "analysisConfigurations": {
        "canary": {},
        "extendedProperties": {
          "staticBaseline": 300
        }
      },
      "groups": [
        "Group 1"
      ],
      "name": "canary",
      "query": {
        "customInlineTemplate": "PromQL:avg(container_spec_cpu_period{namespace=\"${location}\"})",
        "labelBindings": [],
        "metricName": "container_network_receive_bytes_total",
        "resourceType": "aws_ec2_instance",
        "serviceType": "prometheus",
        "type": "prometheus"
      },
      "scopeName": "default"
    },
    {
      "analysisConfigurations": {},
      "groups": [
        "Group 1"
      ],
      "name": "Regular Canary",
      "query": {
        "customInlineTemplate": "PromQL:avg(container_spec_cpu_period{namespace=\"${location}\"})",
        "serviceType": "prometheus",
        "type": "prometheus"
      },
      "scopeName": "default"
    }
  ],
  "name": "karlo-canario",
  "templates": {},
  "updatedTimestamp": 1572365396680,
  "updatedTimestampIso": "2019-10-29T16:09:56.680Z"
}
```

When running the above Canary Config on a Canary Stage we can see that the value "300" gets used as the Baseline parameter on our Analysis

![image](/images/Image 2019-10-29 at 11.45.56 AM.png)