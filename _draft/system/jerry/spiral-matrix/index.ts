/**
 * 给你一个 m 行 n 列的矩阵 matrix ，请按照 顺时针螺旋顺序 ，返回矩阵中的所有元素。
 * 
 * @example
 * 输入：matrix = [[1,2,3],[4,5,6],[7,8,9]]
 * 输出：[1,2,3,6,9,8,7,4,5]
 * 
 * records:
 * 12/06 06:57:53'
 * 12/07 05:00:05'
 */
export function spiralOrder(matrix: number[][]): number[] {
    const results: number[] = []
    const rows = matrix.length
    if (rows < 1) {
        return results
    }
    const cols = matrix[0].length
    const directions = [
        [0, 1],
        [1, 0],
        [0 , -1],
        [-1, 0],
    ]
    const visisted = Array(rows).fill(false).map(() => Array(cols).fill(false))

    function needChangeDirection(row: number, col: number) {
        if (row < 0 || col < 0 || row >= rows || col >= cols) {
            return true
        }
        return visisted[row][col]
    }

    let directIndex = 0

    let col = 0
    let row = 0
    for (let i = 0; i < rows * cols; i++) {
        results.push(matrix[row][col])
        visisted[row][col] = true

        let nextRow = row + directions[directIndex][0]
        let nextCol = col + directions[directIndex][1]
        if (needChangeDirection(nextRow, nextCol)) {
            directIndex = (directIndex + 1) % 4

            nextRow = row + directions[directIndex][0]
            nextCol = col + directions[directIndex][1]
        }
        row = nextRow
        col = nextCol
    }
    
    return results
}







































function solutionByPointers(matrix: number[][]): number[] {
    const result: number[] = [];
    if (matrix.length === 0) return result;

    let top = 0;
    let bottom = matrix.length - 1;
    let left = 0;
    let right = matrix[0].length - 1;

    while (top <= bottom && left <= right) {
        for (let i = left; i <= right; i++) {
            result.push(matrix[top][i]);
        }
        top++;

        for (let i = top; i <= bottom; i++) {
            result.push(matrix[i][right]);
        }
        right--;

        if (top <= bottom) {
            for (let i = right; i >= left; i--) {
                result.push(matrix[bottom][i]);
            }
            bottom--;
        }

        if (left <= right) {
            for (let i = bottom; i >= top; i--) {
                result.push(matrix[i][left]);
            }
            left++;
        }
    }

    return result;

}