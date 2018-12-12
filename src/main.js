// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"
//导入axios
//要求axios每次必须携带cookie去服务端
axios.defaults.withCredentials=true;
Vue.prototype.axios=axios;
//引入Vuex
import Vuex from "Vuex" 
Vue.use(Vuex);
var store=new Vuex.Store({

})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
