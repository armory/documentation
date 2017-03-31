Configuration Management

## Isolate Delivery Pipelines from Integration

While it's possible to have Spinnaker webhook off of github repos or trigger from Jenkins jobs, it's generally
preferable to isolate the delivery pipeline from the code build. That means triggering Spinnaker pipelines off of
Docker repos currently. That frees up the development teams to restructure their build systems and validation in
whatever way they want, as long as the Docker image makes it up to the repo everything in the delivery process
can remain the same.

If you're triggering off of Docker images sometimes you'll need some extra info however. For instance you might
want to release anything on the master branch to production, but release any other branch to the staging area.
To handle that put the extra information into the tag, and the pipeline triggers in Spinnaker can use regular
expression matches on the tag name in Docker to determine which pipeline to execute.
