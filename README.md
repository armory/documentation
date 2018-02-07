# documentation

Technical documentation for Armory Spinnaker.

## Development

Guides and docs are in markdown. They are split up into directories such as `_overview`, `_user_guides`, and `_admin_guides`. You can modify the markdown files in those directories, or add new ones. The 'order' field at the top of the `md` files determine where it will be placed on the list. 

Jekyll is used to compile the markdown into a website.


### Running locally
Once you have this repo checked out, start the server and make changes

```
./bin/run
```

You can view your changes at : `http://localhost:4000` or `http://192.168.99.100:4000` (if you're using docker-machine)

to exit, you can do `ctrl+c`

### Pushing to prod
Make a pull-request and once its merged, Jenkins automatically puts it on S3.


### Livereload
Install the [Livereload chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) if you like seeing the page auto refresh when making a change.
