---
layout: post
title: Automating Spinnaker
order: 101
redirect_from:
  - /user-guides/writing-scripts/
  - /user-guides/writing_scripts/
  - /user_guides/writing-scripts/
  - /user_guides/writing_scripts/
  - /spinnaker_user_guides/writing_scripts/
  - /spinnaker_user_guides/writing-scripts/
  - /spinnaker-user-guides/writing_scripts/
---

This guide includes:
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}



## API docs
People often ask how they can write scripts and use Spinnaker programmatically. Spinnaker is a collection of subservices that all expose a RESTful API. You can see a list (with descriptions) of all of the endpoints by navigating to:

```
http(s)://<your-gate-url>/swagger-ui.html
```

Note: you may need to append your url with the gate port, `:8084`.

You should see a screen that looks like:

![](/images/Image 2017-04-03 at 4.06.51 PM.png)

You can click on the controller you are interested in to see endpoints related to it. You can even test out hitting these different endpoints right in the UI.


## Auth

Being able to access the API when auth is enabled requires a certain configuration by your Armory Spinnaker Administrator. They will need to enable programmatic access via mutual tls (x509 certs). Then you will need to use a cert when communicating with the API.
