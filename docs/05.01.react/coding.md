# 编码✅

## 如何在 React 中实现类似 Vue keep-alive 的功能？{#p0-react-keep-alive}

<Answer>

在 React 中可以通过多种方式实现类似 Vue keep-alive 的组件缓存功能：

**方案一：使用 display 控制显示隐藏**

import appKeepAlive from '!!raw-loader!./answers/keep-alive/app.jsx';
import KeepAliveContainer from '!!raw-loader!./answers/keep-alive/KeepAliveContainer.jsx';
import ComponentA from '!!raw-loader!./answers/keep-alive/ComponentA.jsx';
import ComponentB from '!!raw-loader!./answers/keep-alive/ComponentB.jsx';

<Sandpack
  template="react"
  options={{
     editorHeight: 600
  }}
  files={{
    "/App.js": appKeepAlive,
    "/KeepAliveContainer.jsx": KeepAliveContainer,
    "/ComponentA.jsx": ComponentA,
    "/ComponentB.jsx": ComponentB,
  }}
/>

**方案二：使用 Portal 实现更复杂的缓存**

```jsx
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';

function AdvancedKeepAlive({ children, isActive, cacheKey }) {
  const cacheRef = useRef(new Map());
  const containerRef = useRef();

  useEffect(() => {
    if (!containerRef.current) {
      containerRef.current = document.createElement('div');
      containerRef.current.style.display = 'none';
      document.body.appendChild(containerRef.current);
    }

    return () => {
      if (containerRef.current) {
        document.body.removeChild(containerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.style.display = isActive ? 'block' : 'none';
    }
  }, [isActive]);

  if (!containerRef.current) return null;

  return createPortal(children, containerRef.current);
}
```

**方案三：使用第三方库 react-activation**

```jsx
import KeepAlive, { AliveScope } from 'react-activation';

function App() {
  return (
    <AliveScope>
      <Router>
        <Switch>
          <Route exact path="/">
            <KeepAlive cacheKey="home">
              <Home />
            </KeepAlive>
          </Route>
          <Route path="/about">
            <KeepAlive cacheKey="about">
              <About />
            </KeepAlive>
          </Route>
        </Switch>
      </Router>
    </AliveScope>
  );
}
```

**答案解析**

该题考察如下知识点：

1. **React 组件生命周期**：理解组件挂载、卸载和重新渲染的机制
2. **状态管理**：如何在组件切换时保持状态不丢失
3. **Portal 技术**：使用 createPortal 将组件渲染到指定 DOM 节点
4. **缓存策略**：设计合理的组件缓存和清理机制

**核心实现思路**：

- 使用 `display: none/block` 控制组件显示隐藏而不是卸载
- 利用 Map 或对象存储组件实例和状态
- 通过唯一的 cacheKey 标识需要缓存的组件
- 提供缓存清理机制防止内存泄漏

**与 Vue keep-alive 的对比**：

| 特性 | Vue keep-alive | React 实现 |
|------|----------------|------------|
| **原生支持** | 框架内置 | 需要自己实现 |
| **API 简洁性** | 简单易用 | 相对复杂 |
| **缓存控制** | include/exclude | 自定义逻辑 |
| **性能** | 高度优化 | 取决于实现方式 |

</Answer>

## 如何实现转场动画？{#p1-react-transition}

<Answer>

React 中可以通过多种方式实现转场动画，以下是常见的实现方案：

**方案一：使用 CSS Transitions + 状态控制**

import appTransition from '!!raw-loader!./answers/transition/app.jsx';
import CSSTransition from '!!raw-loader!./answers/transition/CSSTransition.jsx';

<Sandpack
  template="react"
  options={{
     editorHeight: 600
  }}
  files={{
    "/App.js": appTransition,
    "/CSSTransition.jsx": CSSTransition,
  }}
/>

**方案二：使用 react-transition-group**

```jsx
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import './transition.css';

function TransitionDemo() {
  const [items, setItems] = useState([
    { id: 1, text: 'Item 1' },
    { id: 2, text: 'Item 2' }
  ]);

  const addItem = () => {
    const newItem = {
      id: Date.now(),
      text: `Item ${items.length + 1}`
    };
    setItems([...items, newItem]);
  };

  const removeItem = (id) => {
    setItems(items.filter(item => item.id !== id));
  };

  return (
    <div>
      <button onClick={addItem}>Add Item</button>
      <TransitionGroup>
        {items.map(item => (
          <CSSTransition
            key={item.id}
            timeout={300}
            classNames="item"
          >
            <div className="item">
              {item.text}
              <button onClick={() => removeItem(item.id)}>×</button>
            </div>
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  );
}
```

对应的 CSS：

```css
.item-enter {
  opacity: 0;
  transform: translateX(-100%);
}

.item-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 300ms ease-in-out;
}

.item-exit {
  opacity: 1;
  transform: translateX(0);
}

.item-exit-active {
  opacity: 0;
  transform: translateX(100%);
  transition: all 300ms ease-in-out;
}
```

**方案三：使用 Framer Motion**

```jsx
import { motion, AnimatePresence } from 'framer-motion';

function FramerTransition() {
  const [isVisible, setIsVisible] = useState(true);

  return (
    <div>
      <button onClick={() => setIsVisible(!isVisible)}>
        Toggle
      </button>
      
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.3 }}
            className="animated-box"
          >
            <h3>Animated Content</h3>
            <p>This content has smooth transitions!</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
```

**方案四：自定义 Hook 实现动画**

```jsx
import { useState, useEffect } from 'react';

function useTransition(isVisible, duration = 300) {
  const [shouldRender, setShouldRender] = useState(isVisible);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShouldRender(true);
      requestAnimationFrame(() => {
        setIsAnimating(true);
      });
    } else {
      setIsAnimating(false);
      const timer = setTimeout(() => {
        setShouldRender(false);
      }, duration);
      return () => clearTimeout(timer);
    }
  }, [isVisible, duration]);

  return { shouldRender, isAnimating };
}

function CustomTransition({ isVisible, children }) {
  const { shouldRender, isAnimating } = useTransition(isVisible);

  if (!shouldRender) return null;

  return (
    <div 
      className={`transition-wrapper ${isAnimating ? 'visible' : 'hidden'}`}
      style={{
        opacity: isAnimating ? 1 : 0,
        transform: isAnimating ? 'translateY(0)' : 'translateY(-20px)',
        transition: 'all 300ms ease-in-out'
      }}
    >
      {children}
    </div>
  );
}
```

**方案五：路由转场动画**

```jsx
import { useLocation } from 'react-router-dom';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <TransitionGroup>
      <CSSTransition
        key={location.key}
        classNames="page"
        timeout={300}
      >
        <Routes location={location}>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
        </Routes>
      </CSSTransition>
    </TransitionGroup>
  );
}
```

页面转场 CSS：

```css
.page-enter {
  opacity: 0;
  transform: translateX(100%);
}

.page-enter-active {
  opacity: 1;
  transform: translateX(0);
  transition: all 300ms ease-out;
}

.page-exit {
  opacity: 1;
  transform: translateX(0);
}

.page-exit-active {
  opacity: 0;
  transform: translateX(-100%);
  transition: all 300ms ease-in;
}
```

**性能优化技巧**

```jsx
// 使用 transform 和 opacity，避免触发重排
const optimizedStyles = {
  transition: 'transform 300ms ease-out, opacity 300ms ease-out',
  willChange: 'transform, opacity', // 提示浏览器优化
};

// 使用 requestAnimationFrame 确保动画流畅
function smoothTransition() {
  requestAnimationFrame(() => {
    // 动画逻辑
  });
}

// 减少重渲染
const MemoizedComponent = React.memo(({ isVisible }) => {
  return (
    <motion.div
      animate={{ opacity: isVisible ? 1 : 0 }}
      transition={{ duration: 0.3 }}
    >
      Content
    </motion.div>
  );
});
```

**答案解析**

该题考察如下知识点：

1. **CSS 动画原理**：理解 transition、transform、opacity 等 CSS 属性
2. **React 状态管理**：控制动画的触发和状态变化
3. **组件生命周期**：在适当的时机触发动画效果
4. **第三方库使用**：熟悉 react-transition-group、Framer Motion 等
5. **性能优化**：避免重排重绘，使用 GPU 加速

**不同方案对比**：

| 方案 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| **CSS Transitions** | 轻量级，性能好 | 功能有限 | 简单的显示隐藏动画 |
| **react-transition-group** | API 丰富，社区成熟 | 体积较大 | 复杂的列表动画 |
| **Framer Motion** | 功能强大，易用 | 体积大，学习成本高 | 复杂的交互动画 |
| **自定义 Hook** | 灵活可控 | 开发成本高 | 特定需求的动画 |

**最佳实践**：

- 优先使用 `transform` 和 `opacity` 实现动画
- 合理使用 `will-change` 属性
- 避免在动画过程中触发重排
- 考虑用户的动画偏好设置（prefers-reduced-motion）

**延伸阅读**

- [React Transition Group](https://reactcommunity.org/react-transition-group/) - 官方转场动画库
- [Framer Motion](https://www.framer.com/motion/) - 强大的 React 动画库
- [Web Animations API](https://developer.mozilla.org/en-US/docs/Web/API/Web_Animations_API) - 现代浏览器动画 API

</Answer>
