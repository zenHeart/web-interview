<template>
  <Carousel :items="['1','2','3']" :autoplay="true" :interval="1500" :width="320" :height="160" />
</template>

<script setup lang="ts">
  import Carousel from './Carousel.vue'
</script>
