---
layout: post
order: 60
# migrated to spinnaker-user-guides/find-images
published: false
---

{% include components/legacy_documentation.html %}

This guide should include:
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Prerequisites and Assumptions:

- You have experience [baking]({% link _spinnaker_user_guides/baking-images.md %}) and [deploying images]({% link _spinnaker_user_guides/deploying.md %}) with Spinnaker



Spinnaker provides a lot of auto-magic for determining which AMI should be deployed to which server group. However, sometimes it is necessary to override Spinnaker's selection.

## Dynamic Base AMI

Sometimes you may want to build your AMI in several different pipelines before deploying it. This is a popular method when you need to add a layer of standard tools and daemons to all of your instances (ex: Splunk or DataDog agents). Also, you may want to do regular security updates and have it roll out to all instances in your organization.

Let's go through an example.


I have created a multi-region bake pipeline that creates AMIs from a package built on Jenkins. For directions on how to create a pipeline like this, check out the [baking guide]({% link _spinnaker_user_guides/baking-images.md %}). You can see it running here:

![](https://d2ddoduugvun08.cloudfront.net/items/211e0R3W2O301C0T1c30/Image%202017-04-04%20at%2011.01.25%20AM.png)


Next I want to create a pipeline that is triggered by a Jenkins job and installs the package that Jenkins created. However, I want that package to be installed on top of one of the AMIs from the multi-region bake above.


I start by creating a new pipeline.


I add an automated trigger to build from a Jenkins' job. For a more detailed example of this, check out the [baking guide]({% link _spinnaker_user_guides/baking-images.md %}).

![](https://d2ddoduugvun08.cloudfront.net/items/1g1Y3H3A3c2D1q3h0O2d/Image%202017-04-04%20at%202.47.40%20PM.png)


Now I add a 'Find Images From Tags' stage and input 'armoryami' in the 'Package' field. The 'package' you input needs to match the package installed by the baked AMI in the prior bake pipeline.

![](https://d2ddoduugvun08.cloudfront.net/items/230X2J3e303n2K3L1E01/Image%202017-04-04%20at%202.40.14%20PM.png)

By checking the 'us-west-2' checkbox, I am telling Spinnaker to find images in only that regions and make it available to the rest of the pipeline.


Next I want to add my own package to this AMI. First, I add a bake stage. Since my Jenkins' job created an artifact named 'armory-hello-deploy', I input that into the 'Package' field. The next part is a little tricky. I need to specify the correct base AMI by checking the 'Show Advanced Options' and using the [expression language]({% link _spinnaker_user_guides/expression-language.md %}) in the 'Base AMI' field. 


![](https://d2ddoduugvun08.cloudfront.net/items/1K1R053I1U231a472j3N/Image%202017-04-04%20at%203.03.22%20PM.png)

As you can see, the expression I use is:

{% highlight shell %}
${ #stage('Find Image from Tags')['context']['amiDetails'][0]['imageId'] }
{% endhighlight %}

### What is happening here? 

- The `#stage('Find Image from Tags')` function references the previous pipeline stage named 'Find Image from Tags'. This function returns a map of data. 
- The 'context' field of the map is populated after the 'Find Image from Tags' stage runs and contains the resulting data. 
- The 'amiDetails' field is an array of all images found. This is especially relevant if you are looking for images in multiple regions. Although in our case, we are just working in 'us-west-2', so there is only one element in the array, '[0]'. 
- Lastly, the 'Base AMI' field in the 'Bake Configuration' is expecting an AMI id as input so after we specify element '[0]', we further specify '[imageId]' to get the AMI id of the image.


We can now execute the pipeline with the above inputs. 

![](https://d2ddoduugvun08.cloudfront.net/items/211N2V3p2y2C1e2j410z/Image%202017-04-04%20at%203.22.17%20PM.png)

Notice the 'Results' box in the lower right hand corner. After inspecting it and comparing it to the bake pipeline in the very beginning of the example, I can see that Spinnaker did indeed choose the correct AMI.

If you wanted to deploy this image, you can just add a deploy step and Spinnaker will deploy the correct AMI. For more instructions on deploying, check out the [deployment guide]({% link _spinnaker_user_guides/deploying.md %}).
