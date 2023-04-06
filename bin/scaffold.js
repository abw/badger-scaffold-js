#!/usr/bin/env node
import { configure, scaffold }from '../lib/index.js'
import { bin } from '@abw/badger-filesystem'
import { appStatus, quit, green, brightCyan, darkGrey, brightWhite } from '@abw/badger'

// rollup rewrites this to be ../package.json
const PACKAGE_JSON = 'package.json'
const root = bin(import.meta.url).up()
const pkg  = await root.file(PACKAGE_JSON, { codec: 'json' }).read()

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
  -D        / --debug           Debugging mode
  -V        / --version         Print version number
  -h        / --help            This help

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

function done({ name, manager, scripts={} }) {
  const prompt  = darkGrey('$')
  const cd      = brightCyan(`cd ${name}`)
  const install = brightCyan(`${manager} install`)
  const cmds    = Object.entries(scripts).map(
    ([script, {about}]) => {
      const cmd = brightCyan(`${manager} ${script}`)
      return `\n${about}\n\n  ${prompt} ${cmd}\n`
    }
  ).join('')

  quit(`
${green('✔︎ All done!')}

Now you need to:

  ${prompt} ${cd}
  ${prompt} ${install}
${cmds}
`)
}

app()