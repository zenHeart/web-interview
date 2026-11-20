import React, { useState } from 'react'

type Op = { type: 'insert' | 'delete'; pos: number; text?: string; id: string }
const cases: { title: string; base: string; a: Op; b: Op; intent: string; lesson: string }[] = [
  { title: '前方插入改变坐标', base: 'ABC', a: { type: 'insert', pos: 0, text: 'Y', id: 'a' }, b: { type: 'insert', pos: 2, text: 'F', id: 'b' }, intent: 'YABFC', lesson: 'B 发出的索引 2 基于旧版 ABC；A 在前面插字后，需要转换成索引 3。' },
  { title: '同一位置并发插入', base: 'ABC', a: { type: 'insert', pos: 1, text: 'X', id: 'a' }, b: { type: 'insert', pos: 1, text: 'Y', id: 'b' }, intent: 'AXYBC', lesson: '两个人插在同一位置，需要统一的操作 ID 排序规则，而不是依靠本机时间。' },
  { title: '重复删除同一个字符', base: 'ABC', a: { type: 'delete', pos: 1, id: 'a' }, b: { type: 'delete', pos: 1, id: 'b' }, intent: 'AC', lesson: 'B 已被删除后，第二次删除要转换为 No-op，否则会误删 C。' },
  { title: '先删除再插入', base: 'ABC', a: { type: 'delete', pos: 0, id: 'a' }, b: { type: 'insert', pos: 2, text: 'F', id: 'b' }, intent: 'BFC', lesson: '删除 A 后，原来 B 与 C 之间的插入索引从 2 左移到 1。' }
]
function apply(s: string, o: any) { if(o.type==='noop') return s; return o.type==='insert' ? s.slice(0,o.pos)+(o.text||'')+s.slice(o.pos) : s.slice(0,o.pos)+s.slice(o.pos+1) }
function transform(op: any, done: any) {
  const x={...op}
  if(done.type==='insert'){
    if(x.type==='insert' && (done.pos<x.pos || (done.pos===x.pos && done.id<x.id))) x.pos+=(done.text||'').length
    if(x.type==='delete' && done.pos<=x.pos) x.pos+=(done.text||'').length
  } else {
    if(x.type==='insert' && done.pos<x.pos) x.pos--
    if(x.type==='delete'){ if(done.pos===x.pos)return {type:'noop'}; if(done.pos<x.pos)x.pos-- }
  }
  return x
}
function showOp(o: any) { return o.type==='noop' ? 'No-op' : o.type==='insert' ? 'Insert('+o.pos+', '+JSON.stringify(o.text)+')' : 'Delete('+o.pos+')' }
const styles: Record<string,React.CSSProperties>={
  root:{border:'1px solid var(--ifm-color-emphasis-300)',borderRadius:16,padding:20,margin:'24px 0'},
  bar:{display:'flex',gap:10,flexWrap:'wrap',alignItems:'center',marginBottom:14},
  select:{background:'var(--ifm-background-surface-color)',color:'var(--ifm-font-color-base)',border:'1px solid var(--ifm-color-emphasis-300)',borderRadius:8,padding:'9px 12px',maxWidth:'100%'},
  panel:{background:'var(--ifm-color-emphasis-100)',borderRadius:10,padding:14,marginTop:12},
  label:{fontSize:13,opacity:.75},
  code:{fontFamily:'monospace',fontSize:23,fontWeight:700,letterSpacing:2,overflowWrap:'anywhere'},
  button:{padding:'8px 14px',borderRadius:8,border:'1px solid var(--ifm-color-primary)',cursor:'pointer',background:'var(--ifm-color-primary)',color:'white'},
  subtle:{padding:'8px 14px',borderRadius:8,border:'1px solid var(--ifm-color-emphasis-400)',cursor:'pointer',background:'transparent',color:'var(--ifm-font-color-base)'}
}
export default function CollaborationLab() {
  const [idx,setIdx]=useState(0)
  const [order,setOrder]=useState<'ab'|'ba'>('ab')
  const [step,setStep]=useState(0)
  const c=cases[idx]
  const first=order==='ab'?c.a:c.b,second=order==='ab'?c.b:c.a
  const firstDoc=apply(c.base,first)
  const naive=apply(firstDoc,second)
  const transformed=transform(second,first)
  const result=apply(firstDoc,transformed)
  const current=[c.base,firstDoc,naive,result][step]
  return <section style={styles.root} aria-label="OT 操作转换交互实验">
    <div style={styles.bar}>
      <label>场景：<select style={styles.select} value={idx} onChange={e=>{setIdx(Number(e.target.value));setStep(0)}}>{cases.map((s,i)=><option value={i} key={i}>{s.title}</option>)}</select></label>
      <label>消息抵达顺序：<select style={styles.select} value={order} onChange={e=>{setOrder(e.target.value as any);setStep(0)}}>
        <option value="ab">先 A 后 B</option><option value="ba">先 B 后 A</option></select></label>
    </div>
    <div style={styles.panel}><div style={styles.label}>两位用户都基于同一原始版本产生操作</div><div>A：<code>{showOp(c.a)}</code></div><div>B：<code>{showOp(c.b)}</code></div></div>
    <div style={styles.panel} aria-live="polite">
      <div style={styles.label}>{['① 初始文档','② 先执行第一条操作','③ 直接照搬旧索引（错误示范）','④ 转换第二条操作后执行'][step]}</div>
      <div style={{...styles.code,color:step===2&&naive!==result?'var(--ifm-color-danger)': 'var(--ifm-font-color-base)'}}>{current}</div>
      {step===3 && <div>转换规则：<code>{showOp(second)} → {showOp(transformed)}</code></div>}
      {step===2&&naive!==result&&<p style={{marginBottom:0}}>问题：第二条操作的位置来自旧版本。</p>}
    </div>
    <div style={{...styles.bar,marginTop:14,marginBottom:4}}>
      <button style={styles.subtle} disabled={step===0} onClick={()=>setStep(s=>Math.max(0,s-1))}>上一步</button>
      <button style={styles.button} onClick={()=>setStep(s=>s===3?0:s+1)}>{step===3?'重新演示':'下一步'}</button>
      <span style={styles.label}>{step+1} / 4</span>
    </div>
    <p style={{marginBottom:0}}><strong>为什么：</strong>{c.lesson} <strong>期望结果：</strong><code>{c.intent}</code></p>
    <small>教学模型：两条并发操作、单字符删除，演示转换规则；不是完整的生产级 OT 协议。</small>
  </section>
}
