# dns

## DNS 解析方式

1. 浏览器缓存
2. 操作系统缓存
3. 本地 hosts 文件
4. 本地 DNS 服务器
5. 根 DNS 服务器
6. 顶级域名服务器
7. 权威 DNS 服务器

## 完整域名的构成部分

**一、顶级域名（Top-Level Domain，TLD）**

1. **含义**：

* 顶级域名是域名中最右边的部分，它表示域名的类型或所属的国家或地区。例如，在“example.com”中，“.com”就是顶级域名。
* 顶级域名分为通用顶级域名（gTLD）和国家代码顶级域名（ccTLD）。通用顶级域名如“.com”（商业机构）、“.org”（非营利组织）、“.net”（网络服务机构）等；国家代码顶级域名如“.cn”（中国）、“.uk”（英国）、“.jp”（日本）等。

2. **作用**：

* 顶级域名帮助用户快速识别域名的类型或所属地区，同时也在互联网的命名体系中起到分类和标识的作用。

**二、二级域名（Second-Level Domain，SLD）**

1. **含义**：

* 二级域名位于顶级域名的左边，是域名中的主要标识部分。例如，在“example.com”中，“example”就是二级域名。
* 二级域名通常由网站所有者或组织自行定义，可以是任何符合域名命名规则的字符串。

2. **作用**：

* 二级域名用于区分不同的网站、组织或服务。它是网站的主要标识，用户通过二级域名来识别和访问特定的网站。

**三、子域名（Subdomain）**

1. **含义**：

* 子域名是位于二级域名前面的部分，它可以进一步细分域名的层次结构。例如，在“blog.example.com”中，“blog”就是子域名。
* 子域名可以有多个层次，例如“sub1.sub2.example.com”。

2. **作用**：

* 子域名可以用于划分不同的业务模块、部门或功能区域。例如，一个公司可以使用“blog”子域名来表示其博客站点，使用“shop”子域名来表示其电子商务站点。

**四、协议部分（如 http:// 或 https://）**

1. **含义**：

* 协议部分位于域名的前面，用于指定访问网站所使用的通信协议。常见的协议有“http://”（超文本传输协议）和“https://”（安全超文本传输协议）。

2. **作用**：

* 协议部分决定了浏览器与服务器之间的通信方式和安全性。“https://”协议提供了加密和安全的通信，保护用户数据的安全。

## 什么是DNS劫持？{#p3-dns-catch}

DNS 劫持（DNS Hijacking），也称为 DNS 重定向，是一种通过篡改原本的 DNS 解析流程，使得用户在尝试访问特定网址时被非法重定向到其他（通常是恶意的、广告相关的或者钓鱼的）网站的行为。这种攻击可以发生在用户的个人电脑、网络设备、甚至是直接在 DNS 服务器上。

DNS 劫持可以通过以下几种方式实现：

1. **恶意软件**：

* 用户的计算机被感染了恶意软件，该软件修改了本地的 DNS 设置，例如更改本地的 `hosts` 文件或 DNS 配置，使得所有或特定域名的请求都会被发送到攻击者指定的服务器。

2. **篡改路由器设置**：

* 攻击者通过各种手段（如默认密码、漏洞利用等）获取路由器的管理权限，并修改其上的 DNS 服务器设置，使得连接到该路由器的所有设备的 DNS 请求都会被重定向。

3. **DNS 服务器劫持**：

* 攻击者直接对 DNS 服务器进行攻击，将规范域名的正确解析地址更改为恶意地址。

4. **中间人攻击（Man-in-the-Middle Attack, MiTM）**：

* 在用户与 DNS 服务器之间截获和修改 DNS 查询和响应，将用户请求重定向到另一个服务器。

5. **网络服务提供商干预**：

* 部分网络服务商出于广告和监管的目的，可能会在 DNS 层面上进行重定向，将无效域名或特定关键字的域名请求导向他们自己的服务器。

DNS 劫持对用户的主要威胁是隐私泄露和安全风险，用户有可能无意中访问到含有恶意软件的网页，导致个人信息泄露或者计算机安全受到威胁。为了防范 DNS 劫持，用户可以采取以下措施：

* 使用可信赖的 DNS 服务，如 Google 的 8.8.8.8、Cloudflare 的 1.1.1.1 等。
* 保持操作系统和防病毒软件都更新至最新状态， regularly scan for malware。
* 对家用路由器设置复杂的登录密码，并定期进行固件更新。
* 使用 VPN 服务，在密封的隧道中完成所有网络通信。
* 对于重要的网站，最好使用书签直接访问，防止输入错误的 URL。
* 启用 DNSSEC（Domain Name System Security Extensions），增加额外的验证步骤来保证 DNS 查询的安全。