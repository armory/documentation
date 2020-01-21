---
layout: post
title: AWS QuickStart Step 3
order: 2
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

# Armory Spinnaker AWS Quickstart - Step 3 
## Deploy to EC2 and EKS

### First, login to your Minnaker GUI.  You can access it by getting the Public IP address from your AWS Console.

If you have forgotten the password to your Minnaker instance you can always use this command when SSH'd into the Minnaker instance (Not inside the Halyard Container)

```code
cat /etc/spinnaker/.hal/.secret/spinnaker_password
```

1. Create Application called **QuickStart** by clicking "**Applications**" tab > "**Action**" (top right) > "**Create New App**" with the following Settings

![No CREATE Permission](/New-App.png)
  
2. Go into Application **QuickStart** and create first pipeline to deploy and EC2 instance
3. Click **Add Stage +** and search for a **Bake** stage to bake AMI
4. Select the AWS Region you would like to deploy in
5. Click **Add Server Group** and configure basic AMI bake settings (Account, Region, Subnet, Instance Type, and AWS SSH key)
6. Click **Done** and then **Save Changes** in the bottom right corner
7. Click **Add Stage** and add another stage called **Deploy** for AWS EC2
8. Click the "**Back to Execution**" button on the top left of the Pipeline Name
9. Run your Pipeline and Validate!  The end result will be an Auto Scaling Group build within your AWS subnet.

### EC2 Pipeline and deployment

![No CREATE Permission](/Deploy-to-EC2.png)

### Note - Don't mind the red dot in the Bake Stage.  It's informational suggesting a CI Trigger should be configured for a Bake Stage to ensure you are deploying the latest code and artifacts

![No CREATE Permission](/AutoScale-Group.png)

### EKS deployment 

**Note** As a prerequisite create a "quickstart" namespace in EKS with this command.

```code 
kubectl create ns quickstart
```

![No CREATE Permission](/Deploy-Service-EKS.png)

1. Navigate to the pipeline page within your **QuickStart** application
2. Click **Create** button in top right corner
3. Give the name **Deploy-to-EKS** 
4. Click **Add Stage** and Search / Select **Deploy(Manifest)** 
5. Select the **kubeconfig-sa-eks** account created in Step 2
6. Select the **quickstart** namespace
7. Scroll down and paste in the **Deployment** yaml below
8. Click **Save Changes** in the bottom right corner
9. Now create another stange after the **Deployment** stage.  Again select **Deploy(Manifest)**
10. Select the **kubeconfig-sa-eks** account and the **quickstart** namespace for deployment
11. Scroll down and paste in the **Service** yaml below
12. Click **Save Changes** 

## Time to run your EKS pipeline and validate

- Click back to the pipeline page using the **Back to Executions** to the left of the pipeline name
- Click on the **Start Manual Execution** on the new pipeline, then click **Execution Details** to see pipeline in action

Deployment yaml definition (copy and paste into text field in 1st Deploy Manifest stage)

```yaml 
apiVersion: apps/v1
kind: Deployment
metadata:
  name: my-nginx
spec:
  replicas: 2
  selector:
    matchLabels:
      run: my-nginx
  template:
    metadata:
      labels:
        run: my-nginx
    spec:
      containers:
        - image: nginx
          name: my-nginx
          ports:
            - containerPort: 80
```

Service yaml for last Deployment Stage (copy and paste into text field in 2nd Deploy Manifest stage)

``` json
apiVersion: v1
kind: Service
metadata:
  labels:
    run: my-nginx
  name: my-nginx
spec:
  ports:
    - port: 80
      protocol: TCP
      targetPort: 80
  selector:
    run: my-nginx
  type: LoadBalancer
```
## Validation in EKS and in Spinnaker

- In EKS run **kubectl get pods -n quickstart** to see nginx pods being created
- In Spinnaker navigate to the Applications page and see the deployment + Containers there
- Also, See the Ingress Service that was created to allow public access to your new deployment.
- Copy and paste FQDN provided by AWS to test nginx landing page

![No CREATE Permission](/kubectl-validate.png)

![No CREATE Permission](/Deployment-Validation.png)

# Congratulations!

You have completed the Armory Spinnaker QuickStart exercise!  You can now deploy to AWS using Spinnaker.  What's Next?

- Connect your Spinnaker instance to your repositories / artifacts (Github, Sonatype, Artifactory, DockerHub, ECR, GCR, etc)
- Build in a automated trigger from your CI systems (Jenkins, Bamboo, CircleCI, TravisCI, Nexus, Git, Generic Webhook, etc)
- Integrate with 3rd party systems (OKTA, Sumo Logic, Splunk, Datadog, Newrelic, Slack, etc)
- Integrate with DevSecOps tools (Xray, ChaosMonkey, Artifiactory, etc)

To get expert help in any of the areas above you can contact Armory.io at https://go.armory.io/needs-analysis

[![alt text](/images/Armory-AWS-Step-3.png)](https://youtu.be/epKXV2FIm6Y "title")
