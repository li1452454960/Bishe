import axios from 'axios'
import Vue from 'vue'
import router from '../router'
import { Loading } from 'element-ui'

const http = axios.create ({
     baseURL : 'http://localhost:3000/web/api'
      
})

//加载动画
let loading;
function startLoading(){
     loading = Loading.service({
         lock:true,
         text:'拼命加载中...',
         background:'rgba(0,0,0,0.7)'
     })
 }
 
 function endLoading(){
     loading.close()
 }
//服务端登录校验
http.interceptors.request.use(function (config) {
     startLoading()
     // Do something before request is sent
     if (localStorage.token) {
       config.headers.Authorization = 'Bearer ' + localStorage.token
     }
     return config;
   }, function (error) {
     // Do something with request error
     return Promise.reject(error);
   });

//全局拦截器
http.interceptors.response.use(res => {
     endLoading()
     return res
}, err => {
     endLoading()
   if (err.response.data.message)  {
     Vue.prototype.$message({
          type: 'error',
          message: err.response.data.message
     })  
     if ( err.response.data.message === 'jwt expired') {
          Vue.prototype.$message({
               type: 'warning',
               message: '身份验证失效，请重新登录'
          })  
          router.push('/login')
        } 
        
     //    if ( err.response.status === 500) {
     //      Vue.prototype.$message({
     //           type: 'warning',
     //           message: '请填写完整信息'
     //      })  
     //    } 
    if (err.response.status === 401) {
     router.push('/login')
   } 
   }
     
     return Promise.reject(err)
})

 export default http
  