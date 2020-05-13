---
layout: post
title: Security Config
order: 15
---

{:.no_toc}
* This is a placeholder for an unordered list that will be replaced with ToC. To exclude a header, add {:.no_toc} after it.
{:toc}


# Parameters

**spec.spinnakerConfig.config.security**

Configure Spinnaker's security. This includes external SSL, authentication mechanisms, and authorization policies.

```yaml
security:
        apiSecurity:
        uiSecurity:
        authn:
        authz:
```

- `apiSecurity`
- `uiSecurity`
- `authn`
- `authz`

## API

**spec.spinnakerConfig.config.security.apiSecurity**

```yaml
apiSecurity:
  ssl:
    enabled:
    keyAlias:
    keyStore:
    keyStoreType:
    keyStorePassword:
    trustStore:
    trustStoreType:
    trustStorePassword:
    clientAuth:
  overrideBaseUrl:
  corsAccessPattern:
```

- `ssl`:
- `overrideBaseUrl`: If you are accessing the API server remotely, provide the full base URL of whatever proxy or load balancer is fronting the API requests.
- `corsAccessPattern`: `^.*$` If you have authentication enabled, are accessing Spinnaker remotely, and are logging in from sources other than the UI, provide a regex matching all URLs authentication redirects may come from.

### SSL parameters

- `enabled`: true or false.
- `keyAlias`: Name of your keystore entry as generated with your keytool.
- `keyStore`: Path to the keystore holding your security certificates. File needs to be present on the machine running Spinnaker. Supports encrypted file.
- `keyStoreType`: The type of your keystore. Examples include JKS, and PKCS12.
- `keyStorePassword`: The password to unlock your keystore. Due to a limitation in Tomcat, this must match your key's password in the keystore. Supports encrypted value.
- `trustStore`: Path to the truststore holding your trusted certificates. File needs to be present on the machine running Spinnaker. Supports encrypted file.
- `trustStoreType`: The type of your truststore. Examples include JKS, and PKCS12.
- `trustStorePassword`: The password to unlock your truststore. Supports encrypted value.
- `clientAuth`: Declare `WANT` when client auth is wanted but not mandatory or `NEED` when client auth is mandatory.


## Authentication

**spec.spinnakerConfig.config.security.authn**

```yaml
authn:
  oauth2:
  saml:
  ldap:
  x509:
  iap:    
```

- `enabled`: true or false.
- `oauth2`:
- `saml`:
- `ldap`:
- `x509`:
- `iap`

### OAUTH2

**spec.spinnakerConfig.config.security.authn.oauth2**

```yaml
oauth2:
    enabled:
    client:
      clientId:
      clientSecret:
      accessTokenUri:
      userAuthorizationUri:
      clientAuthenticationScheme:
      scope:
      preEstablishedRedirectUri:
      useCurrentUri:
    userInfoRequirements:
    resource:
      userInfoUri:
    userInfoMapping:
      email:
      firstName:
      lastName:
      username:
    provider:
```

- `enabled`: true or false.
- `client`:
  - `clientId`: The OAuth client ID you have configured with your OAuth provider.
  - `clientSecret`: The OAuth client secret you have configured with your OAuth provider. Supports encrypted value.
  - `accessTokenUri`: The access token uri for your OAuth provider.
  - `userAuthorizationUri`: The user authorization uri for your OAuth provider.
  - `clientAuthenticationScheme`: The client authentication scheme for your OAuth provider.
  - `scope`: The scope for your OAuth provider, e.g. `user:email`
  - `preEstablishedRedirectUri`: The externally accessible URL for Gate. For use with load balancers that do any kind of address manipulation for Gate traffic, such as an SSL terminating load balancer.
  - `useCurrentUri`: false
- `userInfoRequirements`: {} The map of requirements the userInfo request must have. This is used to restrict user login to specific domains or having a specific attribute. Use equal signs between key and value, and additional key/value pairs need to repeat the flag. Example: '--user-info-requirements foo=bar --userInfoRequirements baz=qux'.
- `resource`:
  - `userInfoUri`: The user info uri for your OAuth provider.
- `userInfoMapping`:
  - `email`: The email field returned from your OAuth provider.
  - `firstName`: The first name field returned from your OAuth provider.
  - `lastName`: The last name field returned from your OAuth provider.
  - `username`: The username field returned from your OAuth provider.
- `provider`: One of `azure`, `github`, `oracle`, `other`, `google`

### SAML

**spec.spinnakerConfig.config.security.authn.saml**

```yaml
saml:
  enabled:
  metadataLocal:
  metadataRemote:
  issuerId:
  keyStore:
  keyStorePassword:
  keyStoreAliasName:
  serviceAddress:
  userAttributeMapping:
    firstName:
    lastName:
    roles:
    lastName:
    username:
    email:
```

- `enabled`: true or false.
- `metadataLocal`: The address to your identity provider's metadata XML file. File needs to be present on the machine running Spinnaker. Supports encrypted file.
- `metadataRemote`: The address to your identity provider's metadata XML file. This is a URL.
- `issuerId`: The identity of the Spinnaker application registered with the SAML provider.
- `keyStore`: Path to the keystore that contains this server's private key. This key is used to cryptographically sign SAML AuthNRequest objects. File needs to be present on the machine running Spinnaker. Supports encrypted file.
- `keyStorePassword`: The password used to access the file specified in --keystore. Supports encrypted value.
- `keyStoreAliasName`: The name of the alias under which this server's private key is stored in the --keystore file.
- `serviceAddress`: The address of the Gate server that will be accesible by the SAML identity provider. This should be the full URL, including port, e.g. https://gate.org.com:8084/. If deployed behind a load balancer, this would be the load balancer's address.
- `userAttributeMapping`:
  - `firstName`: The first name field returned from your SAML provider.
  - `lastName`: The last name field returned from your SAML provider.
  - `roles`: The roles field returned from your SAML provider.
  - `lastName`: The last name field returned from your SAML provider.
  - `username`: aThe username field returned from your SAML provider.
  - `email`: The email field returned from your SAML provider.

### LDAP

**spec.spinnakerConfig.config.security.authn.ldap**

```yaml
ldap:
  enabled:
  url:
  userDnPattern:
  userSearchBase:
  userSearchFilter:
  managerDn:
  managerPassword:
  groupSearchBase:
```

- `enabled`: true or false.
- `url`: ldap:// or ldaps:// url of the LDAP server
- `userDnPattern`: The pattern for finding a user's DN using simple pattern matching. For example, if your LDAP server has the URL ldap://mysite.com/dc=spinnaker,dc=org, and you have the pattern 'uid={0},ou=members', 'me' will map to a DN uid=me,ou=members,dc=spinnaker,dc=org. If no match is found, will try to find the user using user-search-filter, if set.
- `userSearchBase`: The part of the directory tree under which user searches should be performed. If user-search-base isn't supplied, the search will be performed from the root.
- `userSearchFilter`: The filter to use when searching for a user's DN. Will search either from user-search-base (if specified) or root for entires matching the filter, then attempt to bind as that user with the login password. For example, the filter 'uid={0}' would apply to any user where uid matched the user's login name. If --user-dn-pattern is also specified, will attempt to find a match using the specified pattern first, before searching with the specified search filter if no match is found from the pattern.
- `managerDn`: An LDAP manager user is required for binding to the LDAP server for the user authentication process. This property refers to the DN of that entry. I.e. this is not the user which will be authenticated when logging into DHIS2, rather the user which binds to the LDAP server in order to do the authentication.
- `managerPassword`: The password for the LDAP manager user.
- `groupSearchBase`: The part of the directory tree under which group searches should be performed.

### x509

**spec.spinnakerConfig.config.security.authn.x509**

```yaml
x509:
  enabled:
  roleOid:
  subjectPrincipalRegex:
```

- `enabled`: true or false.
- `roleOid`: The OID that encodes roles that the user specified in the x509 certificate belongs to
- `subjectPrincipalRegex`: `EMAILADDRESS=(.*?)(?:,|$)` The regex used to parse the subject principal name embedded in the x509 certificate if necessary

### IAP

**spec.spinnakerConfig.config.security.authn.iap**

```yaml
iap:
  enabled:
  jwtHeader:
  issuerId:
  audience:
  iapVerifyKeyUrl:
```

- `enabled`: true or false.
- `jwtHeader`: The HTTP request header that contains the JWT token.
- `issuerId`: The Issuer from the ID token payload.
- `audience`: The Audience from the ID token payload. You can retrieve this field from the [IAP console](https://cloud.google.com/iap/docs/signed-headers-howto#verify_the_id_token_header).
- `iapVerifyKeyUrl`: The URL containing the Cloud IAP public keys in JWK format.


## Authorization

**spec.spinnakerConfig.config.security.authz**

```yaml
authz:
  enabled:
  groupMembership:
```

- `enabled`: true or false.
- `groupMembership`:

### Group Membership

```yaml
groupMembership:
  service:
  google:
    roleProviderType: GOOGLE
    credentialPath:
    adminUsername:
    domain:
  github:
    roleProviderType: GITHUB
    baseUrl:
    accessToken:
    organization:
  file:
    roleProviderType: FILE
    path:
  ldap:
    roleProviderType: LDAP
    url:
    managerDn:
    managerPassword:
    userDnPattern:
    userSearchBase:
    groupSearchBase:
    userSearchFilter:
    groupSearchFilter:
    groupRoleAttributes:
```

- `service`: One of `EXTERNAL`, `FILE`, `GOOGLE`, `GITHUB`, `LDAP`
- `google`:
  - `roleProviderType`: `GOOGLE`
  - `credentialPath`: A path to a valid json service account that can authenticate against the Google role provider. File needs to be present on the machine running Spinnaker. Supports encrypted file.
  - `adminUsername`: Your role provider's admin username e.g. admin@myorg.net
  - `domain`: The domain your role provider is configured for e.g. myorg.net.
- `github`:
  - `roleProviderType`: `GITHUB`
  - `baseUrl`: Used if using GitHub enterprise some other non github.com GitHub installation.
  - `accessToken`: A personal access token of an account with access to your organization's GitHub Teams structure. Supports encrypted value.
  - `organization`: The GitHub organization under which to query for GitHub Teams.
- `file`:
  - `roleProviderType`: `FILE`
  - `path`: A path to a file describing the roles of each user.
- `ldap`:
  - `roleProviderType`: `LDAP`
  - `url`: ldap:// or ldaps:// URL of the LDAP server
  - `managerDn`: The manager user's distinguished name (principal) to use for querying ldap groups.
  - `managerPassword`: The manager user's password to use for querying ldap groups. Supports encrypted value.
  - `userDnPattern`: The pattern for finding a user's DN using simple pattern matching. For example, if your LDAP server has the URL ldap://mysite.com/dc=spinnaker,dc=org, and you have the pattern 'uid={0},ou=members', 'me' will map to a DN uid=me,ou=members,dc=spinnaker,dc=org. If no match is found, will try to find the user using --user-search-filter, if set.
  - `userSearchBase`: The part of the directory tree under which user searches should be performed. If --user-search-base isn't supplied, the search will be performed from the root.
  - `groupSearchBase`: The part of the directory tree under which group searches should be performed.
  - `userSearchFilter`: The filter to use when searching for a user's DN. Will search either from --user-search-base (if specified) or root for entires matching the filter.
  - `groupSearchFilter`: The filter which is used to search for group membership. The default is `uniqueMember={0}`, corresponding to the groupOfUniqueMembers LDAP class. In this case, the substituted parameter is the full distinguished name of the user. The parameter '{1}' can be used if you want to filter on the login name.
  - `groupRoleAttributes`: The attribute which contains the name of the authority defined by the group entry. Defaults to `cn`.

## UI

**spec.spinnakerConfig.config.security.uiSecurity**

```yaml
uiSecurity:
  ssl:
  overrideBaseUrl:
```

- `overrideBaseUrl`: If you are accessing the UI server remotely, provide the full base URL of whatever proxy or load balancer is fronting the UI requests.
- `ssl`:

### SSL

```yaml
uiSecurity:
  ssl:
    enabled:
    sslCertificateFile:
    sslCertificateKeyFile:
    sslCertificatePassphrase:
    sslCACertificateFile:
```

- `enabled`: true or false.
- `sslCertificateFile`: Path to your .crt file. File needs to be present on the machine running Spinnaker. Supports encrypted file.
- `sslCertificateKeyFile`: Path to your .key file. File needs to be present on the machine running Spinnaker. Supports encrypted file.
- `sslCertificatePassphrase`: The passphrase needed to unlock your SSL certificate. This will be provided to Apache on startup. Supports encrypted value.
- `sslCACertificateFile`: Path to the .crt file for the CA that issued your SSL certificate. This is only needed for localgitdeployments that serve the UI using webpack dev server. File needs to be present on the machine running Spinnaker. Supports encrypted file.
