<template>
  <div class="view">
    <p class="g-main-title">账号管理</p>
    <div class="form-box">
      <Form ref="form" :model="form" :rules="rules" class="form">
        <FormItem label="公司名称" prop="companyName">
          <Input class="g-input" v-model="form.companyName" disabled placeholder="请输入公司名称" />
        </FormItem>
        <FormItem label="手机号码" prop="phone">
          <Input class="g-input" v-model="form.phone" disabled placeholder="请输入手机号码" />
        </FormItem>
        <FormItem label="当前密码" prop="oldPassword">
          <Input type="password" style="position:absolute; top: -100px; z-index: -1" />
          <Input
            class="g-input"
            v-model.trim="form.oldPassword"
            :maxlength="20"
            type="password"
            password
            placeholder="请输入当前密码"
            clearable
          />
        </FormItem>
        <FormItem label="新密码" prop="newPassword">
          <Input
            class="g-input"
            v-model.trim="form.newPassword"
            :maxlength="20"
            type="password"
            password
            placeholder="请输入新密码"
            clearable
          />
        </FormItem>
        <FormItem label="请确认" prop="rePassword">
          <Input
            class="g-input"
            v-model.trim="form.rePassword"
            :maxlength="20"
            type="password"
            password
            placeholder="请确认新密码"
            clearable
          />
        </FormItem>
      </Form>

      <div class="action">
        <Button type="primary" class="btn" @click="onSave">保存</Button>
      </div>
    </div>
  </div>
</template>

<script>
  import { cookie } from '@/libs/utils'
  import md5 from 'js-md5'
  export default {
    data() {
      return {
        userName: cookie('username'),
        phone: cookie('phone'),
        form: {},
        rules: {
          oldPassword: [
            {
              required: true,
              trigger: 'change|blur',
              validator: (rule, value, callback) => {
                if (!value) {
                  callback(new Error('请输入密码'))
                } else if (!/^[0-9A-Za-z]{6,20}$/.test(value)) {
                  callback(new Error('密码格式错误(数字或字母，6-20位)'))
                } else {
                  callback()
                }
              },
            },
          ],
          newPassword: [
            {
              required: true,
              trigger: 'change|blur',
              validator: (rule, value, callback) => {
                if (!value) {
                  callback(new Error('请输入密码'))
                } else if (!/^[0-9A-Za-z]{6,20}$/.test(value)) {
                  callback(new Error('密码格式错误(数字或字母，6-20位)'))
                } else {
                  callback()
                }
              },
            },
          ],
          rePassword: [
            {
              required: true,
              trigger: 'change|blur',
              validator: (rule, value, callback) => {
                if (!value) {
                  callback(new Error('请确认密码'))
                } else if (this.form.rePassword !== this.form.newPassword) {
                  callback(new Error('两次密码不一致'))
                } else {
                  callback()
                }
              },
            },
          ],
        },
      }
    },

    created() {
      this.initData()
    },

    methods: {
      initData() {
        this.form.companyName = this.userName
        this.form.phone = this.phone
      },

      onSave() {
        this.$refs.form.validate(async (v) => {
          if (!v) return

          const res = await this.$api.modifyPassword({
            oldPassword: md5(this.form.oldPassword),
            newPassword: md5(this.form.newPassword),
            phone: this.form.phone,
          })
          if (res.code === '200') {
            this.$Message.success('修改成功')
            this.onLogout()
          } else {
            this.$Message.error(res.msg || '请求失败')
          }
        })
      },

      async onLogout() {
        await this.$api.logout()
        this.$u.logout()
        this.$u.toLogin()
      },
    },
  }
</script>

<style lang="stylus" scoped>
.view
  padding 16px 20px
  .form-box
    width 280px
    margin 40px 0 0 180px
    >>>.ivu-form-item-label
      font-size 14px
      font-weight bold
      color $black
      padding 0 0 8px 0
      &::before
        display none

  .action
    margin-top 32px
    .btn
      width 100%
      height 40px
      padding 0
      border-radius 8px
      color $black
      font-size 14px
      &.btn-reset
        background #FFF
        margin-left 16px

</style>
