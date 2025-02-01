"use strict";(self.webpackChunkweb_interview=self.webpackChunkweb_interview||[]).push([["858"],{5792:function(n,e,r){r.r(e),r.d(e,{default:()=>h,frontMatter:()=>o,metadata:()=>i,assets:()=>l,toc:()=>d,contentTitle:()=>s});var i=JSON.parse('{"id":"hybird/miniprogram","title":"\u5C0F\u7A0B\u5E8F","description":"\u5C0F\u7A0B\u5E8F\u7684\u5927\u6982\u539F\u7406?","source":"@site/docs/05.03.hybird/02.miniprogram.md","sourceDirName":"05.03.hybird","slug":"/hybird/miniprogram","permalink":"/web-interview/docs/hybird/miniprogram","draft":false,"unlisted":false,"tags":[],"version":"current","sidebarPosition":2,"frontMatter":{},"sidebar":"tutorialSidebar","previous":{"title":"rn","permalink":"/web-interview/docs/hybird/rn"},"next":{"title":"\u6982\u5FF5","permalink":"/web-interview/docs/engineering/concept"}}'),t=r("6773"),c=r("715");let o={},s="\u5C0F\u7A0B\u5E8F",l={},d=[{value:"\u5C0F\u7A0B\u5E8F\u7684\u5927\u6982\u539F\u7406?",id:"p0-miniprogram",level:2},{value:"391 \u5C0F\u7A0B\u5E8F\u4E3A\u4EC0\u4E48\u4F1A\u6709\u4E24\u4E2A\u7EBF\u7A0B",id:"p0-miniprogram",level:2},{value:"\u4E3A\u4EC0\u4E48\u5C0F\u7A0B\u5E8F\u62FF\u4E0D\u5230 dom",id:"\u4E3A\u4EC0\u4E48\u5C0F\u7A0B\u5E8F\u62FF\u4E0D\u5230-dom",level:2},{value:"\u6388\u6743\u767B\u5F55\u6D41\u7A0B",id:"\u6388\u6743\u767B\u5F55\u6D41\u7A0B",level:2},{value:"\u5FAE\u4FE1 auth \u6D41\u7A0B OAuth2.0 \u662F\u4EC0\u4E48\u767B\u5F55\u65B9\u5F0F",id:"p0-auth",level:2}];function a(n){let e={a:"a",code:"code",h1:"h1",h2:"h2",header:"header",img:"img",li:"li",ol:"ol",p:"p",pre:"pre",strong:"strong",ul:"ul",...(0,c.a)(),...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.header,{children:(0,t.jsx)(e.h1,{id:"\u5C0F\u7A0B\u5E8F",children:"\u5C0F\u7A0B\u5E8F"})}),"\n",(0,t.jsx)(e.h2,{id:"p0-miniprogram",children:"\u5C0F\u7A0B\u5E8F\u7684\u5927\u6982\u539F\u7406?"}),"\n",(0,t.jsxs)(e.p,{children:["\u5177\u4F53\u6D41\u7A0B\u53EF\u4EE5\u770B\u4E0B\u9762\u8FD9\u4E2A\u56FE\uFF1A\n",(0,t.jsx)(e.img,{src:"https://foruda.gitee.com/images/1681021603016376642/cc6178f0_7819612.png",alt:""})]}),"\n",(0,t.jsx)(e.p,{children:"\u8981\u4E86\u89E3\u5C0F\u7A0B\u5E8F\u67B6\u6784\u539F\u7406\uFF0C \u8981\u4ECE\u4EE5\u4E0B\u51E0\u4E2A\u65B9\u9762\u5165\u624B\u63A2\u7D22"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u5BBF\u4E3B\u73AF\u5883"}),"\n",(0,t.jsx)(e.li,{children:"\u6267\u884C\u73AF\u5883"}),"\n",(0,t.jsx)(e.li,{children:"\u5C0F\u7A0B\u5E8F\u6574\u4F53\u67B6\u6784"}),"\n",(0,t.jsx)(e.li,{children:"\u8FD0\u884C\u673A\u5236"}),"\n",(0,t.jsx)(e.li,{children:"\u66F4\u65B0\u673A\u5236"}),"\n",(0,t.jsx)(e.li,{children:"\u6570\u636E\u901A\u4FE1\u673A\u5236"}),"\n",(0,t.jsx)(e.li,{children:"\u767B\u5F55\u673A\u5236"}),"\n",(0,t.jsx)(e.li,{children:"\u6027\u80FD\u65B9\u5411\u95EE\u9898"}),"\n",(0,t.jsx)(e.li,{children:"JSCore"}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:"\u5177\u4F53\u5185\u5BB9\u53EF\u4EE5\u53C2\u8003\u6587\u6863:"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:(0,t.jsx)(e.a,{href:"https://juejin.cn/post/6976805521407868958",children:"\u8D44\u6599"})}),"\n"]}),"\n",(0,t.jsx)(e.h2,{id:"p0-miniprogram",children:"391 \u5C0F\u7A0B\u5E8F\u4E3A\u4EC0\u4E48\u4F1A\u6709\u4E24\u4E2A\u7EBF\u7A0B"}),"\n",(0,t.jsx)(e.p,{children:"\u5C0F\u7A0B\u5E8F\u4E4B\u6240\u4EE5\u6709\u4E24\u4E2A\u7EBF\u7A0B\uFF0C\u662F\u4E3A\u4E86\u5B9E\u73B0\u5C0F\u7A0B\u5E8F\u7684\u9AD8\u6548\u8FD0\u884C\u548C\u826F\u597D\u7684\u7528\u6237\u4F53\u9A8C\u3002"}),"\n",(0,t.jsxs)(e.ol,{children:["\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsx)(e.p,{children:"\u6E32\u67D3\u7EBF\u7A0B\uFF08UI \u7EBF\u7A0B\uFF09\uFF1A\n\u6E32\u67D3\u7EBF\u7A0B\u8D1F\u8D23\u5C0F\u7A0B\u5E8F\u754C\u9762\u7684\u6E32\u67D3\u548C\u54CD\u5E94\u7528\u6237\u7684\u4EA4\u4E92\u3002\u5B83\u4F7F\u7528 WebView \u8FDB\u884C\u9875\u9762\u6E32\u67D3\uFF0C\u5305\u62EC\u89E3\u6790\u548C\u7ED8\u5236 DOM\u3001\u5E03\u5C40\u3001\u6837\u5F0F\u8BA1\u7B97\u548C\u6E32\u67D3\u7B49\u64CD\u4F5C\u3002\u6E32\u67D3\u7EBF\u7A0B\u662F\u5355\u7EBF\u7A0B\u7684\uFF0C\u6240\u6709\u7684\u754C\u9762\u64CD\u4F5C\u90FD\u5728\u8FD9\u4E2A\u7EBF\u7A0B\u4E2D\u8FDB\u884C\u3002"}),"\n"]}),"\n",(0,t.jsxs)(e.li,{children:["\n",(0,t.jsx)(e.p,{children:"\u903B\u8F91\u7EBF\u7A0B\uFF08JS \u7EBF\u7A0B\uFF09\uFF1A\n\u903B\u8F91\u7EBF\u7A0B\u8D1F\u8D23\u5C0F\u7A0B\u5E8F\u7684\u903B\u8F91\u8FD0\u7B97\u548C\u6570\u636E\u5904\u7406\u3002\u5B83\u662F\u57FA\u4E8E JavaScript \u8FD0\u884C\u7684\uFF0C\u8D1F\u8D23\u5904\u7406\u7528\u6237\u4EA4\u4E92\u3001\u4E1A\u52A1\u903B\u8F91\u3001\u6570\u636E\u8BF7\u6C42\u3001\u4E8B\u4EF6\u5904\u7406\u7B49\u64CD\u4F5C\u3002\u903B\u8F91\u7EBF\u7A0B\u662F\u72EC\u7ACB\u4E8E\u6E32\u67D3\u7EBF\u7A0B\u7684\uFF0C\u53EF\u4EE5\u5E76\u884C\u5904\u7406\u591A\u4E2A\u4EFB\u52A1\uFF0C\u907F\u514D\u963B\u585E\u754C\u9762\u7684\u6E32\u67D3\u548C\u54CD\u5E94\u3002"}),"\n"]}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:"\u5C06\u754C\u9762\u6E32\u67D3\u548C\u903B\u8F91\u8FD0\u7B97\u5206\u79BB\u6210\u4E24\u4E2A\u7EBF\u7A0B\u7684\u8BBE\u8BA1\u6709\u4EE5\u4E0B\u597D\u5904\uFF1A"}),"\n",(0,t.jsxs)(e.ul,{children:["\n",(0,t.jsx)(e.li,{children:"\u54CD\u5E94\u901F\u5EA6\uFF1A\u903B\u8F91\u7EBF\u7A0B\u548C\u6E32\u67D3\u7EBF\u7A0B\u5206\u5F00\uFF0C\u53EF\u4EE5\u5E76\u884C\u6267\u884C\uFF0C\u63D0\u9AD8\u4E86\u5C0F\u7A0B\u5E8F\u7684\u54CD\u5E94\u901F\u5EA6\u548C\u7528\u6237\u4F53\u9A8C\u3002"}),"\n",(0,t.jsx)(e.li,{children:"\u9632\u6B62\u963B\u585E\uFF1A\u903B\u8F91\u7EBF\u7A0B\u7684\u8FD0\u884C\u4E0D\u4F1A\u963B\u585E\u6E32\u67D3\u7EBF\u7A0B\uFF0C\u907F\u514D\u4E86\u957F\u65F6\u95F4\u7684\u8BA1\u7B97\u6216\u6570\u636E\u5904\u7406\u5BFC\u81F4\u754C\u9762\u5361\u987F\u6216\u65E0\u54CD\u5E94\u7684\u60C5\u51B5\u3002"}),"\n",(0,t.jsx)(e.li,{children:"\u8D44\u6E90\u9694\u79BB\uFF1A\u6E32\u67D3\u7EBF\u7A0B\u548C\u903B\u8F91\u7EBF\u7A0B\u662F\u72EC\u7ACB\u7684\uFF0C\u5B83\u4EEC\u6709\u5404\u81EA\u7684\u8D44\u6E90\u548C\u8FD0\u884C\u73AF\u5883\uFF0C\u53EF\u4EE5\u907F\u514D\u76F8\u4E92\u5E72\u6270\u548C\u5F71\u54CD\u3002"}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:"\u9700\u8981\u6CE8\u610F\u7684\u662F\uFF0C\u5C0F\u7A0B\u5E8F\u7684\u6E32\u67D3\u7EBF\u7A0B\u548C\u903B\u8F91\u7EBF\u7A0B\u4E4B\u95F4\u901A\u8FC7\u5FAE\u4FE1\u5BA2\u6237\u7AEF\u8FDB\u884C\u901A\u4FE1\u548C\u4EA4\u4E92\u3002\u903B\u8F91\u7EBF\u7A0B\u53EF\u4EE5\u53D1\u9001\u8BF7\u6C42\u7ED9\u5FAE\u4FE1\u5BA2\u6237\u7AEF\uFF0C\u7136\u540E\u5BA2\u6237\u7AEF\u5C06\u6E32\u67D3\u6307\u4EE4\u53D1\u9001\u7ED9\u6E32\u67D3\u7EBF\u7A0B\u8FDB\u884C\u754C\u9762\u6E32\u67D3\uFF0C\u540C\u65F6\u6E32\u67D3\u7EBF\u7A0B\u53EF\u4EE5\u5C06\u7528\u6237\u7684\u4EA4\u4E92\u4E8B\u4EF6\u53D1\u9001\u7ED9\u903B\u8F91\u7EBF\u7A0B\u8FDB\u884C\u5904\u7406\u3002\u8FD9\u79CD\u901A\u4FE1\u65B9\u5F0F\u4FDD\u8BC1\u4E86\u6E32\u67D3\u548C\u903B\u8F91\u7684\u534F\u540C\u5DE5\u4F5C\uFF0C\u5B9E\u73B0\u4E86\u5C0F\u7A0B\u5E8F\u7684\u6B63\u5E38\u8FD0\u884C\u3002"}),"\n",(0,t.jsx)(e.p,{children:"\u5C0F\u7A0B\u5E8F\u4E4B\u6240\u4EE5\u6709\u4E24\u4E2A\u7EBF\u7A0B\uFF0C\u662F\u4E3A\u4E86\u63D0\u9AD8\u6E32\u67D3\u901F\u5EA6\u3001\u907F\u514D\u963B\u585E\u548C\u8D44\u6E90\u9694\u79BB\u3002\u6E32\u67D3\u7EBF\u7A0B\u8D1F\u8D23\u754C\u9762\u6E32\u67D3\uFF0C\u903B\u8F91\u7EBF\u7A0B\u8D1F\u8D23\u4E1A\u52A1\u903B\u8F91\u548C\u6570\u636E\u5904\u7406\uFF0C\u4E24\u8005\u901A\u8FC7\u5FAE\u4FE1\u5BA2\u6237\u7AEF\u8FDB\u884C\u901A\u4FE1\u548C\u4EA4\u4E92\uFF0C\u5171\u540C\u5B9E\u73B0\u5C0F\u7A0B\u5E8F\u7684\u529F\u80FD\u548C\u6027\u80FD\u3002"}),"\n",(0,t.jsx)(e.h2,{id:"\u4E3A\u4EC0\u4E48\u5C0F\u7A0B\u5E8F\u62FF\u4E0D\u5230-dom",children:"\u4E3A\u4EC0\u4E48\u5C0F\u7A0B\u5E8F\u62FF\u4E0D\u5230 dom"}),"\n",(0,t.jsx)(e.p,{children:"\u5C0F\u7A0B\u5E8F\u4E3A\u4E86\u8FFD\u6C42\u66F4\u9AD8\u7684\u6027\u80FD\u548C\u66F4\u597D\u7684\u5B89\u5168\u6027\uFF0C\u91C7\u7528\u4E86\u7C7BWebview\u7684\u6E32\u67D3\u65B9\u6848\uFF0C\u5E76\u4F7F\u7528\u4E86\u81EA\u5DF1\u7684\u6E32\u67D3\u5F15\u64CE\uFF0C\u4E0E\u6D4F\u89C8\u5668\u7684\u6E32\u67D3\u5F15\u64CE\u4E0D\u540C\u3002\u56E0\u6B64\uFF0C\u5C0F\u7A0B\u5E8F\u7684API\u548C\u6D4F\u89C8\u5668\u7684API\u5E76\u4E0D\u5B8C\u5168\u76F8\u540C\u3002"}),"\n",(0,t.jsx)(e.p,{children:"\u5728\u5C0F\u7A0B\u5E8F\u4E2D\uFF0C\u5F00\u53D1\u8005\u53EF\u4EE5\u4F7F\u7528WXML\u8BED\u8A00\u6784\u5EFA\u9875\u9762\uFF0CWXML\u662F\u4E00\u79CD\u7C7B\u4F3CHTML\u7684\u6807\u8BB0\u8BED\u8A00\uFF0C\u4F46\u5E76\u4E0D\u662F\u771F\u6B63\u7684HTML\u3002\u5C0F\u7A0B\u5E8F\u4E2D\u7684\u7EC4\u4EF6\u662F\u7531\u5F00\u53D1\u8005\u63D0\u524D\u5B9A\u4E49\u597D\u7684\uFF0C\u800C\u4E0D\u662F\u7531\u5F00\u53D1\u8005\u5728\u8FD0\u884C\u65F6\u52A8\u6001\u751F\u6210\u7684\uFF0C\u56E0\u6B64\u5728\u5C0F\u7A0B\u5E8F\u4E2D\u65E0\u6CD5\u76F4\u63A5\u8BBF\u95EE\u548C\u64CD\u4F5CDOM\u3002\u76F8\u53CD\uFF0C\u5F00\u53D1\u8005\u9700\u8981\u4F7F\u7528\u5C0F\u7A0B\u5E8F\u63D0\u4F9B\u7684API\u6765\u64CD\u4F5C\u7EC4\u4EF6\u3002"}),"\n",(0,t.jsx)(e.p,{children:"\u540C\u65F6\uFF0C\u5C0F\u7A0B\u5E8F\u4E3A\u4E86\u4FDD\u8BC1\u5B89\u5168\u6027\uFF0C\u4E5F\u9650\u5236\u4E86\u4E00\u4E9B\u64CD\u4F5C\uFF0C\u5982\u4E0D\u5141\u8BB8\u4F7F\u7528eval\u51FD\u6570\u548CFunction\u6784\u9020\u51FD\u6570\u7B49\u52A8\u6001\u751F\u6210\u4EE3\u7801\u7684\u65B9\u5F0F\u3002"}),"\n",(0,t.jsx)(e.h2,{id:"\u6388\u6743\u767B\u5F55\u6D41\u7A0B",children:"\u6388\u6743\u767B\u5F55\u6D41\u7A0B"}),"\n",(0,t.jsx)(e.h2,{id:"p0-auth",children:"\u5FAE\u4FE1 auth \u6D41\u7A0B OAuth2.0 \u662F\u4EC0\u4E48\u767B\u5F55\u65B9\u5F0F"}),"\n",(0,t.jsx)(e.p,{children:"OAuth2.0\u5E76\u4E0D\u662F\u4E00\u79CD\u7279\u5B9A\u7684\u767B\u5F55\u65B9\u5F0F\uFF0C\u800C\u662F\u4E00\u79CD\u6388\u6743\u6846\u67B6\uFF0C\u7528\u4E8E\u6388\u6743\u7B2C\u4E09\u65B9\u5E94\u7528\u8BBF\u95EE\u7528\u6237\u7684\u8D44\u6E90\u3002\u5B83\u88AB\u5E7F\u6CDB\u5E94\u7528\u4E8E\u8EAB\u4EFD\u9A8C\u8BC1\u548C\u6388\u6743\u7684\u573A\u666F\u4E2D\u3002"}),"\n",(0,t.jsx)(e.p,{children:"OAuth2.0\u901A\u8FC7\u5F15\u5165\u6388\u6743\u670D\u52A1\u5668\u3001\u8D44\u6E90\u670D\u52A1\u5668\u548C\u5BA2\u6237\u7AEF\u7B49\u89D2\u8272\uFF0C\u5B9E\u73B0\u4E86\u7528\u6237\u6388\u6743\u548C\u8D44\u6E90\u8BBF\u95EE\u7684\u5206\u79BB\u3002\u5177\u4F53\u6D41\u7A0B\u5982\u4E0B\uFF1A"}),"\n",(0,t.jsxs)(e.ol,{children:["\n",(0,t.jsx)(e.li,{children:"\u7528\u6237\u5411\u5BA2\u6237\u7AEF\u53D1\u8D77\u8BF7\u6C42\uFF0C\u8BF7\u6C42\u8BBF\u95EE\u67D0\u4E2A\u8D44\u6E90\u3002"}),"\n",(0,t.jsx)(e.li,{children:"\u5BA2\u6237\u7AEF\u5C06\u7528\u6237\u91CD\u5B9A\u5411\u5230\u6388\u6743\u670D\u52A1\u5668\uFF0C\u5E76\u643A\u5E26\u81EA\u5DF1\u7684\u8EAB\u4EFD\u51ED\u8BC1\uFF08\u5BA2\u6237\u7AEFID\uFF09\u3002"}),"\n",(0,t.jsx)(e.li,{children:"\u7528\u6237\u5728\u6388\u6743\u670D\u52A1\u5668\u767B\u5F55\uFF0C\u5E76\u6388\u6743\u5BA2\u6237\u7AEF\u8BBF\u95EE\u7279\u5B9A\u7684\u8D44\u6E90\u3002"}),"\n",(0,t.jsx)(e.li,{children:"\u6388\u6743\u670D\u52A1\u5668\u9A8C\u8BC1\u7528\u6237\u8EAB\u4EFD\uFF0C\u5E76\u751F\u6210\u8BBF\u95EE\u4EE4\u724C\uFF08Access Token\uFF09\u3002"}),"\n",(0,t.jsx)(e.li,{children:"\u6388\u6743\u670D\u52A1\u5668\u5C06\u8BBF\u95EE\u4EE4\u724C\u53D1\u9001\u7ED9\u5BA2\u6237\u7AEF\u3002"}),"\n",(0,t.jsx)(e.li,{children:"\u5BA2\u6237\u7AEF\u4F7F\u7528\u8BBF\u95EE\u4EE4\u724C\u5411\u8D44\u6E90\u670D\u52A1\u5668\u8BF7\u6C42\u8BBF\u95EE\u8D44\u6E90\u3002"}),"\n",(0,t.jsx)(e.li,{children:"\u8D44\u6E90\u670D\u52A1\u5668\u9A8C\u8BC1\u8BBF\u95EE\u4EE4\u724C\u7684\u6709\u6548\u6027\uFF0C\u5E76\u6839\u636E\u6743\u9650\u51B3\u5B9A\u662F\u5426\u5141\u8BB8\u8BBF\u95EE\u8D44\u6E90\u3002"}),"\n",(0,t.jsx)(e.li,{children:"\u8D44\u6E90\u670D\u52A1\u5668\u5411\u5BA2\u6237\u7AEF\u8FD4\u56DE\u8BF7\u6C42\u7684\u8D44\u6E90\u3002"}),"\n"]}),"\n",(0,t.jsx)(e.p,{children:"\u5728\u8FD9\u4E2A\u8FC7\u7A0B\u4E2D\uFF0COAuth2.0\u901A\u8FC7\u8BBF\u95EE\u4EE4\u724C\u5B9E\u73B0\u4E86\u7528\u6237\u548C\u8D44\u6E90\u670D\u52A1\u5668\u4E4B\u95F4\u7684\u8EAB\u4EFD\u6388\u6743\u548C\u8D44\u6E90\u8BBF\u95EE\u5206\u79BB\u3002\u5BA2\u6237\u7AEF\u65E0\u9700\u77E5\u9053\u6216\u5B58\u50A8\u7528\u6237\u7684\u51ED\u8BC1\uFF08\u5982\u7528\u6237\u540D\u548C\u5BC6\u7801\uFF09\uFF0C\u800C\u662F\u4F7F\u7528\u8BBF\u95EE\u4EE4\u724C\u4EE3\u8868\u7528\u6237\u5411\u8D44\u6E90\u670D\u52A1\u5668\u8BF7\u6C42\u8D44\u6E90\uFF0C\u63D0\u4F9B\u4E86\u66F4\u5B89\u5168\u548C\u4FBF\u6377\u7684\u6388\u6743\u65B9\u5F0F\u3002"}),"\n",(0,t.jsxs)(e.p,{children:[(0,t.jsx)(e.strong,{children:"\u4EE5\u4E0B\u662F\u4F7F\u7528Fetch API\u6765\u53D1\u8D77\u8BF7\u6C42\u7684\u793A\u4F8B\u4EE3\u7801"}),"\uFF1A"]}),"\n",(0,t.jsx)(e.pre,{children:(0,t.jsx)(e.code,{className:"language-js",children:"// 1. \u5BA2\u6237\u7AEF\u5E94\u7528\u7A0B\u5E8F\u53D1\u8D77\u6388\u6743\u8BF7\u6C42\uFF0C\u91CD\u5B9A\u5411\u7528\u6237\u5230\u6388\u6743\u670D\u52A1\u5668\u7684\u767B\u5F55\u9875\u9762\n\nconst authorizationEndpoint = 'https://example.com/oauth2/auth'\nconst clientId = 'your_client_id'\nconst redirectUri = 'https://yourapp.com/callback'\nconst scope = 'read write'\nconst state = 'random_state_value'\n\nconst authorizationUrl = `${authorizationEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scope}&state=${state}`\n\n// \u91CD\u5B9A\u5411\u7528\u6237\u5230\u6388\u6743\u9875\u9762\nwindow.location.href = authorizationUrl\n\n// 2. \u5728\u56DE\u8C03URL\u4E2D\u83B7\u53D6\u6388\u6743\u7801\n\nconst callbackUrl = window.location.href\nconst urlParams = new URLSearchParams(callbackUrl.split('?')[1])\nconst authorizationCode = urlParams.get('code')\n\n// 3. \u5BA2\u6237\u7AEF\u5E94\u7528\u7A0B\u5E8F\u4F7F\u7528\u6388\u6743\u7801\u5411\u6388\u6743\u670D\u52A1\u5668\u8BF7\u6C42\u8BBF\u95EE\u4EE4\u724C\n\nconst tokenEndpoint = 'https://example.com/oauth2/token'\nconst clientSecret = 'your_client_secret'\n\nconst tokenData = {\n  grant_type: 'authorization_code',\n  code: authorizationCode,\n  redirect_uri: redirectUri,\n  client_id: clientId,\n  client_secret: clientSecret\n}\n\n// \u4F7F\u7528Fetch API\u8BF7\u6C42\u8BBF\u95EE\u4EE4\u724C\nfetch(tokenEndpoint, {\n  method: 'POST',\n  headers: {\n    'Content-Type': 'application/x-www-form-urlencoded'\n  },\n  body: new URLSearchParams(tokenData)\n})\n  .then(response => response.json())\n  .then(data => {\n    const accessToken = data.access_token\n\n    // 4. \u5BA2\u6237\u7AEF\u5E94\u7528\u7A0B\u5E8F\u4F7F\u7528\u8BBF\u95EE\u4EE4\u724C\u5411\u8D44\u6E90\u670D\u52A1\u5668\u8BF7\u6C42\u53D7\u4FDD\u62A4\u7684\u8D44\u6E90\n    const resourceEndpoint = 'https://example.com/api/resource'\n\n    // \u4F7F\u7528Fetch API\u8BF7\u6C42\u53D7\u4FDD\u62A4\u7684\u8D44\u6E90\n    fetch(resourceEndpoint, {\n      method: 'GET',\n      headers: {\n        Authorization: `Bearer ${accessToken}`\n      }\n    })\n      .then(response => response.json())\n      .then(resourceData => {\n        // \u5904\u7406\u8FD4\u56DE\u7684\u8D44\u6E90\u6570\u636E\n        console.log(resourceData)\n      })\n      .catch(error => {\n        console.error('Failed to retrieve resource:', error)\n      })\n  })\n  .catch(error => {\n    console.error('Failed to retrieve access token:', error)\n  })\n"})}),"\n",(0,t.jsxs)(e.p,{children:["\u8BF7\u6CE8\u610F\uFF0C\u4E0A\u8FF0\u4EE3\u7801\u4F7F\u7528\u4E86Fetch API\u6765\u53D1\u9001HTTP\u8BF7\u6C42\u3002\u5B83\u4F7F\u7528\u4E86",(0,t.jsx)(e.code,{children:"fetch"}),"\u51FD\u6570\u6765\u53D1\u9001POST\u8BF7\u6C42\u4EE5\u83B7\u53D6\u8BBF\u95EE\u4EE4\u724C\uFF0C\u5E76\u4F7F\u7528\u4E86",(0,t.jsx)(e.code,{children:"Authorization"}),"\u5934\u90E8\u6765\u53D1\u9001\u8BBF\u95EE\u4EE4\u724C\u83B7\u53D6\u53D7\u4FDD\u62A4\u7684\u8D44\u6E90\u3002\u786E\u4FDD\u4F60\u7684\u6D4F\u89C8\u5668\u652F\u6301Fetch API\uFF0C\u6216\u8005\u5728\u65E7\u7248\u6D4F\u89C8\u5668\u4E2D\u4F7F\u7528polyfill\u5E93\u6765\u517C\u5BB9\u3002\u4E0E\u4E4B\u524D\u7684\u4EE3\u7801\u793A\u4F8B\u4E00\u6837\uFF0C\u4F60\u9700\u8981\u6839\u636E\u4F60\u7684\u60C5\u51B5\u66FF\u6362URL\u548C\u53C2\u6570\u503C\u3002"]})]})}function h(n={}){let{wrapper:e}={...(0,c.a)(),...n.components};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(a,{...n})}):a(n)}},715:function(n,e,r){r.d(e,{Z:function(){return s},a:function(){return o}});var i=r(1699);let t={},c=i.createContext(t);function o(n){let e=i.useContext(c);return i.useMemo(function(){return"function"==typeof n?n(e):{...e,...n}},[e,n])}function s(n){let e;return e=n.disableParentContext?"function"==typeof n.components?n.components(t):n.components||t:o(n.components),i.createElement(c.Provider,{value:e},n.children)}}}]);