---
layout: post
title: Slack
order: 81
published: False
---

## Configure Slack App

1. Go to [https://api.slack.com/apps](https://api.slack.com/apps) and Create New App.

  ![Create New App](https://dha4w82d62smt.cloudfront.net/items/0J0M08230j212s0M0k0q/%5B704dbb753f72c8e5569ef622cbf2d254%5D_Image+2018-03-27+at+1.37.31+PM.png)

2. In the dialog box, enter a name (we suggest "Armory Platform") and select your Slack Workspace.

  ![Set a Name](https://dha4w82d62smt.cloudfront.net/items/0D3K3v2d0A2B1L281k3Y/%5B5ded8cae50cb9fdf4f2d1135d37e16eb%5D_Image+2018-03-27+at+1.41.17+PM.png)

3. Copy the Verification Token while it's here; you'll need to add it to a configuration file later.  Feel free to customize "Display Information" as you'd like.

  ![Copy Token](https://dha4w82d62smt.cloudfront.net/items/0B0S3Q1Q0Y1k0G1L0e0m/%5Bdf8df474d66912f0b1e87620f9e219ee%5D_Image+2018-03-27+at+1.49.37+PM.png)

4. Expand "Add features and functionality" and select "Interactive Components":

  ![Interactive Components](https://dha4w82d62smt.cloudfront.net/items/0W252r300O0B0m3V0z14/Image%202018-03-27%20at%201.52.49%20PM.png)
  
5. Enter your Spinnaker address, port 10000, and the path `/slackback`:

  ![Request URL](https://dha4w82d62smt.cloudfront.net/items/422P0u042F1F0O3E1B1L/Image%202018-03-27%20at%201.54.42%20PM.png)

  Note that if you choose to use HTTPS, you'll need a valid SSL cert configured and terminated on your load balancer (see below, "Opening Ports")
  
6. Click on "Bot Users" and give your bot a username and a display name.

  ![Set up bot user](https://dha4w82d62smt.cloudfront.net/items/1A1Y441R1v331T190r0S/Image%202018-03-27%20at%201.57.44%20PM.png)
  
7. Click on "OAuth & Permissions", copy down the "Bot User OAuth Access Token" (we'll use this with the Verification Token in a configuration file), and then "Install App" (or "Reinstall App" if this isn't your first go-around!)

  ![Copy OAuth Token](https://dha4w82d62smt.cloudfront.net/items/3y1T0l222n1R290T0J1p/%5B6325cd5d7f24980af1b8722c02854668%5D_Image+2018-03-27+at+1.58.59+PM.png)

8. Go to the channel (or create one) you'd like your bot to use, and invite the bot's Slack account to join (it will not join by itself)

# Enabling Slack

Update your environment file in `/opt/spinnaker/env/` to enable the Armory
Platform with the following:
`PLATFORM_ENABLED=true`

## Configure Slack

Add a `config/platform-local.yml` file and be sure to fill out at least these
configuration items:

```
slack:
  channel:  <the Slack channel you want to use>
  apiToken:  <the Slack bot token>
  verificationToken:  <the Slack API verification token>
```

NOTE:  If you want to set the channel differently per-environment, you can set
the Slack channel in your `.env` file with `SLACK_CHANNEL=<channel>`. If you do this, you should remove the `channel:` line from the .yml file completely.

## Add Github
To be alerted to pull requests (PRs) that have been left open longer than expected, add this section to `config/platform-local.yml`:

```
github:
  apiCredentialsPath: <path to your github credentials file>
  organization: <Your Github org>
```

The Github credentials file is just a text file with one line, in the format <username>:<password-or-access-token>.

## Finally...

Restart Armory Spinnaker; if you are running a single node instance, you can do this from on the console:

```
service armory-spinnaker restart
```

Otherwise, you'll want to restart the whole cluster so the config changes are picked up.

# Opening Ports

If you are upgrading an existing Spinnaker installation, you'll need to add some ports to the load balancers serving your install.  HTTP listeners on port 10000 will need to be added to both the external and internal load balancers, and on the internal load balancer, you'll need to add a Listener for port 5001:

![Setup Listeners](https://dha4w82d62smt.cloudfront.net/items/0L1l2n2v3O2I0r1S0f3j/Image%202018-03-27%20at%202.15.37%20PM.png)

In order to take advantage of the interactive buttons the Armory Platform
puts into Slack, you will need to allow Slack to call back into the Platform
on port 10000 from any IP; Slack's API services are cloud-based and don't have a fixed set of IPs sending traffic.  Only Slack callbacks with properly configured tokens (see Verification Token, above) are accepted; a `/health` endpoint is also available to help test for connectivity.  If you are using Security Groups or other firewalls to limit access to specific IP addresses, an exception will need to be made for port 10000.

NOTE:  If you want to have Slack use HTTPS when calling back to your endpoint, you should configure your external loadbalancer to receive HTTPS from a port of your choice, but then map to HTTP on port 10000 internally.  The Slack callbacks won't work if Slack can't verify your SSL certificate.


