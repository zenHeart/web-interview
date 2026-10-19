#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""面经差集与主题空白分析。

做两件事：
  1) 把 zencareer 面经快照（careers 仓的 mianjing.json）逐题与 docs/ 现有题库做覆盖打分，
     低分题输出为「疑似未覆盖」候选；
  2) 按主题关键词做空白检测，输出题库里完全缺失的主题。

关键实现约束（踩过的坑）：
  - 覆盖判定**只扫「题目标题 + slug」**。扫全文会被 raw-loader 引入的代码正文和
    memory/stream/rag 之类高频词污染，得出「全覆盖」的假结论。
  - 行为题/HR 题天然低分，属于题库定位之外，不算缺口。

用法：
  python3 skills/question-bank-refresh/scripts/gap-audit.py [--mianjing <path>] [--top 40]
"""
from __future__ import annotations

import argparse
import json
import os
import re
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parents[3]
DEFAULT_MIANJING = Path.home() / "code/github/careers/resume/2026/jobs/agents/mianjing.json"

# 题库定位之外的主题：行为题与 HR 题
BEHAVIORAL = re.compile(
    r"实习|留用|薪资|offer|自我介绍|为什么(来|投)|怎么(学习|规划)|职业|转正|离职|时间线|生活|家庭|爱好|缺点|优点"
)

STOP = set(
    "的了吗呢吧是在有和与对如何怎么什么哪些一个我们你他们这那如果为什么可以需要进行是否以及怎样多少"
    "实现设计方案问题处理使用情况时候能不能讲一下介绍谈谈说讲讲原理机制场景面向基于为了这个那个"
    "以及或者还要会不会什么样子什么样哪些哪些请说说看".split()
)


def load_question_titles(docs_dir: Path) -> tuple[str, set[str]]:
    """返回 (标题+slug 的大文本, 题目标题集合)。只取标题，不取正文。"""
    blob_parts: list[str] = []
    titles: set[str] = set()
    for path in docs_dir.rglob("*.md"):
        try:
            text = path.read_text(encoding="utf-8")
        except OSError:
            continue
        for line in text.splitlines():
            m = re.match(r"^#{2,4}\s+(.+?)\s*(\{#[^}]+})?\s*$", line)
            if m:
                titles.add(m.group(1).strip())
                blob_parts.append(m.group(1))
                if m.group(2):
                    blob_parts.append(m.group(2))
    return "\n".join(blob_parts).lower(), titles


def keywords(q: str) -> set[str]:
    out: set[str] = set()
    for seg in re.findall(r"[\u4e00-\u9fa5]{2,8}", q):
        for n in (2, 3, 4):
            for i in range(len(seg) - n + 1):
                w = seg[i : i + n]
                if w not in STOP:
                    out.add(w)
    for e in re.findall(r"[A-Za-z][A-Za-z0-9/+#.-]{1,20}", q):
        if e.lower() not in STOP:
            out.add(e.lower())
    return out


THEME_PROBES: dict[str, list[str]] = {
    # --- AI Agent 方向（2026 新增考点）---
    "大小模型路由 / 混合路由": [r"模型路由", r"大小模型", r"混合路由", r"model rout", r"小模型.*大模型", r"模型.*兜底.*限流"],
    "评测集 / 回归集维护": [r"golden\s*set", r"黄金集", r"评测集", r"回归集", r"评测集.*维护", r"评测.*指标"],
    "Agent 行为漂移 / 目标偏离": [r"行为漂移", r"目标偏离", r"drift", r"越走越偏", r"腐化", r"跑偏"],
    "多 Agent 并发冲突 / 锁": [r"分布式锁", r"并发冲突", r"文件冲突", r"多.?agent.*(冲突|并发)", r"调度冲突", r"输出冲突"],
    "上下文压缩 / 压缩回退": [r"上下文压缩", r"压缩提示词", r"上下文.*腐化", r"滑动压缩", r"记忆.*压缩"],
    "重试风暴 / 退避熔断": [r"重试风暴", r"退避", r"熔断", r"指数退避", r"重试.*无限"],
    "规则文件膨胀治理": [r"agents?\.md", r"规则文件.*膨胀", r"规则.*治理", r"规则.*分层"],
    "多知识库路由 / 意图路由": [r"意图路由", r"多知识库", r"知识库.*路由", r"检索错库", r"意图判断.*不准"],
    "沙箱池 / 并发调度": [r"沙箱.*(池|调度|并发|实例)", r"资源池"],
    "Agent vs Skill 边界": [r"agent.*vs.*skill", r"专职 ?agent", r"只需要一个 ?skill"],
    "自主决策 vs Workflow 编排": [r"自主决策", r"workflow.*编排", r"编排.*自主"],
    "LLM-as-Judge 偏差": [r"llm-as-a?-judge", r"自己给自己打分", r"偏乐观"],
    "bad case 回流": [r"bad.?case", r"错例回流", r"回流.*评测", r"真实.*失败.*评测"],
    "辩论式多 Agent 验证": [r"辩论", r"互相挑错", r"信息不对称"],
    "多 Agent 稳定性评估": [r"稳定性.*(评估|多次)", r"多次执行"],
    # --- 其它面经高频 ---
    "任务状态恢复 / 断点续跑": [r"断点续跑", r"状态恢复", r"任务状态.*恢复", r"续跑"],
    "Agent 记忆与隐私边界": [r"记忆.*隐私", r"不泄漏隐私", r"隐私.*记忆"],
    "Agent 超时与用户中断": [r"超时.*停", r"用户.*中断", r"停止.*agent", r"超时怎么设", r"怎么停", r"等不及"],
    "延时消息 / 内存态持久化": [r"延时消息", r"延迟消息", r"内存.*重启"],
    "SFT / RLHF 选型": [r"sft.*rlhf", r"rlhf.*sft", r"微调.*选型", r"基模.*破局"],
    "企业文档 RAG（Word/PDF）": [r"word.*pdf", r"pdf.*文档", r"企业.*文档.*检索", r"文档.*切分.*无标题"],
    "宏队列与微队列关系": [r"宏队列", r"微队列.*宏", r"事件循环.*微任务"],
    # --- 前端 / 工程化 ---
    "模型能力上线评测": [r"上线评测", r"上线前.*评测", r"发布前.*评测"],
    "微前端迁移专项": [r"迁移.*微前端", r"微前端.*迁移"],
    "Nginx 交付与缓存": [r"nginx"],
    "同域并发连接数": [r"同域.*并发", r"并发连接数", r"同时下载.*资源"],
    "预检请求优化": [r"options.*预检", r"减少.*预检", r"预检.*减少"],
    "批量错误聚合": [r"弹一次", r"错误聚合", r"只弹一次"],
    "依赖安全 / 平滑升级": [r"依赖.*漏洞", r"依赖.*升级", r"平滑升级"],
    "死代码清理": [r"死代码", r"未被引用"],
    "门禁绕过 / no-verify": [r"no-verify", r"门禁.*绕过", r"绕过.*门禁"],
    "流式并发打断": [r"打断", r"并发.*(请求|打断)", r"渲染顺序.*保证"],
    "跨标签页主动推送": [r"broadcastchannel", r"主动推送", r"跨标签页.*推送"],
}


def main() -> int:
    ap = argparse.ArgumentParser()
    ap.add_argument("--mianjing", default=str(DEFAULT_MIANJING))
    ap.add_argument("--docs", default=str(ROOT / "docs"))
    ap.add_argument("--top", type=int, default=40)
    args = ap.parse_args()

    docs_dir = Path(args.docs)
    if not docs_dir.exists():
        print(f"[!] docs 目录不存在: {docs_dir}", file=sys.stderr)
        return 2

    blob, titles = load_question_titles(docs_dir)
    print(f"题库题目标题数（去重）：{len(titles)}")

    # 1) 主题空白检测
    print("\n=== 主题空白检测（仅按题目标题 + slug 判定）===")
    gaps: list[str] = []
    for theme, pats in THEME_PROBES.items():
        hit = any(re.search(p, blob, re.I) for p in pats)
        print(f"  {'✅' if hit else '❌'} {theme}")
        if not hit:
            gaps.append(theme)

    # 2) 面经逐题覆盖打分
    mj = Path(args.mianjing)
    if not mj.exists():
        print(f"\n[!] 未找到面经快照: {mj}（跳过逐题打分）")
        return 0

    data = json.loads(mj.read_text(encoding="utf-8"))
    questions = [x.get("q", "").strip() for x in data]
    scored: list[tuple[float, str, str]] = []
    for q in questions:
        if not q:
            continue
        ks = keywords(q)
        if not ks:
            continue
        hit = sum(1 for w in ks if w in blob)
        score = hit / len(ks)
        tag = "行为题" if BEHAVIORAL.search(q) else "技术题"
        scored.append((score, tag, q))
    scored.sort(key=lambda x: x[0])

    tech = [s for s in scored if s[1] == "技术题"]
    print(f"\n=== 技术类面经题覆盖打分（最低 {args.top} 题）===")
    for score, tag, q in tech[: args.top]:
        print(f"  [{score:.2f}] {q[:100]}")
    covered = sum(1 for s in tech if s[0] >= 0.35)
    print(f"\n技术类面经题粗估已覆盖（得分 >= 0.35）：{covered}/{len(tech)}")
    print(f"行为类面经题（题库定位之外，不计缺口）：{len(scored) - len(tech)}")

    print(f"\n=== 主题空白汇总（{len(gaps)}）===")
    for g in gaps:
        print(f"  - {g}")
    return 0


if __name__ == "__main__":
    raise SystemExit(main())
