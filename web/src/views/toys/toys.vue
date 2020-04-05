<template>
  <el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>玩具管理</el-breadcrumb-item>
      <el-breadcrumb-item>玩具列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="searchRow">
      <el-col>
        
      玩具名称: <el-input @input="loadUserList()" clearable placeholder="请输入名称" v-model="query.ty_name" class="inputSearch"></el-input>
      单价: <el-input @input="loadUserList()"  clearable placeholder="请输入单价" v-model="query.ty_price" class="inputSearch"></el-input>
        
        
        <template>
          <el-button type="info" @click="searchUser" icon="el-icon-search"></el-button>
        </template>
        <el-button v-if="user.identity == '管理员'" @click="$router.push('/toysCreate')" type="success">上架玩具</el-button>
      </el-col>
    </el-row>

    <el-table :data="items">
      <el-table-column type="index" label="#" width="60">
      </el-table-column>
      <el-table-column prop="parent.st_id" label="玩具编号" width="150" >
      </el-table-column>
     <!-- <el-table-column prop="child.tyt_name" label="玩具分类" width="100">
      </el-table-column>-->
      <el-table-column prop="parent.st_name" label="玩具名称" width="100">
      </el-table-column>
      <el-table-column prop="ty_price" label="单价" width="100">
      <template slot-scope="scope">
        <span style="color:#4db3ff">{{ scope.row.ty_price }}元</span>
        </template>
      </el-table-column>
      <el-table-column prop="parent.st_stock" label="库存" width="150">
      </el-table-column>
      <el-table-column prop="parent.st_unit" label="单位" width="150">
      </el-table-column>
      <el-table-column prop="date" label="上架时间">
       <template slot-scope="scope"> {{scope.row.date | fmtdate}}</template>
      </el-table-column>

      <el-table-column v-if="user.identity == '管理员'" label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" icon="el-icon-edit" circle
            @click="$router.push(`/toysEdit/${scope.row._id}`)">
          </el-button>

          <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="deleToys(scope.row)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>

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
        form: {},
        query: {
          ty_name: '',
          ty_price: ''
        },
        paginations: {
          page_index: 1, //当前位于多少页
          total: 0, //总数
          page_size: 5, //一页显示多少条
          page_sizes: [5, 10, 15], //每页显示多少条
          layout: 'total,sizes,prev,pager,next,jumper' // 翻页属性
        },
        child: [],
        parent: [],
        queryData: [],
        allitems: [],
        items: [],
        


      }

    },
    computed:{
        user(){
            return this.$store.getters.user
        }
    },
    created() {
      this.fetchStock();
      this.fetch();
     
    },

    methods: {
      //搜索用户
      searchUser() {
         if (this.query.ty_name === '' && this.query.ty_price === '') {
          this.$message({
            type: "warning",
            message: "请输入搜索内容"
          })
          this.fetch();
          return
        }
        this.allitems = this.queryData.filter(item => {

          let tyName = item.ty_name
          let tyPrice = item.ty_price.toString()
          if (this.query.ty_name) {
            return this.query.ty_name === tyName
          } else
          if (this.query.ty_price) {
            return this.query.ty_price === tyPrice
          } else
           if (this.query.ty_name && this.query.ty_price) 
          {
            return this.query.ty_name === tyName && this.query.ty_price === tyPrice
          }


        })
        this.setPaginations()
      },
      loadUserList() {
        
          this.fetch();
      },

      // 获取列表
      async fetchStock() {
        const res = await this.$http.get('rest/stocks')
        this.allitems = res.data
      },
      //获取会员列表
      async fetch() {
        const res = await this.$http.get('rest/toys')
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

      //删除会员
      async deleToys(row) {

        this.$confirm(`确定下架 "${row.ty_name}" 玩具吗? `, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`rest/toys/${row._id}`)
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