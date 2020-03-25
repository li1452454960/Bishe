<template>
  <el-card class="login-warp">
    <el-form 
    class="login-form"
    label-position="top"
     label-width="80px">
     <h2>用户登录</h2>
      <el-form-item label="用户名" >
        <el-input v-model="model.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码">
        <el-input type="password" v-model="model.password" placeholder="请输入密码"></el-input>
      </el-form-item>
     <el-button  @click.prevent = "handleLogin()" 
     class="login-btn" type="primary">登录</el-button>

    </el-form>
  </el-card>
</template>

<script>
  export default {
   data() {
       return {
           model: {
                username: '',
                password: ''
           },
           
       }
   },
   methods: {
     //登陆请求
     async handleLogin() {
       const res = await this.$http.post('login',this.model)
       // console.log(res.data)
      //保存登录用户返回token值
      localStorage.token = res.data.token
      this.$router.push('/welcome')
      this.$message({
        type: 'success',
        message: '登录成功'
      })           
          
        
      }
 
   }
  }
  

</script>

<style>
    .login-warp{
        height: 100vh;
        background-color: #324152;
        display: flex;
        justify-content: center;
        align-items: center;
    }
    .login-warp .login-form {
        width: 400px;
        background-color: #fff;
        border-radius: 5px;
        padding: 30px;
    }
    .login-warp .login-btn {
        width: 100%;
    }
</style>
