exports.parseKey = parseKey;
exports.parse = parse;

/**
 * 采用字符串模式读取对象键值.
 例如:

 let object = {
  b: { c: 4 }, d: [{ e: 5 }, { e: 6 }],
};

 function parse(obj, parseStr) {
  // code

}

 console.log(parse(object, 'b.c') == 4); //true
 console.log(parse(object, 'd[0].e') == 5); //true
 console.log(parse(object, 'd.0.e') == 5); //true
 console.log(parse(object, 'd[1].e') == 6); //true
 console.log(parse(object, 'd.1.e') == 6); //true
 console.log(parse(object, 'f') == 'undefined'); //true


 * @param {Object} obj 对象
 * @param {String} keyStr 对象键的索引字符串
 */
function parse(obj,keyStr) {
    if(obj && typeof obj === 'object' && typeof keyStr === 'string') {
        let keyArr = parseKey(keyStr),res = obj ;

        while(keyArr.length && res) {
            res = res[keyArr.shift()];
        }
        return res===undefined?'undefined':res;
    }else {
        throw new Error('input error!');
    }
}

/**
 * 将索引字符串拆分为键的数组
 * @param {String} keyStr 索引字符串
 */
function parseKey(keyStr) {
    let keyDelimiter = /\w+\b/g;
    let keyArr = [],res;

    while ((res = keyDelimiter.exec(keyStr)) !== null) {
        keyArr.push(res[0]);
    }

    return keyArr;
}
