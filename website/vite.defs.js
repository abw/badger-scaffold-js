import process from 'node:process'

const PACKAGE_VERSION = JSON.stringify(process.env.npm_package_version)
const BUILD_DATE      = JSON.stringify(new Date().toISOString().split('T')[0])

export default {
  PACKAGE_VERSION,
  BUILD_DATE
}
