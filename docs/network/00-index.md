# 网络

## 参考资料

* [hpbn](https://hpbn.co/)

## 问题

## http1、2、3区别。 3中如何实现的快速握手

1. HTTP/1.1
   * 持久连接（Keep-Alive）
   * 管道化请求
   * 存在队头阻塞问题
2. HTTP/2
   * 多路复用
   * 二进制分帧
   * 服务器推送
   * 头部压缩（HPACK）
3. HTTP/3
   * 基于 QUIC 协议（UDP）
   * 0-RTT 快速握手
   * 避免队头阻塞
   * 内置加密（TLS 1.3）

## DNS 解析方式

1. 浏览器缓存
2. 操作系统缓存
3. 本地 hosts 文件
4. 本地 DNS 服务器
5. 根 DNS 服务器
6. 顶级域名服务器
7. 权威 DNS 服务器

* https
* TCP三次握手和四次挥手
* TCP与UDP的区别
* WebSocket原理
* HTTP缓存机制

## HTTPS

* HTTP + SSL/TLS
* 加密传输
* 数字证书
* 非对称加密 + 对称加密
