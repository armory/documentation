---
layout: post
title: Okta Integration
order: 70
published: True
---

{% include components/legacy_documentation.html %}

Okta is a authorization and authentication service provider using SAML.

To configure Spinnaker to use Okta, you will need to:

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Configure a Spinnaker Application in Okta

Select Applications -> Applications from the top menu.
![Applications Screen](/assets/images/okta-applications.png)

Click the green "Add Application" button.
![AddApplicationButton](/assets/images/okta-addapplication.png)

Click the green "Create New App" button.
![CreateNewApp](/assets/images/okta-createnewapp.png)

In the dialog "Create a New Application Integration", select the following values:

* select Platform -> Web
* select Sign on method -> SAML 2.0

Then hit the green "Create" button.

![CreateNewIntegration](/assets/images/okta-createnewintegration.png)


On "Create SAML Integration" (1) General Settings  page,
Enter an app name for your Spinnaker app. For this example, we are using the name OktaSpinnaker.

Then hit the green "Next" button.
![CreateNewIntegration](/assets/images/okta-appname.png)

On the Configure SAML page, configure the following settings -

* Single sign on URL -> Enter the URL for your Gate service, with the path /saml/SSO;
  For this example, we are using the URL https://oktaspinnaker.spinnaker.armory.io:8084/saml/SSO

* Audience URI (SP Entity ID) -> Enter a unique entity id; In this example, we are using io.armory.spinnaker:oktatest

* Name ID format -> In this example, we are using "EmailAddress"

* Application username -> In this example, we are using "Email"


In the GROUP ATTRIBUTE STATEMENTS (OPTIONAL) section:

* name = memberOf, name format = Unspecified, Filter - Regex: .* (a period followed by an asterisk)

Then, hit the green "Next" button
![SamlSettings](/assets/images/okta-samlsettings.png)

On the Create SAML Integration Feedback page,
Select the "I'm an Okta customer adding an internal app" button,
then Hit the green "Finish" button.
![Feedback](/assets/images/okta-feedback.png)


This takes you to the "Sign On" tab of the application you just created.

You can navigate back to this page by going to applications -> applicationName -> Sign On tab.
Click the button "View Setup Instructions".  This will display the page with configuration information
necessary to configure Spinnaker.
![ViewSetupInstructions](/assets/images/okta-viewsetupinstructions.png)

Save the (Optional 1) IDP metadata file, you will use this to configure spinnaker.
![IDPmetadata](/assets/images/okta-idpmetadata.png)

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
