# website

This is the README for the `scaffold-js` documentation website.  It was created
using [badger-scaffold-js](https://github.com/abw/badger-scaffold-js).

## Notes for Maintainers

Check out the repository.

```bash
$ git clone https://github.com/abw/website.git
$ cd website
```

Install the dependencies.

```bash
$ pnpm install
```

To run the development server.

```bash
$ pnpm dev
```

To build the documentation.

```bash
$ pnpm build
```

To preview the documentation.

```bash
$ pnpm preview
```


## Project Structure

The `src` directory contains the web site for development, testing and
documentation.  The `index.html` is the main entry point.

Running `pnpm dev` runs a development web server for the site.

Running `pnpm build` builds the site and saves the bundled
output in the `docs` directory.  Any additional resources in the `public`
directory will be included in there.

The `styles` directory contains SASS stylesheets used by the web site.
The `main.scss` file is the main stylesheet which is imported into
`src/main.jsx`.

