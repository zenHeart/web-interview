#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""Hub 主站：概念型分节（md-h3 / md-h4 标题）的概念候选提取。

与 hub_extract.py 互补：
  - hub_extract.py 抓「Q&A 型」分节（带参考答案）
  - 本脚本抓「指南型」分节（h3/h4 概念标题），用于发现**尚未覆盖的概念考点**
"""
import html as htmllib
import re
import sys
from pathlib import Path

RAW = Path("/tmp/hub.html").read_text(encoding="utf-8", errors="replace")
sec_re = re.compile(r'<section[^>]*\bid="(section-[^"]*)"[^>]*>(.*?)</section>', re.S)

only = sys.argv[1] if len(sys.argv) > 1 else None
out_lines = []
for sid, body in sec_re.findall(RAW):
    if only and only not in sid:
        continue
    # 概念型标题
    hs = re.findall(r'<h([234])[^>]*>(.*?)</h\1>', body, re.S)
    n = 0
    for lvl, txt in hs:
        t = re.sub(r'<[^>]+>', '', txt)
        t = htmllib.unescape(t).strip()
        if not t or len(t) > 120:
            continue
        out_lines.append(f"[{sid}]\tH{lvl}\t{t}")
        n += 1
    if n:
        print(f"{n:4d} headings  {sid}")
Path("/tmp/hub_headings.txt").write_text("\n".join(out_lines), encoding="utf-8")
print(f"\n合计 {len(out_lines)} 条标题 -> /tmp/hub_headings.txt")
