<script setup lang="ts">
import { useRouter } from "vue-router"
import { Notification, Goods, Memo, Expand, Fold} from '@element-plus/icons-vue'
import { ref } from 'vue'
const router = useRouter()
const handleNavigate = (path: string, t?: string) => {
  if (path === '/doc') {
    router.push({
      path,
      query: {
        id: t
      }
    })
  } else {
    router.push({
      path
    })
  }
}

let isFold = ref(false)
const handleFold = () => {
  isFold.value = !isFold.value
}

</script>

<template>
  <div class="layout-menu">
    <el-menu
      default-active="1"
      :collapse="isFold"
      class="el-menu"
    >
      <el-menu-item index="1" @click="handleNavigate('/home')">
        <el-icon><Notification /></el-icon>
        <span>首页</span>
      </el-menu-item>
      <el-menu-item index="2" @click="handleNavigate('/doc', 'https://shops.minapper.com/')">
        <el-icon><Goods /></el-icon>
        <span>微慕商城</span>
      </el-menu-item>
      <el-sub-menu index="3">
        <template #title>
          <el-icon><Memo /></el-icon>
          <span>安装文档</span>
        </template>
        <el-menu-item index="3-1" @click="handleNavigate('/doc', 'https://forum.minapper.com/')">微慕论坛</el-menu-item>
        <el-menu-item index="3-2" @click="handleNavigate('/doc', 'https://docs.minapper.com/minpro/default.html')">专业版文档</el-menu-item>
        <el-menu-item index="4-3" @click="handleNavigate('/doc', 'https://docs.minapper.com/minplus/default.html')">增强版文档</el-menu-item>
        <el-menu-item index="3-4" @click="handleNavigate('/doc', 'https://docs.minapper.com/minfree/default.html')">开源版文档</el-menu-item>
      </el-sub-menu>

      <!-- 展开折叠按钮 -->
      <span class="btn-expand" @click="handleFold">
        <el-icon v-show="isFold"><Expand /></el-icon>
        <el-icon v-show="!isFold"><Fold /></el-icon>
      </span>
    </el-menu>
  </div>
</template>

<style scoped>
.layout-menu {
  height: 100vh;
}

.el-menu {
  height: 100vh;
  position: relative;
}

.btn-expand {
  position: absolute;
  bottom: 20px;
  right: 20px;
  cursor: pointer;
  color: #888;
}
</style>
