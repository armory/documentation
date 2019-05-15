---
layout: post
title: Configuring Slack Notifications
order: 87
---
This article describes how to configure Spinnaker to send Slack notifications.  
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Create A Slack Application
Go to the Apps Management URL and click on the “Create New App” button. Once done, you will get access to the basic configuration pane. You might want to customize some settings, like the color or the logo of your application at the bottom of it.

![Github Webhook](/images/slack-notifications-1.png)

## Create A Bot
Once the application has been created, you will create a Bot. Next, select the “Add features and functionality” menu and then select “Bots”.

Enter the following fields:

- The Bot Display Name
- The Bot Username
- The “Always Show My Bot as Online” to On

##  Deploy The Bot
Select the “Install your app to your workspace” from the Bot “Basic Information” page and deploy it. Then select the “OAuth & Permissions” menu and note the “Bot User OAuth Access Token”. That is the one starting with “xoxb-” like in the screenshot below:

![Github Webhook](/images/slack-notifications-2.png)

## Configure Halyard
In `halyard.yml`, configure the deployments you'd like to manage:

## Invite The Bot To A Channel

Spinnaker only requires to be able to publish on a channel to interact with Slack. All you have to do is connect to a channel or create a new channel and name the bot you’ve just created. Slack will propose to invite the bot. Accept the invitation.

## Register The Slack Token With spinnaker
You are now ready to configure Spinnaker with the bot you’ve just registered. Start by setting the variables below:

```bash
    export TOKEN_FROM_SLACK="xoxb-xxxxxxxx-xxxxxxxxxxxx-xxxxxxxxxxxxxxxxxxxxxxxx"
    export SLACK_BOT=spinnaker
```

Register the token and bot name in the configuration:

```bash
$ echo $TOKEN_FROM_SLACK | hal config notification slack edit --bot-name \
       $SLACK_BOT --token
```

Set the configuration that enables Slack:

```bash
$ hal config notification slack enable
```

Redeploy the configuration:

```bash
$ hal deploy apply
```

## Test Spinnaker
You should then make sure Spinnaker can send the notifications as expected. You can configure a notification within a channel you have invited your bot in and test by running a test pipeline. See example below:

![Github Webhook](/images/slack-notifications-3.png)
