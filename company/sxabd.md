# 阿贝多多（陕西阿贝多多）✅

- **业务领域**: 电力信息化系统、数字能源监测、智慧电网物联网、企业消费金融软件服务
- **技术栈**: Vue 3、TypeScript、ECharts、DataV、Canvas、Element Plus、Node.js
- **团队规模**: 公司约100-499人，前端研发团队约25人
- **办公地点**: 西安（高新区）
- **公司性质**: 数字化能源与金融科技企业
- **薪资水平**: 校招10-18万，社招14-28万

## 岗位类型

- **前端开发工程师** - 负责电力运营后台、电网资产数字化管理系统及消费金融业务端研发
- **数据可视化前端工程师** - 负责变电站/光伏电站数字孪生大屏、电力负荷实时时序图表与拓扑图研发
- **全栈开发工程师** - 负责 Node.js 中间层、报表数据聚合与业务工作流配置平台

## 技术特色

- **实时高频能源时序数据可视化**: 面对电网变电站传感器每秒数十次的高频遥测遥信推送，运用 WebSocket 与 ECharts 降采样保证大屏 60FPS 流畅渲染。
- **复杂电力接线图与拓扑图交互**: 基于 Canvas 与 SVG 自研节点拖拽连接、动态电流粒子流向动画及断路器状态实时警报渲染。
- **工业级数据安全与权限隔离**: 针对电力与金融敏感业务，全面落实接口敏感数据脱敏、水印防截屏与严格的 RBAC 角色权限体系。

## 面试流程概览

### 校园招聘

1. **简历筛选** → **线上笔试（计算机基础 + JavaScript）** → **专业技术一面** → **综合HR面试**
   - 总流程约2-3周
   - 难度: 3/5星
   - 通过率: 约20%

### 社会招聘

1. **简历筛选** → **技术一面（基础语言功底、Vue 3 核心与项目经验）** → **技术二面/部门负责人面（系统架构与可视化实操）** → **HR面试**
   - 总流程约1-2周
   - 难度: 3.5/5星
   - 通过率: 约20%

## 题库

### P0 必考知识点

#### 智慧能源监控大屏中高频实时时序数据（如每秒 50+ 次推送）如何避免浏览器卡顿崩溃？ {#p0-energy-dashboard-streaming}

<Answer>

### 核心结论

电网设备每秒推送大量电压、电流或温度数据，若每次 WebSocket `onmessage` 均调用 `chart.setOption()` 重绘 ECharts，将频繁触发强制同步布局与 Canvas 重新光栅化，导致主线程卡顿甚至内存溢出。标准方案是**数据缓冲池（Buffer Pool） + `requestAnimationFrame` 限频批量合并更新 + LTTB（Largest-Triangle-Three-Buckets）降采样算法**。

---

### 优化架构与实现

1. **双缓冲队列解耦接收与渲染**：
   - WebSocket 接收到的原始采样点仅简单 `push` 进前端内存环形队列（Ring Buffer），不做任何 DOM 或 Canvas 触发。
2. **定时/动画帧批量刷新（Batch Updating）**：
   - 启动 `requestAnimationFrame` 或 100ms~200ms 的定时调度器：
     ```javascript
     let bufferData = []
     socket.onmessage = (e) => {
       bufferData.push(JSON.parse(e.data))
     }

     function scheduleRender() {
       if (bufferData.length > 0) {
         // 批量取出当前帧内所有积累的数据
         const chunk = bufferData.splice(0)
         updateChart(chunk)
       }
       requestAnimationFrame(scheduleRender)
     }
     requestAnimationFrame(scheduleRender)
     ```
3. **ECharts 增量与降采样配置**：
   - 配置 `sampling: 'lttb'`（最大三角形三桶降采样），在保留波峰波谷特征的同时将几万个点压缩至数百像素点。
   - 使用增量更新 API 或仅更新 `series.data` 数组，避免重新传递完整的完整 `option` 配置项。

---

### 面试官视角

面试官考察候选人对工业互联网高频数据流场景的优化功底，能否清晰解耦数据传输线程与渲染线程，以及是否掌握图形学降采样与环形队列算法。

</Answer>

#### Vue 3 Composition API 在工业设备状态监控模块中的优雅复用抽象？ {#p0-vue3-composition-device-monitor}

<Answer>

### 核心结论

在工业能源系统中，水表、电表、断路器、光伏逆变器等多种设备均具有共同的“连接状态、告警状态、实时遥测遥信拉取、重试控制”逻辑。利用 Vue 3 的 **组合式函数（Composables）** 可以将状态和副作用高度封装与跨组件复用。

---

### 规范实现（自定义 useDeviceMonitor Hook）

```typescript
import { ref, onMounted, onUnmounted } from 'vue'

export function useDeviceMonitor(deviceId: string, wsUrl: string) {
  const telemetryData = ref<Record<string, any>>({})
  const isOnline = ref(false)
  const alertList = ref<string[]>([])
  let socket: WebSocket | null = null

  function connect() {
    socket = new WebSocket(`${wsUrl}?devId=${deviceId}`)
    socket.onopen = () => { isOnline.value = true }
    socket.onclose = () => { isOnline.value = false }
    socket.onmessage = (event) => {
      const msg = JSON.parse(event.data)
      telemetryData.value = msg.data
      if (msg.alerts) alertList.value = msg.alerts
    }
  }

  onMounted(() => { connect() })
  onUnmounted(() => { socket?.close() })

  return {
    telemetryData,
    isOnline,
    alertList,
    reconnect: connect
  }
}
```

---

### 延伸阅读

- [ECharts 大数据量时序折线图渲染优化官方建议](https://echarts.apache.org/zh/tutorial.html)
- [Vue 3 组合式函数最佳实践](https://vuejs.org/guide/reusability/composables.html)

</Answer>

## 考察重点速览

- **必考知识点**: Vue 3 组合式 API 原理、WebSocket 长连接保活与消息节流、ECharts/DataV 可视化大屏适配、CSS Flex/Grid 栅格布局。
- **高频面试题**: 高频时序数据大屏性能优化、Vue 3 自定义 Hook 封装、工业拓扑图实现思路、前端敏感数据脱敏。
- **编程挑战**: 实现数据缓冲批量刷新器、数组常用变换、ECharts 动态自适应 resize 封装。

## 备考建议

**针对性准备策略**
- **结合工业能源与数据大屏项目展开**: 面试中突出展示对数据可视化图表、动态曲线、拓扑图、大屏分辨率适配（vw/vh 或 scale 等比缩放方案）的熟练运用。
- **展现脚踏实地的工程即战力**: 重点说明项目组件化抽象、接口联调与交付能力。

**推荐准备资源**
- [Apache ECharts 官方图表示例库](https://echarts.apache.org/examples/zh/index.html)
- [Vue 3 中文官方文档](https://cn.vuejs.org/)

**差异化准备建议**
- **校招生**: 掌握 JS 核心语法、Vue 3 基础、常见 CSS 居中与响应式布局。
- **社招生**: 突出中大型中后台系统架构设计能力、大屏性能攻坚经验与敏捷团队协作素养。

