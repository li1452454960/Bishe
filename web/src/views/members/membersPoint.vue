<template>
  <el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome'}">数据中心</el-breadcrumb-item>
      <el-breadcrumb-item>玩具管理</el-breadcrumb-item>
      <el-breadcrumb-item>玩具分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="searchRow">
     <!-- <el-col>
        <el-button @click="showAddScoreDia()" type="primary">玩具入库</el-button>
      </el-col>-->
    </el-row>

    <el-table :data="items" style="height:650px; overflow:auto;">
      <el-table-column type="index" label="#" width="60">
      </el-table-column>
      <el-table-column prop="parent.mb_name" label="会员名称" width="150">
      </el-table-column>
      <el-table-column prop="sc_score" label="积分总额" width="100">
      <template slot-scope="scope">
              <span style="color:#4db3ff">{{ scope.row.sc_score }}</span>
            </template>
      </el-table-column>
      <el-table-column prop="sc_receive" label="领取积分" width="100">
      <template slot-scope="scope">
              <span style="color:#00d053">+{{ scope.row.sc_receive }}</span>
            </template>
      </el-table-column>
      <el-table-column prop="sc_exchange" label="兑换积分">
        <template slot-scope="scope">
              <span style="color:#f56767">-{{ scope.row.sc_receive }}</span>
            </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" icon="el-icon-plus" circle @click="editScoreDia(scope.row)">
          </el-button>
        <!--  <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="deleScoreDia(scope.row)">
          </el-button>-->
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogFormVisibleAdd">
      <h2>{{form._id ? '编辑会员积分' : '新增会员积分'}}</h2>
      <el-form :model="form" >
      <el-form-item label="会员名称" prop="parent" label-width="100px">
            <el-select v-model="form.parent">
              <el-option v-for="item in parents" :key="item._id" :label="item.mb_name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
         <el-form-item label="积分总额"  label-width="100px">
          <el-input v-model="form.sc_score"  autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item label="领取积分" prop="st_name" label-width="100px">
          <el-input v-model="form.sc_receive" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="兑换积分" prop="st_stock" label-width="100px">
          <el-input v-model="form.sc_exchange" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addScore()">确 定</el-button>
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
        paginations: {
          page_index: 1, //当前位于多少页
          total: 0, //总数
          page_size: 10, //一页显示多少条
          page_sizes: [5, 10, 15], //每页显示多少条
          layout: 'total,sizes,prev,pager,next,jumper' // 翻页属性
        },
        parents: [],
        parent: [],   
        allitems: [],
        items: [],
        dialogFormVisibleAdd: false,
        dialogFormVisibleAddStock: false,
        form: {},
      }

    },

    methods: {

        //玩具分类
      async getParents() {
        const res = await this.$http.get('rest/members')
        this.parents = res.data
        //console.log(res)
      },
      //修改
      editScoreDia(row) {
        this.form = row
        this.form.parent= row.parent.mb_name
        this.dialogFormVisibleAdd = true
        this.fetch()
      },
      //添加
      showAddScoreDia() {
        this.form = {}
        this.dialogFormVisibleAdd = true
      },
      async addScore() {

        this.dialogFormVisibleAdd = false
        if (this.form._id) {
          await this.$http.put(`rest/scores/${this.form._id}`, this.form)
        } else {
          await this.$http.post('rest/scores', this.form)
        
        }
       
        this.$router.push('/membersPoint')
        this.$message({
          type: 'success',
          message: '保存成功'
        });
        this.fetch()

      },
      //获取列表
      async fetch() {
        const res = await this.$http.get('rest/scores')
        this.allitems = res.data
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
    /*   async deleScoreDia(row) {

        this.$confirm(`确定删除 "${row.st_name}" 玩具吗? `, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`rest/scores/${row._id}`)
          // console.log(res)
          //   if (res.data.meta.status === 200) {
          //     this.queryInfo.pagenum = 1

          this.$message({
            type: 'success',
            message: "删除成功"

          });
          this.fetch()

        })
      } */

    },
    created() {
      this.fetch()
      this.getParents();
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