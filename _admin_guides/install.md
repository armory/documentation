# Installing Armory Spinnaker

We provide a Debian package that will install all the dependencies needed.  To install the Debian package as a bootstrap.  From there you can deploy [Spinnaker with Spinnaker](/redeploying_spinnaker.html) to additional targets like RHEL or CentOS.

```
apt-get update && apt-get install -y \
      apt-transport-https \
      ca-certificates \
      curl

curl -fsSL https://yum.dockerproject.org/gpg | sudo apt-key add -

apt-key adv --keyserver hkp://keyserver.ubuntu.com:80 --recv-keys 379CE192D401AB61


echo "deb https://apt.dockerproject.org/repo/ ubuntu-$(lsb_release -cs) main" \
        | sudo tee -a /etc/apt/sources.list

echo "deb https://dl.bintray.com/armory/debians trusty main" \
  | sudo tee -a /etc/apt/sources.list

apt-get update

apt-get install armoryspinnaker
```
