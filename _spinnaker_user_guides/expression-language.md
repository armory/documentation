---
layout: post
order: 80
redirect_from:
  - /user-guides/expression-language/
  - /user-guides/expression_language/
  - /user_guides/expression-language/
  - /user_guides/expression_language/
  - /spinnaker_user_guides/expression_language/
  - /spinnaker_user_guides/expression-language/
  - /spinnaker-user-guides/expression_language/
---

This guide includes:
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


The expression language is a powerful tool that you can use to add logic and decision-making to your pipelines. While a lot of the time you will probably use it to evaluate variables, it can do a lot more. You can write straight Java/Groovy into it. This means you can do transformations, filters, maps, etc. You can use it to branch your pipeline into different directions.

Some of the most common uses include:
- Getting build information from Jenkins
- Passing image names from one stage to another
- Retrieving a user's manual judgement response


Before we go into examples and troubleshooting, check out the guide on spinnaker.io for an detailed overview: [https://www.spinnaker.io/docs/pipeline-expressions-guide](https://www.spinnaker.io/docs/pipeline-expressions-guide)

## Common techniques

### Dynamically defining User-Data

If you are creating a deployment configuration for AWS, Spinnaker gives you the option to provide [user-data](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html#instancedata-add-user-data). As you can see here:

![](/images/Image 2017-05-26 at 11.20.47 AM.png)

The user-data field needs to be base64 encoded. It is possible to create this dynamically with the built in expression language. To do this you can use the `${ #toBase64() }` command. For example, You can pass the build number to the user-data via:

![](/images/Image 2017-05-26 at 11.29.23 AM.png)


## Examples

You can find the expression language used in the examples within the [baking images]({% link _spinnaker_user_guides/baking-images.md %}), [deploying]({% link _spinnaker_user_guides/deploying.md %}), [working with Jenkins]({% link _spinnaker_user_guides/working-with-jenkins.md %}) and [finding images]({% link _spinnaker_user_guides/find-images.md %}) guides.

## Troubleshooting

Sometimes using the expression language doesn't go as anticipated. Here are some of the common issues:

### Autocomplete popup menu

Sometimes the UI doesn't display the autocomplete popup menu. This is because it doesn't have the context to do so. Try filling in as much of the details as you can for the stages in your pipeline, then run the pipeline. After it has ran (it's okay if it failed), go back to where you were trying to use the expression language and see if the autocomplete popup menu is displayed.

### Expression doesn't get evaluated

Sometimes your expression is just printed out plainly and not evaluated. Usually this happens when the expression is invalid and/or can not be resolved and does not mean that Spinnaker isn't trying to evaluate it. Try double checking that what you are referencing does exist. To check that it does exist, go to your pipeline's execution details and click the 'Source' link in the very bottom right hand corner. 

For example:
![](/images/Image 2017-04-03 at 3.37.57 PM.png)

You should see a page full of JSON. It doesn't print in a very readable format, so you may want to copy and paste it into a text editor or another tool that will help you read it (I usually just curl this URL and pipe it to `jq`). You can navigate to the JSON field 'stages' for a list of stages in your pipeline. These stages are not necessarily in order. In the stage you'll see another field called 'context'. This is the information avaliable to the expression language. Make sure what you are referencing is in the context of the appropriate stage.

### Testing your pipeline expressions

The best way to test a pipeline expression is to create a sample pipeline and see if your SPEL expression does what you expect it to do before you add it to your production pipeline. Another feature that is helpful for writing SPEL is if the pipeline has ran in the past, the UI will show you autocomplete options based on the previous execution.
