# Adding Additional AWS Accounts

Spinnaker supports adding multiple AWS accounts with some users reaching 100s of accounts in production.  Spinnaker uses AWS assume roles to create resources in the target account and then pass the role to 
