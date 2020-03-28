<template>
  <el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>玩具管理</el-breadcrumb-item>
      <el-breadcrumb-item>玩具分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="searchRow">
      <el-col>
        
        <el-button @click="showAddToysDia()" type="success" style="float: right;">添加分类</el-button>
      </el-col>
    </el-row>

    <el-table :data="items">
      <el-table-column type="index" label="#" width="60">
      </el-table-column>
      <el-table-column prop="tyt_name" label="分类名称" width="100">
      </el-table-column>

      <el-table-column prop="tyt_describe" label="分类描述">
      </el-table-column>


      <el-table-column prop="date" label="创建时间">
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

    <el-dialog :visible.sync="dialogFormVisibleAdd">
      <h2>{{form._id ? '编辑' : '添加'}}玩具分类</h2>
      <el-form :model="form">
        <el-form-item label="分类名称" label-width="100px">
          <el-input v-model="form.tyt_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="分类描述" label-width="100px">
          <el-input v-model="form.tyt_describe" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addToys()">确 定</el-button>
      </div>
    </el-dialog>

    <el-pagination 
    @size-change="handleSizeChange" 
    @current-change="handleCurrentChange"
      :current-page.sync="paginations.page_index" 
      :page-sizes="paginations.page_sizes"
      :page-size="paginations.page_size" 
      :layout="paginations.layout" 
      :total="paginations.total">
    </el-pagination>

  </el-card>
</template>

<script>
  export default {
    data() {
      return {
         paginations:{
                page_index:1, //当前位于多少页
                total:0, //总数
                page_size:5,  //一页显示多少条
                page_sizes:[5,10,15], //每页显示多少条
                layout:'total,sizes,prev,pager,next,jumper' // 翻页属性
            },
           
        allitems:[],
        items: [],
        dialogFormVisibleAdd: false,
        form: {},
      }

    },
    methods: {

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
        if(this.form._id) {
           await this.$http.put(`rest/toyType/${this.form._id}`, this.form)
        }else{
         await this.$http.post('rest/toyType', this.form)
        }
        this.$router.push('/toysType')
        this.$message({
          type: 'success',
          message: '保存成功'
        });
        this.fetch()

      },
      //获取列表
      async fetch() {
        const res = await this.$http.get('rest/toyType')
        this.allitems = res.data
         this.setPaginations()
      },
      //分页
       setPaginations(){
            this.paginations.total = this.allitems.length
            this.paginations.page_index = 1
            this.paginations.page_size = 5
            //设置默认分页数据
            this.items = this.allitems.filter((item,index)=>{
                return index < this.paginations.page_size
            })
        },
        handleSizeChange(page_size){
            this.paginations.page_index = 1
            this.paginations.page_size = page_size
            this.items = this.allitems.filter((item,index)=>{
                return index < page_size
            })
        },
        handleCurrentChange(page){
            //获取当前页
            let index = this.paginations.page_size * (page-1)
            //数据总数
            let nums = this.paginations.page_size * page
            let tables = []
            for(let i=index; i<nums; i++){
                if(this.allitems[i]){
                    tables.push(this.allitems[i])
                }
                this.items = tables
            }
        },
      //删除
      async deleToys(row) {

        this.$confirm(`确定删除 "${row.tyt_name}" 玩具分类吗? `, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`rest/toyType/${row._id}`)
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

<style scoped >
  .box-card {
    height: 100%;
  }

  .inputSearch {
    width: 300px;
  }

  .searchRow {
    margin-top: 20px;
  }

  
</style>