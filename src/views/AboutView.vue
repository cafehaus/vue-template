<template>
  <div class="about">
    <h1 @click="openFile">选择目录</h1>
    <span>目录：{{ pathUrl }}</span>
  </div>
</template>
<script>
export default {
  data() {
    return {
      pathUrl: ''
    }
  },
  methods: {
    openFile() {
      console.log('this.$electron')
      console.log(this.$electron)
      this.$electron.ipcRenderer.invoke('selectFolder').then(r => {
        this.pathUrl = r
      })
    }
  }
}
</script>

<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
