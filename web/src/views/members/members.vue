<template>
  <el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome'}">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="searchRow">
      <el-col>
      姓名: <el-input @input="loadUserList()" clearable placeholder="请输入姓名" v-model="query.mb_name" class="inputSearch"></el-input>
      年龄: <el-input  @input="loadUserList()"  clearable placeholder="请输入年龄" v-model="query.mb_age" class="inputSearch"></el-input>
            <template>
          <el-button type="info" @click="searchUser()" icon="el-icon-search"></el-button>
        </template>
        <el-button @click="showAddUserDia()" type="success">添加用户</el-button>
      </el-col>
    </el-row>

    <el-table :data="items">
      <el-table-column type="index" label="ID" width="60">
      </el-table-column>
      <el-table-column prop="mb_name" label="姓名" width="80">
      </el-table-column>
      <el-table-column prop="mb_sex" label="性别" width="80">
      </el-table-column>
      <el-table-column prop="mb_age" label="年龄" width="80">
      </el-table-column>
      <el-table-column prop="mb_hobby" label="兴趣爱好">
      </el-table-column>
      <el-table-column prop="mb_email" label="邮箱">
      </el-table-column>
      <el-table-column prop="mb_mobile" label="电话">
      </el-table-column>

      <el-table-column prop="date" label="创建时间">
        <template slot-scope="scope"> {{scope.row.date | fmtdate}}</template>
      </el-table-column>

      <el-table-column label="用户状态">
        <template slot-scope="scope">
          <el-switch @change="changeState(scope.row)" v-model="scope.row.mb_state" active-color="#13ce66"
            inactive-color="#ff4949">
          </el-switch>
        </template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" icon="el-icon-edit" circle @click="editMbDia(scope.row)">
          </el-button>

          <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="deleMb(scope.row)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogFormVisibleAdd">
      <h2>{{form._id ? '编辑' : '添加'}}会员</h2>
      <el-form :model="form" :rules="rules" ref="form">
        <el-form-item label="用户名" prop="mb_name" label-width="100px">
          <el-input v-model="form.mb_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="性别" label-width="100px">
          <el-select v-model="form.mb_sex">
            <el-option label="男" value="男"></el-option>
            <el-option label="女" value="女"></el-option>

          </el-select>
        </el-form-item>
        <el-form-item label="年龄" prop="mb_age" label-width="100px">
          <el-input v-model="form.mb_age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="兴趣爱好" prop="mb_hobby" label-width="100px">
          <el-input v-model="form.mb_hobby" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="mb_email" label-width="100px">
          <el-input v-model="form.mb_email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mb_mobile" label-width="100px">
          <el-input v-model="form.mb_mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addUser()">确 定</el-button>
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
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
        form: {},
        rules: {
          mb_name: [{
              required: true,
              message: '会员名称不能为空',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 16,
              message: '长度在2-16个字符之间',
              trigger: 'blur'
            }
          ],
          mb_email: [{
              type: 'email',
              required: true,
              message: '邮箱格式不正确',
              trigger: 'blur'
            },

          ],
          mb_mobile: [{
              required: true,
              message: '手机号不能为空',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 16,
              message: '电话号码必须是11位',
              trigger: 'blur'
            }
          ]
        },
        paginations: {
          page_index: 1, //当前位于多少页
          total: 0, //总数
          page_size: 5, //一页显示多少条
          page_sizes: [5, 10, 15], //每页显示多少条
          layout: 'total,sizes,prev,pager,next,jumper' // 翻页属性
        },

        query: {
          mb_name: '',
          mb_age: ''
        },
        queryData: [],
        allitems: [],
        items: [],
        dialogFormVisibleAdd: false,
        
      }

    },
    methods: {


      //修改用户状态
      // async changeState(member) {

      //   await this.$http.put(`rest/members/${member._id}/state/${member.mb_state} `)

      // },
      //搜索用户
      searchUser() {
        if (this.query.mb_name === '' && this.query.mb_age === '') {
          this.$message({
            type: "warning",
            message: "请输入搜索内容"
          })
          this.fetch();
          return
        }
        this.allitems = this.queryData.filter(item => {

          let mbName = item.mb_name
          let mbAge = item.mb_age.toString()
          if (this.query.mb_name) {
            return this.query.mb_name === mbName
          } else
          if (this.query.mb_age) {
            return this.query.mb_age === mbAge
          } else
            if (this.query.mb_name && this.query.mb_age) 
          {
            return this.query.mb_name === mbName && this.query.mb_age === mbAge
          }


        })
        this.setPaginations()
      },
      loadUserList() {
        this.fetch();
      },
      //修改会员

      editMbDia(row) {
        this.form = row

        this.dialogFormVisibleAdd = true
      },


      //添加会员
      showAddUserDia() {
        this.form = {}
        this.dialogFormVisibleAdd = true
      },
      // submitForm(formName) {
      //   this.$refs[formName].validate((valid) => {
      //       if (valid) {
      async addUser() {
        this.dialogFormVisibleAdd = false

        if (this.form._id) {
          await this.$http.put(`rest/members/${this.form._id}`, this.form)
        } else {
          await this.$http.post('rest/members', this.form)
        }
        this.$router.push('/members')
        this.$message({
          type: 'success',
          message: '保存成功'
        });
        this.fetch()

      },
      //获取会员列表
      async fetch() {
        // let val = {
        //   username: this.query //把搜索框的值传给后端
        // };

        const res = await this.$http.get('rest/members')
        this.queryData = res.data
        this.allitems = res.data
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
      async deleMb(row) {

        this.$confirm(`确定删除 "${row.mb_name}" 用户? `, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`rest/members/${row._id}`)
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