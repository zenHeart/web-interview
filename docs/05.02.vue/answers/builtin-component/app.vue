<template>
  <div>
    <h2>&lt;Transition&gt; 示例</h2>
    <button @click="show = !show">切换</button>
    <Transition name="fade">
      <p v-if="show">淡入淡出内容</p>
    </Transition>

    <h2>&lt;TransitionGroup&gt; 示例</h2>
    <button @click="addItem">添加</button>
    <button @click="removeItem">移除</button>
    <TransitionGroup name="list" tag="ul">
      <li v-for="item in items" :key="item">{{ item }}</li>
    </TransitionGroup>

    <h2>&lt;KeepAlive&gt; 示例</h2>
    <button @click="tab = 'A'">组件A</button>
    <button @click="tab = 'B'">组件B</button>
    <KeepAlive>
      <component :is="tabComponent"></component>
    </KeepAlive>

    <h2>&lt;Teleport&gt; 示例</h2>
    <Teleport to="body">
      <div class="teleport-box">这是被 Teleport 到 body 的内容</div>
    </Teleport>

    <h2>&lt;Suspense&gt; 示例</h2>
    <Suspense>
      <template #default>
        <AsyncComp />
      </template>
      <template #fallback>
        <div>加载中...</div>
      </template>
    </Suspense>

    <h2>&lt;slot&gt; 示例</h2>
    <SlotDemo>
      <template #default>插槽内容</template>
    </SlotDemo>

    <h2>&lt;template&gt; 示例</h2>
    <ul>
      <template v-for="(n) in 2">
        <li>模板循环项 {{ n }}</li>
      </template>
    </ul>

    <h2>&lt;component&gt; 示例</h2>
    <component :is="dynamicComp"></component>
  </div>
</template>

<script setup>
import { ref, defineAsyncComponent, computed } from 'vue'
import CompA from './CompA.vue'
import CompB from './CompB.vue'
import SlotDemo from './SlotDemo.vue'

const show = ref(true)
const items = ref([1, 2, 3])
const addItem = () => items.value.push(items.value.length + 1)
const removeItem = () => items.value.pop()

const tab = ref('A')
const tabComponent = computed(() => (tab.value === 'A' ? CompA : CompB))

const AsyncComp = defineAsyncComponent(() =>
  new Promise(resolve => setTimeout(() => resolve(CompA), 1000))
)

const dynamicComp = ref('CompA')

</script>

<style scoped>
.fade-enter-active, .fade-leave-active { transition: opacity .5s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
.list-enter-active, .list-leave-active { transition: all .5s; }
.list-enter-from, .list-leave-to { opacity: 0; transform: translateY(30px);}
.teleport-box { position: fixed; top: 10px; right: 10px; background: #eee; padding: 10px;}
</style>
