---
layout: post
title: Authentication and Authorization
order: 100
---
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Overview

Armory Spinnaker provides the same functionality for authentication ("authn")
and authorization ("authz").  A full reference of how to set up both can be
found in the [OSS Spinnaker documentation](https://www.spinnaker.io/setup/security/#security).

## Authorization &amp; Manual Judgments

The [OSS docs](https://www.spinnaker.io/setup/security/authorization/#restrictable-resources)
do a pretty good job of explaining that you can limit users' access to both
"accounts" and "applications", but doesn't talk much about the interaction of
the two.

In short, if you have access to an application, you can view the pipelines,
and kick off a manual execution (even if you have "read only" access).
However, if those pipelines need to do something in your cloud environments,
you will still need to have read/write access to those environments.  Since
the pipeline will run its stages "as the user" that initiated the pipeline,
the stages that attempt to write changes to the environment will fail if that
user doesn't have access to those environments.

There is one exception to this rule, and that is for Manual Judgment stages.
You can configure a Manual Judgment stage to "Propagate Authentication":

![Propagate Authentication](/images/Image 2018-10-16 at 10.05.04 AM.png)

Checking this box will cause the pipeline to use the identity (and thus
authorizations) of the user who approved the stage to be used for all
subsequent stages.  By inserting a Manual Judgment stage with this option
enabled into your pipeline before the actual deploy, you can allow users
with limited access to kick off pipelines safely; a user _with_ full access
to the environment can then continue the pipeline successfully after approval.

## See Also

Here are some other resources that may help you properly configure security in
Spinnaker:

* [Armory Webinar on Authorization](https://blog.armory.io/webinar-configuring-auth-n-z-in-spinnaker-with-isaac-mosquera/)




