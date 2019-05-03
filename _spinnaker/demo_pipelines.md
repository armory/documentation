---
layout: post
title: Demo Pipelines
order: 170
---

> NOTE:  This is an "alpha" feature, we would love your feedback and bug reports!

Armory's Halyard offers a command to help set up a demo pipeline in your Spinnaker system.
The command is very simple:

```sh
hal armory upload-pipeline <URL>
```

The URL is expected to return a special JSON payload that contains a pipeline, plus some
additional fields to indicate what options the user needs to enter to customize the pipeline.

When prompted for a value, if there is a term in parentheses, that is the default value; you
can just hit 'enter' and accept the default.  Otherwise, you will need to enter a value.
(see the example below)

Armory currently provides the following demo pipelines:

* [https://get.armory.io/demo-pipelines/demo_template.json](https://get.armory.io/demo-pipelines/demo_template.json)

Example execution:

```sh
$ hal armory upload-pipeline https://get.armory.io/demo-pipelines/demo_template.json
Fetching https://get.armory.io/demo-pipelines/demo_template.json
Starting to parse payload
Enter namespace: paul
Enter account (kubernetes):
Enter application (spin):
+ Get current deployment
  Success
+ Upload pipeline
  Success
+ Pipeline uploaded.
```

## Template Format

> NOTE: This is a very preliminary "rough draft" format and may change in the
> future.

The JSON data that the upload-pipeline command uses actually wraps a pipeline,
supplied as a string (remember to escape the JSON) and contains a few more
items for configuration.  Here is an example, what actually powers the
demo template described above:

```json
{
  "demoPipelineName": "demopipeline",
  "options": [
          { "variableMarker": "%%namespace%%",
                  "uiPrompt": "Enter namespace",
                  "fieldType": "string"
          },
          { "variableMarker": "%%account%%",
                  "uiPrompt": "Enter account",
                  "fieldType": "string",
                  "defaultValue": "kubernetes"
          },
          { "variableMarker": "%%application%%",
                  "uiPrompt": "Enter application",
                  "fieldType": "string",
                  "defaultValue": "spin"
          }
  ],
  "json": "{ \"application\": \"%%application%%\", .... }"
}
```

Field Descriptions:

* `demoPipelineName`:  This is used to set the UUID of the pipeline (note that if this UUID already exists, that pipeline will get overridden.  This field can be pretty much any string without any whitespace in it.
* `options`:  This array contains the definitions for the variables that need to be prompted from the user.  Each entry in the array has the following fields:
    * `variableMarker`:  This is the string to replace in the JSON payload; this is done currently with just a very simplistic "replace all tokens".  Note there is nothing special about the `%%` markings; these could be just about any other tokens; the intention is to make sure that only the variables in the json payload (see below) are substituted.
    * `uiPrompt`: This is displayed to the user to prompt for the value; it will be followed by a colon (and any defined default)
    * `fieldType`: This is not currently used; just leave as `"string"` for now - this may be used for field validation in the future(for example, testing that an input is a valid integer)
    * `defaultValue`: The default value to use if the user enters a blank entry.  This field is optional; if it is not present, the user will be required to enter a non-blank value.
* `json`: This is the JSON payload, as a string, representing the pipeline, as it would appear if you were to use the UI to "Edit as JSON" a pipeline.  For those values that need to be substituted, put in the variable markers you defined in the `options` field (in this abbreviated example, you can see where the application would be substituted).

Remember, this is a very alpha feature.  Errors in the template may result in
Front50 failing to boot properly; if this happens, you should be able to find the pipeline in your storage bucket and delete it manually, and Front50 should then recover.


