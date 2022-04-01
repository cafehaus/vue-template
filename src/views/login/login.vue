<template>
  <div class="login">
    <div class="container">
      <div class="title">
        <h3>登录</h3>
        <p>Login</p>
      </div>
      <form class="form" @keydown.enter="login">
        <div class="form-item">
          <Input
            class="g-input"
            v-model.trim="mobile"
            v-validate="'required|mobile'"
            name="mobile"
            autocomplete="username"
            placeholder="手机号码"
            :maxlength="11"
          />
          <p v-if="accountErrmsg" class="errmsg">{{ accountErrmsg }}</p>
          <p v-else-if="errors.has('mobile')" class="errmsg">{{ errors.first('mobile') }}</p>
        </div>
        <div class="form-item passwd">
          <Input
            class="g-input"
            v-validate="'required'"
            name="password"
            v-model="passwd"
            type="password"
            autocomplete="new-password"
            placeholder="密码"
            :maxlength="20"
          />
          <p v-show="errors.has('password')" class="errmsg">{{ errors.first('password') }}</p>
        </div>
        <div class="btn-warp">
          <Button class="loginBtn" type="primary" :loading="loading" @click="login">登录</Button>
          <p class="tips">还没有账号，去<RouterLink to="/register">注册</RouterLink></p>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  // import md5 from 'js-md5'

  export default {
    name: 'Login',
    props: {
      isModal: { // 是否弹窗登录
        type: Boolean,
        default: false,
      },
    },
    data() {
      return {
        mobile: '',
        passwd: '',
        remember: false,
        accountErrmsg: '', // 账号错误信息
        loading: false,
      }
    },
    computed: {
      ...mapState('app', ['loginCallback']),
    },
    methods: {
      async login() {
        let valid = await this.$validator.validateAll()
        if (!valid) return
        this.loading = true
        // let res = await this.$api.login({
        //   username: this.mobile,
        //   password: md5(this.passwd),
        //   remember: this.remember,
        // })
        let res = {
          data: {
            token: '2234524354534',
            name: '我是VUE',
          },
          code: '200',
        }
        this.loading = false
        if (res.code !== '200') {
          this.accountErrmsg = res.msg
          this.$Message.error(res.msg)
          return
        }
        let { token, name } = res.data

        this.$u.logout()
        this.$u.setLogin({
          username: name,
          token,
          expires: this.remember ? 15 : 30, // 登录态有效期默认为30天
        })
        this.accountErrmsg = ''

        if (this.loginCallback) this.loginCallback() // 登录成功回调
        if (this.isModal) return // 弹窗登录不用跳转

        // 登录后跳转：如果有参数 redirect 则登录后重定向到此页，否则返回上一页
        let redirect = this.$route.query.redirect
        if (redirect) {
          this.$router.replace({
            path: redirect,
          })
        } else {
          // this.$router.back()
          this.$router.push('/home').catch(err => err) // 捕获访问权限控制重定向导致的报错
        }
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
      .title
        text-align center
        h3
          font-size 20px
          font-weight 500
        p
          color #999
      .form
        margin-top 95px
        .form-item
          position relative
          &.passwd
            margin-top 32px
          .m-input
            height 44px
            &:focus
              border-color $main-color
              outline none
          .errmsg
            position absolute
            bottom -20px
            color $err-color
        .btm-select
          display flex
          justify-content space-between
          margin-top 34px
          .btn-radio
            display flex
            align-items center
            cursor pointer
            .radio
              display flex
              justify-content center
              align-items center
              width 16px
              height 16px
              border 1px solid $main-color
              border-radius 50%
              margin-right 5px
              &.checked
                &:after
                  content ''
                  display block
                  width 8px
                  height 8px
                  background $main-color
                  border-radius 50%
          .forget
            text-decoration underline
        .btn-warp
          margin-top 97px
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
