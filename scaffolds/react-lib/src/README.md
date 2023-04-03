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
