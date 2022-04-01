export default {
  destroyed() {
    this.$Message.destroy()
  },
  methods: {
    $loading(msg = '正在加载中...') {
      this.$hideLoading()
      this._hideLoading = this.$Message.loading({
        content: msg,
        duration: 0,
      })
    },
    $hideLoading(delay = 500) {
      if (typeof this._hideLoading === 'function') {
        this._hideLoading()
        this._hideLoading = null
      }
      // this._hideLoading()
      // this._hideLoading = null
      // if (delay) {
      //   setTimeout(() => {
      //     this._hideLoading()
      //   }, delay)
      // } else {
      //   this._hideLoading()
      // }
    },
    $confirm(config) {
      this.$Modal.confirm(config)
    },
    $reload() {
      this.$root.reload()
    },
    $back() {
      window.history.length > 1
        ? this.$router.go(-1)
        : this.$router.push('/')
    },
  },
}
