---
layout: post
title: Storing Configurations
order: 25
---
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Storing configurations using Open Source Halyard
OSS Spinnaker and Halyard stores secrets prompted by **hal commands** into your halyard configuration directory, typically `~/.hal/config.yml` and other `~/.hal/` folders/files.

**Our recommendation** is that you take the halyard configuration directory and treat this like a secret, stored in your secret store of choice. The quickest place to store them is in AWS S3 in a private, encrypted bucket. 

While it's possible to store the halyard configurations files in source control, _it is not recommended_, as this is considered bad practice. If you need revision history, most blob stores (S3, GCS) will keep history for you.

Another method is to turn `config.yml` and other files in your Halyard configuration directory into a template and to build a process around hydrating/baking it, then doing a `hal deploy apply`.
> Warning: you may lose the ability to run `hal` commands, because halyard may not understand your templates.
