<script setup>
import { ref, defineAsyncComponent } from 'vue'

// 定义一个状态变量
const msg = ref('Hello World!')

// 异步组件加载成功的情况
const AasyncComp = defineAsyncComponent({
   loader: () => import('./AsyncComp.vue'), // 正确路径
   loadingComponent: {
      template: '<div>Loading...</div>',
   },
   errorComponent: {
      template: '<div>Failed to load component.</div>',
   },
   delay: 200, // 延迟显示加载组件
   timeout: 3000, // 超时时间
   onError(error, retry, fail, attempts) {
      console.error('Error loading component:', error)
      if (attempts <= 3) {
         retry() // 重试加载
      } else {
         fail() // 失败
      }
   },
})

// 异步组件加载失败的情况
const BrokenAsyncComp = defineAsyncComponent({
   loader: () => import('./NonExistentComp.vue'), // 错误路径
   loadingComponent: {
      template: '<div>Loading...</div>',
   },
   errorComponent: {
      template: '<div>Failed to load component.</div>',
   },
   delay: 200,
   timeout: 3000,
   onError(error, retry, fail, attempts) {
      console.error('Error loading component:', error)
      if (attempts <= 3) {
         retry()
      } else {
         fail()
      }
   },
})
</script>

<template>
   <h2>正常加载异步组件：</h2>
   <AasyncComp />
   <h2>加载失败的异步组件：</h2>
   <BrokenAsyncComp />
</template>
