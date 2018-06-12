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

```
features:
  jira:
    enabled: true
    basicAuthToken: dXNlcjpwYXNzCg==
    createIssueUrl:  https://myjira.atlassian.net/rest/api/2/issue/
```

The `basicAuthToken` is your Jira service account's username and password,
separated by a colon, and then base64'd.  This can be determined with this
this command line (tested on Ubuntu and Mac OS X):

```
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



