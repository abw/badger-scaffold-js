import nunjucks       from 'nunjucks'
import { timestamp }  from '@abw/badger-timestamp'
import { green, grey, yellow, progress as Progress, cyan, brightCyan } from '@abw/badger'
import { chmod }      from 'node:fs/promises'
import { findFiles }  from './Filesystem.js'
import { LIB, SRC } from './Constants.js'
import { ifLog } from './Utils.js'

export async function scaffold(config) {
  const { scaffoldDir, templateDir, outputDir, flags } = config
  const { debug, progress, verbose, dryrun } = flags
  const src    = templateDir.dir(SRC)
  const tlib   = templateDir.dir(LIB)
  const slib   = scaffoldDir.dir(LIB)
  const base   = src.path()
  const length = base.length + 1
  const files  = await findFiles(src)
  const prog   = progress && Progress({ size: files.length })

  ifLog(debug, 'scaffolding data:', config)

  const env = nunjucks.configure(
    [
      src.path(),
      tlib.path(),
      slib.path(),
    ],
    {
      autoescape: true
    }
  )
  env.addFilter(
    'pad',
    function(str, width, char=' ') {
      return str.padEnd(width, char)
    }
  )

  if (verbose || progress || debug || dryrun) {
    console.log(
      `\nScaffolding files ${dryrun ? brightCyan('- DRY RUN') : ''}\n`,
      grey('\n  from:'), yellow(src.path()),
      grey('\n  with:'), yellow(tlib.path()),
      grey('\n  with:'), yellow(slib.path()),
      grey('\n    to:'), yellow(outputDir.path()),
      '\n'
    )
  }

  for (let file of files) {
    const path = file.path()
    const relt = path.slice(length)
    const out  = outputDir.file(relt)
    const now  = timestamp()
    const text = nunjucks.render(
      relt,
      {
        ...config,
        template: {
          source:    path,
          output:    out.path(),
          generated: now.stamp(),
        }
      }
    )

    if (! dryrun) {
      // make sure the output directory exists
      await out.directory().mustExist({ create: true })

      // write the output to the file
      await out.write(text)

      // copy the file permissions
      const stat = await file.stat()
      await chmod(out.path(), stat.mode)
    }

    if (verbose || debug || dryrun) {
      console.log(
        dryrun
          ? cyan(`      ✗ ${relt}`) + brightCyan(' - DRY RUN')
          : green(`      ✓ ${relt}`)
      )
      if (debug) {
        console.log(
          grey('  from:'), yellow(path),
          grey('\n    to:'), yellow(out.path())
        )
      }
    }
    else if (prog) {
      prog.printProgress()
    }
  }
}

export default scaffold