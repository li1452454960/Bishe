<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="../../assets/logo.png" width="179px" height="60px" alt="无法显示图片">
          </div>
        </el-col>
        <el-col :span="18" class="middle">
          <h3>玩具店会员管理系统</h3>
        </el-col>
        <el-col :span="2">
          <div class="grid-content bg-purple">
            
            <a href="#" @click.prevent = "handleSignout()"  class="loginout" type="danger"><h4>退出</h4></a>

          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">
      
        <el-menu router  unique-opened  :default-active="$route.path">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/usersList"><span>用户列表</span></el-menu-item>
            
            <el-menu-item index="/usersType"><span>用户类型</span></el-menu-item>
          </el-submenu>

          <el-submenu index="2">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>会员管理</span>
            </template>
            <el-menu-item index="members">
              <i class="el-icon-location"></i>
              <span>会员列表</span>
            </el-menu-item>
            <el-menu-item index="membersPoint">
              <i class="el-icon-location"></i>
              <span>会员积分</span>
            </el-menu-item>

          </el-submenu>

          <el-submenu index="3">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>玩具管理</span>
            </template>
            <el-menu-item index="toys">
              <i class="el-icon-location"></i>
              <span>玩具列表</span>
            </el-menu-item>
            
            <el-menu-item index="toysType">
              <i class="el-icon-location"></i>
              <span>玩具分类</span>
            </el-menu-item>
 
          </el-submenu>

          <el-submenu index="4">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>销售管理</span>
            </template>
            <el-menu-item index="sales">
              <i class="el-icon-location"></i>
              <span>销售订单</span>
            </el-menu-item>
            <el-menu-item index="stocks">
              <i class="el-icon-location"></i>
              <span>订购订单</span>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>

      <el-main class="main">
      <router-view></router-view>
      </el-main>

    </el-container>
  </el-container>

</template>

<script>
  export default {

    methods: {
      
      handleSignout() {
        localStorage.clear()
        this.$message.success('退出成功')
        this.$router.push({ name: 'login'})
      }
    }

  }

</script>

<style >
  .container {
    height: 100vh;
  }

  .header {
    background-color: #b3c0d1;
  }

  .aside {
    background-color: #d3dce6;
  }

  .main {
    background-color: #e9eef3;
  }


  .middle {
    text-align: center;

  }

  .loginout {
    text-decoration: none;
    line-height: 25px;
   
  }
  

</style>
