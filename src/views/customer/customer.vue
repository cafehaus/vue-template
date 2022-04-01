<template>
  <div class="view">
    <section class="content">
      <div class="g-search">
        <div class="g-search-row">
          <div class="g-form-item">
            <label>客户名称</label>
            <Input class="input" v-model="form.companyName" placeholder="请输入客户名称" />
          </div>
          <div class="g-form-item">
            <label>注册电话</label>
            <Input class="input" v-model="form.phone" placeholder="请输入注册电话" />
          </div>
          <div class="g-form-item">
            <label>订单号</label>
            <Input class="input" v-model="form.orderIds" placeholder="请输入订单号" />
          </div>

          <div class="g-form-item g-form-item-select">
            <label>支付状态</label>
            <Select v-model="form.payStatus" filterable clearable placeholder="请选择支付状态">
              <Option value="">全部</Option>
            </Select>
          </div>
          <div class="g-form-item">
            <label>下单时间</label>
            <DatePicker v-model="form.date" type="datetimerange" placeholder="请选择起止时间" />
          </div>

          <div class="g-form-item-btn">
            <Button type="default" class="btn btn-reset" @click="reset">重置</Button>
            <Button type="primary" class="btn" @click="onSearch">查询</Button>
          </div>
        </div>
      </div>

      <div class="g-table-box">
        <Table
          class="g-table"
          :columns="columns"
          :data="tableData"
          :loading="loading"
        >
          <template slot="action" slot-scope="{ row }">
            <Button size="small" type="info">{{ row.status ? '编辑' : '查看' }}</Button>
          </template>
        </Table>

        <div class="pager">
          <VPager v-if="!empty" :page.sync="page" @change="getList" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>
  import VPager from '@/components/v-pager'

  export default {
    components: {
      VPager,
    },
    data() {
      return {
        empty: false,
        form: {},
        page: {
          total: 0,
          index: 1,
          size: 10,
        },
        loading: false,

        tableData: [{}],
        columns: [
          { title: '序号', type: 'index', fixed: 'left', align: 'center', width: 120 },
          { title: '订单号', key: 'orderId', width: 320 },
          { title: '客户名称', key: 'companyName', width: 400 },
          { title: '注册电话', key: 'phone', width: 320 },
          { title: '下单时间', key: 'createTime', width: 200 },
          {
            // title: '订单总金额',
            key: 'price',
            width: 160,
            renderHeader: (h, params) => {
              return h('div', {
                         style: {
                           display: 'flex',
                           alignItems: 'center',
                         },
                       },
                       [
                         h('span', '订单总金额'),
                         h('span', {
                           props: {
                             placement: 'bottom',
                             popperClass: 'ivu-table-popper',
                             transfer: true,
                           },
                           style: {
                             display: 'inline-flex',
                             flexDirection: 'column',
                           },
                         }, [
                           h('Icon', {
                             props: {
                               type: 'md-arrow-dropup',
                               color: '#161718',
                               size: 16,
                             },
                             style: {
                               marginLeft: '2px',
                               height: '6px',
                               lineHeight: '6px',
                               cursor: 'pointer',
                             },
                             on: {
                               click: () => {
                                 this.onSort(1, 'priceSort')
                               },
                             },
                           }),
                           h('Icon', {
                             props: {
                               type: 'md-arrow-dropdown',
                               color: '#161718',
                               size: 16,
                             },
                             style: {
                               marginLeft: '2px',
                               height: '6px',
                               lineHeight: '6px',
                               cursor: 'pointer',
                             },
                             on: {
                               click: () => {
                                 this.onSort(0, 'priceSort')
                               },
                             },
                           }),
                         ]),
                       ])
            },
          },
          { title: '操作', slot: 'action', fixed: 'right', align: 'center', width: 160 },
        ],
        tradeData: {},
      }
    },

    created() {
      // this.initData()
    },

    methods: {
      initData() {
        this.getList()
      },

      onSearch() {
        this.page.index = 1
        this.getList()
      },

      reset() {
        this.form = {}
        this.onSearch()
      },

      async getList() {
        let params = {
          page: this.page.index,
          size: this.page.size,
        }

        this.loading = true
        const res = await this.$api.getIncomeList(params)
        this.loading = false
        if (res.code !== '200') {
          this.$Message.error(res.msg || '请求失败')
          return
        }
        let data = res.data || {}
        let pageVO = data.pageVO || {}
        let list = pageVO.records || []

        this.tableData = list
        this.page.total = pageVO.total
      },

      // 排序
      onSort(e, key) {
        if (key === 'priceSort') {
          this.form.priceSort = e
          this.form.incomeSort = null
        }
        if (key === 'incomeSort') {
          this.form.priceSort = null
          this.form.incomeSort = e
        }

        this.page.index = 1
        this.getList()
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
      padding 16px 20px
      &:not(:last-child)
        margin-right 20px
      .label
        display flex
        align-items center
        line-height 1
        font-size 14px
        color $black
        .iconfont
          font-size 16px
          margin-left 8px
          cursor pointer
      .num
        font-size 26px
        font-weight bold
        line-height 42px
        margin-top 10px

  .content
    background #FFF
    border-radius 12px
    padding 20px
    min-height calc(100vh - 90px)
    .g-table-box
      margin-top 24px
      .pager
        display flex
        justify-content space-between
        align-items center
        .total
          color $black
          span
            color $dgray
            margin-right 20px

</style>
