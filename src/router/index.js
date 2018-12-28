// import Vue from 'vue'
// import Router from 'vue-router'

// Vue.use(Router)
Vue.use(VueRouter)

export default new VueRouter({
  routes: [
    {path: '/',
    name:'Home',
    component:resolve => require(['@/components/home.vue'], resolve)
    },
    {path:"/Product",
    name:'Product',
    component:resolve => require(['../components/Product/product.vue'], resolve)
    },
    {path:"/shop/:pid",
    name:'Shop',
    component:resolve => require(['@/components/Product/shop.vue'], resolve)
    },
    {path:"/reg",
    name:'Reg',
    component:resolve => require(['@/components/login/reg.vue'], resolve)
    },
    {path:"/login",
    name:'Login',
    component:resolve => require(['@/components/login/login.vue'], resolve)
    },
    {path:"/car",
    name:'Car',
    component:resolve => require(['@/components/Product/car.vue'], resolve)
    },
    {path:"/search",
    name:'Search',
    component:resolve => require(['@/components/Product/search'], resolve)
    },
  ]
})