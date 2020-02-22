class Vdom {
    constructor(tagName, props, children = []) {
        this.tagName = tagName;
        this.props = props;
        this.children = children;
    }
    render() {
        let parent = document.createElement(this.tagName);
        if (this.children.length) {
            this.children.map(ele => {
                let children = ele.render();
                parent.appendChild(children);
            });
        }
        return parent;
    }
}
