# MINIEYE（佑驾创新）✅

- **业务领域**: 自动驾驶与智能网联汽车、高级驾驶辅助系统（ADAS）、智能座舱与感知数据可视化
- **技术栈**: Vue 3、React、TypeScript、Three.js、WebGL、Canvas、Node.js、WebSocket/Protobuf
- **团队规模**: 智能驾驶前端与可视化团队约50人
- **办公地点**: 深圳（南山区高新南四道泰邦科技大厦）、武汉、北京、上海
- **公司性质**: 自动驾驶硬科技领军企业
- **薪资水平**: 校招18-32万，社招25-55万

## 岗位类型

- **智驾感知可视化前端工程师** - 负责 3D 激光雷达点云渲染、车辆动态轨迹回放与道路目标物实时绘制
- **智能座舱 HMI 前端工程师** - 负责车载大屏交互、数字仪表盘、车端桌面客户端开发
- **智驾数据标注与研发平台工程师** - 负责海量图片/视频数据标注平台、模型评测平台与工具链中后台研发

## 技术特色

- **超高频三维点云与地图轻量化渲染**: 基于 Three.js 与 WebGL 着色器（Shader），实现车道线、障碍物 BoundingBox 及海量点云的 60FPS 极速上屏。
- **车载遥测数据协议与二进制低延迟通道**: 结合 WebSocket 与 Protocol Buffers (Protobuf)，压榨网络带宽，实现毫秒级车路协同遥测数据流转。
- **Canvas 像素级图像处理算法**: 深入底层 `ImageData` 进行像素卷积运算、灰度化、高斯模糊及动态二值化阈值处理。

## 面试流程概览

### 校园招聘

1. **简历筛选** → **专业笔试（图形学基础 + 算法）** → **技术一面** → **技术二面** → **HR面试**
   - 总流程约3-4周
   - 难度: 3.5/5星
   - 通过率: 约15%

### 社会招聘

1. **简历筛选** → **技术一面（计算机图形学/数据结构/网络原理）** → **技术二面（三维可视化项目实战与系统设计）** → **部门主管/CTO面** → **HR面试**
   - 总流程约2周
   - 难度: 4/5星
   - 通过率: 约12%

## 题库

### P0 必考知识点

#### Socket 通信中粘包与拆包的产生原因及协议层解决方案？ {#p0-socket-packet-sticking}

<Answer>

### 核心结论

TCP 是**面向字节流（Byte Stream）**的传输层协议，协议本身没有保护消息边界的机制。当发送端连续发送多个短小数据包时，Nagle 算法或缓冲区聚合会将其合并为一个 TCP 段发送，引发**粘包**；当单个数据包超过 TCP 最大报文段长度（MSS）或套接字发送缓冲区时，会被切分为多个片段，引发**拆包**。

---

### 应用层协议解决方案

1. **固定长度包（Fixed Length）**：
   - 规定每个通信包固定为 $K$ 个字节，不足的以空字符补齐。缺点是浪费网络带宽。
2. **特殊分隔符（Delimiter-based）**：
   - 在每条消息末尾添加明确分隔符（如 `\r\n` 或 `\0`）。接收端按分隔符切分。缺点是消息体内部必须做转义。
3. **自定义头部 + 消息长度标识（Length-Field Based，主流首选）**：
   - 制定二进制协议头，如：`[Magic Number (2B)] + [Body Length (4B)] + [Payload Data (NB)]`。
   - 前端或服务端接收字节流时先缓冲在 ByteQueue 中；每次先读取固定的头部 6 字节，解析出消息体长度 $L$；若当前缓冲队列总长度 $\ge 6 + L$，则精确截取完整数据包并交由业务层解析，从而彻底根除粘包与拆包。

---

### 面试官视角

智驾领域大量使用长连接传输遥测传感器数据，面试官着重考查候选人对“TCP 流式传输无边界”特性的理解，以及基于二进制 TypedArray（DataView/Uint8Array）设计自定义通讯协议的功底。

</Answer>

#### 利用 Canvas 实现本地图片灰度化与动态二值化处理？ {#p0-canvas-image-binarization}

<Answer>

### 核心结论

Canvas 2D 上下文的 `ctx.getImageData()` 可获取图像所有像素的 RGBA 原始字节数组（`Uint8ClampedArray`）。
- **灰度化（Grayscale）**：利用人眼对不同颜色敏感度的心理学加权公式计算单个亮度分量：$Gray = 0.299 \times R + 0.587 \times G + 0.114 \times B$。
- **二值化（Binarization）**：设定阈值 $T$（如 128），将大于阈值的像素设为白色（255），小于设为黑色（0），常用于边缘轮廓提取。

---

### 规范实现代码

```javascript
function binarizeImage(canvas, threshold = 128) {
  const ctx = canvas.getContext('2d')
  const imgData = ctx.getImageData(0, 0, canvas.width, canvas.height)
  const data = imgData.data // [R, G, B, A, R, G, B, A, ...]

  for (let i = 0; i < data.length; i += 4) {
    const r = data[i]
    const g = data[i + 1]
    const b = data[i + 2]

    // 1. 心理学灰度加权公式
    const gray = 0.299 * r + 0.587 * g + 0.114 * b

    // 2. 根据阈值二值化
    const binary = gray >= threshold ? 255 : 0

    data[i] = binary     // R
    data[i + 1] = binary // G
    data[i + 2] = binary // B
    // data[i + 3] 保持 Alpha 透明度不变
  }

  // 3. 将处理后的像素数据写回画布
  ctx.putImageData(imgData, 0, 0)
}
```

---

### 面试官视角

考查候选人对前端图像处理管线底层原理、ImageData 扁平数组排列规则及高频图像像素遍历性能的掌握。

</Answer>

### P1 高频知识点

#### 计算 $N!$（N的阶乘）末尾 0 的个数（算法题）？ {#p1-factorial-trailing-zeroes}

<Answer>

### 核心结论

若直接计算 $N!$ 的具体数值，当 $N \ge 20$ 时数字将迅速超出 JavaScript 安全整数范围（`Number.MAX_SAFE_INTEGER`）产生溢出。
末尾的 0 只能由因数分解中的 $2 \times 5 = 10$ 产生。在连续整数分解中，质因数 2 的数量远多于 5，因此**末尾 0 的个数严格等于 $1 \sim N$ 中质因数 5 的总个数**。

---

### 规范数学解法（$O(\log_5 N)$ 复杂度）

```javascript
function trailingZeroes(n) {
  let count = 0
  while (n >= 5) {
    count += Math.floor(n / 5)
    n = Math.floor(n / 5)
  }
  return count
}

console.log(trailingZeroes(25)) // 25/5=5, 5/5=1 -> 6 个零
```

---

### 延伸阅读

- [MDN Canvas API 图像像素操作指南](https://developer.mozilla.org/zh-CN/docs/Web/API/Canvas_API/Tutorial/Pixel_manipulation_with_canvas)
- [LeetCode 172. 阶乘后的零](https://leetcode.cn/problems/factorial-trailing-zeroes/)

</Answer>

## 考察重点速览

- **必考知识点**: 计算机图形学与 Canvas 像素处理、TCP/Socket 网络协议、数学因数算法、Three.js/WebGL 3D 渲染基础。
- **高频面试题**: TCP 粘包拆包解决方案、图片二值化与滤镜实现、阶乘末尾 0 的规律、树的递归遍历与剪枝。
- **编程挑战**: 图像卷积算法、阶乘后零计数、手写贝塞尔曲线缓动函数、大文件切片上传。

## 备考建议

**针对性准备策略**
- **突出图形学与硬件加速优势**: MINIEYE 作为自动驾驶企业，重点复习 Canvas、SVG、WebGL 以及 3D 数学（向量、矩阵变换、点乘叉乘）。
- **网络底层机制理解**: 深刻理解长连接、二进制数据流转换与多线程 Worker 图像预处理。

**推荐准备资源**
- [Three.js 官方示例与文档](https://threejs.org/)
- [计算机图形学基础教程](https://learnopengl-cn.github.io/)

**差异化准备建议**
- **校招生**: 重视数学基础、C++/JS 基础算法、网络原理与图形学基础。
- **社招生**: 突出自动驾驶高精地图可视化、车机 HMI 性能攻坚与高帧率 WebGL 架构经验。

