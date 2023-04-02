#!/usr/bin/env node
import { appStatus, quit } from '@abw/badger'
import { fail, splitHash } from '@abw/badger-utils'
import { bin, cwd } from '@abw/badger-filesystem'
import configure from '../lib/Configure.js'
import scaffold from '../lib/Scaffold.js'

const root = bin(import.meta.url).up();
const pkg  = await root.file('package.json', { codec: 'json' }).read()
const scaffolds = root.dir('scaffolds');

const app = appStatus(
  async () => {
    const data = await configure({ scaffolds, help, version });
    // console.log('configuration: ', data);
    const dest   = cwd().dir(data.name);
    const exists = await dest.exists();
    if (exists) {
      fail(`${dest} already exists - please move it out of the way`);
    }
    const scafdir = data.scaffold;

    await scaffold({
      src: scafdir.dir('src'),
      lib: scafdir.dir('lib'),
      dest,
      data,
      options: data.flags
    })
  }
)

function help() {
  quit(`scaffold.js

Scaffold a new project.

Usage:
  scaffold.js [options] template module

Options:
  -v / --verbose      Verbose mode
  -p / --progress     Show progress
  -d / --debug        Debugging mode
  -h / --help         This help
  -V / --version      Print version number
`
  )
}

function version() {
  quit(`Version ${pkg.version}`)
}

app()