import Vue from 'vue'
import App from './App.vue'
import './plugins/element.js'
import router from './router'
import store from './store'
import './assets/css/reset.css'
import http from './plugins/http.js'
import moment from 'moment'

Vue.config.productionTip = false

Vue.prototype.$http = http
Vue.mixin({
  computed: {
    uploadUrl(){
      return this.$http.defaults.baseURL + '/upload'
    }
  },
  methods: {
    getAuthHeaders(){
      return{
        Authorization: `Bearer ${localStorage.token || ''}`
      }
    }
  },
})

Vue.filter('fmtdate', (v)=> {
  return moment(v).format('YYYY-MM-DD')
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
