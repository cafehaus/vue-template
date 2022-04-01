<template>
  <div v-if="img.length" class="modal-img">
    <Icon type="ios-close" color="#FFF" size="40" @click="close" />
    <div class="modal-preview-content">
      <Carousel v-model="active" loop :arrow="arrow" :dots="dots">
        <CarouselItem v-for="(m, idx) in imgList" :key="idx">
          <img class="img" :src="m">
        </CarouselItem>
      </Carousel>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      img: {
        type: [String, Array], // 可传图片路径字符串或数组或数组对象(同时传imgKey会自动处理)
        default: '',
      },
      imgIndex: { // 当前图片序号
        type: [String, Number],
        default: 0,
      },
      imgKey: { // 数组对象时图片路径的key
        type: String,
        default: '',
      },
    },

    data() {
      return {
        active: 0,
      }
    },

    watch: {
      img: {
        deep: true,
        handler() {
          this.active = +this.imgIndex || 0
        },
      },
    },

    computed: {
      imgList() {
        if (!this.img) {
          return []
        } else if (typeof this.img === 'string') { // 字符串：单个图片路径
          return [this.img]
        } else if (Array.isArray(this.img)) { // 数组
          let first = this.img[0]
          // 元素直接是图片路径
          if (typeof first === 'string') {
            return this.img
          } else if (first !== null && typeof first === 'object') {
            // 元素对象，需同时传 imgKey
            return this.img.map(m => m[this.imgKey])
          } else {
            return this.img
          }
        } else {
          return []
        }
      },

      isMulti() { // 是否多张图片
        return this.imgList && this.imgList.length > 1
      },

      arrow() {
        return this.isMulti ? 'hover' : 'never'
      },

      dots() {
        return this.isMulti ? 'inside' : 'none'
      },
    },

    methods: {
      close() {
        this.$emit('close')
      },
    },
  }
</script>

<style lang="stylus" scoped>

.modal-img
  position fixed
  top 0
  bottom 0
  left 0
  right 0
  z-index 999
  background rgba(0, 0, 0, .6)
  >>>.ivu-icon-ios-close
    position absolute
    top 4px
    right 4px
    font-size 36px
    color #FFF
    cursor pointer
    z-index 1002
  .modal-preview-content
    position relative
    z-index 1001
    >>>.ivu-icon-ios-arrow-back,
    >>>.ivu-icon-ios-arrow-forward
      line-height 36px
    >>>.ivu-carousel-item
      display flex
      justify-content center
      align-items center
      height 100vh !important // 直接设置Carousel的height="100vh"，会报错
      .img
        max-width 600px
        min-width 100px
        max-height 90%
        object-fit contain
        text-align center

</style>
