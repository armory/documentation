---
layout: post
title: Automated Canary Deployments
order: 50
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Configure Kayenta

The open source Spinnaker documentation has a good overview of how to 
configure Kayenta via Halyard at
[https://www.spinnaker.io/setup/canary/](https://www.spinnaker.io/setup/canary/)

### Configuring New Relic

If you are configuring New Relic for your metrics store, you won't be able to
use Halyard directly to enable it (yet).  Instead, add the following (fill in
your own `apiKey` and `accountId` data from your New Relic Insights API data;
you can also change the `name` field to your preference)) as
`kayenta-local.yml` in your `profiles` directory (in `.hal/default/profiles`):

```
kayenta:
  newrelic:
    enabled: true
    accounts:
      - name: NewRelic
        apiKey: "AbCdEf12345689...""
        accountId: "1234567"
        supportedTypes:
          - METRICS_STORE
        endpoint.baseUrl:  https://insights-api.newrelic.com
```

## Enable Canarying in Application

Before you can use Canary stages in your application's pipelines, you'll need
to enable the Canary feature in the application's config:

![image](https://cl.ly/70fe5e294ead/Image%202018-10-23%20at%203.25.33%20PM.png)

Make sure you remember to save the change.  We recommend you refresh the page
in your browser after enabling the feature before continuing.

Your `Pipelines` menu item should now be `Delivery`; if you click on it,
you'll see `Pipelines` is a submenu item along with `Canary Configs` and
`Canary Reports`.

## Define a Canary Config

Navigate to `Canary Configs` (under `Delivery`) to configure the metrics that
will be used to compare your canary deploy to your baseline.  If you've
configured configs in other application, you may see them here already; you
can share configs across applications (unless you've disabled this option
with `--show-all-configs-enabled false` when configuring with halyard).

Click `Add configuration` and you should see a mostly-blank form:

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
of Type `Canary Analysis`.  The stage form should look like this:

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

## Automated Canary Deployment

Here's a simple example of using Kayenta to automate canary analysis before
promoting a build to full production status.

![Pipeline Overview](https://cl.ly/1c5cbcf18875/Image%202018-09-24%20at%208.51.45%20AM.png)

### Find the Baseline Version

In this example, we are triggering off a Jenkins job that produces a Docker
image and provides the image hash in a properties file that Spinnaker can
pick up.  Our first real stage is to figure out what's currently running
in our production Deployment (`Get Baseline`).  For this, we use a
`Find Artifacts From Resource (Manifest)` stage:

![Get Baseline](https://cl.ly/983f8713210c/Image%202018-09-24%20at%208.58.19%20AM.png)

### Deploy Baseline Manifest

The next two stages (`Deploy Baseline` and `Deploy Canary`) are both `Deploy
(Manifest)` stages; in this example we're using text manifests for clarity.

Our baseline manifest is named with a `-baseline` suffix to help identify its
metrics from regular production metrics.  We use a Spinnaker expression to 
substitute in the current production image hash we found in the previous
stage, and set an environment variable on these pods to help them differentiate
their data from other production pods:

```
- apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: kayentademo-baseline
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: kayentademo
    template:
      metadata:
        labels:
          app: kayentademo
      spec:
        containers:
          - image: '${#stage(''Get Baseline'').context["artifacts"][0]["reference"]}'
            name: kayentademo
            env:
            - name: version
              value: baseline
```

### Deploy Baseline Manifest

Our canary manifest is very much the same, except we've swapped out the
references to `baseline` (in the deployment name and environment variable)
and we're using the trigger's build properties to identify the Docker image
hash:

```
- apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: kayentademo-canary
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: kayentademo
    template:
      metadata:
        labels:
          app: kayentademo
      spec:
        containers:
          - image: 'docker.io/armory/kayentademo-testapp:${trigger.properties["TESTAPP_VERSION"]}'
            name: kayentademo
            env:
            - name: version
              value: canary
```

### Run Canary Analysis

The Canary Analysis stage is dependent on both of those stages being complete;
we don't want to begin our analysis until we're sure both the baseline and
canary deployments are up and running.

We've selected the `DataDog-K8s` Canary Config, a 1-minute delay before
starting analysis (to give the pods a little more time to settle), and we're
looking for 5-minute intervals, growing (so the reports look back from the
start of the run, growing in length over time), and running for a Lifetime
of 1 hour.

For the Metric Scope, we can simply hardcode the deployment names --
`kube_deployment:kayentademo-baseline` and `kube_deployment:kayentademo-canary`
-- since we set them specifically in the previous manifests.  For DataDog,
the Location fields aren't used, so we've left them blank.

We select our metrics account (Datadog) and our Storage account, and set the
Scope Name to `default`.

![Canary Analysis](https://cl.ly/7d167a06658f/Image%202018-09-24%20at%209.08.25%20AM.png)

One more important thing to set on this stage is the `Execution Option`;
we don't want to stop the pipeline if the canary fails, or we won't have a
chance to clean up the baseline and canary deployments.  So we choose to
`ignore the failure`:

![ignore the failure](https://cl.ly/904579f9e586/Image%202018-09-24%20at%209.14.09%20AM.png)

When the analysis stage ends, we want to do few things, all at the same time.
We want to clean up the baseline and canary stages, regardless of the outcome,
so we don't have a bad canary or and old baseline serving requests.  We also
want to deploy the new code (if it passed the canary analysis) to our 
production deployment.

### Clean Up

Destroying our deployments is easy with the `Delete (Manifest)` stage, we
just identify the deployment name we used earlier.  We run one stage for
Baseline and one for Canary, in parallel (just showing the stage for the
baseline -- for the canary, we just change the name):

![Delete Deployments](https://cl.ly/4ab62d2fd48d/Image%202018-09-24%20at%209.20.55%20AM.png)

### Deploy to Production

Confident our new code performs at least as well under load as our old code,
we can now deploy the new Docker image to our production deployment name,
`kayentademo-prod`:

```
- apiVersion: apps/v1
  kind: Deployment
  metadata:
    name: kayentademo-prod
  spec:
    replicas: 1
    selector:
      matchLabels:
        app: kayentademo
    template:
      metadata:
        labels:
          app: kayentademo
      spec:
        containers:
          - image: 'docker.io/armory/kayentademo-testapp:${trigger.properties["TESTAPP_VERSION"]}'
            name: kayentademo
            env:
            - name: version
              value: canary
```

Of course, we don't want to do this at all if the canary failed to live up
to expectations, so we only do this stage conditionally.  Under `Execution
Options` we want to make this `Conditional on Expression` and then we check
the status of our Canary Analysis stage:

![Conditional on Expression](https://cl.ly/ff8cb8afbbfa/Image%202018-09-24%20at%209.26.17%20AM.png)

### Final Grade

Finally, when all of that cleanup and promotion is done, we want to end on 
either a total success or a failure.  For this, we'll use a `Check
Preconditions` to also look back and check to see if the canary was successful
or not.  We add a precondition and select `Expression` and enter in the same
condition as for our production deploy stage:

![Add Precondition](https://cl.ly/e5306d0faed9/Image%202018-09-24%20at%209.28.02%20AM.png)

This stage will fail if the condition isn't satisfied, and pass if it has.

Now our pipeline has completed.  If the canary succeeded, our new code has
been promoted to production and the next change can be picked up.  If the
canary failed, the pipeline will have cleaned up its canary, production will
have remained untouched, and the pipeline can be set up to alert someone to
the failure.  Maybe the next Jenkins job will have the fix...

## See Also

This is just a very lightweight example of how you can use Kayenta to automate
canary analysis before rolling code out to production.  For different takes
on the subject, the following resources might be helpful:

* [Automating Canary Analysis on Google Kubernetes Engine with Spinnaker](https://cloud.google.com/solutions/automated-canary-analysis-kubernetes-engine-spinnaker)
* [Automated Canary Analysis Using Spinnaker](https://ordina-jworks.github.io/cloud/2018/06/01/Automated-Canary-Analysis-using-Spinnaker.html)



