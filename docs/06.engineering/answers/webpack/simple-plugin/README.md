# plugin 

编写一个 webpack 5 的 plugin 支持

1. 提取代码中所有 TODO 的注释
2. 将代码中所有 TODO 的注释汇总输出到项目根目录的 TODO.md 文件中
3. TODO.md 输出的格式如下

```md

## [包含 todo 注释的源码文件名，只保留 basename](文件的路径，相对当前 TODO.md 文件)
* [ ] [todo 的说明](todo 对应在改源码文件中的地址，同时包含行列号，支持点击直接跳转，行列号的支持符合 vscode 规则比如 xx.js#L1,12)
```