# 架构

## 模版引擎实现原理 {#p0-template-engines}

前端模板引擎实现原理

前端模板引擎是一种用于处理 HTML 字符串的工具，它允许开发人员在 HTML 中嵌入特殊语法，然后使用模板引擎把数据与这些语法结合，生成最终的 HTML 字符串。这种方式有助于实现数据与表示的分离，使得代码更易于维护。

前端模板引擎的实现原理通常包括以下几个步骤：

1. **编译模板**：将模板字符串解析成模板语法（如变量、循环、条件等）和普通文本。这个过程通常涉及到词法分析和语法分析两个阶段。词法分析将模板字符串切分成多个标记（Token），再通过语法分析将这些标记组织成抽象语法树（AST）。

2. **生成代码**：将抽象语法树转换成 JavaScript 代码。这个过程通常包括将语法节点（AST Nodes）转换成相应的 JavaScript 语句，以渲染数据的形式。

3. **执行代码**：对生成的 JavaScript 代码进行求值，通过传入模板数据，渲染最终的 HTML 字符串。

下面是一个简单的模板引擎实现示例：

```js
function simpleTemplateEngine (template, data) {
  const variableRegex = /{{\s*([\w]+)\s*}}/g // 匹配变量插值

  let match
  let lastIndex = 0
  let result = ''

  while ((match = variableRegex.exec(template)) !== null) {
    result += template.slice(lastIndex, match.index) // 添加文本
    result += data[match[1]] // 添加变量值
    lastIndex = match.index + match[0].length
  }

  result += template.slice(lastIndex) // 添加尾部文本
  return result
}

// 使用示例
const template = 'Hello, {{name}}! Today is {{day}}.'
const data = {
  name: 'John',
  day: 'Monday'
}

console.log(simpleTemplateEngine(template, data)) // 输出：Hello, John! Today is Monday.
```

这个简化的示例仅支持变量插值，完整的模板引擎需要考虑循环、条件、自定义函数等更复杂的语法和性能优化。在实际项目中，可以选择成熟的模板引擎库，例如 Handlebars、Mustache 或者 Lodash 的 `template` 函数。

 如何在模板引擎中实现条件判断

要在模板引擎中实现条件判断，你需要扩展模板引擎的语法支持和解析能力。以 Handlebars 为例，其中的 `if` 和 `else` 助手语法可以实现条件判断。首先，我们需要修改匹配变量的正则表达式以识别条件判断语句。接着，在解析过程中，根据条件判断结果添加相应的内容。

以下代码实现了一个简化的模板引擎，支持条件判断：

```js
function parseTemplate (template, data) {
  const tokenRegex = /{{\s*(\/?[\w\s]+\/?)\s*}}/g // 匹配模板语法 token
  const keywords = /^(if|\/if|else)$/
  let result = ''
  const stack = []

  let lastIndex = 0
  let match

  while ((match = tokenRegex.exec(template)) !== null) {
    const staticContent = template.substring(lastIndex, match.index)
    result += staticContent
    lastIndex = match.index + match[0].length

    const token = match[1].trim()
    const keywordMatch = token.match(keywords)

    if (!keywordMatch) { // 处理变量插值
      result += data[token]
      continue
    }

    switch (keywordMatch[0]) {
      case 'if':
        stack.push('if')
        const ifCondition = data[token.split(' ')[1]]
        if (ifCondition) {
          tokenRegex.lastIndex += processSubTemplate(stack, tokenRegex, template, data)
        }
        break
      case 'else':
        stack.push('else')
        tokenRegex.lastIndex += processSubTemplate(stack, tokenRegex, template, data)
        break
      case '/if':
        stack.pop()
        break
    }
  }

  result += template.substring(lastIndex)
  return result
}

function processSubTemplate (stack, tokenRegex, template, data) {
  let subTemplate = ''
  let cursor = tokenRegex.lastIndex

  while (stack.length && cursor < template.length) {
    cursor++
    const char = template[cursor]
    subTemplate += char

    if (char === '}' && template[cursor - 1] === '}') {
      const lastTwo = template.substring(cursor - 2, cursor)
      if (lastTwo === '{{') {
        const match = subTemplate.match(/{{\s*(\/?[\w\s]+\/?)\s*}}/)
        if (match) {
          const token = match[1].trim()
          const keywordMatch = token.match(/^(if|\/if|else)$/)
          if (keywordMatch) {
            if (keywordMatch[0] === stack[stack.length - 1]) {
              stack.pop()
            } else {
              stack.push(keywordMatch[0])
            }
          }
        }
      }
    }
  }

  if (stack[stack.length - 1] === 'else') {
    stack.pop()
  }

  return subTemplate.length
}

// 使用示例
const template = `
 {{name}},
 {{if isMember}}
 Welcome back, {{name}}!
 {{else}}
 Please join us!
 {{/if}}
`

const data = {
  name: 'John',
  isMember: true
}

console.log(parseTemplate(template, data).trim())
```

这个简化示例说明了如何在模板中实现条件判断。不过请注意，这个实现并没有经过优化，性能可能不佳。在实际项目中，推荐使用成熟的模板引擎库，如 Handlebars、Mustache 等。

## 什么是领域模型 {#p1-ddd}

 什么是领域模型

领域模型是软件开发中用于描述领域（业务）概念和规则的一种建模技术。它通过定义实体、值对象、关联关系、行为等元素，抽象出领域的核心概念和业务规则，帮助开发人员理解和设计软件系统。

以下是领域模型中常见的一些元素：

1. 实体（Entity）：实体是领域模型中具有唯一标识的对象，通常代表领域中的具体事物或业务对象。实体具有属性和行为，并且可以通过其标识进行唯一标识和识别。

2. 值对象（Value Object）：值对象是没有唯一标识的对象，通常用于表示没有明确生命周期的属性集合。值对象的相等性通常基于其属性值，而不是标识。例如，日期、时间、货币等都可以作为值对象。

3. 关联关系（Association）：关联关系描述了不同实体之间的关系和连接。关联关系可以是一对一、一对多、多对多等不同类型。关联关系可以带有方向和导航属性，用于表示实体之间的关联和导航。

4. 聚合（Aggregation）：聚合是一种特殊的关联关系，表示包含关系，即一个实体包含其他实体。聚合关系是一种强关联，被包含实体的生命周期受到包含实体的控制。

5. 领域事件（Domain Event）：领域事件表示领域中发生的具体事件或状态变化。它可以作为触发业务逻辑的信号，通常用于解耦和处理领域中的复杂业务流程。

6. 聚合根（Aggregate Root）：聚合根是聚合中的根实体，它代表整个聚合的一致性边界。通过聚合根，可以对整个聚合进行操作和维护。

7. 领域服务（Domain Service）：领域服务是一种封装了领域逻辑的服务，用于处理领域中的复杂业务操作或跨实体的操作。它通常与具体实体无关，提供一些无状态的操作。

通过建立领域模型，开发人员可以更好地理解和表达领域的业务需求和规则，从而指导软件系统的设计和实现。领域模型可以作为开发团队之间沟通的工具，也可以用于生成代码、进行自动化测试等。

 前端系统应该如何划分领域模型

在前端系统中划分领域模型的方式可以根据具体业务需求和系统复杂性进行灵活调整。以下是一些常见的划分领域模型的方式：

1. 模块划分：将前端系统按照模块进行划分，每个模块对应一个领域模型。模块可以根据功能、业务领域或者页面进行划分。每个模块可以有自己的实体、值对象、关联关系和业务逻辑。

2. 页面划分：将前端系统按照页面进行划分，每个页面对应一个领域模型。每个页面可以有自己的实体、值对象和关联关系，以及与页面相关的业务逻辑。

3. 组件划分：将前端系统按照组件进行划分，每个组件对应一个领域模型。每个组件可以有自己的实体、值对象和关联关系，以及与组件相关的业务逻辑。组件可以是页面级别的，也可以是更细粒度的功能组件。

4. 功能划分：将前端系统按照功能进行划分，每个功能对应一个领域模型。功能可以是用户操作的具体功能模块，例如登录、注册、购物车等。每个功能可以有自己的实体、值对象和关联关系，以及与功能相关的业务逻辑。

在划分领域模型时，需要根据具体业务的复杂性和团队的组织方式进行调整。重要的是识别系统中的核心业务概念和规则，并将其抽象成适当的实体和值对象。同时，要保持领域模型的聚合性和一致性，避免出现过于庞大和紧耦合的领域模型。划分的领域模型应该易于理解、扩展和维护，以支持前端系统的开发和演进。

## 前端基建设计到哪些方面 {#p0-base-desing}

前端基建是指在前端开发过程中，为提高开发效率、代码质量和团队协作而构建的一些基础设施和工具。下面是前端基建可以做的一些事情：

1. `脚手架工具`

开发和维护一个通用的脚手架工具，可以帮助团队快速初始化项目结构、配置构建工具、集成常用的开发依赖等。

2. `组件库`

开发和维护一个内部的组件库，包含常用的UI组件、业务组件等，提供给团队成员复用，减少重复开发的工作量。

3. `构建工具和打包工具`

搭建和维护一套完善的构建和打包工具链，包括使用Webpack、Parcel等工具进行代码的压缩、合并、打包等工具，优化前端资源加载和性能。

4. `自动化测试工具`

引入自动化测试工具，如Jest、Mocha等，编写和维护测试用例，进行单元测试、集成测试、UI测试等，提高代码质量和可靠性。

5. `文档工具`

使用工具如JSDoc、Swagger等，生成项目的API文档、接口文档等，方便团队成员查阅和维护。

6. `Git工作流`

制定和规范团队的Git工作流程，使用版本控制工具管理代码，方便团队协作和代码回退。

7. `性能监控和优化`

引入性能监控工具，如Lighthouse、Web Vitals等，对项目进行性能分析，优化网页加载速度、响应时间等。

8. `工程化规范`

制定并推广团队的代码规范、目录结构规范等，提高代码的可读性、可维护性和可扩展性。

9. `持续集成和部署`

搭建持续集成和部署系统，如Jenkins、Travis CI等，实现代码的自动构建、测试和部署，提高开发效率和代码质量。

10. `项目文档和知识库`

建立一个内部的项目文档和知识库，记录项目的技术细节、开发经验、常见问题等，方便团队成员查阅和学习。

11. `代码质量工具`

引入代码质量工具，如ESLint、Prettier等，对代码进行静态分析和格式化，提高代码的一致性和可读性。

12. `国际化支持`

为项目添加国际化支持，可以通过引入国际化库，如i18next、vue-i18n等，实现多语言的切换和管理。

13. `错误监控和日志收集`

引入错误监控工具，如Sentry、Bugsnag等，实时监控前端错误，并收集错误日志，方便进行问题排查和修复。

14. `前端性能优化工具`

使用工具如WebPageTest、Chrome DevTools等，对项目进行性能分析和优化，提高页面加载速度、响应时间等。

15. `缓存管理`

考虑合理利用浏览器缓存和服务端缓存，减少网络请求，提升用户访问速度和体验。

16. `移动端适配`

针对移动端设备，采用响应式设计或使用CSS媒体查询等技术，实现移动端适配，保证页面在不同尺寸的设备上有良好的显示效果。

17. `安全防护`

对项目进行安全审计，使用安全防护工具，如CSP（Content Security Policy）、XSS过滤等，保护网站免受常见的安全攻击。

18. `性能优化指标监控`

监控和分析关键的性能指标，如页面加载时间、首次渲染时间、交互响应时间等，以便及时发现和解决性能问题。

19. `前端日志分析`

使用日志分析工具，如ELK（Elasticsearch、Logstash、Kibana）等，对前端日志进行收集和分析，了解用户行为和页面异常情况。

20. `跨平台开发`

考虑使用跨平台开发框架，如React Native、Flutter等，实现一套代码在多个平台上复用，提高开发效率。

21. `编辑器配置和插件`

为团队提供统一的编辑器配置文件，包括代码格式化、语法高亮、代码自动补全等，并推荐常用的编辑器插件，提高开发效率。

22. `文档生成工具`

使用工具如Docusaurus、VuePress等，为项目生成漂亮的文档网站，方便团队成员查阅和维护项目文档。

23. `Mock数据和接口管理`

搭建一个Mock服务器，用于模拟后端接口数据，方便前端开发和测试，同时可以考虑使用接口管理工具，如Swagger等，方便接口的定义和调试。

24. `前端监控和统计`

引入前端监控工具，如Google Analytics、百度统计等，收集用户访问数据和行为信息，用于分析和优化用户体验。

25. `移动端调试工具`

使用工具如Eruda、VConsole等，帮助在移动端设备上进行调试和错误排查，提高开发效率。

26. `自动化部署`

配置自动化部署流程，将项目的代码自动部署到服务器或云平台，减少人工操作，提高发布效率和稳定性。

27. `前端团队协作工具`

使用团队协作工具，如GitLab、Bitbucket等，提供代码托管、项目管理、任务分配和团队沟通等功能，增强团队协作效率。

28. `前端培训和知识分享`

组织定期的前端培训和技术分享会，让团队成员相互学习和交流，推动技术的共享和提升。

29. `客户端性能优化`

针对移动端应用，可以使用工具如React Native Performance、Weex等，进行客户端性能优化，提高应用的响应速度和流畅度。

30. `技术选型和评估`

定期评估和研究前端技术的发展趋势，选择适用的技术栈和框架，以保持项目的竞争力和可持续发展。

31. `统一的状态管理`

引入状态管理工具，如Redux、Vuex等，帮助团队管理前端应用的状态，提高代码的可维护性和可扩展性。

32. `前端日志记录`

引入前端日志记录工具，如log4javascript、logrocket等，记录前端应用的运行日志，方便排查和解决问题。

33. `前端代码扫描`

使用静态代码扫描工具，如SonarQube、CodeClimate等，对前端代码进行扫描和分析，发现潜在的问题和漏洞。

34. `前端数据可视化`

使用数据可视化工具，如ECharts、Chart.js等，将数据以图表或图形的形式展示，增强数据的可理解性和可视化效果。

35. `前端容灾和故障处理`

制定容灾方案和故障处理流程，对前端应用进行监控和预警，及时处理和恢复故障，提高系统的可靠性和稳定性。

36. `前端安全加固`

对前端应用进行安全加固，如防止XSS攻击、CSRF攻击、数据加密等，保护用户数据的安全性和隐私。

37. `前端版本管理`

建立前端代码的版本管理机制，使用工具如Git、SVN等，管理和追踪代码的变更，方便团队成员之间的协作和版本控制。

38. `前端数据缓存`

考虑使用Local Storage、Session Storage等技术，对一些频繁使用的数据进行缓存，提高应用的性能和用户体验。

39. `前端代码分割`

使用代码分割技术，如Webpack的动态导入（Dynamic Import），将代码按需加载，减少初始加载的资源大小，提高页面加载速度。

40. `前端性能监测工具`

使用性能监测工具，如WebPageTest、GTmetrix等，监测前端应用的性能指标，如页面加载时间、资源加载时间等，进行性能优化。

**参考文档**

* [前端基建原来可以做这么多事情](https://juejin.cn/post/7256879435339628604)

## 如何理解前端架构？{#p0-architecture}

前端架构是指在开发前端应用程序时，为了提高开发效率、代码可维护性和可扩展性，将前端代码组织和设计的一种架构体系。它涵盖了前端项目的整体结构、代码组织方式、技术选型、模块化开发、数据管理、状态管理、网络请求、路由管理等方面的规划和设计。

前端架构的目标是使前端开发更加规范、高效和可持续。良好的前端架构可以帮助团队成员更好地协作、降低维护成本、提高开发效率、减少代码冗余和bug等。

以下是一些常见的前端架构概念和思想：

1. 分层架构：将前端应用程序划分为不同的层次，如视图层、业务逻辑层、数据层等，以实现各个层次的解耦和职责清晰。

2. 组件化开发：将界面拆分为独立的可复用组件，通过组合不同的组件来构建页面，提高代码的可维护性和可复用性。

3. 模块化开发：将代码按照功能或业务模块进行拆分，每个模块都有独立的职责和功能，便于团队协作和代码维护。

4. 数据管理和状态管理：使用状态管理库（如Redux、Vuex）来管理应用程序的状态和数据流，使得数据的变化和传递更加可控和可预测。

5. 路由管理：使用路由库（如React Router、Vue Router）来管理前端路由，实现页面之间的跳转和导航。

6. 统一风格和规范：制定和遵循统一的编码规范、命名规范、目录结构等，以便于不同开发者之间的协作和代码的统一性。

7. 自动化构建和部署：使用构建工具（如Webpack、Rollup）和自动化部署工具（如Jenkins、Travis CI）来提高开发效率和代码交付速度。

8. 性能优化和项目优化：通过代码分割、懒加载、缓存、CDN 加速、前端性能监控等手段，提升应用程序的性能和用户体验。

前端架构是一种组织和规划前端代码的方法论，旨在提高前端开发的效率和质量，同时也要根据具体项目的需求和规模来选择和适配合适的架构方案。

## 前端架构和前端工程化有什么区别？ {#p0-architecture-engineer-diff}

* [如何理解前端架构？](https://github.com/pro-collection/interview-question/issues/545)
* [如何理解前端工程化？](https://github.com/pro-collection/interview-question/issues/546)

**区别**

前端架构和前端工程化是两个不同的概念，但它们之间有一些相互关联的特点。

前端架构是指在前端开发中，对整个前端应用程序的组织结构、模块划分、框架选择等方面的设计和规划。前端架构的目标是为了提高代码的可维护性、可扩展性和可重用性，以及优化前端应用程序的性能和用户体验。常见的前端架构包括MVC（Model-View-Controller）、MVVM（Model-View-ViewModel）等。

前端工程化是指使用各种工具、技术和流程对前端开发过程进行管理和优化，以提高开发效率、代码质量和团队协作能力。前端工程化的目标是通过规范化和自动化的方式，解决前端开发中的重复劳动、低效率、代码质量不稳定等问题。前端工程化包括代码管理、代码规范、模块化开发、构建工具、自动化测试、持续集成和部署、性能优化、文档和知识管理等方面。

虽然前端架构和前端工程化是两个不同的概念，但它们之间存在一些相似的目标和方法。前端架构关注的是前端应用程序的结构和设计，而前端工程化关注的是前端开发的流程和工具的使用。前端架构可以通过前端工程化的方式实现，而前端工程化可以提供支持和保障，以实现良好的前端架构。

## [微前端] 设计原则有哪些？ {#p0-micro-frontend}

《微前端设计与实现》一书中作者卢卡·梅扎利拉提出的关于微前端的实践原则。一共有七条原则， 这些原则可以帮助团队更好地设计和实施微前端架构。

* 围绕业务领域建模：将前端应用程序按照业务领域进行划分，每个微前端子应用负责一个特定的业务领域。这样可以提高团队的独立性和聚焦性，降低开发和维护的复杂性。

* 自动化文化：建立自动化的开发和部署流程，包括自动化测试、持续集成和持续部署。这样可以提高开发效率和质量，并且减少人为错误。

* 隐藏实现细节：将微前端子应用的实现细节隐藏起来，提供简单的接口供其他子应用或者外部系统调用。这样可以减少依赖和耦合，提高系统的灵活性和可扩展性。

* 分布式治理：微前端架构中的各个子应用可以由不同的团队负责开发和维护。需要建立一套分布式治理机制，包括版本控制、协作沟通和问题解决等，保证各个子应用能够有效地协同工作。

* 独立部署：每个微前端子应用都可以独立地进行开发、测试和部署，而不会影响其他子应用。这样可以提高团队的独立性和灵活性，并且减少不同团队之间的交互和依赖。

* 故障隔离：微前端架构中的一个子应用出现故障时，不会影响其他子应用的正常运行。需要建立故障隔离机制，确保故障的影响范围最小化。

* 高度可观察：需要建立合适的监控和日志系统，对微前端架构中的各个子应用进行监测和分析。这样可以提前发现问题并进行及时处理，保证系统的稳定性和可靠性。

## [微前端] 路由加载流程是如何的？{#p0-micro-router}

微前端是一种架构模式，旨在将大型前端应用程序拆分为更小、更容易维护的独立部分。微前端的路由原理可以通过以下步骤概括：

1. 主应用加载：用户访问主应用时，主应用负责加载，并决定加载哪些微前端应用。

2. 路由分发：主应用根据当前URL路径，将请求分发给相应的微前端应用。

3. 微前端应用加载：被分发的微前端应用根据接收到的请求加载自己的代码和资源。

4. 渲染内容：微前端应用接收到请求后，将自己的内容渲染到主应用的容器中。

5. 子应用间通信：如果不同微前端应用之间需要进行通信，可以使用共享的状态管理工具或事件总线。

6. 事件处理：主应用和微前端应用都可以处理路由变化事件，以便更新页面内容。

## Qiankun 是如何做 JS 隔离的 {#p1-qiankun}

Qiankun 是一个基于 Single-SPA 的微前端实现库，它提供了比较完善的 JS 隔离能力，确保微前端应用间的独立运行，避免了全局变量污染、样式冲突等问题。Qiankun 实现 JS 隔离的主要机制包括：

 1. JS 沙箱

Qiankun 使用 JS 沙箱技术为每个子应用创建一个独立的运行环境。沙箱有以下两种类型：

* **快照沙箱（Snapshot Sandbox）**：在子应用启动时，快照并记录当前全局环境的状态，然后在子应用卸载时，恢复全局环境到启动前的状态。这种方式不会对全局对象进行真正的隔离，而是通过记录和恢复的方式避免全局环境被污染。

* **Proxy 沙箱**：通过 `Proxy` 对象创建一个全新的全局对象代理，子应用的所有全局变量修改操作都将在这个代理对象上进行，从而不会影响到真实的全局对象。这种方式提供了更为彻底的隔离效果，是 Qiankun 中推荐的沙箱隔离方式。

 2. 动态执行 JS 代码

Qiankun 通过动态执行 JS 代码的方式加载子应用，避免了脚本直接在全局环境下执行可能导致的变量污染。具体来说，它可以动态获取子应用的 JS 资源，然后在沙箱环境中运行这些代码，确保代码执行的全局变量不会泄露到主应用的全局环境中。

 3. 生命周期隔离

Qiankun 给每个子应用定义了一套生命周期钩子，如 `bootstrap`、`mount`、`unmount` 等，确保在应用加载、激活和卸载的过程中正确管理和隔离资源。通过在 `unmount` 生命周期钩子中正确清理子应用创建的全局监听器、定时器等，进一步保证了不同子应用间的独立性和隔离性。

 4. 样式隔离

虽然主要针对 JS 隔离，Qiankun 也提供了样式隔离机制，通过动态添加和移除样式标签，保证子应用样式的独立性，避免不同子应用间的样式冲突。

通过以上机制，Qiankun 能够有效实现微前端架构中子应用的 JS 隔离，加强了应用间的独立性和安全性，使得不同子应用可以无缝集成在一起，同时又能够保持各自的运行环境独立不受影响。

在微前端架构中，JavaScript 隔离是核心之一，用以确保各个子应用间代码运行时不互相干扰、变量不冲突，以及能够安全地卸载应用。为了实现这一目标，主要采用以下几种方法：

 1. 使用沙箱技术

* **`iframe`**：最直接的隔离方式是将子应用运行在`iframe`中。这种方式提供了良好的隔离性，因为`iframe`内部有自己独立的执行环境，包括 JavaScript 运行环境和 DOM 环境。但`iframe`的使用可能会导致性能问题，且父子通信复杂。
* **JavaScript Sandboxing**：通过创建一个独立的 JavaScript 执行环境，比如使用 Web Workers，或者更高级的沙箱库（如 Google 的 Caja），以在主页环境隔离执行 JavaScript 代码。

 2. 命名空间和模块化

* **命名空间**：通过命名空间（Namespace）封装每个子应用的代码，确保全局变量和函数不会与其他应用冲突。
* **模块化**：利用 ES Modules 或 CommonJS 等模块化标准，使代码封装在模块中运行，通过 import/export 管理依赖，减少全局变量的使用，从而实现隔离。

 3. 状态管理隔离

* 虽然主要关注 JavaScript 代码的隔离，但在单页应用中，子应用间状态管理（如使用 Redux、Vuex 等状态管理库）也可能导致隔离问题。可以为每个子应用创建独立的状态树，只通过明确定义的接口来共享必要的状态信息。

 4. 使用微前端框架或库

* **模块联邦（Module Federation）**：Webpack 的模块联邦功能允许不同的前端应用共享 JavaScript 模块，同时保持应用间的隔离。它可以动态地加载另一个应用导出的模块，而不需要将它们打包进单个文件里。
* **专门的微前端框架**：如 Single-SPA、Qiankun 等，这些框架提供了一套完整的解决方案，用于管理微前端应用的加载、卸载以及相互隔离，部分内部采用了类似沙箱的技术实现隔离。

 5. 服务端渲染（SSR）隔离

* 通过服务端渲染各个微前端应用，再将渲染好的静态 HTML 集成到主应用中。这样，每个子应用的 JavaScript 在客户端激活（Hydration）之前是隔离的。SSR 可以减少初次加载时间，同时具备部分隔离性，尤其是在初次加载阶段。

实施 JavaScript 隔离时，需要根据具体项目需求、技术栈和团队的熟练度来选取合适的隔离策略，以确保子应用之间的高度独立性和可维护性。

## 为何通常在 微前端 应用隔离， 不选择 iframe 方案 {#micro-frontend}

在微前端架构中，虽然`iframe`能提供很好的应用隔离（包括 JavaScript 和 CSS 隔离），确保微前端应用之间不会相互干扰，但一般不把它作为首选方案，原因包括：

 1. 性能开销

`iframe`会创建一个全新的浏览器上下文环境，每个`iframe`都有自己的文档对象模型（DOM）树、全局执行环境等。如果一个页面中嵌入了多个`iframe`，就会导致额外的内存和 CPU 资源消耗，特别是在性能有限的设备上更为显著。

 2. 应用集成和交互问题

`iframe`自然隔离了父子页面的环境，这虽然提供了隔离，但同时也使得主应用与子应用之间的交云难度增加。虽然可以通过`postMessage`等 API 实现跨`iframe`通信，但这种方式相比于直接 JavaScript 调用来说，更为复杂，交互效率也较低。

 3. UI 体验一致性

在`iframe`中运行的应用在视觉上可能与主应用难以实现无缝集成。`iframe`内外的样式、字体等一致性需要额外的处理。此外，`iframe`可能带来额外的滚动条，影响用户体验。

 4. SEO 问题

如果微前端的某些内容是通过`iframe`呈现的，那么这部分内容对于搜索引擎是不可见的，这可能会对应用的 SEO 产生负面影响。

 5. 安全问题

虽然`iframe`可以提供一定程度的隔离，但它也可能引入点击劫持等安全风险。此外，过多地使用`iframe`也可能增加网站被恶意脚本攻击的表面。

因此，虽然`iframe`是一种可行的应用隔离方法，它的这些局限性使得开发者在选择微前端技术方案时，往往会考虑其他提供更轻量级隔离、更好集成与交互体验的方案，如使用 JavaScript 沙箱、CSS 隔离技术、Web Components 等。这些方法虽然隔离性可能不如`iframe`彻底，但在整体的应用性能、用户体验和开发效率上通常会有更好的表现。

## 为什么 SPA 应用都会提供一个 hash 路由，好处是什么？ {#p0-spa}

SPA（单页应用）通常会使用 hash 路由的方式来实现页面的导航和路由功能。这种方式将路由信息存储在 URL 的片段标识符（hash）中，例如：`www.example.com/#/home`。

以下是使用 hash 路由的 SPA 的一些好处：

1. 兼容性：Hash 路由对浏览器的兼容性非常好，可以在所有主流浏览器上运行，包括较旧的浏览器版本。这是因为 hash 路由不需要对服务端进行特殊的配置或支持。

2. 简单实现：实现 hash 路由非常简单，只需要在页面中添加一个监听器来监听 `hashchange` 事件，然后根据不同的 hash 值加载对应的页面内容。这种方式不需要对服务器进行特殊配置，服务器只需传送一个初始页面，之后的页面切换完全由前端控制。

3. 防止页面刷新：使用 hash 路由可以防止页面的完全刷新。因为 hash 路由只改变 URL 的片段标识符，不会引起整个页面的重新加载，所以用户在不同页面之间切换时，不会丢失当前页面的状态和数据。

4. 前进后退支持：由于 hash 路由不会引起页面的刷新，因此可以方便地支持浏览器的前进和后退操作。浏览器的前进和后退按钮可以触发 `hashchange` 事件，从而实现页面的导航和页面状态的管理。

5. 无需服务端配置：使用 hash 路由，不需要对服务端进行特殊的配置。所有的路由和页面切换逻辑都由前端控制，服务器只提供一个初始页面。这样可以减轻服务器的负担，并且可以将更多的逻辑放在前端处理，提升用户体验。

虽然 hash 路由有一些好处，但也有一些局限性。例如，hash 路由的 URL 不够美观，也不利于 SEO（搜索引擎优化）。为了解决这些问题，现代的 SPA 框架通常使用更先进的路由方式，例如 HTML5 的 History API，它可以在不刷新整个页面的情况下改变 URL。不过，hash 路由仍然是一个简单可靠的选择，特别适用于简单的 SPA 或需要兼容较旧浏览器的情况。

## 前端动画有哪些实现方式？{#p0-animation}

**JS 的实现方式**

* 通过定时器(`setTimeout`, `setInterval`)来间隔改变元素样式
* requestAnimationFrame

**CSS 3**

* 过度动画：transition
* animation 动画

**HTML 5**

* Canvas
* WebGL
* svg

 requestAnimationFrame

`window.requestAnimationFrame()` 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。 该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行。

当你准备更新动画时你应该调用此方法。这将使浏览器在下一次重绘之前调用你传入给该方法的动画函数 (即你的回调函数)。回调函数执行次数通常是**每秒 60 次**，但在大多数遵循 W3C 建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数相匹配。

回调函数会被传入 **DOMHighResTimeStamp** 参数，**DOMHighResTimeStamp**指示当前被 `requestAnimationFrame()` 排序的回调函数被触发的时间。在同一个帧中的多个回调函数，它们每一个都会接受到一个相同的时间戳，即使在计算上一个回调函数的工作负载期间已经消耗了一些时间。该时间戳是一个十进制数，单位毫秒，最小精度为 1ms(1000μs)。

**使用语法**： `window.requestAnimationFrame(callback);`

参数： 下一次重绘之前更新动画帧所调用的函数 (即上面所说的回调函数)。该回调函数会被传入 `DOMHighResTimeStamp` 参数，该参数与 `performance.now()` 的返回值相同，它表示 `requestAnimationFrame()` 开始去执行回调函数的时刻。

使用示范：

```html
<div id="demo"
 style="position: absolute;width: 100px;height: 100px;background-color: #ccc;left: 0;top: 0;">
</div>
<script>
 var demo = document.getElementById("demo");
 function reader() {
 demo.style.left = parseInt(demo.style.left) + 1 + "px";// 每一帧向右移动1px
 }
 requestAnimationFrame(function() {
 reader();

 // 当超过300px 后才停止
 if (parseInt(demo.style.left) > 1300) demo.style.left = 0;
 requestAnimationFrame(arguments.callee);
 });
</script>
```

 transition

|属性名|说明|
|---|---|
|transition|用于简写设置四个过渡属性，包括：transition-property, transition-duration, transition-timing-function 和 transition-delay|
|transition-property|规定应用过渡效果的 CSS 属性的名称，多个属性用逗号分隔，如：`transition-property: width, height;`，表示在 width 和 height 发生改变时会应用过渡效果|
|transition-duration|规定过渡效果的持续时间，如：`transition-duration: 1s;`，表示过渡效果持续时间为 1 秒|
|transition-timing-function|规定过渡效果的时间曲线，即过渡效果的速度变化。常用的值包括：`linear`, `ease`, `ease-in`, `ease-out`, `ease-in-out`, `cubic-bezier(n,n,n,n)`|
|transition-delay|规定过渡效果何时开始，如：`transition-delay: 1s;`，表示在 1 秒之后开始应用过渡效果|

可以通过设置不同的 transition 属性，来实现各种各样的过渡效果。例如：

```css
cssCopy codediv {
 width: 100px;
 height: 100px;
 background-color: red;
 transition: width 1s ease-in-out;
}

<div:hover {
 width: 200px;
}
```

上述代码表示当鼠标悬停在 div 元素上时，它的宽度会从 100px 变为 200px，过渡效果会持续 1 秒，且速度曲线为缓进缓出。

 animation

下面是 CSS3 animation 的属性表格：

|属性|描述|
|---|---|
|animation-name|规定需要绑定到选择器的 keyframe 名称。|
|animation-duration|规定动画完成一个周期所花费的秒或毫秒。|
|animation-timing-function|规定动画的速度曲线。|
|animation-delay|规定在动画开始之前的延迟。|
|animation-iteration-count|规定动画应该播放的次数。|
|animation-direction|规定是否应该轮流反向播放动画。|
|animation-fill-mode|规定当动画不播放时（当动画完成之前，或当动画被暂停时），要应用到元素的样式。|
|animation-play-state|规定动画是否正在运行或已暂停。|
|animation|是 animation 属性的一个简写属性，包含六个独立属性。|

其中，animation-name、animation-duration、animation-timing-function 是必须要指定的属性。其他属性都是可选的。通过这些属性，我们可以实现更加灵活的动画效果。

一个使用 `animation` 的例子是实现旋转动画。例如，可以创建一个带有 CSS 类名 `.rotate` 的 `div` 元素，并使用以下样式：

```css
cssCopy code.rotate {
 animation: spin 2s linear infinite;
}

@keyframes spin {
 from {
 transform: rotate(0deg);
 }
 to {
 transform: rotate(360deg);
 }
}
```

这将在 `div` 元素上应用一个旋转动画，持续时间为 2 秒，并且以线性方式无限循环。在 `@keyframes` 规则中定义了旋转动画的动画过程。在 `from` 和 `to` 关键帧中，定义了元素旋转的起始和结束状态。在 `animation` 属性中，指定了动画名称、持续时间、时间函数和动画播放次数等参数。

 Canvas 实现动画

Canvas 可以通过一帧帧的绘制来实现动画。具体来说，可以通过 `requestAnimationFrame` 方法在浏览器下一次重绘之前执行指定的回调函数来不断地更新 Canvas 上的内容，从而实现动画效果。

以下是 Canvas 实现动画的一般流程：

1. 获取 Canvas 对象和上下文对象

首先，需要获取 Canvas 对象和上下文对象。

```js
const canvas = document.getElementById('myCanvas')
const ctx = canvas.getContext('2d')
```

2. 设置动画帧数和初始状态

为了实现动画，需要对 Canvas 进行重绘。重绘的次数由动画的帧数决定，通常设置为每秒 60 帧。

同时，还需要设置 Canvas 的初始状态，包括背景颜色、形状、大小等。

3. 定义动画函数

动画函数中主要包含两个部分：更新状态和绘制图形。更新状态指更新 Canvas 上的图形的位置、大小、颜色等属性，绘制图形指将更新后的图形绘制到 Canvas 上。

```js
function animate () {
  // 更新状态
  // ...

  // 绘制图形
  // ...
}
```

4. 使用 requestAnimationFrame 方法执行动画

最后，可以使用 `requestAnimationFrame` 方法不断执行动画函数，从而实现动画效果。

```js
function animate () {
  // 更新状态
  // ...

  // 绘制图形
  // ...

  // 递归调用 requestAnimationFrame 方法执行动画
  requestAnimationFrame(animate)
}

// 启动动画
requestAnimationFrame(animate)
```

在动画函数中更新状态和绘制图形后，调用 `requestAnimationFrame` 方法递归执行动画函数，从而实现不断更新和绘制的动画效果。

 svg 实现动画

SVG（可缩放矢量图形）是一种使用 XML 描述 2D 图形的格式，它可以使用 CSS 和 JavaScript 进行动画操作。在 SVG 中，可以使用两种技术实现动画，分别是 SMIL（Synchronized Multimedia Integration Language）和 JavaScript。

下面举一个使用 JavaScript 实现 SVG 动画的例子。假设有一个圆形，当鼠标悬停在圆形上时，圆形会变为红色并且向右移动：

SVG 代码：

```svg
<svg width="200" height="200">
 <circle id="circle" cx="50" cy="50" r="20" fill="blue" />
</svg>
```

CSS 代码：

```css
#circle {
 transition: fill 0.3s ease;
}
```

JavaScript 代码：

```js
const circle = document.getElementById('circle')

circle.addEventListener('mouseover', function () {
  circle.setAttribute('fill', 'red')
  circle.setAttribute('cx', '70')
})
```

上面的代码中，通过给圆形添加 mouseover 事件监听器，当鼠标悬停在圆形上时，修改圆形的 fill 属性为红色，并将圆心的 x 坐标改为 70。由于圆形在 CSS 中定义了过渡效果，因此圆形会平滑地变为红色并向右移动。

## 当QPS达到峰值时, 该如何处理？ {#p1-qps}

当QPS达到峰值时，可以从以下几个方面来进行优化：

1. 数据库优化：数据库的优化包括优化SQL语句、使用索引、避免全表扫描、分表分库等措施，以提高数据库的读写性能。

2. 缓存优化：缓存可以降低对数据库的访问频率，提高响应速度。可以使用Redis、Memcached等缓存技术，减轻服务器负载。

3. 代码优化：优化代码可以提高代码的执行效率，减少不必要的开销。可以通过一些优化手段，如减少不必要的代码执行、避免循环嵌套、避免不必要的递归调用等来提高代码的性能。

4. 负载均衡：负载均衡可以将请求分发到多个服务器上，减少单个服务器的负载，提高整个系统的性能和可用性。

5. 异步处理：将一些计算量大、耗时长的操作异步处理，减少对主线程的阻塞，提高响应速度。

6. CDN加速：使用CDN技术可以将静态资源缓存到CDN节点上，提高资源的加载速度，减少服务器的负载。

7. 硬件升级：可以通过升级服务器硬件，增加带宽等方式来提高系统的处理能力。

以上是一些常见的优化手段，需要根据具体情况进行选择和实施。

## 前端单页应用 History 路由模式， 需要如何配置 nginx？ {#p1-nginx}

前端单页应用使用 History 路由模式，需要将路由的控制交给前端，而不是后端处理，因此需要配置 nginx 让其将所有请求都指向 index.html 页面，让前端来处理路由。

具体配置可以参考以下 nginx 配置：

```bash
bashCopy codeserver {
 listen 80;
 server_name example.com; # 域名或 IP 地址

 location / {
 root /path/to/your/app; # 项目根目录
 index index.html;
 try_files $uri $uri/ /index.html; # 将所有请求都指向 index.html 页面
 }
}
```

以上配置中，`try_files` 指令会尝试将请求映射到对应的文件，如果找不到，则会将请求转发到 `/index.html` 页面，由前端来处理路由。同时，`root` 指令需要指向前端应用的根目录。

## 实现 JS 沙盒的方式有哪些？{#p0-sandbox}

微前端已经成为前端领域比较火爆的话题，在技术方面，微前端有一个始终绕不过去的话题就是前端沙箱

 什么是沙箱

> Sandboxie(又叫沙箱、沙盘)即是一个虚拟系统程序，允许你在沙盘环境中运行浏览器或其他程序，因此运行所产生的变化可以随后删除。它创造了一个类似沙盒的独立作业环境，在其内部运行的程序并不能对硬盘产生永久性的影响。 在网络安全中，沙箱指在隔离环境中，用以测试不受信任的文件或应用程序等行为的工具

简单来说沙箱（sandbox）就是与外界隔绝的一个环境，内外环境互不影响，外界无法修改该环境内任何信息，沙箱内的东西单独属于一个世界。

 JavaScript 的沙箱

对于 JavaScript 来说，沙箱并非传统意义上的沙箱，它只是一种语法上的 Hack 写法，沙箱是一种安全机制，把一些不信任的代码运行在沙箱之内，使其不能访问沙箱之外的代码。当需要解析或着执行不可信的 JavaScript 的时候，需要隔离被执行代码的执行环境的时候，需要对执行代码中可访问对象进行限制，通常开始可以把 JavaScript 中处理模块依赖关系的闭包称之为沙箱。

 JavaScript 沙箱实现

我们大致可以把沙箱的实现总体分为两个部分：

* 构建一个闭包环境
* 模拟原生浏览器对象

 构建闭包环境

我们知道 JavaScript 中，关于作用域（scope）,只有全局作用域（global scope）、函数作用域（function scope）以及从 ES6 开始才有的块级作用域（block scope）。如果要将一段代码中的变量、函数等的定义隔离出来，受限于 JavaScript 对作用域的控制，只能将这段代码封装到一个 Function 中，通过使用 function scope 来达到作用域隔离的目的。也因为需要这种使用函数来达到作用域隔离的目的方式，于是就有 IIFE（立即调用函数表达式）,这是一个被称为 自执行匿名函数的设计模式

```js
(function foo () {
  const a = 1
  console.log(a)
})()
// 无法从外部访问变量 name
console.log(a) // 抛出错误："Uncaught ReferenceError: a is not defined"
```

当函数变成立即执行的函数表达式时，表达式中的变量不能从外部访问，它拥有独立的词法作用域。不仅避免了外界访问 IIFE 中的变量，而且又不会污染全局作用域，弥补了 JavaScript 在 scope 方面的缺陷。一般常见于写插件和类库时，如 JQuery 当中的沙箱模式

```js
(function (window) {
  const jQuery = function (selector, context) {
    return new jQuery.fn.init(selector, context)
  }
  jQuery.fn = jQuery.prototype = function () {
    // 原型上的方法，即所有jQuery对象都可以共享的方法和属性
  }
  jQuery.fn.init.prototype = jQuery.fn
  window.jQeury = window.$ = jQuery // 如果需要在外界暴露一些属性或者方法，可以将这些属性和方法加到window全局对象上去
})(window)
```

当将 IIFE 分配给一个变量，不是存储 IIFE 本身，而是存储 IIFE 执行后返回的结果。

```ini
var result = (function () {
 var name = "张三";
 return name;
})();
console.log(result); // "张三"

```

 原生浏览器对象的模拟

模拟原生浏览器对象的目的是为了，防止闭包环境，操作原生对象。篡改污染原生环境；完成模拟浏览器对象之前我们需要先关注几个不常用的 API。

 eval

eval 函数可将字符串转换为代码执行，并返回一个或多个值

```css
 var b = eval("({name:'张三'})")
 console.log(b.name);

```

由于 eval 执行的代码可以访问闭包和全局范围，因此就导致了代码注入的安全问题，因为代码内部可以沿着作用域链往上找，篡改全局变量，这是我们不希望的

 new Function

Function 构造函数创建一个新的 Function 对象。直接调用这个构造函数可用动态创建函数

> 语法

`new Function ([arg1[, arg2[, ...argN]],] functionBody)`

**arg1, arg2, ... argN** 被函数使用的参数的名称必须是合法命名的。参数名称是一个有效的 JavaScript 标识符的字符串，或者一个用逗号分隔的有效字符串的列表;例如“×”，“theValue”，或“a,b”。

**functionBody** 一个含有包括函数定义的 JavaScript 语句的字符串。

```js
const sum = new Function('a', 'b', 'return a + b')

console.log(sum(1, 2))// 3
```

同样也会遇到和 eval 类似的的安全问题和相对较小的性能问题。

```js
const a = 1

function sandbox () {
  const a = 2
  return new Function('return a;') // 这里的 a 指向最上面全局作用域内的 1
}
const f = sandbox()
console.log(f())
```

与 eval 不同的是 Function 创建的函数只能在全局作用域中运行。它无法访问局部闭包变量，它们总是被创建于全局环境，因此在运行时它们只能访问全局变量和自己的局部变量，不能访问它们被 Function 构造器创建时所在的作用域的变量；但是，它仍然可以访问全局范围。new Function()是 eval()更好替代方案。它具有卓越的性能和安全性，但仍没有解决访问全局的问题。

 with

with 是 JavaScript 中一个关键字,扩展一个语句的作用域链。它允许半沙盒执行。那什么叫半沙盒？语句将某个对象添加到作用域链的顶部，如果在沙盒中有某个未使用命名空间的变量，跟作用域链中的某个属性同名，则这个变量将指向这个属性值。如果沒有同名的属性，则将拋出 ReferenceError。

```js
function sandbox(o) {
 with (o){
 //a=5; 
 c=2;
 d=3;
 console.log(a,b,c,d); // 0,1,2,3 //每个变量首先被认为是一个局部变量，如果局部变量与 obj 对象的某个属性同名，则这个局部变量会指向 obj 对象属性。
 }

}
var f = {
 a:0,
 b:1
}
sandbox(f);
console.log(f);
console.log(c,d); // 2,3 c、d被泄露到window对象上

```

究其原理，`with`在内部使用`in`运算符。对于块内的每个变量访问，它都在沙盒条件下计算变量。如果条件是 true，它将从沙盒中检索变量。否则，就在全局范围内查找变量。但是 with 语句使程序在查找变量值时，都是先在指定的对象中查找。所以对于那些本来不是这个对象的属性的变量，查找起来会很慢，对于有性能要求的程序不适合（JavaScript 引擎会在编译阶段进行数项的性能优化。其中有些优化依赖于能够根据代码的词法进行静态分析，并预先确定所有变量和函数的定义位置，才能在执行过程中快速找到标识符。）。with 也会导致数据泄漏(在非严格模式下，会自动在全局作用域创建一个全局变量)

 in 运算符

> in 运算符能够检测左侧操作数是否为右侧操作数的成员。其中，左侧操作数是一个字符串，或者可以转换为字符串的表达式，右侧操作数是一个对象或数组。

```js
const o = {
  a: 1,
  b: function () {}
}
console.log('a' in o) // true
console.log('b' in o) // true
console.log('c' in o) // false
console.log('valueOf' in o) // 返回true，继承Object的原型方法
console.log('constructor' in o) // 返回true，继承Object的原型属性
```

 with + new Function

配合 with 用法可以稍微限制沙盒作用域，先从当前的 with 提供对象查找，但是如果查找不到依然还能从上获取，污染或篡改全局环境。

```js
function sandbox (src) {
  src = 'with (sandbox) {' + src + '}'
  return new Function('sandbox', src)
}
const str = 'let a = 1;window.name="张三";console.log(a);console.log(b)'
const b = 2
sandbox(str)({})
console.log(window.name)// '张三'
```

 基于 Proxy 实现的沙箱(ProxySandbox)

由上部分内容思考,假如可以做到在使用`with`对于块内的每个变量访问都限制在沙盒条件下计算变量，从沙盒中检索变量。那么是否可以完美的解决JavaScript沙箱机制。

使用 with 再加上 proxy 实现 JavaScript 沙箱

> ES6 Proxy 用于修改某些操作的默认行为，等同于在语言层面做出修改，属于一种“元编程”（meta programming）

```js
function sandbox (code) {
  code = 'with (sandbox) {' + code + '}'
  const fn = new Function('sandbox', code)

  return function (sandbox) {
    const sandboxProxy = new Proxy(sandbox, {
      has (target, key) {
        return true
      }
    })
    return fn(sandboxProxy)
  }
}
const a = 1
const code = 'console.log(a)' // TypeError: Cannot read property 'log' of undefined
sandbox(code)({})
```

我们前面提到`with`在内部使用`in`运算符来计算变量，如果条件是 true，它将从沙盒中检索变量。理想状态下没有问题，但也总有些特例独行的存在，比如 Symbol.unscopables。

**Symbol.unscopables**

> Symbol.unscopables 对象的 Symbol.unscopables 属性，指向一个对象。该对象指定了使用 with 关键字时，哪些属性会被 with 环境排除。

```js
Array.prototype[Symbol.unscopables]
// {
// copyWithin: true,
// entries: true,
// fill: true,
// find: true,
// findIndex: true,
// keys: true
// }

Object.keys(Array.prototype[Symbol.unscopables])
// ['copyWithin', 'entries', 'fill', 'find', 'findIndex', 'keys']
```

由此我们的代码还需要修改如下：

```js
function sandbox (code) {
  code = 'with (sandbox) {' + code + '}'
  const fn = new Function('sandbox', code)

  return function (sandbox) {
    const sandboxProxy = new Proxy(sandbox, {
      has (target, key) {
        return true
      },
      get (target, key) {
        if (key === Symbol.unscopables) return undefined
        return target[key]
      }
    })
    return fn(sandboxProxy)
  }
}
const test = {
  a: 1,
  log () {
    console.log('11111')
  }
}
const code = 'log();console.log(a)' // 1111,TypeError: Cannot read property 'log' of undefined
sandbox(code)(test)
```

Symbol.unscopables 定义对象的不可作用属性。Unscopeable 属性永远不会从 with 语句中的沙箱对象中检索，而是直接从闭包或全局范围中检索。

 快照沙箱(SnapshotSandbox)

以下是 qiankun 的 snapshotSandbox 的源码，这里为了帮助理解做部分精简及注释。

```js
function iter (obj, callbackFn) {
  for (const prop in obj) {
    if (obj.hasOwnProperty(prop)) {
      callbackFn(prop)
    }
  }
}

/**
基于 diff 方式实现的沙箱，用于不支持 Proxy 的低版本浏览器
 */
class SnapshotSandbox {
  constructor (name) {
    this.name = name
    this.proxy = window
    this.type = 'Snapshot'
    this.sandboxRunning = true
    this.windowSnapshot = {}
    this.modifyPropsMap = {}
    this.active()
  }

  // 激活
  active () {
    // 记录当前快照
    this.windowSnapshot = {}
    iter(window, (prop) => {
      this.windowSnapshot[prop] = window[prop]
    })

    // 恢复之前的变更
    Object.keys(this.modifyPropsMap).forEach((p) => {
      window[p] = this.modifyPropsMap[p]
    })

    this.sandboxRunning = true
  }

  // 还原
  inactive () {
    this.modifyPropsMap = {}

    iter(window, (prop) => {
      if (window[prop] !== this.windowSnapshot[prop]) {
        // 记录变更，恢复环境
        this.modifyPropsMap[prop] = window[prop]

        window[prop] = this.windowSnapshot[prop]
      }
    })
    this.sandboxRunning = false
  }
}
const sandbox = new SnapshotSandbox();
// test
((window) => {
  window.name = '张三'
  window.age = 18
  console.log(window.name, window.age) // 张三,18
  sandbox.inactive() // 还原
  console.log(window.name, window.age) // undefined,undefined
  sandbox.active() // 激活
  console.log(window.name, window.age) // 张三,18
})(sandbox.proxy)
```

快照沙箱实现来说比较简单，主要用于不支持 Proxy 的低版本浏览器，原理是基于`diff`来实现的,在子应用激活或者卸载时分别去通过快照的形式记录或还原状态来实现沙箱，snapshotSandbox 会污染全局 window。

 legacySandBox

qiankun 框架 singular 模式下 proxy 沙箱实现，为了便于理解，这里做了部分代码的精简和注释。

```js
//legacySandBox
const callableFnCacheMap = new WeakMap();

function isCallable(fn) {
 if (callableFnCacheMap.has(fn)) {
 return true;
 }
 const naughtySafari = typeof document.all === 'function' && typeof document.all === 'undefined';
 const callable = naughtySafari ? typeof fn === 'function' && typeof fn !== 'undefined' : typeof fn ===
 'function';
 if (callable) {
 callableFnCacheMap.set(fn, callable);
 }
 return callable;
};

function isPropConfigurable(target, prop) {
 const descriptor = Object.getOwnPropertyDescriptor(target, prop);
 return descriptor ? descriptor.configurable : true;
}

function setWindowProp(prop, value, toDelete) {
 if (value === undefined && toDelete) {
 delete window[prop];
 } else if (isPropConfigurable(window, prop) && typeof prop !== 'symbol') {
 Object.defineProperty(window, prop, {
 writable: true,
 configurable: true
 });
 window[prop] = value;
 }
}


function getTargetValue(target, value) {
 /*
 仅绑定 isCallable && !isBoundedFunction && !isConstructable 的函数对象，如 window.console、window.atob 这类。目前没有完美的检测方式，这里通过 prototype 中是否还有可枚举的拓展方法的方式来判断
 @warning 这里不要随意替换成别的判断方式，因为可能触发一些 edge case（比如在 lodash.isFunction 在 iframe 上下文中可能由于调用了 top window 对象触发的安全异常）
 */
 if (isCallable(value) && !isBoundedFunction(value) && !isConstructable(value)) {
 const boundValue = Function.prototype.bind.call(value, target);
 for (const key in value) {
 boundValue[key] = value[key];
 }
 if (value.hasOwnProperty('prototype') && !boundValue.hasOwnProperty('prototype')) {
 Object.defineProperty(boundValue, 'prototype', {
 value: value.prototype,
 enumerable: false,
 writable: true
 });
 }

 return boundValue;
 }

 return value;
}

/**
基于 Proxy 实现的沙箱
 */
class SingularProxySandbox {
 // 沙箱期间新增的全局变量 */
 addedPropsMapInSandbox = new Map();

 // 沙箱期间更新的全局变量 */
 modifiedPropsOriginalValueMapInSandbox = new Map();

 // 持续记录更新的(新增和修改的)全局变量的 map，用于在任意时刻做 snapshot */
 currentUpdatedPropsValueMap = new Map();

 name;

 proxy;

 type = 'LegacyProxy';

 sandboxRunning = true;

 latestSetProp = null;

 active() {
 if (!this.sandboxRunning) {
 this.currentUpdatedPropsValueMap.forEach((v, p) => setWindowProp(p, v));
 }

 this.sandboxRunning = true;
 }

 inactive() {
 // console.log(' this.modifiedPropsOriginalValueMapInSandbox', this.modifiedPropsOriginalValueMapInSandbox)
 // console.log(' this.addedPropsMapInSandbox', this.addedPropsMapInSandbox)
 //删除添加的属性，修改已有的属性
 this.modifiedPropsOriginalValueMapInSandbox.forEach((v, p) => setWindowProp(p, v));
 this.addedPropsMapInSandbox.forEach((_, p) => setWindowProp(p, undefined, true));

 this.sandboxRunning = false;
 }

 constructor(name) {
 this.name = name;
 const {
 addedPropsMapInSandbox,
 modifiedPropsOriginalValueMapInSandbox,
 currentUpdatedPropsValueMap
 } = this;

 const rawWindow = window;
 //Object.create(null)的方式，传入一个不含有原型链的对象
 const fakeWindow = Object.create(null);

 const proxy = new Proxy(fakeWindow, {
 set: (_, p, value) => {
 if (this.sandboxRunning) {
 if (!rawWindow.hasOwnProperty(p)) {
 addedPropsMapInSandbox.set(p, value);
 } else if (!modifiedPropsOriginalValueMapInSandbox.has(p)) {
 // 如果当前 window 对象存在该属性，且 record map 中未记录过，则记录该属性初始值
 const originalValue = rawWindow[p];
 modifiedPropsOriginalValueMapInSandbox.set(p, originalValue);
 }

 currentUpdatedPropsValueMap.set(p, value);
 // 必须重新设置 window 对象保证下次 get 时能拿到已更新的数据
 rawWindow[p] = value;

 this.latestSetProp = p;

 return true;
 }

 // 在 strict-mode 下，Proxy 的 handler.set 返回 false 会抛出 TypeError，在沙箱卸载的情况下应该忽略错误
 return true;
 },

 get(_, p) {
 //避免使用 window.window 或者 window.self 逃离沙箱环境，触发到真实环境
 if (p === 'top' || p === 'parent' || p === 'window' || p === 'self') {
 return proxy;
 }
 const value = rawWindow[p];
 return getTargetValue(rawWindow, value);
 },

 has(_, p) { //返回boolean
 return p in rawWindow;
 },

 getOwnPropertyDescriptor(_, p) {
 const descriptor = Object.getOwnPropertyDescriptor(rawWindow, p);
 // 如果属性不作为目标对象的自身属性存在，则不能将其设置为不可配置
 if (descriptor && !descriptor.configurable) {
 descriptor.configurable = true;
 }
 return descriptor;
 },
 });

 this.proxy = proxy;
 }
}

let sandbox = new SingularProxySandbox();

((window) => {
 window.name = '张三';
 window.age = 18;
 window.sex = '男';
 console.log(window.name, window.age,window.sex) // 张三,18,男
 sandbox.inactive() // 还原
 console.log(window.name, window.age,window.sex) // 张三,undefined,undefined
 sandbox.active() // 激活
 console.log(window.name, window.age,window.sex) // 张三,18,男
})(sandbox.proxy); //test

```

legacySandBox 还是会操作 window 对象，但是他通过激活沙箱时还原子应用的状态，卸载时还原主应用的状态来实现沙箱隔离的，同样会对 window 造成污染，但是性能比快照沙箱好，不用遍历 window 对象。

 proxySandbox(多例沙箱)

在 qiankun 的沙箱 proxySandbox 源码里面是对 fakeWindow 这个对象进行了代理，而这个对象是通过 createFakeWindow 方法得到的，这个方法是将 window 的 document、location、top、window 等等属性拷贝一份，给到 fakeWindow。

源码展示：

```js

function createFakeWindow(global: Window) {
 // map always has the fastest performance in has check scenario
 // see https://jsperf.com/array-indexof-vs-set-has/23
 const propertiesWithGetter = new Map<PropertyKey, boolean>();
 const fakeWindow = {} as FakeWindow;

 /*
 copy the non-configurable property of global to fakeWindow
 see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/getOwnPropertyDescriptor
 > A property cannot be reported as non-configurable, if it does not exists as an own property of the target object or if it exists as a configurable own property of the target object.
 */
 Object.getOwnPropertyNames(global)
 .filter((p) => {
 const descriptor = Object.getOwnPropertyDescriptor(global, p);
 return !descriptor?.configurable;
 })
 .forEach((p) => {
 const descriptor = Object.getOwnPropertyDescriptor(global, p);
 if (descriptor) {
 const hasGetter = Object.prototype.hasOwnProperty.call(descriptor, 'get');

 /*
 make top/self/window property configurable and writable, otherwise it will cause TypeError while get trap return.
 see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get
 > The value reported for a property must be the same as the value of the corresponding target object property if the target object property is a non-writable, non-configurable data property.
 */
 if (
 p === 'top' ||
 p === 'parent' ||
 p === 'self' ||
 p === 'window' ||
 (process.env.NODE_ENV === 'test' && (p === 'mockTop' || p === 'mockSafariTop'))
 ) {
 descriptor.configurable = true;
 /*
 The descriptor of window.window/window.top/window.self in Safari/FF are accessor descriptors, we need to avoid adding a data descriptor while it was
 Example:
 Safari/FF: Object.getOwnPropertyDescriptor(window, 'top') -> {get: function, set: undefined, enumerable: true, configurable: false}
 Chrome: Object.getOwnPropertyDescriptor(window, 'top') -> {value: Window, writable: false, enumerable: true, configurable: false}
 */
 if (!hasGetter) {
 descriptor.writable = true;
 }
 }

 if (hasGetter) propertiesWithGetter.set(p, true);

 // freeze the descriptor to avoid being modified by zone.js
 // see https://github.com/angular/zone.js/blob/a5fe09b0fac27ac5df1fa746042f96f05ccb6a00/lib/browser/define-property.ts#L71
 rawObjectDefineProperty(fakeWindow, p, Object.freeze(descriptor));
 }
 });

 return {
 fakeWindow,
 propertiesWithGetter,
 };
}

```

proxySandbox 由于是拷贝复制了一份 fakeWindow，不会污染全局 window，同时支持多个子应用同时加载。 详细源码请查看[：proxySandbox](https://link.juejin.cn?target=https%3A%2F%2Fgithub.com%2Fumijs%2Fqiankun%2Fblob%2Fmaster%2Fsrc%2Fsandbox%2FproxySandbox.ts "https://github.com/umijs/qiankun/blob/master/src/sandbox/proxySandbox.ts")

 关于 CSS 隔离

常见的有：

* CSS Module
* namespace
* Dynamic StyleSheet
* css in js
* Shadow DOM 常见的我们这边不再赘述，这里我们重点提一下Shadow DO。

 Shadow DOM

Shadow DOM 允许将隐藏的 DOM 树附加到常规的 DOM 树中——它以 shadow root 节点为起始根节点，在这个根节点的下方，可以是任意元素，和普通的 DOM 元素一样。

## 前端路由的实现原理 {#p0-router}

在使用Vue、React等前端框架时，我们都会发现项目中只有一个HTML文件，并且在该HTML中都存在一个根标签，起到了类似于容器的作用。容器内部的内容就由我们后续编写的每个视图决定，页面的切换就是容器中视图的切换。

前端路由的实现原理简单来说，就是在不跳转或者刷新页面的前提下，为SPA应用中的每个视图匹配一个特殊的URL，之后的刷新、前进、后退等操作均通过这个特殊的URL实现。为实现上述要求，需要满足：

改变URL且不会向服务器发起请求；

可以监听到URL的变化，并渲染与之匹配的视图。

主要有Hash路由和History路由两种实现方式。下文对两者的基本原理进行简单介绍，并分别实现了一个简易的路由Demo。

 Hash路由

原理就是通过键值对的形式保存路由及对应要执行的回调函数，当监听到页面hash发生改变时，根据最新的hash值调用注册好的回调函数，即改变页面。

 创建路由

```js
class Routers {
  constructor () {
    // 保存路由信息
    this.routes = {}
    this.currentUrl = ''
    window.addEventListener('load', this.refresh, false)
    window.addEventListener('hashchange', this.refresh, false)
  }

  // 用于注册路由的函数
  route (path, callback) {
    this.routes[path] = callback || function () {}
  }

  // 监听事件的回调，负责当页面hash改变时执行对应hash值的回调函数
  refresh () {
    this.currentUrl = location.hash.slice(1) || '/'
    this.routes[this.currentUrl]()
  }
}

window.Router = new Routers()
```

 注册路由

使用route方法添加对应的路由及其回调函数即可。以下代码实现了一个根据不同hash改变页面颜色的路由，模拟了页面的切换，在实际的SPA应用中，对应的就是页面内容的变化了。

```js
const content = document.querySelector('body')

function changeBgColor (color) {
  content.style.background = color
}

// 添加路由
Router.route('/', () => {
  changeBgColor('yellow')
})
Router.route('/red', () => {
  changeBgColor('red')
})
Router.route('/green', () => {
  changeBgColor('green')
})
Router.route('/blue', () => {
  changeBgColor('blue')
})
```

 History路由

在H5之前，浏览器的history仅支持页面之前的跳转，包括前进和后退等功能。

在HTML5中，新增以下API：

```js
history.pushState() // 添加新状态到历史状态栈
history.replaceState() // 用新状态代替当前状态
history.state // 获取当前状态对象
```

history.pushState()和history.replaceState()均接收三个参数：

* state：一个与指定网址相关的状态对象，popstate事件触发时，该对象会传入回调函数。如果不需要这个对象，此处可以填null。
* title：新页面的标题，但是所有浏览器目前都忽略这个值，因此这里可以填null。
* url：新的网址，必须与当前页面处在同一个域。浏览器的地址栏将显示这个网址

由于history.pushState()和 history.replaceState()都具有在改变页面URL的同时，不刷新页面的能力，因此也可以用来实现前端路由。

 创建路由类

```js
class Routers {
  constructor () {
    this.routes = {}
    window.addEventListener('popstate', e => {
      const path = e.state && e.state.path
      this.routes[path] && this.routes[path]()
    })
  }

  init (path) {
    history.replaceState({ path }, null, path)
    this.routes[path] && this.routes[path]()
  }

  route (path, callback) {
    this.routes[path] = callback || function () {}
  }

  go (path) {
    history.pushState({ path }, null, path)
    this.routes[path] && this.routes[path]()
  }
}

window.Router = new Routers()
```

 注册路由

```js
function changeBgColor (color) {
  content.style.background = color
}

Router.route(location.pathname, () => {
  changeBgColor('yellow')
})
Router.route('/red', () => {
  changeBgColor('red')
})
Router.route('/green', () => {
  changeBgColor('green')
})
Router.route('/blue', () => {
  changeBgColor('blue')
})

const content = document.querySelector('body')
Router.init(location.pathname)
```

 触发事件

在使用hash实现的路由中，我们通过hashchange事件来监听hash的变化，但是上述代码中history的改变本身不会触发任何事件，因此无法直接监听history的改变来改变页面。因此，对于不同的情况，我们选择不同的解决方案：

* 点击浏览器的前进或者后退按钮：监听popstate事件，获取相应路径并执行回调函数
* 点击a标签：阻止其默认行为，获取其href属性，手动调用history.pushState()，并执行相应回调。

```js
const ul = document.querySelector('ul')

ul.addEventListener('click', e => {
  if (e.target.tagName === 'A') {
    e.preventDefault()
    Router.go(e.target.getAttribute('href'))
  }
})
```

 对比

基于hash的路由：

缺点：

* 看起来比较丑
* 会导致锚点功能失效

优点：

* 兼容性更好
* 无需服务器配合
