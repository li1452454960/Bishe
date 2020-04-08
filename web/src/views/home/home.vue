<template>
  <el-container class="container">
    <el-header class="header">
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="../../assets/logo2.jpg" width="150px" height="65px" alt="无法显示图片">
          </div>
          
        </el-col>
        <el-col :span="14" class="middle">
          <img src="../../assets/icon.jpg" alt="无法显示图片">
        </el-col>
        <el-col :span="6"  class="user">
        <div class="userinfo">
                    <img :src="user.icon" class="avatar" alt="">
                    <div class="welcome">
                        <p class="name comenname">欢迎</p>
                        <p class="name avatarname">{{user.name}}</p>
                    </div>
                    <span class="username" >
                        <el-dropdown trigger="click" @command="setDialogInfo">
                            <span class="el-dropdown-link"><i class="el-icon-caret-bottom el-icon--right"></i>
                            </span>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item class="loginout" command="logout">退出登录</el-dropdown-item>
                            </el-dropdown-menu>
                        </el-dropdown>
                    </span>
                </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="aside" width="200px">

        <el-menu router unique-opened :default-active="$route.path">
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>用户管理</span>
            </template>
            <el-menu-item index="/usersList"><span>用户列表</span></el-menu-item>
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
              <span>玩具销售</span>
            </el-menu-item>
            <el-menu-item index="stocks">
              <i class="el-icon-location"></i>
              <span>玩具入库</span>
            </el-menu-item>
          </el-submenu>

        </el-menu>
      </el-aside>

      <el-main class="main">
        <router-view :key="$route.path"></router-view>
      </el-main>

    </el-container>
  </el-container>

</template>

<script>
  export default {
computed:{
        user(){
            return this.$store.getters.user
        }
    },
    methods: {
      setDialogInfo(cmdItem){
            switch(cmdItem){
                case "logout":
                    this.logout();
                    break;    
            }
        },
        logout(){
            //清除token
            localStorage.clear()
            this.$store.dispatch('clearCurrentState')
            this.$message.success('退出成功')
            this.$router.push({
              name: 'login'
            })
        },
    //     //获取列表
    //   async fetch() {
    //     const res = await this.$http.get('rest/stocks')
    //     this.allitems = res.data
    //   },
    //    created() {
    //   this.fetch()
    // },
    },
   

  }
</script>

<style scoped >
  .container {
    height: 100vh;
  }

  .header {
    background-color: #ced6e0;
  }

  .aside {
    background-color: #dfe4ea;
  }

  .main {
    background-color: #e9eef3;
  }


  .middle {
    text-align: center;

  }

  .loginout {
   color: #e73232;

  }
 .user {
  line-height: 60px;
  text-align: right;
  float: right;
  padding-right: 10px;
}
.avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  vertical-align: middle;
  display: inline-block;
}
.welcome {
  display: inline-block;
  width: auto;
  vertical-align: middle;
  padding: 0 5px;
  
}
.name {
  line-height: 0px;
  text-align: center;
  font-size: 14px;
}
.comename {
  font-size: 12px;
  
}
.avatarname {
  color: #409eff;
  font-weight: bolder;
  margin-top: 2px;
}
.username {
  cursor: pointer;
  margin-right: 5px;
}
.el-dropdown {
  color: #fff;
}
</style>