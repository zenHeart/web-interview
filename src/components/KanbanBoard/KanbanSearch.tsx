import React, { useState, useEffect } from 'react'
import { useHistory, useLocation } from '@docusaurus/router'
import './KanbanSearch.css'

interface SearchFilters {
  domain?: string;
  title?: string;
  topic?: string;
  priority?: string;
  raw?: string;
}
interface SearchProps {
  onSearch: (filters: SearchFilters) => void;
}

const SearchExamples = [
  {
    search: 'domain:js',
    explain: '搜索特定领域'
  },
  {
    search: 'title:问题',
    explain: '搜索标题'
  },
  {
    search: 'topic:react',
    explain: '搜索特定主题'
  },
  {
    search: 'priority:p0',
    explain: '搜索优先级(p0-p4)'
  },
  {
    search: '问题',
    explain: '等效于 title:问题'
  }
]

function KanbanSearch ({ onSearch }: SearchProps) {
  const history = useHistory()
  const location = useLocation()
  const [searchText, setSearchText] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [isHoveringHelp, setIsHoveringHelp] = useState(false)

  // 从 URL 读取初始搜索内容
  useEffect(() => {
    const params = new URLSearchParams(location.search)
    const querySearch = params.get('search')
    if (querySearch) {
      setSearchText(querySearch)
      const filters = parseSearch(querySearch)
      onSearch(filters)
    }
  }, [location.search])

  // 更新 URL 查询参数
  const updateSearchQuery = (query: string) => {
    const params = new URLSearchParams(location.search)
    if (query) {
      params.set('search', query)
    } else {
      params.delete('search')
    }
    history.replace({
      search: params.toString()
    })
  }

  // 处理搜索文本变化
  const handleSearchChange = (value: string) => {
    setSearchText(value)
    updateSearchQuery(value)
    const filters = parseSearch(value)
    onSearch(filters)
  }

  // 清除搜索
  const handleClear = () => {
    handleSearchChange('')
  }

  // 解析搜索语法
  const parseSearch = (query: string): SearchFilters => {
    const filters: SearchFilters = {}

    // 处理特定字段搜索
    const fieldMatches = query.match(/(\w+):\s*([^\s]+)/g) || []

    // 移除已处理的字段搜索
    let remaining = query

    fieldMatches.forEach((match) => {
      const [field, value] = match.split(':').map((s) => s.trim())
      // 处理优先级搜索，忽略大小写
      if (field.toLowerCase() === 'priority') {
        const priorityValue = value.toLowerCase()
        if (/^p[0-4]$/i.test(priorityValue)) {
          filters.priority = priorityValue
        }
      } else {
        filters[field as keyof SearchFilters] = value
      }
      remaining = remaining.replace(match, '')
    })

    // 处理剩余的搜索词作为原始搜索
    const rawSearch = remaining.trim()
    if (rawSearch) {
      filters.raw = rawSearch
    }

    return filters
  }

  // 修改显示条件
  const shouldShowHelp = (isFocused || isHoveringHelp) && !searchText

  return (
    <div className="search-container">
      <div className="search-input-wrapper">
        <input
          type="text"
          className="search-input"
          value={searchText}
          onChange={(e) => handleSearchChange(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => {
            setTimeout(() => {
              setIsFocused(false)
            }, 100)
          }}
          placeholder="Filter by keyword or field (e.g. domain:js title:问题)"
        />
        {searchText && (
          <button 
            className="clear-button"
            onClick={handleClear}
            aria-label="Clear search"
          >
            ×
          </button>
        )}
      </div>
      {shouldShowHelp && (
        <div
          className="search-help"
          onMouseEnter={() => setIsHoveringHelp(true)}
          onMouseLeave={() => setIsHoveringHelp(false)}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="help-title">搜索语法:</div>
          <ul className="help-list">
            {SearchExamples.map((example, index) => (
              <li key={index}>
                <code
                  className="example-text"
                  onClick={() => {
                    handleSearchChange(example.search)
                    setIsFocused(false)
                    setIsHoveringHelp(false)
                  }}
                >
                  {example.search}
                </code> - {example.explain}
              </li>
            ))}
            <li>直接输入关键词搜索所有字段</li>
          </ul>
        </div>
      )}
    </div>
  )
}

export default KanbanSearch
