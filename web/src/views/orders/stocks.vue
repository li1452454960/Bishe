<template>
  <el-card>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item :to="{ path: '/welcome'}">数据中心</el-breadcrumb-item>
      <el-breadcrumb-item>玩具管理</el-breadcrumb-item>
      <el-breadcrumb-item>玩具分类</el-breadcrumb-item>
    </el-breadcrumb>

    <el-row class="searchRow">
      <el-col>
         玩具分类: <el-select @input="loadUserList()" v-model="query.st_tyName"  clearable placeholder="请选择玩具分类" class="inputSearch">
                <el-option v-for="item in children" :key="item._id" :label="item.tyt_name" :value="item.tyt_name">
                </el-option>
              </el-select>  
      玩具名称: <el-input @input="loadUserList()" clearable placeholder="请输入玩具名称" v-model="query.st_name" class="inputSearch"></el-input>
      玩具编号: <el-input @input="loadUserList()"  clearable placeholder="请输入玩具编号" v-model="query.st_id" class="inputSearch"></el-input>
      
        <template>
          <el-button type="info" plain @click="searchUser" icon="el-icon-search"></el-button>
        </template>
        <el-button @click="showAddToysDia()" type="primary" style="float: right;">玩具入库</el-button>
      </el-col>
    </el-row>

    <el-table :data="items" style="height:650px; overflow:auto;">
      <el-table-column type="index" label="#" width="60">
      </el-table-column>
      <el-table-column prop="st_id" label="玩具编号" width="150">
      </el-table-column>
      <el-table-column prop="st_tyName" label="玩具分类" width="100">
      </el-table-column>
      <el-table-column prop="st_name" label="玩具名称" >
      </el-table-column>
      <el-table-column prop="st_unit" label="单位" width="100">
      </el-table-column>

      <el-table-column prop="st_stock" label="库存">
        <template slot-scope="scope">
          <span v-if="scope.row.st_stock <= 20 ">
            <span style="color:#f56767">{{ scope.row.st_stock }}（库存不足）</span>
          </span>
          <span v-if="scope.row.st_stock > 20 ">
            <span style="color:#00d053">{{ scope.row.st_stock }}</span>
          </span>
        </template>
      </el-table-column>

      <el-table-column prop="date" label="入库时间">
        <template slot-scope="scope"> {{scope.row.date | fmtdate}}</template>
      </el-table-column>

      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" plain type="primary" icon="el-icon-plus" circle @click="editToysDia(scope.row)">
          </el-button>
          <el-button size="mini" plain type="danger" icon="el-icon-delete" circle @click="deleToys(scope.row)">
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :visible.sync="dialogFormVisibleAdd" @open="$refs['mbForm'].clearValidate()">
      <h2>{{form._id ? '增加玩具库存' : '新玩具入库'}}</h2>
      <el-form :model="form" :rules="rules" ref="mbForm">
         <el-form-item label="玩具编号"  label-width="100px">
          <el-input v-model="form.st_id" disabled autocomplete="off" ></el-input>
        </el-form-item>
        <el-form-item  label="玩具分类" prop="st_tyName" label-width="100px">
            <el-select v-model="form.st_tyName">
              <el-option v-for="item in children" :key="item._id" :label="item.tyt_name" :value="item.tyt_name"></el-option>
            </el-select>
          </el-form-item>
        <el-form-item label="玩具名称" prop="st_name" label-width="100px">
          <el-input v-model="form.st_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="st_unit" label-width="100px">
          <el-select v-model="form.st_unit">
            <el-option label="件" value="件"></el-option>
            <el-option label="箱" value="箱"></el-option>
            <el-option label="个" value="个"></el-option>
            <el-option label="辆" value="辆"></el-option>
            <el-option label="把" value="把"></el-option>
            <el-option label="只" value="只"></el-option>
            <el-option label="条" value="条"></el-option>
          </el-select>
        </el-form-item>
        
        <el-form-item label="数量" prop="st_stock" label-width="100px">
          <el-input-number v-model="form.st_stock" autocomplete="off"></el-input-number>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAdd = false">取 消</el-button>
        <el-button type="primary" @click="addToys()">确 定</el-button>
      </div>
    </el-dialog>

    <el-dialog :visible.sync="dialogFormVisibleAddStock">
      <h2>{{form._id ? '增加玩具库存' : '新玩具入库'}}</h2>
      <el-form :model="form">
        <el-form-item label="玩具分类" prop="st_tyName " label-width="100px">
            <el-select v-model="form.st_tyName">
          <el-option v-for="item in children" :key="item._id" :label="item.tyt_name" :value="item.tyt_name"></el-option>
        </el-select>
          </el-form-item>
          
        <el-form-item label="玩具名称" label-width="100px">
          <el-input v-model="form.st_name" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="单位" prop="st_unit" label-width="100px">
          <el-select v-model="form.st_unit">
            <el-option label="件" value="件"></el-option>
            <el-option label="箱" value="箱"></el-option>
            <el-option label="个" value="个"></el-option>
            <el-option label="辆" value="辆"></el-option>
            <el-option label="把" value="把"></el-option>
            <el-option label="只" value="只"></el-option>
            <el-option label="条" value="条"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="库存" prop="st_stock" label-width="100px">
          <el-input-number v-model="form.st_stock" autocomplete="off"></el-input-number>
        </el-form-item>
        <el-form-item label="新增库存" label-width="100px">
         <el-input-number v-model="form.st_number" autocomplete="off"></el-input-number> 
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisibleAddStock = false">取 消</el-button>
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
  import {
    getDateNums
  } from "@/plugins/utils.js"

  export default {
    data() {
      return {
        query: {
          st_tyName: '',
          st_id: '',
          st_name: ''
        },
        paginations: {
          page_index: 1, //当前位于多少页
          total: 0, //总数
          page_size: 10, //一页显示多少条
          page_sizes: [5, 10, 15], //每页显示多少条
          layout: 'total,sizes,prev,pager,next,jumper' // 翻页属性
        },
        pictures: [],
        
        child: [],
        children: [],   
        allitems: [],
        queryData: [],
        items: [],
        dialogFormVisibleAdd: false,
        dialogFormVisibleAddStock: false,
        form: {},
        rules: {
          st_name: {
            required: true,
            message: '请输入玩具名称',
            trigger: 'blur'
          },
          st_unit: {
            required: true,
            trigger: 'blur'
          },
          st_tyName: {
            required: true,
            trigger: 'blur'
          },
          st_stock: {
            required: true,
            message: '请输入入库玩具数量',
            trigger: 'blur'
          },
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


      //修改
      editToysDia(row) {
        this.form = row
        if(this.form.st_number){
          this.form.st_number = ''
        }
        this.dialogFormVisibleAddStock = true
        /* this.dialogFormVisibleAdd = true */
      },

    

      //添加
      showAddToysDia() {
        this.order_nums() 
        this.form = {}
        this.form.st_id = this.outTradeNo
        this.dialogFormVisibleAdd = true
       
      },
      async addToys() {
         
        if (this.form._id) {
          await this.$http.put(`rest/stocks/${this.form._id}`, this.form)
          this.$router.push('/stocks')
        this.$message({
          type: 'success',
          message: '新增库存成功'
        });
        } else {
          await this.$http.post('rest/stocks', this.form)
        this.$router.push('/stocks')
        this.$message({
          type: 'success',
          message: '入库成功'
        });
        }
       
        this.dialogFormVisibleAdd = false
        this.dialogFormVisibleAddStock = false
        this.fetch()

      },
      //搜索
            searchUser() {
                if (this.query.st_name==='' && this.query.st_tyName ==='' &&this.query.st_id==='') {
                    this.$message({
                        type: "warning",
                        message: "请输入搜索条件"
                    })
                    this.fetch();
                    return
                }

                this.allitems = this.queryData.filter(item => {

                  let stName = item.st_name
                  let stId = item.st_id
                  let stTyName = item.st_tyName
                if (this.query.st_name && this.query.st_tyName &&this.query.st_id) {
                    return this.query.st_name === stName && this.query.st_tyName === stTyName&& this.query.st_id === stId
                  } else if (this.query.st_name && this.query.st_tyName) {
                    return this.query.st_name === stName && this.query.st_tyName === stTyName
                  } else if (this.query.st_tyName && this.query.st_id) {
                    return this.query.st_tyName === stTyName && this.query.st_id === stId
                  } else if (this.query.st_name && this.query.st_id) {
                    return this.query.st_name === stName && this.query.st_id === stId
                  } else if (this.query.st_id) {
                    return this.query.st_id === stId
                  } else if (this.query.st_name) {
                    return this.query.st_name === stName
                  }else if (this.query.st_tyName) {
                    return this.query.st_tyName === stTyName
                  }

                })
                this.setPaginations()

            },
            loadUserList() {
               this.fetch();
            },
      //获取列表
      async fetch() {
        const res = await this.$http.get('rest/stocks')
        this.allitems = res.data
        this.queryData = res.data
        this.setPaginations()
      },
      //获取玩具分类
      async getChildren() {
        const res = await this.$http.get('rest/toyType')
        this.children = res.data
        //console.log(res)
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
      async deleToys(row) {

        this.$confirm(`确定从库存中删除 "${row.st_name}" 玩具吗? `, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(async () => {
          await this.$http.delete(`rest/stocks/${row._id}`)        
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
     // this.getParents();
      this.getChildren()
      
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