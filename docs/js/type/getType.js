// eslint-disable-next-line
function isObject (value) {
  const type = typeof value
  return value != null && (type === 'object' || type === 'function')
}

// eslint-disable-next-line
function isString (value) {
  const type = typeof value

  return type === 'string' || (type === 'object' && value !== null && !Array.isArray(value))
}
