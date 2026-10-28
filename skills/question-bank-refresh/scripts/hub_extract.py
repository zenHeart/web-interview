#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Hub 主站 section 提取器（锚点法 + 编号前缀法）。

纪律（SKILL.md 坑 53/54）：
  - section id 从 HTML 正则抓取，在 Python 内部遍历，**不要当 shell 参数传**（含空格会被拆散）。
  - 题面提取：①锚点法（找「参考答案：」往前最近一条非空行）②编号前缀正则 `N.` / `N、` / `Q:` / `Q1:`
  - 每个分节都要打印命中条数，0 条必须人工看格式。
"""
import html as htmllib
import re
import sys
from pathlib import Path

RAW = Path(sys.argv[1] if len(sys.argv) > 1 else "/tmp/hub.html").read_text(encoding="utf-8", errors="replace")

# 1) 抓所有 section 的 id 与其 HTML 片段
sec_re = re.compile(r'<section[^>]*\bid="(section-[^"]*)"[^>]*>(.*?)</section>', re.S)
sections = sec_re.findall(RAW)

# 2) 剥标签但保留换行
def strip_tags(s: str) -> str:
    s = re.sub(r'<(script|style)[^>]*>.*?</\1>', ' ', s, flags=re.S | re.I)
    s = re.sub(r'<br\s*/?>', '\n', s, flags=re.I)
    s = re.sub(r'</(p|div|li|h\d|tr|section)>', '\n', s, flags=re.I)
    s = re.sub(r'<[^>]+>', ' ', s)
    s = htmllib.unescape(s)
    s = re.sub(r'[ \t\xa0]+', ' ', s)
    return s

NUM_PREFIX = re.compile(r'^\s*(?:\d{1,3}[.、]|[Qq]\d{0,3}[:：])\s*(.+)$')
ANS_ANCHOR = "参考答案"

report = []
for sid, body in sections:
    text = strip_tags(body)
    lines = [ln.strip() for ln in text.split("\n")]
    lines = [ln for ln in lines if ln]
    qas = []
    # 锚点法：每个「参考答案：」往前找最近一条非空行
    for i, ln in enumerate(lines):
        if ANS_ANCHOR in ln and len(ln) < 40:
            # 往前找题面
            cand = None
            for j in range(i - 1, max(-1, i - 6), -1):
                c = lines[j]
                if not c or ANS_ANCHOR in c:
                    continue
                m = NUM_PREFIX.match(c)
                cand = (m.group(1) if m else c).strip()
                break
            if cand and len(cand) > 6:
                qas.append(cand)
    # 编号前缀法：没有「参考答案：」的纯编号分节
    if not qas:
        for ln in lines:
            m = NUM_PREFIX.match(ln)
            if m:
                t = m.group(1).strip()
                if len(t) > 6 and not t.endswith("："):
                    qas.append(t)
    # 去重保序
    seen, uniq = set(), []
    for q in qas:
        if q not in seen:
            seen.add(q)
            uniq.append(q)
    report.append((sid, len(uniq), uniq))

total = 0
for sid, n, qs in report:
    total += n
    flag = "  <== 0 命中" if n == 0 else ""
    print(f"{n:4d}  {sid}{flag}")
print(f"\n合计 section {len(report)} 个，带答案 Q&A {total} 组")

# 导出题面供后续筛选
out = Path("/tmp/hub_questions.txt")
with out.open("w", encoding="utf-8") as f:
    for sid, n, qs in report:
        for q in qs:
            f.write(f"[{sid}]\t{q}\n")
print(f"题面已写入 {out}")
