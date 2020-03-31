<template>
  <el-card>
    <div class="about">
      <h1>{{id ? '编辑' : '新建'}}管理员</h1>
      <el-form label-width="120px" @submit.native.prevent="save" :rules="rules" ref="userForm">
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
        <el-form-item label="选择身份">
          <el-select v-model="model.identity" placeholder="请选择身份">
            <el-option label="管理员" value='管理员'></el-option>
            <el-option label="员工" value='员工'></el-option>
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
        model: {},
        rules: {
          username: [{
              required: true,
              message: '请输入用户名',
              trigger: 'blur'
            },
            {
              min: 2,
              max: 16,
              message: '长度在2-16个字符之间',
              trigger: 'blur'
            }
          ],
          password: [{
              required: true,
              message: '请输入密码',
              trigger: 'blur'
            },
            {
              min: 6,
              max: 16,
              message: '长度在6-16之间',
              trigger: 'blur'
            }
          ],
         
        }

      }

    },
    methods: {

     
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
     
    }
  }
</script>

<style scoped>
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