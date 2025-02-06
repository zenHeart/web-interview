import React, { useState } from "react";
import "./KanbanBoard.css";
import { usePluginData } from "@docusaurus/useGlobalData";
import type { Question } from "../plugins/extractQuestions";
import KanbanSearch from "./KanbanSearch";
import PriorityTag from "../PriorityTag";
import record from "./record.json";
const doneKeys = record.Done;



function KanbanBoard() {
  const { questions = [] } = usePluginData("extract-questions-plugin") as {
    questions: Question[];
  };
  const [filteredQuestions, setFilteredQuestions] = useState(questions);
  const [collapsedGroups, setCollapsedGroups] = useState<
    Record<string, boolean>
  >({});

  const handleSearch = (filters: SearchFilters) => {
    let results = questions;

    if (filters.domain) {
      results = results.filter((q) =>
        q.domain?.toLowerCase().includes(filters.domain!.toLowerCase())
      );
    }

    if (filters.title) {
      results = results.filter((q) =>
        q.title.toLowerCase().includes(filters.title!.toLowerCase())
      );
    }

    if (filters.topic) {
      results = results.filter((q) =>
        q.topic?.toLowerCase().includes(filters.topic!.toLowerCase())
      );
    }

    if (filters.raw) {
      const searchTerm = filters.raw.toLowerCase();
      results = results.filter(
        (q) =>
          q.title.toLowerCase().includes(searchTerm) ||
          q.domain?.toLowerCase().includes(searchTerm) ||
          q.topic?.toLowerCase().includes(searchTerm)
      );
    }

    if (filters.priority) {
      const searchPriority = filters.priority.toUpperCase();
      results = results.filter((q) => 
        q.priority?.toUpperCase() === searchPriority
      );
    }

    // 新增逻辑：根据 record.json 中的 Done 项目移动问题

    console.log('doneKeys',doneKeys)

    const completedQuestions = questions.filter((q) =>
      doneKeys.some(key => q.link?.includes(key))
    );

    // 从结果中排除已完成的问题
    results = results.filter((q) => {
      const isDone = doneKeys.some(key => q.link?.includes(key));
      return !isDone;
    });

    // 将已完成的问题添加到结果中
    results = [...results, ...completedQuestions];

    setFilteredQuestions(results);
  };

  // 将问题按状态和域名分组
  const groupedQuestions = filteredQuestions.reduce((acc, question) => {
    const status = doneKeys.some(key => question.link?.includes(key)) ? "Done" : (question.status || "Todo");
    const domain = question.domain || "未分类";

    if (!acc[status]) {
      acc[status] = {};
    }
    if (!acc[status][domain]) {
      acc[status][domain] = [];
    }

    acc[status][domain].push(question);
    return acc;
  }, {} as Record<string, Record<string, Question[]>>);

  const columns = [
    {
      id: "Todo",
      title: "待办",
      color: "#4CAF50",
      description: "这个项目还未开始",
    },
    {
      id: "InProgress",
      title: "进行中",
      color: "#FFA000",
      description: "正在积极开发中",
    },
    {
      id: "Done",
      title: "已完成",
      color: "#9C27B0",
      description: "已经完成的项目",
    },
  ];

  const toggleGroup = (status: string, domain: string) => {
    const key = `${status}-${domain}`;
    setCollapsedGroups((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  const getStatusCount = (status: string) => {
    return Object.values(groupedQuestions[status] || {}).flat().length;
  };

  return (
    <div className="kanban-container">
      <KanbanSearch onSearch={handleSearch} />
      <div className="kanban-board">
        {columns.map((column) => (
          <div key={column.id} className="kanban-column">
            <div
              className="column-header"
              style={{ borderColor: column.color }}
            >
              <div className="header-title">
                <span
                  className="status-dot"
                  style={{ backgroundColor: column.color }}
                ></span>
                <h2>{column.title}</h2>
                <span className="task-count">{getStatusCount(column.id)}</span>
              </div>
              <div className="header-description">{column.description}</div>
            </div>

            <div className="task-list">
              {Object.entries(groupedQuestions[column.id] || {}).map(
                ([domain, items]) => (
                  <div key={domain} className="domain-group">
                    <div
                      className="domain-header"
                      onClick={() => toggleGroup(column.id, domain)}
                    >
                      <span className="collapse-icon">
                        {collapsedGroups[`${column.id}-${domain}`] ? "▶" : "▼"}
                      </span>
                      <span className="domain-name">{domain}</span>
                      <span className="domain-count">{items.length}</span>
                    </div>

                    {!collapsedGroups[`${column.id}-${domain}`] && (
                      <div className="domain-items">
                        {items.map((question, index) => (
                          <div key={index} className="task-card">
                            <div className="task-title">
                              <a href={question.link}>{question.title}</a>
                              {question.priority && (
                                <PriorityTag priority={question.priority} />
                              )}
                            </div>
                            <div className="task-meta">
                              <span className="task-topic">
                                <a href={question.link?.split('#')[0]}>
                                  {question.topic}
                                </a>
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default KanbanBoard;
