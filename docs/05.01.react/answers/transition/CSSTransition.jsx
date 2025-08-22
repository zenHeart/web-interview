import React, { useState, useEffect } from 'react';

export default function CSSTransition({ 
  children, 
  isVisible, 
  duration = 300,
  animationType = 'fade' 
}) {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      // 使用 requestAnimationFrame 确保 DOM 更新后再开始动画
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      // 等待动画结束后再移除 DOM
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, duration);
      
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  if (!shouldRender) return null;

  // 根据动画类型定义不同的样式
  const getAnimationStyles = () => {
    const baseStyles = {
      transition: `all ${duration}ms ease-in-out`,
      willChange: 'transform, opacity'
    };

    switch (animationType) {
      case 'slide':
        return {
          ...baseStyles,
          transform: isAnimating ? 'translateX(0)' : 'translateX(-100%)',
          opacity: isAnimating ? 1 : 0
        };
      
      case 'scale':
        return {
          ...baseStyles,
          transform: isAnimating ? 'scale(1)' : 'scale(0.8)',
          opacity: isAnimating ? 1 : 0
        };
      
      case 'slideUp':
        return {
          ...baseStyles,
          transform: isAnimating ? 'translateY(0)' : 'translateY(20px)',
          opacity: isAnimating ? 1 : 0
        };
      
      case 'fade':
      default:
        return {
          ...baseStyles,
          opacity: isAnimating ? 1 : 0
        };
    }
  };

  return (
    <div style={getAnimationStyles()}>
      {children}
    </div>
  );
}

// 用于演示不同动画类型的组件
export function AnimationShowcase() {
  const [activeDemo, setActiveDemo] = useState('fade');
  const [isVisible, setIsVisible] = useState(true);

  const animationTypes = [
    { key: 'fade', name: '淡入淡出', icon: '✨' },
    { key: 'slide', name: '左滑入', icon: '➡️' },
    { key: 'scale', name: '缩放', icon: '🔍' },
    { key: 'slideUp', name: '上滑入', icon: '⬆️' }
  ];

  return (
    <div style={{ padding: '20px' }}>
      <h3>动画类型演示</h3>
      
      <div style={{ marginBottom: '20px' }}>
        {animationTypes.map(type => (
          <button
            key={type.key}
            onClick={() => setActiveDemo(type.key)}
            style={{
              padding: '8px 16px',
              margin: '0 5px',
              backgroundColor: activeDemo === type.key ? '#007acc' : '#f0f0f0',
              color: activeDemo === type.key ? 'white' : 'black',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer'
            }}
          >
            {type.icon} {type.name}
          </button>
        ))}
      </div>

      <button
        onClick={() => setIsVisible(!isVisible)}
        style={{
          padding: '10px 20px',
          backgroundColor: '#4CAF50',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
          marginBottom: '20px'
        }}
      >
        {isVisible ? '隐藏' : '显示'} ({animationTypes.find(t => t.key === activeDemo)?.name})
      </button>

      <div style={{ 
        minHeight: '150px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center'
      }}>
        <CSSTransition 
          isVisible={isVisible} 
          animationType={activeDemo}
          duration={400}
        >
          <div style={{
            padding: '30px',
            backgroundColor: '#e8f5e9',
            border: '2px solid #4CAF50',
            borderRadius: '12px',
            textAlign: 'center',
            maxWidth: '300px'
          }}>
            <h4 style={{ margin: '0 0 10px 0', color: '#2E7D32' }}>
              🎭 动画演示
            </h4>
            <p style={{ margin: 0, color: '#666' }}>
              当前动画类型: <strong>{animationTypes.find(t => t.key === activeDemo)?.name}</strong>
            </p>
          </div>
        </CSSTransition>
      </div>
    </div>
  );
}
