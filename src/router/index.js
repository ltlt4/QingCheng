import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/home.vue"
import Product from "./../components/Product/product.vue"
import Shop from  "./../components/Product/shop.vue"
import Reg from "./../components/login/reg.vue"
import Login from "./../components/login/login.vue"
import Car from "./../components/Product/car.vue"
import Search from "./../components/Product/search.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',component: Home},
    {path:"/Product",component:Product},
    {path:"/shop/:pid",component:Shop},
    {path:"/reg",component:Reg},
    {path:"/login",component:Login},
    {path:"/car",component:Car},
    {path:"/search",component:Search},
  ]
})
