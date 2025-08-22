import React, { useState, useEffect } from 'react';

export default function ComponentB({ isActive }) {
  const [todos, setTodos] = useState([
    { id: 1, text: '学习 React', completed: false },
    { id: 2, text: '实现 Keep-Alive', completed: true }
  ]);
  const [newTodo, setNewTodo] = useState('');
  const [mountTime] = useState(() => new Date().toLocaleTimeString());
  const [lastActiveTime, setLastActiveTime] = useState('');

  useEffect(() => {
    if (isActive) {
      setLastActiveTime(new Date().toLocaleTimeString());
    }
  }, [isActive]);

  useEffect(() => {
    console.log('组件 B 已挂载于:', mountTime);
    return () => {
      console.log('组件 B 卸载');
    };
  }, [mountTime]);

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: newTodo,
        completed: false
      }]);
      setNewTodo('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  return (
    <div style={{
      padding: '20px',
      border: '2px solid #2196F3',
      borderRadius: '8px',
      backgroundColor: '#e3f2fd'
    }}>
      <h4 style={{ color: '#1976D2', margin: '0 0 15px 0' }}>
        🅱️ 组件 B (Keep-Alive)
      </h4>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>挂载时间:</strong> {mountTime}
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>最后激活时间:</strong> {lastActiveTime}
      </div>

      <div style={{ marginBottom: '20px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          待办事项列表 (状态会保持):
        </label>
        <div style={{ display: 'flex', gap: '10px', marginBottom: '10px' }}>
          <input
            type="text"
            value={newTodo}
            onChange={(e) => setNewTodo(e.target.value)}
            placeholder="添加新的待办事项..."
            onKeyPress={(e) => e.key === 'Enter' && addTodo()}
            style={{
              flex: 1,
              padding: '8px',
              border: '1px solid #ccc',
              borderRadius: '4px'
            }}
          />
          <button
            onClick={addTodo}
            style={{
              padding: '8px 16px',
              backgroundColor: '#2196F3',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            添加
          </button>
        </div>

        <div style={{ maxHeight: '200px', overflowY: 'auto' }}>
          {todos.map(todo => (
            <div
              key={todo.id}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '10px',
                padding: '8px',
                backgroundColor: 'white',
                marginBottom: '5px',
                borderRadius: '4px',
                border: '1px solid #e0e0e0'
              }}
            >
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
                style={{ transform: 'scale(1.2)' }}
              />
              <span
                style={{
                  flex: 1,
                  textDecoration: todo.completed ? 'line-through' : 'none',
                  color: todo.completed ? '#999' : '#333'
                }}
              >
                {todo.text}
              </span>
              <button
                onClick={() => deleteTodo(todo.id)}
                style={{
                  padding: '4px 8px',
                  backgroundColor: '#f44336',
                  color: 'white',
                  border: 'none',
                  borderRadius: '3px',
                  cursor: 'pointer',
                  fontSize: '12px'
                }}
              >
                删除
              </button>
            </div>
          ))}
        </div>
      </div>

      <div style={{ 
        fontSize: '14px', 
        color: '#666',
        padding: '10px',
        backgroundColor: '#bbdefb',
        borderRadius: '4px'
      }}>
        💡 提示: 这个组件的待办事项列表状态会在切换时保持。尝试添加一些待办事项，然后切换到组件 A，再切换回来查看列表是否保持原样。
      </div>
    </div>
  );
}
