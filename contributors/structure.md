```md
├── <domain>  对应的知识域
│  ├── <knowledge> 对应的知识点， 主题通过在知识点中添加 meta 信息来表示
│  │   ├── meta.json // 知识点对应的原信息, 例如主题、优先级、关联知识点
│  │   ├── README.md // 知识点说明
|  |   ├── questions.test.js // 知识点考察项问题测试合集
│  │   ├── questions // 对应的知识点考察项问题合集
│  │   │   ├── <quiz1>.md // 考察点问题1
│  │   │   ├── <quiz2>.md // 考察点问题2
│  │   │   ├── <quiz3>.md // 考察点问题3
│  │   │   ├── ...
│  ├── <knowledge2.md> // 其他知识点
│  ├── ... // 其他知识点
├── ... // 其他知识域

```