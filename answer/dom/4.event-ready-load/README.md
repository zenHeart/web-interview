## ready 和 load 区别?
* ready  为 jqury 事件,为 domcontentLoad 触发 完成了 html 文档的解析就会触发,样式等元素还未加载
* window loaded 在页面完全加载成功后触发包括图片脚本等

1. 发送请求
2. 接收字节流
3. 解析字节流 tokenizer 
4. 解析完成触发 DOMContentLoaded 事件
5. 图片等资源完成加载
6. 页面加载完毕。// window.onload

> 事件变化触发 onreadytstatechange ,该状态由 `document.readyState` 控制

参看 [资源加载和页面事件load, ready, DOMContentLoaded...
](https://zhuanlan.zhihu.com/p/30283138)