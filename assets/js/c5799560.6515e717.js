"use strict";(self.webpackChunkweb_interview=self.webpackChunkweb_interview||[]).push([["9839"],{5556:function(e,n,t){t.r(n),t.d(n,{default:()=>u,frontMatter:()=>d,metadata:()=>r,assets:()=>c,toc:()=>l,contentTitle:()=>i});var r=JSON.parse('{"id":"vue/coding","title":"\u7F16\u7801\u9898","description":"\u4F7F\u7528Proxy\u5B9E\u73B0\u7B80\u6613\u7684vue\u53CC\u5411\u6570\u636E\u7ED1\u5B9A","source":"@site/docs/05.02.vue/coding.md","sourceDirName":"05.02.vue","slug":"/vue/coding","permalink":"/web-interview/docs/vue/coding","draft":false,"unlisted":false,"tags":[],"version":"current","frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"\u539F\u7406","permalink":"/web-interview/docs/vue/theory"},"next":{"title":"rn","permalink":"/web-interview/docs/hybird/rn"}}'),s=t("6773"),o=t("715");let d={},i="\u7F16\u7801\u9898",c={},l=[{value:"\u4F7F\u7528Proxy\u5B9E\u73B0\u7B80\u6613\u7684vue\u53CC\u5411\u6570\u636E\u7ED1\u5B9A",id:"\u4F7F\u7528proxy\u5B9E\u73B0\u7B80\u6613\u7684vue\u53CC\u5411\u6570\u636E\u7ED1\u5B9A",level:2},{value:"react \u4E2D\u662F\u5982\u4F55\u5B9E\u73B0 \u4E0B\u62C9\u83DC\u5355\u573A\u666F\uFF0C \u70B9\u51FB\u533A\u57DF\u5916\u5173\u95ED\u4E0B\u62C9\u7EC4\u4EF6\uFF1F",id:"p1-react",level:2},{value:"redux \u65E5\u5FD7\u8BB0\u5F55\u63D2\u4EF6",id:"redux-\u65E5\u5FD7\u8BB0\u5F55\u63D2\u4EF6",level:2}];function a(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,o.a)(),...e.components};return(0,s.jsxs)(s.Fragment,{children:[(0,s.jsx)(n.header,{children:(0,s.jsx)(n.h1,{id:"\u7F16\u7801\u9898",children:"\u7F16\u7801\u9898"})}),"\n",(0,s.jsx)(n.h2,{id:"\u4F7F\u7528proxy\u5B9E\u73B0\u7B80\u6613\u7684vue\u53CC\u5411\u6570\u636E\u7ED1\u5B9A",children:"\u4F7F\u7528Proxy\u5B9E\u73B0\u7B80\u6613\u7684vue\u53CC\u5411\u6570\u636E\u7ED1\u5B9A"}),"\n",(0,s.jsxs)(n.p,{children:["\u53EF\u4EE5\u76F4\u63A5\u770B\u8FD9\u4E2A\u94FE\u63A5\uFF1A ",(0,s.jsx)(n.a,{href:"https://github.com/pro-collection/interview-question/issues/8",children:"\u8D44\u6599"})]}),"\n",(0,s.jsx)(n.p,{children:"\u4F7F\u7528proxy\u5B9E\u73B0\u6570\u636E\u52AB\u6301"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"const data = {\n  name: YoLinDeng,\n  height: '176cm'\n}\n\nconst p = new Proxy(data, {\n  get (target, prop) {\n    return Reflect.get(...arguments)\n  },\n  set (target, prop, newValue) {\n    return Reflect.set(...arguments)\n  }\n})\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u5173\u4E8Evue\u4E2D\u6570\u636E\u54CD\u5E94\u5F0F\u7684\u539F\u7406"}),"\n",(0,s.jsx)(n.p,{children:"\u5BF9\u6570\u636E\u8FDB\u884C\u4FA6\u6D4B"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\u5728vue2.X\u4E2D\uFF0C\u5B9E\u73B0\u4E00\u4E2A",(0,s.jsx)(n.code,{children:"observe"}),"\u7C7B\uFF0C\u5BF9\u4E8E\u5BF9\u8C61\u6570\u636E\uFF0C\u901A\u8FC7",(0,s.jsx)(n.code,{children:"Object.defineProperty"}),"\u6765\u52AB\u6301\u5BF9\u8C61\u7684\u5C5E\u6027\uFF0C\u5B9E\u73B0",(0,s.jsx)(n.code,{children:"getter"}),"\u548C",(0,s.jsx)(n.code,{children:"setter"}),"\u65B9\u6CD5\uFF0C\u8FD9\u6837\u5C31\u53EF\u4EE5\u5728getter\u7684\u65F6\u5019\u77E5\u9053\u8C01\uFF08\u8BA2\u9605\u8005\uFF09\u8BFB\u53D6\u4E86\u6570\u636E\uFF0C\u5373\u8C01\u4F9D\u8D56\u4E86\u5F53\u524D\u7684\u6570\u636E\uFF0C\u5C06\u5B83\u901A\u8FC7",(0,s.jsx)(n.code,{children:"Dep\u7C7B"}),"\uFF08\u8BA2\u9605\u5668\uFF09\u6536\u96C6\u7EDF\u4E00\u7BA1\u7406\uFF0C\u5728setter\u7684\u65F6\u5019\u8C03\u7528Dep\u7C7B\u4E2D\u7684",(0,s.jsx)(n.code,{children:"notify"}),"\u65B9\u6CD5\u901A\u77E5\u6240\u4EE5\u76F8\u5173\u7684\u8BA2\u9605\u8005\u8FDB\u884C\u66F4\u65B0\u89C6\u56FE\u3002\u5982\u679C\u5BF9\u8C61\u7684\u5C5E\u6027\u4E5F\u662F\u4E00\u4E2A\u5BF9\u8C61\u7684\u8BDD\uFF0C\u5219\u9700\u8981\u9012\u5F52\u8C03\u7528",(0,s.jsx)(n.code,{children:"observe"}),"\u8FDB\u884C\u5904\u7406\u3002"]}),"\n",(0,s.jsxs)(n.li,{children:["\u5BF9\u4E8E\u6570\u7EC4\u5219\u9700\u8981\u53E6\u5916\u5904\u7406\uFF0C\u901A\u8FC7\u5B9E\u73B0\u4E00\u4E2A\u62E6\u622A\u5668\u7C7B\uFF0C\u5E76\u5C06\u5B83\u6302\u8F7D\u5230\u6570\u7EC4\u6570\u636E\u7684\u539F\u578B\u4E0A\uFF0C\u5F53\u8C03\u7528",(0,s.jsx)(n.code,{children:"push/pop/shift/unshift/splice/sort/reverse"}),"\u4FEE\u6539\u6570\u7EC4\u6570\u636E\u65F6\u5019\uFF0C\u76F8\u5F53\u4E8E\u8C03\u7528\u7684\u662F\u62E6\u622A\u5668\u4E2D\u91CD\u65B0\u5B9A\u4E49\u7684\u65B9\u6CD5\uFF0C\u8FD9\u6837\u5728\u62E6\u622A\u5668\u4E2D\u5C31\u53EF\u4EE5\u4FA6\u6D4B\u5230\u6570\u636E\u6539\u53D8\u4E86\uFF0C\u5E76\u901A\u77E5\u8BA2\u9605\u8005\u66F4\u65B0\u89C6\u56FE\u3002"]}),"\n",(0,s.jsx)(n.li,{children:"vue3\u4E2D\u4F7F\u7528Proxy\u66FF\u4EE3\u4E86Object.defineProperty\uFF0C\u4F18\u70B9\u5728\u4E8E\u53EF\u4EE5\u76F4\u63A5\u76D1\u542C\u5BF9\u8C61\u800C\u975E\u5C5E\u6027\u3001\u53EF\u4EE5\u76F4\u63A5\u76D1\u542C\u6570\u7EC4\u7684\u53D8\u5316\u3001\u591A\u8FBE13\u79CD\u62E6\u622A\u65B9\u6CD5\u3002\u7F3A\u70B9\u662F\u517C\u5BB9\u6027\u8FD8\u4E0D\u591F\u597D\u3002Proxy\u4F5C\u4E3A\u65B0\u6807\u51C6\u5C06\u53D7\u5230\u6D4F\u89C8\u5668\u5382\u5546\u91CD\u70B9\u6301\u7EED\u7684\u6027\u80FD\u4F18\u5316\u3002"}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"\u5BF9\u6A21\u677F\u5B57\u7B26\u4E32\u8FDB\u884C\u7F16\u8BD1"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["\u5B9E\u73B0Compile\u89E3\u6790\u5668\u7C7B\uFF0C\u5C06",(0,s.jsx)(n.code,{children:"template"}),"\u4E2D\u7684\u6A21\u677F\u5B57\u7B26\u4E32\u901A\u8FC7\u6B63\u5219\u7B49\u65B9\u5F0F\u8FDB\u884C\u5904\u7406\u751F\u6210\u5BF9\u5E94\u7684ast\uFF08\u62BD\u8C61\u8BED\u6CD5\u6811\uFF09\uFF0C\u901A\u8FC7\u8C03\u7528\u5B9A\u4E49\u7684\u4E0D\u540C\u94A9\u5B50\u51FD\u6570\u8FDB\u884C\u5904\u7406\uFF0C\u5305\u62EC\u5F00\u59CB\u6807\u7B7E\uFF08",(0,s.jsx)(n.code,{children:"start"}),"\uFF09\u5E76\u5224\u65AD\u662F\u5426\u81EA\u95ED\u548C\u4EE5\u53CA\u89E3\u6790\u5C5E\u6027\u3001\u7ED3\u675F\u6807\u7B7E\uFF08",(0,s.jsx)(n.code,{children:"end"}),"\uFF09\u3001\u6587\u672C\uFF08",(0,s.jsx)(n.code,{children:"chars"}),"\uFF09\u3001\u6CE8\u91CA\uFF08",(0,s.jsx)(n.code,{children:"comment"}),"\uFF09"]}),"\n",(0,s.jsxs)(n.li,{children:["\u5C06\u901A\u8FC7html\u89E3\u6790\u4E0E\u6587\u672C\u89E3\u6790\u7684ast\u8FDB\u884C\u4F18\u5316\u5904\u7406\uFF0C\u5728\u9759\u6001\u8282\u70B9\u4E0A\u6253\u6807\u8BB0\uFF0C\u4E3A\u540E\u9762",(0,s.jsx)(n.code,{children:"dom-diff"}),"\u7B97\u6CD5\u4E2D\u6027\u80FD\u4F18\u5316\u4F7F\u7528\uFF0C\u5373\u5728\u5BF9\u6BD4\u524D\u540Evnode\u7684\u65F6\u5019\u4F1A\u8DF3\u8FC7\u9759\u6001\u8282\u70B9\u4E0D\u4F5C\u5BF9\u6BD4\u3002"]}),"\n",(0,s.jsxs)(n.li,{children:["\u6700\u540E\u6839\u636E\u5904\u7406\u597D\u7684ast\u751F\u4EA7",(0,s.jsx)(n.code,{children:"render"}),"\u51FD\u6570\uFF0C\u5728\u7EC4\u4EF6\u6302\u8F7D\u7684\u65F6\u5019\u8C03\u7528",(0,s.jsx)(n.code,{children:"render"}),"\u51FD\u6570\u5C31\u53EF\u4EE5\u5F97\u5230\u865A\u62DFdom\u3002"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"\u865A\u62DFdom"}),"\n",(0,s.jsxs)(n.ul,{children:["\n",(0,s.jsxs)(n.li,{children:["vnode\u7684\u7C7B\u578B\u5305\u62EC\u6CE8\u91CA\u8282\u70B9\u3001\u6587\u672C\u8282\u70B9\u3001\u5143\u7D20\u8282\u70B9\u3001\u7EC4\u4EF6\u8282\u70B9\u3001\u51FD\u6570\u5F0F\u7EC4\u4EF6\u8282\u70B9\u3001\u514B\u9686\u8282\u70B9\uFF0C",(0,s.jsx)(n.code,{children:"VNode"}),"\u53EF\u4EE5\u63CF\u8FF0\u7684\u591A\u79CD\u8282\u70B9\u7C7B\u578B\uFF0C\u5B83\u4EEC\u672C\u8D28\u4E0A\u90FD\u662F",(0,s.jsx)(n.code,{children:"VNode"}),"\u7C7B\u7684\u5B9E\u4F8B\uFF0C\u53EA\u662F\u5728\u5B9E\u4F8B\u5316\u7684\u65F6\u5019\u4F20\u5165\u7684\u5C5E\u6027\u53C2\u6570\u4E0D\u540C\u800C\u5DF2\u3002"]}),"\n",(0,s.jsxs)(n.li,{children:["\u901A\u8FC7\u5C06\u6A21\u677F\u5B57\u7B26\u4E32\u7F16\u8BD1\u751F\u6210\u865A\u62DFdom\u5E76\u7F13\u5B58\u8D77\u6765\uFF0C\u5F53\u6570\u636E\u53D1\u751F\u53D8\u5316\u65F6\uFF0C\u901A\u8FC7\u5BF9\u6BD4\u53D8\u5316\u524D\u540E\u865A\u62DFdom\uFF0C\u4EE5\u53D8\u5316\u540E\u7684\u865A\u62DFdom\u4E3A\u57FA\u51C6\uFF0C\u66F4\u65B0\u65E7\u7684\u865A\u62DFdom\uFF0C\u4F7F\u5B83\u548C\u65B0\u7684\u4E00\u6837\u3002\u628Adom-diff\u8FC7\u7A0B\u53EB\u505A",(0,s.jsx)(n.code,{children:"patch"}),"\u7684\u8FC7\u7A0B\uFF0C\u5176\u4E3B\u8981\u505A\u4E86\u4E09\u4EF6\u4E8B\uFF0C\u5206\u522B\u662F\u521B\u5EFA/\u5220\u9664/\u66F4\u65B0\u8282\u70B9\u3002"]}),"\n",(0,s.jsx)(n.li,{children:"\u5BF9\u4E8E\u5B50\u8282\u70B9\u7684\u66F4\u65B0\u7B56\u7565\uFF0Cvue\u4E2D\u4E3A\u4E86\u907F\u514D\u53CC\u91CD\u5FAA\u73AF\u6570\u636E\u91CF\u5927\u65F6\u5019\u9020\u6210\u65F6\u95F4\u590D\u6742\u5EA6\u9AD8\u5E26\u6765\u7684\u6027\u80FD\u95EE\u9898\uFF0C\u800C\u9009\u62E9\u5148\u4ECE\u5B50\u8282\u70B9\u6570\u7EC4\u4E2D4\u4E2A\u7279\u6B8A\u4F4D\u7F6E\u8FDB\u884C\u5BF9\u6BD4\uFF0C\u5206\u522B\u662F\uFF1A\u65B0\u524D\u4E0E\u65E7\u524D\uFF0C\u65B0\u540E\u4E0E\u65E7\u540E\uFF0C\u65B0\u540E\u4E0E\u65E7\u524D\uFF0C\u65B0\u524D\u4E0E\u65E7\u540E\u3002\u5982\u679C\u56DB\u79CD\u60C5\u51B5\u90FD\u6CA1\u6709\u627E\u5230\u76F8\u540C\u7684\u8282\u70B9\uFF0C\u5219\u518D\u901A\u8FC7\u5FAA\u73AF\u65B9\u5F0F\u67E5\u627E\u3002"}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"\u5B9E\u73B0\u7B80\u6613\u7684vue\u53CC\u5411\u6570\u636E\u7ED1\u5B9A"}),"\n",(0,s.jsx)(n.p,{children:"vue\u7684\u53CC\u5411\u6570\u636E\u7ED1\u5B9A\u4E3B\u8981\u662F\u6307\uFF0C\u6570\u636E\u53D8\u5316\u66F4\u65B0\u89C6\u56FE\u53D8\u5316\uFF0C\u89C6\u56FE\u53D8\u5316\u66F4\u65B0\u6570\u636E\u3002"}),"\n",(0,s.jsx)(n.p,{children:(0,s.jsx)(n.strong,{children:"\u5B9E\u73B0\u4EE3\u7801\u5982\u4E0B"})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-handlebars",children:'<!DOCTYPE html>\n<html lang="en">\n<head>\n <meta charset="UTF-8">\n <meta name="viewport" content="width= , initial-scale=1.0">\n <title>Document</title>\n <script src="myVue.js"><\/script>\n</head>\n<body>\n <div id="app">\n {{name}}\n <div>{{message}}</div>\n <input type="text" v-model="test">\n <span>{{test}}</span>\n </div>\n <script>\n let vm = new vue({\n el: \'#app\',\n data: {\n name: \'YoLinDeng\',\n message: \'\u6253\u7BEE\u7403\',\n test: \'\u53CC\u5411\u7ED1\u5B9A\u6570\u636E\'\n }\n })\n // console.log(vm._data)\n <\/script>\n</body>\n</html>\n'})}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"class vue extends EventTarget {\n  constructor (option) {\n    super()\n    this.option = option\n    this._data = this.option.data\n    this.el = document.querySelector(this.option.el)\n    this.compileNode(this.el)\n    this.observe(this._data)\n  }\n\n  // \u5B9E\u73B0\u76D1\u542C\u5668\u65B9\u6CD5\n  observe (data) {\n    const context = this\n    // \u4F7F\u7528proxy\u4EE3\u7406\uFF0C\u52AB\u6301\u6570\u636E\n    this._data = new Proxy(data, {\n      set (target, prop, newValue) {\n        // \u81EA\u5B9A\u4E49\u4E8B\u4EF6\n        const event = new CustomEvent(prop, {\n          detail: newValue\n        })\n        // \u53D1\u5E03\u81EA\u5B9A\u4E49\u4E8B\u4EF6\n        context.dispatchEvent(event)\n        return Reflect.set(...arguments)\n      }\n    })\n  }\n\n  // \u5B9E\u73B0\u89E3\u6790\u5668\u65B9\u6CD5\uFF0C\u89E3\u6790\u6A21\u677F\n  compileNode (el) {\n    const child = el.childNodes\n    const childArr = [...child]\n    childArr.forEach(node => {\n      if (node.nodeType === 3) {\n        const text = node.textContent\n        if (reg.test(text)) {\n          const $1 = RegExp.$1\n          this._data[$1] && (node.textContent = text.replace(reg, this._data[$1]))\n          // \u76D1\u542C\u6570\u636E\u66F4\u6539\u4E8B\u4EF6\n          this.addEventListener($1, e => {\n            node.textContent = text.replace(reg, e.detail)\n          })\n        }\n      } else if (node.nodeType === 1) { // \u5982\u679C\u662F\u5143\u7D20\u8282\u70B9\n        const attr = node.attributes\n        // \u5224\u65AD\u5C5E\u6027\u4E2D\u662F\u5426\u542B\u6709v-model\n        // eslint-disable-next-line\n        if (attr.hasOwnProperty('v-model')) {\n          const keyName = attr['v-model'].nodeValue\n          node.value = this._data[keyName]\n          node.addEventListener('input', e => {\n            this._data[keyName] = node.value\n          })\n        }\n        // \u9012\u5F52\u8C03\u7528\u89E3\u6790\u5668\u65B9\u6CD5\n        this.compileNode(node)\n      }\n    })\n  }\n}\n"})}),"\n",(0,s.jsx)(n.h2,{id:"p1-react",children:"react \u4E2D\u662F\u5982\u4F55\u5B9E\u73B0 \u4E0B\u62C9\u83DC\u5355\u573A\u666F\uFF0C \u70B9\u51FB\u533A\u57DF\u5916\u5173\u95ED\u4E0B\u62C9\u7EC4\u4EF6\uFF1F"}),"\n",(0,s.jsx)(n.p,{children:"\u5728 React \u4E2D\uFF0C\u8981\u5B9E\u73B0\u70B9\u51FB\u533A\u57DF\u5916\u5173\u95ED\u4E0B\u62C9\u7EC4\u4EF6\uFF0C\u4E00\u822C\u53EF\u4EE5\u4F7F\u7528\u4EE5\u4E0B\u51E0\u79CD\u65B9\u6CD5\uFF1A"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"\u5728\u4E0B\u62C9\u7EC4\u4EF6\u7684\u6839\u5143\u7D20\u4E0A\u76D1\u542C\u70B9\u51FB\u4E8B\u4EF6\uFF0C\u5F53\u70B9\u51FB\u533A\u57DF\u4E0D\u5728\u4E0B\u62C9\u7EC4\u4EF6\u5185\u65F6\uFF0C\u89E6\u53D1\u5173\u95ED\u4E0B\u62C9\u7EC4\u4EF6\u7684\u64CD\u4F5C\u3002\u8FD9\u53EF\u4EE5\u901A\u8FC7\u6DFB\u52A0\u5168\u5C40\u70B9\u51FB\u4E8B\u4EF6\uFF0C\u7136\u540E\u5728\u4E8B\u4EF6\u5904\u7406\u7A0B\u5E8F\u4E2D\u5224\u65AD\u70B9\u51FB\u533A\u57DF\u662F\u5426\u5728\u4E0B\u62C9\u7EC4\u4EF6\u5185\u6765\u5B9E\u73B0\u3002\u5177\u4F53\u5B9E\u73B0\u5982\u4E0B\uFF1A"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:"import React, { useRef, useEffect } from 'react';\n\nfunction DropdownMenu(props) {\n const menuRef = useRef(null);\n\n useEffect(() => {\n function handleClickOutside(event) {\n if (menuRef.current && !menuRef.current.contains(event.target)) {\n props.onClose();\n }\n }\n\n document.addEventListener('click', handleClickOutside);\n return () => {\n document.removeEventListener('click', handleClickOutside);\n };\n }, [props]);\n\n return (\n <div ref={menuRef}>\n {/* \u4E0B\u62C9\u83DC\u5355\u5185\u5BB9 */}\n </div>\n );\n}\n"})}),"\n",(0,s.jsxs)(n.ol,{start:"2",children:["\n",(0,s.jsx)(n.li,{children:"\u5728\u4E0B\u62C9\u7EC4\u4EF6\u7684\u7236\u5143\u7D20\u4E0A\u76D1\u542C\u70B9\u51FB\u4E8B\u4EF6\uFF0C\u5F53\u70B9\u51FB\u533A\u57DF\u4E0D\u5728\u4E0B\u62C9\u7EC4\u4EF6\u53CA\u5176\u7236\u5143\u7D20\u5185\u65F6\uFF0C\u89E6\u53D1\u5173\u95ED\u4E0B\u62C9\u7EC4\u4EF6\u7684\u64CD\u4F5C\u3002\u5177\u4F53\u5B9E\u73B0\u5982\u4E0B\uFF1A"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:"import React, { useState } from 'react';\n\nfunction Dropdown(props) {\n const [isOpen, setIsOpen] = useState(false);\n\n function toggleDropdown() {\n setIsOpen(!isOpen);\n }\n\n function handleClickOutside(event) {\n if (!event.target.closest('.dropdown')) {\n setIsOpen(false);\n }\n }\n\n return (\n <div className=\"dropdown\" onClick={handleClickOutside}>\n <button onClick={toggleDropdown}>Toggle Dropdown</button>\n {isOpen && <DropdownMenu onClose={() => setIsOpen(false)} />}\n </div>\n );\n}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["\u5728\u4E0A\u8FF0\u4EE3\u7801\u4E2D\uFF0C\u6211\u4EEC\u5728 ",(0,s.jsx)(n.code,{children:"Dropdown"})," \u7EC4\u4EF6\u7684\u6839\u5143\u7D20\u4E0A\u6DFB\u52A0\u4E86\u70B9\u51FB\u4E8B\u4EF6\u5904\u7406\u7A0B\u5E8F ",(0,s.jsx)(n.code,{children:"handleClickOutside"}),"\uFF0C\u5F53\u70B9\u51FB\u533A\u57DF\u4E0D\u5728 ",(0,s.jsx)(n.code,{children:".dropdown"})," \u5143\u7D20\u5185\u65F6\uFF0C\u89E6\u53D1\u5173\u95ED\u4E0B\u62C9\u7EC4\u4EF6\u7684\u64CD\u4F5C\u3002\u7531\u4E8E ",(0,s.jsx)(n.code,{children:"DropdownMenu"})," \u7EC4\u4EF6\u4F4D\u4E8E ",(0,s.jsx)(n.code,{children:"Dropdown"})," \u7EC4\u4EF6\u5185\u90E8\uFF0C\u56E0\u6B64\u5F53\u70B9\u51FB\u4E0B\u62C9\u83DC\u5355\u65F6\uFF0C\u4E8B\u4EF6\u4F1A\u5192\u6CE1\u5230 ",(0,s.jsx)(n.code,{children:"Dropdown"})," \u7EC4\u4EF6\uFF0C\u4ECE\u800C\u4E0D\u4F1A\u89E6\u53D1\u5173\u95ED\u64CD\u4F5C\u3002"]}),"\n",(0,s.jsxs)(n.ol,{start:"3",children:["\n",(0,s.jsxs)(n.li,{children:["\u9664\u4E86\u4E0A\u8FF0\u65B9\u6CD5\u5916\uFF0C\u8FD8\u53EF\u4EE5\u4F7F\u7528 ",(0,s.jsx)(n.code,{children:"useRef"})," \u94A9\u5B50\u6765\u76D1\u542C\u9F20\u6807\u70B9\u51FB\u4E8B\u4EF6\u3002\u5177\u4F53\u5B9E\u73B0\u53EF\u4EE5\u5728\u4E0B\u62C9\u7EC4\u4EF6\u7684\u6839\u5143\u7D20\u4E0A\u4F7F\u7528 ",(0,s.jsx)(n.code,{children:"ref"})," \u5C5E\u6027\u6765\u83B7\u53D6 DOM \u5143\u7D20\u7684\u5F15\u7528\uFF0C\u7136\u540E\u5728\u7EC4\u4EF6\u6302\u8F7D\u65F6\u4F7F\u7528 ",(0,s.jsx)(n.code,{children:"addEventListener"})," \u65B9\u6CD5\u7ED1\u5B9A ",(0,s.jsx)(n.code,{children:"mousedown"})," \u4E8B\u4EF6\uFF0C\u6700\u540E\u5728\u4E8B\u4EF6\u5904\u7406\u51FD\u6570\u4E2D\u5224\u65AD\u9F20\u6807\u70B9\u51FB\u7684\u4F4D\u7F6E\u662F\u5426\u5728\u4E0B\u62C9\u7EC4\u4EF6\u5185\uFF0C\u5982\u679C\u4E0D\u5728\uFF0C\u5219\u5173\u95ED\u4E0B\u62C9\u7EC4\u4EF6\u3002"]}),"\n"]}),"\n",(0,s.jsx)(n.p,{children:"\u793A\u4F8B\u4EE3\u7801\u5982\u4E0B\uFF1A"}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-jsx",children:"import { useRef, useState, useEffect } from 'react';\n\nfunction Dropdown() {\n const [isOpen, setIsOpen] = useState(false);\n const dropdownRef = useRef(null);\n\n useEffect(() => {\n function handleClickOutside(event) {\n if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {\n setIsOpen(false);\n }\n }\n\n document.addEventListener('mousedown', handleClickOutside);\n return () => {\n document.removeEventListener('mousedown', handleClickOutside);\n };\n }, [dropdownRef]);\n\n return (\n <div ref={dropdownRef}>\n <button onClick={() => setIsOpen(!isOpen)}>Toggle Dropdown</button>\n {isOpen && (\n <ul>\n <li>Option 1</li>\n <li>Option 2</li>\n <li>Option 3</li>\n </ul>\n )}\n </div>\n );\n}\n"})}),"\n",(0,s.jsx)(n.p,{children:"\u8FD9\u79CD\u65B9\u6CD5\u53EF\u4EE5\u5728\u7EC4\u4EF6\u5185\u90E8\u5904\u7406\u70B9\u51FB\u4E8B\u4EF6\uFF0C\u4E0D\u9700\u8981\u5C06\u4E8B\u4EF6\u5904\u7406\u51FD\u6570\u4F20\u9012\u7ED9\u7236\u7EC4\u4EF6\u3002\u4F46\u662F\u76F8\u5BF9\u800C\u8A00\u4EE3\u7801\u4F1A\u6BD4\u8F83\u7E41\u7410\uFF0C\u9700\u8981\u624B\u52A8\u5904\u7406\u4E8B\u4EF6\u7ED1\u5B9A\u548C\u89E3\u7ED1\u3002"}),"\n",(0,s.jsx)(n.h2,{id:"redux-\u65E5\u5FD7\u8BB0\u5F55\u63D2\u4EF6",children:"redux \u65E5\u5FD7\u8BB0\u5F55\u63D2\u4EF6"}),"\n",(0,s.jsxs)(n.ol,{children:["\n",(0,s.jsx)(n.li,{children:"\u521B\u5EFA\u65E5\u5FD7\u63D2\u4EF6\u51FD\u6570\uFF1A"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"const loggerMiddleware = (store) => (next) => (action) => {\n  console.log('prev state', store.getState())\n  console.log('action', action)\n  const result = next(action)\n  console.log('next state', store.getState())\n  return result\n}\n"})}),"\n",(0,s.jsxs)(n.p,{children:["\u8FD9\u4E2A\u51FD\u6570\u63A5\u6536\u4E00\u4E2A Redux store \u5BF9\u8C61\uFF0C\u8FD4\u56DE\u4E00\u4E2A\u4E2D\u95F4\u4EF6\u51FD\u6570\u3002\u8FD9\u4E2A\u4E2D\u95F4\u4EF6\u51FD\u6570\u63A5\u6536\u4E0B\u4E00\u4E2A\u4E2D\u95F4\u4EF6\u7684\u8C03\u7528\u51FD\u6570",(0,s.jsx)(n.code,{children:"next"}),"\u548C\u5F53\u524D\u7684\u52A8\u4F5C",(0,s.jsx)(n.code,{children:"action"}),"\u3002"]}),"\n",(0,s.jsxs)(n.ol,{start:"2",children:["\n",(0,s.jsx)(n.li,{children:"\u5C06\u65E5\u5FD7\u63D2\u4EF6\u6DFB\u52A0\u5230 Redux store\uFF1A"}),"\n"]}),"\n",(0,s.jsx)(n.pre,{children:(0,s.jsx)(n.code,{className:"language-js",children:"import { createStore, applyMiddleware } from 'redux'\nimport rootReducer from './reducers'\nimport loggerMiddleware from './loggerMiddleware'\n\nconst store = createStore(rootReducer, applyMiddleware(loggerMiddleware))\n"})}),"\n",(0,s.jsxs)(n.p,{children:["\u5728\u521B\u5EFA Redux store \u7684\u65F6\u5019\uFF0C\u4F7F\u7528",(0,s.jsx)(n.code,{children:"applyMiddleware"}),"\u51FD\u6570\u5C06\u65E5\u5FD7\u63D2\u4EF6\u4E2D\u95F4\u4EF6\u6DFB\u52A0\u5230 store \u4E2D\u3002"]}),"\n",(0,s.jsx)(n.p,{children:"\u8FD9\u6837\uFF0C\u6BCF\u5F53\u6709\u52A8\u4F5C\u88AB\u6D3E\u53D1\u65F6\uFF0C\u65E5\u5FD7\u63D2\u4EF6\u5C31\u4F1A\u5728\u63A7\u5236\u53F0\u6253\u5370\u51FA\u5F53\u524D\u7684\u72B6\u6001\u3001\u52A8\u4F5C\u548C\u4E0B\u4E00\u4E2A\u72B6\u6001\uFF0C\u4ECE\u800C\u5B9E\u73B0\u8BB0\u5F55\u72B6\u6001\u53D8\u66F4\u7684\u76EE\u7684\u3002"})]})}function u(e={}){let{wrapper:n}={...(0,o.a)(),...e.components};return n?(0,s.jsx)(n,{...e,children:(0,s.jsx)(a,{...e})}):a(e)}},715:function(e,n,t){t.d(n,{Z:function(){return i},a:function(){return d}});var r=t(1699);let s={},o=r.createContext(s);function d(e){let n=r.useContext(o);return r.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function i(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(s):e.components||s:d(e.components),r.createElement(o.Provider,{value:n},e.children)}}}]);