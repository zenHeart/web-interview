<template>
  <Elevator :sections="sections" />
</template>

<script setup lang="ts">
  import Elevator from './Elevator.vue'
  const sections = [ { id:'s1', title:'一' }, { id:'s2', title:'二' }, { id:'s3', title:'三' } ]
</script>
