<template>
  <div id="app" class="app">
    <div class="nav">
      <div class="backOff"><i class="iconfont" @click="back">&#xe64e;</i></div>
      <router-link class="nav-a animated flipInY" to="/" v-if="select"></router-link>
      <div class="nav-d animated flipInX" v-else="select">
        <input type="text" placeholder="请输入搜索内容" @keyup.13="search" v-model="ferret">
        <span @click="search">搜索</span>
      </div>
      <router-link to="/login" class="login-a" v-if="!this.$store.state.islogin"></router-link>
      <div class="cancellation" @click="out"><i class="iconfont" v-if="this.$store.state.islogin">&#xe618;</i></div>
    </div>
    <router-view ></router-view>
    <div class="foot_tab" v-if="iscar">
      <div>
        <router-link to="/">
          <div class="tab_icon"><i class="iconfont icon-shouye" :class="{icon_color:iscolor}"></i></div>
          <div><span :class="{span_color:iscolor}">主页</span></div>
        </router-link>
      </div>
      <div>
        <router-link to="/product">
          <div class="tab_icon"><i class="iconfont" :class="{icon_color:iscolor2}">&#xe65a;</i></div>
          <div><span :class="{span_color:iscolor2}">商城</span></div>
        </router-link>
      </div>
      <div>
        <router-link to="/car">
          <div class="tab_icon"><i class="iconfont" :class="{icon_color:iscolor3}">&#xe63f;</i></div>
          <div><span :class="{span_color:iscolor3}">购物车</span> </div>
        </router-link>
      </div>
      <div @click="select?select=false:select=true">
        <div class="tab_icon"><i class="iconfont" :class="{icon_color:iscolor4}">&#xe651;</i></div>
        <div><span>搜索</span></div>
      </div>
    </div>
  </div>
</template>

<script>
  import { Toast } from 'mint-ui';
  export default {
    data() {
      return {
        list: [
          ["发货时间", "关于签收", "付款方式"],
        ],
        iscolor: false,
        iscolor2: false,
        iscolor3: false,
        iscolor4: false,
        iscar: true,
        ferret: "",
        select: true
      }
    },
    updated() {
      this.geturl()
    },
    created() {
      this.geturl()

      let uid = localStorage.getItem("uid")
      if (uid != null) {
        this.$store.commit("getlogin", uid)
      } else if (!uid) {
        this.$store.state.islogin = false
      }
    },
    methods: {
      search() {
        var information = this.ferret
        if (information!= "") {
          this.$router.push({
                path: '/search',
                query: {
                  site: information,
                }
              })
        }else {
          Toast({
            message: '请输入搜索内容',
            position: 'middle',
            duration: 2000
          });
        }
      },
      out() {
        this.axios.get(
          "http://127.0.0.1:3000/user/signout"
        )
        localStorage.removeItem("uid")
        this.$store.commit('signout')
      },
      back() {
        history.back(-1)
      },
      geturl() {
        if (this.$route.path == "/") {
          this.iscolor = true
        } else {
          this.iscolor = false
        }

        if (this.$route.path.indexOf("product") != -1) {
          this.iscolor2 = true
        } else {
          this.iscolor2 = false
        }

        if (this.$route.path.indexOf("shop") != -1) {
          this.iscar = false
        } else {
          this.iscar = true
        }

        if (this.$route.path.indexOf("car") != -1) {
          this.iscolor3 = true
        } else {
          this.iscolor3 = false
        }
      },
      getLocalStorage() {
        var exp = 60 * 60 * 24 * 1000; // 一天的秒数
        if (localStorage.getItem('time')) {
          var vals = localStorage.getItem('time') // 获取本地存储的值 
          // 如果(当前时间 - 存储的元素在创建时候设置的时间) > 过期时间 
          var isTimed = (new Date().getTime() - vals) > exp;
          if (isTimed) {
            localStorage.removeItem('uid');
            this.$store.commit('signout')
            return null;
          }
        } else {
          return null;
        }
      },
    },
    mounted() {
      this.getLocalStorage()
    },
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }


  input {
    outline: none;
  }

  .app {
    width: 100%;
  }

  body {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
  }

  a {
    text-decoration: none;
    -webkit-tap-highlight-color: transparent;
  }

  ul {
    list-style: none
  }

  .nav {
    padding: 0 20px;
    margin: 0 auto;
    height: 70px;
    width: 100%;
    position: relative;
    z-index: 800;
    background: #ff6243;
  }

  .icon_color {
    color: #ff6243 !important;
  }

  .span_color {
    color: #ff6243 !important;
  }

  .nav-a {
    background: url("../static/logo-w.png");
    position: absolute;
    width: 160px;
    height: 60px;
    display: block;
    top: 9px;
    left: 50%;
    margin-left: -80px;
  }

  .nav-d {
    position: absolute;
    width: 60%;
    height: 60px;
    top: 1rem;
    left: 40%;
    margin-left: -80px;
    text-align: center
  }

  .nav-d input {
    width: 85%;
    height: 37px;
    padding: 6px 12px;
    font-size: 14px;
    line-height: 1.42857143;
    color: #555;
    background-color: #fff;
    background-image: none;
    border: 1px solid #ccc;
    border-radius: 4px;
    -webkit-box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
    box-shadow: inset 0 1px 1px rgba(0, 0, 0, .075);
  }

  .nav-d span {
    color: #ffffff;
    font-size: 14px;
  }

  .app-nav {
    width: 780px;
    position: absolute;
    z-index: 9;
    left: 50%;
    margin-left: -430px;
  }

  .login-a {
    width: 60px;
    height: 44px;
    display: block;
    padding: 0 10px;
    line-height: 40px;
    float: right;
    position: relative;
    top: 18px;
    left: 13px;
    background: url("../static/login/icon_user_white.png");
    background-position: 50%;
    background-repeat: no-repeat;
  }

  .login-b {
    width: 60px;
    height: 44px;
    display: inline-block;
    font-size: 12px;
    color: #fff;
    padding: 0 10px;
    line-height: 40px;
    min-width: 75px;
    text-align: center;
    cursor: pointer;
  }

  .foot_tab {
    display: flex;
    width: 100%;
    position: fixed;
    top: 100%;
    margin-top: -60px;
    left: 0;
    background: #ffffff;
    border-top: 1px solid #dddddd;
    z-index: 900;
  }

  .tab_icon {
    padding-top: 10px;
  }

  .foot_tab>div {
    width: 25%;
    text-align: center
  }

  .foot_tab span {
    font-weight: 400;
    font-size: 12px;
    font-family: "STHeiti";
    color: #4c4747
  }

  .waper {
    width: 100%;
    margin: 0 auto;
    padding-top: 0px;
  }

  .btn-warning {
    width: 50%;
    height: 40px;
    margin-top: 10px;
    font-size: 14px;
    padding: 10px 10px;
    line-height: 1.3333333;
    color: #fff;
    background-color: #ed623b;
    border: 1px solid #eea236;
    font-weight: normal;
    display: block;
    text-align: center
  }

  .btn-left {
    border-top-left-radius: 30px;
    border-bottom-left-radius: 30px;
  }

  .btn-right {
    border-top-right-radius: 30px;
    border-bottom-right-radius: 30px;
  }

  * input::-webkit-input-placeholder {
    color: #d3d3d3
  }


  .iconfont {
    font-family: "iconfont" !important;
    font-size: 27px;
    font-style: normal;
    color: black;
    -webkit-font-smoothing: antialiased;
    -webkit-text-stroke-width: 0.2px;
    -moz-osx-font-smoothing: grayscale;
  }

  .cancellation {
    float: right;
  }

  .cancellation i {
    font-size: 18px;
    color: white;
  }

  .backOff {
    float: left;
  }

  .backOff>i {
    font-size: 24px;
    color: white;
  }

  .cancellation,
  .backOff {
    margin-top: 23px;
  }
</style>