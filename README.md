# documentation

Technical documentation for Armory Spinnaker.

## Development

Guides and docs are in markdown. They are split up into directories such as `_overview`, `_user_guides`, and `_admin_guides`. You can modify the markdown files in those directories, or add new ones. The 'order' field at the top of the `md` files determine where it will be placed on the list. 

Jekyll is used to compile the markdown into a website.


### Running locally
Once you have this repo checked out, 
1. Download and install Docker
2. Start the server and make changes
    ```
    ./bin/run
    ```

You can view your changes at : `http://localhost:4000` or `http://192.168.99.100:4000` (if you're using docker-machine)

to exit, you can do `ctrl+c`

### Pushing to prod
Make a pull-request and once its merged, Jenkins automatically puts it on S3.


### Livereload
Install the [Livereload chrome extension](https://chrome.google.com/webstore/detail/livereload/jnihajbhpnppcggbcgedagnkighmdlei?hl=en) if you like seeing the page auto refresh when making a change.

### Adding a Section

* Create a directory for your new section contents to reside, prefix the 
directory name with an underscore (ex. `_spinnaker`, `_admin_guides`).

* Add a top-level file named as your section directory, without the leading 
underscore, but with `.md` as an extension -- copy one of the existing files
(ex. `spinnaker.md`, `admin_guides.md`).  Updat the title, permalink, and
collection (the last should be set to the name of your section (ex.
`spinnaker`, `admin_guides`)

* Add a section in `_config.yml` under `collections`, look at the existing
examples:

```
collections:
  spinnaker:
    output: true
    permalink: /spinnaker/:title/
  admin_guides:
    output: true
    permalink: /admin-guides/:title/
```

* You'll need to add to `_includes/base/header.html` a section that provides a
section title and iterates over the contents.  You can copy from an existing
section and just edit two places.  In this example, you would change "Armory
Spinnaker" to the section title of your choice, and `site.spinnaker` to 
`site.<your section name>`.  The rest can be left as-is.

```
        <li class="Nav-list__section">
          <h3 class="Header--tiny toggle-section-trigger js__toggle-section-trigger" tabindex="0">Armory Spinnaker</h3>
          <ul class="toggle-section">
            {% assign sorted_install_guide = site.spinnaker | sort: 'order' %}
            {% for link in sorted_install_guide %}
              <li><a class="Nav-list__link{% if page.url == link.url %} is-active{% endif %}" href="{{ link.url | relative_url }}">{{ link.title | escape }}</a></li>
            {% endfor %}
          </ul>
        </li>
```

