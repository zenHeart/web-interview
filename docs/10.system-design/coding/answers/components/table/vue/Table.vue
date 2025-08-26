<template>
  <div class="tbl-wrap" role="table" :aria-rowcount="data.length" :aria-colcount="columns.length">
    <table class="tbl">
      <thead>
        <tr>
          <th v-for="(c,i) in columns" :key="c.key" :style="{ width: c.width + 'px' }" :class="i===0 ? 'is-sticky-left' : ''">{{ c.title }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rIdx) in data" :key="rIdx">
          <td v-for="(c,i) in columns" :key="c.key" :class="i===0 ? 'is-sticky-left' : ''">{{ row[c.key] }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
  interface Column { key: string; title: string; width?: number }
  const props = defineProps<{ columns: Column[]; data: Record<string, any>[] }>()
</script>

<style scoped>
  .tbl-wrap{overflow:auto;max-height:260px;border:1px solid #d9d9d9;border-radius:6px}
  .tbl{border-collapse:separate;border-spacing:0;min-width:600px}
  th,td{padding:8px 12px;border-bottom:1px solid #f0f0f0;white-space:nowrap;background:#fff}
  thead th{position:sticky;top:0;background:#fafafa;z-index:2}
  .is-sticky-left{position:sticky;left:0;background:#fff;z-index:1}
</style>
