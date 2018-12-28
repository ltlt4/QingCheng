// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
// import Vue from 'vue'
import App from './App'
import router from './router'
import axios from "axios"
import qs from "qs"
import'mint-ui/lib/style.css'
import { Swipe, SwipeItem,Toast,MessageBox} from 'mint-ui';
// import vueCode from "vue-vercode"
import VueTouch from 'vue-touch'
import store from "./store/index"
import animated from 'animate.css'

Vue.prototype.Toast=Toast
Vue.prototype.MessageBox=MessageBox
// Vue.use(vueCode)
Vue.use(animated)
Vue.use(VueTouch, {name: 'v-touch'})
Vue.component(Swipe.name, Swipe);
Vue.component(SwipeItem.name, SwipeItem);
//导入axios
//要求axios每次必须携带cookie去服务端
axios.defaults.withCredentials=true;
Vue.prototype.axios=axios;
Vue.prototype.qs = qs;

Vue.config.productionTip = false
//全局过滤器
Vue.filter('capitalize', function (value) {
  if (!value) return null;
  value = '￥'+value+'.00'
  return value
})

/* eslint-disable no-new */
new Vue({
  router,
  render: h => h(App),
  store
}).$mount('#app')
