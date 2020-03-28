<template>
  <el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>销售管理</el-breadcrumb-item>
      <el-breadcrumb-item>销售订单</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="searchRow">
      <el-form :inline="true" ref="add_data" :model='query'>
        <el-form-item label="按照时间筛选:">
          <el-date-picker @input="loadUserList()" v-model="query.startTime" type="datetime" placeholder="选择开始时间">
          </el-date-picker>
          --
          <el-date-picker @input="loadUserList()" v-model="query.endTime" type="datetime" placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>

        <template>
          <el-button type="info" @click="searchUser" icon="el-icon-search"></el-button>
        </template>
        <el-button @click="showAddToysDia()" type="success" style="float: right;">添加分类</el-button>
      </el-form>
    </el-row>

    <el-tabs v-model="activeName" type="border-card" @tab-click="searchOrder" style="height:650px; overflow:auto;">
      <el-tab-pane label="全部订单" name="order">
        <el-table :data="items">
          <el-table-column type="index" label="#" width="60">
          </el-table-column>
          <el-table-column prop="_id" label="订单编号" width="150">
          </el-table-column>
          <el-table-column prop="sl_name" label="商品名称" width="100">
          </el-table-column>
          <el-table-column prop="sl_number" label="数量" width="100">
          </el-table-column>
          <el-table-column prop="sl_unit" label="单位" width="100">
          </el-table-column>
          <el-table-column prop="ty_price" label="单价" width="100">
            <template slot-scope="scope">
              <span style="color:#4db3ff">{{ scope.row.ty_price }}元</span>
            </template>
          </el-table-column>
          <el-table-column prop="sl_totalPrice" label="总额" width="100">
            <template slot-scope="scope">
              <span style="color:#00d053">{{ scope.row.sl_totalPrice }}元</span>
            </template>
          </el-table-column>
          <el-table-column prop="sl_payment" label="是否付款" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.sl_payment==='是'">
                <span style="color:#4db3ff">{{ scope.row.sl_payment }}</span>
              </span>
              <span v-if="scope.row.sl_payment==='否'">
                <span style="color:#f56767">{{ scope.row.sl_payment }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="sl_payType" label="付款方式" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.sl_payType==='微信支付'">
                <span style="color:#00d053">{{ scope.row.sl_payType }}</span>
              </span>
              <span v-if="scope.row.sl_payType==='支付宝'">
                <span style="color:#4db3ff">{{ scope.row.sl_payType }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="sl_delivery" label="是否发货" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.sl_delivery==='是'">
                <span style="color:#4db3ff">{{ scope.row.sl_delivery }}</span>
              </span>
              <span v-if="scope.row.sl_delivery==='否'">
                <span style="color:#f56767">{{ scope.row.sl_delivery }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="sl_receive" label="待确认收货" width="110">
            <template slot-scope="scope">
              <span v-if="scope.row.sl_receive==='是'">
                <span style="color:#4db3ff">{{ scope.row.sl_receive }}</span>
              </span>
              <span v-if="scope.row.sl_receive==='否'">
                <span style="color:#f56767">{{ scope.row.sl_receive }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="下单时间">
            <template slot-scope="scope"> {{scope.row.date | fmtdate}}</template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="editToysDia(scope.row)">
              </el-button>
              <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="deleToys(scope.row)">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待支付" name="pay">
        <el-table :data="items">
          <el-table-column type="index" label="#" width="60">
          </el-table-column>
          <el-table-column prop="_id" label="订单编号" width="150">
          </el-table-column>
          <el-table-column prop="sl_name" label="商品名称" width="100">
          </el-table-column>
          <el-table-column prop="sl_number" label="数量" width="100">
          </el-table-column>
          <el-table-column prop="sl_unit" label="单位" width="100">
          </el-table-column>
          <el-table-column prop="ty_price" label="单价" width="100">
            <template slot-scope="scope">
              <span style="color:#4db3ff">{{ scope.row.ty_price }}元</span>
            </template>
          </el-table-column>
          <el-table-column prop="sl_totalPrice" label="总额" width="100">
            <template slot-scope="scope">
              <span style="color:#00d053">{{ scope.row.sl_totalPrice }}元</span>
            </template>
          </el-table-column>
          <el-table-column prop="sl_payment" label="是否付款" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.sl_payment==='是'">
                <span style="color:#4db3ff">{{ scope.row.sl_payment }}</span>
              </span>
              <span v-if="scope.row.sl_payment==='否'">
                <span style="color:#f56767">{{ scope.row.sl_payment }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="sl_delivery" label="是否发货" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.sl_delivery==='是'">
                <span style="color:#4db3ff">{{ scope.row.sl_delivery }}</span>
              </span>
              <span v-if="scope.row.sl_delivery==='否'">
                <span style="color:#f56767">{{ scope.row.sl_delivery }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="sl_receive" label="待确认收货" width="110">
            <template slot-scope="scope">
              <span v-if="scope.row.sl_receive==='是'">
                <span style="color:#4db3ff">{{ scope.row.sl_receive }}</span>
              </span>
              <span v-if="scope.row.sl_receive==='否'">
                <span style="color:#f56767">{{ scope.row.sl_receive }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="下单时间">
            <template slot-scope="scope"> {{scope.row.date | fmtdate}}</template>
          </el-table-column>


          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="editToysDia(scope.row)">
              </el-button>
              <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="deleToys(scope.row)">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待发货" name="delivery">
        <el-table :data="items">
          <el-table-column type="index" label="#" width="60">
          </el-table-column>
          <el-table-column prop="_id" label="订单编号" width="150">
          </el-table-column>
          <el-table-column prop="sl_name" label="商品名称" width="100">
          </el-table-column>
          <el-table-column prop="sl_number" label="数量" width="100">
          </el-table-column>
          <el-table-column prop="sl_unit" label="单位" width="100">
          </el-table-column>
          <el-table-column prop="ty_price" label="单价" width="100">
            <template slot-scope="scope">
              <span style="color:#4db3ff">{{ scope.row.ty_price }}元</span>
            </template>
          </el-table-column>
          <el-table-column prop="sl_totalPrice" label="总额" width="100">
            <template slot-scope="scope">
              <span style="color:#00d053">{{ scope.row.sl_totalPrice }}元</span>
            </template>
          </el-table-column>
          <el-table-column prop="sl_payType" label="付款方式" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.sl_payType==='微信支付'">
                <span style="color:#00d053">{{ scope.row.sl_payType }}</span>
              </span>
              <span v-if="scope.row.sl_payType==='支付宝'">
                <span style="color:#4db3ff">{{ scope.row.sl_payType }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="sl_delivery" label="是否发货" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.sl_delivery==='是'">
                <span style="color:#4db3ff">{{ scope.row.sl_delivery }}</span>
              </span>
              <span v-if="scope.row.sl_delivery==='否'">
                <span style="color:#f56767">{{ scope.row.sl_delivery }}</span>
              </span>
            </template>
          </el-table-column>
          
          <el-table-column prop="date" label="下单时间">
            <template slot-scope="scope"> {{scope.row.date | fmtdate}}</template>
          </el-table-column>


          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="editToysDia(scope.row)">
              </el-button>
              <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="deleToys(scope.row)">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待确认收货" name="receive">
        <el-table :data="items">
          <el-table-column type="index" label="#" width="60">
          </el-table-column>
          <el-table-column prop="_id" label="订单编号" width="150">
          </el-table-column>
          <el-table-column prop="sl_name" label="商品名称" width="100">
          </el-table-column>
          <el-table-column prop="sl_number" label="数量" width="100">
          </el-table-column>
          <el-table-column prop="sl_unit" label="单位" width="100">
          </el-table-column>
          <el-table-column prop="ty_price" label="单价" width="100">
            <template slot-scope="scope">
              <span style="color:#4db3ff">{{ scope.row.ty_price }}元</span>
            </template>
          </el-table-column>
          <el-table-column prop="sl_totalPrice" label="总额" width="100">
            <template slot-scope="scope">
              <span style="color:#00d053">{{ scope.row.sl_totalPrice }}元</span>
            </template>
          </el-table-column>
          <el-table-column prop="sl_payType" label="付款方式" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.sl_payType==='微信支付'">
                <span style="color:#00d053">{{ scope.row.sl_payType }}</span>
              </span>
              <span v-if="scope.row.sl_payType==='支付宝'">
                <span style="color:#4db3ff">{{ scope.row.sl_payType }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="sl_delivery" label="是否发货" width="100">
            <template slot-scope="scope">
              <span v-if="scope.row.sl_delivery==='是'">
                <span style="color:#4db3ff">{{ scope.row.sl_delivery }}</span>
              </span>
              <span v-if="scope.row.sl_delivery==='否'">
                <span style="color:#f56767">{{ scope.row.sl_delivery }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="sl_receive" label="待确认收货" width="110">
            <template slot-scope="scope">
              <span v-if="scope.row.sl_receive==='是'">
                <span style="color:#4db3ff">{{ scope.row.sl_receive }}</span>
              </span>
              <span v-if="scope.row.sl_receive==='否'">
                <span style="color:#f56767">{{ scope.row.sl_receive }}</span>
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="date" label="下单时间">
            <template slot-scope="scope"> {{scope.row.date | fmtdate}}</template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
    </el-tabs>



    <el-dialog :visible.sync="dialogFormVisibleAdd">
      <h2>{{form._id ? '编辑' : '添加'}}玩具分类</h2>
      <el-form :model="form">
        <el-form-item label="商品名称" label-width="100px">
          <el-input v-model="form.sl_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" label-width="100px">
          <el-input v-model="form.sl_number" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位" label-width="100px">
          <el-input v-model="form.sl_unit" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单价" label-width="100px">
          <el-input v-model="form.ty_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="总额" label-width="100px">
          <el-input v-model="form.sl_totalPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否付款" label-width="100px">
          <el-input v-model="form.sl_payment" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="付款方式" label-width="100px">
          <el-input v-model="form.sl_payType" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否发货" label-width="100px">
          <el-input v-model="form.sl_delivery" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="待确认收货" label-width="100px">
          <el-input v-model="form.sl_receive" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>


      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addToys()">确 定</el-button>
      </div>
    </el-dialog>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page.sync="paginations.page_index" :page-sizes="paginations.page_sizes"
      :page-size="paginations.page_size" :layout="paginations.layout" :total="paginations.total">
    </el-pagination>

  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        query: {
          startTime: '',
          endTime: ''
        },
        paginations: {
          page_index: 1, //当前位于多少页
          total: 0, //总数
          page_size: 5, //一页显示多少条
          page_sizes: [5, 10, 15], //每页显示多少条
          layout: 'total,sizes,prev,pager,next,jumper' // 翻页属性
        },
        activeName: 'order',
        queryData: [],
        allitems: [],
        items: [],
        dialogFormVisibleAdd: false,
        form: {},
      }

    },
    methods: {

      //按时间搜索
      searchUser() {
        if (!this.query.startTime || !this.query.endTime) {
          this.$message({
            type: 'warning',
            message: '请选择时间区间'
          })
          this.fetch()
          return
        }
        const sTime = this.query.startTime.getTime()
        const eTime = this.query.endTime.getTime()
        this.allitems = this.queryData.filter(item => {
          let date = new Date(item.date)
          let time = date.getTime()
          return time >= sTime && time <= eTime
        })
        this.setPaginations()
      },
      loadUserList() {

        this.fetch();
      },


      //待支付
      searchOrder(tab) {

        this.allitems = this.queryData.filter(item => {

          if (tab.name == 'order') {
            this.fetch()
            return
          } else
          if (tab.name === 'pay') {
            return item.sl_payment === '否'
          } else
          if (tab.name === 'delivery') {
            return item.sl_delivery === '否'
          } else
          if (tab.name === 'receive') {
            return item.sl_receive === '否'
          }

        })
        this.setPaginations()
      },


      //修改
      editToysDia(row) {
        this.form = row

        this.dialogFormVisibleAdd = true
      },

      //添加
      showAddToysDia() {
        this.form = {}
        this.dialogFormVisibleAdd = true
      },

      async addToys() {

        this.dialogFormVisibleAdd = false
        if (this.form._id) {
          await this.$http.put(`rest/sale/${this.form._id}`, this.form)
        } else {
          await this.$http.post('rest/sale', this.form)
        }
        this.$router.push('/sales')
        this.$message({
          type: 'success',
          message: '保存成功'
        });
        this.fetch()

      },
      //获取列表
      async fetch() {
        const res = await this.$http.get('rest/sale')
        this.allitems = res.data
        this.queryData = res.data
        this.setPaginations()
      },
      //分页
      setPaginations() {
        this.paginations.total = this.allitems.length
        this.paginations.page_index = 1
        this.paginations.page_size = 5
        //设置默认分页数据
        this.items = this.allitems.filter((item, index) => {
          return index < this.paginations.page_size
        })
      },
      handleSizeChange(page_size) {
        this.paginations.page_index = 1
        this.paginations.page_size = page_size
        this.items = this.allitems.filter((item, index) => {
          return index < page_size
        })
      },
      handleCurrentChange(page) {
        //获取当前页
        let index = this.paginations.page_size * (page - 1)
        //数据总数
        let nums = this.paginations.page_size * page
        let tables = []
        for (let i = index; i < nums; i++) {
          if (this.allitems[i]) {
            tables.push(this.allitems[i])
          }
          this.items = tables
        }
      },
      //删除
      async deleToys(row) {

        this.$confirm(`确定删除该订单吗? `, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`rest/sale/${row._id}`)
          // console.log(res)
          //   if (res.data.meta.status === 200) {
          //     this.queryInfo.pagenum = 1

          this.$message({
            type: 'success',
            message: "删除成功"

          });
          this.fetch()

        })
      }

    },
    created() {
      this.fetch()
    }
  }
</script>

<style scoped>
  .box-card {
    height: 100%;
  }

  .inputSearch {
    width: 200px;
  }

  .searchRow {
    margin-top: 20px;
  }
</style>