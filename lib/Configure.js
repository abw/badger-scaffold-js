#!/usr/bin/env node
import { prompt, select, cmdLineFlags, Workspace } from '@abw/badger'
import { cwd } from '@abw/badger-filesystem'
import { fail, splitHash } from '@abw/badger-utils'
import { FILES, SCAFFOLD, SRC, VARS } from './Constants.js'
import { absRelPath, maybe, ifLog } from './Utils.js'

export async function configure({ root, help, version }) {
  // read the command line flags
  const { flags, args } = cmdLineFlags({
    options: 'config debug dryrun progress scaffold template verbose yes',
    short: {
      c: 'config',
      d: 'dryrun',
      p: 'progress',
      s: 'scaffold',
      t: 'template',
      o: 'output',
      v: 'verbose',
      y: 'yes',
      h: 'help',
      D: 'debug',
      V: 'version'
    },
    on: {
      help:    help,
      version: version,
      config: (name, arg, args, flags) => {
        flags.config = args.shift()
        return true
      },
      scaffold: (name, arg, args, flags) => {
        flags.scaffold = args.shift()
        return true
      },
      template: (name, arg, args, flags) => {
        flags.template = args.shift()
        return true
      },
      output: (name, arg, args, flags) => {
        flags.output = args.shift()
        return true
      },
    }
  })
  const { debug } = flags

  // module name can be specified as the next command line args or we prompt
  // user to enter it
  const name = args.length
    ? args.shift()
    : await prompt('What is your module name?')
      || fail('No name specified')

  ifLog(debug, `module name: ${name}`)

  // lookup the scaffold directory, either a relative (e.g. '../foo') or
  // absolute (e.g. '/foo') path which is resolved relative to the current
  // working directory, or an indeterminate path (typically the default
  // 'scaffold') which is assumed to be a sub-directory of the distribution
  // root directory.
  const scaffold = flags.scaffold || SCAFFOLD
  const scaffoldDir = absRelPath(scaffold)
    ? cwd().dir(scaffold)
    : root.dir(scaffold)

  ifLog(debug, `scaffoldDir: ${scaffoldDir}`)

  // the scaffold directory should contain a 'src' directory containing the
  // scaffold templates available to use
  const scaffoldSrc = scaffoldDir.dir(SRC)
  const dirs  = await scaffoldSrc.dirs()
  const templates = splitHash(
    dirs.map( dir => dir.name() ),
    k => k
  )

  ifLog(debug, `scaffoldSrc: ${scaffoldSrc}`)

  // it may also contain a config/vars.yaml file containing variable defs
  const scaffoldWs = new Workspace(scaffoldDir)
  const scaffoldConfig = await maybe(
    () => scaffoldWs.config(VARS),
    'No configuration file for vars'    // this is OK
  ) || { }

  ifLog(debug, 'scaffold vars:', scaffoldConfig)

  // scaffold template can be specified via the -t / --template option or
  // we prompt the user to enter it... unless they've selected the -y / --yes
  // option in which case we assume it's the first (TODO: not sure if this is
  // wise?)
  const defType = dirs[0].name()
  const template = flags.template
    || (flags.yes
      ? defType
      : await select('What template do you want to use?', templates)
        || fail('No template specified'))

  ifLog(debug, `template name: ${template}`)

  // the template directory must either be an absolute or relative path which
  // is resolved against the CWD, or it must be in the scaffold/src directory
  const templateDir = absRelPath(template)
    ? cwd().dir(template)
    : scaffoldSrc.dir(template)
  await templateDir.mustExist()

  ifLog(debug, `templateDir: ${templateDir}`)

  // it may also contain a config/vars.yaml file containing variable defs
  const templateWs = new Workspace(templateDir)
  const templateConfig = await maybe(
    () => templateWs.config(VARS),
    'No configuration file for vars'    // this is OK
  ) || { }

  ifLog(debug, 'template vars:', templateConfig)

  // the -c / --config option can be used to specify another file containing
  // variables which should over-ride any in the above file
  const fileConfig = flags.config
    ? await cwd().file(config, { codec: 'auto' }).read()
    : { }

  ifLog(debug, 'config file vars:', fileConfig)

  // merge together the three possible sets of configuration variables
  const config = {
    ...scaffoldConfig,
    ...templateConfig,
    ...fileConfig
  }

  ifLog(debug, 'merged config:', config)

  // the distribution name is the NPM organisation name (if defined) and the
  // module name, or just the module name
  const defDist = config.npmOrg ? `${config.npmOrg}/${name}` : name
  const dist = flags.yes
    ? defDist
    : await prompt('What is the NPM distribution name?', defDist)
      || fail('No distribution specified')

  ifLog(debug, `dist: ${dist}`)

  // prompt for the package manager if not already provided
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

  ifLog(debug, `manager: ${manager}`)

  // the output dir (defaulting to the package name relative to the current
  // working directory) must NOT exist (TODO: add the -f / --force option to
  // override this)
  const output = flags.output || name
  const outputDir = cwd().dir(output)
  const exists = await outputDir.exists()
  if (exists) {
    fail(`${outputDir} already exists - please move it out of the way`)
  }

  // the template config directory may also contain a files.(yaml|json)
  // listing files to include from scaffold/lib
  const files = await maybe(
    () => templateWs.config(FILES),
    'No configuration file for files'    // this is OK
  ) || { }

  return {
    ...config,
    scaffold, scaffoldDir,
    template, templateDir,
    output, outputDir,
    name, dist, manager, files, flags
  }
}

export default configure