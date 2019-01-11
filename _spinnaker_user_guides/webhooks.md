---
layout: post
order: 105
redirect_from:
  - /user-guides/webhooks/
  - /user_guides/webhooks/
  - /spinnaker_user_guides/webhooks/
---

> Spinnaker uses "webhooks" in two ways -- as a trigger for pipeline execution,
> and as a stage that can make arbitrary calls to another service.  If you're
> looking for information on configuring a webhook trigger that you can use
> to run a pipeline, the open source community [has a very good guide for that](https://www.spinnaker.io/guides/user/pipeline/triggers/webhooks/).  Below we
> discuss the use of the Webhook stage used in pipelines.

This guide includes:
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## How does Spinnaker use webhooks?
{:.no_toc}
Spinnaker has a stage type called "Webhook" which allows it to call out to APIs as part of running a pipeline:

![Webhook Type Selection](/assets/images/webhook-type-selection.png)


## Setting up the a webhook stage
The basic configuration is what you might expect. Fill in the URL to make the request against, the HTTP method to use, and depending on the request type the payload and/or additional headers:

![Webhook Basic Config](/assets/images/webhook-basic.png)

Of particular note is that you can use [the Spinnaker pipeline expression language](/spinnaker-user-guides/expression-language/) both as part of the URL field and within the payload, making it easy to pass anything that's available as part of the pipeline context.

In this simple configuration the stage will be marked as successful if it gets a 2XX status code back, and will fail on anything else. If the return value from the request itself isn't enough to determine the overall success you can check the "Wait for completion" checkbox and get a set of additional configuration:


## Wait for completion using status field
![Webhook Wait For Completion](/assets/images/webhook-completion.png)

There are three different techniques Spinnaker can use to lookup the overall status:

- "GET method against webhook URL" means that once a request is sent using the method specified in the stage, Spinnaker will swap to polling the same webhook URL but using the GET method instead
- "From the Location header" means that Spinnaker will look for the URL to poll in the headers of the original request, and use that URL to poll for the final status
- "From webhook's response" means Spinnaker will issue the original request, and will parse the response from that call to find a new URL it'll use to poll for the final status

Spinnaker will use one of those mechanisms to find the status URL, and then repeatedly issue requests against that URL until it finds values that tell it what the final stage status should be. The "Status JsonPath" and mapping fields tell Spinnaker how to interpret the payloads that come back from the status URL. The "Status JsonPath" field is a [JsonPath](https://github.com/json-path/JsonPath) expression that Spinnaker uses to pull a single value from the payload for the status response. It compares the value from the payload to the values given in the SUCCESS, CANCELLED, and TERMINAL status mapping fields. Once there's a match the overall state of the stage is set.


## Webhook execution
Spinnaker records the URL used as part of the webhook, the payload, and the status URL as part of the stage details. If the webhook transaction can run for a long time and there's information available from the API, you can set the "Progress location" expression to also extract info to give some feedback about status in the Spinnaker UI. The "Progress location" value shows up in the Info field of the stage details:

![Webhook Stage Details](/assets/images/webhook-stage-details.png)

Once the webhook stage is complete the payload is attached to the stage context as "buildInfo". So if you need you can pull info out of the webhook response to pass into future stages using a pipeline expression. For instance, if the response from our stage above contains the value "threshold" that we want to use in another stage we can reference it like this:

{% highlight shell %}
${ #stage('Webhook')['context']['buildInfo']['threshold'] }
{% endhighlight %}
