function decodeQuery (url) {
  const queryIndex = url.indexOf('?')
  if (queryIndex === -1) return {}
  const query = url.slice(queryIndex + 1)
  if (!query) return {}
  const result = {}
  // 支持 key=value&key2=value2，支持重复 key → 数组
  query.split('&').forEach(pair => {
    if (!pair) return
    const [k, v = ''] = pair.split('=')
    const key = decodeURIComponent(k.replace(/\+/g, '%20'))
    const value = decodeURIComponent(v.replace(/\+/g, '%20'))
    if (Object.prototype.hasOwnProperty.call(result, key)) {
      const exist = result[key]
      result[key] = Array.isArray(exist) ? [...exist, value] : [exist, value]
    } else {
      result[key] = value
    }
  })
  return result
}

module.exports = decodeQuery


