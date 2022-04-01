<template>
  <Modal
    :value="value"
    :width="width"
    footer-hide
    :closable="false"
    :mask-closable="maskClosable"
    :scrollable="scrollable"
    :fullscreen="fullscreen"
    :draggable="draggable"
    :z-index="zIndex"
    :mask="mask"
    :lock-scroll="lockScroll"
    :styles="styles"
    class="v-modal"
    :class-name="isCenter ? 'v-modal-center' : ''"
    @on-cancel="close"
  >
    <a v-if="closable" class="iconfont icon-close" @click="close" />
    <slot name="header">
      <div class="v-header">{{ title }}</div>
    </slot>
    <div class="v-body" :class="{'v-body-scroll': maxHeight}">
      <!-- 多套一层为了设置内容区max-height让滚动条到最右边，实际这样体验更佳 -->
      <div class="v-body-inner" :style="{'max-height': maxHeight}" ref="vBodyScroll">
        <slot />
      </div>
    </div>

    <slot name="footer">
      <div v-if="!footerHide" class="v-footer">
        <Button v-if="showCancelBtn" class="v-btn" @click="close">{{ cancelText }}</Button>
        <Button v-if="showOkBtn" class="v-btn v-btn-ok" type="primary" :loading="loading" @click="ok">{{ okText }}</Button>
      </div>
    </slot>
  </Modal>
</template>

<script>
  export default {
    name: 'VModal',
    props: {
      value: Boolean,
      title: {
        type: String,
        default: '提示',
      },
      closable: { // 是否显示右上角关闭按钮
        type: Boolean,
        default: true,
      },
      maskClosable: { // 是否允许点击遮罩层关闭
        type: Boolean,
        default: true,
      },
      scrollable: { // 页面是否可以滚动
        type: Boolean,
        default: false,
      },
      fullscreen: { // 是否全屏显示
        type: Boolean,
        default: false,
      },
      draggable: { // 是否可以拖拽移动
        type: Boolean,
        default: false,
      },
      mask: { // 是否显示遮罩层
        type: Boolean,
        default: true,
      },
      showOkBtn: { // 是否显示确定按钮（可用来做'我知道了'、'好的'之类的提示框，注意footerHide要改为false）
        type: Boolean,
        default: true,
      },
      okText: { // 确定按钮文字
        type: String,
        default: '确定',
      },
      showCancelBtn: { // 是否显示取消按钮
        type: Boolean,
        default: true,
      },
      cancelText: { // 取消按钮文字
        type: String,
        default: '取消',
      },
      width: {
        type: [Number, String],
        default: 520,
      },
      footerHide: { // 实际场景自定义居多，默认隐藏
        type: Boolean,
        default: true,
      },
      zIndex: {
        type: Number,
        default: 1000,
      },
      lockScroll: { // 是否禁止对页面滚动条的修改
        type: Boolean,
        default: true,
      },
      styles: {
        type: Object,
        default: () => ({}),
      },
      maxHeight: { // 内容区可滚动 (支持px和vh)
        type: String,
        default: '',
      },
      isCenter: { // 弹窗是否要垂直居中（!!!居中了外面组件注意要自己设置max-height，否则弹窗超过屏幕高度时会没法看到顶部超出的部分）
        type: Boolean,
        default: true,
      },
      loading: { // 确定按钮的loading动效
        type: Boolean,
        default: false,
      },
    },

    watch: {
      value(v) {
        if (v && this.maxHeight) { // 设置了最大高度，重置滚动距离
          this.$nextTick(() => {
            this.$refs.vBodyScroll && (this.$refs.vBodyScroll.scrollTop = 0)
          })
        }
      },
    },

    methods: {
      ok() {
        this.$emit('on-ok')
      },
      close() {
        this.$emit('on-cancel')
        this.$emit('input', false)
      },
    },
  }
</script>

<style lang="stylus" scoped>
>>>.v-modal-center
  display flex
  justify-content center
  align-items center
  .ivu-modal
    top 0

.v-modal
  position relative
  .icon-close
    position absolute
    top 14px
    right 14px
    font-size 14px
    transition all .3s
    color #999999
    &:hover
      color #161718
      transform rotate(180deg)

.v-header
  padding 0 0 8px
  margin 0 20px
  border-bottom 1px solid #F0F0F0
  font-size 16px
  font-family SourceHanSansSC-Bold, SourceHanSansSC
  font-weight bold
  color #161718
  line-height 24px

.v-body
  padding 20px 20px 0
  &.v-body-scroll
    padding 0 0 0 20px
    .v-body-inner
      width 100%
      padding-top 20px
      padding-right 20px
      overflow-y auto
      overflow-y overlay // 滚动条不会挤压内容宽度，部分浏览器不兼容
      scrollbar-width thin // 火狐浏览器
      scrollbar-color #FAFAFA // 火狐浏览器
      &::-webkit-scrollbar
        height 16px
        width 16px
        background #FAFAFA
      &::-webkit-scrollbar-thumb
        background #C7C7C7
        background-clip content-box
        border-radius 8px
        border 4px solid transparent

.v-footer
  display flex
  padding 0 20px 7px
  .v-btn
    flex 1
    border-radius 8px
    height 40px
    font-size 14px
    color #161718
    border 1px solid #E3E3E3
    background #FFF
    &:not(:first-child)
      margin-left 12px
    &.v-btn-ok
      border none
      background $main-color
      font-weight bold

>>>.ivu-modal-body
  padding 14px 0

>>>.ivu-modal-content // 所有弹窗圆角统一 12px
  border-radius 12px

</style>
