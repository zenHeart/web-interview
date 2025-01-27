# 部署集成

## CI 和 CD 的区别 {#p0-ci-cd-difference}

## 前端应用 CICD 有哪些方式实现 {#p1-frontend-ci-cd-ways}

前端应用的持续集成与持续部署（CI/CD）可以通过以下几种方式实现：

**一、使用 Jenkins**

1. 持续集成：

* Jenkins 可以监听代码仓库（如 Git）的变化，当有新的代码提交时，自动触发构建任务。
* 对于前端项目，可以配置 Jenkins 执行构建命令，如使用 npm 或 yarn 安装依赖、运行构建脚本等。
* 例如，可以创建一个自由风格的项目，配置源代码管理为你的 Git 仓库地址，并在构建步骤中添加“Execute shell”，输入构建命令，如`npm install && npm run build`。

2. 持续部署：

* 构建成功后，Jenkins 可以将构建生成的静态文件部署到目标服务器上。
* 可以使用插件（如 Publish Over SSH）将文件传输到远程服务器，并执行部署脚本。
* 例如，配置插件连接到目标服务器，设置部署目录，然后在构建后操作中选择“Send build artifacts over SSH”，指定要传输的文件和目标服务器信息。

**二、使用 GitLab CI/CD**

1. 持续集成：

* 在`.gitlab-ci.yml`文件中定义一系列的阶段（stages）和任务（jobs）。
* 当代码推送到 GitLab 仓库时，GitLab Runner 会自动执行这些任务。
* 对于前端项目，可以定义一个`build` job，在其中执行构建命令。
* 例如：

 ```yaml
 stages:
 - build

 build:
 stage: build
 script:
 - npm install
 - npm run build
 ```

2. 持续部署：

* 可以在`.gitlab-ci.yml`中定义`deploy` job，将构建生成的静态文件部署到服务器上。
* 可以使用 SSH 密钥或其他部署工具来实现部署。
* 例如：

 ```yaml
 stages:
 - build
 - deploy

 build:
 stage: build
 script:
 - npm install
 - npm run build

 deploy:
 stage: deploy
 script:
 - scp -r dist/* user@server:/path/to/deploy
 ```

**三、使用 GitHub Actions**

1. 持续集成：

* 在`.github/workflows`目录下创建一个 YAML 文件来定义工作流。
* 当代码推送到 GitHub 仓库时，GitHub Actions 会自动执行工作流中的任务。
* 对于前端项目，可以在工作流中执行构建命令。
* 例如：

 ```yaml
 name: CI/CD for Frontend App

 on:
 push:
 branches:
 - main

 jobs:
 build:
 runs-on: ubuntu-latest
 steps:
 - uses: actions/checkout@v2
 - name: Install dependencies
 run: npm install
 - name: Build
 run: npm run build
 ```

2. 持续部署：

* 可以在工作流中添加部署步骤，使用 SSH、FTP 等方式将静态文件部署到服务器上。
* 或者使用云服务提供商的部署服务，如 AWS Amplify、Netlify 等。
* 例如：

 ```yaml
 name: CI/CD for Frontend App

 on:
 push:
 branches:
 - main

 jobs:
 build:
 runs-on: ubuntu-latest
 steps:
 - uses: actions/checkout@v2
 - name: Install dependencies
 run: npm install
 - name: Build
 run: npm run build

 deploy:
 needs: build
 runs-on: ubuntu-latest
 steps:
 - name: Deploy to Server
 run: scp -r dist/* user@server:/path/to/deploy
 ```

**四、使用 Travis CI**

1. 持续集成：

* 在项目根目录下创建一个`.travis.yml`文件来定义构建配置。
* 当代码推送到支持的代码仓库（如 GitHub）时，Travis CI 会自动触发构建。
* 对于前端项目，可以在配置文件中指定构建命令。
* 例如：

 ```yaml
 language: node_js
 node_js:
 - 12

 script:
 - npm install
 - npm run build
 ```

2. 持续部署：

* 可以在构建成功后，使用部署工具或脚本将静态文件部署到服务器上。
* 例如，可以在`.travis.yml`中添加部署步骤，使用 SSH 或其他方式进行部署。

* ```yaml

 language: node_js
 node_js:

* 12

 script:

* npm install
* npm run build

 after_success:

* scp -r dist/* user@server:/path/to/deploy

 ```



## 1030 flex 布局中 align-content 与 align-items 有何区别【热度: 106】
* created_at: 2024-10-26T07:31:12Z
* updated_at: 2024-10-26T07:31:13Z
* labels: web应用场景
* milestone: 中

**关键词**：flex 布局属性

在 Flex 布局中，`align-content`和`align-items`都是用于控制 Flex 容器内项目在交叉轴（垂直于主轴的方向）上的对齐方式，但它们有以下区别：

**一、作用范围不同**

1. `align-items`：

 - 作用于 Flex 容器内的单行项目。
 - 它决定了每个单独的项目在交叉轴上的对齐方式。
 - 例如，如果`align-items: center`，则容器内的所有项目将在交叉轴上居中对齐。

2. `align-content`：
 - 作用于整个 Flex 容器的多行项目。
 - 当 Flex 容器有多行项目时，它决定了这些行在交叉轴上的对齐方式。
 - 例如，如果`align-content: space-between`，则多行项目之间在交叉轴上会均匀分布，第一行与容器顶部对齐，最后一行与容器底部对齐。

**二、适用场景不同**

1. `align-items`：

 - 适用于单行的 Flex 布局，或者即使容器有多行，但只需要统一控制所有项目的对齐方式时。
 - 比如，创建一个简单的导航栏，其中的项目在垂直方向上需要保持一致的对齐方式。

2. `align-content`：
 - 适用于多行的 Flex 布局，且需要对多行进行整体的对齐控制。
 - 例如，一个包含大量卡片的网格布局，当卡片数量较多导致出现多行时，可以使用`align-content`来调整行与行之间在垂直方向上的间距和对齐方式。

**三、示例对比**

1. `align-items`示例：

 ```html
 <div style="display: flex; align-items: center; height: 200px;">
 <div style="background-color: lightblue; width: 50px; height: 50px;">Item 1</div>
 <div style="background-color: lightgreen; width: 50px; height: 50px;">Item 2</div>
 <div style="background-color: lightyellow; width: 50px; height: 50px;">Item 3</div>
 </div>
 ```

* 在这个例子中，三个项目在垂直方向上居中对齐，因为设置了`align-items: center`。

2. `align-content`示例：

 ```html
 <div style="display: flex; flex-wrap: wrap; align-content: space-between; height: 300px;">
 <div style="background-color: lightblue; width: 50px; height: 50px;">Item 1</div>
 <div style="background-color: lightgreen; width: 50px; height: 50px;">Item 2</div>
 <div style="background-color: lightyellow; width: 50px; height: 50px;">Item 3</div>
 <div style="background-color: lightcoral; width: 50px; height: 50px;">Item 4</div>
 <div style="background-color: lightskyblue; width: 50px; height: 50px;">Item 5</div>
 <div style="background-color: lightpink; width: 50px; height: 50px;">Item 6</div>
 </div>
 ```

* 这里由于项目数量较多，容器出现了多行。设置了`align-content: space-between`后，行与行之间在垂直方向上均匀分布，第一行靠近容器顶部，最后一行靠近容器底部。

综上所述，`align-items`主要用于控制单行项目在交叉轴上的对齐方式，而`align-content`则用于控制多行项目整体在交叉轴上的对齐方式。

## 应用如何做应用灰度发布 {#p3-grey}

这个是一个非常复杂的话题， 没法直接给出答案， 进提供一些实现的思路：

**什么是灰度**

灰度系统可以把流量划分成多份，一份走新版本代码，一份走老版本代码。

而且灰度系统支持设置流量的比例，比如可以把走新版本代码的流程设置为 5%，没啥问题再放到 10%，50%，最后放到 100% 全量。

这样可以把出现问题的影响降到最低。

而且灰度系统不止这一个用途，比如产品不确定某些改动是不是要的，就要做 AB 实验，也就是要把流量分成两份，一份走 A 版本代码，一份走 B 版本代码。

**实现思路**

1. 后端支持：灰度上线需要后端的支持，通过后端的灰度发布控制，可以将不同版本的前端应用分配给不同用户。

2. 搭建网关层： 支持一部分用户分发到 A 版本， 一部分用户分发到 B 版本 （通常使用 nginx 搭建）。

3. 版本管控机制： 使用版本控制系统（如Git、package.version、hash version 等）来管理不同版本的前端应用代码。在灰度上线时，可以根据需要切换到特定的版本。

4. 动态路由：通过动态路由配置，将用户请求导向不同版本的前端应用。例如，可以使用Nginx或其他反向代理服务器来实现动态路由。

5. 流量染色：使用Cookie或Session来控制用户的灰度版本访问。可以通过设置不同的Cookie值或Session标记，将用户分配到不同的灰度版本。

6. 更复杂的漏量配置： 例如要根据部门、权限、角色等方式来开放灰度；可以使用让用户访问应用的时候， 查询其权限和角色， 根据权限和角色来分发不同的页面路由。

**参考文档**

* [基于 Nginx 实现一个灰度上线系统](https://juejin.cn/post/7250914419579944997)

应用的灰度发布是将新版本逐步推出给有限的用户群体，以在完全发布之前监控其性能和搜集用户反馈的过程。这可以确保新版本的稳健性，减少因新版本可能引起的问题对所有用户的影响。以下是实现应用灰度发布的几种常见方法：

 1. 基于 HTTP 头或 Cookie 的路由

通过识别用户的 HTTP 请求头（如 User-Agent）或特定的 Cookie，决定用户请求被路由到新版本还是旧版本的应用。这种方法通常需要负载均衡器或网关支持特定路由规则。

 2. 使用服务网格（Service Mesh）

服务网格如 Istio 提供了复杂的流量管理能力，可以在微服务架构中实现灰度发布。通过定义路由规则，Istio 可以将特定比例或特定条件的流量导向新版本服务。

 3. 功能开关（Feature Toggles）

功能开关允许开发者在代码中嵌入开关，根据配置动态激活或关闭某些功能。这样，新版本的功能可以被隐藏，直到你决定通过更改配置为特定用户群体开放。

 4. DNS 路由

通过 DNS 管理，将部分用户的请求解析到部署了新版本应用的服务器上。这种方法简单，但切换和回退可能不如其他方法灵活。

 5. CDN 切换

对于前端应用或静态资源，可以通过 CDN 配置，将部分用户的请求路由到包含新版本资源的 CDN 上。通过调整 CDN 的缓存规则控制版本切换。

 6. A/B 测试平台

将灰度发布作为 A/B 测试的一部分，使用专门的 A/B 测试平台来控制哪些用户看到新版本。这种方法不仅可以实现灰度发布，还能搜集用户反馈和使用情况数据。

 7. 容器编排和管理

在支持容器编排（如 Kubernetes）的环境中，可以通过部署新版本的 Pod 副本，并逐步增加新版本副本的数量，同时减少旧版本副本的数量实现灰度发布。

在实施灰度发布时，应该配合监控和日志记录工具，以便快速识别并解决新版本可能引入的问题。同时，在决定完全推出新版本之前，逐渐增加访问新版本的用户比例，确保在所有阶段都能够保持应用的稳定性和高性能。
