<template>
  <div id="app" class="app">
    <RouterView v-if="isRouterAlive" />
  </div>
</template>

<script>
  export default {
    name: 'App',
    data() {
      return {
        isRouterAlive: true,
      }
    },

    provide() {
      return {
        reload: this.reload,
      }
    },

    methods: {
      // 刷新页面
      reload() {
        this.isRouterAlive = false
        this.$nextTick(() => (this.isRouterAlive = true))
      },
    },
  }
</script>
