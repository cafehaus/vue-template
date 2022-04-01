<template>
  <div class="sider">
    <Menu
      class="menu-wrap"
      accordion
      ref="menu"
      width="auto"
      :active-name="activeName"
      :open-names="openNames"
    >
      <template v-for="(menu, index) in menuList">
        <!-- 如果有子菜单 -->
        <Submenu v-if="menu.children && menu.children.length" :key="index" :name="menu.title">
          <!-- 如果是父级则点击展开 -->
          <div class="menu-item" slot="title">
            <i class="iconfont" :class="menu.icon" />
            {{ menu.title }}
          </div>

          <!-- 子菜单-不递归的方式 -->
          <template v-for="(submenu, idx) in menu.children">
            <!-- 有三级菜单 -->
            <Submenu v-if="submenu.children && submenu.children.length" :key="index + '-' + idx" :name="submenu.title">
              <div slot="title">{{ submenu.title }}</div>
              <template v-for="(thirdMenu, i) in submenu.children">
                <MenuItem
                  class="third-menu-item"
                  :key="index + '-' + idx + '-' + i"
                  :name="thirdMenu.title"
                  :to="thirdMenu.path"
                >
                  {{ thirdMenu.title }}
                </MenuItem>
              </template>
            </Submenu>

            <!-- 只有二级菜单 -->
            <MenuItem
              v-else
              class="menu-item"
              style="padding-left: 50px"
              :key="index + '-' + idx"
              :name="submenu.title"
              :to="submenu.path"
            >
              {{ submenu.title }}
            </MenuItem>
          </template>
        </Submenu>

        <!-- 没有子菜单 -->
        <div v-else :key="index">
          <MenuItem class="menu-item" :key="index" :name="menu.title" :to="menu.path">
            <i class="iconfont" :class="menu.icon" />
            {{ menu.title }}
            <Badge v-if="menu.path === '/message'" :count="noReadCount" class="badge" />
          </MenuItem>
        </div>
      </template>
    </Menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        year: new Date().getFullYear(),
        menuList: [
          {
            title: '首页',
            path: '/',
            icon: 'icon-menu-home',
          },
          {
            title: '客户管理',
            icon: 'icon-people',
            children: [
              {
                path: '/customer',
                title: '我的客户',
              },
            ],
          },
          {
            path: '/account',
            title: '个人中心',
            icon: 'icon-menu-account',
          },
        ],
      }
    },
    computed: {
      activeName() {
        return this.$route.meta.title
      },

      // 展开的主菜单
      openNames() {
        return this.menuList.filter(
          f => f.children && f.children.find(d => d.title === this.activeName),
        ).map(t => t.title)
      },
    },

    watch: {
      $route(v) {
        // 首页跳转客户管理二级菜单默认展开
        if (v.path === '/customer') {
          this.$nextTick(() => {
            this.$refs.menu.updateOpened()
          })
        }
      },
    },
  }
</script>

<style lang="stylus" scoped>
  .ivu-menu-vertical .ivu-menu-item, .ivu-menu-vertical .ivu-menu-submenu-title
    transition none
  .sider
    >>> .ivu-icon-ios-arrow-down
      width 20px
      height 20px
      &:before
        content '\F33D'
        line-height 20px
        color $gray
    >>> .ivu-menu-vertical.ivu-menu-light
      background #292B2D
    >>> .ivu-menu-vertical.ivu-menu-light:after
      display none
    .menu-wrap
      height calc(100% - 268px)
      margin-top 10px
      overflow-y auto
      flex 1
      scrollbar-width none /* Firefox */
      -ms-overflow-style none /* IE 10+ */
      &::-webkit-scrollbar
        display none /* Chrome Safari */
      >>> .ivu-menu-opened
        color #fff
        .ivu-menu-submenu-title
          .menu-item
            color #fff
          &:hover
            .menu-item
              color $black
              font-weight bold
              border-right 2px
              background $main-color
              border-radius 8px
            .ivu-icon-ios-arrow-down
              &:before
                color  $black
          &.ivu-menu-item-active
            color $black
            font-weight bold
            border-right 2px
            background $main-color
            border-radius 8px
            .iconfont
              font-weight normal
          .ivu-icon-ios-arrow-down
            &:before
              color #FFF
      >>> .ivu-menu-submenu-title
        padding 0 !important
      >>> .ivu-icon
        right 12px
      .iconfont
        margin-right 10px
        width 20px
        height 20px
        text-align center
        font-size 20px
        font-weight normal
        line-height 20px
      .menu-item, .third-menu-item
        display flex
        align-items center
        margin 0 12px
        padding 9px 16px
        height 40px
        text-overflow ellipsis
        overflow hidden
        white-space nowrap
        color #A1A2A2
        margin-top 10px
        .ivu-menu-submenu-title .iconfont
          font-size 14px
        &:hover
          color $black
          font-weight bold
          border-right 2px
          background $main-color
          border-radius 8px
        &.ivu-menu-item-active
          color $black
          font-weight bold
          border-right 2px
          background $main-color
          border-radius 8px
          .iconfont
            font-weight normal
            color $black
      .third-menu-item
        padding-left 48px

  .copyright
    text-align center
    position fixed
    bottom 14px
    line-height 18px
    height 18px
    color #a2a2a3
    font-size 12px
    font-weight 400
    width 153px
    margin-left 12px
</style>
