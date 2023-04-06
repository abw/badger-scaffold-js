# {{name}}

This is the README for {{name}}.  It was created using
[badger-scaffold-js](https://github.com/abw/badger-scaffold-js).

{% include "readme/maintainers.md" %}

## Project Structure

The `src` directory contains the web site for development, testing and
documentation.  The `index.html` is the main entry point.

Running `{{manager}} dev` runs a development web server for the site.

Running `{{manager}} build` builds the site and saves the bundled
output in the `docs` directory.  Any additional resources in the `public`
directory will be included in there.

The `styles` directory contains SASS stylesheets used by the web site.
The `main.scss` file is the main stylesheet which is imported into
`src/main.jsx`.

