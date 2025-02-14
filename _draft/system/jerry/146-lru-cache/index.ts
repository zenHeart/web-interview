/**
请你设计并实现一个满足  LRU (最近最少使用) 缓存 约束的数据结构。
实现 LRUCache 类：
LRUCache(int capacity) 以 正整数 作为容量 capacity 初始化 LRU 缓存
int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
void put(int key, int value) 如果关键字 key 已经存在，则变更其数据值 value ；如果不存在，则向缓存中插入该组 key-value 。如果插入操作导致关键字数量超过 capacity ，则应该 逐出 最久未使用的关键字。
函数 get 和 put 必须以 O(1) 的平均时间复杂度运行。

records:
12/05 11:29:22'
12/06: 11:15:13'
12/07: 07:56:69'
 */

class ListNode {
    key: number
    value: number
    prev: ListNode | null
    next: ListNode | null

    constructor(key: number, value: number) {
        this.key = key
        this.value = value

        this.prev = null
        this.next = null
    }
}

export class LRUCache {
    private capacity: number
    private cache: Map<number, ListNode>

    private head: ListNode
    private tail: ListNode

    constructor(capacity: number) {
        this.capacity = capacity
        this.cache = new Map()

        this.head = new ListNode(-1, -1)
        this.tail = new ListNode(-1, -1)
        this.head.next = this.tail
        this.tail.prev = this.head
    }

    private updateUsed(node: ListNode) {
        this.remove(node)
        this.appendFront(node)
    }

    private remove(node: ListNode) {
        node.next!.prev = node.prev
        node.prev!.next = node.next
    }

    private appendFront(node: ListNode) {
        node.next = this.head.next
        node.prev = this.head

        this.head.next!.prev = node
        this.head.next = node
    }

    get(key: number) {
        if (this.cache.has(key)) {
            const node = this.cache.get(key)!
            this.updateUsed(node)
            return node.value
        }
        return -1
    }

    put(key: number, value: number) {
        if (this.cache.has(key)) {
            const node = this.cache.get(key)!
            node.value = value
            this.updateUsed(node)
            this.cache.set(key, node)
            return
        }
        const node = new ListNode(key, value)
        this.cache.set(key, node)
        this.appendFront(node)

        if (this.capacity < this.cache.size) {
            const delNode = this.tail.prev!
            this.remove(delNode)
            this.cache.delete(delNode.key)
        }

    }
}
