<template>
  <div>
    <p>{{ message }}</p>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        message: "Hello, Vue!",
      };
    },
    beforeCreate() {
     console.group("Option API");
      console.log("beforeCreate: 组件实例初始化之前");
    },
    created() {
      console.log("created: 组件实例已创建，数据已初始化");
    },
    beforeMount() {
      console.log("beforeMount: DOM 尚未挂载");
    },
    mounted() {
      console.log("mounted: DOM 已挂载");
    },
    beforeUpdate() {
      console.log("beforeUpdate: 数据更新，DOM 尚未更新");
    },
    updated() {
      console.log("updated: 数据更新，DOM 已更新");
    },
    beforeUnmount() {
      console.log("beforeUnmount: 组件即将卸载");
    },
    unmounted() {
      console.log("unmounted: 组件已卸载");
      console.groupEnd("Option API");
    },
  };
</script>
