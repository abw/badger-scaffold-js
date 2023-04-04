#!/usr/bin/env node
import configure from '../lib/Configure.js'
import scaffold from '../lib/Scaffold.js'
import { bin } from '@abw/badger-filesystem'
import { appStatus, quit, green, brightCyan, darkGrey, brightWhite } from '@abw/badger'

const root = bin(import.meta.url).up()
const pkg  = await root.file('package.json', { codec: 'json' }).read()

const app = appStatus(
  async () => {
    const config = await configure({ root, help, version })
    await scaffold(config)
    done(config)
  }
)

function help() {
  const name     = brightWhite('scaffold.js')
  const usage    = brightWhite('Usage')
  const options  = brightWhite('Options')
  const examples = brightWhite('Examples')
  quit(`${name}

  Scaffold a new project.

${usage}:
  scaffold.js [options] module

${options}:
  -c <file> / --config <file>   Configuration file (.json or .yaml)
  -s <dir>  / --scaffold <dir>  Scaffold directory
  -t <dir>  / --template <dir>  Template directory (in scaffold dir)
  -o <dir>  / --output <dir>    Output directory
  -d        / --dryrun          Dry run - don't create any files
  -y        / --yes             Accept all defaults
  -p        / --progress        Show progress
  -v        / --verbose         Verbose mode
  -h        / --help            This help
  -D        / --debug           Debugging mode
  -V        / --version         Print version number

${examples}
  scaffold.js
  scaffold.js my-module-name
  scaffold.js -c mydata.json my-module-name
  scaffold.js -y -c mydata.json my-module-name
  scaffold.js -y -t react-lib -c mydata.json my-module-name
`
  )
}

function version() {
  quit(`Version ${pkg.version}`)
}

function done({ name, manager }) {
  const prompt  = darkGrey('$')
  const cd      = brightCyan(`cd ${name}`)
  const install = brightCyan(`${manager} install`)
  const dev     = brightCyan(`${manager} dev`)
  const test    = brightCyan(`${manager} test`)
  const build   = brightCyan(`${manager} build`)
  const docs    = brightCyan(`${manager} build:docs`)

  quit(`
${green('✔︎ All done!')}

Now you need to:

  ${prompt} ${cd}
  ${prompt} ${install}

To run the development server:

  ${prompt} ${dev}

To run the tests:

  ${prompt} ${test}

To build the module:

  ${prompt} ${build}

To build the documentation:

  ${prompt} ${docs}
`)
}

app()