export const imgUrl = uri =>
  `${import.meta.env.BASE_URL}/${uri}`.replace(/\/+/, '/')

// eslint-disable-next-line no-undef
export const version = PACKAGE_VERSION
// eslint-disable-next-line no-undef
export const date = BUILD_DATE
