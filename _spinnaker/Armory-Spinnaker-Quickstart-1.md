---
layout: post
title: AWS QuickStart Step 1
order: 2
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

**Prerequisite** - Get your AWS Account number avaiable in a text editor, SSH into Minnaker Instance with AWS keys.

Need assistance setting this up? -  For a guided tutorial the **Video Walkthrough** at the bottom of this document.

# Armory Spinnaker AWS Quickstart - Step 1 
# Prep AWS by creating Roles, Permissions, and Trust

![No CREATE Permission](/imnages/AWS-Roles-Spinnaker.png)

### In this step we will configure 2 AWS Roles for Spinnaker to deploy to your AWS environment

1. Create - **"Spinnaker-Managed-Role"** in AWS Console

3. Bind **"PowerUserAccess"** to "Spinnaker-Managed-Role" in **Permissions**

4. **"PassRole-and-Certificate"** (inline policy for Spinnaker-Managed-Role)

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Action": [
              "iam:ListServerCertificates",
              "iam:PassRole"
            ],
            "Resource": [
                "*"
            ],
            "Effect": "Allow"
        }
    ]
}
```

5. Create - **"Spinnaker-Managing-Role"**

6. Bind **"PowerUserAccess"** to "Spinnaker-Managing-Role"

7. **"BaseIAM-PassRole"** (Create as inline policy on **"Spinnaker-Managing-Role"**)

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "ec2:DescribeAvailabilityZones",
                "ec2:DescribeRegions"
            ],
            "Resource": [
                "*"
            ]
        },
        {
            "Action": "sts:AssumeRole",
            "Resource": [
                "arn:aws:iam::[YOUR_AWS_ACCOUNT_ID]:role/DevSpinnakerManagedRole"
            ],
            "Effect": "Allow"
        }
    ]
}
```

8. Spinnaker-Managed-Role -> Trust relationship

#### Now "Spinnaker-Managed-Role" must have Trust relationship with "Spinnaker-Managing-Role" ####

```json
{
  "Version": "2012-10-17",
  "Statement": [
    {
      "Effect": "Allow",
      "Principal": {
        "AWS": "arn:aws:iam::[YOUR_AWS_ACCOUNT_ID]:role/Spinnaker-Managing-Role",
        "Service": [
          "ecs.amazonaws.com",
          "application-autoscaling.amazonaws.com",
          "ecs-tasks.amazonaws.com",
          "ec2.amazonaws.com"
        ]
      },
      "Action": "sts:AssumeRole"
    }
  ]
}
```

### Bind Spinnaker-Managing-Role to Minnaker Instance in AWS Console

1. Locate Minnaker EC2 instance in AWS Console and click 

    - UP top click "**Action**" > "**Instance Settings**" > "**Attach Replace IAM Role**".  

2. From Dropdown Find **Spinnaker-Managing-Role** and click the **Apply** Button to bind Role to Minnaker Instance.


## Login to your Minnaker EC2 Instance with SSH (Outside of Halyard Container)

### Validation Steps to assure Roles are configured correctly 

1. Download aws cli 

    **sudo snap install aws-cli --classic** \
    aws-cli 1.16.266 from Amazon Web Services (aws✓) installed

2. Validate Spinnaker Managing Role

```code
aws sts get-caller-identity 
```
Output should look like this:
```code
    ubuntu:~$ **aws sts get-caller-identity**
{
    "UserId": "AROA3SQXSP.............7893f355",
    "Account": "[YOUR_AWS_ACCOUNT_ID]",
    "Arn": "arn:aws:sts::[YOUR_AWS_ACCOUNT_ID]:assumed-role/Spinnaker-Managing-Role/i-0e.........7893f355"
}
```
3. Validate Spinnaker Managing Role can Assume Managing Role
```code
aws sts assume-role --role-arn arn:aws:iam::[YOUR_AWS_ACCOUNT_ID]:role/Spinnaker-Managed-Role --role-session-name test
```
Output should look like this:
```code
    ubuntu:~$ aws sts assume-role --role-arn arn:aws:iam::[YOUR_AWS_ACCOUNT_ID]:role/Spinnaker-Managed-Role --role-session-name test
{
    "Credentials": {
        "Expiration": "2020-01-09T01:03:05Z",
        "AccessKeyId": "AWS_ACCESS_KEY",
        "SecretAccessKey": "AWS_SECRET_ACCESS_KEY",
        "SessionToken": "FwoGZXIvYXdzEGEaDEyTECcALWUjAgy0GyKoAZ5PapC1qqFwN55X0vRISdtZh19mR3V9p3i5dGZugt3FQ4DNOamVgIG82I1qaspn83aBefdbpUtznN9fJxwPNoRhYinVgIXGdsTWnBuQ57U7s/cDoHosvV5+J3oZj8ffjLInzsI05IrRBiOTmqU3caEP/e+6N5nzHg/9+aS6TCWjCIzjL0mHtclBBQ7k/dijrg/5vTVFh8UGakcJL3SV6gaCHj0k6BUzEii529nwBTItq6/QISV8wfGNLQJOPDB5P3zoQkHjkpoWCEh1p0oc4hEwki8F7NutXNrg14W+"
    },
    "AssumedRoleUser": {
        "AssumedRoleId": "AROA3SQXSP6SGOWFHHJ7B:test",
        "Arn": "arn:aws:sts::[YOUR_AWS_ACCOUNT_ID]:assumed-role/Spinnaker-Managed-Role/test"
    }
}
ubuntu@:~$
```
### Congratulations! 
You have completed the 1st step in setting up the Spinnaker AWS Provider.  For Step-2 Please go Here.

[![alt text](/images/Armory-AWS-Step-1.png)](https://youtu.be/epKXV2FIm6Y "AWS QuickStart Step1")
