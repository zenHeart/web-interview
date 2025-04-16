/**
 * DOM的事件冒泡机制也是职责链模式的一种应用：
 */

// HTML结构
// <div id="container">
//   <div id="panel">
//     <button id="button">Click Me</button>
//   </div>
// </div>

// 事件处理
document.getElementById('button').addEventListener('click', function (event) {
  console.log('Button clicked')
  // 如果需要阻止冒泡：event.stopPropagation();
})

document.getElementById('panel').addEventListener('click', function (event) {
  console.log('Panel clicked')
})

document.getElementById('container').addEventListener('click', function (event) {
  console.log('Container clicked')
})

// 点击按钮时的输出：
// Button clicked
// Panel clicked
// Container clicked
