<template>
  <div class="login">
    <div class="container">
      <div class="title">
        <h3>注册</h3>
        <p>SignUp</p>
      </div>

      <form class="form">
        <div class="form-item">
          <Input
            class="g-input"
            v-model="formData.mobile"
            v-validate="'required|mobile'"
            @input="handleInput"
            name="mobile"
            placeholder="手机号码"
          />
          <p v-if="showErr" class="errmsg">{{ errMsg }}</p>
          <p v-else-if="errors.has('mobile')" class="errmsg">{{ errors.first('mobile') }}</p>
        </div>

        <div class="form-item msgcode">
          <div class="msgwrap">
            <Input
              class="g-input"
              v-model="formData.code"
              v-validate="'required'"
              data-vv-as="短信验证码"
              name="code"
              placeholder="验证码"
            />
            <Button
              type="primary"
              :loading="loading"
              class="btn-sendmsg"
              :disabled="!cansend"
              @click.prevent="showImgCode"
            >
              {{ msgcodeBtn }}
            </Button>
          </div>
          <p v-show="errors.has('code')" class="errmsg">{{ errors.first('code') }}</p>
        </div>

        <div class="form-item passwd">
          <input autocomplete="username" hidden>
          <Input
            class="g-input"
            v-model="formData.passwd"
            type="password"
            placeholder="设置密码"
            v-validate="'required|password'"
            name="password"
            autocomplete="new-password"
          />
          <p v-show="errors.has('password')" class="errmsg">{{ errors.first('password') }}</p>
        </div>

        <div class="form-item passwd">
          <Input
            class="g-input"
            v-model="formData.confirmPasswd"
            type="password"
            v-validate="'required|confirmed:password'"
            name="repassword"
            placeholder="确认密码"
            autocomplete="new-password"
          />
          <p v-show="errors.has('repassword')" class="errmsg">{{ errors.first('repassword') }}</p>
        </div>

        <div class="form-item">
          <Input
            class="g-input"
            v-model="formData.email"
            v-validate="'required|email'"
            name="email"
            placeholder="联系邮箱"
          />
          <p v-show="errors.has('email')" class="errmsg">{{ errors.first('email') }}</p>
        </div>

        <div class="btn-warp">
          <Button class="loginBtn" type="primary" @click="handleRegister">注册</Button>
          <p class="tips">已有账号，去<RouterLink to="/login">登录</RouterLink></p>
        </div>
      </form>
    </div>

    <!-- 图片验证码弹框 -->
    <ModalImgCode v-model="show" :mobile="formData.mobile" @valiate="getMsgcode" />

    <!-- 注册成功提示 -->
    <ModalRegTip v-model="showRegTip" @ok="handleOk" />
  </div>
</template>

<script>
  import md5 from 'js-md5'
  import ModalImgCode from './components/modal-img-code'
  import ModalRegTip from './components/modal-reg-tip'

  export default {
    components: {
      ModalImgCode,
      ModalRegTip,
    },

    data() {
      return {
        show: false,
        showRegTip: false,
        showErr: false,
        errMsg: '',
        cansend: false,
        msgcodeBtn: '获取验证码',
        loading: false,
        formData: {
          mobile: '',
          code: '',
          passwd: '',
          confirmPasswd: '',
          email: '',
        },
        sendOver: true, // 验证码是否可以重发
      }
    },

    destroyed() {
      clearInterval(this.timer)
    },

    methods: {
      // 设置错误信息提示
      setErr(show = false, msg = '') {
        this.showErr = show
        this.errMsg = msg
      },

      // 验证手机号输入是否正确
      handleInput() {
        this.setErr()
        this.$validator.validate('mobile').then(data => {
          if (data && this.sendOver) {
            this.cansend = true
            return
          }
          this.cansend = false
        })
      },

      async showImgCode() {
        this.loading = true
        let res = await this.$api.verifyRegister({
          phoneNumber: this.formData.mobile,
        })
        this.loading = false
        let { isRegister, message } = res.data || {}
        if (res.code === '200' && isRegister) {
          this.setErr(true, message)
          return
        }
        this.show = true
      },

      async handleRegister() {
        let result = await this.$validator.validateAll()
        if (!result) return
        this.register()
      },

      // 关闭弹框，跳转页面
      handleOk() {
        if (this.$u.isLogin()) {
          this.$router.push('/')
        }
      },

      // 获取短信验证码
      getMsgcode() {
        this.cansend = false
        this.setErr()
        this.$Message.success('验证码已发送到您手机，请注意查收')
        let duration = 60 // 验证码有效期 60s
        this.msgcodeBtn = `重新发送(${duration}s)`

        this.timer = setInterval(() => {
          duration--
          this.sendOver = false
          // 倒计时结束后重置为可用
          if (duration <= 0) {
            clearInterval(this.timer)
            this.msgcodeBtn = '重新获取'
            this.cansend = true
            this.sendOver = true
            return
          }
          this.msgcodeBtn = `重新发送(${duration}s)`
        }, 1000)
      },

      // 提交注册
      async register() {
        const res = await this.$api.register({
          phoneNumber: this.formData.mobile,
          password: md5(this.formData.passwd),
          verificationCode: this.formData.code,
          email: this.formData.email,
        })
        if (res.code !== '200') {
          this.setErr(true, res.msg || '注册失败')
          return
        }
        let { Token: token } = res.data
        this.$u.logout()
        this.$u.setLogin({
          username: this.mobile,
          token,
          expires: this.remember ? 15 : 30, // 登录态有效期默认为30天
        })
        this.$Message.success('注册成功')
        this.showRegTip = true
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .login
    display flex
    justify-content center
    align-items center
    .container
      width 600px
      height 560px
      padding 40px 80px
      box-shadow 0 0 15px #ccc
      .title
        text-align center
        h3
          font-size 20px
          font-weight 500
        p
          color $gray
      .form
        margin-top 32px
        .form-item
          position relative
          margin-top 20px
          &.msgcode
            .msgwrap
              display flex
              background #f1f3f5
              border-radius 8px
              .btn-sendmsg
                margin-left 20px
                padding 0 16px
                height 40px
                border 0
                outline 0
                border-radius 8px
                font-size 12px
                color $black
                white-space nowrap
                &[disabled]
                  background #DDD
                  color $gray
                // &.active
                //   border 1px solid $black
                //   color $black
                //   background #fff
                //   cursor pointer
          .errmsg
            position absolute
            bottom -20px
            color $err-color
        .btn-warp
          margin-top 32px
          text-align center
          .loginBtn
            width 100%
            height 40px
            border-radius 8px
            color $black
            font-size 14px
            &:hover
              opacity .8
          .tips
            margin-top 12px
            font-size 12px
            color $gray
            a
              color $main-color
</style>
