<template>
  <el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>玩具管理</el-breadcrumb-item>
      <el-breadcrumb-item>玩具分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="searchRow">
      <el-col>
        <el-button @click="showAddToysDia()" type="success">添加类型</el-button>
      </el-col>
    </el-row>

    <el-table :data="items">
      <el-table-column type="index" label="ID" width="60">
      </el-table-column>
      <el-table-column prop="ust_name" label="类型名称" width="100">
      </el-table-column>

      <el-table-column prop="ust_describe" label="类型描述">
      </el-table-column>


      <el-table-column prop="date" label="创建时间">
        <template slot-scope="scope"> {{scope.row.date | fmtdate}} </template>
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
      <h2>{{form._id ? '编辑' : '添加'}}用户类型</h2>
      <el-form :model="form">
        <el-form-item label="类型名称" label-width="100px">
          <el-input v-model="form.ust_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="类型描述" label-width="100px">
          <el-input v-model="form.ust_describe" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addToys()">确 定</el-button>
      </div>
    </el-dialog>


  </el-card>
</template>

<script>
  export default {
    data() {
      return {
        
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
           await this.$http.put(`rest/userType/${this.form._id}`, this.form)
        }else{
         await this.$http.post('rest/userType', this.form)
        }
        this.$router.push('/usersType')
        this.$message({
          type: 'success',
          message: '保存成功'
        });
        this.fetch()

      },
      //获取列表
      async fetch() {
        const res = await this.$http.get('rest/userType')
        this.items = res.data
        //console.log(res)
      },
      //删除
      async deleToys(row) {

        this.$confirm(`确定删除 "${row.ust_name}" 玩具分类吗? `, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`rest/userType/${row._id}`)
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

  
</style>