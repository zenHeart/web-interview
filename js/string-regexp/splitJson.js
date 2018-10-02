/**
 * 分割连接在一起的 json 包,只对第一个包做解析
 * @param str
 */
exports.splitJson = function (str) {
    //利用 }{ 特征区分粘结的 json
    let splitIndex = str.indexOf('}{');
    return str.substr(0, splitIndex + 1);
}