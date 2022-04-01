<template>
  <VModal
    :value="value"
    :width="480"
    is-center
    footer-hide
    title="登录弹窗"
    @on-cancel="close"
  >
    <Login />
  </VModal>
</template>

<script>
  import { mapMutations } from 'vuex'
  import VModal from '@/components/v-modal'
  import Login from '../login'

  export default {
    name: 'ModalRegTip',
    components: {
      VModal,
      Login,
    },
    props: {
      value: Boolean,
    },
    data() {
      return {}
    },
    methods: {
      ...mapMutations('app', ['setShowLogin']),
      close() {
        // this.$emit('input', false)
        this.setShowLogin(false)
      },
    },
  }
</script>

<style lang="stylus" scoped>
.content
  padding-top 16px
  color $black
  .tip
    font-size 14px
    text-align center
    .icon-success
      font-size 48px
      color $main-color
  .btn
    margin-top 40px
    width 100%
    height 40px
    background $main-color
    color $black
    border-radius 8px
    font-size 14px
</style>
