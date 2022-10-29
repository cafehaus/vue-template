<script setup lang="ts">
import { ref, onMounted } from  'vue'
import { useRoute } from "vue-router"

const docUrl = ref('')
onMounted(() => {
  const router = useRoute()
  const query = router.query || {}
  const queryId = query.id
  console.log(queryId)
  
  if (queryId === '1') {
    docUrl.value = 'https://www.hao123.com'
  }
  if (queryId === '2') {
    docUrl.value = 'https://www.taobao.com'
  }
})
</script>

<template>
  <div class="page">
    {{ docUrl }}
    <iframe :src="docUrl" frameborder="0" />
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