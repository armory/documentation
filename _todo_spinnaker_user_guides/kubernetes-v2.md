## Setting Up The V2 Provider

Setting up the V2 provider is similar to the [V1 Kubernetes configuration](http://docs.armory.io/admin-guides/configure_kubernetes/#configure-clouddriver-to-use-the-kubectl-config-file) however we'll need to change the provider flag in `/opt/spinnaker/config/clouddriver-local.yml` to `v2`.  For example:

```
kubernetes:
  enabled: true
  accounts:
    - name: k8s-v2
      providerVersion: v2
      kubeconfigFile: /opt/spinnaker/credentials/kubeconfig
```

We'll also need to enable artifact handling in Spinnaker by setting a flag in `/opt/spinnaker/config/spinnaker-local.yml`

```
features:
  artifacts:
    enabled: true
```

And we'll need to configure the Github artifact account in `/opt/spinnaker/config/clouddriver-local.yml`

```yaml
artifacts:
  github:
    enabled: true
    accounts:
    - name: github
      username: BOT_USERNAME
      token: YOURTOKEN
```      

Then restart Armory Spinnaker: `service armory-spinnaker restart`