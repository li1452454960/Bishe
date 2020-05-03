<template>
  <el-card>
    <div class="about">
      <h1>{{id ? '编辑上架玩具信息' : '上架玩具'}}</h1>

      <el-steps :active="1*active" simple>
        <el-step title="基本信息" icon="el-icon-edit"></el-step>
        <el-step title="产品参数" icon="el-icon-sell"></el-step>
        <el-step title="商品展示" icon="el-icon-picture"></el-step>
        <el-step title="商品描述" icon="el-icon-document"></el-step>
      </el-steps>
      <el-form label-position="top" label-width="80px" style="height:680px; overflow:auto;"
        @submit.native.prevent="save" :rules="rules" ref="model" :model="model">

        <el-tabs v-model="active" tab-position="left" style="height: 100%px;" >
          <el-tab-pane label="基本信息" name="1" >
           <el-form-item label="玩具分类" prop="child" label-width="100px">
              <el-select v-model="model.st_tyName"  @change="getStNameById()">
                <el-option v-for="item in toyTypes" :key="item._id" :label="item.tyt_name" :value="item.tyt_name">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="选择库存玩具" prop="st_name" label-width="100px">
              <el-select v-model="model.st_name" >
                <el-option v-for="item in stName" :key="item._id" :label="item.st_name" :value="item.st_name"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="单位" prop="child" label-width="100px">
              <el-select v-model="model.parent">
                <el-option v-for="item in parents" :key="item._id" :label="item.st_unit" :value="item._id">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="品牌" prop="ty_brand" label-width="100px">
              <el-input v-model="model.ty_brand" autocomplete="off" ></el-input>
            </el-form-item>
            <el-form-item label="单价" prop="ty_price" label-width="100px">
              <el-input v-model="model.ty_price" autocomplete="off" ></el-input>
            </el-form-item>
          </el-tab-pane>

          <el-tab-pane label="产品参数" name="2">
            <el-form-item label="型号大小" prop="st_parameter" label-width="100px">
          <el-select v-model="model.ty_parameter" multiple>
            <el-option label="大号" value="大号"></el-option>
            <el-option label="中号" value="中号"></el-option>
            <el-option label="小号" value="小号"></el-option>
            <el-option label="超大号" value="超大号"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="颜色分类" prop="st_model" label-width="200px">
          <el-select v-model="model.ty_model" multiple>
            <el-option label="黑" value="黑"></el-option>
            <el-option label="白" value="白"></el-option>
            <el-option label="红" value="红"></el-option>
            <el-option label="蓝" value="蓝"></el-option>
            <el-option label="黄" value="黄"></el-option>
            <el-option label="绿" value="绿"></el-option>
            <el-option label="青" value="青"></el-option>
            <el-option label="蓝" value="蓝"></el-option>
            <el-option label="紫" value="紫"></el-option>
          </el-select>
        </el-form-item>

            <el-form-item label="适用年龄" label-width="100px">
              <el-select v-model="model.ty_age" multiple>
                <el-option v-for="item in options1" :key="item.value" :label="item.label" :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="保修期" label-width="100px">
              <el-select v-model="model.ty_warranty">
                <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.label">
                </el-option>
              </el-select>
            </el-form-item>

          </el-tab-pane>

          <el-tab-pane label="商品展示" name="3">
            <el-button type="primary" size="small" @click="model.pictures.push({})" style="margin-top:10px">
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
                <el-form-item label="图片">
                  <el-upload class="avatar-uploader" :action="uploadUrl" :headers="getAuthHeaders()"
                    :show-file-list="false" :on-success="res => $set(item, 'ty_icon', res.url)">
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
              <vue-editor v-model="model.ty_describe"></vue-editor>
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
  import {
    VueEditor
  } from "vue2-editor";

  export default {
    props: {
      id: {}
    },
    components: {
      VueEditor
    },
    data() {
      return {
        stName:[],
        active: '1',
        parents: [],
        parent: [],
        toyTypes:[],

        model: {
          pictures: [],

        },
        rules: {
          child: {
            required: true,
            trigger: 'blur'
          },
          st_name: {
            required: true,
            trigger: 'blur'
          },
          ty_price: {
            required: true,
            message: '请输入上架玩具单价',
            trigger: 'blur'
          },
          ty_brand: {
            required: true,
            message: '请输入上架玩具品牌',
            trigger: 'blur'
          },
        },
        options: [{
          label: '无保质期'
        }, {
          label: '三个月'
        }, {
          label: '半年'
        }, {
          label: '一年'
        }, {
          label: '三年'
        }, {
          label: '永久质保'
        }],
        options1: [{
          label: '0-12个月'
        }, {
          label: '0-36个月'
        }, {
          label: '3岁-八岁'
        }, {
          label: '8岁-14岁'
        }, {
          label: '14岁以上'
        }],

      }

    },
    methods: {
//根据玩具分类查找玩具
      getStNameById(){
        this.stName =[]
 /* console.log(this.model.st_tyName+"搜索id"); */
    this.parents.forEach(item=> {
      /*  console.log(item.st_tyName+"玩具id"); */
      if(item.st_tyName==this.model.st_tyName){
        this.stName.push(item) 
      }
});
      },

      afterUpload(res) {
        this.$set(this.model, 'ty_icon', res.url);
        //this.model.icon = res.url
      },

      //玩具库存
      async getParents() {
        const res = await this.$http.get('rest/stock')
        this.parents = res.data
      },
       //玩具库存
      async getToyTypes() {
        const res = await this.$http.get('rest/toyType')
        this.toyTypes = res.data
     
      },
      async save() {

        if (this.id) {
          await this.$http.put(`rest/toys/${this.id}`, this.model)
          this.$router.push('/toys')
        this.$message({
          type: 'success',
          message: '编辑上架玩具成功'
        })
        } else {
          await this.$http.post('rest/toys', this.model)
           this.$router.push('/toys')
          this.$message({
          type: 'success',
          message: '上架成功'
        })
        }
       
      },
       async fetch() {
        const res = await this.$http.get(`rest/toys/${this.id}`)
        this.model = res.data
      },
    },
    

    created() {
      this.id && this.fetch()
      this.getParents()
      this.getToyTypes()
    }
  }
</script>
<style >

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