import process from 'node:process'
import { now } from '@abw/badger-timestamp'

const PACKAGE_VERSION = JSON.stringify(process.env.npm_package_version)
const BUILD_DATE      = JSON.stringify(now().date())

export default {
  PACKAGE_VERSION,
  BUILD_DATE
}
