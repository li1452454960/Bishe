<template>
  <el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome'}">数据中心</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="searchRow">
      <el-col>
      姓名: <el-input @input="loadUserList()" clearable placeholder="请输入姓名" v-model="query.mb_name" class="inputSearch"></el-input>
      年龄: <el-input  @input="loadUserList()"  clearable placeholder="请输入年龄" v-model="query.mb_age" class="inputSearch"></el-input>
      会员级别: <el-select @input="loadUserList()" v-model="query.mb_grade"  clearable placeholder="请选择会员级别" class="inputSearch">
                    <el-option label="普通会员" value="普通会员"></el-option>
                    <el-option label="黄金会员" value="黄金会员"></el-option>
                    <el-option label="钻石会员" value="钻石会员"></el-option> 
                     </el-select>     
            <template>
          <el-button type="info" plain @click="searchMember()" icon="el-icon-search"></el-button>
        </template>
        <el-button @click="showAddMemberDia()" type="primary" style="float: right;">会员入会</el-button>
      </el-col>
    </el-row>

    <el-table :data="items" stripe style="height:650px; overflow:auto;">
      <el-table-column type="index" label="#" width="60">
      </el-table-column>
      <el-table-column prop="mb_name" label="姓名" width="80">
      </el-table-column>
      <el-table-column prop="mb_sex" label="性别" width="80">
      </el-table-column>
      <el-table-column prop="mb_age" label="年龄" width="150">
       <template slot-scope="scope">
          <span v-if="scope.row.mb_age > 18 ">
            <span style="color:#f56767">{{ scope.row.mb_age }}（超出年龄限制）</span>
          </span>
          <span v-if="scope.row.mb_age <= 18 ">
            <span style="color:#00d053">{{ scope.row.mb_age }}</span>
          </span>
        </template>
      </el-table-column>
      <el-table-column prop="mb_hobby" label="兴趣爱好">
      </el-table-column>
      <el-table-column prop="mb_email" label="邮箱">
      </el-table-column>
      <el-table-column prop="mb_mobile" label="电话">
      </el-table-column>
      <el-table-column prop="mb_grade" label="会员级别">
      <template slot-scope="scope">
              <span v-if="scope.row.mb_grade==='钻石会员'">
                <span style="color:#f39c12">{{ scope.row.mb_grade }}</span>
              </span>
              <span v-if="scope.row.mb_grade==='黄金会员'">
                <span style="color:#f1c40f">{{ scope.row.mb_grade }}</span>
              </span>
              <span v-if="scope.row.mb_grade==='普通会员'">
                <span style="color:#7f8c8d">{{ scope.row.mb_grade }}</span>
              </span>
            </template>
      </el-table-column>
      <el-table-column prop="date" label="创建时间">
        <template slot-scope="scope"> {{scope.row.date | fmtdate}}</template>
      </el-table-column>

      <el-table-column prop="state" label="会员状态" >
        <template slot-scope="scope">
          <el-switch @change="changeState(scope.row)" v-model="scope.row.state" active-color="#13ce66"
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

    <el-dialog :title="(form._id ? '编辑会员 --' : '添加会员')+(form.mb_name ? form.mb_name : '')" :visible.sync="dialogFormVisibleAdd" @open="$refs.mbForm.clearValidate()" >
      
      <el-form :model="form" :rules="rules" ref="mbForm">
        <el-form-item label="用户名" prop="mb_name" label-width="100px">
          <el-input v-model="form.mb_name" autocomplete="off" autofocus="true" ></el-input>
        </el-form-item>
        <el-form-item label="性别" prop="mb_sex" label-width="100px">
          <el-radio-group v-model="form.mb_sex">
            <el-radio label="男" >男</el-radio>
            <el-radio label="女" >女</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="年龄" prop="mb_age" label-width="100px">
          <el-input v-model="form.mb_age" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="兴趣爱好" prop="mb_hobby" label-width="100px">
          <el-input  v-model="form.mb_hobby" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="mb_email" label-width="100px">
          <el-input  v-model="form.mb_email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mb_mobile" label-width="100px">
          <el-input v-model="form.mb_mobile" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="会员等级" prop="mb_grade" label-width="100px">
         <el-select v-model="form.mb_grade" style="width:200px">
                    <el-option label="普通会员" value="普通会员"></el-option>
                    <el-option label="黄金会员" value="黄金会员"></el-option>
                    <el-option label="钻石会员" value="钻石会员"></el-option>
                    
                  </el-select>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
      <el-button type="primary" @click="addMeber()">确 定</el-button>
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
          mb_sex: [{
              required: true,
              message: '性别不能为空',
              trigger: 'blur'
            },
           
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
          page_size: 10, //一页显示多少条
          page_sizes: [5, 10, 15], //每页显示多少条
          layout: 'total,sizes,prev,pager,next,jumper' // 翻页属性
        },

        query: {
          mb_name: '',
          mb_age: '',
          mb_grade: ''
        },
        queryData: [],
        allitems: [],
        items: [],
        dialogFormVisibleAdd: false,
        
      }

    },
    methods: {


      //修改用户状态
      async changeState(member) {

        await this.$http.put(`rest/members/${member._id}/${member.state} `)

      },
      //搜索用户
      searchMember() {
        if (this.query.mb_name === '' && this.query.mb_age === ''&& this.query.mb_grade === '') {
          this.$message({
            type: "warning",
            message: "请输入搜索条件"
          })
          this.fetch();
          return
        }
        this.allitems = this.queryData.filter(item => {

          let mbName = item.mb_name
          let mbAge = item.mb_age.toString()
          let mbGrade = item.mb_grade
         if (this.query.mb_name && this.query.mb_grade &&this.query.mb_age) {
            return this.query.mb_name === mbName && this.query.mb_grade === mbGrade&& this.query.mb_age === mbAge
          } else if (this.query.mb_name && this.query.mb_grade) {
            return this.query.mb_name === mbName && this.query.mb_grade === mbGrade
          } else if (this.query.mb_grade && this.query.mb_age) {
            return this.query.mb_grade === mbGrade && this.query.mb_age === mbAge
          } else if (this.query.mb_name && this.query.mb_age) {
            return this.query.mb_name === mbName && this.query.mb_age === mbAge
          } else if (this.query.mb_age) {
            return this.query.mb_age === mbAge
          } else if (this.query.mb_name) {
            return this.query.mb_name === mbName
          }else if (this.query.mb_grade) {
            return this.query.mb_grade === mbGrade
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
      showAddMemberDia() {
        this.form = {
          mb_sex: "男"
        }
        this.dialogFormVisibleAdd = true
      },
      
      async addMeber() {

        if (this.form._id) {
          await this.$http.put(`rest/members/${this.form._id}`, this.form)
           this.$router.push('/members')
        this.$message({
          type: 'success',
          message: '编辑会员成功'
        });
        } else {
          await this.$http.post('rest/members', this.form)
           this.$router.push('/members')
        this.$message({
          type: 'success',
          message: '入会成功'
        });
        }
       
        this.dialogFormVisibleAdd = false
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
      //删除会员
      async deleMb(row) {

        this.$confirm(`确定把 "${row.mb_name}" 会员退会处理吗? `, '提示', {
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
            message: "退会成功"

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