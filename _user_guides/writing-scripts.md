---
layout: post
---

This guide should include:

- how to use Spinnaker programatically


People often ask how they can write scripts and use Spinnaker programatically. You most certainly can. Spinnaker is a collection of subservices that all expose a RESTful API. You can see a list (with descriptions) of all of the endpoints by navigating to:

```
http(s)://<your-spinnaker-dns-name>:8084/swagger-ui.html
```

Notice that this uses port `8084`.

You should see a screen that looks like:

![](https://d1ax1i5f2y3x71.cloudfront.net/items/1D1R2G270O070o0g0T00/Image%202017-04-03%20at%204.06.51%20PM.png)

You can click on the controller you are interested in to see endpoints related to it. You can even test out hitting these different endpoints right in the UI.

## Auth

Being able to access the API when auth is enabled requires a certain configuration by your Armory Spinnaker Administrator. They will need to enable programatic access via mutual tls (x509 certs). Then you will need to use a cert when communicating with the API.
