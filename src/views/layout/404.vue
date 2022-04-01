<template>
  <div class="view-404 design-width">
    <div class="img" />
    <div class="content">
      <h1>404</h1>
      <div class="des">抱歉，你访问的页面不存在</div>
      <Button type="info" @click="$router.push('/home')">返回首页</Button>
    </div>
  </div>
</template>

<style lang="stylus">
  .view-404
    height 100vh
    display flex
    align-items center
    justify-content center
    .img
      width 430px
      height 360px
      background url('https://file.iviewui.com/iview-pro/icon-404.svg')
      background-repeat no-repeat
      background-position 50% 50%
      background-size contain
    .content
      margin-left 40px
      h1
        font-size 48px
      .des
        font-size 16px
        margin 6px 0 12px
</style>
