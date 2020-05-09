<template>
  <el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome'}">数据中心</el-breadcrumb-item>
      <el-breadcrumb-item>销售管理</el-breadcrumb-item>
      <el-breadcrumb-item>销售订单</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="searchRow">
      <el-form :inline="true" ref="add_data" :model='query'>
        <el-form-item>
          按照时间筛选: <el-date-picker @input="loadUserList()" v-model="query.startTime" type="datetime"
            placeholder="选择开始时间">
          </el-date-picker>
          --
          <el-date-picker @input="loadUserList()" v-model="query.endTime" type="datetime" placeholder="选择结束时间">
          </el-date-picker>
        </el-form-item>
        订单编号: <el-input @input="loadUserList()" clearable placeholder="请输入订单编号" v-model="query.sl_id"
          class="inputSearch"></el-input>
        <template>
          <el-button type="info" plain @click="searchUser" icon="el-icon-search"></el-button>
        </template>
        <el-button @click="showAddToysDia()" type="primary" style="float: right;">玩具下单</el-button>
      </el-form>
    </el-row>

    <el-tabs v-model="activeName" type="border-card" @tab-click="searchOrder" style="height:650px; overflow:auto;">
      <el-tab-pane label="全部订单" name="order">
        <el-table :data="items">
          <el-table-column type="index" label="#" width="60">
          </el-table-column>
          <el-table-column prop="sl_id" label="订单编号" width="150">
          </el-table-column>
          <el-table-column prop="mb_name" label="会员名称" width="100">
          </el-table-column>
          <el-table-column prop="parent.st_tyName" label="玩具分类" width="100">
          </el-table-column>
          <el-table-column prop="parent.st_name" label="玩具名称" width="100">
          </el-table-column>
          <el-table-column prop="parent.ty_price" label="单价" width="100">
            <template slot-scope="scope">
              <span style="color:#4db3ff">¥ {{ scope.row.parent.ty_price }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="sl_number" label="数量" width="100">
          </el-table-column>
          <el-table-column prop="sl_totalPrice" label="总额" width="100">
            <template slot-scope="scope">
              <span style="color:#00d053">¥ {{ scope.row.sl_totalPrice}}</span>
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
          <el-table-column prop="date" label="下单时间">
            <template slot-scope="scope"> {{scope.row.date | fmtdate}}</template>
          </el-table-column>

          <el-table-column label="操作">
            <template slot-scope="scope">
              <el-button size="mini" plain type="primary" icon="el-icon-search" circle
                @click="showOrdersDia(scope.row)">
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
          <el-table-column prop="parent.st_name" label="玩具名称" width="100">
          </el-table-column>
          <el-table-column prop="sl_number" label="数量" width="100">
          </el-table-column>
          <el-table-column prop="ty_price" label="单价" width="100">
            <template slot-scope="scope">
              <span style="color:#4db3ff">¥{{ scope.row.ty_price }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="sl_totalPrice" label="总额" width="100">
            <template slot-scope="scope">
              <span style="color:#00d053">¥{{ scope.row.sl_totalPrice }}</span>
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
          <el-table-column prop="parent.st_name" label="玩具名称" width="100">
          </el-table-column>
          <el-table-column prop="sl_number" label="数量" width="100">
          </el-table-column>
          <el-table-column prop="ty_price" label="单价" width="100">
            <template slot-scope="scope">
              <span style="color:#4db3ff">¥{{ scope.row.ty_price }}</span>
            </template>
          </el-table-column>
          <el-table-column prop="sl_totalPrice" label="总额" width="100">
            <template slot-scope="scope">
              <span style="color:#00d053">¥{{ scope.row.sl_totalPrice }}</span>
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
      <h2>{{form._id ? '编辑玩具订单' : '玩具下单'}}</h2>
      <el-form :model="form">
        <el-form-item label="订单编号" label-width="100px">
          <el-input v-model="form.sl_id" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员名称" label-width="100px">
          <el-select v-model="form.mb_name"  @change="getPriceByName()">
            <el-option v-for="item in members" :key="item._id" :label="item.mb_name" :value="item.mb_name"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="玩具名称" label-width="100px">
          <el-select v-model="form.parent" @change="getPriceById()">
            <el-option v-for="item in parents" :key="item._id" :label="item.st_name" :value="item._id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="玩具分类" label-width="100px">
          <el-select v-model="form.parent">
            <el-option disabled v-for="item in parents" :key="item._id" :label="item.st_tyName" :value="item._id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="单价" label-width="100px">
          <el-input v-model="form.ty_price" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="数量" label-width="100px">
          <template>
            <el-input-number v-model="form.sl_number" @change="totalPrice()" :min="1" :max="1000"></el-input-number>
          </template>
        </el-form-item>
        <el-form-item label="总额" label-width="100px">
          <el-input v-model="form.sl_totalPrice" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="是否付款" label-width="100px">
          <el-select v-model="form.sl_payment" >
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="付款方式" label-width="100px">
          <el-select v-model="form.sl_payType" >
            <el-option label="微信支付" value="微信支付"></el-option>
            <el-option label="现金支付" value="现金支付"></el-option>
            <el-option label="支付宝" value="支付宝"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="是否发货" label-width="100px">
          <el-select v-model="form.sl_delivery" >
            <el-option label="是" value="是"></el-option>
            <el-option label="否" value="否"></el-option>
          </el-select>
        </el-form-item>
      </el-form>


      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addSales()">确 定</el-button>
      </div>
    </el-dialog>
    <el-dialog :title="'编号—'+form.sl_id+'—的订单详情'" :visible.sync="dialogFormVisibleShow">

      <el-form :model="form" class="form">
        <el-form-item label="订单编号 :" label-width="100px">
          {{form.sl_id}}
        </el-form-item>
        <el-form-item label="会员名称 :" label-width="100px">
          {{form.mb_name}}
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
        /*  sl_number: 1, */
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
        stocksItem: [],
        member: [],
        members: [],
        parents: [],
        parent: [],
        activeName: 'order',
        queryData: [],
        allitems: [],
        items: [],
        saveItem:{},//库存Obj
        scoresItem:[],
        scoreItem:{},
        dialogFormVisibleAdd: false,
        dialogFormVisibleShow: false,
        form: {
          parent: {},
        },

      }

    },
    methods: {
      //根据玩具id获取价格
      getPriceById() {
        let toyName='';
        /* console.log(toyName); */
        console.log(this.form.parent+"搜索id");
        this.parents.forEach(item => {
          /* console.log(item._id+"玩具id"); */
          if (item._id == this.form.parent) {
            this.form.ty_price = item.ty_price;
            toyName=item.st_name;
          }
        });
        this.stocksItem.forEach(item1 => {
            // console.log(item1)
          if (item1.st_name == toyName) {
          /*   console.log(item1) */
            //库存对象
            this.saveItem=item1;
          }
          
        });
      },
       //根据会员id获取积分
      getPriceByName() {
         let mbName='';
        /* console.log(this.form.mb_name+"会员名称"); */
        this.members.forEach(item2 => {
         /*  console.log(item2.mb_name+"玩具id"); */
          if (item2.mb_name == this.form.mb_name) {
            mbName=item2.mb_name;
          }
          /*  console.log(mbName+'mb会员'); */
        });
         this.scoresItem.forEach(item3 => {
           
          if (item3.mb_name == mbName) {
          
            this.scoreItem=item3;
          }
          
        });
      },
      //订单总额
      totalPrice() {
        /* console.log(this.form.sl_number) */
        this.form.sl_totalPrice =  Number(this.form.sl_number) * Number(this.form.ty_price)

      },
      //自增编号
      order_nums() {
        var outTradeNo = ""; //订单号
        for (var i = 0; i < 6; i++) //6位随机数，用以加在时间戳后面。
        {
          outTradeNo += Math.floor(Math.random() * 10);
        }
        outTradeNo = 'WJ'+ String(getDateNums(new Date())) + String(outTradeNo)
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
          if (this.query.startTime.getTime() && this.query.endTime.getTime()) {
            return time >= this.query.startTime.getTime() && time <= this.query.endTime.getTime()
          } else
          if (this.query.startTime.getTime() && this.query.endTime.getTime() && this.query.sl_id) {
            return time >= this.query.startTime.getTime() && time <= this.query.endTime.getTime() && this.query
              .sl_id == slId
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
          } 
        })
        this.setPaginations()
      },

      //会员
      async getMembers() {
        const res = await this.$http.get('rest/members')
        this.members = res.data
        //console.log(res)
      },
      //获取玩具分类
      async getParents() {
        const res = await this.$http.get('rest/toys')
        this.parents = res.data
        /* console.log(children) */
      },
      // 获取库存列表
      async fetchStock() {
        const res = await this.$http.get('rest/stocks')
        this.stocksItem = res.data
      },
       // 获取积分列表
      async fetchScores() {
        const res = await this.$http.get('rest/scores')
        this.scoresItem = res.data
      },
      //下单删减库存
      async addToys() {
         this.saveItem.st_stock= this.saveItem.st_stock-this.form.sl_number;
           await this.$http.put(`rest/stocks/${this.saveItem._id}`, this.saveItem)
        },
      //下单增加积分
      async addScore() {
         /*   console.log(this.scoreItem.mb_name+ '积分会员') */
          if(this.scoreItem.mb_name){  
         const score =  this.scoreItem.sc_score == null ? 0 : this.scoreItem.sc_score
         this.scoreItem.sc_score = (score ) + this.form.sl_totalPrice /10
          await this.$http.put(`rest/scores/${this.scoreItem._id}`, this.scoreItem)
          }else {
            this.scoreItem.mb_name= this.form.mb_name;
           /*   console.log(this.form.mb_name+ '下单会员') */
         this.scoreItem.sc_score = this.form.sl_totalPrice /10
          /* console.log(this.form.sl_totalPrice + '总额') */
        await this.$http.post('rest/scores', this.scoreItem)

          }
       
         
        },
       //判断库存
        hasAccess(){
           /* console.log(this.saveItem.st_stock); */
       if(this.saveItem.st_stock<this.form.sl_number){
          return false;
       }
       return true;
       },
        
      //修改
      editOrdersDia(row) {
        this.form = row
        this.form.parent = this.form.parent._id
        this.dialogFormVisibleAdd = true
        this.fetch()
      },
      //查看
      showOrdersDia(row) {
        this.form = row
        this.form.parent = row.parent
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

      async addSales() {
        if(!this.hasAccess()){
           this.$message({
           type: 'warning',
            message: '库存不足'
        });
        }
        else{
        this.dialogFormVisibleAdd = false
           this.getPriceById();
          this. getPriceByName()
          /*  console.log(this.saveItem); */
        if (this.form._id) {
          await this.$http.put(`rest/sale/${this.form._id}`, this.form)
        } else {
          await this.$http.post('rest/sale', this.form)
        }

        this.addScore()
        this.addToys();
        this.$router.push('/sales')
        this.$message({
          type: 'success',
          message: '下单成功'
        });
        this.fetch()
       }
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

        this.$confirm(`确定删除编号--${row.sl_id}--订单吗? `, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`rest/sale/${row._id}`)
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
      this.getParents()
      this.getMembers()
      this.fetchStock()
      this.fetchScores()
      
    }
  }
</script>

<style>
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
    text-align: center;
  }
</style>