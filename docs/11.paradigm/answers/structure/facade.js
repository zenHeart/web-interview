/**
 * 典型场景：统一封装动画库/图表库/页面初始化逻辑
 * - 页面初始化入口统一封装（initApp）
 * - 封装复杂 API，降低组件间耦合度
 * - 封装第三方库统一入口，如 ECharts、D3、Mapbox 调用
 */

// 外观函数封装复杂动画库的调用
function showModalAnimation (element) {
  fadeIn(element)
  scaleUp(element)
  lockScroll()
}

function fadeIn (el) { /* 复杂动画逻辑 */ }
function scaleUp (el) { /* scale animation */ }
function lockScroll () { document.body.style.overflow = 'hidden' }

// 使用
showModalAnimation(document.querySelector('#modal'))
