/**
 * 深拷贝函数
 * 1. 采用递归实现拷贝
 * 2. 考试引用类型判断
 * 3. 考察 null 判断
 */
exports.deepClone = function deepClone (obj) {
  let copy;
  if (Array.isArray(obj)) {
    copy = [];
    copy = obj.map(ele => deepClone(ele));
  } else if ((typeof obj === 'object') & (obj !== null)) {
    copy = {};
    const keys = Object.keys(obj);
    for (const key of keys) {
      copy[key] = deepClone(obj(key));
    }
  } else {
    copy = obj;
  }
  return copy;
};
