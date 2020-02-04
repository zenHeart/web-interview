exports.splitMultiply = splitMultiply;
exports.persistence = persistence;

/**
 * 返回整数的乘法持久性.
 For example:
 because 3*9 = 27, 2*7 = 14, 1*4=4,and 4 has only one digit
 persistence(39) === 3;
 because 9*9*9 = 729, 7*2*9 = 126, 1*2*6 = 12, and finally 1*2 = 2
 persistence(999) === 4;
 because 4 is already a one-digit number
 persistence(4) === 0;

 * @param {Number} num 无符号正整形
 */
function persistence(num) {
    let n = 0;
    if(Number.isSafeInteger(num) && num > 0) {
        while ((num+'').length > 1)  {
           num =  splitMultiply(num);
           n++
        }
        return n;

    } else {
        throw new Error('input must be positive safe integer');
    }

}

/**
 * 将整数拆分,按位相乘,例如 123,拆为 1*2*3,返回结果 6
 * @param  {Number} num 无符号整数
 */
function splitMultiply(num) {
    let product = 1;

    for (let i of num.toString()) {
        product *= Number(i);
    }

    return product;
}