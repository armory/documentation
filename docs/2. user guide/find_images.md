# Finding Images

This guide should include:

- How to work with Base AMIs
- How to select which AMI to use in your pipeline
- How to use the expression language with the 'Find Image' pipeline stage


Prerequisites and Asumptions:

- You have experience baking and deploying images with Spinnaker



Spinnaker provides a lot of auto-magic for determining which AMI should be deployed to which server group. However, sometimes it is necessary to override Spinnaker's selection.

## Dynamic Base AMI

Sometimes the situation arrises where you want to build your AMI is several different pipelines before deploying it. This is a popular method when you need to add a layer of standard tools and daemons to all of your instances (ex: Splunk or Datadog agents). Also, you may want to do regular security updates and have it roll out to all instances in your organization.

Lets go through an example.


I have created a multi-region bake pipeline that creates AMIs from a package built on Jenkins. For directions on how to create a pipeline like this, check out the [baking guide](baking_images.md). You can see it running here:

https://cl.ly/2M3I37120t3h


Next I want to create a pipeline that is triggered by a Jenkins job and installs the package that Jenkins created. However, I want that package to be installed on top of one of the AMIs from the multi-region bake above.


I start by creating a new pipeline.


I add an automated trigger to build from a Jenkins' job. For a more detailed example of this, check out the [baking guide](baking_images.md).

https://cl.ly/2U0f1k3e2R2j


Now I add a 'Find Images From Tags' stage and input 'armoryami' in the 'Package' fieild. The 'package' you input needs to match the package installed by the baked AMI in the prior bake pipeline.

https://cl.ly/0G1g3G010G3m

By checking the 'us-west-2' checkbox, I am telling Spinnaker to find images in only that regions and make it avaliable to the rest of the pipeline.


Next I want to add a my own package to this AMI. I add a bake stage. Since my Jenkins' job created an artifact named 'armory-hello-deploy', I input that into the 'Package' field. The next part is a little tricky. I need to specify the correct base AMI so check the 'Show Advanced Options' and use the [expression language](expression_language.md) in the 'Base AMI' field. 


https://cl.ly/241J3m2P3D0U

As you can see, the expression I use is:

```
${ #stage('Find Image from Tags')['context']['amiDetails'][0]['imageId'] }
```

What is happening here? The `#stage('Find Image from Tags')` function references the previous pipeline stage named 'Find Image from Tags'. This function returns a map of data. The 'context' field of the map is populated after the 'Find Image from Tags' stage runs and contains the resulting data. The 'amiDetails' field is an array of all images found. This is especially relavent if you are looking for images in multiple regions. Although in our case, we are just working in 'us-west-2', so there is only one element in the array, '[0]'. Lastly, the 'Base AMI' field in the 'Bake Configuration' is expecting an AMI id as input so after we specify element '[0]', we further specify '[imageId]' to get the AMI id of the image.


Thats all, now we can execute the pipeline. 

https://cl.ly/3W1E0h3e3q0W

Notice the 'Results' box in the lower right hand corner. After inspecting it and comparing it to the bake pipeline in the very beginning of the example, I can see that Spinnaker did indeed choose the correct AMI.

If you wanted to deploy this image, you can just add a deploy step and Spinnaker will deploy the correct AMI. For more instructions on deploying, check out the [deployment guide](deploying.md).
