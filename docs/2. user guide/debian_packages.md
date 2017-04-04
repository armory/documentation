# Debian Packages

This guide should include:

- Why use Debian packages
- How to create Debian Packages


## Why Use Debian Packages

While Spinnaker is flexible to use any dependency management system, it is predisposed to manage Debian packages due to it's wide spread usage at Netflix.  Debian packaging allows service teams to easily add their app specific configuration to common packer templates.  If you're using any Debian linux based system (Ubuntu, DSL, Astra, etc) you'll likely be using Debian packages for your system configuration and dependency management so it's a natural extension to use it for your own applications.  Using Debian packages will help reduce the variations in packer templates or variables passed to packer templates during the bake process.

## Creating Debian Packages

Creating a Debian package can be done through various open-source packaging tools.  If you're using Java, using the `OS Package` library is a good place to start.  A good example of using a Debian packaging for a Spinnaker configuration repo: https://github.com/armory-io/spinnaker-config

| Language | Tool | Package Types |
|---|---|---|
| Java    | [OS Package](https://github.com/nebula-plugins/gradle-ospackage-plugin)  | deb/rpm |
| Python  | [stdeb](https://pypi.python.org/pypi/stdeb/0.8.5) | deb |
| Any     | [pkgr](https://github.com/crohr/pkgr) | deb/rpm |
| Any     | [fpm](https://github.com/jordansissel/fpm/wiki) | deb/rpm/others |
