import React from 'react';

export default function KeepAliveContainer({ children }) {
  return (
    <div className="keep-alive-container">
      {React.Children.map(children, (child) => {
        if (!child) return null;
        
        // 克隆子组件并添加样式控制
        return React.cloneElement(child, {
          style: {
            ...child.props.style,
            display: child.props.isActive ? 'block' : 'none'
          }
        });
      })}
    </div>
  );
}
