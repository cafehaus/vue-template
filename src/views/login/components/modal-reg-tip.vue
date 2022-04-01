<template>
  <VModal
    :value="value"
    :width="360"
    :mask-closable="false"
    :scrollable="true"
    :footer-hide="true"
    @on-cancel="close"
  >
    <div class="content">
      <div class="tip">
        <i class="iconfont icon-success" />
        <p>已提交注册信息，平台审核中！</p>
      </div>
      <Button type="primary" class="btn" @click="close">确定</Button>
    </div>
  </VModal>
</template>

<script>
  import VModal from '@/components/v-modal'

  export default {
    name: 'ModalRegTip',
    components: {
      VModal,
    },
    props: {
      value: Boolean,
      width: {
        type: Number,
        default: 335,
      },
    },
    data() {
      return {
        time: '',
      }
    },
    watch: {
      value(v) {
        // if (v) {}
      },
    },
    methods: {
      close() {
        this.$emit('input', false)
        this.$emit('ok')
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
