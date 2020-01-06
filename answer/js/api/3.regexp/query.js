/**
 * 提取 url 中的 查询字段
 * url: <scheme>://<host>:<port><path>?<query>#<anchor>?
 */
function parserUrl(url) {
	let queryPart = /(?<=\?).*?(?=#|$)/;
	let [res] =  queryPart.exec(url);
	

}