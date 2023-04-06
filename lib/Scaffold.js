import nunjucks           from 'nunjucks'
import { timestamp }      from '@abw/badger-timestamp'
import { chmod }          from 'node:fs/promises'
import { LIB, SRC }       from './Constants.js'
import { ifLog }          from './Utils.js'
import { dir }            from '@abw/badger-filesystem'
import { findFilePaths }  from './Filesystem.js'
import {
  green, grey, yellow, cyan, brightCyan,
  progress as Progress
} from '@abw/badger'

export async function scaffold(config) {
  const { scaffoldDir, templateDir, outputDir, files, flags } = config
  const { debug, progress, verbose, dryrun } = flags
  const src  = templateDir.dir(SRC)
  const tlib = templateDir.dir(LIB)
  const slib = scaffoldDir.dir(LIB)

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

  let paths = [ ]

  // first expand any file explicitly listed in config/files.(yaml|json|js)
  for (let f of Object.entries(files)) {
    const [src, dest] = f
    const file  = slib.file(src)
    const isDir = await file.isDirectory()
    if (isDir) {
      // expand paths for a directory
      const subdir = slib.dir(src)
      const files  = await findFilePaths(subdir, dir(src), dir(dest))
      paths.push(...files)
    }
    else {
      paths.push([file, src, dest])
    }
  }

  // then add in any that are in the src directory - these should overwrite
  // any specified above
  let srcPaths = await findFilePaths(src)
  paths.push(...srcPaths)

  const prog = progress && Progress({ size: paths.length })

  for (let path of paths) {
    const [file, inPath, outPath] = path
    const out  = outputDir.file(outPath)
    const now  = timestamp()
    const text = nunjucks.render(
      inPath,
      {
        ...config,
        template: {
          source:    inPath,
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
          ? cyan(`      ✗ ${outPath}`) + brightCyan(' - DRY RUN')
          : green(`      ✓ ${outPath}`)
      )
      if (debug) {
        console.log(
          grey('  from:'), yellow(file.path()),
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