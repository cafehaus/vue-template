<template>
  <div class="g-layout">
    <Header class="g-header" />
    <section class="g-body" :class="{'g-body-fullscreen': !showSider}">
      <Sider v-if="showSider" class="g-sider" />
      <keep-alive>
        <router-view v-if="$route.meta.keepAlive" :key="$route.path" class="g-main" />
      </keep-alive>
      <router-view v-if="!$route.meta.keepAlive" :key="$route.path" class="g-main" />
    </section>

    <Footer v-if="showFooter" />

    <!-- 返回顶部 -->
    <BackTop />

    <!-- 全局登录弹窗 -->
    <ModalLogin v-model="showLogin" />
  </div>
</template>

<script>
  import { mapState } from 'vuex'
  import common from '@/mixins/common'
  import Header from './header'
  import Sider from './sider'
  import Footer from './footer'
  import ModalLogin from '@/views/login/components/modal-login'

  export default {
    mixins: [common],
    components: {
      Header,
      Sider,
      Footer,
      ModalLogin,
    },

    data() {
      return {}
    },

    computed: {
      ...mapState('app', ['showLogin']),
      showFooter() {
        return this.$route.meta.showFooter
      },

      showSider() {
        return this.$route.meta.showSider
      },
    },
  }
</script>

<style lang="stylus">
.g-layout
  flex-direction row
  box-sizing border-box
  width 100%
  min-height 100vh // 兼容 IE
  overflow-x hidden
  background #F1F3F5
  padding-top 48px
  .g-sider
    width 200px
    background #292B2D
    flex-shrink 0
    position fixed
    top 48px
    height calc(100% + 10px)
    left 0
    z-index 99
  .g-header
    height 50px
    background #FFF
    box-shadow 0px 4px 6px 0px rgba(22, 23, 24, 0.1)
    position fixed
    top 0
    z-index 100
    width 100%
  .g-body
    padding 20px 20px 20px 220px
    flex-direction column
    box-sizing border-box
    position relative
    background #F1F3F5
    min-width 1220px
    min-height 100%
    &.g-body-fullscreen
      padding 20px
    .g-main
      flex 1
      border-radius 12px
      background #FFF
      box-sizing border-box
      min-height calc(100vh - 90px)
      color $black
      > .g-main-title
        font-size 16px
        font-weight bold
        line-height 1.5
        border-bottom 1px solid #F0F0F0
        padding-bottom 8px
</style>
