"use strict";(self.webpackChunkweb_interview=self.webpackChunkweb_interview||[]).push([["5750"],{1426:function(n,e,t){t.r(e),t.d(e,{default:()=>a,frontMatter:()=>s,metadata:()=>l,assets:()=>o,toc:()=>u,contentTitle:()=>d});var l=JSON.parse('{"id":"algorithm/linklist","title":"linklist","description":"\u94FE\u8868","source":"@site/docs/07.algorithm/03-linklist.md","sourceDirName":"07.algorithm","slug":"/algorithm/linklist","permalink":"/web-interview/docs/algorithm/linklist","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":3,"frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"\u590D\u6742\u5EA6\u5206\u6790","permalink":"/web-interview/docs/algorithm/complex-analysis"},"next":{"title":"\u6811","permalink":"/web-interview/docs/algorithm/tree"}}'),i=t("6773"),r=t("715");let s={},d=void 0,o={},u=[{value:"\u94FE\u8868",id:"\u94FE\u8868",level:2},{value:"\u53CC\u5411\u94FE\u8868",id:"\u53CC\u5411\u94FE\u8868",level:2},{value:"\u5224\u65AD\u94FE\u8868\u662F\u5426\u6709\u73AF",id:"\u5224\u65AD\u94FE\u8868\u662F\u5426\u6709\u73AF",level:2},{value:"\u53CD\u8F6C\u94FE\u8868",id:"\u53CD\u8F6C\u94FE\u8868",level:2}];function h(n){let e={code:"code",h2:"h2",li:"li",p:"p",pre:"pre",ul:"ul",...(0,r.a)(),...n.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(e.h2,{id:"\u94FE\u8868",children:"\u94FE\u8868"}),"\n",(0,i.jsx)(e.h2,{id:"\u53CC\u5411\u94FE\u8868",children:"\u53CC\u5411\u94FE\u8868"}),"\n",(0,i.jsx)(e.p,{children:"\u5728 JavaScript \u4E2D\u5B9E\u73B0\u53CC\u5411\u94FE\u8868\u9700\u8981\u638C\u63E1\u4EE5\u4E0B\u77E5\u8BC6\u70B9\uFF1A"}),"\n",(0,i.jsxs)(e.ul,{children:["\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"\u5982\u4F55\u4F7F\u7528\u6784\u9020\u51FD\u6570\u548C\u7C7B\u521B\u5EFA\u53CC\u5411\u94FE\u8868\u8282\u70B9\uFF0C\u4EE5\u53CA\u5982\u4F55\u5728\u8282\u70B9\u4E4B\u95F4\u5EFA\u7ACB\u53CC\u5411\u8FDE\u63A5\u3002"}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsxs)(e.p,{children:["\u53CC\u5411\u94FE\u8868\u7684\u5E38\u7528\u64CD\u4F5C\uFF0C\u5305\u62EC",(0,i.jsx)(e.code,{children:"\u6DFB\u52A0\u8282\u70B9\u3001\u5220\u9664\u8282\u70B9\u3001\u5728\u7279\u5B9A\u4F4D\u7F6E\u63D2\u5165\u8282\u70B9\u3001\u67E5\u627E\u8282\u70B9"}),"\u7B49\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsxs)(e.p,{children:["\u53CC\u5411\u94FE\u8868\u7684\u904D\u5386\u548C\u8FED\u4EE3\uFF0C\u5305\u62EC",(0,i.jsx)(e.code,{children:"\u6B63\u5411\u904D\u5386\u3001\u53CD\u5411\u904D\u5386\u3001\u5FAA\u73AF\u904D\u5386"}),"\u7B49\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsxs)(e.p,{children:["\u94FE\u8868\u7684\u5E38\u89C1\u95EE\u9898\uFF0C\u4F8B\u5982",(0,i.jsx)(e.code,{children:"\u94FE\u8868\u662F\u5426\u4E3A\u7A7A\u3001\u94FE\u8868\u957F\u5EA6\u3001\u67E5\u627E\u8282\u70B9"}),"\u7B49\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(e.li,{children:["\n",(0,i.jsx)(e.p,{children:"\u5BF9 JavaScript \u5783\u573E\u56DE\u6536\u673A\u5236\u7684\u7406\u89E3\uFF0C\u786E\u4FDD\u53CC\u5411\u94FE\u8868\u7684\u5B9E\u73B0\u4E0D\u4F1A\u5BFC\u81F4\u5185\u5B58\u6CC4\u6F0F\u3002"}),"\n"]}),"\n"]}),"\n",(0,i.jsx)(e.p,{children:"\u4EE5\u4E0A\u77E5\u8BC6\u70B9\u662F\u5B9E\u73B0\u53CC\u5411\u94FE\u8868\u6240\u5FC5\u987B\u638C\u63E1\u7684\u5185\u5BB9\uFF0C\u638C\u63E1\u8FD9\u4E9B\u77E5\u8BC6\u70B9\u80FD\u591F\u5E2E\u52A9\u6211\u4EEC\u6709\u6548\u5730\u521B\u5EFA\u548C\u64CD\u4F5C\u53CC\u5411\u94FE\u8868\u3002"}),"\n",(0,i.jsx)(e.p,{children:"\u4E48\u662F\u53CC\u5411\u94FE\u8868"}),"\n",(0,i.jsx)(e.p,{children:"\u53CC\u5411\u94FE\u8868\uFF08Doubly linked list\uFF09\u662F\u4E00\u79CD\u5E38\u89C1\u7684\u6570\u636E\u7ED3\u6784\uFF0C\u5B83\u662F\u7531\u4E00\u7CFB\u5217\u8282\u70B9\u7EC4\u6210\u7684\uFF0C\u6BCF\u4E2A\u8282\u70B9\u90FD\u5305\u542B\u4E00\u4E2A\u6307\u5411\u524D\u9A71\u8282\u70B9\u548C\u540E\u7EE7\u8282\u70B9\u7684\u6307\u9488\u3002\u76F8\u6BD4\u5355\u5411\u94FE\u8868\uFF0C\u53CC\u5411\u94FE\u8868\u5177\u6709\u53CC\u5411\u904D\u5386\u7684\u80FD\u529B\uFF0C\u5373\u53EF\u4EE5\u4ECE\u4EFB\u610F\u4E00\u4E2A\u8282\u70B9\u5F00\u59CB\uFF0C\u5411\u524D\u6216\u5411\u540E\u904D\u5386\u6574\u4E2A\u94FE\u8868\u3002"}),"\n",(0,i.jsx)(e.p,{children:"\u53CC\u5411\u94FE\u8868\u7684\u6BCF\u4E2A\u8282\u70B9\u901A\u5E38\u5305\u542B\u4E24\u4E2A\u6307\u9488\uFF0C\u5373 prev \u6307\u9488\u548C next \u6307\u9488\u3002prev \u6307\u9488\u6307\u5411\u5F53\u524D\u8282\u70B9\u7684\u524D\u9A71\u8282\u70B9\uFF0C\u800C next \u6307\u9488\u6307\u5411\u5F53\u524D\u8282\u70B9\u7684\u540E\u7EE7\u8282\u70B9\u3002\u7531\u4E8E\u6BCF\u4E2A\u8282\u70B9\u90FD\u5305\u542B\u4E24\u4E2A\u6307\u9488\uFF0C\u56E0\u6B64\u53CC\u5411\u94FE\u8868\u7684\u8282\u70B9\u901A\u5E38\u6BD4\u5355\u5411\u94FE\u8868\u7684\u8282\u70B9\u66F4\u5360\u7528\u7A7A\u95F4\u3002"}),"\n",(0,i.jsx)(e.p,{children:"\u53CC\u5411\u94FE\u8868\u53EF\u4EE5\u7528\u4E8E\u5B9E\u73B0\u5404\u79CD\u6570\u636E\u7ED3\u6784\u548C\u7B97\u6CD5\uFF0C\u5982LRU\uFF08Least Recently Used\uFF09\u7F13\u5B58\u6DD8\u6C70\u7B97\u6CD5\uFF0C\u53CC\u5411\u961F\u5217\uFF08Deque\uFF09\u7B49\u3002\u7531\u4E8E\u5B83\u5177\u6709\u53CC\u5411\u904D\u5386\u7684\u80FD\u529B\uFF0C\u56E0\u6B64\u5728\u67D0\u4E9B\u573A\u666F\u4E0B\u53EF\u4EE5\u6BD4\u5355\u5411\u94FE\u8868\u66F4\u52A0\u9AD8\u6548\u548C\u65B9\u4FBF\u3002"}),"\n",(0,i.jsx)(e.p,{children:"\u73B0\u4E00\u4E2A\u53CC\u5411\u94FE\u8868"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-js",children:"class Node {\n  constructor (value) {\n    this.value = value\n    this.next = null\n    this.prev = null\n  }\n}\n\nclass DoublyLinkedList {\n  constructor () {\n    this.head = null\n    this.tail = null\n    this.length = 0\n  }\n\n  // \u5728\u94FE\u8868\u672B\u5C3E\u6DFB\u52A0\u8282\u70B9\n  push (value) {\n    const node = new Node(value)\n    if (this.length === 0) {\n      this.head = node\n      this.tail = node\n    } else {\n      this.tail.next = node\n      node.prev = this.tail\n      this.tail = node\n    }\n    this.length++\n    return this\n  }\n\n  // \u4ECE\u94FE\u8868\u672B\u5C3E\u79FB\u9664\u8282\u70B9\n  pop () {\n    if (this.length === 0) {\n      return undefined\n    }\n    const node = this.tail\n    if (this.length === 1) {\n      this.head = null\n      this.tail = null\n    } else {\n      this.tail = node.prev\n      this.tail.next = null\n      node.prev = null\n    }\n    this.length--\n    return node.value\n  }\n\n  // \u5728\u94FE\u8868\u5F00\u5934\u6DFB\u52A0\u8282\u70B9\n  unshift (value) {\n    const node = new Node(value)\n    if (this.length === 0) {\n      this.head = node\n      this.tail = node\n    } else {\n      this.head.prev = node\n      node.next = this.head\n      this.head = node\n    }\n    this.length++\n    return this\n  }\n\n  // \u4ECE\u94FE\u8868\u5F00\u5934\u79FB\u9664\u8282\u70B9\n  shift () {\n    if (this.length === 0) {\n      return undefined\n    }\n    const node = this.head\n    if (this.length === 1) {\n      this.head = null\n      this.tail = null\n    } else {\n      this.head = node.next\n      this.head.prev = null\n      node.next = null\n    }\n    this.length--\n    return node.value\n  }\n\n  // \u83B7\u53D6\u6307\u5B9A\u4F4D\u7F6E\u7684\u8282\u70B9\n  get (index) {\n    if (index < 0 || index >= this.length) {\n      return undefined\n    }\n    let node = null\n    if (index < this.length / 2) {\n      node = this.head\n      for (let i = 0; i < index; i++) {\n        node = node.next\n      }\n    } else {\n      node = this.tail\n      for (let i = this.length - 1; i > index; i--) {\n        node = node.prev\n      }\n    }\n    return node\n  }\n\n  // \u5728\u6307\u5B9A\u4F4D\u7F6E\u63D2\u5165\u8282\u70B9\n  insert (index, value) {\n    if (index < 0 || index > this.length) {\n      return false\n    }\n    if (index === 0) {\n      return !!this.unshift(value)\n    }\n    if (index === this.length) {\n      return !!this.push(value)\n    }\n    const node = new Node(value)\n    const prevNode = this.get(index - 1)\n    const nextNode = prevNode.next\n    prevNode.next = node\n    node.prev = prevNode\n    node.next = nextNode\n    nextNode.prev = node\n    this.length++\n    return true\n  }\n\n  // \u79FB\u9664\u6307\u5B9A\u4F4D\u7F6E\u7684\u8282\u70B9\n  remove (index) {\n    if (index < 0 || index >= this.length) {\n      return undefined\n    }\n    if (index === 0) {\n      return this.shift()\n    }\n    if (index === this.length - 1) {\n      return this.pop()\n    }\n    const nodeToRemove = this.get(index)\n    const prevNode = nodeToRemove.prev\n    const nextNode = nodeToRemove.next\n    prevNode.next = nextNode\n    nextNode.prev = prevNode\n    nodeToRemove.next = null\n    nodeToRemove.prev = null\n    this.length--\n    return nodeToRemove.value\n  }\n\n  // \u53CD\u8F6C\u94FE\u8868\n  reverse () {\n    let node = this.head\n    this.head = this.tail\n    this.tail = node\n    let prevNode = null\n    let nextNode = null\n    for (let i = 0; i < this.length; i++) {\n      nextNode = node.next\n      node.next = prevNode\n      node.prev = nextNode\n      prevNode = node\n      node = nextNode\n    }\n    return this\n  }\n\n  // \u901A\u8FC7 value \u6765\u67E5\u8BE2 index\n  findIndexByValue (value) {\n    let currentNode = this.head\n    let index = 0\n\n    while (currentNode) {\n      if (currentNode.value === value) {\n        return index\n      }\n      currentNode = currentNode.next\n      index++\n    }\n\n    return -1 // \u5982\u679C\u94FE\u8868\u4E2D\u6CA1\u6709\u627E\u5230\u8BE5\u503C\uFF0C\u8FD4\u56DE -1\n  }\n\n  // \u6B63\u5411\u904D\u5386\u94FE\u8868\uFF0C\u5E76\u8FD4\u56DE\u904D\u5386\u7ED3\u679C\n  forwardTraversal () {\n    const result = []\n    let current = this.head\n    while (current) {\n      result.push(current.value)\n      current = current.next\n    }\n    return result\n  }\n\n  // \u53CD\u5411\u904D\u5386\u94FE\u8868\uFF0C\u5E76\u8FD4\u56DE\u904D\u5386\u7ED3\u679C\n  backwardTraversal () {\n    const result = []\n    let current = this.tail\n    while (current) {\n      result.push(current.value)\n      current = current.prev\n    }\n    return result\n  }\n\n  // \u5FAA\u73AF\u904D\u5386\u94FE\u8868\uFF0C\u5E76\u8FD4\u56DE\u904D\u5386\u7ED3\u679C\n  loopTraversal () {\n    const result = []\n    let current = this.head\n    while (current) {\n      result.push(current.value)\n      current = current.next\n      if (current === this.head) {\n        break\n      }\n    }\n    return result\n  }\n}\n"})}),"\n",(0,i.jsx)(e.h2,{id:"\u5224\u65AD\u94FE\u8868\u662F\u5426\u6709\u73AF",children:"\u5224\u65AD\u94FE\u8868\u662F\u5426\u6709\u73AF"}),"\n",(0,i.jsx)(e.p,{children:"\u7ED9\u4F60\u4E00\u4E2A\u94FE\u8868\u7684\u5934\u8282\u70B9 head\uFF0C\u5224\u65AD\u94FE\u8868\u4E2D\u662F\u5426\u6709\u73AF\u3002\u5982\u679C\u94FE\u8868\u4E2D\u6709\u67D0\u4E2A\u8282\u70B9\uFF0C\u53EF\u4EE5\u901A\u8FC7\u8FDE\u7EED\u8DDF\u8E2A next \u6307\u9488\u518D\u6B21\u5230\u8FBE\uFF0C\u5219\u94FE\u8868\u4E2D\u5B58\u5728\u73AF\u3002\u5982\u679C\u94FE\u8868\u4E2D\u5B58\u5728\u73AF\uFF0C\u5219\u8FD4\u56DE true \uFF0C\u5426\u5219\u8FD4\u56DE false \u3002"}),"\n",(0,i.jsx)(e.p,{children:"\u901A\u8FC7\u5FEB\u6162\u6307\u9488\u904D\u5386\u94FE\u8868\uFF0C\u82E5\u6162\u6307\u9488\u8FFD\u4E0A\u5FEB\u6307\u9488\uFF0C\u5219\u6709\u73AF"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-js",children:"function hasCycle (head) { if (head === null) { return false } let fast = head.next; let slow = head; while (fast !== slow && fast) { fast = fast.next ? fast.next.next : null; slow = slow.next } return Boolean(fast) }\n"})}),"\n",(0,i.jsx)(e.h2,{id:"\u53CD\u8F6C\u94FE\u8868",children:"\u53CD\u8F6C\u94FE\u8868"}),"\n",(0,i.jsx)(e.p,{children:"\u8F93\u5165\uFF1Ahead = [1,2,3,4,5]\n\u8F93\u51FA\uFF1A[5,4,3,2,1]"}),"\n",(0,i.jsx)(e.p,{children:"\u8FDB\u9636\u9898\uFF1AK\u4E2A\u4E00\u7EC4\u7FFB\u8F6C\u94FE\u8868\n\u8F93\u5165\uFF1Ahead = [1,2,3,4,5], k = 2\n\u8F93\u51FA\uFF1A[2,1,4,3,5]"}),"\n",(0,i.jsx)(e.pre,{children:(0,i.jsx)(e.code,{className:"language-tsx",children:"// \u53CD\u8F6C\u94FE\u8868 \u65F6\u95F4\u590D\u6742\u5EA6 O(n)\uFF0C\u7A7A\u95F4\u590D\u6742\u5EA6 O(1)\nfunction reverseList (head: ListNode | null): ListNode | null {\n  // \u6307\u9488\u4ECE null \u548C head \u8D77\u6B65\uFF0C\u521A\u597D\u53EF\u4EE5\u8986\u76D6\u8FB9\u754C\u6761\u4EF6\n  let pre = null\n  let cur = head\n  while (cur) {\n    const next = cur.next // \u6682\u5B58\n    cur.next = pre\n    pre = cur\n    cur = next\n  }\n  return pre\n}\n\n// K\u4E2A\u4E00\u7EC4\u7FFB\u8F6C\u94FE\u8868\uFF0C\u65F6\u95F4\u590D\u6742\u5EA6O(nK) \u6700\u597D\u7684\u60C5\u51B5\u4E3A O(n) \u6700\u5DEE\u7684\u60C5\u51B5\u4E3A O(n^2)\uFF0C\u7A7A\u95F4\u590D\u6742\u5EA6 O(1)\nfunction reverseKGroup (head: ListNode | null, k: number) {\n  const dummy = new ListNode(0)\n  dummy.next = head\n  let pre = dummy\n  let end = dummy\n  while (end.next != null) {\n    for (let i = 0; i < k && end !== null; i++) {\n      end = end.next\n    }\n    if (end == null) break\n    const start = pre.next\n    const next = end.next\n    end.next = null\n    pre.next = reverseList(start)\n    start.next = next\n    pre = start\n    end = pre\n  }\n  return dummy.next\n}\n\n// Test \u94FE\u8868\u6784\u9020\u6D4B\u8BD5\u6709\u70B9\u9EBB\u70E6\uFF0C\u53EF\u4EE5\u770B\u4EE3\u7801\u5B9E\u73B0\u4E3A\u4E3B\uFF01\nclass ListNode {\n  val: number\n  // eslint-disable-next-line\n  next: ListNode | null\n  constructor (val?: number, next?: ListNode | null) {\n    this.val = val === undefined ? 0 : val\n    this.next = next === undefined ? null : next\n  }\n}\nfunction createList (items: number[] = [1, 2, 3, 4]): ListNode {\n  let next: any = null;\n  [...items].reverse().forEach(it => {\n    next = new ListNode(it, next)\n  })\n  return next\n}\nconst list = createList([1, 2, 3, 4])\nconsole.log(reverseList(list)) // [4, 3, 2, 1]\n"})})]})}function a(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,i.jsx)(e,{...n,children:(0,i.jsx)(h,{...n})}):h(n)}},715:function(n,e,t){t.d(e,{Z:function(){return d},a:function(){return s}});var l=t(1699);let i={},r=l.createContext(i);function s(n){let e=l.useContext(r);return l.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(i):n.components||i:s(n.components),l.createElement(r.Provider,{value:e},n.children)}}}]);