import { file, dir } from '@abw/badger'
import { lstat } from 'node:fs/promises'

export async function findFiles(d) {
  const entries = await d.read()
  let files = [ ];

  for (let entry of entries) {
    const path = d.relativePath(entry);
    const stat = await lstat(path);
    if (stat.isFile()) {
      files.push(file(path));
    }
    else if (stat.isDirectory()) {
      const subs = await findFiles(dir(path));
      files.push(...subs)
    }
  }

  return files;
}

export default findFiles