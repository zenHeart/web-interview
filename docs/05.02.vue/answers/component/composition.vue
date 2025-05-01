<template>
  <div>
    <h1>{{ message }}</h1>
    <button @click="incrementCounter">Click Me</button>
    <p>Counter: {{ counter }}</p>
  </div>
</template>

<script setup>
  import { ref, onMounted } from "vue";
  // 直接消费组合式 api 定义组件
  const message = ref("Hello, Vue Composition API!");
  const counter = ref(0);
  const incrementCounter = () => {
    counter.value++;
  };
  onMounted(() => {
    console.log("Component created!");
  });
</script>

<style scoped>
  h1 {
    color: #42b983;
  }
  button {
    margin-top: 10px;
    padding: 5px 10px;
    background-color: #42b983;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
  }
  button:hover {
    background-color: #369870;
  }
</style>
