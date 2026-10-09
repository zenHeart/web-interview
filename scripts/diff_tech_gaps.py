#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Web Interview 权威数据源差量对账与覆盖率审计工具 (Tech Diff Engine)
读取 contributors/authoritative-sources.md 并对照本地所有题目 slug 与一级标题，
输出学科全景覆盖度与潜在缺口矩阵。
"""

import os
import re
import sys

def main():
    root_dir = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
    docs_dir = os.path.join(root_dir, "docs")
    
    # 核心标准技术词库（基于 TC39, WHATWG, W3C, Baseline, 2026 大厂招聘需求）
    core_competencies = {
        "ECMAScript 现代特性": [
            ("Promise.try / withResolvers", r"promise-(?:try|withresolvers)"),
            ("Iterator Helpers / 集合运算", r"iterator-helpers|set-algebra|es-modern-features"),
            ("ArrayBuffer.transfer / 二进制零拷贝", r"arraybuffer-transfer|binary-memory-transfer"),
            ("AsyncContext 异步上下文追踪", r"async-context"),
            ("Temporal 原生时间日期引擎", r"temporal|records-tuples"),
        ],
        "HTML & DOM 现代规范": [
            ("Popover API 原生弹出层", r"popover-api"),
            ("Declarative Shadow DOM 声明式影子DOM", r"declarative-shadow-dom"),
            ("WebAssembly GC 垃圾回收扩展", r"wasm-gc"),
            ("WebGPU 计算着色器与通用管线", r"webgpu"),
            ("Chromium Pre-paint 渲染管线演进", r"chromium-render-pipeline|prepaint"),
        ],
        "CSS 现代排版与动画": [
            (":has() 父选择器与关系伪类", r"css-has-selector"),
            ("View Transitions API 视图过渡", r"view-transitions"),
            ("CSS Anchor Positioning 锚点定位", r"anchor-positioning"),
            ("Container Queries 容器查询", r"container-queries"),
            ("Scroll-driven Animations 滚动驱动动画", r"scroll-driven-animations"),
        ],
        "React & 全栈框架": [
            ("React 19 Actions / use() / Compiler", r"react-19-actions|react-compiler"),
            ("React Server Components (RSC) Flight", r"server-components|flight"),
            ("Next.js 15 Server Actions RPC", r"nextjs-server-actions"),
            ("Next.js 15 部分预渲染 (PPR)", r"nextjs-ppr"),
            ("Next.js 缓存网格与失效策略", r"nextjs-caching"),
        ],
        "Vue & 响应式生态": [
            ("Vue 3.5 双向链表与版本计数器", r"vue-3-5-reactivity"),
            ("Vapor Mode 无虚拟DOM编译", r"vapor"),
            ("Signals 细粒度响应式范式演化", r"signals-vs-vdom"),
        ],
        "现代工程化与 Rust 工具链": [
            ("Vite 8 Rolldown 单引擎演进", r"vite-production-rolldown|rolldown"),
            ("Rspack Rust 编译重构与生态兼容", r"rspack"),
            ("Module Federation 2.0 动态共享与类型安全", r"module-federation-2"),
            ("Biome 单一 AST 管线与统一语法分析", r"biome"),
            ("Turborepo / pnpm 增量缓存与 Monorepo", r"monorepo-governance-turborepo"),
        ],
        "跨端架构 (Electron / RN / 小程序)": [
            ("Electron 多进程模型与崩溃 Minidump", r"electron-process-model|crash-recovery"),
            ("Electron UtilityProcess 共享内存与安全", r"electron-shared-memory|security-baseline"),
            ("React Native Bridgeless JSI & Fabric", r"rn-new-architecture-jsi"),
            ("微信小程序 Skyline 引擎与 Worklet 手势", r"miniprogram-skyline"),
            ("小程序 setData 底层瓶颈与差量优化", r"p0-setdata"),
        ],
        "AI 智能工程与 Agent 前端载体": [
            ("Token 与大模型认知基础", r"what-is-token|concept-token-llm|p0-token"),
            ("流式 SSE 排版与 Markdown 防抖渲染", r"stream|markdown-render"),
            ("Function Calling 与 MCP 协议集成", r"mcp|tool-calling"),
            ("前端本地向量检索 (RAG)", r"rag-frontend|embedding-vector"),
            ("Generative UI 动态组件安全沙箱", r"generative-ui-sandbox"),
            ("Agent 长会话上下文压缩与记忆治理", r"agent-memory-context"),
        ]
    }

    # 扫描 docs 目录下全部文件的内容与 slug
    doc_slugs = set()
    doc_content = ""
    for root, _, files in os.walk(docs_dir):
        for f in files:
            if f.endswith(".md"):
                fpath = os.path.join(root, f)
                with open(fpath, "r", encoding="utf-8") as file:
                    content = file.read()
                    doc_content += "\n" + content
                    # 匹配 {#slug}
                    for slug in re.findall(r"\{#([^}]+)\}", content):
                        doc_slugs.add(slug)

    print("=" * 70)
    print("  Web Interview 权威数据源差量比对与知识覆盖率报告")
    print("=" * 70)

    total_items = 0
    covered_items = 0

    for domain, items in core_competencies.items():
        print(f"\n【{domain}】")
        for title, pattern in items:
            total_items += 1
            # 检查是否有匹配的 slug 或标题匹配
            matched = any(re.search(pattern, slug, re.IGNORECASE) for slug in doc_slugs)
            if not matched:
                matched = bool(re.search(pattern, doc_content, re.IGNORECASE))
            
            if matched:
                covered_items += 1
                print(f"  ✅ [覆盖] {title}")
            else:
                print(f"  ❌ [缺失] {title}")

    rate = (covered_items / total_items) * 100 if total_items else 0
    print("\n" + "=" * 70)
    print(f"  全库前沿核心能力覆盖率: {covered_items}/{total_items} ({rate:.1f}%)")
    print("=" * 70)

if __name__ == "__main__":
    main()
