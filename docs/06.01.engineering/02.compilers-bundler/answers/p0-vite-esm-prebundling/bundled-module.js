// 模拟由 esbuild 预构建聚合生成的单个 ESM 产物 (.vite/deps/lodash-es.js)
// 内部合并了原本分散在数十个微小文件中的 _baseDebounce, now, toNumber 等

export const utilsVersion = '1.0.0-prebundled';

export function debounce(func, wait) {
  let timeout;
  return function(...args) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func.apply(this, args), wait);
  };
}
