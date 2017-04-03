# Writing Scripts


This guide should include:

- how to use Spinnaker programatically


People often ask how they can write scripts and use Spinnaker programatically. You most certainly can. Spinnaker is a collection of subservices that all expose a RESTful API. You can see a list (with descriptions) of all of the endpoints by navigating to:

```
http(s)://<your-spinnaker-dns-name>:8084/swagger-ui.html
```

Notice that this uses port `8084`.

You should see a screen that looks like:

https://cl.ly/3J2P0W2v1440

You can click on the controller you are interested in to see endpoints related to it. You can even test out hitting these different endpoints right in the UI.

## Auth

Being able to access the API when auth is enabled requires a certain configuration by your Armory Spinnaker Administrator. They will need to enable programatic access via mutual tls (x509 certs). Then you will need to use a cert when communicating with the API.
