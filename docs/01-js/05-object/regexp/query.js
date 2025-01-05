/**
 * 提取 url 中的 查询字段
 * url: <scheme>://<host>:<port><path>?<query>#<anchor>?
 */
// eslint-disable-next-line
function parserUrl (url) {
  const queryPart = /(?<=\?).*?(?=#|$)/
  // eslint-disable-next-line
  const [res] = queryPart.exec(url)
}
