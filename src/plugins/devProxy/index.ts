import type { Plugin, LoadContext } from "@docusaurus/types";

export default function devProxy(context: LoadContext, options: any): Plugin {
   return {
      name: "custom-webpack-dev-proxy",
      configureWebpack(config, isServer): any {
          return {
            devServer: {
               headers: {
                  "Access-Control-Allow-Origin": "*",
               },
               proxy: {
                 "/api": {
                   target: "http://localhost:11434",
                   secure: false,
                   changeOrigin: true,
                   logLevel: "debug",
                   onProxyRes: (proxyRes: any, req: { method: string; url: string }, res: any) => {
                        console.log(
                           proxyRes,
                          `[Proxy] ${req.method} ${req.url} -> ${proxyRes.req.protocol}//${proxyRes.req.host}${proxyRes.req.path}`
                        );
                     },
                 },
               },
            },
          };
      },
    
   };
}
