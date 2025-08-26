<template>
  <div class="elv-wrap">
    <ul class="elv-nav">
      <li v-for="s in sections" :key="s.id" :class="active===s.id?'active':''" @click="go(s.id)" role="link" :aria-current="active===s.id?'true':undefined">{{ s.title }}</li>
    </ul>
    <div class="elv-content">
      <div v-for="s in sections" :key="s.id" :id="s.id" class="elv-section">{{ s.title }} 内容</div>
    </div>
  </div>
</template>

<script setup lang="ts">
  import { onMounted, onUnmounted, ref } from 'vue'
  const props = defineProps<{ sections: { id:string; title:string }[] }>()
  const active = ref(props.sections[0]?.id)
  let obs: IntersectionObserver | null = null
  onMounted(()=>{
    obs = new IntersectionObserver(entries=>{
      entries.forEach(e=>{ if(e.isIntersecting && e.intersectionRatio>0.65) active.value=(e.target as HTMLElement).id })
    }, { threshold: [0.2,0.3,0.4,0.5,0.6,0.7,0.8] })
    props.sections.forEach(s=>{ const el=document.getElementById(s.id); if(el) obs!.observe(el) })
  })
  onUnmounted(()=>{ obs?.disconnect() })
  function go(id:string){ document.getElementById(id)?.scrollIntoView({ behavior:'smooth', block:'center' }) }
</script>

<style scoped>
  .elv-wrap{display:flex;gap:16px}
  .elv-nav{list-style:none;margin:0;padding:0;position:sticky;top:8px}
  .elv-nav li{padding:6px 10px;cursor:pointer}
  .elv-nav li.active{background:#e6f4ff}
  .elv-content{height:360px;overflow:auto;border:1px solid #d9d9d9;border-radius:6px;padding:8px}
  .elv-section{height:300px;margin-bottom:12px;border-bottom:1px solid #f0f0f0}
</style>
