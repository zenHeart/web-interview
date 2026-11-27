// 最小 OT 教学实现：字符位置从 0 开始，insert 在该索引之前插入。
// 只演示两个并发、同一基础版本的纯文本操作，不是完整生产 OT 协议。
export const insert = (pos, text, id) => ({ type: 'insert', pos, text, id });
export const remove = (pos, count = 1, id = '') => ({ type: 'delete', pos, count, id });
export const noop = () => ({ type: 'noop' });

export function apply(doc, op) {
  if (op.type === 'noop') return doc;
  if (!Number.isInteger(op.pos) || op.pos < 0 || op.pos > doc.length) throw new RangeError('invalid pos');
  if (op.type === 'insert') return doc.slice(0, op.pos) + op.text + doc.slice(op.pos);
  if (op.type === 'delete') {
    if (!Number.isInteger(op.count) || op.count < 0 || op.pos + op.count > doc.length) throw new RangeError('invalid count');
    return doc.slice(0, op.pos) + doc.slice(op.pos + op.count);
  }
  throw new Error('unknown operation');
}

// 将 operation 从共同的 base 版本，转换到 alreadyApplied 执行后的版本。
// 为了突出规则，本教学版只支持单字符删除；插入可支持多字符。
export function transform(operation, alreadyApplied) {
  const op = { ...operation };
  if (op.type === 'noop' || alreadyApplied.type === 'noop') return op;
  if (op.type === 'delete' && op.count !== 1) throw new Error('teaching OT supports single-char deletion only');
  if (alreadyApplied.type === 'delete' && alreadyApplied.count !== 1) throw new Error('teaching OT supports single-char deletion only');
  if (alreadyApplied.type === 'insert') {
    const p = alreadyApplied.pos, n = alreadyApplied.text.length;
    if (op.type === 'insert') {
      // 同位置插入按唯一操作 ID 决定先后；两个客户端必须采用相同规则。
      if (p < op.pos || (p === op.pos && String(alreadyApplied.id) < String(op.id))) op.pos += n;
    } else if (op.type === 'delete' && p <= op.pos) op.pos += n;
  } else if (alreadyApplied.type === 'delete') {
    const p = alreadyApplied.pos;
    if (op.type === 'insert' && p < op.pos) op.pos--;
    if (op.type === 'delete') {
      if (p === op.pos) return noop();
      if (p < op.pos) op.pos--;
    }
  }
  return op;
}

export function mergePair(base, a, b, first = 'a') {
  const earlier = first === 'a' ? a : b;
  const later = first === 'a' ? b : a;
  const transformed = transform(later, earlier);
  return { transformed, document: apply(apply(base, earlier), transformed) };
}
