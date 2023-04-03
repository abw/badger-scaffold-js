# badger-scaffold-js

This is a scaffolding tool for creating a new Javascript module.

I wrote it to help me bootstrap a new Javascript module with all the
modules, configuration files and other paraphernalia that I happen to
like, including:

* vite
* vitest
* eslint

At the moment it has just one template, `react-lib`, for creating a new
React library, complete with documentation website.

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

## Scaffolding a New Project

Run the `bin/scaffold.js` script to scaffold a new project.

If you run it without any options then it will prompt you to enter the
required values.

```
$ bin/scaffold.js
✔ What is your module name? … my-badger-module
✔ What template do you want to use? › react-lib
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

To build the documentation:

  $ pnpm build:docs
```

Note that it writes output to a directory under the current working directory.
If the directory already exists then it will print an error and exit without
proceeding any further.

You probably don't want to create a new project under the `badger-scaffold-js`
directory so you should run it from wherever you want to create the new
project.

```bash
$ cd ~/my-projects
$ ~/path/to/badger-scaffold-js/bin/scaffold.js
```

You can create an [alias](#creating-an-alias) to the script to simplify this
process.

You can specify the name of your new module as a command line argument.

```bash
$ bin/scaffold.js my-new-module
```

You will still be prompted to enter the other options, but there are several
additional command line options you can use to avoid this.  Read on...

## Configuration Options

### -h / --help

The `-h` or `--help` option displays the help.

```bash
$ bin/scaffold.js -h
scaffold.js

  Scaffold a new project.

Usage:
  scaffold.js [options] module

Options:
  -c <file> / --config <file>   Configuration file (.json or .yaml)
  -t <dir>  / --template <dir>  Template directory (in scaffolds)
  -y        / --yes             Accept all defaults
  -p        / --progress        Show progress
  -v        / --verbose         Verbose mode
  -d        / --debug           Debugging mode
  -h        / --help            This help
  -V        / --version         Print version number

Examples
  scaffold.js
  scaffold.js my-module-name
  scaffold.js -c mydata.json my-module-name
  scaffold.js -y -c mydata.json my-module-name
  scaffold.js -y -t react-lib -c mydata.json my-module-name
```

### -c / --config

The module was written as a tool to help me create new projects.  It has
my name, github account, npm account, and other preferences pre-defined.
Unless you're me then you'll want to change this.  Otherwise you'll need to
go an edit the generated files (most importantly the `package.json`) to
change the generated values.

The `-c` / `--config` file allows you to provide a configuration file that
contains your details so you can avoid this step.

Create a `.yaml` or `.json` file with your personal details and preferences.
For example, you could create a `me.yaml` file containing something like this:

```yaml
author:   Freddy Ferret
licence:  Apache
npmOrg:   '@freddy'
githubId: FreddyFerret
manager:  yarn
```

The `author` field should contain your name.  The `licence` is the default
licence you want to use for your module.  The `npmOrg` is your NPM
organisation, if you have one.  The `githubId` is your github ID.  The
`manager` is your preferred package manager.

If you don't use github, or don't plan to publish your module to NPM, then
you'll probably need to go and edit the generated `package.json` anyway.
Sorry, but like I said, I wrote this primarily for me to use, so it's set up
to make my life easy.

When you run the script supply the path to your config file using the `-c`
or `--config` option.

```bash
$ bin/scaffold.js -c ~/path/to/me.yaml
```

### -t / --template

The `-t` or `--template` option allows you to specify the template you want
to use.  These are under the `scaffolds` directory.  At present there is just
one, `react-lib`.  If you don't specify this option then you will be prompted
to confirm it.

```bash
$ bin/scaffold.js -t react-lib my-new-module
```

### -y / --yes

The `-y` or `--yes` option can be used to accept all the other defaults.

```bash
$ bin/scaffold.js -y my-new-module
```

### -p / --progress

The `-p` or `--progress` option can be used to display some eye candy showing
the progress while the new module is being scaffolded.  The process usually
happens very quickly (around a tenth of second on my machine), so it's mostly
a waste of pixels.  But on a slow machine or when scaffolding a larger
project this might be useful.

### -v / --verbose

The `-v` or `--verbose` option can be used to display additional information
about what it's doing.

### -d / --debug

The `-d` or `--debug` option can be used to display additional debugging
information.

### -V / --version

The `-V` or `--version` option can be used to display the current version.

## Creating an Alias

You might like to create an alias to the script for ease of use.  If you've
created a file with your own personal details and preferences then you can
include this using the `-c` or `--config` options.

For example, add something like this to your `~/.aliases` file (or wherever
you define your aliases).

```bash
alias scaffold="~/path/to/badger-scaffold-js/bin/scaffold.js -c ~/path/to/me.yaml"
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