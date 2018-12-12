import Vue from 'vue'
import Router from 'vue-router'
import Home from "../components/home.vue"
import ceshi from "../components/ceshi.vue"
import Product from "./../components/Product/product.vue"
import Shop from  "./../components/Product/shop.vue"

Vue.use(Router)

export default new Router({
  routes: [
    {path: '/',component: Home},
    {path:"/ceshi",component:ceshi},
    {path:"/Product",component:Product},
    {path:"/shop/:pid",component:Shop}
  ]
})
