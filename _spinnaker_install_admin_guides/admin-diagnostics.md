---
layout: post
title: Armory Diagnostics
order: 999
published: true
redirect_from:
---

## Turning on Armory Diagnostics

When working with our support teams, you might be asked about enabling
Armory Diagnostics.  This sends the log and event data from your system to
Armory so that we can remotely investigate what might be going on with
your system, resulting in a faster turnaround on solutions.

Here's the Halyard command to enable this feature:

```
hal armory diagnostics enable
hal armory diagnostics edit --logging-enabled=true
```

And similarly, to disable it:

```
hal armory diagnostics disable
hal armory diagnostics edit --logging-enabled=false
```

You need to  to run `hal deploy apply` after enabling or disabling the diagnostics.


## What Gets Sent

You're probably wondering exactly what gets sent to Armory when you're sharing
your log output with us.

There are actually two streams of output that we will receive from an enabled
system.  The first is the easiest, it's a copy of what gets logged in the
pod (the same output you get from running `kubectl logs -f <pod_id>`).  This
tends to be status messages, but we will also capture any software failures
that might have gotten caught.  This often gives us the best insight into
why something is going wrong.

The second stream is actually the set of events being passed internally from
Spinnaker microservice to microservice.  These are JSON payloads that are
then tagged on our side with your unique customer ID (so we can isolate your
instances), a timestamp, and then two primary keys, "details" and "content".

The Details key maps some very common elements for the event:

* application -- The name of the Spinnaker application
* created -- Timestamp of when the event was created
* requestHeaders -- HTTP request headers for the internal request
* source -- The microservice that generated the event (ex. 'clouddriver')
* type -- An identifier as to what kind of event this was (ex. `orca:pipeline:starting')

The Content section is variable, and depends on what kind of event is being
tracked.  Here are some of the more common events:

* Web access events contain your basic web event data, the request
headers, URL, User Agent, encoding directives, etc.

* Build events pass along the name of the build job (from Jenkins, Travis, etc),
the success/failure, duration of the job.

* Webhook events (like commits from Github) will contain whatever the webhook has sent along in its payload.  For most SCMs, this is just the name of the organization, the repo name, a hash representing the commit, and a timestamp.  If you've set up any other webhook events that you using to trigger Spinnaker, take care with what data is being sent.

* Pipeline events will contain all the same data you would see in Spinnaker if
you click on "Source" under a pipeline's stage.  This includes the name of
the application, pipeline, the build information, the trigger information,
and the status and results of all the stages included in that pipeline
(including stages that have not been executed yet).

Other events may be the result of performing operations within Spinnaker,
such as creating a new load balancer, or resizing a server group.

## A Note on Private Data Exposure Risks

The data passed out of Spinnaker is based on payloads controlled by the
open source Spinnaker community (except for those proprietary microservices
provided by Armory specifically).  Armory is not aware of any cases where
private data (passwords, source code, etc.) would be passed out of Spinnaker
as part of an event payload during normal operation.  Armory is not responsible
for secrets a customer has entered into an otherwise unprotected field being
transmitted (for example, entering a password into a "Notes" field of a
pipeline stage).

