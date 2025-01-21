import React, { useState, useEffect } from "react";
import "./KanbanSearch.css";

interface SearchFilters {
  domain?: string;
  title?: string;
  topic?: string;
  raw?: string;
}
interface SearchProps {
  onSearch: (filters: SearchFilters) => void;
}

function KanbanSearch({ onSearch }: SearchProps) {
  const [searchText, setSearchText] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  // 解析搜索语法
  const parseSearch = (query: string): SearchFilters => {
    const filters: SearchFilters = {};

    // 处理特定字段搜索
    const fieldMatches = query.match(/(\w+):\s*([^\s]+)/g) || [];

    // 移除已处理的字段搜索
    let remaining = query;

    fieldMatches.forEach((match) => {
      const [field, value] = match.split(":").map((s) => s.trim());
      filters[field as keyof SearchFilters] = value;
      remaining = remaining.replace(match, "");
    });

    // 处理剩余的搜索词作为原始搜索
    const rawSearch = remaining.trim();
    if (rawSearch) {
      filters.raw = rawSearch;
    }

    return filters;
  };

  useEffect(() => {
    const filters = parseSearch(searchText);
    onSearch(filters);
  }, [searchText]);

  // 只在输入框为空且聚焦时显示提示框
  const shouldShowHelp = isFocused && !searchText;

  return (
    <div className="search-container">
      <input
        type="text"
        className="search-input"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => {
          // 使用setTimeout来确保点击提示框内容时能够正常工作
          setTimeout(() => setIsFocused(false), 200);
        }}
        placeholder="Filter by keyword or field (e.g. domain:js title:问题)"
      />
      {shouldShowHelp && (
        <div className="search-help">
          <div className="help-title">搜索语法:</div>
          <ul className="help-list">
            <li>
              <code>domain:js</code> - 搜索特定领域
            </li>
            <li>
              <code>title:问题</code> - 搜索标题
            </li>
            <li>
              <code>topic:react</code> - 搜索特定主题
            </li>
            <li>直接输入关键词搜索所有字段</li>
          </ul>
        </div>
      )}
    </div>
  );
}

export default KanbanSearch;
