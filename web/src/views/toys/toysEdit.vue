<template>
<el-card>
  <div class="about">
    <h1>{{id ? '编辑' : '上架'}}玩具</h1>

    <el-steps :active="1*active" simple>
  <el-step title="基本信息" icon="el-icon-edit"></el-step>
  <el-step title="产品参数" icon="el-icon-sell"></el-step>
  <el-step title="商品展示" icon="el-icon-picture"></el-step>
  <el-step title="商品描述" icon="el-icon-document"></el-step>
</el-steps>
    <el-form label-position="top" label-width="80px" style="height:680px; overflow:auto;"
    @submit.native.prevent="save" :rules="rules" ref="model">

      <el-tabs v-model="active" tab-position="left"  style="height: 100%px;">
        <el-tab-pane label="基本信息" name="1">
          <el-form-item  label="玩具分类" prop="child" label-width="100px">
            <el-select v-model="model.child">
              <el-option v-for="item in children" :key="item._id" :label="item.tyt_name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
           <el-form-item label="玩具名称" prop="parent" label-width="100px">
            <el-select v-model="model.parent">
              <el-option v-for="item in parents" :key="item._id" :label="item.st_name" :value="item._id"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="单价" prop="ty_price" label-width="100px">
            <el-input v-model="model.ty_price" autocomplete="off"></el-input>
          </el-form-item>
       <!--   <el-form-item label="库存" label-width="100px">
            <el-input v-model="model.ty_number" autocomplete="off"></el-input>
          </el-form-item>-->

        </el-tab-pane>

        <el-tab-pane label="产品参数" name="2">

          
          <el-form-item label="品牌" label-width="100px">
           <el-input v-model="model.ty_brand" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="颜色分类" label-width="100px">
            <el-input v-model="model.ty_model" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="适用年龄" label-width="100px">
            <el-select v-model="model.ty_age" multiple>
              <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.label"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="保修期" label-width="100px">
            <el-select v-model="model.ty_warranty">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label"></el-option>
            </el-select>
          </el-form-item>

        </el-tab-pane>

        <el-tab-pane label="商品展示" name="3">
  <el-button size="small" @click="model.pictures.push({})">
            <i class="el-icon-plus"></i> 添加图片
          </el-button>
          <el-row type="flex" style="flex-wrap: wrap">
            <el-col :md="12" v-for="(item, i) in model.pictures" :key="i">
         
          <el-form-item label="展示方位">
              <el-select v-model="item.ty_position" style="width:200px">
            <el-option label="正面" value="正面"></el-option>
            <el-option label="背面" value="背面"></el-option>
            <el-option label="侧面" value="侧面"></el-option>
            <el-option label="顶部" value="顶部"></el-option>
            <el-option label="底部" value="底部"></el-option>
          </el-select>
              </el-form-item>
          <el-form-item label="图片" >
            <el-upload class="avatar-uploader" 
            :action="uploadUrl" 
            :headers="getAuthHeaders()" 
            :show-file-list="false"
              :on-success="res => $set(item, 'ty_icon', res.url)">
              <img v-if="item.ty_icon" :src="item.ty_icon" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
            </el-form-item>
             <el-form-item>
                <el-button size="small" type="danger" @click="model.pictures.splice(i, 1)">删除</el-button>
              </el-form-item>
          </el-col>
          </el-row>
          
        </el-tab-pane>

        <el-tab-pane label="玩具描述" name="4">
          <el-form-item label="玩具详情描述" label-width="100px">
            <vue-editor v-model="model.ty_describe" ></vue-editor>
          </el-form-item>

           <el-form-item style="text-align:right; ">
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button @click="$router.push(`/toys`)">取消</el-button>

      </el-form-item>
        </el-tab-pane>

      </el-tabs>

     
    </el-form>
  </div>
</el-card>
</template>

<script>
import { VueEditor } from "vue2-editor";

  export default {
    props: {
      id: {}
    },
    components: {
    VueEditor
  },
    data() {
      return {
        active: '1',
        child: [],
        children: [],
        parents: [],
        parent: [],
        
        model: {
          pictures: [],
          
        },
        rules:{
          child:{required:true},
          parent:{required:true},
          ty_price:{required:true,message: '请输上架玩具单价',trigger: 'blur'},
        },
        options: [{label: '无保质期'}, {label: '三个月'}, {label: '半年'}, {label: '一年'}, {label: '三年' },{label: '永久质保' }],
        options1: [{label: '0-12个月'}, {label: '0-36个月'}, {label: '3岁-八岁'}, {label: '8岁-14岁'}, {label: '14岁以上' }],
      

      }

    },
    methods: {
         

      afterUpload(res) {
        this.$set(this.model, 'ty_icon', res.url);
        //this.model.icon = res.url
      },

      //玩具分类
      async getParents() {
        const res = await this.$http.get('rest/stock')
        this.parents = res.data
        //console.log(res)
      },
      
      async getChildren() {
        const res = await this.$http.get('rest/toyType')
        this.children = res.data
        //console.log(res)
      },

      async save() {

        if (this.id) {
          await this.$http.put(`rest/toys/${this.id}`, this.model)
        } else {
          await this.$http.post('rest/toys', this.model)
        }
        this.$router.push('/toys')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch() {
        const res = await this.$http.get(`rest/toys/${this.id}`)
        this.model = res.data
      },


    },

    created() {
      this.id && this.fetch()
      this.getParents()
      this.getChildren()
    }
  }
</script>
<style  >
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
    width: 600px;
    height: 400px;
    line-height: 400px;
    text-align: center;
  }

  .avatar {
    width: 600px;
    height: 400px;
    display: block;
  }
</style>