<template>
  <div class="view">
    <header class="header">
      <div class="item">
        <div class="label-wrap">
          <p class="label" @click="goto('/customer')">
            <i class="iconfont icon-people" />
            <span>客户</span>
            <i class="iconfont icon-arrow-right" />
          </p>
        </div>
        <p class="num">888</p>
      </div>
      <div class="item">
        <div class="label-wrap">
          <p class="label">
            <i class="iconfont icon-order" />
            <span>订单</span>
          </p>
        </div>
        <p class="num">258</p>
      </div>
      <div class="item">
        <div class="label-wrap">
          <p class="label">
            <i class="iconfont icon-money" />
            <span>今日收益</span>
          </p>
        </div>
        <p class="num">￥63.22</p>
      </div>
      <div class="item">
        <div class="label-wrap">
          <p class="label">
            <i class="iconfont icon-income" />
            <span>累计收益</span>
          </p>
        </div>
        <p class="num">￥8900.45</p>
      </div>
    </header>
  </div>
</template>

<script>
  import { cookie } from '@/libs/utils'

  export default {
    data() {
      return {
        userName: cookie('username'),
        tradeData: {},
      }
    },

    created() {
      this.initData()
    },

    methods: {
      initData() {
        // this.getData()
      },

      async getData() {
        const res = await this.$api.getHomeData()
        if (res.code === '200') {
          this.tradeData = res.data || {}
        } else {
          this.$Message.error(res.msg || '请求失败')
        }
      },

      // 跳转
      goto(path) {
        this.$router.push({
          path,
        })
      },
    },
  }
</script>

<style lang="stylus" scoped>
.view
  background transparent !important
  .header
    display flex
    margin-bottom 20px
    .item
      flex 1
      background #FFF
      border-radius 12px
      padding 20px
      &:not(:last-child)
        margin-right 20px
      .label-wrap
        display inline-block
        .label
          display flex
          align-items center
          line-height 1
          font-size 14px
          color $black
          cursor pointer
          span
            margin 0 8px 0 2px
          .iconfont
            font-size 18px
      .num
        font-size 26px
        font-weight bold
        line-height 42px
        margin-top 10px

</style>
