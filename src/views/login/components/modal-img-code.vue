<template>
  <VModal
    :value="value"
    width="360"
    title="请输入验证码"
    :scrollable="true"
    :footer-hide="true"
    @on-cancel="close"
  >
    <div class="content">
      <div class="code-warp">
        <Input class="g-input" v-model="code" type="text" placeholder="请输入验证码" />
        <p v-if="showErr" class="err-msg">{{ errMsg }}</p>
      </div>
      <div class="code-img">
        <div class="img">
          <img v-if="showImg" :src="imgCode" alt="">
        </div>
        <a class="change-img" @click="handleChange">看不清，换一张</a>
      </div>
      <div class="btn-box">
        <Button class="cancel" @click="close">取消</Button>
        <Button class="sure" type="primary" :loading="loading" @click="handleSure">确认</Button>
      </div>
    </div>
  </VModal>
</template>

<script>
  import VModal from '@/components/v-modal'
  import common from '@/mixins/common'
  import { apiUrl } from '@/config'

  export default {
    name: 'ModalImgCode',
    mixins: [common],
    components: {
      VModal,
    },
    props: {
      value: Boolean,
      mobile: String,
    },
    data() {
      return {
        showErr: false,
        showImg: true,
        imgCode: apiUrl + `account/imgValidate?phoneNumber=${this.mobile}&${new Date().getTime()}`,
        errMsg: '请输入验证码',
        code: '',
        time: new Date().getTime(),
        loading: false,
      }
    },

    watch: {
      value(v) {
        if (v) {
          this.imgCode = `${apiUrl}account/imgValidate?phoneNumber=${this.mobile}&${new Date().getTime()}`
          this.code = ''
        }
      },
    },

    methods: {
      handleChange() {
        this.imgCode = `${apiUrl}account/imgValidate?phoneNumber=${this.mobile}&${new Date().getTime()}`
      },
      async getImgCode() { // 获取图片验证码
        const res = await this.$api.getImgCode()
        if (res.code === '200') {
          this.imgCode = res.url
        } else {
          this.$Message.error(res.msg)
        }
      },
      async verifyCode() {
        this.loading = true
        let res = await this.$api.verifyImgCode({
          code: this.code,
          phoneNumber: this.mobile,
        })
        this.loading = false
        if (res.code === '200') {
          // 验证图片验证码
          this.$emit('input', false)
          this.$emit('valiate', true)
        } else {
          this.$Message.error(res.msg || '验证失败')
        }
      },
      handleSure() {
        if (!this.code) {
          this.code = ''
          this.showErr = true
          return
        }
        this.showErr = false
        this.verifyCode()
      },
      close() {
        this.$emit('input', false)
      },
    },
  }
</script>

<style lang="stylus" scoped>
.content
  .code-warp
    display flex
    align-items center
    position relative
    .m-input
      width 206px
      height 44px
      margin-left 13px
      padding 0 16px
      &:focus
        outline 0
        border-color $main-color
    .err-msg
      position absolute
      bottom -20px
      left 50px
      color $err-color
  .code-img
    margin-top 32px
    flexLeftRight()
    align-items center
    .img
      width 157px
      height 68px
      background $gray
      text-align center
      img
        width 100%
        height 100%
    .change-img
      text-decoration underline
  .btn-box
    flexCenterMiddle()
    margin-top 32px
    .sure,.cancel
      flex 1
      height 40px
      font-size 14px
      color $black
      border-radius 8px
    .cancel
      background #fff
      margin-right 16px
</style>
