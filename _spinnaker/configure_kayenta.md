---
layout: post
title: Automated Canary Deployments
order: 50
---
# Automating Deployments with Kayenta
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Configure Kayenta

The open source Spinnaker documentation has a good overview of how to 
configure Kayenta via Halyard at
[https://www.spinnaker.io/setup/canary/](https://www.spinnaker.io/setup/canary/)

## Enable Canarying in Application

Before you can use Canary stages in your application's pipelines, you'll need
to enable the Canary feature in the application's config:

![image](https://dha4w82d62smt.cloudfront.net/items/110k1y0g0l2a2s2w452C/%5Be5cd4808aad349ab8c521f7e97100f50%5D_Image+2018-04-17+at+9.25.33+AM.png)

Make sure you remember to save the change.  We recommend you refresh the page
in your browser after enabling the feature before continuing.

Your "Pipelines" menu item should now be "Delivery"; if you click on it,
you'll see "Pipelines" is a submenu item along with "Canary Configs" and
"Canary Reports".

## Define a Canary Config

Navigate to "Canary Configs" (under "Delivery") to configure the metrics that
will be used to compare your canary deploy to your baseline.  If you've
configured configs in other application, you may see them here already; you
can share configs across applications (unless you've disabled this option
with `--show-all-configs-enabled false` when configuring with halyard).

Click "Add configuration" and you should see a mostly-blank form:

![Canary Config Form](https://cl.ly/0d3o1e3I3e3e/Image%202018-04-18%20at%2012.56.54%20PM.png)

*Configuration Name*:  Spaces are not allowed, only alphanumerics, hyphens and
underscores.  This name will be displayed as an option in the canary stage
configuration later, so we recommend you make it a meaningful name.

*Metric Store*:  If you only configured one metrics store, this will already
be set for you.  Otherwise, you can choose from the options, the default will
be the one you referenced in the environment file.

*Description*:  Free form text to help your coworkers know what this canary
is doing.

More information can be found in the [Spinnaker documentation](https://www.spinnaker.io/guides/user/canary/config/#create-a-canary-configuration).

### Groups

A Canary Config can contain multiple groups of metrics, and each group can
contain multiple metrics.  By default "Group 1" is set up for you to add to;
you can rename the group by clicking on the group and then clicking on the
pencil icon next to it.

A group that has no metrics in it will be removed when the configuration is
saved.  If you create an extra group or want to delete an existing one, just
be sure you've removed all the metrics from that group before saving.

Grouping is used to add different weights to the importance of different
metrics or groups of metrics (see "Scoring" below).

### Add Metrics

When you add a metric, the UI will be slightly different depending on what
Metric Store you selected earlier.  The DataDog dialog looks like:

![DataDog Metric Dialog](https://cl.ly/2p1s1A2k131c/Image%202018-04-18%20at%201.11.59%20PM.png)

The Stackdriver dialog looks like:

![Stackdriver Metric Dialog](https://cl.ly/0Q0t3Y1E021R/Image%202018-04-18%20at%201.12.46%20PM.png)

In all cases, the Name is free-form and used to label the results and graphs.

By default the "Fail on" selection of "either" means the comparison of canary
and baseline metrics will be marked as a failure if the canary's data is
either significantly greater or less than the baseline's data.  You can select
"increase" if you only want to fail when the canary's metrics are significantly
higher than the baseline (useful for things like error counts, memory and CPU
usage, etc, where a significant improvement is not a failure), or, conversely,
select "decrease" for the opposite (useful for metrics that measure things
where bigger numbers are always better).

#### DataDog Metrics

For DataDog, the metric is simply the aggregation function you wish to use
(avg, min, max, sum), a colon, and the name of the metric.  You can use the
[DataDog Metrics Explorer](https://app.datadoghq.com/metric/explorer) to find
these names:

![DataDog Metrics Explorer](https://cl.ly/1g360s0l1o3F/Image%202018-04-18%20at%201.20.25%20PM.png)

For example, if you wanted to measure the average amount of CPU used, you could
enter `avg:system.cpu.user`.

#### Stackdriver Metrics

Please refer to the [Spinnaker Kayenta documentation](https://www.spinnaker.io/guides/user/canary/config/#create-metric-groups-and-add-metrics) for information
on configuring Stackdriver metrics.

#### New Relic Metrics (Armory exclusive)

For New Relic, the [NRQL query language](https://docs.newrelic.com/docs/insights/nrql-new-relic-query-language/nrql-reference) is ultimately used to query the
data; we compose the query in pieces.  In the metric, you'll need to enter the
desired metric (and any aggregation, average, max, etc) plus the table to use.
For example, to retrieve the average duration of a web request, you'd enter
`average(duration) FROM Transaction`.  Only one metric can be retrieved in
each metric definition.

### Filter Templates

Please refer to the [Spinnaker Kayenta documentation](https://www.spinnaker.io/guides/user/canary/config/filter_templates/) for information on configuring
Filter Templates.  They are completely optional and may not be necessary for
your application.

### Scoring

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
you're using, and how you've set up your pipeline prior to this stage.

For more information on configuring these scopes, please refer to the
[Spinnaker Kayenta Documentation](https://www.spinnaker.io/guides/user/canary/config/).
(Note:  New Relic is an Armory exclusive feature, see below for details)

#### DataDog

DataDog only uses the Baseline and Canary fields; the Location fields are not
used and can be safely left blank.  The expected values here are the tag:value
pairs that you are using to identify your canary and baseline deployments.
You can use [pipeline expressions](https://www.spinnaker.io/guides/user/pipeline/expressions/) in these fields to reference the tags that may have been
generated in previous stages.

For example, if you were deploying to EC2 and you've cloned your current
server group to be your baseline in an earlier stage, you might set the
Baseline field to:

```
${ 'autoscaling_group:' + #stage('Clone Server Group')['context']['source']['serverGroupName'] }
```

You can further refine the results by appending further tag:value pairs
separated by commas, such as `autoscaling_group:myapp-v001,region:us-west-2`.

#### Stackdriver

The [Spinnaker documentation](https://www.spinnaker.io/guides/user/canary/config/#create-metric-groups-and-add-metrics) is the best source for configuring
Stackdriver metrics.

#### New Relic (Armory exclusive)

New Relic only uses the Baseline and Canary fields; the Location fields are not
used and can be safely left blank.  The expected values here are the "WHERE"
clause from the NRQL query you would use to find the metrics.  For example,
if you're supplying a 'version' field back to New Relic (filled in from an
environment variable in the manifest, for example), your field might look
something like `version='canary'`.  Note you can use [pipeline expressions](https://www.spinnaker.io/guides/user/pipeline/expressions/)
within the quotes, to change out the value being sought.



