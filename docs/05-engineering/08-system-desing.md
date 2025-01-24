
# 系统设计

## 短链系统

短地址设计,进一步采用 LRU 实现短地址替换功能

## 如何做好前端监控方案 {#p2-monitor}

> 作者推荐可以直接参考下面这个文章就好了， 写的挺不错的。
> [资料](https://juejin.cn/post/7285608128040206391)

作者在这里， 对上面的文章进行一下简单的总结

**全文总结：**
Web 前端监控的方案，包括前端监控的意义、内容、形式、总体方案设计、监控指标、前端埋点方案、上报逻辑、监控数据存储、管理平台展示、报警通知、优化整改等方面。

**重要：**

* **前端监控的意义**：如同城市探头，实时监测保证系统稳定高效，为业务赋能获取更多用户。能够快速解决用户线上问题、用户性能问题；给予产品决策提供数据支撑。
* **2-5-8 原则**：阐述不同响应时间用户的感受和可能的行为。
* **监控的内容**：包括用户行为程序异常、运行性能。
* **监控的形式**：分为主动和被动监控。
* **总体方案设计**：涵盖页面埋点、数据上报、后台存储、汇总统计、报警展示、优化整改等环节。
* **监控指标**：性能指标如 FP、FCP、FMP 等以及 Google Web Vitals 中的 LCP、FID、CLS 等，还有用户指标如 UV、PV 等。
* **前端埋点方案**：介绍了写死在业务代码、全量埋点、动态埋点三种方式，推荐动态埋点。
* **上报逻辑**：ajax、fetch 上报、image 上报、jsonp 上报、sendBeacon 上报，推荐 sendBeacon 上报。
* **监控数据的存储**：可存于 Hadoop 大数据平台、MySQL 关系数据库、NoSQL 存储。
* **管理平台展示**：包括注册和管理业务项目、查看监控数据、配置监控规则和阈值。
* **报警通知**：通过定时任务读取配置表，根据规则查询数据，有多种通知形式。
* **优化整改**：针对性能不达标和用户留存低提出多种措施。

制定监控的核心指标，包括：
性能指标：如加载耗时，Web Vitals 定义了 LCP、FID、CLS 等指标
错误指标：如加载成功率、JS 错误率、白屏频率、接口请求成功率等
拆解指标为点位，基于 Sentry 或其它监控系统上报数据
具备单点追查能力，点位具备足够的公共参数（上下文），通过 trace 或 logID 跟踪点位之间的关系，同时注意不能有敏感信息
建立数据看板及配置报警规则

## 技术选型上有一些什么标准 {#p3}

> 作者推荐一下五个标准，适用于编程语言、框架、大小工具库 等方向

* 可控性
* 稳定性
* 适用性
* 易用性
* 唯一性

当然，以下是对你提出的五个前端技术选型原则的详细描述：

1. **可控性**：

* **定义**：选择的技术应该使团队能够对产品的开发过程有充分的控制，包括代码质量、部署流程、性能优化和错误处理等方面。
* **细节**：
* 允许定制化和扩展：技术栈应该支持自定义功能，以满足特定业务需求。
* 易于维护：代码库应该易于维护和升级，方便团队应对长远的技术演进。
* 开放源代码或支持社区：最好选择有活跃社区支持的开源技术，以便在遇到问题时可以获得帮助。
* 文档和工具：有充分的文档和开发工具，帮助团队理解并控制技术实现。
*

2. **稳定性**：

* **定义**：选用的技术需要稳固可靠，拥有良好的社区支持和持续的发展。
* **细节**：
* 成熟度：技术应该是经过时间检验，市场验证的成熟解决方案。
* 庞大的用户基础：广泛的用户和使用案例保证了技术的稳定性和可靠性。
* 正式的版本管理：应该有一个清晰的版本管理政策，以及频繁可靠的更新和安全补丁。
* 抗脆弱性：即使在意外情况下也能表现出良好的弹性和错误恢复能力。

3. **适用性**：

* **定义**：技术选择应该针对特定项目的需求和团队的技能水平。
* **细节**：
* 业务需求匹配：选用的技术应能高效解决实际业务问题，并支持业务即将来临的挑战。
* 团队的技能和经验：需要考量团队成员对技术栈的熟悉程度，以便能快速有效地产生结果。
* 开发周期： 要考虑该技术是否能够在开发周期类完成对应需求开发。

4. **易用性**：

* **定义**：技术应该简单易懂，易于团队成员学习和使用。
* **细节**：
* 学习曲线：技术栈的学习曲线不应过于陡峭，以免增加新团队成员的入职门槛。
* 开发效率：提供良好的开发体验，如源代码清晰、API 简洁、丰富的开发工具。
* 调试和测试：应包含易于进行故障排除、调试和测试的工具或功能。
* 文档和学习资源：应有良好、全面的文档和在线学习资源助于团队成员快速上手。

5. **唯一性**：

* **定义**：确保在项目开发过程中， 同一个类型的问题解决方向只选用一个技术体系。
* **细节**：
* 避免同类型库重复：选择最适合特定用例的工具和库，避免在项目中引入重复功能的库。

在选择前端技术栈时，这些原则可以帮助团队做出更符合项目需求、更利于长期维护和开发效率的决策。需要注意的是，这些原则并不是孤立的，他们之间相互影响，有时候在某些方面需要妥协以满足其他更为重要的需求。