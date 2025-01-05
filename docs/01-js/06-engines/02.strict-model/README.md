import Answer from '@site/src/components/templates/Answer.tsx';

# 严格模式

## 什么是 Strict Mode?

<Answer open>

回答要点包括如下几个方面。

1. **Strict Mode 定义** Strict Mode 是 ECMAScript 语言的变种，详见规范 [strict-variant-of-ecmascript](https://tc39.es/ecma262/#sec-strict-variant-of-ecmascript) 。 开启 Strict Mode  后，JS 引擎会基于 ECMAScript 规范中定义的严格模式约束，排除特定的语法或语义，改变特定语义的执行流程。
2. **如何开启** 通过在代码或函数顶部声明 `'use strict'` 开启 Strict Mode 模式, 开启规则详见 [Use Strict Directive](https://tc39.es/ecma262/#sec-directive-prologues-and-the-use-strict-directive)。
3. **Strict Mode 作用** 用户通过开启来解决一些不安全的语言特性带来的安全或者其他问题。开启后的限制，详见 [The Strict Mode of ECMAScript](https://tc39.es/ecma262/#sec-strict-mode-of-ecmascript)。
4. **加分项** 理解为什么会有这个特性，为什么会设计成这样的语法。可以阅读 [JavaScript二十年 严格模式章节](https://cn.history.js.org/part-4.html#%E4%B8%A5%E6%A0%BC%E6%A8%A1%E5%BC%8F)

### strict mode 细节

</Answer>
