what-happen-when-access-google
====

介绍搜索浏览器是发生了什么

-----



## 回答
大致分为如下几部

1. 键盘解析
    1. 键盘模块解析按下字符码
    2. 利用 usb 或蓝牙发送按键给主机
    3. 主机调用系统级函数处理按键中断
    (触摸屏类似,但是为软中断)
2. url 解析
    1. 浏览器解析 url 确定主机名和访问协议
    2. 利用 dns 查找主机 ip
        1. 浏览器缓存中查找,chrome 在  <chrome://net-internal/#dns>
        2. 去本地 `Hosts` 文件查找
        3. 向网络中的 dns 服务器查找,采用 ARP 协议查找 ip
    3. 获得访问地址后,采用 socket 套接字连接远程服务器
3. http 协议
    1. 浏览器采用 http 请求发送数据
    2. 服务器接收并返回响应
4. html 解析
    1. 标记节点,构建解析树
    2. 加载 css,图像,javascript 文件
    3. HTML 解析完成后,状态变为 `interactive`,此时执行延迟执行的脚本,之后变为 `complete` ,
    浏览器触发 `load` 事件
    > 浏览器会修复所有 html 语法错误
    4. 解析 css 生成一个样式对象
5. 页面渲染
    1. 遍历 dom 节点,组合 css 计算每个节点的样式属性
    2. 绘制图层
    
  
  
## 资料
* [ ] [访问浏览器是发什了什么](https://github.com/skyline75489/what-happens-when-zh_CN)


