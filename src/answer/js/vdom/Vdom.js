class Vdom {
  constructor (tagName, props, children = []) {
    this.tagName = tagName;
    this.props = props;
    this.children = children;
  }

  render () {
    const parent = document.createElement(this.tagName);
    if (this.children.length) {
      // eslint-disable-next-line
      this.children.map(ele => {
        const children = ele.render();
        parent.appendChild(children);
      });
    }
    return parent;
  }
}
