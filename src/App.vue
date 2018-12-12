<template>
  <div id="app" class="app">
    <div class="header" :class="{'header-w':befor}">
      <div class="nav">
        <router-link class="nav-a" to="/"></router-link>
        <nav class="app-nav">
          <ul>
            <li class="nav-li-a"><routerLink to="/product" :class="{'nav-li-a-a':befor}">品牌</routerLink></li>
            <li class="nav-li-b"><routerLink to="/product" :class="{'nav-li-a-a':befor}">青橙三好手机</routerLink></li>
            <li class="nav-li-b"><routerLink to="/product" :class="{'nav-li-a-a':befor}">VOGA系列</routerLink></li>
            <li class="nav-li-b"><routerLink to="/product" :class="{'nav-li-a-a':befor}">智能·配件</routerLink></li>
            <li class="nav-li-a"><routerLink to="/product" :class="{'nav-li-a-a':befor}">商场</routerLink></li>
            <li class="nav-li-a"><routerLink to="/product" :class="{'nav-li-a-a':befor}">社区</routerLink></li>
            <li class="nav-li-a"><routerLink to="/product" :class="{'nav-li-a-a':befor}">服务</routerLink></li>
          </ul>
        </nav>
        <div class="app-login">
          <routerLink to="/" class="login-a"></routerLink>
          <routerLink to="/" class="login-a"></routerLink>
          <routerLink to="/" class="login-a"></routerLink>
        </div>
      </div>
    </div>
    <router-view />
    <div class="app-footer">
      <div class="app-footer-ts">
        <div class="footer-ts-d">
          <div class="ts-d1">
            <h6>购买指南</h6>
            <div>
              <a href="#" v-for="(item,i) of list[0]">{{item}}</a>
            </div>
            <h6>关于青橙</h6>
            <div>
              <a href="#">新闻中心</a>
              <a href="#">加入我们</a>
              <a href="#">联系我们</a>
            </div>
          </div>
          <div class="ts-d1">
            <h6>橙心服务</h6>
            <div>
              <a href="#">售后政策</a>
              <a href="#">售后流程</a>
              <a href="#">保外维修</a>
            </div>
            <h6>关注青橙</h6>
            <div>
              <a href="#">新浪微博</a>
              <a href="#">官方微信</a>
              <a href="#">官方论坛</a>
            </div>
          </div>
        </div>
        <div class="footer-img">
          <div class="f-img-d">
            <img src="../static/erweima/sina.jpg" alt="">
          </div>
          <div class="f-img-d">
            <img src="../static/erweima/wechat.jpg" alt="">
          </div>
          <div>
            <img src="../static/zaxiang/400.jpg" alt="">
          </div>
          <div>
            <img src="../static/zaxiang/online_tip_bg.png" alt="">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        list: [
          ["发货时间", "关于签收", "付款方式"],
        ],
        befor:false
      }
    },
    updated() {
      if(this.$route.path!="/"){
        this.befor=true
      }else{
        this.befor=false
      }
    },
    created() {
      if(this.$route.path!="/"){
        this.befor=true
      }else{
        this.befor=false
      }
    },methods: {

    },
  }
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  .app {
    min-width: 1200px;
    position: relative;
    width: 100%;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none
  }

  .app-footer {
    width: 100%;
    background: #fff;
    position: relative;
  }

  .app-footer-ts {
    width: 100%;
    max-width: 1400px;
    min-width: 1200px;
    background: #fff;
    margin: 0 auto;
    padding: 0 2.5%;
  }

  .app-footer-ts:before {
    content: "";
    display: table;
  }

  .footer-ts-d {
    width: 50%;
    display: inline-block;
    overflow: hidden;
    padding: 60px 0;
    position: relative;
    top: -15px
  }

  .footer-img {
    display: inline-block;
    width: 39%;
    overflow: hidden;
    padding: 60px 0;
    position: relative;
    padding-left: 16%;
  }

  .f-img-d {
    display: inline-block;
  }

  .ts-d1 {
    display: inline-block;
    position: relative;
    vertical-align: middle;
    width: 49%;
  }

  .ts-d1 h6 {
    padding: 0 10px;
    margin-bottom: 15px;
    margin-top: 5px;
  }

  .ts-d1 a {
    float: none;
    display: block;
    line-height: 30px;
    font-size: 12px;
    text-align: left;
    color: #898989;
    padding: 0 10px;
    min-width: 75px;
    position: relative;
    width: 10%;
  }

  .header {
    position: absolute;
    top: 0;
    left: 0;
    margin: auto;
    z-index: 100;
    height: 90px;
    width: 100%;
    background: transparent;
  }
  .header-w{
    background:#ffffff;
    border-bottom:1px solid #eee;
  }
  .nav {
    max-width: 1400px;
    min-width: 1200px;
    padding: 0 20px;
    margin: 0 auto;
    height: 90px;
    width: 100%;
    position: relative;
  }

  .nav-a {
    background: url("../static/logo-w.png");
    position: absolute;
    width: 160px;
    height: 60px;
    display: block;
    top: 15px;
    left: 20px;
  }

  .ts-d1 a:hover {
    color: red;
  }

  .app-nav {
    width: 780px;
    position: absolute;
    z-index: 9;
    left: 50%;
    margin-left: -430px;
  }

  .app-nav ul {
    display: inline-block;
  }

  .app-nav:before {
    content: "";
    display: table;
  }

  .nav-li-b {
    display: inline-block;
    float: left;
    position: relative;
    width: 140px;
    text-align: center;
  }

  .nav-li-a {
    display: inline-block;
    float: left;
    position: relative;
    width: 90px;
    text-align: center;
  }

  .nav-li-a a,
  .nav-li-b a {
    font-size: 14px;
    padding: 0 20px;
    width: 100%;
    color: #fff;
    text-align: center;
    position: relative;
    z-index: 100;
    line-height: 90px;
    /* color: #434343; */
  }
  .nav-li-a-a{
    color:#434343 !important;
  }
  .app-login {
    width: 240px;
    height: 44px;
    position: absolute;
    top: 0;
    margin-top: 28px;
    right: 20px;
  }

  .login-a {
    width: 60px;
    height: 44px;
    display: inline-block;
    font-size: 12px;
    color: #898989;
    padding: 0 10px;
    line-height: 40px;
    float: left;
    min-width: 75px;
    text-align: center;
  }

  .app-login a:nth-child(1) {
    background: url("../static/login/icon_cart_white.png");
    background-position: 50%;
    background-repeat: no-repeat;
  }

  .app-login a:nth-child(2) {
    background: url("../static/login/icon_user_white.png");
    background-position: 50%;
    background-repeat: no-repeat;
  }

  .app-login a:nth-child(3) {
    background: url("../static/login/icon_myui.png");
    background-position: 50%;
    background-repeat: no-repeat;
  }
  .waper{
    width: 1190px;
    margin: 0 auto;
    padding-top: 0px;
  }
</style>