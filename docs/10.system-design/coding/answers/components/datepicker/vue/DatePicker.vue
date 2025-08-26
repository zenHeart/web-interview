<template>
  <input type="date" :value="modelValue||''" :min="min" :max="max" @input="e=>emit('update:modelValue',(e.target as HTMLInputElement).value)" aria-label="日期选择" />
</template>

<script setup lang="ts">
  const props = defineProps<{ modelValue?: string; min?: string; max?: string }>()
  const emit = defineEmits<{ (e:'update:modelValue', v:string): void }>()
</script>
