# 小米汽车（武汉前端）✅

## 基本信息

- **业务领域**: 小米智能电动汽车（SU7/后续车型）、智能座舱人机交互、远程手机控车 H5/小程序、汽车销售与交付数字化中台
- **技术栈**: Vue3 / React / TypeScript / Canvas / WebGL / Three.js / WebSockets / Node.js
- **团队规模**: 1,000+ 人（汽车产研团队快速扩张中）
- **办公地点**: 武汉市东湖高新区高新大道 666 号小米武汉总部大楼
- **公司性质**: 500 强知名上市公司核心战略板块（小米汽车）
- **薪资水平**: 20k-45k * 15-18薪 + 汽车业务专属期权激励

---

## 岗位类型

- **智能座舱 HMI 前端工程师**: 负责车载大屏车载应用交互界面、3D 车模渲染交互及车载系统微前端集成。
- **控车移动端研发工程师**: 负责小米汽车 App 内远程控车 H5、车机互联卡片、智能充电调度及蓝牙数字钥匙交互。
- **汽车销售与交付前端工程师**: 负责全国交付中心数字化工作台、订单配置选配器（Car Configurator）及供应链协同平台。

---

## 技术特色

1. **工业级 3D 数字孪生与 60FPS 实时控车**：
   - 采用 WebGL / Three.js / 自研图形管线实现 SU7 车体模型在手机端与车机端的轻量化渲染，车门开合、车灯变换、车窗升降状态与车辆真实传感器毫秒级联动。
2. **复杂联动与大规模受控表单引擎**：
   - 汽车选配（外观车漆、轮毂卡钳、内饰材质、智驾包）存在数十种动态约束与互斥规则，底层采用基于有向无环图（DAG）的响应式表单校验与联动推导引擎。
3. **算法与状态机的高频考核**：
   - 面试格外注重扎实的算法与动态规划功底，重点考察数据排列组合、滑动窗口与状态机调度。

---

## 面试流程概览

### 校招流程
1. **在线机试 (90min)**: 算法编程题（动态规划、滑动窗口、图与树遍历）。
2. **专业一面 (50min)**: 考察 JavaScript 核心机制、数据结构手撕（链表反转、三数之和）、表单联动设计。
3. **专业二面 (60min)**: 深度算法考察（解码总数、模式匹配、最大连续和）、架构把控与车联业务场景题。
4. **HR 终面 (30min)**: 综合业务自驱力、抗压能力与薪资核定。

### 社招流程
1. **技术初试 (60min)**: 履历与重点项目深挖、现场手撕表单联动架构思路与中等难度算法。
2. **硬核算法与系统复试 (75min)**: 连续手写 2-3 道 LeetCode Medium/Hard 算法，考察车机协同与复杂状态机模型。
3. **部门总监面 (45min)**: 汽车业务认知度、复杂跨端系统攻坚经验与团队协作。
4. **HR 面与发薪**: 背景调查与 Offer 签署。

---

## 题库

### P0 核心必考题

#### 1. 复杂表单联动机制设计：动态依赖收集、异步校验与 Schema 规则编排？ {#p0-form-linkage-engine}

<Answer>
**核心结论**：
在汽车选配与复杂中后台系统中，表单字段之间存在强耦合关系（例如：选择“运动轮毂”时强制依赖“高性能制动卡钳”，并自动清空“雪地胎”选项）。工业级表单联动引擎采用**基于有向无环图（DAG）的依赖拓扑排序 + 响应式状态派发 + 异步校验防抖去抖**架构。通过将字段依赖定义为声明式规则，实现当某一字段值变化时，自动按拓扑层级自顶向下触发关联字段的显示/隐藏、只读、重置与异步校验，彻底杜绝死循环与手动 `if-else` 面条代码。

**原理解析与架构设计**：
1. **声明式依赖规则定义（Schema）**：
   - 每个字段不仅定义自己的类型与初始值，还定义 `dependencies: ['fieldA', 'fieldB']` 以及反应函数 `compute(values) -> partialState`。
2. **构建有向无环图（DAG）与拓扑排序**：
   - 初始化时扫描所有依赖声明，构建字段依赖图。
   - 使用 Kahn 算法进行环路检测。一旦发现循环依赖（如 A 依赖 B，B 依赖 A），立即抛出配置错误；否则输出拓扑执行序列。
3. **状态变化触发与防抖校验**：
   - 字段 `A` 变更时，仅将依赖 `A` 的直接与间接下游节点加入更新队列。
   - 异步校验（如服务端车型库存检查）结合 `AbortController`，当输入连续变更时取消上一次未完成的校验请求。

**标准代码实现（最小依赖联动调度引擎）**：
```typescript
type FormValues = Record<string, any>;
type DependencyCallback = (values: FormValues) => Partial<{
  visible: boolean;
  disabled: boolean;
  value: any;
}>;

export class ReactiveFormEngine {
  private values: FormValues = {};
  private rules: Map<string, { deps: string[]; handler: DependencyCallback }> = new Map();

  constructor(initialValues: FormValues) {
    this.values = { ...initialValues };
  }

  // 注册字段依赖规则
  public registerLinkage(field: string, deps: string[], handler: DependencyCallback) {
    this.rules.set(field, { deps, handler });
  }

  // 字段更新入口
  public setValue(field: string, value: any) {
    this.values[field] = value;
    this.triggerLinkage(field);
  }

  private triggerLinkage(changedField: string) {
    // 找出所有直接依赖 changedField 的字段
    for (const [targetField, rule] of this.rules.entries()) {
      if (rule.deps.includes(changedField)) {
        const updates = rule.handler(this.values);
        
        if (updates.value !== undefined) {
          this.values[targetField] = updates.value;
          // 递归级联触发下游联动
          this.triggerLinkage(targetField);
        }
      }
    }
  }

  public getValues(): FormValues {
    return { ...this.values };
  }
}
```

**面试官视角**：
- 考核候选人对大型前端复杂状态治理的抽象能力，能否跳出组件模板看到底层数据流图谱。
</Answer>

#### 2. 字符串编码解码总数计算（动态规划推演）？ {#p0-decode-ways-algorithm}

<Answer>
**核心结论**：
该题目等价于经典 **LeetCode 91. 解码方法（Decode Ways）**。字符 `'1'-'26'` 映射到 `'A'-'Z'`。给定纯数字字符串 `str`，求其合法解码的总方案数。采用**动态规划（DP）**，定义 $dp[i]$ 为字符串前 $i$ 个字符 `str[0...i-1]` 的解码总数。由于当前字符最多与前一个字符组合，状态转移方程仅依赖前两个状态，可将空间复杂度优化至 $O(1)$，时间复杂度为 $O(N)$。

**算法推导与边界判断**：
1. **状态定义与初始边界**：
   - 若字符串以 `'0'` 开头，无法映射任何字符，直接返回 0。
   - 初始条件：$dp[0] = 1$（空字符串 1 种解码方式），$dp[1] = 1$（首字符非 '0' 为 1 种）。
2. **状态转移方程**：
   - **单字符解码**：若当前字符 `str[i-1] !== '0'`，它可以单独作为一个字母，此时 $dp[i] += dp[i-1]$。
   - **双字符解码**：若前两个字符构成的数值在 `10` 到 `26` 之间（即 `10 <= num <= 26`），它可以作为一个组合字母，此时 $dp[i] += dp[i-2]$。
   - 若两项均不满足且遇到孤立的 `'0'`（如 `"30"`），说明无法解码，返回 0。

**标准代码实现**：
```typescript
function numDecodings(str: string): number {
  if (!str || str[0] === '0') return 0;
  const n = str.length;

  let prev2 = 1; // 对应 dp[i-2]
  let prev1 = 1; // 对应 dp[i-1]

  for (let i = 2; i <= n; i++) {
    let current = 0;
    const oneDigit = Number(str.slice(i - 1, i));
    const twoDigits = Number(str.slice(i - 2, i));

    // 独立解码
    if (oneDigit >= 1 && oneDigit <= 9) {
      current += prev1;
    }
    // 组合解码
    if (twoDigits >= 10 && twoDigits <= 26) {
      current += prev2;
    }

    // 无法继续有效解码
    if (current === 0) return 0;

    prev2 = prev1;
    prev1 = current;
  }

  return prev1;
}

// 验证用例
console.log(numDecodings('121')); // 输出: 3 (ABA, AU, LA)
console.log(numDecodings('01'));  // 输出: 0
console.log(numDecodings('226')); // 输出: 3 (BBF, VF, BZ)
```

**面试官视角**：
- 考察点：动态规划子结构划分与 `'0'` 字符的各种非法边界测试能力。
</Answer>

#### 3. 最大子数组和（Kadane 算法与动态规划）？ {#p0-maximum-subarray}

<Answer>
**核心结论**：
寻找一维数组中具有最大和的连续子数组是经典算法基石（**LeetCode 53. 最大子数组和**）。Kadane 算法是动态规划在空间优化上的极致体现。定义状态 $currentMax$ 为以当前索引 $i$ 结尾的子数组的最大和。若前面的累加和为负数，则直接丢弃并从当前元素重新开始计算；否则继续累加。时间复杂度为 $O(N)$，空间复杂度为 $O(1)$。

**标准算法实现**：
```typescript
function maxSubArray(nums: number[]): number {
  if (nums.length === 0) return 0;

  let currentMax = nums[0];
  let globalMax = nums[0];

  for (let i = 1; i < nums.length; i++) {
    // 状态转移：若当前累加小于 0，则当前元素自立门户，否则累加
    currentMax = Math.max(nums[i], currentMax + nums[i]);
    globalMax = Math.max(globalMax, currentMax);
  }

  return globalMax;
}

// 验证
const nums = [-2, 1, -3, 4, -1, 2, 1, -5, 4];
console.log(maxSubArray(nums)); // 输出: 6，对应连续子数组 [4, -1, 2, 1]
```

**面试官视角**：
- 考察点：算法时间与空间最优解推导，能够一气呵成无 Bug 编码。
</Answer>

---

### P1 高频必会题

#### 1. 最接近目标值的“三数之和”（双指针排序算法）？ {#p1-three-sum-closest}

<Answer>
**核心结论**：
求数组中三个数之和与目标值 `target` 最接近的结果（**LeetCode 16. 最接近的三数之和**）。核心解法为：**先对数组进行升序排序，固定第一个指针 $i$，然后对剩余区间使用双指针（$left$ 与 $right$）向中间双向夹逼**。时间复杂度为 $O(N^2)$，空间复杂度为 $O(1)$。

**标准代码实现**：
```typescript
function threeSumClosest(nums: number[], target: number): number {
  nums.sort((a, b) => a - b);
  let closestSum = nums[0] + nums[1] + nums[2];

  for (let i = 0; i < nums.length - 2; i++) {
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      const currentSum = nums[i] + nums[left] + nums[right];

      // 若当前和与 target 的距离更小，更新最接近和
      if (Math.abs(currentSum - target) < Math.abs(closestSum - target)) {
        closestSum = currentSum;
      }

      if (currentSum === target) {
        return target; // 距离为 0，绝对最优解
      } else if (currentSum < target) {
        left++;
      } else {
        right--;
      }
    }
  }

  return closestSum;
}
```

**面试官视角**：
- 考察双指针相向移动的数学单调性原理与排序后去重/剪枝思维。
</Answer>

#### 2. 字符串模式匹配：判断主串中是否存在子串的某种全排列（滑动窗口）？ {#p1-permutation-in-string}

<Answer>
**核心结论**：
判断 $s_2$ 中是否包含 $s_1$ 的排列（**LeetCode 567. 字符串的排列**）。因为排列只关心字符种类与数量，不关心顺序，所以本质是**固定长度的滑动窗口 + 字符频次哈希统计**。窗口长度固定为 $s_1.length$，在主串中向右滑动，实时增减移入和移出字符的频次，时间复杂度严格为 $O(|s_1| + |s_2|)$。

**标准代码实现**：
```typescript
function checkInclusion(s1: string, s2: string): boolean {
  const n1 = s1.length;
  const n2 = s2.length;
  if (n1 > n2) return false;

  const cnt1 = new Array(26).fill(0);
  const cnt2 = new Array(26).fill(0);
  const aCode = 'a'.charCodeAt(0);

  // 初始化统计 s1 与 s2 前 n1 个字符频次
  for (let i = 0; i < n1; i++) {
    cnt1[s1.charCodeAt(i) - aCode]++;
    cnt2[s2.charCodeAt(i) - aCode]++;
  }

  const isMatch = () => cnt1.every((val, idx) => val === cnt2[idx]);
  if (isMatch()) return true;

  // 滑动窗口
  for (let i = n1; i < n2; i++) {
    cnt2[s2.charCodeAt(i) - aCode]++;      // 右侧移入新字符
    cnt2[s2.charCodeAt(i - n1) - aCode]--; // 左侧滑出旧字符

    if (isMatch()) return true;
  }

  return false;
}
```

**面试官视角**：
- 考察点：固定窗口滑动的边界维护与时间复杂度极限优化。
</Answer>

---

## 真实面经问题精选

### 一面
1. 自我介绍与过往核心项目技术亮点。
2. IMSDK 长连接设计与核心职责。
3. 表单复杂联动与动态规则校验引擎设计。
4. 如何从 0 到 1 做一个中大型前端架构设计与技术落地。
5. 最接近目标的三数之和算法手撕。
6. 单链表原地反转（迭代与递归手写）。

### 二面
1. 履历背景与真实项目技术深挖。
2. 字符串编码解码总数（LeetCode 91 动态规划）。
3. 字符串模式排列匹配（LeetCode 567 滑动窗口）。
4. 最大连续子数组和（Kadane 算法）。

---

## 考察重点速览

1. **复杂交互与表单引擎**：DAG 有向无环图依赖建模、状态联动与级联校验。
2. **硬核算法与编程基本功**：动态规划（解码方式/最大子数组）、滑动窗口、双指针夹逼。
3. **车载生态与图形渲染**：车载屏幕适配、Three.js / WebGL 车辆数字孪生与 60FPS 流畅度保障。

---

## 备考建议

1. **刷透 LeetCode 经典 Medium 题**：熟练掌握双指针、滑动窗口与一维/二维动态规划，保证代码一遍跑通。
2. **准备表单联动设计方案**：能白板画出“数据源 -> 依赖图谱解析 -> 拓扑更新队列 -> 视图驱动”的完整架构图。
3. **了解智能座舱生态**：关注大屏交互、车载硬件传感器通信与 WebGL 轻量化渲染技巧。

