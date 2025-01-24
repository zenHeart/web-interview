## 链表

## 双向链表

## 判断链表是否有环

给你一个链表的头节点 head，判断链表中是否有环。如果链表中有某个节点，可以通过连续跟踪 next 指针再次到达，则链表中存在环。如果链表中存在环，则返回 true ，否则返回 false 。

 通过快慢指针遍历链表，若慢指针追上快指针，则有环

```js
function hasCycle(head) {    if (head === null) {        return false;    }    let fast = head.next, slow = head;    while (fast !== slow && fast) {        fast = fast.next ? fast.next.next : null;        slow = slow.next;    }    return Boolean(fast);};
```

## 反转链表

输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]

进阶题：K个一组翻转链表
输入：head = [1,2,3,4,5], k = 2
输出：[2,1,4,3,5]

```js
// 反转链表 时间复杂度 O(n)，空间复杂度 O(1)
function reverseList(head: ListNode | null): ListNode | null {
    // 指针从 null 和 head 起步，刚好可以覆盖边界条件
    let pre = null
    let cur = head
    while (cur) {
        const next = cur.next // 暂存
        cur.next = pre
        pre = cur
        cur = next
    }
    return pre
}

// K个一组翻转链表，时间复杂度O(nK) 最好的情况为 O(n) 最差的情况为 O(n^2)，空间复杂度 O(1)
function reverseKGroup(head: ListNode | null, k: number) {
    const dummy = new ListNode(0)
    dummy.next = head
    let pre = dummy
    let end = dummy
    while (end.next != null) {
        for (let i = 0; i < k && end !== null; i++) {
            end = end.next
        }
        if (end == null) break
        let start = pre.next
        let next = end.next
        end.next = null
        pre.next = reverseList(start)
        start.next = next
        pre = start
        end = pre
    }
    return dummy.next
}


// Test 链表构造测试有点麻烦，可以看代码实现为主！
class ListNode {
    val: number;
    next: ListNode | null;
    constructor(val?: number, next?: ListNode | null) {
        this.val = val === undefined ? 0 : val;
        this.next = next === undefined ? null : next;
    }
}
function createList(items: number[] = [1, 2, 3, 4]): ListNode {
    let next: any = null;
    [...items].reverse().forEach(it => {
        next = new ListNode(it, next)
    })
    return next
}
const list = createList([1, 2, 3, 4])
console.log(reverseList(list)) // [4, 3, 2, 1]
```
