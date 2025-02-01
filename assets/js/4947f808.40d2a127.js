"use strict";(self.webpackChunkweb_interview=self.webpackChunkweb_interview||[]).push([["2207"],{2512:function(n,e,i){i.r(e),i.d(e,{default:()=>j,frontMatter:()=>c,metadata:()=>s,assets:()=>h,toc:()=>t,contentTitle:()=>d});var s=JSON.parse('{"id":"engineering/security","title":"\u5B89\u5168","description":"\u5E38\u89C1 web \u5B89\u5168\u95EE\u9898","source":"@site/docs/06.engineering/03-security.md","sourceDirName":"06.engineering","slug":"/engineering/security","permalink":"/web-interview/docs/engineering/security","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":3,"frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"\u6982\u5FF5","permalink":"/web-interview/docs/engineering/concept"},"next":{"title":"\u6253\u5305\u5DE5\u5177","permalink":"/web-interview/docs/engineering/bundler"}}'),l=i("6773"),r=i("715");let c={},d="\u5B89\u5168",h={},t=[{value:"\u5E38\u89C1 web \u5B89\u5168\u95EE\u9898",id:"p0-security",level:2},{value:"\u540C\u6E90\u7B56\u7565",id:"po-same-origin",level:2},{value:"CORS",id:"cors",level:2},{value:"\u8DE8\u57DF\u624B\u6BB5\u6709\u54EA\u4E9B",id:"\u8DE8\u57DF\u624B\u6BB5\u6709\u54EA\u4E9B",level:2},{value:"csrf",id:"p0-csrf",level:2},{value:"xsrf",id:"xsrf",level:2},{value:"xss",id:"xss",level:2},{value:"\u7F51\u9875\u9A8C\u8BC1\u7801\u662F\u5E72\u561B\u7684\uFF0C\u662F\u4E3A\u4E86\u89E3\u51B3\u4EC0\u4E48\u5B89\u5168\u95EE\u9898\uFF1F",id:"\u7F51\u9875\u9A8C\u8BC1\u7801\u662F\u5E72\u561B\u7684\u662F\u4E3A\u4E86\u89E3\u51B3\u4EC0\u4E48\u5B89\u5168\u95EE\u9898",level:2},{value:"\u52A0\u5BC6\u57FA\u7840\u6982\u5FF5",id:"\u52A0\u5BC6\u57FA\u7840\u6982\u5FF5",level:2},{value:"\u4E2D\u95F4\u4EBA\u653B\u51FB?",id:"\u4E2D\u95F4\u4EBA\u653B\u51FB",level:2},{value:"\u524D\u7AEF\u5982\u4F55\u9632\u6B62\u52A0\u8F7D\u5916\u57DF\u811A\u672C\uFF1F",id:"p0-forbid-cors",level:2},{value:"\u4E2D\u95F4\u4EBA\u653B\u51FB\u662F\u4EC0\u4E48\uFF1F",id:"\u4E2D\u95F4\u4EBA\u653B\u51FB\u662F\u4EC0\u4E48",level:2},{value:"\u53C2\u8003\u8D44\u6599",id:"\u53C2\u8003\u8D44\u6599",level:2}];function x(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",li:"li",ol:"ol",p:"p",strong:"strong",ul:"ul",...(0,r.a)(),...n.components};return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)(e.header,{children:(0,l.jsx)(e.h1,{id:"\u5B89\u5168",children:"\u5B89\u5168"})}),"\n",(0,l.jsx)(e.h2,{id:"p0-security",children:"\u5E38\u89C1 web \u5B89\u5168\u95EE\u9898"}),"\n",(0,l.jsx)(e.p,{children:"\u4EE5\u4E0B\u662F\u4E00\u4E9B\u5E38\u89C1\u7684 web \u524D\u7AEF\u7F51\u7EDC\u653B\u51FB\u7C7B\u578B\uFF1A"}),"\n",(0,l.jsxs)(e.ol,{children:["\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"\u8DE8\u7AD9\u811A\u672C\u653B\u51FB\uFF08Cross-Site Scripting, XSS\uFF09\uFF1AXSS\u653B\u51FB\u5229\u7528\u4E86 Web \u5E94\u7528\u7A0B\u5E8F\u5BF9\u7528\u6237\u8F93\u5165\u7684\u4E0D\u5F53\u5904\u7406\uFF0C\u4EE5\u5C06\u6076\u610F\u4EE3\u7801\u6CE8\u5165\u5230 Web \u9875\u9762\u4E2D\u3002\u5F53\u7528\u6237\u8BBF\u95EE\u5305\u542B\u6076\u610F\u4EE3\u7801\u7684\u9875\u9762\u65F6\uFF0C\u653B\u51FB\u8005\u53EF\u4EE5\u5229\u7528\u8FD9\u4E9B\u4EE3\u7801\u7A83\u53D6\u7528\u6237\u7684\u654F\u611F\u4FE1\u606F\u3001\u52AB\u6301\u7528\u6237\u4F1A\u8BDD\u7B49\u3002"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"\u8DE8\u7AD9\u8BF7\u6C42\u4F2A\u9020\uFF08Cross-Site Request Forgery, CSRF\uFF09\uFF1ACSRF\u653B\u51FB\u5229\u7528\u4E86\u7528\u6237\u5DF2\u7ECF\u767B\u5F55\u4E86\u53D7\u4FE1\u4EFB\u7F51\u7AD9\u7684\u8EAB\u4EFD\uFF0C\u901A\u8FC7\u5728\u53D7\u5BB3\u8005\u7684\u6D4F\u89C8\u5668\u4E2D\u6267\u884C\u6076\u610F\u4EE3\u7801\uFF0C\u5C06\u4F2A\u9020\u7684\u8BF7\u6C42\u53D1\u9001\u5230\u53D7\u4FE1\u4EFB\u7F51\u7AD9\u4E0A\uFF0C\u4ECE\u800C\u6267\u884C\u67D0\u4E9B\u64CD\u4F5C\u6216\u8005\u83B7\u53D6\u67D0\u4E9B\u4FE1\u606F\u3002"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"\u70B9\u51FB\u52AB\u6301\uFF08Clickjacking\uFF09\uFF1A\u70B9\u51FB\u52AB\u6301\u662F\u4E00\u79CD\u5229\u7528\u900F\u660E iframe \u5C42\u6765\u8986\u76D6\u7F51\u9875\u4E0A\u7684\u5176\u4ED6\u5185\u5BB9\uFF0C\u6B3A\u9A97\u7528\u6237\u70B9\u51FB\u4E0D\u53EF\u89C1\u7684\u6309\u94AE\u6216\u94FE\u63A5\uFF0C\u4EE5\u6267\u884C\u653B\u51FB\u8005\u6240\u9700\u7684\u64CD\u4F5C\u3002"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"HTML \u6CE8\u5165\u653B\u51FB\uFF1AHTML \u6CE8\u5165\u653B\u51FB\u5229\u7528\u4E86 Web \u5E94\u7528\u7A0B\u5E8F\u5BF9\u7528\u6237\u8F93\u5165\u7684\u4E0D\u5F53\u5904\u7406\uFF0C\u4EE5\u5C06\u6076\u610F\u7684 HTML \u4EE3\u7801\u63D2\u5165\u5230 Web \u9875\u9762\u4E2D\u3002\u8FD9\u79CD\u653B\u51FB\u901A\u5E38\u88AB\u7528\u6765\u4FEE\u6539\u9875\u9762\u5185\u5BB9\u3001\u6B3A\u9A97\u7528\u6237\u6216\u8005\u5B9E\u65BD\u5176\u4ED6\u6076\u610F\u884C\u4E3A\u3002"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"\u654F\u611F\u6570\u636E\u6CC4\u9732\uFF08Sensitive Data Leakage\uFF09\uFF1A\u654F\u611F\u6570\u636E\u6CC4\u9732\u53EF\u80FD\u4F1A\u53D1\u751F\u5728 Web \u5E94\u7528\u7A0B\u5E8F\u4E2D\uFF0C\u5176\u4E2D\u653B\u51FB\u8005\u53EF\u4EE5\u901A\u8FC7\u66B4\u529B\u7834\u89E3\u3001SQL \u6CE8\u5165\u7B49\u653B\u51FB\u65B9\u5F0F\uFF0C\u83B7\u53D6\u5B58\u50A8\u5728\u6570\u636E\u5E93\u4E2D\u7684\u654F\u611F\u6570\u636E\uFF08\u5982\u7528\u6237\u540D\u3001\u5BC6\u7801\u3001\u4FE1\u7528\u5361\u4FE1\u606F\u7B49\uFF09\u3002"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"\u5E26\u5BBD\u6EE5\u7528\uFF08Bandwidth Abuse\uFF09\uFF1A\u5E26\u5BBD\u6EE5\u7528\u662F\u6307\u653B\u51FB\u8005\u5229\u7528 Web \u5E94\u7528\u7A0B\u5E8F\u6216\u670D\u52A1\u5668\u7684\u6F0F\u6D1E\u6765\u6D88\u8017\u670D\u52A1\u5668\u7684\u8D44\u6E90\u548C\u5E26\u5BBD\uFF0C\u4ECE\u800C\u4F7F\u670D\u52A1\u5668\u53D8\u5F97\u7F13\u6162\u6216\u65E0\u6CD5\u6B63\u5E38\u5DE5\u4F5C\u3002"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"HTTP \u8BF7\u6C42\u6B3A\u9A97\uFF08HTTP Request Spoofing\uFF09\uFF1AHTTP \u8BF7\u6C42\u6B3A\u9A97\u662F\u4E00\u79CD\u5229\u7528 Web \u5E94\u7528\u7A0B\u5E8F\u5BF9\u8F93\u5165\u7684\u4E0D\u5F53\u5904\u7406\uFF0C\u4EE5\u7BE1\u6539 HTTP \u8BF7\u6C42\u7684\u653B\u51FB\u65B9\u5F0F\u3002\u653B\u51FB\u8005\u53EF\u4EE5\u901A\u8FC7\u4F2A\u9020 HTTP \u8BF7\u6C42\u5934\u4FE1\u606F\u3001\u4FEE\u6539 HTTP \u8BF7\u6C42\u65B9\u6CD5\u7B49\u65B9\u5F0F\uFF0C\u6B3A\u9A97 Web \u5E94\u7528\u7A0B\u5E8F\u6267\u884C\u653B\u51FB\u8005\u6240\u9700\u7684\u64CD\u4F5C\u3002"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.p,{children:"\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0C\u8FD9\u4E9B\u653B\u51FB\u7C7B\u578B\u901A\u5E38\u4F1A\u7ED3\u5408\u4F7F\u7528\uFF0C\u653B\u51FB\u8005\u4F1A\u5229\u7528\u591A\u79CD\u653B\u51FB\u65B9\u5F0F\uFF0C\u4EE5\u66F4\u597D\u5730\u5B9E\u73B0\u653B\u51FB\u76EE\u6807\u3002"}),"\n",(0,l.jsxs)(e.p,{children:[(0,l.jsx)(e.strong,{children:"\u5173\u952E\u8BCD"}),"\uFF1AXSS\u653B\u51FB\u3001CSRF\u653B\u51FB\u3001\u70B9\u51FB\u52AB\u6301\u5171\u8BA1\u3001URL\u8DF3\u8F6C\u6F0F\u6D1E\u3001SQL\u6CE8\u5165\u653B\u51FB\u3001OS\u547D\u4EE4\u6CE8\u5165\u653B\u51FB"]}),"\n",(0,l.jsx)(e.p,{children:"\u53C2\u8003\u6587\u6863\uFF1A"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://github.com/ljianshu/Blog/issues/56",children:"\u8D44\u6599"})}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"po-same-origin",children:"\u540C\u6E90\u7B56\u7565"}),"\n",(0,l.jsx)(e.p,{children:"\u540C\u6E90\u7B56\u7565\u662F\u4E00\u79CD\u5B89\u5168\u673A\u5236\uFF0C\u5B83\u662F\u6D4F\u89C8\u5668\u5BF9 JavaScript \u5B9E\u65BD\u7684\u4E00\u79CD\u5B89\u5168\u9650\u5236\u3002\u6240\u8C13\u201C\u540C\u6E90\u201D\u662F\u6307\u57DF\u540D\u3001\u534F\u8BAE\u3001\u7AEF\u53E3\u53F7\u5747\u76F8\u540C\u3002\u540C\u6E90\u7B56\u7565\u9650\u5236\u4E86\u4E00\u4E2A\u9875\u9762\u4E2D\u7684\u811A\u672C\u53EA\u80FD\u4E0E\u540C\u6E90\u9875\u9762\u7684\u811A\u672C\u8FDB\u884C\u4EA4\u4E92\uFF0C\u800C\u4E0D\u80FD\u4E0E\u4E0D\u540C\u6E90\u9875\u9762\u7684\u811A\u672C\u8FDB\u884C\u4EA4\u4E92\u3002\u8FD9\u662F\u4E3A\u4E86\u9632\u6B62\u6076\u610F\u811A\u672C\u7A83\u53D6\u6570\u636E\u3001\u8FDB\u884C XSS \u653B\u51FB\u7B49\u5B89\u5168\u95EE\u9898\u3002"}),"\n",(0,l.jsx)(e.p,{children:"\u540C\u6E90\u7B56\u7565\u9650\u5236\u7684\u8D44\u6E90\u5305\u62EC\uFF1A"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"Cookie\u3001LocalStorage \u548C IndexDB \u7B49\u5B58\u50A8\u6027\u8D44\u6E90"}),"\n",(0,l.jsx)(e.li,{children:"AJAX\u3001WebSocket \u7B49\u53D1\u9001 HTTP \u8BF7\u6C42\u7684\u65B9\u6CD5"}),"\n",(0,l.jsx)(e.li,{children:"DOM \u8282\u70B9"}),"\n",(0,l.jsx)(e.li,{children:"\u5176\u4ED6\u901A\u8FC7\u811A\u672C\u6216\u63D2\u4EF6\u6267\u884C\u7684\u8DE8\u57DF\u8BF7\u6C42"}),"\n"]}),"\n",(0,l.jsx)(e.p,{children:"\u8FD9\u4E9B\u8D44\u6E90\u53EA\u80FD\u4E0E\u540C\u6E90\u9875\u9762\u8FDB\u884C\u4EA4\u4E92\uFF0C\u4E0D\u80FD\u4E0E\u4E0D\u540C\u6E90\u7684\u9875\u9762\u8FDB\u884C\u4EA4\u4E92\u3002"}),"\n",(0,l.jsx)(e.p,{children:"\u540C\u6E90\u7B56\u7565\uFF08Same-Origin Policy\uFF09\u662F\u4E00\u79CD\u6D4F\u89C8\u5668\u5B89\u5168\u673A\u5236\uFF0C\u7528\u4E8E\u9650\u5236\u4E0D\u540C\u6E90\uFF08\u57DF\u540D\u3001\u534F\u8BAE\u3001\u7AEF\u53E3\uFF09\u4E4B\u95F4\u7684\u4EA4\u4E92\u3002\u5B83\u662F\u4E00\u79CD\u91CD\u8981\u7684\u5B89\u5168\u63AA\u65BD\uFF0C\u7528\u4E8E\u4FDD\u62A4\u7528\u6237\u7684\u9690\u79C1\u548C\u5B89\u5168\uFF0C\u9632\u6B62\u6076\u610F\u7F51\u7AD9\u901A\u8FC7\u8DE8\u57DF\u8BF7\u6C42\u83B7\u53D6\u7528\u6237\u7684\u654F\u611F\u4FE1\u606F\u6216\u8FDB\u884C\u6076\u610F\u64CD\u4F5C\u3002"}),"\n",(0,l.jsxs)(e.p,{children:["\u540C\u6E90\u7B56\u7565\u8981\u6C42\u7F51\u9875\u8D44\u6E90\uFF08\u5982JavaScript\u3001CSS\u3001\u56FE\u7247\u7B49\uFF09\u53EA\u80FD\u4E0E\u6765\u6E90\u76F8\u540C\u7684\u8D44\u6E90\u8FDB\u884C\u4EA4\u4E92\uFF0C\u5373\u53EA\u80FD\u4E0E\u76F8\u540C\u57DF\u540D\u3001\u76F8\u540C\u534F\u8BAE\u548C\u76F8\u540C\u7AEF\u53E3\u7684\u8D44\u6E90\u8FDB\u884C\u901A\u4FE1\u3002\u4F8B\u5982\uFF0C\u4E00\u4E2A\u7F51\u9875\u52A0\u8F7D\u81EA",(0,l.jsx)(e.code,{children:"https://www.example.com"}),"\u57DF\u540D\u4E0B\u7684\u8D44\u6E90\uFF0C\u5C31\u53EA\u80FD\u4E0E\u540C\u4E00\u57DF\u540D\u4E0B\u7684\u5176\u4ED6\u8D44\u6E90\u8FDB\u884C\u4EA4\u4E92\uFF0C\u65E0\u6CD5\u76F4\u63A5\u8BBF\u95EE\u5176\u4ED6\u57DF\u540D\u7684\u8D44\u6E90\u3002"]}),"\n",(0,l.jsx)(e.p,{children:"\u540C\u6E90\u7B56\u7565\u4E3B\u8981\u9650\u5236\u4E86\u4EE5\u4E0B\u51E0\u79CD\u884C\u4E3A\uFF1A"}),"\n",(0,l.jsxs)(e.ol,{children:["\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"DOM\u8BBF\u95EE\u9650\u5236\uFF1A\u4E0D\u540C\u6E90\u7684\u9875\u9762\u65E0\u6CD5\u901A\u8FC7JavaScript\u7B49\u65B9\u5F0F\u76F4\u63A5\u8BBF\u95EE\u5BF9\u65B9\u7684DOM\u5143\u7D20\uFF0C\u5373\u65E0\u6CD5\u83B7\u53D6\u6216\u4FEE\u6539\u5BF9\u65B9\u9875\u9762\u7684\u5185\u5BB9\u3002"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"Cookie\u3001LocalStorage\u548CIndexDB\u9650\u5236\uFF1A\u4E0D\u540C\u6E90\u7684\u9875\u9762\u65E0\u6CD5\u8BFB\u53D6\u5BF9\u65B9\u8BBE\u7F6E\u7684Cookie\u3001LocalStorage\u548CIndexDB\u5B58\u50A8\u3002"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"AJAX\u8BF7\u6C42\u9650\u5236\uFF1AXMLHttpRequest\u3001Fetch\u7B49\u7F51\u7EDC\u8BF7\u6C42\u5728\u8DE8\u57DF\u65F6\u53D7\u5230\u9650\u5236\uFF0C\u901A\u5E38\u65E0\u6CD5\u53D1\u9001\u8DE8\u57DF\u8BF7\u6C42\u3002"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.p,{children:"\u540C\u6E90\u7B56\u7565\u7684\u5B58\u5728\u6709\u6548\u5730\u9632\u6B62\u4E86\u8DE8\u7AD9\u811A\u672C\u653B\u51FB\uFF08XSS\uFF09\u548C\u8DE8\u7AD9\u8BF7\u6C42\u4F2A\u9020\uFF08CSRF\uFF09\u7B49\u5B89\u5168\u5A01\u80C1\u3002\u5982\u679C\u9700\u8981\u5728\u4E0D\u540C\u6E90\u4E4B\u95F4\u8FDB\u884C\u6570\u636E\u4EA4\u4E92\uFF0C\u53EF\u4EE5\u901A\u8FC7\u670D\u52A1\u5668\u7AEF\u7684\u4EE3\u7406\u6216\u4F7F\u7528CORS\uFF08\u8DE8\u6E90\u8D44\u6E90\u5171\u4EAB\uFF09\u7B49\u6280\u672F\u6765\u5B9E\u73B0\u3002"}),"\n",(0,l.jsxs)(e.p,{children:[(0,l.jsxs)(e.strong,{children:["\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0C\u540C\u6E90\u7B56\u7565\u53EA\u662F\u6D4F\u89C8\u5668\u7684\u5B89\u5168\u7B56\u7565\u4E4B\u4E00\uFF0C\u800C\u5E76\u975E\u6240\u6709\u7684\u7F51\u7EDC\u8BF7\u6C42\u90FD\u53D7\u5230\u540C\u6E90\u7B56\u7565\u7684\u9650\u5236\u3002\u4F8B\u5982\uFF0C\u901A\u8FC7",(0,l.jsx)(e.code,{children:"<script>"}),"\u6807\u7B7E\u5F15\u5165\u7684\u5916\u90E8JavaScript\u6587\u4EF6\u3001\u901A\u8FC7",(0,l.jsx)(e.code,{children:"<img>"}),"\u6807\u7B7E\u52A0\u8F7D\u7684\u56FE\u7247\u7B49\u8D44\u6E90\u662F\u4E0D\u53D7\u540C\u6E90\u7B56\u7565\u9650\u5236\u7684\u3002\u6B64\u5916\uFF0C\u4E00\u4E9B\u7279\u5B9A\u7684\u6807\u8BB0\uFF0C\u5982",(0,l.jsx)(e.code,{children:"<a>"}),"\u6807\u7B7E\u7684",(0,l.jsx)(e.code,{children:"href"}),"\u5C5E\u6027\u548C",(0,l.jsx)(e.code,{children:"<form>"}),"\u6807\u7B7E\u7684",(0,l.jsx)(e.code,{children:"action"}),"\u5C5E\u6027\uFF0C\u4E5F\u5B58\u5728\u4E00\u4E9B\u5141\u8BB8\u8DE8\u57DF\u7684\u89C4\u5219"]}),"\u3002"]}),"\n",(0,l.jsx)(e.h2,{id:"cors",children:"CORS"}),"\n",(0,l.jsxs)(e.p,{children:[(0,l.jsx)(e.strong,{children:"JSONP"}),"\nJSONP\u662F\u901A\u8FC7\u52A8\u6001\u521B\u5EFAscript\u6807\u7B7E\u7684\u65B9\u5F0F\uFF0C\u5229\u7528script\u6807\u7B7E\u53EF\u4EE5\u8DE8\u57DF\u8BF7\u6C42\u8D44\u6E90\u7684\u7279\u6027\u6765\u5B9E\u73B0\u7684\uFF0C\u672C\u8D28\u662F\u5229\u7528\u4E86script\u6807\u7B7E\u6CA1\u6709\u8DE8\u57DF\u9650\u5236\u7684\u7279\u6027\uFF0C\u53EF\u4EE5\u5728\u8BF7\u6C42\u7684url\u540E\u52A0\u4E00\u4E2Acallback\u53C2\u6570\uFF0C\u540E\u7AEF\u63A5\u6536\u5230\u8BF7\u6C42\u540E\uFF0C\u5C06\u9700\u8981\u4F20\u9012\u7684\u6570\u636E\u4F5C\u4E3A\u53C2\u6570\u4F20\u9012\u5230callback\u51FD\u6570\u4E2D\uFF0C\u524D\u7AEF\u5B9A\u4E49\u8BE5\u51FD\u6570\u6765\u63A5\u6536\u6570\u636E\uFF0C\u4ECE\u800C\u5B9E\u73B0\u8DE8\u57DF\u901A\u4FE1\u3002\n",(0,l.jsx)(e.a,{href:"https://github.com/yanlele/interview-question/issues/27",children:"#27"})]}),"\n",(0,l.jsxs)(e.p,{children:[(0,l.jsx)(e.strong,{children:"CORS"}),"\nCORS\u662F\u4E00\u79CD\u73B0\u4EE3\u6D4F\u89C8\u5668\u652F\u6301\u7684\u8DE8\u57DF\u89E3\u51B3\u65B9\u6848\uFF0CCORS\u5168\u79F0\u4E3A\u8DE8\u57DF\u8D44\u6E90\u5171\u4EAB\uFF08Cross-Origin Resource Sharing\uFF09\uFF0C\u5176\u672C\u8D28\u662F\u5728\u670D\u52A1\u7AEF\u8BBE\u7F6E\u5141\u8BB8\u8DE8\u57DF\u8BBF\u95EE\u7684\u54CD\u5E94\u5934\uFF0C\u6D4F\u89C8\u5668\u901A\u8FC7\u5224\u65AD\u54CD\u5E94\u5934\u4E2D\u662F\u5426\u5141\u8BB8\u8DE8\u57DF\u8BBF\u95EE\u6765\u51B3\u5B9A\u662F\u5426\u5141\u8BB8\u8DE8\u57DF\u8BBF\u95EE\u3002\n",(0,l.jsx)(e.a,{href:"https://github.com/yanlele/interview-question/issues/28",children:"#28"})]}),"\n",(0,l.jsxs)(e.p,{children:[(0,l.jsx)(e.strong,{children:"postMessage"}),"\npostMessage\u662FHTML5\u5F15\u5165\u7684\u4E00\u79CD\u65B0\u7684\u8DE8\u57DF\u901A\u4FE1\u65B9\u5F0F\uFF0C\u4E3B\u8981\u662F\u7528\u4E8E\u5728\u4E0D\u540C\u7A97\u53E3\u4E4B\u95F4\u8FDB\u884C\u901A\u4FE1\uFF0C\u5305\u62EC\u4E0D\u540C\u57DF\u540D\u3001\u534F\u8BAE\u3001\u7AEF\u53E3\u7B49\u60C5\u51B5\uFF0C\u901A\u8FC7\u8C03\u7528window.postMessage()\u65B9\u6CD5\uFF0C\u5728\u4E24\u4E2A\u7A97\u53E3\u4E4B\u95F4\u53D1\u9001\u6D88\u606F\uFF0C\u63A5\u6536\u65B9\u901A\u8FC7\u76D1\u542Cmessage\u4E8B\u4EF6\u6765\u63A5\u6536\u6D88\u606F\uFF0C\u4ECE\u800C\u5B9E\u73B0\u8DE8\u57DF\u901A\u4FE1\u3002\n",(0,l.jsx)(e.a,{href:"https://github.com/yanlele/interview-question/issues/29",children:"#29"})]}),"\n",(0,l.jsxs)(e.p,{children:[(0,l.jsx)(e.strong,{children:"WebSocket"}),"\nWebSocket\u662F\u4E00\u79CD\u65B0\u7684\u7F51\u7EDC\u534F\u8BAE\uFF0C\u53EF\u4EE5\u5B9E\u73B0\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u5668\u4E4B\u95F4\u7684\u5B9E\u65F6\u53CC\u5411\u901A\u4FE1\uFF0C\u540C\u65F6\u4E5F\u53EF\u4EE5\u8DE8\u57DF\u901A\u4FE1\uFF0CWebSocket\u534F\u8BAE\u5EFA\u7ACB\u5728TCP\u534F\u8BAE\u4E4B\u4E0A\uFF0C\u901A\u8FC7HTTP\u534F\u8BAE\u53D1\u8D77\u63E1\u624B\u8BF7\u6C42\uFF0C\u63E1\u624B\u6210\u529F\u540E\uFF0C\u5BA2\u6237\u7AEF\u548C\u670D\u52A1\u5668\u5C31\u53EF\u4EE5\u901A\u8FC7WebSocket\u534F\u8BAE\u8FDB\u884C\u5B9E\u65F6\u901A\u4FE1\u4E86\u3002\n",(0,l.jsx)(e.a,{href:"https://github.com/yanlele/interview-question/issues/20",children:"#30"})]}),"\n",(0,l.jsxs)(e.p,{children:[(0,l.jsx)(e.strong,{children:"\u4EE3\u7406\u8F6C\u53D1"}),"\n\u4EE3\u7406\u8F6C\u53D1\u662F\u4E00\u79CD\u5E38\u7528\u7684\u8DE8\u57DF\u901A\u4FE1\u65B9\u5F0F\uFF0C\u4E3B\u8981\u662F\u901A\u8FC7\u5728\u540C\u4E00\u57DF\u540D\u4E0B\u8BBE\u7F6E\u4EE3\u7406\u670D\u52A1\u5668\uFF0C\u5728\u4EE3\u7406\u670D\u52A1\u5668\u4E0A\u5B9E\u73B0\u8DE8\u57DF\u8BBF\u95EE\uFF0C\u518D\u5C06\u7ED3\u679C\u8FD4\u56DE\u7ED9\u524D\u7AEF\u9875\u9762\uFF0C\u4ECE\u800C\u5B9E\u73B0\u8DE8\u57DF\u901A\u4FE1\u3002"]}),"\n",(0,l.jsx)(e.h2,{id:"\u8DE8\u57DF\u624B\u6BB5\u6709\u54EA\u4E9B",children:"\u8DE8\u57DF\u624B\u6BB5\u6709\u54EA\u4E9B"}),"\n",(0,l.jsxs)(e.ol,{children:["\n",(0,l.jsx)(e.li,{children:"cors"}),"\n",(0,l.jsx)(e.li,{children:"postMessage"}),"\n",(0,l.jsx)(e.li,{children:"JSONP"}),"\n",(0,l.jsx)(e.li,{children:"websocket"}),"\n",(0,l.jsx)(e.li,{children:"proxy \u8F6C\u53D1"}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"p0-csrf",children:"csrf"}),"\n",(0,l.jsx)(e.p,{children:"\u8DE8\u7AD9\u8BF7\u6C42\u4F2A\u9020\uFF08Cross-Site Request Forgery, CSRF\uFF09\u662F\u4E00\u79CD\u5E38\u89C1\u7684\u7F51\u7EDC\u653B\u51FB\u65B9\u5F0F\uFF0C\u653B\u51FB\u8005\u53EF\u4EE5\u5229\u7528\u5DF2\u767B\u5F55\u7684\u7528\u6237\u8EAB\u4EFD\uFF0C\u901A\u8FC7\u4F2A\u9020\u7528\u6237\u7684\u8BF7\u6C42\uFF0C\u5BF9\u670D\u52A1\u5668\u4E0A\u7684\u8D44\u6E90\u8FDB\u884C\u975E\u6CD5\u64CD\u4F5C\u3002\u4E0B\u9762\u662F\u4E00\u79CD\u5E38\u89C1\u7684 CSRF \u653B\u51FB\u65B9\u5F0F\uFF1A"}),"\n",(0,l.jsxs)(e.ol,{children:["\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"\u7528\u6237\u5728\u6D4F\u89C8\u5668\u4E2D\u767B\u5F55\u4E86\u67D0\u4E2A\u7F51\u7AD9\uFF0C\u5E76\u83B7\u53D6\u4E86\u8BE5\u7F51\u7AD9\u7684 Cookie\u3002"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"\u653B\u51FB\u8005\u8BF1\u5BFC\u7528\u6237\u8BBF\u95EE\u4E00\u4E2A\u6076\u610F\u7F51\u7AD9\uFF0C\u5E76\u5728\u8BE5\u7F51\u7AD9\u4E0A\u653E\u7F6E\u4E86\u4E00\u6BB5\u6076\u610F\u4EE3\u7801\uFF0C\u7528\u4E8E\u53D1\u8D77 CSRF \u653B\u51FB\u3002"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"\u5F53\u7528\u6237\u5728\u6076\u610F\u7F51\u7AD9\u4E0A\u6267\u884C\u67D0\u4E2A\u64CD\u4F5C\u65F6\uFF0C\u6BD4\u5982\u70B9\u51FB\u67D0\u4E2A\u6309\u94AE\u6216\u94FE\u63A5\uFF0C\u6076\u610F\u4EE3\u7801\u4F1A\u81EA\u52A8\u5411\u76EE\u6807\u7F51\u7AD9\u53D1\u9001\u4E00\u4E2A HTTP \u8BF7\u6C42\uFF0C\u8BF7\u6C42\u4E2D\u5305\u542B\u653B\u51FB\u8005\u60F3\u8981\u6267\u884C\u7684\u64CD\u4F5C\u548C\u53C2\u6570\uFF0C\u540C\u65F6\u4E5F\u4F1A\u643A\u5E26\u7528\u6237\u7684 Cookie\u3002"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"\u76EE\u6807\u7F51\u7AD9\u63A5\u6536\u5230\u8BF7\u6C42\u540E\uFF0C\u4F1A\u8BA4\u4E3A\u8FD9\u662F\u4E00\u4E2A\u5408\u6CD5\u7684\u8BF7\u6C42\uFF0C\u56E0\u4E3A\u5B83\u643A\u5E26\u4E86\u7528\u6237\u7684 Cookie\u3002\u4E8E\u662F\u670D\u52A1\u5668\u4F1A\u6267\u884C\u653B\u51FB\u8005\u60F3\u8981\u7684\u64CD\u4F5C\uFF0C\u6BD4\u5982\u5220\u9664\u7528\u6237\u7684\u6570\u636E\u3001\u4FEE\u6539\u7528\u6237\u7684\u5BC6\u7801\u7B49\u3002"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.p,{children:"\u4E3A\u4E86\u9632\u6B62 CSRF \u653B\u51FB\uFF0C\u5F00\u53D1\u4EBA\u5458\u53EF\u4EE5\u91C7\u53D6\u4EE5\u4E0B\u63AA\u65BD\uFF1A"}),"\n",(0,l.jsxs)(e.ol,{children:["\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"\u968F\u673A\u5316 Token\uFF1A\u4E3A\u6BCF\u4E2A\u8BF7\u6C42\u751F\u6210\u4E00\u4E2A\u968F\u673A\u5316\u7684 Token\uFF0C\u5C06 Token \u653E\u5165\u8868\u5355\u4E2D\uFF0C\u5E76\u5728\u670D\u52A1\u5668\u7AEF\u8FDB\u884C\u9A8C\u8BC1\u3002\u8FD9\u53EF\u4EE5\u9632\u6B62\u653B\u51FB\u8005\u4F2A\u9020\u5408\u6CD5\u7684\u8BF7\u6C42\u3002"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"\u4F7F\u7528 Referer \u9A8C\u8BC1\uFF1A\u5728\u670D\u52A1\u5668\u7AEF\u8FDB\u884C Referer \u9A8C\u8BC1\uFF0C\u53EA\u5141\u8BB8\u6765\u81EA\u5408\u6CD5\u6765\u6E90\u7684\u8BF7\u6C42\u3002\u8FD9\u53EF\u4EE5\u9632\u6B62\u653B\u51FB\u8005\u5728\u81EA\u5DF1\u7684\u7F51\u7AD9\u4E0A\u653E\u7F6E\u6076\u610F\u4EE3\u7801\uFF0C\u8FDB\u884C CSRF \u653B\u51FB\u3002"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"\u4F7F\u7528\u9A8C\u8BC1\u7801\uFF1A\u5728\u67D0\u4E9B\u654F\u611F\u64CD\u4F5C\u4E0A\uFF0C\u6BD4\u5982\u4FEE\u6539\u5BC6\u7801\u3001\u5220\u9664\u6570\u636E\u7B49\uFF0C\u53EF\u4EE5\u8981\u6C42\u7528\u6237\u8F93\u5165\u9A8C\u8BC1\u7801\u3002\u8FD9\u53EF\u4EE5\u964D\u4F4E\u653B\u51FB\u8005\u7684\u6210\u529F\u7387\uFF0C\u56E0\u4E3A\u653B\u51FB\u8005\u5F88\u96BE\u83B7\u53D6\u9A8C\u8BC1\u7801\u3002"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.p,{children:"\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0C\u4EE5\u4E0A\u63AA\u65BD\u5E76\u4E0D\u80FD\u5B8C\u5168\u9632\u6B62 CSRF \u653B\u51FB\uFF0C\u56E0\u4E3A\u653B\u51FB\u8005\u603B\u662F\u53EF\u4EE5\u901A\u8FC7\u4E00\u4E9B\u590D\u6742\u7684\u65B9\u6CD5\u6765\u89C4\u907F\u8FD9\u4E9B\u9632\u5FA1\u63AA\u65BD\u3002\u56E0\u6B64\uFF0C\u5F00\u53D1\u4EBA\u5458\u9700\u8981\u7EFC\u5408\u8003\u8651\u591A\u79CD\u9632\u8303\u63AA\u65BD\uFF0C\u4EE5\u63D0\u9AD8\u7F51\u7AD9\u7684\u5B89\u5168\u6027\u3002"}),"\n",(0,l.jsx)(e.h2,{id:"xsrf",children:"xsrf"}),"\n",(0,l.jsx)(e.h2,{id:"xss",children:"xss"}),"\n",(0,l.jsx)(e.p,{children:"\u4EE5\u4E0B\u662F\u4E00\u4E9B\u9632\u8303\u8DE8\u7AD9\u811A\u672C\u653B\u51FB\u7684\u5E38\u89C1\u65B9\u6CD5\uFF1A"}),"\n",(0,l.jsxs)(e.ol,{children:["\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"\u8F93\u5165\u8FC7\u6EE4\uFF1A\u5BF9\u4E8E\u6240\u6709\u8F93\u5165\u7684\u6570\u636E\uFF08\u5982\u8868\u5355\u6570\u636E\u3001URL \u53C2\u6570\u7B49\uFF09\uFF0C\u5E94\u8BE5\u8FDB\u884C\u8FC7\u6EE4\u548C\u9A8C\u8BC1\u3002\u7279\u522B\u662F\u5BF9\u4E8E\u654F\u611F\u6570\u636E\uFF08\u5982\u5BC6\u7801\u3001\u4FE1\u7528\u5361\u4FE1\u606F\u7B49\uFF09\uFF0C\u5E94\u8BE5\u8FDB\u884C\u4E25\u683C\u7684\u9A8C\u8BC1\uFF0C\u9632\u6B62\u6076\u610F\u7684\u811A\u672C\u6CE8\u5165\u3002\u53EF\u4EE5\u4F7F\u7528\u4E00\u4E9B\u5F00\u6E90\u7684\u8F93\u5165\u9A8C\u8BC1\u5DE5\u5177\uFF0C\u5982OWASP ESAPI\u6765\u8FC7\u6EE4\u6076\u610F\u8F93\u5165\u3002"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsxs)(e.p,{children:["\u5BF9\u7279\u6B8A\u5B57\u7B26\u8FDB\u884C\u8F6C\u4E49\uFF1A\u5BF9\u4E8E\u6240\u6709\u8F93\u51FA\u5230\u9875\u9762\u4E0A\u7684\u6570\u636E\uFF0C\u5E94\u8BE5\u5BF9\u7279\u6B8A\u5B57\u7B26\u8FDB\u884C\u8F6C\u4E49\uFF0C\u6BD4\u5982\u5C06 ",(0,l.jsx)(e.code,{children:"<"})," \u8F6C\u4E49\u4E3A ",(0,l.jsx)(e.code,{children:"<"}),"\u3001\u5C06 ",(0,l.jsx)(e.code,{children:">"})," \u8F6C\u4E49\u4E3A ",(0,l.jsx)(e.code,{children:">"})," \u7B49\u3002\u8FD9\u53EF\u4EE5\u9632\u6B62\u653B\u51FB\u8005\u901A\u8FC7\u5728\u9875\u9762\u4E0A\u6CE8\u5165\u6076\u610F\u7684\u811A\u672C\u3002"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"CSP\uFF08Content Security Policy\uFF09\uFF1ACSP\u662F\u4E00\u79CD\u6D4F\u89C8\u5668\u5B89\u5168\u673A\u5236\uFF0C\u53EF\u4EE5\u9650\u5236 Web \u9875\u9762\u53EF\u4EE5\u52A0\u8F7D\u54EA\u4E9B\u8D44\u6E90\u3002\u901A\u8FC7\u8BBE\u7F6E\u5408\u9002\u7684 CSP\uFF0C\u53EF\u4EE5\u9632\u6B62\u6076\u610F\u811A\u672C\u7684\u6CE8\u5165\u3002"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"HttpOnly Cookie\uFF1A\u901A\u8FC7\u8BBE\u7F6E HttpOnly \u6807\u5FD7\uFF0C\u53EF\u4EE5\u9632\u6B62\u811A\u672C\u8BBF\u95EE Cookie\u3002\u8FD9\u53EF\u4EE5\u9632\u6B62\u653B\u51FB\u8005\u7A83\u53D6\u7528\u6237\u7684\u8EAB\u4EFD\u9A8C\u8BC1\u4FE1\u606F\u3002"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"\u968F\u673A\u5316 Session ID\uFF1A\u5728\u7528\u6237\u767B\u5F55\u540E\uFF0C\u5E94\u8BE5\u4E3A\u5176\u5206\u914D\u4E00\u4E2A\u968F\u673A\u5316\u7684 Session ID\uFF0C\u9632\u6B62\u653B\u51FB\u8005\u901A\u8FC7\u731C\u6D4B Session ID \u6765\u52AB\u6301\u7528\u6237\u4F1A\u8BDD\u3002"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"\u4F7F\u7528\u5B89\u5168\u7684\u7F16\u7A0B\u8BED\u8A00\u548C\u6846\u67B6\uFF1A\u4F7F\u7528\u5B89\u5168\u7684\u7F16\u7A0B\u8BED\u8A00\u548C\u6846\u67B6\u53EF\u4EE5\u964D\u4F4E\u8DE8\u7AD9\u811A\u672C\u653B\u51FB\u7684\u98CE\u9669\u3002\u6BD4\u5982\u4F7F\u7528\u6700\u65B0\u7684\u7248\u672C\u7684\u7F16\u7A0B\u8BED\u8A00\u548C\u6846\u67B6\uFF0C\u4EE5\u83B7\u5F97\u66F4\u597D\u7684\u5B89\u5168\u6027\u3002"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.p,{children:"\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0C\u9632\u8303\u8DE8\u7AD9\u811A\u672C\u653B\u51FB\u9700\u8981\u7EFC\u5408\u591A\u79CD\u65B9\u6CD5\uFF0C\u5355\u4E00\u7684\u63AA\u65BD\u5E76\u4E0D\u80FD\u5B8C\u5168\u9632\u6B62\u653B\u51FB\u3002\u6B64\u5916\uFF0C\u5F00\u53D1\u4EBA\u5458\u5E94\u8BE5\u59CB\u7EC8\u5173\u6CE8\u6700\u65B0\u7684\u5B89\u5168\u6F0F\u6D1E\u548C\u653B\u51FB\u6280\u672F\uFF0C\u53CA\u65F6\u91C7\u53D6\u76F8\u5E94\u7684\u9632\u8303\u63AA\u65BD\u3002"}),"\n",(0,l.jsx)(e.h2,{id:"\u7F51\u9875\u9A8C\u8BC1\u7801\u662F\u5E72\u561B\u7684\u662F\u4E3A\u4E86\u89E3\u51B3\u4EC0\u4E48\u5B89\u5168\u95EE\u9898",children:"\u7F51\u9875\u9A8C\u8BC1\u7801\u662F\u5E72\u561B\u7684\uFF0C\u662F\u4E3A\u4E86\u89E3\u51B3\u4EC0\u4E48\u5B89\u5168\u95EE\u9898\uFF1F"}),"\n",(0,l.jsx)(e.h2,{id:"\u52A0\u5BC6\u57FA\u7840\u6982\u5FF5",children:"\u52A0\u5BC6\u57FA\u7840\u6982\u5FF5"}),"\n",(0,l.jsxs)(e.ol,{children:["\n",(0,l.jsxs)(e.li,{children:["\u5BF9\u79F0\u52A0\u5BC6","\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u540C\u4E00\u5BC6\u94A5\u52A0\u89E3\u5BC6"}),"\n",(0,l.jsx)(e.li,{children:"\u901F\u5EA6\u5FEB"}),"\n",(0,l.jsx)(e.li,{children:"\u5982\uFF1AAES\u3001DES"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u975E\u5BF9\u79F0\u52A0\u5BC6","\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u516C\u94A5\u52A0\u5BC6\uFF0C\u79C1\u94A5\u89E3\u5BC6"}),"\n",(0,l.jsx)(e.li,{children:"\u901F\u5EA6\u6162"}),"\n",(0,l.jsx)(e.li,{children:"\u5982\uFF1ARSA\u3001ECC"}),"\n"]}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\u54C8\u5E0C\u7B97\u6CD5","\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"\u5355\u5411\u52A0\u5BC6"}),"\n",(0,l.jsx)(e.li,{children:"\u5982\uFF1AMD5\u3001SHA"}),"\n"]}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.h2,{id:"\u4E2D\u95F4\u4EBA\u653B\u51FB",children:"\u4E2D\u95F4\u4EBA\u653B\u51FB?"}),"\n",(0,l.jsx)(e.p,{children:"\u4E2D\u95F4\u4EBA\u653B\u51FB\uFF08Man-in-the-Middle Attack, MITM\uFF09\uFF0C\u4E5F\u79F0\u4E2D\u95F4\u653B\u51FB\uFF0C\u662F\u6307\u9ED1\u5BA2\u901A\u8FC7\u62E6\u622A\u901A\u4FE1\u8FC7\u7A0B\u4E2D\u7684\u6570\u636E\uFF0C\u7136\u540E\u5728\u4E24\u4E2A\u901A\u4FE1\u7684\u7528\u6237\u4E4B\u95F4\u8FDB\u884C\u6B3A\u9A97\u548C\u7BE1\u6539\u7684\u653B\u51FB\u65B9\u5F0F\u3002\u5728 HTTPS \u4E2D\uFF0C\u5982\u679C\u9ED1\u5BA2\u80FD\u591F\u622A\u83B7\u7528\u6237\u548C\u670D\u52A1\u5668\u4E4B\u95F4\u7684\u901A\u4FE1\uFF0C\u90A3\u4E48\u4ED6\u5C31\u53EF\u4EE5\u4F7F\u7528\u7C7B\u4F3C\u4E8E\u4F2A\u9020\u8BC1\u4E66\u3001\u4E2D\u65AD\u8FDE\u63A5\u3001\u63D2\u5165\u6076\u610F\u4EE3\u7801\u7B49\u65B9\u5F0F\uFF0C\u5BF9\u6570\u636E\u8FDB\u884C\u7BE1\u6539\u6216\u7A83\u53D6\u7528\u6237\u654F\u611F\u4FE1\u606F\u3002"}),"\n",(0,l.jsx)(e.p,{children:"\u4E3A\u4E86\u9632\u6B62\u4E2D\u95F4\u4EBA\u653B\u51FB\uFF0C\u5728 HTTPS \u4E2D\u901A\u5E38\u91C7\u7528\u6570\u5B57\u8BC1\u4E66\u8BA4\u8BC1\u673A\u5236\uFF0C\u5373\u670D\u52A1\u5668\u4F1A\u5411\u53EF\u4FE1\u7684\u7B2C\u4E09\u65B9\u673A\u6784\u7533\u8BF7\u6570\u5B57\u8BC1\u4E66\uFF0C\u8BC1\u660E\u5176\u8EAB\u4EFD\u7684\u771F\u5B9E\u6027\u3002\u5F53\u7528\u6237\u8BBF\u95EE\u8BE5\u670D\u52A1\u5668\u65F6\uFF0C\u670D\u52A1\u5668\u4F1A\u628A\u81EA\u5DF1\u7684\u6570\u5B57\u8BC1\u4E66\u53D1\u9001\u7ED9\u7528\u6237\uFF0C\u7528\u6237\u7684\u6D4F\u89C8\u5668\u4F1A\u9A8C\u8BC1\u8BE5\u8BC1\u4E66\u662F\u5426\u7531\u53EF\u4FE1\u7684\u7B2C\u4E09\u65B9\u673A\u6784\u7B7E\u53D1\uFF0C\u662F\u5426\u8FC7\u671F\u7B49\uFF0C\u5982\u679C\u9A8C\u8BC1\u901A\u8FC7\uFF0C\u5219\u53EF\u4EE5\u5EFA\u7ACB\u5B89\u5168\u7684 HTTPS \u8FDE\u63A5\u3002\u5982\u679C\u6570\u5B57\u8BC1\u4E66\u65E0\u6548\uFF0C\u5219\u4F1A\u5F39\u51FA\u8B66\u544A\u9875\u9762\uFF0C\u63D0\u793A\u7528\u6237\u5B58\u5728\u5B89\u5168\u98CE\u9669\u3002"}),"\n",(0,l.jsx)(e.h2,{id:"p0-forbid-cors",children:"\u524D\u7AEF\u5982\u4F55\u9632\u6B62\u52A0\u8F7D\u5916\u57DF\u811A\u672C\uFF1F"}),"\n",(0,l.jsx)(e.p,{children:"\u524D\u7AEF\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0B\u65B9\u5F0F\u9632\u6B62\u52A0\u8F7D\u5916\u57DF\u811A\u672C\uFF1A"}),"\n",(0,l.jsxs)(e.ol,{children:["\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"\u4F7F\u7528 Content Security Policy (CSP)\uFF1ACSP \u662F\u4E00\u4E2A HTTP \u5934\uFF0C\u53EF\u4EE5\u9650\u5236\u9875\u9762\u53EF\u4EE5\u4ECE\u54EA\u4E9B\u6E90\u52A0\u8F7D\u8D44\u6E90\u3002\u901A\u8FC7 CSP\uFF0C\u53EF\u4EE5\u7981\u6B62\u52A0\u8F7D\u5916\u57DF\u811A\u672C\uFF0C\u4ECE\u800C\u9632\u6B62 XSS \u653B\u51FB\u7B49\u5B89\u5168\u95EE\u9898\u3002"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"\u4F7F\u7528 Subresource Integrity (SRI)\uFF1ASRI \u662F\u4E00\u4E2A\u6D4F\u89C8\u5668\u529F\u80FD\uFF0C\u53EF\u4EE5\u786E\u4FDD\u5728\u52A0\u8F7D\u5916\u90E8\u8D44\u6E90\u65F6\uFF0C\u5B83\u4EEC\u7684\u5185\u5BB9\u6CA1\u6709\u88AB\u7BE1\u6539\u8FC7\u3002\u901A\u8FC7\u5728 script \u6807\u7B7E\u4E2D\u6DFB\u52A0 integrity \u5C5E\u6027\uFF0C\u53EF\u4EE5\u6307\u5B9A\u8D44\u6E90\u7684\u6821\u9A8C\u548C\uFF0C\u6D4F\u89C8\u5668\u4F1A\u6821\u9A8C\u8D44\u6E90\u662F\u5426\u4E0E integrity \u503C\u5339\u914D\uFF0C\u4ECE\u800C\u786E\u4FDD\u8D44\u6E90\u6CA1\u6709\u88AB\u7BE1\u6539\u8FC7\u3002"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"\u907F\u514D\u4F7F\u7528\u52A8\u6001\u811A\u672C\u52A0\u8F7D\uFF1A\u4F7F\u7528 document.createElement('script') \u521B\u5EFA script \u5143\u7D20\uFF0C\u5E76\u624B\u52A8\u8BBE\u7F6E\u5176 src \u5C5E\u6027\uFF0C\u53EF\u4EE5\u907F\u514D\u4F7F\u7528 eval() \u52A8\u6001\u6267\u884C\u811A\u672C\u3002\u52A8\u6001\u52A0\u8F7D\u811A\u672C\u7684\u65B9\u5F0F\u53EF\u80FD\u4F1A\u53D7\u5230\u4E2D\u95F4\u4EBA\u653B\u51FB\uFF0C\u4ECE\u800C\u52A0\u8F7D\u6076\u610F\u811A\u672C\u3002"}),"\n"]}),"\n",(0,l.jsxs)(e.li,{children:["\n",(0,l.jsx)(e.p,{children:"\u907F\u514D\u4F7F\u7528\u4E0D\u5B89\u5168\u7684\u534F\u8BAE\u52A0\u8F7D\u8D44\u6E90\uFF1A\u4F7F\u7528 HTTPS \u52A0\u8F7D\u8D44\u6E90\u53EF\u4EE5\u786E\u4FDD\u8D44\u6E90\u5728\u4F20\u8F93\u8FC7\u7A0B\u4E2D\u4E0D\u4F1A\u88AB\u7BE1\u6539\u3002\u907F\u514D\u4F7F\u7528 HTTP \u6216\u8005 file \u534F\u8BAE\u52A0\u8F7D\u8D44\u6E90\uFF0C\u8FD9\u4E9B\u534F\u8BAE\u5BB9\u6613\u53D7\u5230\u4E2D\u95F4\u4EBA\u653B\u51FB\u3002"}),"\n"]}),"\n"]}),"\n",(0,l.jsx)(e.p,{children:"\u7EFC\u4E0A\uFF0C\u524D\u7AEF\u53EF\u4EE5\u901A\u8FC7\u4EE5\u4E0A\u65B9\u5F0F\u9632\u6B62\u52A0\u8F7D\u5916\u57DF\u811A\u672C\uFF0C\u63D0\u9AD8\u5E94\u7528\u7A0B\u5E8F\u7684\u5B89\u5168\u6027\u3002"}),"\n",(0,l.jsx)(e.h2,{id:"\u4E2D\u95F4\u4EBA\u653B\u51FB\u662F\u4EC0\u4E48",children:"\u4E2D\u95F4\u4EBA\u653B\u51FB\u662F\u4EC0\u4E48\uFF1F"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:"created_at: 2023-03-26T09:29:08Z"}),"\n",(0,l.jsx)(e.li,{children:"updated_at: 2023-03-26T09:29:09Z"}),"\n",(0,l.jsx)(e.li,{children:"labels: \u7F51\u7EDC"}),"\n",(0,l.jsx)(e.li,{children:"milestone: \u9AD8"}),"\n"]}),"\n",(0,l.jsx)(e.p,{children:"\u4E2D\u95F4\u4EBA\u653B\u51FB\uFF08Man-in-the-Middle Attack, MITM\uFF09\uFF0C\u4E5F\u79F0\u4E2D\u95F4\u653B\u51FB\uFF0C\u662F\u6307\u9ED1\u5BA2\u901A\u8FC7\u62E6\u622A\u901A\u4FE1\u8FC7\u7A0B\u4E2D\u7684\u6570\u636E\uFF0C\u7136\u540E\u5728\u4E24\u4E2A\u901A\u4FE1\u7684\u7528\u6237\u4E4B\u95F4\u8FDB\u884C\u6B3A\u9A97\u548C\u7BE1\u6539\u7684\u653B\u51FB\u65B9\u5F0F\u3002\u5728 HTTPS \u4E2D\uFF0C\u5982\u679C\u9ED1\u5BA2\u80FD\u591F\u622A\u83B7\u7528\u6237\u548C\u670D\u52A1\u5668\u4E4B\u95F4\u7684\u901A\u4FE1\uFF0C\u90A3\u4E48\u4ED6\u5C31\u53EF\u4EE5\u4F7F\u7528\u7C7B\u4F3C\u4E8E\u4F2A\u9020\u8BC1\u4E66\u3001\u4E2D\u65AD\u8FDE\u63A5\u3001\u63D2\u5165\u6076\u610F\u4EE3\u7801\u7B49\u65B9\u5F0F\uFF0C\u5BF9\u6570\u636E\u8FDB\u884C\u7BE1\u6539\u6216\u7A83\u53D6\u7528\u6237\u654F\u611F\u4FE1\u606F\u3002"}),"\n",(0,l.jsx)(e.p,{children:"\u4E3A\u4E86\u9632\u6B62\u4E2D\u95F4\u4EBA\u653B\u51FB\uFF0C\u5728 HTTPS \u4E2D\u901A\u5E38\u91C7\u7528\u6570\u5B57\u8BC1\u4E66\u8BA4\u8BC1\u673A\u5236\uFF0C\u5373\u670D\u52A1\u5668\u4F1A\u5411\u53EF\u4FE1\u7684\u7B2C\u4E09\u65B9\u673A\u6784\u7533\u8BF7\u6570\u5B57\u8BC1\u4E66\uFF0C\u8BC1\u660E\u5176\u8EAB\u4EFD\u7684\u771F\u5B9E\u6027\u3002\u5F53\u7528\u6237\u8BBF\u95EE\u8BE5\u670D\u52A1\u5668\u65F6\uFF0C\u670D\u52A1\u5668\u4F1A\u628A\u81EA\u5DF1\u7684\u6570\u5B57\u8BC1\u4E66\u53D1\u9001\u7ED9\u7528\u6237\uFF0C\u7528\u6237\u7684\u6D4F\u89C8\u5668\u4F1A\u9A8C\u8BC1\u8BE5\u8BC1\u4E66\u662F\u5426\u7531\u53EF\u4FE1\u7684\u7B2C\u4E09\u65B9\u673A\u6784\u7B7E\u53D1\uFF0C\u662F\u5426\u8FC7\u671F\u7B49\uFF0C\u5982\u679C\u9A8C\u8BC1\u901A\u8FC7\uFF0C\u5219\u53EF\u4EE5\u5EFA\u7ACB\u5B89\u5168\u7684 HTTPS \u8FDE\u63A5\u3002\u5982\u679C\u6570\u5B57\u8BC1\u4E66\u65E0\u6548\uFF0C\u5219\u4F1A\u5F39\u51FA\u8B66\u544A\u9875\u9762\uFF0C\u63D0\u793A\u7528\u6237\u5B58\u5728\u5B89\u5168\u98CE\u9669\u3002"}),"\n",(0,l.jsx)(e.h2,{id:"\u53C2\u8003\u8D44\u6599",children:"\u53C2\u8003\u8D44\u6599"}),"\n",(0,l.jsxs)(e.ul,{children:["\n",(0,l.jsx)(e.li,{children:(0,l.jsx)(e.a,{href:"https://book.douban.com/subject/10546925//",children:"\u767D\u5E3D\u5B50\u5C06 web \u5B89\u5168"})}),"\n"]})]})}function j(n={}){let{wrapper:e}={...(0,r.a)(),...n.components};return e?(0,l.jsx)(e,{...n,children:(0,l.jsx)(x,{...n})}):x(n)}},715:function(n,e,i){i.d(e,{Z:function(){return d},a:function(){return c}});var s=i(1699);let l={},r=s.createContext(l);function c(n){let e=s.useContext(r);return s.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function d(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(l):n.components||l:c(n.components),s.createElement(r.Provider,{value:e},n.children)}}}]);