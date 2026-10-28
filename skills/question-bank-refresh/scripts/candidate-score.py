#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""候选发现：Hub 概念标题 vs 现有题库。

纪律（SKILL.md 坑 4 / 35 / 49）：
  - 覆盖判定**只扫「题目标题 + slug」**，不扫全文。
  - CJK 2-gram 打分**只用于排序**，最终判定靠 grep 复核。
"""
import re
from pathlib import Path

DOCS = Path("/Users/chengle/code/github/.worktrees/qb-refresh-20261029/docs")

STOP = set("的了吗呢吧是在有和与对如何怎么什么哪些一个我们你他们这那如果为什么可以需要进行是否以及怎样多少"
           "实现设计方案问题处理使用情况时候能不能讲一下介绍谈谈说讲讲原理机制场景面向基于为了这个那个"
           "以及或者还要会不会什么样子什么样哪些哪些请说说看一二三四五六七八九十".split())

def load_blob():
    parts, titles = [], set()
    for p in DOCS.rglob("*.md"):
        try:
            text = p.read_text(encoding="utf-8")
        except OSError:
            continue
        for line in text.splitlines():
            m = re.match(r"^#{2,4}\s+(.+?)\s*(\{#[^}]+\})?\s*$", line)
            if m:
                titles.add(m.group(1).strip())
                parts.append(m.group(1))
                if m.group(2):
                    parts.append(m.group(2))
    return "\n".join(parts).lower(), titles

def grams(s: str) -> set:
    out = set()
    for seg in re.findall(r"[\u4e00-\u9fa5]{2,}", s):
        for n in (2, 3):
            for i in range(len(seg) - n + 1):
                w = seg[i:i+n]
                if w not in STOP:
                    out.add(w)
    for e in re.findall(r"[A-Za-z][A-Za-z0-9/+#.-]{1,24}", s):
        if e.lower() not in STOP:
            out.add(e.lower())
    return out

blob, titles = load_blob()
blob_set = grams(blob)
print(f"题库标题数 {len(titles)}；题库 n-gram 集 {len(blob_set)}")

rows = []
for line in Path("/tmp/hub_headings.txt").read_text(encoding="utf-8").split("\n"):
    if not line.strip():
        continue
    sid, lvl, title = line.split("\t", 2)
    g = grams(title)
    if not g:
        continue
    hit = sum(1 for w in g if w in blob_set)
    score = hit / len(g)
    rows.append((score, sid, lvl, title))

rows.sort()
print(f"\n=== 概念候选（2-gram 得分升序，前 120）===")
for score, sid, lvl, title in rows[:120]:
    print(f"[{score:.2f}] {sid.replace('section-','')} | {title[:78]}")

# Q&A 候选
qrows = []
for line in Path("/tmp/hub_questions.txt").read_text(encoding="utf-8").split("\n"):
    if not line.strip():
        continue
    sid, q = line.split("\t", 1)
    g = grams(q)
    if not g:
        continue
    hit = sum(1 for w in g if w in blob_set)
    qrows.append((hit/len(g), sid, q))
qrows.sort()
print(f"\n=== Q&A 候选（2-gram 得分升序，前 100）===")
for score, sid, q in qrows[:100]:
    print(f"[{score:.2f}] {sid.replace('section-','')} | {q[:88]}")
