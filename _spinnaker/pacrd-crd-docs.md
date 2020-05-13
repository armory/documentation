---
layout: post
title: PaCRD CRD Documentation
order: 172
---
{% include components/experimental_feature.html %}
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}
# pacrd.armory.spinnaker.io/v1alpha1
<p>
<p>Package v1alpha1 contains API Schema definitions for the pacrd.armory.spinnaker.io Applications and Pipelines.</p>
</p>
## Resource Types:
<ul></ul>
### Application 
<p>Application is the Schema for the applications API</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>spec</code><br />
<em>
<a href="#applicationspec">
ApplicationSpec
</a>
</em>
</td>
<td>
<br/>
<br/>
<table>
<tr>
<td>
<code>email</code><br />
<em>
string
</em>
</td>
<td>
<p>Email points to the e-mail user or list that owns this application.</p>
</td>
</tr>
<tr>
<td>
<code>description</code><br />
<em>
string
</em>
</td>
<td>
<p>Description explains the purpose of this application.</p>
</td>
</tr>
<tr>
<td>
<code>dataSources</code><br />
<em>
<a href="#datasources">
DataSources
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>DataSources optionally enable and disable elements of the Spinnaker Application UI.</p>
</td>
</tr>
<tr>
<td>
<code>permissions</code><br />
<em>
<a href="#permissions">
Permissions
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Permissions maps actions inside Spinnaker to authenticated roles that can take them.</p>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
### Artifact 
(__Appears on:__
<a href="#bakemanifest">BakeManifest</a>, 
<a href="#webhook">Webhook</a>)
<p>Artifact is an object that references an external resource. It could be a
Docker container, file in source control, AMI, or binary blob in S3, etc.</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>id</code><br />
<em>
string
</em>
</td>
<td>
<p>ID is a unique identifier for this artifact. IDs must only be unique for
the pipeline they are declared in.</p>
</td>
</tr>
<tr>
<td>
<code>displayName</code><br />
<em>
string
</em>
</td>
<td>
<p>DisplayName tells Spinnaker how to render this artifact in the UI.</p>
</td>
</tr>
<tr>
<td>
<code>usePriorArtifact</code><br />
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>Attempt to match against an artifact in the prior pipeline execution&rsquo;s context.</p>
<p>See the <a href="https://www.spinnaker.io/reference/artifacts/in-pipelines">reference</a>
for more information.</p>
</td>
</tr>
<tr>
<td>
<code>useDefaultArtifact</code><br />
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>If true, requires DefaultArtifact to be defined with a fallback artifact to use.</p>
</td>
</tr>
<tr>
<td>
<code>defaultArtifact</code><br />
<em>
<a href="#matchartifact">
MatchArtifact
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>If your artifact either wasn&rsquo;t supplied from a trigger, or it wasn&rsquo;t found
in a prior execution, the artifact specified here will end up in your
pipeline&rsquo;s execution context.</p>
</td>
</tr>
<tr>
<td>
<code>matchArtifact</code><br />
<em>
<a href="#matchartifact">
MatchArtifact
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>This specifies which fields in your incoming artifact to match against.
Every field that you supply will be used to match against all incoming
artifacts. If all specified fields match, the incoming artifact is bound
to your pipeline context.</p>
<p>See the <a href="https://www.spinnaker.io/reference/artifacts/in-pipelines/#expected-artifacts">reference</a>
for more information.</p>
</td>
</tr>
</tbody>
</table>
### ArtifactReference 
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>id</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>displayName</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
</tbody>
</table>
### BakeManifest 
(__Appears on:__
<a href="#stageunion">StageUnion</a>)
<p>BakeManifest represents a bake manifest stage in Spinnaker.
NOTE: I suspect this only supports <code>helm2</code> style deployments right now.
NOTE: notifications currently not supported for this stage.</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>failOnFailedExpressions</code><br />
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>failPipeline</code><br />
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>continuePipeline</code><br />
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>completeOtherBranchesThenFail</code><br />
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>namespace</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>evaluateOverrideExpressions</code><br />
<em>
bool
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>expectedArtifacts</code><br />
<em>
<a href="#artifact">
[]Artifact
</a>
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>inputArtifacts</code><br />
<em>
<a href="#*github.com/armory-io/pacrd/api/v1alpha1.artifactreference">
[]*github.com/armory-io/pacrd/api/v1alpha1.ArtifactReference
</a>
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>outputName</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>overrides</code><br />
<em>
map[string]string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>rawOverrides</code><br />
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>templateRenderer</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
</tbody>
</table>
### CheckPreconditions 
(__Appears on:__
<a href="#stageunion">StageUnion</a>)
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>preconditions</code><br />
<em>
<a href="#[]github.com/armory-io/pacrd/api/v1alpha1.precondition">
[]github.com/armory-io/pacrd/api/v1alpha1.Precondition
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
</tbody>
</table>
### Context 
(__Appears on:__
<a href="#precondition">Precondition</a>)
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>expression</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>failureMessage</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
</tbody>
</table>
### CustomArtifact 
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>type</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>name</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>id</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>location</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>reference</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>version</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>artifactAccount</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
</tbody>
</table>
### DataSource (<code>string</code> alias)
<p>DataSource is a tab in the Spinnaker UI representing a kind of managed resource.
Allowed values include: serverGroups,executions,loadBalancers,securityGroups.</p>
### DataSources 
<p>DataSources optionally enable and disable elements of the Spinnaker Application UI.</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>enabled</code><br />
<em>
<a href="#[]github.com/armory-io/pacrd/api/v1alpha1.datasource">
[]github.com/armory-io/pacrd/api/v1alpha1.DataSource
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Enabled is the list of explicitly enabled UI elements.</p>
</td>
</tr>
<tr>
<td>
<code>disabled</code><br />
<em>
<a href="#[]github.com/armory-io/pacrd/api/v1alpha1.datasource">
[]github.com/armory-io/pacrd/api/v1alpha1.DataSource
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Disabled is the list of explicitly disabled UI elements.</p>
</td>
</tr>
</tbody>
</table>
### DeleteManifest 
(__Appears on:__
<a href="#stageunion">StageUnion</a>)
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>account</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>app</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>cloudProvider</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>location</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>mode</code><br />
<em>
<a href="#deletemanifestmode">
DeleteManifestMode
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>This should be fixed to use type DeleteManifestMode</p>
</td>
</tr>
<tr>
<td>
<code>kind</code><br />
<em>
<a href="#kuberneteskind">
KubernetesKind
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>This should be fixed to use type SpinnakerKind</p>
</td>
</tr>
<tr>
<td>
<code>targetName</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>labelSelectors</code><br />
<em>
<a href="#labelselector">
LabelSelector
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>options</code><br />
<em>
<a href="#options">
Options
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>cluster</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>criteria</code><br />
<em>
<a href="#targetcriteria">
TargetCriteria
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>kinds</code><br />
<em>
<a href="#kuberneteskind">
[]KubernetesKind
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
</tbody>
</table>
### DeleteManifestMode (<code>string</code> alias)
(__Appears on:__
<a href="#deletemanifest">DeleteManifest</a>)
<p>Not sure where these values are in the service, need to find more but for the moment this are all possible</p>
### DeployManifest 
(__Appears on:__
<a href="#stageunion">StageUnion</a>)
<p>DeployManifest deploys a Kubernetes manifest to a target Kubernetes cluster. Spinnaker will periodically check the status of the manifest to make sure the manifest converges on the target cluster until it reaches a timeout
FIXME: trafficManagement, relationships</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>account</code><br />
<em>
string
</em>
</td>
<td>
<p>Account is the configured account to deploy to.</p>
</td>
</tr>
<tr>
<td>
<code>cloudProvider</code><br />
<em>
string
</em>
</td>
<td>
<p>CloudProvider is the type of cloud provider used by the selected account.</p>
</td>
</tr>
<tr>
<td>
<code>completeOtherBranchesThenFail</code><br />
<em>
bool
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>continuePipeline</code><br />
<em>
bool
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>failPipeline</code><br />
<em>
bool
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>manifestArtifactAccount</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>manifestArtifactId</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>manifests</code><br />
<em>
[]string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>moniker</code><br />
<em>
<a href="#moniker">
Moniker
</a>
</em>
</td>
<td>
<p>FIXME</p>
</td>
</tr>
<tr>
<td>
<code>skipExpressionEvaluation</code><br />
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>source</code><br />
<em>
<a href="#source">
Source
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
</tbody>
</table>
### DockerArtifact 
<p>DockerArtifact represents a container in the target Docker registry.</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>artifactAccount</code><br />
<em>
string
</em>
</td>
<td>
<p>ArtifactAccount represents the desired container registry to pull images from.</p>
</td>
</tr>
<tr>
<td>
<code>name</code><br />
<em>
string
</em>
</td>
<td>
<p>Name is the fully qualified Docker image name in the configured registry.</p>
</td>
</tr>
<tr>
<td>
<code>id</code><br />
<em>
string
</em>
</td>
<td>
<p>ID represents a pipeline-wide unique identifier.</p>
</td>
</tr>
<tr>
<td>
<code>type</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
</tbody>
</table>
### EmbeddedArtifact 
<p>EmbeddedArtifact represents a base64 encoded artifact.</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>type</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>name</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>id</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
</tbody>
</table>
### ErrNameUndefined 
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>ArtifactName</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
</tbody>
</table>
### FindArtifactsFromResource 
(__Appears on:__
<a href="#stageunion">StageUnion</a>)
<p>FindArtifactsFromResource represents the stage of the same name in Spinnaker.</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>account</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>app</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>cloudProvider</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>location</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>manifestName</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>mode</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
</tbody>
</table>
### Jitter 
(__Appears on:__
<a href="#restrictedexecutionwindow">RestrictedExecutionWindow</a>)
<p>Jitter TODO description</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>enabled</code><br />
<em>
bool
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>maxDelay</code><br />
<em>
int
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>minDelay</code><br />
<em>
int
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>skipManual</code><br />
<em>
bool
</em>
</td>
<td>
</td>
</tr>
</tbody>
</table>
### JudgmentInput 
<p>JudgmentInput TODO description</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>value</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
</tbody>
</table>
### JudgmentMessage 
(__Appears on:__
<a href="#manualjudgmentnotification">ManualJudgmentNotification</a>)
<p>JudgmentMessage TODO description</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>manualJudgmentContinue</code><br />
<em>
<a href="#judgmentmessagevalue">
JudgmentMessageValue
</a>
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>manualJudgmentStop</code><br />
<em>
<a href="#judgmentmessagevalue">
JudgmentMessageValue
</a>
</em>
</td>
<td>
</td>
</tr>
</tbody>
</table>
### JudgmentMessageValue 
(__Appears on:__
<a href="#judgmentmessage">JudgmentMessage</a>)
<p>JudgmentMessageValue TODO description</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>text</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
</tbody>
</table>
### JudgmentState (<code>string</code> alias)
<p>JudgmentState TODO description</p>
### KubernetesKind (<code>string</code> alias)
(__Appears on:__
<a href="#deletemanifest">DeleteManifest</a>, 
<a href="#undorolloutmanifest">UndoRolloutManifest</a>)
<p>KubernetesKind comes from the Object spinnakerKindMap in call: <a href="http://localhost:8084/credentials?expand=true">http://localhost:8084/credentials?expand=true</a>.
Also this can be found in class  /clouddriver/clouddriver-kubernetes-v2/src/main/java/com/netflix/spinnaker/clouddriver/kubernetes/v2/description/manifest/KubernetesKind.java</p>
### LabelSelector 
(__Appears on:__
<a href="#deletemanifest">DeleteManifest</a>)
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>selectors</code><br />
<em>
<a href="#selector">
[]Selector
</a>
</em>
</td>
<td>
</td>
</tr>
</tbody>
</table>
### ManualJudgment 
(__Appears on:__
<a href="#stageunion">StageUnion</a>)
<p>ManualJudgment TODO description</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>name</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>failPipeline</code><br />
<em>
bool
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>instructions</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>judgmentInputs</code><br />
<em>
<a href="#[]github.com/armory-io/pacrd/api/v1alpha1.judgmentinput">
[]github.com/armory-io/pacrd/api/v1alpha1.JudgmentInput
</a>
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>stageTimeoutMs</code><br />
<em>
int
</em>
</td>
<td>
<p>No, the json annotation is not spelled incorrectly.</p>
</td>
</tr>
<tr>
<td>
<code>sendNotifications</code><br />
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>notifications</code><br />
<em>
<a href="#manualjudgmentnotification">
[]ManualJudgmentNotification
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
</tbody>
</table>
### ManualJudgmentNotification 
(__Appears on:__
<a href="#manualjudgment">ManualJudgment</a>)
<p>ManualJudgmentNotification TODO description</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>type</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>address</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>level</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>message</code><br />
<em>
<a href="#judgmentmessage">
JudgmentMessage
</a>
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>when</code><br />
<em>
<a href="#[]github.com/armory-io/pacrd/api/v1alpha1.judgmentstate">
[]github.com/armory-io/pacrd/api/v1alpha1.JudgmentState
</a>
</em>
</td>
<td>
</td>
</tr>
</tbody>
</table>
### MatchArtifact 
(__Appears on:__
<a href="#artifact">Artifact</a>)
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>type</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>properties</code><br />
<em>
<a href="https://godoc.org/k8s.io/apimachinery/pkg/runtime#RawExtension">
k8s.io/apimachinery/pkg/runtime.RawExtension
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
</tbody>
</table>
### Moniker 
(__Appears on:__
<a href="#deploymanifest">DeployManifest</a>)
<p>Moniker TODO</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>app</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
</tbody>
</table>
### OptionValue 
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>value</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
</tbody>
</table>
### Options 
(__Appears on:__
<a href="#deletemanifest">DeleteManifest</a>)
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>cascading</code><br />
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>gracePeriodSeconds</code><br />
<em>
int
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
</tbody>
</table>
### Parameter 
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>default</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>description</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>hasOptions</code><br />
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>label</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>name</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>options</code><br />
<em>
<a href="#[]github.com/armory-io/pacrd/api/v1alpha1.optionvalue">
[]github.com/armory-io/pacrd/api/v1alpha1.OptionValue
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>pinned</code><br />
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>required</code><br />
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
</tbody>
</table>
### Permissions 
<p>Permissions maps actions inside Spinnaker to authenticated roles that can take them.</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>READ</code><br />
<em>
[]string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Read grants the defined roles the ability to read an application and its pipelines.</p>
</td>
</tr>
<tr>
<td>
<code>WRITE</code><br />
<em>
[]string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Write grants the defined roles the ability to modify an application and its pipelines.</p>
</td>
</tr>
<tr>
<td>
<code>EXECUTE</code><br />
<em>
[]string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Execute grants the defined roles the ability to execute an application&rsquo;s pipelines.</p>
</td>
</tr>
</tbody>
</table>
### Pipeline 
<p>Pipeline is the Schema for the pipelines API</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>spec</code><br />
<em>
<a href="#pipelinespec">
PipelineSpec
</a>
</em>
</td>
<td>
<br/>
<br/>
<table>
<tr>
<td>
<code>application</code><br />
<em>
string
</em>
</td>
<td>
<p>Application is a reference to the application that owns this pipeline.</p>
</td>
</tr>
<tr>
<td>
<code>description</code><br />
<em>
string
</em>
</td>
<td>
<p>Description tells the user what this pipeline is for.</p>
</td>
</tr>
<tr>
<td>
<code>parameterConfig</code><br />
<em>
<a href="#[]github.com/armory-io/pacrd/api/v1alpha1.parameter">
[]github.com/armory-io/pacrd/api/v1alpha1.Parameter
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>expectedArtifacts</code><br />
<em>
<a href="#[]github.com/armory-io/pacrd/api/v1alpha1.artifact">
[]github.com/armory-io/pacrd/api/v1alpha1.Artifact
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>executionEngine</code><br />
<em>
string
</em>
</td>
<td>
<p>ExecutionEngine TODO</p>
</td>
</tr>
<tr>
<td>
<code>allowParallelExecutions</code><br />
<em>
bool
</em>
</td>
<td>
<p>AllowParallelExecutions TODO</p>
</td>
</tr>
<tr>
<td>
<code>limitConccurent</code><br />
<em>
bool
</em>
</td>
<td>
<p>LimitConcurrent TODO</p>
</td>
</tr>
<tr>
<td>
<code>keepWaitingPipelines</code><br />
<em>
bool
</em>
</td>
<td>
<p>KeepWaitingPipelines TODO</p>
</td>
</tr>
<tr>
<td>
<code>stages</code><br />
<em>
<a href="#stageunion">
[]StageUnion
</a>
</em>
</td>
<td>
<p>Stages TODO</p>
</td>
</tr>
</table>
</td>
</tr>
</tbody>
</table>
### PipelineStatus 
(__Appears on:__
<a href="#pipeline">Pipeline</a>)
<p>PipelineStatus defines the observed state of Pipeline</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>lastConfigured</code><br />
<em>
<a href="https://kubernetes.io/docs/reference/generated/kubernetes-api/v1.13/#time-v1-meta">
Kubernetes meta/v1.Time
</a>
</em>
</td>
<td>
<p>LastConfigured represents the last time the operator updated this pipeline in Spinnaker.</p>
</td>
</tr>
<tr>
<td>
<code>phase</code><br />
<em>
<a href="#pipelinephase">
PipelinePhase
</a>
</em>
</td>
<td>
<p>Phase is the current phase of pipeline reconciliation.</p>
</td>
</tr>
<tr>
<td>
<code>url</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>id</code><br />
<em>
string
</em>
</td>
<td>
<p>ID represents the Spinnaker generated id for this pipeline</p>
</td>
</tr>
</tbody>
</table>
### Precondition 
<p>Precondition TODO likely needs to be refined to support more than expressions</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>context</code><br />
<em>
<a href="#context">
Context
</a>
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>failPipeline</code><br />
<em>
bool
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>type</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
</tbody>
</table>
### RestrictedExecutionWindow 
(__Appears on:__
<a href="#stageunion">StageUnion</a>)
<p>RestrictedExecutionWindow TODO description</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>days</code><br />
<em>
[]int
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>jitter</code><br />
<em>
<a href="#jitter">
Jitter
</a>
</em>
</td>
<td>
<p>TODO candidate for further validation</p>
</td>
</tr>
<tr>
<td>
<code>whitelist</code><br />
<em>
<a href="#whitelistwindow">
[]WhiteListWindow
</a>
</em>
</td>
<td>
</td>
</tr>
</tbody>
</table>
### Selector 
(__Appears on:__
<a href="#labelselector">LabelSelector</a>)
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>key</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>kind</code><br />
<em>
<a href="#selectorskind">
SelectorsKind
</a>
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>values</code><br />
<em>
[]string
</em>
</td>
<td>
</td>
</tr>
</tbody>
</table>
### SelectorsKind (<code>string</code> alias)
(__Appears on:__
<a href="#selector">Selector</a>)
<p>This value comes from: /clouddriver/clouddriver-kubernetes-v2/src/main/java/com/netflix/spinnaker/clouddriver/kubernetes/v2/security/KubernetesSelector.java</p>
### Source (<code>string</code> alias)
(__Appears on:__
<a href="#deploymanifest">DeployManifest</a>)
<p>Source represents the kind of DeployManifest stage is defined.</p>
### SpinnakerMatchArtifact 
<p>SpinnakerMatchArtifact represents TODO</p>
### StageEnabled 
(__Appears on:__
<a href="#stageunion">StageUnion</a>, 
<a href="#webhook">Webhook</a>)
<p>StageEnabled represents whether this stage is active in a pipeline graph.</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>type</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>expression</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
</tbody>
</table>
### StageUnion 
<p>Stage is a union type that encompasses strongly typed stage defnitions.</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>type</code><br />
<em>
<a href="#stageuniontype">
StageUnionType
</a>
</em>
</td>
<td>
<p>Type represents the type of stage that is described.</p>
</td>
</tr>
<tr>
<td>
<code>name</code><br />
<em>
string
</em>
</td>
<td>
<p>Name is the name given to this stage.</p>
</td>
</tr>
<tr>
<td>
<code>refId</code><br />
<em>
string
</em>
</td>
<td>
<p>RefID is the position in the pipeline graph that this stage should live. Usually monotonically increasing for a pipeline.</p>
</td>
</tr>
<tr>
<td>
<code>requisiteStageRefIds</code><br />
<em>
[]string
</em>
</td>
<td>
<em>(Optional)</em>
<p>RequisiteStageRefIds is a list of RefIDs that are required before this stage can run.</p>
</td>
</tr>
<tr>
<td>
<code>stageEnabled</code><br />
<em>
<a href="#stageenabled">
StageEnabled
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>StageEnabled represents whether this stage is active in a pipeline graph.</p>
</td>
</tr>
<tr>
<td>
<code>comments</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>Comments provide additional context for this stage in the Spinnaker UI.</p>
</td>
</tr>
<tr>
<td>
<code>restrictExecutionDuringTimeWindow</code><br />
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
<p>RestrictExecutionDuringTimeWindow provides the ability to restrict the hours during which this stage can run.</p>
</td>
</tr>
<tr>
<td>
<code>restrictedExecutionWindow</code><br />
<em>
<a href="#restrictedexecutionwindow">
RestrictedExecutionWindow
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>RestrictedExecutionWindow provides the ability to restrict the hours during which this stage can run.</p>
</td>
</tr>
<tr>
<td>
<code>skipWindowText</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
<p>SkipWindowText is the text to display when this stage is skipped.</p>
</td>
</tr>
<tr>
<td>
<code>bakeManifest</code><br />
<em>
<a href="#bakemanifest">
BakeManifest
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>BakeManifest renders a Kubernetes manifest to be applied to a target cluster at a later stage. The manifests can be rendered using HELM2 or Kustomize.</p>
</td>
</tr>
<tr>
<td>
<code>findArtifactsFromResource</code><br />
<em>
<a href="#findartifactsfromresource">
FindArtifactsFromResource
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>manualJudgment</code><br />
<em>
<a href="#manualjudgment">
ManualJudgment
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>ManualJudgment stage pauses pipeline execution until there is approval from a human through the UI or API call that allows the execution to proceed.</p>
</td>
</tr>
<tr>
<td>
<code>deleteManifest</code><br />
<em>
<a href="#deletemanifest">
DeleteManifest
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>DeleteManifest removes a manifest or a group of manifests from a target Spinnaker cluster based on names, deployment version or labels.</p>
</td>
</tr>
<tr>
<td>
<code>checkPreconditions</code><br />
<em>
<a href="#checkpreconditions">
CheckPreconditions
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>CheckPreconditions allows you to test values from the pipeline&rsquo;s context to determine wether to proceed, pause, or terminate the pipeline execution</p>
</td>
</tr>
<tr>
<td>
<code>deployManifest</code><br />
<em>
<a href="#deploymanifest">
DeployManifest
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>DeployManifest deploys a Kubernetes manifest to a target Kubernetes cluster. Spinnaker will periodically check the status of the manifest to make sure the manifest converges on the target cluster until it reaches a timeout</p>
</td>
</tr>
<tr>
<td>
<code>webhook</code><br />
<em>
<a href="#webhook">
Webhook
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>Webhook allows you to make quick API calls to an external system as part of a pipeline</p>
</td>
</tr>
<tr>
<td>
<code>undoRolloutManifest</code><br />
<em>
<a href="#undorolloutmanifest">
UndoRolloutManifest
</a>
</em>
</td>
<td>
<em>(Optional)</em>
<p>UndoRolloutManifest rolls back a Kubernetes manifest to a previous version.</p>
</td>
</tr>
</tbody>
</table>
### StageUnionType (<code>string</code> alias)
(__Appears on:__
<a href="#stageunion">StageUnion</a>)
<p>StageUnionType is an alias for the type name of the pipeline&rsquo;s stage.</p>
### StatusUrlResolution (<code>string</code> alias)
(__Appears on:__
<a href="#webhook">Webhook</a>)
<p>StatusUrlResolution will poll a status url to determine the progress of the stage.</p>
### TargetCriteria (<code>string</code> alias)
(__Appears on:__
<a href="#deletemanifest">DeleteManifest</a>)
<p>These values can be found in: /clouddriver/clouddriver-kubernetes-v2/src/main/java/com/netflix/spinnaker/clouddriver/kubernetes/v2/controllers/ManifestController.java</p>
### UndoRolloutManifest 
(__Appears on:__
<a href="#stageunion">StageUnion</a>)
<p>UndoRolloutManifest is a stage that rolls back a manifest.</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>account</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>cloudProvider</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>location</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>numRevisionsBack</code><br />
<em>
int
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>mode</code><br />
<em>
<a href="#undorolloutmanifestmode">
UndoRolloutManifestMode
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>targetName</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>kind</code><br />
<em>
<a href="#kuberneteskind">
KubernetesKind
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
</tbody>
</table>
### UndoRolloutManifestMode (<code>string</code> alias)
(__Appears on:__
<a href="#undorolloutmanifest">UndoRolloutManifest</a>)
<p>UndoRolloutManifestMode is the means for undoing a manifest rollout.</p>
### UnknownArtifact 
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>type</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>properties</code><br />
<em>
map[string]interface{}
</em>
</td>
<td>
</td>
</tr>
</tbody>
</table>
### Webhook 
(__Appears on:__
<a href="#stageunion">StageUnion</a>)
<p>Webhook represents a webhook stage in Spinnaker.
NOTE: notifications currently not supported for this stage.</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>url</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>method</code><br />
<em>
string
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>failOnFailedExpressions</code><br />
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>expectedArtifacts</code><br />
<em>
<a href="#artifact">
[]Artifact
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>stageEnabled</code><br />
<em>
<a href="#stageenabled">
StageEnabled
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>cancelEndpoint</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>cancelMethod</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>cancelPayload</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>canceledStatuses</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>customHeaders</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>payload</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>progressJsonPath</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>retryStatusCodes</code><br />
<em>
[]int
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>failFastStatusCodes</code><br />
<em>
[]int
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>statusJsonPath</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>statusUrlResolution</code><br />
<em>
<a href="#statusurlresolution">
StatusUrlResolution
</a>
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>successStatuses</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>terminalStatuses</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>waitBeforeMonitor</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>waitForCompletion</code><br />
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>statusUrlJsonPath</code><br />
<em>
string
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
<tr>
<td>
<code>signalCancellation</code><br />
<em>
bool
</em>
</td>
<td>
<em>(Optional)</em>
</td>
</tr>
</tbody>
</table>
### WhiteListWindow 
(__Appears on:__
<a href="#restrictedexecutionwindow">RestrictedExecutionWindow</a>)
<p>WhiteListWindow TODO description</p>
<table>
<thead>
<tr>
<th>Field</th>
<th>Description</th>
</tr>
</thead>
<tbody>
<tr>
<td>
<code>endHour</code><br />
<em>
int
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>endMin</code><br />
<em>
int
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>startHour</code><br />
<em>
int
</em>
</td>
<td>
</td>
</tr>
<tr>
<td>
<code>startMin</code><br />
<em>
int
</em>
</td>
<td>
</td>
</tr>
</tbody>
</table>
<hr/>
<p><em>
Generated with <code>gen-crd-api-reference-docs</code>
on git commit <code>5c79111</code>.
</em></p>
