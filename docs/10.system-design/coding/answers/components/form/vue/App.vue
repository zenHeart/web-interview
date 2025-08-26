<template>
  <form @submit.prevent="onSubmit">
    <div>
      <label>姓名</label>
      <input :aria-invalid="!!errors.name" :value="values.name || ''" @input="e => setValue('name', e.target.value)" />
      <span v-if="errors.name" role="alert">{{ errors.name }}</span>
    </div>
    <div>
      <label>邮箱</label>
      <input :aria-invalid="!!errors.mail" :value="values.mail || ''" @input="e => setValue('mail', e.target.value)" />
      <span v-if="errors.mail" role="alert">{{ errors.mail }}</span>
    </div>
    <button type="submit">提交</button>
  </form>
</template>

<script setup lang="ts">
  import { useForm, required, email } from './useForm'
  const { values, errors, setValue, validate } = useForm({ name: '', mail: '' }, { name: [required()], mail: [required(), email()] })
  function onSubmit(){ validate().then(ok => console.log('valid:', ok, values, errors)) }
</script>
