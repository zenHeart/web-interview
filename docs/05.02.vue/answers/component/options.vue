<template>
   <div>
      <h1>{{ message }}</h1>
      <button @click="incrementCounter">Click Me</button>
      <p>Counter: {{ counter }}</p>
   </div>
</template>

<script>
// 采用申明对象属性方式定义组件
export default {
   name: 'OptionsExample',
   data() {
      return {
         message: 'Hello, Vue Options API!',
         counter: 0
      };
   },
   methods: {
      incrementCounter() {
         this.counter++;
      }
   },
   created() {
      console.log('Component created!');
   }
};
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