<template>
  <div id="app">
   
    <router-view></router-view>
  </div>
</template>


<script>

import jwt_decode from 'jwt-decode';
  export default {
   name:'app',
 
  created() {
    if(localStorage.token){
        const decode = jwt_decode(localStorage.token)
        //token存储到VueX中
        this.$store.dispatch("setAuthenticated",!this.isEmpty(decode))
        this.$store.dispatch("setUser",decode)
      }
  },
   methods: {   
      isEmpty(value){
            return (
                value === undefined ||
                value === null ||
                (typeof value === 'object' && Object.keys(value).length===0) ||
                (typeof value === 'string' && value.trim().length===0)
            );
        },
 
   }
  }
  

</script>

<style>

</style>
