import React, { useState } from 'react';
import CSSTransition from './CSSTransition';

export default function App() {
  const [isVisible, setIsVisible] = useState(true);
  const [currentView, setCurrentView] = useState('home');

  const views = {
    home: { title: '🏠 首页', color: '#4CAF50', content: '欢迎来到首页！这里有最新的内容和动态。' },
    about: { title: '📋 关于', color: '#2196F3', content: '这是关于页面，了解更多关于我们的信息。' },
    contact: { title: '📞 联系', color: '#FF9800', content: '联系我们获取更多信息和支持。' }
  };

  return (
    <div style={{ 
      padding: '20px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h1>React 转场动画示例</h1>
      
      {/* 基础显示/隐藏动画 */}
      <div style={{ 
        marginBottom: '40px',
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}>
        <h2>基础显示/隐藏动画</h2>
        <button
          onClick={() => setIsVisible(!isVisible)}
          style={{
            padding: '10px 20px',
            backgroundColor: '#007acc',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
            marginBottom: '20px'
          }}
        >
          {isVisible ? '隐藏' : '显示'} 内容
        </button>

        <CSSTransition isVisible={isVisible}>
          <div style={{
            padding: '20px',
            backgroundColor: '#e3f2fd',
            borderRadius: '8px',
            border: '2px solid #2196F3'
          }}>
            <h3>🎉 动画内容</h3>
            <p>这个内容会有平滑的进入和退出动画效果。</p>
            <p>使用了 CSS transition 和 React 状态控制。</p>
          </div>
        </CSSTransition>
      </div>

      {/* 视图切换动画 */}
      <div style={{ 
        padding: '20px',
        border: '1px solid #ddd',
        borderRadius: '8px',
        backgroundColor: '#f9f9f9'
      }}>
        <h2>视图切换动画</h2>
        <div style={{ marginBottom: '20px' }}>
          {Object.keys(views).map((key) => (
            <button
              key={key}
              onClick={() => setCurrentView(key)}
              style={{
                padding: '10px 20px',
                margin: '0 5px',
                backgroundColor: currentView === key ? views[key].color : '#f0f0f0',
                color: currentView === key ? 'white' : 'black',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer'
              }}
            >
              {views[key].title}
            </button>
          ))}
        </div>

        <div style={{ 
          position: 'relative', 
          minHeight: '200px',
          overflow: 'hidden',
          border: '1px solid #ccc',
          borderRadius: '8px'
        }}>
          {Object.keys(views).map((key) => (
            <CSSTransition
              key={key}
              isVisible={currentView === key}
              animationType="slide"
            >
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                padding: '20px',
                backgroundColor: views[key].color + '20',
                borderLeft: `4px solid ${views[key].color}`
              }}>
                <h3 style={{ color: views[key].color, margin: '0 0 10px 0' }}>
                  {views[key].title}
                </h3>
                <p style={{ margin: 0, color: '#333' }}>
                  {views[key].content}
                </p>
              </div>
            </CSSTransition>
          ))}
        </div>
      </div>

      <div style={{ 
        marginTop: '20px', 
        padding: '15px',
        backgroundColor: '#fff3e0',
        borderRadius: '4px',
        fontSize: '14px'
      }}>
        <strong>📝 动画说明：</strong>
        <ul style={{ margin: '10px 0', paddingLeft: '20px' }}>
          <li><strong>淡入淡出：</strong>使用 opacity 变化实现平滑的显示隐藏</li>
          <li><strong>滑动效果：</strong>使用 transform translateX 实现左右滑动</li>
          <li><strong>缩放效果：</strong>使用 transform scale 实现缩放动画</li>
          <li><strong>组合动画：</strong>同时使用多个 CSS 属性创建复合效果</li>
        </ul>
      </div>
    </div>
  );
}
