---
layout: post
title: Providers Config
order: 12
---

{:.no_toc}
- This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Providers Parameters

```yaml
providers:
   appengine:
   aws:
   ecs:
   dcos:
   dockerRegistry:
   google:
   huaweicloud:
   kubernetes:
   tencentcloud:
   oracle:
   cloudfoundry:
```

## App Engine

**spec.spinnakerConfig.config.providers.appengine**

The App Engine provider is used to deploy resources to any number of App Engine applications. To get started with App Engine, visit [the App Engine docs](https://cloud.google.com/appengine/docs/). An account in the App Engine provider refers to a single App Engine application. Spinnaker assumes that your App Engine application already exists.

```yaml
appengine:
  enabled: false
  gcloudPath:
  accounts:
  - name: prod-1
    cachingIntervalSeconds:
    environment:
    gcloudReleaseTrack:
    gitHttpsUsername:
    gitHttpsPassword:
    githubOAuthAccessToken:
    jsonPath:
    localRepositoryDirectory:     
    omitServices:
    omitVersions:     
    permissions:
      READ:
      WRITE:
      EXECUTE:
      CREATE:
    project:  
    providerVersion:
    requiredGroupMembership:      
    sshPrivateKeyFilePath:
    sshPrivateKeyPassphrase:
    sshKnownHostsFilePath:
    sshTrustUnknownHosts:       
    services:  
    versions:
  primaryAccount:      
```

- `enabled`:
- `accounts`:
- `gCloudPath`: The path to the gcloud executable on the machine running clouddriver. Ex: `/root`
- `primaryAccount`:

### Account parameters

 - `cachingIntervalSeconds`: The interval in seconds at which Spinnaker will poll for updates in your AppEngine clusters.
 - `environment`: The environment name for the account. Many accounts can share the same environment (e.g. dev, test, prod)
 - `gcloudReleaseTrack`: The gcloud release track (ALPHA, BETA, or STABLE) that Spinnaker will use when deploying to App Engine.
 - `gitHttpsPassword`: A password to be used when connecting with a remote git repository server over HTTPS. Supports encrypted value.
 - `gitHttpsUsername`: A username to be used when connecting with a remote git repository server over HTTPS.
 - `githubOAuthAccessToken`: An OAuth token provided by Github for connecting to  a git repository over HTTPS. See [Creating an Access Token for Command Line Use](https://help.github.com/articles/creating-an-access-token-for-command-line-use) for more information. Supports encrypted value.
 - `json-path`: The path to a JSON service account that Spinnaker will use as credentials. This is only needed if Spinnaker is not deployed on a Google Compute Engine VM, or needs permissions not afforded to the VM it is running on. See [Service Accounts](https://cloud.google.com/compute/docs/access/service-accounts) for more information.
 - `localRepositoryDirectory`: A local directory to be used to stage source files for App Engine deployments within Spinnaker's Clouddriver microservice.
 - `omitServices`: A list of regular expressions. Any service matching one of these regexes will be ignored by Spinnaker.
 - `omitVersions`: A list of regular expressions. Any version matching one of these regexes will be ignored by Spinnaker.
 - `permissions`:
   - `READ`: `[]` A user must have at least one of these roles in order to view this account's cloud resources.
   - `WRITE`: `[]` A user must have at least one of these roles in order to make changes to this account's cloud resources.
   - `EXECUTE`:
   - `CREATE`:
 - `project`: (*Required*) The Google Cloud Platform project this Spinnaker account will manage.
 - `providerVersion`:
 - `requiredGroupMembership`: (*Default*: `[]`) A user must be a member of at least one specified group in order to make changes to this account's cloud resources.
 - `services`: A list of regular expressions. Any service matching one of these regexes will be indexed by Spinnaker.
 - `sshKnownHostsFilePath`: The path to a known_hosts file to be used when connecting with a remote git repository over SSH. File needs to be present on the machine running Spinnaker. Supports encrypted file.
 - `sshPrivateKeyFilePath`: The path to an SSH private key to be used when connecting with a remote git repository over SSH. File needs to be present on the machine running Spinnaker. Supports encrypted file.
 - `sshPrivateKeyPassphrase`: The passphrase to an SSH private key to be used when connecting with a remote git repository over SSH. Supports encrypted value.
 - `sshTrustUnknownHosts`: (*Default*: `false`) Enabling this flag will allow Spinnaker to connect with a remote git repository over SSH without verifying the server's IP address against a known_hosts file.
 - `versions`: A list of regular expressions. Any version matching one of these regexes will be indexed by Spinnaker.

## AWS

**spec.spinnakerConfig.config.providers.aws**

```yaml
aws:
  enabled: false
  accessKeyId:  
  defaults:
    iamRole: BaseIAMRole
  defaultAssumeRole:
  defaultKeyPairTemplate:
  defaultRegions:
    - name:  
  primaryAccount:
  secretAccessKey:
  accounts:
  - name: aws-dev
    accountId:
    assumeRole:
    edda:
    environment:
    defaultKeyPair:
    discovery:
    lifecycleHooks:
      - defaultResult:
        heartbeatTimeout:
        lifecycleTransition:
        notificationTargetARN:
        roleARN:
    permissions:
      READ:
      WRITE:
      EXECUTE:
      CREATE:
    providerVersion: V1
    regions:
      - name:
    requiredGroupMembership:
  bakeryDefaults:
    awsAccessKey:
    awsAssociatePublicIpAddress:
    awsSecretKey:
    awsSubnetId:
    awsVpcId:
    defaultVirtualizationType:
    baseImages:
    - baseImage:
        id:
        shortDescription:
        detailedDescription:
        packageType:
        templateFile:
      virtualizationSettings:
      - region:
        virtualizationType:
        instanceType:
        sourceAmi:
        sshUserName:
        winRmUserName:
        spotPrice:
        spotPriceAutoProduct:
    templateFile:
  features:
    cloudFormation:
      enabled:
```

The AWS provider requires a central "Managing Account" to authenticate on behalf of other AWS accounts, or act as your sole, credential-based account.

- `enabled`: whether the provider is enabled
- `accessKeyId`:  AWS Access Key ID; note that if you are baking AMIs via Rosco, you may also need to set the access key on the AWS bakery default options.
- `accounts`: list of configured accounts
- `bakeryDefaults`:  configuration for Spinnaker's image bakery.Configuration for Spinnaker's image bakery.
- `defaults`: array with single entry:
  - `iamRole: BaseIAMRole`
- `defaultKeyPairTemplate`: "{{name}}-keypair"
- `defaultRegions`: array of `name: <region-name>` items
- `features`: configuration for AWS-specific features
- `primaryAccount`: the account you want to be primary of the configured accounts
- `secretAccessKey`: AWS Secret Key; note that if you are baking AMIs via Rosco, you may also need to set the secret key on the AWS bakery default options. Supports encrypted value.

### Account parameters

- `accountId`: (*Required*) Your AWS account ID to manage. See the [AWS IAM User Guide](http://docs.aws.amazon.com/IAM/latest/UserGuide/console_account-alias.html) for more information.
- `assumeRole`: (*Required*) If set, will configure a credentials provider that uses AWS Security Token Service to assume the specified role. Example: "user/spinnaker" or "role/spinnakerManaged"
- `defaultKeyPair`: The name of the AWS key-pair to use. See http://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-key-pairs.html for more information.
- `discovery`: The endpoint at which your Eureka discovery system is reachable. See https://github.com/Netflix/eureka for more information. Example: http://.eureka.url.to.use:8080/eureka-server/v2. Using will make Spinnaker use AWS regions in the hostname to access discovery so that you can have discovery for multiple regions.
- `edda`: The endpoint at which Edda is reachable. Edda is not a hard dependency of Spinnaker, but is helpful for reducing the request volume against AWS. See https://github.com/Netflix/edda for more information.
- `environment`: The environment name for the account. Many accounts can share the same environment (e.g. dev, test, prod)
- `lifecycleHooks`: Configuration for AWS Auto Scaling Lifecycle Hooks. For more information, see: https://docs.aws.amazon.com/autoscaling/ec2/userguide/lifecycle-hooks.html
  - `defaultResult`: Defines the action the Auto Scaling group should take when the lifecycle hook timeout elapses or if an unexpected failure occurs. Acceptable values: `CONTINUE`, `ABANDON`.
  - `heartbeatTimeout`: Set the heartbeat timeout in seconds for the lifecycle hook. Instances can remain in a wait state for a finite period of time. Must be greater than or equal to 30 and less than or equal to 7200. The default is 3600 (one hour).
  - `lifecycleTransition`: Type of lifecycle transition. Acceptable values: `autoscaling:EC2_INSTANCE_LAUNCHING`, `autoscaling:EC2_INSTANCE_TERMINATING`
  - `notificationTargetARN`: The ARN of the notification target that Amazon EC2 Auto Scaling uses to notify you when an instance is in the transition state for the lifecycle hook. This target can be either an SQS queue or an SNS topic.
  - `roleARN`: The ARN of the IAM role that allows the Auto Scaling group to publish to the specified notification target, for example, an Amazon SNS topic or an Amazon SQS queue.
- `permissions`:
  - `READ`: `[]` A user must have at least one of these roles in order to view this account's cloud resources.
  - `WRITE`: `[]` A user must have at least one of these roles in order to make changes to this account's cloud resources.
  - `EXECUTE`: A user must have at least one of these roles in order to execute pipelines.
  - `CREATE`:
- `providerVersion`:
- `regions`: (*Default*: `[]`) The AWS regions this Spinnaker account will manage.
- `requiredGroupMemberships`: (Deprecated): Configure permissions instead.


### Bakery parameters

- `awsAccessKey`: The default access key used to communicate with AWS.
- `awsAssociatePublicIpAddress`: If using a non-default VPC, public IP addresses are not provided by default. If this is enabled, your new instance will get a Public IP.
- `awsSecretKey`: The secret key used to communicate with AWS. Supports encrypted value.
- `awsSubnetId`: If using VPC, the default ID of the subnet, such as subnet-12345def, where Packer will launch the EC2 instance. This field is required if you are using a non-default VPC.
- `awsVpcId`: If launching into a VPC subnet, Packer needs the VPC ID in order to create a temporary security group within the VPC. Requires subnet_id to be set. If this default value is left blank, Packer will try to get the VPC ID from the subnet_id.
- `baseImages`: `[]`        
- `defaultVirtualizationType`: The default type of virtualization for the AMI you are building. This option must match the supported virtualization type of source_ami. Can be pv or hvm.
- `templateFile`: This is the name of the packer template that will be used to bake images from this base image. The template file must be found in this [list](https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer), or supplied as described in the [bakery docs](https://spinnaker.io/setup/bakery/)

#### Bakery base image parameters

 - `detailedDescription`: A long description to help human operators identify the image.
 - `id`:This is the identifier used by AWS to find this base image.
 - `shortDescription`:A short description to help human operators identify the image.
 - `detailedDescription`:A long description to help human operators identify the image.
 - `packageType`:This is used to help Spinnaker's bakery download the build artifacts you supply it with. For example, specifying deb indicates that your artifacts will need to be fetched from a debian repository.
 - `templateFile`: The name of the Packer template that will be used to bake images from this base image. The template file must be found in this list: https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer, or supplied as described here: https://spinnaker.io/setup/bakery/.
 - `virtualizationSettings`:
     - `region`:The name of the region in which to launch the EC2 instance to create the AMI.
     - `virtualizationType`: The type of virtualization for the AMI you are building. This option must match the supported virtualization type of sourceAmi. Acceptable values: pv, hvm.
     - `instanceType`: The EC2 instance type to use while building the AMI, such as t2.small.
     - `sourceAmi`:The source AMI whose root volume will be copied and provisioned on the currently running instance. This must be an EBS-backed AMI with a root volume snapshot that you have access to.
     - `sshUserName`:The username to connect to SSH with. Required if using SSH.
     - `winRmUserName`:The username to use to connect to WinRM.
     - `spotPrice`:The maximum hourly price to pay for a spot instance to create the AMI. Spot instances are a type of instance that EC2 starts when the current spot price is less than the maximum price you specify. Spot price will be updated based on available spot instance capacity and current spot instance requests. It may save you some costs. You can set this to auto for Packer to automatically discover the best spot price or to "0" to use an on demand instance (default).
     - `spotPriceAutoProduct`:Required if spotPrice is set to auto. This tells Packer what sort of AMI you are launching to find the best spot price. This must be one of: Linux/UNIX, SUSE Linux, Windows, Linux/UNIX (Amazon VPC), SUSE Linux (Amazon VPC), Windows (Amazon VPC).

### Features parameters

 - `cloud-formation`: (*Required*) Enable CloudFormation support for AWS.

## Azure

**spec.spinnakerConfig.config.providers.azure**

```yaml
azure:
  enabled: false
  primaryAccount: azure-dev
  accounts:
  - name: azure-dev
    appKey:
    clientId:
    defaultKeyVault:
    defaultResourceGroup:
    environment:
    objectId:
    packerResourceGroup:
    packerStorageAccount:
    permissions:
      READ:
      WRITE:
      EXECUTE:
      CREATE:
    providerVersion: V1
    regions:
      - name:
    requiredGroupMembership:
    subscriptionId:
    tenantId:
    useSshPublicKey:
  bakeryDefaults:
    templateFile:
    baseImages:
    - baseImage:
        id:
        detailedDescription:
        packageType:
        publisher:
        offer:
        shortDescription:
        templateFile:
        sku:
        version:
      virtualizationSettings: {}
```

- `enabled`: whether the provider is enabled
- `primaryAccount`: name of primary account
- `accounts`: list of configured accounts
- `bakeryDefaults`: configuration for Spinnaker's image bakery

### Account parameters

- `appKey`: (*Required*)  The appKey (password) of your service principal. Supports encrypted value.
- `clientId`: (*Required*) The clientId (also called appId) of your service principal.
- `defaultKeyVault`: (*Required*) The name of a KeyVault that contains the user name, password, and ssh public key used to create VMs
- `defaultResourceGroup`: (*Required*) The default resource group to contain any non-application specific resources.
- `environment`: The environment name for the account. Many accounts can share the same environment (e.g. dev, test, prod)
- `objectId`: The objectId of your service principal. This is only required if using Packer to bake Windows images.
- `packerResourceGroup`: The resource group to use if baking images with Packer.
- `packerStorageAccount`: The storage account to use if baking images with Packer.
- `permissions`:
    - `READ`: `[]` A user must have at least one of these roles in order to view this account's cloud resources.
    - `WRITE`: `[]` A user must have at least one of these roles in order to make changes to this account's cloud resources.
    - `EXECUTE`:
    - `CREATE`:
- `regions`: The Azure regions this Spinnaker account will manage.
- `requiredGroupMembership`: (Deprecated): Configure permissions instead.
- `subscriptionId`: (*Required*) The subscriptionId that your service principal is assigned to.
- `tenantId`: (*Required*) The tenantId that your service principal is assigned to.
- `useSshPublicKey`: Whether to use SSH public key to provision the linux vm. The default value is true which means using the ssh public key. Setting it to false means using the password instead.


### Bakery parameters

- `templateFile`: his is the name of the packer template that will be used to bake images from this base image. The template file must be found in this [list](https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer), or supplied as described in the [bakery docs](https://spinnaker.io/setup/bakery/)

#### Bakery base image parameters

 - `detailedDescription`: A long description to help human operators identify the image.
 - `offer`: (*Required*) The offer for your base image. See [https://aka.ms/azspinimage](https://aka.ms/azspinimage) to get a list of images.
 - `packageType`: This is used to help Spinnaker's bakery download the build artifacts you supply it with. For example, specifying 'deb' indicates that your artifacts will need to be fetched from a debian repository.
 - `publisher`: (*Required*) The Publisher name for your base image. See [https://aka.ms/azspinimage](https://aka.ms/azspinimage) to get a list of images.
 - `shortDescription`: A short description to help human operators identify the image.
 - `sku`: (*Required*) The SKU for your base image. See [https://aka.ms/azspinimage](https://aka.ms/azspinimage) to get a list of images.
 - `templateFile`: This is the name of the packer template that will be used to bake images from this base image. The template file must be found in this list [https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer](https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer), or supplied as described here: [https://spinnaker.io/setup/bakery/](https://spinnaker.io/setup/bakery/)
 - `version`: The version of your base image. This defaults to 'latest' if not specified.

## Cloud Foundry

**spec.spinnakerConfig.config.providers.cloudfoundry**

```yaml
cloudfoundry:
  enabled: false
  accounts:
  - name: cf-dev
    apiHost:
    appsManagerUrl:
    environment:
    metricsUrl:
    providerVersion: V1
    password:
    permissions:
      READ:
      WRITE:
      EXECUTE:
      CREATE:
    requiredGroupMembership:
    skipSslValidation:
    user:
  primaryAccount: cf-dev
  ```

- `enabled`: whether the provider is enabled
- `primaryAccount`: name of primary account
- `accounts`: list of configured accounts

### Account parameters

 - `apiHost`: (*Required*) Host of the CloudFoundry Foundation API endpoint ie. `api.sys.somesystem.com`
 - `appsManagerUrl`: HTTP(S) URL of the Apps Manager application for the CloudFoundry Foundation. Example: `https://apps.sys.somesystem.com`
 - `environment`: The environment name for the account. Many accounts can share the same environment (e.g. dev, test, prod)
 - `metricsUrl`: HTTP(S) URL of the metrics application for the CloudFoundry Foundation. Example `https://metrics.sys.somesystem.com`
 - `password`: (*Required*) Password for the account to use on for this CloudFoundry Foundation. Supports encrypted value.
 - `permissions`:
     - `READ`: `[]` A user must have at least one of these roles in order to view this account's cloud resources.
     - `WRITE`: `[]` A user must have at least one of these roles in order to make changes to this account's cloud resources.
     - `EXECUTE`:
     - `CREATE`:
 - `requiredGroupMembership`: `[]` (Deprecated): Configure permissions instead.
 - `skipSslValidation`: (*Default*: `false`) Skip SSL server certificate validation of the API endpoint
 - `user`: (*Required*) User name for the account to use on for this CloudFoundry Foundation


## DC/OS

**spec.spinnakerConfig.config.providers.dcos**

```yaml
dcos:
  enabled: false
  accounts:
  - name: dcos-dev
    clusters:
      - name:        
        password:
        serviceKeyFile:
        uid:
    dockerRegistries:
      - accountName:
        namespaces:
    environment:
    permissions:
      READ:
      WRITE:
      EXECUTE:
      CREATE:
    providerVersion: V1
    requiredGroupMembership:  
  clusters:
    - name:
      caCertFile:
      dcosUrl:
      insecureSkipTlsVerify:
      loadBalancer:
        image:
        serviceAccountSecret:
  primaryAccount:
```

- `enabled`: Whether the provider is enabled.
- `accounts`: the list of configured accounts
- `primaryAccount`: The name of the primary account.
- `clusters`: the list of configured clusters

### Accounts parameters

 - `clusters`: (*Required*) The clusters against which this account will authenticate.
   - `name`: (*Required*) The name of the account.
   - `password`: Password for a user account. If set, `serviceKeyFile` should not be set. Supports encrypted value.
   - `serviceKeyFile`: Path to a file containing the secret key for service account authentication. If set, `password` should not be set. File needs to be present on the machine running Spinnaker. Supports encrypted file.
   - `uid`:  (*Required*) User or service account identifier.
 - `dockerRegistries`: `[]`; (*Required*) Provide the list of docker registries to use with this DC/OS account
 - `environment`: The environment name for the account. Many accounts can share the same environment (e.g. dev, test, prod)
 - `requiredGroupMembership`: (Deprecated): Configure permissions instead.
 - `serviceKeyFile`: Path to a file containing the secret key for service account authentication
 - `uid`: (*Required*) User or service account identifier


### Clusters parameters

- `name`: (*Required*)  The name of the cluster.
- `caCertFile`: Root certificate file to trust for connections to the cluster. File needs to be present on the machine running Spinnaker. Supports encrypted file.
- `dcosUrl`: (*Required*) URL of the endpoint for the DC/OS cluster's admin router.
- `insecureSkipTlsVerify`:  If true, disables verification of certificates from the cluster (insecure).
- `loadBalancer`: Configuration for a DC/OS load balancer
  - `image`: Marathon-lb image to use when creating a load balancer with Spinnaker.
  - `serviceAccountSecret`: Name of the secret to use for allowing marathon-lb to authenticate with the cluster. Only necessary for clusters with strict or permissive security. Supports encrypted value.


## Docker Registry

**spec.spinnakerConfig.config.providers.dockerRegistry**

```yaml
dockerRegistry:
  enabled: true
  primaryAccount: dockerhub
  accounts:
  - name: dockerhub
    environment:
    requiredGroupMembership:
    providerVersion: V1
    permissions:
      READ:
      WRITE:
      EXECUTE:
      CREATE:
    address:
    username:
    password:
    passwordCommand:
    email:
    cacheIntervalSeconds:
    clientTimeoutMillis:
    cacheThreads:
    paginateSize:
    sortTagsByDate:
    trackDigests:
    insecureRegistry:
    repositories:
    passwordFile:
    dockerconfigFile:

```

- `enabled`: Whether the provider is enabled.
- `accounts`: the list of configured accounts
- `primaryAccount`: The name of the primary account.

### Account parameters

- `name`: name of the account
- `address`: (*Default*: `gcr.io`) (*Required*) The registry address you want to pull and deploy images from; e.g. `https://index.docker.io`
- `cacheIntervalSeconds`: (*Default*: `30`) How many seconds elapse between polling your docker registry. Certain registries are sensitive to over-polling, and larger intervals (e.g. 10 minutes = 600 seconds) are desirable if you're seeing rate limiting.
- `cacheThreads`: (*Default*: `1`) How many threads to cache all provided repos on. Really only useful if you have a ton of repos.
- `clientTimeoutMillis`: (*Default*: `60000`) Timeout time in milliseconds for this repository.
- `email`: Your docker registry email (often this only needs to be well-formed, rather than be a real address)
- `environment`: The environment name for the account. Many accounts can share the same environment (e.g. dev, test, prod)
- `insecureRegistry`: (*Default*: `false`) Treat the docker registry as insecure (don't validate the ssl cert).
- `paginateSize`: (*Default*: `100`) Paginate size for the docker repository `_catalog` endpoint.
- `password`:  Your docker registry password. Supports encrypted value.
- `passwordCommand`: Command to retrieve docker token/password, commands must be available in environment
- `passwordFile`: The path to a file containing your docker password in plaintext (not a docker/config.json file). File needs to be present on the machine running Spinnaker. Supports encrypted file.
- `permissions`:
   - `READ`: `[]` A user must have at least one of these roles in order to view this account's cloud resources.
   - `WRITE`: `[]` A user must have at least one of these roles in order to make changes to this account's cloud resources.
   - `EXECUTE`:
   - `CREATE`:
- `requiredGroupMembership`: `[]` (Deprecated): Configure permissions instead.
- `repositories`: (*Default*: `[]`) An optional list of repositories to cache images from. If not provided, Spinnaker will attempt to read accessible repositories from the registries `_catalog` endpoint
- `sortTagsByDate`: (*Default*: `false`) Sort tags by creation date.
- `trackDigests`: (*Default*: `false`) Track digest changes. This is not recommended as it consumes a high QPM, and most registries are flaky.
- `username`: Your docker registry username

## ECS

**spec.spinnakerConfig.config.providers.ecs**

```yaml
ecs:
  enabled: false
  accounts:
  - name: aws-dev
    environment:
    awsAccount:
    requiredGroupMembership:
    permissions:
      READ:
      WRITE:
      EXECUTE:
      CREATE:
  providerVersion: v1
  primaryAccount: aws-dev
```

- `enabled`: Whether the provider is enabled.
- `accounts`: the list of configured accounts
- `primaryAccount`: The name of the primary account.

### Account parameters

- `name`: name of the account
- `awsAccount`: (*Required*) Provide the name of the AWS account associated with this ECS account.See [https://github.com/spinnaker/clouddriver/blob/master/clouddriver-ecs/README.md](https://github.com/spinnaker/clouddriver/blob/master/clouddriver-ecs/README.md) for more information.
- `environment`: The environment name for the account. Many accounts can share the same environment (e.g. dev, test, prod)
- `permissions`:
    - `READ`: `[]` A user must have at least one of these roles in order to view this account's cloud resources.
    - `WRITE`: `[]` A user must have at least one of these roles in order to make changes to this account's cloud resources.
    - `EXECUTE`:
    - `CREATE`:
- `requiredGroupMembership`: `[]` (Deprecated): Configure permissions instead.



## Google

**spec.spinnakerConfig.config.providers.google**

```yaml
google:
  enabled:
  accounts:
  - name:
    environment:
    requiredGroupMembership:
    - readers
    providerVersion: V1
    permissions:
      READ:
      - read1
      - read2
      WRITE:
      - write1
      - write2
      EXECUTE:
      - exec1
      - exec2
      CREATE:
      - create1
      - create2
    project:
    jsonPath:
    alphaListed:
    imageProjects:
    - abc
    consul:
      enabled:
      agentEndpoint:
      agentPort:
      datacenters:
      - abc
    userDataFile:
    regions:
    - abc
  primaryAccount: google-dev
  bakeryDefaults:
    templateFile:
    baseImages:
    - baseImage:
        id:
        shortDescription:
        detailedDescription:
        packageType:
        templateFile:
        isImageFamily:
      virtualizationSettings:
        sourceImage:
        sourceImageFamily:
      zone:
      network:
      networkProjectId:
      useInternalIp:
  defaultKeyPairTemplate:
  defaultRegions:
   - name:
```

- `enabled`: Whether the provider is enabled.
- `accounts`: the list of configured accounts
- `primaryAccount`: The name of the primary account.
- `bakeryDefaults`: configuration for Spinnaker's image bakery

### Account parameters

- `name`: name of the account
- `alphaListed`: (*Default*: `false`) Enable this flag if your project has access to alpha features and you want Spinnaker to take advantage of them.
- `environment`: The environment name for the account. Many accounts can share the same environment (e.g. dev, test, prod)
- `imageProjects`: (*Default*: `[]`) A list of Google Cloud Platform projects Spinnaker will be able to cache and deploy images from. When this is omitted, it defaults to the current project. Each project must have granted the IAM role `compute.imageUser` to the service account associated with the json key used by this account, as well as to the 'Google APIs service account' automatically created for the project being managed (should look similar to `12345678912@cloudservices.gserviceaccount.com`). See [Sharing Images Across Projects](https://cloud.google.com/compute/docs/images/sharing-images-across-projects) for more information about sharing images across GCP projects.
- `jsonPath`: The path to a JSON service account that Spinnaker will use as credentials. This is only needed if Spinnaker is not deployed on a Google Compute Engine VM, or needs permissions not afforded to the VM it is running on. See [https://cloud.google.com/compute/docs/access/service-accounts](https://cloud.google.com/compute/docs/access/service-accounts) for more information. File needs to be present on the machine running Spinnaker. Supports encrypted file.
- `permissions`:
    - `READ`: `[]` A user must have at least one of these roles in order to view this account's cloud resources.
    - `WRITE`: `[]` A user must have at least one of these roles in order to make changes to this account's cloud resources.
    - `EXECUTE`:
    - `CREATE`:
- `requiredGroupMembership`: `[]` (Deprecated): Configure permissions instead.
- `project`: (*Required*) The Google Cloud Platform project this Spinnaker account will manage.
- `readPermissions`: (*Default*: `[]`) A user must have at least one of these roles in order to view this account's cloud resources.
- `regions`: A list of regions for caching and mutating calls. This overwrites any default-regions set on the provider.
- `userDataFile`: The path to user data template file. Spinnaker has the ability to inject userdata into generated instance templates. The mechanism is via a template file that is token replaced to provide some specifics about the deployment. See [https://github.com/spinnaker/clouddriver/blob/master/clouddriver-aws/UserData.md](https://github.com/spinnaker/clouddriver/blob/master/clouddriver-aws/UserData.md) for more information. File needs to be present on the machine running Spinnaker.
- `consul`: Configuration for Consul.
  - `enabled`: Whether Consul is enabled.
  - `agentEndpoint`: Reachable Consul node endpoint connected to the Consul cluster. Defaults to localhost.
  - `agentPort`: Port consul is running on for every agent.
  - `datacenters`: List of data centers to cache and keep updated.


### Bakery parameters

- `network`: Set the default network your images will be baked in.
- `networkProjectId`: Set the default project id for the network and subnet to use for the VM baking your image.
- `templateFile`: This is the name of the packer template that will be used to bake images from this base image. The template file must be found in this list [https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer](https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer), or supplied as described here: [https://spinnaker.io/setup/bakery/](https://spinnaker.io/setup/bakery/)
- `useInternalIp`: Use the internal rather than external IP of the VM baking your image.
- `zone`: Set the default zone your images will be baked in.

#### Bakery base image parameters

- `detailedDescription`: A long description to help human operators identify the image.
- `isImageFamily`: (*Default*: `false`)
- `packageType`: This is used to help Spinnaker's bakery download the build artifacts you supply it with. For example, specifying 'deb' indicates that your artifacts will need to be fetched from a debian repository.
- `shortDescription`: A short description to help human operators identify the image.
- `templateFile`: This is the name of the packer template that will be used to bake images from this base image. The template file must be found in this list [https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer](https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer), or supplied as described here: [https://spinnaker.io/setup/bakery/](https://spinnaker.io/setup/bakery/)
- `virtualizationSettings`:
  - `sourceImage`: The source image. If both source image and source image family are set, source image will take precedence.
  - `source-image-family`: The source image family to create the image from. The newest, non-deprecated image is used.


## Huawei Cloud

**spec.spinnakerConfig.config.providers.huawei**

```yaml
huaweicloud:
  enabled:
  accounts:
  - name: huawei-dev
    environment:
    requiredGroupMembership:
    providerVersion: V1
    permissions:
      READ:
      - read1
      - read2
      WRITE:
      - write1
      - write2
      EXECUTE:
      - exec1
      - exec2
      CREATE:
      - create1
      - create2
    accountType:
    authUrl:
    username:
    password:
    projectName:
    domainName:
    insecure:
    regions:
  primaryAccount: huawei-dev
  bakeryDefaults:
    templateFile:
    baseImages:
    - baseImage:
        id:
        shortDescription:
        detailedDescription:
        packageType:
        templateFile:
      virtualizationSettings:
      - region:
        instanceType:
        sourceImageId:
        sshUserName:
        eipType:
    authUrl:
    username:
    password:
    projectName:
    domainName:
    insecure:
    vpcId:
    subnetId:
    securityGroup:
    eipBandwidthSize:
```

- `enabled`: Whether the provider is enabled.
- `accounts`: the list of configured accounts
- `primaryAccount`: The name of the primary account.
- `bakeryDefaults`: configuration for Spinnaker's image bakery

### Account parameters

- `name`: name of the account
- `accountType`: The type of account.
- `authUrl`: (*Required*) The auth url of cloud.
- `domainName`: (*Required*) The domain name of the cloud.
- `environment`: The environment name for the account. Many accounts can share the same environment (e.g. dev, test, prod)
- `insecure`: (*Default*: `false`) Disable certificate validation on SSL connections. Needed if certificates are self signed. Default false.
- `password`: (*Required*)  The password used to access cloud. Supports encrypted value.
- `projectName`: (*Required*) The name of the project within the cloud.
- `regions`: (*Default*: `[]`) (*Required*) The region(s) of the cloud.
- `username`: (*Required*) The username used to access cloud.
- `permissions`:
    - `READ`: `[]` A user must have at least one of these roles in order to view this account's cloud resources.
    - `WRITE`: `[]` A user must have at least one of these roles in order to make changes to this account's cloud resources.
    - `EXECUTE`:
    - `CREATE`:
- `requiredGroupMembership`: `[]` (Deprecated): Configure permissions instead.

### Bakery parameters

- `authUrl`: (*Required*) Set the default auth URL your images will be baked in.
- `domainName`: (*Required*) Set the default domainName your images will be baked in.
- `eipBandwidthSize`: (*Required*) Set the bandwidth size of EIP your images will be baked in.
- `insecure`: (*Required*) The security setting (true/false) for connecting to the HuaweiCloud account.
- `password`: (*Required*) Set the default password your images will be baked with.
- `projectName`: Set the default project name your images will be baked in.
- `domainName`: (*Required*) Set the default project name your images will be baked in.
- `securityGroup`: (*Required*) Set the default security group your images will be baked in.
- `subnetId`: (*Required*) Set the subnet your images will be baked in.
- `templateFile`: This is the name of the packer template that will be used to bake images from this base image. The template file must be found in this list [https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer](https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer), or supplied as described here: [https://spinnaker.io/setup/bakery/](https://spinnaker.io/setup/bakery/)
- `username`: (*Required*) Set the default username your images will be baked with.
- `vpcId`: (*Required*) Set the vpc your images will be baked in.

#### Bakery base image parameters

- `detailedDescription`: A long description to help human operators identify the image.
- `packageType`: This is used to help Spinnaker's bakery download the build artifacts you supply it with. For example, specifying 'deb' indicates that your artifacts will need to be fetched from a debian repository.
- `shortDescription`: A short description to help human operators identify the image.
- `templateFile`: This is the name of the packer template that will be used to bake images from this base image. The template file must be found in this list [https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer](https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer), or supplied as described here: [https://spinnaker.io/setup/bakery/](https://spinnaker.io/setup/bakery/)


## Kubernetes

**spec.spinnakerConfig.config.providers.kubernetes**

The Kubernetes provider is used to deploy Kubernetes resources to any number of Kubernetes clusters. Spinnaker assumes you have a Kubernetes cluster already running. If you don't, you must configure one: [https://Kubernetes.io/docs/getting-started-guides/](https://Kubernetes.io/docs/getting-started-guides/).

Before proceeding, please visit [https://Kubernetes.io/docs/concepts/cluster-administration/authenticate-across-clusters-kubeconfig/](https://Kubernetes.io/docs/concepts/cluster-administration/authenticate-across-clusters-kubeconfig/) to make sure you're familiar with the authentication terminology.


```yaml
kubernetes:
  enabled: true
  accounts:
  - name: spinnaker
    context:
    cluster:
    user:
    configureImagePullSecrets:
    cacheThreads:
    namespaces:
    omitNamespaces:
    kinds:
    omitKinds:
    customResources:
      versioned:
    - kubernetesKind:
    - spinnakerKind:
    cachingPolicies:
    - kubernetesKind:
      maxEntriesPerAgent:
    kubeconfigFile:
    kubeconfigContents:
    kubectlPath:
    kubectlRequestTimeoutSeconds:
    liveManifestCalls:
    oAuthServiceAccount:
    oAuthScopes:
    namingStrategy:
    skin:
    onlySpinnakerManaged:
    debug:
    dockerRegistries:
    - accountName:
      namespaces:
    providerVersion: V2
    requiredGroupMembership:
    permissions:
      READ:
      WRITE:
      EXECUTE:
      CREATE:
  primaryAccount: spinnaker
```

- `enabled`: Whether the provider is enabled.
- `accounts`: the list of configured accounts
- `primaryAccount`: The name of the primary account.

### Account parameters

An account in the Kubernetes provider refers to a single Kubernetes context. In Kubernetes, a context is the combination of a Kubernetes cluster and some credentials. If no context is specified, the default context in in your `kubeconfig` is assumed. You must also provide a set of Docker Registries for each account. Spinnaker will automatically upload that Registry's credentials to the specified Kubernetes cluster allowing you to deploy those images without further configuration.

- `name`: spinnaker
- `context`: The kubernetes context to be managed by Spinnaker. See http://kubernetes.io/docs/user-guide/kubeconfig-file/#context for more information. When no context is configured for an account the 'current-context' in your kubeconfig is assumed.
- `cluster`: Used with V1 provider (deprecated)
- `user`: Used with V1 provider (deprecated)
- `configureImagePullSecrets`: Used with V1 provider. When true, Spinnaker will create & manage your image pull secrets for you; when false, you will have to create and attach them to your pod specs by hand.
- `serviceAccount`: When true, Spinnaker attempt to authenticate against Kubernetes using a Kubernetes service account. This only works when Halyard & Spinnaker are deployed in Kubernetes. Read more about service accounts here: https://kubernetes.io/docs/tasks/configure-pod-container/configure-service-account/.
- `cacheThreads`: Number of caching agents for this kubernetes account. Each agent handles a subset of the namespaces available to this account. By default, only 1 agent caches all kinds for all namespaces in the account.
- `namespaces`: A list of namespaces this Spinnaker account can deploy to and will cache. When no namespaces are configured, this defaults to 'all namespaces'.
- `omitNamespaces`: A list of namespaces this Spinnaker account cannot deploy to or cache. This can only be set when --namespaces is empty or not set.
- `kinds`: (V2 Only) A list of resource kinds this Spinnaker account can deploy to and will cache. When no kinds are configured, this defaults to 'all kinds described here https://spinnaker.io/reference/providers/kubernetes-v2/'.
- `omitKinds`: (V2 Only) A list of resource kinds this Spinnaker account cannot deploy to or cache. This can only be set when --kinds is empty or not set.
- `customResources`: (V2 Only) List of Kubernetes custom resources to managed by clouddriver and made available for use in patch and delete manifest stages.
    - `versioned`: true or false
	- `kubernetesKind`: Fully qualified name of the Kubernetes CRD
	- `spinnakerKind`: One of instances, configs, serverGroups, loadBalancers, securityGroups, serverGroupManagers, unclassified
- `cachingPolicies`:
  - `kubernetesKind`:
  - `maxEntriesPerAgent`:
- `kubeconfigFile`: The path to your kubeconfig file. By default, it will be under the Spinnaker user's home directory in the typical .kube/config location. File needs to be present on the machine running Spinnaker. Supports encrypted file.
- `kubeconfigContents`: Inline kubeconfig file contents
- `kubectlPath`: Alternate path inside clouddriver pod of the kubectl binary
- `kubectlRequestTimeoutSeconds`: Timeout in seconds of kubectl calls
- `checkPermissionsOnStartup`:  When false, clouddriver will skip the permission checks for all Kubernetes Kinds at startup. This can save a great deal of time during clouddriver startup when you have many Kubernetes accounts configured. This disables the log messages at startup about missing permissions.
- `liveManifestCalls`: When true, clouddriver will query manifest status during pipeline executions using live data rather than the cache. This eliminates all time spent in the "force cache refresh" task in pipelines, greatly reducing execution time.
- `oAuthServiceAccount`: File needs to be present on the machine running Spinnaker. Supports encrypted file.
- `oAuthScopes`:
- `namingStrategy`:
- `skin`:
- `onlySpinnakerManaged`: (V2 Only) When true, Spinnaker will only cache/display applications that have been created by Spinnaker; as opposed to attempting to configure applications for resources already present in Kubernetes.
- `debug`: true or false
- `dockerRegistries`:
    - `accountName`: dockerhub
    - `namespaces`:
- `providerVersion`: V2
- `permissions`:
    - `READ`: `[]` A user must have at least one of these roles in order to view this account's cloud resources.
    - `WRITE`: `[]` A user must have at least one of these roles in order to make changes to this account's cloud resources.
    - `EXECUTE`:
    - `CREATE`:
- `requiredGroupMembership`: `[]` (Deprecated): Configure permissions instead.



## Oracle

**spec.spinnakerConfig.config.providers.oracle**

```yaml
oracle:
  enabled:
  accounts:
  - name: oracle-dev
    environment:
    requiredGroupMembership:
    providerVersion: V1
    permissions:
      READ:
      - read1
      - read2
      WRITE:
      - write1
      - write2
      EXECUTE:
      - exec1
      - exec2
      CREATE:
      - create1
      - create2
    compartmentId:
    userId:
    fingerprint:
    sshPrivateKeyFilePath:
    privateKeyPassphrase:
    tenancyId:
    region:
  primaryAccount: oracle-dev
  bakeryDefaults:
    templateFile:
    baseImages:
    - baseImage:
        id:
        shortDescription:
        detailedDescription:
        packageType:
        templateFile:
      virtualizationSettings:
        baseImageId:
        sshUserName:
    availabilityDomain:
    subnetId:
    instanceShape:
```

### Account parameters

 - `compartmentId`: (*Required*) Provide the OCID of the Oracle Compartment to use.
 - `deployment`: If supplied, use this Halyard deployment. This will _not_ create a new deployment.
 - `environment`: The environment name for the account. Many accounts can share the same environment (e.g. dev, test, prod)
 - `fingerprint`: (*Required*) Fingerprint of the public key
 - `privateKeyPassphrase`: Passphrase used for the private key, if it is encrypted.Supports encrypted value.
 - `permissions`:
     - `READ`: `[]` A user must have at least one of these roles in order to view this account's cloud resources.
     - `WRITE`: `[]` A user must have at least one of these roles in order to make changes to this account's cloud resources.
     - `EXECUTE`:
     - `CREATE`:
 - `requiredGroupMembership`: `[]` (Deprecated): Configure permissions instead.
 - `region`: (*Required*) An Oracle region (e.g., us-phoenix-1)
 - `sshPrivateKeyFilePath`: (*Required*) Path to the private key in PEM format. File needs to be present on the machine running Spinnaker. Supports encrypted file.
 - `tenancyId`: (*Required*) Provide the OCID of the Oracle Tenancy to use.
 - `userI`: (*Required*) Provide the OCID of the Oracle User you're authenticating as

### Bakery parameters

- `availabilityDomain`: (*Required*) The name of the Availability Domain within which a new instance is launched and provisioned.
- `deployment`: If supplied, use this Halyard deployment. This will _not_ create a new deployment.
- `instanceShape`: (*Required*) The shape for allocated to a newly created instance.
- `subnetId`: (*Required*) The name of the subnet within which a new instance is launched and provisioned.
- `templateFile`: This is the name of the packer template that will be used to bake images from this base image. The template file must be found in this list [https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer](https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer), or supplied as described here: [https://spinnaker.io/setup/bakery/](https://spinnaker.io/setup/bakery/)

#### Bakery base image parameters

 - `baseImageId`: (*Required*) The OCID of the base image ID for the baking configuration.
 - `deployment`: If supplied, use this Halyard deployment. This will _not_ create a new deployment.
 - `detailedDescription`: A long description to help human operators identify the image.
 - `packageType`: This is used to help Spinnaker's bakery download the build artifacts you supply it with. For example, specifying 'deb' indicates that your artifacts will need to be fetched from a debian repository.
 - `shortDescription`: A short description to help human operators identify the image.
 - `sshUserName`: (*Required*) The ssh username for the baking configuration.
 - `templateFile`: This is the name of the packer template that will be used to bake images from this base image. The template file must be found in this list [https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer](https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer), or supplied as described here: [https://spinnaker.io/setup/bakery/](https://spinnaker.io/setup/bakery/)


## Tencent Cloud

**spec.spinnakerConfig.config.providers.tencentcloud**

```yaml
tencentcloud:
  enabled:
  accounts:
  - name: tencent-dev
    environment: dev
    requiredGroupMembership:
    providerVersion: V1
    permissions:
      READ:
      - read1
      - read2
      WRITE:
      - write1
      - write2
      EXECUTE:
      - exec1
      - exec2
      CREATE:
      - create1
      - create2
    secretId:
    secretKey:
    regions:
  primaryAccount: tencent-dev
  bakeryDefaults:
    templateFile:
    baseImages:
    - baseImage:
        id:
        shortDescription:
        detailedDescription:
        packageType:
        templateFile:
      virtualizationSettings:
      - region:
        zone:
        instanceType:
        sourceImageId:
        sshUserName:
    secretId:
    secretKey:
```

- `enabled`: true or false
- `accounts`: account configuration list
- `primaryAccount`: primary account to use
- `bakeryDefaults`: image baking configuration

### Account parameters

 - `deployment`: If supplied, use this Halyard deployment. This will _not_ create a new deployment.
 - `environment`: The environment name for the account. Many accounts can share the same environment (e.g. dev, test, prod)
 - `permissions`:
     - `READ`: `[]` A user must have at least one of these roles in order to view this account's cloud resources.
     - `WRITE`: `[]` A user must have at least one of these roles in order to make changes to this account's cloud resources.
     - `EXECUTE`:
     - `CREATE`:
 - `requiredGroupMembership`: `[]` (Deprecated): Configure permissions instead.
 - `regions`: The Tencent CLoud regions this Spinnaker account will manage.
 - `secretId`: (*Required*) The secret id used to access Tencent Cloud.
 - `secretKey`: (*Required*) The secret key used to access Tencent Cloud. Supports encrypted value.

### Bakery parameters

- `secretId`: (*Required*) The default access key used to communicate with AWS.
- `secretKey`: (*Required*)  The secret key used to communicate with AWS. Supports encrypted value.
- `templateFile`: This is the name of the packer template that will be used to bake images from this base image. The template file must be found in this list [https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer](https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer), or supplied as described here: [https://spinnaker.io/setup/bakery/](https://spinnaker.io/setup/bakery/)

#### Bakery base image parameters

 - `detailedDescription`: A long description to help human operators identify the image.
 - `instanceType`: (*Required*) The instance type for the baking configuration.
 - `packageType`: This is used to help Spinnaker's bakery download the build artifacts you supply it with. For example, specifying 'deb' indicates that your artifacts will need to be fetched from a debian repository.
 - `region`: (*Required*) The region for the baking configuration.
 - `shortDescription`: A short description to help human operators identify the image.
 - `sourceImageId`: (*Required*) The source image ID for the baking configuration.
 - `sshUserName`: (*Required*) The ssh username for the baking configuration.
 - `templateFile`: This is the name of the packer template that will be used to bake images from this base image. The template file must be found in this list [https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer](https://github.com/spinnaker/rosco/tree/master/rosco-web/config/packer), or supplied as described here: [https://spinnaker.io/setup/bakery/](https://spinnaker.io/setup/bakery/)
 - `zone`: (*Required*) The zone for the baking configuration.
