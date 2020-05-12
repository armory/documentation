---
layout: post
title: Configure Travis
order: 51
---

Before you can make use of Jenkins in Spinnaker, you'll need to
configure access to your Jenkins masters.

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

Configuring Travis in your Spinnaker instance with Halyard is pretty easy, but
there are a few "gotchas" to watch out for.


## Configure Travis

First, configure your Travis master:

```
hal config ci travis master add Travis --address https://api.travis-ci.org --base-url https://travis-ci.org --github-token
```

(If you're using a private Travis account, change the addresses appropriately)

For reference, you can look at the [Spinnaker docs](https://www.spinnaker.io/reference/halyard/commands/#hal-config-ci-travis-master-add)


## Enable Travis

Next, enable Travis with Halyard:

```
hal config ci travis enable
```


## Update `igor-local.yml` (Temporary Fix)

This is currently a bug with OSS halyard; doing the above will cause Igor to
go into a CrashLoopBackoff state.  The fix for this is to go into your
`<profile>/profiles/` directory and add (or update, if you already have one)
`igor-local.yml`.  Add this section:

```
artifact:
  decorator:
    enabled: true
```


### Enable Travis Stages

If you want to be able to run Travis jobs as a stage in your pipeline, you'll
need to enable the stage as well:

```
hal config features edit --travis true
```


### Finally...

Now you should be able to `hal deploy apply` and when your services have
restarted, you should be able to trigger pipelines off Travis builds, and
see a Travis stage option in your pipelines.



