#

## react native 工作原理是什么？

React Native是一种基于JavaScript的开发框架，用于构建移动应用程序。它允许开发人员使用React的组件化开发模式来构建原生移动应用，同时跨平台共享代码。

工作原理如下：

1. JavaScript线程：React Native的应用程序逻辑是通过JavaScript代码来编写的。React Native应用在运行时会创建一个专用的JavaScript线程，负责处理JavaScript代码的解析和执行。

2. 原生桥（Native Bridge）：React Native应用通过原生桥（Native Bridge）连接JavaScript线程和原生平台，使得JavaScript代码能够与原生代码进行通信和交互。原生桥是一个双向通信通道，它将JavaScript的调用转发给原生平台，并将原生平台的事件和回调传递回JavaScript。

3. Virtual DOM：React Native使用Virtual DOM（虚拟DOM）机制来描述和管理UI的状态和变化。在React Native中，组件的UI层由React组件树构建而成，每个组件都有一个相应的虚拟DOM表示。

4. 原生渲染：React Native将虚拟DOM的变化映射到相应的原生UI组件上。通过与原生平台的交互，React Native会根据虚拟DOM的变化更新相应的原生UI组件，实现界面的渲染和更新。

5. 原生组件：React Native提供了一系列的原生组件，这些组件直接映射到原生平台上的真实UI控件，例如文本、图像、按钮等。开发人员可以使用这些原生组件来构建用户界面。

6. 原生模块：React Native还提供了原生模块的概念，允许开发人员编写原生平台相关的功能和逻辑。通过原生模块，开发人员可以访问设备功能、原生API和第三方库等。

总体来说，React Native通过JavaScript线程和原生桥实现了JavaScript代码和原生平台之间的通信。它利用虚拟DOM机制来管理UI的状态和变化，并通过与原生平台的交互实现UI的渲染和更新。开发人员可以使用React Native提供的原生组件和原生模块来构建跨平台的移动应用程序。

## jsBridge 是什么？原理是啥？{#p0-hybird}

`jsBridge`是一种在 Web 开发中常用的技术，通常指的是 JavaScript Bridge 的缩写，它是一种在 Web 视图（如 WebView）和原生应用之间进行通信的机制。jsBridge 使得原生代码（如 Android 的 Java/Kotlin 或 iOS 的 Objective-C/Swift）能够与嵌入到 WebView 中的 JavaScript 代码相互调用和通信。

在具体实现上，jsBridge 的原理可能因平台而异，但大致的原理如下：

1. **从 JavaScript 调用原生代码**：

* **注册原生函数**：首先，原生应用会在 WebView 中注册一些可以供 JavaScript 调用的方法或函数。
* **调用原生函数**：然后，JavaScript 可以通过特定的接口调用这些注册的原生方法。这通常是通过注入对象（例如，在 Android 中可以使用`addJavascriptInterface`方法）或监听特定的 URL scheme。
* **消息传递**：当 JavaScript 需要与原生应用通信时，它会发送消息（或调用方法），这个消息包含必要的指令和数据。
* **原生处理**：原生代码接收到这个消息后，会执行对应的指令，并将结果返回给 JavaScript（如果需要）。

2. **从原生代码调用 JavaScript**：

* **执行 JavaScript 代码**：原生应用可以执行 WebView 中的 JavaScript 代码。例如，通过 WebView 的`evaluateJavaScript`（iOS）或`loadUrl("javascript:...")`（Android）方法。
* **回调 JavaScript**：原生应用还可以通过执行回调函数的方式，将数据或结果传递回 JavaScript。

jsBridge 在移动应用开发中尤为重要，因为它提供了一种方式来整合 Web 技术和原生应用功能，让开发者能够利用 Web 技术来编写跨平台的应用，同时还能够访问设备的原生功能，如相机、GPS 等。

这种机制特别适合于混合应用的开发，在这些应用中，部分界面和逻辑使用 Web 技术实现，而另一部分则利用原生代码以获取更好的性能和更丰富的设备功能支持。通过 jsBridge，两种不同的代码和技术可以互相协作，提供统一的用户体验。
