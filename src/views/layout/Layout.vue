<script setup lang="ts">
import { RouterView } from "vue-router";
import Menu from "./Menu.vue";
</script>

<template>
  <div class="layout">
    <el-container>
      <el-aside width="auto">
        <Menu />
      </el-aside>
      <el-main>
        <RouterView />
      </el-main>
    </el-container>
  </div>
</template>

<style scoped>
.layout {
  width: 100vw;
  min-height: 100vh;
}

.layout :deep().el-main {
  padding: 0;
}
</style>
