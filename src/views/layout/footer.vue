<template>
  <footer class="footer">
    <div class="design-width">
      &copy;{{ year }} 版权所有
    </div>
  </footer>
</template>

<script>
  export default {
    data() {
      return {
        year: new Date().getFullYear(),
      }
    },

    methods: {
    },
  }
</script>

<style lang="stylus" scoped>
  .footer
    font-size 14px
    color #FFF
    text-align center
    background #333
    padding 60px 0 30px
</style>
