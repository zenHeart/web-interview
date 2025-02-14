/**
 * n*2 + 1
 * n*3 + 1
 * 
 * records:
 * 12/06: 05:19:55'
 * 12/07: 01:47:05'
 */

export function findNthOddNumber(n: number): number {
    const res = [1]
    let p1 = 0
    let p2 = 0
    for (let i = 1; i < n; i++) {
        const next1 = res[p1] * 2 + 1
        const next2 = res[p2] * 3 + 1
        const min = Math.min(next1, next2)
        res.push(min)
        if (min === next1) {
            p1++
        }
        if (min === next2) {
            p2++
        }
    }
    return res[n-1]
}














































function solutionByHeap(n: number): number {
    const minHeap = new MinHeap()
    const visited = new Set<number>()

    minHeap.add(1)
    visited.add(1)

    for (let i = 1; i < n; i++) {
        const current = minHeap.remove()
        
        const candidates = [
            current * 2 + 1,
            current * 3 + 1
        ]

        candidates.forEach(num => {
            if (!visited.has(num)) {
                minHeap.add(num)
                visited.add(num)
            }
        })
    }

    return minHeap.remove()
}

class MinHeap {
    private heap: number[] = []

    getLastValue(): number {
        if (this.heap.length === 0) {
            return -1
        }
        return this.heap[this.heap.length - 1]
    }

    getFirstValue(): number {
        if (this.heap.length === 0) {
            return -1
        }
        return this.heap[0]
    }

    add(num: number) {
        this.heap.push(num)
        this.bubbleUp(this.heap.length - 1)
    }

    private swap(index1: number, index2: number) {
        [this.heap[index1], this.heap[index2]] = [this.heap[index2], this.heap[index1]]
    }

    private bubbleUp(index: number) {
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2)
            if (this.heap[index] < this.heap[parentIndex]) {
                this.swap(index, parentIndex)
                index = parentIndex
            } else {
                break
            }
        }
    }

    remove() {
        if (this.heap.length === 0) {
            return -1
        }
        const min = this.heap[0]

        if (this.heap.length === 1) {
            this.heap = []
            return min
        }

        const last = this.heap.pop()!
        this.heap[0] = last
        this.bubbleDown(0)
        return min
    }

    private bubbleDown(index: number) {
        let currentIndex = index 
        while (true) {
            const leftIndex = 2 * currentIndex + 1
            const rightIndex = 2 * currentIndex + 2
            let smallestIndex = currentIndex

            if (
                leftIndex < this.heap.length 
                && this.heap[leftIndex] < this.heap[smallestIndex]
            ) {
                smallestIndex = leftIndex
            }
            
            if (
                rightIndex < this.heap.length 
                && this.heap[rightIndex] < this.heap[smallestIndex]
            ) {
                smallestIndex = rightIndex
            }

            if (smallestIndex !== currentIndex) {
                this.swap(currentIndex, smallestIndex)
                currentIndex = smallestIndex
            } else {
                break
            }
        }
    }
}

// time complexity: O(1)
// space complexity: O(n)
function solutionByTwoPointer(n: number): number {
    const result = [1]
    let kNumberP1 = 0
    let kNumberP2 = 0

    while (result.length < n) {
        const num1 = result[kNumberP1] * 2 + 1
        const num2 = result[kNumberP2] * 3 + 1

        if (num1 < num2) {
            result.push(num1)
            kNumberP1++
        } else if (num1 > num2) {
            result.push(num2)
            kNumberP2++
        } else {
            result.push(num1)
            kNumberP1++
            kNumberP2++
        }
    }

    return result[n - 1]
}