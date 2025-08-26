<template>
  <div>
    <div class="u-toolbar">
      <input type="file" multiple @change="onSelect" />
      <button @click="cancelAll">取消全部</button>
    </div>
    <ul class="u-list">
      <li v-for="item in list" :key="item.name" class="u-item">
        <div class="u-row">
          <span class="u-name">{{ item.name }}</span>
          <span class="u-size">{{ Math.round(item.size/1024) }} KB</span>
          <span class="u-status" :class="'u-'+item.status">{{ item.status }}</span>
        </div>
        <div class="u-bar"><span :style="{ width: item.percent + '%' }"/></div>
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
  import { reactive } from 'vue'
  interface Item { name: string; size: number; uploaded: number; percent: number; status: 'pending'|'uploading'|'done'|'error'|'canceled' }
  const props = withDefaults(defineProps<{ chunkSize?: number; concurrency?: number }>(), { chunkSize: 256*1024, concurrency: 3 })
  const list = reactive<Item[]>([])
  const abort = reactive({ canceled: false })

  function simulateUploadChunk (file: File, start: number, end: number) {
    return new Promise<void>(resolve => setTimeout(resolve, 60 + Math.random()*140))
  }

  async function uploadFile (file: File) {
    const total = file.size
    const name = file.name
    let item = list.find(i=>i.name===name)
    if (!item) { item = { name, size: total, uploaded:0, percent:0, status:'uploading' }; list.push(item) }

    const chunks: Array<[number, number]> = []
    for (let start = 0; start < total; start += props.chunkSize) chunks.push([start, Math.min(start+props.chunkSize, total)])

    let uploaded = 0
    let cursor = 0
    async function worker(){
      while (cursor < chunks.length && !abort.canceled){
        const [start, end] = chunks[cursor++]
        await simulateUploadChunk(file, start, end)
        uploaded += (end - start)
        item!.uploaded = uploaded
        item!.percent = Math.min(100, Math.round(uploaded/total*100))
      }
    }
    const workers = Array.from({ length: Math.min(props.concurrency, chunks.length) }, ()=>worker())
    await Promise.all(workers)
    if (abort.canceled) { item!.status='canceled'; return }
    item!.status='done'; item!.percent=100; item!.uploaded=total
  }

  function onSelect (e: Event){
    const input = e.target as HTMLInputElement
    if (!input.files || !input.files.length) return
    abort.canceled = false
    Array.from(input.files).forEach(uploadFile)
    input.value = ''
  }

  function cancelAll(){ abort.canceled = true }
</script>

<style scoped>
  .u-toolbar{display:flex;gap:8px;align-items:center;margin-bottom:8px}
  .u-list{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:8px}
  .u-item{border:1px solid #d9d9d9;border-radius:6px;padding:8px}
  .u-row{display:flex;gap:12px;align-items:center;justify-content:space-between}
  .u-bar{height:6px;background:#f5f5f5;border-radius:3px;overflow:hidden;margin-top:6px}
  .u-bar>span{display:block;height:100%;background:#1677ff}
  .u-status{font-size:12px}
  .u-done{color:#52c41a}.u-error{color:#ff4d4f}.u-canceled{color:#999}
</style>
