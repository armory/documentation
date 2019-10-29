---
layout: post
title: Static Judge Canary Analysis (Kayenta)
order: 77
published: True

---

Most metric stores (DataDog, NewRelic, AppDynamics, etc.) have a way for users to set thresholds. When a threshold is exceeded, an alarm or event gets triggered. This alarm or event API can usually be queried. However, Graphite doesn’t natively support setting thresholds (although it supports it with third party plugins). Therefore, you need to set these thresholds in Spinnaker.

We created a Judge (StaticBaselineJudge-v1.0) that allows you to set a static baseline parameter. When running a Canary Analysis, Spinnaker takes the value of this parameter and uses it to compare against the canary data.

## Configuring The Static Baseline Judge

On the Canary Configuration page when creating a new Config, you can select the *StaticBaselineJudge-v1.0* or regular *NetflixACAJudge-v1.0*.

![image](/images/static_baseline_dropdown_judges_options.png)

Select the Static Judge

To input the metric value needed, edit the config as JSON.

![image](/images/static_baseline_metric_json_edit_button.png)

Set the following property: 

```

"extendedProperties": {
   "staticBaseline": 300
}

```

![image](/images/static_baseline_metric_json_edit.png)

You need to do this for each metric you want to compare against a Static Baseline.
By default, if this property is not set, then the judge performs the same analysis that NetflixACAJudge-v1.0 does.

That means you can have multiple metrics in your Canary Config: ones that make use of the Static Baseline and others that use the regular Judge.

As an example of this, the following Canary Config has two metrics defined, one is setting the staticBaseline parameter and the other is not:

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

When running the above Canary Config on a Canary Stage, the value "300" gets used as the Baseline parameter for the analysis.

![image](/images/static_baseline_canary_result.png)
