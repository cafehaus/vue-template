export default {
  destroyed() {
    this.$Message.destroy()
    clearInterval(this.timer)
  },
  data() {
    return {
      canSend: false, // 是否可发验证码
      sendOver: true, // 验证码是否可以重发
      btnTxt: '发送验证码',
    }
  },
  methods: {
    getMsgcode(type) { // 获取短信验证码
      this.canSend = false
      if (type === 'tips') this.$Message.success('验证码已发送到您手机，请注意查收')
      let duration = 60 // 验证码有效期 60s
      this.btnTxt = `重新发送(${duration}s)`

      this.timer = setInterval(() => {
        duration--
        this.sendOver = false
        // 倒计时结束后重置为可用
        if (duration <= 0) {
          clearInterval(this.timer)
          this.btnTxt = '重新获取'
          this.canSend = true
          this.sendOver = true
          return
        }
        this.btnTxt = `重新发送(${duration}s)`
      }, 1000)
    },
  },
}
