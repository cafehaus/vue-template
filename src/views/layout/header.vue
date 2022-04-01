<template>
  <header class="header">
    <RouterLink
      class="logo"
      to="/home"
    >
      <img src="@/assets/logo.png" alt="网站logo">
    </RouterLink>

    <section class="login-box">
      <template v-if="isLogin">
        <img class="avatar" src="@/assets/avatar.png" alt="用户头像">
        <a
          class="btn"
          title="个人中心"
          @click="goto('/account')"
        >
          个人中心
        </a>
        <a
          class="logout"
          @click="onLogout"
          title="退出登录"
        >
          <i class="iconfont icon-logout" />
        </a>
      </template>
      <!-- <template v-else>
        <a
          class="btn"
          @click="onLogin"
        >
          登录
        </a>
        <span class="divider" />
        <RouterLink
          class="btn"
          to="/register"
        >
          注册
        </RouterLink>
      </template> -->
    </section>
  </header>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    data() {
      return {}
    },

    computed: {
      ...mapState('app', ['isLogin']),
    },

    methods: {
      ...mapState('app', ['showLogin']),
      goto(path) {
        if (path === '/account' && this.$route.path !== path) { // 个人中心
          this.$router.push(path)
        }
      },

      onLogin() {
        this.$u.toLogin()
      },

      async onLogout() {
        // await this.$api.logout()
        this.$u.logout()
        this.$u.login()
        // this.$u.toLogin()
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .header
    display flex
    justify-content space-between
    align-items center
    box-sizing border-box
    padding 0 16px
    height 50px
    background #fff
    .logo
      position relative
      height 34px
      overflow hidden
      img
        display block
        height 34px
        width auto
      &::after
        content ''
        position absolute
        left -20px
        top 0
        bottom 0
        width 6px
        background linear-gradient(rgba(255, 255, 255, 0), rgba(255, 255, 255, .6), rgba(255, 255, 255, 0))
        transform skewx(-25deg)
      &:hover::after
        left 200px
        transition .7s

    .login-box
      display flex
      align-items center
      justify-content flex-end
      min-width 220px
      font-size 14px
      line-height 1
      .avatar
        margin-right 8px
        width 32px
        text-align center
        font-size 30px
      .logout
        margin-left 20px
        .iconfont
          font-size 20px
          color $gray
          transition transform .2s
          &:hover
            transform translateX(2px)
      .divider
        width 1px
        height 12px
        background $black
        margin 0 16px
      .btn
        font-size 14px
        color $black
</style>
