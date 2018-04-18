---
layout: post
title: Kayenta
order: 74
published: True
---

# What is Kayenta

Kayenta is an automated canarying analysis (ACA) service that is provided through Armory Spinnaker. The goal of Kayenta is to provide the end user with confidence that a deployment is safe through automation and intelligence.

Kayenta uses real-time data sources to validate that a canary is good or bad. Today, Kayenta supports the following real-time data sources:

* DataDog
* Stackdriver (Google)

## Configuring Kayenta on an Application

If Kayenta is enabled for you instance, if you go to an application's config
you should see a checkbox to enable Canarying:

![image](https://dha4w82d62smt.cloudfront.net/items/110k1y0g0l2a2s2w452C/%5Be5cd4808aad349ab8c521f7e97100f50%5D_Image+2018-04-17+at+9.25.33+AM.png)

Make sure it's checked and saved.

If you don't see this option in your application config, make sure you've
[configured Kayenta](/admin-guides/kayenta).

## Additional Documentation

Kayenta is an open source feature of Spinnaker and has its own documentation at
[https://www.spinnaker.io/guides/user/canary/](https://www.spinnaker.io/guides/user/canary/)

In this document, we will quickly run through the process to simply get you
going.

## Canary Configs

(NOTE:  You may need to refresh your browser page to see these changes
after enabling the Canary above)

Your menubar should show "Delivery" and you should see the option for
"Canary Configs" as a hover, or as a submenu element:

![Canary Configs Menu Item](https://cl.ly/00181r2Q372S/[069c7e1865637f78eb92a091172c92da]_Image%202018-04-18%20at%2012.45.18%20PM.png)

Click on "Canary Configs" and "Add configuration".  You should see a
mostly-blank form:

![Canary Config Form](https://cl.ly/0d3o1e3I3e3e/Image%202018-04-18%20at%2012.56.54%20PM.png)

*Configuration Name*:  Spaces are not allowed, only alphanumerics, hyphens and
underscores.  This name will be displayed as an option in the canary stage
configuration later, so we recommend you make it a meaningful name.

*Metric Store*:  If you only configured one metrics store, this will already
be set for you.  Otherwise, you can choose from the options, the default will
be the one you referenced in the environment file.

*Description*:  Free form text to help your coworkers know what this canary
is doing.

## Groups

A Canary Config can contain multiple groups of metrics, and each group can
contain multiple metrics.  By default "Group 1" is set up for you to add to;
you can rename the group by clicking on the group and then clicking on the
pencil icon next to it.

A group that has no metrics in it will be removed when the configuration is
saved.  If you create an extra group or want to delete an existing one, just
be sure you've removed all the metrics from that group before saving.

Grouping is used to add different weights to the importance of different
metrics or groups of metrics (see "Scoring" below).

## Add Metric

When you add a metric, the UI will be slightly different depending on what
Metric Store you selected earlier.  The DataDog dialog looks like:

![DataDog Metric Dialog](https://cl.ly/2p1s1A2k131c/Image%202018-04-18%20at%201.11.59%20PM.png)

The Stackdriver dialog looks like:

![Stackdriver Metric Dialog](https://cl.ly/0Q0t3Y1E021R/Image%202018-04-18%20at%201.12.46%20PM.png)

In both cases, the Name is free-form and used to label the results and graphs.

By default the "Fail on" selection of "either" means the comparison of canary
and baseline metrics will be marked as a failure if the canary's data is
either significantly greater or less than the baseline's data.  You can select
"increase" if you only want to fail when the canary's metrics are significantly
higher than the baseline (useful for things like error counts, memory and CPU
usage, etc, where a significant improvement is not a failure), or, conversely,
select "decrease" for the opposite (useful for metrics that measure things
where bigger numbers are always better).

### DataDog Metrics

For DataDog, the metric is simply the aggregation function you wish to use
(avg, min, max, sum), a colon, and the name of the metric.  You can use the
[DataDog Metrics Explorer](https://app.datadoghq.com/metric/explorer) to find
these names:

![DataDog Metrics Explorer](https://cl.ly/1g360s0l1o3F/Image%202018-04-18%20at%201.20.25%20PM.png)

For example, if you wanted to measure the average amount of CPU used, you could
enter `avg:system.cpu.user`.

### Stackdriver Metrics

Please refer to the [Spinnaker Kayenta documentation](https://www.spinnaker.io/guides/user/canary/config/#create-metric-groups-and-add-metrics) for information
on configuring Stackdriver metrics.

## Filter Templates

Please refer to the [Spinnaker Kayenta documentation](https://www.spinnaker.io/guides/user/canary/config/filter_templates/) for information on configuring
Filter Templates.  They are completely optional and may not be necessary for
your application.

## Scoring

After adding some metrics to groups, you should see each non-empty groups in
this section, with scores defaulted to "0".  You'll need to edit these scores
to sum to 100 (if you've only created a single group, just set it to 100).

When the canary runs for a given interval, all the metrics are evaluated and
each metric is given a pass/fail based on the deviation from the baseline
metric.  Within a group, each metric is evenly balanced (so if a group has
two metrics, and one fails and one passes, the group is scored at 50%; if
it had only one metric, it would score either 100% for a pass or 0% for a
fail).

Each group is then scored their Metric Group Weight proportional to the
success of the metrics in the group.  A group with a weight of 40 and a
50% failure rate would score a total of 20 (50% of 40).  The score of each
group is added together for a final interval score.  It's this total score
that is compared to the Thresholds evaluation.  If the total is above the
"Marginal" level, the canary will continue to run; if it's less than the
Marginal level, the canary will stop and record a failed stage immediately.

If the canary runs to completion, and all the intervals scored above "Pass",
the stage will be considered a success.  If *any* interval fell into the
grey area between Marginal and Pass, the stage will end with a failure,
although it will not have been pre-emptively cancelled.  This is intented to
allow someone to look at the marginal responses and make their own evaluation
of whether or not the pipeline should continue.

## Configuring A Canary Analysis Stage

If everything is configured properly, you should be able to create a stage
of Type "Canary Analysis".  The stage form should look like this:

![Blank Canary Config](https://cl.ly/0Z001M3g2o0j/Image%202018-04-18%20at%201.48.11%20PM.png)

*Analysis Type*:  "Real Time" (default) or "Retrospective".  If you select
Retrospective, you'll see two additional fields appear, where you will set
the start and end time of the evaluation.  This is the time period that will
be examined on *every* execution of this stage, so it's most useful for
examining historical data, or just testing your configs before applying them
to live systems.

*Config Name*:  Here you select which Canary Config (which we created in the
previous section) to use.

*Delay*:  It may be useful to wait a few minutes after the previous deploy
stages have completed, to let the systems get into a stable running state,
before checking metrics.  This field disappears if you've chosen to do a
Retrospective analysis.

*Interval*:  This defines the time between metrics inspections.  If this is
set to 30, for example, the metrics will be compared only twice during a
1-hour canary; if set to 5, it would be inspected 12 times during a 1-hour
canary (see Lifetime, below).

*Lookback Type*:  "Growing" (default) or "Sliding".  If set to "Growing",
the metrics are queried from the start of the canary up to the time of the
interval.  If set to "Sliding" (and you set the look back duration), it will
only look at the metrics for that sliding window of time.

*Metric Scopes*:  See below for details on this section.

*Step*:  How many seconds between each metric datapoint to query.  NOTE: For
DataDog, this field is ignored (DataDog does not let you define the interval)

*Lifetime*:  How many hours to let this canary analysis run before making a
final determination.  Note that if any single interval falls below a
"Marginal" score, the analysis will stop immediately.

*Scoring Thresholds*:  These are defaulted to whatever is configured in
the Canary Config -- however, you can adjust these scores on a per-pipeline
basis if desired.

*Metrics Account*:  Select which account to use for metrics (if you've
configured multiple).  NOTE:  If you've configured multiple metrics
providers, like DataDog AND Stackdriver, be sure you've selected an account
that matches the Canary Config's Metric Store.  The UI currently does not
prevent you from selecting, for example, a Stackdriver account here, after
selecting a Canary Config based on Datadog.

*Storage Account*:  Select which account to use for storing the metrics data
and graphs.

*Scope Name*:  Select Default for now.

### Metric Scopes

This section gets filled in differently, depending on which metrics provider
you're using, and how you've set up your pipeline prior to this stage.  For
DataDog, as an example, the intention is to provide the tag:value pairs
you've set up on your instances, identifying the different clusters, hosts,
etc. that you're comparing.  For example, if you're using AWS Autoscaling
Groups to cluster your baseline and canary instances, you would enter
something like `autoscaling_group:myapp-v001` for the baseline and
`autoscaling_group:myapp-v002` for the canary.  You can further refine
the results by appending further tag:value pairs separated by commas,
such as `autoscaling_group:myapp-v001,region:us-west-2`.

For DataDog, the two Location fields are unused and can be safely left
blank.  For Stackdriver (and other metrics sources) they are required fields.

For more information on configuring these scopes, please refer to the
[Spinnaker Kayenta Documentation](https://www.spinnaker.io/guides/user/canary/stage/#define-the-canary-stage).




