
- description
  - Can use Groovy/Java
  - Its common to want to add things to userdata, but that needs to be base64’ed. So use:
`${ 'Some text to encode'.bytes.encodeBase64().toString() }`  (Note: this doesn’t work right now!)

- Common Uses
  - find images
  - trigger
