class Render {
  /**
     *
     * @param {Object} opts 渲染函数的配置对象
     * @param {String} opts.showEle 视图元素的选择器
     * @param {String} opts.inputEle 输入触发的选择器
     * @param {Object} opts.data 绑定元素的数据
     *
     */
  constructor (opts) {
    this.opts = opts;
    this.defuault = JSON.parse(JSON.stringify(opts.data));
    this.showEle = document.querySelector(opts.showEle);
    this.inputEle = document.querySelector(opts.inputEle);
    this.key = null;
    this.data = opts.data;
    this.pattern = /^{{(\w+)}}/;
    this.init();
  }

  init () {
    // 绑定事件变化
    this.inputEle.oninput = this.onchange.bind(this);
    this.show();
    this.set();
  }

  onchange (events) {
    const val = events.target.value;
    this.set(val);
  }

  show () {
    const txt = this.showEle.textContent;
    const self = this;
    // todo 此处过于简陋
    if (!this.key) {
      this.showEle.textContent = txt.replace(this.pattern, (match, key) => {
        self.key = key;
        return self.data[key];
      }).toString();
    } else {
      this.showEle.textContent = self.data[this.key];
    }
  }

  set (value = this.defuault[this.key]) {
    this.data[this.key] = value;
    this.inputEle.value = this.data[this.key];
    this.show();
  }
}
