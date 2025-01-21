import React, { useState } from 'react';
import './KanbanBoard.css';
import { usePluginData } from '@docusaurus/useGlobalData';
import type { Question } from '../plugins/extractQuestions';

function KanbanBoard() {
  const { questions = [] } = usePluginData('extract-questions-plugin') as { questions: Question[] };
  const [collapsedGroups, setCollapsedGroups] = useState<Record<string, boolean>>({});

  // 将问题按状态和域名分组
  const groupedQuestions = questions.reduce((acc, question) => {
    const status = question.status || 'Todo';
    const domain = question.domain || '未分类';
    
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
    { id: 'Todo', title: '待办', color: '#4CAF50', description: '这个项目还未开始' },
    { id: 'InProgress', title: '进行中', color: '#FFA000', description: '正在积极开发中' },
    { id: 'Done', title: '已完成', color: '#9C27B0', description: '已经完成的项目' },
  ];

  const toggleGroup = (status: string, domain: string) => {
    const key = `${status}-${domain}`;
    setCollapsedGroups(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const getStatusCount = (status: string) => {
    return Object.values(groupedQuestions[status] || {}).flat().length;
  };

  return (
    <div className="kanban-board">
      {columns.map(column => (
        <div key={column.id} className="kanban-column">
          <div className="column-header" style={{ borderColor: column.color }}>
            <div className="header-title">
              <span className="status-dot" style={{ backgroundColor: column.color }}></span>
              <h2>{column.title}</h2>
              <span className="task-count">{getStatusCount(column.id)}</span>
            </div>
            <div className="header-description">{column.description}</div>
          </div>
          
          <div className="task-list">
            {Object.entries(groupedQuestions[column.id] || {}).map(([domain, items]) => (
              <div key={domain} className="domain-group">
                <div 
                  className="domain-header"
                  onClick={() => toggleGroup(column.id, domain)}
                >
                  <span className="collapse-icon">
                    {collapsedGroups[`${column.id}-${domain}`] ? '▶' : '▼'}
                  </span>
                  <span className="domain-name">{domain}</span>
                  <span className="domain-count">{items.length}</span>
                </div>
                
                {!collapsedGroups[`${column.id}-${domain}`] && (
                  <div className="domain-items">
                    {items.map((question, index) => (
                      <div key={index} className="task-card">
                        <div className="task-title">
                          {question.title}
                        </div>
                        <div className="task-meta">
                          <span className="task-topic">{question.topic}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

export default KanbanBoard;