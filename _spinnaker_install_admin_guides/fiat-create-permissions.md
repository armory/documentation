---
layout: post
title: Restrict Application Creation
order: 210
published: true
---

Configure Fiat, the Spinnaker microservice responsible for authorization (authz), to control which users can create applications. This guide focuses on the `prefix` source to control permissions for any applications whose name starts with a given prefix. 

## Requirements

* Armory Spinnaker 2.17 (OSS 1.17) or later
* Fiat must be enabled and configured to work with an identity provider. For more information, see [Authorization (RBAC)](https://www.spinnaker.io/setup/security/authorization/). 

## Guidelines

When managing roles for Spinnaker, keep the following in mind:
* Roles are case insensitive. All roles are changed to lowercase in Fiat's internal model.
* You must explicitly configure permissions for each user role. The default for a user role is no permissions, which means it cannot perform any actions.


## Restrict application creation

Perform the following steps:

1. Add the line `auth.permissions.provider.application: aggregate` to `SpinnakerService` manifest under key `spec.spinnakerConfig.profiles.fiat` if you are using Operator to deploy Spinnaker, or to `fiat-local.yml` if you are using Halyard.
2. Add prefixes as a source:

    ```
    auth.permissions.source.application.prefix:
      enabled: true
    ```
3. Define the permissions for a prefix:
    
    ```
    - prefix: <some_prefix>
      permissions:
       READ:
       - "<user role 1>"
       - "<user role 2>"
       - "<user role n>"
       WRITE:
       - "<user role n>"
       EXECUTE:
       - "user role n>"
   ```
   
    Here is an example configuration with in-line comments:

    ```yaml
    apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
    kind: SpinnakerService
    metadata:
      name: spinnaker
    spec:
      spinnakerConfig:  
        profiles:
          fiat: # Below section maps to fiat-local.yml if using Halyard
            # Enables Fiat to read from new sources.
            auth.permissions.provider.application: aggregate
            # Sets `prefix` as one of these new sources
            auth.permissions.source.application.prefix:
              enabled: true
              prefixes:
                # Defines the prefix `apptest-x`. 
              - prefix: "apptest-*"
                permissions:
                  # Defines permission requirements for all applications that match the prefix `apptest-*` based on roles.
                  # role-one and role-two have READ permission 
                  READ:
                  - "role-one"
                  - "role-two"
                  # role-one has write permission
                  WRITE:
                  - "role-one"
                  # role-one has execute permission
                  EXECUTE:
                  - "role-one"
    ```

    As a result, any application that matches the prefix `apptest-*` has restrictions on who can perform actions. For example, a user with the user role `role-two` only has `READ` permission.<br>

4. To restrict application creation specifically, add `fiat.restrictApplicationCreation` at the top of fiat config and set it to `true`.

    **Note: Currently, the prefix source is the only source that support the CREATE permission.**

    The following example builds upon the example from the previous steps. In-line comments describe additions:

    ```yaml
    apiVersion: spinnaker.armory.io/{{ site.data.versions.operator-extended-crd-version }}
    kind: SpinnakerService
    metadata:
      name: spinnaker
    spec:
      spinnakerConfig:  
        profiles:
          fiat: # Below section maps to fiat-local.yml if using Halyard
            # Add CREATE as a permission
            fiat.restrictApplicationCreation: true
            auth.permissions.provider.application: aggregate
            auth.permissions.source.application.prefix:
              enabled: true
              prefixes:
              - prefix: "*"
                permissions:
                  # Assign CREATE permission to role-one
                  CREATE:
                  - "role-one"
                  READ:
                  - "role-one"
                  - "role-two"
                  WRITE:
                  - "role-one"
                  EXECUTE:
                  - "role-one"
    ```

    The above example assigns CREATE permission to users with the `role-one` role. Users without the `role-one` role cannot create any applications in Spinnaker.

5. Apply your configuration changes to Spinnaker by running the following command: `kubectl -n <spinnaker namespace> apply -f <SpinnakerService manifest>` if you are using Operator, or `hal deploy apply` if you are using Halyard.

The following screenshot shows what happens when a user without sufficient permissions attempts to create an application in Deck, Spinnaker's UI: 
![No CREATE Permission](/assets/images/authz_create_permission.png)
