#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""牛客面经帖只读抓取（公开页面）。

牛客帖子是 SSR 渲染，正文在 HTML 内联 JSON 里（`desc` / `content` 字段），
不在正文标签中。本脚本把字段抽出来落盘，避免整页读冲掉上下文。

用法：
  python3 skills/question-bank-refresh/scripts/fetch-nowcoder.py <url> [<url>...]
  python3 skills/question-bank-refresh/scripts/fetch-nowcoder.py --out-dir /tmp/nc <url>...

注意：
  - 牛客有频控，连抓可能返回不含正文的骨架页。若输出里出现
    "TITLE: 牛客网 - 找工作神器" 就是没抓到正文，隔开重试或换 URL。
  - 只抓公开内容，不登录、不提交表单、不发评论。
"""
from __future__ import annotations

import argparse
import gzip
import json
import re
import sys
import time
import urllib.error
import urllib.request
from pathlib import Path

UA = (
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 "
    "(KHTML, like Gecko) Chrome/124.0.0.0 Safari/537.36"
)


def fetch(url: str, timeout: int = 30) -> str:
    req = urllib.request.Request(
        url,
        headers={
            "User-Agent": UA,
            "Accept-Encoding": "gzip",
            "Accept-Language": "zh-CN,zh;q=0.9",
        },
    )
    with urllib.request.urlopen(req, timeout=timeout) as resp:
        data = resp.read()
        if resp.headers.get("Content-Encoding") == "gzip":
            data = gzip.decompress(data)
    return data.decode("utf-8", "replace")


def extract_blocks(html: str) -> list[str]:
    """按 desc / content / richText 抽取正文块，去重保长。"""
    out: list[str] = []
    for field in ("desc", "content", "richText"):
        for m in re.finditer(r'"%s":"((?:[^"\\]|\\.)*)"' % field, html):
            try:
                s = json.loads('"' + m.group(1) + '"')
            except Exception:
                continue
            if s and len(s) > 40:
                out.append(s)
    if not out:
        for m in re.finditer(r'<div class="nc-slate-editor-content">(.*?)</div>', html, re.S):
            t = re.sub(r"<[^>]+>", "\n", m.group(1))
            t = re.sub(r"\n{2,}", "\n", t).strip()
            if t:
                out.append(t)
    # 去重（保留最长）
    seen: set[str] = set()
    uniq: list[str] = []
    for s in sorted(out, key=len, reverse=True):
        if s not in seen:
            seen.add(s)
            uniq.append(s)
    return uniq


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("urls", nargs="+")
    ap.add_argument("--out-dir", default=None, help="落盘目录；不传则打到 stdout")
    ap.add_argument("--delay", type=float, default=1.5, help="请求间隔秒，防频控")
    args = ap.parse_args()

    out_dir = Path(args.out_dir) if args.out_dir else None
    if out_dir:
        out_dir.mkdir(parents=True, exist_ok=True)

    for idx, url in enumerate(args.urls, 1):
        header = f"{'=' * 70}\nURL: {url}\n"
        try:
            html = fetch(url)
        except (urllib.error.URLError, OSError, TimeoutError) as exc:
            body = f"FETCH-FAIL: {type(exc).__name__}: {exc}\n"
            title = ""
        else:
            t = re.search(r"<title>(.*?)</title>", html, re.S)
            title = re.sub(r"\s+", " ", t.group(1)).strip() if t else ""
            blocks = extract_blocks(html)
            body = "".join(f"{'-' * 60}\n{b}\n" for b in blocks[:3]) or "(未抽取到正文)\n"

        text = f"{header}TITLE: {title}\n{body}"
        if out_dir:
            p = out_dir / f"post_{idx:02d}.txt"
            p.write_text(text, encoding="utf-8")
            print(f"[{idx}] {url} -> {p}  ({len(text)} bytes)  title={title[:60]}")
        else:
            print(text)
        if idx < len(args.urls):
            time.sleep(args.delay)
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
