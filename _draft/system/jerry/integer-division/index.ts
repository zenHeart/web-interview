/**

给定两个整数，被除数 dividend 和除数 divisor。将两数相除，要求不使用乘法、除法和 mod 运算符。
返回被除数 dividend 除以除数 divisor 得到的商。

整数除法的结果应当截去（truncate）其小数部分，例如：truncate(8.345) = 8 以及 truncate(-2.7335) = -2

输入: dividend = 10, divisor = 3
输出: 3
解释: 10/3 = truncate(3.33333..) = truncate(3) = 3
// records:
// 12/05 bruteForce 03:40:38'
// 12/05 bi-search: 05:24:72'
// 12/06 bruteForce 02:15:27'
// 12/07 bruteForce 02:13:44'
// 12/07 bi-search  05:38:58'
//
 */
export function divide(dividend: number, divisor: number): number {
    if (dividend === 0) {
        return 0
    }
    if (divisor === 0) {
        throw new Error("Invalid divisor");
    }
    const sign = (dividend > 0) === (divisor > 0) ? 1 : -1
    const absDividend = Math.abs(dividend)
    const absDivisor = Math.abs(divisor)
    let left = 0
    let right = absDividend
    while (left <= right) {
        const mid = Math.floor((left + right) / 2)
        const midVal = mid * absDivisor
        if (midVal === absDividend) {
            return mid * sign
        }
        if (midVal < absDividend) {
            left = mid + 1
        } else {
            right = mid - 1
        }
    }
    return right * sign
    
} 








































function solutionByBiSearch(dividend: number, divisor: number): number {
    if (dividend === 0 || divisor === 0) {
        return 0
    }
    const sign = (dividend > 0) === (divisor > 0) ? 1 : -1

    const absDividend = Math.abs(dividend)
    const absDivisor = Math.abs(divisor)

    let left = 1
    let right = absDividend
    while(left <= right) {
        const mid = Math.floor((left + right) / 2)
        const test = mid * absDivisor
        if (test === absDividend) {
            return mid * sign
        } else if (test > absDividend ) {
            right = mid - 1
        } else {
            left = mid + 1
        }
    }
    return right * sign

}