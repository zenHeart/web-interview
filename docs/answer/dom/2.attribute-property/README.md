## attribute property 区别?
1. 从规范的角度 `attributes` 由 html 定义,`properties` 由 dom 定义
   * 少数 html `attribute` 有对应 `id` 映射,例如 id
	> 非自定义的 property 或attribute的变化多数是联动的

   * 自定义 `attribute`,`colspan` 等无映射,需使用 `getAttribute` 获得
2. `attribute` 用于初始化 dom 对象的 `property`,`property` 可以修改
	1. 在表单中 getAttribute 访问的 value 属性为初始值,而 `value` 属性访问获得的是当前值

	> 带有默认值的attribute不随property变化而变化。但是修改 attribute 会修改 `property`
3. 自定义属性采用 `data-` 定义,利用 dataset 获取。 
4. `attribute` 大小写不敏感,值均为字符串格式
5. `style` attribute 为字符串,但是 `property` 为对象格式
6. `href` `attribute` 为设定值,`property` 为完整路径

attribute 方法
1. `elem.hasAttribute(name)` 检查是否存在该属性
2. `elem.getAttribute(name)` 获取属性值
3. `elem.setAttribute(name)` 设置属性值
4. `elem.removeAttribute(name)` 删除属性值
> `elem.attributes` 读取所有属性值

总结:
1. `attribute` 有 html 标签申明,值为字符串,大小写不敏感
2. `properties` 是 DOM 元素中所包含的信息,值有多种可能,大小写敏感

> 参考 [attributes 和 properties](https://javascript.info/dom-attributes-and-properties)