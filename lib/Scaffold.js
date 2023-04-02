import nunjucks       from 'nunjucks'
import { timestamp }  from '@abw/badger-timestamp'
import { green, grey, yellow, progress as Progress } from '@abw/badger'
import { chmod }      from 'node:fs/promises'
import { findFiles }  from './Filesystem.js'

export async function scaffold(params) {
  const { src, lib, dest, data, options={} } = params
  const { debug=false, progress=false, verbose=false } = options
  const base      = src.path()
  const length    = base.length + 1
  const files     = await findFiles(src)
  const prog      = progress && Progress({ size: files.length })

  if (options.debug) {
    console.log('scaffolding data:', data)
  }

  const env = nunjucks.configure(
    [
      src.path(),
      lib.path(),
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

  if (verbose || progress || debug) {
    console.log(
      '\nScaffolding files\n',
      grey('\n  from:'), yellow(src.path()),
      grey('\n  with:'), yellow(lib.path()),
      grey('\n    to:'), yellow(dest.path()),
      '\n'
    )
  }

  for (let file of files) {
    const path = file.path()
    const relt = path.slice(length)
    const out  = dest.file(relt)
    // const dir  = out.directory();
    const now  = timestamp()
    const text = nunjucks.render(
      relt,
      {
        ...data,
        template: {
          source:    path,
          output:    out.path(),
          generated: now.stamp(),
        }
      }
    )

    // make sure the output directory exists
    await out.directory().mustExist({ create: true })

    // write the output to the file
    await out.write(text)

    // copy the file permissions
    const stat = await file.stat()
    await chmod(out.path(), stat.mode)

    if (verbose || debug) {
      console.log(
        green(`  ✓ ${relt}`)
      )
      if (debug) {
        console.log(
          grey('    from:'), yellow(path),
          grey('\n      to:'), yellow(out.path())
        )
      }
    }
    else if (prog) {
      prog.printProgress()
    }
  }
}

export default scaffold