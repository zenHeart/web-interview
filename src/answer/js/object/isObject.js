/**
 * isObject 方法判断需要注意 3 点
 * 1. 值非 null
 * 2. 对象类型为
 */
exports.isObject = function isObject(obj) {
    return Object.prototype.toString.call(obj) === '[object Object]';
};
