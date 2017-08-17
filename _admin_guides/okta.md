---
layout: post
title: Okta Integration
order: 70
published: True
---

Okta is a authorization and authentication service provider using SAML.

To configure Spinnaker to use Okta, you will need to:

* Configure a Spinnaker application in your Okta control panel
* Configure your Spinnaker installation to use Okta

## Configure a Spinnaker Application in Okta

Select Applications -> Applications from the top menu.

    Screenshot of Applications -> Applications top menu

Click the green "Add Application" button.

    Screenshot of "Add Application" button;

Click the green "Create New App" button.

    Screenshot showing "Create New App" button;

In the dialog "Create a New Application Integration", select the following values:

* select Platform -> Web
* select Sign on method -> SAML 2.0

Then hit the green "Create" button.

    Screenshot showing the selection of these dialog values


On "Create SAML Integration" (1) General Settings  page,
Select the app name. For this example, we are using the name OktaSpinnaker.

Then hit the green "Next" button.

    Screenshot of App Name selection & configuration

On the "Create SAML Integration" (2) Configure SAML" page,
configure the following settings -

In the (A) SAML Settings area under the "GENERAL" heading, configure the following settings -

* Single sign on URL -> Enter the URL for your Gate service, with the path /saml/SSO;
  For this example, we are using the URL https://oktaspinnaker.spinnaker.armory.io:8084/saml/SSO

* Audience URI (SP Entity ID) -> Enter a unique entity id; In this example, we are using io.armory.spinnaker:oktatest

* Default RelayState -> leave blank

* Name ID format -> In this example, we are using "EmailAddress"

* Application username -> In this example, we are using "Email"


In the GROUP ATTRIBUTE STATEMENTS (OPTIONAL) section:

* name = memberOf, name format = Unspecified, Filter - Regex: .*

Hit the green "Next" button

    Screenshot of ENTIRE GENERAL settings page

On the "Create SAML Integration" (3) Feedback page:

   Select the "I'm an Okta customer adding an internal app" button;

Hit the green "Finish" button

    Screenshot of "memberOf" setting & Finsh button


This takes you to the "Sign On" tab of the application you just created.

You can navigate back to this page by going to applications -> <applicationName> -> "Sign On" tab.

    Screenshot that includes "View Setup Instructions" button

Click the button "View Setup Instructions".  This will display the page with configuration information
necessary to configure Spinnaker.

    Screenshot with Sample Configuration Information

Save the (Optional 1) IDP metadata file, you will use this to configure spinnaker.

    Screenshot of the displayed metadata file


## Configure Spinnaker to use Okta for authorization and authentication

To configure Spinnaker to Okta for authorization and authentication, you must do
three things.

### #1: Install the IDP metadata file

Copy the IDP metadata file you saved to /opt/spinnaker/config/metadata.yml.

### #2: Create a SAML keystore file

Generate a keystore and key with some password:

    keytool -genkey -v -keystore /opt/spinnaker/config/saml.jks -alias saml -keyalg RSA -keysize 2048 -validity 10000

### #3: Configure gate-local.yml to use SAML

Create or add the following settings to the file /opt/spinnaker/config/gate-local.yml:

    saml:
      enabled: true
      metadataUrl: file:/opt/spinnaker/config/metadata.xml
      keyStore: file:/opt/spinnaker/config/saml.jks
      keyStorePassword: <INSERT PASSWORD HERE>
      keyStoreAliasName: saml
      issuerId: io.armory.spinnaker:oktatest
      redirectHostname: <YOUR-GATE-HOSTNAME>:8084


For example:

    saml:
      enabled: true
      metadataUrl: file:/opt/spinnaker/config/metadata.xml
      keyStore: file:/opt/spinnaker/config/saml.jks
      keyStorePassword: spinnaker
      keyStoreAliasName: saml
      issuerId: io.armory.spinnaker:oktatest
      redirectHostname: oktatest.spinnaker.armory.io:8084
