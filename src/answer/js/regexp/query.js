/**
 * 提取 url 中的 查询字段
 * url: <scheme>://<host>:<port><path>?<query>#<anchor>?
 */
function parserUrl (url) {
  const queryPart = /(?<=\?).*?(?=#|$)/;
  const [res] = queryPart.exec(url);
}
