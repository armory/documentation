---
layout: post
title: AWS QuickStart Step 3
order: 4
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

Need help setting this up? - For a guided tutorial the **Video Walkthrough** at the bottom of this page.

## Prerequisite
Before you start, ensure that have completed the following requirements:
* Finish [AWS QuickStart Step 2](/spinnaker/Armory-Spinnaker-Quickstart-2)
  
## Deploy to EC2 and EKS

Before you start, you need to log in to Deck, the Spinnaker UI.

You can access it by navigating to the Public IP address of your instance in a browser. You can get the Public IP address from your AWS Console.

If you have forgotten the password to your Minnaker instance you can recover your password with the following steps:
1. SSH to the Minnaker host VM. Do not exec into the Halyard pod though.
2. Run the following command: 
    
   ```bash
   cat /etc/spinnaker/.hal/.secret/spinnaker_password
   ```
   
   The command returns the password for Minnaker.

After you log in to Deck, perform the following steps:

1. Create an Application called **QuickStart** by clicking "**Applications**" tab > "**Action**" (top right) > "**Create New App**" with the following Settings

    ![New app settings](/images/New-App.png)
  
1. Go into Application **QuickStart** and create your first pipeline. This pipeline will deploy to an EC2 instance.
2. Click **Add Stage +** and search for a **Bake** stage to bake an AMI.
3. Select the AWS Region you want to deploy to.
4. Click **Add Server Group** and configure basic AMI bake settings: Account, Region, Subnet, Instance Type, and AWS SSH key.
5. Click **Done** and then **Save Changes** in the bottom right corner.
6. Click **Add Stage** and add another stage called **Deploy** for AWS EC2.
7. Click the "**Back to Execution**" button on the top left of the Pipeline Name
8. Run your Pipeline and Validate!  The end result will be an Auto Scaling Group build within your AWS subnet.

### EC2 Pipeline and deployment

![No CREATE Permission](/images/Deploy-to-EC2.png)

**Note** - Don't mind the red dot in the Bake Stage.  It's an informational tip suggesting a CI Trigger should be configured for a Bake Stage to ensure you are deploying the latest code and artifacts.

![No CREATE Permission](/images/AutoScale-Group.png)

### EKS deployment 

**Note** As a prerequisite, create a "quickstart" namespace in EKS:

```bash 
kubectl create ns quickstart
```

![No CREATE Permission](/images/Deploy-Service-EKS.png)

1. Navigate to the pipeline page within your **QuickStart** application.
2. Click **Create** button in top right corner.
3. Give the name **Deploy-to-EKS**. 
4. Click **Add Stage** and Search / Select **Deploy(Manifest)**. 
5. Select the **kubeconfig-sa-eks** account created in Step 2.
6. Select the **quickstart** namespace.
7. Scroll down and paste in the **Deployment** yaml below.
8. Click **Save Changes** in the bottom right corner.
9. Now create another stange after the **Deployment** stage.  Again select **Deploy(Manifest)**.
10. Select the **kubeconfig-sa-eks** account and the **quickstart** namespace for deployment.
11. Scroll down and paste in the **Service** yaml below.
12. Click **Save Changes**.

## Time to run your EKS pipeline and validate

1. Click back to the pipeline page using the **Back to Executions** to the left of the pipeline name.
2. Click on the **Start Manual Execution** on the new pipeline. Then, click **Execution Details** to see pipeline in action.

**Deployment yaml definition**

Copy and paste the following example into the text field in the 1st Deploy Manifest stage.

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

**Service yaml for last Deployment Stage**

Copy and paste the following example into the text field in the 2nd Deploy Manifest stage.

```yaml
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

1. In EKS run the following commands to see nginx pods being created:  `kubectl get pods -n quickstart`.
2. In Deck, the Spinnaker UI, navigate to the **Applications** page and see the deployment and containers there.
    * Under **Load Balancers**, click on Apps to view the status of your service. 
    * In the Status section on the right of the page, locate the Ingress address that was created to allow public access to your new deployment.
3. Copy and paste the FQDN from the load balancer status section into a web browser to test the NGINX landing page.

![No CREATE Permission](/images/kubectl-validate.png)

![No CREATE Permission](/images/Deployment-Validation.png)

# Congratulations!

You completed the Armory Spinnaker QuickStart exercise!  You can now deploy to AWS using Spinnaker.  What's Next?

- Connect your Spinnaker instance to your repositories / artifacts (Github, Sonatype, Artifactory, DockerHub, ECR, GCR, etc).
- Build in a automated trigger from your CI systems (Jenkins, Bamboo, CircleCI, TravisCI, Nexus, Git, Generic Webhook, etc).
- Integrate with 3rd party systems (OKTA, Sumo Logic, Splunk, Datadog, Newrelic, Slack, etc).
- Integrate with DevSecOps tools (Xray, ChaosMonkey, Artifiactory, etc).

To get expert help in any of the areas above you can contact Armory.io at https://go.armory.io/needs-analysis

# AWS QuickStart Step 3 Video
<!-- blank line -->
<figure class="video_container">
  <iframe width="560" height="315" src="https://www.youtube.com/embed/Yi-2AZ5n_kA" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
</figure>
<!-- blank line -->