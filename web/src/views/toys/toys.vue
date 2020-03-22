<template>
  <el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>玩具管理</el-breadcrumb-item>
      <el-breadcrumb-item>玩具列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="searchRow">
      <el-col>
        <el-input @clear="loadUserList" clearable placeholder="请输入内容" v-model="queryInfo.query" class="inputSearch">
          <el-button @click="searchUser" slot="append" icon="el-icon-search"></el-button>
        </el-input>
        <el-button @click="showAddToysDia()" type="success">添加玩具</el-button>
      </el-col>
    </el-row>

    <el-table :data="items">
      <el-table-column type="index" label="ID" width="60">
      </el-table-column>
      <el-table-column prop="ty_name" label="玩具名称" width="100">
      </el-table-column>
      <el-table-column prop="parent.tyt_name" label="玩具分类" width="100">
      </el-table-column>
      <el-table-column prop="ty_price" label="单价" width="100">
      </el-table-column>
      <el-table-column prop="ty_number" label="数量" width="100">
      </el-table-column>


      <el-table-column prop="ty_time" label="创建时间">
        <template slot-scope="scope"> {{scope.row.create_time | fmtdate}} </template>
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
      <el-tabs >

        <el-tab-pane label="基本信息" >
          <h2>{{form._id ? '编辑' : '添加'}}玩具</h2>
          <el-form :model="form">
            <el-form-item label="玩具名称" label-width="100px">
              <el-input v-model="form.ty_name" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="玩具分类" label-width="100px">
              <el-select v-model="form.parent">
                <el-option v-for="item in parents" :key="item._id" :label="item.tyt_name" :value="item._id"></el-option>
              </el-select>
            </el-form-item>

         <!--   <el-form-item label="图示" label-width="100px">
              <el-upload class="avatar-uploader" :action="uploadUrl" :headers="getAuthHeaders()" :show-file-list="false"
                :on-success="afterUpload">
                <img v-if="form.ty_icon" :src="form.ty_icon" class="avatar">
                <i v-else class="el-icon-plus avatar-uploader-icon"></i>
              </el-upload>
            </el-form-item> -->
            <el-form-item label="单价" label-width="100px">
              <el-input v-model="form.ty_price" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="数量" label-width="100px">
              <el-input v-model="form.ty_number" autocomplete="off"></el-input>
            </el-form-item>

          </el-form>


        </el-tab-pane>
        <el-tab-pane label="展示图片">
          <el-upload :action="uploadUrl" :headers="getAuthHeaders()" list-type="picture-card"
            :on-preview="handlePictureCardPreview" :on-remove="handleRemove">
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="form.ty_icon" alt="">
          </el-dialog>

        </el-tab-pane>
      </el-tabs>

      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="addToys()">确 定</el-button>
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
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
        parents: [],
        parent: [],
        queryInfo: {
          query: '',
          pagenum: 1,
          pagesize: 2,
        },
        allitems:[],
        items: [],
        dialogFormVisibleAdd: false,
        form: {},
        dialogVisible: false,

      }

    },
    created() {

      this.fetch();
      this.getParents();
    },

    methods: {
      //玩具分类
      async getParents() {
        const res = await this.$http.get('rest/toyType')
        this.parents = res.data
        //console.log(res)
      },


      //修改会员

      editToysDia(row) {

        this.form = row
        this.form.parent = row.parent.tyt_name
        this.dialogFormVisibleAdd = true
        this.fetch()
      },
      //上传图片
      // afterUpload(res) {
      //   //this.$set(this.form.ty_icon, 'ty_icon', res.url)
      //   this.form.ty_icon = res.url
      //   this.fetch()
      // },
      handleRemove(file, fileList) {
        console.log(file, fileList);
      },
      handlePictureCardPreview(res) {
       // this.$set(this.form.ty_icon, 'ty_icon', res.url);
        this.form.ty_icon = res.url
        this.dialogVisible = true;
      },

      //添加会员
      showAddToysDia() {
        this.form = {}
        this.dialogFormVisibleAdd = true
      },

      async addToys() {

        this.dialogFormVisibleAdd = false
        if (this.form._id) {
          await this.$http.put(`rest/toys/${this.form._id}`, this.form)
        } else {
          await this.$http.post('rest/toys', this.form)
        }
        this.$router.push('/toys')
        this.$message({
          type: 'success',
          message: '保存成功'
        });
        this.fetch()

      },
      //获取会员列表
      async fetch() {
        const res = await this.$http.get('rest/toys')
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
      
      //删除会员
      async deleToys(row) {

        this.$confirm(`确定删除 "${row.ty_name}" 玩具吗? `, '提示', {
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

<style>
  .box-card {
    height: 100%;
  }

  .inputSearch {
    width: 300px;
  }

  .searchRow {
    margin-top: 20px;
  }

  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }

  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }

  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 5rem;
    height: 5rem;
    line-height: 5rem;
    text-align: center;
  }

  .avatar {
    width: 5rem;
    height: 5rem;
    display: block;
  }
</style>