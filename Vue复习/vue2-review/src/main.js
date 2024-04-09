import Vue from 'vue'
import App from './App.vue'
/* 项目配置文件*/
import './config/initManage'
new Vue({
  render: (h) => h(App)
}).$mount('#app')
