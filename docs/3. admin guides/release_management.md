
# Release Management

## Process
Our current release process takes roughly 2 weeks.  It starts by locking Spinnaker and it’s sub components ( e.g. Rosco, Clouddriver, Igor, etc).  We then run through a set of API integration tests written by Armory and UI integration tests using Winnaker (written by Target).  After those pass we deploy to our own instance of Spinnaker, and deploy internally over 100 times per day to make sure we don’t see issues.  After two weeks of consistent performance we then publish the package as a release and make it readily available to our customers.

We also publish nightly builds that we test to confirm the integrations pass however we don’t do longer, more sustained testing cycle as described above

## Integration Tests
