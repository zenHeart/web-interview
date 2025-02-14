/**
 * Given a string num that contains only digits and an integer target, return all possibilities to insert the binary operators '+', '-', and/or '*' between the digits of num so that the resultant expression evaluates to the target value.

Note that operands in the returned expressions should not contain leading zeros.

Example 1:

Input: num = "123", target = 6
Output: ["1*2*3","1+2+3"]
Explanation: Both "1*2*3" and "1+2+3" evaluate to 6.
Example 2:

Input: num = "232", target = 8
Output: ["2*3+2","2+3*2"]
Explanation: Both "2*3+2" and "2+3*2" evaluate to 8.
Example 3:

Input: num = "3456237490", target = 9191
Output: []
Explanation: There are no expressions that can be created from "3456237490" to evaluate to 9191.

Constraints:

1 <= num.length <= 10
num consists of only digits.
-231 <= target <= 231 - 1
 */

// records:
// 12/05 14:29:87'
// 12/06 16:42:71'
// 12/07 07:30:03'
export function calcWays(nums: string, target: number): string[] {
    let res : string[] = []
    function search(pos: number, value: number, exp: string, multed: number) {
        if (pos >= nums.length) {
            if (value === target) {
                res.push(exp)
            }
            return
        }

        let curr = 0
        for (let i = pos; i < nums.length; i++) {
            curr = curr * 10 + Number(nums[i])
            if (pos === 0) {
                search(i + 1, curr, `${curr}`, curr)
                continue
            }
            if (nums[pos] === '0' && pos !== i) {
                break
            }

            search(i + 1, value + curr, `${exp}+${curr}`, curr)
            search(i + 1, value - curr, `${exp}-${curr}`, -curr)
            search(
                i + 1,
                (value - multed) + multed * curr,
                `${exp}*${curr}`,
                multed*curr
            )
        }
    }

    search(0, 0, '', 0)
    return res
}

































function solutionByBackTrack(num: string, target: number): string[] {
    const result: string[] = [];
    
    function backtrack(
        pos: number,
        expr: string,
        value: number,
        multed: number
    ) {
        // 到达字符串末尾，检查结果
        if (pos === num.length) {
            if (value === target) {
                result.push(expr);
            }
            return;
        }
        
        // curr 用于构建多位数
        let curr = 0;
        
        // 处理数字可能的组合（处理多位数的情况）
        for (let i = pos; i < num.length; i++) {

            // Skip numbers with leading zeros
            if (i !== pos && num[pos] === '0') break;
            
            curr = curr * 10 + Number(num[i]);
            const valStr = curr.toString(); 
            
            if (pos === 0) {
                // 第一个数字，直接递归
                backtrack(i + 1, valStr, curr, curr);
            } else {
                // 加法
                backtrack(i + 1, expr + '+' + valStr, value + curr, curr);
                // 减法
                backtrack(i + 1, expr + '-' + valStr, value - curr, -curr);
                // 乘法
                backtrack(i + 1, expr + '*' + valStr, value - multed + multed * curr, multed * curr);
            }
        }
    }
    
    backtrack(0, '', 0, 0);
    return result;
}
