<template>
  <el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome'}">数据中心</el-breadcrumb-item>
      <el-breadcrumb-item>销售管理</el-breadcrumb-item>
      <el-breadcrumb-item>销售订单</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="searchRow">
      <el-form :inline="true" ref="add_data" :model='query'>
        <el-form-item >
         按照时间筛选: <el-date-picker @input="loadUserList()" v-model="query.startTime" type="datetime" placeholder="选择开始时间">
          </el-date-picker>
          --
          <el-date-picker @input="loadUserList()" v-model="query.endTime" type="datetime" placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        订单编号: <el-input @input="loadUserList()" clearable placeholder="请输入订单编号" v-model="query.sl_id" class="inputSearch"></el-input>
        <template>
          <el-button type="info" plain @click="searchUser" icon="el-icon-search" ></el-button>
        </template>
        <el-button @click="showAddToysDia()" type="primary" style="float: right;">添加分类</el-button>
      </el-form>
    </el-row>

    <el-tabs v-model="activeName" type="border-card" @tab-click="searchOrder" style="height:650px; overflow:auto;">
      <el-tab-pane label="全部订单" name="order">
        <el-table :data="items">
          <el-table-column type="index" label="#" width="60">
          </el-table-column>
          <el-table-column prop="sl_id" label="订单编号" width="150">
          </el-table-column>
           <el-table-column prop="parent.mb_name" label="会员名称" width="100">
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
              <el-tag type="success" v-if="scope.row.sl_payment==='是'">已付款</el-tag>
               <el-tag type="danger" v-if="scope.row.sl_payment==='否'">未付款</el-tag>
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
              <span v-if="scope.row.sl_payType===''">
                <span style="color:#f56767">{{ '未支付' }}</span>
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
            <el-button size="mini" plain type="info" icon="el-icon-search" circle @click="showOrdersDia(scope.row)">
              </el-button>
              <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="editOrdersDia(scope.row)">
              </el-button>
              <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="deleOrders(scope.row)">
              </el-button>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待支付" name="pay">
        <el-table :data="items">
          <el-table-column type="index" label="#" width="60">
          </el-table-column>
          <el-table-column prop="sl_id" label="订单编号" width="150">
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
              <el-tag type="danger" v-if="scope.row.sl_payment==='否'">未付款</el-tag>
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
          
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待发货" name="delivery">
        <el-table :data="items">
          <el-table-column type="index" label="#" width="60">
          </el-table-column>
          <el-table-column prop="sl_id" label="订单编号" width="150">
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
              <el-tag type="danger" v-if="scope.row.sl_payType===''">未付款</el-tag>
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
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="待确认收货" name="receive">
        <el-table :data="items">
          <el-table-column type="index" label="#" width="60">
          </el-table-column>
          <el-table-column prop="sl_id" label="订单编号" width="150">
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
              <el-tag type="danger" v-if="scope.row.sl_payType===''">未付款</el-tag>
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
        </el-table>
      </el-tab-pane>
    </el-tabs>



    <el-dialog :visible.sync="dialogFormVisibleAdd">
      <h2>{{form._id ? '编辑' : '添加'}}玩具分类</h2>
      <el-form :model="form">
      <el-form-item label="订单编号" label-width="100px">
          <el-input v-model="form.sl_id"  autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员名称" prop="parent" label-width="100px">
            <el-select v-model="form.parent">
              <el-option v-for="item in parents" :key="item._id" :label="item.mb_name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
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
    <el-dialog :title="'编号—'+form.sl_id+'—的订单详情'" :visible.sync="dialogFormVisibleShow" >
      
      <el-form :model="form" class="form">
      <el-form-item label="订单编号 :" label-width="100px">
          {{form.sl_id}}
        </el-form-item>
        <el-form-item label="会员名称 :" label-width="100px">
            {{form.parent.mb_name}}
          </el-form-item>
          <el-form-item label="手机号码 :" label-width="100px">
            {{form.parent.mb_mobile}}
          </el-form-item>
        <el-form-item label="商品名称 :" label-width="100px">
          {{form.sl_name}}
        </el-form-item>
        <el-form-item label="数量 :" label-width="100px">
          {{form.sl_number}}
        </el-form-item>
        <el-form-item label="单位" label-width="100px">
        {{form.sl_unit}}
        </el-form-item>
        <el-form-item label="单价" label-width="100px">
        {{form.ty_price}}
        </el-form-item>
        <el-form-item label="总额" label-width="100px">
        {{form.sl_totalPrice}}
        </el-form-item>
        <el-form-item label="是否付款" label-width="100px">
        {{form.sl_payment}}
        </el-form-item>
        <el-form-item label="付款方式" label-width="100px">
        {{form.sl_payType}}
        </el-form-item>
        <el-form-item label="是否发货" label-width="100px">
        {{form.sl_delivery}}
        </el-form-item>
        <el-form-item label="待确认收货" label-width="100px">
        {{form.sl_receive}}
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
      :current-page.sync="paginations.page_index" :page-sizes="paginations.page_sizes"
      :page-size="paginations.page_size" :layout="paginations.layout" :total="paginations.total">
    </el-pagination>

  </el-card>
</template>

<script>
 import {
    getDateNums
  } from "@/plugins/utils.js"

  export default {
    data() {
      return {
        query: {
          startTime: '',
          endTime: '',
          sl_id: ''
        },
        paginations: {
          page_index: 1, //当前位于多少页
          total: 0, //总数
          page_size: 10, //一页显示多少条
          page_sizes: [5, 10, 20], //每页显示多少条
          layout: 'total,sizes,prev,pager,next,jumper' // 翻页属性
        },
        parents: [],
        parent: [],
        activeName: 'order',
        queryData: [],
        allitems: [],
        items: [],
        dialogFormVisibleAdd: false,
        dialogFormVisibleShow: false,
        form: {
          parent: [],
        },
      }

    },
    methods: {
       //自增编号
      order_nums() {
        var outTradeNo = ""; //订单号
        for (var i = 0; i < 6; i++) //6位随机数，用以加在时间戳后面。
        {
          outTradeNo += Math.floor(Math.random() * 10);
        }

        outTradeNo = String(getDateNums(new Date())) + String(outTradeNo)
        this.outTradeNo = outTradeNo;
      },


      //按时间搜索
      searchUser() {
        if (!this.query.startTime && !this.query.endTime && !this.query.sl_id) {
          this.$message({
            type: 'warning',
            message: '请填写搜索条件'
          })
          this.fetch()
          return
        }
        // const sTime = this.query.startTime.getTime()
        // const eTime = this.query.endTime.getTime()
        this.allitems = this.queryData.filter(item => {
          let date = new Date(item.date)
          let time = date.getTime()
          let slId = item.sl_id
          if (this.query.sl_id) {
            return this.query.sl_id == slId
          } else
           if (this.query.startTime.getTime() && this.query.endTime.getTime()) 
          {
            return time >= this.query.startTime.getTime() && time <= this.query.endTime.getTime()
          }
          else
           if (this.query.startTime.getTime() && this.query.endTime.getTime() && this.query.sl_id ) 
          {
            return time >= this.query.startTime.getTime() && time <= this.query.endTime.getTime() && this.query.sl_id == slId
          }
          
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
            return item.sl_receive === '否' && item.sl_delivery === '是'
          }

        })
        this.setPaginations()
      },
      
       //玩具分类
      async getParents() {
        const res = await this.$http.get('rest/members')
        this.parents = res.data
        //console.log(res)
      },

      //修改
      editOrdersDia(row) {
        this.form = row
        
        this.dialogFormVisibleAdd = true
        this.fetch()
      },
      //查看
      showOrdersDia(row) {
        this.form = row
        this.form.parent= row.parent
        this.dialogFormVisibleShow = true
        this.fetch()
      },

      //添加
      showAddToysDia() {
        this.order_nums() 
        this.form = {}
        this.form.sl_id = this.outTradeNo
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
        this.paginations.page_size = 10
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
      async deleOrders(row) {

        this.$confirm(`确定删除编号-${row.sl_id}-该订单吗? `, '提示', {
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
      this.getParents();
    }
  }
</script>

<style >
  .box-card {
    height: 100%;
  }

  .inputSearch {
    width: 200px;
  }

  .searchRow {
    margin-top: 20px;
  }
  .form .el-form {
    text-align:center;
  }
</style>