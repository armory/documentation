---
layout: post
order: 80
---

This guide includes:
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Dynamically defining User-Data for EC2

If you are creating a deployment configuration for AWS, Spinnaker gives you the option to provide [user-data](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html#instancedata-add-user-data). As you can see here:

![](https://cl.ly/3g2Z2l2j1634/Image%202017-05-26%20at%2011.20.47%20AM.png)

The user-data field needs to be base64 encoded. It is possible to create this dynamically with the built in expression language. To do this you can use the `${ #toBase64() }` command. For example, You can pass the build number to the user-data via:

![](https://cl.ly/1m2E080X1z44/Image%202017-05-26%20at%2011.29.23%20AM.png)

## Dynamically defining User-Data for GCE

If you are creating a deployment configuration for GCP, Spinnaker gives you the option to provide [user-data](http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-instance-metadata.html#instancedata-add-user-data). As you can see here:

![](https://cl.ly/318aa97475f1/Screen%20Shot%202019-01-24%20at%2013.47.51.png)

The user-data field needs to be base64 encoded. It is possible to create this dynamically with the built in expression language. To do this you can use the `${ #toBase64() }` command. For example, You can pass the build number to the user-data via:

![](https://cl.ly/039576c558cc/Screen%20Shot%202019-01-24%20at%2013.49.16.png)
