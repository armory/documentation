

manual executions
- What happens when you replay a previous execution?
  - it grabs the package version from the jenkins build.
  - it doesnt rebake the image unless the previously baked image is not there.


- Walk through how a pipeline works under the hood a little bit
  - Packer files and templates that are already installed
  - How does a find image work and when do you need to use the expression language or not
  - Artifacts from Jenkins
    - package name prefix that is used later for baking
    - explain a build.properties and how to build from a file