#!/usr/bin/env node
import { prompt, select, cmdLineFlags } from '@abw/badger'
import { file } from '@abw/badger-filesystem'
import { fail, splitHash } from '@abw/badger-utils'

async function configure({ scaffolds, help, version, defaults={} }) {
  const { flags, args }  = cmdLineFlags({
    options: 'config debug progress template verbose yes',
    short: {
      c: 'config',
      d: 'debug',
      p: 'progress',
      t: 'template',
      v: 'verbose',
      y: 'yes',
      h: 'help',
      V: 'version'
    },
    on: {
      help:    help,
      version: version,
      template:  (name, arg, args, flags) => {
        flags.template = args.shift()
        return true
      },
      config:  (name, arg, args, flags) => {
        flags.config = args.shift()
        return true
      }
    }
  })

  const config = flags.config
    ? await readConfig(flags.config, defaults)
    : defaults

  const dirs  = await scaffolds.dirs()
  const types = splitHash(
    dirs.map( dir => dir.name() ),
    k => k
  )

  const name = args.length
    ? args.shift()
    : await prompt('What is your module name?', 'my-badger-module')
      || fail('No name specified')

  const defType = dirs[0].name()
  const type  = flags.template
    || (flags.yes
      ? defType
      : await select('What template do you want to use?', types)
        || fail('No template specified'))

  const scaffold = scaffolds.dir(type)
  await scaffold.mustExist()

  const defDist = config.npmOrg ? `${config.npmOrg}/${name}` : name
  const dist = flags.yes
    ? defDist
    : await prompt('What is the NPM distribution name?', defDist)
      || fail('No distribution specified')

  const manager = flags.yes
    ? config.manager
    : await select(
      'What package manager do you want to use?',
      {
        pnpm: 'pnpm',
        npm:  'npm',
        yarn: 'yarn'
      }
    ) || fail('No package manager specified')

  return { ...config, type, scaffold, name, dist, manager, flags }
}

async function readConfig(config, defaults) {
  const data = await file(config, { codec: 'auto' }).read()
  return {
    ...defaults,
    ...data,
  }
}

export default configure