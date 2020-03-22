<template>
<el-card>
  <div class="about">
    <h1>{{id ? '编辑' : '新建'}}管理员</h1>
    <el-form label-width="120px" @submit.native.prevent="save" :rules="rules" ref="form">
      <el-form-item label="头像">
        <el-upload class="avatar-uploader" :action="uploadUrl" :headers="getAuthHeaders()" :show-file-list="false"
          :on-success="afterUpload">
          <img v-if="model.icon" :src="model.icon" class="avatar">
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
      </el-form-item>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="model.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="text" v-model="model.password"></el-input>
      </el-form-item>

      <el-form-item label="用户类型" prop="parent">
        <el-select v-model="model.parent">
          <el-option v-for="item in parents" :key="item._id" :label="item.ust_name" :value="item._id"></el-option>
        </el-select>
      </el-form-item>

      <el-form-item style="text-align:right;">
        <el-button type="primary" native-type="submit">保存</el-button>
        <el-button @click="$router.push(`/usersList`)">取消</el-button>

      </el-form-item>
    </el-form>
  </div>
  </el-card>
</template>

<script>
  export default {
    props: {
      id: {}
    },
    data() {
      return {
        parents: [],
        parent: [],
        model: {},
         rules:{
                username:[
                    {required:true,message:'请输入用户名',trigger:'blur'},
                    {min:2,max:16,message:'长度在2-16个字符之间',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:'blur'},
                    {min:6,max:16,message:'长度在6-16之间',trigger:'blur'}
                ],
                parent:[
                    {required:true,trigger:'blur'},
                ],
            }

      }
      
    },
    methods: {

      //玩具分类
      async getParents() {
        const res = await this.$http.get('rest/userType')
        this.parents = res.data
        //console.log(res)
      },

      afterUpload(res) {
        this.$set(this.model, 'icon', res.url)
        //this.model.icon = res.url
      },

      async save() {

        if (this.id) {
          await this.$http.put(`rest/admin_users/${this.id}`, this.model)
        } else {
          await this.$http.post('rest/admin_users', this.model)
        }
        this.$router.push('/usersList')
        this.$message({
          type: 'success',
          message: '保存成功'
        })
      },
      async fetch() {
        const res = await this.$http.get(`rest/admin_users/${this.id}`)
        this.model = res.data
      },


    },
    
    created() {
      this.id && this.fetch()
      this.getParents();
    }
  }
</script>