import React, { useState, useEffect } from 'react';

export default function ComponentA({ isActive }) {
  const [count, setCount] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [mountTime] = useState(() => new Date().toLocaleTimeString());
  const [lastActiveTime, setLastActiveTime] = useState('');

  useEffect(() => {
    if (isActive) {
      setLastActiveTime(new Date().toLocaleTimeString());
    }
  }, [isActive]);

  useEffect(() => {
    console.log('组件 A 已挂载于:', mountTime);
    return () => {
      console.log('组件 A 卸载');
    };
  }, [mountTime]);

  return (
    <div style={{
      padding: '20px',
      border: '2px solid #4CAF50',
      borderRadius: '8px',
      backgroundColor: '#f1f8e9'
    }}>
      <h4 style={{ color: '#2E7D32', margin: '0 0 15px 0' }}>
        🅰️ 组件 A (Keep-Alive)
      </h4>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>挂载时间:</strong> {mountTime}
      </div>
      
      <div style={{ marginBottom: '15px' }}>
        <strong>最后激活时间:</strong> {lastActiveTime}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          输入框 (状态会保持):
        </label>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="输入内容，切换组件后再回来看看..."
          style={{
            padding: '8px',
            border: '1px solid #ccc',
            borderRadius: '4px',
            width: '100%',
            maxWidth: '300px'
          }}
        />
        {inputValue && (
          <div style={{ 
            marginTop: '5px', 
            color: '#666', 
            fontSize: '14px' 
          }}>
            当前输入: "{inputValue}"
          </div>
        )}
      </div>

      <div style={{ marginBottom: '15px' }}>
        <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>
          计数器 (状态会保持):
        </label>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
          <button
            onClick={() => setCount(count - 1)}
            style={{
              padding: '5px 10px',
              backgroundColor: '#f44336',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            -
          </button>
          <span style={{ 
            fontSize: '18px', 
            fontWeight: 'bold',
            minWidth: '40px',
            textAlign: 'center'
          }}>
            {count}
          </span>
          <button
            onClick={() => setCount(count + 1)}
            style={{
              padding: '5px 10px',
              backgroundColor: '#4CAF50',
              color: 'white',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            +
          </button>
        </div>
      </div>

      <div style={{ 
        fontSize: '14px', 
        color: '#666',
        padding: '10px',
        backgroundColor: '#e8f5e8',
        borderRadius: '4px'
      }}>
        💡 提示: 这个组件的状态会在切换时保持。尝试输入内容并增加计数，然后切换到组件 B，再切换回来查看状态是否保持。
      </div>
    </div>
  );
}
