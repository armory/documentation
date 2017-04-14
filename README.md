# documentation

Technical documentation for Armory Spinnaker.

## Developement

Guides and docs are in markdown. They are split up into directories such as `_overview`, `_user_guides`, and `_admin_guides`. You can modify the markdown files in those directories, or add new ones. The 'order' field at the top of the `md` files determine where it will be placed on the list. 

Jekyll is used to compile the markdown into a website.


### Running locally

Once you have this repo checked out, make some changes, then (assuming you know how to use docker):

```
docker run -ti -p 4000:4000 -v "$(pwd):/srv/jekyll" jekyll/jekyll jekyll serve
```

If you are using docker-machine then you will need to navigate to the ip for your docker vm, probably something like: `http://192.168.99.100:4000`

If you are using native docker, then try: `http://localhost:4000`

to exit, you can do `ctrl+c`