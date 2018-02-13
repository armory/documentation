---
layout: post
title: SLA
order: 76
published: True
---

# What is the SLA?

The Armory Platform exposes an SLA (Service Level Agreement) for the team
to use to monitor their application's performance over time.  Each application
can be configured to monitor different metrics, and flag when an application
is not within the bounds of those metrics.

## How it works:

The Armory Platform will query your configured metrics datasource every 15
minutes, and compare the performance of your application against the SLA.
This generates a pass/fail evaluation of the application for that period 
of time.  The SLA is then computed as the percent of time over the past two
weeks your application has "passed" the SLA metrics.

As soon as the system has exceeded your SLA definition, you will receive
a notification in Slack, even if your SLA percentage is fairly healthy.

## Default Behavior:

When you create a new application (or existing applications, if you're
upgrading) the SLA definition will be defaulted depending on the cloud
provider.  Note that once you create your own metric to measure against,
the default behavior will be disabled, in favor of your configured values.

### AWS Defaults:

If you haven't configured any metrics, by default an AWS-enabled application
will check all loadbalancers configured to see if they are responding in less
then 250ms, have at least 1 healthy host, and are not generating any 5XX
errors at either the app or ELB level.  Once you configure a specific metric,
these defaults will no longer be checked, instead only your configured metric
will be used.  If you want to keep these metrics, see below for how they would
be defined in the UI).

### Other Providers:

If your app is not hosted on AWS, the SLA will always read "77.7%" until
something is configured.

## Configuring SLA

The SLA is configured from the Application Config screen, which you can
get to by clicking on "CONFIG" in the upper-right corner of your screen,
or by click on the SLA menu item.

![Application Config](https://cl.ly/0r2L0r0b2l1X/[87aa1b00f4a1191efe3e2035d10daa4b]_Image%202018-02-13%20at%2011.34.05%20AM.png)

Then click "Edit Application Attributes":

![Edit Application Attributes](https://cl.ly/0q0v0Q17351l/[88d39b8093055dbbcfbdae6b42669873]_Image%202018-02-13%20at%2011.36.29%20AM.png)

From here, you can choose to add CloudWatch (AWS) or DataDog metrics (or both!)

![Add SLA Metric](https://cl.ly/180O2t3K0s0F/[a6a463f037bb70b519ffbd0042846866]_Image%202018-02-13%20at%2011.47.50%20AM.png)

### Cloudwatch Metrics

When configuring a Cloudwatch Metric, all fields are required.  The Metric
Name correlates to the AWS/ELB metric name, such as "Latency",
"HTTPCode_ELB_5XX_Count".  For a complete reference, refer to the
[AWS documentation](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/elb-metricscollected.html)

![Example Cloudwatch Metric](https://cl.ly/0A2r363o2f1B/Image%202018-02-13%20at%2012.45.18%20PM.png)

#### A Note About Units

In most cases, the units the Cloudwatch API returns isn't important because
the numeric value is just compared against the Limit you've configured.  One
special case is with Latency -- it's important to know that the Armory Platform
expects to have milliseconds (ms) configured as the Limit, rather than
fractional seconds.

#### Default AWS Metrics Definitions

As noted earlier, until you've defined a specific metric, AWS applications
will default to a set of four metrics.  These metrics are actually repeated
for each LB/region combination.  The other fields are defined as:

| Metric Name          | Comparator | Limit |
| -------------------- |:----------:|:-----:|
| Latency              | <=         | 250   |
| HealthyHostCount     | >=         | 1     |
| HTTPCode_Backend_5XX | <=         | 0     |
| HTTPCode_ELB_5XX     | <=         | 0     |

### DataDog Metrics

When configuring a Datadog Metric, the Tags field is optional, though
recommended to help distinguish your data from other applications that you
may have sending data into DataDog.  The fields correlate directly with
what would go into a DataDog query; the example below is turned into the
metrics query `avg:system.cpu.user{host:foo}`

![Example DataDog Metric](https://cl.ly/3D0U1r043H45/Image%202018-02-13%20at%2012.44.27%20PM.png)


