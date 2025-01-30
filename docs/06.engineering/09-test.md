# 测试

## TDD、BDD、DDD 分别指？{#p2-tdda}

TDD、BDD 和 DDD 这三个缩写在软件开发中分别代表以下概念：

1. **TDD（Test-Driven Development） - 测试驱动开发：**
 TDD 是一种软件开发过程，其中开发人员首先编写一个小测试用例，然后编写足够的代码来使这个测试通过，最后重构新代码以满足所需的设计标准。这个过程就是一个循环，被成为“红-绿-重构”循环，其中测试先失败（红色），编写代码使其通过（绿色），然后优化代码（重构）。TDD 的焦点在于编写干净的代码和降低未来的缺陷。

1. **BDD（Behavior-Driven Development） - 行为驱动开发：**
 BDD 将 TDD 的基本思想和原则扩展到软件的整个开发生命周期，但其着重点在于软件的行为——即软件应如何表现，而不仅仅是它应该完成什么功能。BDD 强调的是与利益相关者的交流与协作，通过使用通俗易懂的语言来写测试，让非技术人员也能理解测试内容。BDD 鼓励团队成员之间更好地沟通，确保所有人都对软件应有的行为有共同的理解。

1. **DDD（Domain-Driven Design） - 领域驱动设计：**
 DDD 与 TDD 和 BDD 并不是同一类型的概念。DDD 是一种软件设计哲学，强调了在软件项目的设计与开发中应以业务领域（Domain）为中心。它主张将业务领域的专业知识嵌入到软件的设计中，从而使软件能更好地解决业务问题。DDD 通常涉及到丰富的领域模型以及分层的架构设计，以确保业务逻辑清晰和维护性高。

这三个概念在软件开发中都扮演着重要的角色。TDD 和 BDD 都与确保软件质量和满足用户需求有关，而 DDD 则是一种更宏观层面上对软件设计的方法论。

## 测试金字塔 {#p1-test-pyramid}

**关键词**：测试手段

在前端应用中，有以下几种主要的代码测试手段：

**一、单元测试**

1. 定义：

* 针对应用程序中的最小可测试单元（如函数、方法或类）进行的测试。
* 目的是确保每个独立的单元在各种输入情况下都能正确执行其预期的功能。

2. 常用工具：

* Jest：一个功能强大且流行的 JavaScript 测试框架，提供了丰富的断言库、模拟函数等功能。
* Mocha：另一个广泛使用的测试框架，可以与各种断言库和测试运行器配合使用。
* Jasmine：以简洁的语法和易于使用而著称，适合小型项目和快速测试。

3. 测试示例：

 ```javascript
 function add (a, b) {
   return a + b
 }

 // eslint-disable-next-line
 test('add function should add two numbers correctly', function () {
   expect(add(2, 3)).toBe(5)
   expect(add(-1, 1)).toBe(0)
 })
 ```

**二、集成测试**

1. 定义：

* 测试多个组件或模块之间的交互和集成。
* 验证不同部分的代码在组合在一起时是否能正常工作。

2. 实现方式：

* 可以使用与单元测试类似的工具，但需要设置更复杂的测试环境来模拟多个组件的交互。
* 例如，在前端应用中，可以使用测试框架来加载模拟的组件和数据，然后测试它们之间的通信和功能。

3. 示例：

* 假设一个前端应用有一个表单组件和一个提交按钮，集成测试可以验证当用户填写表单并点击提交按钮时，数据是否正确地发送到后端服务器。

**三、端到端测试**

1. 定义：

* 模拟用户与整个应用程序的交互，从用户界面开始，经过各个系统组件和层，一直到后端服务。
* 确保整个应用在真实环境下的功能和性能符合预期。

2. 常用工具：

* Cypress：一个专门用于端到端测试的工具，提供了直观的 API 和强大的功能，如自动等待、截图、视频录制等。
* Puppeteer：由 Google 开发的无头浏览器自动化工具，可以用于编写端到端测试脚本。

3. 测试示例：

* 使用 Cypress 测试一个电子商务网站的购物流程：

 ```javascript
 describe('E-commerce Shopping Flow', function () {
   it('should add an item to the cart and complete the purchase', function () {
     cy.visit('https://your-ecommerce-site.com')
     cy.get('.product-item').first().click()
     cy.get('.add-to-cart-button').click()
     cy.get('.cart-icon').click()
     cy.get('.checkout-button').click()
     // 继续模拟填写表单和完成购买的步骤
   })
 })
 ```

**四、组件测试**

1. 定义：

* 专门针对前端应用中的组件进行测试。
* 验证组件的渲染、交互和状态管理等功能。

2. 常用工具：

* React Testing Library：如果使用 React 开发，这个工具提供了一种以用户为中心的方式来测试 React 组件。
* Vue Test Utils：对于 Vue.js 应用，用于测试 Vue 组件的工具。

3. 测试示例：

* 使用 React Testing Library 测试一个 React 组件：

 ```javascript
 import React from 'react'
 import { render, fireEvent } from '@testing-library/react'
 import YourComponent from './YourComponent'
 
 // eslint-disable-next-line
 test('YourComponent should render correctly and handle button click', function () {
   const { getByText, getByRole } = render(<YourComponent />)
   expect(getByText('Component Title')).toBeInTheDocument()
   const button = getByRole('button')
   fireEvent.click(button)
   expect(getByText('Button Clicked')).toBeInTheDocument()
 })
 ```

**五、静态代码分析**

1. 定义：

* 不执行代码，而是对代码进行静态分析，检查代码的质量、风格和潜在的错误。
* 可以帮助开发者在早期发现代码中的问题，提高代码的可读性和可维护性。

2. 常用工具：

* ESLint：用于检查 JavaScript 和 TypeScript 代码的语法错误、风格问题和潜在的错误。
* Stylelint：专门用于检查 CSS 和 SCSS 代码的风格问题。
* Prettier：一个代码格式化工具，可以确保代码的风格一致，并且可以与 ESLint 和 Stylelint 集成。

3. 示例配置：

* 在项目中配置 ESLint，可以创建一个`.eslintrc.js`文件，定义规则和插件：

 ```javascript
 module.exports = {
   extends: ['eslint:recommended', 'plugin:react/recommended'],
   rules: {
     'no-console': 'warn',
     quotes: ['error', 'single']
   }
 }
 ```

通过综合运用这些测试手段，可以有效地提高前端应用的质量和稳定性，减少错误和缺陷的出现。

## 代码测试的工具及方法?

## 单元测试和功能或集成测试的区别?

单元测试（Unit Testing）和端到端测试（End-to-End Testing，E2E Testing）有以下主要区别：

**一、测试范围**

1. 单元测试：

* 聚焦于软件系统的最小可测试单元，通常是函数、方法或类。
* 只测试单个功能单元的行为，隔离其他部分的影响。
* 例如，测试一个特定的数学函数是否正确计算结果，或者一个类的某个方法是否按照预期执行特定任务。

2. 端到端测试：

* 模拟用户与整个应用程序的交互，从用户界面开始，经过各个系统组件和层，一直到后端服务。
* 涵盖整个软件系统的多个模块、组件和服务的集成。
* 例如，测试一个完整的用户注册流程，包括在用户界面输入信息、提交表单、后端验证、数据库存储以及最终的反馈显示。

**二、测试目的**

1. 单元测试：

* 主要目的是确保各个独立的功能单元正确工作，尽早发现代码中的错误。
* 帮助开发者在开发过程中快速定位和修复问题，提高代码质量和可维护性。

2. 端到端测试：

* 验证整个系统在真实环境下的功能和性能是否符合预期。
* 确保不同组件之间的集成没有问题，以及系统能够满足用户的实际需求。

**三、依赖关系**

1. 单元测试：

* 通常可以独立运行，不依赖于外部系统或复杂的环境设置。
* 可以使用模拟对象（mocks）和桩对象（stubs）来模拟外部依赖，以便专注于测试目标单元的功能。

2. 端到端测试：

* 依赖于完整的系统部署和运行环境，包括数据库、服务器、网络等。
* 需要确保所有相关的组件和服务都正常运行，以进行有效的测试。

**四、测试速度**

1. 单元测试：

* 通常执行速度很快，因为只测试小范围的代码，并且可以使用轻量级的测试框架和工具。
* 开发者可以频繁运行单元测试，以便在开发过程中及时发现问题。

2. 端到端测试：

* 由于涉及到整个系统的模拟和运行，执行速度相对较慢。
* 可能需要较长的时间来准备测试环境和执行测试用例。

**五、维护成本**

1. 单元测试：

* 相对容易维护，因为当代码发生变化时，只需要更新相关的单元测试。
* 由于测试范围小，定位和修复问题也比较容易。

2. 端到端测试：

* 维护成本较高，因为系统的任何变化都可能影响到端到端测试的结果。
* 需要不断更新测试用例以适应系统的变化，并且可能需要处理复杂的环境配置和依赖关系问题。

## 如何针对 react hooks 写单测 {#p3-hook-test}

如果你想对一个独立的 React Hook 函数进行单元测试，不涉及对它在组件中使用的测试，那么你可以使用由`react-hooks-testing-library`提供的工具来完成。这个库允许你在一个隔离的环境中渲染和测试 hook 函数，而不必担心组件的其他部分。

首先，你需要安装`@testing-library/react-hooks`：

```sh
npm install --save-dev @testing-library/react-hooks
```

或者使用 yarn：

```sh
yarn add --dev @testing-library/react-hooks
```

然后，让我们以一个简单的`useCounter` Hook 为例，来看怎么进行单元测试。以下是这个 Hook 的代码：

```javascript
import { useState, useCallback } from 'react'

function useCounter (initialValue = 0) {
  const [count, setCount] = useState(initialValue)
  const increment = useCallback(() => setCount((c) => c + 1), [])
  const decrement = useCallback(() => setCount((c) => c - 1), [])

  return { count, increment, decrement }
}

export default useCounter
```

接下来是对应的单元测试：

```javascript
import { renderHook, act } from '@testing-library/react-hooks'
import useCounter from './useCounter'

describe('useCounter', function () {
  it('should use counter', function () {
    const { result } = renderHook(() => useCounter())

    expect(result.current.count).toBe(0)
  })

  it('should increment counter', function () {
    const { result } = renderHook(() => useCounter())

    act(() => {
      result.current.increment()
    })

    expect(result.current.count).toBe(1)
  })

  it('should decrement counter', function () {
    const { result } = renderHook(() => useCounter(10))

    act(() => {
      result.current.decrement()
    })

    expect(result.current.count).toBe(9)
  })
})
```

这里我们使用了`renderHook`函数来渲染我们的 hook 并返回一个对象，这个对象中包含当前 hook 返回的所有值。我们还使用了`act`函数来包裹我们对 hook 中函数的调用。这是因为 React 需要确保在测试过程中状态更新能够正常同步。

需要注意的是，如果你的 hook 依赖于其他 React 的 Context，你可以使用`renderHook`的第二个参数来传入一个 wrapper，该 wrapper 是一个 React 组件，它将包裹你的 hook。

上面的这个测试覆盖了 hook 在默认值和指定初始值时的行为，以及它暴露的`increment`和`decrement`函数是否正常工作。这种方式可以用来测试任何自定义 hook，并且只关注 hook 本身的逻辑，不涉及到任何组件。

## 代码覆盖率一般有什么手段？ {#p2-test-coverrage}

前端代码的测试覆盖率通常是指衡量在测试过程中有多少代码被执行了的一个指标。测试覆盖率有助于了解测试的全面性，以下是测试前端代码覆盖率常用的手段：

1. **单元测试**：

* 使用测试框架（例如 Jest, Mocha, Jasmine 等）编写单元测试。
* 利用测试框架或插件生成覆盖率报告（例如 Istanbul/nyc 工具可以与这些框架集成以生成覆盖率数据）。

2. **集成测试**：

* 使用测试工具（比如 Cypress, Selenium 等）编写集成测试来模拟用户操作。
* 通常这些工具也支持收集代码覆盖率信息。
*

3. **手动测试与覆盖率工具结合**：

* 在手动测试过程中，可以开启浏览器的覆盖率工具（如 Chrome DevTools 中的 Coverage Tab）记录覆盖率。
* 可以通过浏览器扩展程序或者自动化脚本来启动这些工具。

4. **测试覆盖率服务**：

* 使用像 Codecov 或 Coveralls 这样的服务，在 CI/CD 流程中集成覆盖率测试和报告。
