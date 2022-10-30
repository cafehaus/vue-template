<script setup lang="ts">
// import { getCurrentInstance } from 'vue'
import { ref } from 'vue'
import { reactive } from 'vue'
import type { FormInstance, FormRules } from 'element-plus'
import { ElMessage, ElLoading } from 'element-plus'

function selectFolder() {
  window.electron.ipcRenderer.invoke('selectFolder').then(r => {
    form.folder = r
  })
}

const form = reactive({
  folder: '',
  name: '',
  color: '',
  api: '',
  plugin: []
})
const ruleFormRef = ref<FormInstance>()
const validateColor = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('请输入或在右侧选择主题色'))
  } else if (!/^#([0-9a-fA-F]{3}|[0-9a-fA-F]{6})$/.test(value)) {
    callback(new Error('格式错误，请输入或在右侧选择正确的十六进制颜色值'))
  } else {
    callback()
  }
}
const validateApi = (rule: any, value: any, callback: any) => {
  const urlReg = /^(https:\/\/)?[a-zA-Z_0-9\-@]+(\.\w[a-zA-Z_0-9\-:]+)+(\/[\(\)~#&\-=?\+\%/\.\w]+)?/
  if (!value) {
    callback(new Error('请输入接口地址'))
  } else if (!urlReg.test(value)) {
    callback(new Error('格式错误，请输入正确的接口地址'))
  } else {
    callback()
  }
}
const rules = reactive<FormRules>({
  folder: [{ required: true, message: '请选择代码目录', trigger: 'blur' }],
  name: [{ required: true, message: '请输入小程序名', trigger: 'blur' }],
  color: [{  required: true, validator: validateColor, trigger: 'change' }],
  api: [{  required: true, validator: validateApi, trigger: 'blur' }],
  plugin: [{ required: true, type: 'array', message: '请选择使用的插件', trigger: 'change' }],
})


const onSubmit = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      const loadingInstance = ElLoading.service({
        text: '努力生成中...'
      })
      window.electron.ipcRenderer.invoke('creatCode', JSON.parse(JSON.stringify(form))).then(r => {
        if (r === 'success') {
          ElMessage({
            showClose: true,
            message: '保存成功',
            type: 'success',
          })
        } else if (r === 'cancel') {
          ElMessage({
            showClose: true,
            message: '你取消了保存',
            type: 'info',
          })
        } else if (r === 'error') {
          ElMessage({
            showClose: true,
            message: '出错了',
            type: 'error',
          })
        }
        loadingInstance.close()
      })
    } else {
      ElMessage({
        showClose: true,
        message: '请输入所有必填项',
        type: 'error',
      })
    }
  })
}

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return
  formEl.resetFields()
}
</script>

<template>
  <main class="form">
    <div>
      <el-result icon="success" title="微慕专业版代码生成">
        <template #sub-title>
          <p>下载最新微慕专业版代码，通过下方配置可直接生成相应代码包</p>
        </template>
      </el-result>
    </div>
    <el-form
      ref="ruleFormRef"
      :model="form"
      :rules="rules"
      label-width="100px"
    >
      <el-form-item label="代码目录" prop="folder">
        <el-input v-model="form.folder">
          <template #append>
            <el-button type="primary" @click="selectFolder">选择目录</el-button>
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="小程序名" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="主题色" prop="color">
        <el-input v-model="form.color">
          <template #suffix>
            <el-color-picker v-model="form.color" />
          </template>
        </el-input>
      </el-form-item>
      <el-form-item label="接口地址" prop="api">
        <el-input v-model="form.api">
          <template #prepend>https://</template>
        </el-input>
      </el-form-item>
      <el-form-item label="插件" prop="plugin">
        <el-checkbox-group v-model="form.plugin">
          <el-checkbox label="1">积分插件</el-checkbox>
          <el-checkbox label="2">缓存插件</el-checkbox>
          <el-checkbox label="3">红包插件</el-checkbox>
          <el-checkbox label="4">视频号插件</el-checkbox>
          <el-checkbox label="5">腾讯视频插件</el-checkbox>
        </el-checkbox-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit(ruleFormRef)">生成</el-button>
        <el-button @click="resetForm(ruleFormRef)">重置</el-button>
      </el-form-item>
    </el-form>
  </main>
</template>
<style scoped>
.form {
  padding: 20px;
}
.form :deep().el-input__wrapper {
  padding: 1px 0 1px 11px;
}
</style>