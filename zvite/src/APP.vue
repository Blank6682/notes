<template>
  <div>{{ title }}</div>
</template>

<script>
import { reactive, toRefs } from '@vue/reactivity'

export default {
  setup() {
    const data = reactive({ title: 'Hello ZVite Vue!' })
    return {
      ...toRefs(data),
    }
  },
}
</script>

<style scoped></style>
