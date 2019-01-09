---
layout: post
order: 90
redirect_from:
  - /user-guides/debian-packages/
  - /user-guides/debian_packages/
  - /user_guides/debian-packages/
  - /user_guides/debian_packages/
  - /spinnaker_user_guides/debian_packages/
  - /spinnaker_user_guides/debian-packages/
  - /spinnaker-user-guides/debian_packages/
---

This guide includes:
{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


## Why Use Debian Packages

While Spinnaker is flexible to use any dependency management system, it is predisposed to manage Debian packages due to its default settings with Rosco, Orca and Jenkins.  

- Out-of-the-box settings for Spinnaker look for an archived package with a `.deb` suffix within Jenkins.  It also grabs the version from the package and automatically appends it to the package name within Rosco.  This makes it easy to specify your package in Rosco without the version number, `mycompany-app` but during the bake provisioning process it will install the version that was specified by the Jenkins build: `mycompany-app.3.24.9-3`.  

- Debian packaging allows service teams to easily add their app specific configuration to common packer templates.  If you're using any Debian linux based system (Ubuntu, DSL, Astra, etc) you'll likely be using Debian packages for your system configuration and dependency management so it's a natural extension to use it for your own applications.  Using Debian packages will help reduce the variations in packer templates or variables passed to packer templates during the bake process.


## Creating Debian Packages

Creating a Debian package can be done through various open-source packaging tools.  If you're using Java, using the `OS Package` library is a good place to start.  Of course you can always use the [packaging tools provided by Debian](https://www.debian.org/doc/manuals/maint-guide/build.en.html).  Here is a good example of using a Debian package for a [Spinnaker configuration repo](https://github.com/armory-io/spinnaker-config).

| Language | Tool | Package Types |
|---|---|---|
| Java    | [OS Package](https://github.com/nebula-plugins/gradle-ospackage-plugin)  | deb/rpm |
| Python  | [stdeb](https://pypi.python.org/pypi/stdeb/0.8.5) | deb |
| Node    | [node-deb](https://www.npmjs.com/package/node-deb) | deb |
| PHP     | [php-deb-packager](https://github.com/wdalmut/php-deb-packager) | deb |
| Any     | [pkgr](https://github.com/crohr/pkgr) | deb/rpm |
| Any     | [fpm](https://github.com/jordansissel/fpm/wiki) | deb/rpm/others |


### Example: Debian Package with OSPackage Gradle Plugin

Begin by creating a `build.gradle`.  Below is an example of what a gradle file might look like for a application that builds a war.

{% highlight javascript %}
buildscript {
  repositories {
    jcenter()
    maven { url "https://plugins.gradle.org/m2/" }
  }
  dependencies {
       classpath 'com.netflix.nebula:gradle-ospackage-plugin:4.3.0'
   }
}

apply plugin: 'nebula.ospackage'

ospackage {
  packageName = "mycompanyname-service"
  version = "1.10.3"

  requires('nginx')

  postInstall file('config/scripts/post-install.sh')

  from('build/application.war') {
    into '/opt/application/'
  }
}
{% endhighlight %}

Then build your Debian package based on your gradle build file:
{% highlight shell %}
$ gradle buildDeb
{% endhighlight %}

If the build succeeds then you should find a Debian package in the following path:

{% highlight shell %}
./build/distributions/mycompanyname-service.1.10.3_all.deb
{% endhighlight %}
