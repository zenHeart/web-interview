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
