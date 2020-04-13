---
layout: post
title: Okta Integration
order: 160
published: True
---


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


On "Create SAML Integration" page, enter an app name and hit the green "Next" button.
![CreateNewIntegration](/assets/images/okta-appname.png)

On the "Configure SAML page", configure the following settings:

* *Single sign on URL* -> Enter the URL for your Gate service, with the path /saml/SSO.
  For example, `https://oktaspinnaker.spinnaker.armory.io:8084/saml/SSO`

* *Audience URI (SP Entity ID)* -> Enter a unique entity id. For example, `io.armory.spinnaker.oktatest`

* *Name ID format* -> For example, "EmailAddress"

* *Application username* -> For example, "Email"


In the GROUP ATTRIBUTE STATEMENTS section:

* Name = memberOf, Name format = Unspecified, Filter = Regex: .*

Then, hit the green "Next" button
![SamlSettings](/assets/images/okta-samlsettings.png)

On the Create SAML Integration Feedback page, select the "I'm an Okta customer adding an internal app" button, then hit the green "Finish" button.
![Feedback](/assets/images/okta-feedback.png)


This takes you to the "Sign On" tab of the application you just created.

You can navigate back to this page by going to applications -> applicationName -> Sign On tab.
Click the button "View Setup Instructions".  This will display the page with configuration information
necessary to configure Spinnaker.
![ViewSetupInstructions](/assets/images/okta-viewsetupinstructions.png)

Under the "Optional" section near the bottom, copy the contents of IDP metadata and save to file. For example, under `/Users/armory/.hal/saml/metadata.xml`.
![IDPmetadata](/assets/images/okta-idpmetadata.png)

## Configure Spinnaker to use Okta

### 1: Create a SAML keystore file

Generate a keystore and key with some password:

```bash
KEYSTORE_PATH=/Users/armory/.hal/saml/saml.jks
keytool -genkey -v -keystore $KEYSTORE_PATH -alias saml -keyalg RSA -keysize 2048 -validity 10000
```

### 2: Configure spinnaker to use SAML

> Note: The value you enter for `issuerId` must match the value entered in "Audience URI (SP Entity ID)" when configuring the app in Okta

* **Operator**

    Add the following snippet to `SpinnakerService` manifest. This references secrets stored in a Kubernetes secrets in the same namespace as Spinnaker, but secrets can be stored in any of the supported [secret engines](/spinnaker-install-admin-guides/secrets):

    ```yaml
    apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
    kind: SpinnakerService
    metadata:
      name: spinnaker
    spec:
      spinnakerConfig:  
        config:
          security:
            authn:
              saml:
                enabled: true
                keyStore: encryptedFile:k8s!spin-secrets!k:saml.jks
                keyStoreAliasName: saml
                keyStorePassword: encrypted:k8s!spin-secrets!k:keystorePassword
                metadataLocal: encryptedFile:k8s!spin-secrets!k:metadata.xml
                issuerId: io.armory.spinnaker.oktatest # The identity of the Spinnaker application registered with the SAML provider.
                serviceAddress: https://<gate-URL>     # The address of the Gate server that will be accesible by the SAML identity provider. This should be the full URL, including port, e.g. https://gate.org.com:8084/. If deployed behind a load balancer, this would be the laod balancer's address.
    ```

    Create the kubernetes secret holding the spinnaker secrets:

    ```bash
    kubectl -n <spinnaker namespace> create secret generic spin-secrets \
        --from-file=saml.jks \
        --from-file=metadata.xml \
        --from-literal=keystorePassword=<password-entered-in-step-1>
    ```

    Apply the changes of `SpinnakerService` manifest:

    ```bash
    kubectl -n <spinnaker namespace> apply -f <SpinnakerService manifest>
    ```

* **Halyard**

    ```bash
    KEYSTORE_PATH=/Users/armory/.hal/saml/saml.jks
    KEYSTORE_PASSWORD=<password-entered-in-step-1>
    METADATA_PATH=/Users/armory/.hal/saml/metadata.xml
    SERVICE_ADDR_URL=https://<gate-URL>
    ISSUER_ID=io.armory.spinnaker.oktatest

    hal config security authn saml edit \
        --keystore $KEYSTORE_PATH \
        --keystore-alias saml \
        --keystore-password $KEYSTORE_PASSWORD \
        --metadata $METADATA_PATH \
        --issuer-id $ISSUER_ID \
        --service-address-url $SERVICE_ADDR_URL

    hal config security authn saml enable
    ```


## Troubleshooting

Make sure the dns are correctly pointing to the loadbalancers of gate-URL and deck-URL.

Verify that the gate-URL is the one entered in Okta with `:8084/saml/SSO` appended to it.

Validate that the service-addess-url in your configuration is the gate-URL.
