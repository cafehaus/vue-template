<template>
  <div class="empty">
    <slot name="icon">
      <i v-if="icon" class="iconfont" :class="`icon-${icon}`" />
      <img v-else class="img" src="@/assets/empty.png">
    </slot>
    <div class="msg"><slot>暂无数据</slot></div>
  </div>
</template>

<script>
  export default {
    name: 'VEmpty',
    props: {
      icon: {
        type: String,
        default: '',
      },
    },
  }
</script>

<style lang="stylus" scoped>
.empty
  padding 30px
  text-align center
  line-height 1
  color $gray
  margin auto
  .iconfont
    font-size 56px
    color $gray
    opacity .5
    line-height 1
  .msg
    margin-top 24px
    font-size 14px
    color $gray
  .img
    width 120px
    height 120px
</style>
