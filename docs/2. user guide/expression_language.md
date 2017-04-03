
- description
  - Can use Groovy/Java
  - Its common to want to add things to userdata, but that needs to be base64’ed. So use:
`${ 'Some text to encode'.bytes.encodeBase64().toString() }`  (Note: this doesn’t work right now!)

- Common Uses
  - find images
  - trigger


  When you type an invalid expression, it will just print it as a string. this is often confused for spinnaker not evaluating, but is really user error.
