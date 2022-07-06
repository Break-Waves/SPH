import Vue from 'vue'
import App from './App.vue'
import router from '@/router'
import store from '@/store'
//至少需要执行一次该文件
import '@/mock/mockServe'

Vue.config.productionTip = false

//全局组件都在main.js注册
import TypeNav from '@/components/TypeNav'
//注册一下~
Vue.component('TypeNav',TypeNav)

new Vue({
  render: h => h(App),
  router,
  store
}).$mount('#app')
