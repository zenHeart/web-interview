import React, { useState } from 'react';

// 用于演示的自定义组件
const CustomComponent = ({ customProp, isActive, children }) => (
   <div className={isActive ? 'active' : ''}>
      <p>自定义属性: {customProp}</p>
      {children}
   </div>
);

// 用于动态渲染的组件
const ComponentA = () => <div>这是组件 A</div>;
const ComponentB = () => <div>这是组件 B</div>;

// 使用渲染属性的组件
const RenderPropComponent = ({ render }) => (
   <div className="render-container">
      <h4>渲染属性演示:</h4>
      {render()}
   </div>
);

// 演示插槽的组件
const Parent = ({ children }) => (
   <div className="parent">
      <h4>父组件:</h4>
      <div className="children-slot">{children}</div>
   </div>
);

const JSXFeaturesDemo = () => {
   // 演示用的状态
   const [count, setCount] = useState(0);
   const [showA, setShowA] = useState(true);
   
   // 用于列表渲染的数据
   const fruits = [
      { id: 1, name: '苹果' },
      { id: 2, name: '香蕉' },
      { id: 3, name: '樱桃' }
   ];
   
   // 用于演示XSS保护的潜在危险内容
   const userInput = '<script>alert("XSS")</script> 用户内容';
   
   // 用于属性展开的props
   const buttonProps = {
      className: 'primary-button',
      disabled: count > 10,
      'aria-label': '增加计数器'
   };
   
   // 基于状态的动态组件
   const DynamicComponent = showA ? ComponentA : ComponentB;

   return (
      <div className="jsx-demo">
         <h1>JSX特性演示</h1>
         
         {/* 表达式插值 */}
         <section>
            <h2>表达式插值</h2>
            <p>计数值: {count}</p>
            <p>计算值: {count * 2}</p>
            <p>用户输入(自动转义): {userInput}</p>
         </section>
         
         {/* 空值渲染 */}
         <section>
            <h2>空值渲染</h2>
            <div>
               空值: {null} {false} {undefined} {true}
            </div>
            {count > 5 ? null : <p>当计数 &gt; 5 时这段将消失</p>}
         </section>
         
         {/* 原生元素与事件 */}
         <section>
            <h2>原生元素与事件</h2>
            <button onClick={() => setCount(count + 1)}>
               增加计数
            </button>
         </section>
         
         {/* 样式处理 */}
         <section>
            <h2>样式处理</h2>
            <div style={{ color: 'red', fontSize: '16px', fontWeight: 'bold' }}>
               内联样式文本
            </div>
            <div className="external-styled">
               类样式文本
            </div>
         </section>
         
         {/* 自定义组件 */}
         <section>
            <h2>自定义组件</h2>
            <CustomComponent customProp="你好世界" isActive>
               <span>这是一个子元素</span>
            </CustomComponent>
         </section>
         
         {/* 自定义属性 */}
         <section>
            <h2>自定义属性</h2>
            <div data-testid="demo" data-value={count}>
               带有自定义属性的元素
            </div>
         </section>
         
         {/* 属性展开 */}
         <section>
            <h2>属性展开</h2>
            <button {...buttonProps} onClick={() => setCount(count + 1)}>
               点击我 ({count})
            </button>
         </section>
         
         {/* 动态组件 */}
         <section>
            <h2>动态组件</h2>
            <button onClick={() => setShowA(!showA)}>切换组件</button>
            <DynamicComponent />
         </section>
         
         {/* 插槽演示 */}
         <section>
            <h2>插槽</h2>
            <Parent>
               <p>这个内容作为children传递</p>
               <button>子按钮</button>
            </Parent>
         </section>
         
         {/* 渲染属性 */}
         <section>
            <h2>渲染属性</h2>
            <RenderPropComponent 
               render={() => (
                  <div>由渲染函数创建的内容: {count}</div>
               )} 
            />
         </section>
         
         {/* 条件渲染 */}
         <section>
            <h2>条件渲染</h2>
            {/* 三元表达式 */}
            {count % 2 === 0 ? <p>计数是偶数</p> : <p>计数是奇数</p>}
            
            {/* 逻辑与运算符 (小心非布尔值) */}
            {count > 3 && <p>计数大于3</p>}
            
            {/* 避免非布尔值可能带来的问题 */}
            {Boolean(count) && <p>当计数为0时不会显示</p>}
         </section>
         
         {/* 列表渲染 */}
         <section>
            <h2>列表渲染</h2>
            <ul>
               {fruits.map(fruit => (
                  <li key={fruit.id}>{fruit.name}</li>
               ))}
            </ul>
         </section>
         
         {/* Fragment片段 */}
         <section>
            <h2>Fragment片段</h2>
            <>
               <p>Fragment中的第一个段落</p>
               <p>Fragment中的第二个段落</p>
            </>
         </section>
      </div>
   );
};

export default JSXFeaturesDemo;