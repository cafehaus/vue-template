<script setup lang="ts">
import { ref, watch } from  'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const query = route.query || {}
let queryId: any = ref(query.id)
watch(() => route.query, (val: any) => {
  queryId.value = val.id
})
</script>

<template>
  <div class="page">
    <iframe :src="queryId" frameborder="0" />
  </div>
</template>
<style scoped>
.page {
  width: 100%;
  height: 100%;
}

iframe  {
  width: 100%;
  height: 100%;
}
</style>