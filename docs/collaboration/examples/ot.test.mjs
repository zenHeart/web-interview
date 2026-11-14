import assert from 'node:assert/strict'
import { insert, remove, apply, transform, mergePair } from './ot.mjs'

const pairs = [
  ['两个不同位置插入','ABC', insert(0,'Y','a'), insert(2,'F','b'),'YABFC'],
  ['同位置插入，确定性排序','ABC', insert(1,'X','a'), insert(1,'Y','b'),'AXYBC'],
  ['删除前方，后方插入左移','ABC', remove(0,1,'a'), insert(2,'F','b'),'BFC'],
  ['同一个字符重复删除','ABC', remove(1,1,'a'), remove(1,1,'b'),'AC'],
  ['不同字符同时删除','ABCD', remove(0,1,'a'), remove(2,1,'b'),'BD'],
  ['插入与删除同位置','ABC', insert(1,'X','a'), remove(1,1,'b'),'AXC'],
]
for (const [name, base, a, b, expected] of pairs) {
  const left = mergePair(base,a,b,'a').document
  const right = mergePair(base,a,b,'b').document
  assert.equal(left,expected,name+' A→B')
  assert.equal(right,expected,name+' B→A')
  console.log('✓',name, left)
}
assert.equal(apply('ABC', transform(remove(1),remove(1))), 'ABC')
console.log('6 scenarios × 2 arrival orders passed')
