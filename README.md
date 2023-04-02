# badger-scaffold

This is a scaffolding tool for creating a new Javascript module.

I wrote it to help me bootstrap a new Javascript module with all the
modules, configuration files and other paraphernalia that I happen to
like:

* vite
* vitest
* eslint

At the moment it has just one template, `react-lib`, for creating a new
React library.

Note that it was written as a tool for me to use, rather than a general
purpose tool for other people to use.  You're welcome to use it, but you
may find things have been set up for my own situation and preferences.

## Getting Started

Clone the repository:

```bash
$ git clone https://github.com/abw/badger-scaffold-js.git
```

Install the dependencies

```bash
$ cd badger-scaffold-js
$ pnpm install
```

Run the script.  The `-h` or `--help` option displays the help.

```bash
$ bin/scaffold.js -h
scaffold.js

Scaffold a new project.

Usage:
  scaffold.js [options] template module

Options:
  -v / --verbose      Verbose mode
  -p / --progress     Show progress
  -d / --debug        Debugging mode
  -h / --help         This help
  -V / --version      Print version number
```

If you run it without any options then it will prompt you to enter the
required values.

```abw
$ bin/scaffold.js
✔ What template do you want to use? › react-lib
✔ What is your module name? … my-badger-module
✔ What is the NPM distribution name? … @abw/my-badger-module
✔ What package manager do you want to use? › pnpm

✔︎ All done!

Now you need to:

  $ cd my-badger-module
  $ pnpm install

To run the development server:

  $ pnpm dev

To run the tests:

  $ pnpm test

To build the module:

  $ pnpm build
```

Note that it writes output to a directory under the current working directory.

You probably don't want to create a new project under the `badger-scaffold-js`
directory so you should run it from wherever you want to create the new
project.

```bash
$ cd ~/my-projects
$ ~/path/to/badger-scaffold-js/bin/scaffold.js
```

You might like to create an alias to the script for ease of use.  For example,
add something like this to your `~/.aliases` file (or wherever you define
your aliases)

```bash
alias scaffold="~/path/to/badger-scaffold-js/bin/scaffold.js"
```

Don't forget to reload your aliases or they won't take effect until you open
a new shell.

```bash
$ source ~/.aliases
```

Then you can run the `scaffold` command from any directory to create a new
project.

```bash
$ cd ~/path/to/somewhere/else
$ scaffold
```

## Author

Andy Wardley, March 2023