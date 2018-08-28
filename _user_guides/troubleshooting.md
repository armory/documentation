---
layout: post
order: 110
---

{% include components/legacy_documentation.html %}


For help with the following topics, please checkout the troubleshooting sections embedded in the corresponding guide:

- [Baking]({% link _user_guides/baking-images.md %}#troubleshooting)
- [Deploying]({% link _user_guides/deploying.md %}#common-errors-and-troubleshooting)
- [Expression language]({% link _user_guides/expression-language.md %}#troubleshooting)


## FAQ 
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


#### Why are tasks hanging on the 'Force Cache Refresh' stage?

This usually happens when the caching agent does not have appropriate permissions to the resources it is trying to cache. Different versions of Spinnaker need different levels of permission. If you are on AWS and have recently upgraded, try comparing your current IAM policy to the policies listed [here](https://github.com/Armory/spinnaker-aws-policy/tree/master/policies).

Additionally, you may experience this problem when you are getting throttled by your cloud provider.
