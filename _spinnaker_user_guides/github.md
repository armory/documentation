---
layout: post
published : true
order: 20
title: Working with Github
redirect_from:
  - /spinnaker_user_guides/github/
---

This guide includes:
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Trigger a Pipeline with a Github Commit

> Before you start, you'll need to [configure your Github repositories](/spinnaker-install-admin-guides/github/#configuring-a-github-trigger)
> You'll be able to configure a pipeline trigger without having configured
> your Github webhook, but the trigger won't fire until Spinnaker can receive
> those calls from Github.

To add a Github trigger to your pipeline, go to your configurations stage
and select "Add Trigger", then select "Git" from the Type dropdown menu.
Then select "github".  You can then enter your organization (ex. "armory")
and the repository name to monitor (ex. "demoapp").  Branch and Secret
are optional, although it's recommended you set Branch to whatever the name
of your production branch is (usually `master`) so you only trigger pipelines
when code is committed to the production branch.  The Branch field also
supports regular expressions, so you can limit the trigger to several branches
with common patterns or partial matches.

{% include components/regex_vs_wildcard.md %}

![Configure Github Trigger](/images/github-user-guide-1.gif)

## Using Artifacts from Github

> Before you start, you'll need to [configure Github as an artifact source](/spinnaker-install-admin-guides/github/#configuring-github-as-an-artifact-source)
> You won't see the Github artifact type until this is configured.


