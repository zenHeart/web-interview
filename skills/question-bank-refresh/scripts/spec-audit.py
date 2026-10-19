#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""题库规范自检：`question-lint.js` 没覆盖的那几条。

检查项：
  1. TOC 纯净度：`<Answer>` ... `</Answer>` 内部不得出现任何 Markdown 标题（# ~ ######）
  2. MDX v3：正文（代码围栏外）不得出现未转义的 `<` 紧跟数字
  3. MDX v3：代码围栏内不得出现未转义的 `${...}`
  4. 答案金字塔：每个 `<Answer>` 至少包含 核心结论 / 原理解析 / 面试官视角 三段
  5. 答案体量：正文（不含代码）字数应在 300~1600 之间，过短说明是骨架、过长说明是注水

用法：
  python3 skills/question-bank-refresh/scripts/spec-audit.py [路径 ...]
  默认扫描 docs/**/*.md
"""
from __future__ import annotations

import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]

# 答案金字塔：每段的允许写法（见 skills/interview-question-architect/SKILL.md）
SECTION_VARIANTS: dict[str, list[str]] = {
    "核心结论": ["核心结论", "核心概念"],
    "原理解析": ["原理解析", "机制说明", "原理解释"],
    "规范实现": ["规范实现", "示例说明", "示例代码", "代码实现"],
    "面试官视角": ["面试官视角"],
    "延伸阅读": ["延伸阅读"],
}
ANSWER_RE = re.compile(r"<Answer>(.*?)</Answer>", re.S)
FENCE_RE = re.compile(r"```.*?```", re.S)
INLINE_CODE_RE = re.compile(r"`[^`\n]+`")
HEADING_RE = re.compile(r"^\s{0,3}(#{1,6})\s+\S", re.M)
# 规范：小于号**紧跟**数字才必须转义；`< 100ms`（带空格）与行内代码内都安全
LT_NUM_RE = re.compile(r"<[0-9]")
# 规范：反引号里不可出现**未转义**的 ${...}；`\${...}` 是正确写法
TEMPLATE_RE = re.compile(r"(?<!\\)\$\{[^}]*\}")

MIN_CHARS = 300   # 低于此值视为骨架
MAX_CHARS = 4000  # 高于此值视为注水（仓库既有题目普遍在 1700~3300 字）


def split_fences(text: str) -> tuple[str, str]:
    """返回 (代码块外文本, 代码块内文本)。"""
    blocks = FENCE_RE.findall(text)
    outside = FENCE_RE.sub("\n", text)
    return outside, "\n".join(blocks)


def audit(path: Path) -> tuple[list[str], list[str]]:
    """返回 (errors, warns)。error = 会破坏构建或污染 TOC；warn = 风格偏差。"""
    text = path.read_text(encoding="utf-8")
    errors: list[str] = []
    warns: list[str] = []

    for i, body in enumerate(ANSWER_RE.findall(text), 1):
        outside, _ = split_fences(body)

        # 1) TOC 纯净度 —— 破坏右侧导航，判 error
        for h in HEADING_RE.findall(outside):
            errors.append(f"[{path}] Answer#{i} 内出现 Markdown 标题: {h!r}")

        # 2) 未转义的 < 数字 —— 会导致 MDX 解析失败，判 error
        for m in LT_NUM_RE.finditer(outside):
            errors.append(
                f"[{path}] Answer#{i} 正文出现未转义的 '<数字': {outside[max(0, m.start() - 18):m.start() + 14]!r}"
            )

        # 3) 纯正文里不得出现 ${...} —— MDX v3 会把正文中的 ${...} 当 JSX 表达式求值
        #    注意：围栏代码块与行内反引号里的 ${...} 都是字面量，安全；`\${...}` 也是正确转义写法。
        prose = INLINE_CODE_RE.sub(" ", outside)
        for m in TEMPLATE_RE.finditer(prose):
            errors.append(
                f"[{path}] Answer#{i} 纯正文出现 ${{...}}（MDX 会当 JSX 求值）: {prose[max(0, m.start() - 20):m.start() + 24]!r}"
            )

        # 4) 答案金字塔必备段 —— 判 warn（旧文档有大量变体，不作为硬门禁）
        for sec, variants in SECTION_VARIANTS.items():
            if not any(f"**{v}" in body for v in variants):
                warns.append(f"[{path}] Answer#{i} 缺少「{sec}」区块（可用：{' / '.join(variants)}）")

        # 5) 体量 —— 判 warn
        plain = re.sub(r"\s+", "", outside)
        n = len(plain)
        if n < MIN_CHARS:
            warns.append(f"[{path}] Answer#{i} 正文仅 {n} 字，过短（骨架）")
        elif n > MAX_CHARS:
            warns.append(f"[{path}] Answer#{i} 正文 {n} 字，超长（注水）")
    return errors, warns


def main() -> int:
    targets = [Path(a) for a in sys.argv[1:]] or sorted((ROOT / "docs").rglob("*.md"))
    errors: list[str] = []
    warns: list[str] = []
    scanned = 0
    for t in targets:
        if t.is_dir():
            files = sorted(t.rglob("*.md"))
        elif t.exists():
            files = [t]
        else:
            print(f"[!] 路径不存在: {t}", file=sys.stderr)
            continue
        for f in files:
            scanned += 1
            e, w = audit(f)
            errors.extend(e)
            warns.extend(w)

    print(f"扫描文件：{scanned}")
    if errors:
        print(f"\n❌ ERROR（会破坏构建 / 污染 TOC）{len(errors)} 个：")
        for p in errors:
            print("  " + p)
    else:
        print("✅ ERROR 级检查全部通过（TOC 纯净度 / MDX 转义 / 行内模板占位符）")
    if warns:
        print(f"\n⚠️  WARN（风格偏差，不阻断）{len(warns)} 个，前 20 条：")
        for p in warns[:20]:
            print("  " + p)
        if len(warns) > 20:
            print(f"  ...（另有 {len(warns) - 20} 条）")
    return 1 if errors else 0


if __name__ == "__main__":
    raise SystemExit(main())
