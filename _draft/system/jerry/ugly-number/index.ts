/**
 * 
丑数是可以被 a 或 b 或 c 整除的 正整数 。

给你四个整数：n 、a 、b 、c ，请你设计一个算法来找出第 n 个丑数。

输入：n = 3, a = 2, b = 3, c = 5
输出：4
解释：丑数序列为 2, 3, 4, 5, 6, 8, 9, 10... 其中第 3 个是 4。

输入：n = 4, a = 2, b = 3, c = 4
输出：6
解释：丑数序列为 2, 3, 4, 6, 8, 9, 10, 12... 其中第 4 个是 6。

输入：n = 5, a = 2, b = 11, c = 13
输出：10
解释：丑数序列为 2, 4, 6, 8, 10, 11, 12, 13... 其中第 5 个是 10。
 
提示：
1 <= n, a, b, c <= 109
1 <= a * b * c <= 1018
本题结果在 [1, 2 * 109] 的范围内

records:
12/05 05:21:00'
12/06 02:55:02'
12/07 03:58:99'
 */

export function findNthNumber(
    n: number,
    a: number,
    b: number,
    c: number
): number {
    let p1 = 1
    let p2 = 1
    let p3 = 1
    const res : number[] = []
    for (let i = 0; i < n; i++) {
        const next1 = p1 * a
        const next2 = p2 * b
        const next3 = p3 * c
        const min = Math.min(next1, next2, next3)
        res.push(min)
        if (next1 === min) {
            p1++
        }
        if (next2 === min) {
            p2++
        }
        if (next3 === min) {
            p3++
        }
    }
    return res[n-1]
}






































function solutionByFast(
    n: number,
    a: number,
    b: number,
    c: number
) {
    // Calculate LCM for pairs and triplet
    const ab = lcm(a, b);
    const ac = lcm(a, c);
    const bc = lcm(b, c);
    const abc = lcm(ab, c);

    // Binary search
    let left = 1;
    let right = 2 * 10 ** 9;
    
    while (left < right) {
        const mid = left + Math.floor((right - left) / 2);
        
        // Count numbers divisible by a, b, or c up to mid
        const count = Math.floor(mid / a) + Math.floor(mid / b) + Math.floor(mid / c)
            - Math.floor(mid / ab) - Math.floor(mid / ac) - Math.floor(mid / bc)
            + Math.floor(mid / abc);
            
        if (count < n) {
            left = mid + 1;
        } else {
            right = mid;
        }
    }
    
    return left;
}

// Helper function to calculate GCD
function gcd(a: number, b: number): number {
    while (b) {
        [a, b] = [b, a % b];
    }
    return a;
}

// Helper function to calculate LCM
function lcm(a: number, b: number): number {
    return Math.floor((a * b) / gcd(a, b));
}
