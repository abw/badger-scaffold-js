import { brightRed } from '@abw/badger'
import { DEFAULT } from './Constants.js'

export const absRelPath = path =>
  path.match(/\.*\//)

export const maybeDefault = file =>
  file + DEFAULT

export const maybe = async (fn, expect) => {
  try {
    return await fn()
  }
  catch (e) {
    if (e.message === expect ) {
      return null
    }
    else {
      throw(e)
    }
  }
}

export function ifLog(test, format, ...args) {
  if (test) {
    console.log(brightRed('DEBUG > ') + format, ...args)
  }
}
