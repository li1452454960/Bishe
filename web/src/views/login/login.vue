<template>
  <el-card class="login-warp">
    <el-form 
    class="login-form"
    label-position="top"
     label-width="80px" 
     :rules="rules" ref="loginForm">
     <h2>用户登录</h2>
      <el-form-item label="用户名" prop="username">
        <el-input v-model="model.username" placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
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
            rules:{
                username:[
                    {required:true,message:'请输入用户名',trigger:'blur'},
                    {min:2,max:16,message:'长度在2-16个字符之间',trigger:'blur'}
                ],
                password:[
                    {required:true,message:'请输入密码',trigger:'blur'},
                    {min:6,max:16,message:'长度在6-16之间',trigger:'blur'}
                ],
            }
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
