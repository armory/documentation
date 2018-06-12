---
layout: post
title: Jira Integration
order: 85
---
The Echo service handles all notifications, scheduled pipelines(e.g. cron jobs) and audit logging to an external sources.  By default it stores events in memory but can also be configured to store results in an external source like Redis.  It is also responsible for triggering pipelines based on one of the available trigger integrations or the result of an executing pipeline.

* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}

## Jira Stages

To enable the Jira Stages (Create, Transition, Update, and Comment), you'll
need to edit your `spinnaker-local.yml` to have the following section:

```yaml
features:
  jira:
    enabled: true
    basicAuthToken: dXNlcjpwYXNzCg==
    createIssueUrl:  https://myjira.atlassian.net/rest/api/2/issue/
```

The `basicAuthToken` is your Jira service account's username and password,
separated by a colon, and then base64'd.  This can be determined with this
this command line (tested on Ubuntu and Mac OS X):

```bash
echo "paul:mypass" | base64
```

The `createIssueUrl` is the API issue create endpoint for the Jira API.  The
example given should just need you to change out the "myjira" part (if you're
using hosted Jira).

After a restart/redeploy, you should see four additional stages available for
use in your pipelines:  "Jira: Create Issue", "Jira: Transition Issue",
"Jira: Update Issue" and "Jira: Add Comment".  The first stage creates an
issue in your Jira project, the latter three stages will automatically find
the ticket created in the first stage and act on it.

### Jira: Create Issue Stage

This stage will create a new ticket in Jira.  You'll need to set the Project
Key (this is the abbreviation for your project.  If your tickets are numbered
like "ENG-1234", you would put "ENG" here), and the Issue Type (depending on
your configuration, this would be something like "Task" or "Bug").

The Issue Summary and Issue Description fields map to the same fields in Jira.
SpEL substitutions are available in both of these fields, so the ticket can
be created with specific build information.

### Jira: Update Issue Stage

This stage allows you to reset the Issue Summary and Issue Description fields
of the previously-created ticket.  As with the Create stage, both of these
fields support SpEL substitutions.  Note that if a field is left blank here,
the Jira ticket field will be blanked out.

### Jira:  Add Comment Stage

This stage simply appends a comment to the previously-created ticket.  The
comment body supports SpEL substitutions.

### Jira:  Transition Issue Stage

The Transition Issue Stage attempts to transition the previously-created
ticket through the Workflow.  You will need to know the numeric ID of the
target stage for this to work.  You can find the numeric IDs for your
stages by Exporting your Jira Workflow to XML:
tags:

![Jira Workflow Export](https://cl.ly/0C0d1c0f0N2A/[d93b1dfc73914409c00446b1df79e6b0]_Image%202018-06-12%20at%209.43.07%20AM.png)

The workflow stage IDs are found in the `<global-actions>` section, in the
`<step>` tags.  In this example, you can see that setting the stage ID to
6 will transition the ticket to the "In Progress" workflow stage:

![Issue ID Example](https://cl.ly/203j3c3K1r3v/[eda500982c996a99a735551b5a4e52a4]_Image%202018-06-12%20at%209.50.32%20AM.png)

These IDs will be different for every workflow.  Note that if the workflow
disallows the transition from the current stage to the stage given, this
stage will fail.

## Updating Jira Tickets on Deploy

If you're using GitHub, you can also configure Spinnaker to update tickets
based on the git commits that have been included a Deploy.

To enable this feature, add the following to your `spinnaker-local.yml` file:

```yaml
features:
  jira:
    updatesEnabled: true
    login: system
    password: "My.Service.Account.Password"
    url: "https://myjira.atlassian.net/"
```

Set the `login` and `password` to your service account's credentials, and
tweak the `url` to be the base URL for your Jira instance.

You'll then need to configure your applications.  Edit (or create) your
`echo-local.yml` configuration file and add this section:

```yaml
github:
  enabled: true
  authToken: "12345670........0986321"

tickets:
  enabled: true
  applications:
    - applicationName: website
      gitHubOrg: armory
      gitHubRepoName: documentation
      # picks 348ac8f from a image tagged like: armory/example:master-348ac8f
      regexForShaInDockerTag: "(\\w+)$"
      updateFields:
        "Deployed Environments": "{account}:{application}-{stack}"
      addComment: "Deployed {application} to {stack} ({account})"
      transitions: [
        ["*", "Done"]
      ]
    # If you need to add another application, you can do it here...
    # - applicationName: otherapp
    #   ...
```

The `authToken` should be set to your GitHub access token so Spinnaker can
query your repositories for commit messages.

Under `tickets` you'll want to configure one (or more) applications; each
entry in the list can support the following keys:

* _`applicationName`_: The name of the application whose Deploy stages should trigger the updates.  This field is required.

These fields help identify the GitHub repo that should be checked for commits;
if you are triggering the pipeline from repo changes, these fields may not be
necessary, as the URL for the repo can be found in the trigger.  However, if
you're using containers or images as your trigger, the system will need to 
know what repository to check against, and how to discover the git hash (SHA)
from the image name.

* _`gitHubOrg`_: Your GitHub organization
* _`gitHubRepoName`_: The name of the repository in that organization
* _`regexForShaInDockerTag`_:  If using your image tag to maintain your git
SHA hash, you can identify a regular expression here to pick it out.  The
example above grabs all alphanumerics from the end of the name.  This regex
uses Java's regular expression syntax, the first capture (in the parens) is
expected to be the commit hash.

These fields define what action to take on the found tickets; they're all
optional, although at least one needs to be defined if any action is to be
taken.

* _`updateFields`_:  Within this section, you can identify a Jira field name
(in this example, we created a custom field named "Deployed Environments"),
and the value to set/add for those tickets identified in the git commit
messages (see below).
* _`addComment`_:  An option configuration; if present, will add a comment
to the relevant tickets.
* _`transitions`_:  This allows you to configure state transitions for tickets;
each pair represents the "current state" and the "next state".  An asterisk
matches any current state (and so if used, should be put last in the list).
The first "current state" match for the ticket will be used to determine the
next state -- only one transition will occur per Deploy.

The `updateFields` section supports several field types, but has been designed
specifically for Text Field and Labels fields.  If the field is a Text Field,
the update will overwrite whatever content is already there.  If the field
is a Labels type, the update will add the value as a new tag, unless the tag
is already set in the field (case-insensitive comparison).

The values for the `updateFields` and `addComment` allow for a limited set
of substitutions:

* `{application}`:  The name of the application this pipeline exists on
* `{account}`:  The cloud service account configured for the pipeline
* `{stack}`: The stack defined in the Deploy

The Jira tickets to be updated are found from the git commit messages; if
you reference a Jira ticket in the commit message (as you should, to map
the commits to the tickets in the first place), then, when a Deploy occurs
and that commit is included, the update logic configured will be applied to
those tickets as well.

The only commit entries that will be considered will be those between the
last successful deploy from that pipeline, up to the current deploy.  If
this is the first time running the deploy, the system will not update any
tickets.

Identifying the commit hashes is the tricky part.  If your Jenkins trigger
has the GitHub repository(ies) configured, the system will find the org
and repo name from the trigger.  This can support multiple repositories
being used as the trigger for a pipeline, and the correct git hashes will
be mapped to the correct repositories for searching.

Alternatively, you can embed the git hash into the image name during your
build; in this case, since there is no identifiable commit data coming from
your trigger, the system will use the `gitHubOrg` and `gitHubRepoName`
configured, and the `regexForShaInDockerTag` regex to identify the part of
the image name that contains the hash.

