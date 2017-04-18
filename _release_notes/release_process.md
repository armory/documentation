---
layout: post
title: Release Process
order: 170
---

# Release Management

## Process
Our current release process takes roughly 2 weeks.  It starts by locking Spinnaker and it’s sub components ( e.g. Rosco, Clouddriver, Igor, etc).  We then run through a set of API integration tests written by Armory and UI integration tests using Winnaker (written by Target).  After those pass we deploy to our own instance of Spinnaker, and deploy internally over 100 times per day to make sure we don’t see issues.  After two weeks of consistent performance we then publish the package as a release and make it readily available to our customers.

We also publish nightly builds that we test to confirm the integrations pass however we don’t do longer, more sustained testing cycle as described above

## Integration Tests


### Winnaker Tests

[Winnaker](https://github.com/user/repo/blob/branch/other_file.md) was originally built by Target to do integration testing from a simulated browser sessions.  We use it to make sure that configurations for Deck don't have backward breaking configuration changes and continue to work as expected.  Armory also actively supports and contributes code back to Winnaker due to changes in the UI.
