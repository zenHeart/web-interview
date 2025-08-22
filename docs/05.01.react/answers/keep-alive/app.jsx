import React, { useState } from 'react';
import KeepAliveContainer from './KeepAliveContainer';
import ComponentA from './ComponentA';
import ComponentB from './ComponentB';

export default function App() {
  const [currentComponent, setCurrentComponent] = useState('A');

  return (
    <div style={{ padding: '20px', fontFamily: 'Arial, sans-serif' }}>
      <h1>React Keep-Alive 示例</h1>
      
      <div style={{ marginBottom: '20px' }}>
        <button 
          onClick={() => setCurrentComponent('A')}
          style={{
            padding: '10px 20px',
            margin: '0 10px',
            backgroundColor: currentComponent === 'A' ? '#007acc' : '#f0f0f0',
            color: currentComponent === 'A' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          组件 A
        </button>
        <button 
          onClick={() => setCurrentComponent('B')}
          style={{
            padding: '10px 20px',
            margin: '0 10px',
            backgroundColor: currentComponent === 'B' ? '#007acc' : '#f0f0f0',
            color: currentComponent === 'B' ? 'white' : 'black',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          组件 B
        </button>
      </div>

      <div style={{ 
        border: '1px solid #ddd', 
        borderRadius: '8px', 
        padding: '20px',
        backgroundColor: '#f9f9f9',
        minHeight: '300px'
      }}>
        <h3>当前活跃组件: {currentComponent}</h3>
        
        <KeepAliveContainer>
          <ComponentA isActive={currentComponent === 'A'} />
          <ComponentB isActive={currentComponent === 'B'} />
        </KeepAliveContainer>
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '15px',
        backgroundColor: '#e3f2fd',
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <strong>📝 说明：</strong>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li>切换组件时，之前的组件状态会被保持</li>
          <li>组件不会重新挂载，只是控制显示/隐藏</li>
          <li>输入框的内容和计数器的值都会被保留</li>
          <li>这样可以避免重复的网络请求和状态初始化</li>
        </ul>
      </div>
    </div>
  );
}
