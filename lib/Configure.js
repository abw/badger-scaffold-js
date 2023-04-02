#!/usr/bin/env node
import { prompt, select, cmdLineFlags } from '@abw/badger'
import { fail, splitHash } from '@abw/badger-utils'

async function configure({ scaffolds, help, version }) {
  const { flags, args }  = cmdLineFlags({
    options: 'verbose progress debug',
    short: {
      v: 'verbose',
      p: 'progress',
      d: 'debug',
      h: 'help',
      V: 'version'
    },
    on: {
      help:    help,
      version: version
    }
  })
  const dirs  = await scaffolds.dirs()
  const types = splitHash(
    dirs.map( dir => dir.name() ),
    k => k
  )

  const type  = args.length
    ? args.shift()
    : await select('What template do you want to use?', types)
      || fail('No template specified')

  const scaffold = scaffolds.dir(type)
  await scaffold.mustExist()

  const name = args.length
    ? args.shift()
    : await prompt('What is your module name?', 'my-badger-module')
      || fail('No name specified')

  const dist = await prompt('What is the NPM distribution name?', `@abw/${name}`)
    || fail('No distribution specified')

  const pkgm = await select(
    'What package manager do you want to use?',
    {
      pnpm: 'pnpm',
      npm:  'npm',
      yarn: 'yarn'
    }
  ) || fail('No package manager specified')

  return { type, scaffold, name, dist, pkgm, flags }
}

export default configure