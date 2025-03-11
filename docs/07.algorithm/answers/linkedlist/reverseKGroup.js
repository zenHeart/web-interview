/**
 * k 个为一组翻转，不足 k 个不翻转
 * 1 -> 2 -> 3 -> 4 -> 5
 * k = 2
 * 2 -> 1 -> 4 -> 3 -> 5
 *
 * 1. 分组 count % k , count / k
 * 2. 分组的节点完全翻转 ,ReverseGLi= [starti, endi],
 * 3. 翻转后的 ReverseGLi，和剩余的组 Glefti 组合
 * 4. 重新连接上面分组节点
 *
 */
// function reverseKGroup (l1, k) {
//   const dummy = { next: l1 }
//   let cur = dummy.next
//   let count = 0
//   // 1. 计算 count 节点数量
//   while (cur) {
//     cur = cur.next
//     count++
//   }
//   // 2. 分组数量
//   const groupCount = Math.floor(count / k)
//   const leftCount = count % k

//   // 3. 循环分组
//   let group = 1
//   let cur = dummy.next
//   while (group++ <= groupCount) {
//     let start = cur
//     for (i = 0; i < k; i++) {
//       let back = cur.next

//     }
//   }
// }
