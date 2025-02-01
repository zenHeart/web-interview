"use strict";(self.webpackChunkweb_interview=self.webpackChunkweb_interview||[]).push([["1665"],{6754:function(e,n,s){s.r(n),s.d(n,{default:()=>h,frontMatter:()=>r,metadata:()=>c,assets:()=>d,toc:()=>t,contentTitle:()=>o});var c=JSON.parse('{"id":"js/operator","title":"\u64CD\u4F5C\u7B26","description":"== \u548C === \u533A\u522B","source":"@site/docs/01.js/02-operator.md","sourceDirName":"01.js","slug":"/js/operator","permalink":"/web-interview/docs/js/operator","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":2,"frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"\u7C7B\u578B","permalink":"/web-interview/docs/js/type"},"next":{"title":"\u51FD\u6570","permalink":"/web-interview/docs/js/function"}}'),i=s("6773"),l=s("715");let r={},o="\u64CD\u4F5C\u7B26",d={},t=[{value:"== \u548C === \u533A\u522B",id:"p0-operator-equal",level:2},{value:"typeof",id:"typeof",level:2},{value:"\u64CD\u4F5C\u7B26\u4F18\u5148\u7EA7",id:"p2-operator-priority",level:2},{value:"\u8FDE\u7EED\u8D4B\u503C",id:"\u8FDE\u7EED\u8D4B\u503C",level:2},{value:"Object.is \u4E0E\u5168\u7B49\u8FD0\u7B97\u7B26(===)\u6709\u4F55\u533A\u522B",id:"p2-object-is",level:2},{value:"in",id:"p0-in",level:2},{value:"new",id:"p0-new",level:2},{value:"Object.is() \u4E0E\u6BD4\u8F83\u64CD\u4F5C\u7B26 \u201C===\u201D\u3001\u201C==\u201D \u6709\u4EC0\u4E48\u533A\u522B",id:"objectis-\u4E0E\u6BD4\u8F83\u64CD\u4F5C\u7B26--\u6709\u4EC0\u4E48\u533A\u522B",level:2}];function j(e){let n={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,l.a)(),...e.components};return(0,i.jsxs)(i.Fragment,{children:[(0,i.jsx)(n.header,{children:(0,i.jsx)(n.h1,{id:"\u64CD\u4F5C\u7B26",children:"\u64CD\u4F5C\u7B26"})}),"\n",(0,i.jsx)(n.h2,{id:"p0-operator-equal",children:"== \u548C === \u533A\u522B"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"=="})," \u548C ",(0,i.jsx)(n.code,{children:"==="})," \u7B49\u53F7\u7684\u533A\u522B\u5728\u4E8E, ",(0,i.jsx)(n.code,{children:"=="})," \u5F53\u6BD4\u5BF9\u7684\u503C\u7C7B\u578B\u4E0D\u540C\u65F6\u4F1A\u53D1\u751F\u7C7B\u578B\u8F6C\u6362\u3002\u8BB0\u4F4F\u5982\u4E0B\u6838\u5FC3\u70B9"]}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\u76F8\u540C\u7C7B\u578B\u6BD4\u8F83\u5219\u89C4\u5219\u540C ",(0,i.jsx)(n.code,{children:"==="})]}),"\n",(0,i.jsx)(n.li,{children:"\u4E0D\u540C\u57FA\u7840\u7C7B\u578B\u4E4B\u95F4\u7684\u6BD4\u8F83,\u6700\u7EC8\u4F1A\u9000\u5316\u4E3A\u6570\u503C\u6BD4\u8F83(\u4E0D\u8003\u8651 Symbol)"}),"\n",(0,i.jsxs)(n.li,{children:["\u57FA\u7840\u7C7B\u578B\u540C\u5BF9\u8C61\u7684\u6BD4\u8F83\u4F1A\u9000\u5316\u4E3A,\u57FA\u7840\u7C7B\u578B\u540C,",(0,i.jsx)(n.code,{children:"ToPrimitive(\u5BF9\u8C61)"}),"\u7684\u6BD4\u8F83,",(0,i.jsx)(n.code,{children:"ToPrimitive"})," \u5219\u4F1A\u6267\u884C\u5982\u4E0B\u64CD\u4F5C","\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\u5148\u91C7\u7528 ",(0,i.jsx)(n.code,{children:"valueOf"})," \u8FD4\u56DE\u503C"]}),"\n",(0,i.jsxs)(n.li,{children:["\u82E5\u65E0\u7ED3\u679C\u91C7\u7528 ",(0,i.jsx)(n.code,{children:"toString"})," \u8FD4\u56DE\u503C"]}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["\u53C2\u770B ",(0,i.jsx)(n.a,{href:"https://tc39.es/ecma262/#sec-abstract-equality-comparison",children:"ECMAScript == \u89C4\u8303"})," \u8BE6\u7EC6\u6BD4\u5BF9\u6B65\u9AA4\u5982\u4E0B,\u5047\u8BBE\u6BD4\u5BF9\u4E3A ",(0,i.jsx)(n.code,{children:"x == y"})]}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["x,y \u7C7B\u578B\u76F8\u540C\u5219\u6BD4\u8F83\u7ED3\u679C\u540C ",(0,i.jsx)(n.code,{children:"x === y"})]}),"\n",(0,i.jsxs)(n.li,{children:["x,y \u4E3A ",(0,i.jsx)(n.code,{children:"null == undefined"})," \u6216 ",(0,i.jsx)(n.code,{children:"undefined == null"})," \u65F6\u8FD4\u56DE true"]}),"\n",(0,i.jsxs)(n.li,{children:["x \u4E3A Number \u7C7B\u578B,y \u4E3A\u5B57\u7B26\u4E32 \u7ED3\u679C\u540C ",(0,i.jsx)(n.code,{children:"x == ToNumber(y)"})]}),"\n",(0,i.jsxs)(n.li,{children:["x \u4E3A\u5B57\u7B26\u4E32,y \u4E3A Number \u7C7B\u578B,\u7ED3\u679C\u540C ",(0,i.jsx)(n.code,{children:"ToNumber(x) == y"})]}),"\n",(0,i.jsxs)(n.li,{children:["x \u4E3A BigInt,y \u4E3A\u5B57\u7B26\u4E32,\u7ED3\u679C\u4E3A ",(0,i.jsx)(n.code,{children:"x == StringToBigInt(y)"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u5982\u679C x \u4E3A\u5B57\u7B26\u4E32,y \u4E3A BigInt,\u7ED3\u679C\u4E3A ",(0,i.jsx)(n.code,{children:"y == x"})," \u7136\u540E\u91C7\u7528\u7B2C\u4E94\u6B65\u8FDB\u884C\u6BD4\u8F83"]}),"\n",(0,i.jsxs)(n.li,{children:["\u5982\u679C x \u4E3A Boolean,\u5219\u91C7\u7528 ",(0,i.jsx)(n.code,{children:"ToNumber(x) == y"})," \u6BD4\u8F83"]}),"\n",(0,i.jsxs)(n.li,{children:["\u5982\u679C y \u4E3A Boolean \u5219\u8F6C\u6362\u4E3A ",(0,i.jsx)(n.code,{children:"x == ToNumber(y)"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u5982\u679C x \u4E3A String,Number,BigInt,Symbol,y \u4E3A\u5BF9\u8C61 ",(0,i.jsx)(n.code,{children:"x == ToPrimitive(y)"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u5982\u679C x \u4E3A\u5BF9\u8C61,\u6709 \u4E3A String,Number,BigInt,Symbol \u5219\u8F6C\u6362\u4E3A ",(0,i.jsx)(n.code,{children:"ToPrimitive(x) == y"})]}),"\n",(0,i.jsxs)(n.li,{children:["\u5982\u679C x \u4E3A BigInt ,y \u4E3A Number","\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"x \u548C y \u4E2D\u4EFB\u610F\u503C\u4E3A NaN \u8FD4\u56DE false"}),"\n",(0,i.jsx)(n.li,{children:"\u6BD4\u8F83\u4E24\u8005\u6570\u503C\u76F8\u540C\u8FD4\u56DE true \u4E0D\u540C\u8FD4\u56DE false"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://tc39.github.io/ecma262/#sec-abstract-equality-comparison",children:"\u62BD\u8C61\u6BD4\u8F83"})}),"\n",(0,i.jsx)(n.li,{children:(0,i.jsx)(n.a,{href:"https://tc39.github.io/ecma262/#sec-strict-equality-comparison",children:"\u4E25\u683C\u6BD4\u8F83"})}),"\n"]}),"\n",(0,i.jsx)(n.h2,{id:"typeof",children:"typeof"}),"\n",(0,i.jsx)(n.p,{children:"\u5728JavaScript\u4E2D\uFF0Ctypeof\u548Cinstanceof\u662F\u4E24\u4E2A\u7528\u4E8E\u68C0\u67E5\u53D8\u91CF\u7C7B\u578B\u7684\u64CD\u4F5C\u7B26\uFF0C\u4F46\u5B83\u4EEC\u5177\u6709\u4E0D\u540C\u7684\u7528\u9014\u548C\u533A\u522B\u3002"}),"\n",(0,i.jsx)(n.p,{children:"typeof\u662F\u4E00\u4E2A\u4E00\u5143\u64CD\u4F5C\u7B26\uFF0C\u7528\u4E8E\u786E\u5B9A\u7ED9\u5B9A\u53D8\u91CF\u7684\u6570\u636E\u7C7B\u578B\u3002\u5B83\u8FD4\u56DE\u4E00\u4E2A\u5B57\u7B26\u4E32\uFF0C\u8868\u793A\u53D8\u91CF\u7684\u6570\u636E\u7C7B\u578B\u3002typeof\u53EF\u4EE5\u7528\u4E8E\u4EFB\u4F55\u53D8\u91CF\uFF0C\u5305\u62EC\u57FA\u672C\u6570\u636E\u7C7B\u578B\uFF08\u5982\u5B57\u7B26\u4E32\u3001\u6570\u5B57\u3001\u5E03\u5C14\u503C\uFF09\u548C\u5F15\u7528\u6570\u636E\u7C7B\u578B\uFF08\u5982\u5BF9\u8C61\u3001\u6570\u7EC4\u3001\u51FD\u6570\u7B49\uFF09\u3002"}),"\n",(0,i.jsx)(n.p,{children:"\u4F8B\u5982\uFF1A"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:'typeof 42 // "number"\ntypeof \'Hello\' // "string"\ntypeof true // "boolean"\ntypeof undefined // "undefined"\ntypeof null // "object"\ntypeof [1, 2, 3] // "object"\ntypeof { name: \'John\', age: 30 } // "object"\ntypeof function () {\n  // nop\n} // "function"\n'})}),"\n",(0,i.jsx)(n.p,{children:'\u6CE8\u610F\uFF0Ctypeof null\u8FD4\u56DE\u7684\u662F"object"\uFF0C\u8FD9\u662F\u4E00\u4E2A\u5386\u53F2\u9057\u7559\u95EE\u9898\u3002'}),"\n",(0,i.jsx)(n.p,{children:"instanceof\u662F\u4E00\u4E2A\u4E8C\u5143\u64CD\u4F5C\u7B26\uFF0C\u7528\u4E8E\u68C0\u67E5\u5BF9\u8C61\u662F\u5426\u5C5E\u4E8E\u6307\u5B9A\u7684\u6784\u9020\u51FD\u6570\u7684\u5B9E\u4F8B\u3002\u5B83\u8FD4\u56DE\u4E00\u4E2A\u5E03\u5C14\u503C\uFF0C\u8868\u793A\u5BF9\u8C61\u662F\u5426\u662F\u7279\u5B9A\u6784\u9020\u51FD\u6570\u7684\u5B9E\u4F8B\u6216\u5176\u5B50\u7C7B\u7684\u5B9E\u4F8B\u3002"}),"\n",(0,i.jsx)(n.p,{children:"\u4F8B\u5982\uFF1A"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-ts",children:"const arr = [1, 2, 3]\narr instanceof Array // true\n\nconst obj = { name: 'John', age: 30 }\nobj instanceof Object // true\n\nfunction Person (name) {\n  this.name = name\n}\nconst john = new Person('John')\njohn instanceof Person // true\n"})}),"\n",(0,i.jsx)(n.p,{children:"typeof\u7528\u4E8E\u786E\u5B9A\u53D8\u91CF\u7684\u6570\u636E\u7C7B\u578B\uFF0C\u800Cinstanceof\u7528\u4E8E\u786E\u5B9A\u5BF9\u8C61\u662F\u5426\u4E3A\u67D0\u4E2A\u6784\u9020\u51FD\u6570\u7684\u5B9E\u4F8B\u3002\u867D\u7136typeof\u53EF\u4EE5\u68C0\u67E5\u57FA\u672C\u6570\u636E\u7C7B\u578B\u548C\u5F15\u7528\u6570\u636E\u7C7B\u578B\uFF0C\u4F46\u65E0\u6CD5\u68C0\u67E5\u5BF9\u8C61\u7684\u5177\u4F53\u7C7B\u578B\u3002\u800Cinstanceof\u53EF\u4EE5\u5728\u5BF9\u8C61\u7684\u7EE7\u627F\u94FE\u4E0A\u8FDB\u884C\u68C0\u67E5\uFF0C\u53EF\u4EE5\u660E\u786E\u5BF9\u8C61\u662F\u5426\u4E3A\u67D0\u4E2A\u7C7B\u7684\u5B9E\u4F8B\u6216\u5176\u5B50\u7C7B\u7684\u5B9E\u4F8B\u3002"}),"\n",(0,i.jsx)(n.h2,{id:"p2-operator-priority",children:"\u64CD\u4F5C\u7B26\u4F18\u5148\u7EA7"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"console.log(1 < 2 < 3)\nconsole.log(3 > 2 > 1)\n"})}),"\n",(0,i.jsx)(n.h2,{id:"\u8FDE\u7EED\u8D4B\u503C",children:"\u8FDE\u7EED\u8D4B\u503C"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"(function () {\n  const a = b = 3\n})()\n\nconsole.log('a defined? ' + (typeof a !== 'undefined'))\nconsole.log('b defined? ' + (typeof b !== 'undefined'))\n"})}),"\n",(0,i.jsx)(n.h2,{id:"p2-object-is",children:"Object.is \u4E0E\u5168\u7B49\u8FD0\u7B97\u7B26(===)\u6709\u4F55\u533A\u522B"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"Object.is()"}),"\u4E0E\u5168\u7B49\u8FD0\u7B97\u7B26\uFF08",(0,i.jsx)(n.code,{children:"==="}),"\uFF09\u90FD\u7528\u4E8E\u6BD4\u8F83\u4E24\u4E2A\u503C\u662F\u5426\u76F8\u7B49\uFF0C\u4F46\u5B83\u4EEC\u4E4B\u95F4\u5B58\u5728\u4E00\u4E9B\u533A\u522B\uFF1A"]}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"\u4E00\u3001\u5BF9\u7279\u6B8A\u503C\u7684\u5904\u7406"})}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"NaN"}),"\u7684\u6BD4\u8F83\uFF1A"]}),"\n"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"==="}),"\u8BA4\u4E3A",(0,i.jsx)(n.code,{children:"NaN"}),"\u4E0D\u7B49\u4E8E\u4EFB\u4F55\u503C\uFF0C\u5305\u62EC\u5B83\u81EA\u8EAB\u3002"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"Object.is()"}),"\u8BA4\u4E3A",(0,i.jsx)(n.code,{children:"NaN"}),"\u53EA\u7B49\u4E8E",(0,i.jsx)(n.code,{children:"NaN"}),"\u3002"]}),"\n",(0,i.jsx)(n.li,{children:"\u4F8B\u5982\uFF1A"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"// eslint-disable-next-line\nconsole.log(NaN === NaN) // false\nconsole.log(Object.is(NaN, NaN)) // true\n"})}),"\n",(0,i.jsxs)(n.ol,{start:"2",children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"-0"}),"\u548C",(0,i.jsx)(n.code,{children:"+0"}),"\u7684\u6BD4\u8F83\uFF1A"]}),"\n"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"==="}),"\u8BA4\u4E3A",(0,i.jsx)(n.code,{children:"-0"}),"\u548C",(0,i.jsx)(n.code,{children:"+0"}),"\u662F\u76F8\u7B49\u7684\u3002"]}),"\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"Object.is()"}),"\u53EF\u4EE5\u533A\u5206",(0,i.jsx)(n.code,{children:"-0"}),"\u548C",(0,i.jsx)(n.code,{children:"+0"}),"\u3002"]}),"\n",(0,i.jsx)(n.li,{children:"\u4F8B\u5982\uFF1A"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"// eslint-disable-next-line\nconsole.log(+0 === -0) // true\nconsole.log(Object.is(-0, +0)) // false\n"})}),"\n",(0,i.jsx)(n.p,{children:(0,i.jsx)(n.strong,{children:"\u4E8C\u3001\u4E00\u822C\u503C\u7684\u6BD4\u8F83"})}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\u5BF9\u4E8E\u5176\u4ED6\u503C\u7684\u6BD4\u8F83\uFF0C",(0,i.jsx)(n.code,{children:"Object.is()"}),"\u548C",(0,i.jsx)(n.code,{children:"==="}),"\u7684\u884C\u4E3A\u7C7B\u4F3C\uFF1A"]}),"\n"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsx)(n.li,{children:"\u6BD4\u8F83\u4E24\u4E2A\u6570\u5B57\u3001\u5B57\u7B26\u4E32\u3001\u5E03\u5C14\u503C\u3001\u5BF9\u8C61\u7B49\uFF0C\u5982\u679C\u5B83\u4EEC\u7684\u503C\u548C\u7C7B\u578B\u90FD\u76F8\u540C\uFF0C\u5219\u8BA4\u4E3A\u5B83\u4EEC\u76F8\u7B49\u3002"}),"\n",(0,i.jsx)(n.li,{children:"\u4F8B\u5982\uFF1A"}),"\n"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"// eslint-disable-next-line\nconsole.log(5 === 5) // true\nconsole.log(Object.is(5, 5)) // true\n\nconst obj1 = { a: 1 }\nconst obj2 = { a: 1 }\n// eslint-disable-next-line\nconsole.log(obj1 === obj1) // true\nconsole.log(obj1 === obj2) // false\nconsole.log(Object.is(obj1, obj1)) // true\nconsole.log(Object.is(obj1, obj2)) // false\n"})}),"\n",(0,i.jsx)(n.h2,{id:"p0-in",children:"in"}),"\n",(0,i.jsxs)(n.p,{children:["\u5728 TypeScript \u4E2D\uFF0C",(0,i.jsx)(n.code,{children:"in"})," \u662F\u4E00\u4E2A\u8FD0\u7B97\u7B26\uFF0C\u7528\u4E8E\u68C0\u67E5\u5BF9\u8C61\u662F\u5426\u5177\u6709\u6307\u5B9A\u7684\u5C5E\u6027\u6216\u8005\u7C7B\u5B9E\u4F8B\u662F\u5426\u5B9E\u73B0\u4E86\u6307\u5B9A\u7684\u63A5\u53E3\u3002"]}),"\n",(0,i.jsxs)(n.p,{children:["\u5BF9\u4E8E\u5BF9\u8C61\u7C7B\u578B\uFF0C",(0,i.jsx)(n.code,{children:"in"})," \u8FD0\u7B97\u7B26\u53EF\u4EE5\u7528\u6765\u68C0\u67E5\u5BF9\u8C61\u662F\u5426\u5177\u6709\u67D0\u4E2A\u5C5E\u6027\u3002\u8BED\u6CD5\u4E3A ",(0,i.jsx)(n.code,{children:"property in object"}),"\uFF0C\u5176\u4E2D ",(0,i.jsx)(n.code,{children:"property"})," \u662F\u4E00\u4E2A\u5B57\u7B26\u4E32\uFF0C",(0,i.jsx)(n.code,{children:"object"})," \u662F\u4E00\u4E2A\u5BF9\u8C61\u3002"]}),"\n",(0,i.jsx)(n.p,{children:"\u793A\u4F8B\uFF1A"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"interface Person {\n name: string;\n age: number;\n}\n\nfunction printPersonInfo (person: Person) {\n  if ('name' in person) {\n    console.log('Name:', person.name)\n  }\n  if ('age' in person) {\n    console.log('Age:', person.age)\n  }\n}\n\nconst person = { name: 'Alice', age: 25 }\nprintPersonInfo(person) // \u8F93\u51FA: Name: Alice, Age: 25\n"})}),"\n",(0,i.jsxs)(n.p,{children:["\u5728\u4E0A\u8FF0\u793A\u4F8B\u4E2D\uFF0C\u6211\u4EEC\u5B9A\u4E49\u4E86\u4E00\u4E2A\u63A5\u53E3 ",(0,i.jsx)(n.code,{children:"Person"}),"\uFF0C\u5177\u6709 ",(0,i.jsx)(n.code,{children:"name"})," \u548C ",(0,i.jsx)(n.code,{children:"age"})," \u4E24\u4E2A\u5C5E\u6027\u3002\u7136\u540E\u5B9A\u4E49\u4E86\u4E00\u4E2A\u51FD\u6570 ",(0,i.jsx)(n.code,{children:"printPersonInfo"}),"\uFF0C\u5B83\u63A5\u6536\u4E00\u4E2A\u53C2\u6570 ",(0,i.jsx)(n.code,{children:"person"}),"\uFF0C\u7C7B\u578B\u4E3A ",(0,i.jsx)(n.code,{children:"Person"}),"\u3002\u5728\u51FD\u6570\u5185\u90E8\uFF0C\u6211\u4EEC\u4F7F\u7528 ",(0,i.jsx)(n.code,{children:"in"})," \u8FD0\u7B97\u7B26\u68C0\u67E5 ",(0,i.jsx)(n.code,{children:"person"})," \u5BF9\u8C61\u662F\u5426\u5177\u6709 ",(0,i.jsx)(n.code,{children:"name"})," \u548C ",(0,i.jsx)(n.code,{children:"age"})," \u5C5E\u6027\uFF0C\u5982\u679C\u6709\u5219\u6253\u5370\u5BF9\u5E94\u7684\u503C\u3002"]}),"\n",(0,i.jsxs)(n.p,{children:["\u5BF9\u4E8E\u7C7B\u7C7B\u578B\uFF0C",(0,i.jsx)(n.code,{children:"in"})," \u8FD0\u7B97\u7B26\u53EF\u4EE5\u7528\u6765\u68C0\u67E5\u7C7B\u7684\u5B9E\u4F8B\u662F\u5426\u5B9E\u73B0\u4E86\u6307\u5B9A\u7684\u63A5\u53E3\u3002\u8BED\u6CD5\u4E3A ",(0,i.jsx)(n.code,{children:"interfaceName in object"}),"\uFF0C\u5176\u4E2D ",(0,i.jsx)(n.code,{children:"interfaceName"})," \u662F\u4E00\u4E2A\u63A5\u53E3\u540D\u5B57\uFF0C",(0,i.jsx)(n.code,{children:"object"})," \u662F\u4E00\u4E2A\u5BF9\u8C61\u6216\u7C7B\u7684\u5B9E\u4F8B\u3002"]}),"\n",(0,i.jsx)(n.p,{children:"\u793A\u4F8B\uFF1A"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-typescript",children:"interface Printable {\n print(): void;\n}\n\nclass MyClass implements Printable {\n  print () {\n    console.log('Printing...')\n  }\n}\n\nfunction printObjectInfo (obj: any) {\n  if ('print' in obj) {\n    obj.print()\n  }\n}\n\nconst myObj = new MyClass()\nprintObjectInfo(myObj) // \u8F93\u51FA: Printing...\n"})}),"\n",(0,i.jsxs)(n.p,{children:["\u5728\u4E0A\u8FF0\u793A\u4F8B\u4E2D\uFF0C\u6211\u4EEC\u5B9A\u4E49\u4E86\u4E00\u4E2A\u63A5\u53E3 ",(0,i.jsx)(n.code,{children:"Printable"}),"\uFF0C\u5177\u6709\u4E00\u4E2A\u65B9\u6CD5 ",(0,i.jsx)(n.code,{children:"print"}),"\u3002\u7136\u540E\u5B9A\u4E49\u4E86\u4E00\u4E2A\u7C7B ",(0,i.jsx)(n.code,{children:"MyClass"}),"\uFF0C\u5B83\u5B9E\u73B0\u4E86 ",(0,i.jsx)(n.code,{children:"Printable"})," \u63A5\u53E3\uFF0C\u5E76\u4E14\u5B9E\u73B0\u4E86 ",(0,i.jsx)(n.code,{children:"print"})," \u65B9\u6CD5\u3002\u63A5\u7740\u5B9A\u4E49\u4E86\u4E00\u4E2A\u51FD\u6570 ",(0,i.jsx)(n.code,{children:"printObjectInfo"}),"\uFF0C\u5B83\u63A5\u6536\u4E00\u4E2A\u53C2\u6570 ",(0,i.jsx)(n.code,{children:"obj"}),"\uFF0C\u7C7B\u578B\u4E3A ",(0,i.jsx)(n.code,{children:"any"}),"\u3002\u5728\u51FD\u6570\u5185\u90E8\uFF0C\u6211\u4EEC\u4F7F\u7528 ",(0,i.jsx)(n.code,{children:"in"})," \u8FD0\u7B97\u7B26\u68C0\u67E5 ",(0,i.jsx)(n.code,{children:"obj"})," \u5BF9\u8C61\u662F\u5426\u5B9E\u73B0\u4E86 ",(0,i.jsx)(n.code,{children:"Printable"})," \u63A5\u53E3\uFF0C\u5982\u679C\u662F\u5219\u8C03\u7528 ",(0,i.jsx)(n.code,{children:"print"})," \u65B9\u6CD5\u3002"]}),"\n",(0,i.jsxs)(n.p,{children:["\u603B\u7684\u6765\u8BF4\uFF0C",(0,i.jsx)(n.code,{children:"in"})," \u5173\u952E\u5B57\u5728 TypeScript \u4E2D\u7528\u4E8E\u68C0\u67E5\u5BF9\u8C61\u662F\u5426\u5177\u6709\u6307\u5B9A\u7684\u5C5E\u6027\u6216\u7C7B\u5B9E\u4F8B\u662F\u5426\u5B9E\u73B0\u4E86\u6307\u5B9A\u7684\u63A5\u53E3\u3002\u5B83\u53EF\u4EE5\u5E2E\u52A9\u6211\u4EEC\u5728\u8FD0\u884C\u65F6\u6839\u636E\u5BF9\u8C61\u7684\u5C5E\u6027\u6216\u63A5\u53E3\u7684\u5B9E\u73B0\u60C5\u51B5\u6765\u8FDB\u884C\u76F8\u5E94\u7684\u5904\u7406\u3002"]}),"\n",(0,i.jsx)(n.h2,{id:"p0-new",children:"new"}),"\n",(0,i.jsxs)(n.p,{children:["\u5728 JavaScript \u4E2D\uFF0C",(0,i.jsx)(n.code,{children:"new"})," \u5173\u952E\u5B57\u7528\u4E8E\u521B\u5EFA\u4E00\u4E2A\u5BF9\u8C61\u5B9E\u4F8B\u3002\u5F53\u4F7F\u7528 ",(0,i.jsx)(n.code,{children:"new"})," \u5173\u952E\u5B57\u521B\u5EFA\u5BF9\u8C61\u65F6\uFF0C\u4F1A\u53D1\u751F\u4EE5\u4E0B\u51E0\u4E2A\u6B65\u9AA4\uFF1A"]}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsx)(n.li,{children:"\u521B\u5EFA\u4E00\u4E2A\u7A7A\u7684\u5BF9\u8C61\u3002"}),"\n",(0,i.jsxs)(n.li,{children:["\u5C06\u8FD9\u4E2A\u7A7A\u5BF9\u8C61\u7684 ",(0,i.jsx)(n.code,{children:"[[Prototype]]"})," \u5C5E\u6027\u8BBE\u7F6E\u4E3A\u6784\u9020\u51FD\u6570\u7684 ",(0,i.jsx)(n.code,{children:"prototype"})," \u5C5E\u6027\u3002"]}),"\n",(0,i.jsxs)(n.li,{children:["\u5C06\u8FD9\u4E2A\u7A7A\u5BF9\u8C61\u8D4B\u503C\u7ED9\u6784\u9020\u51FD\u6570\u5185\u90E8\u7684 ",(0,i.jsx)(n.code,{children:"this"})," \u5173\u952E\u5B57\uFF0C\u7528\u4E8E\u521D\u59CB\u5316\u5C5E\u6027\u548C\u65B9\u6CD5\u3002"]}),"\n",(0,i.jsx)(n.li,{children:"\u5982\u679C\u6784\u9020\u51FD\u6570\u8FD4\u56DE\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u90A3\u4E48\u8FD4\u56DE\u8FD9\u4E2A\u5BF9\u8C61\uFF1B\u5426\u5219\uFF0C\u8FD4\u56DE\u7B2C\u4E00\u6B65\u521B\u5EFA\u7684\u5BF9\u8C61\u5B9E\u4F8B\u3002"}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["\u4EE5\u4E0B\u662F\u4E00\u4E2A\u793A\u4F8B\uFF0C\u6F14\u793A\u5982\u4F55\u4F7F\u7528 ",(0,i.jsx)(n.code,{children:"new"})," \u5173\u952E\u5B57\u521B\u5EFA\u4E00\u4E2A\u5BF9\u8C61\u5B9E\u4F8B\uFF1A"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"function Person (name, age) {\n  this.name = name\n  this.age = age\n}\n\nconst person = new Person('John', 30)\nconsole.log(person.name) // \"John\"\nconsole.log(person.age) // 30\n"})}),"\n",(0,i.jsxs)(n.p,{children:["\u5728\u4E0A\u9762\u7684\u793A\u4F8B\u4E2D\uFF0C",(0,i.jsx)(n.code,{children:'new Person("John", 30)'})," \u4F1A\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u5BF9\u8C61\u5B9E\u4F8B\u3002\u5728\u6784\u9020\u51FD\u6570 ",(0,i.jsx)(n.code,{children:"Person"})," \u4E2D\uFF0C",(0,i.jsx)(n.code,{children:"this.name"})," \u548C ",(0,i.jsx)(n.code,{children:"this.age"})," \u4F1A\u88AB\u8D4B\u503C\u4E3A ",(0,i.jsx)(n.code,{children:'"John"'})," \u548C ",(0,i.jsx)(n.code,{children:"30"}),"\u3002\u6700\u7EC8\uFF0C",(0,i.jsx)(n.code,{children:"new"})," \u5173\u952E\u5B57\u4F1A\u8FD4\u56DE\u8FD9\u4E2A\u65B0\u7684\u5BF9\u8C61\u5B9E\u4F8B\u3002"]}),"\n",(0,i.jsxs)(n.p,{children:["\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0C\u5728 JavaScript \u4E2D\uFF0C\u51FD\u6570\u4E5F\u662F\u5BF9\u8C61\u3002\u56E0\u6B64\uFF0C\u6211\u4EEC\u53EF\u4EE5\u5411\u5BF9\u8C61\u4E00\u6837\u5B9A\u4E49\u5C5E\u6027\u548C\u65B9\u6CD5\u3002\u5F53\u6211\u4EEC\u4F7F\u7528 ",(0,i.jsx)(n.code,{children:"new"})," \u5173\u952E\u5B57\u8C03\u7528\u4E00\u4E2A\u51FD\u6570\u65F6\uFF0C\u8FD9\u4E2A\u51FD\u6570\u4F1A\u88AB\u89C6\u4E3A\u6784\u9020\u51FD\u6570\uFF0C\u4ECE\u800C\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u5BF9\u8C61\u5B9E\u4F8B\u3002"]}),"\n",(0,i.jsxs)(n.p,{children:["ES5 \u548C ES6 \u4F7F\u7528 ",(0,i.jsx)(n.code,{children:"new"})," \u5173\u952E\u5B57\u5B9E\u4F8B\u5316\u5BF9\u8C61\u7684\u6D41\u7A0B\u57FA\u672C\u4E0A\u662F\u4E00\u6837\u7684\uFF0C\u53EA\u662F\u5728\u7EC6\u8282\u4E0A\u5B58\u5728\u4E00\u4E9B\u5DEE\u5F02\u3002"]}),"\n",(0,i.jsxs)(n.p,{children:["\u5728 ES5 \u4E2D\uFF0C\u5F53\u4F7F\u7528 ",(0,i.jsx)(n.code,{children:"new"})," \u5173\u952E\u5B57\u8C03\u7528\u4E00\u4E2A\u51FD\u6570\u65F6\uFF0C\u4F1A\u521B\u5EFA\u4E00\u4E2A\u65B0\u7684\u5BF9\u8C61\uFF0C\u5E76\u5C06\u8FD9\u4E2A\u65B0\u5BF9\u8C61\u7684 ",(0,i.jsx)(n.code,{children:"[[Prototype]]"})," \u5C5E\u6027\u6307\u5411\u6784\u9020\u51FD\u6570\u7684 ",(0,i.jsx)(n.code,{children:"prototype"})," \u5C5E\u6027\u3002\u6B64\u5916\uFF0C",(0,i.jsx)(n.code,{children:"new"})," \u5173\u952E\u5B57\u8FD8\u4F1A\u5C06\u6784\u9020\u51FD\u6570\u5185\u90E8\u7684 ",(0,i.jsx)(n.code,{children:"this"})," \u5173\u952E\u5B57\u7ED1\u5B9A\u5230\u65B0\u521B\u5EFA\u7684\u5BF9\u8C61\u4E0A\uFF0C\u4ECE\u800C\u5141\u8BB8\u6211\u4EEC\u5728\u6784\u9020\u51FD\u6570\u5185\u90E8\u6DFB\u52A0\u5C5E\u6027\u548C\u65B9\u6CD5\u3002"]}),"\n",(0,i.jsxs)(n.p,{children:["\u5728 ES6 \u4E2D\uFF0C\u8FD9\u4E9B\u57FA\u672C\u7684\u6D41\u7A0B\u4E5F\u662F\u76F8\u540C\u7684\u3002\u4F46\u662F\uFF0CES6 \u5F15\u5165\u4E86\u7C7B\uFF08class\uFF09\u7684\u6982\u5FF5\uFF0C\u4ECE\u800C\u4E3A\u9762\u5411\u5BF9\u8C61\u7F16\u7A0B\u63D0\u4F9B\u4E86\u66F4\u52A0\u4FBF\u5229\u7684\u8BED\u6CD5\u3002\u4F7F\u7528\u7C7B\u5B9A\u4E49\u4E00\u4E2A\u5BF9\u8C61\u65F6\uFF0C\u9700\u8981\u4F7F\u7528 ",(0,i.jsx)(n.code,{children:"constructor"})," \u65B9\u6CD5\u4F5C\u4E3A\u6784\u9020\u51FD\u6570\uFF0C\u800C\u4E0D\u662F\u666E\u901A\u7684\u51FD\u6570\u3002\u7C7B\u5B9A\u4E49\u7684\u8BED\u6CD5\u7CD6\u5B9E\u9645\u4E0A\u662F\u5BF9\u51FD\u6570\u7684\u5C01\u88C5\uFF0C\u4F7F\u7528 ",(0,i.jsx)(n.code,{children:"new"})," \u5173\u952E\u5B57\u521B\u5EFA\u7C7B\u7684\u5B9E\u4F8B\u65F6\uFF0C\u5B9E\u9645\u4E0A\u4E5F\u662F\u5728\u8C03\u7528\u7C7B\u7684 ",(0,i.jsx)(n.code,{children:"constructor"})," \u65B9\u6CD5\u3002"]}),"\n",(0,i.jsxs)(n.p,{children:["\u5728 ES6 \u4E2D\uFF0C\u53EF\u4EE5\u4F7F\u7528\u7C7B\u7684\u7EE7\u627F\u6765\u521B\u5EFA\u66F4\u590D\u6742\u7684\u5BF9\u8C61\u3002\u5F53\u4F7F\u7528 ",(0,i.jsx)(n.code,{children:"new"})," \u5173\u952E\u5B57\u521B\u5EFA\u4E00\u4E2A\u7EE7\u627F\u81EA\u53E6\u4E00\u4E2A\u7C7B\u7684\u7C7B\u7684\u5B9E\u4F8B\u65F6\uFF0C\u4F1A\u5148\u8C03\u7528\u7236\u7C7B\u7684 ",(0,i.jsx)(n.code,{children:"constructor"})," \u65B9\u6CD5\uFF0C\u518D\u8C03\u7528\u5B50\u7C7B\u7684 ",(0,i.jsx)(n.code,{children:"constructor"})," \u65B9\u6CD5\uFF0C\u4ECE\u800C\u5B8C\u6210\u5BF9\u8C61\u5B9E\u4F8B\u7684\u521B\u5EFA\u8FC7\u7A0B\u3002"]}),"\n",(0,i.jsx)(n.p,{children:"\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0C\u867D\u7136 ES6 \u7684\u7C7B\u770B\u8D77\u6765\u50CF\u662F\u5176\u4ED6\u9762\u5411\u5BF9\u8C61\u8BED\u8A00\u4E2D\u7684\u7C7B\uFF0C\u4F46\u5728 JavaScript \u4E2D\uFF0C\u7C7B\u4ECD\u7136\u662F\u57FA\u4E8E\u539F\u578B\u7EE7\u627F\u7684\u3002\u5728\u521B\u5EFA\u4E00\u4E2A\u7C7B\u7684\u5B9E\u4F8B\u65F6\uFF0C\u5B9E\u9645\u4E0A\u662F\u5728\u521B\u5EFA\u4E00\u4E2A\u65B0\u5BF9\u8C61\uFF0C\u5E76\u5C06\u8FD9\u4E2A\u65B0\u5BF9\u8C61\u7684\u539F\u578B\u6307\u5411\u7C7B\u7684\u539F\u578B\u3002\u56E0\u6B64\uFF0C\u5B9E\u4F8B\u5316\u5BF9\u8C61\u7684\u6D41\u7A0B\u4E0E\u4F7F\u7528\u666E\u901A\u51FD\u6570\u6216\u7C7B\u5B9A\u4E49\u7684\u5BF9\u8C61\u7684\u6D41\u7A0B\u57FA\u672C\u4E0A\u662F\u76F8\u540C\u7684\u3002"}),"\n",(0,i.jsxs)(n.p,{children:["\u53EF\u4EE5\u4F7F\u7528\u4EE5\u4E0B\u4EE3\u7801\u6765\u6A21\u62DF",(0,i.jsx)(n.code,{children:"new"}),"\u64CD\u4F5C\uFF1A"]}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"function myNew (constructor, ...args) {\n  // \u521B\u5EFA\u4E00\u4E2A\u65B0\u5BF9\u8C61\uFF0C\u8BE5\u5BF9\u8C61\u7EE7\u627F\u81EA\u6784\u9020\u51FD\u6570\u7684\u539F\u578B\n  const obj = Object.create(constructor.prototype)\n\n  // \u8C03\u7528\u6784\u9020\u51FD\u6570\uFF0C\u5E76\u5C06\u65B0\u5BF9\u8C61\u4F5C\u4E3Athis\u503C\u4F20\u9012\u8FDB\u53BB\n  const result = constructor.apply(obj, args)\n\n  // \u5982\u679C\u6784\u9020\u51FD\u6570\u8FD4\u56DE\u4E00\u4E2A\u5BF9\u8C61\uFF0C\u5219\u8FD4\u56DE\u8BE5\u5BF9\u8C61\uFF0C\u5426\u5219\u8FD4\u56DE\u65B0\u521B\u5EFA\u7684\u5BF9\u8C61\n  return typeof result === 'object' && result !== null ? result : obj\n}\n"})}),"\n",(0,i.jsx)(n.p,{children:"\u4F7F\u7528\u793A\u4F8B\uFF1A"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"function Person (name, age) {\n  this.name = name\n  this.age = age\n}\n\nPerson.prototype.sayHello = function () {\n  console.log(`Hello, my name is ${this.name} and I'm ${this.age} years old.`)\n}\n\nconst john = myNew(Person, 'John', 25)\njohn.sayHello() // \u8F93\u51FA\uFF1AHello, my name is John and I'm 25 years old.\n"})}),"\n",(0,i.jsxs)(n.p,{children:["\u5728\u4E0A\u8FF0\u4EE3\u7801\u4E2D\uFF0C",(0,i.jsx)(n.code,{children:"myNew"}),"\u51FD\u6570\u6A21\u62DF\u4E86",(0,i.jsx)(n.code,{children:"new"}),"\u64CD\u4F5C\u7684\u8FC7\u7A0B\uFF1A"]}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:["\u9996\u5148\uFF0C\u901A\u8FC7",(0,i.jsx)(n.code,{children:"Object.create"}),"\u521B\u5EFA\u4E86\u4E00\u4E2A\u65B0\u5BF9\u8C61",(0,i.jsx)(n.code,{children:"obj"}),"\uFF0C\u5E76\u5C06\u6784\u9020\u51FD\u6570\u7684\u539F\u578B\u5BF9\u8C61\u8D4B\u503C\u7ED9\u8BE5\u65B0\u5BF9\u8C61\u7684\u539F\u578B\u3002"]}),"\n",(0,i.jsxs)(n.li,{children:["\u7136\u540E\uFF0C\u4F7F\u7528",(0,i.jsx)(n.code,{children:"apply"}),"\u65B9\u6CD5\u8C03\u7528\u6784\u9020\u51FD\u6570\uFF0C\u5E76\u4F20\u5165\u65B0\u5BF9\u8C61",(0,i.jsx)(n.code,{children:"obj"}),"\u4F5C\u4E3A",(0,i.jsx)(n.code,{children:"this"}),"\u503C\uFF0C\u4EE5\u53CA\u5176\u4ED6\u53C2\u6570\u3002"]}),"\n",(0,i.jsxs)(n.li,{children:["\u6700\u540E\uFF0C\u6839\u636E\u6784\u9020\u51FD\u6570\u7684\u8FD4\u56DE\u503C\u5224\u65AD\uFF0C\u5982\u679C\u8FD4\u56DE\u7684\u662F\u4E00\u4E2A\u975E\u7A7A\u5BF9\u8C61\uFF0C\u5219\u8FD4\u56DE\u8BE5\u5BF9\u8C61\uFF1B\u5426\u5219\uFF0C\u8FD4\u56DE\u65B0\u521B\u5EFA\u7684\u5BF9\u8C61",(0,i.jsx)(n.code,{children:"obj"}),"\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.p,{children:["\u8FD9\u6837\uFF0C\u6211\u4EEC\u5C31\u53EF\u4EE5\u4F7F\u7528",(0,i.jsx)(n.code,{children:"myNew"}),"\u51FD\u6570\u6765\u6A21\u62DF",(0,i.jsx)(n.code,{children:"new"}),"\u64CD\u4F5C\u4E86\u3002"]}),"\n",(0,i.jsx)(n.h2,{id:"objectis-\u4E0E\u6BD4\u8F83\u64CD\u4F5C\u7B26--\u6709\u4EC0\u4E48\u533A\u522B",children:"Object.is() \u4E0E\u6BD4\u8F83\u64CD\u4F5C\u7B26 \u201C===\u201D\u3001\u201C==\u201D \u6709\u4EC0\u4E48\u533A\u522B"}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"Object.is()"}),' \u65B9\u6CD5\u548C\u6BD4\u8F83\u64CD\u4F5C\u7B26 "==="\u3001"==" \u7528\u4E8E\u6BD4\u8F83\u4E24\u4E2A\u503C\u7684\u76F8\u7B49\u6027\uFF0C\u4F46\u5B83\u4EEC\u5728\u6BD4\u8F83\u65B9\u5F0F\u548C\u884C\u4E3A\u4E0A\u6709\u4E00\u4E9B\u533A\u522B\u3002']}),"\n",(0,i.jsxs)(n.ol,{children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"Object.is()"}),' \u65B9\u6CD5\u662F\u4E25\u683C\u76F8\u7B49\u6BD4\u8F83\uFF0C\u800C "===" \u64CD\u4F5C\u7B26\u4E5F\u662F\u4E25\u683C\u76F8\u7B49\u6BD4\u8F83\uFF0C\u4F46 "==" \u64CD\u4F5C\u7B26\u662F\u76F8\u7B49\u6BD4\u8F83\u3002']}),"\n"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u4E25\u683C\u76F8\u7B49\u6BD4\u8F83\uFF08",(0,i.jsx)(n.code,{children:"==="}),"\uFF09\u8981\u6C42\u6BD4\u8F83\u7684\u4E24\u4E2A\u503C\u5728\u7C7B\u578B\u548C\u503C\u4E0A\u5B8C\u5168\u76F8\u540C\u624D\u4F1A\u8FD4\u56DE ",(0,i.jsx)(n.code,{children:"true"}),"\u3002"]}),"\n",(0,i.jsxs)(n.li,{children:["\u76F8\u7B49\u6BD4\u8F83\uFF08",(0,i.jsx)(n.code,{children:"=="}),"\uFF09\u4F1A\u8FDB\u884C\u7C7B\u578B\u8F6C\u6362\uFF0C\u5C06\u4E24\u4E2A\u503C\u8F6C\u6362\u4E3A\u76F8\u540C\u7C7B\u578B\u540E\u518D\u8FDB\u884C\u6BD4\u8F83\u3002"]}),"\n"]}),"\n",(0,i.jsxs)(n.ol,{start:"2",children:["\n",(0,i.jsxs)(n.li,{children:[(0,i.jsx)(n.code,{children:"Object.is()"})," \u65B9\u6CD5\u5BF9\u4E8E\u4E00\u4E9B\u7279\u6B8A\u7684\u503C\u6BD4\u8F83\u66F4\u51C6\u786E\uFF1A"]}),"\n"]}),"\n",(0,i.jsxs)(n.ul,{children:["\n",(0,i.jsxs)(n.li,{children:["\u5BF9\u4E8E NaN \u548C NaN \u7684\u6BD4\u8F83\uFF0C",(0,i.jsx)(n.code,{children:"Object.is(NaN, NaN)"})," \u8FD4\u56DE ",(0,i.jsx)(n.code,{children:"true"}),"\uFF0C\u800C ",(0,i.jsx)(n.code,{children:"NaN === NaN"})," \u8FD4\u56DE ",(0,i.jsx)(n.code,{children:"false"}),"\u3002"]}),"\n",(0,i.jsxs)(n.li,{children:["\u5BF9\u4E8E +0 \u548C -0 \u7684\u6BD4\u8F83\uFF0C",(0,i.jsx)(n.code,{children:"Object.is(+0, -0)"})," \u8FD4\u56DE ",(0,i.jsx)(n.code,{children:"false"}),"\uFF0C\u800C ",(0,i.jsx)(n.code,{children:"+0 === -0"})," \u8FD4\u56DE ",(0,i.jsx)(n.code,{children:"true"}),"\u3002"]}),"\n"]}),"\n",(0,i.jsx)(n.p,{children:"\u4E0B\u9762\u662F\u4E00\u4E9B\u793A\u4F8B\uFF1A"}),"\n",(0,i.jsx)(n.pre,{children:(0,i.jsx)(n.code,{className:"language-js",children:"console.log(Object.is(1, 1)) // true\nconsole.log(Object.is('foo', 'foo')) // true\nconsole.log(Object.is(true, true)) // true\n\nconsole.log(Object.is(null, null)) // true\nconsole.log(Object.is(undefined, undefined)) // true\n\nconsole.log(Object.is(NaN, NaN)) // true\n// eslint-disable-next-line\nconsole.log(NaN === NaN) // false\n\nconsole.log(Object.is(+0, -0)) // false\n// eslint-disable-next-line\nconsole.log(+0 === -0) // true\n\nconsole.log(Object.is({}, {})) // false\n// eslint-disable-next-line\nconsole.log({} === {}) // false\n"})}),"\n",(0,i.jsxs)(n.p,{children:[(0,i.jsx)(n.code,{children:"Object.is()"}),' \u65B9\u6CD5\u66F4\u7CBE\u786E\u5730\u6BD4\u8F83\u4E24\u4E2A\u503C\u7684\u76F8\u7B49\u6027\uFF0C\u5C24\u5176\u662F\u5728\u5904\u7406\u4E00\u4E9B\u7279\u6B8A\u7684\u503C\u65F6\uFF0C\u800C "===" \u64CD\u4F5C\u7B26\u548C "==" \u64CD\u4F5C\u7B26\u5219\u5177\u6709\u4E0D\u540C\u7684\u7C7B\u578B\u8F6C\u6362\u884C\u4E3A\u548C\u6BD4\u8F83\u89C4\u5219\u3002']})]})}function h(e={}){let{wrapper:n}={...(0,l.a)(),...e.components};return n?(0,i.jsx)(n,{...e,children:(0,i.jsx)(j,{...e})}):j(e)}},715:function(e,n,s){s.d(n,{Z:function(){return o},a:function(){return r}});var c=s(1699);let i={},l=c.createContext(i);function r(e){let n=c.useContext(l);return c.useMemo(function(){return"function"==typeof e?e(n):{...n,...e}},[n,e])}function o(e){let n;return n=e.disableParentContext?"function"==typeof e.components?e.components(i):e.components||i:r(e.components),c.createElement(l.Provider,{value:n},e.children)}}}]);