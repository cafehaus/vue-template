<script setup lang="ts">
import { useRouter, RouterLink } from "vue-router"
const router = useRouter()
// import { House, Notebook } from '@element-plus/icons-vue'
const handleNavigate = (route: string) => {
  router.push({
    path: route
  })
}

</script>

<template>
  <div class="layout-menu">
    <el-menu
      default-active="2"
      class="el-menu"
    >
      <el-menu-item index="1" @click="handleNavigate('/home')">
        <!-- <el-icon><House /></el-icon> -->
        <span>首页</span>
      </el-menu-item>
      <el-sub-menu index="2">
        <template #title>
          <!-- <el-icon><Notebook /></el-icon> -->
          <span>文档</span>
        </template>
        <el-menu-item index="1-1" @click="handleNavigate('/doc?id=1')">文档一</el-menu-item>
        <el-menu-item index="1-2" @click="handleNavigate('/doc?id=2')">文档二</el-menu-item>
      </el-sub-menu>
    </el-menu>
  </div>
</template>

<style scoped>
.layout-menu {
  height: 100vh;
}

.el-menu {
  height: 100vh;
}
</style>
