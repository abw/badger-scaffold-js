# {{name}}

This is the README for {{name}}.  It was created using
[badger-scaffold-js](https://github.com/abw/badger-scaffold-js).

## Getting Started

Add the `{{dist}}` module to your project using your favourite
package manager.

```bash
## using npm
$ npm add {{dist}}

## using yarn
$ yarn add {{dist}}

## using pnpm
$ pnpm add {{dist}}
```

You can then import the modules and start using them.

```jsx
import { Hello } from '{{dist}}'
```

## Notes for Maintainers

Check out the repository.

```bash
$ git clone https://github.com/{{githubId}}/{{name}}.git
$ cd {{name}}
```

Install the dependencies.

```bash
$ {{manager}} install
```

To run the development server:

```bash
$ {{manager}} dev
```

To run the tests:

```bash
$ {{manager}} test
```

To build for production:

```bash
$ {{manager}} build
```

To build the documentation for production:

```bash
$ {{manager}} build:docs
```

## Project Structure

The main project code is in the `lib` directory.  The `index.jsx` is the
main entry point.

Running `{{manager}} build` creates a production build in the `dist`
directory.

The `src` directory contains the web site for development, testing and
documentation.  The `index.html` is the main entry point.

Running `{{manager}} dev` runs a development web server for the site.

Running `{{manager}} build:docs` builds the site and saves the bundled
output in the `docs` directory.  Any additional resources in the `public`
directory will be included in there.

The `styles` directory contains SASS stylesheets used by the web site.
The `main.scss` file is the main stylesheet which is imported into
`src/main.jsx`.

The `test` directory contains test scripts which will be run by
`{{manager}} test`.  The `test/setup.js` file is a special setup file.
Any files in `test/lib` are assumed to be components used by tests and
are not test scripts in their own right.  They are ignored by the test
runner.
