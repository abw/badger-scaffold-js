#!/usr/bin/env node
import { appStatus, quit, green, brightCyan, darkGrey, brightWhite } from '@abw/badger'
import { fail  } from '@abw/badger-utils'
import { bin, cwd } from '@abw/badger-filesystem'
import configure from '../lib/Configure.js'
import scaffold from '../lib/Scaffold.js'

const root = bin(import.meta.url).up()
const pkg  = await root.file('package.json', { codec: 'json' }).read()
const scaffolds = root.dir('scaffolds')
const defaults = {
  author:   'Andy Wardley',
  licence:  'MIT',
  npmOrg:   '@abw',
  githubId: 'abw',
  manager:  'pnpm'
}

const app = appStatus(
  async () => {
    const data   = await configure({ scaffolds, help, version, defaults })
    const dest   = cwd().dir(data.name)
    const exists = await dest.exists()
    if (exists) {
      fail(`${dest} already exists - please move it out of the way`)
    }
    const scafdir = data.scaffold

    await scaffold({
      src: scafdir.dir('src'),
      lib: scafdir.dir('lib'),
      dest,
      data,
      options: data.flags
    })

    done(data)
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
  -t <dir>  / --template <dir>  Template directory (in scaffolds)
  -y        / --yes             Accept all defaults
  -p        / --progress        Show progress
  -v        / --verbose         Verbose mode
  -d        / --debug           Debugging mode
  -h        / --help            This help
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